'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBase2 = require('./LayerBase');

var _LayerBase3 = _interopRequireDefault(_LayerBase2);

var _esriToOlStyle = require('../olHelpers/esriToOlStyle');

var esriToOl = _interopRequireWildcard(_esriToOlStyle);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 12/4/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ol = require('../ol/ol');
var nm = (0, _provide2.default)('layers');

/**
 * XYZ tile
 * @augments LayerBase
 */

var LayerBaseXyzTile = function (_LayerBase) {
    _inherits(LayerBaseXyzTile, _LayerBase);

    /**
     * The XYZ tile layer
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
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     */

    function LayerBaseXyzTile(url, options) {
        _classCallCheck(this, LayerBaseXyzTile);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerBaseXyzTile).call(this, url, options));

        _this2._source = new ol.source.XYZ({ url: _this2.url == '' ? undefined : _this2.url });
        _this2.olLayer = new ol.layer.Tile({
            source: _this2._source,
            visible: _this2.visible,
            opacity: _this2.opacity,
            minResolution: _this2._minResolution,
            maxResolution: _this2._maxResolution,
            zIndex: _this2._zIndex
        });

        _this2._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;

        if (_this2._useEsriStyle) {
            _this2.addLegendContent();
        }
        return _this2;
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */


    _createClass(LayerBaseXyzTile, [{
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            var _this3 = this;

            if (!this._useEsriStyle) {
                _get(Object.getPrototypeOf(LayerBaseXyzTile.prototype), 'addLegendContent', this).call(this, additionalContent);
            } else {
                var _ret = function () {
                    var urlCopy = _this3.url;

                    var mapServerIndex = urlCopy.toLowerCase().indexOf('mapserver');
                    if (mapServerIndex > -1) {
                        urlCopy = urlCopy.slice(0, mapServerIndex + 9);
                    } else {
                        return {
                            v: void 0
                        };
                    }

                    if (urlCopy[urlCopy.length - 1] !== '/') {
                        urlCopy += '/';
                    }

                    urlCopy += 'legend?f=pjson&callback=?';

                    var _this = _this3;
                    var superAddLegend = _get(Object.getPrototypeOf(LayerBaseXyzTile.prototype), 'addLegendContent', _this3);

                    _jquery2.default.get(urlCopy, {}, function (d) {
                        var newHtml = esriToOl.makeMapServiceLegend(d);
                        superAddLegend.call(_this, newHtml);
                    }, 'json');
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }

        /**
         *
         * @returns {ol.source.XYZ} the vector source
         */

    }, {
        key: 'source',
        get: function get() {
            return _get(Object.getPrototypeOf(LayerBaseXyzTile.prototype), 'source', this);
        }
    }]);

    return LayerBaseXyzTile;
}(_LayerBase3.default);

nm.LayerBaseXyzTile = LayerBaseXyzTile;
exports.default = LayerBaseXyzTile;