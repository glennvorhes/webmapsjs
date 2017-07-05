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
        if (options === void 0) { options = {}; }
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
exports.default = LayerEsriTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJFc3JpVGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJFc3JpVGlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDJDQUFzQztBQUN0Qyx1REFBb0Q7QUFFcEQscURBQXVEO0FBR3ZELElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFNN0I7OztHQUdHO0FBQ0g7SUFBbUMsaUNBQWdCO0lBRy9DOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILHVCQUFZLEdBQVcsRUFBRSxPQUFrQztRQUFsQyx3QkFBQSxFQUFBLFlBQWtDO1FBQTNELGlCQWFDO1FBWkcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxHQUFHLElBQUksa0JBQWtCLENBQUM7UUFFMUIsUUFBQSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQUM7UUFFcEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxZQUFZLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTdGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7O0lBQ0wsQ0FBQztJQUdEOzs7T0FHRztJQUNILHdDQUFnQixHQUFoQixVQUFpQixpQkFBc0I7UUFBdkMsaUJBMEJDO1FBMUJnQixrQ0FBQSxFQUFBLHNCQUFzQjtRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLGlCQUFNLGdCQUFnQixZQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUV2QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLElBQUksR0FBRyxDQUFDO1lBQ25CLENBQUM7WUFFRCxPQUFPLElBQUksMkJBQTJCLENBQUM7WUFFdkMsSUFBSSxnQkFBYyxHQUFHLGlCQUFNLGdCQUFnQixDQUFDO1lBRTVDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxVQUFDLENBQUM7Z0JBQ2pCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBR0wsb0JBQUM7QUFBRCxDQUFDLEFBdEVELENBQW1DLG1DQUFnQixHQXNFbEQ7QUF0RVksc0NBQWE7QUF3RTFCLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7QUFDcEMsa0JBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvNC8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IHtMYXllckJhc2VYeXpUaWxlfSBmcm9tICcuL0xheWVyQmFzZVh5elRpbGUnO1xyXG5pbXBvcnQge0xheWVyQmFzZU9wdGlvbnN9IGZyb20gJy4vTGF5ZXJCYXNlJ1xyXG5pbXBvcnQgKiBhcyBlc3JpVG9PbCBmcm9tICcuLi9vbEhlbHBlcnMvZXNyaVRvT2xTdHlsZSc7XHJcblxyXG5cclxuY29uc3Qgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJFc3JpVGlsZU9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VPcHRpb25ze1xyXG4gICAgdXNlRXNyaVN0eWxlPzogYm9vbGVhblxyXG59XHJcblxyXG4vKipcclxuICogRXNyaSB0aWxlXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VYeXpUaWxlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJFc3JpVGlsZSBleHRlbmRzIExheWVyQmFzZVh5elRpbGUge1xyXG4gICAgX3VzZUVzcmlTdHlsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBFc3JpIHRpbGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB1cmwgZm9yIHNvdXJjZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUVzcmlTdHlsZT1mYWxzZV0gaWYgdGhlIG1hcCBzZXJ2aWNlIHN0eWxlIHNob3VsZCBiZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBvcHRpb25zOiBMYXllckVzcmlUaWxlT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgaWYgKHVybC5zZWFyY2goL1xcLyQvKSA9PSAtMSkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJy8nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cmwgKz0gJ3RpbGUve3p9L3t5fS97eH0nO1xyXG5cclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLl91c2VFc3JpU3R5bGUgPSB0eXBlb2Ygb3B0aW9ucy51c2VFc3JpU3R5bGUgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy51c2VFc3JpU3R5bGUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZExlZ2VuZENvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGFkZGl0aW9uYWwgY29udGVudCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2FkZGl0aW9uYWxDb250ZW50PScnXSBhZGRpdGlvbmFsIGNvbnRlbnQgZm9yIGxlZ2VuZFxyXG4gICAgICovXHJcbiAgICBhZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50ID0gJycpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICBzdXBlci5hZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdXJsQ29weSA9IHRoaXMudXJsO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1hcFNlcnZlckluZGV4ID0gdXJsQ29weS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ21hcHNlcnZlcicpO1xyXG4gICAgICAgICAgICBpZiAobWFwU2VydmVySW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdXJsQ29weSA9IHVybENvcHkuc2xpY2UoMCwgbWFwU2VydmVySW5kZXggKyA5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVybENvcHlbdXJsQ29weS5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICB1cmxDb3B5ICs9ICcvJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXJsQ29weSArPSAnbGVnZW5kP2Y9cGpzb24mY2FsbGJhY2s9Pyc7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VwZXJBZGRMZWdlbmQgPSBzdXBlci5hZGRMZWdlbmRDb250ZW50O1xyXG5cclxuICAgICAgICAgICAgJC5nZXQodXJsQ29weSwge30sIChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SHRtbCA9IGVzcmlUb09sLm1ha2VNYXBTZXJ2aWNlTGVnZW5kKGQpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXJBZGRMZWdlbmQuY2FsbCh0aGlzLCBuZXdIdG1sKTtcclxuICAgICAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlWHl6VGlsZSA9IExheWVyRXNyaVRpbGU7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyRXNyaVRpbGU7XHJcblxyXG4iXX0=