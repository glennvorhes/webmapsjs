"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LayerBase_1 = require("./LayerBase");
var mapMove_1 = require("../olHelpers/mapMove");
var provide_1 = require("../util/provide");
// import ol = require('custom-ol');
var $ = require("jquery");
var Vector_1 = require("ol/layer/Vector");
var Vector_2 = require("ol/source/Vector");
var Projection_1 = require("ol/proj/Projection");
var nm = provide_1.default('layers');
/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */
var LayerBaseVector = /** @class */ (function (_super) {
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
        _this._source = new Vector_2.default();
        _this._olLayer = new Vector_1.default({
            source: _this._source,
            visible: _this.visible,
            style: _this.style,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution,
            renderOrder: options.renderOrder
        });
        _this.olLayer.setZIndex(_this._zIndex);
        _this._projectionMap = null;
        _this._projection4326 = new Projection_1.default({ code: "EPSG:4326" });
        _this._olLayer.setOpacity(_this.opacity);
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
//# sourceMappingURL=LayerBaseVector.js.map