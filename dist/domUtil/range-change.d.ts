/// <reference types="jquery" />
/// <reference types="jqueryui" />
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
export interface rangeChangedCallback {
    /**
     *
     * @param newValue new value of the slider
     * @param ratio ratio from low to high, 0 to 1
     * @param evt the original event
     */
    (newValue: number, ratio: number, evt: Event): any;
}
/**
 * Add a variety of listeners for range inputs applied to a common callback
 * @param  $slider - jquery reference to the slider
 * @param {rangeChangeCallback} callback - the callback
 * @param {number} [changeTimeout=75] before the callback is called
 * @this {jQuery}
 * @returns {jQuery} the jQuery object
 */
export declare function rangeChange($slider: JQuery, callback: rangeChangedCallback, changeTimeout: number): any;
