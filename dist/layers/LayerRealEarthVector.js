/**
 * Created by gavorhes on 11/13/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayerBaseVectorGeoJson_1 = require("./LayerBaseVectorGeoJson");
var RealEarthAnimateVector_1 = require("../mixin/RealEarthAnimateVector");
var provide_1 = require("../util/provide");
var nm = provide_1.default('layers');
/**
 * Vector real earth vector
 * @augments LayerBaseVectorGeoJson
 */
var LayerVectorRealEarth = (function (_super) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerVectorRealEarth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJSZWFsRWFydGhWZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGF5ZXJzL0xheWVyUmVhbEVhcnRoVmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7O0FBRUgsbUVBQStGO0FBQy9GLDBFQUFxRTtBQUNyRSwyQ0FBc0M7QUFHdEMsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVM3Qjs7O0dBR0c7QUFDSDtJQUEwQyx3Q0FBc0I7SUFJNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFDSCw4QkFBWSxPQUFvQztRQUFoRCxpQkFZQztRQVhHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN6QixRQUFBLGtCQUFNLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBQztZQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDbEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdDQUFzQixDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRSxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBQyxDQUFDO1lBQzlDLFFBQUEsa0JBQU0sMkNBQTJDLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFDaEUsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsaUJBQU0sS0FBSyxXQUFFLENBQUM7SUFDekIsQ0FBQztJQUdMLDJCQUFDO0FBQUQsQ0FBQyxBQS9ERCxDQUEwQywrQ0FBc0IsR0ErRC9EO0FBL0RZLG9EQUFvQjtBQWlFakMsRUFBRSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDOztBQUMvQyxrQkFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDExLzEzLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtMYXllckJhc2VWZWN0b3JHZW9Kc29uLCBMYXllckJhc2VWZWN0b3JHZW9Kc29uT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2VWZWN0b3JHZW9Kc29uJztcclxuaW1wb3J0IFJlYWxFYXJ0aEFuaW1hdGVWZWN0b3IgZnJvbSAnLi4vbWl4aW4vUmVhbEVhcnRoQW5pbWF0ZVZlY3Rvcic7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCB7SVJlYWxFYXJ0aEFuaW1hdGUsIHRpbWVzTG9hZGVkQ2FsbGJhY2t9IGZyb20gXCIuLi9taXhpbi9SZWFsRWFydGhBbmltYXRlXCI7XHJcblxyXG5jb25zdCBubSA9IHByb3ZpZGUoJ2xheWVycycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllclZlY3RvclJlYWxFYXJ0aE9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VWZWN0b3JHZW9Kc29uT3B0aW9ucyB7XHJcbiAgICBwcm9kdWN0czogc3RyaW5nO1xyXG4gICAgYW5pbWF0ZT86IGJvb2xlYW47XHJcbiAgICB0aW1lTG9hZENhbGxiYWNrPzogdGltZXNMb2FkZWRDYWxsYmFjaztcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBWZWN0b3IgcmVhbCBlYXJ0aCB2ZWN0b3JcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVZlY3Rvckdlb0pzb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllclZlY3RvclJlYWxFYXJ0aCBleHRlbmRzIExheWVyQmFzZVZlY3Rvckdlb0pzb24gaW1wbGVtZW50cyBJUmVhbEVhcnRoQW5pbWF0ZSB7XHJcbiAgICBfcHJvZHVjdHM6IHN0cmluZztcclxuICAgIGFuaW1hdG9yOiBSZWFsRWFydGhBbmltYXRlVmVjdG9yO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhbCBFYXJ0aCB2ZWN0b3IgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0xvYWQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYXV0byBsb2FkIGlmIG5vdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuc3R5bGU9dW5kZWZpbmVkXSB0aGUgbGF5ZXIgc3R5bGUsIHVzZSBvcGVubGF5ZXJzIGRlZmF1bHQgc3R5bGUgaWYgbm90IGRlZmluZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMub25EZW1hbmQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIGJ5IGV4dGVudCBvbiBtYXAgbW92ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9uRGVtYW5kRGVsYXk9MzAwXSBkZWxheSBiZWZvcmUgdGhlIG1hcCBtb3ZlIGNhbGxiYWNrIHNob3VsZCBiZSBjYWxsZWRcclxuICAgICAqIEBwYXJhbSB7TWFwTW92ZUNsc30gW29wdGlvbnMubWFwTW92ZU9iaj1tYXBNb3ZlXSBhbHRlcm5hdGUgbWFwIG1vdmUgb2JqZWN0IGZvciB1c2Ugd2l0aCBtdWx0aSBtYXAgcGFnZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMudHJhbnNmb3JtPXt9XSBTUiB0cmFuc2Zvcm0sIHNldCBhcyBmYWxzZSBmb3Igbm8gdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50cmFuc2Zvcm0uZGF0YVByb2plY3Rpb249RVBTRzo0MzI2IHRoZSBkYXRhIENSU1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHJhbnNmb3JtLmZlYXR1cmVQcm9qZWN0aW9uPUVQU0c6Mzg1NyB0aGUgZmVhdHVyZS9tYXAgQ1JTXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucHJvZHVjdHMgcmVhbCBlYXJ0aCBwcm9kdWN0cyBpZGVudGlmaWVyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFuaW1hdGU9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYmUgYW5pbWF0ZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogTGF5ZXJWZWN0b3JSZWFsRWFydGhPcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucy5hbmltYXRlID0gdHlwZW9mIG9wdGlvbnMuYW5pbWF0ZSA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmFuaW1hdGUgOiBmYWxzZTtcclxuICAgICAgICBpZiAob3B0aW9ucy5hbmltYXRlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXV0b0xvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3VwZXIoJycsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IG9wdGlvbnMucHJvZHVjdHM7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0b3IgPSBuZXcgUmVhbEVhcnRoQW5pbWF0ZVZlY3Rvcih0aGlzLCBvcHRpb25zLnRpbWVMb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdG9yLnRpbWVJbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSB7cHJvZHVjdHM6IG9wdGlvbnMucHJvZHVjdHN9O1xyXG4gICAgICAgICAgICBzdXBlcignaHR0cDovL3JlYWxlYXJ0aC5zc2VjLndpc2MuZWR1L2FwaS9zaGFwZXMnLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGF5ZXJUaW1lKHRoZVRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmFuaW1hdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdG9yLnNldExheWVyVGltZSh0aGVUaW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0b3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdXBlci5fbG9hZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbm5tLkxheWVyVmVjdG9yUmVhbEVhcnRoID0gTGF5ZXJWZWN0b3JSZWFsRWFydGg7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyVmVjdG9yUmVhbEVhcnRoO1xyXG4iXX0=