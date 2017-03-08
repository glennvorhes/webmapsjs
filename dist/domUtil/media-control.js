/**
 * Created by gavorhes on 11/2/2015.
 */
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21VdGlsL21lZGlhLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsMkNBQXNDO0FBQ3RDLCtDQUEyQztBQUMzQywwQkFBNkI7QUFFN0IsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU1Qjs7O0dBR0c7QUFFSCwrQkFBK0IsRUFBRTtJQUM3QixZQUFZLENBQUM7SUFDYixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQWlCRDtJQW9CSTs7Ozs7T0FLRztJQUNILHNCQUNJLE9BQWtDLEVBQ2xDLFVBQWtELEVBQ2xELFdBQWtDO1FBRGxDLDJCQUFBLEVBQUEsMkJBQTBDLE1BQU0sQ0FBQyxDQUFBLENBQUM7UUFDbEQsNEJBQUEsRUFBQSxnQkFBa0M7UUFIdEMsaUJBaUdDO1FBNUZHLFdBQVcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxXQUFXLENBQUMsR0FBRyxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzRSxX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LENBQUM7WUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7SUFNRCxzQkFBSSx3Q0FBYztRQUpsQjs7O1dBR0c7YUFDSCxVQUFtQixPQUF1QjtZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQWpORCxJQWlOQztBQWpOWSxvQ0FBWTtBQW1OekIsRUFBRSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8yLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IHtyYW5nZUNoYW5nZX0gZnJvbSAnLi9yYW5nZS1jaGFuZ2UnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxubGV0IG5tID0gcHJvdmlkZSgnZG9tVXRpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjYWxsYmFjayBtZWRpYUNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0bVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0bSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBsZXQgZCA9IG5ldyBEYXRlKHRtKTtcclxuICAgIGxldCBwMSA9IGQudG9Mb2NhbGVUaW1lU3RyaW5nKCkuc3BsaXQoJyAnKTtcclxuICAgIGxldCBwMiA9IHAxWzBdLnNwbGl0KCc6Jyk7XHJcbiAgICBwMiA9IHAyLnNsaWNlKDAsIDIpO1xyXG5cclxuICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygpICsgJzxicj4nICsgcDIuam9pbignOicpICsgJyAnICsgcDFbMV07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY2hhbmdlRnVuY3Rpb257XHJcbiAgICAobmV3VmFsPzogbnVtYmVyKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBtZWRpYVJhbmdlQ29uZmlne1xyXG4gICAgbWluPzogbnVtYmVyO1xyXG4gICAgbWF4PzogbnVtYmVyO1xyXG4gICAgdmFsPzogbnVtYmVyO1xyXG4gICAgc3RlcD86IG51bWJlcjtcclxuICAgIHBsYXlJbnRlcnZhbD86IG51bWJlcjtcclxuICAgIHNob3dBc0RhdGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUNvbnRyb2wge1xyXG4gICAgX2NvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgX21pbjogbnVtYmVyO1xyXG4gICAgX21heDogbnVtYmVyO1xyXG4gICAgX3BsYXlJbnRlcnZhbDogbnVtYmVyO1xyXG4gICAgX3N0ZXA6IG51bWJlcjtcclxuICAgIF9jdXJyZW50VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICBfcGxheWluZzogYm9vbGVhbjtcclxuXHJcbiAgICBfJGJ0blN0b3A6IEpRdWVyeTtcclxuICAgIF8kc2xpZGVyOiBKUXVlcnk7XHJcbiAgICBfJHZhbExhYmVsVmFsOiBKUXVlcnk7XHJcbiAgICBfJHZhbExhYmVsTWluOiBKUXVlcnk7XHJcbiAgICBfJHZhbExhYmVsTWF4OiBKUXVlcnk7XHJcbiAgICBfaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIF9zaG93QXNEYXRlOiBib29sZWFuO1xyXG5cclxuICAgIF9jaGFuZ2VGdW5jOiBjaGFuZ2VGdW5jdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIGNoYW5nZUZ1bmNcclxuICAgICAqIEBwYXJhbSBtZWRpYUNvbmZpZ1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBlbGVtZW50OiBKUXVlcnl8SFRNTEVsZW1lbnR8c3RyaW5nLFxyXG4gICAgICAgIGNoYW5nZUZ1bmM6IGNoYW5nZUZ1bmN0aW9uID0gKCk6IHZvaWQgPT4ge3JldHVybjt9LFxyXG4gICAgICAgIG1lZGlhQ29uZmlnOiBtZWRpYVJhbmdlQ29uZmlnID0ge30pIHtcclxuXHJcbiAgICAgICAgbWVkaWFDb25maWcubWluID0gdHlwZW9mIG1lZGlhQ29uZmlnLm1pbiA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLm1pbiA6IDA7XHJcbiAgICAgICAgbWVkaWFDb25maWcubWF4ID0gdHlwZW9mIG1lZGlhQ29uZmlnLm1heCA9PSAnbnVtYmVyJyA/IG1lZGlhQ29uZmlnLm1heCA6IDEwMDtcclxuICAgICAgICBtZWRpYUNvbmZpZy52YWwgPSB0eXBlb2YgbWVkaWFDb25maWcudmFsID09ICdudW1iZXInID8gbWVkaWFDb25maWcudmFsIDogMDtcclxuICAgICAgICBtZWRpYUNvbmZpZy5zdGVwID0gdHlwZW9mIG1lZGlhQ29uZmlnLnN0ZXAgPT0gJ251bWJlcicgPyBtZWRpYUNvbmZpZy5zdGVwIDogNTtcclxuICAgICAgICBtZWRpYUNvbmZpZy5wbGF5SW50ZXJ2YWwgPSB0eXBlb2YgbWVkaWFDb25maWcucGxheUludGVydmFsID09ICdudW1iZXInID8gbWVkaWFDb25maWcucGxheUludGVydmFsIDogNTAwO1xyXG4gICAgICAgIG1lZGlhQ29uZmlnLnNob3dBc0RhdGUgPSB0eXBlb2YgbWVkaWFDb25maWcuc2hvd0FzRGF0ZSA9PSAnYm9vbGVhbicgPyBtZWRpYUNvbmZpZy5zaG93QXNEYXRlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgIGVsZW1lbnQgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSAkKCcjJyArIGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZWxlbWVudFsnc3R5bGUnXSAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGVsZW1lbnQgYXMgSlF1ZXJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmFkZENsYXNzKCdtZWRpYS1jb250cm9sLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlJbnRlcnZhbCA9IG1lZGlhQ29uZmlnLnBsYXlJbnRlcnZhbDtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VGdW5jID0gY2hhbmdlRnVuYztcclxuXHJcbiAgICAgICAgdGhpcy5fc2hvd0FzRGF0ZSA9IG1lZGlhQ29uZmlnLnNob3dBc0RhdGU7XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9taW4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgaHRtbFN0ciA9XHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1lZGlhLXBsYXllci1idXR0b24gbWVkaWEtYmFja1wiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWVkaWEtcGxheWVyLWJ1dHRvbiBtZWRpYS1wbGF5XCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZWRpYS1wbGF5ZXItYnV0dG9uIG1lZGlhLXBhdXNlIG1lZGlhLWRpc2FibGVkXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZWRpYS1wbGF5ZXItYnV0dG9uIG1lZGlhLXN0b3AgbWVkaWEtZGlzYWJsZWRcIiA+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZWRpYS1wbGF5ZXItYnV0dG9uIG1lZGlhLWFoZWFkXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJyYW5nZVwiPmAgK1xyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtY29udGFpbmVyXCI+YCArXHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtbWluXCI+PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJtZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLXZhbFwiPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwibWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC1tYXhcIj48L3NwYW4+YCArXHJcbiAgICAgICAgICAgIGA8L2Rpdj5gO1xyXG5cclxuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kKGh0bWxTdHIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgYnRuUGF1c2UgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLXBhdXNlJyk7XHJcbiAgICAgICAgbGV0IGJ0blBsYXkgPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLXBsYXknKTtcclxuICAgICAgICB0aGlzLl8kYnRuU3RvcCA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtc3RvcCcpO1xyXG4gICAgICAgIGxldCBidG5BaGVhZCA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtYWhlYWQnKTtcclxuICAgICAgICBsZXQgYnRuQmFjayA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtYmFjaycpO1xyXG4gICAgICAgIHRoaXMuXyRzbGlkZXIgPSB0aGlzLl9jb250YWluZXIuZmluZCgnaW5wdXRbdHlwZT1yYW5nZV0nKTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHZhbExhYmVsTWluID0gdGhpcy5fY29udGFpbmVyLmZpbmQoJy5tZWRpYS1jb250cm9sLXZhbHVlLWxhYmVsLW1pbicpO1xyXG4gICAgICAgIHRoaXMuXyR2YWxMYWJlbFZhbCA9IHRoaXMuX2NvbnRhaW5lci5maW5kKCcubWVkaWEtY29udHJvbC12YWx1ZS1sYWJlbC12YWwnKTtcclxuICAgICAgICB0aGlzLl8kdmFsTGFiZWxNYXggPSB0aGlzLl9jb250YWluZXIuZmluZCgnLm1lZGlhLWNvbnRyb2wtdmFsdWUtbGFiZWwtbWF4Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TWluTWF4VmFsdWVTdGVwKG1lZGlhQ29uZmlnLm1pbiwgbWVkaWFDb25maWcubWF4LCBtZWRpYUNvbmZpZy52YWwsIG1lZGlhQ29uZmlnLnN0ZXApO1xyXG5cclxuICAgICAgICByYW5nZUNoYW5nZSh0aGlzLl8kc2xpZGVyLChuZXdWYWwpID0+IHsgdGhpcy5jdXJyZW50VmFsdWUgPSBuZXdWYWw7fSwgMTAwKTtcclxuXHJcbiAgICAgICAgbGV0IF9fX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBidG5QbGF5LmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ21lZGlhLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuXyRidG5TdG9wLnJlbW92ZUNsYXNzKCdtZWRpYS1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICBidG5BaGVhZC5hZGRDbGFzcygnbWVkaWEtbG9ja2VkJyk7XHJcbiAgICAgICAgICAgIGJ0bkJhY2suYWRkQ2xhc3MoJ21lZGlhLWxvY2tlZCcpO1xyXG4gICAgICAgICAgICBfX190aGlzLl8kc2xpZGVyLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuX3BsYXlpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgX19fdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfX190aGlzLmN1cnJlbnRWYWx1ZSArPSBfX190aGlzLl9zdGVwO1xyXG4gICAgICAgICAgICB9LCBfX190aGlzLl9wbGF5SW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl8kYnRuU3RvcC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX19fdGhpcy5faW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnbWVkaWEtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgYnRuUGxheS5yZW1vdmVDbGFzcygnbWVkaWEtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgYnRuQWhlYWQucmVtb3ZlQ2xhc3MoJ21lZGlhLWxvY2tlZCcpO1xyXG4gICAgICAgICAgICBidG5CYWNrLnJlbW92ZUNsYXNzKCdtZWRpYS1sb2NrZWQnKTtcclxuICAgICAgICAgICAgX19fdGhpcy5fJHNsaWRlci5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgX19fdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidG5BaGVhZC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9fX3RoaXMuY3VycmVudFZhbHVlID0gX19fdGhpcy5jdXJyZW50VmFsdWUgKyBfX190aGlzLl9zdGVwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidG5CYWNrLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX19fdGhpcy5jdXJyZW50VmFsdWUgPSBfX190aGlzLmN1cnJlbnRWYWx1ZSAtIF9fX3RoaXMuX3N0ZXA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFBsYXlpbmcoKXtcclxuICAgICAgICBpZiAodGhpcy5fcGxheWluZyl7XHJcbiAgICAgICAgICAgIHRoaXMuXyRidG5TdG9wLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5aW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RlcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3VycmVudFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGN1cnJlbnRWYWx1ZShuZXdWYWx1ZSkge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA+IHRoaXMuX21heCkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuX21pbjtcclxuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlIDwgdGhpcy5fbWluKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5fbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyLnZhbCh0aGlzLl9jdXJyZW50VmFsdWUudG9GaXhlZCgyKSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zaG93QXNEYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbFZhbC5odG1sKHRpbWVUb0xvY2FsRGF0ZVN0cmluZyh0aGlzLmN1cnJlbnRWYWx1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbFZhbC5odG1sKHRoaXMuY3VycmVudFZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRnVuYyhuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgbWluIGFuZCBtYXggdmFsdWUgd2l0aCBzdGVwXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3TWluIHRoZSBuZXcgbWluXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3TWF4IHRoZSBuZXcgbWFzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW25ld1ZhbHVlPW5ld01pbl0gdGhlIHZhbHVlIHRvIHNldFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtuZXdTdGVwPShuZXdNYXgtbmV3TWluKS8yMF0gc3RlcCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRNaW5NYXhWYWx1ZVN0ZXAobmV3TWluLCBuZXdNYXgsIG5ld1ZhbHVlLCBuZXdTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5fbWluID0gbmV3TWluO1xyXG4gICAgICAgIHRoaXMuX21heCA9IG5ld01heDtcclxuXHJcbiAgICAgICAgbmV3VmFsdWUgPSB0eXBlb2YgbmV3VmFsdWUgPT0gJ251bWJlcicgPyBuZXdWYWx1ZSA6IG5ld01pbjtcclxuICAgICAgICBuZXdTdGVwID0gdHlwZW9mIG5ld1N0ZXAgPT0gJ251bWJlcicgPyBuZXdTdGVwIDogKG5ld01heC1uZXdNaW4pLzIwO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLl9zdGVwID0gbmV3U3RlcDtcclxuXHJcbiAgICAgICAgdGhpcy5fJHNsaWRlci5wcm9wKCdtaW4nLCB0aGlzLm1pbi50b1N0cmluZygpKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyLnByb3AoJ21heCcsIHRoaXMubWF4LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHRoaXMuXyRzbGlkZXIucHJvcCgnc3RlcCcsIHRoaXMuc3RlcC50b1N0cmluZygpKTtcclxuICAgICAgICB0aGlzLl8kc2xpZGVyLnZhbCh0aGlzLmN1cnJlbnRWYWx1ZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dBc0RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fJHZhbExhYmVsTWluLmh0bWwodGltZVRvTG9jYWxEYXRlU3RyaW5nKHRoaXMuX21pbikpO1xyXG4gICAgICAgICAgICB0aGlzLl8kdmFsTGFiZWxWYWwuaHRtbCh0aW1lVG9Mb2NhbERhdGVTdHJpbmcodGhpcy5jdXJyZW50VmFsdWUpKTtcclxuICAgICAgICAgICAgdGhpcy5fJHZhbExhYmVsTWF4Lmh0bWwodGltZVRvTG9jYWxEYXRlU3RyaW5nKHRoaXMuX21heCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1pbi5odG1sKHRoaXMuX21pbi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5fJHZhbExhYmVsVmFsLmh0bWwodGhpcy5jdXJyZW50VmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyR2YWxMYWJlbE1heC5odG1sKHRoaXMuX21heC50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHttZWRpYUNhbGxiYWNrfSBuZXdGdW5jIHRoZSBjYWxsYmFjayBvbiBjaGFuZ2VcclxuICAgICAqL1xyXG4gICAgc2V0IGNoYW5nZUZ1bmN0aW9uKG5ld0Z1bmM6IGNoYW5nZUZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlRnVuYyA9IG5ld0Z1bmM7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLk1lZGlhQ29udHJvbCA9IE1lZGlhQ29udHJvbDtcclxuXHJcbiJdfQ==