"use strict";
/**
 * Created by gavorhes on 12/4/2015.
 */
var provide_1 = require('../util/provide');
var mapPopup_1 = require('../olHelpers/mapPopup');
var $ = require('jquery');
var nm = provide_1.default('mixin');
/**
 * The GMT offset time in minutes
 * @type {number}
 */
var offsetMinutes = (new Date()).getTimezoneOffset();
/**
 * Mixin to get the product times
 * Be sure to call getTimeInit after the mixin has been applied
 */
var RealEarthAnimate = (function () {
    function RealEarthAnimate() {
    }
    /**
     * override base layer load
     */
    RealEarthAnimate.prototype.load = function () { };
    ;
    /**
     * Call this after the mixin has been applied
     */
    RealEarthAnimate.prototype.timeInit = function () {
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
        var __this = this;
        $.get('http://realearth.ssec.wisc.edu/api/products', { products: this._products }, function (d) {
            if (d.length == 0) {
                console.log(__this._products + " layer not available or does not have times");
                return;
            }
            d = d[0];
            for (var i = 0; i < d['times'].length; i++) {
                __this._loadDates.call(__this, d['times'][i]);
            }
            __this.loadCallback.call(__this);
            __this._loadLatest.call(__this);
        }, 'json');
    };
    Object.defineProperty(RealEarthAnimate.prototype, "animationEnabled", {
        /**
         *
         * @returns {boolean} if animation enabled
         */
        get: function () {
            return this._animateEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input string to parse
     * @returns {string} the converted string
     * @protected
     */
    RealEarthAnimate.prototype._loadDates = function (inString) {
        var yr = inString.slice(0, 4);
        var month = inString.slice(4, 6);
        var d = inString.slice(6, 8);
        var hr = inString.slice(9, 11);
        var mn = inString.slice(11, 13);
        var sec = inString.slice(13, 15);
        var rawDateStr = inString.replace('.', '_');
        this._rawDateStrings.push(rawDateStr);
        var dteStr = month + "/" + d + "/" + yr + " " + hr + ":" + mn + ":" + sec;
        var newDte = new Date(dteStr);
        newDte.setMinutes(newDte.getMinutes() - offsetMinutes);
        this._localDates.push(newDte);
        this.localTimes.push(newDte.getTime());
        return rawDateStr;
    };
    /**
     *
     * @protected
     * @returns {boolean} if should continue
     */
    RealEarthAnimate.prototype._loadLatest = function () {
        mapPopup_1.default.closePopup();
        if (this.localTimes.length > 0) {
            this._currentIndex = this.localTimes.length - 1;
            return true;
        }
        else {
            return false;
        }
    };
    /**
     *
     * @param {number} theTime - the time
     * @returns {boolean} true if new index, false if the same or below lowest value
     */
    RealEarthAnimate.prototype.setLayerTime = function (theTime) {
        if (!this._visible) {
            return false;
        }
        this._currentTime = theTime;
        var newIndex;
        if (theTime < this.localTimes[0]) {
            return false;
        }
        else if (theTime > this.localTimes[this.localTimes.length - 1]) {
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
        }
        else {
            this._currentIndex = newIndex;
            mapPopup_1.default.closePopup();
            return true;
        }
    };
    return RealEarthAnimate;
}());
exports.RealEarthAnimate = RealEarthAnimate;
nm.RealEarthAnimate = RealEarthAnimate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RealEarthAnimate;
//# sourceMappingURL=RealEarthAnimate.js.map