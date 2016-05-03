/**
 * Created by gavorhes on 12/10/2015.
 */
import provide from '../util/provide';
let nm = provide('collections');
import $ from '../jquery';

class _Slider {

    /**
     * Slider constructor
     * @param {string} name - the slider name
     * @param {Array} selections - the selection
     * @param {number} wgt - weight
     * @param {boolean} selected - if selected
     */
    constructor(name, selections, wgt, selected) {
        //let _this = this;
        this.name = name;
        this.domId = name.toLowerCase().replace(/ /g, '-');
        this._weight = wgt;
        this._weightDefault = this._weight;

        this.selectedParam = null;
        this.selectedParamDefault = null;

        this._locked = false;

        this._min = 0.0;
        this._max = 100;

        this.labelLow = null;
        this.labelHigh = null;
        this.labelVal = null;
        this.slider = null;
        this.chk = null;

        this.atMin = this._weight == this._min;
        this.atMax = this._weight == this._max;


        let sel = `<select class="${selections.length == 1 ? 'hidden-select' : 'show-select'}" id="${this.domId}_chg">`;
        for (let i = 0; i < selections.length; i++) {
            let itm = selections[i][0];
            let itmSelected = itm === selected;

            sel += `<option value="${itm}" ${itmSelected ? ' selected="selected"' : ''}>${selections[i][1]}</option>`;
            if (itmSelected) {
                this.selectedParam = itm;
            }
        }
        sel += '</select>';

        this.selectedParamDefault = this.selectedParam;

        this.html = '<div class="slider-div">' +
            `<label for="${this.domId}_chk" class="slider-label">${this.name}</label>` +
            sel + `<br>` +
            `<input id="${this.domId}_chk" type="checkbox" title="Lock/Unlock Slider">` +
            `<label id="${this.domId}_low" class="low-high">${this._min.toFixed(1)}</label>` +
            `<input id="${this.domId}" type="range" value="${this._weight.toFixed(1)}" min="0" max="100" step="0.1">` +
            `<label id="${this.domId}_high" class="low-high">${this._max.toFixed(1)}</label>` +
            `<label id="${this.domId}_lbl" for="${this.domId}" class="percent-label">${this._weight.toFixed(1)}%</label></div>`;
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
     * reset to the original values
     */
    reset() {
        this.weight = this._weightDefault;
        this.slider.val(this._weightDefault.toFixed(1));
        this.selectionBox.val(this.selectedParamDefault);
        this.chk.attr('checked', false);
        //let event = new CustomEvent('change');
        //this.chk[0].dispatchEvent(event);
    }

    /**
     * set the value and drop down
     * @param {number} newVal the new value
     * @param {string} selectedParam the selected parameter
     */
    setValAndDropDown(newVal, selectedParam) {
        this.weight = newVal;
        this.min = 0;
        this.max = 100;
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
 * class to make a slider group
 */
class Sliders {
    /**
     *
     * @param {Array} paramList list of parameters
     * @param {string} divId the div id
     */
    constructor(paramList, divId) {
        this.resetting = false;
        this._slideFinishedFunctions = [];
        this.reservedPercent = 0.0;
        this.$container = $('#' + divId);
        this.$container.addClass('slider-container');

        this.sliderList = [];
        this.sliderLookup = {};

        this.total = 0;

        for (let i = 0; i < paramList.length; i++) {
            let p = paramList[i];

            let sld = new _Slider(p[0], p[1], p[2], p[3]);
            this.sliderList.push(sld);
            this.sliderLookup[sld.domId] = sld;
            sld.addToDom(this.$container);
            this.total += sld._weight;
        }

        if (this.total != 100) {
            alert('total not equal to 100');
        }

        this.lockedList = [];
        this.inRangeList = [];
        this.atMinList = [];
        this.atMaxList = [];

        this.lockedCount = 0;
        this.notLockedCount = 0;

        this._splitSliderArray();
        this._addEventListeners();

    }
    
    addSlideFinishedFunction (finishedFunction){
        this._slideFinishedFunctions.push(finishedFunction);
    }

    /**
     * split array into subarrays holding the sliders
     * @private
     */
    _splitSliderArray() {
        this.lockedList = [];
        this.inRangeList = [];
        this.atMinList = [];
        this.atMaxList = [];

        for (let i = 0; i < this.sliderList.length; i++) {
            let sld = this.sliderList[i];

            if (sld.locked) {
                this.lockedList.push(sld);
            } else if (sld.atMin) {
                this.atMinList.push(sld);
            } else if (sld.atMax) {
                this.atMaxList.push(sld);
            } else {
                this.inRangeList.push(sld);
            }
        }
        this.lockedCount = this.lockedList.length;
        this.notLockedCount = this.sliderList.length - this.lockedCount;
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
        for (let i = 0; i < this.inRangeList.length; i++) {
            let sld = this.inRangeList[i];
            if (sld.domId == skipDomId) {
                continue;
            }
            canChangeArray.push(sld);
        }

        if (remain > 0) {
            for (let i = 0; i < this.atMaxList.length; i++) {
                let sld = this.atMaxList[i];
                if (sld.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(sld);
            }
        } else {
            for (let i = 0; i < this.atMinList.length; i++) {
                let sld = this.atMinList[i];
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
     * reset all
     */
    reset() {
        this.resetting = true;
        for (let i = 0; i < this.sliderList.length; i++) {
            let sld = this.sliderList[i];
            sld.reset();
        }
        this.resetting = false;

        if (this._slideFinishedFunctions != null) {
            this._slideFinishedFunctions();
        }
    }

    /**
     *
     * @param {object} keyValList key and value list
     */
    setValues(keyValList) {
        this.resetting = true;
        for (let k in keyValList) {
            if (keyValList.hasOwnProperty(k)) {
                this.sliderLookup[k].setValAndDropDown(keyValList[k][0], keyValList[k][1]);
            }
        }
        this.resetting = false;
    }

    /**
     * get the weight sum
     * @returns {number} the weight sum
     */
    getSum () {
        let total = 0;
        for (let i = 0; i < this.sliderList.length; i++) {
            let sld = this.sliderList[i];
            total += Number(sld.weight.toFixed(1));
        }

        return total;
    }

    /**
     * get the parameter weights
     * @returns {object} lookup with parameter weights
     */
    getParams  () {
        let paramWeights = {};
        for (let i = 0; i < this.sliderList.length; i++) {
            let sld = this.sliderList[i];
            paramWeights[sld.selectedParam] = Number(sld.weight.toFixed(1));
        }

        return paramWeights;
    }

    _addEventListeners() {
        let _this = this;

        //change function
        this.$container.find('input[type="range"]').change(function () {
                if (_this.resetting) {
                    return;
                }

                let $this = $(this);
                let domId = this.id;
                let sldr = _this.sliderLookup[domId];

                let newValue = parseFloat($this.val());

                let oldValue = sldr.weight;
                let diff = newValue - oldValue;
                diff = Number(diff.toFixed(1));

                sldr.weight = Number(newValue.toFixed(1));

                _this._handleRemainder(diff, domId);

                //cleanup, make sure the sum is still 100
                let sum = Number(_this.getSum().toFixed(1));

                if (sum > 100) {
                    loop1:
                        while (true) {
                            for (i = 0; i < _this.sliderList.length; i++) {
                                let sld = _this.sliderList[i];
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
                            for (i = 0; i < _this.sliderList.length; i++) {
                                sld = _this.sliderList[i];
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

                for (let i = 0; i < _this._slideFinishedFunctions.length; i++) {
                    _this._slideFinishedFunctions[i]();
                }
            }
        );

        //update the selected parameter when the selection is changed
        $('.show-select').change(function () {
            if (_this.resetting) {
                return;
            }
            _this.sliderLookup[this.id.replace('_chg', '')].selectedParam = $(this).val();
        });

        //lock the slider and update the reserved percent
        this.$container.find('input[type="checkbox"]').change(function () {
            let domEl = this;

            _this.sliderLookup[domEl.id.replace('_chk', '')].locked = !domEl.checked;
            _this.reservedPercent = 0.0;
            _this.notLockedCount = 0;

            let notLockedSliders = [];

            for (let i = 0; i < _this.sliderList.length; i++) {
                let sld = _this.sliderList[i];
                if (sld.locked) {
                    _this.reservedPercent += sld.weight;
                    continue;
                }
                notLockedSliders.push(sld);
                _this.notLockedCount++;
            }

            for (i = 0; i < _this.sliderList.length; i++) {
                sld = _this.sliderList[i];
                if (sld.locked) {
                    continue;
                }
                sld.max = 100 - _this.reservedPercent;
            }

            if (notLockedSliders.length == 1) {
                notLockedSliders[0].min = notLockedSliders[0].weight;
            } else {
                for (i = 0; i < notLockedSliders.length; i++) {
                    notLockedSliders[i].min = 0;
                }
            }
        });

    }
}

nm.Sliders = Sliders;
window.gv['collections'].Sliders = Sliders;
export default Sliders;
