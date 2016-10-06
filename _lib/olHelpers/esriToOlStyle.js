'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
exports.makeMapServiceLegend = makeMapServiceLegend;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by gavorhes on 1/4/2016.
                                                                                                                                                           */


var nm = (0, _provide2.default)('olHelpers.esriToOlStyle');

/**
 * This callback is displayed as part of the Requester class.
 * @callback styleFunc
 * @param {ol.Feature} feat - openlayers feature
 * @param {number} resolution - map resolution
 */

/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";

    return 'rgba(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ',' + opacity + ')';
}

/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

nm.htmlEscape = htmlEscape;

var CommonSymbol =

/**
 * 
 * @param symbolObj
 * @param {number} opacity
 */
function CommonSymbol(symbolObj, opacity) {
    _classCallCheck(this, CommonSymbol);

    this.symbolObj = symbolObj;
    this.opacity = opacity;
    this.olStyle = undefined;
    this.legendHtml = '';
};

var PointSymbol = function (_CommonSymbol) {
    _inherits(PointSymbol, _CommonSymbol);

    function PointSymbol(symbolObj, opacity) {
        _classCallCheck(this, PointSymbol);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PointSymbol).call(this, symbolObj, opacity));

        switch (_this2.symbolObj['type']) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this2.symbolObj.color, _this2.opacity);
                var outerColor = _colorArrayToRgba(_this2.symbolObj.outline.color, _this2.opacity);
                var outlineWidth = _this2.symbolObj.outline.width;
                var radius = _this2.symbolObj.size;

                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Circle({
                        radius: radius,
                        fill: new _ol2.default.style.Fill({
                            color: innerColor
                        }),
                        stroke: new _ol2.default.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this2.legendHtml = '<span class="legend-layer-icon" style="color: ' + innerColor + '">&#9679;</span>';
                break;
            case 'esriPMS':
                _this2.olStyle = new _ol2.default.style.Style({
                    image: new _ol2.default.style.Icon({ src: 'data:image/png;base64,' + _this2.symbolObj['imageData'] })
                });
                _this2.legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + _this2.symbolObj['imageData'] + '">';
                break;
            default:
                console.log(_this2.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this2.symbolObj['type']);
        }
        return _this2;
    }

    return PointSymbol;
}(CommonSymbol);

var LineSymbol = function (_CommonSymbol2) {
    _inherits(LineSymbol, _CommonSymbol2);

    function LineSymbol(symbolObj, opacity) {
        _classCallCheck(this, LineSymbol);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(LineSymbol).call(this, symbolObj, opacity));

        switch (_this3.symbolObj['type']) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this3.symbolObj.color, _this3.opacity);
                var lineWidth = _this3.symbolObj.width;

                _this3.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });

                _this3.legendHtml = '<span class="legend-layer-icon" ';
                _this3.legendHtml += 'style="';
                _this3.legendHtml += 'background-color: ' + innerColor + ';';
                _this3.legendHtml += 'width: 40px;';
                _this3.legendHtml += 'height: 4px;';
                _this3.legendHtml += 'position: relative;';
                _this3.legendHtml += 'display: inline-block;';
                _this3.legendHtml += 'top: -1px;';
                _this3.legendHtml += '"></span>';
                break;
            default:
                console.log(_this3.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this3.symbolObj['type']);
        }
        return _this3;
    }

    return LineSymbol;
}(CommonSymbol);

var PolygonSymbol = function (_CommonSymbol3) {
    _inherits(PolygonSymbol, _CommonSymbol3);

    function PolygonSymbol(symbolObj, opacity) {
        _classCallCheck(this, PolygonSymbol);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(PolygonSymbol).call(this, symbolObj, opacity));

        switch (_this4.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this4.symbolObj.color, _this4.opacity);
                var outerColor = _colorArrayToRgba(_this4.symbolObj.outline.color, _this4.opacity);
                var outlineWidth = _this4.symbolObj.outline.width;

                _this4.olStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: innerColor
                    })
                });

                _this4.legendHtml = '<span class="legend-layer-icon" ';
                _this4.legendHtml += 'style="';
                _this4.legendHtml += 'background-color: ' + innerColor + ';';
                _this4.legendHtml += 'border: solid ' + outerColor + ' 1px;';
                _this4.legendHtml += 'width: 40px;';
                _this4.legendHtml += 'height: 9px;';
                _this4.legendHtml += 'position: relative;';
                _this4.legendHtml += 'display: inline-block;';
                _this4.legendHtml += 'top: 2px;';
                _this4.legendHtml += '"></span>';
                break;

            default:
                console.log(_this4.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this4.symbolObj['type']);
        }
        return _this4;
    }

    return PolygonSymbol;
}(CommonSymbol);

var SymbolGenerator = function SymbolGenerator(esriResponse) {
    _classCallCheck(this, SymbolGenerator);

    this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
    this.renderer = esriResponse['drawingInfo']['renderer'];
    this.olStyle = undefined;
    this.legendHtml = '';
};

