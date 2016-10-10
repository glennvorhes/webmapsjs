/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
var provide_1 = require('../util/provide');
var range_change_1 = require('./range-change');
var $ = require('jquery');
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
    function MediaControl(element, min, max, val, step, func, playInterval, showAsDate) {
        var _this = this;
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        if (val === void 0) { val = 0; }
        if (step === void 0) { step = 5; }
        if (func === void 0) { func = function () { }; }
        if (playInterval === void 0) { playInterval = 5; }
        if (showAsDate === void 0) { showAsDate = false; }
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
        this._playInterval = playInterval;
        this._interval = undefined;
        this._func = func;
        this._showAsDate = showAsDate;
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
        this.setMinMaxValueStep(min, max, val, step);
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
            this._func(newValue);
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
            this._func = newFunc;
        },
        enumerable: true,
        configurable: true
    });
    return MediaControl;
}());
exports.MediaControl = MediaControl;
nm.MediaControl = MediaControl;
//# sourceMappingURL=animate-buttons.js.map