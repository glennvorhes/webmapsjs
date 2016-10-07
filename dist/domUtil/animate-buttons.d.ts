/// <reference types="jquery" />
/// <reference types="node" />
/**
 * Created by gavorhes on 11/2/2015.
 */
import Timer = NodeJS.Timer;
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
    _interval: Timer;
    _showAsDate: boolean;
    _func: Function;
    constructor(element: JQuery | HTMLElement | string, min?: number, max?: number, val?: number, step?: number, func?: Function, playInterval?: number, showAsDate?: boolean);
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
    changeFunction: any;
}
