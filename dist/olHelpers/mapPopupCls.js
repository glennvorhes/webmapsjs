/**
 * Created by gavorhes on 11/3/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mapInteractionBase_1 = require('./mapInteractionBase');
var provide_1 = require('../util/provide');
var custom_ol_1 = require('custom-ol');
var $ = require('jquery');
var nm = provide_1.default('olHelpers');
var FeatureLayerProperties = (function () {
    /**
     *
     * @param feature the feature
     * @param layer - the layer in the popup
     * @param layerIndex - index of the layer
     * @param selectionLayer - the ol selection layer
     * @param [esriLayerName=undefined] - esri layer name
     */
    function FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }
    Object.defineProperty(FeatureLayerProperties.prototype, "layerName", {
        get: function () {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            }
            else {
                return this.layer.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FeatureLayerProperties;
}());
exports.FeatureLayerProperties = FeatureLayerProperties;
/**
 * map popup class
 * @augments MapInteractionBase
 */
var MapPopupCls = (function (_super) {
    __extends(MapPopupCls, _super);
    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */
    /**
     * map popup constructor
     */
    function MapPopupCls() {
        _super.call(this, 'map popup');
        this._arrPopupLayerIds = [];
        this._arrPopupLayerNames = [];
        this._arrPopupLayers = [];
        this._arrPopupOlLayers = [];
        this._arrPopupContentFunction = [];
        this._$popupContainer = undefined;
        this._$popupContent = undefined;
        this._$popupCloser = undefined;
        this._popupOverlay = undefined;
        this._selectionLayers = [];
        this._selectionLayerLookup = {};
        this._mapClickFunctions = [];
        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        this._popupChangedFunctions = [];
        this._esriMapServiceLayers = [];
        this._popupOpen = false;
        this._popupCoordinate = null;
        this._passThroughLayerFeatureArray = [];
        this._currentPopupIndex = -1;
        this._popupContentLength = 0;
    }
    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */
    MapPopupCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        var $map;
        var target = this.map.getTarget();
        if (typeof target == 'string') {
            $map = $('#' + target);
        }
        else {
            $map = $(target);
        }
        $map.append('<div class="ol-popup">' +
            '<span class="ol-popup-closer">X</span>' +
            '<div class="popup-content"></div>' +
            '</div>');
        this._$popupContainer = $map.find('.ol-popup');
        this._$popupContent = $map.find('.popup-content');
        this._$popupCloser = $map.find('.ol-popup-closer');
        this._popupOverlay = new custom_ol_1.ol.Overlay({ element: this._$popupContainer[0], autoPan: true,
            autoPanAnimation: {
                duration: 250,
                source: theMap.getView().getCenter()
            } });
        this._map.addOverlay(this._popupOverlay);
        this._$popupCloser.click(function (evt) {
            _this.closePopup();
        });
        // display popup on click
        this._map.on('singleclick', function (evt) {
            _this.closePopup();
            _this._popupCoordinate = evt['coordinate'];
            // esri map service layers
            if (_this._esriMapServiceLayers.length > 0) {
                var queryParams = {
                    geometry: evt['coordinate'].join(','),
                    geometryType: 'esriGeometryPoint',
                    layers: 'all',
                    sr: _this._map.getView().getProjection().getCode().split(':')[1],
                    mapExtent: _this._map.getView().calculateExtent(_this._map.getSize()).join(','),
                    imageDisplay: _this._map.getSize().join(',') + ',96',
                    returnGeometry: true,
                    tolerance: 15,
                    f: 'pjson'
                };
                for (var _i = 0, _a = _this._esriMapServiceLayers; _i < _a.length; _i++) {
                    var l = _a[_i];
                    l.getPopupInfo(queryParams);
                }
            }
            var layerFeatureObjectArray = _this._featuresAtPixel(evt['pixel']);
            _this._passThroughLayerFeatureArray = [];
            _this._currentPopupIndex = -1;
            for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                var featObj = layerFeatureObjectArray[i];
                var props = featObj.feature.getProperties();
                var popupContentResponse = _this._arrPopupContentFunction[featObj.layerIndex](props, _this._$popupContent);
                //skip if return was false
                if (popupContentResponse === false) {
                }
                else if (typeof popupContentResponse == 'string') {
                    featObj.popupContent = popupContentResponse;
                    _this._passThroughLayerFeatureArray.push(featObj);
                }
                else {
                    featObj.selectionLayer.getSource().addFeature(featObj.feature);
                }
            }
            _this._popupContentLength = _this._passThroughLayerFeatureArray.length;
            _this._currentPopupIndex = -1;
            var popupHtml = '<div class="ol-popup-nav">';
            popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
            popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
            popupHtml += "<span class=\"current-popup-item-number\" style=\"font-weight: bold;\"></span>";
            popupHtml += "<span>&nbsp;of&nbsp;</span>";
            popupHtml += "<span class=\"popup-content-length\" style=\"font-weight: bold;\">" + _this._popupContentLength + "</span>";
            popupHtml += "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>";
            popupHtml += "<span class=\"current-popup-layer-name\"></span>";
            popupHtml += '</div>';
            popupHtml += '<div class="ol-popup-inner">';
            popupHtml += '</div>';
            _this._$popupContent.html(popupHtml);
            _this._$popupContent.find('.previous-popup').click(function () {
                if (_this._popupContentLength == 1) {
                    return;
                }
                if (_this._currentPopupIndex == 0) {
                    _this._currentPopupIndex = _this._popupContentLength - 1;
                }
                else {
                    _this._currentPopupIndex--;
                }
                _this._triggerFeatSelect();
            });
            var nextPopup = _this._$popupContent.find('.next-popup');
            nextPopup.click(function () {
                if (_this._popupContentLength == 1 && _this._currentPopupIndex > -1) {
                    return;
                }
                if (_this._currentPopupIndex == _this._popupContentLength - 1) {
                    _this._currentPopupIndex = 0;
                }
                else {
                    _this._currentPopupIndex++;
                }
                _this._triggerFeatSelect();
            });
            if (_this._popupContentLength > 0) {
                nextPopup.trigger('click');
                _this._popupOverlay.setPosition(_this._popupCoordinate);
                _this._$popupContent.scrollTop(0);
                _this._popupOpen = true;
            }
        });
        //change mouse cursor when over marker
        this._map.on('pointermove', function (evt) {
            if (evt['dragging']) {
                return;
            }
            var pixel = _this.map.getEventPixel(evt['originalEvent']);
            var hit = _this.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                for (var _i = 0, _a = _this._arrPopupOlLayers; _i < _a.length; _i++) {
                    var olLayer = _a[_i];
                    if (lyrCandidate == olLayer) {
                        return true;
                    }
                }
                return false;
            });
            var mapElement = _this.map.getTargetElement();
            mapElement.style.cursor = hit ? 'pointer' : '';
        });
        return true;
    };
    /**
     * helper to select features
     * @private
     */
    MapPopupCls.prototype._triggerFeatSelect = function () {
        var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
        var $innerPopup = this._$popupContent.find('.ol-popup-inner');
        var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
        this.clearSelection();
        var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
        $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
        $layerNameSpan.html(lyrFeatObj.layerName);
        $innerPopup.html(lyrFeatObj.popupContent);
        lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
        for (var _i = 0, _a = this._popupChangedFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f(this._$popupContent);
        }
    };
    /**
     *
     * @param feature - the ol feature
     * @param {LayerEsriMapServer} lyr - the map server layer
     * @param {string} popupContent - popup content
     * @param {string} esriName - esri layer name
     */
    MapPopupCls.prototype.addMapServicePopupContent = function (feature, lyr, popupContent, esriName) {
        var featLayerObject = new FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
        featLayerObject.popupContent = popupContent;
        this._passThroughLayerFeatureArray.push(featLayerObject);
        this._popupContentLength++;
        $('.popup-content-length').html(this._popupContentLength.toFixed());
        if (!this._popupOpen) {
            this._$popupContent.find('.next-popup').trigger('click');
            this._popupOverlay.setPosition(this._popupCoordinate);
            this._$popupContent.scrollTop(0);
            this._popupOpen = true;
        }
    };
    /**
     *
     * @param  pixel - the ol pixel
     * @returns  feature layer properties
     * @private
     */
    MapPopupCls.prototype._featuresAtPixel = function (pixel) {
        var _this = this;
        var layerFeatureObjectArray = [];
        this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            var lyrIndex = _this._arrPopupOlLayers.indexOf(layer);
            if (lyrIndex > -1) {
                layerFeatureObjectArray.push(new FeatureLayerProperties(feature, _this._arrPopupLayers[lyrIndex], lyrIndex, _this._selectionLayers[lyrIndex]));
            }
        });
        return layerFeatureObjectArray;
    };
    MapPopupCls.prototype.closePopup = function () {
        this._checkInit();
        this._popupOpen = false;
        this._popupOverlay.setPosition(undefined);
        this._$popupCloser[0].blur();
        this.clearSelection();
        this._$popupContent.html('');
        return false;
    };
    ;
    /**
     *
     * @param chgFunction - popup change function
     */
    MapPopupCls.prototype.addPopupChangedFunction = function (chgFunction) {
        this._popupChangedFunctions.push(chgFunction);
    };
    /**
     *
     * @param {LayerBase|*} lyr - the layer being acted on
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns  the new selection layer
     * @private
     */
    MapPopupCls.prototype._addPopupLayer = function (lyr, selectionStyle) {
        this._checkInit();
        selectionStyle = selectionStyle || {};
        selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
        selectionStyle.width = selectionStyle.width || 10;
        var theStyle;
        if (selectionStyle.olStyle) {
            theStyle = selectionStyle.olStyle;
        }
        else {
            theStyle = new custom_ol_1.ol.style.Style({
                stroke: new custom_ol_1.ol.style.Stroke({
                    color: selectionStyle.color,
                    width: selectionStyle.width
                }),
                image: new custom_ol_1.ol.style.Circle({
                    radius: 7,
                    fill: new custom_ol_1.ol.style.Fill({ color: selectionStyle.color }),
                    stroke: new custom_ol_1.ol.style.Stroke({ color: selectionStyle.color, width: 1 })
                }),
                fill: new custom_ol_1.ol.style.Fill({
                    color: selectionStyle.color
                })
            });
        }
        var selectionLayer = new custom_ol_1.ol.layer.Vector({
            source: new custom_ol_1.ol.source.Vector(),
            style: theStyle,
            zIndex: 100
        });
        this._selectionLayers.push(selectionLayer);
        this._selectionLayerLookup[lyr.id] = selectionLayer;
        this.map.addLayer(selectionLayer);
        return selectionLayer;
    };
    /**
     * Add popup to the map
     * @param {LayerBase|*} lyr The layer that the popup with act on
     * @param {popupCallback} popupContentFunction - popup content function that makes popup info
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addVectorPopup = function (lyr, popupContentFunction, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._arrPopupLayerIds.push(lyr.id);
        this._arrPopupLayerNames.push(lyr.name);
        this._arrPopupLayers.push(lyr);
        this._arrPopupOlLayers.push(lyr.olLayer);
        this._arrPopupContentFunction.push(popupContentFunction);
        return selectionLayer;
    };
    ;
    /**
     *
     * @param {LayerBase} lyr - layer
     */
    MapPopupCls.prototype.removeVectorPopup = function (lyr) {
        var idx = this._arrPopupLayerIds.indexOf(lyr.id);
        if (idx > -1) {
            this._arrPopupLayerIds.splice(idx, 1);
            this._arrPopupLayerNames.splice(idx, 1);
            this._arrPopupLayers.splice(idx, 1);
            this._arrPopupOlLayers.splice(idx, 1);
            this._arrPopupContentFunction.splice(idx, 1);
            this._selectionLayers.splice(idx, 1);
            delete this._selectionLayerLookup[lyr.id];
        }
    };
    /**
     *
     * @param {LayerEsriMapServer} lyr - map server layer
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addMapServicePopup = function (lyr, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._esriMapServiceLayers.push(lyr);
        return selectionLayer;
    };
    MapPopupCls.prototype.clearSelection = function () {
        this._checkInit();
        for (var i = 0; i < this._selectionLayers.length; i++) {
            this._selectionLayers[i].getSource().clear();
        }
        for (var _i = 0, _a = this._mapClickFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f();
        }
    };
    ;
    /**
     * Add a function to be called when the map is clicked but before any popups are implemented
     * @param {function} func - the map click function
     */
    MapPopupCls.prototype.addMapClickFunction = function (func) {
        this._mapClickFunctions.push(func);
    };
    return MapPopupCls;
}(mapInteractionBase_1.default));
exports.MapPopupCls = MapPopupCls;
nm.MapPopupCls = MapPopupCls;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapPopupCls;
//# sourceMappingURL=mapPopupCls.js.map