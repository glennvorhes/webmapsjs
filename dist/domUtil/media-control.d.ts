/// <reference types="jquery" />
/// <reference types="jqueryui" />
export interface changeFunction {
    (newVal?: number): void;
}
export interface mediaRangeConfig {
    min?: number;
    max?: number;
    val?: number;
    step?: number;
    playInterval?: number;
    showAsDate?: boolean;
}
export declare class MediaControl {
    _container: JQuery;
    _min: number;
    _max: number;
    _playInterval: number;
    _step: number;
    _currentValue: number;
    _playing: boolean;
    _$btnStop: JQuery;
    _$slider: JQuery;
    _$valLabelVal: JQuery;
    _$valLabelMin: JQuery;
    _$valLabelMax: JQuery;
    _interval: number;
    _showAsDate: boolean;
    _changeFunc: changeFunction;
    /**
     *
     * @param element
     * @param changeFunc
     * @param mediaConfig
     */
    constructor(element: JQuery | HTMLElement | string, changeFunc?: changeFunction, mediaConfig?: mediaRangeConfig);
    stopPlaying(): void;
    readonly playing: boolean;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    currentValue: number;
    /**
     * set min and max value with step
     * @param {number} newMin the new min
     * @param {number} newMax the new mas
     * @param {number} [newValue=newMin] the value to set
     * @param {number} [newStep=(newMax-newMin)/20] step value
     */
    setMinMaxValueStep(newMin: any, newMax: any, newValue: any, newStep: any): void;
    /**
     *
     * @param {mediaCallback} newFunc the callback on change
     */
    changeFunction: changeFunction;
}
