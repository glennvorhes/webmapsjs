/**
 * Created by gavorhes on 12/22/2015.
 */

import npmrdsHeatmapConfig from './appConfig';
import quickMap from '../../../src/olHelpers/quickMap';
import LayerBaseXyzTile from '../../../src/layers/LayerBaseXyzTile';
import LayerEsriMapServer from '../../../src/layers/LayerEsriMapServer';
import LayerBaseVectorGeoJson from '../../../src/layers/LayerBaseVectorGeoJson';
import * as layerStyles from './layerStyles';
import * as uiSetup from './main-ui';

//glob.appConfig = npmrdsHeatmapConfig;

(function(){
    "use strict";
    uiSetup.startUi();
    let map = quickMap({center: {x: -10012438, y: 5548095}, zoom: 8, minZoom: 5});

    npmrdsHeatmapConfig.map = map;

    let xyzTile = new LayerBaseXyzTile('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/npmrds_tile/MapServer/tile/{z}/{y}/{x}',
        {minZoom: 4, maxZoom: 11});

    let esriMapServer = new LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/npmrds_dynamic/MapServer',
        {minZoom: 12, maxZoom: 18});

    map.addLayer(xyzTile.olLayer);
    map.addLayer(esriMapServer.olLayer);

    let transform = {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'};

    npmrdsHeatmapConfig.featureOverlay = new LayerBaseVectorGeoJson('', {style: layerStyles.overlayStyle, transform: transform});
    npmrdsHeatmapConfig.lineLayer = new LayerBaseVectorGeoJson('', {style: layerStyles.lineIndicator, transform: transform});
    npmrdsHeatmapConfig.pointLayer = new LayerBaseVectorGeoJson('', {style: layerStyles.pointIndices, transform: transform});
    npmrdsHeatmapConfig.trackerLayer = new LayerBaseVectorGeoJson('', {style: layerStyles.trackerPoint, transform: transform});

    map.addLayer(npmrdsHeatmapConfig.featureOverlay.olLayer);
    map.addLayer(npmrdsHeatmapConfig.lineLayer.olLayer);
    //map.addLayer(npmrdsHeatmapConfig.pointLayer.olLayer);
    map.addLayer(npmrdsHeatmapConfig.trackerLayer.olLayer);

    uiSetup.drawSetup();
    uiSetup.heatMapUi();
    uiSetup.endUi();
})();

