/**
 * Created by gavorhes on 12/15/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quickMapBase_1 = require("./quickMapBase");
var provide_1 = require("../util/provide");
var mapMove_1 = require("./mapMove");
var mapPopup_1 = require("./mapPopup");
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
function quickMap(options) {
    if (options === void 0) { options = {}; }
    var m = quickMapBase_1.quickMapBase(options);
    mapMove_1.default.init(m);
    mapPopup_1.default.init(m);
    return m;
}
exports.quickMap = quickMap;
nm.quickMap = quickMap;
exports.default = quickMap;
//# sourceMappingURL=quickMap.js.map