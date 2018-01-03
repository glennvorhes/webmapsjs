/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";
    if (typeof window.gv == 'undefined') {
        window.gv = {};
    }
    var parts = namespace.split('.');
    var nameSpace = window.gv;
    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];
        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }
        nameSpace = nameSpace[parts[i]];
    }
    return nameSpace;
}
provide('util');
window.gv.util.provide = provide;
exports.default = provide;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ol;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util');
/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
function makeGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
exports.makeGuid = makeGuid;
nm.makeGuid = makeGuid;
exports.default = makeGuid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapMoveCls_1 = __webpack_require__(10);
/**
 * The single map move object catch is that it is common to multimap pages
 * @type {MapMoveCls}
 */
exports.mapMove = new mapMoveCls_1.default();
exports.default = exports.mapMove;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapPopupCls_1 = __webpack_require__(11);
/**
 * The single popup object catch is that it is common to multimap pages
 * @type {MapPopupCls}
 */
exports.mapPopup = new mapPopupCls_1.default();
exports.default = exports.mapPopup;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/8/2015.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers');
/**
 * base interaction
 */
var MapInteractionBase = (function () {
    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    function MapInteractionBase(subtype) {
        this._map = null;
        this._initialized = false;
        this._subtype = subtype;
    }
    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    MapInteractionBase.prototype.init = function (theMap) {
        if (!this._initialized) {
            this._map = theMap;
            this._initialized = true;
        }
    };
    Object.defineProperty(MapInteractionBase.prototype, "map", {
        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInteractionBase.prototype, "initialized", {
        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    MapInteractionBase.prototype._checkInit = function () {
        if (!this.initialized) {
            var msg = this._subtype + " object not initialized";
            alert(msg);
            console.log(msg);
            throw msg;
        }
    };
    /**
     * Check the initialization status and throw exception if not valid yet
     */
    MapInteractionBase.prototype.checkInit = function () {
        this._checkInit();
    };
    return MapInteractionBase;
}());
exports.MapInteractionBase = MapInteractionBase;
nm.MapInteractionBase = MapInteractionBase;
exports.default = MapInteractionBase;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var quickMapBase_1 = __webpack_require__(12);
var provide_1 = __webpack_require__(0);
var mapMove_1 = __webpack_require__(4);
var mapPopup_1 = __webpack_require__(5);
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
function quickMap(options) {
    if (options === void 0) { options = {}; }
    var m = quickMapBase_1.quickMapBase(options);
    mapMove_1.default.init(m);
    mapPopup_1.default.init(m);
    return m;
}
exports.quickMap = quickMap;
nm.quickMap = quickMap;
exports.default = quickMap;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('util.checkDefined');
/**
 * check if the input is undefined or null
 * @param input - input pointer
 * @returns true undefined or null
 */
function undefinedOrNull(input) {
    "use strict";
    return (typeof input === 'undefined' || input === null);
}
exports.undefinedOrNull = undefinedOrNull;
nm.undefinedOrNull = undefinedOrNull;
/**
 * check if the input is defined and not null
 * @param input - input pointer
 * @returns true defined and not null
 */
function definedAndNotNull(input) {
    "use strict";
    return !(undefinedOrNull(input));
}
exports.definedAndNotNull = definedAndNotNull;
nm.definedAndNotNull = definedAndNotNull;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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
var mapInteractionBase_1 = __webpack_require__(6);
var checkDefined = __webpack_require__(9);
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(3);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */
var MapMoveCls = (function (_super) {
    __extends(MapMoveCls, _super);
    /**
     * constructor called implicitly
     */
    function MapMoveCls() {
        var _this = _super.call(this, 'map move') || this;
        _this._arrLyrRequest = [];
        _this._arrLyrTimeout = [];
        _this._arrLayer = [];
        _this._lookupLayer = {};
        _this._mapMoveCallbacks = [];
        _this._mapMoveCallbacksLookup = {};
        _this._mapMoveCallbackDelays = [];
        _this._mapMoveCallbackContext = [];
        _this._mapMoveCallbackTimeout = [];
        _this._mapExtent = undefined;
        _this._zoomLevel = undefined;
        return _this;
    }
    /**
     * initialize the map move object
     * @param theMap - the ol map
     */
    MapMoveCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        this.map.getView().on(['change:center', 'change:resolution'], function (e) {
            _this._updateMapExtent();
            // trigger the layer updates
            for (var i = 0; i < _this._arrLayer.length; i++) {
                _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
            }
            // trigger the map callbacks
            for (var i = 0; i < _this._mapMoveCallbacks.length; i++) {
                _this.triggerMoveCallback(i, e.type);
            }
        });
    };
    MapMoveCls.prototype._updateMapExtent = function () {
        var theView = this.map.getView();
        this._zoomLevel = theView.getZoom();
        var extentArray = theView.calculateExtent(this.map.getSize());
        this._mapExtent = {
            minX: extentArray[0],
            minY: extentArray[1],
            maxX: extentArray[2],
            maxY: extentArray[3]
        };
    };
    Object.defineProperty(MapMoveCls.prototype, "mapExtent", {
        /**
         * return the map extent
         */
        get: function () {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }
            return this._mapExtent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Trigger the layer load
     * @param lyr the layer being acted on
     * @param index index of the layer
     * @param eventType the event triggering the load, as 'change:center' or 'change:resolution'
     */
    MapMoveCls.prototype.triggerLyrLoad = function (lyr, index, eventType) {
        if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
            throw 'need to define lyr or index';
        }
        else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
            index = this._arrLayer.indexOf(lyr);
        }
        else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
            lyr = this._arrLayer[index];
        }
        // clear the timeout
        if (this._arrLyrTimeout[index] != null) {
            clearTimeout(this._arrLyrTimeout[index]);
            this._arrLyrTimeout[index] = null;
        }
        // abort if necessary and clear the request
        if (this._arrLyrRequest[index] != null && this._arrLyrRequest[index] != 4) {
            this._arrLyrRequest[index].abort();
            this._arrLyrRequest[index] = null;
        }
        // dummy callback used if before load returns false
        var callbackFunc = function () { };
        if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
            lyr.mapMoveMakeGetParams(this._mapExtent, this._zoomLevel);
            var __this_1 = this;
            callbackFunc = function () {
                function innerFunction(theLayer, theIndex) {
                    var _innerThis = this;
                    this._arrLyrRequest[theIndex] = $.get(theLayer.url, theLayer.mapMoveParams, function (d) {
                        /**
                         * @type {LayerBaseVector}
                         */
                        theLayer.mapMoveCallback(d);
                        theLayer.loadCallback();
                    }, 'json').fail(function (jqXHR) {
                        if (jqXHR.statusText != 'abort') {
                            console.log('failed');
                            console.log(theLayer.url);
                            console.log(theLayer.mapMoveParams);
                        }
                    }).always(function () {
                        _innerThis._arrLyrTimeout[theIndex] = null;
                        _innerThis._arrLyrRequest[theIndex] = null;
                    });
                }
                innerFunction.call(__this_1, lyr, index);
            };
        }
        else {
            lyr.clear();
        }
        this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
    };
    /**
     * trigger the map move call back at the given index
     * @param ind - the index of the layer
     * @param eventType=undefined the event triggering the load as 'change:center' or 'change:resolution'
     * @param functionId=undefined the function id used to reference the added callback function
     */
    MapMoveCls.prototype.triggerMoveCallback = function (ind, eventType, functionId) {
        if (typeof ind == 'undefined' && typeof functionId == 'undefined') {
            throw 'either the function index or the id must be defined';
        }
        if (typeof ind !== 'number') {
            ind = this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[functionId]);
        }
        if (ind < 0) {
            console.log('function not found');
            return;
        }
        // clear the timeout
        if (this._mapMoveCallbackTimeout[ind] != null) {
            clearTimeout(this._mapMoveCallbackTimeout[ind]);
            this._mapMoveCallbackTimeout[ind] = null;
        }
        var ctx = this._mapMoveCallbackContext[ind];
        var theFunc = this._mapMoveCallbacks[ind];
        var __this = this;
        var f = function () {
            if (ctx !== null) {
                theFunc.call(ctx, __this._mapExtent, __this._zoomLevel, eventType);
            }
            else {
                theFunc(__this._mapExtent, __this._zoomLevel, eventType);
            }
        };
        this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
    };
    /**
     * Add a layer to the interaction
     * @param  lyr - layer to add
     * @param triggerOnAdd - if the layer should be loaded on add
     */
    MapMoveCls.prototype.addVectorLayer = function (lyr, triggerOnAdd) {
        if (triggerOnAdd === void 0) { triggerOnAdd = true; }
        if (this._arrLayer.indexOf(lyr) > -1) {
            console.log('already added ' + lyr.name + ' to map move');
            return;
        }
        this._checkInit();
        this._arrLyrRequest.push(null);
        this._arrLyrTimeout.push(null);
        this._arrLayer.push(lyr);
        this._lookupLayer[lyr.id] = lyr;
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerLyrLoad(lyr, this._arrLayer.length - 1);
        }
    };
    /**
     * add a callback to the map move event
     * @param func - callback function
     * @param context - the context to use for this function
     * @param delay=50 the delay before call load
     * @param triggerOnAdd if the layer should be loaded on add to mapMove
     * @param functionId optional id to reference the function later for outside triggering
     */
    MapMoveCls.prototype.addCallback = function (func, context, delay, triggerOnAdd, functionId) {
        if (this._mapMoveCallbacks.indexOf(func) > -1) {
            console.log('this function already added to map move');
            return;
        }
        this._checkInit();
        if (!functionId) {
            functionId = makeGuid_1.default();
        }
        this._mapMoveCallbacks.push(func);
        this._mapMoveCallbacksLookup[functionId] = func;
        this._mapMoveCallbackDelays.push(typeof delay == 'number' ? delay : 50);
        this._mapMoveCallbackContext.push(checkDefined.definedAndNotNull(context) ? context : null);
        this._mapMoveCallbackTimeout.push(null);
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerMoveCallback(this._mapMoveCallbacks.length - 1);
        }
    };
    return MapMoveCls;
}(mapInteractionBase_1.default));
exports.MapMoveCls = MapMoveCls;
nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

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
var mapInteractionBase_1 = __webpack_require__(6);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var geocode_1 = __webpack_require__(43);
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param [options={}] config options
 * @param [options.divId=map] map div id
 * @param [options.center={}] center config object
 * @param [options.center.x=-10018378] center x, web mercator x or lon
 * @param [options.center.y=5574910] center y, web mercator y or lat
 * @param [options.zoom=7] zoom level
 * @param [options.minZoom=undefined] min zoom
 * @param [options.maxZoom=undefined] max zoom
 * @param [options.baseSwitcher=true] if add base map switcher
 * @param [options.fullScreen=false] if add base map switcher
 * @returns the ol map
 */
