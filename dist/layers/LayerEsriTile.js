"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 12/4/2015.
 */
var provide_1 = require("../util/provide");
var LayerBaseXyzTile_1 = require("./LayerBaseXyzTile");
var esriToOl = require("../olHelpers/esriToOlStyle");
var nm = provide_1.default('layers');
/**
 * Esri tile
 * @augments LayerBaseXyzTile
 */
var LayerEsriTile = (function (_super) {
    __extends(LayerEsriTile, _super);
    /**
     * The Esri tile layer
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
    function LayerEsriTile(url, options) {
        var _this = this;
        if (url.search(/\/$/) == -1) {
            url += '/';
        }
        url += 'tile/{z}/{y}/{x}';
        _this = _super.call(this, url, options) || this;
        _this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;
        if (_this._useEsriStyle) {
            _this.addLegendContent();
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    LayerEsriTile.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        if (additionalContent === void 0) { additionalContent = ''; }
        if (!this._useEsriStyle) {
            _super.prototype.addLegendContent.call(this, additionalContent);
        }
        else {
            var urlCopy = this.url;
            var mapServerIndex = urlCopy.toLowerCase().indexOf('mapserver');
            if (mapServerIndex > -1) {
                urlCopy = urlCopy.slice(0, mapServerIndex + 9);
            }
            else {
                return;
            }
            if (urlCopy[urlCopy.length - 1] !== '/') {
                urlCopy += '/';
            }
            urlCopy += 'legend?f=pjson&callback=?';
            var superAddLegend_1 = _super.prototype.addLegendContent;
            $.get(urlCopy, {}, function (d) {
                var newHtml = esriToOl.makeMapServiceLegend(d);
                superAddLegend_1.call(_this, newHtml);
            }, 'json');
        }
    };
    return LayerEsriTile;
}(LayerBaseXyzTile_1.LayerBaseXyzTile));
exports.LayerEsriTile = LayerEsriTile;
nm.LayerBaseXyzTile = LayerEsriTile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerEsriTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJFc3JpVGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJFc3JpVGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7R0FFRztBQUNILDJDQUFzQztBQUN0Qyx1REFBb0Q7QUFFcEQscURBQXVEO0FBR3ZELElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFNN0I7OztHQUdHO0FBQ0g7SUFBbUMsaUNBQWdCO0lBRy9DOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILHVCQUFZLEdBQVcsRUFBRSxPQUE2QjtRQUF0RCxpQkFhQztRQVpHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDZixDQUFDO1FBQ0QsR0FBRyxJQUFJLGtCQUFrQixDQUFDO1FBRTFCLFFBQUEsa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQUFDO1FBRXBCLEtBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxPQUFPLENBQUMsWUFBWSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUU3RixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDOztJQUNMLENBQUM7SUFHRDs7O09BR0c7SUFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsaUJBQXNCO1FBQXZDLGlCQTBCQztRQTFCZ0Isa0NBQUEsRUFBQSxzQkFBc0I7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN0QixpQkFBTSxnQkFBZ0IsWUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFFdkIsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxJQUFJLEdBQUcsQ0FBQztZQUNuQixDQUFDO1lBRUQsT0FBTyxJQUFJLDJCQUEyQixDQUFDO1lBRXZDLElBQUksZ0JBQWMsR0FBRyxpQkFBTSxnQkFBZ0IsQ0FBQztZQUU1QyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsVUFBQyxDQUFDO2dCQUNqQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLGdCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQUdMLG9CQUFDO0FBQUQsQ0FBQyxBQXRFRCxDQUFtQyxtQ0FBZ0IsR0FzRWxEO0FBdEVZLHNDQUFhO0FBd0UxQixFQUFFLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDOztBQUNwQyxrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi80LzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQge0xheWVyQmFzZVh5elRpbGV9IGZyb20gJy4vTGF5ZXJCYXNlWHl6VGlsZSc7XHJcbmltcG9ydCB7TGF5ZXJCYXNlT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2UnXHJcbmltcG9ydCAqIGFzIGVzcmlUb09sIGZyb20gJy4uL29sSGVscGVycy9lc3JpVG9PbFN0eWxlJztcclxuXHJcblxyXG5jb25zdCBubSA9IHByb3ZpZGUoJ2xheWVycycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllckVzcmlUaWxlT3B0aW9ucyBleHRlbmRzIExheWVyQmFzZU9wdGlvbnN7XHJcbiAgICB1c2VFc3JpU3R5bGU/OiBib29sZWFuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc3JpIHRpbGVcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVh5elRpbGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckVzcmlUaWxlIGV4dGVuZHMgTGF5ZXJCYXNlWHl6VGlsZSB7XHJcbiAgICBfdXNlRXNyaVN0eWxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEVzcmkgdGlsZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHVybCBmb3Igc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudXNlRXNyaVN0eWxlPWZhbHNlXSBpZiB0aGUgbWFwIHNlcnZpY2Ugc3R5bGUgc2hvdWxkIGJlIHVzZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG9wdGlvbnM6IExheWVyRXNyaVRpbGVPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHVybC5zZWFyY2goL1xcLyQvKSA9PSAtMSkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJy8nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cmwgKz0gJ3RpbGUve3p9L3t5fS97eH0nO1xyXG5cclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl91c2VFc3JpU3R5bGUgPSB0eXBlb2Ygb3B0aW9ucy51c2VFc3JpU3R5bGUgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy51c2VFc3JpU3R5bGUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZExlZ2VuZENvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGFkZGl0aW9uYWwgY29udGVudCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2FkZGl0aW9uYWxDb250ZW50PScnXSBhZGRpdGlvbmFsIGNvbnRlbnQgZm9yIGxlZ2VuZFxyXG4gICAgICovXHJcbiAgICBhZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50ID0gJycpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICBzdXBlci5hZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdXJsQ29weSA9IHRoaXMudXJsO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1hcFNlcnZlckluZGV4ID0gdXJsQ29weS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ21hcHNlcnZlcicpO1xyXG4gICAgICAgICAgICBpZiAobWFwU2VydmVySW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdXJsQ29weSA9IHVybENvcHkuc2xpY2UoMCwgbWFwU2VydmVySW5kZXggKyA5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybENvcHlbdXJsQ29weS5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxDb3B5ICs9ICcvJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXJsQ29weSArPSAnbGVnZW5kP2Y9cGpzb24mY2FsbGJhY2s9Pyc7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VwZXJBZGRMZWdlbmQgPSBzdXBlci5hZGRMZWdlbmRDb250ZW50O1xyXG5cclxuICAgICAgICAgICAgJC5nZXQodXJsQ29weSwge30sIChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SHRtbCA9IGVzcmlUb09sLm1ha2VNYXBTZXJ2aWNlTGVnZW5kKGQpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXJBZGRMZWdlbmQuY2FsbCh0aGlzLCBuZXdIdG1sKTtcclxuICAgICAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlWHl6VGlsZSA9IExheWVyRXNyaVRpbGU7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyRXNyaVRpbGU7XHJcblxyXG4iXX0=