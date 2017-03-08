"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBaseVector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlVmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllckJhc2VWZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUNBQXdEO0FBQ3hELGdEQUEyQztBQUUzQywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBNEI3Qjs7OztHQUlHO0FBQ0g7SUFBcUMsbUNBQVM7SUFlMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILHlCQUFZLEdBQVcsRUFBRSxPQUFvQztRQUFwQyx3QkFBQSxFQUFBLFlBQW9DO1FBQTdELFlBQ0ksa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQyxTQXdEdEI7UUF0REcsT0FBTyxHQUFHLE9BQWlDLENBQUM7UUFFNUMsa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO1FBRUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksV0FBVyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTlFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0YsQ0FBQztR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QUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDOzs7T0FiQTtJQW1CRCxzQkFBSSxtQ0FBTTtRQUpWOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQXNCLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxxQ0FBUTtRQUhaOztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLG9DQUFPO1FBSFg7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxpQkFBTSxVQUFVLFdBQXFCLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFUyxtQ0FBUyxHQUFuQixVQUFvQixJQUFZO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoUkQsQ0FBcUMscUJBQVMsR0FnUjdDO0FBaFJZLDBDQUFlO0FBa1I1QixFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQzs7QUFDckMsa0JBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMYXllckJhc2UsIExheWVyQmFzZU9wdGlvbnN9IGZyb20gJy4vTGF5ZXJCYXNlJztcclxuaW1wb3J0IG1hcE1vdmUgZnJvbSAnLi4vb2xIZWxwZXJzL21hcE1vdmUnO1xyXG5pbXBvcnQgTWFwTW92ZUNscyBmcm9tICcuLi9vbEhlbHBlcnMvbWFwTW92ZUNscydcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5jb25zdCBubSA9IHByb3ZpZGUoJ2xheWVycycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBtYWtlTWFwTW92ZVBhcmFtcyB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbHlyXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW50XHJcbiAgICAgKiBAcGFyYW0gem9vbUxldmVsXHJcbiAgICAgKi9cclxuICAgIChseXI6IExheWVyQmFzZVZlY3RvciwgZXh0ZW50OiBBcnJheTxudW1iZXI+LCB6b29tTGV2ZWw/OiBudW1iZXIpOiBhbnlcclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllckJhc2VWZWN0b3JPcHRpb25zIGV4dGVuZHMgTGF5ZXJCYXNlT3B0aW9uc3tcclxuICAgIGF1dG9Mb2FkPzogYm9vbGVhbjtcclxuICAgIHN0eWxlPzogb2wuc3R5bGUuU3R5bGV8QXJyYXk8b2wuc3R5bGUuU3R5bGU+fG9sLlN0eWxlRnVuY3Rpb247XHJcbiAgICBvbkRlbWFuZD86IGJvb2xlYW47XHJcbiAgICBvbkRlbWFuZERlbGF5PzogbnVtYmVyO1xyXG4gICAgbWFwTW92ZU1ha2VHZXRQYXJhbXM/OiBtYWtlTWFwTW92ZVBhcmFtcztcclxuICAgIG1hcE1vdmVPYmo/OiBNYXBNb3ZlQ2xzO1xyXG4gICAgcmVuZGVyT3JkZXI/OiAoYTogb2wuRmVhdHVyZSwgYjogb2wuRmVhdHVyZSkgPT4gbnVtYmVyO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogVGhlIFZlY3RvciBsYXllciBiYXNlXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGF5ZXJCYXNlVmVjdG9yIGV4dGVuZHMgTGF5ZXJCYXNlIHtcclxuICAgIF9vbExheWVyOiBvbC5sYXllci5WZWN0b3I7XHJcbiAgICBfc291cmNlOiBvbC5zb3VyY2UuVmVjdG9yO1xyXG4gICAgX3N0eWxlOiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbjtcclxuICAgIF9hdXRvTG9hZDogYm9vbGVhbjtcclxuICAgIF9vbkRlbWFuZDogYm9vbGVhbjtcclxuICAgIF9vbkRlbWFuZERlbGF5OiBudW1iZXI7XHJcbiAgICBfbWFwTW92ZU1ha2VHZXRQYXJhbXM6IG1ha2VNYXBNb3ZlUGFyYW1zO1xyXG4gICAgX21hcE1vdmVQYXJhbXM6IGFueTtcclxuICAgIF9tYXBNb3ZlOiBNYXBNb3ZlQ2xzO1xyXG4gICAgX3Byb2plY3Rpb25NYXA6IG9sLnByb2ouUHJvamVjdGlvbjtcclxuICAgIF9wcm9qZWN0aW9uNDMyNjogb2wucHJvai5Qcm9qZWN0aW9uO1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYmFzZSB2ZWN0b3IgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBwYXNzIGFuIGVtcHR5IHN0cmluZyB0byBwcmV2ZW50IGRlZmF1bHQgbG9hZCBhbmQgYWRkIGZyb20gYSBqc29uIHNvdXJjZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvTG9hZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBhdXRvIGxvYWQgaWYgbm90IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5zdHlsZT11bmRlZmluZWRdIHRoZSBsYXllciBzdHlsZSwgdXNlIG9wZW5sYXllcnMgZGVmYXVsdCBzdHlsZSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5vbkRlbWFuZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgYnkgZXh0ZW50IG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub25EZW1hbmREZWxheT0zMDBdIGRlbGF5IGJlZm9yZSB0aGUgbWFwIG1vdmUgY2FsbGJhY2sgc2hvdWxkIGJlIGNhbGxlZFxyXG4gICAgICogQHBhcmFtIHttYXBNb3ZlTWFrZUdldFBhcmFtc30gW29wdGlvbnMubWFwTW92ZU1ha2VHZXRQYXJhbXM9ZnVuY3Rpb24obHlyLCBleHRlbnQsIHpvb21MZXZlbCl7fV0gZnVuY3Rpb24gdG8gY3JlYXRlIGFkZGl0aW9uYWwgbWFwIG1vdmUgcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge01hcE1vdmVDbHN9IFtvcHRpb25zLm1hcE1vdmVPYmo9bWFwTW92ZV0gYWx0ZXJuYXRlIG1hcCBtb3ZlIG9iamVjdCBmb3IgdXNlIHdpdGggbXVsdGkgbWFwIHBhZ2VzXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgb3B0aW9uczogTGF5ZXJCYXNlVmVjdG9yT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgYXMgTGF5ZXJCYXNlVmVjdG9yT3B0aW9ucztcclxuXHJcbiAgICAgICAgLy9wcmV2ZW50IHJlZ3VsYXIgbG9hZCBpZiBubyB1cmwgaGFzIGJlZW4gcHJvdmlkZWRcclxuICAgICAgICBpZiAodGhpcy51cmwudHJpbSgpID09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdHlsZSA9IHR5cGVvZiBvcHRpb25zLnN0eWxlID09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogb3B0aW9ucy5zdHlsZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hdXRvTG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b0xvYWQgPSAodHlwZW9mIG9wdGlvbnNbJ2F1dG9Mb2FkJ10gPT0gJ2Jvb2xlYW4nID8gb3B0aW9uc1snYXV0b0xvYWQnXSA6IGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29uRGVtYW5kID0gdHlwZW9mIG9wdGlvbnMub25EZW1hbmQgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5vbkRlbWFuZCA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29uRGVtYW5kRGVsYXkgPSB0eXBlb2Ygb3B0aW9ucy5vbkRlbWFuZERlbGF5ID09ICdudW1iZXInID8gb3B0aW9ucy5vbkRlbWFuZERlbGF5IDogMzAwO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5tYXBNb3ZlT2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcE1vdmUgPSBvcHRpb25zLm1hcE1vdmVPYmo7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwTW92ZSA9IHRoaXMuX29uRGVtYW5kID8gbWFwTW92ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9tYXBNb3ZlTWFrZUdldFBhcmFtcyA9IHR5cGVvZiBvcHRpb25zLm1hcE1vdmVNYWtlR2V0UGFyYW1zID09ICdmdW5jdGlvbicgPyBvcHRpb25zLm1hcE1vdmVNYWtlR2V0UGFyYW1zIDpcclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge3JldHVybiB7fTt9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb25EZW1hbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbWFwTW92ZVBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlLmNoZWNrSW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlLmFkZFZlY3RvckxheWVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gbmV3IG9sLnNvdXJjZS5WZWN0b3IoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIgPSBuZXcgb2wubGF5ZXIuVmVjdG9yKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuX3NvdXJjZSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IHRoaXMudmlzaWJsZSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgbWluUmVzb2x1dGlvbjogdGhpcy5fbWluUmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIG1heFJlc29sdXRpb246IHRoaXMuX21heFJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICByZW5kZXJPcmRlcjogb3B0aW9ucy5yZW5kZXJPcmRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbExheWVyLnNldFpJbmRleCh0aGlzLl96SW5kZXgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvamVjdGlvbk1hcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdGlvbjQzMjYgPSBuZXcgb2wucHJvai5Qcm9qZWN0aW9uKHtjb2RlOiBcIkVQU0c6NDMyNlwifSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkdW1teSB0byBiZSBvdmVycmlkZGVuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZUNvbGxlY3Rpb24gLSBnZW9qc29uIG9yIGVzcmlqc29uIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBhZGRGZWF0dXJlcyhmZWF0dXJlQ29sbGVjdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMYXllciB2ZWN0b3IgYmFzZSBhZGRGZWF0dXJlcyBpcyBhIHBsYWNlaG9sZGVyIGFuZCBkb2VzIG5vdGhpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZm9yZSBjYWxsIHRvIG1hcCBtb3ZlIGNhbGxiYWNrLCBjYW4gcHJldmVudCBjYWxsIGJ5IHJldHVybmluZyBmYWxzZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpvb20gLSB6b29tIGxldmVsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2V2dFR5cGU9dW5kZWZpbmVkXSB1bmRlZmluZWQgZm9yIGluaXRpYWwgbG9hZCwgb3RoZXJ3aXNlIG9uZSBvZiAnY2hhbmdlOmNlbnRlcicsICdjaGFuZ2U6cmVzb2x1dGlvbidcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBpZiB0aGUgY2FsbCBzaG91bGQgcHJvY2VlZFxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlQmVmb3JlKHpvb20sIGV2dFR5cGUpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5ab29tICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHpvb20gPCB0aGlzLm1pblpvb20pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWF4Wm9vbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh6b29tID4gdGhpcy5tYXhab29tKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsYmFjayB0byBnZW5lcmF0ZSB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4gdGhlIGdldCByZXF1ZXN0XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW50IC0gZXh0ZW50IG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5YIC0gbWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5ZIC0gbWluWVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhYIC0gbWF4WFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhZIC0gbWF4WVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpvb21MZXZlbCAtIHpvb20gbGV2ZWxcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZU1ha2VHZXRQYXJhbXMoZXh0ZW50LCB6b29tTGV2ZWwpIHtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlUGFyYW1zID0ge307XHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5fbWFwTW92ZVBhcmFtcywgdGhpcy5wYXJhbXMpO1xyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMuX21hcE1vdmVQYXJhbXMsIHRoaXMuX21hcE1vdmVNYWtlR2V0UGFyYW1zKHRoaXMsIGV4dGVudCwgem9vbUxldmVsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxsYmFjayBmdW5jdGlvbiBvbiBtYXAgbW92ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGQgLSB0aGUganNvbiByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlQ2FsbGJhY2soZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjbGVhciBmZWF0dXJlcyBpbiB0aGUgbGF5ZXJcclxuICAgICAqL1xyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb24gZGVtYW5kIGRlbGF5IGluIG1pbGlzZWNvbmRzXHJcbiAgICAgKi9cclxuICAgIGdldCBvbkRlbWFuZERlbGF5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uRGVtYW5kRGVsYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgaWYgdGhlIGxheWVyIGlzIGF1dG9sb2FkZWRcclxuICAgICAqL1xyXG4gICAgZ2V0IGF1dG9Mb2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvTG9hZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgc3R5bGUgZGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBnZXQgc3R5bGUoKTogb2wuU3R5bGVGdW5jdGlvbnxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuc3R5bGUuU3R5bGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgc3R5bGVcclxuICAgICAqIEBwYXJhbSBzdHlsZSAtIHRoZSBzdHlsZSBvciBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBzZXQgc3R5bGUoc3R5bGU6IG9sLlN0eWxlRnVuY3Rpb258QXJyYXk8b2wuc3R5bGUuU3R5bGU+fG9sLnN0eWxlLlN0eWxlKSB7XHJcbiAgICAgICAgdGhpcy5fc3R5bGUgPSBzdHlsZTtcclxuICAgICAgICB0aGlzLm9sTGF5ZXIuc2V0U3R5bGUodGhpcy5fc3R5bGUgYXMgb2wuc3R5bGUuU3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBtYXAgQ1JTIGlmIGl0IGlzIGRlZmluZWQgYnkgdGhlIG1hcCBtb3ZlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBnZXQgbWFwQ3JzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwUHJvaiA9PSBudWxsID8gbnVsbCA6IHRoaXMubWFwUHJvai5nZXRDb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1hcFByb2ooKTogb2wucHJvai5Qcm9qZWN0aW9ue1xyXG4gICAgICAgIGlmICh0aGlzLl9wcm9qZWN0aW9uTWFwICE9IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbk1hcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBNb3ZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2plY3Rpb25NYXAgPSB0aGlzLl9tYXBNb3ZlLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbk1hcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBtYXAgbW92ZSBvYmplY3RcclxuICAgICAqIEB0eXBlIHtNYXBNb3ZlQ2xzfCp9XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXBNb3ZlKCk6IE1hcE1vdmVDbHMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBNb3ZlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFwIG1vdmUgcGFyYW1zXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXQgbWFwTW92ZVBhcmFtcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwTW92ZVBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBsYXllciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmlsaXR5KSB7XHJcbiAgICAgICAgc3VwZXIuc2V0VmlzaWJsZSh2aXNpYmlsaXR5KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29uRGVtYW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwTW92ZS50cmlnZ2VyTHlyTG9hZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGxheWVyIHZlY3RvciBzb3VyY2VcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgICovXHJcbiAgICBnZXQgc291cmNlKCk6IG9sLnNvdXJjZS5WZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNvdXJjZSgpIGFzIG9sLnNvdXJjZS5WZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhcnJheSBvZiBvbCBmZWF0dXJlc1xyXG4gICAgICovXHJcbiAgICBnZXQgZmVhdHVyZXMoKTogQXJyYXk8b2wuRmVhdHVyZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5nZXRGZWF0dXJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZ2V0IG9sTGF5ZXIoKTogb2wubGF5ZXIuVmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0T2xMYXllcigpIGFzIG9sLmxheWVyLlZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0WkluZGV4KG5ld1o6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMub2xMYXllci5zZXRaSW5kZXgobmV3Wik7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLkxheWVyQmFzZVZlY3RvciA9IExheWVyQmFzZVZlY3RvcjtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJCYXNlVmVjdG9yO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=