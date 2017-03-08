/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseVectorGeoJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBRWpDLCtDQUFpRDtBQUNqRCwwQkFBNkI7QUFFN0IsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVMzQjs7O0dBR0c7QUFDSDtJQUE0QywwQ0FBZTtJQUl2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxnQ0FBWSxHQUFHLEVBQUUsT0FBdUM7UUFBeEQsaUJBV0M7UUFWRyxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDeEMsUUFBQSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFFcEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDO1FBRXpHLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7O0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILDRDQUFXLEdBQVgsVUFBWSxpQkFBdUI7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0NBQUssR0FBTDtRQUFBLGlCQWtCQztRQWhCRyxFQUFFLENBQUMsQ0FBQyxpQkFBTSxLQUFLLFdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNYLElBQUksQ0FBQyxPQUFPLEVBQ1osVUFBQyxDQUFDO1lBQ0UsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ2Y7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnREFBZSxHQUFmLFVBQWdCLENBQUM7UUFDYixpQkFBTSxlQUFlLFlBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUExRkQsQ0FBNEMsaUNBQWUsR0EwRjFEO0FBMUZZLHdEQUFzQjtBQTRGbkMsRUFBRSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDOztBQUNuRCxrQkFBZSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDExLzIvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQge0xheWVyQmFzZVZlY3RvciwgTGF5ZXJCYXNlVmVjdG9yT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2VWZWN0b3InO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0IHtNYXBNb3ZlQ2xzfSBmcm9tIFwiLi4vb2xIZWxwZXJzL21hcE1vdmVDbHNcIjtcclxuaW1wb3J0ICogYXMgcHJvaiBmcm9tICcuLi9vbEhlbHBlcnMvcHJvamVjdGlvbnMnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxubGV0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbk9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VWZWN0b3JPcHRpb25ze1xyXG4gICAgdHJhbnNmb3JtPzoge2RhdGFQcm9qZWN0aW9uOiBvbC5Qcm9qZWN0aW9uTGlrZSwgZmVhdHVyZVByb2plY3Rpb246IG9sLlByb2plY3Rpb25MaWtlfTtcclxuICAgIG1hcE1vdmVPYmo/OiBNYXBNb3ZlQ2xzO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIFZlY3RvciBHZW9Kc29uIExheWVyXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VWZWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckJhc2VWZWN0b3JHZW9Kc29uIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yIHtcclxuICAgIF9nZW9Kc29uRm9ybWF0OiBvbC5mb3JtYXQuR2VvSlNPTjtcclxuICAgIF90cmFuc2Zvcm06IHtkYXRhUHJvamVjdGlvbjogb2wuUHJvamVjdGlvbkxpa2UsIGZlYXR1cmVQcm9qZWN0aW9uOiBvbC5Qcm9qZWN0aW9uTGlrZX07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR8bnVsbH0gdXJsIC0gcmVzb3VyY2UgdXJsLCBzZXQgdG8gJycgdG8gbWFrZSBibGFuayBsYXllclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvTG9hZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBhdXRvIGxvYWQgaWYgbm90IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5zdHlsZT11bmRlZmluZWRdIHRoZSBsYXllciBzdHlsZSwgdXNlIG9wZW5sYXllcnMgZGVmYXVsdCBzdHlsZSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5vbkRlbWFuZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgYnkgZXh0ZW50IG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub25EZW1hbmREZWxheT0zMDBdIGRlbGF5IGJlZm9yZSB0aGUgbWFwIG1vdmUgY2FsbGJhY2sgc2hvdWxkIGJlIGNhbGxlZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy50cmFuc2Zvcm09e31dIFNSIHRyYW5zZm9ybSwgc2V0IGFzIGZhbHNlIGZvciBubyB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnRyYW5zZm9ybS5kYXRhUHJvamVjdGlvbj1FUFNHOjQzMjYgdGhlIGRhdGEgQ1JTXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb249RVBTRzozODU3IHRoZSBmZWF0dXJlL21hcCBDUlNcclxuICAgICAqIEBwYXJhbSB7bWFwTW92ZU1ha2VHZXRQYXJhbXN9IFtvcHRpb25zLm1hcE1vdmVNYWtlR2V0UGFyYW1zPWZ1bmN0aW9uKGx5ciwgZXh0ZW50LCB6b29tTGV2ZWwpe31dIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhZGRpdGlvbmFsIG1hcCBtb3ZlIHBhcmFtc1xyXG4gICAgICogQHBhcmFtIHtNYXBNb3ZlQ2xzfSBbb3B0aW9ucy5tYXBNb3ZlT2JqPW1hcE1vdmVdIGFsdGVybmF0ZSBtYXAgbW92ZSBvYmplY3QgZm9yIHVzZSB3aXRoIG11bHRpIG1hcCBwYWdlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnM/OiBMYXllckJhc2VWZWN0b3JHZW9Kc29uT3B0aW9ucykge1xyXG4gICAgICAgIHVybCA9IHR5cGVvZiB1cmwgPT0gJ3N0cmluZycgPyB1cmwgOiAnJztcclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl9nZW9Kc29uRm9ybWF0ID0gbmV3IG9sLmZvcm1hdC5HZW9KU09OKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybSA9IG9wdGlvbnMudHJhbnNmb3JtIHx8IHtkYXRhUHJvamVjdGlvbjogcHJvai5wcm9qNDMyNiwgZmVhdHVyZVByb2plY3Rpb246IHByb2oucHJvajM4NTd9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdXRvTG9hZCB8fCB0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmZWF0dXJlIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlQ29sbGVjdGlvbiAtIGFzIGdlb2pzb24gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGFkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uOiBKU09OKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW5zZm9ybS5kYXRhUHJvamVjdGlvbiA9PSAnRVBTRzozODU3JyAmJiB0aGlzLl90cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb24gPT0gJ0VQU0c6Mzg1NycpIHtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLmFkZEZlYXR1cmVzKHRoaXMuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLmFkZEZlYXR1cmVzKHRoaXMuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uLCB0aGlzLl90cmFuc2Zvcm0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0cmlnZ2VyIGxvYWQgZmVhdHVyZXNcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBpZiBhbHJlYWR5IGxvYWRlZFxyXG4gICAgICovXHJcbiAgICBfbG9hZCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHN1cGVyLl9sb2FkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmdldCh0aGlzLl91cmwsXHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtcyxcclxuICAgICAgICAgICAgKGQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmVhdHVyZXMoZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDYWxsYmFjayh0aGlzKTtcclxuICAgICAgICAgICAgfSwgJ2pzb24nKS5mYWlsKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZCB0aGUganNvbiByZXNwb25zZVxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIG1hcE1vdmVDYWxsYmFjayhkKSB7XHJcbiAgICAgICAgc3VwZXIubWFwTW92ZUNhbGxiYWNrKGQpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLl9nZW9Kc29uRm9ybWF0LnJlYWRGZWF0dXJlcyhkLCB0aGlzLl90cmFuc2Zvcm0pKTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiA9IExheWVyQmFzZVZlY3Rvckdlb0pzb247XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyQmFzZVZlY3Rvckdlb0pzb247XHJcbiJdfQ==