var SingleSymbol = function (_SymbolGenerator) {
    _inherits(SingleSymbol, _SymbolGenerator);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the symbol class to use
     */

    function SingleSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, SingleSymbol);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleSymbol).call(this, esriResponse));

        _this5.symbol = _this5.renderer['symbol'];
        var symbolObj = new SymbolClass(_this5.symbol, _this5.opacity);
        _this5.olStyle = symbolObj.olStyle;
        _this5.legendHtml = symbolObj.legendHtml;
        return _this5;
    }

    return SingleSymbol;
}(SymbolGenerator);

var UniqueValueSymbol = function (_SymbolGenerator2) {
    _inherits(UniqueValueSymbol, _SymbolGenerator2);

    /**
     *
     * @param {object} esriResponse - layer info
     * @param {Constructor|*} SymbolClass - the Symbol class definition
     */

    function UniqueValueSymbol(esriResponse, SymbolClass) {
        _classCallCheck(this, UniqueValueSymbol);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(UniqueValueSymbol).call(this, esriResponse));

        _this6.uniqueValueInfos = _this6.renderer['uniqueValueInfos'];
        _this6.propertyName = _this6.renderer['field1'];
        _this6.defaultSymbol = _this6.renderer['defaultSymbol'];

        if (_this6.defaultSymbol) {
            var symbolObj = new SymbolClass(_this6.defaultSymbol, _this6.opacity);
            _this6.defaultStyle = symbolObj.olStyle;
            _this6.defaultLabelHtml = '<span class="legend-layer-subitem">' + htmlEscape(_this6.renderer['defaultLabel']) + '</span>' + symbolObj.legendHtml;
        } else {
            _this6.defaultStyle = undefined;
            _this6.defaultLabelHtml = 'other';
        }

        _this6.valueArray = [];
        _this6.labelArray = [];
        _this6.legendArray = [];
        _this6.propertyStyleLookup = {};

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this6.uniqueValueInfos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var uniqueVal = _step.value;

                _this6.labelArray.push(uniqueVal['label']);
                _this6.valueArray.push(uniqueVal['value']);
                var uniqueSym = new SymbolClass(uniqueVal.symbol, _this6.opacity);
                _this6.legendArray.push('<span class="legend-layer-subitem">' + htmlEscape(uniqueVal['label']) + '</span>' + uniqueSym.legendHtml);
                _this6.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _this = _this6;

        _this6.olStyle = function (feature, resolution) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];

            var returnValue = void 0;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            } else {
                returnValue = [_this.defaultStyle];
            }

            return returnValue;
        };

        if (_this6.defaultLabelHtml !== null) {
            _this6.legendArray.push(_this6.defaultLabelHtml);
        }

        _this6.legendHtml = '<ul>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = _this6.legendArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var h = _step2.value;

                _this6.legendHtml += '<li>' + h + '</li>';
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _this6.legendHtml += '</ul>';
        return _this6;
    }

    return UniqueValueSymbol;
}(SymbolGenerator);

/**
 * style and legend object
 * @typedef {object} styleAndLegend
 * @property {styleFunc} style - style function
 * @property {string} legend - legend content
 */

/**
 *
 * @param {object} esriResponse - layer info
 * @returns {styleAndLegend} style and legend object
 */


function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";

    var renderer = esriResponse['drawingInfo']['renderer'];
    var symbolLegendOut = null;

    switch (renderer['type']) {
        case 'simple':
            switch (esriResponse['geometryType']) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new SingleSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new SingleSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new SingleSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse['geometryType']) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        default:
            alert('not handled renderer type: ' + renderer['type']);
    }

    if (symbolLegendOut == null) {
        return { style: undefined, legend: '' };
    } else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}

nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;

/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [iconsOnly=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, iconsOnly) {

    iconsOnly = typeof iconsOnly == 'boolean' ? iconsOnly : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';

    if (legendItems.length == 1) {
        legendHtml = '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[0]['imageData'] + '">';
    } else {
        legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span><ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += '<li>';
            legendHtml += '<span class="legend-layer-subitem">' + htmlEscape(legendItems[i]['label']) + '</span>';
            legendHtml += '<img class="legend-layer-icon" height="17" src="data:image/png;base64,' + legendItems[i]['imageData'] + '">';
            legendHtml += '</li>';
        }
        legendHtml += '</ul>';
    }

    if (!iconsOnly) {
        legendHtml = '<span class="legend-layer-subitem">' + layerName + '</span>' + legendHtml;
    }

    return legendHtml;
}

/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse) {
    "use strict";

    var newLegendHtml = '';

    var layers = esriResponse['layers'];

    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    } else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }

    return newLegendHtml;
}

nm.makeMapServiceLegend = makeMapServiceLegend;