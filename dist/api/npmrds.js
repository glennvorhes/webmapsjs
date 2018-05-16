/**
 * Created by glenn on 6/13/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajx = require("./_axios");
var empty = require("./_npmrdsEmpty");
var host_1 = require("./host");
exports.npmrdsApiUrl = host_1.apiRoot + '/npmrds';
function _abortHelper(x) {
    if (x && x['abort']) {
        x.abort();
    }
}
function makeExtent(ext) {
    if (!ext) {
        return null;
    }
    if (ext.coordinates) {
        if (ext.coordinates.length < 4) {
            throw "npmrds api: coordinate array must have at least 3 vertices, last one closing";
        }
        return JSON.stringify(ext.coordinates);
    }
    else if (ext.bottom && ext.top && ext.left && ext.right) {
        var bottom_left = [ext.left, ext.bottom];
        var ext_arr = [bottom_left];
        ext_arr.push([ext.left, ext.top]);
        ext_arr.push([ext.right, ext.top]);
        ext_arr.push([ext.right, ext.bottom]);
        ext_arr.push(bottom_left);
        return JSON.stringify(ext_arr);
    }
    else {
        return undefined;
    }
}
function getRoads(extent, version, callback, error) {
    if (error === void 0) { error = function () {
    }; }
    var ext = makeExtent(extent);
    if (ext == null) {
        callback({ roads: [] });
    }
    else if (ext) {
        var params = { extent: makeExtent(extent), version: version };
        ajx.get(exports.npmrdsApiUrl + '/roads', function (d) {
            if (d.error) {
                error(d);
            }
            else {
                callback(d);
            }
        }, params, error);
    }
    else {
        error({ error: "invalid extent" });
    }
}
exports.getRoads = getRoads;
function getGeometry(extent, version, callback, options, error) {
    if (options === void 0) { options = {}; }
    if (error === void 0) { error = function () {
    }; }
    var ext = makeExtent(extent);
    if (ext == null) {
        callback(empty.emptyGeometry);
    }
    else if (typeof ext == 'undefined') {
        error({ error: "Invalid Extent" });
    }
    else {
        var params = { extent: ext, version: version };
        if (options.roadDirection) {
            params['road'] = options.roadDirection.road;
            params['direction'] = options.roadDirection.direction;
        }
        if (options.startEnd) {
            params['start'] = options.startEnd.start;
            params['end'] = options.startEnd.end;
        }
        ajx.get(exports.npmrdsApiUrl + '/geometry', function (d) {
            if (d.error) {
                error(d);
            }
            else {
                callback(d);
            }
        }, params, error);
    }
}
exports.getGeometry = getGeometry;
function getRoute(road, direction, version, callback, options, error) {
    if (options === void 0) { options = {}; }
    if (error === void 0) { error = function () {
    }; }
    var params = { road: road, direction: direction, version: version };
    var ext;
    if (options.extent) {
        ext = makeExtent(options.extent);
        if (ext == null) {
            callback(empty.emptyRoute);
            return;
        }
        else if (typeof ext == 'undefined') {
            error({ error: "Invalid Extent" });
            return;
        }
    }
    if (ext) {
        params['extent'] = ext;
    }
    if (options.startEnd) {
        params['start'] = options.startEnd.start;
        params['end'] = options.startEnd.end;
    }
    ajx.get(exports.npmrdsApiUrl + '/route', function (d) {
        if (d.error) {
            error(d);
        }
        else {
            callback(d);
        }
    }, params, error);
}
exports.getRoute = getRoute;
function getTmcs(lon, lat, version, searchDist, callback, error) {
    if (searchDist === void 0) { searchDist = 2000; }
    if (error === void 0) { error = function () {
    }; }
    var params = { lon: lon, lat: lat, version: version, search: searchDist };
    ajx.get(exports.npmrdsApiUrl + '/tmcs', function (d) {
        if (d.error) {
            error(d);
        }
        else {
            callback(d);
        }
    }, params, error);
}
exports.getTmcs = getTmcs;
function getTmc(tmc, version, callback, error) {
    if (error === void 0) { error = function () {
    }; }
    var params = { tmc: tmc, version: version };
    ajx.get(exports.npmrdsApiUrl + '/tmc', function (d) {
        if (d.error) {
            error(d);
        }
        else {
            callback(d);
        }
    }, params, error);
}
exports.getTmc = getTmc;
//# sourceMappingURL=npmrds.js.map