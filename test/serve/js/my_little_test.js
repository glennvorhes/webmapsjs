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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3ZpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUdIOzs7O0dBSUc7QUFDSCxpQkFBaUIsU0FBUztJQUN0QixZQUFZLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFFcEMsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTAvMjAxNS5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBhIG5hbWVzcGFjZSBvbiB0aGUgZ3Ygb2JqZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgdG8gY3JlYXRlXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5hbWVzcGFjZVxyXG4gKi9cclxuZnVuY3Rpb24gcHJvdmlkZShuYW1lc3BhY2Upe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvd1snZ3YnXSA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgd2luZG93WydndiddID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcnRzID0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgbmFtZVNwYWNlID0gd2luZG93WydndiddO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDsgaTwgcGFydHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuYW1lU3BhY2VbcGFydHNbaV1dO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG5ld09iamVjdCA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIG5hbWVTcGFjZVtwYXJ0c1tpXV0gPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVTcGFjZSA9IG5hbWVTcGFjZVtwYXJ0c1tpXV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5hbWVTcGFjZTtcclxufVxyXG5cclxucHJvdmlkZSgndXRpbCcpO1xyXG53aW5kb3dbJ2d2J10udXRpbC5wcm92aWRlID0gcHJvdmlkZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb3ZpZGU7XHJcbiJdfQ==

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/2/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var range_change_1 = __webpack_require__(18);
var $ = __webpack_require__(1);
var nm = provide_1.default('domUtil');
/**
 * @callback mediaCallback
 * @param {number} tm
 */
