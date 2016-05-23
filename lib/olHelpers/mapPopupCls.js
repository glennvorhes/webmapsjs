'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jquery = require('../jquery/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _propertiesZoomStyle = require('../olHelpers/propertiesZoomStyle');

var _propertiesZoomStyle2 = _interopRequireDefault(_propertiesZoomStyle);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

var _FeatureLayerProperties = function () {

    /**
     *
     * @param {ol.Feature} feature the feature
     * @param {LayerBaseVector|*} layer - the layer in the popup
     * @param {number} layerIndex - index of the layer
     * @param {ol.layer.Vector} selectionLayer - the ol selection layer
     * @param {string} [esriLayerName=undefined] - esri layer name
     */

    function _FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        _classCallCheck(this, _FeatureLayerProperties);

        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }

    _createClass(_FeatureLayerProperties, [{
        key: 'layerName',
        get: function get() {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            } else {
                return this.layer.name;
            }
        }
    }]);

    return _FeatureLayerProperties;
}();

/**
 * map popup class
 * @augments MapInteractionBase
 */


var MapPopupCls = function (_MapInteractionBase) {
    _inherits(MapPopupCls, _MapInteractionBase);

    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */

    /**
     * Definition for popup changed callback functions
     * @callback popupChangedFunction
     * @param $popContent jquery reference to the popup content
     */

    /**
     * map popup constructor
     */

    function MapPopupCls() {
        _classCallCheck(this, MapPopupCls);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapPopupCls).call(this, 'map popup'));

        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        /**
         *
         * @type {Array<LayerBaseVector>}
         * @private
         */
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
        /**
         *
         * @type {Array<LayerEsriMapServer>}
         * @private
         */
        _this._esriMapServiceLayers = [];

        _this._popupOpen = false;
        _this._popupCoordinate = null;

        /**
         *
         * @type {Array.<_FeatureLayerProperties>}
         */
        _this._passThroughLayerFeatureArray = [];

        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;

        return _this;
    }

    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapPopupCls, [{
        key: 'init',
        value: function init(theMap) {
            var _this2 = this;

            if (_get(Object.getPrototypeOf(MapPopupCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }
            var $map = (0, _jquery2.default)('#' + this.map.getTarget());

            $map.append('<div class="ol-popup">' + '<a href="#" class="ol-popup-closer"></a>' + '<div class="popup-content"></div>' + '</div>');

            this._$popupContainer = $map.find('.ol-popup');
            this._$popupContent = $map.find('.popup-content');
            this._$popupCloser = $map.find('.ol-popup-closer');

            this._popupOverlay = new _ol2.default.Overlay({
                element: this._$popupContainer[0],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });

            this._map.addOverlay(this._popupOverlay);

            this._$popupCloser.click(function () {
                _this2.closePopup();
            });

            // display popup on click
            this._map.on('singleclick', function (evt) {
                _this2.closePopup();
                _this2._popupCoordinate = evt.coordinate;

                if (_this2._esriMapServiceLayers.length > 0) {
                    var queryParams = {
                        geometry: evt.coordinate.join(','),
                        geometryType: 'esriGeometryPoint',
                        layers: 'all',
                        sr: _this2._map.getView().getProjection().getCode().split(':')[1],
                        mapExtent: _this2._map.getView().calculateExtent(_this2._map.getSize()).join(','),
                        imageDisplay: _this2._map.getSize().join(',') + ',96',
                        returnGeometry: true,
                        tolerance: 15,
                        f: 'pjson'
                    };

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this2._esriMapServiceLayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var l = _step.value;

                            l.getPopupInfo(queryParams, _this2._selectionLayerLookup[l.id]);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                var layerFeatureObjectArray = _this2._featuresAtPixel(evt.pixel);

                /**
                 *
                 * @type {Array.<_FeatureLayerProperties>}
                 */
                _this2._passThroughLayerFeatureArray = [];
                _this2._currentPopupIndex = -1;

                for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                    var featObj = layerFeatureObjectArray[i];

                    var props = featObj.feature.getProperties();

                    var popupContentResponse = _this2._arrPopupContentFunction[featObj.layerIndex](props, _this2._$popupContent);

                    //skip if return was false
                    if (popupContentResponse === false) {
                        //continue;
                    } else if (typeof popupContentResponse == 'string') {
                            featObj.popupContent = popupContentResponse;
                            _this2._passThroughLayerFeatureArray.push(featObj);
                        } else {
                            featObj.selectionLayer.getSource().addFeature(featObj.feature);
                        }
                }

                _this2._popupContentLength = _this2._passThroughLayerFeatureArray.length;

                _this2._currentPopupIndex = -1;

                var popupHtml = '<div class="ol-popup-nav">';
                popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
                popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
                popupHtml += '<span class="current-popup-item-number" style="font-weight: bold;"></span>';
                popupHtml += '<span>&nbsp;of&nbsp;</span>';
                popupHtml += '<span class="popup-content-length" style="font-weight: bold;">' + _this2._popupContentLength + '</span>';
                popupHtml += '<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>';
                popupHtml += '<span class="current-popup-layer-name"></span>';
                popupHtml += '</div>';
                popupHtml += '<div class="ol-popup-inner">';

                popupHtml += '</div>';

                _this2._$popupContent.html(popupHtml);

                _this2._$popupContent.find('.previous-popup').click(function () {
                    if (_this2._popupContentLength == 1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == 0) {
                        _this2._currentPopupIndex = _this2._popupContentLength - 1;
                    } else {
                        _this2._currentPopupIndex--;
                    }
                    _this2._triggerFeatSelect();
                });

                var nextPopup = _this2._$popupContent.find('.next-popup');

                nextPopup.click(function () {
                    if (_this2._popupContentLength == 1 && _this2._currentPopupIndex > -1) {
                        return;
                    }

                    if (_this2._currentPopupIndex == _this2._popupContentLength - 1) {
                        _this2._currentPopupIndex = 0;
                    } else {
                        _this2._currentPopupIndex++;
                    }
                    _this2._triggerFeatSelect();
                });

                if (_this2._popupContentLength > 0) {
                    nextPopup.trigger('click');
                    _this2._popupOverlay.setPosition(_this2._popupCoordinate);
                    _this2._$popupContent.scrollTop(0);
                    _this2._popupOpen = true;
                }
            });

            //change mouse cursor when over marker
            this._map.on('pointermove', function (e) {
                if (e.dragging) {
                    return;
                }
                var pixel = _this2.map.getEventPixel(e.originalEvent);
                var hit = _this2.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = _this2._arrPopupOlLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var olLayer = _step2.value;

                            if (lyrCandidate == olLayer) {
                                return true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return false;
                });
                _this2.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        }

        /**
         * helper to select features
         * @private
         */

    }, {
        key: '_triggerFeatSelect',
        value: function _triggerFeatSelect() {
            var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
            var $innerPopup = this._$popupContent.find('.ol-popup-inner');
            var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
            this.clearSelection();
            var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
            $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
            $layerNameSpan.html(lyrFeatObj.layerName);
            $innerPopup.html(lyrFeatObj.popupContent);
            lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._popupChangedFunctions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var f = _step3.value;

                    f(this._$popupContent);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        /**
         *
         * @param {ol.Feature} feature - the ol feature
         * @param {LayerEsriMapServer} lyr - the map server layer
         * @param {string} popupContent - popup content
         * @param {string} esriName - esri layer name
         */

    }, {
        key: 'addMapServicePopupContent',
        value: function addMapServicePopupContent(feature, lyr, popupContent, esriName) {

            var featLayerObject = new _FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
            featLayerObject.popupContent = popupContent;

            this._passThroughLayerFeatureArray.push(featLayerObject);
            this._popupContentLength++;

            (0, _jquery2.default)('.popup-content-length').html(this._popupContentLength.toFixed());

            if (!this._popupOpen) {
                this._$popupContent.find('.next-popup').trigger('click');

                this._popupOverlay.setPosition(this._popupCoordinate);
                this._$popupContent.scrollTop(0);
                this._popupOpen = true;
            }
        }

        /**
         *
         * @param {ol.Pixel} pixel - the ol pixel
         * @returns {Array.<_FeatureLayerProperties>} - feature layer properties
         * @private
         */

    }, {
        key: '_featuresAtPixel',
        value: function _featuresAtPixel(pixel) {
            var _this3 = this;

            var layerFeatureObjectArray = [];
            this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                var lyrIndex = _this3._arrPopupOlLayers.indexOf(layer);

                if (lyrIndex > -1) {
                    layerFeatureObjectArray.push(new _FeatureLayerProperties(feature, _this3._arrPopupLayers[lyrIndex], lyrIndex, _this3._selectionLayers[lyrIndex]));
                }
            });

            return layerFeatureObjectArray;
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this._checkInit();
            this._popupOpen = false;
            this._popupOverlay.setPosition(undefined);
            this._$popupCloser[0].blur();
            this.clearSelection();
            this._$popupContent.html('');

            return false;
        }
    }, {
        key: 'addPopupChangedFunction',


        /**
         *
         * @param {popupChangedFunction} chgFunction - popup change function
         */
        value: function addPopupChangedFunction(chgFunction) {
            this._popupChangedFunctions.push(chgFunction);
        }

        /**
         *
         * @param {LayerBase|*} lyr - the layer being acted on
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {ol.layer.Vector} the new selection layer
         * @private
         */

    }, {
        key: '_addPopupLayer',
        value: function _addPopupLayer(lyr, selectionStyle) {
            this._checkInit();

            selectionStyle = selectionStyle || {};
            selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
            selectionStyle.width = selectionStyle.width || 10;

            var theStyle = void 0;

            if (selectionStyle.olStyle) {
                theStyle = selectionStyle.olStyle;
            } else {
                theStyle = new _ol2.default.style.Style({
                    stroke: new _ol2.default.style.Stroke({
                        color: selectionStyle.color,
                        width: selectionStyle.width
                    }),
                    image: new _ol2.default.style.Circle({
                        radius: 7,
                        fill: new _ol2.default.style.Fill({ color: selectionStyle.color }),
                        stroke: new _ol2.default.style.Stroke({ color: selectionStyle.color, width: 1 })
                    }),
                    fill: new _ol2.default.style.Fill({
                        color: selectionStyle.color
                    })
                });
            }

            var selectionLayer = new _ol2.default.layer.Vector({
                source: new _ol2.default.source.Vector(),
                style: theStyle,
                zIndex: 100
            });

            this._selectionLayers.push(selectionLayer);
            this._selectionLayerLookup[lyr.id] = selectionLayer;
            this.map.addLayer(selectionLayer);

            return selectionLayer;
        }

        /**
         * The popup callback function
         * @callback popupCallback
         * @param {object} featureProperties - the feature properties
         * @param {jQuery} jqRef reference to the div content to do some async stuff inside the div
         * @returns {string} the html content to be added to the popup
         */

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

    }, {
        key: 'addVectorPopup',
        value: function addVectorPopup(lyr, popupContentFunction, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._arrPopupLayerIds.push(lyr.id);
            this._arrPopupLayerNames.push(lyr.name);
            this._arrPopupLayers.push(lyr);
            this._arrPopupOlLayers.push(lyr.olLayer);
            this._arrPopupContentFunction.push(popupContentFunction);

            return selectionLayer;
        }
    }, {
        key: 'removeVectorPopup',


        /**
         *
         * @param {LayerBase} lyr - layer
         */
        value: function removeVectorPopup(lyr) {
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
        }

        /**
         *
         * @param {LayerEsriMapServer} lyr - map server layer
         * @param {object} [selectionStyle={}] the selection style configuration
         * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
         * @param {number} [selectionStyle.width=10] the selection width for linear features
         * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
         * @returns {object} a reference to the ol selection layer
         */

    }, {
        key: 'addMapServicePopup',
        value: function addMapServicePopup(lyr, selectionStyle) {
            var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
            this._esriMapServiceLayers.push(lyr);

            return selectionLayer;
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            this._checkInit();
            for (var i = 0; i < this._selectionLayers.length; i++) {
                this._selectionLayers[i].getSource().clear();
            }
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._mapClickFunctions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var f = _step4.value;

                    f();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'addMapClickFunction',


        /**
         * Add a function to be called when the map is clicked but before any popups are implemented
         * @param {function} func - the map click function
         */
        value: function addMapClickFunction(func) {
            this._mapClickFunctions.push(func);
        }
    }]);

    return MapPopupCls;
}(_mapInteractionBase2.default);

nm.MapPopupCls = MapPopupCls;
exports.default = MapPopupCls;
module.exports = exports['default'];