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
var LayerBase_1 = require("./LayerBase");
var mapMove_1 = require("../olHelpers/mapMove");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllckJhc2VWZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXdEO0FBQ3hELGdEQUEyQztBQUUzQywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBNEI3Qjs7OztHQUlHO0FBQ0g7SUFBcUMsbUNBQVM7SUFlMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILHlCQUFZLEdBQVcsRUFBRSxPQUFvQztRQUFwQyx3QkFBQSxFQUFBLFlBQW9DO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQXdEdEI7UUF0REcsT0FBTyxHQUFHLE9BQWlDLENBQUM7UUFFNUMsa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO1FBRUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTlFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0Ys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QUFDLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDOzs7T0FiQTtJQW1CRCxzQkFBSSxtQ0FBTTtRQUpWOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQXNCLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxxQ0FBUTtRQUhaOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLG9DQUFPO1FBSFg7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxpQkFBTSxVQUFVLFdBQXFCLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFUyxtQ0FBUyxHQUFuQixVQUFvQixJQUFZO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoUkQsQ0FBcUMscUJBQVMsR0FnUjdDO0FBaFJZLDBDQUFlO0FBa1I1QixFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUNyQyxrQkFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xheWVyQmFzZSwgTGF5ZXJCYXNlT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2UnO1xyXG5pbXBvcnQgbWFwTW92ZSBmcm9tICcuLi9vbEhlbHBlcnMvbWFwTW92ZSc7XHJcbmltcG9ydCBNYXBNb3ZlQ2xzIGZyb20gJy4uL29sSGVscGVycy9tYXBNb3ZlQ2xzJ1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG1ha2VNYXBNb3ZlUGFyYW1zIHtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBseXJcclxuICAgICAqIEBwYXJhbSBleHRlbnRcclxuICAgICAqIEBwYXJhbSB6b29tTGV2ZWxcclxuICAgICAqL1xyXG4gICAgKGx5cjogTGF5ZXJCYXNlVmVjdG9yLCBleHRlbnQ6IEFycmF5PG51bWJlcj4sIHpvb21MZXZlbD86IG51bWJlcik6IGFueVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyQmFzZVZlY3Rvck9wdGlvbnMgZXh0ZW5kcyBMYXllckJhc2VPcHRpb25ze1xyXG4gICAgYXV0b0xvYWQ/OiBib29sZWFuO1xyXG4gICAgc3R5bGU/OiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbjtcclxuICAgIG9uRGVtYW5kPzogYm9vbGVhbjtcclxuICAgIG9uRGVtYW5kRGVsYXk/OiBudW1iZXI7XHJcbiAgICBtYXBNb3ZlTWFrZUdldFBhcmFtcz86IG1ha2VNYXBNb3ZlUGFyYW1zO1xyXG4gICAgbWFwTW92ZU9iaj86IE1hcE1vdmVDbHM7XHJcbiAgICByZW5kZXJPcmRlcj86IChhOiBvbC5GZWF0dXJlLCBiOiBvbC5GZWF0dXJlKSA9PiBudW1iZXI7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgVmVjdG9yIGxheWVyIGJhc2VcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVxyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckJhc2VWZWN0b3IgZXh0ZW5kcyBMYXllckJhc2Uge1xyXG4gICAgX29sTGF5ZXI6IG9sLmxheWVyLlZlY3RvcjtcclxuICAgIF9zb3VyY2U6IG9sLnNvdXJjZS5WZWN0b3I7XHJcbiAgICBfc3R5bGU6IG9sLnN0eWxlLlN0eWxlfEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5TdHlsZUZ1bmN0aW9uO1xyXG4gICAgX2F1dG9Mb2FkOiBib29sZWFuO1xyXG4gICAgX29uRGVtYW5kOiBib29sZWFuO1xyXG4gICAgX29uRGVtYW5kRGVsYXk6IG51bWJlcjtcclxuICAgIF9tYXBNb3ZlTWFrZUdldFBhcmFtczogbWFrZU1hcE1vdmVQYXJhbXM7XHJcbiAgICBfbWFwTW92ZVBhcmFtczogYW55O1xyXG4gICAgX21hcE1vdmU6IE1hcE1vdmVDbHM7XHJcbiAgICBfcHJvamVjdGlvbk1hcDogb2wucHJvai5Qcm9qZWN0aW9uO1xyXG4gICAgX3Byb2plY3Rpb240MzI2OiBvbC5wcm9qLlByb2plY3Rpb247XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIHZlY3RvciBsYXllclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHBhc3MgYW4gZW1wdHkgc3RyaW5nIHRvIHByZXZlbnQgZGVmYXVsdCBsb2FkIGFuZCBhZGQgZnJvbSBhIGpzb24gc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkXSAtIGxheWVyIGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmFtZT1Vbm5hbWVkIExheWVyXSAtIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vcGFjaXR5PTFdIC0gb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52aXNpYmxlPXRydWVdIC0gZGVmYXVsdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIC0gbWluIHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSAtIG1heCB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5wYXJhbXM9e31dIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIGZ1bmN0aW9uIHRvIGNhbGwgb24gbG9hZCwgY29udGV4dCB0aGlzIGlzIHRoZSBsYXllciBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29sbGFwc2U9ZmFsc2VdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50XSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG9Mb2FkPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGF1dG8gbG9hZCBpZiBub3QgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnN0eWxlPXVuZGVmaW5lZF0gdGhlIGxheWVyIHN0eWxlLCB1c2Ugb3BlbmxheWVycyBkZWZhdWx0IHN0eWxlIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm9uRGVtYW5kPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBleHRlbnQgb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vbkRlbWFuZERlbGF5PTMwMF0gZGVsYXkgYmVmb3JlIHRoZSBtYXAgbW92ZSBjYWxsYmFjayBzaG91bGQgYmUgY2FsbGVkXHJcbiAgICAgKiBAcGFyYW0ge21hcE1vdmVNYWtlR2V0UGFyYW1zfSBbb3B0aW9ucy5tYXBNb3ZlTWFrZUdldFBhcmFtcz1mdW5jdGlvbihseXIsIGV4dGVudCwgem9vbUxldmVsKXt9XSBmdW5jdGlvbiB0byBjcmVhdGUgYWRkaXRpb25hbCBtYXAgbW92ZSBwYXJhbXNcclxuICAgICAqIEBwYXJhbSB7TWFwTW92ZUNsc30gW29wdGlvbnMubWFwTW92ZU9iaj1tYXBNb3ZlXSBhbHRlcm5hdGUgbWFwIG1vdmUgb2JqZWN0IGZvciB1c2Ugd2l0aCBtdWx0aSBtYXAgcGFnZXNcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBvcHRpb25zOiBMYXllckJhc2VWZWN0b3JPcHRpb25zID0ge30pIHtcclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyBhcyBMYXllckJhc2VWZWN0b3JPcHRpb25zO1xyXG5cclxuICAgICAgICAvL3ByZXZlbnQgcmVndWxhciBsb2FkIGlmIG5vIHVybCBoYXMgYmVlbiBwcm92aWRlZFxyXG4gICAgICAgIGlmICh0aGlzLnVybC50cmltKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0eWxlID0gdHlwZW9mIG9wdGlvbnMuc3R5bGUgPT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBvcHRpb25zLnN0eWxlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F1dG9Mb2FkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9hdXRvTG9hZCA9ICh0eXBlb2Ygb3B0aW9uc1snYXV0b0xvYWQnXSA9PSAnYm9vbGVhbicgPyBvcHRpb25zWydhdXRvTG9hZCddIDogZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb25EZW1hbmQgPSB0eXBlb2Ygb3B0aW9ucy5vbkRlbWFuZCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLm9uRGVtYW5kIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb25EZW1hbmREZWxheSA9IHR5cGVvZiBvcHRpb25zLm9uRGVtYW5kRGVsYXkgPT0gJ251bWJlcicgPyBvcHRpb25zLm9uRGVtYW5kRGVsYXkgOiAzMDA7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLm1hcE1vdmVPYmopIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwTW92ZSA9IG9wdGlvbnMubWFwTW92ZU9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlID0gdGhpcy5fb25EZW1hbmQgPyBtYXBNb3ZlIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVNYWtlR2V0UGFyYW1zID0gdHlwZW9mIG9wdGlvbnMubWFwTW92ZU1ha2VHZXRQYXJhbXMgPT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMubWFwTW92ZU1ha2VHZXRQYXJhbXMgOlxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7cmV0dXJuIHt9O307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vbkRlbWFuZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlUGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX21hcE1vdmUuY2hlY2tJbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcE1vdmUuYWRkVmVjdG9yTGF5ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSBuZXcgb2wuc291cmNlLlZlY3RvcigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IG5ldyBvbC5sYXllci5WZWN0b3IoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5fc291cmNlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy52aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICBtaW5SZXNvbHV0aW9uOiB0aGlzLl9taW5SZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjogdGhpcy5fbWF4UmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHJlbmRlck9yZGVyOiBvcHRpb25zLnJlbmRlck9yZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLm9sTGF5ZXIuc2V0WkluZGV4KHRoaXMuX3pJbmRleCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uTWFwID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9wcm9qZWN0aW9uNDMyNiA9IG5ldyBvbC5wcm9qLlByb2plY3Rpb24oe2NvZGU6IFwiRVBTRzo0MzI2XCJ9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGR1bW15IHRvIGJlIG92ZXJyaWRkZW5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlQ29sbGVjdGlvbiAtIGdlb2pzb24gb3IgZXNyaWpzb24gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGFkZEZlYXR1cmVzKGZlYXR1cmVDb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xheWVyIHZlY3RvciBiYXNlIGFkZEZlYXR1cmVzIGlzIGEgcGxhY2Vob2xkZXIgYW5kIGRvZXMgbm90aGluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIGNhbGwgdG8gbWFwIG1vdmUgY2FsbGJhY2ssIGNhbiBwcmV2ZW50IGNhbGwgYnkgcmV0dXJuaW5nIGZhbHNlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbSAtIHpvb20gbGV2ZWxcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0VHlwZT11bmRlZmluZWRdIHVuZGVmaW5lZCBmb3IgaW5pdGlhbCBsb2FkLCBvdGhlcndpc2Ugb25lIG9mICdjaGFuZ2U6Y2VudGVyJywgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIHRoZSBjYWxsIHNob3VsZCBwcm9jZWVkXHJcbiAgICAgKi9cclxuICAgIG1hcE1vdmVCZWZvcmUoem9vbSwgZXZ0VHlwZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1pblpvb20gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoem9vbSA8IHRoaXMubWluWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYXhab29tICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHpvb20gPiB0aGlzLm1heFpvb20pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIHRvIGdlbmVyYXRlIHRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBpbiB0aGUgZ2V0IHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnQgLSBleHRlbnQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblggLSBtaW5YXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblkgLSBtaW5ZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFggLSBtYXhYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFkgLSBtYXhZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbUxldmVsIC0gem9vbSBsZXZlbFxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlTWFrZUdldFBhcmFtcyhleHRlbnQsIHpvb21MZXZlbCkge1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVQYXJhbXMgPSB7fTtcclxuICAgICAgICAkLmV4dGVuZCh0aGlzLl9tYXBNb3ZlUGFyYW1zLCB0aGlzLnBhcmFtcyk7XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5fbWFwTW92ZVBhcmFtcywgdGhpcy5fbWFwTW92ZU1ha2VHZXRQYXJhbXModGhpcywgZXh0ZW50LCB6b29tTGV2ZWwpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIGZ1bmN0aW9uIG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZCAtIHRoZSBqc29uIHJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIG1hcE1vdmVDYWxsYmFjayhkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNsZWFyIGZlYXR1cmVzIGluIHRoZSBsYXllclxyXG4gICAgICovXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICBpZiAodGhpcy5fc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBvbiBkZW1hbmQgZGVsYXkgaW4gbWlsaXNlY29uZHNcclxuICAgICAqL1xyXG4gICAgZ2V0IG9uRGVtYW5kRGVsYXkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb25EZW1hbmREZWxheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBpZiB0aGUgbGF5ZXIgaXMgYXV0b2xvYWRlZFxyXG4gICAgICovXHJcbiAgICBnZXQgYXV0b0xvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9Mb2FkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBzdHlsZSBkZWZpbml0aW9uXHJcbiAgICAgKi9cclxuICAgIGdldCBzdHlsZSgpOiBvbC5TdHlsZUZ1bmN0aW9ufEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5zdHlsZS5TdHlsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBzdHlsZVxyXG4gICAgICogQHBhcmFtIHN0eWxlIC0gdGhlIHN0eWxlIG9yIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldCBzdHlsZShzdHlsZTogb2wuU3R5bGVGdW5jdGlvbnxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuc3R5bGUuU3R5bGUpIHtcclxuICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgIHRoaXMub2xMYXllci5zZXRTdHlsZSh0aGlzLl9zdHlsZSBhcyBvbC5zdHlsZS5TdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG1hcCBDUlMgaWYgaXQgaXMgZGVmaW5lZCBieSB0aGUgbWFwIG1vdmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXBDcnMoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBQcm9qID09IG51bGwgPyBudWxsIDogdGhpcy5tYXBQcm9qLmdldENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWFwUHJvaigpOiBvbC5wcm9qLlByb2plY3Rpb257XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb2plY3Rpb25NYXAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0aW9uTWFwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcE1vdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvamVjdGlvbk1hcCA9IHRoaXMuX21hcE1vdmUubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0aW9uTWFwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG1hcCBtb3ZlIG9iamVjdFxyXG4gICAgICogQHR5cGUge01hcE1vdmVDbHN8Kn1cclxuICAgICAqL1xyXG4gICAgZ2V0IG1hcE1vdmUoKTogTWFwTW92ZUNscyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcE1vdmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXAgbW92ZSBwYXJhbXNcclxuICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXBNb3ZlUGFyYW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBNb3ZlUGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2aXNpYmxlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGxheWVyIHZpc2liaWxpdHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIHNldCB2aXNpYmxlKHZpc2liaWxpdHkpIHtcclxuICAgICAgICBzdXBlci5zZXRWaXNpYmxlKHZpc2liaWxpdHkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb25EZW1hbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXBNb3ZlLnRyaWdnZXJMeXJMb2FkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgbGF5ZXIgdmVjdG9yIHNvdXJjZVxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlZlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlKCkgYXMgb2wuc291cmNlLlZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFycmF5IG9mIG9sIGZlYXR1cmVzXHJcbiAgICAgKi9cclxuICAgIGdldCBmZWF0dXJlcygpOiBBcnJheTxvbC5GZWF0dXJlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmdldEZlYXR1cmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBnZXQgb2xMYXllcigpOiBvbC5sYXllci5WZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBzdXBlci5nZXRPbExheWVyKCkgYXMgb2wubGF5ZXIuVmVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzZXRaSW5kZXgobmV3WjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5vbExheWVyLnNldFpJbmRleChuZXdaKTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlVmVjdG9yID0gTGF5ZXJCYXNlVmVjdG9yO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckJhc2VWZWN0b3I7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==