/**
 * Created by gavorhes on 11/2/2015.
 */
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
var LayerBaseVector_1 = require("./LayerBaseVector");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var proj = require("../olHelpers/projections");
var $ = require("jquery");
var nm = provide_1.default('layers');
/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */
var LayerBaseVectorGeoJson = (function (_super) {
    __extends(LayerBaseVectorGeoJson, _super);
    /**
     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
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
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     */
    function LayerBaseVectorGeoJson(url, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        url = typeof url == 'string' ? url : '';
        _this = _super.call(this, url, options) || this;
        _this._geoJsonFormat = new ol.format.GeoJSON();
        _this._transform = options.transform || { dataProjection: proj.proj4326, featureProjection: proj.proj3857 };
        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        return _this;
    }
    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */
    LayerBaseVectorGeoJson.prototype.addFeatures = function (featureCollection) {
        if (this._transform.dataProjection == 'EPSG:3857' && this._transform.featureProjection == 'EPSG:3857') {
            this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
        }
        else {
            this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, this._transform));
        }
    };
    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBaseVectorGeoJson.prototype._load = function () {
        var _this = this;
        if (_super.prototype._load.call(this)) {
            return true;
        }
        $.get(this._url, this._params, function (d) {
            _this.addFeatures(d);
            _this.loadCallback(_this);
        }, 'json').fail(function () {
            this._loaded = false;
        });
        return false;
    };
    /**
     * callback function on map move
     * @param {object} d the json response
     * @override
     */
    LayerBaseVectorGeoJson.prototype.mapMoveCallback = function (d) {
        _super.prototype.mapMoveCallback.call(this, d);
        this._source.addFeatures(this._geoJsonFormat.readFeatures(d, this._transform));
    };
    return LayerBaseVectorGeoJson;
}(LayerBaseVector_1.LayerBaseVector));
exports.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;
//# sourceMappingURL=LayerBaseVectorGeoJson.js.map