/**
 * Created by gavorhes on 11/3/2015.
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
                    //continue;
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
exports.default = MapPopupCls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwUG9wdXBDbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2xIZWxwZXJzL21hcFBvcHVwQ2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7O0FBRUgsMkRBQXNEO0FBRXRELDJDQUFzQztBQUN0Qyw4QkFBaUM7QUFHakMsMEJBQTZCO0FBRTdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUEwQmhDO0lBU0k7Ozs7Ozs7T0FPRztJQUNILGdDQUFZLE9BQW1CLEVBQUUsS0FBeUMsRUFBRSxVQUFrQixFQUFFLGNBQStCLEVBQUUsYUFBc0I7UUFDbkosSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLGFBQWEsSUFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUN0RixDQUFDO0lBRUQsc0JBQUksNkNBQVM7YUFBYjtZQUNJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDOzs7T0FBQTtJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSx3REFBc0I7QUFtQ25DOzs7R0FHRztBQUNIO0lBQWlDLCtCQUFrQjtJ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Q0FBQyxBQXpjRCxDQUFpQyw0QkFBa0IsR0F5Y2xEO0FBemNZLGtDQUFXO0FBMGN4QixFQUFFLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUM3QixrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8zLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1hcEludGVyYWN0aW9uQmFzZSBmcm9tICcuL21hcEludGVyYWN0aW9uQmFzZSc7XHJcbmltcG9ydCBwcm9wZXJ0aWVzWm9vbVN0eWxlIGZyb20gJy4uL29sSGVscGVycy9wcm9wZXJ0aWVzWm9vbVN0eWxlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCB7TGF5ZXJCYXNlVmVjdG9yfSBmcm9tIFwiLi4vbGF5ZXJzL0xheWVyQmFzZVZlY3RvclwiO1xyXG5pbXBvcnQgTGF5ZXJFc3JpTWFwU2VydmVyIGZyb20gXCIuLi9sYXllcnMvTGF5ZXJFc3JpTWFwU2VydmVyXCI7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBwb3B1cENoYW5nZWRGdW5jdGlvbiB7XHJcbiAgICAoJHBvcENvbnRlbnQ6IEpRdWVyeSk6IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIHBvcHVwQ2FsbGJhY2sge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIHBvcHVwXHJcbiAgICAgKiBAcGFyYW0gZmVhdHVyZVByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSBqcVJlZlxyXG4gICAgICovXHJcbiAgICAoZmVhdHVyZVByb3BlcnRpZXM6IE9iamVjdCwganFSZWY/OiBKUXVlcnkpOiBzdHJpbmcgfCBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgbWFwRXZlbnQge1xyXG4gICAgY29vcmRpbmF0ZTogb2wuQ29vcmRpbmF0ZTtcclxuICAgIHBpeGVsOiBvbC5QaXhlbDtcclxuICAgIGRyYWdnaW5nOiBib29sZWFufGFueTtcclxuICAgIG9yaWdpbmFsRXZlbnQ6IEV2ZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVMYXllclByb3BlcnRpZXMge1xyXG5cclxuICAgIGZlYXR1cmU6IG9sLkZlYXR1cmU7XHJcbiAgICBsYXllcjogTGF5ZXJCYXNlVmVjdG9yfExheWVyRXNyaU1hcFNlcnZlcjtcclxuICAgIGxheWVySW5kZXg6IG51bWJlcjtcclxuICAgIHNlbGVjdGlvbkxheWVyOiBvbC5sYXllci5WZWN0b3I7XHJcbiAgICBwb3B1cENvbnRlbnQ6IHN0cmluZztcclxuICAgIGVzcmlMYXllck5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZmVhdHVyZSB0aGUgZmVhdHVyZVxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gdGhlIGxheWVyIGluIHRoZSBwb3B1cFxyXG4gICAgICogQHBhcmFtIGxheWVySW5kZXggLSBpbmRleCBvZiB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSBzZWxlY3Rpb25MYXllciAtIHRoZSBvbCBzZWxlY3Rpb24gbGF5ZXJcclxuICAgICAqIEBwYXJhbSBbZXNyaUxheWVyTmFtZT11bmRlZmluZWRdIC0gZXNyaSBsYXllciBuYW1lXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZlYXR1cmU6IG9sLkZlYXR1cmUsIGxheWVyOiBMYXllckJhc2VWZWN0b3J8TGF5ZXJFc3JpTWFwU2VydmVyLCBsYXllckluZGV4OiBudW1iZXIsIHNlbGVjdGlvbkxheWVyOiBvbC5sYXllci5WZWN0b3IsIGVzcmlMYXllck5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBsYXllcjtcclxuICAgICAgICB0aGlzLmxheWVySW5kZXggPSBsYXllckluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTGF5ZXIgPSBzZWxlY3Rpb25MYXllcjtcclxuICAgICAgICB0aGlzLnBvcHVwQ29udGVudCA9ICcnO1xyXG4gICAgICAgIHRoaXMuZXNyaUxheWVyTmFtZSA9IHR5cGVvZiBlc3JpTGF5ZXJOYW1lID09ICdzdHJpbmcnID8gZXNyaUxheWVyTmFtZSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGF5ZXJOYW1lKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lc3JpTGF5ZXJOYW1lID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVzcmlMYXllck5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBtYXAgcG9wdXAgY2xhc3NcclxuICogQGF1Z21lbnRzIE1hcEludGVyYWN0aW9uQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcFBvcHVwQ2xzIGV4dGVuZHMgTWFwSW50ZXJhY3Rpb25CYXNlIHtcclxuICAgIHByaXZhdGUgX3BvcHVwT3BlbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXk6IEFycmF5PEZlYXR1cmVMYXllclByb3BlcnRpZXM+O1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFBvcHVwSW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3BvcHVwQ29udGVudExlbmd0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZXNyaU1hcFNlcnZpY2VMYXllcnM6IEFycmF5PExheWVyRXNyaU1hcFNlcnZlcj47XHJcbiAgICBwcml2YXRlIF8kcG9wdXBDbG9zZXI6IEpRdWVyeTtcclxuICAgIHByaXZhdGUgXyRwb3B1cENvbnRlbnQ6IEpRdWVyeTtcclxuICAgIHByaXZhdGUgXyRwb3B1cENvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBfcG9wdXBPdmVybGF5OiBvbC5PdmVybGF5O1xyXG4gICAgcHJpdmF0ZSBfYXJyUG9wdXBMYXllcnM6IEFycmF5PExheWVyQmFzZVZlY3Rvcj47XHJcbiAgICBwcml2YXRlIF9wb3B1cENvb3JkaW5hdGU6IG9sLkNvb3JkaW5hdGU7XHJcbiAgICBwcml2YXRlIF9wb3B1cENoYW5nZWRGdW5jdGlvbnM6IEFycmF5PHBvcHVwQ2hhbmdlZEZ1bmN0aW9uPjtcclxuICAgIHByaXZhdGUgX21hcENsaWNrRnVuY3Rpb25zOiBBcnJheTxGdW5jdGlvbj47XHJcbiAgICBwcml2YXRlIF9zZWxlY3Rpb25MYXllckxvb2t1cDogT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBfYXJyUG9wdXBMYXllcklkczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHByaXZhdGUgX2FyclBvcHVwTGF5ZXJOYW1lczogQXJyYXk8c3RyaW5nPjtcclxuICAgIHByaXZhdGUgX2FyclBvcHVwT2xMYXllcnM6IEFycmF5PG9sLmxheWVyLlZlY3Rvcj47XHJcbiAgICBwcml2YXRlIF9hcnJQb3B1cENvbnRlbnRGdW5jdGlvbjogQXJyYXk8cG9wdXBDYWxsYmFjaz47XHJcbiAgICBwcml2YXRlIF9zZWxlY3Rpb25MYXllcnM6IEFycmF5PG9sLmxheWVyLlZlY3Rvcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbml0aW9uIGZvciBvcGVubGF5ZXJzIHN0eWxlIGZ1bmN0aW9uXHJcbiAgICAgKiBAY2FsbGJhY2sgb2xTdHlsZUZ1bmN0aW9uXHJcbiAgICAgKiAmcGFyYW0gZmVhdHVyZSB0aGUgb3BlbmxheWVycyB2ZWN0b3IgZmVhdHVyZVxyXG4gICAgICogJHBhcmFtXHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXAgcG9wdXAgY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoJ21hcCBwb3B1cCcpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJJZHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVyTmFtZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwT2xMYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cENvbnRlbnRGdW5jdGlvbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENvbnRhaW5lciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENsb3NlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9wb3B1cE92ZXJsYXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJMb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9tYXBDbGlja0Z1bmN0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAvL2xldCBhID0gZnVuY3Rpb24oJGpxdWVyeUNvbnRlbnQpe2NvbnNvbGUubG9nKCRqcXVlcnlDb250ZW50KX07XHJcbiAgICAgICAgLy90aGlzLl9wb3B1cENoYW5nZWRMb29rdXAgPSB7J2EnOiBhfTtcclxuICAgICAgICB0aGlzLl9wb3B1cENoYW5nZWRGdW5jdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9lc3JpTWFwU2VydmljZUxheWVycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9wb3B1cE9wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3B1cENvb3JkaW5hdGUgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoID0gMDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXAgcG9wdXAgaW5pdGlhbGl6YXRpb25cclxuICAgICAqIEBwYXJhbSB7b2wuTWFwfSB0aGVNYXAgLSB0aGUgb2wgbWFwXHJcbiAgICAgKi9cclxuICAgIGluaXQodGhlTWFwOiBvbC5NYXApIHtcclxuICAgICAgICBzdXBlci5pbml0KHRoZU1hcCk7XHJcblxyXG4gICAgICAgIGxldCAkbWFwO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLm1hcC5nZXRUYXJnZXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgJG1hcCA9ICQoJyMnICsgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICRtYXAgPSAkKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbWFwLmFwcGVuZChcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvbC1wb3B1cFwiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvbC1wb3B1cC1jbG9zZXJcIj5YPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBvcHVwLWNvbnRlbnRcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl8kcG9wdXBDb250YWluZXIgPSAkbWFwLmZpbmQoJy5vbC1wb3B1cCcpO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQgPSAkbWFwLmZpbmQoJy5wb3B1cC1jb250ZW50Jyk7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ2xvc2VyID0gJG1hcC5maW5kKCcub2wtcG9wdXAtY2xvc2VyJyk7XHJcblxyXG4gICAgICAgIGxldCBfZWFzZSA9IChuOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gb2wuZWFzaW5nLmluQW5kT3V0KG4pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wb3B1cE92ZXJsYXkgPSBuZXcgb2wuT3ZlcmxheSh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuXyRwb3B1cENvbnRhaW5lclswXSxcclxuICAgICAgICAgICAgYXV0b1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1BhbkFuaW1hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDI1MCxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogdGhlTWFwLmdldFZpZXcoKS5nZXRDZW50ZXIoKSxcclxuICAgICAgICAgICAgICAgIGVhc2luZzogX2Vhc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXAuYWRkT3ZlcmxheSh0aGlzLl9wb3B1cE92ZXJsYXkpO1xyXG5cclxuICAgICAgICB0aGlzLl8kcG9wdXBDbG9zZXIuY2xpY2soKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZGlzcGxheSBwb3B1cCBvbiBjbGlja1xyXG4gICAgICAgIHRoaXMuX21hcC5vbignc2luZ2xlY2xpY2snLCAoZXZ0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgdGhpcy5fcG9wdXBDb29yZGluYXRlID0gZXZ0Wydjb29yZGluYXRlJ107XHJcblxyXG4gICAgICAgICAgICAvLyBlc3JpIG1hcCBzZXJ2aWNlIGxheWVyc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZXNyaU1hcFNlcnZpY2VMYXllcnMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeTogZXZ0Wydjb29yZGluYXRlJ10uam9pbignLCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5VHlwZTogJ2VzcmlHZW9tZXRyeVBvaW50JyxcclxuICAgICAgICAgICAgICAgICAgICBsYXllcnM6ICdhbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyOiB0aGlzLl9tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKS5nZXRDb2RlKCkuc3BsaXQoJzonKVsxXSxcclxuICAgICAgICAgICAgICAgICAgICBtYXBFeHRlbnQ6ICh0aGlzLl9tYXAuZ2V0VmlldygpLmNhbGN1bGF0ZUV4dGVudCh0aGlzLl9tYXAuZ2V0U2l6ZSgpKSBhcyBudW1iZXJbXSkuam9pbignLCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGlzcGxheTogKHRoaXMuX21hcC5nZXRTaXplKCkgYXMgbnVtYmVyW10pLmpvaW4oJywnKSArICcsOTYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkdlb21ldHJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgZjogJ3Bqc29uJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsIG9mIHRoaXMuX2VzcmlNYXBTZXJ2aWNlTGF5ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbC5nZXRQb3B1cEluZm8ocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXkgPSB0aGlzLl9mZWF0dXJlc0F0UGl4ZWwoZXZ0WydwaXhlbCddKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZWF0T2JqID0gbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXlbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZmVhdE9iai5mZWF0dXJlLmdldFByb3BlcnRpZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9wdXBDb250ZW50UmVzcG9uc2UgPSB0aGlzLl9hcnJQb3B1cENvbnRlbnRGdW5jdGlvbltmZWF0T2JqLmxheWVySW5kZXhdKHByb3BzLCB0aGlzLl8kcG9wdXBDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NraXAgaWYgcmV0dXJuIHdhcyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwQ29udGVudFJlc3BvbnNlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwb3B1cENvbnRlbnRSZXNwb25zZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZlYXRPYmoucG9wdXBDb250ZW50ID0gcG9wdXBDb250ZW50UmVzcG9uc2UgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXkucHVzaChmZWF0T2JqKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdE9iai5zZWxlY3Rpb25MYXllci5nZXRTb3VyY2UoKS5hZGRGZWF0dXJlKGZlYXRPYmouZmVhdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCA9IHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb3B1cEh0bWwgPSAnPGRpdiBjbGFzcz1cIm9sLXBvcHVwLW5hdlwiPic7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPHNwYW4gY2xhc3M9XCJwcmV2aW91cy1wb3B1cCBvbC1wb3B1cC1uYXYtYXJyb3dcIj4mIzk2NjQ7PC9zcGFuPic7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPHNwYW4gY2xhc3M9XCJuZXh0LXBvcHVwIG9sLXBvcHVwLW5hdi1hcnJvd1wiPiYjOTY1NDs8L3NwYW4+JztcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8c3BhbiBjbGFzcz1cImN1cnJlbnQtcG9wdXAtaXRlbS1udW1iZXJcIiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkO1wiPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gYDxzcGFuPiZuYnNwO29mJm5ic3A7PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHNwYW4gY2xhc3M9XCJwb3B1cC1jb250ZW50LWxlbmd0aFwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JHt0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGh9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHNwYW4+Jm5ic3A7Jm5ic3A7LSZuYnNwOyZuYnNwOzwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gYDxzcGFuIGNsYXNzPVwiY3VycmVudC1wb3B1cC1sYXllci1uYW1lXCI+PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9ICc8ZGl2IGNsYXNzPVwib2wtcG9wdXAtaW5uZXJcIj4nO1xyXG5cclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5odG1sKHBvcHVwSHRtbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5wcmV2aW91cy1wb3B1cCcpLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFBvcHVwSW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID0gdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXgtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJGZWF0U2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5leHRQb3B1cCA9IHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLm5leHQtcG9wdXAnKTtcclxuXHJcbiAgICAgICAgICAgIG5leHRQb3B1cC5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoID09IDEgJiYgdGhpcy5fY3VycmVudFBvcHVwSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFBvcHVwSW5kZXggPT0gdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFBvcHVwSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJGZWF0U2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0UG9wdXAudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvcHVwT3ZlcmxheS5zZXRQb3NpdGlvbih0aGlzLl9wb3B1cENvb3JkaW5hdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5zY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cE9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vY2hhbmdlIG1vdXNlIGN1cnNvciB3aGVuIG92ZXIgbWFya2VyXHJcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdwb2ludGVybW92ZScsIChldnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2dFsnZHJhZ2dpbmcnXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwaXhlbCA9IHRoaXMubWFwLmdldEV2ZW50UGl4ZWwoZXZ0WydvcmlnaW5hbEV2ZW50J10pO1xyXG4gICAgICAgICAgICBsZXQgaGl0ID0gdGhpcy5tYXAuaGFzRmVhdHVyZUF0UGl4ZWwocGl4ZWwsIChseXJDYW5kaWRhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG9sTGF5ZXIgb2YgdGhpcy5fYXJyUG9wdXBPbExheWVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChseXJDYW5kaWRhdGUgPT0gb2xMYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1hcEVsZW1lbnQgPSB0aGlzLm1hcC5nZXRUYXJnZXRFbGVtZW50KCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIG1hcEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gaGl0ID8gJ3BvaW50ZXInIDogJyc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGVscGVyIHRvIHNlbGVjdCBmZWF0dXJlc1xyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX3RyaWdnZXJGZWF0U2VsZWN0KCkge1xyXG4gICAgICAgIGxldCAkY3VycmVudFBvcHVwSXRlbU51bWJlciA9IHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLmN1cnJlbnQtcG9wdXAtaXRlbS1udW1iZXInKTtcclxuICAgICAgICBsZXQgJGlubmVyUG9wdXAgPSB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5vbC1wb3B1cC1pbm5lcicpO1xyXG4gICAgICAgIGxldCAkbGF5ZXJOYW1lU3BhbiA9IHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLmN1cnJlbnQtcG9wdXAtbGF5ZXItbmFtZScpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICBsZXQgbHlyRmVhdE9iaiA9IHRoaXMuX3Bhc3NUaHJvdWdoTGF5ZXJGZWF0dXJlQXJyYXlbdGhpcy5fY3VycmVudFBvcHVwSW5kZXhdO1xyXG4gICAgICAgICRjdXJyZW50UG9wdXBJdGVtTnVtYmVyLmh0bWwoKHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ICsgMSkudG9GaXhlZCgpKTtcclxuICAgICAgICAkbGF5ZXJOYW1lU3Bhbi5odG1sKGx5ckZlYXRPYmoubGF5ZXJOYW1lKTtcclxuICAgICAgICAkaW5uZXJQb3B1cC5odG1sKGx5ckZlYXRPYmoucG9wdXBDb250ZW50KTtcclxuICAgICAgICBseXJGZWF0T2JqLnNlbGVjdGlvbkxheWVyLmdldFNvdXJjZSgpLmFkZEZlYXR1cmUobHlyRmVhdE9iai5mZWF0dXJlKTtcclxuICAgICAgICBmb3IgKGxldCBmIG9mIHRoaXMuX3BvcHVwQ2hhbmdlZEZ1bmN0aW9ucykge1xyXG4gICAgICAgICAgICBmKHRoaXMuXyRwb3B1cENvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGZlYXR1cmUgLSB0aGUgb2wgZmVhdHVyZVxyXG4gICAgICogQHBhcmFtIHtMYXllckVzcmlNYXBTZXJ2ZXJ9IGx5ciAtIHRoZSBtYXAgc2VydmVyIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9wdXBDb250ZW50IC0gcG9wdXAgY29udGVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVzcmlOYW1lIC0gZXNyaSBsYXllciBuYW1lXHJcbiAgICAgKi9cclxuICAgIGFkZE1hcFNlcnZpY2VQb3B1cENvbnRlbnQoZmVhdHVyZTogb2wuRmVhdHVyZSwgbHlyOiBMYXllckVzcmlNYXBTZXJ2ZXIsIHBvcHVwQ29udGVudDogc3RyaW5nLCBlc3JpTmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGxldCBmZWF0TGF5ZXJPYmplY3QgPSBuZXcgRmVhdHVyZUxheWVyUHJvcGVydGllcyhcclxuICAgICAgICAgICAgZmVhdHVyZSwgbHlyLCB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGgsIHRoaXMuX3NlbGVjdGlvbkxheWVyTG9va3VwW2x5ci5pZF0sIGVzcmlOYW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICBmZWF0TGF5ZXJPYmplY3QucG9wdXBDb250ZW50ID0gcG9wdXBDb250ZW50O1xyXG5cclxuICAgICAgICB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5LnB1c2goZmVhdExheWVyT2JqZWN0KTtcclxuICAgICAgICB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGgrKztcclxuXHJcbiAgICAgICAgJCgnLnBvcHVwLWNvbnRlbnQtbGVuZ3RoJykuaHRtbCh0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGgudG9GaXhlZCgpKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9wb3B1cE9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcubmV4dC1wb3B1cCcpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cE92ZXJsYXkuc2V0UG9zaXRpb24odGhpcy5fcG9wdXBDb29yZGluYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5zY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwT3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAgcGl4ZWwgLSB0aGUgb2wgcGl4ZWxcclxuICAgICAqIEByZXR1cm5zICBmZWF0dXJlIGxheWVyIHByb3BlcnRpZXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9mZWF0dXJlc0F0UGl4ZWwocGl4ZWw6IG9sLlBpeGVsKTogQXJyYXk8RmVhdHVyZUxheWVyUHJvcGVydGllcz4ge1xyXG4gICAgICAgIGxldCBsYXllckZlYXR1cmVPYmplY3RBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLm1hcC5mb3JFYWNoRmVhdHVyZUF0UGl4ZWwocGl4ZWwsIChmZWF0dXJlOiBvbC5GZWF0dXJlLCBsYXllcjogb2wubGF5ZXIuVmVjdG9yKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBseXJJbmRleCA9IHRoaXMuX2FyclBvcHVwT2xMYXllcnMuaW5kZXhPZihsYXllcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobHlySW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXkucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRmVhdHVyZUxheWVyUHJvcGVydGllcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZSwgdGhpcy5fYXJyUG9wdXBMYXllcnNbbHlySW5kZXhdLCBseXJJbmRleCwgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzW2x5ckluZGV4XSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsYXllckZlYXR1cmVPYmplY3RBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwT3ZlcmxheS5zZXRQb3NpdGlvbih1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENsb3NlclswXS5ibHVyKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuaHRtbCgnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaGdGdW5jdGlvbiAtIHBvcHVwIGNoYW5nZSBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBhZGRQb3B1cENoYW5nZWRGdW5jdGlvbihjaGdGdW5jdGlvbjogcG9wdXBDaGFuZ2VkRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9wb3B1cENoYW5nZWRGdW5jdGlvbnMucHVzaChjaGdGdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMYXllckJhc2V8Kn0gbHlyIC0gdGhlIGxheWVyIGJlaW5nIGFjdGVkIG9uXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW3NlbGVjdGlvblN0eWxlPXt9XSB0aGUgc2VsZWN0aW9uIHN0eWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0aW9uU3R5bGUuY29sb3I9cmdiYSgyNTUsMTcwLDAsMC41KV0gdGhlIHNlbGVjdGlvbiBjb2xvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzZWxlY3Rpb25TdHlsZS53aWR0aD0xMF0gdGhlIHNlbGVjdGlvbiB3aWR0aCBmb3IgbGluZWFyIGZlYXR1cmVzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gW3NlbGVjdGlvblN0eWxlLm9sU3R5bGU9dW5kZWZpbmVkXSBhbiBvcGVubGF5ZXJzIHN0eWxlIG9iamVjdCBvciBmdW5jdGlvblxyXG4gICAgICogQHJldHVybnMgIHRoZSBuZXcgc2VsZWN0aW9uIGxheWVyXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfYWRkUG9wdXBMYXllcihseXI6IExheWVyQmFzZVZlY3Rvciwgc2VsZWN0aW9uU3R5bGU6IHtjb2xvcj86IHN0cmluZywgd2lkdGg/OiBudW1iZXIsIG9sU3R5bGU/OiBvbC5zdHlsZS5TdHlsZX0pOiBvbC5sYXllci5WZWN0b3Ige1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG5cclxuICAgICAgICBzZWxlY3Rpb25TdHlsZSA9IHNlbGVjdGlvblN0eWxlIHx8IHt9O1xyXG4gICAgICAgIHNlbGVjdGlvblN0eWxlLmNvbG9yID0gc2VsZWN0aW9uU3R5bGUuY29sb3IgfHwgJ3JnYmEoMjU1LDE3MCwwLDAuNSknO1xyXG4gICAgICAgIHNlbGVjdGlvblN0eWxlLndpZHRoID0gc2VsZWN0aW9uU3R5bGUud2lkdGggfHwgMTA7XHJcblxyXG4gICAgICAgIGxldCB0aGVTdHlsZTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvblN0eWxlLm9sU3R5bGUpIHtcclxuICAgICAgICAgICAgdGhlU3R5bGUgPSBzZWxlY3Rpb25TdHlsZS5vbFN0eWxlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoZVN0eWxlID0gbmV3IG9sLnN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNlbGVjdGlvblN0eWxlLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzZWxlY3Rpb25TdHlsZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IG5ldyBvbC5zdHlsZS5GaWxsKHtjb2xvcjogc2VsZWN0aW9uU3R5bGUuY29sb3J9KSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbC5zdHlsZS5TdHJva2Uoe2NvbG9yOiBzZWxlY3Rpb25TdHlsZS5jb2xvciwgd2lkdGg6IDF9KVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2wuc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNlbGVjdGlvblN0eWxlLmNvbG9yXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3Rpb25MYXllciA9IG5ldyBvbC5sYXllci5WZWN0b3IoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogbmV3IG9sLnNvdXJjZS5WZWN0b3IoKSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGVTdHlsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgc2VsZWN0aW9uTGF5ZXIuc2V0WkluZGV4KDEwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVycy5wdXNoKHNlbGVjdGlvbkxheWVyKTtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllckxvb2t1cFtseXIuaWRdID0gc2VsZWN0aW9uTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIoc2VsZWN0aW9uTGF5ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uTGF5ZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHBvcHVwIHRvIHRoZSBtYXBcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJCYXNlfCp9IGx5ciBUaGUgbGF5ZXIgdGhhdCB0aGUgcG9wdXAgd2l0aCBhY3Qgb25cclxuICAgICAqIEBwYXJhbSB7cG9wdXBDYWxsYmFja30gcG9wdXBDb250ZW50RnVuY3Rpb24gLSBwb3B1cCBjb250ZW50IGZ1bmN0aW9uIHRoYXQgbWFrZXMgcG9wdXAgaW5mb1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtzZWxlY3Rpb25TdHlsZT17fV0gdGhlIHNlbGVjdGlvbiBzdHlsZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdGlvblN0eWxlLmNvbG9yPXJnYmEoMjU1LDE3MCwwLDAuNSldIHRoZSBzZWxlY3Rpb24gY29sb3JcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc2VsZWN0aW9uU3R5bGUud2lkdGg9MTBdIHRoZSBzZWxlY3Rpb24gd2lkdGggZm9yIGxpbmVhciBmZWF0dXJlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IFtzZWxlY3Rpb25TdHlsZS5vbFN0eWxlPXVuZGVmaW5lZF0gYW4gb3BlbmxheWVycyBzdHlsZSBvYmplY3Qgb3IgZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IGEgcmVmZXJlbmNlIHRvIHRoZSBvbCBzZWxlY3Rpb24gbGF5ZXJcclxuICAgICAqL1xyXG4gICAgYWRkVmVjdG9yUG9wdXAobHlyOiBMYXllckJhc2VWZWN0b3IsIHBvcHVwQ29udGVudEZ1bmN0aW9uOiBwb3B1cENhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3R5bGU/OiB7Y29sb3I/OiBzdHJpbmcsIHdpZHRoPzogbnVtYmVyLCBvbFN0eWxlPzogb2wuc3R5bGUuU3R5bGV9KSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkxheWVyID0gdGhpcy5fYWRkUG9wdXBMYXllcihseXIsIHNlbGVjdGlvblN0eWxlKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVySWRzLnB1c2gobHlyLmlkKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVyTmFtZXMucHVzaChseXIubmFtZSk7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcnMucHVzaChseXIpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwT2xMYXllcnMucHVzaChseXIub2xMYXllcik7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBDb250ZW50RnVuY3Rpb24ucHVzaChwb3B1cENvbnRlbnRGdW5jdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25MYXllcjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJCYXNlfSBseXIgLSBsYXllclxyXG4gICAgICovXHJcbiAgICByZW1vdmVWZWN0b3JQb3B1cChseXIpIHtcclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fYXJyUG9wdXBMYXllcklkcy5pbmRleE9mKGx5ci5pZCk7XHJcblxyXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVySWRzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVyTmFtZXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJQb3B1cE9sTGF5ZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJQb3B1cENvbnRlbnRGdW5jdGlvbi5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc2VsZWN0aW9uTGF5ZXJMb29rdXBbbHlyLmlkXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMYXllckVzcmlNYXBTZXJ2ZXJ9IGx5ciAtIG1hcCBzZXJ2ZXIgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0aW9uU3R5bGU9e31dIHRoZSBzZWxlY3Rpb24gc3R5bGUgY29uZmlndXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rpb25TdHlsZS5jb2xvcj1yZ2JhKDI1NSwxNzAsMCwwLjUpXSB0aGUgc2VsZWN0aW9uIGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3NlbGVjdGlvblN0eWxlLndpZHRoPTEwXSB0aGUgc2VsZWN0aW9uIHdpZHRoIGZvciBsaW5lYXIgZmVhdHVyZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBbc2VsZWN0aW9uU3R5bGUub2xTdHlsZT11bmRlZmluZWRdIGFuIG9wZW5sYXllcnMgc3R5bGUgb2JqZWN0IG9yIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBhIHJlZmVyZW5jZSB0byB0aGUgb2wgc2VsZWN0aW9uIGxheWVyXHJcbiAgICAgKi9cclxuICAgIGFkZE1hcFNlcnZpY2VQb3B1cChseXIsIHNlbGVjdGlvblN0eWxlPzogb2wuc3R5bGUuU3R5bGV8QXJyYXk8b2wuc3R5bGUuU3R5bGU+fG9sLlN0eWxlRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uTGF5ZXIgPSB0aGlzLl9hZGRQb3B1cExheWVyKGx5ciwgc2VsZWN0aW9uU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuX2VzcmlNYXBTZXJ2aWNlTGF5ZXJzLnB1c2gobHlyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbkxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VsZWN0aW9uTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVyc1tpXS5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBmIG9mIHRoaXMuX21hcENsaWNrRnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIG1hcCBpcyBjbGlja2VkIGJ1dCBiZWZvcmUgYW55IHBvcHVwcyBhcmUgaW1wbGVtZW50ZWRcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSB0aGUgbWFwIGNsaWNrIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZE1hcENsaWNrRnVuY3Rpb24oZnVuYzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9tYXBDbGlja0Z1bmN0aW9ucy5wdXNoKGZ1bmMpO1xyXG4gICAgfVxyXG59XHJcbm5tLk1hcFBvcHVwQ2xzID0gTWFwUG9wdXBDbHM7XHJcbmV4cG9ydCBkZWZhdWx0IE1hcFBvcHVwQ2xzO1xyXG4iXX0=