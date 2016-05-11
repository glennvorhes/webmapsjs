'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVector2 = require('./LayerBaseVector');

var _LayerBaseVector3 = _interopRequireDefault(_LayerBaseVector2);

var _esriToOlStyle = require('../olHelpers/esriToOlStyle');

var esriToOl = _interopRequireWildcard(_esriToOlStyle);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/2/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ol = require('../ol/ol');

var nm = (0, _provide2.default)('layers');

/**
 * Base layer for esri vector layers
 * @augments LayerBaseVector
 */

var LayerBaseVectorEsri = (function (_LayerBaseVector) {
    _inherits(LayerBaseVectorEsri, _LayerBaseVector);

    /**
     * The base vector layer
     * @param {string} url - url for source
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
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} [options.where=1=1] the layer filter clause
     * @param {string} [options.outFields=*] comma separated list of output fields, defaults to all
     * @param {string} [options.format=pjson] the format the retrieve the data
     * @param {number} [options.outSR=3857] the output spatial reference, defaults to web mercator
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     * @param {boolean} [options.collapseLegend=false] if the legend should be initially collapsed
     * @param {number} [options.mapMoveMakeGetParams=function(extent, zoomLevel){}] function to create additional map move params
     */

    function LayerBaseVectorEsri(url, options) {
        _classCallCheck(this, LayerBaseVectorEsri);

        if (_typeof(options.params) != 'object') {
            options.params = {};
        }
        options.params['where'] = options.where || '1=1';
        options.params['outFields'] = options.outFields || '*';
        options.params['f'] = options.format || 'pjson';
        options.params['outSR'] = options.outSR || 3857;

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseVectorEsri).call(this, url, options));

        _this._outSR = _this.params['outSR'];
        _this._esriFormat = new ol.format.EsriJSON();

        if (_this._url[_this._url.length - 1] !== '/') {
            _this._url += '/';
        }

        _this._urlCopy = _this.url;
        _this._url += 'query?callback=?';

        if (_this.autoLoad || _this.visible) {
            _this._load();
        }

        _this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;

        if (_this._useEsriStyle) {
            _this.addLegendContent();
        }
        return _this;
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content to add to legend
     */

    _createClass(LayerBaseVectorEsri, [{
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            var _this2 = this;

            if (!this._useEsriStyle) {
                _get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), 'addLegendContent', this).call(this, additionalContent);
            } else {
                _jquery2.default.get(this._urlCopy + '?f=pjson&callback=?', {}, function (d) {
                    if (d['subLayers'].length > 0) {
                        alert('should only use single feature layers, not groups');

                        return;
                    }

                    var newStyleAndLegend = esriToOl.makeFeatureServiceLegendAndSymbol(d);
                    _this2.style = newStyleAndLegend.style;
                    _get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), 'addLegendContent', _this2).call(_this2, newStyleAndLegend.legend);
                }, 'json');
            }
        }

        /**
         * add feature collection
         * @param {object} featureCollection - features as esrijson
         */

    }, {
        key: 'addFeatures',
        value: function addFeatures(featureCollection) {
            var feats = this._esriFormat.readFeatures(featureCollection);
            this.source.addFeatures(feats);
        }

        /**
         * trigger load features
         * @protected
         * @returns {boolean} if already loaded
         */

    }, {
        key: '_load',
        value: function _load() {
            var _this3 = this;

            if (_get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), '_load', this).call(this)) {
                return true;
            }
            _jquery2.default.get(this._url, this.params, function (d) {
                _this3.addFeatures(d);
                _this3.loadCallback(_this3);
            }, 'json').fail(function () {
                _this3._loaded = false;
            });

            return false;
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
            _get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), 'mapMoveMakeGetParams', this).call(this, extent, zoomLevel);
            this.mapMoveParams['geometry'] = extent.minX + ',' + extent.minY + ',' + extent.maxX + ',' + extent.maxY;
            this.mapMoveParams['geometryType'] = 'esriGeometryEnvelope';
            this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
            this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
            this.mapMoveParams['inSR'] = 3857;
            if (this._outSR == 3857) {
                this.mapMoveParams['geometryPrecision'] = 1;
            }
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
            return _get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), 'mapMoveBefore', this).call(this, zoom, evtType);
            //if (super.mapMoveBefore(zoom, evtType)){
            //    //place holder for additional processing
            //    return true;
            //} else {
            //    return false;
            //}
        }

        /**
         * callback function on map move
         * @param {object} d - the json response
         */

    }, {
        key: 'mapMoveCallback',
        value: function mapMoveCallback(d) {
            _get(Object.getPrototypeOf(LayerBaseVectorEsri.prototype), 'mapMoveCallback', this).call(this, d);
            this.source.addFeatures(this._esriFormat.readFeatures(d));
        }
    }]);

    return LayerBaseVectorEsri;
})(_LayerBaseVector3.default);

nm.LayerBaseVectorEsri = LayerBaseVectorEsri;
exports.default = LayerBaseVectorEsri;