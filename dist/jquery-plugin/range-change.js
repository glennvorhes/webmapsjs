"use strict";
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
 * @param {rangeChangeCallback} callback - the callback
 * @param {number} [changeTimeout=75] before the callback is called
 * @this {jQuery}
 * @returns {jQuery} the jQuery object
 */
$.fn.rangeChange = function (callback, changeTimeout) {
    changeTimeout = typeof changeTimeout == 'number' ? changeTimeout : 75;
    var _this = this;
    _this.mouseenter(function () {
        mouseIn = true;
    });
    _this.mouseleave(function () {
        mouseIn = false;
        mouseDown = false;
    });
    _this.mousedown(function () {
        mouseDown = true;
    });
    _this.mouseup(function () {
        mouseDown = false;
    });
    _this.mousemove(
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
    _this.keyup(
    /**
     *
     * @param {object} evt - event properties
     */
    function (evt) {
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            triggerCallback.call(this, callback, evt);
        }
    });
    _this.change(function (evt) {
        if (dragged) {
            dragged = false;
            return;
        }
        triggerCallback.call(this, callback, evt);
    });
    return this;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = undefined;
//# sourceMappingURL=range-change.js.map