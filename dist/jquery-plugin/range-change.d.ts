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
export default undefined;
