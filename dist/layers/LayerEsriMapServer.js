"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 12/7/2015.
 */
var LayerBase_1 = require('./LayerBase');
var esriToOl = require('../olHelpers/esriToOlStyle');
var mapPopup_1 = require('../olHelpers/mapPopup');
var provide_1 = require('../util/provide');
var custom_ol_1 = require('custom-ol');
var nm = provide_1.default('layers');
var $ = require('jquery');
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
        _super.call(this, url, options);
        this._source = new custom_ol_1.ol.source.TileArcGISRest({
            url: this.url == '' ? undefined : this.url,
            params: typeof options.showLayers == 'undefined' ? undefined : { layers: 'show:' + options.showLayers.join(',') }
        });
        this._olLayer = new custom_ol_1.ol.layer.Tile({
            source: this._source,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            zIndex: this._zIndex
        });
        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;
        this._esriFormat = new custom_ol_1.ol.format.EsriJSON();
        this._popupRequest = null;
        this.addLegendContent();
        if (options.addPopup) {
            mapPopup_1.default.addMapServicePopup(this);
        }
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
        var _this = this;
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
                mapPopup_1.default.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
            }
        }, 'json').always(function () {
            _this._popupRequest = null;
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
//# sourceMappingURL=LayerEsriMapServer.js.map