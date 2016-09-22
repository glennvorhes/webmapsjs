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
export interface ChangeResponse {
    paramWeights: Object;
    region: string;
    mmVersion: string;
}
export interface ChangeCallback {
    (chg: ChangeResponse): any;
}
/**
 * class to keep track of the sliders
 */
export declare class TipSliders {
    $container: JQuery;
    reservedPercent: number;
    total: number;
    lockedCount: number;
    notLockedCount: number;
    private _sliderList;
    private _sliderLookup;
    private resetting;
    changedCallback: ChangeCallback;
    private _lockedList;
    private _inRangeList;
    private _atMinList;
    private _atMaxList;
    private _presetArray;
    private _presetLookup;
    private _$presetSelector;
    private _$regionSelector;
    private _$versionSelector;
    /**
     *
     * @param sliderConfigs
     * @param presetConfig
     * @param divId
     * @param presetSelectorId
     * @param regionSelectorId
     * @param versionSelectorId
     */
    constructor(sliderConfigs: Array<TipSliderConfig>, presetConfig: Array<TipPresetConfig>, divId: string, presetSelectorId: string, regionSelectorId: string, versionSelectorId: string, chgCallback?: ChangeCallback);
    _runChangedCallback(): void;
    setPresetValues(): void;
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
    paramWeightsRegionVersion: ChangeResponse;
}
export default TipSliders;