/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var range_change_1 = require("./range-change");
var $ = require("jquery");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21VdGlsL21lZGlhLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUN0QywrQ0FBMkM7QUFDM0MsMEJBQTZCO0FBRTdCLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFNUI7OztHQUdHO0FBRUgsK0JBQStCLEVBQUU7SUFDN0IsWUFBWSxDQUFDO0lBQ2IsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFpQkQ7SUFvQkk7Ozs7O09BS0c7SUFDSCxzQkFDSSxPQUFrQyxFQUNsQyxVQUFrRCxFQUNsRCxXQUFrQztRQURsQywyQkFBQSxFQUFBLDJCQUEwQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1FBQ2xELDRCQUFBLEVBQUEsZ0JBQWtDO1FBSHRDLGlCQWlHQztRQTVGRyxXQUFXLENBQUMsR0FBRyxHQUFHLE9BQU8sV0FBVyxDQUFDLEdBQUcsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0Us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QyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDTCxDQUFDO0lBTUQsc0JBQUksd0NBQWM7UUFKbEI7OztXQUdHO2FBQ0gsVUFBbUIsT0FBdUI7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBQUMsQUFqTkQsSUFpTkM7QUFqTlksb0NBQVk7QUFtTnpCLEVBQUUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMi8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCB7cmFuZ2VDaGFuZ2V9IGZyb20gJy4vcmFuZ2UtY2hhbmdlJztcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2RvbVV0aWwnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2FsbGJhY2sgbWVkaWFDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gdG1cclxuICovXHJcblxyXG5mdW5jdGlvbiB0aW1lVG9Mb2NhbERhdGVTdHJpbmcodG0pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgbGV0IGQgPSBuZXcgRGF0ZSh0bSk7XHJcbiAgICBsZXQgcDEgPSBkLnRvTG9jYWxlVGltZVN0cmluZygpLnNwbGl0KCcgJyk7XHJcbiAgICBsZXQgcDIgPSBwMVswXS5zcGxpdCgnOicpO1xyXG4gICAgcDIgPSBwMi5zbGljZSgwLCAyKTtcclxuXHJcbiAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKSArICc8YnI+JyArIHAyLmpvaW4oJzonKSArICcgJyArIHAxWzFdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNoYW5nZUZ1bmN0aW9ue1xyXG4gICAgKG5ld1ZhbD86IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgbWVkaWFSYW5nZUNvbmZpZ3tcclxuICAgIG1pbj86IG51bWJlcjtcclxuICAgIG1heD86IG51bWJlcjtcclxuICAgIHZhbD86IG51bWJlcjtcclxuICAgIHN0ZXA/OiBudW1iZXI7XHJcbiAgICBwbGF5SW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgICBzaG93QXNEYXRlPzogYm9vbGVhbjtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWFDb250cm9sIHtcclxuICAgIF9jb250YWluZXI6IEpRdWVyeTtcclxuICAgIF9taW46IG51bWJlcjtcclxuICAgIF9tYXg6IG51bWJlcjtcclxuICAgIF9wbGF5SW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIF9zdGVwOiBudW1iZXI7XHJcbiAgICBfY3VycmVudFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgX3BsYXlpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgXyRidG5TdG9wOiBKUXVlcnk7XHJcbiAgICBfJHNsaWRlcjogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbFZhbDogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbE1pbjogSlF1ZXJ5O1xyXG4gICAgXyR2YWxMYWJlbE1heDogSlF1ZXJ5O1xyXG4gICAgX2ludGVydmFsOiBudW1iZXI7XHJcbiAgICBfc2hvd0FzRGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBfY2hhbmdlRnVuYzogY2hhbmdlRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSBjaGFuZ2VGdW5jXHJcbiAgICAgKiBAcGFyYW0gbWVkaWFDb25maWdcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgZWxlbWVudDogSlF1ZXJ5fEhUTUxFbGVtZW50fHN0cmluZyxcclxuICAgICAgICBjaGFuZ2VGdW5jOiBjaGFuZ2VGdW5jdGlvbiA9ICgpOiB2b2lkID0+IHtyZXR1cm47fSxcclxuICAgICAgICBtZWRpYUNvbmZpZzogbWVkaWFSYW5nZUNvbmZpZyA9IHt9KSB7XHJcblxyXG4gICAgICAgIG1lZGlhQ29uZmlnLm1pbiA9IHR5cGVvZiBtZWRpYUNvbmZpZy5taW4gPT0gJ251bWJlcicgPyBtZWRpYUNvbmZpZy5taW4gOiAwO1xyXG4gICAgICAgIG1lZGlhQ29uZmlnLm1heCA9IHR5cGVvZiBtZWRpYUNvbmZpZy5tYXggPT0gJ251bWJlcicgPyBtZWRpYUNvbmZpZy5tYXggOiAxMDA7XHJcbiAgICAgICAgbWVkaWFDb25maWcudmFsID0gdHlwZW9mIG1lZGlhQ29uZmlnLnZhbCA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLnZhbCA6IDA7XHJcbiAgICAgICAgbWVkaWFDb25maWcuc3RlcCA9IHR5cGVvZiBtZWRpYUNvbmZpZy5zdGVwID09ICdudW1iZXInID8gbWVkaWFDb25maWcuc3RlcCA6IDU7XHJcbiAgICAgICAgbWVkaWFDb25maWcucGxheUludGVydmFsID0gdHlwZW9mIG1lZGlhQ29uZmlnLnBsYXlJbnRlcnZhbCA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLnBsYXlJbnRlcnZhbCA6IDUwMDtcclxuICAgICAgICBtZWRpYUNvbmZpZy5zaG93QXNEYXRlID0gdHlwZW9mIG1lZGlhQ29uZmlnLnNob3dBc0RhdGUgPT0gJ2Jvb2xlYW4nID8gbWVkaWFDb25maWcuc2hvd0FzRGF0ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mICBlbGVtZW50ID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gJCgnIycgKyBlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGVsZW1lbnRbJ3N0eWxlJ10gIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gJChlbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSBlbGVtZW50IGFzIEpRdWVyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5hZGRDbGFzcygnbWVkaWEtY29udHJvbC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLl9wbGF5SW50ZXJ2YWwgPSBtZWRpYUNvbmZpZy5wbGF5SW50ZXJ2YWw7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRnVuYyA9IGNoYW5nZUZ1bmM7XHJcblxyXG4gICAgICAgIHRoaXMuX3Nob3dBc0RhdGUgPSBtZWRpYUNvbmZpZy5zaG93QXNEYXRlO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fbWluID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX21heCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9zdGVwID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWxTdHIgPVxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZWRpYS1wbGF5ZXItYnV0dG9uIG1lZGlhLWJhY2tcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1lZGlhLXBsYXllci1idXR0b24gbWVkaWEtcGxheVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1wYXVzZSBtZWRpYS1kaXNhYmxlZFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1zdG9wIG1lZGlhLWRpc2FibGVkXCIgPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1haGVhZFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwicmFuZ2VcIj5gICtcclxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJtZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLWNvbnRhaW5lclwiPmAgK1xyXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJtZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLW1pblwiPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwibWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC12YWxcIj48L3NwYW4+YCArXHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtbWF4XCI+PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZChodG1sU3RyKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGJ0blBhdXNlID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1wYXVzZScpO1xyXG4gICAgICAgIGxldCBidG5QbGF5ID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1wbGF5Jyk7XHJcbiAgICAgICAgdGhpcy5fJGJ0blN0b3AgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLXN0b3AnKTtcclxuICAgICAgICBsZXQgYnRuQWhlYWQgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWFoZWFkJyk7XHJcbiAgICAgICAgbGV0IGJ0bkJhY2sgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWJhY2snKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9cmFuZ2VdJyk7XHJcblxyXG4gICAgICAgIHRoaXMuXyR2YWxMYWJlbE1pbiA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC1taW4nKTtcclxuICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtdmFsJyk7XHJcbiAgICAgICAgdGhpcy5fJHZhbExhYmVsTWF4ID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLW1heCcpO1xyXG5cclxuICAgICAgICB0aGlzLnNldE1pbk1heFZhbHVlU3RlcChtZWRpYUNvbmZpZy5taW4sIG1lZGlhQ29uZmlnLm1heCwgbWVkaWFDb25maWcudmFsLCBtZWRpYUNvbmZpZy5zdGVwKTtcclxuXHJcbiAgICAgICAgcmFuZ2VDaGFuZ2UodGhpcy5fJHNsaWRlciwobmV3VmFsKSA9PiB7IHRoaXMuY3VycmVudFZhbHVlID0gbmV3VmFsO30sIDEwMCk7XHJcblxyXG4gICAgICAgIGxldCBfX190aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgYnRuUGxheS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdtZWRpYS1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICBfX190aGlzLl8kYnRuU3RvcC5yZW1vdmVDbGFzcygnbWVkaWEtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgYnRuQWhlYWQuYWRkQ2xhc3MoJ21lZGlhLWxvY2tlZCcpO1xyXG4gICAgICAgICAgICBidG5CYWNrLmFkZENsYXNzKCdtZWRpYS1sb2NrZWQnKTtcclxuICAgICAgICAgICAgX19fdGhpcy5fJHNsaWRlci5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICBfX190aGlzLl9wbGF5aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIF9fX3RoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX19fdGhpcy5jdXJyZW50VmFsdWUgKz0gX19fdGhpcy5fc3RlcDtcclxuICAgICAgICAgICAgfSwgX19fdGhpcy5fcGxheUludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fJGJ0blN0b3AuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKF9fX3RoaXMuX2ludGVydmFsKTtcclxuICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ21lZGlhLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIGJ0blBsYXkucmVtb3ZlQ2xhc3MoJ21lZGlhLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIGJ0bkFoZWFkLnJlbW92ZUNsYXNzKCdtZWRpYS1sb2NrZWQnKTtcclxuICAgICAgICAgICAgYnRuQmFjay5yZW1vdmVDbGFzcygnbWVkaWEtbG9ja2VkJyk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuXyRzbGlkZXIucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnRuQWhlYWQuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfX190aGlzLmN1cnJlbnRWYWx1ZSA9IF9fX3RoaXMuY3VycmVudFZhbHVlICsgX19fdGhpcy5fc3RlcDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnRuQmFjay5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuY3VycmVudFZhbHVlID0gX19fdGhpcy5jdXJyZW50VmFsdWUgLSBfX190aGlzLl9zdGVwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BQbGF5aW5nKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BsYXlpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLl8kYnRuU3RvcC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheWluZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF5aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0ZXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjdXJyZW50VmFsdWUobmV3VmFsdWUpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPiB0aGlzLl9tYXgpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLl9taW47XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSA8IHRoaXMuX21pbikge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuX21heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci52YWwodGhpcy5fY3VycmVudFZhbHVlLnRvRml4ZWQoMikpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2hvd0FzRGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwuaHRtbCh0aW1lVG9Mb2NhbERhdGVTdHJpbmcodGhpcy5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwuaHRtbCh0aGlzLmN1cnJlbnRWYWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZUZ1bmMobmV3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IG1pbiBhbmQgbWF4IHZhbHVlIHdpdGggc3RlcFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01pbiB0aGUgbmV3IG1pblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld01heCB0aGUgbmV3IG1hc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtuZXdWYWx1ZT1uZXdNaW5dIHRoZSB2YWx1ZSB0byBzZXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbmV3U3RlcD0obmV3TWF4LW5ld01pbikvMjBdIHN0ZXAgdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0TWluTWF4VmFsdWVTdGVwKG5ld01pbiwgbmV3TWF4LCBuZXdWYWx1ZSwgbmV3U3RlcCkge1xyXG4gICAgICAgIHRoaXMuX21pbiA9IG5ld01pbjtcclxuICAgICAgICB0aGlzLl9tYXggPSBuZXdNYXg7XHJcblxyXG4gICAgICAgIG5ld1ZhbHVlID0gdHlwZW9mIG5ld1ZhbHVlID09ICdudW1iZXInID8gbmV3VmFsdWUgOiBuZXdNaW47XHJcbiAgICAgICAgbmV3U3RlcCA9IHR5cGVvZiBuZXdTdGVwID09ICdudW1iZXInID8gbmV3U3RlcCA6IChuZXdNYXgtbmV3TWluKS8yMDtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5fc3RlcCA9IG5ld1N0ZXA7XHJcblxyXG4gICAgICAgIHRoaXMuXyRzbGlkZXIucHJvcCgnbWluJywgdGhpcy5taW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci5wcm9wKCdtYXgnLCB0aGlzLm1heC50b1N0cmluZygpKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyLnByb3AoJ3N0ZXAnLCB0aGlzLnN0ZXAudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci52YWwodGhpcy5jdXJyZW50VmFsdWUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zaG93QXNEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1pbi5odG1sKHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0aGlzLl9taW4pKTtcclxuICAgICAgICAgICAgdGhpcy5fJHZhbExhYmVsVmFsLmh0bWwodGltZVRvTG9jYWxEYXRlU3RyaW5nKHRoaXMuY3VycmVudFZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1heC5odG1sKHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0aGlzLl9tYXgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxNaW4uaHRtbCh0aGlzLl9taW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbFZhbC5odG1sKHRoaXMuY3VycmVudFZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxNYXguaHRtbCh0aGlzLl9tYXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bWVkaWFDYWxsYmFja30gbmV3RnVuYyB0aGUgY2FsbGJhY2sgb24gY2hhbmdlXHJcbiAgICAgKi9cclxuICAgIHNldCBjaGFuZ2VGdW5jdGlvbihuZXdGdW5jOiBjaGFuZ2VGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUZ1bmMgPSBuZXdGdW5jO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5NZWRpYUNvbnRyb2wgPSBNZWRpYUNvbnRyb2w7XHJcblxyXG4iXX0=