"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var quickMapBase_1 = require("./quickMapBase");
var provide_1 = require("../util/provide");
var mapMoveCls_1 = require("./mapMoveCls");
var mapPopupCls_1 = require("./mapPopupCls");
var nm = provide_1.default('olHelpers');
/**
 * @typedef {object} quickMapMultiReturn
 * @property {ol.Map} map The X Coordinate
 * @property {MapMoveCls} mapMove The Y Coordinate
 * @property {MapPopupCls} mapPopup The Y Coordinate
 */
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
 * @returns return object with map, map move, and map popup objects
 */
function quickMapMulti(options) {
    var m = quickMapBase_1.quickMapBase(options);
    var mov = new mapMoveCls_1.default();
    var pop = new mapPopupCls_1.default();
    mov.init(m);
    pop.init(m);
    return { map: m, mapMove: mov, mapPopup: pop };
}
nm.quickMapMulti = quickMapMulti;
exports.default = quickMapMulti;
//# sourceMappingURL=quickMapMulti.js.map