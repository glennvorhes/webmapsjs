"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerEsriMapServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJFc3JpTWFwU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllckVzcmlNYXBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx5Q0FBd0Q7QUFDeEQscURBQXVEO0FBQ3ZELGtEQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBUTdCOzs7R0FHRztBQUNIO0lBQXdDLHNDQUFTO0lBSTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCw0QkFBWSxHQUFHLEVBQUUsT0FBdUM7UUFBdkMsd0JBQUEsRUFBQSxZQUF1QztRQUF4RCxZQUVJLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUMsU0E0QnRCO1FBM0JHLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDdkM7WUFDSSxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsU0FBUyxHQUFHLEtBQUksQ0FBQyxHQUFHO1lBQzFDLE1BQU0sRUFBRSxPQUFPLE9BQU8sQ0FBQyxVQUFVLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUM7U0FDbEgsQ0FDSixDQUFDO1FBRUYsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxLQUFJLENBQUMsT0FBeUI7WUFDdEMsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztZQUNyQixhQUFhLEVBQUUsS0FBSSxDQUFDLGNBQWM7WUFDbEMs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QWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi83LzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQge0xheWVyQmFzZSwgTGF5ZXJCYXNlT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2UnO1xyXG5pbXBvcnQgKiBhcyBlc3JpVG9PbCBmcm9tICcuLi9vbEhlbHBlcnMvZXNyaVRvT2xTdHlsZSc7XHJcbmltcG9ydCBtYXBQb3B1cCBmcm9tICcuLi9vbEhlbHBlcnMvbWFwUG9wdXAnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllckVzcmlNYXBTZXJ2ZXJPcHRpb25zIGV4dGVuZHMgTGF5ZXJCYXNlT3B0aW9ucyB7XHJcbiAgICBhZGRQb3B1cD86IGJvb2xlYW47XHJcbiAgICBzaG93TGF5ZXJzPzogQXJyYXk8bnVtYmVyPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzcmkgbWFwc2VydmVyIGxheWVyXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckVzcmlNYXBTZXJ2ZXIgZXh0ZW5kcyBMYXllckJhc2Uge1xyXG4gICAgX2VzcmlGb3JtYXQ6IG9sLmZvcm1hdC5Fc3JpSlNPTjtcclxuICAgIF9wb3B1cFJlcXVlc3Q6IEpRdWVyeVhIUjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGxheWVyIGZvciBhbGwgb3RoZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gcmVzb3VyY2UgdXJsXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hZGRQb3B1cD1mYWxzZV0gaWYgYSBwb3B1cCBzaG91bGQgYmUgYWRkZWRcclxuICAgICAqIEBwYXJhbSB7dW5kZWZpbmVkfEFycmF5PG51bWJlcj59IFtvcHRpb25zLnNob3dMYXllcnM9dW5kZWZpbmVkXSBpZiBhIHBvcHVwIHNob3VsZCBiZSBhZGRlZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnM6IExheWVyRXNyaU1hcFNlcnZlck9wdGlvbnMgPSB7fSkge1xyXG5cclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG5ldyBvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3QoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwgPT0gJycgPyB1bmRlZmluZWQgOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgIHBhcmFtczogdHlwZW9mIG9wdGlvbnMuc2hvd0xheWVycyA9PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IHtsYXllcnM6ICdzaG93OicgKyBvcHRpb25zLnNob3dMYXllcnMuam9pbignLCcpfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IG5ldyBvbC5sYXllci5UaWxlKHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLl9zb3VyY2UgYXMgb2wuc291cmNlLlRpbGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRoaXMudmlzaWJsZSxcclxuICAgICAgICAgICAgb3BhY2l0eTogdGhpcy5vcGFjaXR5LFxyXG4gICAgICAgICAgICBtaW5SZXNvbHV0aW9uOiB0aGlzLl9taW5SZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICBtYXhSZXNvbHV0aW9uOiB0aGlzLl9tYXhSZXNvbHV0aW9uXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KHRoaXMuX3pJbmRleCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYWRkUG9wdXAgPSB0eXBlb2Ygb3B0aW9ucy5hZGRQb3B1cCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmFkZFBvcHVwIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2VzcmlGb3JtYXQgPSBuZXcgb2wuZm9ybWF0LkVzcmlKU09OKCk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBSZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRMZWdlbmRDb250ZW50KCk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmFkZFBvcHVwKSB7XHJcbiAgICAgICAgICAgIG1hcFBvcHVwLmFkZE1hcFNlcnZpY2VQb3B1cCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYWRkaXRpb25hbCBjb250ZW50IHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWRkaXRpb25hbENvbnRlbnQ9JyddIGFkZGl0aW9uYWwgY29udGVudCBmb3IgbGVnZW5kXHJcbiAgICAgKi9cclxuICAgIGFkZExlZ2VuZENvbnRlbnQoYWRkaXRpb25hbENvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdXJsQ29weSA9IHRoaXMudXJsO1xyXG5cclxuICAgICAgICBpZiAodXJsQ29weVt1cmxDb3B5Lmxlbmd0aCAtIDFdICE9PSAnLycpIHtcclxuICAgICAgICAgICAgdXJsQ29weSArPSAnLyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmxDb3B5ICs9ICdsZWdlbmQ/Zj1wanNvbiZjYWxsYmFjaz0/JztcclxuXHJcbiAgICAgICAgJC5nZXQodXJsQ29weSwge30sIChkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdIdG1sID0gZXNyaVRvT2wubWFrZU1hcFNlcnZpY2VMZWdlbmQoZCk7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZExlZ2VuZENvbnRlbnQobmV3SHRtbCk7XHJcbiAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0UG9wdXBJbmZvKHF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybENvcHkgPSB0aGlzLnVybDtcclxuXHJcbiAgICAgICAgaWYgKHVybENvcHlbdXJsQ29weS5sZW5ndGggLSAxXSAhPSAnLycpIHtcclxuICAgICAgICAgICAgdXJsQ29weSArPSAnLyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmxDb3B5ICs9ICdpZGVudGlmeT9jYWxsYmFjaz0/JztcclxuXHJcbiAgICAgICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wb3B1cFJlcXVlc3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cFJlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wb3B1cFJlcXVlc3QgPSAkLmdldCh1cmxDb3B5LCBxdWVyeVBhcmFtcywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgciBvZiBkWydyZXN1bHRzJ10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9wdXBIdG1sID0gJzx0YWJsZSBjbGFzcz1cImVzcmktcG9wdXAtdGFibGVcIj4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgaW4gclsnYXR0cmlidXRlcyddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJbJ2F0dHJpYnV0ZXMnXS5oYXNPd25Qcm9wZXJ0eShhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0clZhbCA9IHJbJ2F0dHJpYnV0ZXMnXVthXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwgfHwgYXR0clZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHIgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5sZW5ndGggPiAxNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ciA9IGF0dHIuc2xpY2UoMCwgMTEpICsgJy4uLic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHRyPjx0ZD4ke2F0dHJ9PC90ZD48dGQ+JHthdHRyVmFsfTwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzwvdGFibGU+JztcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBQb3B1cC5hZGRNYXBTZXJ2aWNlUG9wdXBDb250ZW50KF9fdGhpcy5fZXNyaUZvcm1hdC5yZWFkRmVhdHVyZShyKSwgX190aGlzLCBwb3B1cEh0bWwsIHJbJ2xheWVyTmFtZSddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sICdqc29uJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwUmVxdWVzdC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfX3RoaXMuX3BvcHVwUmVxdWVzdCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3R9IHRoZSB2ZWN0b3Igc291cmNlXHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlRpbGVBcmNHSVNSZXN0IHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0U291cmNlKCkgYXMgb2wuc291cmNlLlRpbGVBcmNHSVNSZXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHRoZSBvbCBsYXllclxyXG4gICAgICovXHJcbiAgICBnZXQgb2xMYXllcigpOiBvbC5sYXllci5UaWxlIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0T2xMYXllcigpIGFzIG9sLmxheWVyLlRpbGU7XHJcbiAgICB9XHJcbn1cclxubm0uTGF5ZXJFc3JpTWFwU2VydmVyID0gTGF5ZXJFc3JpTWFwU2VydmVyO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckVzcmlNYXBTZXJ2ZXI7XHJcbiJdfQ==