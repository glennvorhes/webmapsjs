'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVector2 = require('./LayerBaseVector');

var _LayerBaseVector3 = _interopRequireDefault(_LayerBaseVector2);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/2/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('layers');

/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */

var LayerBaseVectorGeoJson = function (_LayerBaseVector) {
    _inherits(LayerBaseVectorGeoJson, _LayerBaseVector);

    /**
     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
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
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     */

    function LayerBaseVectorGeoJson(url, options) {
        _classCallCheck(this, LayerBaseVectorGeoJson);

        url = typeof url == 'string' ? url : '';

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVectorGeoJson).call(this, url, options));

        _this._geoJsonFormat = new _ol2.default.format.GeoJSON();

        _this._transform = options.transform || {};
        _this._transform.dataProjection = _this._transform.dataProjection || "EPSG:4326";
        _this._transform.featureProjection = _this._transform.featureProjection || "EPSG:3857";

        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        return _this;
    }

    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */


    _createClass(LayerBaseVectorGeoJson, [{
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            if (this._transform.dataProjection == 'EPSG:3857' && this._transform.featureProjection == 'EPSG:3857') {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
            } else {
                this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, this._transform));
            }
        }

        /**
         * trigger load features
         * @protected
         * @returns {boolean} if already loaded
         */

    }, {
        key: '_load',
        value: function _load() {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), '_load', this).call(this)) {
                return true;
            }

            _jquery2.default.get(this._url, this._params, function (d) {
                _this2.addFeatures(d);
                _this2.loadCallback(_this2);
            }, 'json').fail(function () {
                this._loaded = false;
            });

            return false;
        }

        /**
         * callback function on map move
         * @param {object} d the json response
         * @override
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            _get(Object.getPrototypeOf(LayerBaseVectorGeoJson.prototype), 'mapMoveCallback', this).call(this, d);
            this._source.addFeatures(this._geoJsonFormat.readFeatures(d, this._transform));
        }
    }]);

    return LayerBaseVectorGeoJson;
}(_LayerBaseVector3.default);

nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;
module.exports = exports['default'];