"use strict";
var provide_1 = require('../util/provide');
var nm = provide_1.default('domUtil');
var mouseIn = false;
var mouseDown = false;
var timeout = null;
var dragged = false;
var lastVal;
var $ = require('jquery');
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
//# sourceMappingURL=range-change.js.map