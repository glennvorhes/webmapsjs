/**
 * Created by gavorhes on 11/3/2015.
 */


import $ from '../jquery';
import MapInteractionBase from './mapInteractionBase';
import * as checkDefined from '../util/checkDefined';
import provide from '../util/provide';
import makeGuid from '../util/makeGuid';
let nm = provide('olHelpers');

/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */
class MapMoveCls extends MapInteractionBase {

    /**
     * constructor called implicitly
     */
    constructor() {
        super('map move');
        this._arrLyrRequest = [];
        this._arrLyrTimeout = [];
        this._arrLayer = [];
        this._lookupLayer = {};

        this._mapMoveCallbacks = [];
        this._mapMoveCallbacksLookup = {};
        this._mapMoveCallbackDelays = [];
        this._mapMoveCallbackContext = [];
        this._mapMoveCallbackTimeout = [];

        this._mapExtent = undefined;
        this._zoomLevel = undefined;
    }

    /**
     * initialize the map move object
     * @param {ol.Map} theMap - the ol map
     */
    init(theMap) {
        if (super.init(theMap)) {
            return;
        }

        let _this = this;

        this.map.getView().on(['change:center', 'change:resolution'], function (e) {

            _this._updateMapExtent();

            // trigger the layer updates
            for (let i = 0; i < _this._arrLayer.length; i++) {
                _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
            }

            // trigger the map callbacks
            for (let i = 0; i < _this._mapMoveCallbacks.length; i++) {
                _this.triggerMoveCallback(i, e.type);
            }
        });
    }

    _updateMapExtent() {
        let theView = this.map.getView();
        this._zoomLevel = theView.getZoom();

        let extentArray = theView.calculateExtent(this.map.getSize());

        this._mapExtent = {
            minX: extentArray[0],
            minY: extentArray[1],
            maxX: extentArray[2],
            maxY: extentArray[3]
        };
    }

    /**
     * return the map extent
     */
    get mapExtent() {
        if (!this._mapExtent) {
            this._updateMapExtent();
        }

        return this._mapExtent;
    }

    /**
     * Trigger the layer load
     * @param {LayerBaseVector|*} lyr - the layer being acted on
     * @param {number} [index=undefined] - index of the layer
     * @param {string|*} [eventType=undefined] the event triggering the load, as 'change:center' or 'change:resolution'
     */
    triggerLyrLoad(lyr, index, eventType) {

        if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
            throw 'need to define lyr or index';
        } else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
            index = this._arrLayer.indexOf(lyr);
        } else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
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
        let callbackFunc = function () {};

        if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
            lyr.mapMoveMakeGetParams(this._mapExtent, this._zoomLevel);

            let _this = this;

            callbackFunc = function () {
                function innerFunction(theLayer, theIndex) {
                    let _innerThis = this;
                    this._arrLyrRequest[theIndex] = $.get(
                        theLayer.url,
                        theLayer.mapMoveParams,
                        function (d) {
                            /**
                             * @type {LayerBaseVector}
                             */
                            theLayer.mapMoveCallback(d);
                            theLayer.loadCallback();
                        }, 'json').fail(
                        function (jqXHR) {
                            if (jqXHR.statusText != 'abort') {
                                console.log('failed');
                                console.log(theLayer.url);
                                console.log(theLayer.mapMoveParams);
                            }
                        }).always(
                        function () {
                            _innerThis._arrLyrTimeout[theIndex] = null;
                            _innerThis._arrLyrRequest[theIndex] = null;
                        });
                }
                innerFunction.call(_this, lyr, index);
            };
        } else {
            lyr.clear();
        }
        this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
    }

    /**
     * trigger the map move call back at the given index
     * @param {number} ind - the index of the layer
     * @param {string|*} [eventType=undefined] the event triggering the load as 'change:center' or 'change:resolution'
     * @param {string} [functionId=undefined] the function id used to reference the added callback function
     */
    triggerMoveCallback(ind, eventType, functionId) {

        if (typeof ind == 'undefined' && typeof functionId == 'undefined'){
            throw 'either the function index or the id must be defined';
        }

        if (typeof ind !== 'number'){
            ind = this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[functionId]);
        }

        if (ind < 0){
            console.log('function not found');

            return;
        }

        // clear the timeout
        if (this._mapMoveCallbackTimeout[ind] != null) {
            clearTimeout(this._mapMoveCallbackTimeout[ind]);
            this._mapMoveCallbackTimeout[ind] = null;
        }

        let ctx = this._mapMoveCallbackContext[ind];
        let theFunc = this._mapMoveCallbacks[ind];

        let _this = this;

        let f = function () {
            if (ctx !== null) {
                theFunc.call(ctx, _this._mapExtent, _this._zoomLevel, eventType);
            } else {
                theFunc(_this._mapExtent, _this._zoomLevel, eventType);
            }
        };

        this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
    }

    /**
     * Add a layer to the interaction
     * @param {LayerBaseVector|*} lyr - layer to add
     * @param {boolean} [triggerOnAdd=true] - if the layer should be loaded on add
     */
    addVectorLayer(lyr, triggerOnAdd) {
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
    }

    /**
     * This callback is displayed as a global member.
     * @callback mapMoveCallbackFunction
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     */

    /**
     * add a callback to the map move event
     * @param {mapMoveCallbackFunction} func - callback function
     * @param {*} context - the context to use for this function
     * @param {number} [delay=50] the delay before call load
     * @param {boolean} [triggerOnAdd=true] if the layer should be loaded on add to mapMove
     * @param {string} [functionId=undefined] optional id to reference the function later for outside triggering
     */
    addCallback(func, context, delay, triggerOnAdd, functionId) {

        if (this._mapMoveCallbacks.indexOf(func) > -1) {
            console.log('this function already added to map move');

            return;
        }
        this._checkInit();
        if (!functionId){
            functionId = makeGuid();
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
    }
}

nm.MapMoveCls = MapMoveCls;
export default MapMoveCls;
