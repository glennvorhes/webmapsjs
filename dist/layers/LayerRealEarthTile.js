/**
 * Created by gavorhes on 11/4/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayerBaseXyzTile_1 = require("./LayerBaseXyzTile");
var RealEarthAnimateTile_1 = require("../mixin/RealEarthAnimateTile");
var provide_1 = require("../util/provide");
var nm = provide_1.default('layers');
/**
 * Real earth tile
 * @augments LayerBaseXyzTile
 */
var LayerRealEarthTile = (function (_super) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerRealEarthTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJSZWFsRWFydGhUaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllclJlYWxFYXJ0aFRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7Ozs7Ozs7QUFFSCx1REFBb0Q7QUFFcEQsc0VBQWlFO0FBQ2pFLDJDQUFzQztBQUV0QyxJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBUzdCOzs7R0FHRztBQUNIO0lBQXdDLHNDQUFnQjtJQUlwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILDRCQUFZLE9BQWtDO1FBQTlDLGlCQVdDO1FBVkcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFFBQUEsa0JBQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFDO1lBQ25CLEtBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNsQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksOEJBQW9CLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osUUFBQSxrQkFBTSx1REFBcUQsT0FBTyxDQUFDLFFBQVEsdUJBQW9CLEVBQUUsT0FBTyxDQUFDLFNBQUM7WUFDMUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUM7O0lBQ0wsQ0FBQztJQUVELHlDQUFZLEdBQVosVUFBYSxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBbkRELENBQXdDLG1DQUFnQixHQW1EdkQ7QUFuRFksZ0RBQWtCO0FBcUQvQixFQUFFLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7O0FBQzNDLGtCQUFlLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvNC8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TGF5ZXJCYXNlWHl6VGlsZX0gZnJvbSAnLi9MYXllckJhc2VYeXpUaWxlJztcclxuaW1wb3J0IHtMYXllckJhc2VPcHRpb25zfSBmcm9tICcuL0xheWVyQmFzZSc7XHJcbmltcG9ydCBSZWFsRWFydGhBbmltYXRlVGlsZSBmcm9tICcuLi9taXhpbi9SZWFsRWFydGhBbmltYXRlVGlsZSc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCB7SVJlYWxFYXJ0aEFuaW1hdGUsIHRpbWVzTG9hZGVkQ2FsbGJhY2t9IGZyb20gXCIuLi9taXhpbi9SZWFsRWFydGhBbmltYXRlXCI7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyUmVhbEVhcnRoVGlsZU9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VPcHRpb25zIHtcclxuICAgIHByb2R1Y3RzOiBzdHJpbmc7XHJcbiAgICBhbmltYXRlPzogYm9vbGVhbjtcclxuICAgIHRpbWVMb2FkQ2FsbGJhY2s/OiB0aW1lc0xvYWRlZENhbGxiYWNrO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlYWwgZWFydGggdGlsZVxyXG4gKiBAYXVnbWVudHMgTGF5ZXJCYXNlWHl6VGlsZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExheWVyUmVhbEVhcnRoVGlsZSBleHRlbmRzIExheWVyQmFzZVh5elRpbGUgaW1wbGVtZW50cyBJUmVhbEVhcnRoQW5pbWF0ZSB7XHJcbiAgICBfcHJvZHVjdHM6IHN0cmluZztcclxuICAgIGFuaW1hdG9yOiBSZWFsRWFydGhBbmltYXRlVGlsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGxheWVyIGZvciBhbGwgb3RoZXJzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wcm9kdWN0cyAtIHRoZSBwcm9kdWN0cyB0byByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmhhc1RpbWVzPWZhbHNlXSBJZiB0aGUgbGF5ZXIgaXMgdGltZSBkZXBlbmRlbnQsIGZpeGVkIHNldCBvZiBkYXRlc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hbmltYXRlPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGFuaW1hdGVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IExheWVyUmVhbEVhcnRoVGlsZU9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLmFuaW1hdGUgPSB0eXBlb2Ygb3B0aW9ucy5hbmltYXRlID09ICdib29sZWFuJyA/IG9wdGlvbnMuYW5pbWF0ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmFuaW1hdGUpIHtcclxuICAgICAgICAgICAgc3VwZXIoJycsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IG9wdGlvbnMucHJvZHVjdHM7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0b3IgPSBuZXcgUmVhbEVhcnRoQW5pbWF0ZVRpbGUodGhpcywgb3B0aW9ucy50aW1lTG9hZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRvci50aW1lSW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGBodHRwOi8vcmVhbGVhcnRoLnNzZWMud2lzYy5lZHUvYXBpL2ltYWdlP3Byb2R1Y3RzPSR7b3B0aW9ucy5wcm9kdWN0c30meD17eH0meT17eX0mej17en1gLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZHVjdHMgPSBvcHRpb25zLnByb2R1Y3RzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXllclRpbWUodGhlVGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0b3Iuc2V0TGF5ZXJUaW1lKHRoZVRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VwZXIuX2xvYWQoKTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJSZWFsRWFydGhUaWxlID0gTGF5ZXJSZWFsRWFydGhUaWxlO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllclJlYWxFYXJ0aFRpbGU7XHJcbiJdfQ==