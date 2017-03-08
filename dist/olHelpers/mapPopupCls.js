/**
 * Created by gavorhes on 11/3/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mapInteractionBase_1 = require("./mapInteractionBase");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
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
        var _this = _super.call(this, 'map popup') || this;
        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        _this._arrPopupLayers = [];
        _this._arrPopupOlLayers = [];
        _this._arrPopupContentFunction = [];
        _this._$popupContainer = undefined;
        _this._$popupContent = undefined;
        _this._$popupCloser = undefined;
        _this._popupOverlay = undefined;
        _this._selectionLayers = [];
        _this._selectionLayerLookup = {};
        _this._mapClickFunctions = [];
        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        _this._popupChangedFunctions = [];
        _this._esriMapServiceLayers = [];
        _this._popupOpen = false;
        _this._popupCoordinate = null;
        _this._passThroughLayerFeatureArray = [];
        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;
        return _this;
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
        var _ease = function (n) {
            return ol.easing.inAndOut(n);
        };
        this._popupOverlay = new ol.Overlay({
            element: this._$popupContainer[0],
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
                source: theMap.getView().getCenter(),
                easing: _ease
            }
        });
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
            theStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: selectionStyle.color,
                    width: selectionStyle.width
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: selectionStyle.color }),
                    stroke: new ol.style.Stroke({ color: selectionStyle.color, width: 1 })
                }),
                fill: new ol.style.Fill({
                    color: selectionStyle.color
                })
            });
        }
        var selectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: theStyle
        });
        selectionLayer.setZIndex(100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwUG9wdXBDbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2xIZWxwZXJzL21hcFBvcHVwQ2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7O0FBRUgsMkRBQXNEO0FBRXRELDJDQUFzQztBQUN0Qyw4QkFBaUM7QUFHakMsMEJBQTZCO0FBRTdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUEwQmhDO0lBU0k7Ozs7Ozs7T0FPRztJQUNILGdDQUFZLE9BQW1CLEVBQUUsS0FBeUMsRUFBRSxVQUFrQixFQUFFLGNBQStCLEVBQUUsYUFBc0I7UUFDbkosSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLGFBQWEsSUFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUN0RixDQUFDO0lBRUQsc0JBQUksNkNBQVM7YUFBYjtZQUNJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSx3REFBc0I7QUFtQ25DOzs7R0FHRztBQUNIO0lBQWlDLCtCQUFrQjtJQXFCL0M7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NEJBQWtCLEdBeWNsRDtBQXpjWSxrQ0FBVztBQTBjeEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBQzdCLGtCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDExLzMvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQgTWFwSW50ZXJhY3Rpb25CYXNlIGZyb20gJy4vbWFwSW50ZXJhY3Rpb25CYXNlJztcclxuaW1wb3J0IHByb3BlcnRpZXNab29tU3R5bGUgZnJvbSAnLi4vb2xIZWxwZXJzL3Byb3BlcnRpZXNab29tU3R5bGUnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0IHtMYXllckJhc2VWZWN0b3J9IGZyb20gXCIuLi9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yXCI7XHJcbmltcG9ydCBMYXllckVzcmlNYXBTZXJ2ZXIgZnJvbSBcIi4uL2xheWVycy9MYXllckVzcmlNYXBTZXJ2ZXJcIjtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHBvcHVwQ2hhbmdlZEZ1bmN0aW9uIHtcclxuICAgICgkcG9wQ29udGVudDogSlF1ZXJ5KTogYW55O1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9wdXBDYWxsYmFjayB7XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgcG9wdXBcclxuICAgICAqIEBwYXJhbSBmZWF0dXJlUHJvcGVydGllc1xyXG4gICAgICogQHBhcmFtIGpxUmVmXHJcbiAgICAgKi9cclxuICAgIChmZWF0dXJlUHJvcGVydGllczogT2JqZWN0LCBqcVJlZj86IEpRdWVyeSk6IHN0cmluZyB8IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBtYXBFdmVudCB7XHJcbiAgICBjb29yZGluYXRlOiBvbC5Db29yZGluYXRlO1xyXG4gICAgcGl4ZWw6IG9sLlBpeGVsO1xyXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW58YW55O1xyXG4gICAgb3JpZ2luYWxFdmVudDogRXZlbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZUxheWVyUHJvcGVydGllcyB7XHJcblxyXG4gICAgZmVhdHVyZTogb2wuRmVhdHVyZTtcclxuICAgIGxheWVyOiBMYXllckJhc2VWZWN0b3J8TGF5ZXJFc3JpTWFwU2VydmVyO1xyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0aW9uTGF5ZXI6IG9sLmxheWVyLlZlY3RvcjtcclxuICAgIHBvcHVwQ29udGVudDogc3RyaW5nO1xyXG4gICAgZXNyaUxheWVyTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBmZWF0dXJlIHRoZSBmZWF0dXJlXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSB0aGUgbGF5ZXIgaW4gdGhlIHBvcHVwXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJJbmRleCAtIGluZGV4IG9mIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHNlbGVjdGlvbkxheWVyIC0gdGhlIG9sIHNlbGVjdGlvbiBsYXllclxyXG4gICAgICogQHBhcmFtIFtlc3JpTGF5ZXJOYW1lPXVuZGVmaW5lZF0gLSBlc3JpIGxheWVyIG5hbWVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZmVhdHVyZTogb2wuRmVhdHVyZSwgbGF5ZXI6IExheWVyQmFzZVZlY3RvcnxMYXllckVzcmlNYXBTZXJ2ZXIsIGxheWVySW5kZXg6IG51bWJlciwgc2VsZWN0aW9uTGF5ZXI6IG9sLmxheWVyLlZlY3RvciwgZXNyaUxheWVyTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG4gICAgICAgIHRoaXMubGF5ZXJJbmRleCA9IGxheWVySW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MYXllciA9IHNlbGVjdGlvbkxheWVyO1xyXG4gICAgICAgIHRoaXMucG9wdXBDb250ZW50ID0gJyc7XHJcbiAgICAgICAgdGhpcy5lc3JpTGF5ZXJOYW1lID0gdHlwZW9mIGVzcmlMYXllck5hbWUgPT0gJ3N0cmluZycgPyBlc3JpTGF5ZXJOYW1lIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsYXllck5hbWUoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVzcmlMYXllck5hbWUgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXNyaUxheWVyTmFtZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIG1hcCBwb3B1cCBjbGFzc1xyXG4gKiBAYXVnbWVudHMgTWFwSW50ZXJhY3Rpb25CYXNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwUG9wdXBDbHMgZXh0ZW5kcyBNYXBJbnRlcmFjdGlvbkJhc2Uge1xyXG4gICAgcHJpdmF0ZSBfcG9wdXBPcGVuOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheTogQXJyYXk8RmVhdHVyZUxheWVyUHJvcGVydGllcz47XHJcbiAgICBwcml2YXRlIF9jdXJyZW50UG9wdXBJbmRleDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcG9wdXBDb250ZW50TGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9lc3JpTWFwU2VydmljZUxheWVyczogQXJyYXk8TGF5ZXJFc3JpTWFwU2VydmVyPjtcclxuICAgIHByaXZhdGUgXyRwb3B1cENsb3NlcjogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBfJHBvcHVwQ29udGVudDogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBfJHBvcHVwQ29udGFpbmVyOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIF9wb3B1cE92ZXJsYXk6IG9sLk92ZXJsYXk7XHJcbiAgICBwcml2YXRlIF9hcnJQb3B1cExheWVyczogQXJyYXk8TGF5ZXJCYXNlVmVjdG9yPjtcclxuICAgIHByaXZhdGUgX3BvcHVwQ29vcmRpbmF0ZTogb2wuQ29vcmRpbmF0ZTtcclxuICAgIHByaXZhdGUgX3BvcHVwQ2hhbmdlZEZ1bmN0aW9uczogQXJyYXk8cG9wdXBDaGFuZ2VkRnVuY3Rpb24+O1xyXG4gICAgcHJpdmF0ZSBfbWFwQ2xpY2tGdW5jdGlvbnM6IEFycmF5PEZ1bmN0aW9uPjtcclxuICAgIHByaXZhdGUgX3NlbGVjdGlvbkxheWVyTG9va3VwOiBPYmplY3Q7XHJcbiAgICBwcml2YXRlIF9hcnJQb3B1cExheWVySWRzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfYXJyUG9wdXBMYXllck5hbWVzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfYXJyUG9wdXBPbExheWVyczogQXJyYXk8b2wubGF5ZXIuVmVjdG9yPjtcclxuICAgIHByaXZhdGUgX2FyclBvcHVwQ29udGVudEZ1bmN0aW9uOiBBcnJheTxwb3B1cENhbGxiYWNrPjtcclxuICAgIHByaXZhdGUgX3NlbGVjdGlvbkxheWVyczogQXJyYXk8b2wubGF5ZXIuVmVjdG9yPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaXRpb24gZm9yIG9wZW5sYXllcnMgc3R5bGUgZnVuY3Rpb25cclxuICAgICAqIEBjYWxsYmFjayBvbFN0eWxlRnVuY3Rpb25cclxuICAgICAqICZwYXJhbSBmZWF0dXJlIHRoZSBvcGVubGF5ZXJzIHZlY3RvciBmZWF0dXJlXHJcbiAgICAgKiAkcGFyYW1cclxuICAgICAqL1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1hcCBwb3B1cCBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcignbWFwIHBvcHVwJyk7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcklkcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJOYW1lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBPbExheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwQ29udGVudEZ1bmN0aW9uID0gW107XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ29udGFpbmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ2xvc2VyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwT3ZlcmxheSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllckxvb2t1cCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX21hcENsaWNrRnVuY3Rpb25zID0gW107XHJcblxyXG4gICAgICAgIC8vbGV0IGEgPSBmdW5jdGlvbigkanF1ZXJ5Q29udGVudCl7Y29uc29sZS5sb2coJGpxdWVyeUNvbnRlbnQpfTtcclxuICAgICAgICAvL3RoaXMuX3BvcHVwQ2hhbmdlZExvb2t1cCA9IHsnYSc6IGF9O1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ2hhbmdlZEZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2VzcmlNYXBTZXJ2aWNlTGF5ZXJzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ29vcmRpbmF0ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggPSAwO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1hcCBwb3B1cCBpbml0aWFsaXphdGlvblxyXG4gICAgICogQHBhcmFtIHtvbC5NYXB9IHRoZU1hcCAtIHRoZSBvbCBtYXBcclxuICAgICAqL1xyXG4gICAgaW5pdCh0aGVNYXA6IG9sLk1hcCkge1xyXG4gICAgICAgIHN1cGVyLmluaXQodGhlTWFwKTtcclxuXHJcbiAgICAgICAgbGV0ICRtYXA7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMubWFwLmdldFRhcmdldCgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAkbWFwID0gJCgnIycgKyB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJG1hcCA9ICQodGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRtYXAuYXBwZW5kKFxyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm9sLXBvcHVwXCI+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm9sLXBvcHVwLWNsb3NlclwiPlg8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRwb3B1cENvbnRhaW5lciA9ICRtYXAuZmluZCgnLm9sLXBvcHVwJyk7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudCA9ICRtYXAuZmluZCgnLnBvcHVwLWNvbnRlbnQnKTtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDbG9zZXIgPSAkbWFwLmZpbmQoJy5vbC1wb3B1cC1jbG9zZXInKTtcclxuXHJcbiAgICAgICAgbGV0IF9lYXNlID0gKG46IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbC5lYXNpbmcuaW5BbmRPdXQobik7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwT3ZlcmxheSA9IG5ldyBvbC5PdmVybGF5KHtcclxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5fJHBvcHVwQ29udGFpbmVyWzBdLFxyXG4gICAgICAgICAgICBhdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvUGFuQW5pbWF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjUwLFxyXG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGVNYXAuZ2V0VmlldygpLmdldENlbnRlcigpLFxyXG4gICAgICAgICAgICAgICAgZWFzaW5nOiBfZWFzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX21hcC5hZGRPdmVybGF5KHRoaXMuX3BvcHVwT3ZlcmxheSk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRwb3B1cENsb3Nlci5jbGljaygoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5IHBvcHVwIG9uIGNsaWNrXHJcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdzaW5nbGVjbGljaycsIChldnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cENvb3JkaW5hdGUgPSBldnRbJ2Nvb3JkaW5hdGUnXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGVzcmkgbWFwIHNlcnZpY2UgbGF5ZXJzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lc3JpTWFwU2VydmljZUxheWVycy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5OiBldnRbJ2Nvb3JkaW5hdGUnXS5qb2luKCcsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlUeXBlOiAnZXNyaUdlb21ldHJ5UG9pbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyczogJ2FsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3I6IHRoaXMuX21hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpLmdldENvZGUoKS5zcGxpdCgnOicpWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcEV4dGVudDogKHRoaXMuX21hcC5nZXRWaWV3KCkuY2FsY3VsYXRlRXh0ZW50KHRoaXMuX21hcC5nZXRTaXplKCkpIGFzIG51bWJlcltdKS5qb2luKCcsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEaXNwbGF5OiAodGhpcy5fbWFwLmdldFNpemUoKSBhcyBudW1iZXJbXSkuam9pbignLCcpICsgJyw5NicsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuR2VvbWV0cnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9sZXJhbmNlOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICBmOiAncGpzb24nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGwgb2YgdGhpcy5fZXNyaU1hcFNlcnZpY2VMYXllcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsLmdldFBvcHVwSW5mbyhxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsYXllckZlYXR1cmVPYmplY3RBcnJheSA9IHRoaXMuX2ZlYXR1cmVzQXRQaXhlbChldnRbJ3BpeGVsJ10pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllckZlYXR1cmVPYmplY3RBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlYXRPYmogPSBsYXllckZlYXR1cmVPYmplY3RBcnJheVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBmZWF0T2JqLmZlYXR1cmUuZ2V0UHJvcGVydGllcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3B1cENvbnRlbnRSZXNwb25zZSA9IHRoaXMuX2FyclBvcHVwQ29udGVudEZ1bmN0aW9uW2ZlYXRPYmoubGF5ZXJJbmRleF0ocHJvcHMsIHRoaXMuXyRwb3B1cENvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2tpcCBpZiByZXR1cm4gd2FzIGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpZiAocG9wdXBDb250ZW50UmVzcG9uc2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBvcHVwQ29udGVudFJlc3BvbnNlID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdE9iai5wb3B1cENvbnRlbnQgPSBwb3B1cENvbnRlbnRSZXNwb25zZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheS5wdXNoKGZlYXRPYmopO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0T2JqLnNlbGVjdGlvbkxheWVyLmdldFNvdXJjZSgpLmFkZEZlYXR1cmUoZmVhdE9iai5mZWF0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoID0gdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBvcHVwSHRtbCA9ICc8ZGl2IGNsYXNzPVwib2wtcG9wdXAtbmF2XCI+JztcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9ICc8c3BhbiBjbGFzcz1cInByZXZpb3VzLXBvcHVwIG9sLXBvcHVwLW5hdi1hcnJvd1wiPiYjOTY2NDs8L3NwYW4+JztcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9ICc8c3BhbiBjbGFzcz1cIm5leHQtcG9wdXAgb2wtcG9wdXAtbmF2LWFycm93XCI+JiM5NjU0Ozwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gYDxzcGFuIGNsYXNzPVwiY3VycmVudC1wb3B1cC1pdGVtLW51bWJlclwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGQ7XCI+PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHNwYW4+Jm5ic3A7b2YmbmJzcDs8L3NwYW4+YDtcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8c3BhbiBjbGFzcz1cInBvcHVwLWNvbnRlbnQtbGVuZ3RoXCIgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDtcIj4ke3RoaXMuX3BvcHVwQ29udGVudExlbmd0aH08L3NwYW4+YDtcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8c3Bhbj4mbmJzcDsmbmJzcDstJm5ic3A7Jm5ic3A7PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjdXJyZW50LXBvcHVwLWxheWVyLW5hbWVcIj48L3NwYW4+YDtcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJvbC1wb3B1cC1pbm5lclwiPic7XHJcblxyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50Lmh0bWwocG9wdXBIdG1sKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLnByZXZpb3VzLXBvcHVwJykuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPSB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckZlYXRTZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV4dFBvcHVwID0gdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcubmV4dC1wb3B1cCcpO1xyXG5cclxuICAgICAgICAgICAgbmV4dFBvcHVwLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggPT0gMSAmJiB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9PSB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckZlYXRTZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5leHRQb3B1cC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9wdXBPdmVybGF5LnNldFBvc2l0aW9uKHRoaXMuX3BvcHVwQ29vcmRpbmF0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50LnNjcm9sbFRvcCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jaGFuZ2UgbW91c2UgY3Vyc29yIHdoZW4gb3ZlciBtYXJrZXJcclxuICAgICAgICB0aGlzLl9tYXAub24oJ3BvaW50ZXJtb3ZlJywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZ0WydkcmFnZ2luZyddKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBpeGVsID0gdGhpcy5tYXAuZ2V0RXZlbnRQaXhlbChldnRbJ29yaWdpbmFsRXZlbnQnXSk7XHJcbiAgICAgICAgICAgIGxldCBoaXQgPSB0aGlzLm1hcC5oYXNGZWF0dXJlQXRQaXhlbChwaXhlbCwgKGx5ckNhbmRpZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb2xMYXllciBvZiB0aGlzLl9hcnJQb3B1cE9sTGF5ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGx5ckNhbmRpZGF0ZSA9PSBvbExheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWFwRWxlbWVudCA9IHRoaXMubWFwLmdldFRhcmdldEVsZW1lbnQoKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgbWFwRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBoaXQgPyAncG9pbnRlcicgOiAnJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoZWxwZXIgdG8gc2VsZWN0IGZlYXR1cmVzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfdHJpZ2dlckZlYXRTZWxlY3QoKSB7XHJcbiAgICAgICAgbGV0ICRjdXJyZW50UG9wdXBJdGVtTnVtYmVyID0gdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcuY3VycmVudC1wb3B1cC1pdGVtLW51bWJlcicpO1xyXG4gICAgICAgIGxldCAkaW5uZXJQb3B1cCA9IHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLm9sLXBvcHVwLWlubmVyJyk7XHJcbiAgICAgICAgbGV0ICRsYXllck5hbWVTcGFuID0gdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcuY3VycmVudC1wb3B1cC1sYXllci1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIGxldCBseXJGZWF0T2JqID0gdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheVt0aGlzLl9jdXJyZW50UG9wdXBJbmRleF07XHJcbiAgICAgICAgJGN1cnJlbnRQb3B1cEl0ZW1OdW1iZXIuaHRtbCgodGhpcy5fY3VycmVudFBvcHVwSW5kZXggKyAxKS50b0ZpeGVkKCkpO1xyXG4gICAgICAgICRsYXllck5hbWVTcGFuLmh0bWwobHlyRmVhdE9iai5sYXllck5hbWUpO1xyXG4gICAgICAgICRpbm5lclBvcHVwLmh0bWwobHlyRmVhdE9iai5wb3B1cENvbnRlbnQpO1xyXG4gICAgICAgIGx5ckZlYXRPYmouc2VsZWN0aW9uTGF5ZXIuZ2V0U291cmNlKCkuYWRkRmVhdHVyZShseXJGZWF0T2JqLmZlYXR1cmUpO1xyXG4gICAgICAgIGZvciAobGV0IGYgb2YgdGhpcy5fcG9wdXBDaGFuZ2VkRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGYodGhpcy5fJHBvcHVwQ29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZmVhdHVyZSAtIHRoZSBvbCBmZWF0dXJlXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyRXNyaU1hcFNlcnZlcn0gbHlyIC0gdGhlIG1hcCBzZXJ2ZXIgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3B1cENvbnRlbnQgLSBwb3B1cCBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXNyaU5hbWUgLSBlc3JpIGxheWVyIG5hbWVcclxuICAgICAqL1xyXG4gICAgYWRkTWFwU2VydmljZVBvcHVwQ29udGVudChmZWF0dXJlOiBvbC5GZWF0dXJlLCBseXI6IExheWVyRXNyaU1hcFNlcnZlciwgcG9wdXBDb250ZW50OiBzdHJpbmcsIGVzcmlOYW1lOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgbGV0IGZlYXRMYXllck9iamVjdCA9IG5ldyBGZWF0dXJlTGF5ZXJQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgICBmZWF0dXJlLCBseXIsIHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCwgdGhpcy5fc2VsZWN0aW9uTGF5ZXJMb29rdXBbbHlyLmlkXSwgZXNyaU5hbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIGZlYXRMYXllck9iamVjdC5wb3B1cENvbnRlbnQgPSBwb3B1cENvbnRlbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXkucHVzaChmZWF0TGF5ZXJPYmplY3QpO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCsrO1xyXG5cclxuICAgICAgICAkKCcucG9wdXAtY29udGVudC1sZW5ndGgnKS5odG1sKHRoaXMuX3BvcHVwQ29udGVudExlbmd0aC50b0ZpeGVkKCkpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3BvcHVwT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5uZXh0LXBvcHVwJykudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwT3ZlcmxheS5zZXRQb3NpdGlvbih0aGlzLl9wb3B1cENvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50LnNjcm9sbFRvcCgwKTtcclxuICAgICAgICAgICAgdGhpcy5fcG9wdXBPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICBwaXhlbCAtIHRoZSBvbCBwaXhlbFxyXG4gICAgICogQHJldHVybnMgIGZlYXR1cmUgbGF5ZXIgcHJvcGVydGllc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2ZlYXR1cmVzQXRQaXhlbChwaXhlbDogb2wuUGl4ZWwpOiBBcnJheTxGZWF0dXJlTGF5ZXJQcm9wZXJ0aWVzPiB7XHJcbiAgICAgICAgbGV0IGxheWVyRmVhdHVyZU9iamVjdEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMubWFwLmZvckVhY2hGZWF0dXJlQXRQaXhlbChwaXhlbCwgKGZlYXR1cmU6IG9sLkZlYXR1cmUsIGxheWVyOiBvbC5sYXllci5WZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgbGV0IGx5ckluZGV4ID0gdGhpcy5fYXJyUG9wdXBPbExheWVycy5pbmRleE9mKGxheWVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChseXJJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsYXllckZlYXR1cmVPYmplY3RBcnJheS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGZWF0dXJlTGF5ZXJQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLCB0aGlzLl9hcnJQb3B1cExheWVyc1tseXJJbmRleF0sIGx5ckluZGV4LCB0aGlzLl9zZWxlY3Rpb25MYXllcnNbbHlySW5kZXhdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxheWVyRmVhdHVyZU9iamVjdEFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbml0KCk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBPdmVybGF5LnNldFBvc2l0aW9uKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ2xvc2VyWzBdLmJsdXIoKTtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNoZ0Z1bmN0aW9uIC0gcG9wdXAgY2hhbmdlIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZFBvcHVwQ2hhbmdlZEZ1bmN0aW9uKGNoZ0Z1bmN0aW9uOiBwb3B1cENoYW5nZWRGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ2hhbmdlZEZ1bmN0aW9ucy5wdXNoKGNoZ0Z1bmN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyQmFzZXwqfSBseXIgLSB0aGUgbGF5ZXIgYmVpbmcgYWN0ZWQgb25cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0aW9uU3R5bGU9e31dIHRoZSBzZWxlY3Rpb24gc3R5bGUgY29uZmlndXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rpb25TdHlsZS5jb2xvcj1yZ2JhKDI1NSwxNzAsMCwwLjUpXSB0aGUgc2VsZWN0aW9uIGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3NlbGVjdGlvblN0eWxlLndpZHRoPTEwXSB0aGUgc2VsZWN0aW9uIHdpZHRoIGZvciBsaW5lYXIgZmVhdHVyZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBbc2VsZWN0aW9uU3R5bGUub2xTdHlsZT11bmRlZmluZWRdIGFuIG9wZW5sYXllcnMgc3R5bGUgb2JqZWN0IG9yIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyAgdGhlIG5ldyBzZWxlY3Rpb24gbGF5ZXJcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9hZGRQb3B1cExheWVyKGx5cjogTGF5ZXJCYXNlVmVjdG9yLCBzZWxlY3Rpb25TdHlsZToge2NvbG9yPzogc3RyaW5nLCB3aWR0aD86IG51bWJlciwgb2xTdHlsZT86IG9sLnN0eWxlLlN0eWxlfSk6IG9sLmxheWVyLlZlY3RvciB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbml0KCk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvblN0eWxlID0gc2VsZWN0aW9uU3R5bGUgfHwge307XHJcbiAgICAgICAgc2VsZWN0aW9uU3R5bGUuY29sb3IgPSBzZWxlY3Rpb25TdHlsZS5jb2xvciB8fCAncmdiYSgyNTUsMTcwLDAsMC41KSc7XHJcbiAgICAgICAgc2VsZWN0aW9uU3R5bGUud2lkdGggPSBzZWxlY3Rpb25TdHlsZS53aWR0aCB8fCAxMDtcclxuXHJcbiAgICAgICAgbGV0IHRoZVN0eWxlO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uU3R5bGUub2xTdHlsZSkge1xyXG4gICAgICAgICAgICB0aGVTdHlsZSA9IHNlbGVjdGlvblN0eWxlLm9sU3R5bGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhlU3R5bGUgPSBuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogc2VsZWN0aW9uU3R5bGUuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNlbGVjdGlvblN0eWxlLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBuZXcgb2wuc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sLnN0eWxlLkZpbGwoe2NvbG9yOiBzZWxlY3Rpb25TdHlsZS5jb2xvcn0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7Y29sb3I6IHNlbGVjdGlvblN0eWxlLmNvbG9yLCB3aWR0aDogMX0pXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGZpbGw6IG5ldyBvbC5zdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogc2VsZWN0aW9uU3R5bGUuY29sb3JcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkxheWVyID0gbmV3IG9sLmxheWVyLlZlY3RvcihcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBuZXcgb2wuc291cmNlLlZlY3RvcigpLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoZVN0eWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBzZWxlY3Rpb25MYXllci5zZXRaSW5kZXgoMTAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzLnB1c2goc2VsZWN0aW9uTGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVyTG9va3VwW2x5ci5pZF0gPSBzZWxlY3Rpb25MYXllcjtcclxuICAgICAgICB0aGlzLm1hcC5hZGRMYXllcihzZWxlY3Rpb25MYXllcik7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25MYXllcjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgcG9wdXAgdG8gdGhlIG1hcFxyXG4gICAgICogQHBhcmFtIHtMYXllckJhc2V8Kn0gbHlyIFRoZSBsYXllciB0aGF0IHRoZSBwb3B1cCB3aXRoIGFjdCBvblxyXG4gICAgICogQHBhcmFtIHtwb3B1cENhbGxiYWNrfSBwb3B1cENvbnRlbnRGdW5jdGlvbiAtIHBvcHVwIGNvbnRlbnQgZnVuY3Rpb24gdGhhdCBtYWtlcyBwb3B1cCBpbmZvXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW3NlbGVjdGlvblN0eWxlPXt9XSB0aGUgc2VsZWN0aW9uIHN0eWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0aW9uU3R5bGUuY29sb3I9cmdiYSgyNTUsMTcwLDAsMC41KV0gdGhlIHNlbGVjdGlvbiBjb2xvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzZWxlY3Rpb25TdHlsZS53aWR0aD0xMF0gdGhlIHNlbGVjdGlvbiB3aWR0aCBmb3IgbGluZWFyIGZlYXR1cmVzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gW3NlbGVjdGlvblN0eWxlLm9sU3R5bGU9dW5kZWZpbmVkXSBhbiBvcGVubGF5ZXJzIHN0eWxlIG9iamVjdCBvciBmdW5jdGlvblxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gYSByZWZlcmVuY2UgdG8gdGhlIG9sIHNlbGVjdGlvbiBsYXllclxyXG4gICAgICovXHJcbiAgICBhZGRWZWN0b3JQb3B1cChseXI6IExheWVyQmFzZVZlY3RvciwgcG9wdXBDb250ZW50RnVuY3Rpb246IHBvcHVwQ2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZT86IHtjb2xvcj86IHN0cmluZywgd2lkdGg/OiBudW1iZXIsIG9sU3R5bGU/OiBvbC5zdHlsZS5TdHlsZX0pIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uTGF5ZXIgPSB0aGlzLl9hZGRQb3B1cExheWVyKGx5ciwgc2VsZWN0aW9uU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJJZHMucHVzaChseXIuaWQpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJOYW1lcy5wdXNoKGx5ci5uYW1lKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVycy5wdXNoKGx5cik7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBPbExheWVycy5wdXNoKGx5ci5vbExheWVyKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cENvbnRlbnRGdW5jdGlvbi5wdXNoKHBvcHVwQ29udGVudEZ1bmN0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbkxheWVyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMYXllckJhc2V9IGx5ciAtIGxheWVyXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVZlY3RvclBvcHVwKGx5cikge1xyXG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9hcnJQb3B1cExheWVySWRzLmluZGV4T2YobHlyLmlkKTtcclxuXHJcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJJZHMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJOYW1lcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyclBvcHVwT2xMYXllcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyclBvcHVwQ29udGVudEZ1bmN0aW9uLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9zZWxlY3Rpb25MYXllckxvb2t1cFtseXIuaWRdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyRXNyaU1hcFNlcnZlcn0gbHlyIC0gbWFwIHNlcnZlciBsYXllclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtzZWxlY3Rpb25TdHlsZT17fV0gdGhlIHNlbGVjdGlvbiBzdHlsZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdGlvblN0eWxlLmNvbG9yPXJnYmEoMjU1LDE3MCwwLDAuNSldIHRoZSBzZWxlY3Rpb24gY29sb3JcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc2VsZWN0aW9uU3R5bGUud2lkdGg9MTBdIHRoZSBzZWxlY3Rpb24gd2lkdGggZm9yIGxpbmVhciBmZWF0dXJlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IFtzZWxlY3Rpb25TdHlsZS5vbFN0eWxlPXVuZGVmaW5lZF0gYW4gb3BlbmxheWVycyBzdHlsZSBvYmplY3Qgb3IgZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IGEgcmVmZXJlbmNlIHRvIHRoZSBvbCBzZWxlY3Rpb24gbGF5ZXJcclxuICAgICAqL1xyXG4gICAgYWRkTWFwU2VydmljZVBvcHVwKGx5ciwgc2VsZWN0aW9uU3R5bGU/OiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25MYXllciA9IHRoaXMuX2FkZFBvcHVwTGF5ZXIobHlyLCBzZWxlY3Rpb25TdHlsZSk7XHJcbiAgICAgICAgdGhpcy5fZXNyaU1hcFNlcnZpY2VMYXllcnMucHVzaChseXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uTGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbml0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zZWxlY3Rpb25MYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzW2ldLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGYgb2YgdGhpcy5fbWFwQ2xpY2tGdW5jdGlvbnMpIHtcclxuICAgICAgICAgICAgZigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgbWFwIGlzIGNsaWNrZWQgYnV0IGJlZm9yZSBhbnkgcG9wdXBzIGFyZSBpbXBsZW1lbnRlZFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIHRoZSBtYXAgY2xpY2sgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgYWRkTWFwQ2xpY2tGdW5jdGlvbihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX21hcENsaWNrRnVuY3Rpb25zLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcbn1cclxubm0uTWFwUG9wdXBDbHMgPSBNYXBQb3B1cENscztcclxuZXhwb3J0IGRlZmF1bHQgTWFwUG9wdXBDbHM7XHJcbiJdfQ==