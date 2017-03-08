"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapMoveCls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTW92ZUNscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvbWFwTW92ZUNscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsbURBQXFEO0FBQ3JELDJDQUFzQztBQUN0Qyw2Q0FBd0M7QUFFeEMsMEJBQTZCO0FBQzdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFxQmhDOzs7R0FHRztBQUNIO0lBQWdDLDhCQUFrQjtJQWE5Qzs7T0FFRztJQUNIO1FBQUEsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FlcEI7UUFkRyxLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFDbEMsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFbEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O0lBRWhDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5QkFBSSxHQUFKLFVBQUssTUFBYztRQUFuQixpQkFpQkM7UUFoQkcsaUJBQU0sSUFBSSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLG1CQUFtQixD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QUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBbFFELENBQWdDLDRCQUFrQixHQWtRakQ7QUFsUVksZ0NBQVU7QUFvUXZCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUMzQixrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXJCYXNlVmVjdG9yIGZyb20gXCIuLi9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yXCI7XHJcbmltcG9ydCBNYXBJbnRlcmFjdGlvbkJhc2UgZnJvbSAnLi9tYXBJbnRlcmFjdGlvbkJhc2UnO1xyXG5pbXBvcnQgKiBhcyBjaGVja0RlZmluZWQgZnJvbSAnLi4vdXRpbC9jaGVja0RlZmluZWQnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgbWFrZUd1aWQgZnJvbSAnLi4vdXRpbC9tYWtlR3VpZCc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycycpO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZXh0ZW50T2JqZWN0e1xyXG4gICAgbWluWDogbnVtYmVyO1xyXG4gICAgbWluWTogbnVtYmVyO1xyXG4gICAgbWF4WDogbnVtYmVyO1xyXG4gICAgbWF4WTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG1hcE1vdmVDYWxsYmFja0Z1bmN0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV4dGVudCBleHRlbnQgYXMgcHJlZGVmaW5lZCBvYmplY3QgbWluWCwgbWluWCwgbWF4WCwgbWF4WVxyXG4gICAgICogQHBhcmFtIHpvb21MZXZlbCBjdXJyZW50IHpvb20gbGV2ZWxcclxuICAgICAqIEBwYXJhbSBldnRUeXBlIHRoZSBldmVudCB0eXBlICdjaGFuZ2U6Y2VudGVyJywgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICovXHJcbiAgICAoZXh0ZW50OiBleHRlbnRPYmplY3QsIHpvb21MZXZlbDogbnVtYmVyLCBldnRUeXBlPzogc3RyaW5nKTogYW55XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogYXNzaXN0cyB3aXRoIG1hcCBtb3ZlIGludGVyYWN0aW9ucywgdHJpZ2dlciBjYWxsYmFjayBmdW5jdGlvbnNcclxuICogQGF1Z21lbnRzIE1hcEludGVyYWN0aW9uQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcE1vdmVDbHMgZXh0ZW5kcyBNYXBJbnRlcmFjdGlvbkJhc2Uge1xyXG4gICAgX21hcEV4dGVudDogZXh0ZW50T2JqZWN0O1xyXG4gICAgX3pvb21MZXZlbDogbnVtYmVyO1xyXG4gICAgX2xvb2t1cExheWVyOiBPYmplY3Q7XHJcbiAgICBfYXJyTGF5ZXI6IEFycmF5PExheWVyQmFzZVZlY3Rvcj47XHJcbiAgICBfYXJyTHlyVGltZW91dDogQXJyYXk8bnVtYmVyPjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgX21hcE1vdmVDYWxsYmFja0RlbGF5czogQXJyYXk8bnVtYmVyPjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwOiBPYmplY3Q7XHJcbiAgICBfbWFwTW92ZUNhbGxiYWNrQ29udGV4dDogQXJyYXk8T2JqZWN0PjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tzOiBBcnJheTxtYXBNb3ZlQ2FsbGJhY2tGdW5jdGlvbj47XHJcbiAgICBfYXJyTHlyUmVxdWVzdDogQXJyYXk8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnN0cnVjdG9yIGNhbGxlZCBpbXBsaWNpdGx5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCdtYXAgbW92ZScpO1xyXG4gICAgICAgIHRoaXMuX2Fyckx5clJlcXVlc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJMeXJUaW1lb3V0ID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyTGF5ZXIgPSBbXTtcclxuICAgICAgICB0aGlzLl9sb29rdXBMYXllciA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrc0xvb2t1cCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0RlbGF5cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0NvbnRleHQgPSBbXTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX21hcEV4dGVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl96b29tTGV2ZWwgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgbWFwIG1vdmUgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gdGhlTWFwIC0gdGhlIG9sIG1hcFxyXG4gICAgICovXHJcbiAgICBpbml0KHRoZU1hcDogb2wuTWFwKXtcclxuICAgICAgICBzdXBlci5pbml0KHRoZU1hcCk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwLmdldFZpZXcoKS5vbihbJ2NoYW5nZTpjZW50ZXInLCAnY2hhbmdlOnJlc29sdXRpb24nXSwgKGUpID0+e1xyXG5cclxuICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGxheWVyIHVwZGF0ZXNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcnJMYXllci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyTHlyTG9hZCh0aGlzLl9hcnJMYXllcltpXSwgaSwgZS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgbWFwIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hcE1vdmVDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck1vdmVDYWxsYmFjayhpLCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU1hcEV4dGVudCgpIHtcclxuICAgICAgICBsZXQgdGhlVmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcclxuICAgICAgICB0aGlzLl96b29tTGV2ZWwgPSB0aGVWaWV3LmdldFpvb20oKTtcclxuXHJcbiAgICAgICAgbGV0IGV4dGVudEFycmF5ID0gdGhlVmlldy5jYWxjdWxhdGVFeHRlbnQodGhpcy5tYXAuZ2V0U2l6ZSgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwRXh0ZW50ID0ge1xyXG4gICAgICAgICAgICBtaW5YOiBleHRlbnRBcnJheVswXSxcclxuICAgICAgICAgICAgbWluWTogZXh0ZW50QXJyYXlbMV0sXHJcbiAgICAgICAgICAgIG1heFg6IGV4dGVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICBtYXhZOiBleHRlbnRBcnJheVszXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGhlIG1hcCBleHRlbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IG1hcEV4dGVudCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcEV4dGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBFeHRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIHRoZSBsYXllciBsb2FkXHJcbiAgICAgKiBAcGFyYW0gbHlyIHRoZSBsYXllciBiZWluZyBhY3RlZCBvblxyXG4gICAgICogQHBhcmFtIGluZGV4IGluZGV4IG9mIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSB0aGUgZXZlbnQgdHJpZ2dlcmluZyB0aGUgbG9hZCwgYXMgJ2NoYW5nZTpjZW50ZXInIG9yICdjaGFuZ2U6cmVzb2x1dGlvbidcclxuICAgICAqL1xyXG4gICAgdHJpZ2dlckx5ckxvYWQobHlyOiBMYXllckJhc2VWZWN0b3IsIGluZGV4PzogbnVtYmVyLCBldmVudFR5cGU/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrRGVmaW5lZC51bmRlZmluZWRPck51bGwobHlyKSAmJiBjaGVja0RlZmluZWQudW5kZWZpbmVkT3JOdWxsKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aHJvdyAnbmVlZCB0byBkZWZpbmUgbHlyIG9yIGluZGV4JztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrRGVmaW5lZC5kZWZpbmVkQW5kTm90TnVsbChseXIpICYmIGNoZWNrRGVmaW5lZC51bmRlZmluZWRPck51bGwoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5fYXJyTGF5ZXIuaW5kZXhPZihseXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tEZWZpbmVkLnVuZGVmaW5lZE9yTnVsbChseXIpICYmIGNoZWNrRGVmaW5lZC5kZWZpbmVkQW5kTm90TnVsbChpbmRleCkpIHtcclxuICAgICAgICAgICAgbHlyID0gdGhpcy5fYXJyTGF5ZXJbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2xlYXIgdGhlIHRpbWVvdXRcclxuICAgICAgICBpZiAodGhpcy5fYXJyTHlyVGltZW91dFtpbmRleF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fYXJyTHlyVGltZW91dFtpbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJUaW1lb3V0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhYm9ydCBpZiBuZWNlc3NhcnkgYW5kIGNsZWFyIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fyckx5clJlcXVlc3RbaW5kZXhdICE9IG51bGwgJiYgdGhpcy5fYXJyTHlyUmVxdWVzdFtpbmRleF0gIT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0W2luZGV4XS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkdW1teSBjYWxsYmFjayB1c2VkIGlmIGJlZm9yZSBsb2FkIHJldHVybnMgZmFsc2VcclxuICAgICAgICBsZXQgY2FsbGJhY2tGdW5jID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgICAgIGlmIChseXIubWFwTW92ZUJlZm9yZSh0aGlzLl96b29tTGV2ZWwsIGV2ZW50VHlwZSkpIHtcclxuICAgICAgICAgICAgbHlyLm1hcE1vdmVNYWtlR2V0UGFyYW1zKHRoaXMuX21hcEV4dGVudCwgdGhpcy5fem9vbUxldmVsKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2tGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5uZXJGdW5jdGlvbih0aGVMYXllciwgdGhlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX2lubmVyVGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJyTHlyUmVxdWVzdFt0aGVJbmRleF0gPSAkLmdldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlTGF5ZXIudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5tYXBNb3ZlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7TGF5ZXJCYXNlVmVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5tYXBNb3ZlQ2FsbGJhY2soZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5sb2FkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJ2pzb24nKS5mYWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoanFYSFIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqcVhIUi5zdGF0dXNUZXh0ICE9ICdhYm9ydCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhlTGF5ZXIudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGVMYXllci5tYXBNb3ZlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5uZXJUaGlzLl9hcnJMeXJUaW1lb3V0W3RoZUluZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5uZXJUaGlzLl9hcnJMeXJSZXF1ZXN0W3RoZUluZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5uZXJGdW5jdGlvbi5jYWxsKF9fdGhpcywgbHlyLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbHlyLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Fyckx5clRpbWVvdXRbaW5kZXhdID0gc2V0VGltZW91dChjYWxsYmFja0Z1bmMsIGx5ci5vbkRlbWFuZERlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWdnZXIgdGhlIG1hcCBtb3ZlIGNhbGwgYmFjayBhdCB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqIEBwYXJhbSBpbmQgLSB0aGUgaW5kZXggb2YgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlPXVuZGVmaW5lZCB0aGUgZXZlbnQgdHJpZ2dlcmluZyB0aGUgbG9hZCBhcyAnY2hhbmdlOmNlbnRlcicgb3IgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICogQHBhcmFtIGZ1bmN0aW9uSWQ9dW5kZWZpbmVkIHRoZSBmdW5jdGlvbiBpZCB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgYWRkZWQgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgdHJpZ2dlck1vdmVDYWxsYmFjayhpbmQ6IG51bWJlciwgZXZlbnRUeXBlPzogc3RyaW5nLCBmdW5jdGlvbklkPzogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kID09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBmdW5jdGlvbklkID09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgdGhyb3cgJ2VpdGhlciB0aGUgZnVuY3Rpb24gaW5kZXggb3IgdGhlIGlkIG11c3QgYmUgZGVmaW5lZCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGluZCAhPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICBpbmQgPSB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzLmluZGV4T2YodGhpcy5fbWFwTW92ZUNhbGxiYWNrc0xvb2t1cFtmdW5jdGlvbklkXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kIDwgMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBub3QgZm91bmQnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lb3V0XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0W2luZF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0W2luZF0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuX21hcE1vdmVDYWxsYmFja0NvbnRleHRbaW5kXTtcclxuICAgICAgICBsZXQgdGhlRnVuYyA9IHRoaXMuX21hcE1vdmVDYWxsYmFja3NbaW5kXTtcclxuXHJcbiAgICAgICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVGdW5jLmNhbGwoY3R4LCBfX3RoaXMuX21hcEV4dGVudCwgX190aGlzLl96b29tTGV2ZWwsIGV2ZW50VHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGVGdW5jKF9fdGhpcy5fbWFwRXh0ZW50LCBfX3RoaXMuX3pvb21MZXZlbCwgZXZlbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSA9IHNldFRpbWVvdXQoZiwgdGhpcy5fbWFwTW92ZUNhbGxiYWNrRGVsYXlzW2luZF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIGludGVyYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIGx5ciAtIGxheWVyIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIHRyaWdnZXJPbkFkZCAtIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIG9uIGFkZFxyXG4gICAgICovXHJcbiAgICBhZGRWZWN0b3JMYXllcihseXI6IExheWVyQmFzZVZlY3RvciwgdHJpZ2dlck9uQWRkOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcnJMYXllci5pbmRleE9mKGx5cikgPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBhZGRlZCAnICsgbHlyLm5hbWUgKyAnIHRvIG1hcCBtb3ZlJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0LnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fYXJyTHlyVGltZW91dC5wdXNoKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX2FyckxheWVyLnB1c2gobHlyKTtcclxuICAgICAgICB0aGlzLl9sb29rdXBMYXllcltseXIuaWRdID0gbHlyO1xyXG5cclxuICAgICAgICB0cmlnZ2VyT25BZGQgPSB0eXBlb2YgdHJpZ2dlck9uQWRkID09ICdib29sZWFuJyA/IHRyaWdnZXJPbkFkZCA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0cmlnZ2VyT25BZGQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEV4dGVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJMeXJMb2FkKGx5ciwgdGhpcy5fYXJyTGF5ZXIubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhIGNhbGxiYWNrIHRvIHRoZSBtYXAgbW92ZSBldmVudFxyXG4gICAgICogQHBhcmFtIGZ1bmMgLSBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgY29udGV4dCB0byB1c2UgZm9yIHRoaXMgZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSBkZWxheT01MCB0aGUgZGVsYXkgYmVmb3JlIGNhbGwgbG9hZFxyXG4gICAgICogQHBhcmFtIHRyaWdnZXJPbkFkZCBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBvbiBhZGQgdG8gbWFwTW92ZVxyXG4gICAgICogQHBhcmFtIGZ1bmN0aW9uSWQgb3B0aW9uYWwgaWQgdG8gcmVmZXJlbmNlIHRoZSBmdW5jdGlvbiBsYXRlciBmb3Igb3V0c2lkZSB0cmlnZ2VyaW5nXHJcbiAgICAgKi9cclxuICAgIGFkZENhbGxiYWNrKGZ1bmM6IG1hcE1vdmVDYWxsYmFja0Z1bmN0aW9uLCBjb250ZXh0PzogYW55LCBkZWxheT86IG51bWJlciwgdHJpZ2dlck9uQWRkPyA6IGJvb2xlYW4sIGZ1bmN0aW9uSWQ/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcE1vdmVDYWxsYmFja3MuaW5kZXhPZihmdW5jKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGZ1bmN0aW9uIGFscmVhZHkgYWRkZWQgdG8gbWFwIG1vdmUnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuICAgICAgICBpZiAoIWZ1bmN0aW9uSWQpe1xyXG4gICAgICAgICAgICBmdW5jdGlvbklkID0gbWFrZUd1aWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja3MucHVzaChmdW5jKTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwW2Z1bmN0aW9uSWRdID0gZnVuY3Rpb25JZDtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tEZWxheXMucHVzaCh0eXBlb2YgZGVsYXkgPT0gJ251bWJlcicgPyBkZWxheSA6IDUwKTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tDb250ZXh0LnB1c2goY2hlY2tEZWZpbmVkLmRlZmluZWRBbmROb3ROdWxsKGNvbnRleHQpID8gY29udGV4dCA6IG51bGwpO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgdHJpZ2dlck9uQWRkID0gdHlwZW9mIHRyaWdnZXJPbkFkZCA9PSAnYm9vbGVhbicgPyB0cmlnZ2VyT25BZGQgOiB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlck9uQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBFeHRlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWFwRXh0ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTW92ZUNhbGxiYWNrKHRoaXMuX21hcE1vdmVDYWxsYmFja3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ubS5NYXBNb3ZlQ2xzID0gTWFwTW92ZUNscztcclxuZXhwb3J0IGRlZmF1bHQgTWFwTW92ZUNscztcclxuIl19