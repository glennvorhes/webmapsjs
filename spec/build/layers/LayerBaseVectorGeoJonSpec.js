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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************************************!*\
  !*** ./layers/LayerBaseVectorGeoJonSpec.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by glenn on 3/8/2017.
	 */
	"use strict";
	var LayerBaseVectorGeoJson_1 = __webpack_require__(/*! ../../dist/layers/LayerBaseVectorGeoJson */ 1);
	describe("LayerBaseVeotorGeoJson", function () {
	    var geoj;
	    beforeEach(function () {
	        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('');
	    });
	    it('should exist', function () {
	        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('');
	        expect(LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson).toBeDefined();
	        expect(geoj).toBeDefined();
	        console.log('here are cats');
	    });
	});


/***/ },
/* 1 */
/*!************************************************!*\
  !*** ../dist/layers/LayerBaseVectorGeoJson.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

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
	var LayerBaseVector_1 = __webpack_require__(/*! ./LayerBaseVector */ 2);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
	var ol = __webpack_require__(/*! custom-ol */ 12);
	var proj = __webpack_require__(/*! ../olHelpers/projections */ 13);
	var $ = __webpack_require__(/*! jquery */ 7);
	var nm = provide_1.default('layers');
	/**
	 * The Vector GeoJson Layer
	 * @augments LayerBaseVector
	 */
	var LayerBaseVectorGeoJson = (function (_super) {
	    __extends(LayerBaseVectorGeoJson, _super);
	    /**
	     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
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
	     *
	     * @param {object} [options.transform={}] SR transform, set as false for no transform
	     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
	     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
	     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
	     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
	     */
	    function LayerBaseVectorGeoJson(url, options) {
	        var _this = this;
	        url = typeof url == 'string' ? url : '';
	        options = options || {};
	        _this = _super.call(this, url, options) || this;
	        _this._geoJsonFormat = new ol.format.GeoJSON();
	        _this._transform = options.transform || { dataProjection: proj.proj4326, featureProjection: proj.proj3857 };
	        if (_this.autoLoad || _this.visible) {
	            _this._load();
	        }
	        return _this;
	    }
	    /**
	     * add feature collection
	     * @param {object} featureCollection - as geojson object
	     */
	    LayerBaseVectorGeoJson.prototype.addFeatures = function (featureCollection) {
	        if (this._transform.dataProjection == 'EPSG:3857' && this._transform.featureProjection == 'EPSG:3857') {
	            this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection));
	        }
	        else {
	            this._source.addFeatures(this._geoJsonFormat.readFeatures(featureCollection, this._transform));
	        }
	    };
	    /**
	     * trigger load features
	     * @protected
	     * @returns {boolean} if already loaded
	     */
	    LayerBaseVectorGeoJson.prototype._load = function () {
	        var _this = this;
	        if (_super.prototype._load.call(this)) {
	            return true;
	        }
	        $.get(this._url, this._params, function (d) {
	            _this.addFeatures(d);
	            _this.loadCallback(_this);
	        }, 'json').fail(function () {
	            this._loaded = false;
	        });
	        return false;
	    };
	    /**
	     * callback function on map move
	     * @param {object} d the json response
	     * @override
	     */
	    LayerBaseVectorGeoJson.prototype.mapMoveCallback = function (d) {
	        _super.prototype.mapMoveCallback.call(this, d);
	        this._source.addFeatures(this._geoJsonFormat.readFeatures(d, this._transform));
	    };
	    return LayerBaseVectorGeoJson;
	}(LayerBaseVector_1.LayerBaseVector));
	exports.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
	nm.LayerBaseVectorGeoJson = LayerBaseVectorGeoJson;
	exports.default = LayerBaseVectorGeoJson;


