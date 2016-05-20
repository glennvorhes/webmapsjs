(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../util/provide'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../util/provide'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.provide);
        global.mapInteractionBase = mod.exports;
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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var nm = (0, _provide2.default)('olHelpers');

    /**
     * base interaction
     */

    var MapInteractionBase = function () {

        /**
         * map interaction base
         * @param {string} subtype - the interaction subtype
         */

        function MapInteractionBase(subtype) {
            _classCallCheck(this, MapInteractionBase);

            this._map = undefined;
            this._initialized = false;
            this._subtype = subtype;
        }

        /**
         * base initializer, returns true for already initialized
         * @param {ol.Map} theMap - the ol Map
         * @returns {boolean} true for already initialized
         */


        _createClass(MapInteractionBase, [{
            key: 'init',
            value: function init(theMap) {
                if (!this._initialized) {
                    this._map = theMap;
                    this._initialized = true;

                    return false;
                }

                return true;
            }
        }, {
            key: '_checkInit',
            value: function _checkInit() {
                if (!this.initialized) {
                    var msg = this._subtype + ' object not initialized';
                    alert(msg);
                    console.log(msg);
                    throw msg;
                }
            }
        }, {
            key: 'checkInit',
            value: function checkInit() {
                this._checkInit();
            }
        }, {
            key: 'map',
            get: function get() {
                return this._map;
            }
        }, {
            key: 'initialized',
            get: function get() {
                return this._initialized;
            }
        }]);

        return MapInteractionBase;
    }();

    nm.MapInteractionBase = MapInteractionBase;
    exports.default = MapInteractionBase;
    module.exports = exports['default'];
});