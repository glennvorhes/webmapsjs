"use strict";
/**
 * Created by gavorhes on 11/13/2015.
 */
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
var LayerBaseVectorGeoJson_1 = require("./LayerBaseVectorGeoJson");
var RealEarthAnimateVector_1 = require("../mixin/RealEarthAnimateVector");
var provide_1 = require("../util/provide");
var nm = provide_1.default('layers');
/**
 * Vector real earth vector
 * @augments LayerBaseVectorGeoJson
 */
var LayerVectorRealEarth = /** @class */ (function (_super) {
    __extends(LayerVectorRealEarth, _super);
    /**
     * Real Earth vector layer
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
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     *
     * @param {string} options.products real earth products identifier
     * @param {boolean} [options.animate=false] if the layer should be animated
     */
    function LayerVectorRealEarth(options) {
        var _this = this;
        options.animate = typeof options.animate == 'boolean' ? options.animate : false;
        if (options.animate) {
            options.autoLoad = false;
            _this = _super.call(this, '', options) || this;
            _this._products = options.products;
            _this.animator = new RealEarthAnimateVector_1.default(_this, options.timeLoadCallback);
            _this.animator.timeInit();
        }
        else {
            options.params = { products: options.products };
            _this = _super.call(this, 'http://realearth.ssec.wisc.edu/api/shapes', options) || this;
        }
        return _this;
    }
    LayerVectorRealEarth.prototype.setLayerTime = function (theTime) {
        if (this.animator) {
            return this.animator.setLayerTime(theTime);
        }
        else {
            return false;
        }
    };
    LayerVectorRealEarth.prototype._load = function () {
        if (this.animator) {
            return false;
        }
        return _super.prototype._load.call(this);
    };
    return LayerVectorRealEarth;
}(LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson));
exports.LayerVectorRealEarth = LayerVectorRealEarth;
nm.LayerVectorRealEarth = LayerVectorRealEarth;
exports.default = LayerVectorRealEarth;
//# sourceMappingURL=LayerRealEarthVector.js.map