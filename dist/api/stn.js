/**
 * Created by glenn on 6/13/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajx = require("./_axios");
var _host_1 = require("./_host");
function _abortHelper(x) {
    if (x && x['abort']) {
        x.abort();
    }
}
function getRoutes(yr, lon, lat, callback, error) {
    if (error === void 0) { error = function () {
    }; }
    ajx.get(_host_1.stnApi + '/routes', function (d) {
        if (d.error) {
            error(d);
        }
        else {
            callback(d);
        }
    }, { year: yr, lon: lon, lat: lat }, error);
}
exports.getRoutes = getRoutes;
function getSnappedPoint(yr, routeId, lon, lat, callback, error) {
    if (error === void 0) { error = function () {
    }; }
    ajx.get(_host_1.stnApi + '/snapped', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, { year: yr, route: routeId, lon: lon, lat: lat }, error);
}
exports.getSnappedPoint = getSnappedPoint;
function getStnSegment(yr, routeId, lonStart, latStart, lonEnd, latEnd, callback, error) {
    if (error === void 0) { error = function () {
    }; }
    ajx.get(_host_1.stnApi + '/segment', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, { year: yr, route: routeId, lonStart: lonStart, latStart: latStart, lonEnd: lonEnd, latEnd: latEnd }, error);
}
exports.getStnSegment = getStnSegment;
//# sourceMappingURL=stn.js.map