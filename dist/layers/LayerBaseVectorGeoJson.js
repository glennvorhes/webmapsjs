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
        this.source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QiwrQ0FBaUQ7QUFDakQsd0RBQWtEO0FBRWxELElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFjM0I7OztHQUdHO0FBQ0g7SUFBNEMsMENBQWU7SUFJdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsZ0NBQVksR0FBRyxFQUFFLE9BQTJDO1FBQTNDLHdCQUFBLEVBQUEsWUFBMkM7UUFBNUQsaUJBYUM7UUFaRyxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDeEMsUUFBQSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFFcEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pGLEtBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxzQkFBUSxDQUFDO1FBRWxGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7O0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILDRDQUFXLEdBQVgsVUFBWSxpQkFBc0I7UUFFOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsc0NBQUssR0FBTDtRQUFBLGlCQWtCQztRQWhCRyxFQUFFLENBQUMsQ0FBQyxpQkFBTSxLQUFLLFdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNYLElBQUksQ0FBQyxPQUFPLEVBQ1osVUFBQyxDQUFDO1lBQ0UsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ2Y7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnREFBZSxHQUFmLFVBQWdCLENBQUM7UUFDYixpQkFBTSxlQUFlLFlBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUN2RCxFQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUEzRkQsQ0FBNEMsaUNBQWUsR0EyRjFEO0FBM0ZZLHdEQUFzQjtBQTZGbkMsRUFBRSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0FBQ25ELGtCQUFlLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMi8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TGF5ZXJCYXNlVmVjdG9yLCBMYXllckJhc2VWZWN0b3JPcHRpb25zfSBmcm9tICcuL0xheWVyQmFzZVZlY3Rvcic7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5pbXBvcnQge01hcE1vdmVDbHN9IGZyb20gXCIuLi9vbEhlbHBlcnMvbWFwTW92ZUNsc1wiO1xyXG5pbXBvcnQgKiBhcyBwcm9qIGZyb20gJy4uL29sSGVscGVycy9wcm9qZWN0aW9ucyc7XHJcbmltcG9ydCB7cHJvajM4NTd9IGZyb20gXCIuLi9vbEhlbHBlcnMvcHJvamVjdGlvbnNcIjtcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2xheWVycycpO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY3JzVHJhbnNmb3JtIHtcclxuICAgIGRhdGFQcm9qZWN0aW9uPzogb2wucHJvai5Qcm9qZWN0aW9uO1xyXG4gICAgZmVhdHVyZVByb2plY3Rpb24/OiBvbC5wcm9qLlByb2plY3Rpb247XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyQmFzZVZlY3Rvckdlb0pzb25PcHRpb25zIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yT3B0aW9ucyB7XHJcbiAgICB0cmFuc2Zvcm0/OiBjcnNUcmFuc2Zvcm07XHJcbiAgICBtYXBNb3ZlT2JqPzogTWFwTW92ZUNscztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBWZWN0b3IgR2VvSnNvbiBMYXllclxyXG4gKiBAYXVnbWVudHMgTGF5ZXJCYXNlVmVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiBleHRlbmRzIExheWVyQmFzZVZlY3RvciB7XHJcbiAgICBfZ2VvSnNvbkZvcm1hdDogb2wuZm9ybWF0Lkdlb0pTT047XHJcbiAgICBfdHJhbnNmb3JtOiBjcnNUcmFuc2Zvcm07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR8bnVsbH0gdXJsIC0gcmVzb3VyY2UgdXJsLCBzZXQgdG8gJycgdG8gbWFrZSBibGFuayBsYXllclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvTG9hZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBhdXRvIGxvYWQgaWYgbm90IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5zdHlsZT11bmRlZmluZWRdIHRoZSBsYXllciBzdHlsZSwgdXNlIG9wZW5sYXllcnMgZGVmYXVsdCBzdHlsZSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5vbkRlbWFuZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgYnkgZXh0ZW50IG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub25EZW1hbmREZWxheT0zMDBdIGRlbGF5IGJlZm9yZSB0aGUgbWFwIG1vdmUgY2FsbGJhY2sgc2hvdWxkIGJlIGNhbGxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy50cmFuc2Zvcm09e31dIFNSIHRyYW5zZm9ybSwgc2V0IGFzIGZhbHNlIGZvciBubyB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnRyYW5zZm9ybS5kYXRhUHJvamVjdGlvbj1FUFNHOjQzMjYgdGhlIGRhdGEgQ1JTXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb249RVBTRzozODU3IHRoZSBmZWF0dXJlL21hcCBDUlNcclxuICAgICAqIEBwYXJhbSB7bWFwTW92ZU1ha2VHZXRQYXJhbXN9IFtvcHRpb25zLm1hcE1vdmVNYWtlR2V0UGFyYW1zPWZ1bmN0aW9uKGx5ciwgZXh0ZW50LCB6b29tTGV2ZWwpe31dIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhZGRpdGlvbmFsIG1hcCBtb3ZlIHBhcmFtc1xyXG4gICAgICogQHBhcmFtIHtNYXBNb3ZlQ2xzfSBbb3B0aW9ucy5tYXBNb3ZlT2JqPW1hcE1vdmVdIGFsdGVybmF0ZSBtYXAgbW92ZSBvYmplY3QgZm9yIHVzZSB3aXRoIG11bHRpIG1hcCBwYWdlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnM6IExheWVyQmFzZVZlY3Rvckdlb0pzb25PcHRpb25zID0ge30pIHtcclxuICAgICAgICB1cmwgPSB0eXBlb2YgdXJsID09ICdzdHJpbmcnID8gdXJsIDogJyc7XHJcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2VvSnNvbkZvcm1hdCA9IG5ldyBvbC5mb3JtYXQuR2VvSlNPTigpO1xyXG5cclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0gPSBvcHRpb25zLnRyYW5zZm9ybSB8fCB7fTtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0uZGF0YVByb2plY3Rpb24gPSB0aGlzLl90cmFuc2Zvcm0uZGF0YVByb2plY3Rpb24gfHwgcHJvai5wcm9qNDMyNjtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb24gPSB0aGlzLl90cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb24gfHwgcHJvajM4NTc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9Mb2FkIHx8IHRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGZlYXR1cmUgY29sbGVjdGlvblxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmVDb2xsZWN0aW9uIC0gYXMgZ2VvanNvbiBvYmplY3RcclxuICAgICAqL1xyXG4gICAgYWRkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb246IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLnNvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLl9nZW9Kc29uRm9ybWF0LnJlYWRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbikpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWdnZXIgbG9hZCBmZWF0dXJlc1xyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIGFscmVhZHkgbG9hZGVkXHJcbiAgICAgKi9cclxuICAgIF9sb2FkKCkge1xyXG5cclxuICAgICAgICBpZiAoc3VwZXIuX2xvYWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZ2V0KHRoaXMuX3VybCxcclxuICAgICAgICAgICAgdGhpcy5fcGFyYW1zLFxyXG4gICAgICAgICAgICAoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGZWF0dXJlcyhkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZENhbGxiYWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB9LCAnanNvbicpLmZhaWwoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGJhY2sgZnVuY3Rpb24gb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkIHRoZSBqc29uIHJlc3BvbnNlXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZUNhbGxiYWNrKGQpIHtcclxuICAgICAgICBzdXBlci5tYXBNb3ZlQ2FsbGJhY2soZCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlLmFkZEZlYXR1cmVzKHRoaXMuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGQsXHJcbiAgICAgICAgICAgIHtmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5fdHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uLCBkYXRhUHJvamVjdGlvbjogdGhpcy5fdHJhbnNmb3JtLmRhdGFQcm9qZWN0aW9ufSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllckJhc2VWZWN0b3JHZW9Kc29uID0gTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbjtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbjtcclxuIl19