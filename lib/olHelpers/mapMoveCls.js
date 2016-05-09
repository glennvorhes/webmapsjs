'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _mapInteractionBase = require('./mapInteractionBase');

var _mapInteractionBase2 = _interopRequireDefault(_mapInteractionBase);

var _checkDefined = require('../util/checkDefined');

var checkDefined = _interopRequireWildcard(_checkDefined);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/3/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var nm = (0, _provide2.default)('olHelpers');

/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */

var MapMoveCls = function (_MapInteractionBase) {
    _inherits(MapMoveCls, _MapInteractionBase);

    /**
     * constructor called implicitly
     */

    function MapMoveCls() {
        _classCallCheck(this, MapMoveCls);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MapMoveCls).call(this, 'map move'));

        _this2._arrLyrRequest = [];
        _this2._arrLyrTimeout = [];
        _this2._arrLayer = [];
        _this2._lookupLayer = {};

        _this2._mapMoveCallbacks = [];
        _this2._mapMoveCallbacksLookup = {};
        _this2._mapMoveCallbackDelays = [];
        _this2._mapMoveCallbackContext = [];
        _this2._mapMoveCallbackTimeout = [];

        _this2._mapExtent = undefined;
        _this2._zoomLevel = undefined;
        return _this2;
    }

    /**
     * initialize the map move object
     * @param {ol.Map} theMap - the ol map
     */


    _createClass(MapMoveCls, [{
        key: 'init',
        value: function init(theMap) {
            if (_get(Object.getPrototypeOf(MapMoveCls.prototype), 'init', this).call(this, theMap)) {
                return;
            }

            var _this = this;

            this.map.getView().on(['change:center', 'change:resolution'], function (e) {

                _this._updateMapExtent();

                // trigger the layer updates
                for (var i = 0; i < _this._arrLayer.length; i++) {
                    _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
                }

                // trigger the map callbacks
                for (var _i = 0; _i < _this._mapMoveCallbacks.length; _i++) {
                    _this.triggerMoveCallback(_i, e.type);
                }
            });
        }
    }, {
        key: '_updateMapExtent',
        value: function _updateMapExtent() {
            var theView = this.map.getView();
            this._zoomLevel = theView.getZoom();

            var extentArray = theView.calculateExtent(this.map.getSize());

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

    }, {
        key: 'triggerLyrLoad',


        /**
         * Trigger the layer load
         * @param {LayerBaseVector|*} lyr - the layer being acted on
         * @param {number} [index=undefined] - index of the layer
         * @param {string|*} [eventType=undefined] the event triggering the load, as 'change:center' or 'change:resolution'
         */
        value: function triggerLyrLoad(lyr, index, eventType) {
            var _this3 = this;

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
            var callbackFunc = function callbackFunc() {};

            if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
                (function () {
                    lyr.mapMoveMakeGetParams(_this3._mapExtent, _this3._zoomLevel);

                    var _this = _this3;

                    callbackFunc = function callbackFunc() {
                        function innerFunction(theLayer, theIndex) {
                            var _innerThis = this;
                            this._arrLyrRequest[theIndex] = _jquery2.default.get(theLayer.url, theLayer.mapMoveParams, function (d) {
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
                        innerFunction.call(_this, lyr, index);
                    };
                })();
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

    }, {
        key: 'triggerMoveCallback',
        value: function triggerMoveCallback(ind, eventType, functionId) {

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

            var _this = this;

            var f = function f() {
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

    }, {
        key: 'addVectorLayer',
        value: function addVectorLayer(lyr, triggerOnAdd) {
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

    }, {
        key: 'addCallback',
        value: function addCallback(func, context, delay, triggerOnAdd, functionId) {

            if (this._mapMoveCallbacks.indexOf(func) > -1) {
                console.log('this function already added to map move');

                return;
            }
            this._checkInit();
            if (!functionId) {
                functionId = (0, _makeGuid2.default)();
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
    }, {
        key: 'mapExtent',
        get: function get() {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }

            return this._mapExtent;
        }
    }]);

    return MapMoveCls;
}(_mapInteractionBase2.default);

nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;