

import $ from '../jquery/jquery';
let mouseIn = false;
let mouseDown = false;
let timeout = null;
let dragged = false;
let lastVal;



/**
 * Created by gavorhes on 11/2/2015.
 */

function triggerCallback(callback, evt) {
    "use strict";

    let val = parseFloat(this.value);
    let min = parseFloat(this.min);
    let max = parseFloat(this.max);
    let step = parseFloat(this.step);

    if (max - val < step){
        val = max;
    }

    let percent =  (val - min) / (max - min);

    if (typeof lastVal == 'number' && val ==  lastVal){
        return;
    }
    lastVal = val;
    callback(val, percent, evt);
}

/**
 * callback on range change interaction, context of this is the firing dom element
 * @callback rangeChangeCallback
 * @param {number} newValue
 * @param {number} ratio value from 0 to 1 relative of the value to the min and max
 * @param {object} evt
 */

/**
 * Add a variety of listeners for range inputs applied to a common callback
 * @param {rangeChangeCallback} callback - the callback
 * @param {number} [changeTimeout=75] before the callback is called
 * @this {jQuery}
 * @returns {jQuery} the jQuery object
 */
$.fn.rangeChange = function (callback, changeTimeout) {

    changeTimeout = typeof  changeTimeout == 'number' ? changeTimeout : 75;

    this.mouseenter(function () {
        mouseIn = true;
    });

    this.mouseleave(function () {
        mouseIn = false;
        mouseDown = false;
    });

    this.mousedown(function () {
        mouseDown = true;
    });

    this.mouseup(function () {
        mouseDown = false;
    });

    this.mousemove(
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

        let _this = this;

        timeout = setTimeout(function () {
            triggerCallback.call(_this, callback, evt);
            timeout = null;

        }, changeTimeout);
    });

    this.keyup(
        /**
         *
         * @param {object} evt - event properties
         */
        function (evt) {
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            triggerCallback.call(this, callback, evt);
        }
    });

    this.change(function (evt) {
        if (dragged) {
            dragged = false;

            return;
        }
        triggerCallback.call(this, callback, evt);
    });

    return this;
};

export default undefined;