/***/ },
/* 2 */
/*!*****************************************!*\
  !*** ../dist/layers/LayerBaseVector.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

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
	var LayerBase_1 = __webpack_require__(/*! ./LayerBase */ 3);
	var mapMove_1 = __webpack_require__(/*! ../olHelpers/mapMove */ 8);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
	var ol = __webpack_require__(/*! custom-ol */ 12);
	var $ = __webpack_require__(/*! jquery */ 7);
	var nm = provide_1.default('layers');
	/**
	 * The Vector layer base
	 * @augments LayerBase
	 * @abstract
	 */
	var LayerBaseVector = (function (_super) {
	    __extends(LayerBaseVector, _super);
	    /**
	     * The base vector layer
	     * @param {string} url - pass an empty string to prevent default load and add from a json source
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
	     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
	     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
	     *
	     */
	    function LayerBaseVector(url, options) {
	        if (options === void 0) { options = {}; }
	        var _this = _super.call(this, url, options) || this;
	        options = options;
	        //prevent regular load if no url has been provided
	        if (_this.url.trim() == '') {
	            _this._loaded = true;
	        }
	        _this._style = typeof options.style == 'undefined' ? undefined : options.style;
	        if (_this.visible) {
	            _this._autoLoad = true;
	        }
	        else {
	            _this._autoLoad = (typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false);
	        }
	        _this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
	        _this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;
	        if (options.mapMoveObj) {
	            _this._mapMove = options.mapMoveObj;
	        }
	        else {
	            _this._mapMove = _this._onDemand ? mapMove_1.default : undefined;
	        }
	        _this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams :
	            function () { return {}; };
	        if (_this._onDemand) {
	            _this._loaded = true;
	            _this._mapMoveParams = {};
	            _this._mapMove.checkInit();
	            _this._mapMove.addVectorLayer(_this);
	        }
	        _this._source = new ol.source.Vector();
	        _this._olLayer = new ol.layer.Vector({
	            source: _this._source,
	            visible: _this.visible,
	            style: _this.style,
	            minResolution: _this._minResolution,
	            maxResolution: _this._maxResolution,
	            renderOrder: options.renderOrder
	        });
	        _this.olLayer.setZIndex(_this._zIndex);
	        _this._projectionMap = null;
	        _this._projection4326 = new ol.proj.Projection({ code: "EPSG:4326" });
	        return _this;
	    }
	    /**
	     * dummy to be overridden
	     * @param {object} featureCollection - geojson or esrijson object
	     */
	    LayerBaseVector.prototype.addFeatures = function (featureCollection) {
	        console.log('Layer vector base addFeatures is a placeholder and does nothing');
	    };
	    /**
	     * Before call to map move callback, can prevent call by returning false
	     * @param {number} zoom - zoom level
	     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
	     * @returns {boolean} if the call should proceed
	     */
	    LayerBaseVector.prototype.mapMoveBefore = function (zoom, evtType) {
	        if (this.minZoom !== undefined) {
	            if (zoom < this.minZoom) {
	                return false;
	            }
	        }
	        if (this.maxZoom !== undefined) {
	            if (zoom > this.maxZoom) {
	                return false;
	            }
	        }
	        return this.visible;
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
	    LayerBaseVector.prototype.mapMoveMakeGetParams = function (extent, zoomLevel) {
	        this._mapMoveParams = {};
	        $.extend(this._mapMoveParams, this.params);
	        $.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
	    };
	    /**
	     * callback function on map move
	     * @param {object} d - the json response
	     */
	    LayerBaseVector.prototype.mapMoveCallback = function (d) {
	        if (this.source) {
	            this._source.clear();
	        }
	    };
	    /**
	     * clear features in the layer
	     */
	    LayerBaseVector.prototype.clear = function () {
	        if (this._source) {
	            this._source.clear();
	        }
	    };
	    Object.defineProperty(LayerBaseVector.prototype, "onDemandDelay", {
	        /**
	         * get on demand delay in miliseconds
	         */
	        get: function () {
	            return this._onDemandDelay;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "autoLoad", {
	        /**
	         * get if the layer is autoloaded
	         */
	        get: function () {
	            return this._autoLoad;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "style", {
	        /**
	         * get the style definition
	         */
	        get: function () {
	            return this._style;
	        },
	        /**
	         * set the style
	         * @param style - the style or function
	         */
	        set: function (style) {
	            this._style = style;
	            this.olLayer.setStyle(this._style);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "mapCrs", {
	        /**
	         * get the map CRS if it is defined by the map move object
	         */
	        get: function () {
	            return this.mapProj == null ? null : this.mapProj.getCode();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "mapProj", {
	        get: function () {
	            if (this._projectionMap != null) {
	                return this._projectionMap;
	            }
	            if (this._mapMove) {
	                this._projectionMap = this._mapMove.map.getView().getProjection();
	                return this._projectionMap;
	            }
	            else {
	                return null;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "mapMove", {
	        /**
	         * get the map move object
	         * @type {MapMoveCls|*}
	         */
	        get: function () {
	            return this._mapMove;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "mapMoveParams", {
	        /**
	         * map move params
	         * @type {object}
	         */
	        get: function () {
	            return this._mapMoveParams;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "visible", {
	        get: function () {
	            return this._visible;
	        },
	        /**
	         * Set the layer visibility
	         * @type {boolean}
	         * @override
	         */
	        set: function (visibility) {
	            _super.prototype.setVisible.call(this, visibility);
	            if (this._onDemand) {
	                this.mapMove.triggerLyrLoad(this);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "source", {
	        /**
	         * get the layer vector source
	         * @override
	         */
	        get: function () {
	            return this.getSource();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "features", {
	        /**
	         * array of ol features
	         */
	        get: function () {
	            return this.source.getFeatures();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBaseVector.prototype, "olLayer", {
	        /**
	         *
	         */
	        get: function () {
	            return _super.prototype.getOlLayer.call(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayerBaseVector.prototype.setZIndex = function (newZ) {
	        this.olLayer.setZIndex(newZ);
	    };
	    return LayerBaseVector;
	}(LayerBase_1.LayerBase));
	exports.LayerBaseVector = LayerBaseVector;
	nm.LayerBaseVector = LayerBaseVector;
	exports.default = LayerBaseVector;


/***/ },
/* 3 */
/*!***********************************!*\
  !*** ../dist/layers/LayerBase.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var zoomResolutionConvert = __webpack_require__(/*! ../olHelpers/zoomResolutionConvert */ 4);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
	var makeGuid_1 = __webpack_require__(/*! ../util/makeGuid */ 6);
	var $ = __webpack_require__(/*! jquery */ 7);
	var nm = provide_1.default('layers');
	/**
	 * The base layer class
	 * @abstract
	 */
	var LayerBase = (function () {
	    /**
	     * The base layer for all others
	     * @param {string} url - url for source
	     * @param {object} options - config
	     * @param {string} [options.id=makeGuid()] - layer id
	     * @param {string} [options.name=Unnamed Layer] - layer name
	     * @param {number} [options.opacity=1] - opacity
	     * @param {boolean} [options.visible=true] - default visible
	     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
	     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
	     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
	     * @param {number} [options.zIndex=0] - the z index for the layer
	     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
	     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
	     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
	     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
	     */
	    function LayerBase(url, options) {
	        if (options === void 0) { options = {}; }
	        options = options || {};
	        if (typeof url !== 'string') {
	            throw 'Invalid URL';
	        }
	        this._url = url;
	        this._params = typeof options.params == 'object' ? options.params : {};
	        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
	        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;
	        this.id = options.id || makeGuid_1.default();
	        this._name = options.name || 'Unnamed Layer';
	        this.animate = false;
	        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;
	        if (this._opacity > 1) {
	            this._opacity = 1;
	        }
	        else if (this._opacity < 0) {
	            this._opacity = 0;
	        }
	        this._visible = typeof options.visible === 'boolean' ? options.visible : true;
	        this._source = undefined;
	        /**
	         *
	         * @protected
	         */
	        this._olLayer = undefined;
	        this._loaded = false;
	        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
	        if (typeof this._maxResolution !== 'undefined') {
	            this._maxResolution += 0.00001;
	        }
	        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);
	        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
	        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
	        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;
	        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {
	        };
	        this._legendContent = '';
	        if (this._legendCheckbox) {
	            this._legendContent += "<input type=\"checkbox\" " + (this.visible ? 'checked' : '') + " " +
	                ("class=\"legend-check\" id=\"" + this.id + "-legend-layer-check\"><span></span>");
	            this._legendContent += "<label for=\"" + this.id + "-legend-layer-check\" class=\"legend-layer-name\">" + this.name + "</label>";
	        }
	        else {
	            this._legendContent += "<label class=\"legend-layer-name\">" + this.name + "</label>";
	        }
	        this._$legendDiv = null;
	        this._applyCollapseCalled = false;
	        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
	    }
	    /**
	     * base load function, sets _loaded = true if it is not already
	     * @protected
	     * @returns {boolean} if already loaded
	     */
	    LayerBase.prototype._load = function () {
	        if (this.loaded == true) {
	            return true;
	        }
	        else {
	            this._loaded = true;
	            return false;
	        }
	    };
	    /**
	     * Get the legend html, be sure to only add to the DOM once
	     * @returns {string} html for layer wrapped in a div
	     */
	    LayerBase.prototype.getLegendDiv = function () {
	        return "<div class=\"legend-layer-div\" id=\"" + this.id + "-legend-layer-div\">" + this._legendContent + "</div>";
	    };
	    /**
	     *
	     * @param additionalContent - additional content to add to legend
	     * @private
	     */
	    LayerBase.prototype._addLegendContent = function (additionalContent) {
	        if (additionalContent === void 0) { additionalContent = ''; }
	        var addCollapse = additionalContent.indexOf('<ul>') > -1;
	        if (addCollapse) {
	            additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
	        }
	        this._legendContent += additionalContent;
	        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
	        if (this._$legendDiv.length > 0) {
	            this._$legendDiv.append(additionalContent);
	            this.applyCollapse();
	        }
	    };
	    /**
	     * add additional content to the legend
	     * @param {string} [additionalContent=] - additonal content to add
	     */
	    LayerBase.prototype.addLegendContent = function (additionalContent) {
	        this._addLegendContent(additionalContent);
	    };
	    LayerBase.prototype.applyCollapse = function () {
	        if (this._applyCollapseCalled) {
	            console.log('collapse already applied');
	            return undefined;
	        }
	        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
	        if (this._$legendDiv.length > 0) {
	            var $expander = this._$legendDiv.find('.legend-items-expander');
	            if ($expander.length > 0) {
	                this._applyCollapseCalled = true;
	                $expander.click(function () {
	                    var $this = $(this);
	                    $this.siblings('ul').slideToggle();
	                    if ($this.hasClass('legend-layer-group-collapsed')) {
	                        $this.removeClass('legend-layer-group-collapsed');
	                        $this.html('&#9660;');
	                    }
	                    else {
	                        $this.addClass('legend-layer-group-collapsed');
	                        $this.html('&#9654;');
	                    }
	                });
	                if (this._legendCollapse) {
	                    $expander.trigger('click');
	                }
	            }
	        }
	    };
	    /**
	     * trick to refresh the layer
	     */
	    LayerBase.prototype.refresh = function () {
	        if (this.source) {
	            this.source.refresh();
	        }
	    };
	    Object.defineProperty(LayerBase.prototype, "id", {
	        get: function () {
	            return this._id;
	        },
	        set: function (newId) {
	            this._id = newId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "animate", {
	        get: function () {
	            return this._animate;
	        },
	        set: function (animate) {
	            this._animate = animate;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "legendContent", {
	        /**
	         * get the legend content
	         * @type {string}
	         */
	        get: function () {
	            return this._legendContent;
	        },
	        /**
	         * set the legend content directly
	         * @param {string} newVal - new content
	         * @protected
	         */
	        set: function (newVal) {
	            this._legendContent = newVal;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "params", {
	        /**
	         * get the map get params
	         * @type {object}
	         */
	        get: function () {
	            return this._params;
	        },
	        /**
	         * set the map get params
	         * @param {object} newParams - new get params
	         * @protected
	         */
	        set: function (newParams) {
	            this._params = newParams;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "minResolution", {
	        /**
	         * get the minimum resolution
	         * @type {number|*}
	         */
	        get: function () {
	            return this._minResolution;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "maxResolution", {
	        /**
	         * get the maximum resolution
	         * @type {number|*}
	         */
	        get: function () {
	            return this._maxResolution;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "minZoom", {
	        /**
	         * get min zoom
	         * @type {number|*}
	         */
	        get: function () {
	            return this._minZoom;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "maxZoom", {
	        /**
	         * get max zoom
	         * @type {number|*}
	         */
	        get: function () {
	            return this._maxZoom;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "url", {
	        /**
	         * get the url
	         * @type {string}
	         */
	        get: function () {
	            return this._url;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "visible", {
	        /**
	         * Get the layer visibility
	         * @type {boolean}
	         */
	        get: function () {
	            return this._visible;
	        },
	        /**
	         * set the visibility
	         * @param visibility
	         */
	        set: function (visibility) {
	            this.setVisible(visibility);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayerBase.prototype.setVisible = function (visibility) {
	        this._visible = visibility;
	        if (this.olLayer) {
	            this.olLayer.setVisible(this._visible);
	            if (visibility && !this._loaded) {
	                this._load();
	            }
	        }
	    };
	    Object.defineProperty(LayerBase.prototype, "opacity", {
	        /**
	         * Get the layer opacity
	         * @type {number}
	         */
	        get: function () {
	            return this._opacity;
	        },
	        /**
	         * Set the layer opacity
	         * @param {number} opacity - layer opacity
	         */
	        set: function (opacity) {
	            this._opacity = opacity;
	            if (this.olLayer) {
	                this.olLayer.setOpacity(this._opacity);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "name", {
	        /**
	         * Get the layer name
	         * @type {string}
	         */
	        get: function () {
	            return this._name;
	        },
	        /**
	         * set the layer name
	         * @param {string} newName - the new name
	         */
	        set: function (newName) {
	            this._name = newName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "loaded", {
	        /**
	         * Check if the layer is loaded
	         * @type {boolean}
	         */
	        get: function () {
	            return this._loaded;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LayerBase.prototype, "source", {
	        /**
	         * get the layer source
	         * @type {*}
	         */
	        get: function () {
	            return this.getSource();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayerBase.prototype.getSource = function () {
	        return this._source;
	    };
	    Object.defineProperty(LayerBase.prototype, "zIndex", {
	        /**
	         * get the z index
	         */
	        get: function () {
	            return this._zIndex;
	        },
	        /**
	         * set the z index
	         */
	        set: function (newZ) {
	            this._zIndex = newZ;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayerBase.prototype.setZIndex = function (newZ) {
	    };
	    Object.defineProperty(LayerBase.prototype, "olLayer", {
	        /**
	         * the the ol layer
	         */
	        get: function () {
	            return this.getOlLayer();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayerBase.prototype.getOlLayer = function () {
	        return this._olLayer;
	    };
	    return LayerBase;
	}());
	exports.LayerBase = LayerBase;
	nm.LayerBase = LayerBase;
	exports.default = LayerBase;


/***/ },
/* 4 */
/*!**************************************************!*\
  !*** ../dist/olHelpers/zoomResolutionConvert.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/14/2015.
	 */
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
	var nm = provide_1.default('olHelpers.zoomResolutionConvert');
	var _zoomResLookup = [
	    156543.03392804097,
	    78271.51696402048,
	    39135.75848201024,
	    19567.87924100512,
	    9783.93962050256,
	    4891.96981025128,
	    2445.98490512564,
	    1222.99245256282,
	    611.49622628141,
	    305.748113140705,
	    152.8740565703525,
	    76.43702828517625,
	    38.21851414258813,
	    19.109257071294063,
	    9.554628535647032,
	    4.777314267823516,
	    2.388657133911758,
	    1.194328566955879,
	    0.5971642834779395,
	    0.29858214173896974,
	    0.14929107086948487,
	    0.07464553543474244,
	    0.03732276771737122,
	    0.01866138385868561,
	    0.009330691929342804,
	    0.004665345964671402,
	    0.002332672982335701,
	    0.0011663364911678506,
	    0.0005831682455839253 //28
	];
	/**
	 * Get the resolution given the zoom level
	 * @param {number} zoomLevel - the zoom level
	 * @returns {number|*} the map resolution
	 */
	function zoomToResolution(zoomLevel) {
	    "use strict";
	    if (typeof zoomLevel == 'number') {
	        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
	            return _zoomResLookup[zoomLevel];
	        }
	        else {
	            console.log("invalid zoom level provided: " + zoomLevel);
	            return undefined;
	        }
	    }
	    else {
	        return undefined;
	    }
	}
	exports.zoomToResolution = zoomToResolution;
	nm.zoomToResolution = zoomToResolution;
	/**
	 * Get resolution from the zoom level
	 * @param {number} resolution - the resolution
	 * @returns {number|*} the zoom level
	 */
	function resolutionToZoom(resolution) {
	    for (var i = 0; i < _zoomResLookup.length; i++) {
	        if (resolution >= _zoomResLookup[i]) {
	            return i;
	        }
	    }
	    return 0;
	}
	exports.resolutionToZoom = resolutionToZoom;
	nm.resolutionToZoom = resolutionToZoom;


/***/ },
/* 5 */
/*!*******************************!*\
  !*** ../dist/util/provide.js ***!
  \*******************************/
/***/ function(module, exports) {

	/**
	 * Created by gavorhes on 12/10/2015.
	 */
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * create a namespace on the gv object
	 * @param {string} namespace to create
	 * @returns {object} object representing the namespace
	 */
	function provide(namespace) {
	    "use strict";
	    if (typeof window['gv'] == 'undefined') {
	        window['gv'] = {};
	    }
	    var parts = namespace.split('.');
	    var nameSpace = window['gv'];
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
	window['gv'].util.provide = provide;
	exports.default = provide;


/***/ },
/* 6 */
/*!********************************!*\
  !*** ../dist/util/makeGuid.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var provide_1 = __webpack_require__(/*! ./provide */ 5);
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
	nm.makeGuid = makeGuid;
	exports.default = makeGuid;


/***/ },
/* 7 */
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 8 */
/*!************************************!*\
  !*** ../dist/olHelpers/mapMove.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var mapMoveCls_1 = __webpack_require__(/*! ./mapMoveCls */ 9);
	/**
	 * The single map move object catch is that it is common to multimap pages
	 * @type {MapMoveCls}
	 */
	exports.mapMove = new mapMoveCls_1.default();
	exports.default = exports.mapMove;


/***/ },
/* 9 */
/*!***************************************!*\
  !*** ../dist/olHelpers/mapMoveCls.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

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
	var mapInteractionBase_1 = __webpack_require__(/*! ./mapInteractionBase */ 10);
	var checkDefined = __webpack_require__(/*! ../util/checkDefined */ 11);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
	var makeGuid_1 = __webpack_require__(/*! ../util/makeGuid */ 6);
	var $ = __webpack_require__(/*! jquery */ 7);
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
	        this._mapMoveCallbacksLookup[functionId] = functionId;
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


/***/ },
/* 10 */
/*!***********************************************!*\
  !*** ../dist/olHelpers/mapInteractionBase.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Created by gavorhes on 12/8/2015.
	 */
	var provide_1 = __webpack_require__(/*! ../util/provide */ 5);
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


/***/ },
/* 11 */
/*!************************************!*\
  !*** ../dist/util/checkDefined.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var provide_1 = __webpack_require__(/*! ./provide */ 5);
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


/***/ },
/* 12 */
/*!*********************!*\
  !*** external "ol" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = ol;

/***/ },
/* 13 */
/*!****************************************!*\
  !*** ../dist/olHelpers/projections.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Created by gavorhes on 10/3/2016.
	 */
	var ol = __webpack_require__(/*! custom-ol */ 12);
	exports.proj4326 = new ol.proj.Projection({ code: 'EPSG:4326' });
	exports.proj3857 = new ol.proj.Projection({ code: 'EPSG:3857' });
	exports.proj3070 = new ol.proj.Projection({ code: 'EPSG:3070' });


/***/ }
/******/ ]);
//# sourceMappingURL=LayerBaseVectorGeoJonSpec.js.map