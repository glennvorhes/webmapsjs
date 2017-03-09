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
 * Created by gavorhes on 12/4/2015.
 */
var provide_1 = require("../util/provide");
var LayerBaseXyzTile_1 = require("./LayerBaseXyzTile");
var esriToOl = require("../olHelpers/esriToOlStyle");
var nm = provide_1.default('layers');
/**
 * Esri tile
 * @augments LayerBaseXyzTile
 */
var LayerEsriTile = (function (_super) {
    __extends(LayerEsriTile, _super);
    /**
     * The Esri tile layer
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
    function LayerEsriTile(url, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        if (url.search(/\/$/) == -1) {
            url += '/';
        }
        url += 'tile/{z}/{y}/{x}';
        _this = _super.call(this, url, options) || this;
        _this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;
        if (_this._useEsriStyle) {
            _this.addLegendContent();
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    LayerEsriTile.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        if (additionalContent === void 0) { additionalContent = ''; }
        if (!this._useEsriStyle) {
            _super.prototype.addLegendContent.call(this, additionalContent);
        }
        else {
            var urlCopy = this.url;
            var mapServerIndex = urlCopy.toLowerCase().indexOf('mapserver');
            if (mapServerIndex > -1) {
                urlCopy = urlCopy.slice(0, mapServerIndex + 9);
            }
            else {
                return;
            }
            if (urlCopy[urlCopy.length - 1] !== '/') {
                urlCopy += '/';
            }
            urlCopy += 'legend?f=pjson&callback=?';
            var superAddLegend_1 = _super.prototype.addLegendContent;
            $.get(urlCopy, {}, function (d) {
                var newHtml = esriToOl.makeMapServiceLegend(d);
                superAddLegend_1.call(_this, newHtml);
            }, 'json');
        }
    };
    return LayerEsriTile;
}(LayerBaseXyzTile_1.LayerBaseXyzTile));
exports.LayerEsriTile = LayerEsriTile;
nm.LayerBaseXyzTile = LayerEsriTile;
exports.default = LayerEsriTile;
//# sourceMappingURL=LayerEsriTile.js.map