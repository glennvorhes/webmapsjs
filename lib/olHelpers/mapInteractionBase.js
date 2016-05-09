'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/8/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */

    }, {
        key: '_checkInit',


        /**
         * Check the initialization status and throw exception if not valid yet
         * @protected
         */
        value: function _checkInit() {
            if (!this.initialized) {
                var msg = this._subtype + ' object not initialized';
                alert(msg);
                console.log(msg);
                throw msg;
            }
        }

        /**
         * Check the initialization status and throw exception if not valid yet
         */

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

        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */

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