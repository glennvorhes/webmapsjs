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
 * Created by gavorhes on 12/7/2015.
 */
var LayerBase_1 = require("./LayerBase");
var esriToOl = require("../olHelpers/esriToOlStyle");
var mapPopup_1 = require("../olHelpers/mapPopup");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
var nm = provide_1.default('layers');
/**
 * esri mapserver layer
 * @augments LayerBase
 */
var LayerEsriMapServer = (function (_super) {
    __extends(LayerEsriMapServer, _super);
    /**
     * The base layer for all others
     * @param {string} url - resource url
     * @param {object} [options] - config
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
     * @param {boolean} [options.addPopup=false] if a popup should be added
     * @param {undefined|Array<number>} [options.showLayers=undefined] if a popup should be added
     */
    function LayerEsriMapServer(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, url, options) || this;
        _this._source = new ol.source.TileArcGISRest({
            url: _this.url == '' ? undefined : _this.url,
            params: typeof options.showLayers == 'undefined' ? undefined : { layers: 'show:' + options.showLayers.join(',') }
        });
        _this._olLayer = new ol.layer.Tile({
            source: _this._source,
            visible: _this.visible,
            opacity: _this.opacity,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution
        });
        _this._olLayer.setZIndex(_this._zIndex);
        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;
        _this._esriFormat = new ol.format.EsriJSON();
        _this._popupRequest = null;
        _this.addLegendContent();
        if (options.addPopup) {
            mapPopup_1.default.addMapServicePopup(_this);
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    LayerEsriMapServer.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] !== '/') {
            urlCopy += '/';
        }
        urlCopy += 'legend?f=pjson&callback=?';
        $.get(urlCopy, {}, function (d) {
            var newHtml = esriToOl.makeMapServiceLegend(d);
            _super.prototype.addLegendContent.call(_this, newHtml);
        }, 'json');
    };
    LayerEsriMapServer.prototype.getPopupInfo = function (queryParams) {
        if (!this.visible) {
            return;
        }
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] != '/') {
            urlCopy += '/';
        }
        urlCopy += 'identify?callback=?';
        var __this = this;
        if (this._popupRequest != null) {
            this._popupRequest.abort();
        }
        this._popupRequest = $.get(urlCopy, queryParams, function (d) {
            for (var _i = 0, _a = d['results']; _i < _a.length; _i++) {
                var r = _a[_i];
                var popupHtml = '<table class="esri-popup-table">';
                for (var a in r['attributes']) {
                    if (r['attributes'].hasOwnProperty(a)) {
                        var attrVal = r['attributes'][a];
                        if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                            continue;
                        }
                        var attr = a;
                        if (attr.length > 14) {
                            attr = attr.slice(0, 11) + '...';
                        }
                        popupHtml += "<tr><td>" + attr + "</td><td>" + attrVal + "</td></tr>";
                    }
                }
                popupHtml += '</table>';
                mapPopup_1.default.addMapServicePopupContent(__this._esriFormat.readFeature(r), __this, popupHtml, r['layerName']);
            }
        }, 'json');
        this._popupRequest.always(function () {
            __this._popupRequest = null;
        });
    };
    Object.defineProperty(LayerEsriMapServer.prototype, "source", {
        /**
         *
         * @returns {ol.source.TileArcGISRest} the vector source
         */
        get: function () {
            return _super.prototype.getSource.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerEsriMapServer.prototype, "olLayer", {
        /**
         *
         * @returns the ol layer
         */
        get: function () {
            return _super.prototype.getOlLayer.call(this);
        },
        enumerable: true,
        configurable: true
    });
    return LayerEsriMapServer;
}(LayerBase_1.LayerBase));
exports.LayerEsriMapServer = LayerEsriMapServer;
nm.LayerEsriMapServer = LayerEsriMapServer;
exports.default = LayerEsriMapServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJFc3JpTWFwU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllckVzcmlNYXBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx5Q0FBd0Q7QUFDeEQscURBQXVEO0FBQ3ZELGtEQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBUTdCOzs7R0FHRztBQUNIO0lBQXdDLHNDQUFTO0lBSTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCw0QkFBWSxHQUFHLEVBQUUsT0FBdUM7UUFBdkMsd0JBQUEsRUFBQSxZQUF1QztRQUF4RCxZQUVJLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUMsU0E0QnRCO1FBM0JHLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDdkM7WUFDSSxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsU0FBUyxHQUFHLEtBQUksQ0FBQyxHQUFHO1lBQzFDLE1BQU0sRUFBRSxPQUFPLE9BQU8sQ0FBQyxVQUFVLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUM7U0FDbEgsQ0FDSixDQUFDO1FBRUYsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxLQUFJLENBQUMsT0FBeUI7WUFDdEMsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztZQUNyQixhQUFhLEVBQUUsS0FBSSxDQUFDLGNBQWM7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QyxrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzcvMjAxNS5cclxuICovXHJcbmltcG9ydCB7TGF5ZXJCYXNlLCBMYXllckJhc2VPcHRpb25zfSBmcm9tICcuL0xheWVyQmFzZSc7XHJcbmltcG9ydCAqIGFzIGVzcmlUb09sIGZyb20gJy4uL29sSGVscGVycy9lc3JpVG9PbFN0eWxlJztcclxuaW1wb3J0IG1hcFBvcHVwIGZyb20gJy4uL29sSGVscGVycy9tYXBQb3B1cCc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuY29uc3Qgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyRXNyaU1hcFNlcnZlck9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VPcHRpb25zIHtcclxuICAgIGFkZFBvcHVwPzogYm9vbGVhbjtcclxuICAgIHNob3dMYXllcnM/OiBBcnJheTxudW1iZXI+O1xyXG59XHJcblxyXG4vKipcclxuICogZXNyaSBtYXBzZXJ2ZXIgbGF5ZXJcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExheWVyRXNyaU1hcFNlcnZlciBleHRlbmRzIExheWVyQmFzZSB7XHJcbiAgICBfZXNyaUZvcm1hdDogb2wuZm9ybWF0LkVzcmlKU09OO1xyXG4gICAgX3BvcHVwUmVxdWVzdDogSlF1ZXJ5WEhSO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2UgbGF5ZXIgZm9yIGFsbCBvdGhlcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSByZXNvdXJjZSB1cmxcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFkZFBvcHVwPWZhbHNlXSBpZiBhIHBvcHVwIHNob3VsZCBiZSBhZGRlZFxyXG4gICAgICogQHBhcmFtIHt1bmRlZmluZWR8QXJyYXk8bnVtYmVyPn0gW29wdGlvbnMuc2hvd0xheWVycz11bmRlZmluZWRdIGlmIGEgcG9wdXAgc2hvdWxkIGJlIGFkZGVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9uczogTGF5ZXJFc3JpTWFwU2VydmVyT3B0aW9ucyA9IHt9KSB7XHJcblxyXG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gbmV3IG9sLnNvdXJjZS5UaWxlQXJjR0lTUmVzdChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCA9PSAnJyA/IHVuZGVmaW5lZCA6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB0eXBlb2Ygb3B0aW9ucy5zaG93TGF5ZXJzID09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDoge2xheWVyczogJ3Nob3c6JyArIG9wdGlvbnMuc2hvd0xheWVycy5qb2luKCcsJyl9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl9vbExheWVyID0gbmV3IG9sLmxheWVyLlRpbGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMuX3NvdXJjZSBhcyBvbC5zb3VyY2UuVGlsZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogdGhpcy52aXNpYmxlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiB0aGlzLm9wYWNpdHksXHJcbiAgICAgICAgICAgIG1pblJlc29sdXRpb246IHRoaXMuX21pblJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IHRoaXMuX21heFJlc29sdXRpb25cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllci5zZXRaSW5kZXgodGhpcy5fekluZGV4KTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5hZGRQb3B1cCA9IHR5cGVvZiBvcHRpb25zLmFkZFBvcHVwID09ICdib29sZWFuJyA/IG9wdGlvbnMuYWRkUG9wdXAgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZXNyaUZvcm1hdCA9IG5ldyBvbC5mb3JtYXQuRXNyaUpTT04oKTtcclxuICAgICAgICB0aGlzLl9wb3B1cFJlcXVlc3QgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLmFkZExlZ2VuZENvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkUG9wdXApIHtcclxuICAgICAgICAgICAgbWFwUG9wdXAuYWRkTWFwU2VydmljZVBvcHVwKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFthZGRpdGlvbmFsQ29udGVudD0nJ10gYWRkaXRpb25hbCBjb250ZW50IGZvciBsZWdlbmRcclxuICAgICAqL1xyXG4gICAgYWRkTGVnZW5kQ29udGVudChhZGRpdGlvbmFsQ29udGVudD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCB1cmxDb3B5ID0gdGhpcy51cmw7XHJcblxyXG4gICAgICAgIGlmICh1cmxDb3B5W3VybENvcHkubGVuZ3RoIC0gMV0gIT09ICcvJykge1xyXG4gICAgICAgICAgICB1cmxDb3B5ICs9ICcvJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybENvcHkgKz0gJ2xlZ2VuZD9mPXBqc29uJmNhbGxiYWNrPT8nO1xyXG5cclxuICAgICAgICAkLmdldCh1cmxDb3B5LCB7fSwgKGQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld0h0bWwgPSBlc3JpVG9PbC5tYWtlTWFwU2VydmljZUxlZ2VuZChkKTtcclxuICAgICAgICAgICAgc3VwZXIuYWRkTGVnZW5kQ29udGVudChuZXdIdG1sKTtcclxuICAgICAgICB9LCAnanNvbicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRQb3B1cEluZm8ocXVlcnlQYXJhbXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdXJsQ29weSA9IHRoaXMudXJsO1xyXG5cclxuICAgICAgICBpZiAodXJsQ29weVt1cmxDb3B5Lmxlbmd0aCAtIDFdICE9ICcvJykge1xyXG4gICAgICAgICAgICB1cmxDb3B5ICs9ICcvJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybENvcHkgKz0gJ2lkZW50aWZ5P2NhbGxiYWNrPT8nO1xyXG5cclxuICAgICAgICBsZXQgX190aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwUmVxdWVzdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwUmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwUmVxdWVzdCA9ICQuZ2V0KHVybENvcHksIHF1ZXJ5UGFyYW1zLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCByIG9mIGRbJ3Jlc3VsdHMnXSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3B1cEh0bWwgPSAnPHRhYmxlIGNsYXNzPVwiZXNyaS1wb3B1cC10YWJsZVwiPic7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYSBpbiByWydhdHRyaWJ1dGVzJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoclsnYXR0cmlidXRlcyddLmhhc093blByb3BlcnR5KGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyVmFsID0gclsnYXR0cmlidXRlcyddW2FdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJWYWwgPT0gbnVsbCB8fCBhdHRyVmFsLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSA9PSAnbnVsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLmxlbmd0aCA+IDE0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyID0gYXR0ci5zbGljZSgwLCAxMSkgKyAnLi4uJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8dHI+PHRkPiR7YXR0cn08L3RkPjx0ZD4ke2F0dHJWYWx9PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPC90YWJsZT4nO1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcFBvcHVwLmFkZE1hcFNlcnZpY2VQb3B1cENvbnRlbnQoX190aGlzLl9lc3JpRm9ybWF0LnJlYWRGZWF0dXJlKHIpLCBfX3RoaXMsIHBvcHVwSHRtbCwgclsnbGF5ZXJOYW1lJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgJ2pzb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcG9wdXBSZXF1ZXN0LmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9fdGhpcy5fcG9wdXBSZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge29sLnNvdXJjZS5UaWxlQXJjR0lTUmVzdH0gdGhlIHZlY3RvciBzb3VyY2VcclxuICAgICAqL1xyXG4gICAgZ2V0IHNvdXJjZSgpOiBvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3Qge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRTb3VyY2UoKSBhcyBvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgdGhlIG9sIGxheWVyXHJcbiAgICAgKi9cclxuICAgIGdldCBvbExheWVyKCk6IG9sLmxheWVyLlRpbGUge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRPbExheWVyKCkgYXMgb2wubGF5ZXIuVGlsZTtcclxuICAgIH1cclxufVxyXG5ubS5MYXllckVzcmlNYXBTZXJ2ZXIgPSBMYXllckVzcmlNYXBTZXJ2ZXI7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyRXNyaU1hcFNlcnZlcjtcclxuIl19