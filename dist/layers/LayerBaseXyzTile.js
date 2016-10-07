"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 12/4/2015.
 */
var LayerBase_1 = require('./LayerBase');
var provide_1 = require('../util/provide');
var custom_ol_1 = require('custom-ol');
var nm = provide_1.default('layers');
/**
 * XYZ tile
 * @augments LayerBase
 */
var LayerBaseXyzTile = (function (_super) {
    __extends(LayerBaseXyzTile, _super);
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
        _super.call(this, url, options);
        this._source = new custom_ol_1.default.source.XYZ({ url: this.url == '' ? undefined : this.url });
        this._olLayer = new custom_ol_1.default.layer.Tile({
            source: this._source,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution
        });
        this._olLayer.setZIndex(this._zIndex);
    }
    Object.defineProperty(LayerBaseXyzTile.prototype, "source", {
        /**
         *
         * @returns {ol.source.XYZ} the vector source
         */
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseXyzTile.prototype, "olLayer", {
        /**
         *
         * @returns {ol.layer.Tile|ol.layer.Base|undefined} the ol layer
         */
        get: function () {
            return this._olLayer;
        },
        enumerable: true,
        configurable: true
    });
    return LayerBaseXyzTile;
}(LayerBase_1.LayerBase));
exports.LayerBaseXyzTile = LayerBaseXyzTile;
nm.LayerBaseXyzTile = LayerBaseXyzTile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseXyzTile;
//# sourceMappingURL=LayerBaseXyzTile.js.map