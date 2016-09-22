export interface TipSliderConfig {
    label: string;
    yearOptions: Array<{
        column: string;
        label: string;
    }>;
}
export interface TipPresetConfig {
    label: string;
    presets: Array<{
        column: string;
        value: number;
    }>;
}
/**
 * class to keep track of the sliders
 */
export declare class Sliders {
    $container: JQuery;
    reservedPercent: number;
    total: number;
    lockedCount: number;
    notLockedCount: number;
    private _sliderList;
    private _sliderLookup;
    resetting: boolean;
    private _lockedList;
    private _inRangeList;
    private _atMinList;
    private _atMaxList;
    _slideFinishedFunctions: Array<Function>;
    /**
     *
     * @param sliderConfigs
     * @param presetConfig
     * @param divId
     */
    constructor(sliderConfigs: Array<TipSliderConfig>, presetConfig: Array<TipPresetConfig>, divId: string);
    addSlideFinishedFunction(finishedFunction: any): void;
    /**
     * split array into subarrays holding the sliders
     * @private
     */
    _splitSliderArray(): void;
    /**
     * handle remainder, recursive to take care of min max overshoots
     * @param {number} remain the remainder
     * @param {string} skipDomId - this dom id
     * @private
     */
    _handleRemainder(remain: any, skipDomId: any): void;
    /**
     * reset all
     */
    reset(): void;
    /**
     *
     * @param {object} keyValList key and value list
     */
    setValues(keyValList: any): void;
    /**
     * get the weight sum
     * @returns {number} the weight sum
     */
    getSum(): number;
    /**
     * get the parameter weights
     * @returns {object} lookup with parameter weights
     */
    getParams(): {};
    _addEventListeners(): void;
}
export default Sliders;
