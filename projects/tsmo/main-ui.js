/**
 * Created by gavorhes on 12/14/2015.
 */
import tipConfig from './TipConfig';
import mapMove from '../../src/olHelpers/mapMove';
import LayerLegend from '../../src/collections/LayerLegend';
const $ = require('jquery');

/**
 * start the UI setup
 */
export function startUi() {

    tipConfig.$loadingGif = $('#loading-gif');
    tipConfig.$loadingGif.fadeIn();

    tipConfig.$regionSelector = $('#region-selector');
    tipConfig.$regionSelector.val('all');

    // configure the preset selector
    let $presetSelector = $('#preset-selector');
    for (let i = 0; i < tipConfig._presetArray.length; i++) {
        let weights = {};
        let sumCheck = 0;
        for (let j = 0; j < tipConfig._sliderParamArray.length; j++) {
            sumCheck += tipConfig._presetArray[i][1][j][0];
            weights[tipConfig._sliderParamArray[j][0].toLowerCase().replace(/ /g, '-')] = tipConfig._presetArray[i][1][j];
        }
        if (sumCheck != 100) {
            alert('Sum not equal to 100 for preset ' + tipConfig._presetArray[i][0]);
        }

        let optionHtml = '<option value="';
        optionHtml += JSON.stringify(weights).replace(/"/g, '&quot;');
        optionHtml += '"';
        optionHtml += (i == 0 ? ' selected="selected"' : '') + '>' + tipConfig._presetArray[i][0] + '</option>';

        $presetSelector.append(optionHtml);
    }

    //enable get help button
    $('#tip-help').click(function () {

        let win = window.open('tip/help', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this site');
        }
    });
}


/**
 * finish the UI setup
 */
export function endUi() {
    tipConfig.$loadingGif.fadeOut();

    $('#make-report').click(function () {
        let params = mapMove.mapExtent;
        params['paramWeights'] = JSON.stringify(tipConfig.sliders.getParams());
        params['region'] = $('#region-selector').val();
        params['preset'] = $('#preset-selector option:selected').text();

        let win = window.open('tip/getreport?' + $.param(params), '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this site');
        }
    });

    //add events to the preset selector
    let $presetSelector = $('#preset-selector');

    // add preset selector change handler
    let first = true;
    $presetSelector.change(function () {

        var weightSelection = JSON.parse(this.value);
        tipConfig.sliders.setValues(weightSelection);
        if (first) {
            first = false;
        } else {
            mapMove.triggerLyrLoad(tipConfig.tipSegmentLayer);
        }
    });

    $presetSelector.trigger('change');

    $('#region-selector').change(function(){
        "use strict";
        mapMove.triggerLyrLoad(tipConfig.tipSegmentLayer);
    });


    tipConfig.sliders.addSlideFinishedFunction(function () {
        $presetSelector[0].selectedIndex = 0;
        mapMove.triggerLyrLoad(tipConfig.tipSegmentLayer);
    });
}

export function endUiMap() {

    mapMove.addCallback(function (ext, zoom, evt) {
        $('#make-report').prop('disabled', !(zoom >= tipConfig.tipSegmentLayerMinZoom));
    });

    let layerArray = [
        tipConfig.tipSegmentLayer,
        tipConfig.metamanagerSegments,
        {
            groupName: 'ITS Inventory Layers',
            collapse: true,
            addCheck: false,
            items: tipConfig.itsLayerCollection.layers
        }
    ];

    let legend = new LayerLegend(layerArray, 'legend-container', {});
}
