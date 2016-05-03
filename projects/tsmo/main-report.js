/**
 * Created by gavorhes on 12/22/2015.
 */

import quickMap from '../../src/olHelpers/quickMap';
import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import mapPopup from '../../src/olHelpers/mapPopup';
import * as tipLayerStyles from './tipStyleFunction';
import LayerEsriMapServer from '../../src/layers/LayerEsriMapServer';
import ItsLayerCollection from '../../src/collections/ItsLayerCollection';
import LayerLegend from '../../src/collections/LayerLegend';
import {} from '../../lib/jquery.floatThead';
let $ = require('jquery');

let suppressLowScores = true;

function tipStyleReport(feature, resolution) {
    "use strict";

    let seg_score = feature.getProperties()['z'];

    if (seg_score < 1 && suppressLowScores) {
        return null;
    } else {
        return tipLayerStyles.tipStyle(feature, resolution);
    }
}


(function () {
    "use strict";

    let $crashData = $('#crash-data');

    function getCrashData(pdpId) {
        $crashData.html('');

        $.get('getcrash', {pdpId: pdpId}, function (d) {
            $crashData.html(d);
        }, 'text')
    }

    // add the cell classes
    $('.param-val').each(function () {
        let z = parseFloat($(this).attr('data-crumb'));
        let cellClass = 'cell-max';

        if (z < -2.5) {
            cellClass = 'cell-min';
        } else if (z < -1.5) {
            cellClass = 'cell-very-low';
        } else if (z < -0.5) {
            cellClass = 'cell-low';
        } else if (z < 0.5) {
            cellClass = 'cell-mid';
        } else if (z < 1.5) {
            cellClass = 'cell-high';
        } else if (z < 2.5) {
            cellClass = 'cell-very-high';
        }

        $(this).addClass(cellClass);
    });

    let map = quickMap({center: {x: -10012438, y: 5548095}, zoom: 6, minZoom: 6});

    let wisDotRegions = new LayerEsriMapServer(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
        {
            minZoom: 6,
            maxZoom: 15,
            opacity: 0.4
        });

    map.addLayer(wisDotRegions.olLayer);

    let reportSegments = new LayerBaseVectorGeoJson('',
        {
            loadCallback: function (theLayer) {
                map.getView().fit(theLayer.source.getExtent(), map.getSize());
            },
            transform: {featureProjection: 'EPSG:3857', dataProjection: 'EPSG:3857'},
            style: tipStyleReport,
            params: {d: (new Date()).getTime().toString()},
            zIndex: 10
        }
    );

    let geoJsonData = JSON.parse($('#geojson-data').val());
    reportSegments.addFeatures(geoJsonData);

    map.addLayer(reportSegments.olLayer);
    map.getView().fit(reportSegments.source.getExtent(), map.getSize());

    let itsLayerCollection = new ItsLayerCollection(map);

    for (let l of itsLayerCollection.layers) {
        l.zIndex = 10;
        l.opacity = 0.5;
    }

    let layerArray = [
        {
            groupName: 'ITS Inventory Layers',
            collapse: true,
            addCheck: true,
            items: itsLayerCollection.layers
        }
    ];

    let legend = new LayerLegend(layerArray, 'legend-container', {});

    let $resultsTable = $('#results-table');
    let $resultsContainer = $('#results-container');



    mapPopup.addMapClickFunction(function () {
        $('.selected-row').removeClass('selected-row');
    });

    //return undefined in popup callback to prevent default popup display
    let selectionLayer = mapPopup.addVectorPopup(reportSegments, function (props) {
            let pdp = props['p'];
            getCrashData(pdp);
            let $selectedRow = $resultsTable.find(`#${pdp}`);
            $selectedRow.addClass('selected-row');
            $resultsContainer.find('table tbody').scrollTop(0);
            $resultsContainer.find('table tbody').scrollTop($selectedRow.offset().top - 60);
            return undefined;
        },
        {olStyle: tipLayerStyles.tipStyleSelection}
    );

    mapPopup.addMapClickFunction(function () {
        $crashData.html('');
    });

    $('.selectable-row').click(function () {
        let mapView = map.getView();
        selectionLayer.getSource().clear();
        $('.selected-row').removeClass('selected-row');
        $(this).addClass('selected-row');
        let pdp = parseInt(this.id);
        let feats = reportSegments.source.getFeatures();
        getCrashData(pdp);
        for (let feature of feats) {
            if (feature.getProperties()['p'] == pdp) {
                selectionLayer.getSource().addFeature(feature);
                mapView.fit(feature.getGeometry().getExtent(), map.getSize());
                mapView.setZoom(mapView.getZoom() - 2);
                return;
            }
        }
    });

    let $scoreUnderOneRows = $('.score-under-one-flag');

    $('#show-all-toggle').click(function () {
        if (this.checked) {
            $scoreUnderOneRows.removeClass('score-under-one');
            suppressLowScores = false;
        } else {
            $scoreUnderOneRows.addClass('score-under-one');
            suppressLowScores = true;
        }
        reportSegments.refresh();
        mapPopup.closePopup();
        $('.selected-row').removeClass('selected-row');
        $('#crash-table').html('');

    }).prop('checked', false);

    let oneRowTd = $resultsTable.find('tr:nth-of-type(2)').children('td');
    let $firstTrTh = $resultsTable.find('tr:first-of-type').children('th');

    function updateTableColumnWidth(){

        let colWidths = [];

        $firstTrTh.each(function(i, el){
            colWidths.push($(el).width());
        });

        oneRowTd.each(function(i, el){
            $(el).width(colWidths[i]);
        });
    }

    updateTableColumnWidth();

    $resultsTable.find('tr:first-of-type').click(function(){
       setTimeout(updateTableColumnWidth, 50);

    });


})();
