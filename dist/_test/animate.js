"use strict";
var quickMap_1 = require('../olHelpers/quickMap');
var LayerRealEarthTile_1 = require("../layers/LayerRealEarthTile");
var media_control_1 = require("../domUtil/media-control");
var $ = require('jquery');
var nexrhresStatic = new LayerRealEarthTile_1.default({
    products: 'nexrhres',
    id: 'nexrhres-static',
    opacity: 0.6,
    animate: true,
    name: 'Hybrid Reflectivity',
    // maxZoom: 10,
    timeLoadCallback: function (f) { console.log(f); }
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
//# sourceMappingURL=animate.js.map