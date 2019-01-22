"use strict";
/**
 * Created by glenn on 6/13/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var emptyGeojson = {
    crs: {
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        type: 'name'
    },
    type: "FeatureCollection",
    features: []
};
exports.emptyGeometry = {
    geom: emptyGeojson,
    roads: []
};
exports.emptyRoute = {
    roads: [],
    line: emptyGeojson,
    points: emptyGeojson,
    totalDistance: -1,
    lengths: {},
    speed: { count: 0, dates: [], free: {}, values: {}, std: {} }
};
//# sourceMappingURL=_npmrdsEmpty.js.map