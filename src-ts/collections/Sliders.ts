/**
 * Created by gavorhes on 12/10/2015.
 */


import provide from '../util/provide';
let nm = provide('collections');
const $ = require('jquery');

export interface TipSliderConfig {
    label: string;
    yearOptions: Array<{column: string, label: string}>
}

export interface TipPresetConfig {
    label: string;
    presets: Array<{column: string, value: number}>
}

export interface ChangeResponse{
    paramWeights: Object;
    region: string;
    mmVersion: string;
}

export interface ChangeCallback{
    (chg: ChangeResponse): any
}


class TipPresets implements TipPresetConfig {
    label: string;
    presets: Array<{column: string, value: number}>;
    domId: string;

    constructor(conf: TipPresetConfig) {
        this.label = conf.label;
        this.presets = conf.presets;
        this.domId = this.label.replace(/ /g, '').toLowerCase()
    }
}


class _Slider {
    _min: number;
    _max: number;
    _locked: boolean;
    atMin: boolean;
    atMax: boolean;
    _weightDefault: number;
    _weight: number;
    html: string;
    domId: string;
    name: string;

    labelLow: JQuery;
    labelHigh: JQuery;
    labelVal: JQuery;
    slider: JQuery;
    selectionBox: JQuery;
    chk: JQuery;

    selectedParam: any;
    selectedParamDefault: any;
    _dropdownSelection: string;

    /**
     * Slider constructor
     * @param sliderConfig - the configuration

     */
    constructor(sliderConfig: TipSliderConfig) {
        //let _this = this;
        this._dropdownSelection = null;
        this._weight = null;
        this.name = sliderConfig.label;
        this.domId = this.name.toLowerCase().replace(/ /g, '-');

        this._locked = false;

        this._min = 0.0;
        this._max = 100;

        this.labelLow = null;
        this.labelHigh = null;
        this.labelVal = null;
        this.slider = null;
        this.chk = null;

        this.atMin = false;
        this.atMax = false;


        let sel = `<select class="${sliderConfig.yearOptions.length == 1 ? 'hidden-select' : 'show-select'}" id="${this.domId}_chg">`;

        for (let i = 0; i < sliderConfig.yearOptions.length; i++) {
            let itm = sliderConfig.yearOptions[i];
            sel += `<option value="${itm.column}">${itm.label}</option>`;
        }
        sel += '</select>';

        this.selectedParamDefault = this.selectedParam;

        this.html = '<div class="slider-div">' +
            `<label for="${this.domId}_chk" class="slider-label">${this.name}</label>` +
            sel + `<br>` +
            `<input id="${this.domId}_chk" type="checkbox" title="Lock/Unlock Slider">` +
            `<label id="${this.domId}_low" class="low-high"></label>` +
            `<input id="${this.domId}" type="range" value="50" min="0" max="100" step="0.1">` +
            `<label id="${this.domId}_high" class="low-high"></label>` +
            `<label id="${this.domId}_lbl" for="${this.domId}" class="percent-label"></label></div>`;
    }

    /**
     * add html to dom
     * @param {jQuery} $container - container element
     */
    addToDom($container) {
        $container.append(this.html);
        this.labelLow = $(`#${this.domId}_low`);
        this.labelHigh = $(`#${this.domId}_high`);
        this.labelVal = $(`#${this.domId}_lbl`);
        this.slider = $(`#${this.domId}`);
        this.selectionBox = $(`#${this.domId}_chg`);
        this.chk = $(`#${this.domId}_chk`);
    }

    /**
     * increment the slider
     * @param {number} delta change delta
     * @returns {number} the remainder not able to be allocated to this slider
     */
    increment(delta) {
        let remainder = 0;
        delta = Number(delta.toFixed(1));

        this._weight += delta;
        if (this._weight < this._min) {
            remainder = this._min - this._weight;
            this._weight = this._min;
            this.atMin = true;
        } else if (this._weight > this._max) {
            remainder = this._max - this._weight;
            this._weight = this._max;
            this.atMax = true;
        } else {
            this.atMin = false;
            this.atMax = false;
        }

        this.slider.val(this._weight.toFixed(1));
        this.labelVal.html(this._weight.toFixed(1) + '%');

        return remainder;
    }

