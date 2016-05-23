'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nm = (0, _provide2.default)('layers');

/**
 * The make mapMoveGetParams function takes the extent and the zoom level
 * context is 'this' object, probably want to do something with this.mapMoveParams
 * @callback mapMoveMakeGetParams
 * @param {LayerBaseVector} lyr
 * @param {object} extent
 * @param {number} extent.minX
 * @param {number} extent.minY
 * @param {number} extent.maxX
 * @param {number} extent.maxY
 * @param {number} zoomLevel
 */

/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */

var LayerBaseVector = function (_LayerBase) {
    _inherits(LayerBaseVector, _LayerBase);

    /**
     * The base vector layer
     * @param {string} url - pass an empty string to prevent default load and add from a json source
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     */

    function LayerBaseVector(url, options) {
        _classCallCheck(this, LayerBaseVector);

        //prevent regular load if no url has been provided

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVector).call(this, url, options));

        if (_this.url.trim() == '') {
            _this._loaded = true;
        }

        _this._style = typeof options.style == 'undefined' ? undefined : options.style;

        if (_this.visible) {
            _this._autoLoad = true;
        } else {
            _this._autoLoad = typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false;
        }

        _this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        _this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;

        if (options.mapMoveObj) {
            _this._mapMove = options.mapMoveObj;
        } else {
            _this._mapMove = _this._onDemand ? _mapMove2.default : undefined;
        }

        _this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams : function (lyr, extent, zoomLevel) {
            return {};
        };

        if (_this._onDemand) {
            _this._loaded = true;
            _this._mapMoveParams = {};
            _this._mapMove.checkInit();
            _this._mapMove.addVectorLayer(_this);
        }

        _this._source = new _ol2.default.source.Vector();

        /**
         *
         * @type {ol.layer.Vector|ol.layer.Base}
         */
        _this.olLayer = new _ol2.default.layer.Vector({
            source: _this._source,
            visible: _this.visible,
            style: _this.style,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution,
            zIndex: _this._zIndex
        });
        return _this;
    }

    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */


    _createClass(LayerBaseVector, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            console.log('Layer vector base addFeatures is a placeholder and does nothing');
        }

        /**
         * Before call to map move callback, can prevent call by returning false
         * @param {number} zoom - zoom level
         * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
         * @returns {boolean} if the call should proceed
         */

    }, {
        key: 'mapMoveBefore',
        value: function mapMoveBefore(zoom, evtType) {
            if (this.minZoom !== undefined) {
                if (zoom < this.minZoom) {
                    return false;
                }
            }

            if (this.maxZoom !== undefined) {
                if (zoom > this.maxZoom) {
                    return false;
                }
            }

            return this.visible;
        }

        /**
         * callback to generate the parameters passed in the get request
         * @param {object} extent - extent object
         * @param {number} extent.minX - minX
         * @param {number} extent.minY - minY
         * @param {number} extent.maxX - maxX
         * @param {number} extent.maxY - maxY
         * @param {number} zoomLevel - zoom level
         */

    }, {
        key: 'mapMoveMakeGetParams',
        value: function mapMoveMakeGetParams(extent, zoomLevel) {
            this._mapMoveParams = {};
            _jquery2.default.extend(this._mapMoveParams, this.params);
            _jquery2.default.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
        }

        /**
         * callback function on map move
         * @param {object} d - the json response
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            if (this.source) {
                this._source.clear();
            }
        }

        /**
         * clear features in the layer
         */

    }, {
        key: 'clear',
        value: function clear() {
            if (this._source) {
                this._source.clear();
            }
        }

        /**
         * get on demand delay in miliseconds
         * @type {number|*}
         */

    }, {
        key: 'onDemandDelay',
        get: function get() {
            return this._onDemandDelay;
        }

        /**
         * get if the layer is autoloaded
         * @type {boolean}
         */

    }, {
        key: 'autoLoad',
        get: function get() {
            return this._autoLoad;
        }

        /**
         * get the style definition
         * @type {ol.Style|styleFunc}
         */

    }, {
        key: 'style',
        get: function get() {
            return this._style;
        }

        /**
         * set the style
         * @param {ol.Style|styleFunc} style - the style or function
         */
        ,
        set: function set(style) {
            this._style = style;
            this.olLayer.setStyle(this._style);
        }

        /**
         * get the map CRS if it is defined by the map move object
         * @type {string|*}
         */

    }, {
        key: 'mapCrs',
        get: function get() {
            if (this._mapMove) {
                return this._mapMove.map.getView().getProjection().getCode();
            } else {
                return undefined;
            }
        }

        /**
         * get the map move object
         * @type {MapMoveCls|*}
         */

    }, {
        key: 'mapMove',
        get: function get() {
            return this._mapMove;
        }

        /**
         * map move params
         * @type {object}
         */

    }, {
        key: 'mapMoveParams',
        get: function get() {
            return this._mapMoveParams;
        }

        /**
        * Get the layer visibility
        * @type {boolean}
        */

    }, {
        key: 'visible',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseVector.prototype), 'visible', this);
        }

        /**
         * Set the layer visibility
         * @type {boolean}
         * @override
         */
        ,
        set: function set(visibility) {
            _set(Object.getPrototypeOf(LayerBaseVector.prototype), 'visible', visibility, this);

            if (this._onDemand) {
                this.mapMove.triggerLyrLoad(this);
            }
        }

        /**
         * get the layer vector source
         * @override
         * @type {ol.source.Vector}
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseVector.prototype), 'source', this);
        }

        /**
         * array of ol features
         * @type {Array.<ol.Feature>}
         */

    }, {
        key: 'features',
        get: function get() {
            return this.source.getFeatures();
        }
    }]);

    return LayerBaseVector;
}(_LayerBase3.default);

nm.LayerBaseVector = LayerBaseVector;
exports.default = LayerBaseVector;
module.exports = exports['default'];