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
var checkDefined = require("../util/checkDefined");
var provide_1 = require("../util/provide");
var makeGuid_1 = require("../util/makeGuid");
var $ = require("jquery");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTW92ZUNscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvbWFwTW92ZUNscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsbURBQXFEO0FBQ3JELDJDQUFzQztBQUN0Qyw2Q0FBd0M7QUFFeEMsMEJBQTZCO0FBQzdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFxQmhDOzs7R0FHRztBQUNIO0lBQWdDLDhCQUFrQjtJQWE5Qzs7T0FFRztJQUNIO1FBQUEsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FlcEI7UUFkRyxLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFDbEMsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFbEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O0lBRWhDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5QkFBSSxHQUFKLFVBQUssTUFBYztRQUFuQixpQkFpQkM7UUFoQkcsaUJBQU0sSUFBSSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLG1C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TUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBbFFELENBQWdDLDRCQUFrQixHQWtRakQ7QUFsUVksZ0NBQVU7QUFvUXZCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzNCLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMYXllckJhc2VWZWN0b3IgZnJvbSBcIi4uL2xheWVycy9MYXllckJhc2VWZWN0b3JcIjtcclxuaW1wb3J0IE1hcEludGVyYWN0aW9uQmFzZSBmcm9tICcuL21hcEludGVyYWN0aW9uQmFzZSc7XHJcbmltcG9ydCAqIGFzIGNoZWNrRGVmaW5lZCBmcm9tICcuLi91dGlsL2NoZWNrRGVmaW5lZCc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBtYWtlR3VpZCBmcm9tICcuLi91dGlsL21ha2VHdWlkJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzJyk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBleHRlbnRPYmplY3R7XHJcbiAgICBtaW5YOiBudW1iZXI7XHJcbiAgICBtaW5ZOiBudW1iZXI7XHJcbiAgICBtYXhYOiBudW1iZXI7XHJcbiAgICBtYXhZOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgbWFwTW92ZUNhbGxiYWNrRnVuY3Rpb257XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW50IGV4dGVudCBhcyBwcmVkZWZpbmVkIG9iamVjdCBtaW5YLCBtaW5YLCBtYXhYLCBtYXhZXHJcbiAgICAgKiBAcGFyYW0gem9vbUxldmVsIGN1cnJlbnQgem9vbSBsZXZlbFxyXG4gICAgICogQHBhcmFtIGV2dFR5cGUgdGhlIGV2ZW50IHR5cGUgJ2NoYW5nZTpjZW50ZXInLCAnY2hhbmdlOnJlc29sdXRpb24nXHJcbiAgICAgKi9cclxuICAgIChleHRlbnQ6IGV4dGVudE9iamVjdCwgem9vbUxldmVsOiBudW1iZXIsIGV2dFR5cGU/OiBzdHJpbmcpOiBhbnlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBhc3Npc3RzIHdpdGggbWFwIG1vdmUgaW50ZXJhY3Rpb25zLCB0cmlnZ2VyIGNhbGxiYWNrIGZ1bmN0aW9uc1xyXG4gKiBAYXVnbWVudHMgTWFwSW50ZXJhY3Rpb25CYXNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwTW92ZUNscyBleHRlbmRzIE1hcEludGVyYWN0aW9uQmFzZSB7XHJcbiAgICBfbWFwRXh0ZW50OiBleHRlbnRPYmplY3Q7XHJcbiAgICBfem9vbUxldmVsOiBudW1iZXI7XHJcbiAgICBfbG9va3VwTGF5ZXI6IE9iamVjdDtcclxuICAgIF9hcnJMYXllcjogQXJyYXk8TGF5ZXJCYXNlVmVjdG9yPjtcclxuICAgIF9hcnJMeXJUaW1lb3V0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgX21hcE1vdmVDYWxsYmFja1RpbWVvdXQ6IEFycmF5PG51bWJlcj47XHJcbiAgICBfbWFwTW92ZUNhbGxiYWNrRGVsYXlzOiBBcnJheTxudW1iZXI+O1xyXG4gICAgX21hcE1vdmVDYWxsYmFja3NMb29rdXA6IE9iamVjdDtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tDb250ZXh0OiBBcnJheTxPYmplY3Q+O1xyXG4gICAgX21hcE1vdmVDYWxsYmFja3M6IEFycmF5PG1hcE1vdmVDYWxsYmFja0Z1bmN0aW9uPjtcclxuICAgIF9hcnJMeXJSZXF1ZXN0OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3IgY2FsbGVkIGltcGxpY2l0bHlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoJ21hcCBtb3ZlJyk7XHJcbiAgICAgICAgdGhpcy5fYXJyTHlyUmVxdWVzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2Fyckx5clRpbWVvdXQgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJMYXllciA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2xvb2t1cExheWVyID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrRGVsYXlzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrQ29udGV4dCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXQgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwRXh0ZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3pvb21MZXZlbCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplIHRoZSBtYXAgbW92ZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSB0aGVNYXAgLSB0aGUgb2wgbWFwXHJcbiAgICAgKi9cclxuICAgIGluaXQodGhlTWFwOiBvbC5NYXApe1xyXG4gICAgICAgIHN1cGVyLmluaXQodGhlTWFwKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuZ2V0VmlldygpLm9uKFsnY2hhbmdlOmNlbnRlcicsICdjaGFuZ2U6cmVzb2x1dGlvbiddLCAoZSkgPT57XHJcblxyXG4gICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hcEV4dGVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgbGF5ZXIgdXBkYXRlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FyckxheWVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJMeXJMb2FkKHRoaXMuX2FyckxheWVyW2ldLCBpLCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHRoZSBtYXAgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWFwTW92ZUNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyTW92ZUNhbGxiYWNrKGksIGUudHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTWFwRXh0ZW50KCkge1xyXG4gICAgICAgIGxldCB0aGVWaWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xyXG4gICAgICAgIHRoaXMuX3pvb21MZXZlbCA9IHRoZVZpZXcuZ2V0Wm9vbSgpO1xyXG5cclxuICAgICAgICBsZXQgZXh0ZW50QXJyYXkgPSB0aGVWaWV3LmNhbGN1bGF0ZUV4dGVudCh0aGlzLm1hcC5nZXRTaXplKCkpO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXBFeHRlbnQgPSB7XHJcbiAgICAgICAgICAgIG1pblg6IGV4dGVudEFycmF5WzBdLFxyXG4gICAgICAgICAgICBtaW5ZOiBleHRlbnRBcnJheVsxXSxcclxuICAgICAgICAgICAgbWF4WDogZXh0ZW50QXJyYXlbMl0sXHJcbiAgICAgICAgICAgIG1heFk6IGV4dGVudEFycmF5WzNdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgbWFwIGV4dGVudFxyXG4gICAgICovXHJcbiAgICBnZXQgbWFwRXh0ZW50KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWFwRXh0ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hcEV4dGVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcEV4dGVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWdnZXIgdGhlIGxheWVyIGxvYWRcclxuICAgICAqIEBwYXJhbSBseXIgdGhlIGxheWVyIGJlaW5nIGFjdGVkIG9uXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggaW5kZXggb2YgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHRoZSBldmVudCB0cmlnZ2VyaW5nIHRoZSBsb2FkLCBhcyAnY2hhbmdlOmNlbnRlcicgb3IgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICovXHJcbiAgICB0cmlnZ2VyTHlyTG9hZChseXI6IExheWVyQmFzZVZlY3RvciwgaW5kZXg/OiBudW1iZXIsIGV2ZW50VHlwZT86IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tEZWZpbmVkLnVuZGVmaW5lZE9yTnVsbChseXIpICYmIGNoZWNrRGVmaW5lZC51bmRlZmluZWRPck51bGwoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRocm93ICduZWVkIHRvIGRlZmluZSBseXIgb3IgaW5kZXgnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tEZWZpbmVkLmRlZmluZWRBbmROb3ROdWxsKGx5cikgJiYgY2hlY2tEZWZpbmVkLnVuZGVmaW5lZE9yTnVsbChpbmRleCkpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9hcnJMYXllci5pbmRleE9mKGx5cik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGVja0RlZmluZWQudW5kZWZpbmVkT3JOdWxsKGx5cikgJiYgY2hlY2tEZWZpbmVkLmRlZmluZWRBbmROb3ROdWxsKGluZGV4KSkge1xyXG4gICAgICAgICAgICBseXIgPSB0aGlzLl9hcnJMYXllcltpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjbGVhciB0aGUgdGltZW91dFxyXG4gICAgICAgIGlmICh0aGlzLl9hcnJMeXJUaW1lb3V0W2luZGV4XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hcnJMeXJUaW1lb3V0W2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fyckx5clRpbWVvdXRbaW5kZXhdID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFib3J0IGlmIG5lY2Vzc2FyeSBhbmQgY2xlYXIgdGhlIHJlcXVlc3RcclxuICAgICAgICBpZiAodGhpcy5fYXJyTHlyUmVxdWVzdFtpbmRleF0gIT0gbnVsbCAmJiB0aGlzLl9hcnJMeXJSZXF1ZXN0W2luZGV4XSAhPSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fyckx5clJlcXVlc3RbaW5kZXhdLmFib3J0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fyckx5clJlcXVlc3RbaW5kZXhdID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGR1bW15IGNhbGxiYWNrIHVzZWQgaWYgYmVmb3JlIGxvYWQgcmV0dXJucyBmYWxzZVxyXG4gICAgICAgIGxldCBjYWxsYmFja0Z1bmMgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGx5ci5tYXBNb3ZlQmVmb3JlKHRoaXMuX3pvb21MZXZlbCwgZXZlbnRUeXBlKSkge1xyXG4gICAgICAgICAgICBseXIubWFwTW92ZU1ha2VHZXRQYXJhbXModGhpcy5fbWFwRXh0ZW50LCB0aGlzLl96b29tTGV2ZWwpO1xyXG5cclxuICAgICAgICAgICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFja0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbm5lckZ1bmN0aW9uKHRoZUxheWVyLCB0aGVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfaW5uZXJUaGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0W3RoZUluZGV4XSA9ICQuZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZUxheWVyLm1hcE1vdmVQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtMYXllckJhc2VWZWN0b3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZUxheWVyLm1hcE1vdmVDYWxsYmFjayhkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZUxheWVyLmxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnanNvbicpLmZhaWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpxWEhSLnN0YXR1c1RleHQgIT0gJ2Fib3J0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGVMYXllci51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZUxheWVyLm1hcE1vdmVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbm5lclRoaXMuX2Fyckx5clRpbWVvdXRbdGhlSW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbm5lclRoaXMuX2Fyckx5clJlcXVlc3RbdGhlSW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbm5lckZ1bmN0aW9uLmNhbGwoX190aGlzLCBseXIsIGluZGV4KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBseXIuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYXJyTHlyVGltZW91dFtpbmRleF0gPSBzZXRUaW1lb3V0KGNhbGxiYWNrRnVuYywgbHlyLm9uRGVtYW5kRGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdHJpZ2dlciB0aGUgbWFwIG1vdmUgY2FsbCBiYWNrIGF0IHRoZSBnaXZlbiBpbmRleFxyXG4gICAgICogQHBhcmFtIGluZCAtIHRoZSBpbmRleCBvZiB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSBldmVudFR5cGU9dW5kZWZpbmVkIHRoZSBldmVudCB0cmlnZ2VyaW5nIHRoZSBsb2FkIGFzICdjaGFuZ2U6Y2VudGVyJyBvciAnY2hhbmdlOnJlc29sdXRpb24nXHJcbiAgICAgKiBAcGFyYW0gZnVuY3Rpb25JZD11bmRlZmluZWQgdGhlIGZ1bmN0aW9uIGlkIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBhZGRlZCBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICB0cmlnZ2VyTW92ZUNhbGxiYWNrKGluZDogbnVtYmVyLCBldmVudFR5cGU/OiBzdHJpbmcsIGZ1bmN0aW9uSWQ/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbmQgPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGZ1bmN0aW9uSWQgPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICB0aHJvdyAnZWl0aGVyIHRoZSBmdW5jdGlvbiBpbmRleCBvciB0aGUgaWQgbXVzdCBiZSBkZWZpbmVkJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kICE9PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgICAgIGluZCA9IHRoaXMuX21hcE1vdmVDYWxsYmFja3MuaW5kZXhPZih0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwW2Z1bmN0aW9uSWRdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmQgPCAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Z1bmN0aW9uIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2xlYXIgdGhlIHRpbWVvdXRcclxuICAgICAgICBpZiAodGhpcy5fbWFwTW92ZUNhbGxiYWNrVGltZW91dFtpbmRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5fbWFwTW92ZUNhbGxiYWNrQ29udGV4dFtpbmRdO1xyXG4gICAgICAgIGxldCB0aGVGdW5jID0gdGhpcy5fbWFwTW92ZUNhbGxiYWNrc1tpbmRdO1xyXG5cclxuICAgICAgICBsZXQgX190aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoZUZ1bmMuY2FsbChjdHgsIF9fdGhpcy5fbWFwRXh0ZW50LCBfX3RoaXMuX3pvb21MZXZlbCwgZXZlbnRUeXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoZUZ1bmMoX190aGlzLl9tYXBFeHRlbnQsIF9fdGhpcy5fem9vbUxldmVsLCBldmVudFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrVGltZW91dFtpbmRdID0gc2V0VGltZW91dChmLCB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tEZWxheXNbaW5kXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBsYXllciB0byB0aGUgaW50ZXJhY3Rpb25cclxuICAgICAqIEBwYXJhbSAgbHlyIC0gbGF5ZXIgdG8gYWRkXHJcbiAgICAgKiBAcGFyYW0gdHJpZ2dlck9uQWRkIC0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgb24gYWRkXHJcbiAgICAgKi9cclxuICAgIGFkZFZlY3RvckxheWVyKGx5cjogTGF5ZXJCYXNlVmVjdG9yLCB0cmlnZ2VyT25BZGQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FyckxheWVyLmluZGV4T2YobHlyKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbHJlYWR5IGFkZGVkICcgKyBseXIubmFtZSArICcgdG8gbWFwIG1vdmUnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Fyckx5clJlcXVlc3QucHVzaChudWxsKTtcclxuICAgICAgICB0aGlzLl9hcnJMeXJUaW1lb3V0LnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fYXJyTGF5ZXIucHVzaChseXIpO1xyXG4gICAgICAgIHRoaXMuX2xvb2t1cExheWVyW2x5ci5pZF0gPSBseXI7XHJcblxyXG4gICAgICAgIHRyaWdnZXJPbkFkZCA9IHR5cGVvZiB0cmlnZ2VyT25BZGQgPT0gJ2Jvb2xlYW4nID8gdHJpZ2dlck9uQWRkIDogdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRyaWdnZXJPbkFkZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwRXh0ZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hcEV4dGVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckx5ckxvYWQobHlyLCB0aGlzLl9hcnJMYXllci5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGEgY2FsbGJhY2sgdG8gdGhlIG1hcCBtb3ZlIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gZnVuYyAtIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIHRoZSBjb250ZXh0IHRvIHVzZSBmb3IgdGhpcyBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIGRlbGF5PTUwIHRoZSBkZWxheSBiZWZvcmUgY2FsbCBsb2FkXHJcbiAgICAgKiBAcGFyYW0gdHJpZ2dlck9uQWRkIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIG9uIGFkZCB0byBtYXBNb3ZlXHJcbiAgICAgKiBAcGFyYW0gZnVuY3Rpb25JZCBvcHRpb25hbCBpZCB0byByZWZlcmVuY2UgdGhlIGZ1bmN0aW9uIGxhdGVyIGZvciBvdXRzaWRlIHRyaWdnZXJpbmdcclxuICAgICAqL1xyXG4gICAgYWRkQ2FsbGJhY2soZnVuYzogbWFwTW92ZUNhbGxiYWNrRnVuY3Rpb24sIGNvbnRleHQ/OiBhbnksIGRlbGF5PzogbnVtYmVyLCB0cmlnZ2VyT25BZGQ/IDogYm9vbGVhbiwgZnVuY3Rpb25JZD86IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWFwTW92ZUNhbGxiYWNrcy5pbmRleE9mKGZ1bmMpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgZnVuY3Rpb24gYWxyZWFkeSBhZGRlZCB0byBtYXAgbW92ZScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG4gICAgICAgIGlmICghZnVuY3Rpb25JZCl7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uSWQgPSBtYWtlR3VpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrcy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja3NMb29rdXBbZnVuY3Rpb25JZF0gPSBmdW5jdGlvbklkO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0RlbGF5cy5wdXNoKHR5cGVvZiBkZWxheSA9PSAnbnVtYmVyJyA/IGRlbGF5IDogNTApO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0NvbnRleHQucHVzaChjaGVja0RlZmluZWQuZGVmaW5lZEFuZE5vdE51bGwoY29udGV4dCkgPyBjb250ZXh0IDogbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrVGltZW91dC5wdXNoKG51bGwpO1xyXG5cclxuICAgICAgICB0cmlnZ2VyT25BZGQgPSB0eXBlb2YgdHJpZ2dlck9uQWRkID09ICdib29sZWFuJyA/IHRyaWdnZXJPbkFkZCA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0cmlnZ2VyT25BZGQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEV4dGVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJNb3ZlQ2FsbGJhY2sodGhpcy5fbWFwTW92ZUNhbGxiYWNrcy5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLk1hcE1vdmVDbHMgPSBNYXBNb3ZlQ2xzO1xyXG5leHBvcnQgZGVmYXVsdCBNYXBNb3ZlQ2xzO1xyXG4iXX0=