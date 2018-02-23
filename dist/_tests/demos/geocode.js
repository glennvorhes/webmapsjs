"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quickMap_1 = require("../../olHelpers/quickMap");
var mapToBase64_1 = require("../../olHelpers/mapToBase64");
var map = quickMap_1.default({ addGeocode: true });
window['map'] = map;
function callback(d) {
    console.log(d);
}
setTimeout(function () {
    mapToBase64_1.mapToBase64(map, callback, { delay: 1500 });
}, 2000);
console.log('it works');
//# sourceMappingURL=geocode.js.map