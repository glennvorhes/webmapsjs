(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './ol-build'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./ol-build'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.olBuild);
    global.ol = mod.exports;
  }
})(this, function (module, exports, ol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ol;
  module.exports = exports['default'];
});