    /**
     * set the value and drop down
     * @param {number} newVal the new value
     * @param {string} selectedParam the selected parameter
     */
    setValAndDropDown(newVal: number, selectedParam: string) {
        this.min = 0;
        this.max = 100;
        this.weight = newVal;
        this.slider.val(newVal.toFixed(1));
        this.selectionBox.val(selectedParam);
        this.selectedParam = selectedParam;
        this.locked = true;
    }

    /**
     *
     * @returns {boolean} if locked
     */
    get locked() {
        return this._locked;
    }

    /**
     *
     * @param {boolean} val if locked
     */
    set locked(val) {
        this._locked = val;
        this.slider.prop('disabled', this._locked);
        this.selectionBox.prop('disabled', this._locked);
        this.chk.prop('checked', !this._locked);
    }

    /**
     *
     * @returns {number} the minimum
     */
    get min() {
        return this._min;
    }

    /**
     *
     * @param {number} newVal new minimum
     */
    set min(newVal) {
        this._min = Number(newVal.toFixed(1));
        if (this._min < 0) {
            this._min = 0;
        }
        this.labelLow.html(this._min.toFixed(1));
        this.slider.attr('min', this._min.toFixed(1));
        this.atMin = this._weight == this._min;
    }

    /**
     *
     * @returns {number} the maximum
     */
    get max() {
        return this._max;
    }

    /**
     *
     * @param {number} newVal the maximum
     */
    set max(newVal) {
        this._max = Number(newVal.toFixed(1));
        if (this._max > 100) {
            this._max = 100.0;
        }
        this.labelHigh.html(this._max.toFixed(1));
        this.slider.attr('max', this._max.toFixed(1));
        this.atMax = this._weight == this._max;
    }

    /**
     *
     * @returns {number} the weight
     */
    get weight() {
        return this._weight;
    }

    /**
     *
     * @param {number} newVal the weight
     */
    set weight(newVal) {
        this._weight = Number(newVal.toFixed(1));
        this.labelVal.html(this._weight.toFixed(1) + '%');
        if (this._weight <= this._min) {
            this.atMin = true;
            this.atMax = false;
        } else if (this._weight >= this._max) {
            this.atMin = false;
            this.atMax = true;
        } else {
            this.atMin = false;
            this.atMax = false;
        }
    }
}

nm._Slider = _Slider;


/**
 * class to keep track of the sliders
 */
export class TipSliders {
    $container: JQuery;
    reservedPercent: number;
    total: number;
    lockedCount: number;
    notLockedCount: number;
    private _sliderList: Array<_Slider>;
    private _sliderLookup: {[s: string]: _Slider};
    private resetting: boolean;
    private _changedCallback: ChangeCallback;

    private _lockedList: Array<_Slider>;
    private _inRangeList: Array<_Slider>;
    private _atMinList: Array<_Slider>;
    private _atMaxList: Array<_Slider>;

    private _presetArray: Array<TipPresets>;
    private _presetLookup: {[s: string]: TipPresets};

    private _$presetSelector: JQuery;
    private _$regionSelector: JQuery;
    private _$versionSelector: JQuery;

