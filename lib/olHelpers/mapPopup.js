(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './mapPopupCls'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./mapPopupCls'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mapPopupCls);
    global.mapPopup = mod.exports;
  }
})(this, function (module, exports, _mapPopupCls) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = new _mapPopupCls2.default();
  module.exports = exports['default'];
});