(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './quickMapBase', '../util/provide', './mapMove', './mapPopup'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./quickMapBase'), require('../util/provide'), require('./mapMove'), require('./mapPopup'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.quickMapBase, global.provide, global.mapMove, global.mapPopup);
    global.quickMap = mod.exports;
  }
})(this, function (module, exports, _quickMapBase, _provide, _mapMove, _mapPopup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _quickMapBase2 = _interopRequireDefault(_quickMapBase);

  var _provide2 = _interopRequireDefault(_provide);

  var _mapMove2 = _interopRequireDefault(_mapMove);

  var _mapPopup2 = _interopRequireDefault(_mapPopup);

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
    var m = (0, _quickMapBase2.default)(options);
    _mapMove2.default.init(m);
    _mapPopup2.default.init(m);

    return m;
  }

  nm.quickMap = quickMap;
  exports.default = quickMap;
  module.exports = exports['default'];
});