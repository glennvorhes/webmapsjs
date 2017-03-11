/**
 * Created by gavorhes on 12/10/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var $ = require("jquery");
var nm = provide_1.default('collections');
var TipPresets = (function () {
    function TipPresets(conf) {
        this.label = conf.label;
        this.presets = conf.presets;
        this.domId = this.label.replace(/ /g, '').toLowerCase();
        var theSum = 0;
        for (var _i = 0, _a = this.presets; _i < _a.length; _i++) {
            var pr = _a[_i];
            theSum += pr.value;
        }
        if (theSum != 100) {
            throw 'preset sum does note equal 100';
        }
    }
    return TipPresets;
}());
var _Slider = (function () {
    /**
     * Slider constructor
     * @param sliderConfig - the configuration

     */
    function _Slider(sliderConfig) {
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
        var sel = "<select class=\"" + (sliderConfig.yearOptions.length == 1 ? 'hidden-select' : 'show-select') + "\" id=\"" + this.domId + "_chg\">";
        for (var i = 0; i < sliderConfig.yearOptions.length; i++) {
            var itm = sliderConfig.yearOptions[i];
            sel += "<option value=\"" + itm.column + "\">" + itm.label + "</option>";
        }
        sel += '</select>';
        this.selectedParamDefault = this.selectedParam;
        this.html = '<div class="slider-div">' +
            ("<label for=\"" + this.domId + "_chk\" class=\"slider-label\">" + this.name + "</label>") +
            sel + "<br>" +
            ("<input id=\"" + this.domId + "_chk\" type=\"checkbox\" title=\"Lock/Unlock Slider\">") +
            ("<label id=\"" + this.domId + "_low\" class=\"low-high\"></label>") +
            ("<input id=\"" + this.domId + "\" type=\"range\" value=\"50\" min=\"0\" max=\"100\" step=\"0.1\">") +
            ("<label id=\"" + this.domId + "_high\" class=\"low-high\"></label>") +
            ("<label id=\"" + this.domId + "_lbl\" for=\"" + this.domId + "\" class=\"percent-label\"></label></div>");
    }
    /**
     * add html to dom
     * @param {jQuery} $container - container element
     */
    _Slider.prototype.addToDom = function ($container) {
        $container.append(this.html);
        this.labelLow = $("#" + this.domId + "_low");
        this.labelHigh = $("#" + this.domId + "_high");
        this.labelVal = $("#" + this.domId + "_lbl");
        this.slider = $("#" + this.domId);
        this.selectionBox = $("#" + this.domId + "_chg");
        this.chk = $("#" + this.domId + "_chk");
    };
    /**
     * increment the slider
     * @param {number} delta change delta
     * @returns {number} the remainder not able to be allocated to this slider
     */
    _Slider.prototype.increment = function (delta) {
        var remainder = 0;
        delta = Number(delta.toFixed(1));
        this._weight += delta;
        if (this._weight < this._min) {
            remainder = this._min - this._weight;
            this._weight = this._min;
            this.atMin = true;
        }
        else if (this._weight > this._max) {
            remainder = this._max - this._weight;
            this._weight = this._max;
            this.atMax = true;
        }
        else {
            this.atMin = false;
            this.atMax = false;
        }
        this.slider.val(this._weight.toFixed(1));
        this.labelVal.html(this._weight.toFixed(1) + '%');
        return remainder;
    };
    /**
     * set the value and drop down
     * @param {number} newVal the new value
     * @param {string} selectedParam the selected parameter
     */
    _Slider.prototype.setValAndDropDown = function (newVal, selectedParam) {
        this.min = 0;
        this.max = 100;
        this.weight = newVal;
        this.slider.val(newVal.toFixed(1));
        this.selectionBox.val(selectedParam);
        this.selectedParam = selectedParam;
        this.locked = true;
    };
    Object.defineProperty(_Slider.prototype, "locked", {
        /**
         *
         * @returns {boolean} if locked
         */
        get: function () {
            return this._locked;
        },
        /**
         *
         * @param {boolean} val if locked
         */
        set: function (val) {
            this._locked = val;
            this.slider.prop('disabled', this._locked);
            this.selectionBox.prop('disabled', this._locked);
            this.chk.prop('checked', !this._locked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Slider.prototype, "min", {
        /**
         *
         * @returns {number} the minimum
         */
        get: function () {
            return this._min;
        },
        /**
         *
         * @param {number} newVal new minimum
         */
        set: function (newVal) {
            this._min = Number(newVal.toFixed(1));
            if (this._min < 0) {
                this._min = 0;
            }
            this.labelLow.html(this._min.toFixed(1));
            this.slider.attr('min', this._min.toFixed(1));
            this.atMin = this._weight == this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Slider.prototype, "max", {
        /**
         *
         * @returns {number} the maximum
         */
        get: function () {
            return this._max;
        },
        /**
         *
         * @param {number} newVal the maximum
         */
        set: function (newVal) {
            this._max = Number(newVal.toFixed(1));
            if (this._max > 100) {
                this._max = 100.0;
            }
            this.labelHigh.html(this._max.toFixed(1));
            this.slider.attr('max', this._max.toFixed(1));
            this.atMax = this._weight == this._max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Slider.prototype, "weight", {
        /**
         *
         * @returns {number} the weight
         */
        get: function () {
            return this._weight;
        },
        /**
         *
         * @param {number} newVal the weight
         */
        set: function (newVal) {
            this._weight = Number(newVal.toFixed(1));
            this.labelVal.html(this._weight.toFixed(1) + '%');
            if (this._weight <= this._min) {
                this.atMin = true;
                this.atMax = false;
            }
            else if (this._weight >= this._max) {
                this.atMin = false;
                this.atMax = true;
            }
            else {
                this.atMin = false;
                this.atMax = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return _Slider;
}());
nm._Slider = _Slider;
/**
 * class to keep track of the sliders
 */
var TipSliders = (function () {
    /**
     *
     * @param sliderConfigs
     * @param presetConfig
     * @param divId
     * @param presetSelector
     * @param regionSelector
     * @param versionSelector
     * @param chgCallback
     */
    function TipSliders(sliderConfigs, presetConfig, divId, presetSelector, regionSelector, versionSelector, chgCallback) {
        var _this = this;
        this.resetting = false;
        this.reservedPercent = 0.0;
        this.$container = $('#' + divId);
        this.$container.addClass('slider-container');
        this._changedCallback = typeof chgCallback == 'function' ? chgCallback : function () { };
        this._$presetSelector = presetSelector;
        this._$regionSelector = regionSelector;
        this._$versionSelector = versionSelector;
        this._sliderList = [];
        this._sliderLookup = {};
        for (var i = 0; i < sliderConfigs.length; i++) {
            var sld = new _Slider(sliderConfigs[i]);
            this._sliderList.push(sld);
            this._sliderLookup[sld.domId] = sld;
            sld.addToDom(this.$container);
        }
        this._presetArray = [];
        this._presetLookup = {};
        for (var i = 0; i < presetConfig.length; i++) {
            var preset = new TipPresets(presetConfig[i]);
            var idx = (i + 1).toFixed();
            this._presetLookup[idx] = preset;
            this._presetArray.push(preset);
            this._$presetSelector.append("<option value=\"" + idx + "\">" + preset.label + "</option>");
        }
        this._lockedList = [];
        this._inRangeList = [];
        this._atMinList = [];
        this._atMaxList = [];
        this.lockedCount = 10;
        this.notLockedCount = 0;
        this._splitSliderArray();
        this._$presetSelector.change(function () {
            _this.setPresetValues();
            _this._runChangedCallback();
        });
        this._$regionSelector.change(function () {
            _this._runChangedCallback();
        });
        this._$versionSelector.change(function () {
            _this._runChangedCallback();
        });
        this._$presetSelector.trigger('change');
        this._addEventListeners();
    }
    TipSliders.prototype._runChangedCallback = function () {
        this._changedCallback(this.paramWeightsRegionVersion);
    };
    Object.defineProperty(TipSliders.prototype, "changedCallback", {
        get: function () {
            return this._changedCallback;
        },
        set: function (chg) {
            this._changedCallback = chg;
            this._runChangedCallback();
        },
        enumerable: true,
        configurable: true
    });
    TipSliders.prototype.setPresetValues = function () {
        var idx = this._$presetSelector.val() || '1';
        var thePreset = this._presetLookup[idx];
        for (var i = 0; i < thePreset.presets.length; i++) {
            var presetValues = thePreset.presets[i];
            var theSlider = this._sliderList[i];
            theSlider.locked = true;
            theSlider.setValAndDropDown(presetValues.value, presetValues.column);
        }
    };
    /**
     * split array into subarrays holding the sliders
     * @private
     */
    TipSliders.prototype._splitSliderArray = function () {
        this._lockedList = [];
        this._inRangeList = [];
        this._atMinList = [];
        this._atMaxList = [];
        for (var i = 0; i < this._sliderList.length; i++) {
            var sld = this._sliderList[i];
            if (sld.locked) {
                this._lockedList.push(sld);
            }
            else if (sld.atMin) {
                this._atMinList.push(sld);
            }
            else if (sld.atMax) {
                this._atMaxList.push(sld);
            }
            else {
                this._inRangeList.push(sld);
            }
        }
        this.lockedCount = this._lockedList.length;
        this.notLockedCount = this._sliderList.length - this.lockedCount;
    };
    /**
     * handle remainder, recursive to take care of min max overshoots
     * @param {number} remain the remainder
     * @param {string} skipDomId - this dom id
     * @private
     */
    TipSliders.prototype._handleRemainder = function (remain, skipDomId) {
        remain = Number(remain.toFixed(1));
        if (remain == 0) {
            return;
        }
        this._splitSliderArray();
        var canChangeArray = [];
        for (var i = 0; i < this._inRangeList.length; i++) {
            var sld = this._inRangeList[i];
            if (sld.domId == skipDomId) {
                continue;
            }
            canChangeArray.push(sld);
        }
        if (remain > 0) {
            for (var i = 0; i < this._atMaxList.length; i++) {
                var sld = this._atMaxList[i];
                if (sld.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(sld);
            }
        }
        else {
            for (var i = 0; i < this._atMinList.length; i++) {
                var sld = this._atMinList[i];
                if (sld.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(sld);
            }
        }
        if (canChangeArray.length == 0) {
            return;
        }
        var inc = -1 * Number((remain / canChangeArray.length).toFixed(1));
        var newRemainder = 0;
        for (var i = 0; i < canChangeArray.length; i++) {
            newRemainder += canChangeArray[i].increment(inc);
        }
        this._handleRemainder(newRemainder, skipDomId);
    };
    /**
     *
     * @param {object} keyValList key and value list
     */
    TipSliders.prototype.setValues = function (keyValList) {
        this.resetting = true;
        for (var k in keyValList) {
            if (keyValList.hasOwnProperty(k)) {
                this._sliderLookup[k].setValAndDropDown(keyValList[k][0], keyValList[k][1]);
            }
        }
        this.resetting = false;
    };
    /**
     * get the weight sum
     * @returns {number} the weight sum
     */
    TipSliders.prototype.getSum = function () {
        var total = 0;
        for (var i = 0; i < this._sliderList.length; i++) {
            var sld = this._sliderList[i];
            total += Number(sld.weight.toFixed(1));
        }
        return total;
    };
    /**
     * get the parameter weights
     * @returns {object} lookup with parameter weights
     */
    TipSliders.prototype.getParams = function () {
        var paramWeights = {};
        for (var i = 0; i < this._sliderList.length; i++) {
            var sld = this._sliderList[i];
            paramWeights[sld.selectedParam] = Number(sld.weight.toFixed(1));
        }
        return paramWeights;
    };
    TipSliders.prototype._addEventListeners = function () {
        var ___this = this;
        //change function
        this.$container.find('input[type="range"]').change(function () {
            if (___this.resetting) {
                return;
            }
            var $this = $(this);
            var domId = this['id'];
            var sldr = ___this._sliderLookup[domId];
            var newValue = parseFloat($this.val());
            var oldValue = sldr.weight;
            var diff = newValue - oldValue;
            diff = Number(diff.toFixed(1));
            sldr.weight = Number(newValue.toFixed(1));
            ___this._handleRemainder(diff, domId);
            //cleanup, make sure the sum is still 100
            var sum = Number(___this.getSum().toFixed(1));
            if (sum > 100) {
                loop1: while (true) {
                    for (var i = 0; i < ___this._sliderList.length; i++) {
                        var sld = ___this._sliderList[i];
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
            }
            else if (sum < 100) {
                loop1: while (true) {
                    for (var i = 0; i < ___this._sliderList.length; i++) {
                        var sld = ___this._sliderList[i];
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
        });
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
            var domEl = this;
            ___this._sliderLookup[domEl.id.replace('_chk', '')].locked = !domEl.checked;
            ___this.reservedPercent = 0.0;
            ___this.notLockedCount = 0;
            var notLockedSliders = [];
            for (var i = 0; i < ___this._sliderList.length; i++) {
                var sld = ___this._sliderList[i];
                if (sld.locked) {
                    ___this.reservedPercent += sld.weight;
                    continue;
                }
                notLockedSliders.push(sld);
                ___this.notLockedCount++;
            }
            for (var i = 0; i < ___this._sliderList.length; i++) {
                var sld = ___this._sliderList[i];
                if (sld.locked) {
                    continue;
                }
                sld.max = 100 - ___this.reservedPercent;
            }
            if (notLockedSliders.length == 1) {
                notLockedSliders[0].min = notLockedSliders[0].weight;
            }
            else {
                for (var i = 0; i < notLockedSliders.length; i++) {
                    notLockedSliders[i].min = 0;
                }
            }
        });
    };
    Object.defineProperty(TipSliders.prototype, "paramWeightsRegionVersion", {
        get: function () {
            return { paramWeights: this.getParams(),
                region: this._$regionSelector.val(), mmVersion: this._$versionSelector.val() };
        },
        enumerable: true,
        configurable: true
    });
    return TipSliders;
}());
exports.TipSliders = TipSliders;
nm.Sliders = TipSliders;
exports.default = TipSliders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xsZWN0aW9ucy9TbGlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7QUFFSCwyQ0FBc0M7QUFDdEMsMEJBQTZCO0FBRTdCLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUF1QmhDO0lBS0ksb0JBQVksSUFBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV4RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFZixHQUFHLENBQUMsQ0FBVyxVQUFZLEVBQVosS0FBQSxJQUFJLENBQUMsT0FBTyxFQUFaLGNBQVksRUFBWixJQUFZO1lBQXRCLElBQUksRUFBRSxTQUFBO1lBQ1AsTUFBTSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDdEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztZQUNmLE1BQU0sZ0NBQWdDLENBQUM7UUFDM0MsQ0FBQztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFHRDtJQXVCSTs7OztPQUlHO0lBQ0gsaUJBQVksWUFBNkI7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFB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Z0JBQ0QsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQy9DLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsc0JBQUksaURBQXlCO2FBQTdCO1lBQ0ksTUFBTSxDQUFDLEVBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQVksRUFBQyxDQUFBO1FBQ3pHLENBQUM7OztPQUFBO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBcFhELElBb1hDO0FBcFhZLGdDQUFVO0FBc1h2QixFQUFFLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztBQUN4QixrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi8xMC8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdjb2xsZWN0aW9ucycpO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUaXBTbGlkZXJDb25maWcge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHllYXJPcHRpb25zOiBBcnJheTx7Y29sdW1uOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmd9PlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRpcFByZXNldENvbmZpZyB7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgcHJlc2V0czogQXJyYXk8e2NvbHVtbjogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfT5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VSZXNwb25zZXtcclxuICAgIHBhcmFtV2VpZ2h0czogT2JqZWN0O1xyXG4gICAgcmVnaW9uOiBzdHJpbmc7XHJcbiAgICBtbVZlcnNpb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VDYWxsYmFja3tcclxuICAgIChjaGc6IENoYW5nZVJlc3BvbnNlKTogYW55XHJcbn1cclxuXHJcblxyXG5jbGFzcyBUaXBQcmVzZXRzIGltcGxlbWVudHMgVGlwUHJlc2V0Q29uZmlnIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBwcmVzZXRzOiBBcnJheTx7Y29sdW1uOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9PjtcclxuICAgIGRvbUlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZjogVGlwUHJlc2V0Q29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGNvbmYubGFiZWw7XHJcbiAgICAgICAgdGhpcy5wcmVzZXRzID0gY29uZi5wcmVzZXRzO1xyXG4gICAgICAgIHRoaXMuZG9tSWQgPSB0aGlzLmxhYmVsLnJlcGxhY2UoLyAvZywgJycpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGxldCB0aGVTdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwciBvZiB0aGlzLnByZXNldHMpe1xyXG4gICAgICAgICAgICB0aGVTdW0gKz0gcHIudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhlU3VtICE9IDEwMCl7XHJcbiAgICAgICAgICAgIHRocm93ICdwcmVzZXQgc3VtIGRvZXMgbm90ZSBlcXVhbCAxMDAnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIF9TbGlkZXIge1xyXG4gICAgX21pbjogbnVtYmVyO1xyXG4gICAgX21heDogbnVtYmVyO1xyXG4gICAgX2xvY2tlZDogYm9vbGVhbjtcclxuICAgIGF0TWluOiBib29sZWFuO1xyXG4gICAgYXRNYXg6IGJvb2xlYW47XHJcbiAgICBfd2VpZ2h0RGVmYXVsdDogbnVtYmVyO1xyXG4gICAgX3dlaWdodDogbnVtYmVyO1xyXG4gICAgaHRtbDogc3RyaW5nO1xyXG4gICAgZG9tSWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICBsYWJlbExvdzogSlF1ZXJ5O1xyXG4gICAgbGFiZWxIaWdoOiBKUXVlcnk7XHJcbiAgICBsYWJlbFZhbDogSlF1ZXJ5O1xyXG4gICAgc2xpZGVyOiBKUXVlcnk7XHJcbiAgICBzZWxlY3Rpb25Cb3g6IEpRdWVyeTtcclxuICAgIGNoazogSlF1ZXJ5O1xyXG5cclxuICAgIHNlbGVjdGVkUGFyYW06IGFueTtcclxuICAgIHNlbGVjdGVkUGFyYW1EZWZhdWx0OiBhbnk7XHJcbiAgICBfZHJvcGRvd25TZWxlY3Rpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNsaWRlciBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHNsaWRlckNvbmZpZyAtIHRoZSBjb25maWd1cmF0aW9uXHJcblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXJDb25maWc6IFRpcFNsaWRlckNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2Ryb3Bkb3duU2VsZWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl93ZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHNsaWRlckNvbmZpZy5sYWJlbDtcclxuICAgICAgICB0aGlzLmRvbUlkID0gdGhpcy5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLCAnLScpO1xyXG5cclxuICAgICAgICB0aGlzLl9sb2NrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWluID0gMC4wO1xyXG4gICAgICAgIHRoaXMuX21heCA9IDEwMDtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbExvdyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYWJlbEhpZ2ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFiZWxWYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoayA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuYXRNaW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF0TWF4ID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICBsZXQgc2VsID0gYDxzZWxlY3QgY2xhc3M9XCIke3NsaWRlckNvbmZpZy55ZWFyT3B0aW9ucy5sZW5ndGggPT0gMSA/ICdoaWRkZW4tc2VsZWN0JyA6ICdzaG93LXNlbGVjdCd9XCIgaWQ9XCIke3RoaXMuZG9tSWR9X2NoZ1wiPmA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVyQ29uZmlnLnllYXJPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdG0gPSBzbGlkZXJDb25maWcueWVhck9wdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHNlbCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7aXRtLmNvbHVtbn1cIj4ke2l0bS5sYWJlbH08L29wdGlvbj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWwgKz0gJzwvc2VsZWN0Pic7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYXJhbURlZmF1bHQgPSB0aGlzLnNlbGVjdGVkUGFyYW07XHJcblxyXG4gICAgICAgIHRoaXMuaHRtbCA9ICc8ZGl2IGNsYXNzPVwic2xpZGVyLWRpdlwiPicgK1xyXG4gICAgICAgICAgICBgPGxhYmVsIGZvcj1cIiR7dGhpcy5kb21JZH1fY2hrXCIgY2xhc3M9XCJzbGlkZXItbGFiZWxcIj4ke3RoaXMubmFtZX08L2xhYmVsPmAgK1xyXG4gICAgICAgICAgICBzZWwgKyBgPGJyPmAgK1xyXG4gICAgICAgICAgICBgPGlucHV0IGlkPVwiJHt0aGlzLmRvbUlkfV9jaGtcIiB0eXBlPVwiY2hlY2tib3hcIiB0aXRsZT1cIkxvY2svVW5sb2NrIFNsaWRlclwiPmAgK1xyXG4gICAgICAgICAgICBgPGxhYmVsIGlkPVwiJHt0aGlzLmRvbUlkfV9sb3dcIiBjbGFzcz1cImxvdy1oaWdoXCI+PC9sYWJlbD5gICtcclxuICAgICAgICAgICAgYDxpbnB1dCBpZD1cIiR7dGhpcy5kb21JZH1cIiB0eXBlPVwicmFuZ2VcIiB2YWx1ZT1cIjUwXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHN0ZXA9XCIwLjFcIj5gICtcclxuICAgICAgICAgICAgYDxsYWJlbCBpZD1cIiR7dGhpcy5kb21JZH1faGlnaFwiIGNsYXNzPVwibG93LWhpZ2hcIj48L2xhYmVsPmAgK1xyXG4gICAgICAgICAgICBgPGxhYmVsIGlkPVwiJHt0aGlzLmRvbUlkfV9sYmxcIiBmb3I9XCIke3RoaXMuZG9tSWR9XCIgY2xhc3M9XCJwZXJjZW50LWxhYmVsXCI+PC9sYWJlbD48L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGh0bWwgdG8gZG9tXHJcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gJGNvbnRhaW5lciAtIGNvbnRhaW5lciBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGFkZFRvRG9tKCRjb250YWluZXIpIHtcclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh0aGlzLmh0bWwpO1xyXG4gICAgICAgIHRoaXMubGFiZWxMb3cgPSAkKGAjJHt0aGlzLmRvbUlkfV9sb3dgKTtcclxuICAgICAgICB0aGlzLmxhYmVsSGlnaCA9ICQoYCMke3RoaXMuZG9tSWR9X2hpZ2hgKTtcclxuICAgICAgICB0aGlzLmxhYmVsVmFsID0gJChgIyR7dGhpcy5kb21JZH1fbGJsYCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSAkKGAjJHt0aGlzLmRvbUlkfWApO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQm94ID0gJChgIyR7dGhpcy5kb21JZH1fY2hnYCk7XHJcbiAgICAgICAgdGhpcy5jaGsgPSAkKGAjJHt0aGlzLmRvbUlkfV9jaGtgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluY3JlbWVudCB0aGUgc2xpZGVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGVsdGEgY2hhbmdlIGRlbHRhXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgcmVtYWluZGVyIG5vdCBhYmxlIHRvIGJlIGFsbG9jYXRlZCB0byB0aGlzIHNsaWRlclxyXG4gICAgICovXHJcbiAgICBpbmNyZW1lbnQoZGVsdGEpIHtcclxuICAgICAgICBsZXQgcmVtYWluZGVyID0gMDtcclxuICAgICAgICBkZWx0YSA9IE51bWJlcihkZWx0YS50b0ZpeGVkKDEpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fd2VpZ2h0ICs9IGRlbHRhO1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWlnaHQgPCB0aGlzLl9taW4pIHtcclxuICAgICAgICAgICAgcmVtYWluZGVyID0gdGhpcy5fbWluIC0gdGhpcy5fd2VpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB0aGlzLl9taW47XHJcbiAgICAgICAgICAgIHRoaXMuYXRNaW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2VpZ2h0ID4gdGhpcy5fbWF4KSB7XHJcbiAgICAgICAgICAgIHJlbWFpbmRlciA9IHRoaXMuX21heCAtIHRoaXMuX3dlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ID0gdGhpcy5fbWF4O1xyXG4gICAgICAgICAgICB0aGlzLmF0TWF4ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF0TWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNYXggPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyLnZhbCh0aGlzLl93ZWlnaHQudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbFZhbC5odG1sKHRoaXMuX3dlaWdodC50b0ZpeGVkKDEpICsgJyUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlbWFpbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgdmFsdWUgYW5kIGRyb3AgZG93blxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1ZhbCB0aGUgbmV3IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRQYXJhbSB0aGUgc2VsZWN0ZWQgcGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIHNldFZhbEFuZERyb3BEb3duKG5ld1ZhbDogbnVtYmVyLCBzZWxlY3RlZFBhcmFtOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm1pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXggPSAxMDA7XHJcbiAgICAgICAgdGhpcy53ZWlnaHQgPSBuZXdWYWw7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIudmFsKG5ld1ZhbC50b0ZpeGVkKDEpKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkJveC52YWwoc2VsZWN0ZWRQYXJhbSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhcmFtID0gc2VsZWN0ZWRQYXJhbTtcclxuICAgICAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIGxvY2tlZFxyXG4gICAgICovXHJcbiAgICBnZXQgbG9ja2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NrZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWwgaWYgbG9ja2VkXHJcbiAgICAgKi9cclxuICAgIHNldCBsb2NrZWQodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fbG9ja2VkID0gdmFsO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnByb3AoJ2Rpc2FibGVkJywgdGhpcy5fbG9ja2VkKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkJveC5wcm9wKCdkaXNhYmxlZCcsIHRoaXMuX2xvY2tlZCk7XHJcbiAgICAgICAgdGhpcy5jaGsucHJvcCgnY2hlY2tlZCcsICF0aGlzLl9sb2NrZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBtaW5pbXVtXHJcbiAgICAgKi9cclxuICAgIGdldCBtaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3VmFsIG5ldyBtaW5pbXVtXHJcbiAgICAgKi9cclxuICAgIHNldCBtaW4obmV3VmFsKSB7XHJcbiAgICAgICAgdGhpcy5fbWluID0gTnVtYmVyKG5ld1ZhbC50b0ZpeGVkKDEpKTtcclxuICAgICAgICBpZiAodGhpcy5fbWluIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9taW4gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYmVsTG93Lmh0bWwodGhpcy5fbWluLnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmF0dHIoJ21pbicsIHRoaXMuX21pbi50b0ZpeGVkKDEpKTtcclxuICAgICAgICB0aGlzLmF0TWluID0gdGhpcy5fd2VpZ2h0ID09IHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgbWF4aW11bVxyXG4gICAgICovXHJcbiAgICBnZXQgbWF4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1ZhbCB0aGUgbWF4aW11bVxyXG4gICAgICovXHJcbiAgICBzZXQgbWF4KG5ld1ZhbCkge1xyXG4gICAgICAgIHRoaXMuX21heCA9IE51bWJlcihuZXdWYWwudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21heCA+IDEwMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXggPSAxMDAuMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYWJlbEhpZ2guaHRtbCh0aGlzLl9tYXgudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuYXR0cignbWF4JywgdGhpcy5fbWF4LnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIHRoaXMuYXRNYXggPSB0aGlzLl93ZWlnaHQgPT0gdGhpcy5fbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSB3ZWlnaHRcclxuICAgICAqL1xyXG4gICAgZ2V0IHdlaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2VpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdWYWwgdGhlIHdlaWdodFxyXG4gICAgICovXHJcbiAgICBzZXQgd2VpZ2h0KG5ld1ZhbCkge1xyXG4gICAgICAgIHRoaXMuX3dlaWdodCA9IE51bWJlcihuZXdWYWwudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbFZhbC5odG1sKHRoaXMuX3dlaWdodC50b0ZpeGVkKDEpICsgJyUnKTtcclxuICAgICAgICBpZiAodGhpcy5fd2VpZ2h0IDw9IHRoaXMuX21pbikge1xyXG4gICAgICAgICAgICB0aGlzLmF0TWluID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdE1heCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2VpZ2h0ID49IHRoaXMuX21heCkge1xyXG4gICAgICAgICAgICB0aGlzLmF0TWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNYXggPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdE1heCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubm0uX1NsaWRlciA9IF9TbGlkZXI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGNsYXNzIHRvIGtlZXAgdHJhY2sgb2YgdGhlIHNsaWRlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaXBTbGlkZXJzIHtcclxuICAgICRjb250YWluZXI6IEpRdWVyeTtcclxuICAgIHJlc2VydmVkUGVyY2VudDogbnVtYmVyO1xyXG4gICAgbG9ja2VkQ291bnQ6IG51bWJlcjtcclxuICAgIG5vdExvY2tlZENvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9zbGlkZXJMaXN0OiBBcnJheTxfU2xpZGVyPjtcclxuICAgIHByaXZhdGUgX3NsaWRlckxvb2t1cDoge1tzOiBzdHJpbmddOiBfU2xpZGVyfTtcclxuICAgIHByaXZhdGUgcmVzZXR0aW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfY2hhbmdlZENhbGxiYWNrOiBDaGFuZ2VDYWxsYmFjaztcclxuXHJcbiAgICBwcml2YXRlIF9sb2NrZWRMaXN0OiBBcnJheTxfU2xpZGVyPjtcclxuICAgIHByaXZhdGUgX2luUmFuZ2VMaXN0OiBBcnJheTxfU2xpZGVyPjtcclxuICAgIHByaXZhdGUgX2F0TWluTGlzdDogQXJyYXk8X1NsaWRlcj47XHJcbiAgICBwcml2YXRlIF9hdE1heExpc3Q6IEFycmF5PF9TbGlkZXI+O1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXNldEFycmF5OiBBcnJheTxUaXBQcmVzZXRzPjtcclxuICAgIHByaXZhdGUgX3ByZXNldExvb2t1cDoge1tzOiBzdHJpbmddOiBUaXBQcmVzZXRzfTtcclxuXHJcbiAgICBwcml2YXRlIF8kcHJlc2V0U2VsZWN0b3I6IEpRdWVyeTtcclxuICAgIHByaXZhdGUgXyRyZWdpb25TZWxlY3RvcjogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBfJHZlcnNpb25TZWxlY3RvcjogSlF1ZXJ5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzbGlkZXJDb25maWdzXHJcbiAgICAgKiBAcGFyYW0gcHJlc2V0Q29uZmlnXHJcbiAgICAgKiBAcGFyYW0gZGl2SWRcclxuICAgICAqIEBwYXJhbSBwcmVzZXRTZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHJlZ2lvblNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gdmVyc2lvblNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gY2hnQ2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2xpZGVyQ29uZmlnczogQXJyYXk8VGlwU2xpZGVyQ29uZmlnPiwgcHJlc2V0Q29uZmlnOiBBcnJheTxUaXBQcmVzZXRDb25maWc+LFxyXG4gICAgICAgICAgICAgICAgZGl2SWQ6IHN0cmluZywgcHJlc2V0U2VsZWN0b3I6IEpRdWVyeSwgcmVnaW9uU2VsZWN0b3I6IEpRdWVyeSwgdmVyc2lvblNlbGVjdG9yOiBKUXVlcnksXHJcbiAgICAgICAgICAgICAgICBjaGdDYWxsYmFjaz86IENoYW5nZUNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXR0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlZFBlcmNlbnQgPSAwLjA7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJCgnIycgKyBkaXZJZCk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdzbGlkZXItY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRDYWxsYmFjayA9IHR5cGVvZiBjaGdDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gY2hnQ2FsbGJhY2sgOiAoKSA9PiB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHByZXNldFNlbGVjdG9yID0gcHJlc2V0U2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy5fJHJlZ2lvblNlbGVjdG9yID0gcmVnaW9uU2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy5fJHZlcnNpb25TZWxlY3RvciA9IHZlcnNpb25TZWxlY3RvcjtcclxuXHJcbiAgICAgICAgdGhpcy5fc2xpZGVyTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlckxvb2t1cCA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlckNvbmZpZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsZCA9IG5ldyBfU2xpZGVyKHNsaWRlckNvbmZpZ3NbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXJMaXN0LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVyTG9va3VwW3NsZC5kb21JZF0gPSBzbGQ7XHJcbiAgICAgICAgICAgIHNsZC5hZGRUb0RvbSh0aGlzLiRjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcHJlc2V0QXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9wcmVzZXRMb29rdXAgPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVzZXRDb25maWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHByZXNldCA9IG5ldyBUaXBQcmVzZXRzKHByZXNldENvbmZpZ1tpXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaWR4ID0gKGkgKyAxKS50b0ZpeGVkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wcmVzZXRMb29rdXBbaWR4XSA9IHByZXNldDtcclxuICAgICAgICAgICAgdGhpcy5fcHJlc2V0QXJyYXkucHVzaChwcmVzZXQpO1xyXG4gICAgICAgICAgICB0aGlzLl8kcHJlc2V0U2VsZWN0b3IuYXBwZW5kKGA8b3B0aW9uIHZhbHVlPVwiJHtpZHh9XCI+JHtwcmVzZXQubGFiZWx9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fbG9ja2VkTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2luUmFuZ2VMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fYXRNaW5MaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fYXRNYXhMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMubG9ja2VkQ291bnQgPSAxMDtcclxuICAgICAgICB0aGlzLm5vdExvY2tlZENvdW50ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3BsaXRTbGlkZXJBcnJheSgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fJHByZXNldFNlbGVjdG9yLmNoYW5nZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJlc2V0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3J1bkNoYW5nZWRDYWxsYmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl8kcmVnaW9uU2VsZWN0b3IuY2hhbmdlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcnVuQ2hhbmdlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuXyR2ZXJzaW9uU2VsZWN0b3IuY2hhbmdlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcnVuQ2hhbmdlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRwcmVzZXRTZWxlY3Rvci50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcnVuQ2hhbmdlZENhbGxiYWNrKCl7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlZENhbGxiYWNrKHRoaXMucGFyYW1XZWlnaHRzUmVnaW9uVmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNoYW5nZWRDYWxsYmFjaygpOiBDaGFuZ2VDYWxsYmFja3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZENhbGxiYWNrXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNoYW5nZWRDYWxsYmFjayhjaGc6IENoYW5nZUNhbGxiYWNrKXtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VkQ2FsbGJhY2sgPSBjaGc7XHJcbiAgICAgICAgdGhpcy5fcnVuQ2hhbmdlZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJlc2V0VmFsdWVzKCkge1xyXG4gICAgICAgIGxldCBpZHggPSB0aGlzLl8kcHJlc2V0U2VsZWN0b3IudmFsKCkgfHwgJzEnO1xyXG5cclxuICAgICAgICBsZXQgdGhlUHJlc2V0ID0gdGhpcy5fcHJlc2V0TG9va3VwW2lkeF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhlUHJlc2V0LnByZXNldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHByZXNldFZhbHVlcyA9IHRoZVByZXNldC5wcmVzZXRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdGhlU2xpZGVyID0gdGhpcy5fc2xpZGVyTGlzdFtpXTtcclxuXHJcbiAgICAgICAgICAgIHRoZVNsaWRlci5sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGVTbGlkZXIuc2V0VmFsQW5kRHJvcERvd24ocHJlc2V0VmFsdWVzLnZhbHVlLCBwcmVzZXRWYWx1ZXMuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzcGxpdCBhcnJheSBpbnRvIHN1YmFycmF5cyBob2xkaW5nIHRoZSBzbGlkZXJzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfc3BsaXRTbGlkZXJBcnJheSgpIHtcclxuICAgICAgICB0aGlzLl9sb2NrZWRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5faW5SYW5nZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hdE1pbkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hdE1heExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zbGlkZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzbGQgPSB0aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNsZC5sb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2tlZExpc3QucHVzaChzbGQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsZC5hdE1pbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXRNaW5MaXN0LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzbGQuYXRNYXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F0TWF4TGlzdC5wdXNoKHNsZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pblJhbmdlTGlzdC5wdXNoKHNsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2NrZWRDb3VudCA9IHRoaXMuX2xvY2tlZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubm90TG9ja2VkQ291bnQgPSB0aGlzLl9zbGlkZXJMaXN0Lmxlbmd0aCAtIHRoaXMubG9ja2VkQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgcmVtYWluZGVyLCByZWN1cnNpdmUgdG8gdGFrZSBjYXJlIG9mIG1pbiBtYXggb3ZlcnNob290c1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlbWFpbiB0aGUgcmVtYWluZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2tpcERvbUlkIC0gdGhpcyBkb20gaWRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVSZW1haW5kZXIocmVtYWluLCBza2lwRG9tSWQpIHtcclxuXHJcbiAgICAgICAgcmVtYWluID0gTnVtYmVyKHJlbWFpbi50b0ZpeGVkKDEpKTtcclxuICAgICAgICBpZiAocmVtYWluID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3BsaXRTbGlkZXJBcnJheSgpO1xyXG5cclxuICAgICAgICBsZXQgY2FuQ2hhbmdlQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2luUmFuZ2VMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzbGQgPSB0aGlzLl9pblJhbmdlTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKHNsZC5kb21JZCA9PSBza2lwRG9tSWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbkNoYW5nZUFycmF5LnB1c2goc2xkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXRNYXhMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xkID0gdGhpcy5fYXRNYXhMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsZC5kb21JZCA9PSBza2lwRG9tSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbkNoYW5nZUFycmF5LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXRNaW5MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xkID0gdGhpcy5fYXRNaW5MaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsZC5kb21JZCA9PSBza2lwRG9tSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbkNoYW5nZUFycmF5LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbkNoYW5nZUFycmF5Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmMgPSAtMSAqIE51bWJlcigocmVtYWluIC8gY2FuQ2hhbmdlQXJyYXkubGVuZ3RoKS50b0ZpeGVkKDEpKTtcclxuXHJcbiAgICAgICAgbGV0IG5ld1JlbWFpbmRlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5DaGFuZ2VBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuZXdSZW1haW5kZXIgKz0gY2FuQ2hhbmdlQXJyYXlbaV0uaW5jcmVtZW50KGluYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oYW5kbGVSZW1haW5kZXIobmV3UmVtYWluZGVyLCBza2lwRG9tSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBrZXlWYWxMaXN0IGtleSBhbmQgdmFsdWUgbGlzdFxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZXMoa2V5VmFsTGlzdCkge1xyXG4gICAgICAgIHRoaXMucmVzZXR0aW5nID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBrIGluIGtleVZhbExpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGtleVZhbExpc3QuaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NsaWRlckxvb2t1cFtrXS5zZXRWYWxBbmREcm9wRG93bihrZXlWYWxMaXN0W2tdWzBdLCBrZXlWYWxMaXN0W2tdWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0dGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSB3ZWlnaHQgc3VtXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgd2VpZ2h0IHN1bVxyXG4gICAgICovXHJcbiAgICBnZXRTdW0oKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsZCA9IHRoaXMuX3NsaWRlckxpc3RbaV07XHJcbiAgICAgICAgICAgIHRvdGFsICs9IE51bWJlcihzbGQud2VpZ2h0LnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBwYXJhbWV0ZXIgd2VpZ2h0c1xyXG4gICAgICogQHJldHVybnMge29iamVjdH0gbG9va3VwIHdpdGggcGFyYW1ldGVyIHdlaWdodHNcclxuICAgICAqL1xyXG4gICAgZ2V0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBwYXJhbVdlaWdodHMgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsZCA9IHRoaXMuX3NsaWRlckxpc3RbaV07XHJcbiAgICAgICAgICAgIHBhcmFtV2VpZ2h0c1tzbGQuc2VsZWN0ZWRQYXJhbV0gPSBOdW1iZXIoc2xkLndlaWdodC50b0ZpeGVkKDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJhbVdlaWdodHM7XHJcbiAgICB9XHJcblxyXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGxldCBfX190aGlzID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIC8vY2hhbmdlIGZ1bmN0aW9uXHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJyYW5nZVwiXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX19fdGhpcy5yZXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCBkb21JZCA9IHRoaXNbJ2lkJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xkciA9IF9fX3RoaXMuX3NsaWRlckxvb2t1cFtkb21JZF07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gcGFyc2VGbG9hdCgkdGhpcy52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gc2xkci53ZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmZiA9IG5ld1ZhbHVlIC0gb2xkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkaWZmID0gTnVtYmVyKGRpZmYudG9GaXhlZCgxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2xkci53ZWlnaHQgPSBOdW1iZXIobmV3VmFsdWUudG9GaXhlZCgxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgX19fdGhpcy5faGFuZGxlUmVtYWluZGVyKGRpZmYsIGRvbUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NsZWFudXAsIG1ha2Ugc3VyZSB0aGUgc3VtIGlzIHN0aWxsIDEwMFxyXG4gICAgICAgICAgICAgICAgbGV0IHN1bSA9IE51bWJlcihfX190aGlzLmdldFN1bSgpLnRvRml4ZWQoMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdW0gPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsb29wMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX19fdGhpcy5fc2xpZGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbGQgPSBfX190aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGQuZG9tSWQgPT0gZG9tSWQgfHwgc2xkLmxvY2tlZCB8fCBzbGQuYXRNaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsZC5pbmNyZW1lbnQoLTAuMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtIC09IDAuMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtLnRvRml4ZWQoMSkgPT0gJzEwMC4wJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsb29wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VtIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9fX3RoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xkID0gX19fdGhpcy5fc2xpZGVyTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xkLmRvbUlkID09IGRvbUlkIHx8IHNsZC5sb2NrZWQgfHwgc2xkLmF0TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGQuaW5jcmVtZW50KDAuMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IDAuMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtLnRvRml4ZWQoMSkgPT0gJzEwMC4wJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsb29wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfX190aGlzLl8kcHJlc2V0U2VsZWN0b3IudmFsKCcwJyk7XHJcbiAgICAgICAgICAgICAgICBfX190aGlzLl9ydW5DaGFuZ2VkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vdXBkYXRlIHRoZSBzZWxlY3RlZCBwYXJhbWV0ZXIgd2hlbiB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWRcclxuICAgICAgICAkKCcuc2hvdy1zZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoX19fdGhpcy5yZXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfX190aGlzLl9zbGlkZXJMb29rdXBbdGhpc1snaWQnXS5yZXBsYWNlKCdfY2hnJywgJycpXS5zZWxlY3RlZFBhcmFtID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIF9fX3RoaXMuXyRwcmVzZXRTZWxlY3Rvci52YWwoJzAnKTtcclxuXHJcbiAgICAgICAgICAgIF9fX3RoaXMuX3J1bkNoYW5nZWRDYWxsYmFjaygpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9sb2NrIHRoZSBzbGlkZXIgYW5kIHVwZGF0ZSB0aGUgcmVzZXJ2ZWQgcGVyY2VudFxyXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tRWwgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgX19fdGhpcy5fc2xpZGVyTG9va3VwW2RvbUVsLmlkLnJlcGxhY2UoJ19jaGsnLCAnJyldLmxvY2tlZCA9ICFkb21FbC5jaGVja2VkO1xyXG4gICAgICAgICAgICBfX190aGlzLnJlc2VydmVkUGVyY2VudCA9IDAuMDtcclxuICAgICAgICAgICAgX19fdGhpcy5ub3RMb2NrZWRDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgbm90TG9ja2VkU2xpZGVycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfX190aGlzLl9zbGlkZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xkID0gX19fdGhpcy5fc2xpZGVyTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChzbGQubG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX19fdGhpcy5yZXNlcnZlZFBlcmNlbnQgKz0gc2xkLndlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vdExvY2tlZFNsaWRlcnMucHVzaChzbGQpO1xyXG4gICAgICAgICAgICAgICAgX19fdGhpcy5ub3RMb2NrZWRDb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9fX3RoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzbGQgPSBfX190aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsZC5sb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNsZC5tYXggPSAxMDAgLSBfX190aGlzLnJlc2VydmVkUGVyY2VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vdExvY2tlZFNsaWRlcnMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIG5vdExvY2tlZFNsaWRlcnNbMF0ubWluID0gbm90TG9ja2VkU2xpZGVyc1swXS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdExvY2tlZFNsaWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RMb2NrZWRTbGlkZXJzW2ldLm1pbiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhcmFtV2VpZ2h0c1JlZ2lvblZlcnNpb24oKTogQ2hhbmdlUmVzcG9uc2V7XHJcbiAgICAgICAgcmV0dXJuIHtwYXJhbVdlaWdodHM6IHRoaXMuZ2V0UGFyYW1zKCksXHJcbiAgICAgICAgICAgIHJlZ2lvbjogdGhpcy5fJHJlZ2lvblNlbGVjdG9yLnZhbCgpIGFzIHN0cmluZywgbW1WZXJzaW9uOiB0aGlzLl8kdmVyc2lvblNlbGVjdG9yLnZhbCgpIGFzIHN0cmluZ31cclxuICAgIH1cclxufVxyXG5cclxubm0uU2xpZGVycyA9IFRpcFNsaWRlcnM7XHJcbmV4cG9ydCBkZWZhdWx0IFRpcFNsaWRlcnM7XHJcbiJdfQ==