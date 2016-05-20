(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './provide'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./provide'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.provide);
    global.makeGuid = mod.exports;
  }
})(this, function (module, exports, _provide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _provide2 = _interopRequireDefault(_provide);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var nm = (0, _provide2.default)('util');

  /**
   * guids are used to uniquely identify groups and features
   * @returns {string} a new guid
   */
  /**
   * Created by gavorhes on 11/3/2015.
   */

  function makeGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;

      return v.toString(16);
    });
  }
  nm.makeGuid = makeGuid;
  exports.default = makeGuid;
  module.exports = exports['default'];
});