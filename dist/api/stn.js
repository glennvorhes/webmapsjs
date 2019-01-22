"use strict";
/**
 * Created by glenn on 6/13/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ajx = require("./axios");
var host_1 = require("./host");
exports.stnApiUrl = host_1.apiRoot + '/stn';
function _abortHelper(x) {
    if (x && x['abort']) {
        x.abort();
    }
}
/**
 *
 * @param {number} yr
 * @param {number} lon
 * @param {number} lat
 * @param {number} searchDistance
 * @param {(d: iRoutes) => any} callback
 * @param {(e: iError) => any} error
 */
function getRoutes(yr, lon, lat, searchDistance, callback, error) {
    if (searchDistance === void 0) { searchDistance = 200; }
    if (callback === void 0) { callback = function (d) {
        console.log(d);
    }; }
    if (error === void 0) { error = function (e) {
        console.log(e);
    }; }
    ajx.get(exports.stnApiUrl + '/routes', function (d) {
        if (d.error) {
            error(d);
        }
        else {
            callback(d);
        }
    }, {
        year: yr,
        lon: lon,
        lat: lat,
        distance: searchDistance
    }, error);
}
exports.getRoutes = getRoutes;
/**
 *
 * @param {number} yr
 * @param {number} routeId
 * @param {number} lon
 * @param {number} lat
 * @param {number} searchDistance
 * @param {(d) => any} callback
 * @param {(e: iError) => any} error
 */
function getSnappedPoint(yr, routeId, lon, lat, searchDistance, callback, error) {
    if (searchDistance === void 0) { searchDistance = 200; }
    if (callback === void 0) { callback = function (d) {
        console.log(d);
    }; }
    if (error === void 0) { error = function (e) {
        console.log(e);
    }; }
    ajx.get(exports.stnApiUrl + '/snapped', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, {
        year: yr,
        route: routeId,
        lon: lon,
        lat: lat,
        distance: searchDistance
    }, error);
}
exports.getSnappedPoint = getSnappedPoint;
/**
 *
 * @param {number} yr
 * @param {number} routeId
 * @param {number} lonStart
 * @param {number} latStart
 * @param {number} lonEnd
 * @param {number} latEnd
 * @param {number} searchDistance
 * @param {(d) => any} callback
 * @param {(e: iError) => any} error
 */
function getStnSegment(yr, routeId, lonStart, latStart, lonEnd, latEnd, searchDistance, callback, error) {
    if (searchDistance === void 0) { searchDistance = 200; }
    if (callback === void 0) { callback = function (d) {
        console.log(d);
    }; }
    if (error === void 0) { error = function (e) {
        console.log(e);
    }; }
    ajx.get(exports.stnApiUrl + '/segment', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, {
        year: yr,
        route: routeId,
        lonStart: lonStart,
        latStart: latStart,
        lonEnd: lonEnd,
        latEnd: latEnd,
        distance: searchDistance
    }, error);
}
exports.getStnSegment = getStnSegment;
function getStnSegmentByMiles(yr, routeId, startMile, endMile, callback, error) {
    if (callback === void 0) { callback = function (d) {
        console.log(d);
    }; }
    if (error === void 0) { error = function (e) {
        console.log(e);
    }; }
    ajx.get(exports.stnApiUrl + '/segment', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, {
        year: yr,
        route: routeId,
        startMile: startMile,
        endMile: endMile
    }, error);
}
exports.getStnSegmentByMiles = getStnSegmentByMiles;
function getStnYears(callback, error) {
    if (callback === void 0) { callback = function (d) {
        console.log(d);
    }; }
    if (error === void 0) { error = function (e) {
        console.log(e);
    }; }
    ajx.get(exports.stnApiUrl + '/years', function (d) {
        if (d['error']) {
            error(d);
        }
        else {
            callback(d);
        }
    }, error);
}
exports.getStnYears = getStnYears;
//# sourceMappingURL=stn.js.map