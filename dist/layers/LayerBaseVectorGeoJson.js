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
var $ = require("jquery");
var proj = require("../olHelpers/projections");
var projections_1 = require("../olHelpers/projections");
var nm = provide_1.default('layers');
/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */
var LayerBaseVectorGeoJson = (function (_super) {
    __extends(LayerBaseVectorGeoJson, _super);
    /**
     * @param {string|null} url - resource url, set to '' to make blank layer
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
        _this._transform = options.transform || {};
        _this._transform.dataProjection = _this._transform.dataProjection || proj.proj4326;
        _this._transform.featureProjection = _this._transform.featureProjection || projections_1.proj3857;
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
        this.source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, { dataProjection: this._transform.dataProjection,
            featureProjection: this._transform.featureProjection }));
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
        this._source.addFeatures(this._geoJsonFormat.readFeatures(d, { featureProjection: this._transform.featureProjection, dataProjection: this._transform.dataProjection }));
    };
    return LayerBaseVectorGeoJson;
}(LayerBaseVector_1.LayerBaseVector));
exports.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
exports.default = LayerBaseVectorGeoJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QiwrQ0FBaUQ7QUFDakQsd0RBQWtEO0FBRWxELElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFhM0I7OztHQUdHO0FBQ0g7SUFBNEMsMENBQWU7SUFJdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsZ0NBQVksR0FBWSxFQUFFLE9BQTJDO1FBQTNDLHdCQUFBLEVBQUEsWUFBMkM7UUFBckUsaUJBYUM7UUFaRyxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDeEMsUUFBQSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFFcEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pGLEtBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxzQkFBUSxDQUFDO1FBRWxGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7O0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILDRDQUFXLEdBQVgsVUFBWSxpQkFBc0I7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUM5QyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWM7WUFDM0MsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBQyxDQUN4RCxDQUNSLENBQUM7SUFDTixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILHNDQUFLLEdBQUw7UUFBQSxpQkFrQkM7UUFoQkcsRUFBRSxDQUFDLENBQUMsaUJBQU0sS0FBSyxXQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFDWCxJQUFJLENBQUMsT0FBTyxFQUNaLFVBQUMsQ0FBQztZQUNFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0RBQWUsR0FBZixVQUFnQixDQUFDO1FBQ2IsaUJBQU0sZUFBZSxZQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDdkQsRUFBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBL0ZELENBQTRDLGlDQUFlLEdBK0YxRDtBQS9GWSx3REFBc0I7QUFpR25DLEVBQUUsQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNuRCxrQkFBZSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDExLzIvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQge0xheWVyQmFzZVZlY3RvciwgTGF5ZXJCYXNlVmVjdG9yT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2VWZWN0b3InO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuaW1wb3J0IHtNYXBNb3ZlQ2xzfSBmcm9tIFwiLi4vb2xIZWxwZXJzL21hcE1vdmVDbHNcIjtcclxuaW1wb3J0ICogYXMgcHJvaiBmcm9tICcuLi9vbEhlbHBlcnMvcHJvamVjdGlvbnMnO1xyXG5pbXBvcnQge3Byb2ozODU3fSBmcm9tIFwiLi4vb2xIZWxwZXJzL3Byb2plY3Rpb25zXCI7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY3JzVHJhbnNmb3JtIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uPzogb2wucHJvai5Qcm9qZWN0aW9uO1xyXG4gICAgZmVhdHVyZVByb2plY3Rpb24/OiBvbC5wcm9qLlByb2plY3Rpb247XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyQmFzZVZlY3Rvckdlb0pzb25PcHRpb25zIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yT3B0aW9ucyB7XHJcbiAgICB0cmFuc2Zvcm0/OiBjcnNUcmFuc2Zvcm07XHJcbiAgICBtYXBNb3ZlT2JqPzogTWFwTW92ZUNscztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBWZWN0b3IgR2VvSnNvbiBMYXllclxyXG4gKiBAYXVnbWVudHMgTGF5ZXJCYXNlVmVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiBleHRlbmRzIExheWVyQmFzZVZlY3RvciB7XHJcbiAgICBfZ2VvSnNvbkZvcm1hdDogb2wuZm9ybWF0Lkdlb0pTT047XHJcbiAgICBfdHJhbnNmb3JtOiBjcnNUcmFuc2Zvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xudWxsfSB1cmwgLSByZXNvdXJjZSB1cmwsIHNldCB0byAnJyB0byBtYWtlIGJsYW5rIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9Mb2FkPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGF1dG8gbG9hZCBpZiBub3QgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnN0eWxlPXVuZGVmaW5lZF0gdGhlIGxheWVyIHN0eWxlLCB1c2Ugb3BlbmxheWVycyBkZWZhdWx0IHN0eWxlIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm9uRGVtYW5kPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBleHRlbnQgb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vbkRlbWFuZERlbGF5PTMwMF0gZGVsYXkgYmVmb3JlIHRoZSBtYXAgbW92ZSBjYWxsYmFjayBzaG91bGQgYmUgY2FsbGVkXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnRyYW5zZm9ybT17fV0gU1IgdHJhbnNmb3JtLCBzZXQgYXMgZmFsc2UgZm9yIG5vIHRyYW5zZm9ybVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHJhbnNmb3JtLmRhdGFQcm9qZWN0aW9uPUVQU0c6NDMyNiB0aGUgZGF0YSBDUlNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnRyYW5zZm9ybS5mZWF0dXJlUHJvamVjdGlvbj1FUFNHOjM4NTcgdGhlIGZlYXR1cmUvbWFwIENSU1xyXG4gICAgICogQHBhcmFtIHttYXBNb3ZlTWFrZUdldFBhcmFtc30gW29wdGlvbnMubWFwTW92ZU1ha2VHZXRQYXJhbXM9ZnVuY3Rpb24obHlyLCBleHRlbnQsIHpvb21MZXZlbCl7fV0gZnVuY3Rpb24gdG8gY3JlYXRlIGFkZGl0aW9uYWwgbWFwIG1vdmUgcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge01hcE1vdmVDbHN9IFtvcHRpb25zLm1hcE1vdmVPYmo9bWFwTW92ZV0gYWx0ZXJuYXRlIG1hcCBtb3ZlIG9iamVjdCBmb3IgdXNlIHdpdGggbXVsdGkgbWFwIHBhZ2VzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVybD86IHN0cmluZywgb3B0aW9uczogTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbk9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHVybCA9IHR5cGVvZiB1cmwgPT0gJ3N0cmluZycgPyB1cmwgOiAnJztcclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl9nZW9Kc29uRm9ybWF0ID0gbmV3IG9sLmZvcm1hdC5HZW9KU09OKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybSA9IG9wdGlvbnMudHJhbnNmb3JtIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybS5kYXRhUHJvamVjdGlvbiA9IHRoaXMuX3RyYW5zZm9ybS5kYXRhUHJvamVjdGlvbiB8fCBwcm9qLnByb2o0MzI2O1xyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybS5mZWF0dXJlUHJvamVjdGlvbiA9IHRoaXMuX3RyYW5zZm9ybS5mZWF0dXJlUHJvamVjdGlvbiB8fCBwcm9qMzg1NztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0xvYWQgfHwgdGhpcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZmVhdHVyZSBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZUNvbGxlY3Rpb24gLSBhcyBnZW9qc29uIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBhZGRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UuYWRkRmVhdHVyZXMoXHJcbiAgICAgICAgICAgIHRoaXMuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAge2RhdGFQcm9qZWN0aW9uOiB0aGlzLl90cmFuc2Zvcm0uZGF0YVByb2plY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMuX3RyYW5zZm9ybS5mZWF0dXJlUHJvamVjdGlvbn1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWdnZXIgbG9hZCBmZWF0dXJlc1xyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIGFscmVhZHkgbG9hZGVkXHJcbiAgICAgKi9cclxuICAgIF9sb2FkKCkge1xyXG5cclxuICAgICAgICBpZiAoc3VwZXIuX2xvYWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZ2V0KHRoaXMuX3VybCxcclxuICAgICAgICAgICAgdGhpcy5fcGFyYW1zLFxyXG4gICAgICAgICAgICAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGZWF0dXJlcyhkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZENhbGxiYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB9LCAnanNvbicpLmZhaWwoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGJhY2sgZnVuY3Rpb24gb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkIHRoZSBqc29uIHJlc3BvbnNlXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZUNhbGxiYWNrKGQpIHtcclxuICAgICAgICBzdXBlci5tYXBNb3ZlQ2FsbGJhY2soZCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlLmFkZEZlYXR1cmVzKHRoaXMuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGQsXHJcbiAgICAgICAgICAgIHtmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5fdHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uLCBkYXRhUHJvamVjdGlvbjogdGhpcy5fdHJhbnNmb3JtLmRhdGFQcm9qZWN0aW9ufSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllckJhc2VWZWN0b3JHZW9Kc29uID0gTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbjtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbjtcclxuIl19