/**
 * Created by gavorhes on 11/4/2015.
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
exports.default = LayerRealEarthTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJSZWFsRWFydGhUaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllclJlYWxFYXJ0aFRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7Ozs7Ozs7Ozs7Ozs7QUFFSCx1REFBb0Q7QUFFcEQsc0VBQWlFO0FBQ2pFLDJDQUFzQztBQUV0QyxJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBUzdCOzs7R0FHRztBQUNIO0lBQXdDLHNDQUFnQjtJQUlwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILDRCQUFZLE9BQWtDO1FBQTlDLGlCQVdDO1FBVkcsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFFBQUEsa0JBQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFDO1lBQ25CLEtBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNsQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksOEJBQW9CLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osUUFBQSxrQkFBTSx1REFBcUQsT0FBTyxDQUFDLFFBQVEsdUJBQW9CLEVBQUUsT0FBTyxDQUFDLFNBQUM7WUFDMUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUM7O0lBQ0wsQ0FBQztJQUVELHlDQUFZLEdBQVosVUFBYSxPQUFlO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBbkRELENBQXdDLG1DQUFnQixHQW1EdkQ7QUFuRFksZ0RBQWtCO0FBcUQvQixFQUFFLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDM0Msa0JBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS80LzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtMYXllckJhc2VYeXpUaWxlfSBmcm9tICcuL0xheWVyQmFzZVh5elRpbGUnO1xyXG5pbXBvcnQge0xheWVyQmFzZU9wdGlvbnN9IGZyb20gJy4vTGF5ZXJCYXNlJztcclxuaW1wb3J0IFJlYWxFYXJ0aEFuaW1hdGVUaWxlIGZyb20gJy4uL21peGluL1JlYWxFYXJ0aEFuaW1hdGVUaWxlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IHtJUmVhbEVhcnRoQW5pbWF0ZSwgdGltZXNMb2FkZWRDYWxsYmFja30gZnJvbSBcIi4uL21peGluL1JlYWxFYXJ0aEFuaW1hdGVcIjtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJSZWFsRWFydGhUaWxlT3B0aW9ucyBleHRlbmRzIExheWVyQmFzZU9wdGlvbnMge1xyXG4gICAgcHJvZHVjdHM6IHN0cmluZztcclxuICAgIGFuaW1hdGU/OiBib29sZWFuO1xyXG4gICAgdGltZUxvYWRDYWxsYmFjaz86IHRpbWVzTG9hZGVkQ2FsbGJhY2s7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmVhbCBlYXJ0aCB0aWxlXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VYeXpUaWxlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJSZWFsRWFydGhUaWxlIGV4dGVuZHMgTGF5ZXJCYXNlWHl6VGlsZSBpbXBsZW1lbnRzIElSZWFsRWFydGhBbmltYXRlIHtcclxuICAgIF9wcm9kdWN0czogc3RyaW5nO1xyXG4gICAgYW5pbWF0b3I6IFJlYWxFYXJ0aEFuaW1hdGVUaWxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2UgbGF5ZXIgZm9yIGFsbCBvdGhlcnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnByb2R1Y3RzIC0gdGhlIHByb2R1Y3RzIHRvIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaGFzVGltZXM9ZmFsc2VdIElmIHRoZSBsYXllciBpcyB0aW1lIGRlcGVuZGVudCwgZml4ZWQgc2V0IG9mIGRhdGVzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFuaW1hdGU9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYmUgYW5pbWF0ZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogTGF5ZXJSZWFsRWFydGhUaWxlT3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMuYW5pbWF0ZSA9IHR5cGVvZiBvcHRpb25zLmFuaW1hdGUgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbmltYXRlIDogZmFsc2U7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5pbWF0ZSkge1xyXG4gICAgICAgICAgICBzdXBlcignJywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gb3B0aW9ucy5wcm9kdWN0cztcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRvciA9IG5ldyBSZWFsRWFydGhBbmltYXRlVGlsZSh0aGlzLCBvcHRpb25zLnRpbWVMb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdG9yLnRpbWVJbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VwZXIoYGh0dHA6Ly9yZWFsZWFydGguc3NlYy53aXNjLmVkdS9hcGkvaW1hZ2U/cHJvZHVjdHM9JHtvcHRpb25zLnByb2R1Y3RzfSZ4PXt4fSZ5PXt5fSZ6PXt6fWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IG9wdGlvbnMucHJvZHVjdHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldExheWVyVGltZSh0aGVUaW1lOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRvci5zZXRMYXllclRpbWUodGhlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbG9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdXBlci5fbG9hZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllclJlYWxFYXJ0aFRpbGUgPSBMYXllclJlYWxFYXJ0aFRpbGU7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyUmVhbEVhcnRoVGlsZTtcclxuIl19