function quickMapBase(options) {
    if (options === void 0) { options = {}; }
    options.divId = options.divId || 'map';
    options.center = options.center || { x: -10018378, y: 5574910 };
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;
    options.fullScreen = typeof options.fullScreen == 'boolean' ? options.fullScreen : false;
    options.addGeocode = options.addGeocode || false;
    var $mapDiv = $('#' + options.divId);
    $mapDiv.css('position', 'relative');
    var osmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    // let satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'})});
    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";
    if (options.baseSwitcher) {
        //  let switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        //  switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        //  switcherContent += `height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ${aerialCss};`;
        //  switcherContent += '"></div>';
        //  $mapDiv.append(switcherContent);
        //
        // $mapDiv.find('.base-map-switcher').click(function() {
        //      "use strict";
        //      osmLayer.setVisible(!osmLayer.getVisible());
        //      satLayer.setVisible(!satLayer.getVisible());
        //
        //      if (osmLayer.getVisible()){
        //          $(this).css('background', aerialCss);
        //      } else {
        //          $(this).css('background', osmCss);
        //      }
        //  });
    }
    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }
    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new ol.geom.Point([options.center.x, options.center.y]);
        new ol.proj.Projection({ code: "EPSG:4326" });
        p.transform(new ol.proj.Projection({ code: "EPSG:4326" }), new ol.proj.Projection({ code: "EPSG:3857" }));
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }
    var controls = ol.control.defaults({
        attributionOptions: { collapsible: false }
    });
    var view = new ol.View({
        center: [options.center.x, options.center.y],
        zoom: options.zoom,
        minZoom: options.minZoom,
        maxZoom: options.maxZoom
    });
    var map = new ol.Map({
        layers: [osmLayer],
        target: options.divId,
        controls: controls,
        view: view
    });
    if (options.fullScreen) {
        map.addControl(new ol.control.FullScreen({}));
    }
    if (options.addGeocode) {
        new geocode_1.Geocode(document.getElementById(options.divId), map);
    }
    return map;
}
exports.quickMapBase = quickMapBase;
nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 10/3/2016.
 */
