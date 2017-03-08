"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 1/4/2016.
 */
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
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
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                var radius = _this.symbolObj.size;
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        fill: new ol.style.Fill({
                            color: innerColor
                        }),
                        stroke: new ol.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
                break;
            case 'esriPMS':
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Icon({ src: "data:image/png;base64," + _this.symbolObj['imageData'] })
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
var LineSymbol = (function (_super) {
    __extends(LineSymbol, _super);
    function LineSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var lineWidth = _this.symbolObj.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
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
var PolygonSymbol = (function (_super) {
    __extends(PolygonSymbol, _super);
    function PolygonSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new ol.style.Fill({
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
        var _this = _super.call(this, esriResponse) || this;
        _this.symbol = _this.renderer.symbol;
        var symbolObj = new SymbolClass(_this.symbol, _this.opacity);
        _this.olStyle = symbolObj.olStyle;
        _this.legendHtml = symbolObj.legendHtml;
        return _this;
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
        var _this = _super.call(this, esriResponse) || this;
        _this.uniqueValueInfos = _this.renderer['uniqueValueInfos'];
        _this.propertyName = _this.renderer['field1'];
        _this.defaultSymbol = _this.renderer['defaultSymbol'];
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
            var returnValue;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            }
            else {
                returnValue = [_this.defaultStyle];
            }
            return returnValue;
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
        legendHtml = "<span class=\"legend-layer-subitem\">" + layerName + "</span>" + legendHtml;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaVRvT2xTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvZXNyaVRvT2xTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7R0FFRztBQUNILDJDQUFzQztBQUN0Qyw4QkFBaUM7QUFDakMsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUg7Ozs7OztHQU1HO0FBQ0gsMkJBQTJCLFVBQVUsRUFBRSxPQUFPO0lBQzFDLFlBQVksQ0FBQztJQUViLE1BQU0sQ0FBQyxVQUFRLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFJLE9BQU8sTUFBRyxDQUFDO0FBQ2pGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsb0JBQW9CLEdBQUc7SUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDYixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztTQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztTQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxFQUFFLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQTRCM0I7SUFNSTs7OztPQUlHO0lBQ0gsc0JBQVksU0FBcUIsRUFBRSxPQUFlO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFD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Q0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEvNC8yMDE2LlxyXG4gKi9cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzLmVzcmlUb09sU3R5bGUnKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNhbGxiYWNrIGlzIGRpc3BsYXllZCBhcyBwYXJ0IG9mIHRoZSBSZXF1ZXN0ZXIgY2xhc3MuXHJcbiAqIEBjYWxsYmFjayBzdHlsZUZ1bmNcclxuICogQHBhcmFtIHtvbC5GZWF0dXJlfSBmZWF0IC0gb3BlbmxheWVycyBmZWF0dXJlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIC0gbWFwIHJlc29sdXRpb25cclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb2xvckFycmF5IC0gaW5wdXQgY29sb3IgYXJyYXlcclxuICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHkgLSB0aGUgb3BhY2l0eSAwIHRvIDFcclxuICogQHJldHVybnMge3N0cmluZ30gcmdiYSBzdHJpbmdcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIF9jb2xvckFycmF5VG9SZ2JhKGNvbG9yQXJyYXksIG9wYWNpdHkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHJldHVybiBgcmdiYSgke2NvbG9yQXJyYXlbMF19LCR7Y29sb3JBcnJheVsxXX0sJHtjb2xvckFycmF5WzJdfSwke29wYWNpdHl9KWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlc2NhcGUgaHRtbCBjaGFyY3RlcnNcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIGlucHV0IHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBlc2NhcGVkIHN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gaHRtbEVzY2FwZShzdHIpIHtcclxuICAgIHJldHVybiBTdHJpbmcoc3RyKVxyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXHJcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XHJcbn1cclxuXHJcbm5tLmh0bWxFc2NhcGUgPSBodG1sRXNjYXBlO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXNyaVJlc3BvbnNle1xyXG4gICAgZHJhd2luZ0luZm86IHtcclxuICAgICAgICByZW5kZXJlcjogRXNyaVJlbmRlcmVyXHJcbiAgICB9LFxyXG4gICAgZ2VvbWV0cnlUeXBlOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFc3JpUmVuZGVyZXJ7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBzeW1ib2w6IEVzcmlTeW1ib2w7XHJcbiAgICB1bmlxdWVWYWx1ZUluZm9zOiBBcnJheTx7bGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSwgc3ltYm9sOiBFc3JpU3ltYm9sfT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXNyaVN5bWJvbHtcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIG91dGxpbmU6e1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcclxuICAgIH0sXHJcbiAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxufVxyXG5cclxuXHJcbmNsYXNzIENvbW1vblN5bWJvbCB7XHJcbiAgICBsZWdlbmRIdG1sOiBzdHJpbmc7XHJcbiAgICBvcGFjaXR5OiBudW1iZXI7XHJcbiAgICBzeW1ib2xPYmo6IEVzcmlTeW1ib2w7XHJcbiAgICBvbFN0eWxlOiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc3ltYm9sT2JqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3BhY2l0eVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1ib2xPYmo6IEVzcmlTeW1ib2wsIG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3ltYm9sT2JqID0gc3ltYm9sT2JqO1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IG9wYWNpdHk7XHJcbiAgICAgICAgdGhpcy5vbFN0eWxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubGVnZW5kSHRtbCA9ICcnO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUNvbW1vblN5bWJvbHtcclxuICAgIG5ldyAoc3ltYm9sT2JqOiBFc3JpU3ltYm9sLCBvcGFjaXR5OiBudW1iZXIpOiBDb21tb25TeW1ib2xcclxufVxyXG5cclxuXHJcbmNsYXNzIFBvaW50U3ltYm9sIGV4dGVuZHMgQ29tbW9uU3ltYm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHN5bWJvbE9iajogRXNyaVN5bWJvbCwgb3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoc3ltYm9sT2JqLCBvcGFjaXR5KTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3ltYm9sT2JqLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZXNyaVNNUyc6XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJDb2xvciA9IF9jb2xvckFycmF5VG9SZ2JhKHRoaXMuc3ltYm9sT2JqLmNvbG9yLCB0aGlzLm9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dGVyQ29sb3IgPSBfY29sb3JBcnJheVRvUmdiYSh0aGlzLnN5bWJvbE9iai5vdXRsaW5lLmNvbG9yLCB0aGlzLm9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dGxpbmVXaWR0aCA9IHRoaXMuc3ltYm9sT2JqLm91dGxpbmUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzID0gdGhpcy5zeW1ib2xPYmouc2l6ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbFN0eWxlID0gbmV3IG9sLnN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2wuc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaW5uZXJDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtjb2xvcjogb3V0ZXJDb2xvciwgd2lkdGg6IG91dGxpbmVXaWR0aH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBzdHlsZT1cImNvbG9yOiAke2lubmVyQ29sb3J9XCI+JiM5Njc5Ozwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VzcmlQTVMnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbFN0eWxlID0gbmV3IG9sLnN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLkljb24oe3NyYzogYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke3RoaXMuc3ltYm9sT2JqWydpbWFnZURhdGEnXX1gfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gYDxpbWcgY2xhc3M9XCJsZWdlbmQtbGF5ZXItaWNvblwiIGhlaWdodD1cIjE3XCIgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LCR7dGhpcy5zeW1ib2xPYmpbJ2ltYWdlRGF0YSddfVwiPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ltYm9sT2JqKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdQb2ludCBzeW1ib2wgZG9lcyBub3QgaGFuZGxlIHN5bWJvbCB0eXBlOiAnICsgdGhpcy5zeW1ib2xPYmpbJ3R5cGUnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMaW5lU3ltYm9sIGV4dGVuZHMgQ29tbW9uU3ltYm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHN5bWJvbE9iajogRXNyaVN5bWJvbCwgb3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoc3ltYm9sT2JqLCBvcGFjaXR5KTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3ltYm9sT2JqLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZXNyaVNMUyc6XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJDb2xvciA9IF9jb2xvckFycmF5VG9SZ2JhKHRoaXMuc3ltYm9sT2JqLmNvbG9yLCB0aGlzLm9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVXaWR0aCA9IHRoaXMuc3ltYm9sT2JqLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub2xTdHlsZSA9IG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlubmVyQ29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGluZURhc2g6IFs0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGxpbmVXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmQtbGF5ZXItaWNvblwiIGA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYHN0eWxlPVwiYDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgYmFja2dyb3VuZC1jb2xvcjogJHtpbm5lckNvbG9yfTtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGB3aWR0aDogNDBweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBoZWlnaHQ6IDRweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBwb3NpdGlvbjogcmVsYXRpdmU7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgZGlzcGxheTogaW5saW5lLWJsb2NrO2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYHRvcDogLTFweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBcIj48L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zeW1ib2xPYmopO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0xpbmUgc3ltYm9sIGRvZXMgbm90IGhhbmRsZSBzeW1ib2wgdHlwZTogJyArIHRoaXMuc3ltYm9sT2JqWyd0eXBlJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUG9seWdvblN5bWJvbCBleHRlbmRzIENvbW1vblN5bWJvbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzeW1ib2xPYmo6IEVzcmlTeW1ib2wsIG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHN5bWJvbE9iaiwgb3BhY2l0eSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN5bWJvbE9ialsndHlwZSddKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VzcmlTRlMnOlxyXG4gICAgICAgICAgICAgICAgbGV0IGlubmVyQ29sb3IgPSBfY29sb3JBcnJheVRvUmdiYSh0aGlzLnN5bWJvbE9iai5jb2xvciwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRlckNvbG9yID0gX2NvbG9yQXJyYXlUb1JnYmEodGhpcy5zeW1ib2xPYmoub3V0bGluZS5jb2xvciwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRsaW5lV2lkdGggPSB0aGlzLnN5bWJvbE9iai5vdXRsaW5lLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub2xTdHlsZSA9IG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IG91dGVyQ29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGluZURhc2g6IFs0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG91dGxpbmVXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IG5ldyBvbC5zdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlubmVyQ29sb3JcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBzdHlsZT1cImA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYGJhY2tncm91bmQtY29sb3I6ICR7aW5uZXJDb2xvcn07YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgYm9yZGVyOiBzb2xpZCAke291dGVyQ29sb3J9IDFweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGB3aWR0aDogNDBweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBoZWlnaHQ6IDlweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBwb3NpdGlvbjogcmVsYXRpdmU7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgZGlzcGxheTogaW5saW5lLWJsb2NrO2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYHRvcDogMnB4O2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYFwiPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zeW1ib2xPYmopO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BvbHlnb24gc3ltYm9sIGRvZXMgaGFuZGxlIHN5bWJvbCB0eXBlOiAnICsgdGhpcy5zeW1ib2xPYmpbJ3R5cGUnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTeW1ib2xHZW5lcmF0b3Ige1xyXG4gICAgb3BhY2l0eTogbnVtYmVyO1xyXG4gICAgcmVuZGVyZXI6IEVzcmlSZW5kZXJlcjtcclxuICAgIGxlZ2VuZEh0bWw6IHN0cmluZztcclxuICAgIG9sU3R5bGU6IG9sLnN0eWxlLlN0eWxlfEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5TdHlsZUZ1bmN0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVzcmlSZXNwb25zZTogRXNyaVJlc3BvbnNlKSB7XHJcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gKDEwMCAtIChlc3JpUmVzcG9uc2VbJ2RyYXdpbmdJbmZvJ11bJ3RyYW5zcGFyZW5jeSddIHx8IDApKSAvIDEwMDtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gZXNyaVJlc3BvbnNlLmRyYXdpbmdJbmZvLnJlbmRlcmVyO1xyXG4gICAgICAgIHRoaXMub2xTdHlsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgPSAnJztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2luZ2xlU3ltYm9sIGV4dGVuZHMgU3ltYm9sR2VuZXJhdG9yIHtcclxuICAgIHN5bWJvbDogRXNyaVN5bWJvbDtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlc3JpUmVzcG9uc2UgLSBsYXllciBpbmZvXHJcbiAgICAgKiBAcGFyYW0gU3ltYm9sQ2xhc3MgLSB0aGUgc3ltYm9sIGNsYXNzIHRvIHVzZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihlc3JpUmVzcG9uc2UsIFN5bWJvbENsYXNzOiBJQ29tbW9uU3ltYm9sKSB7XHJcbiAgICAgICAgc3VwZXIoZXNyaVJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLnN5bWJvbCA9IHRoaXMucmVuZGVyZXIuc3ltYm9sO1xyXG4gICAgICAgIGxldCBzeW1ib2xPYmogPSBuZXcgU3ltYm9sQ2xhc3ModGhpcy5zeW1ib2wsIHRoaXMub3BhY2l0eSk7XHJcbiAgICAgICAgdGhpcy5vbFN0eWxlID0gc3ltYm9sT2JqLm9sU3R5bGU7XHJcbiAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gc3ltYm9sT2JqLmxlZ2VuZEh0bWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFVuaXF1ZVZhbHVlU3ltYm9sIGV4dGVuZHMgU3ltYm9sR2VuZXJhdG9yIHtcclxuXHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIGRlZmF1bHRTeW1ib2w6IEVzcmlTeW1ib2w7XHJcbiAgICBkZWZhdWx0U3R5bGU6IG9sLnN0eWxlLlN0eWxlfEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5TdHlsZUZ1bmN0aW9uO1xyXG4gICAgZGVmYXVsdExhYmVsSHRtbDogc3RyaW5nO1xyXG4gICAgbGFiZWxBcnJheTogQXJyYXk8c3RyaW5nPjtcclxuICAgIGxlZ2VuZEFycmF5OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJvcGVydHlTdHlsZUxvb2t1cDogT2JqZWN0O1xyXG4gICAgdmFsdWVBcnJheTogQXJyYXk8YW55PjtcclxuICAgIHVuaXF1ZVZhbHVlSW5mb3M6IEFycmF5PHtsYWJlbDogc3RyaW5nLCB2YWx1ZTogYW55LCBzeW1ib2w6IEVzcmlTeW1ib2x9PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXNyaVJlc3BvbnNlIC0gbGF5ZXIgaW5mb1xyXG4gICAgICogQHBhcmFtIFN5bWJvbENsYXNzIC0gdGhlIFN5bWJvbCBjbGFzcyBkZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGVzcmlSZXNwb25zZTogRXNyaVJlc3BvbnNlLCBTeW1ib2xDbGFzczogSUNvbW1vblN5bWJvbCkge1xyXG4gICAgICAgIHN1cGVyKGVzcmlSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy51bmlxdWVWYWx1ZUluZm9zID0gdGhpcy5yZW5kZXJlclsndW5pcXVlVmFsdWVJbmZvcyddO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gdGhpcy5yZW5kZXJlclsnZmllbGQxJ107XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U3ltYm9sID0gdGhpcy5yZW5kZXJlclsnZGVmYXVsdFN5bWJvbCddO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVmYXVsdFN5bWJvbCkge1xyXG4gICAgICAgICAgICBsZXQgc3ltYm9sT2JqID0gbmV3IFN5bWJvbENsYXNzKHRoaXMuZGVmYXVsdFN5bWJvbCwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U3R5bGUgPSBzeW1ib2xPYmoub2xTdHlsZTtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TGFiZWxIdG1sID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2h0bWxFc2NhcGUodGhpcy5yZW5kZXJlclsnZGVmYXVsdExhYmVsJ10pfTwvc3Bhbj5gICsgc3ltYm9sT2JqLmxlZ2VuZEh0bWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdExhYmVsSHRtbCA9ICdvdGhlcic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbHVlQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmxlZ2VuZEFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0eVN0eWxlTG9va3VwID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IHVuaXF1ZVZhbCBvZiB0aGlzLnVuaXF1ZVZhbHVlSW5mb3MpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbEFycmF5LnB1c2godW5pcXVlVmFsWydsYWJlbCddKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUFycmF5LnB1c2godW5pcXVlVmFsWyd2YWx1ZSddKTtcclxuICAgICAgICAgICAgbGV0IHVuaXF1ZVN5bSA9IG5ldyBTeW1ib2xDbGFzcyh1bmlxdWVWYWwuc3ltYm9sLCB0aGlzLm9wYWNpdHkpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZ2VuZEFycmF5LnB1c2goYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2h0bWxFc2NhcGUodW5pcXVlVmFsWydsYWJlbCddKX08L3NwYW4+YCArIHVuaXF1ZVN5bS5sZWdlbmRIdG1sKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVN0eWxlTG9va3VwW3VuaXF1ZVZhbFsndmFsdWUnXV0gPSB1bmlxdWVTeW0ub2xTdHlsZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLm9sU3R5bGUgPSAoZmVhdHVyZTogb2wuRmVhdHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tQcm9wZXJ0aWVzID0gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgICAgIGxldCBjaGVja1Byb3BlcnR5ID0gY2hlY2tQcm9wZXJ0aWVzW3RoaXMucHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydHlTdHlsZUxvb2t1cFtjaGVja1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IFt0aGlzLnByb3BlcnR5U3R5bGVMb29rdXBbY2hlY2tQcm9wZXJ0eV1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IFt0aGlzLmRlZmF1bHRTdHlsZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0TGFiZWxIdG1sICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVnZW5kQXJyYXkucHVzaCh0aGlzLmRlZmF1bHRMYWJlbEh0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gJzx1bD4nO1xyXG4gICAgICAgIGZvciAobGV0IGggb2YgdGhpcy5sZWdlbmRBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYDxsaT4ke2h9PC9saT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gJzwvdWw+JztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBzdHlsZSBhbmQgbGVnZW5kIG9iamVjdFxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBzdHlsZUFuZExlZ2VuZFxyXG4gKiBAcHJvcGVydHkge3N0eWxlRnVuY30gc3R5bGUgLSBzdHlsZSBmdW5jdGlvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGVnZW5kIC0gbGVnZW5kIGNvbnRlbnRcclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGVzcmlSZXNwb25zZSAtIGxheWVyIGluZm9cclxuICogQHJldHVybnMge3N0eWxlQW5kTGVnZW5kfSBzdHlsZSBhbmQgbGVnZW5kIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VGZWF0dXJlU2VydmljZUxlZ2VuZEFuZFN5bWJvbChlc3JpUmVzcG9uc2U6IEVzcmlSZXNwb25zZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBsZXQgcmVuZGVyZXIgPSBlc3JpUmVzcG9uc2UuZHJhd2luZ0luZm8ucmVuZGVyZXI7XHJcbiAgICBsZXQgc3ltYm9sTGVnZW5kT3V0OiBTeW1ib2xHZW5lcmF0b3IgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAocmVuZGVyZXIudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3NpbXBsZSc6XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXNyaVJlc3BvbnNlLmdlb21ldHJ5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXNyaUdlb21ldHJ5UG9pbnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbExlZ2VuZE91dCA9IG5ldyBTaW5nbGVTeW1ib2woZXNyaVJlc3BvbnNlLCBQb2ludFN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlc3JpR2VvbWV0cnlQb2x5bGluZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sTGVnZW5kT3V0ID0gbmV3IFNpbmdsZVN5bWJvbChlc3JpUmVzcG9uc2UsIExpbmVTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXNyaUdlb21ldHJ5UG9seWdvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sTGVnZW5kT3V0ID0gbmV3IFNpbmdsZVN5bWJvbChlc3JpUmVzcG9uc2UsIFBvbHlnb25TeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlc3JpUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVzcmlSZXNwb25zZS5nZW9tZXRyeVR5cGUgKyAnIG5vdCBoYW5kbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndW5pcXVlVmFsdWUnOlxyXG4gICAgICAgICAgICBzd2l0Y2ggKGVzcmlSZXNwb25zZS5nZW9tZXRyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VzcmlHZW9tZXRyeVBvaW50JzpcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2xMZWdlbmRPdXQgPSBuZXcgVW5pcXVlVmFsdWVTeW1ib2woZXNyaVJlc3BvbnNlLCBQb2ludFN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlc3JpR2VvbWV0cnlQb2x5bGluZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sTGVnZW5kT3V0ID0gbmV3IFVuaXF1ZVZhbHVlU3ltYm9sKGVzcmlSZXNwb25zZSwgTGluZVN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlc3JpR2VvbWV0cnlQb2x5Z29uJzpcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2xMZWdlbmRPdXQgPSBuZXcgVW5pcXVlVmFsdWVTeW1ib2woZXNyaVJlc3BvbnNlLCBQb2x5Z29uU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXNyaVJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChlc3JpUmVzcG9uc2VbJ2dlb21ldHJ5VHlwZSddICsgJyBub3QgaGFuZGxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGFsZXJ0KCdub3QgaGFuZGxlZCByZW5kZXJlciB0eXBlOiAnICsgcmVuZGVyZXJbJ3R5cGUnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN5bWJvbExlZ2VuZE91dCA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHtzdHlsZTogdW5kZWZpbmVkLCBsZWdlbmQ6ICcnfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHtzdHlsZTogc3ltYm9sTGVnZW5kT3V0Lm9sU3R5bGUsIGxlZ2VuZDogc3ltYm9sTGVnZW5kT3V0LmxlZ2VuZEh0bWx9O1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5tYWtlRmVhdHVyZVNlcnZpY2VMZWdlbmRBbmRTeW1ib2wgPSBtYWtlRmVhdHVyZVNlcnZpY2VMZWdlbmRBbmRTeW1ib2w7XHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBseXJPYmplY3QgLSB0aGUgbGF5ZXIgYXMgZGVmaW5lZCBpbiB0aGUgcmVzcG9uc2VcclxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcExheWVyTmFtZUFuZEV4cGFuZGVyPWZhbHNlXSB1c2Ugb25seSBpY29uc1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBsZWdlbmQgaHRtbFxyXG4gKi9cclxuZnVuY3Rpb24gbWFwU2VydmljZUxlZ2VuZEl0ZW0obHlyT2JqZWN0LCBza2lwTGF5ZXJOYW1lQW5kRXhwYW5kZXI6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuXHJcbiAgICBza2lwTGF5ZXJOYW1lQW5kRXhwYW5kZXIgPSB0eXBlb2Ygc2tpcExheWVyTmFtZUFuZEV4cGFuZGVyID09ICdib29sZWFuJyA/IHNraXBMYXllck5hbWVBbmRFeHBhbmRlciA6IGZhbHNlO1xyXG4gICAgbGV0IGxheWVyTmFtZSA9IGx5ck9iamVjdFsnbGF5ZXJOYW1lJ107XHJcbiAgICBsZXQgbGVnZW5kSXRlbXMgPSBseXJPYmplY3RbJ2xlZ2VuZCddO1xyXG4gICAgbGV0IGxlZ2VuZEh0bWwgPSAnJztcclxuXHJcbiAgICBpZiAoIXNraXBMYXllck5hbWVBbmRFeHBhbmRlcikge1xyXG4gICAgICAgIGxlZ2VuZEh0bWwgKz0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2xheWVyTmFtZX08L3NwYW4+YDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGVnZW5kSXRlbXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICBsZWdlbmRIdG1sID0gYDxpbWcgY2xhc3M9XCJsZWdlbmQtbGF5ZXItaWNvblwiIGhlaWdodD1cIjE3XCIgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LCR7bGVnZW5kSXRlbXNbMF1bJ2ltYWdlRGF0YSddfVwiPmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghc2tpcExheWVyTmFtZUFuZEV4cGFuZGVyKSB7XHJcbiAgICAgICAgICAgIGxlZ2VuZEh0bWwgKz0gJzxzcGFuIGNsYXNzPVwibGVnZW5kLWl0ZW1zLWV4cGFuZGVyXCIgdGl0bGU9XCJFeHBhbmQvQ29sbGFwc2VcIj4mIzk2NjA7PC9zcGFuPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlZ2VuZEh0bWwgKz0gJzx1bD4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGVnZW5kSHRtbCArPSBgPGxpPmA7XHJcbiAgICAgICAgICAgIGxlZ2VuZEh0bWwgKz0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2h0bWxFc2NhcGUobGVnZW5kSXRlbXNbaV1bJ2xhYmVsJ10pfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBsZWdlbmRIdG1sICs9IGA8aW1nIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBoZWlnaHQ9XCIxN1wiIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke2xlZ2VuZEl0ZW1zW2ldWydpbWFnZURhdGEnXX1cIj5gO1xyXG4gICAgICAgICAgICBsZWdlbmRIdG1sICs9IGA8L2xpPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlZ2VuZEh0bWwgKz0gJzwvdWw+JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNraXBMYXllck5hbWVBbmRFeHBhbmRlcikge1xyXG4gICAgICAgIGxlZ2VuZEh0bWwgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmQtbGF5ZXItc3ViaXRlbVwiPiR7bGF5ZXJOYW1lfTwvc3Bhbj5gICsgbGVnZW5kSHRtbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGVnZW5kSHRtbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIG1ha2UgbWFwIHNlcnZpY2UgbGVnZW50XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlc3JpUmVzcG9uc2UgLSBsYXllciBpbmZvXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGxlZ2VuZCBjb250ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFrZU1hcFNlcnZpY2VMZWdlbmQoZXNyaVJlc3BvbnNlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBsZXQgbmV3TGVnZW5kSHRtbCA9ICcnO1xyXG5cclxuICAgIGxldCBsYXllcnMgPSBlc3JpUmVzcG9uc2VbJ2xheWVycyddO1xyXG5cclxuICAgIGlmIChsYXllcnMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICBuZXdMZWdlbmRIdG1sICs9IG1hcFNlcnZpY2VMZWdlbmRJdGVtKGxheWVyc1swXSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0xlZ2VuZEh0bWwgKz0gJzx1bD4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0xlZ2VuZEh0bWwgKz0gJzxsaT4nICsgbWFwU2VydmljZUxlZ2VuZEl0ZW0obGF5ZXJzW2ldKSArICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld0xlZ2VuZEh0bWwgKz0gJzwvdWw+JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3TGVnZW5kSHRtbDtcclxufVxyXG5cclxubm0ubWFrZU1hcFNlcnZpY2VMZWdlbmQgPSBtYWtlTWFwU2VydmljZUxlZ2VuZDtcclxuIl19