"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseXyzTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlWHl6VGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlWHl6VGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7R0FFRztBQUNILHlDQUF3RDtBQUN4RCwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFHN0I7OztHQUdHO0FBQ0g7SUFBc0Msb0NBQVM7SUFHM0M7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsMEJBQVksR0FBVyxFQUFFLE9BQXlCO1FBQWxELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQVl0QjtRQVhHLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFFL0UsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxLQUFJLENBQUMsT0FBd0I7WUFDckMsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztZQUNyQixhQUFhLEVBQUUsS0FBSSxDQUFDLGNBQWM7WUFDbEMsYUFBYSxFQUFFLEtBQUksQ0FBQyxjQUFjO1NBQ3JDLENBQUUsQ0FBQztRQUVKLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFDMUMsQ0FBQztJQU1ELHNCQUFJLG9DQUFNO1FBSlY7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQXdCLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxxQ0FBTztRQUpYOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUF5QixDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBbkRELENBQXNDLHFCQUFTLEdBbUQ5QztBQW5EWSw0Q0FBZ0I7QUFxRDdCLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzs7QUFDdkMsa0JBQWUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi80LzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQge0xheWVyQmFzZSwgTGF5ZXJCYXNlT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2UnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcblxyXG4vKipcclxuICogWFlaIHRpbGVcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExheWVyQmFzZVh5elRpbGUgZXh0ZW5kcyBMYXllckJhc2Uge1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBYWVogdGlsZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHVybCBmb3Igc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlRXNyaVN0eWxlPWZhbHNlXSBpZiB0aGUgbWFwIHNlcnZpY2Ugc3R5bGUgc2hvdWxkIGJlIHVzZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG9wdGlvbnM6IExheWVyQmFzZU9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG5ldyBvbC5zb3VyY2UuWFlaKHt1cmw6IHRoaXMudXJsID09ICcnID8gdW5kZWZpbmVkIDogdGhpcy51cmx9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IG5ldyBvbC5sYXllci5UaWxlKHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLl9zb3VyY2UgYXMgb2wuc291cmNlLlhZWixcclxuICAgICAgICAgICAgdmlzaWJsZTogdGhpcy52aXNpYmxlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiB0aGlzLm9wYWNpdHksXHJcbiAgICAgICAgICAgIG1pblJlc29sdXRpb246IHRoaXMuX21pblJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IHRoaXMuX21heFJlc29sdXRpb25cclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KHRoaXMuX3pJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge29sLnNvdXJjZS5YWVp9IHRoZSB2ZWN0b3Igc291cmNlXHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlhZWiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZSBhcyBvbC5zb3VyY2UuWFlaO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtvbC5sYXllci5UaWxlfG9sLmxheWVyLkJhc2V8dW5kZWZpbmVkfSB0aGUgb2wgbGF5ZXJcclxuICAgICAqL1xyXG4gICAgZ2V0IG9sTGF5ZXIoKSA6IG9sLmxheWVyLlRpbGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vbExheWVyIGFzIG9sLmxheWVyLlRpbGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLkxheWVyQmFzZVh5elRpbGUgPSBMYXllckJhc2VYeXpUaWxlO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckJhc2VYeXpUaWxlO1xyXG4iXX0=