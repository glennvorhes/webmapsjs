(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './quickMapBase', '../util/provide', './mapMoveCls', './mapPopupCls'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./quickMapBase'), require('../util/provide'), require('./mapMoveCls'), require('./mapPopupCls'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.quickMapBase, global.provide, global.mapMoveCls, global.mapPopupCls);
    global.quickMapMulti = mod.exports;
  }
})(this, function (module, exports, _quickMapBase, _provide, _mapMoveCls, _mapPopupCls) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _quickMapBase2 = _interopRequireDefault(_quickMapBase);

  var _provide2 = _interopRequireDefault(_provide);

  var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

  var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Created by gavorhes on 12/15/2015.
   */

  var nm = (0, _provide2.default)('olHelpers');

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
   * @returns {quickMapMultiReturn} return map, map move, and map popup objects
   */
  function quickMapMulti(options) {
    var m = (0, _quickMapBase2.default)(options);
    var mov = new _mapMoveCls2.default();
    var pop = new _mapPopupCls2.default();
    mov.init(m);
    pop.init(m);

    return { map: m, mapMove: mov, mapPopup: pop };
  }

  nm.quickMapMulti = quickMapMulti;
  exports.default = quickMapMulti;
  module.exports = exports['default'];
});