/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseVectorEsri;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yRXNyaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yRXNyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7OztBQUVILHFEQUEwRTtBQUMxRSxxREFBdUQ7QUFDdkQsMkNBQXNDO0FBQ3RDLDhCQUFpQztBQUNqQywwQkFBNkI7QUFDN0IsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVUzQjs7O0dBR0c7QUFDSDtJQUF5Qyx1Q0FBZTtJQU1wRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0gsNkJBQVksR0FBVyxFQUFFLE9BQW1DO1FBQTVELGlCQThCQztRQTVCRyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFDaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztRQUVoRCxRQUFBLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBQztRQUNwQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsS0FBSSxDQUFDLFdBQVcsR0FB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QUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBcktELENBQXlDLGlDQUFlLEdBcUt2RDtBQXJLWSxrREFBbUI7QUF1S2hDLEVBQUUsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQzs7QUFDN0Msa0JBQWUsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8yLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtMYXllckJhc2VWZWN0b3IsIExheWVyQmFzZVZlY3Rvck9wdGlvbnN9IGZyb20gJy4vTGF5ZXJCYXNlVmVjdG9yJztcclxuaW1wb3J0ICogYXMgZXNyaVRvT2wgZnJvbSAnLi4vb2xIZWxwZXJzL2VzcmlUb09sU3R5bGUnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxubGV0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyQmFzZVZlY3RvckVzcmlPcHRpb25zICBleHRlbmRzIExheWVyQmFzZVZlY3Rvck9wdGlvbnN7XHJcbiAgICBmb3JtYXQ/OiBzdHJpbmc7XHJcbiAgICBvdXRTUj86IG51bWJlcjtcclxuICAgIHdoZXJlPzogc3RyaW5nO1xyXG4gICAgb3V0RmllbGRzPzogc3RyaW5nO1xyXG4gICAgdXNlRXNyaVN0eWxlPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJhc2UgbGF5ZXIgZm9yIGVzcmkgdmVjdG9yIGxheWVyc1xyXG4gKiBAYXVnbWVudHMgTGF5ZXJCYXNlVmVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJCYXNlVmVjdG9yRXNyaSBleHRlbmRzIExheWVyQmFzZVZlY3RvciB7XHJcbiAgICBfb3V0U1I6IG51bWJlcjtcclxuICAgIF9lc3JpRm9ybWF0OiBvbC5mb3JtYXQuRXNyaUpTT047XHJcbiAgICBfdXJsQ29weTogc3RyaW5nO1xyXG4gICAgX3VzZUVzcmlTdHlsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIHZlY3RvciBsYXllclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHVybCBmb3Igc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9Mb2FkPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGF1dG8gbG9hZCBpZiBub3QgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnN0eWxlPXVuZGVmaW5lZF0gdGhlIGxheWVyIHN0eWxlLCB1c2Ugb3BlbmxheWVycyBkZWZhdWx0IHN0eWxlIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm9uRGVtYW5kPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBleHRlbnQgb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vbkRlbWFuZERlbGF5PTMwMF0gZGVsYXkgYmVmb3JlIHRoZSBtYXAgbW92ZSBjYWxsYmFjayBzaG91bGQgYmUgY2FsbGVkXHJcbiAgICAgKiBAcGFyYW0ge01hcE1vdmVDbHN9IFtvcHRpb25zLm1hcE1vdmVPYmo9bWFwTW92ZV0gYWx0ZXJuYXRlIG1hcCBtb3ZlIG9iamVjdCBmb3IgdXNlIHdpdGggbXVsdGkgbWFwIHBhZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLndoZXJlPTE9MV0gdGhlIGxheWVyIGZpbHRlciBjbGF1c2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5vdXRGaWVsZHM9Kl0gY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2Ygb3V0cHV0IGZpZWxkcywgZGVmYXVsdHMgdG8gYWxsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZm9ybWF0PXBqc29uXSB0aGUgZm9ybWF0IHRoZSByZXRyaWV2ZSB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm91dFNSPTM4NTddIHRoZSBvdXRwdXQgc3BhdGlhbCByZWZlcmVuY2UsIGRlZmF1bHRzIHRvIHdlYiBtZXJjYXRvclxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy51c2VFc3JpU3R5bGU9ZmFsc2VdIGlmIHRoZSBtYXAgc2VydmljZSBzdHlsZSBzaG91bGQgYmUgdXNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jb2xsYXBzZUxlZ2VuZD1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1hcE1vdmVNYWtlR2V0UGFyYW1zPWZ1bmN0aW9uKGV4dGVudCwgem9vbUxldmVsKXt9XSBmdW5jdGlvbiB0byBjcmVhdGUgYWRkaXRpb25hbCBtYXAgbW92ZSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG9wdGlvbnM6IExheWVyQmFzZVZlY3RvckVzcmlPcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wYXJhbXMgIT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9ucy5wYXJhbXNbJ3doZXJlJ10gPSBvcHRpb25zLndoZXJlIHx8ICcxPTEnO1xyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zWydvdXRGaWVsZHMnXSA9IG9wdGlvbnMub3V0RmllbGRzIHx8ICcqJztcclxuICAgICAgICBvcHRpb25zLnBhcmFtc1snZiddID0gb3B0aW9ucy5mb3JtYXQgfHwgJ3Bqc29uJztcclxuICAgICAgICBvcHRpb25zLnBhcmFtc1snb3V0U1InXSA9IG9wdGlvbnMub3V0U1IgfHwgMzg1NztcclxuXHJcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLl9vdXRTUiA9IHRoaXMucGFyYW1zWydvdXRTUiddO1xyXG4gICAgICAgIHRoaXMuX2VzcmlGb3JtYXQgPSBuZXcgb2wuZm9ybWF0LkVzcmlKU09OKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl91cmxbdGhpcy5fdXJsLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXJsICs9ICcvJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VybENvcHkgPSB0aGlzLnVybDtcclxuICAgICAgICB0aGlzLl91cmwgKz0gJ3F1ZXJ5P2NhbGxiYWNrPT8nO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdXRvTG9hZCB8fCB0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXNlRXNyaVN0eWxlID0gdHlwZW9mIG9wdGlvbnMudXNlRXNyaVN0eWxlID09ICdib29sZWFuJyA/IG9wdGlvbnMudXNlRXNyaVN0eWxlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl91c2VFc3JpU3R5bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRMZWdlbmRDb250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGFkZGl0aW9uYWwgY29udGVudCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2FkZGl0aW9uYWxDb250ZW50PScnXSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIGxlZ2VuZFxyXG4gICAgICovXHJcbiAgICBhZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl91c2VFc3JpU3R5bGUpIHtcclxuICAgICAgICAgICAgc3VwZXIuYWRkTGVnZW5kQ29udGVudChhZGRpdGlvbmFsQ29udGVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJC5nZXQodGhpcy5fdXJsQ29weSArICc/Zj1wanNvbiZjYWxsYmFjaz0/Jywge30sIChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZFsnc3ViTGF5ZXJzJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdzaG91bGQgb25seSB1c2Ugc2luZ2xlIGZlYXR1cmUgbGF5ZXJzLCBub3QgZ3JvdXBzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3R5bGVBbmRMZWdlbmQgPSBlc3JpVG9PbC5tYWtlRmVhdHVyZVNlcnZpY2VMZWdlbmRBbmRTeW1ib2woZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlID0gbmV3U3R5bGVBbmRMZWdlbmQuc3R5bGU7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5hZGRMZWdlbmRDb250ZW50KG5ld1N0eWxlQW5kTGVnZW5kLmxlZ2VuZCk7XHJcbiAgICAgICAgICAgIH0sICdqc29uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBmZWF0dXJlIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlQ29sbGVjdGlvbiAtIGZlYXR1cmVzIGFzIGVzcmlqc29uXHJcbiAgICAgKi9cclxuICAgIGFkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGZlYXRzID0gdGhpcy5fZXNyaUZvcm1hdC5yZWFkRmVhdHVyZXMoZmVhdHVyZUNvbGxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuc291cmNlLmFkZEZlYXR1cmVzKGZlYXRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWdnZXIgbG9hZCBmZWF0dXJlc1xyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIGFscmVhZHkgbG9hZGVkXHJcbiAgICAgKi9cclxuICAgIF9sb2FkKCkge1xyXG4gICAgICAgIGlmIChzdXBlci5fbG9hZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkLmdldCh0aGlzLl91cmwsIHRoaXMucGFyYW1zLCAoZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEZlYXR1cmVzKGQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDYWxsYmFjayh0aGlzKTtcclxuICAgICAgICB9LCAnanNvbicpLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsYmFjayB0byBnZW5lcmF0ZSB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4gdGhlIGdldCByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW50IC0gZXh0ZW50IG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5YIC0gbWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5ZIC0gbWluWVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhYIC0gbWF4WFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhZIC0gbWF4WVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpvb21MZXZlbCAtIHpvb20gbGV2ZWxcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZU1ha2VHZXRQYXJhbXMoZXh0ZW50LCB6b29tTGV2ZWwpIHtcclxuICAgICAgICBzdXBlci5tYXBNb3ZlTWFrZUdldFBhcmFtcyhleHRlbnQsIHpvb21MZXZlbCk7XHJcbiAgICAgICAgdGhpcy5tYXBNb3ZlUGFyYW1zWydnZW9tZXRyeSddID0gYCR7ZXh0ZW50Lm1pblh9LCR7ZXh0ZW50Lm1pbll9LCR7ZXh0ZW50Lm1heFh9LCR7ZXh0ZW50Lm1heFl9YDtcclxuICAgICAgICB0aGlzLm1hcE1vdmVQYXJhbXNbJ2dlb21ldHJ5VHlwZSddID0gJ2VzcmlHZW9tZXRyeUVudmVsb3BlJztcclxuICAgICAgICB0aGlzLm1hcE1vdmVQYXJhbXNbJ3NwYXRpYWxSZWwnXSA9ICdlc3JpU3BhdGlhbFJlbEludGVyc2VjdHMnO1xyXG4gICAgICAgIHRoaXMubWFwTW92ZVBhcmFtc1snc3BhdGlhbFJlbCddID0gJ2VzcmlTcGF0aWFsUmVsSW50ZXJzZWN0cyc7XHJcbiAgICAgICAgdGhpcy5tYXBNb3ZlUGFyYW1zWydpblNSJ10gPSAzODU3O1xyXG4gICAgICAgIGlmICh0aGlzLl9vdXRTUiA9PSAzODU3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwTW92ZVBhcmFtc1snZ2VvbWV0cnlQcmVjaXNpb24nXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIGNhbGwgdG8gbWFwIG1vdmUgY2FsbGJhY2ssIGNhbiBwcmV2ZW50IGNhbGwgYnkgcmV0dXJuaW5nIGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbSAtIHpvb20gbGV2ZWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0VHlwZT11bmRlZmluZWRdIHVuZGVmaW5lZCBmb3IgaW5pdGlhbCBsb2FkLCBvdGhlcndpc2Ugb25lIG9mICdjaGFuZ2U6Y2VudGVyJywgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIHRoZSBjYWxsIHNob3VsZCBwcm9jZWVkXHJcbiAgICAgKi9cclxuICAgIG1hcE1vdmVCZWZvcmUoem9vbSwgZXZ0VHlwZSkge1xyXG4gICAgICAgIHJldHVybiBzdXBlci5tYXBNb3ZlQmVmb3JlKHpvb20sIGV2dFR5cGUpO1xyXG4gICAgICAgIC8vaWYgKHN1cGVyLm1hcE1vdmVCZWZvcmUoem9vbSwgZXZ0VHlwZSkpe1xyXG4gICAgICAgIC8vICAgIC8vcGxhY2UgaG9sZGVyIGZvciBhZGRpdGlvbmFsIHByb2Nlc3NpbmdcclxuICAgICAgICAvLyAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGJhY2sgZnVuY3Rpb24gb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkIC0gdGhlIGpzb24gcmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZUNhbGxiYWNrKGQpIHtcclxuICAgICAgICBzdXBlci5tYXBNb3ZlQ2FsbGJhY2soZCk7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UuYWRkRmVhdHVyZXModGhpcy5fZXNyaUZvcm1hdC5yZWFkRmVhdHVyZXMoZCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllckJhc2VWZWN0b3JFc3JpID0gTGF5ZXJCYXNlVmVjdG9yRXNyaTtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJCYXNlVmVjdG9yRXNyaTtcclxuIl19