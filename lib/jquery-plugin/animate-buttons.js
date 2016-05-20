(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../jquery', '../util/provide', './range-change'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../jquery'), require('../util/provide'), require('./range-change'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.jquery, global.provide, global.rangeChange);
        global.animateButtons = mod.exports;
    }
})(this, function (module, exports, _jquery, _provide) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _provide2 = _interopRequireDefault(_provide);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var nm = (0, _provide2.default)('jQueryPlugin');

    /**
     * @callback mediaCallback
     * @param {number} newValue
     */

    function timeToLocalDateString(tm) {
        "use strict";

        var d = new Date(tm);
        var p1 = d.toLocaleTimeString().split(' ');
        var p2 = p1[0].split(':');
        p2 = p2.slice(0, 2);

        return d.toLocaleDateString() + '<br>' + p2.join(':') + ' ' + p1[1];
    }

    var MediaControl = function () {
        function MediaControl(jQueryElement, min, max, val, step, func, playInterval, dateFormat) {
            _classCallCheck(this, MediaControl);

            this._container = jQueryElement;
            this._playInterval = playInterval;
            this._interval = undefined;
            this._func = func;

            this._dateFormat = dateFormat;

            this._currentValue = undefined;
            this._min = undefined;
            this._max = undefined;
            this._step = undefined;
            this._playing = false;

            var htmlStr = '<span class="media-player-button media-back"></span>' + '<span class="media-player-button media-play"></span>' + '<span class="media-player-button media-pause media-disabled"></span>' + '<span class="media-player-button media-stop media-disabled" ></span>' + '<span class="media-player-button media-ahead"></span>' + '<input type="range">' + '<div class="media-control-value-label-container">' + '<span class="media-control-value-label-min"></span>' + '<span class="media-control-value-label-val"></span>' + '<span class="media-control-value-label-max"></span>' + '</div>';

            this._container.append(htmlStr);

            var btnPause = this._container.find('.media-pause');
            var btnPlay = this._container.find('.media-play');
            this._$btnStop = this._container.find('.media-stop');
            var btnAhead = this._container.find('.media-ahead');
            var btnBack = this._container.find('.media-back');
            this._$slider = this._container.find('input[type=range]');

            this._$valLabelMin = this._container.find('.media-control-value-label-min');
            this._$valLabelVal = this._container.find('.media-control-value-label-val');
            this._$valLabelMax = this._container.find('.media-control-value-label-max');

            this.setMinMaxValueStep(min, max, val, step);

            var _this = this;

            this._$slider.rangeChange(function (newVal, ratio, evt) {
                _this.currentValue = newVal;
            }, 100);

            btnPlay.click(function () {
                var $this = (0, _jquery2.default)(this);
                $this.addClass('media-disabled');
                _this._$btnStop.removeClass('media-disabled');
                btnAhead.addClass('media-locked');
                btnBack.addClass('media-locked');
                _this._$slider.prop('disabled', true);
                _this._playing = true;

                _this._interval = setInterval(function () {
                    _this.currentValue += _this._step;
                }, _this._playInterval);
            });

            this._$btnStop.click(function () {
                clearInterval(_this._interval);
                var $this = (0, _jquery2.default)(this);
                $this.addClass('media-disabled');
                btnPlay.removeClass('media-disabled');
                btnAhead.removeClass('media-locked');
                btnBack.removeClass('media-locked');
                _this._$slider.prop('disabled', false);
                _this._playing = false;
            });

            btnAhead.click(function () {
                _this.currentValue = _this.currentValue + _this._step;
            });

            btnBack.click(function () {
                _this.currentValue = _this.currentValue - _this._step;
            });
        }

        _createClass(MediaControl, [{
            key: 'stopPlaying',
            value: function stopPlaying() {
                if (this._playing) {
                    this._$btnStop.trigger('click');
                }
            }
        }, {
            key: 'setMinMaxValueStep',
            value: function setMinMaxValueStep(newMin, newMax, newValue, newStep) {
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

                if (this._dateFormat) {
                    this._$valLabelMin.html(timeToLocalDateString(this._min));
                    this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
                    this._$valLabelMax.html(timeToLocalDateString(this._max));
                } else {
                    this._$valLabelMin.html(this._min.toString());
                    this._$valLabelVal.html(this.currentValue.toString());
                    this._$valLabelMax.html(this._max.toString());
                }
            }
        }, {
            key: 'playing',
            get: function get() {
                return this._playing;
            }
        }, {
            key: 'min',
            get: function get() {
                return this._min;
            }
        }, {
            key: 'max',
            get: function get() {
                return this._max;
            }
        }, {
            key: 'step',
            get: function get() {
                return this._step;
            }
        }, {
            key: 'currentValue',
            get: function get() {
                return this._currentValue;
            },
            set: function set(newValue) {
                if (newValue > this._max) {
                    newValue = this._min;
                } else if (newValue < this._min) {
                    newValue = this._max;
                }
                this._currentValue = newValue;
                this._$slider.val(this._currentValue.toFixed(2));

                if (this._dateFormat) {
                    this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
                } else {
                    this._$valLabelVal.html(this.currentValue.toString());
                }

                this._func(newValue);
            }
        }, {
            key: 'changeFunction',
            set: function set(newFunc) {
                this._func = newFunc;
            }
        }]);

        return MediaControl;
    }();

    nm.MediaControl = MediaControl;

    /**
     * Adds a media control to a container
     * @param {number} [min=0] the min
     * @param {number} [max=100] the max
     * @param {number} [val=0] the val
     * @param {number} [step=1] the step
     * @param {mediaCallback} [func=function (n) {console.log('default function', n);}] media change callback function
     * @param {number} [playInterval=500] play interval
     * @param {boolean} [dateFormat=false] date format
     * @this {jQuery}
     * @returns {MediaControl} the Media control object
     */
    _jquery2.default.fn.mediaControl = function (min, max, val, step, func, playInterval, dateFormat) {

        min = typeof min == 'number' ? min : 0;
        max = typeof max == 'number' ? max : 100;
        val = typeof val == 'number' ? val : 0;
        step = typeof step == 'number' ? step : 1;
        func = typeof func == 'function' ? func : function (n) {
            console.log('default function', n);
        };

        playInterval = typeof playInterval == 'number' ? playInterval : 500;
        dateFormat = typeof dateFormat == 'boolean' ? dateFormat : false;

        this.addClass('media-control-container');

        return new MediaControl(this, min, max, val, step, func, playInterval, dateFormat);
    };

    exports.default = undefined;
    module.exports = exports['default'];
});