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
/*!*********************************!*\
  !*** ./layers/LayerBaseSpec.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by glenn on 3/8/2017.
	 */
	"use strict";
	var LayerBase_1 = __webpack_require__(/*! ../../dist/layers/LayerBase */ 3);
	describe("Layer Base", function () {
	    it('exists', function () {
	        expect(LayerBase_1.LayerBase).toBeDefined();
	    });
	});


/***/ },
/* 1 */,
/* 2 */,
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

/***/ }
/******/ ]);
//# sourceMappingURL=LayerBaseSpec.js.map