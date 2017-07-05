/**
 * Created by gavorhes on 11/13/2015.
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
exports.default = LayerVectorRealEarth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJSZWFsRWFydGhWZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGF5ZXJzL0xheWVyUmVhbEVhcnRoVmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7O0FBRUgsbUVBQStGO0FBQy9GLDBFQUFxRTtBQUNyRSwyQ0FBc0M7QUFHdEMsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVM3Qjs7O0dBR0c7QUFDSDtJQUEwQyx3Q0FBc0I7SUFJNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFDSCw4QkFBWSxPQUFvQztRQUFoRCxpQkFZQztRQVhHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN6QixRQUFBLGtCQUFNLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBQztZQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDbEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdDQUFzQixDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRSxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBQyxDQUFDO1lBQzlDLFFBQUEsa0JBQU0sMkNBQTJDLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFDaEUsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsaUJBQU0sS0FBSyxXQUFFLENBQUM7SUFDekIsQ0FBQztJQUdMLDJCQUFDO0FBQUQsQ0FBQyxBQS9ERCxDQUEwQywrQ0FBc0IsR0ErRC9EO0FBL0RZLG9EQUFvQjtBQWlFakMsRUFBRSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQy9DLGtCQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMTMvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQge0xheWVyQmFzZVZlY3Rvckdlb0pzb24sIExheWVyQmFzZVZlY3Rvckdlb0pzb25PcHRpb25zfSBmcm9tICcuL0xheWVyQmFzZVZlY3Rvckdlb0pzb24nO1xyXG5pbXBvcnQgUmVhbEVhcnRoQW5pbWF0ZVZlY3RvciBmcm9tICcuLi9taXhpbi9SZWFsRWFydGhBbmltYXRlVmVjdG9yJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IHtJUmVhbEVhcnRoQW5pbWF0ZSwgdGltZXNMb2FkZWRDYWxsYmFja30gZnJvbSBcIi4uL21peGluL1JlYWxFYXJ0aEFuaW1hdGVcIjtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyVmVjdG9yUmVhbEVhcnRoT3B0aW9ucyBleHRlbmRzIExheWVyQmFzZVZlY3Rvckdlb0pzb25PcHRpb25zIHtcclxuICAgIHByb2R1Y3RzOiBzdHJpbmc7XHJcbiAgICBhbmltYXRlPzogYm9vbGVhbjtcclxuICAgIHRpbWVMb2FkQ2FsbGJhY2s/OiB0aW1lc0xvYWRlZENhbGxiYWNrO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFZlY3RvciByZWFsIGVhcnRoIHZlY3RvclxyXG4gKiBAYXVnbWVudHMgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExheWVyVmVjdG9yUmVhbEVhcnRoIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiBpbXBsZW1lbnRzIElSZWFsRWFydGhBbmltYXRlIHtcclxuICAgIF9wcm9kdWN0czogc3RyaW5nO1xyXG4gICAgYW5pbWF0b3I6IFJlYWxFYXJ0aEFuaW1hdGVWZWN0b3I7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFsIEVhcnRoIHZlY3RvciBsYXllclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvTG9hZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBhdXRvIGxvYWQgaWYgbm90IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5zdHlsZT11bmRlZmluZWRdIHRoZSBsYXllciBzdHlsZSwgdXNlIG9wZW5sYXllcnMgZGVmYXVsdCBzdHlsZSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5vbkRlbWFuZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgYnkgZXh0ZW50IG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub25EZW1hbmREZWxheT0zMDBdIGRlbGF5IGJlZm9yZSB0aGUgbWFwIG1vdmUgY2FsbGJhY2sgc2hvdWxkIGJlIGNhbGxlZFxyXG4gICAgICogQHBhcmFtIHtNYXBNb3ZlQ2xzfSBbb3B0aW9ucy5tYXBNb3ZlT2JqPW1hcE1vdmVdIGFsdGVybmF0ZSBtYXAgbW92ZSBvYmplY3QgZm9yIHVzZSB3aXRoIG11bHRpIG1hcCBwYWdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy50cmFuc2Zvcm09e31dIFNSIHRyYW5zZm9ybSwgc2V0IGFzIGZhbHNlIGZvciBubyB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnRyYW5zZm9ybS5kYXRhUHJvamVjdGlvbj1FUFNHOjQzMjYgdGhlIGRhdGEgQ1JTXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb249RVBTRzozODU3IHRoZSBmZWF0dXJlL21hcCBDUlNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wcm9kdWN0cyByZWFsIGVhcnRoIHByb2R1Y3RzIGlkZW50aWZpZXJcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYW5pbWF0ZT1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBhbmltYXRlZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBMYXllclZlY3RvclJlYWxFYXJ0aE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLmFuaW1hdGUgPSB0eXBlb2Ygb3B0aW9ucy5hbmltYXRlID09ICdib29sZWFuJyA/IG9wdGlvbnMuYW5pbWF0ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdXRvTG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdXBlcignJywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gb3B0aW9ucy5wcm9kdWN0cztcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRvciA9IG5ldyBSZWFsRWFydGhBbmltYXRlVmVjdG9yKHRoaXMsIG9wdGlvbnMudGltZUxvYWRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0b3IudGltZUluaXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHtwcm9kdWN0czogb3B0aW9ucy5wcm9kdWN0c307XHJcbiAgICAgICAgICAgIHN1cGVyKCdodHRwOi8vcmVhbGVhcnRoLnNzZWMud2lzYy5lZHUvYXBpL3NoYXBlcycsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXllclRpbWUodGhlVGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0b3Iuc2V0TGF5ZXJUaW1lKHRoZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWQoKTogYm9vbGVhbntcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLl9sb2FkKCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxubm0uTGF5ZXJWZWN0b3JSZWFsRWFydGggPSBMYXllclZlY3RvclJlYWxFYXJ0aDtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJWZWN0b3JSZWFsRWFydGg7XHJcbiJdfQ==