    /**
     *
     * @param sliderConfigs
     * @param presetConfig
     * @param divId
     * @param presetSelectorId
     * @param regionSelectorId
     * @param versionSelectorId
     * @param chgCallback
     */
    constructor(sliderConfigs: Array<TipSliderConfig>, presetConfig: Array<TipPresetConfig>,
                divId: string, presetSelectorId: string, regionSelectorId: string, versionSelectorId: string,
                chgCallback?: ChangeCallback) {
        this.resetting = false;
        this.reservedPercent = 0.0;
        this.$container = $('#' + divId);
        this.$container.addClass('slider-container');

        this._changedCallback = typeof chgCallback == 'function' ? chgCallback : () => {};

        this._$presetSelector = $('#' + presetSelectorId);
        this._$regionSelector = $('#' + regionSelectorId);
        this._$versionSelector = $('#' + versionSelectorId);

        this._sliderList = [];
        this._sliderLookup = {};

        for (let i = 0; i < sliderConfigs.length; i++) {
            let sld = new _Slider(sliderConfigs[i]);
            this._sliderList.push(sld);
            this._sliderLookup[sld.domId] = sld;
            sld.addToDom(this.$container);
        }

        this._presetArray = [];
        this._presetLookup = {};

        for (let i = 0; i < presetConfig.length; i++) {
            let preset = new TipPresets(presetConfig[i]);

            let idx = (i + 1).toFixed();

            this._presetLookup[idx] = preset;
            this._presetArray.push(preset);
            this._$presetSelector.append(`<option value="${idx}">${preset.label}</option>`);
        }


        this._lockedList = [];
        this._inRangeList = [];
        this._atMinList = [];
        this._atMaxList = [];

        this.lockedCount = 10;
        this.notLockedCount = 0;

        this._splitSliderArray();


        this._$presetSelector.change(() => {
            this.setPresetValues();
            this._runChangedCallback();
        });

        this._$regionSelector.change(() => {
            this._runChangedCallback();
        });

        this._$versionSelector.change(() => {
            this._runChangedCallback();
        });

        this._$presetSelector.trigger('change');

        this._addEventListeners();
    }

    _runChangedCallback(){
        this._changedCallback(this.paramWeightsRegionVersion);
    }

    get changedCallback(): ChangeCallback{
        return this._changedCallback
    }

    set changedCallback(chg: ChangeCallback){
        this._changedCallback = chg;
        this._runChangedCallback();
    }

    setPresetValues() {
        let thePreset = this._presetLookup[this._$presetSelector.val()];

        for (let i = 0; i < thePreset.presets.length; i++) {
            let presetValues = thePreset.presets[i];
            let theSlider = this._sliderList[i];

            theSlider.locked = true;
            theSlider.setValAndDropDown(presetValues.value, presetValues.column);
        }
    }

    /**
     * split array into subarrays holding the sliders
     * @private
     */
    _splitSliderArray() {
        this._lockedList = [];
        this._inRangeList = [];
        this._atMinList = [];
        this._atMaxList = [];

        for (let i = 0; i < this._sliderList.length; i++) {
            let sld = this._sliderList[i];

            if (sld.locked) {
                this._lockedList.push(sld);
            } else if (sld.atMin) {
                this._atMinList.push(sld);
            } else if (sld.atMax) {
                this._atMaxList.push(sld);
            } else {
                this._inRangeList.push(sld);
            }
        }
        this.lockedCount = this._lockedList.length;
        this.notLockedCount = this._sliderList.length - this.lockedCount;
    }

