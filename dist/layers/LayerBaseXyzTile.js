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
/**
 * Created by gavorhes on 12/4/2015.
 */
var LayerBase_1 = require("./LayerBase");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var nm = provide_1.default('layers');
/**
 * XYZ tile
 * @augments LayerBase
 */
var LayerBaseXyzTile = (function (_super) {
    __extends(LayerBaseXyzTile, _super);
    /**
     * The XYZ tile layer
     * @param {string} url - url for source
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
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     */
    function LayerBaseXyzTile(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, url, options) || this;
        _this._source = new ol.source.XYZ({ url: _this.url == '' ? undefined : _this.url });
        _this._olLayer = new ol.layer.Tile({
            source: _this._source,
            visible: _this.visible,
            opacity: _this.opacity,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution
        });
        _this._olLayer.setZIndex(_this._zIndex);
        return _this;
    }
    Object.defineProperty(LayerBaseXyzTile.prototype, "source", {
        /**
         *
         * @returns {ol.source.XYZ} the vector source
         */
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBaseXyzTile.prototype, "olLayer", {
        /**
         *
         * @returns {ol.layer.Tile|ol.layer.Base|undefined} the ol layer
         */
        get: function () {
            return this._olLayer;
        },
        enumerable: true,
        configurable: true
    });
    return LayerBaseXyzTile;
}(LayerBase_1.LayerBase));
exports.LayerBaseXyzTile = LayerBaseXyzTile;
nm.LayerBaseXyzTile = LayerBaseXyzTile;
exports.default = LayerBaseXyzTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlWHl6VGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlWHl6VGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILHlDQUF3RDtBQUN4RCwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFHN0I7OztHQUdHO0FBQ0g7SUFBc0Msb0NBQVM7SUFHM0M7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsMEJBQVksR0FBVyxFQUFFLE9BQThCO1FBQTlCLHdCQUFBLEVBQUEsWUFBOEI7UUFBdkQsWUFDSSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBWXRCO1FBWEcsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLFNBQVMsR0FBRyxLQUFJLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUUvRSxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDOUIsTUFBTSxFQUFFLEtBQUksQ0FBQyxPQUF3QjtZQUNyQyxPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO1lBQ3JCLGFBQWEsRUFBRSxLQUFJLENBQUMsY0FBYztZQUNsQyxhQUFhLEVBQUUsS0FBSSxDQUFDLGNBQWM7U0FDckMsQ0FBRSxDQUFDO1FBRUosS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUMxQyxDQUFDO0lBTUQsc0JBQUksb0NBQU07UUFKVjs7O1dBR0c7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBd0IsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLHFDQUFPO1FBSlg7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQXlCLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFDTCx1QkFBQztBQUFELENBQUMsQUFuREQsQ0FBc0MscUJBQVMsR0FtRDlDO0FBbkRZLDRDQUFnQjtBQXFEN0IsRUFBRSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ3ZDLGtCQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvNC8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHtMYXllckJhc2UsIExheWVyQmFzZU9wdGlvbnN9IGZyb20gJy4vTGF5ZXJCYXNlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFhZWiB0aWxlXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckJhc2VYeXpUaWxlIGV4dGVuZHMgTGF5ZXJCYXNlIHtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgWFlaIHRpbGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB1cmwgZm9yIHNvdXJjZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUVzcmlTdHlsZT1mYWxzZV0gaWYgdGhlIG1hcCBzZXJ2aWNlIHN0eWxlIHNob3VsZCBiZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBvcHRpb25zOiBMYXllckJhc2VPcHRpb25zID0ge30pIHtcclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG5ldyBvbC5zb3VyY2UuWFlaKHt1cmw6IHRoaXMudXJsID09ICcnID8gdW5kZWZpbmVkIDogdGhpcy51cmx9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IG5ldyBvbC5sYXllci5UaWxlKHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLl9zb3VyY2UgYXMgb2wuc291cmNlLlhZWixcclxuICAgICAgICAgICAgdmlzaWJsZTogdGhpcy52aXNpYmxlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiB0aGlzLm9wYWNpdHksXHJcbiAgICAgICAgICAgIG1pblJlc29sdXRpb246IHRoaXMuX21pblJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IHRoaXMuX21heFJlc29sdXRpb25cclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KHRoaXMuX3pJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge29sLnNvdXJjZS5YWVp9IHRoZSB2ZWN0b3Igc291cmNlXHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlhZWiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZSBhcyBvbC5zb3VyY2UuWFlaO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtvbC5sYXllci5UaWxlfG9sLmxheWVyLkJhc2V8dW5kZWZpbmVkfSB0aGUgb2wgbGF5ZXJcclxuICAgICAqL1xyXG4gICAgZ2V0IG9sTGF5ZXIoKSA6IG9sLmxheWVyLlRpbGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vbExheWVyIGFzIG9sLmxheWVyLlRpbGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLkxheWVyQmFzZVh5elRpbGUgPSBMYXllckJhc2VYeXpUaWxlO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckJhc2VYeXpUaWxlO1xyXG4iXX0=