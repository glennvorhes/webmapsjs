/**
 * Created by gavorhes on 11/2/2015.
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
var LayerBaseVector_1 = require("./LayerBaseVector");
var esriToOl = require("../olHelpers/esriToOlStyle");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
var nm = provide_1.default('layers');
/**
 * Base layer for esri vector layers
 * @augments LayerBaseVector
 */
var LayerBaseVectorEsri = (function (_super) {
    __extends(LayerBaseVectorEsri, _super);
    /**
     * The base vector layer
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
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} [options.where=1=1] the layer filter clause
     * @param {string} [options.outFields=*] comma separated list of output fields, defaults to all
     * @param {string} [options.format=pjson] the format the retrieve the data
     * @param {number} [options.outSR=3857] the output spatial reference, defaults to web mercator
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     * @param {boolean} [options.collapseLegend=false] if the legend should be initially collapsed
     * @param {number} [options.mapMoveMakeGetParams=function(extent, zoomLevel){}] function to create additional map move params
     */
    function LayerBaseVectorEsri(url, options) {
        var _this = this;
        if (typeof options.params != 'object') {
            options.params = {};
        }
        options.params['where'] = options.where || '1=1';
        options.params['outFields'] = options.outFields || '*';
        options.params['f'] = options.format || 'pjson';
        options.params['outSR'] = options.outSR || 3857;
        _this = _super.call(this, url, options) || this;
        _this._outSR = _this.params['outSR'];
        _this._esriFormat = new ol.format.EsriJSON();
        if (_this._url[_this._url.length - 1] !== '/') {
            _this._url += '/';
        }
        _this._urlCopy = _this.url;
        _this._url += 'query?callback=?';
        if (_this.autoLoad || _this.visible) {
            _this._load();
        }
        _this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;
        if (_this._useEsriStyle) {
            _this.addLegendContent();
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content to add to legend
     */
    LayerBaseVectorEsri.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        if (!this._useEsriStyle) {
            _super.prototype.addLegendContent.call(this, additionalContent);
        }
        else {
            $.get(this._urlCopy + '?f=pjson&callback=?', {}, function (d) {
                if (d['subLayers'].length > 0) {
                    alert('should only use single feature layers, not groups');
                    return;
                }
                var newStyleAndLegend = esriToOl.makeFeatureServiceLegendAndSymbol(d);
                _this.style = newStyleAndLegend.style;
                _super.prototype.addLegendContent.call(_this, newStyleAndLegend.legend);
            }, 'json');
        }
    };
    /**
     * add feature collection
     * @param {object} featureCollection - features as esrijson
     */
    LayerBaseVectorEsri.prototype.addFeatures = function (featureCollection) {
        var feats = this._esriFormat.readFeatures(featureCollection);
        this.source.addFeatures(feats);
    };
    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBaseVectorEsri.prototype._load = function () {
        var _this = this;
        if (_super.prototype._load.call(this)) {
            return true;
        }
        $.get(this._url, this.params, function (d) {
            _this.addFeatures(d);
            _this.loadCallback(_this);
        }, 'json').fail(function () {
            _this._loaded = false;
        });
        return false;
    };
    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    LayerBaseVectorEsri.prototype.mapMoveMakeGetParams = function (extent, zoomLevel) {
        _super.prototype.mapMoveMakeGetParams.call(this, extent, zoomLevel);
        this.mapMoveParams['geometry'] = extent.minX + "," + extent.minY + "," + extent.maxX + "," + extent.maxY;
        this.mapMoveParams['geometryType'] = 'esriGeometryEnvelope';
        this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
        this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
        this.mapMoveParams['inSR'] = 3857;
        if (this._outSR == 3857) {
            this.mapMoveParams['geometryPrecision'] = 1;
        }
    };
    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    LayerBaseVectorEsri.prototype.mapMoveBefore = function (zoom, evtType) {
        return _super.prototype.mapMoveBefore.call(this, zoom, evtType);
        //if (super.mapMoveBefore(zoom, evtType)){
        //    //place holder for additional processing
        //    return true;
        //} else {
        //    return false;
        //}
    };
    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    LayerBaseVectorEsri.prototype.mapMoveCallback = function (d) {
        _super.prototype.mapMoveCallback.call(this, d);
        this.source.addFeatures(this._esriFormat.readFeatures(d));
    };
    return LayerBaseVectorEsri;
}(LayerBaseVector_1.LayerBaseVector));
exports.LayerBaseVectorEsri = LayerBaseVectorEsri;
nm.LayerBaseVectorEsri = LayerBaseVectorEsri;
exports.default = LayerBaseVectorEsri;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yRXNyaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yRXNyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSxxREFBdUQ7QUFDdkQsMkNBQXNDO0FBQ3RDLDhCQUFpQztBQUNqQywwQkFBNkI7QUFDN0IsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVUzQjs7O0dBR0c7QUFDSDtJQUF5Qyx1Q0FBZTtJQU1wRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0gsNkJBQVksR0FBVyxFQUFFLE9BQW1DO1FBQTVELGlCQThCQztRQTVCRyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztRQUVoRCxRQUFBLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBQztRQUNwQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsS0FBSSxDQUFDLFdB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QUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBcktELENBQXlDLGlDQUFlLEdBcUt2RDtBQXJLWSxrREFBbUI7QUF1S2hDLEVBQUUsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUM3QyxrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDExLzIvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQge0xheWVyQmFzZVZlY3RvciwgTGF5ZXJCYXNlVmVjdG9yT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2VWZWN0b3InO1xyXG5pbXBvcnQgKiBhcyBlc3JpVG9PbCBmcm9tICcuLi9vbEhlbHBlcnMvZXNyaVRvT2xTdHlsZSc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5sZXQgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5ZXJCYXNlVmVjdG9yRXNyaU9wdGlvbnMgIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yT3B0aW9uc3tcclxuICAgIGZvcm1hdD86IHN0cmluZztcclxuICAgIG91dFNSPzogbnVtYmVyO1xyXG4gICAgd2hlcmU/OiBzdHJpbmc7XHJcbiAgICBvdXRGaWVsZHM/OiBzdHJpbmc7XHJcbiAgICB1c2VFc3JpU3R5bGU/OiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQmFzZSBsYXllciBmb3IgZXNyaSB2ZWN0b3IgbGF5ZXJzXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VWZWN0b3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckJhc2VWZWN0b3JFc3JpIGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yIHtcclxuICAgIF9vdXRTUjogbnVtYmVyO1xyXG4gICAgX2VzcmlGb3JtYXQ6IG9sLmZvcm1hdC5Fc3JpSlNPTjtcclxuICAgIF91cmxDb3B5OiBzdHJpbmc7XHJcbiAgICBfdXNlRXNyaVN0eWxlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2UgdmVjdG9yIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdXJsIGZvciBzb3VyY2VcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0xvYWQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYXV0byBsb2FkIGlmIG5vdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuc3R5bGU9dW5kZWZpbmVkXSB0aGUgbGF5ZXIgc3R5bGUsIHVzZSBvcGVubGF5ZXJzIGRlZmF1bHQgc3R5bGUgaWYgbm90IGRlZmluZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMub25EZW1hbmQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIGJ5IGV4dGVudCBvbiBtYXAgbW92ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9uRGVtYW5kRGVsYXk9MzAwXSBkZWxheSBiZWZvcmUgdGhlIG1hcCBtb3ZlIGNhbGxiYWNrIHNob3VsZCBiZSBjYWxsZWRcclxuICAgICAqIEBwYXJhbSB7TWFwTW92ZUNsc30gW29wdGlvbnMubWFwTW92ZU9iaj1tYXBNb3ZlXSBhbHRlcm5hdGUgbWFwIG1vdmUgb2JqZWN0IGZvciB1c2Ugd2l0aCBtdWx0aSBtYXAgcGFnZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMud2hlcmU9MT0xXSB0aGUgbGF5ZXIgZmlsdGVyIGNsYXVzZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm91dEZpZWxkcz0qXSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBvdXRwdXQgZmllbGRzLCBkZWZhdWx0cyB0byBhbGxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5mb3JtYXQ9cGpzb25dIHRoZSBmb3JtYXQgdGhlIHJldHJpZXZlIHRoZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3V0U1I9Mzg1N10gdGhlIG91dHB1dCBzcGF0aWFsIHJlZmVyZW5jZSwgZGVmYXVsdHMgdG8gd2ViIG1lcmNhdG9yXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnVzZUVzcmlTdHlsZT1mYWxzZV0gaWYgdGhlIG1hcCBzZXJ2aWNlIHN0eWxlIHNob3VsZCBiZSB1c2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNvbGxhcHNlTGVnZW5kPWZhbHNlXSBpZiB0aGUgbGVnZW5kIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWFwTW92ZU1ha2VHZXRQYXJhbXM9ZnVuY3Rpb24oZXh0ZW50LCB6b29tTGV2ZWwpe31dIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhZGRpdGlvbmFsIG1hcCBtb3ZlIHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgb3B0aW9uczogTGF5ZXJCYXNlVmVjdG9yRXNyaU9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnBhcmFtcyAhPSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb25zLnBhcmFtc1snd2hlcmUnXSA9IG9wdGlvbnMud2hlcmUgfHwgJzE9MSc7XHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXNbJ291dEZpZWxkcyddID0gb3B0aW9ucy5vdXRGaWVsZHMgfHwgJyonO1xyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zWydmJ10gPSBvcHRpb25zLmZvcm1hdCB8fCAncGpzb24nO1xyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zWydvdXRTUiddID0gb3B0aW9ucy5vdXRTUiB8fCAzODU3O1xyXG5cclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX291dFNSID0gdGhpcy5wYXJhbXNbJ291dFNSJ107XHJcbiAgICAgICAgdGhpcy5fZXNyaUZvcm1hdCA9IG5ldyBvbC5mb3JtYXQuRXNyaUpTT04oKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3VybFt0aGlzLl91cmwubGVuZ3RoIC0gMV0gIT09ICcvJykge1xyXG4gICAgICAgICAgICB0aGlzLl91cmwgKz0gJy8nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXJsQ29weSA9IHRoaXMudXJsO1xyXG4gICAgICAgIHRoaXMuX3VybCArPSAncXVlcnk/Y2FsbGJhY2s9Pyc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9Mb2FkIHx8IHRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl91c2VFc3JpU3R5bGUgPSB0eXBlb2Ygb3B0aW9ucy51c2VFc3JpU3R5bGUgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy51c2VFc3JpU3R5bGUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZExlZ2VuZENvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYWRkaXRpb25hbCBjb250ZW50IHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWRkaXRpb25hbENvbnRlbnQ9JyddIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gbGVnZW5kXHJcbiAgICAgKi9cclxuICAgIGFkZExlZ2VuZENvbnRlbnQoYWRkaXRpb25hbENvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3VzZUVzcmlTdHlsZSkge1xyXG4gICAgICAgICAgICBzdXBlci5hZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmdldCh0aGlzLl91cmxDb3B5ICsgJz9mPXBqc29uJmNhbGxiYWNrPT8nLCB7fSwgKGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkWydzdWJMYXllcnMnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ3Nob3VsZCBvbmx5IHVzZSBzaW5nbGUgZmVhdHVyZSBsYXllcnMsIG5vdCBncm91cHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdTdHlsZUFuZExlZ2VuZCA9IGVzcmlUb09sLm1ha2VGZWF0dXJlU2VydmljZUxlZ2VuZEFuZFN5bWJvbChkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBuZXdTdHlsZUFuZExlZ2VuZC5zdHlsZTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLmFkZExlZ2VuZENvbnRlbnQobmV3U3R5bGVBbmRMZWdlbmQubGVnZW5kKTtcclxuICAgICAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGZlYXR1cmUgY29sbGVjdGlvblxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmVDb2xsZWN0aW9uIC0gZmVhdHVyZXMgYXMgZXNyaWpzb25cclxuICAgICAqL1xyXG4gICAgYWRkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24pIHtcclxuICAgICAgICBsZXQgZmVhdHMgPSB0aGlzLl9lc3JpRm9ybWF0LnJlYWRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UuYWRkRmVhdHVyZXMoZmVhdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdHJpZ2dlciBsb2FkIGZlYXR1cmVzXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaWYgYWxyZWFkeSBsb2FkZWRcclxuICAgICAqL1xyXG4gICAgX2xvYWQoKSB7XHJcbiAgICAgICAgaWYgKHN1cGVyLl9sb2FkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQuZ2V0KHRoaXMuX3VybCwgdGhpcy5wYXJhbXMsIChkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRmVhdHVyZXMoZCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZENhbGxiYWNrKHRoaXMpO1xyXG4gICAgICAgIH0sICdqc29uJykuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIHRvIGdlbmVyYXRlIHRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBpbiB0aGUgZ2V0IHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnQgLSBleHRlbnQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblggLSBtaW5YXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblkgLSBtaW5ZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFggLSBtYXhYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFkgLSBtYXhZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbUxldmVsIC0gem9vbSBsZXZlbFxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlTWFrZUdldFBhcmFtcyhleHRlbnQsIHpvb21MZXZlbCkge1xyXG4gICAgICAgIHN1cGVyLm1hcE1vdmVNYWtlR2V0UGFyYW1zKGV4dGVudCwgem9vbUxldmVsKTtcclxuICAgICAgICB0aGlzLm1hcE1vdmVQYXJhbXNbJ2dlb21ldHJ5J10gPSBgJHtleHRlbnQubWluWH0sJHtleHRlbnQubWluWX0sJHtleHRlbnQubWF4WH0sJHtleHRlbnQubWF4WX1gO1xyXG4gICAgICAgIHRoaXMubWFwTW92ZVBhcmFtc1snZ2VvbWV0cnlUeXBlJ10gPSAnZXNyaUdlb21ldHJ5RW52ZWxvcGUnO1xyXG4gICAgICAgIHRoaXMubWFwTW92ZVBhcmFtc1snc3BhdGlhbFJlbCddID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XHJcbiAgICAgICAgdGhpcy5tYXBNb3ZlUGFyYW1zWydzcGF0aWFsUmVsJ10gPSAnZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzJztcclxuICAgICAgICB0aGlzLm1hcE1vdmVQYXJhbXNbJ2luU1InXSA9IDM4NTc7XHJcbiAgICAgICAgaWYgKHRoaXMuX291dFNSID09IDM4NTcpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXBNb3ZlUGFyYW1zWydnZW9tZXRyeVByZWNpc2lvbiddID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgY2FsbCB0byBtYXAgbW92ZSBjYWxsYmFjaywgY2FuIHByZXZlbnQgY2FsbCBieSByZXR1cm5pbmcgZmFsc2VcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6b29tIC0gem9vbSBsZXZlbFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtldnRUeXBlPXVuZGVmaW5lZF0gdW5kZWZpbmVkIGZvciBpbml0aWFsIGxvYWQsIG90aGVyd2lzZSBvbmUgb2YgJ2NoYW5nZTpjZW50ZXInLCAnY2hhbmdlOnJlc29sdXRpb24nXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaWYgdGhlIGNhbGwgc2hvdWxkIHByb2NlZWRcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZUJlZm9yZSh6b29tLCBldnRUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLm1hcE1vdmVCZWZvcmUoem9vbSwgZXZ0VHlwZSk7XHJcbiAgICAgICAgLy9pZiAoc3VwZXIubWFwTW92ZUJlZm9yZSh6b29tLCBldnRUeXBlKSl7XHJcbiAgICAgICAgLy8gICAgLy9wbGFjZSBob2xkZXIgZm9yIGFkZGl0aW9uYWwgcHJvY2Vzc2luZ1xyXG4gICAgICAgIC8vICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsYmFjayBmdW5jdGlvbiBvbiBtYXAgbW92ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGQgLSB0aGUganNvbiByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlQ2FsbGJhY2soZCkge1xyXG4gICAgICAgIHN1cGVyLm1hcE1vdmVDYWxsYmFjayhkKTtcclxuICAgICAgICB0aGlzLnNvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLl9lc3JpRm9ybWF0LnJlYWRGZWF0dXJlcyhkKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLkxheWVyQmFzZVZlY3RvckVzcmkgPSBMYXllckJhc2VWZWN0b3JFc3JpO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckJhc2VWZWN0b3JFc3JpO1xyXG4iXX0=