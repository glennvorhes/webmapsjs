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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QiwrQ0FBaUQ7QUFDakQsd0RBQWtEO0FBRWxELElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFhM0I7OztHQUdHO0FBQ0g7SUFBNEMsMENBQWU7SUFJdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsZ0NBQVksR0FBWSxFQUFFLE9BQTJDO1FBQTNDLHdCQUFBLEVBQUEsWUFBMkM7UUFBckUsaUJBYUM7UUFaRyxHQUFHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDeEMsUUFBQSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFFcEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pGLEtBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxzQkFBUSxDQUFDO1FBRWxGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7O0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILDRDQUFXLEdBQVgsVUFBWSxpQkFBc0I7UUFFOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsc0NBQUssR0FBTDtRQUFBLGlCQWtCQztRQWhCRyxFQUFFLENBQUMsQ0FBQyxpQkFBTSxLQUFLLFdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNYLElBQUksQ0FBQyxPQUFPLEVBQ1osVUFBQyxDQUFDO1lBQ0UsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ2Y7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnREFBZSxHQUFmLFVBQWdCLENBQUM7UUFDYixpQkFBTSxlQUFlLFlBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUN2RCxFQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUEzRkQsQ0FBNEMsaUNBQWUsR0EyRjFEO0FBM0ZZLHdEQUFzQjtBQTZGbkMsRUFBRSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0FBQ25ELGtCQUFlLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMi8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TGF5ZXJCYXNlVmVjdG9yLCBMYXllckJhc2VWZWN0b3JPcHRpb25zfSBmcm9tICcuL0xheWVyQmFzZVZlY3Rvcic7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5pbXBvcnQge01hcE1vdmVDbHN9IGZyb20gXCIuLi9vbEhlbHBlcnMvbWFwTW92ZUNsc1wiO1xyXG5pbXBvcnQgKiBhcyBwcm9qIGZyb20gJy4uL29sSGVscGVycy9wcm9qZWN0aW9ucyc7XHJcbmltcG9ydCB7cHJvajM4NTd9IGZyb20gXCIuLi9vbEhlbHBlcnMvcHJvamVjdGlvbnNcIjtcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2xheWVycycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjcnNUcmFuc2Zvcm0ge1xyXG4gICAgZGF0YVByb2plY3Rpb24/OiBvbC5wcm9qLlByb2plY3Rpb247XHJcbiAgICBmZWF0dXJlUHJvamVjdGlvbj86IG9sLnByb2ouUHJvamVjdGlvbjtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbk9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VWZWN0b3JPcHRpb25zIHtcclxuICAgIHRyYW5zZm9ybT86IGNyc1RyYW5zZm9ybTtcclxuICAgIG1hcE1vdmVPYmo/OiBNYXBNb3ZlQ2xzO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIFZlY3RvciBHZW9Kc29uIExheWVyXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VWZWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckJhc2VWZWN0b3JHZW9Kc29uIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yIHtcclxuICAgIF9nZW9Kc29uRm9ybWF0OiBvbC5mb3JtYXQuR2VvSlNPTjtcclxuICAgIF90cmFuc2Zvcm06IGNyc1RyYW5zZm9ybTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHVybCAtIHJlc291cmNlIHVybCwgc2V0IHRvICcnIHRvIG1ha2UgYmxhbmsgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0xvYWQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYXV0byBsb2FkIGlmIG5vdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuc3R5bGU9dW5kZWZpbmVkXSB0aGUgbGF5ZXIgc3R5bGUsIHVzZSBvcGVubGF5ZXJzIGRlZmF1bHQgc3R5bGUgaWYgbm90IGRlZmluZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMub25EZW1hbmQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIGJ5IGV4dGVudCBvbiBtYXAgbW92ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9uRGVtYW5kRGVsYXk9MzAwXSBkZWxheSBiZWZvcmUgdGhlIG1hcCBtb3ZlIGNhbGxiYWNrIHNob3VsZCBiZSBjYWxsZWRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMudHJhbnNmb3JtPXt9XSBTUiB0cmFuc2Zvcm0sIHNldCBhcyBmYWxzZSBmb3Igbm8gdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50cmFuc2Zvcm0uZGF0YVByb2plY3Rpb249RVBTRzo0MzI2IHRoZSBkYXRhIENSU1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uPUVQU0c6Mzg1NyB0aGUgZmVhdHVyZS9tYXAgQ1JTXHJcbiAgICAgKiBAcGFyYW0ge21hcE1vdmVNYWtlR2V0UGFyYW1zfSBbb3B0aW9ucy5tYXBNb3ZlTWFrZUdldFBhcmFtcz1mdW5jdGlvbihseXIsIGV4dGVudCwgem9vbUxldmVsKXt9XSBmdW5jdGlvbiB0byBjcmVhdGUgYWRkaXRpb25hbCBtYXAgbW92ZSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7TWFwTW92ZUNsc30gW29wdGlvbnMubWFwTW92ZU9iaj1tYXBNb3ZlXSBhbHRlcm5hdGUgbWFwIG1vdmUgb2JqZWN0IGZvciB1c2Ugd2l0aCBtdWx0aSBtYXAgcGFnZXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodXJsPzogc3RyaW5nLCBvcHRpb25zOiBMYXllckJhc2VWZWN0b3JHZW9Kc29uT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgdXJsID0gdHlwZW9mIHVybCA9PSAnc3RyaW5nJyA/IHVybCA6ICcnO1xyXG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2dlb0pzb25Gb3JtYXQgPSBuZXcgb2wuZm9ybWF0Lkdlb0pTT04oKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm0gfHwge307XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtLmRhdGFQcm9qZWN0aW9uID0gdGhpcy5fdHJhbnNmb3JtLmRhdGFQcm9qZWN0aW9uIHx8IHByb2oucHJvajQzMjY7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uID0gdGhpcy5fdHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uIHx8IHByb2ozODU3O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdXRvTG9hZCB8fCB0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmZWF0dXJlIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlQ29sbGVjdGlvbiAtIGFzIGdlb2pzb24gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGFkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zb3VyY2UuYWRkRmVhdHVyZXModGhpcy5fZ2VvSnNvbkZvcm1hdC5yZWFkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0cmlnZ2VyIGxvYWQgZmVhdHVyZXNcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBpZiBhbHJlYWR5IGxvYWRlZFxyXG4gICAgICovXHJcbiAgICBfbG9hZCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHN1cGVyLl9sb2FkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmdldCh0aGlzLl91cmwsXHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtcyxcclxuICAgICAgICAgICAgKGQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmVhdHVyZXMoZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDYWxsYmFjayh0aGlzKTtcclxuICAgICAgICAgICAgfSwgJ2pzb24nKS5mYWlsKFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZCB0aGUganNvbiByZXNwb25zZVxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIG1hcE1vdmVDYWxsYmFjayhkKSB7XHJcbiAgICAgICAgc3VwZXIubWFwTW92ZUNhbGxiYWNrKGQpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLl9nZW9Kc29uRm9ybWF0LnJlYWRGZWF0dXJlcyhkLFxyXG4gICAgICAgICAgICB7ZmVhdHVyZVByb2plY3Rpb246IHRoaXMuX3RyYW5zZm9ybS5mZWF0dXJlUHJvamVjdGlvbiwgZGF0YVByb2plY3Rpb246IHRoaXMuX3RyYW5zZm9ybS5kYXRhUHJvamVjdGlvbn0pKTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiA9IExheWVyQmFzZVZlY3Rvckdlb0pzb247XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyQmFzZVZlY3Rvckdlb0pzb247XHJcbiJdfQ==