    /**
     * handle remainder, recursive to take care of min max overshoots
     * @param {number} remain the remainder
     * @param {string} skipDomId - this dom id
     * @private
     */
    _handleRemainder(remain, skipDomId) {

        remain = Number(remain.toFixed(1));
        if (remain == 0) {
            return;
        }

        this._splitSliderArray();

        let canChangeArray = [];
        for (let i = 0; i < this._inRangeList.length; i++) {
            let sld = this._inRangeList[i];
            if (sld.domId == skipDomId) {
                continue;
            }
            canChangeArray.push(sld);
        }

        if (remain > 0) {
            for (let i = 0; i < this._atMaxList.length; i++) {
                let sld = this._atMaxList[i];
                if (sld.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(sld);
            }
        } else {
            for (let i = 0; i < this._atMinList.length; i++) {
                let sld = this._atMinList[i];
                if (sld.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(sld);
            }
        }

        if (canChangeArray.length == 0) {
            return;
        }

        let inc = -1 * Number((remain / canChangeArray.length).toFixed(1));

        let newRemainder = 0;
        for (let i = 0; i < canChangeArray.length; i++) {
            newRemainder += canChangeArray[i].increment(inc);
        }

        this._handleRemainder(newRemainder, skipDomId);
    }

    /**
     *
     * @param {object} keyValList key and value list
     */
    setValues(keyValList) {
        this.resetting = true;
        for (let k in keyValList) {
            if (keyValList.hasOwnProperty(k)) {
                this._sliderLookup[k].setValAndDropDown(keyValList[k][0], keyValList[k][1]);
            }
        }
        this.resetting = false;
    }

    /**
     * get the weight sum
     * @returns {number} the weight sum
     */
    getSum() {
        let total = 0;
        for (let i = 0; i < this._sliderList.length; i++) {
            let sld = this._sliderList[i];
            total += Number(sld.weight.toFixed(1));
        }

        return total;
    }

    /**
     * get the parameter weights
     * @returns {object} lookup with parameter weights
     */
    getParams() {
        let paramWeights = {};
        for (let i = 0; i < this._sliderList.length; i++) {
            let sld = this._sliderList[i];
            paramWeights[sld.selectedParam] = Number(sld.weight.toFixed(1));
        }

        return paramWeights;
    }

    _addEventListeners() {
        let ___this = this;


        //change function
        this.$container.find('input[type="range"]').change(function () {
                if (___this.resetting) {
                    return;
                }

                let $this = $(this);
                let domId = this['id'];
                let sldr = ___this._sliderLookup[domId];

                let newValue = parseFloat($this.val());

                let oldValue = sldr.weight;
                let diff = newValue - oldValue;
                diff = Number(diff.toFixed(1));

                sldr.weight = Number(newValue.toFixed(1));

                ___this._handleRemainder(diff, domId);

                //cleanup, make sure the sum is still 100
                let sum = Number(___this.getSum().toFixed(1));

                if (sum > 100) {
                    loop1:
                        while (true) {
                            for (let i = 0; i < ___this._sliderList.length; i++) {
                                let sld = ___this._sliderList[i];
                                if (sld.domId == domId || sld.locked || sld.atMin) {
                                    continue;
                                }
                                sld.increment(-0.1);
                                sum -= 0.1;
                                if (sum.toFixed(1) == '100.0') {
                                    break loop1;
                                }
                            }
                        }
                } else if (sum < 100) {
                    loop1:
                        while (true) {
                            for (let i = 0; i < ___this._sliderList.length; i++) {
                                let sld = ___this._sliderList[i];
                                if (sld.domId == domId || sld.locked || sld.atMax) {
                                    continue;
                                }
                                sld.increment(0.1);
                                sum += 0.1;
                                if (sum.toFixed(1) == '100.0') {
                                    break loop1;
                                }
                            }
                        }
                }

                ___this._$presetSelector.val('0');
                ___this._runChangedCallback();
            }
        );

        //update the selected parameter when the selection is changed
        $('.show-select').change(function () {
            if (___this.resetting) {
                return;
            }
            ___this._sliderLookup[this['id'].replace('_chg', '')].selectedParam = $(this).val();

            ___this._$presetSelector.val('0');

            ___this._runChangedCallback();

        });

        //lock the slider and update the reserved percent
        this.$container.find('input[type="checkbox"]').change(function () {
            let domEl = this;

            ___this._sliderLookup[domEl.id.replace('_chk', '')].locked = !domEl.checked;
            ___this.reservedPercent = 0.0;
            ___this.notLockedCount = 0;

            let notLockedSliders = [];

            for (let i = 0; i < ___this._sliderList.length; i++) {
                let sld = ___this._sliderList[i];
                if (sld.locked) {
                    ___this.reservedPercent += sld.weight;
                    continue;
                }
                notLockedSliders.push(sld);
                ___this.notLockedCount++;
            }

            for (let i = 0; i < ___this._sliderList.length; i++) {
                let sld = ___this._sliderList[i];
                if (sld.locked) {
                    continue;
                }
                sld.max = 100 - ___this.reservedPercent;
            }

            if (notLockedSliders.length == 1) {
                notLockedSliders[0].min = notLockedSliders[0].weight;
            } else {
                for (let i = 0; i < notLockedSliders.length; i++) {
                    notLockedSliders[i].min = 0;
                }
            }
        });

    }

    get paramWeightsRegionVersion(): ChangeResponse{
        return {paramWeights: this.getParams(),
            region: this._$regionSelector.val() as string, mmVersion: this._$versionSelector.val() as string}
    }
}

nm.Sliders = TipSliders;
export default TipSliders;
