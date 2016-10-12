import provide from '../util/provide';
import $ = require('jquery');

const nm = provide('domUtil');

let mouseIn = false;
let mouseDown = false;
let timeout = null;
let dragged = false;
let lastVal;


/**
 * callback on range change interaction, context of this is the firing dom element
 * @callback rangeChangeCallback
 * @param {number} newValue
 * @param {number} ratio value from 0 to 1 relative of the value to the min and max
 * @param {object} evt
 */

/***
 * callback funcion after the slider has been moved
 */
export interface rangeChangedCallback{
    /**
     *
     * @param newValue new value of the slider
     * @param ratio ratio from low to high, 0 to 1
     * @param evt the original event
     */
    (newValue: number, ratio: number, evt: Event): any
}


/**
 * Created by gavorhes on 11/2/2015.
 */

function triggerCallback(callback: rangeChangedCallback, evt) {
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
 * Add a variety of listeners for range inputs applied to a common callback
 * @param  $slider - jquery reference to the slider
 * @param {rangeChangeCallback} callback - the callback
 * @param {number} [changeTimeout=75] before the callback is called
 * @this {jQuery}
 * @returns {jQuery} the jQuery object
 */
export function rangeChange ($slider: JQuery, callback: rangeChangedCallback, changeTimeout: number) {

    changeTimeout = typeof  changeTimeout == 'number' ? changeTimeout : 75;

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

        let _this = this;

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

nm.rangeChange = rangeChange;

