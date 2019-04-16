"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 1/4/2016.
 */
var provide_1 = require("../util/provide");
var Style_1 = require("ol/style/Style");
var Circle_1 = require("ol/style/Circle");
var Stroke_1 = require("ol/style/Stroke");
var Fill_1 = require("ol/style/Fill");
var Icon_1 = require("ol/style/Icon");
var nm = provide_1.default('olHelpers.esriToOlStyle');
/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";
    return "rgba(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + "," + opacity + ")";
}
/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
nm.htmlEscape = htmlEscape;
var CommonSymbol = /** @class */ (function () {
    /**
     *
     * @param symbolObj
     * @param {number} opacity
     */
    function CommonSymbol(symbolObj, opacity) {
        this.symbolObj = symbolObj;
        this.opacity = opacity;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return CommonSymbol;
}());
var PointSymbol = /** @class */ (function (_super) {
    __extends(PointSymbol, _super);
    function PointSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                var radius = _this.symbolObj.size;
                _this.olStyle = new Style_1.default({
                    image: new Circle_1.default({
                        radius: radius,
                        fill: new Fill_1.default({
                            color: innerColor
                        }),
                        stroke: new Stroke_1.default({ color: outerColor, width: outlineWidth })
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
                break;
            case 'esriPMS':
                _this.olStyle = new Style_1.default({
                    image: new Icon_1.default({ src: "data:image/png;base64," + _this.symbolObj['imageData'] })
                });
                _this.legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + _this.symbolObj['imageData'] + "\">";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PointSymbol;
}(CommonSymbol));
var LineSymbol = /** @class */ (function (_super) {
    __extends(LineSymbol, _super);
    function LineSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var lineWidth = _this.symbolObj.width;
                _this.olStyle = new Style_1.default({
                    stroke: new Stroke_1.default({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 4px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: -1px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return LineSymbol;
}(CommonSymbol));
var PolygonSymbol = /** @class */ (function (_super) {
    __extends(PolygonSymbol, _super);
    function PolygonSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                _this.olStyle = new Style_1.default({
                    stroke: new Stroke_1.default({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new Fill_1.default({
                        color: innerColor
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "border: solid " + outerColor + " 1px;";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 9px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: 2px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PolygonSymbol;
}(CommonSymbol));
var SymbolGenerator = /** @class */ (function () {
    function SymbolGenerator(esriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return SymbolGenerator;
}());
var SingleSymbol = /** @class */ (function (_super) {
    __extends(SingleSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    function SingleSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.symbol = _this.renderer.symbol;
        var symbolObj = new SymbolClass(_this.symbol, _this.opacity);
        _this.olStyle = symbolObj.olStyle;
        _this.legendHtml = symbolObj.legendHtml;
        return _this;
    }
    return SingleSymbol;
}(SymbolGenerator));
var UniqueValueSymbol = /** @class */ (function (_super) {
    __extends(UniqueValueSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    function UniqueValueSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.uniqueValueInfos = _this.renderer.uniqueValueInfos;
        _this.propertyName = _this.renderer.field1;
        _this.defaultSymbol = _this.renderer.defaultSymbol;
        if (_this.defaultSymbol) {
            var symbolObj = new SymbolClass(_this.defaultSymbol, _this.opacity);
            _this.defaultStyle = symbolObj.olStyle;
            _this.defaultLabelHtml = "<span class=\"legend-layer-subitem\">" + htmlEscape(_this.renderer['defaultLabel']) + "</span>" + symbolObj.legendHtml;
        }
        else {
            _this.defaultStyle = undefined;
            _this.defaultLabelHtml = 'other';
        }
        _this.valueArray = [];
        _this.labelArray = [];
        _this.legendArray = [];
        _this.propertyStyleLookup = {};
        for (var _i = 0, _a = _this.uniqueValueInfos; _i < _a.length; _i++) {
            var uniqueVal = _a[_i];
            _this.labelArray.push(uniqueVal['label']);
            _this.valueArray.push(uniqueVal['value']);
            var uniqueSym = new SymbolClass(uniqueVal.symbol, _this.opacity);
            _this.legendArray.push("<span class=\"legend-layer-subitem\">" + htmlEscape(uniqueVal['label']) + "</span>" + uniqueSym.legendHtml);
            _this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
        }
        _this.olStyle = function (feature) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                return [_this.propertyStyleLookup[checkProperty]];
            }
            else {
                return [_this.defaultStyle];
            }
        };
        if (_this.defaultLabelHtml !== null) {
            _this.legendArray.push(_this.defaultLabelHtml);
        }
        _this.legendHtml = '<ul>';
        for (var _b = 0, _c = _this.legendArray; _b < _c.length; _b++) {
            var h = _c[_b];
            _this.legendHtml += "<li>" + h + "</li>";
        }
        _this.legendHtml += '</ul>';
        return _this;
    }
    return UniqueValueSymbol;
}(SymbolGenerator));
function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";
    var renderer = esriResponse.drawingInfo.renderer;
    var symbolLegendOut = null;
    switch (renderer.type) {
        case 'simple':
            switch (esriResponse.geometryType) {
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
                    alert(esriResponse.geometryType + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse.geometryType) {
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
    }
    else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [skipLayerNameAndExpander=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, skipLayerNameAndExpander) {
    if (skipLayerNameAndExpander === void 0) { skipLayerNameAndExpander = false; }
    skipLayerNameAndExpander = typeof skipLayerNameAndExpander == 'boolean' ? skipLayerNameAndExpander : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';
    if (!skipLayerNameAndExpander) {
        legendHtml += "<span class=\"legend-layer-subitem\">" + layerName + "</span>";
    }
    if (legendItems.length == 1) {
        legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[0]['imageData'] + "\">";
    }
    else {
        if (!skipLayerNameAndExpander) {
            legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>';
        }
        legendHtml += '<ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += "<li>";
            legendHtml += "<span class=\"legend-layer-subitem\">" + htmlEscape(legendItems[i]['label']) + "</span>";
            legendHtml += "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[i]['imageData'] + "\">";
            legendHtml += "</li>";
        }
        legendHtml += '</ul>';
    }
    if (!skipLayerNameAndExpander) {
        legendHtml = "<span class=\"legend-layer-subitem\">" + layerName + "</span>" + legendHtml;
    }
    return legendHtml;
}
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @param  showLayers - limited number of layers to show in map service
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse, showLayers) {
    "use strict";
    if (showLayers === void 0) { showLayers = []; }
    var newLegendHtml = '';
    var layers = esriResponse['layers'];
    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    }
    else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            if (showLayers.length > 0 && showLayers.indexOf(i) < 0) {
                continue;
            }
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }
    return newLegendHtml;
}
exports.makeMapServiceLegend = makeMapServiceLegend;
nm.makeMapServiceLegend = makeMapServiceLegend;
//# sourceMappingURL=esriToOlStyle.js.map