var ol = __webpack_require__(2);
exports.proj4326 = new ol.proj.Projection({ code: 'EPSG:4326' });
exports.proj3857 = new ol.proj.Projection({ code: 'EPSG:3857' });
exports.proj3070 = new ol.proj.Projection({ code: 'EPSG:3070' });


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var quickMap_1 = __webpack_require__(7);
var map = quickMap_1.default({ addGeocode: true });
window['map'] = map;
console.log('it works');


/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var makeGuid_1 = __webpack_require__(3);
var ol = __webpack_require__(2);
var projections_1 = __webpack_require__(16);
var invalidClass = 'geocoder-invalid';
var geocoderLoadingClass = 'geocoder-loading';
// let testAddress = '65 7th Street, Prairie du Sac, WI';
var Geocode = (function () {
    function Geocode(mapDiv, map) {
        var _this = this;
        var inputGuid = makeGuid_1.makeGuid();
        var buttonGuid = makeGuid_1.makeGuid();
        this.map = map;
        this.indicationLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.5)' }),
                    stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                })
            })
        });
        this.map.addLayer(this.indicationLayer);
        $(mapDiv).append('<div class="geocoder-el">' +
            ("<input type=\"text\" id=\"" + inputGuid + "\">") +
            ("<button id=\"" + buttonGuid + "\">Search</button>") +
            '</div>');
        this.theButton = document.getElementById(buttonGuid);
        this.theInput = document.getElementById(inputGuid);
        this.reset();
        var $theButton = $(this.theButton);
        var $theInput = $(this.theInput);
        $theButton.click(function () {
            $theButton.addClass(geocoderLoadingClass);
            _this.theButton.disabled = true;
            _this.indicationLayer.getSource().clear();
            $.get("https://geocode.xyz/" + _this.theInput.value + "?geoit=json", {}, function (d) {
                var lat = parseFloat(d['latt']);
                var lon = parseFloat(d['longt']);
                if ((lat == 0 && lon == 0) || d['error']) {
                    $theInput.addClass(invalidClass);
                    _this.theInput.title = 'Specified Location Invalid';
                    _this.theButton.title = 'Specified Location Invalid';
                }
                else {
                    var v = _this.map.getView();
                    var p = new ol.geom.Point([lon, lat]);
                    var feat = new ol.Feature(p);
                    _this.indicationLayer.getSource().addFeature(feat);
                    p.transform(projections_1.proj4326, projections_1.proj3857);
                    v.setCenter(p.getCoordinates());
                    v.setZoom(13);
                }
                $theButton.removeClass(geocoderLoadingClass);
                _this.theButton.disabled = false;
            }, 'json');
        });
        $(this.theInput).keyup(function (evt) {
            _this.theButton.disabled = _this.theInput.value.length == 0;
            $theInput.removeClass(invalidClass);
            _this.theInput.title = '';
            _this.theButton.title = '';
            if (!_this.theButton.disabled && evt.keyCode == 13) {
                $theButton.click();
            }
        });
    }
    Geocode.prototype.reset = function () {
        this.theButton.disabled = true;
        this.theInput.value = '';
    };
    return Geocode;
}());
exports.Geocode = Geocode;


/***/ })
/******/ ]);
//# sourceMappingURL=geocode.js.map