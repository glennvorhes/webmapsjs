'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 12/4/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _mapPopup = require('../olHelpers/mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('mixin');

/**
 * The GMT offset time in minutes
 * @type {number}
 */
var offsetMinutes = new Date().getTimezoneOffset();

/**
 * Mixin to get the product times
 * Be sure to call getTimeInit after the mixin has been applied
 */

var RealEarthAnimate = function () {
    function RealEarthAnimate() {
        _classCallCheck(this, RealEarthAnimate);
    }

    _createClass(RealEarthAnimate, [{
        key: 'load',


        /**
         * override base layer load
         */
        value: function load() {}
    }, {
        key: 'timeInit',


        /**
         * Call this after the mixin has been applied
         */
        value: function timeInit() {
            if (!this._products) {
                throw 'this mixin must be applied to one of the RealEarth layer objects with this.products defined';
            }

            this._rawDateStrings = [];
            this._localDates = [];
            this.localTimes = [];
            this._animateEnabled = true;
            this._loaded = true;
            this._currentTime = undefined;
            this._currentIndex = undefined;

            var _this = this;

            _jquery2.default.get('http://realearth.ssec.wisc.edu/api/products', { products: this._products }, function (d) {
                if (d.length == 0) {
                    console.log(this._products + ' layer not available or does not have times');

                    return;
                }
                d = d[0];
                for (var i = 0; i < d['times'].length; i++) {
                    _this._loadDates.call(_this, d['times'][i]);
                }
                _this.loadCallback.call(_this);
                _this._loadLatest.call(_this);
            }, 'json');
        }

        /**
         *
         * @returns {boolean} if animation enabled
         */

    }, {
        key: '_loadDates',


        /**
         * Given the raw time string, add to the arrays to keep track of dates and cache
         * @param {string} inString - input string to parse
         * @returns {string} the converted string
         * @protected
         */
        value: function _loadDates(inString) {
            var yr = inString.slice(0, 4);
            var month = inString.slice(4, 6);
            var d = inString.slice(6, 8);
            var hr = inString.slice(9, 11);
            var mn = inString.slice(11, 13);
            var sec = inString.slice(13, 15);

            var rawDateStr = inString.replace('.', '_');
            this._rawDateStrings.push(rawDateStr);

            var dteStr = month + '/' + d + '/' + yr + ' ' + hr + ':' + mn + ':' + sec;
            var newDte = new Date(dteStr);
            newDte.setMinutes(newDte.getMinutes() - offsetMinutes);
            this._localDates.push(newDte);
            this.localTimes.push(newDte.getTime());

            return rawDateStr;
        }

        /**
         *
         * @protected
         * @returns {boolean} if should continue
         */

    }, {
        key: '_loadLatest',
        value: function _loadLatest() {
            _mapPopup2.default.closePopup();
            if (this.localTimes.length > 0) {
                this._currentIndex = this.localTimes.length - 1;

                return true;
            } else {
                return false;
            }
        }

        /**
         *
         * @param {number} theTime - the time
         * @returns {boolean} true if new index, false if the same or below lowest value
         */

    }, {
        key: 'setLayerTime',
        value: function setLayerTime(theTime) {
            if (!this.visible) {
                return false;
            }

            this._currentTime = theTime;

            var newIndex = void 0;

            if (theTime < this.localTimes[0]) {
                return false;
            } else if (theTime > this.localTimes[this.localTimes.length - 1]) {
                newIndex = this.localTimes.length - 1;
            }

            for (var i = 0; i < this.localTimes.length; i++) {
                if (this.localTimes[i] >= theTime) {
                    newIndex = i;
                    break;
                }
            }

            if (newIndex == this._currentIndex) {
                return false;
            } else {
                this._currentIndex = newIndex;
                _mapPopup2.default.closePopup();

                return true;
            }
        }
    }, {
        key: 'animationEnabled',
        get: function get() {
            return this._animateEnabled;
        }
    }]);

    return RealEarthAnimate;
}();

nm.RealEarthAnimate = RealEarthAnimate;
exports.default = RealEarthAnimate;
module.exports = exports['default'];