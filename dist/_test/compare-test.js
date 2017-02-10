"use strict";
/**
 * Created by gavorhes on 6/1/2016.
 */
var quickMap_1 = require("../olHelpers/quickMap");
var layerSwipe_1 = require("../olHelpers/layerSwipe");
var LayerEsriMapServer_1 = require("../layers/LayerEsriMapServer");
var map = quickMap_1.quickMap();
var swiper = new layerSwipe_1.default(map);
var wisDotRegions = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer', {
    minZoom: 6,
    maxZoom: 12,
    name: 'WisDOT Regions'
});
var metamanagerSegments = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
    minZoom: 7,
    visible: true,
    name: 'Metamanager Segments'
});
var truckSpeed2014 = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer', {
    minZoom: 7,
    visible: true,
    name: 'truck2014',
    showLayers: [8]
});
var truckSpeed2015 = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer', {
    minZoom: 7,
    visible: true,
    name: 'truck2015',
    showLayers: [9]
});
map.addLayer(wisDotRegions.olLayer);
map.addLayer(truckSpeed2014.olLayer);
map.addLayer(truckSpeed2015.olLayer);
map.addLayer(metamanagerSegments.olLayer);
swiper.addLeftLayer(wisDotRegions);
swiper.addRightLayer(metamanagerSegments);
swiper.addLeftLayer(truckSpeed2014);
swiper.addRightLayer(truckSpeed2015);
//# sourceMappingURL=compare-test.js.map