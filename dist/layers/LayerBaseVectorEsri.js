/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayerBaseVector_1 = require('./LayerBaseVector');
var esriToOl = require('../olHelpers/esriToOlStyle');
var provide_1 = require('../util/provide');
var custom_ol_1 = require('custom-ol');
var $ = require('jquery');
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
        if (typeof options.params != 'object') {
            options.params = {};
        }
        options.params['where'] = options.where || '1=1';
        options.params['outFields'] = options.outFields || '*';
        options.params['f'] = options.format || 'pjson';
        options.params['outSR'] = options.outSR || 3857;
        _super.call(this, url, options);
        this._outSR = this.params['outSR'];
        this._esriFormat = new custom_ol_1.ol.format.EsriJSON();
        if (this._url[this._url.length - 1] !== '/') {
            this._url += '/';
        }
        this._urlCopy = this.url;
        this._url += 'query?callback=?';
        if (this.autoLoad || this.visible) {
            this._load();
        }
        this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;
        if (this._useEsriStyle) {
            this.addLegendContent();
        }
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
nm.LayerBaseVectorEsri = LayerBaseVectorEsri;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseVectorEsri;
//# sourceMappingURL=LayerBaseVectorEsri.js.map