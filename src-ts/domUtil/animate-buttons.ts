

import Timer = NodeJS.Timer;
/**
 * Created by gavorhes on 11/2/2015.
 */

const $ = require('jquery');
import provide from '../util/provide';
import {rangeChange} from './range-change';


let nm = provide('jQueryPlugin');

/**
 * @callback mediaCallback
 * @param {number} tm
 */

function timeToLocalDateString(tm) {
    "use strict";
    let d = new Date(tm);
    let p1 = d.toLocaleTimeString().split(' ');
    let p2 = p1[0].split(':');
    p2 = p2.slice(0, 2);

    return d.toLocaleDateString() + '<br>' + p2.join(':') + ' ' + p1[1];
}


export class MediaControl {
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

    constructor(element: JQuery|HTMLElement|string, min = 0, max = 100, val= 0, step = 5, func: Function = ()=>{}, playInterval = 5, showAsDate= false) {

        if (typeof  element == 'string'){
            this._container = $('#' + element);
        }
        else if (typeof element['style'] !== 'undefined'){
            this._container = $(element);
        } else {
            this._container = element as JQuery;
        }

        this._container.addClass('media-control-container');
        this._playInterval = playInterval;
        this._interval = undefined;
        this._func = func;

        this._showAsDate = showAsDate;

        this._currentValue = undefined;
        this._min = undefined;
        this._max = undefined;
        this._step = undefined;
        this._playing = false;

        let htmlStr =
            '<span class="media-player-button media-back"></span>' +
            '<span class="media-player-button media-play"></span>' +
            '<span class="media-player-button media-pause media-disabled"></span>' +
            '<span class="media-player-button media-stop media-disabled" ></span>' +
            '<span class="media-player-button media-ahead"></span>' +
            `<input type="range">` +
            `<div class="media-control-value-label-container">` +
            `<span class="media-control-value-label-min"></span>` +
            `<span class="media-control-value-label-val"></span>` +
            `<span class="media-control-value-label-max"></span>` +
            `</div>`;

        this._container.append(htmlStr);

        // let btnPause = this._container.find('.media-pause');
        let btnPlay = this._container.find('.media-play');
        this._$btnStop = this._container.find('.media-stop');
        let btnAhead = this._container.find('.media-ahead');
        let btnBack = this._container.find('.media-back');
        this._$slider = this._container.find('input[type=range]');

        this._$valLabelMin = this._container.find('.media-control-value-label-min');
        this._$valLabelVal = this._container.find('.media-control-value-label-val');
        this._$valLabelMax = this._container.find('.media-control-value-label-max');

        this.setMinMaxValueStep(min, max, val, step);

        rangeChange(this._$slider,(newVal) => { this.currentValue = newVal;}, 100);

        let ___this = this;

        btnPlay.click(function () {
            let $this = $(this);
            $this.addClass('media-disabled');
            ___this._$btnStop.removeClass('media-disabled');
            btnAhead.addClass('media-locked');
            btnBack.addClass('media-locked');
            ___this._$slider.prop('disabled', true);
            ___this._playing = true;

            ___this._interval = setInterval(function () {
                ___this.currentValue += ___this._step;
            }, ___this._playInterval);
        });

        this._$btnStop.click(function () {
            clearInterval(___this._interval);
            let $this = $(this);
            $this.addClass('media-disabled');
            btnPlay.removeClass('media-disabled');
            btnAhead.removeClass('media-locked');
            btnBack.removeClass('media-locked');
            ___this._$slider.prop('disabled', false);
            ___this._playing = false;
        });

        btnAhead.click(function () {
            ___this.currentValue = ___this.currentValue + ___this._step;
        });

        btnBack.click(function () {
            ___this.currentValue = ___this.currentValue - ___this._step;
        });
    }

    stopPlaying(){
        if (this._playing){
            this._$btnStop.trigger('click');
        }
    }

    get playing(){
        return this._playing;
    }

    get min() {
        return this._min;
    }

    get max() {
        return this._max;
    }

    get step() {
        return this._step;
    }

    get currentValue() {
        return this._currentValue;
    }

    set currentValue(newValue) {
        if (newValue > this._max) {
            newValue = this._min;
        } else if (newValue < this._min) {
            newValue = this._max;
        }
        this._currentValue = newValue;
        this._$slider.val(this._currentValue.toFixed(2));

        if (this._showAsDate) {
            this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
        } else {
            this._$valLabelVal.html(this.currentValue.toString());
        }

        this._func(newValue);
    }

    /**
     * set min and max value with step
     * @param {number} newMin the new min
     * @param {number} newMax the new mas
     * @param {number} [newValue=newMin] the value to set
     * @param {number} [newStep=(newMax-newMin)/20] step value
     */
    setMinMaxValueStep(newMin, newMax, newValue, newStep) {
        this._min = newMin;
        this._max = newMax;

        newValue = typeof newValue == 'number' ? newValue : newMin;
        newStep = typeof newStep == 'number' ? newStep : (newMax-newMin)/20;

        this._currentValue = newValue;
        this._step = newStep;

        this._$slider.prop('min', this.min.toString());
        this._$slider.prop('max', this.max.toString());
        this._$slider.prop('step', this.step.toString());
        this._$slider.val(this.currentValue.toString());

        if (this._showAsDate) {
            this._$valLabelMin.html(timeToLocalDateString(this._min));
            this._$valLabelVal.html(timeToLocalDateString(this.currentValue));
            this._$valLabelMax.html(timeToLocalDateString(this._max));
        } else {
            this._$valLabelMin.html(this._min.toString());
            this._$valLabelVal.html(this.currentValue.toString());
            this._$valLabelMax.html(this._max.toString());
        }
    }

    /**
     *
     * @param {mediaCallback} newFunc the callback on change
     */
    set changeFunction(newFunc) {
        this._func = newFunc;
    }
}

nm.MediaControl = MediaControl;
