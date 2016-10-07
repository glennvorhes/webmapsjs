"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 1/4/2016.
 */
var provide_1 = require('../util/provide');
var custom_ol_1 = require('custom-ol');
var nm = provide_1.default('olHelpers.esriToOlStyle');
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
var CommonSymbol = (function () {
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
var PointSymbol = (function (_super) {
    __extends(PointSymbol, _super);
    function PointSymbol(symbolObj, opacity) {
        _super.call(this, symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                var outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                var outlineWidth = this.symbolObj.outline.width;
                var radius = this.symbolObj.size;
                this.olStyle = new custom_ol_1.default.style.Style({
                    image: new custom_ol_1.default.style.Circle({
                        radius: radius,
                        fill: new custom_ol_1.default.style.Fill({
                            color: innerColor
                        }),
                        stroke: new custom_ol_1.default.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
                break;
            case 'esriPMS':
                this.olStyle = new custom_ol_1.default.style.Style({
                    image: new custom_ol_1.default.style.Icon({ src: "data:image/png;base64," + this.symbolObj['imageData'] })
                });
                this.legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + this.symbolObj['imageData'] + "\">";
                break;
            default:
                console.log(this.symbolObj);
                alert('Point symbol does not handle symbol type: ' + this.symbolObj['type']);
        }
    }
    return PointSymbol;
}(CommonSymbol));
var LineSymbol = (function (_super) {
    __extends(LineSymbol, _super);
    function LineSymbol(symbolObj, opacity) {
        _super.call(this, symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                var lineWidth = this.symbolObj.width;
                this.olStyle = new custom_ol_1.default.style.Style({
                    stroke: new custom_ol_1.default.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });
                this.legendHtml = "<span class=\"legend-layer-icon\" ";
                this.legendHtml += "style=\"";
                this.legendHtml += "background-color: " + innerColor + ";";
                this.legendHtml += "width: 40px;";
                this.legendHtml += "height: 4px;";
                this.legendHtml += "position: relative;";
                this.legendHtml += "display: inline-block;";
                this.legendHtml += "top: -1px;";
                this.legendHtml += "\"></span>";
                break;
            default:
                console.log(this.symbolObj);
                alert('Line symbol does not handle symbol type: ' + this.symbolObj['type']);
        }
    }
    return LineSymbol;
}(CommonSymbol));
var PolygonSymbol = (function (_super) {
    __extends(PolygonSymbol, _super);
    function PolygonSymbol(symbolObj, opacity) {
        _super.call(this, symbolObj, opacity);
        switch (this.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                var outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                var outlineWidth = this.symbolObj.outline.width;
                this.olStyle = new custom_ol_1.default.style.Style({
                    stroke: new custom_ol_1.default.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new custom_ol_1.default.style.Fill({
                        color: innerColor
                    })
                });
                this.legendHtml = "<span class=\"legend-layer-icon\" ";
                this.legendHtml += "style=\"";
                this.legendHtml += "background-color: " + innerColor + ";";
                this.legendHtml += "border: solid " + outerColor + " 1px;";
                this.legendHtml += "width: 40px;";
                this.legendHtml += "height: 9px;";
                this.legendHtml += "position: relative;";
                this.legendHtml += "display: inline-block;";
                this.legendHtml += "top: 2px;";
                this.legendHtml += "\"></span>";
                break;
            default:
                console.log(this.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + this.symbolObj['type']);
        }
    }
    return PolygonSymbol;
}(CommonSymbol));
var SymbolGenerator = (function () {
    function SymbolGenerator(esriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return SymbolGenerator;
}());
var SingleSymbol = (function (_super) {
    __extends(SingleSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    function SingleSymbol(esriResponse, SymbolClass) {
        _super.call(this, esriResponse);
        this.symbol = this.renderer.symbol;
        var symbolObj = new SymbolClass(this.symbol, this.opacity);
        this.olStyle = symbolObj.olStyle;
        this.legendHtml = symbolObj.legendHtml;
    }
    return SingleSymbol;
}(SymbolGenerator));
var UniqueValueSymbol = (function (_super) {
    __extends(UniqueValueSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    function UniqueValueSymbol(esriResponse, SymbolClass) {
        var _this = this;
        _super.call(this, esriResponse);
        this.uniqueValueInfos = this.renderer['uniqueValueInfos'];
        this.propertyName = this.renderer['field1'];
        this.defaultSymbol = this.renderer['defaultSymbol'];
        if (this.defaultSymbol) {
            var symbolObj = new SymbolClass(this.defaultSymbol, this.opacity);
            this.defaultStyle = symbolObj.olStyle;
            this.defaultLabelHtml = ("<span class=\"legend-layer-subitem\">" + htmlEscape(this.renderer['defaultLabel']) + "</span>") + symbolObj.legendHtml;
        }
        else {
            this.defaultStyle = undefined;
            this.defaultLabelHtml = 'other';
        }
        this.valueArray = [];
        this.labelArray = [];
        this.legendArray = [];
        this.propertyStyleLookup = {};
        for (var _i = 0, _a = this.uniqueValueInfos; _i < _a.length; _i++) {
            var uniqueVal = _a[_i];
            this.labelArray.push(uniqueVal['label']);
            this.valueArray.push(uniqueVal['value']);
            var uniqueSym = new SymbolClass(uniqueVal.symbol, this.opacity);
            this.legendArray.push(("<span class=\"legend-layer-subitem\">" + htmlEscape(uniqueVal['label']) + "</span>") + uniqueSym.legendHtml);
            this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
        }
        this.olStyle = function (feature) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];
            var returnValue;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            }
            else {
                returnValue = [_this.defaultStyle];
            }
            return returnValue;
        };
        if (this.defaultLabelHtml !== null) {
            this.legendArray.push(this.defaultLabelHtml);
        }
        this.legendHtml = '<ul>';
        for (var _b = 0, _c = this.legendArray; _b < _c.length; _b++) {
            var h = _c[_b];
            this.legendHtml += "<li>" + h + "</li>";
        }
        this.legendHtml += '</ul>';
    }
    return UniqueValueSymbol;
}(SymbolGenerator));
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
        legendHtml = ("<span class=\"legend-layer-subitem\">" + layerName + "</span>") + legendHtml;
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
    }
    else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }
    return newLegendHtml;
}
exports.makeMapServiceLegend = makeMapServiceLegend;
nm.makeMapServiceLegend = makeMapServiceLegend;
//# sourceMappingURL=esriToOlStyle.js.map