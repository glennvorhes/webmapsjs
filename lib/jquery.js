(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.jquery);
    global.jquery = mod.exports;
  }
})(this, function (module, exports, $) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  global.$ = $;
  global.jQuery = $;

  exports.default = $;
  module.exports = exports['default'];
});