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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
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
    if (typeof window.gv == 'undefined') {
        window.gv = {};
    }
    var parts = namespace.split('.');
    var nameSpace = window.gv;
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
window.gv.util.provide = provide;
exports.default = provide;


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/2/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var range_change_1 = __webpack_require__(20);
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
        if (changeFunc === void 0) { changeFunc = function () {
            return;
        }; }
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
        else if (typeof element.style !== 'undefined') {
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
        range_change_1.rangeChange(this._$slider, function (newVal) {
            _this.currentValue = newVal;
        }, 100);
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


/***/ }),

/***/ 20:
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


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// let g = new
var media_control_1 = __webpack_require__(19);
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


/***/ })

/******/ });
//# sourceMappingURL=my_little_test.js.map