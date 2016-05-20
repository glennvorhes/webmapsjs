(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './mapMoveCls'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./mapMoveCls'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mapMoveCls);
    global.mapMove = mod.exports;
  }
})(this, function (module, exports, _mapMoveCls) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = new _mapMoveCls2.default();
  module.exports = exports['default'];
});