function timeToLocalDateString(tm) {
    "use strict";
    var d = new Date(tm);
    var p1 = d.toLocaleTimeString().split(' ');
    var p2 = p1[0].split(':');
    p2 = p2.slice(0, 2);
    return d.toLocaleDateString() + '<br>' + p2.join(':') + ' ' + p1[1];
}
var MediaControl = (function () {
    /**
     *
     * @param element
     * @param changeFunc
     * @param mediaConfig
     */
    function MediaControl(element, changeFunc, mediaConfig) {
        if (changeFunc === void 0) { changeFunc = function () { return; }; }
        if (mediaConfig === void 0) { mediaConfig = {}; }
        var _this = this;
        mediaConfig.min = typeof mediaConfig.min == 'number' ? mediaConfig.min : 0;
        mediaConfig.max = typeof mediaConfig.max == 'number' ? mediaConfig.max : 100;
        mediaConfig.val = typeof mediaConfig.val == 'number' ? mediaConfig.val : 0;
        mediaConfig.step = typeof mediaConfig.step == 'number' ? mediaConfig.step : 5;
        mediaConfig.playInterval = typeof mediaConfig.playInterval == 'number' ? mediaConfig.playInterval : 500;
        mediaConfig.showAsDate = typeof mediaConfig.showAsDate == 'boolean' ? mediaConfig.showAsDate : false;
        if (typeof element == 'string') {
            this._container = $('#' + element);
        }
        else if (typeof element['style'] !== 'undefined') {
            this._container = $(element);
        }
        else {
            this._container = element;
        }
        this._container.addClass('media-control-container');
        this._playInterval = mediaConfig.playInterval;
        this._changeFunc = changeFunc;
        this._showAsDate = mediaConfig.showAsDate;
        this._currentValue = undefined;
        this._min = undefined;
        this._max = undefined;
        this._step = undefined;
        this._playing = false;
        var htmlStr = '<span class="media-player-button media-back"></span>' +
            '<span class="media-player-button media-play"></span>' +
            '<span class="media-player-button media-pause media-disabled"></span>' +
            '<span class="media-player-button media-stop media-disabled" ></span>' +
            '<span class="media-player-button media-ahead"></span>' +
            "<input type=\"range\">" +
            "<div class=\"media-control-value-label-container\">" +
            "<span class=\"media-control-value-label-min\"></span>" +
            "<span class=\"media-control-value-label-val\"></span>" +
            "<span class=\"media-control-value-label-max\"></span>" +
            "</div>";
        this._container.append(htmlStr);
        // let btnPause = this._container.find('.media-pause');
        var btnPlay = this._container.find('.media-play');
        this._$btnStop = this._container.find('.media-stop');
        var btnAhead = this._container.find('.media-ahead');
        var btnBack = this._container.find('.media-back');
        this._$slider = this._container.find('input[type=range]');
        this._$valLabelMin = this._container.find('.media-control-value-label-min');
        this._$valLabelVal = this._container.find('.media-control-value-label-val');
        this._$valLabelMax = this._container.find('.media-control-value-label-max');
        this.setMinMaxValueStep(mediaConfig.min, mediaConfig.max, mediaConfig.val, mediaConfig.step);
        range_change_1.rangeChange(this._$slider, function (newVal) { _this.currentValue = newVal; }, 100);
        var ___this = this;
        btnPlay.click(function () {
            var $this = $(this);
            $this.addClass('media-disabled');
            ___this._$btnStop.removeClass('media-disabled');
            btnAhead.addClass('media-locked');
            btnBack.addClass('media-locked');
            ___this._$slider.prop('disabled', true);
            ___this._playing = true;
            ___this._interval = setInterval(function () {
                ___this.currentValue += ___this._step;
            }, ___this._playInterval);
        });
        this._$btnStop.click(function () {
            clearInterval(___this._interval);
            var $this = $(this);
            $this.addClass('media-disabled');
            btnPlay.removeClass('media-disabled');
            btnAhead.removeClass('media-locked');
            btnBack.removeClass('media-locked');
            ___this._$slider.prop('disabled', false);
            ___this._playing = false;
        });
        btnAhead.click(function () {
            ___this.currentValue = ___this.currentValue + ___this._step;
        });
        btnBack.click(function () {
            ___this.currentValue = ___this.currentValue - ___this._step;
        });
    }
    MediaControl.prototype.stopPlaying = function () {
        if (this._playing) {
            this._$btnStop.trigger('click');
        }
    };
    Object.defineProperty(MediaControl.prototype, "playing", {
        get: function () {
            return this._playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaControl.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaControl.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaControl.prototype, "step", {
        get: function () {
            return this._step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaControl.prototype, "currentValue", {
        get: function () {
            return this._currentValue;
        },
        set: function (newValue) {
            if (newValue > this._max) {
                newValue = this._min;
            }
            else if (newValue < this._min) {
                newValue = this._max;
            }
            this._currentValue = newValue;
            this._$slider.val(this._currentValue.toFixed(2));
            if (this._showAsDate) {
                this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
            }
            else {
                this._$valLabelVal.html(this.currentValue.toString());
            }
            this._changeFunc(newValue);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * set min and max value with step
     * @param {number} newMin the new min
     * @param {number} newMax the new mas
     * @param {number} [newValue=newMin] the value to set
     * @param {number} [newStep=(newMax-newMin)/20] step value
     */
    MediaControl.prototype.setMinMaxValueStep = function (newMin, newMax, newValue, newStep) {
        this._min = newMin;
        this._max = newMax;
        newValue = typeof newValue == 'number' ? newValue : newMin;
        newStep = typeof newStep == 'number' ? newStep : (newMax - newMin) / 20;
        this._currentValue = newValue;
        this._step = newStep;
        this._$slider.prop('min', this.min.toString());
        this._$slider.prop('max', this.max.toString());
        this._$slider.prop('step', this.step.toString());
        this._$slider.val(this.currentValue.toString());
        if (this._showAsDate) {
            this._$valLabelMin.html(timeToLocalDateString(this._min));
            this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
            this._$valLabelMax.html(timeToLocalDateString(this._max));
        }
        else {
            this._$valLabelMin.html(this._min.toString());
            this._$valLabelVal.html(this.currentValue.toString());
            this._$valLabelMax.html(this._max.toString());
        }
    };
    Object.defineProperty(MediaControl.prototype, "changeFunction", {
        /**
         *
         * @param {mediaCallback} newFunc the callback on change
         */
        set: function (newFunc) {
            this._changeFunc = newFunc;
        },
        enumerable: true,
        configurable: true
    });
    return MediaControl;
}());
exports.MediaControl = MediaControl;
nm.MediaControl = MediaControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lZGlhLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUN0QywrQ0FBMkM7QUFDM0MsMEJBQTZCO0FBRTdCLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFNUI7OztHQUdHO0FBRUgsK0JBQStCLEVBQUU7SUFDN0IsWUFBWSxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFpQkQ7SUFvQkk7Ozs7O09BS0c7SUFDSCxzQkFDSSxPQUFrQyxFQUNsQyxVQUFrRCxFQUNsRCxXQUFrQztRQURsQywyQkFBQSxFQUFBLDJCQUEwQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1FBQ2xELDRCQUFBLEVBQUEsZ0JBQWtDO1FBSHRDLGlCQWlHQztRQTVGRyxXQUFXLENBQUMsR0FBRyxHQUFHLE9BQU8sV0FBVyxDQUFDLEdBQUcsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0UsV0FBVyxDQUFDLEdBQUcsR0FB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Q0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDTCxDQUFDO0lBTUQsc0JBQUksd0NBQWM7UUFKbEI7OztXQUdHO2FBQ0gsVUFBbUIsT0FBdUI7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBQUMsQUFqTkQsSUFpTkM7QUFqTlksb0NBQVk7QUFtTnpCLEVBQUUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMi8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCB7cmFuZ2VDaGFuZ2V9IGZyb20gJy4vcmFuZ2UtY2hhbmdlJztcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2RvbVV0aWwnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2FsbGJhY2sgbWVkaWFDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gdG1cclxuICovXHJcblxyXG5mdW5jdGlvbiB0aW1lVG9Mb2NhbERhdGVTdHJpbmcodG0pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgbGV0IGQgPSBuZXcgRGF0ZSh0bSk7XHJcbiAgICBsZXQgcDEgPSBkLnRvTG9jYWxlVGltZVN0cmluZygpLnNwbGl0KCcgJyk7XHJcbiAgICBsZXQgcDIgPSBwMVswXS5zcGxpdCgnOicpO1xyXG4gICAgcDIgPSBwMi5zbGljZSgwLCAyKTtcclxuXHJcbiAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKSArICc8YnI+JyArIHAyLmpvaW4oJzonKSArICcgJyArIHAxWzFdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNoYW5nZUZ1bmN0aW9ue1xyXG4gICAgKG5ld1ZhbD86IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgbWVkaWFSYW5nZUNvbmZpZ3tcclxuICAgIG1pbj86IG51bWJlcjtcclxuICAgIG1heD86IG51bWJlcjtcclxuICAgIHZhbD86IG51bWJlcjtcclxuICAgIHN0ZXA/OiBudW1iZXI7XHJcbiAgICBwbGF5SW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgICBzaG93QXNEYXRlPzogYm9vbGVhbjtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWFDb250cm9sIHtcclxuICAgIF9jb250YWluZXI6IEpRdWVyeTtcclxuICAgIF9taW46IG51bWJlcjtcclxuICAgIF9tYXg6IG51bWJlcjtcclxuICAgIF9wbGF5SW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIF9zdGVwOiBudW1iZXI7XHJcbiAgICBfY3VycmVudFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgX3BsYXlpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgXyRidG5TdG9wOiBKUXVlcnk7XHJcbiAgICBfJHNsaWRlcjogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbFZhbDogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbE1pbjogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbE1heDogSlF1ZXJ5O1xyXG4gICAgX2ludGVydmFsOiBudW1iZXI7XHJcbiAgICBfc2hvd0FzRGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBfY2hhbmdlRnVuYzogY2hhbmdlRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VGdW5jXHJcbiAgICAgKiBAcGFyYW0gbWVkaWFDb25maWdcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZWxlbWVudDogSlF1ZXJ5fEhUTUxFbGVtZW50fHN0cmluZyxcclxuICAgICAgICBjaGFuZ2VGdW5jOiBjaGFuZ2VGdW5jdGlvbiA9ICgpOiB2b2lkID0+IHtyZXR1cm47fSxcclxuICAgICAgICBtZWRpYUNvbmZpZzogbWVkaWFSYW5nZUNvbmZpZyA9IHt9KSB7XHJcblxyXG4gICAgICAgIG1lZGlhQ29uZmlnLm1pbiA9IHR5cGVvZiBtZWRpYUNvbmZpZy5taW4gPT0gJ251bWJlcicgPyBtZWRpYUNvbmZpZy5taW4gOiAwO1xyXG4gICAgICAgIG1lZGlhQ29uZmlnLm1heCA9IHR5cGVvZiBtZWRpYUNvbmZpZy5tYXggPT0gJ251bWJlcicgPyBtZWRpYUNvbmZpZy5tYXggOiAxMDA7XHJcbiAgICAgICAgbWVkaWFDb25maWcudmFsID0gdHlwZW9mIG1lZGlhQ29uZmlnLnZhbCA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLnZhbCA6IDA7XHJcbiAgICAgICAgbWVkaWFDb25maWcuc3RlcCA9IHR5cGVvZiBtZWRpYUNvbmZpZy5zdGVwID09ICdudW1iZXInID8gbWVkaWFDb25maWcuc3RlcCA6IDU7XHJcbiAgICAgICAgbWVkaWFDb25maWcucGxheUludGVydmFsID0gdHlwZW9mIG1lZGlhQ29uZmlnLnBsYXlJbnRlcnZhbCA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLnBsYXlJbnRlcnZhbCA6IDUwMDtcclxuICAgICAgICBtZWRpYUNvbmZpZy5zaG93QXNEYXRlID0gdHlwZW9mIG1lZGlhQ29uZmlnLnNob3dBc0RhdGUgPT0gJ2Jvb2xlYW4nID8gbWVkaWFDb25maWcuc2hvd0FzRGF0ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mICBlbGVtZW50ID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gJCgnIycgKyBlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGVsZW1lbnRbJ3N0eWxlJ10gIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gJChlbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSBlbGVtZW50IGFzIEpRdWVyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLl9wbGF5SW50ZXJ2YWwgPSBtZWRpYUNvbmZpZy5wbGF5SW50ZXJ2YWw7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRnVuYyA9IGNoYW5nZUZ1bmM7XHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3dBc0RhdGUgPSBtZWRpYUNvbmZpZy5zaG93QXNEYXRlO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fbWluID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX21heCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWxTdHIgPVxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZWRpYS1wbGF5ZXItYnV0dG9uIG1lZGlhLWJhY2tcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1lZGlhLXBsYXllci1idXR0b24gbWVkaWEtcGxheVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1wYXVzZSBtZWRpYS1kaXNhYmxlZFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1zdG9wIG1lZGlhLWRpc2FibGVkXCIgPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1haGVhZFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwicmFuZ2VcIj5gICtcclxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLWNvbnRhaW5lclwiPmAgK1xyXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJtZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLW1pblwiPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwibWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC12YWxcIj48L3NwYW4+YCArXHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtbWF4XCI+PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZChodG1sU3RyKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGJ0blBhdXNlID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1wYXVzZScpO1xyXG4gICAgICAgIGxldCBidG5QbGF5ID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1wbGF5Jyk7XHJcbiAgICAgICAgdGhpcy5fJGJ0blN0b3AgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLXN0b3AnKTtcclxuICAgICAgICBsZXQgYnRuQWhlYWQgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWFoZWFkJyk7XHJcbiAgICAgICAgbGV0IGJ0bkJhY2sgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWJhY2snKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9cmFuZ2VdJyk7XHJcblxyXG4gICAgICAgIHRoaXMuXyR2YWxMYWJlbE1pbiA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC1taW4nKTtcclxuICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtdmFsJyk7XHJcbiAgICAgICAgdGhpcy5fJHZhbExhYmVsTWF4ID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLW1heCcpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1pbk1heFZhbHVlU3RlcChtZWRpYUNvbmZpZy5taW4sIG1lZGlhQ29uZmlnLm1heCwgbWVkaWFDb25maWcudmFsLCBtZWRpYUNvbmZpZy5zdGVwKTtcclxuXHJcbiAgICAgICAgcmFuZ2VDaGFuZ2UodGhpcy5fJHNsaWRlciwobmV3VmFsKSA9PiB7IHRoaXMuY3VycmVudFZhbHVlID0gbmV3VmFsO30sIDEwMCk7XHJcblxyXG4gICAgICAgIGxldCBfX190aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgYnRuUGxheS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdtZWRpYS1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICBfX190aGlzLl8kYnRuU3RvcC5yZW1vdmVDbGFzcygnbWVkaWEtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgYnRuQWhlYWQuYWRkQ2xhc3MoJ21lZGlhLWxvY2tlZCcpO1xyXG4gICAgICAgICAgICBidG5CYWNrLmFkZENsYXNzKCdtZWRpYS1sb2NrZWQnKTtcclxuICAgICAgICAgICAgX19fdGhpcy5fJHNsaWRlci5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICBfX190aGlzLl9wbGF5aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9fX3RoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX19fdGhpcy5jdXJyZW50VmFsdWUgKz0gX19fdGhpcy5fc3RlcDtcclxuICAgICAgICAgICAgfSwgX19fdGhpcy5fcGxheUludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fJGJ0blN0b3AuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKF9fX3RoaXMuX2ludGVydmFsKTtcclxuICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ21lZGlhLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIGJ0blBsYXkucmVtb3ZlQ2xhc3MoJ21lZGlhLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIGJ0bkFoZWFkLnJlbW92ZUNsYXNzKCdtZWRpYS1sb2NrZWQnKTtcclxuICAgICAgICAgICAgYnRuQmFjay5yZW1vdmVDbGFzcygnbWVkaWEtbG9ja2VkJyk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuXyRzbGlkZXIucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnRuQWhlYWQuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfX190aGlzLmN1cnJlbnRWYWx1ZSA9IF9fX3RoaXMuY3VycmVudFZhbHVlICsgX19fdGhpcy5fc3RlcDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnRuQmFjay5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuY3VycmVudFZhbHVlID0gX19fdGhpcy5jdXJyZW50VmFsdWUgLSBfX190aGlzLl9zdGVwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BQbGF5aW5nKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXlpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLl8kYnRuU3RvcC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheWluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF5aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0ZXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjdXJyZW50VmFsdWUobmV3VmFsdWUpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPiB0aGlzLl9tYXgpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLl9taW47XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSA8IHRoaXMuX21pbikge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuX21heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci52YWwodGhpcy5fY3VycmVudFZhbHVlLnRvRml4ZWQoMikpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2hvd0FzRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwuaHRtbCh0aW1lVG9Mb2NhbERhdGVTdHJpbmcodGhpcy5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwuaHRtbCh0aGlzLmN1cnJlbnRWYWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZUZ1bmMobmV3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IG1pbiBhbmQgbWF4IHZhbHVlIHdpdGggc3RlcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01pbiB0aGUgbmV3IG1pblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01heCB0aGUgbmV3IG1hc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtuZXdWYWx1ZT1uZXdNaW5dIHRoZSB2YWx1ZSB0byBzZXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3U3RlcD0obmV3TWF4LW5ld01pbikvMjBdIHN0ZXAgdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0TWluTWF4VmFsdWVTdGVwKG5ld01pbiwgbmV3TWF4LCBuZXdWYWx1ZSwgbmV3U3RlcCkge1xyXG4gICAgICAgIHRoaXMuX21pbiA9IG5ld01pbjtcclxuICAgICAgICB0aGlzLl9tYXggPSBuZXdNYXg7XHJcblxyXG4gICAgICAgIG5ld1ZhbHVlID0gdHlwZW9mIG5ld1ZhbHVlID09ICdudW1iZXInID8gbmV3VmFsdWUgOiBuZXdNaW47XHJcbiAgICAgICAgbmV3U3RlcCA9IHR5cGVvZiBuZXdTdGVwID09ICdudW1iZXInID8gbmV3U3RlcCA6IChuZXdNYXgtbmV3TWluKS8yMDtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5fc3RlcCA9IG5ld1N0ZXA7XHJcblxyXG4gICAgICAgIHRoaXMuXyRzbGlkZXIucHJvcCgnbWluJywgdGhpcy5taW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci5wcm9wKCdtYXgnLCB0aGlzLm1heC50b1N0cmluZygpKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyLnByb3AoJ3N0ZXAnLCB0aGlzLnN0ZXAudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci52YWwodGhpcy5jdXJyZW50VmFsdWUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zaG93QXNEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1pbi5odG1sKHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0aGlzLl9taW4pKTtcclxuICAgICAgICAgICAgdGhpcy5fJHZhbExhYmVsVmFsLmh0bWwodGltZVRvTG9jYWxEYXRlU3RyaW5nKHRoaXMuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1heC5odG1sKHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0aGlzLl9tYXgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxNaW4uaHRtbCh0aGlzLl9taW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbFZhbC5odG1sKHRoaXMuY3VycmVudFZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxNYXguaHRtbCh0aGlzLl9tYXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bWVkaWFDYWxsYmFja30gbmV3RnVuYyB0aGUgY2FsbGJhY2sgb24gY2hhbmdlXHJcbiAgICAgKi9cclxuICAgIHNldCBjaGFuZ2VGdW5jdGlvbihuZXdGdW5jOiBjaGFuZ2VGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUZ1bmMgPSBuZXdGdW5jO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5NZWRpYUNvbnRyb2wgPSBNZWRpYUNvbnRyb2w7XHJcblxyXG4iXX0=

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('domUtil');
var mouseIn = false;
var mouseDown = false;
var timeout = null;
var dragged = false;
var lastVal;
/**
 * Created by gavorhes on 11/2/2015.
 */
function triggerCallback(callback, evt) {
    "use strict";
    var val = parseFloat(this.value);
    var min = parseFloat(this.min);
    var max = parseFloat(this.max);
    var step = parseFloat(this.step);
    if (max - val < step) {
        val = max;
    }
    var percent = (val - min) / (max - min);
    if (typeof lastVal == 'number' && val == lastVal) {
        return;
    }
    lastVal = val;
    callback(val, percent, evt);
}
/**
 * Add a variety of listeners for range inputs applied to a common callback
 * @param  $slider - jquery reference to the slider
 * @param {rangeChangeCallback} callback - the callback
 * @param {number} [changeTimeout=75] before the callback is called
 * @this {jQuery}
 * @returns {jQuery} the jQuery object
 */
function rangeChange($slider, callback, changeTimeout) {
    changeTimeout = typeof changeTimeout == 'number' ? changeTimeout : 75;
    $slider.mouseenter(function () {
        mouseIn = true;
    });
    $slider.mouseleave(function () {
        mouseIn = false;
        mouseDown = false;
    });
    $slider.mousedown(function () {
        mouseDown = true;
    });
    $slider.mouseup(function () {
        mouseDown = false;
    });
    $slider.mousemove(
    /**
     *
     * @param {object} evt - event properties
     * @this {HTMLElement}
     */
    function (evt) {
        if (!(mouseIn && mouseDown)) {
            return;
        }
        dragged = true;
        if (lastVal == this['value']) {
            return;
        }
        lastVal = this['value'];
        if (timeout != null) {
            clearTimeout(timeout);
        }
        var _this = this;
        timeout = setTimeout(function () {
            triggerCallback.call(_this, callback, evt);
            timeout = null;
        }, changeTimeout);
    });
    $slider.keyup(
    /**
     *
     * @param {object} evt - event properties
     */
    function (evt) {
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            triggerCallback.call(this, callback, evt);
        }
    });
    $slider.change(function (evt) {
        if (dragged) {
            dragged = false;
            return;
        }
        triggerCallback.call(this, callback, evt);
    });
    return this;
}
exports.rangeChange = rangeChange;
nm.rangeChange = rangeChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFuZ2UtY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXNDO0FBR3RDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN0QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDbkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLElBQUksT0FBTyxDQUFDO0FBeUJaOztHQUVHO0FBRUgseUJBQXlCLFFBQThCLEVBQUUsR0FBRztJQUN4RCxZQUFZLENBQUM7SUFFYixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQztRQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksT0FBTyxHQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRXpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUssT0FBTyxDQUFDLENBQUEsQ0FBQztRQUMvQyxNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUNkLFFBQVEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFJRDs7Ozs7OztHQU9HO0FBQ0gscUJBQTZCLE9BQWUsRUFBRSxRQUE4QixFQUFFLGFBQXFCO0lBRS9GLGFBQWEsR0FBRyxPQUFRLGFBQWEsSUFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV2RSxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDZixPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2QsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDWixTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLFNBQVM7SUFDYjs7OztPQUlHO0lBQ0gsVUFBVSxHQUFHO1FBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ2pCLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRW5CLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxLQUFLO0lBQ1Q7OztPQUdHO0lBQ0gsVUFBVSxHQUFHO1FBQ2IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVoQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBekVELGtDQXlFQztBQUVELEVBQUUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnZG9tVXRpbCcpO1xyXG5cclxubGV0IG1vdXNlSW4gPSBmYWxzZTtcclxubGV0IG1vdXNlRG93biA9IGZhbHNlO1xyXG5sZXQgdGltZW91dCA9IG51bGw7XHJcbmxldCBkcmFnZ2VkID0gZmFsc2U7XHJcbmxldCBsYXN0VmFsO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBjYWxsYmFjayBvbiByYW5nZSBjaGFuZ2UgaW50ZXJhY3Rpb24sIGNvbnRleHQgb2YgdGhpcyBpcyB0aGUgZmlyaW5nIGRvbSBlbGVtZW50XHJcbiAqIEBjYWxsYmFjayByYW5nZUNoYW5nZUNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZXdWYWx1ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gdmFsdWUgZnJvbSAwIHRvIDEgcmVsYXRpdmUgb2YgdGhlIHZhbHVlIHRvIHRoZSBtaW4gYW5kIG1heFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XHJcbiAqL1xyXG5cclxuLyoqKlxyXG4gKiBjYWxsYmFjayBmdW5jaW9uIGFmdGVyIHRoZSBzbGlkZXIgaGFzIGJlZW4gbW92ZWRcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgcmFuZ2VDaGFuZ2VkQ2FsbGJhY2t7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmV3VmFsdWUgbmV3IHZhbHVlIG9mIHRoZSBzbGlkZXJcclxuICAgICAqIEBwYXJhbSByYXRpbyByYXRpbyBmcm9tIGxvdyB0byBoaWdoLCAwIHRvIDFcclxuICAgICAqIEBwYXJhbSBldnQgdGhlIG9yaWdpbmFsIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIChuZXdWYWx1ZTogbnVtYmVyLCByYXRpbzogbnVtYmVyLCBldnQ6IEV2ZW50KTogYW55XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8yLzIwMTUuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gdHJpZ2dlckNhbGxiYWNrKGNhbGxiYWNrOiByYW5nZUNoYW5nZWRDYWxsYmFjaywgZXZ0KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBsZXQgdmFsID0gcGFyc2VGbG9hdCh0aGlzLnZhbHVlKTtcclxuICAgIGxldCBtaW4gPSBwYXJzZUZsb2F0KHRoaXMubWluKTtcclxuICAgIGxldCBtYXggPSBwYXJzZUZsb2F0KHRoaXMubWF4KTtcclxuICAgIGxldCBzdGVwID0gcGFyc2VGbG9hdCh0aGlzLnN0ZXApO1xyXG5cclxuICAgIGlmIChtYXggLSB2YWwgPCBzdGVwKXtcclxuICAgICAgICB2YWwgPSBtYXg7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBlcmNlbnQgPSAgKHZhbCAtIG1pbikgLyAobWF4IC0gbWluKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGxhc3RWYWwgPT0gJ251bWJlcicgJiYgdmFsID09ICBsYXN0VmFsKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsYXN0VmFsID0gdmFsO1xyXG4gICAgY2FsbGJhY2sodmFsLCBwZXJjZW50LCBldnQpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSB2YXJpZXR5IG9mIGxpc3RlbmVycyBmb3IgcmFuZ2UgaW5wdXRzIGFwcGxpZWQgdG8gYSBjb21tb24gY2FsbGJhY2tcclxuICogQHBhcmFtICAkc2xpZGVyIC0ganF1ZXJ5IHJlZmVyZW5jZSB0byB0aGUgc2xpZGVyXHJcbiAqIEBwYXJhbSB7cmFuZ2VDaGFuZ2VDYWxsYmFja30gY2FsbGJhY2sgLSB0aGUgY2FsbGJhY2tcclxuICogQHBhcmFtIHtudW1iZXJ9IFtjaGFuZ2VUaW1lb3V0PTc1XSBiZWZvcmUgdGhlIGNhbGxiYWNrIGlzIGNhbGxlZFxyXG4gKiBAdGhpcyB7alF1ZXJ5fVxyXG4gKiBAcmV0dXJucyB7alF1ZXJ5fSB0aGUgalF1ZXJ5IG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlQ2hhbmdlICgkc2xpZGVyOiBKUXVlcnksIGNhbGxiYWNrOiByYW5nZUNoYW5nZWRDYWxsYmFjaywgY2hhbmdlVGltZW91dDogbnVtYmVyKSB7XHJcblxyXG4gICAgY2hhbmdlVGltZW91dCA9IHR5cGVvZiAgY2hhbmdlVGltZW91dCA9PSAnbnVtYmVyJyA/IGNoYW5nZVRpbWVvdXQgOiA3NTtcclxuXHJcbiAgICAkc2xpZGVyLm1vdXNlZW50ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vdXNlSW4gPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHNsaWRlci5tb3VzZWxlYXZlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtb3VzZUluID0gZmFsc2U7XHJcbiAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2xpZGVyLm1vdXNlZG93bihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgICRzbGlkZXIubW91c2V1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2xpZGVyLm1vdXNlbW92ZShcclxuICAgICAgICAvKipcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldnQgLSBldmVudCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICogQHRoaXMge0hUTUxFbGVtZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICBpZiAoIShtb3VzZUluICYmIG1vdXNlRG93bikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhZ2dlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChsYXN0VmFsID09IHRoaXNbJ3ZhbHVlJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0VmFsID0gdGhpc1sndmFsdWUnXTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVvdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjay5jYWxsKF90aGlzLCBjYWxsYmFjaywgZXZ0KTtcclxuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcblxyXG4gICAgICAgIH0sIGNoYW5nZVRpbWVvdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHNsaWRlci5rZXl1cChcclxuICAgICAgICAvKipcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldnQgLSBldmVudCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgIGlmIChldnQua2V5Q29kZSA9PSAzNyB8fCBldnQua2V5Q29kZSA9PSAzOSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyQ2FsbGJhY2suY2FsbCh0aGlzLCBjYWxsYmFjaywgZXZ0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2xpZGVyLmNoYW5nZShmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgaWYgKGRyYWdnZWQpIHtcclxuICAgICAgICAgICAgZHJhZ2dlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cmlnZ2VyQ2FsbGJhY2suY2FsbCh0aGlzLCBjYWxsYmFjaywgZXZ0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5ubS5yYW5nZUNoYW5nZSA9IHJhbmdlQ2hhbmdlO1xyXG5cclxuIl19

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// let g = new
var media_control_1 = __webpack_require__(17);
//
//
console.log('eat this fish');
console.log('eat this fish');
console.log('eat this bird');
//
// let g = new ol3.source.Vector();
//
// console.log(olx);
console.log('i am here5');
function me(eat) {
    if (eat === void 0) { eat = 1; }
    console.log(eat, 'one');
}
me(1);
var control = new media_control_1.MediaControl('map');
//
//
// console.log(ol3);
//
//
// console.log(definedAndNotNull("fish"));
// console.log(definedAndNotNull("fish"));
// console.log(definedAndNotNull("fish"));
// console.log(definedAndNotNull("fish"));
// console.log(definedAndNotNull("fish"));
// console.log('here');
//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlfbGl0dGxlX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteV9saXR0bGVfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGNBQWM7QUFLZCxpRUFBNEQ7QUFDNUQsRUFBRTtBQUNGLEVBQUU7QUFHRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU3QixFQUFFO0FBQ0YsbUNBQW1DO0FBQ25DLEVBQUU7QUFDRixvQkFBb0I7QUFHcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUkxQixZQUFhLEdBQWU7SUFBZixvQkFBQSxFQUFBLE9BQWU7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVOLElBQUksT0FBTyxHQUFHLElBQUksNEJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV0QyxFQUFFO0FBQ0YsRUFBRTtBQUNGLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YsRUFBRTtBQUNGLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsdUJBQXVCO0FBQ3ZCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuLy8gbGV0IGcgPSBuZXdcclxuXHJcblxyXG5cclxuXHJcbmltcG9ydCB7TWVkaWFDb250cm9sfSBmcm9tICcuLi8uLi9zcmMvZG9tVXRpbC9tZWRpYS1jb250cm9sJ1xyXG4vL1xyXG4vL1xyXG5cclxuXHJcbmNvbnNvbGUubG9nKCdlYXQgdGhpcyBmaXNoJyk7XHJcbmNvbnNvbGUubG9nKCdlYXQgdGhpcyBmaXNoJyk7XHJcbmNvbnNvbGUubG9nKCdlYXQgdGhpcyBiaXJkJyk7XHJcblxyXG4vL1xyXG4vLyBsZXQgZyA9IG5ldyBvbDMuc291cmNlLlZlY3RvcigpO1xyXG4vL1xyXG4vLyBjb25zb2xlLmxvZyhvbHgpO1xyXG5cclxuXHJcbmNvbnNvbGUubG9nKCdpIGFtIGhlcmU1Jyk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIG1lIChlYXQ6IG51bWJlciA9IDEpe1xyXG4gICAgY29uc29sZS5sb2coZWF0LCAnb25lJyk7XHJcbn1cclxuXHJcbm1lKDEpO1xyXG5cclxudmFyIGNvbnRyb2wgPSBuZXcgTWVkaWFDb250cm9sKCdtYXAnKTtcclxuXHJcbi8vXHJcbi8vXHJcbi8vIGNvbnNvbGUubG9nKG9sMyk7XHJcbi8vXHJcbi8vXHJcbi8vIGNvbnNvbGUubG9nKGRlZmluZWRBbmROb3ROdWxsKFwiZmlzaFwiKSk7XHJcbi8vIGNvbnNvbGUubG9nKGRlZmluZWRBbmROb3ROdWxsKFwiZmlzaFwiKSk7XHJcbi8vIGNvbnNvbGUubG9nKGRlZmluZWRBbmROb3ROdWxsKFwiZmlzaFwiKSk7XHJcbi8vIGNvbnNvbGUubG9nKGRlZmluZWRBbmROb3ROdWxsKFwiZmlzaFwiKSk7XHJcbi8vIGNvbnNvbGUubG9nKGRlZmluZWRBbmROb3ROdWxsKFwiZmlzaFwiKSk7XHJcbi8vIGNvbnNvbGUubG9nKCdoZXJlJyk7XHJcbi8vXHJcbiJdfQ==

/***/ })

/******/ });
//# sourceMappingURL=my_little_test.js.map