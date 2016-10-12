"use strict";
var quickMap_1 = require('../olHelpers/quickMap');
var LayerRealEarthTile_1 = require("../layers/LayerRealEarthTile");
var media_control_1 = require("../domUtil/media-control");
var $ = require('jquery');
var LayerBaseVectorEsri_1 = require("../layers/LayerBaseVectorEsri");
var LayerEsriMapServer_1 = require("../layers/LayerEsriMapServer");
var nexrhresStatic = new LayerRealEarthTile_1.default({
    products: 'nexrhres',
    id: 'nexrhres-static',
    opacity: 0.6,
    animate: true,
    name: 'Hybrid Reflectivity',
    // maxZoom: 10,
    timeLoadCallback: function (f) {
        console.log(f);
    }
});
var d = new Date();
var endTime = d.getTime();
d.setHours(d.getHours() - 4);
var startTime = d.getTime();
var rangeStep = Math.round((endTime - startTime) / 8);
var media = new media_control_1.MediaControl($('#control'), function (v) {
    nexrhresStatic.setLayerTime(v);
}, {
    min: startTime,
    max: endTime,
    val: endTime,
    step: rangeStep,
    playInterval: 750,
    showAsDate: true
});
var map = quickMap_1.quickMap();
map.addLayer(nexrhresStatic.olLayer);
var coordinationLayer = new LayerBaseVectorEsri_1.LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GlrtocCoordination/MapServer/0', {
    visible: true,
    autoLoad: true,
    name: 'Coordination',
    useEsriStyle: true
});
map.addLayer(coordinationLayer.olLayer);
var oakRidgeLayers = [
    ['Cameras', 'cameras33'],
    ['HAR', 'HAR33'],
    ['DMS', 'MessageSigns33'],
    //['State Summary', 'statesummary'],
    ['Traffic Control', 'TrafficControl33'],
    ['Traffic Detection', 'TrafficDetectionMulti'],
    ['Weather', 'Weather33']
];
for (var i = 0; i < oakRidgeLayers.length; i++) {
    var oakRidgeLayer = new LayerEsriMapServer_1.LayerEsriMapServer("http://itsdpro.ornl.gov/arcgis/rest/services/ITSPublic/" + oakRidgeLayers[i][1] + "/MapServer", {
        id: oakRidgeLayers[i][1],
        name: oakRidgeLayers[i][0],
        visible: true,
        minZoom: 7,
        zIndex: 20,
        addPopup: true,
        legendCollapse: true
    });
    map.addLayer(oakRidgeLayer.olLayer);
}
//# sourceMappingURL=animate.js.map