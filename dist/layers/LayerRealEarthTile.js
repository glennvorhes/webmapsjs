"use strict";
/**
 * Created by gavorhes on 11/4/2015.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LayerBaseXyzTile_1 = require("./LayerBaseXyzTile");
var RealEarthAnimateTile_1 = require("../mixin/RealEarthAnimateTile");
var provide_1 = require("../util/provide");
var nm = provide_1.default('layers');
/**
 * Real earth tile
 * @augments LayerBaseXyzTile
 */
var LayerRealEarthTile = /** @class */ (function (_super) {
    __extends(LayerRealEarthTile, _super);
    /**
     * The base layer for all others
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
     * @param {string} options.products - the products to request
     * @param {boolean} [options.hasTimes=false] If the layer is time dependent, fixed set of dates
     * @param {boolean} [options.animate=false] if the layer should be animated
     */
    function LayerRealEarthTile(options) {
        var _this = this;
        options.animate = typeof options.animate == 'boolean' ? options.animate : false;
        if (options.animate) {
            _this = _super.call(this, '', options) || this;
            _this._products = options.products;
            _this.animator = new RealEarthAnimateTile_1.default(_this, options.timeLoadCallback);
            _this.animator.timeInit();
        }
        else {
            _this = _super.call(this, "http://realearth.ssec.wisc.edu/api/image?products=" + options.products + "&x={x}&y={y}&z={z}", options) || this;
            _this._products = options.products;
        }
        return _this;
    }
    LayerRealEarthTile.prototype.setLayerTime = function (theTime) {
        if (this.animator) {
            return this.animator.setLayerTime(theTime);
        }
        else {
            return false;
        }
    };
    LayerRealEarthTile.prototype._load = function () {
        if (this.animator) {
            return false;
        }
        return _super.prototype._load.call(this);
    };
    return LayerRealEarthTile;
}(LayerBaseXyzTile_1.LayerBaseXyzTile));
exports.LayerRealEarthTile = LayerRealEarthTile;
nm.LayerRealEarthTile = LayerRealEarthTile;
exports.default = LayerRealEarthTile;
//# sourceMappingURL=LayerRealEarthTile.js.map