/**
 * Created by gavorhes on 12/14/2015.
 */
import '../../node_modules/babel-polyfill/dist/polyfill.min';
import Sliders from '../../src/collections/Sliders';
import tipConfig from './TipConfig';
import mapPopup from '../../src/olHelpers/mapPopup';
import * as uiSetup from './main-ui';
import LayerEsriMapServer from '../../src/layers/LayerEsriMapServer';
import ItsLayerCollection from '../../src/collections/ItsLayerCollection';
import quickMap from '../../src/olHelpers/quickMap';
import TipSegmentLayer from './TipSegmentLayer';

(function () {
    "use strict";

    glob.config = tipConfig;

    uiSetup.startUi();

    let sliders = new Sliders(tipConfig._sliderParamArray, 'slider-container');
    tipConfig.sliders = sliders;

    let map = quickMap({minZoom: 7});

    tipConfig.map = map;

    let wisDotRegions = new LayerEsriMapServer(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
        {
            minZoom: 6,
            maxZoom: 12,
            name: 'WisDOT Regions',
            useEsriStyle: true
        });

    map.addLayer(wisDotRegions.olLayer);

    //initialize the tip segment layer
    let tipSegmentLayer = new TipSegmentLayer(sliders,
        {
            selectionStyle: {
                color: 'rgba(0,0,255,0.5)',
                width: 7
            },
            $loadingGif: tipConfig.$loadingGif,
            $regionSelector: tipConfig.$regionSelector
        }
    );
    map.addLayer(tipSegmentLayer.olLayer);
    tipConfig.tipSegmentLayer = tipSegmentLayer;

    let metamanagerSegments = new LayerEsriMapServer(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
        {
            minZoom: 7,
            visible: false,
            name: 'Metamanager Segments'
        });

    map.addLayer(metamanagerSegments.olLayer);
    tipConfig.metamanagerSegments = metamanagerSegments;

    //initialize the ITS layer collection
    tipConfig.itsLayerCollection = new ItsLayerCollection(map);

    uiSetup.endUi();
    uiSetup.endUiMap();
})();


//
//let sliders;
//    let app;
//    let extraLayers = {};
//
//    $(function () {
//        return;
//        // create the sliders object
//        sliders = new SliderGroup(tipConfig._sliderParamArray, 'slider-container');
//
//        $('#btnResetDefault').click(function () {
//            sliders.reset();
//        });
//

//
//        let geoJsonArray = [];
//
//        for (i = 0; i < itsLayerConfig.length; i++) {
//            geoJsonArray.push(new ItsGeoJsonLayer(itsLayerConfig[i], app.map, 'its-legend-items'));
//        }
//
//        $('#showVis').prop('checked', true);
//
//        $('input[name=showAll]').change(function () {
//            let $legendDivs = $('#its-legend-items > div');
//            if (this.id == 'showAll' && this.checked) {
//                $legendDivs.addClass('force-show');
//            } else {
//                $legendDivs.removeClass('force-show');
//            }
//        });
//
//        function showHide() {
//            let shown = true;
//            let $legend = $('#its-legend-items');
//            let $pic = $('#show-hide');
//            return function () {
//                if (shown) {
//                    $legend.slideUp();
//                    shown = false;
//                    $pic.attr('src', $pic.attr('src').replace('up', 'down'));
//                } else {
//                    $legend.slideDown();
//                    shown = true;
//                    $pic.attr('src', $pic.attr('src').replace('down', 'up'));
//                }
//            }
//        }
//
//
//        $('#show-hide').click(showHide()).trigger('click');
//
//        $('#show-hide-all-its').prop('checked', true).change(function () {
//
//            for (let i = 0; i < geoJsonArray.length; i++) {
//                geoJsonArray[i].groupVisible = this.checked;
//            }
//
//        });
//
//
//        let url = 'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer';
//
//        extraLayers['mm-layer'] = new ol.layer.Tile({
//            source: new ol.source.TileArcGISRest({
//                url: url
//            })
//        });
//
//        let layerCheckboxes = $('#layer-switch').find('input[type="checkbox"]');
//
//        layerCheckboxes.each(function (idx, val) {
//            val.checked = false;
//        });
//
//        layerCheckboxes.click(function () {
//            if (this.checked) {
//                app.map.addLayer(extraLayers[this.id])
//            } else {
//                app.map.removeLayer(extraLayers[this.id])
//            }
//        });
//
//        //fade out the loading gif when complete
//        $gif.fadeOut();
//

//

//    });




