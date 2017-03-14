/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";
    if (typeof window['gv'] == 'undefined') {
        window['gv'] = {};
    }
    var parts = namespace.split('.');
    var nameSpace = window['gv'];
    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];
        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }
        nameSpace = nameSpace[parts[i]];
    }
    return nameSpace;
}
provide('util');
window['gv'].util.provide = provide;
exports.default = provide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3ZpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUdIOzs7O0dBSUc7QUFDSCxpQkFBaUIsU0FBUztJQUN0QixZQUFZLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFFcEMsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTAvMjAxNS5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBhIG5hbWVzcGFjZSBvbiB0aGUgZ3Ygb2JqZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgdG8gY3JlYXRlXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5hbWVzcGFjZVxyXG4gKi9cclxuZnVuY3Rpb24gcHJvdmlkZShuYW1lc3BhY2Upe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvd1snZ3YnXSA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgd2luZG93WydndiddID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcnRzID0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgbmFtZVNwYWNlID0gd2luZG93WydndiddO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDsgaTwgcGFydHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuYW1lU3BhY2VbcGFydHNbaV1dO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG5ld09iamVjdCA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIG5hbWVTcGFjZVtwYXJ0c1tpXV0gPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVTcGFjZSA9IG5hbWVTcGFjZVtwYXJ0c1tpXV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5hbWVTcGFjZTtcclxufVxyXG5cclxucHJvdmlkZSgndXRpbCcpO1xyXG53aW5kb3dbJ2d2J10udXRpbC5wcm92aWRlID0gcHJvdmlkZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb3ZpZGU7XHJcbiJdfQ==

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNsaWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUN0QywwQkFBNkI7QUFFN0IsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQXVCaEM7SUFLSSxvQkFBWSxJQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVmLEdBQUcsQ0FBQyxDQUFXLFVBQVksRUFBWixLQUFBLElBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7WUFBdEIsSUFBSSxFQUFFLFNBQUE7WUFDUCxNQUFNLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztTQUN0QjtRQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ2YsTUFBTSxnQ0FBZ0MsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUdEO0lBdUJJOzs7O09BSUc7SUFDSCxpQkFBWSxZQUE2QjtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMs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QUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQzVDLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN6RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDL0MsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxzQkFBSSxpREFBeUI7YUFBN0I7WUFDSSxNQUFNLENBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBWSxFQUFDLENBQUE7UUFDekcsQ0FBQzs7O09BQUE7SUFDTCxpQkFBQztBQUFELENBQUMsQUFwWEQsSUFvWEM7QUFwWFksZ0NBQVU7QUFzWHZCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ3hCLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzEwLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2NvbGxlY3Rpb25zJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRpcFNsaWRlckNvbmZpZyB7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgeWVhck9wdGlvbnM6IEFycmF5PHtjb2x1bW46IHN0cmluZywgbGFiZWw6IHN0cmluZ30+XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGlwUHJlc2V0Q29uZmlnIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBwcmVzZXRzOiBBcnJheTx7Y29sdW1uOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9PlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZVJlc3BvbnNle1xyXG4gICAgcGFyYW1XZWlnaHRzOiBPYmplY3Q7XHJcbiAgICByZWdpb246IHN0cmluZztcclxuICAgIG1tVmVyc2lvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhbGxiYWNre1xyXG4gICAgKGNoZzogQ2hhbmdlUmVzcG9uc2UpOiBhbnlcclxufVxyXG5cclxuXHJcbmNsYXNzIFRpcFByZXNldHMgaW1wbGVtZW50cyBUaXBQcmVzZXRDb25maWcge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHByZXNldHM6IEFycmF5PHtjb2x1bW46IHN0cmluZywgdmFsdWU6IG51bWJlcn0+O1xyXG4gICAgZG9tSWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25mOiBUaXBQcmVzZXRDb25maWcpIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gY29uZi5sYWJlbDtcclxuICAgICAgICB0aGlzLnByZXNldHMgPSBjb25mLnByZXNldHM7XHJcbiAgICAgICAgdGhpcy5kb21JZCA9IHRoaXMubGFiZWwucmVwbGFjZSgvIC9nLCAnJykudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgbGV0IHRoZVN1bSA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByIG9mIHRoaXMucHJlc2V0cyl7XHJcbiAgICAgICAgICAgIHRoZVN1bSArPSBwci52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGVTdW0gIT0gMTAwKXtcclxuICAgICAgICAgICAgdGhyb3cgJ3ByZXNldCBzdW0gZG9lcyBub3RlIGVxdWFsIDEwMCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgX1NsaWRlciB7XHJcbiAgICBfbWluOiBudW1iZXI7XHJcbiAgICBfbWF4OiBudW1iZXI7XHJcbiAgICBfbG9ja2VkOiBib29sZWFuO1xyXG4gICAgYXRNaW46IGJvb2xlYW47XHJcbiAgICBhdE1heDogYm9vbGVhbjtcclxuICAgIF93ZWlnaHREZWZhdWx0OiBudW1iZXI7XHJcbiAgICBfd2VpZ2h0OiBudW1iZXI7XHJcbiAgICBodG1sOiBzdHJpbmc7XHJcbiAgICBkb21JZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGxhYmVsTG93OiBKUXVlcnk7XHJcbiAgICBsYWJlbEhpZ2g6IEpRdWVyeTtcclxuICAgIGxhYmVsVmFsOiBKUXVlcnk7XHJcbiAgICBzbGlkZXI6IEpRdWVyeTtcclxuICAgIHNlbGVjdGlvbkJveDogSlF1ZXJ5O1xyXG4gICAgY2hrOiBKUXVlcnk7XHJcblxyXG4gICAgc2VsZWN0ZWRQYXJhbTogYW55O1xyXG4gICAgc2VsZWN0ZWRQYXJhbURlZmF1bHQ6IGFueTtcclxuICAgIF9kcm9wZG93blNlbGVjdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2xpZGVyIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gc2xpZGVyQ29uZmlnIC0gdGhlIGNvbmZpZ3VyYXRpb25cclxuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNsaWRlckNvbmZpZzogVGlwU2xpZGVyQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fZHJvcGRvd25TZWxlY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3dlaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gc2xpZGVyQ29uZmlnLmxhYmVsO1xyXG4gICAgICAgIHRoaXMuZG9tSWQgPSB0aGlzLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICctJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xvY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9taW4gPSAwLjA7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gMTAwO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsTG93ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhYmVsSGlnaCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYWJlbFZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hrID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5hdE1pbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXRNYXggPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGxldCBzZWwgPSBgPHNlbGVjdCBjbGFzcz1cIiR7c2xpZGVyQ29uZmlnLnllYXJPcHRpb25zLmxlbmd0aCA9PSAxID8gJ2hpZGRlbi1zZWxlY3QnIDogJ3Nob3ctc2VsZWN0J31cIiBpZD1cIiR7dGhpcy5kb21JZH1fY2hnXCI+YDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXJDb25maWcueWVhck9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0bSA9IHNsaWRlckNvbmZpZy55ZWFyT3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgc2VsICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtpdG0uY29sdW1ufVwiPiR7aXRtLmxhYmVsfTwvb3B0aW9uPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbCArPSAnPC9zZWxlY3Q+JztcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhcmFtRGVmYXVsdCA9IHRoaXMuc2VsZWN0ZWRQYXJhbTtcclxuXHJcbiAgICAgICAgdGhpcy5odG1sID0gJzxkaXYgY2xhc3M9XCJzbGlkZXItZGl2XCI+JyArXHJcbiAgICAgICAgICAgIGA8bGFiZWwgZm9yPVwiJHt0aGlzLmRvbUlkfV9jaGtcIiBjbGFzcz1cInNsaWRlci1sYWJlbFwiPiR7dGhpcy5uYW1lfTwvbGFiZWw+YCArXHJcbiAgICAgICAgICAgIHNlbCArIGA8YnI+YCArXHJcbiAgICAgICAgICAgIGA8aW5wdXQgaWQ9XCIke3RoaXMuZG9tSWR9X2Noa1wiIHR5cGU9XCJjaGVja2JveFwiIHRpdGxlPVwiTG9jay9VbmxvY2sgU2xpZGVyXCI+YCArXHJcbiAgICAgICAgICAgIGA8bGFiZWwgaWQ9XCIke3RoaXMuZG9tSWR9X2xvd1wiIGNsYXNzPVwibG93LWhpZ2hcIj48L2xhYmVsPmAgK1xyXG4gICAgICAgICAgICBgPGlucHV0IGlkPVwiJHt0aGlzLmRvbUlkfVwiIHR5cGU9XCJyYW5nZVwiIHZhbHVlPVwiNTBcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgc3RlcD1cIjAuMVwiPmAgK1xyXG4gICAgICAgICAgICBgPGxhYmVsIGlkPVwiJHt0aGlzLmRvbUlkfV9oaWdoXCIgY2xhc3M9XCJsb3ctaGlnaFwiPjwvbGFiZWw+YCArXHJcbiAgICAgICAgICAgIGA8bGFiZWwgaWQ9XCIke3RoaXMuZG9tSWR9X2xibFwiIGZvcj1cIiR7dGhpcy5kb21JZH1cIiBjbGFzcz1cInBlcmNlbnQtbGFiZWxcIj48L2xhYmVsPjwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgaHRtbCB0byBkb21cclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkY29udGFpbmVyIC0gY29udGFpbmVyIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgYWRkVG9Eb20oJGNvbnRhaW5lcikge1xyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHRoaXMuaHRtbCk7XHJcbiAgICAgICAgdGhpcy5sYWJlbExvdyA9ICQoYCMke3RoaXMuZG9tSWR9X2xvd2ApO1xyXG4gICAgICAgIHRoaXMubGFiZWxIaWdoID0gJChgIyR7dGhpcy5kb21JZH1faGlnaGApO1xyXG4gICAgICAgIHRoaXMubGFiZWxWYWwgPSAkKGAjJHt0aGlzLmRvbUlkfV9sYmxgKTtcclxuICAgICAgICB0aGlzLnNsaWRlciA9ICQoYCMke3RoaXMuZG9tSWR9YCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Cb3ggPSAkKGAjJHt0aGlzLmRvbUlkfV9jaGdgKTtcclxuICAgICAgICB0aGlzLmNoayA9ICQoYCMke3RoaXMuZG9tSWR9X2Noa2ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5jcmVtZW50IHRoZSBzbGlkZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YSBjaGFuZ2UgZGVsdGFcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSByZW1haW5kZXIgbm90IGFibGUgdG8gYmUgYWxsb2NhdGVkIHRvIHRoaXMgc2xpZGVyXHJcbiAgICAgKi9cclxuICAgIGluY3JlbWVudChkZWx0YSkge1xyXG4gICAgICAgIGxldCByZW1haW5kZXIgPSAwO1xyXG4gICAgICAgIGRlbHRhID0gTnVtYmVyKGRlbHRhLnRvRml4ZWQoMSkpO1xyXG5cclxuICAgICAgICB0aGlzLl93ZWlnaHQgKz0gZGVsdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlaWdodCA8IHRoaXMuX21pbikge1xyXG4gICAgICAgICAgICByZW1haW5kZXIgPSB0aGlzLl9taW4gLSB0aGlzLl93ZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodCA9IHRoaXMuX21pbjtcclxuICAgICAgICAgICAgdGhpcy5hdE1pbiA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl93ZWlnaHQgPiB0aGlzLl9tYXgpIHtcclxuICAgICAgICAgICAgcmVtYWluZGVyID0gdGhpcy5fbWF4IC0gdGhpcy5fd2VpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB0aGlzLl9tYXg7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNYXggPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdE1heCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIudmFsKHRoaXMuX3dlaWdodC50b0ZpeGVkKDEpKTtcclxuICAgICAgICB0aGlzLmxhYmVsVmFsLmh0bWwodGhpcy5fd2VpZ2h0LnRvRml4ZWQoMSkgKyAnJScpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVtYWluZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSB2YWx1ZSBhbmQgZHJvcCBkb3duXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3VmFsIHRoZSBuZXcgdmFsdWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZFBhcmFtIHRoZSBzZWxlY3RlZCBwYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgc2V0VmFsQW5kRHJvcERvd24obmV3VmFsOiBudW1iZXIsIHNlbGVjdGVkUGFyYW06IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubWluID0gMDtcclxuICAgICAgICB0aGlzLm1heCA9IDEwMDtcclxuICAgICAgICB0aGlzLndlaWdodCA9IG5ld1ZhbDtcclxuICAgICAgICB0aGlzLnNsaWRlci52YWwobmV3VmFsLnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQm94LnZhbChzZWxlY3RlZFBhcmFtKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGFyYW0gPSBzZWxlY3RlZFBhcmFtO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaWYgbG9ja2VkXHJcbiAgICAgKi9cclxuICAgIGdldCBsb2NrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbCBpZiBsb2NrZWRcclxuICAgICAqL1xyXG4gICAgc2V0IGxvY2tlZCh2YWwpIHtcclxuICAgICAgICB0aGlzLl9sb2NrZWQgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucHJvcCgnZGlzYWJsZWQnLCB0aGlzLl9sb2NrZWQpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQm94LnByb3AoJ2Rpc2FibGVkJywgdGhpcy5fbG9ja2VkKTtcclxuICAgICAgICB0aGlzLmNoay5wcm9wKCdjaGVja2VkJywgIXRoaXMuX2xvY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIG1pbmltdW1cclxuICAgICAqL1xyXG4gICAgZ2V0IG1pbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdWYWwgbmV3IG1pbmltdW1cclxuICAgICAqL1xyXG4gICAgc2V0IG1pbihuZXdWYWwpIHtcclxuICAgICAgICB0aGlzLl9taW4gPSBOdW1iZXIobmV3VmFsLnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIGlmICh0aGlzLl9taW4gPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21pbiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFiZWxMb3cuaHRtbCh0aGlzLl9taW4udG9GaXhlZCgxKSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuYXR0cignbWluJywgdGhpcy5fbWluLnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIHRoaXMuYXRNaW4gPSB0aGlzLl93ZWlnaHQgPT0gdGhpcy5fbWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBtYXhpbXVtXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3VmFsIHRoZSBtYXhpbXVtXHJcbiAgICAgKi9cclxuICAgIHNldCBtYXgobmV3VmFsKSB7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gTnVtYmVyKG5ld1ZhbC50b0ZpeGVkKDEpKTtcclxuICAgICAgICBpZiAodGhpcy5fbWF4ID4gMTAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heCA9IDEwMC4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYmVsSGlnaC5odG1sKHRoaXMuX21heC50b0ZpeGVkKDEpKTtcclxuICAgICAgICB0aGlzLnNsaWRlci5hdHRyKCdtYXgnLCB0aGlzLl9tYXgudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgdGhpcy5hdE1heCA9IHRoaXMuX3dlaWdodCA9PSB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIHdlaWdodFxyXG4gICAgICovXHJcbiAgICBnZXQgd2VpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1ZhbCB0aGUgd2VpZ2h0XHJcbiAgICAgKi9cclxuICAgIHNldCB3ZWlnaHQobmV3VmFsKSB7XHJcbiAgICAgICAgdGhpcy5fd2VpZ2h0ID0gTnVtYmVyKG5ld1ZhbC50b0ZpeGVkKDEpKTtcclxuICAgICAgICB0aGlzLmxhYmVsVmFsLmh0bWwodGhpcy5fd2VpZ2h0LnRvRml4ZWQoMSkgKyAnJScpO1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWlnaHQgPD0gdGhpcy5fbWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0TWF4ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl93ZWlnaHQgPj0gdGhpcy5fbWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXRNaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hdE1heCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdE1pbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmF0TWF4ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ubS5fU2xpZGVyID0gX1NsaWRlcjtcclxuXHJcblxyXG4vKipcclxuICogY2xhc3MgdG8ga2VlcCB0cmFjayBvZiB0aGUgc2xpZGVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRpcFNsaWRlcnMge1xyXG4gICAgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcmVzZXJ2ZWRQZXJjZW50OiBudW1iZXI7XHJcbiAgICBsb2NrZWRDb3VudDogbnVtYmVyO1xyXG4gICAgbm90TG9ja2VkQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3NsaWRlckxpc3Q6IEFycmF5PF9TbGlkZXI+O1xyXG4gICAgcHJpdmF0ZSBfc2xpZGVyTG9va3VwOiB7W3M6IHN0cmluZ106IF9TbGlkZXJ9O1xyXG4gICAgcHJpdmF0ZSByZXNldHRpbmc6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9jaGFuZ2VkQ2FsbGJhY2s6IENoYW5nZUNhbGxiYWNrO1xyXG5cclxuICAgIHByaXZhdGUgX2xvY2tlZExpc3Q6IEFycmF5PF9TbGlkZXI+O1xyXG4gICAgcHJpdmF0ZSBfaW5SYW5nZUxpc3Q6IEFycmF5PF9TbGlkZXI+O1xyXG4gICAgcHJpdmF0ZSBfYXRNaW5MaXN0OiBBcnJheTxfU2xpZGVyPjtcclxuICAgIHByaXZhdGUgX2F0TWF4TGlzdDogQXJyYXk8X1NsaWRlcj47XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlc2V0QXJyYXk6IEFycmF5PFRpcFByZXNldHM+O1xyXG4gICAgcHJpdmF0ZSBfcHJlc2V0TG9va3VwOiB7W3M6IHN0cmluZ106IFRpcFByZXNldHN9O1xyXG5cclxuICAgIHByaXZhdGUgXyRwcmVzZXRTZWxlY3RvcjogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBfJHJlZ2lvblNlbGVjdG9yOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIF8kdmVyc2lvblNlbGVjdG9yOiBKUXVlcnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNsaWRlckNvbmZpZ3NcclxuICAgICAqIEBwYXJhbSBwcmVzZXRDb25maWdcclxuICAgICAqIEBwYXJhbSBkaXZJZFxyXG4gICAgICogQHBhcmFtIHByZXNldFNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcmVnaW9uU2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSB2ZXJzaW9uU2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSBjaGdDYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXJDb25maWdzOiBBcnJheTxUaXBTbGlkZXJDb25maWc+LCBwcmVzZXRDb25maWc6IEFycmF5PFRpcFByZXNldENvbmZpZz4sXHJcbiAgICAgICAgICAgICAgICBkaXZJZDogc3RyaW5nLCBwcmVzZXRTZWxlY3RvcjogSlF1ZXJ5LCByZWdpb25TZWxlY3RvcjogSlF1ZXJ5LCB2ZXJzaW9uU2VsZWN0b3I6IEpRdWVyeSxcclxuICAgICAgICAgICAgICAgIGNoZ0NhbGxiYWNrPzogQ2hhbmdlQ2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldHRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc2VydmVkUGVyY2VudCA9IDAuMDtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKCcjJyArIGRpdklkKTtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ3NsaWRlci1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlZENhbGxiYWNrID0gdHlwZW9mIGNoZ0NhbGxiYWNrID09ICdmdW5jdGlvbicgPyBjaGdDYWxsYmFjayA6ICgpID0+IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl8kcHJlc2V0U2VsZWN0b3IgPSBwcmVzZXRTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLl8kcmVnaW9uU2VsZWN0b3IgPSByZWdpb25TZWxlY3RvcjtcclxuICAgICAgICB0aGlzLl8kdmVyc2lvblNlbGVjdG9yID0gdmVyc2lvblNlbGVjdG9yO1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fc2xpZGVyTG9va3VwID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVyQ29uZmlncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2xkID0gbmV3IF9TbGlkZXIoc2xpZGVyQ29uZmlnc1tpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NsaWRlckxpc3QucHVzaChzbGQpO1xyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXJMb29rdXBbc2xkLmRvbUlkXSA9IHNsZDtcclxuICAgICAgICAgICAgc2xkLmFkZFRvRG9tKHRoaXMuJGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wcmVzZXRBcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3ByZXNldExvb2t1cCA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXNldENvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcHJlc2V0ID0gbmV3IFRpcFByZXNldHMocHJlc2V0Q29uZmlnW2ldKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpZHggPSAoaSArIDEpLnRvRml4ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXNldExvb2t1cFtpZHhdID0gcHJlc2V0O1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVzZXRBcnJheS5wdXNoKHByZXNldCk7XHJcbiAgICAgICAgICAgIHRoaXMuXyRwcmVzZXRTZWxlY3Rvci5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2lkeH1cIj4ke3ByZXNldC5sYWJlbH08L29wdGlvbj5gKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9sb2NrZWRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5faW5SYW5nZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hdE1pbkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hdE1heExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NrZWRDb3VudCA9IDEwO1xyXG4gICAgICAgIHRoaXMubm90TG9ja2VkQ291bnQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9zcGxpdFNsaWRlckFycmF5KCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl8kcHJlc2V0U2VsZWN0b3IuY2hhbmdlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQcmVzZXRWYWx1ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5fcnVuQ2hhbmdlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRyZWdpb25TZWxlY3Rvci5jaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5DaGFuZ2VkQ2FsbGJhY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHZlcnNpb25TZWxlY3Rvci5jaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9ydW5DaGFuZ2VkQ2FsbGJhY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHByZXNldFNlbGVjdG9yLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIF9ydW5DaGFuZ2VkQ2FsbGJhY2soKXtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VkQ2FsbGJhY2sodGhpcy5wYXJhbVdlaWdodHNSZWdpb25WZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2hhbmdlZENhbGxiYWNrKCk6IENoYW5nZUNhbGxiYWNre1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VkQ2FsbGJhY2tcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY2hhbmdlZENhbGxiYWNrKGNoZzogQ2hhbmdlQ2FsbGJhY2spe1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZWRDYWxsYmFjayA9IGNoZztcclxuICAgICAgICB0aGlzLl9ydW5DaGFuZ2VkQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQcmVzZXRWYWx1ZXMoKSB7XHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuXyRwcmVzZXRTZWxlY3Rvci52YWwoKSB8fCAnMSc7XHJcblxyXG4gICAgICAgIGxldCB0aGVQcmVzZXQgPSB0aGlzLl9wcmVzZXRMb29rdXBbaWR4XTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGVQcmVzZXQucHJlc2V0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcHJlc2V0VmFsdWVzID0gdGhlUHJlc2V0LnByZXNldHNbaV07XHJcbiAgICAgICAgICAgIGxldCB0aGVTbGlkZXIgPSB0aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgdGhlU2xpZGVyLmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoZVNsaWRlci5zZXRWYWxBbmREcm9wRG93bihwcmVzZXRWYWx1ZXMudmFsdWUsIHByZXNldFZhbHVlcy5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNwbGl0IGFycmF5IGludG8gc3ViYXJyYXlzIGhvbGRpbmcgdGhlIHNsaWRlcnNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9zcGxpdFNsaWRlckFycmF5KCkge1xyXG4gICAgICAgIHRoaXMuX2xvY2tlZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9pblJhbmdlTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2F0TWluTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2F0TWF4TGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsZCA9IHRoaXMuX3NsaWRlckxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoc2xkLmxvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9ja2VkTGlzdC5wdXNoKHNsZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2xkLmF0TWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdE1pbkxpc3QucHVzaChzbGQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsZC5hdE1heCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXRNYXhMaXN0LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luUmFuZ2VMaXN0LnB1c2goc2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvY2tlZENvdW50ID0gdGhpcy5fbG9ja2VkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5ub3RMb2NrZWRDb3VudCA9IHRoaXMuX3NsaWRlckxpc3QubGVuZ3RoIC0gdGhpcy5sb2NrZWRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhhbmRsZSByZW1haW5kZXIsIHJlY3Vyc2l2ZSB0byB0YWtlIGNhcmUgb2YgbWluIG1heCBvdmVyc2hvb3RzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVtYWluIHRoZSByZW1haW5kZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBza2lwRG9tSWQgLSB0aGlzIGRvbSBpZFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZVJlbWFpbmRlcihyZW1haW4sIHNraXBEb21JZCkge1xyXG5cclxuICAgICAgICByZW1haW4gPSBOdW1iZXIocmVtYWluLnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIGlmIChyZW1haW4gPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zcGxpdFNsaWRlckFycmF5KCk7XHJcblxyXG4gICAgICAgIGxldCBjYW5DaGFuZ2VBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faW5SYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNsZCA9IHRoaXMuX2luUmFuZ2VMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoc2xkLmRvbUlkID09IHNraXBEb21JZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FuQ2hhbmdlQXJyYXkucHVzaChzbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdE1heExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzbGQgPSB0aGlzLl9hdE1heExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xkLmRvbUlkID09IHNraXBEb21JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FuQ2hhbmdlQXJyYXkucHVzaChzbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdE1pbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzbGQgPSB0aGlzLl9hdE1pbkxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xkLmRvbUlkID09IHNraXBEb21JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FuQ2hhbmdlQXJyYXkucHVzaChzbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FuQ2hhbmdlQXJyYXkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluYyA9IC0xICogTnVtYmVyKChyZW1haW4gLyBjYW5DaGFuZ2VBcnJheS5sZW5ndGgpLnRvRml4ZWQoMSkpO1xyXG5cclxuICAgICAgICBsZXQgbmV3UmVtYWluZGVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbkNoYW5nZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld1JlbWFpbmRlciArPSBjYW5DaGFuZ2VBcnJheVtpXS5pbmNyZW1lbnQoaW5jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hhbmRsZVJlbWFpbmRlcihuZXdSZW1haW5kZXIsIHNraXBEb21JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGtleVZhbExpc3Qga2V5IGFuZCB2YWx1ZSBsaXN0XHJcbiAgICAgKi9cclxuICAgIHNldFZhbHVlcyhrZXlWYWxMaXN0KSB7XHJcbiAgICAgICAgdGhpcy5yZXNldHRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4ga2V5VmFsTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoa2V5VmFsTGlzdC5oYXNPd25Qcm9wZXJ0eShrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2xpZGVyTG9va3VwW2tdLnNldFZhbEFuZERyb3BEb3duKGtleVZhbExpc3Rba11bMF0sIGtleVZhbExpc3Rba11bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXR0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIHdlaWdodCBzdW1cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSB3ZWlnaHQgc3VtXHJcbiAgICAgKi9cclxuICAgIGdldFN1bSgpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2xpZGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2xkID0gdGhpcy5fc2xpZGVyTGlzdFtpXTtcclxuICAgICAgICAgICAgdG90YWwgKz0gTnVtYmVyKHNsZC53ZWlnaHQudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIHBhcmFtZXRlciB3ZWlnaHRzXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBsb29rdXAgd2l0aCBwYXJhbWV0ZXIgd2VpZ2h0c1xyXG4gICAgICovXHJcbiAgICBnZXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtV2VpZ2h0cyA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2xpZGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2xkID0gdGhpcy5fc2xpZGVyTGlzdFtpXTtcclxuICAgICAgICAgICAgcGFyYW1XZWlnaHRzW3NsZC5zZWxlY3RlZFBhcmFtXSA9IE51bWJlcihzbGQud2VpZ2h0LnRvRml4ZWQoMSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtV2VpZ2h0cztcclxuICAgIH1cclxuXHJcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgbGV0IF9fX3RoaXMgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgLy9jaGFuZ2UgZnVuY3Rpb25cclxuICAgICAgICB0aGlzLiRjb250YWluZXIuZmluZCgnaW5wdXRbdHlwZT1cInJhbmdlXCJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfX190aGlzLnJlc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbUlkID0gdGhpc1snaWQnXTtcclxuICAgICAgICAgICAgICAgIGxldCBzbGRyID0gX19fdGhpcy5fc2xpZGVyTG9va3VwW2RvbUlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBwYXJzZUZsb2F0KCR0aGlzLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSBzbGRyLndlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gbmV3VmFsdWUgLSBvbGRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGRpZmYgPSBOdW1iZXIoZGlmZi50b0ZpeGVkKDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGRyLndlaWdodCA9IE51bWJlcihuZXdWYWx1ZS50b0ZpeGVkKDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfX190aGlzLl9oYW5kbGVSZW1haW5kZXIoZGlmZiwgZG9tSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY2xlYW51cCwgbWFrZSBzdXJlIHRoZSBzdW0gaXMgc3RpbGwgMTAwXHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtID0gTnVtYmVyKF9fX3RoaXMuZ2V0U3VtKCkudG9GaXhlZCgxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN1bSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfX190aGlzLl9zbGlkZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsZCA9IF9fX3RoaXMuX3NsaWRlckxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsZC5kb21JZCA9PSBkb21JZCB8fCBzbGQubG9ja2VkIHx8IHNsZC5hdE1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xkLmluY3JlbWVudCgtMC4xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gLT0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0udG9GaXhlZCgxKSA9PSAnMTAwLjAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdW0gPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsb29wMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX19fdGhpcy5fc2xpZGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzbGQgPSBfX190aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGQuZG9tSWQgPT0gZG9tSWQgfHwgc2xkLmxvY2tlZCB8fCBzbGQuYXRNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsZC5pbmNyZW1lbnQoMC4xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0udG9GaXhlZCgxKSA9PSAnMTAwLjAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvb3AxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9fX3RoaXMuXyRwcmVzZXRTZWxlY3Rvci52YWwoJzAnKTtcclxuICAgICAgICAgICAgICAgIF9fX3RoaXMuX3J1bkNoYW5nZWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgdGhlIHNlbGVjdGVkIHBhcmFtZXRlciB3aGVuIHRoZSBzZWxlY3Rpb24gaXMgY2hhbmdlZFxyXG4gICAgICAgICQoJy5zaG93LXNlbGVjdCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChfX190aGlzLnJlc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9fX3RoaXMuX3NsaWRlckxvb2t1cFt0aGlzWydpZCddLnJlcGxhY2UoJ19jaGcnLCAnJyldLnNlbGVjdGVkUGFyYW0gPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgX19fdGhpcy5fJHByZXNldFNlbGVjdG9yLnZhbCgnMCcpO1xyXG5cclxuICAgICAgICAgICAgX19fdGhpcy5fcnVuQ2hhbmdlZENhbGxiYWNrKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2xvY2sgdGhlIHNsaWRlciBhbmQgdXBkYXRlIHRoZSByZXNlcnZlZCBwZXJjZW50XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21FbCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBfX190aGlzLl9zbGlkZXJMb29rdXBbZG9tRWwuaWQucmVwbGFjZSgnX2NoaycsICcnKV0ubG9ja2VkID0gIWRvbUVsLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgIF9fX3RoaXMucmVzZXJ2ZWRQZXJjZW50ID0gMC4wO1xyXG4gICAgICAgICAgICBfX190aGlzLm5vdExvY2tlZENvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBub3RMb2NrZWRTbGlkZXJzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9fX3RoaXMuX3NsaWRlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzbGQgPSBfX190aGlzLl9zbGlkZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsZC5sb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfX190aGlzLnJlc2VydmVkUGVyY2VudCArPSBzbGQud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm90TG9ja2VkU2xpZGVycy5wdXNoKHNsZCk7XHJcbiAgICAgICAgICAgICAgICBfX190aGlzLm5vdExvY2tlZENvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX19fdGhpcy5fc2xpZGVyTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsZCA9IF9fX3RoaXMuX3NsaWRlckxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xkLmxvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2xkLm1heCA9IDEwMCAtIF9fX3RoaXMucmVzZXJ2ZWRQZXJjZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobm90TG9ja2VkU2xpZGVycy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbm90TG9ja2VkU2xpZGVyc1swXS5taW4gPSBub3RMb2NrZWRTbGlkZXJzWzBdLndlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90TG9ja2VkU2xpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdExvY2tlZFNsaWRlcnNbaV0ubWluID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFyYW1XZWlnaHRzUmVnaW9uVmVyc2lvbigpOiBDaGFuZ2VSZXNwb25zZXtcclxuICAgICAgICByZXR1cm4ge3BhcmFtV2VpZ2h0czogdGhpcy5nZXRQYXJhbXMoKSxcclxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLl8kcmVnaW9uU2VsZWN0b3IudmFsKCkgYXMgc3RyaW5nLCBtbVZlcnNpb246IHRoaXMuXyR2ZXJzaW9uU2VsZWN0b3IudmFsKCkgYXMgc3RyaW5nfVxyXG4gICAgfVxyXG59XHJcblxyXG5ubS5TbGlkZXJzID0gVGlwU2xpZGVycztcclxuZXhwb3J0IGRlZmF1bHQgVGlwU2xpZGVycztcclxuIl19

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 6/22/2016.
 */
var Sliders_1 = __webpack_require__(22);
var $ = __webpack_require__(1);
__webpack_require__(1);
exports.tipConfig = {
    $loadingGif: $('#loading-gif'),
    $presetSelector: $('#preset-selector'),
    $regionSelector: $('#region-selector'),
    $versionSelector: $('#version-selector'),
    tipSegmentLayerMinZoom: 10,
    slidersConfig: [
        {
            label: 'AADT',
            yearOptions: [
                { label: '1', column: 'aadtyr_1' }
            ]
        },
        {
            label: 'AADT Future',
            yearOptions: [
                { label: '5', column: 'aadtyr_5' },
                { label: '10', column: 'aadtyr_10' },
                { label: '15', column: 'aadtyr_15' },
                { label: '20', column: 'aadtyr_20' }
            ]
        },
        {
            label: 'Growth',
            yearOptions: [
                { label: '5', column: 'growth_5' },
                { label: '10', column: 'growth_10' },
                { label: '15', column: 'growth_15' },
                { label: '20', column: 'growth_20' }
            ]
        },
        {
            label: 'Truck',
            yearOptions: [
                { label: '1', column: 'trkdyr_1' },
                { label: '20', column: 'trkdyr_20' }
            ]
        },
        {
            label: 'LOS',
            yearOptions: [
                { label: '1', column: 'losyr_1' }
            ]
        },
        {
            label: 'LOS Future',
            yearOptions: [
                { label: '5', column: 'losyr_5' },
                { label: '10', column: 'losyr_10' },
                { label: '15', column: 'losyr_15' },
                { label: '20', column: 'losyr_20' }
            ]
        },
        {
            label: 'Crash Rate',
            yearOptions: [
                { label: 1, column: 'crash_rate' }
            ]
        },
        {
            label: 'Severity',
            yearOptions: [
                { label: 1, column: 'crash_severity' }
            ]
        },
        {
            label: 'Weather',
            yearOptions: [
                { label: 1, column: 'weather' }
            ]
        },
        {
            label: 'Event',
            yearOptions: [
                { label: 1, column: 'event' }
            ]
        }
    ],
    presetConfig: [
        {
            label: 'Default TIP',
            presets: [
                { column: 'aadtyr_1', value: 10.0 },
                { column: 'aadtyr_20', value: 7.0 },
                { column: 'growth_20', value: 7.0 },
                { column: 'trkdyr_1', value: 4.0 },
                { column: 'losyr_1', value: 12.0 },
                { column: 'losyr_20', value: 12.0 },
                { column: 'crash_rate', value: 15.0 },
                { column: 'crash_severity', value: 13.0 },
                { column: 'weather', value: 9.0 },
                { column: 'event', value: 11.0 }
            ]
        },
        {
            label: 'Safety',
            presets: [
                { column: 'aadtyr_1', value: 20.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 0.0 },
                { column: 'losyr_1', value: 0.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 40.0 },
                { column: 'crash_severity', value: 40.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Mobility Present',
            presets: [
                { column: 'aadtyr_1', value: 25.0 },
                { column: 'aadtyr_20', value: 25.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 25.0 },
                { column: 'losyr_1', value: 25.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Mobility Future',
            presets: [
                { column: 'aadtyr_1', value: 0.0 },
                { column: 'aadtyr_20', value: 25.0 },
                { column: 'growth_20', value: 25.0 },
                { column: 'trkdyr_1', value: 25.0 },
                { column: 'losyr_1', value: 0.0 },
                { column: 'losyr_20', value: 25.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Service',
            presets: [
                { column: 'aadtyr_1', value: 30.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 10.0 },
                { column: 'trkdyr_1', value: 0.0 },
                { column: 'losyr_1', value: 30.0 },
                { column: 'losyr_20', value: 30.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Freight Performance',
            presets: [
                { column: 'aadtyr_1', value: 20.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 60.0 },
                { column: 'losyr_1', value: 20.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        }
    ]
};
exports.tipConfig.$presetSelector.append('<option value="0" disabled=>Custom</option>');
var sliders = new Sliders_1.TipSliders(exports.tipConfig.slidersConfig, exports.tipConfig.presetConfig, 'slider-container', exports.tipConfig.$presetSelector, exports.tipConfig.$regionSelector, exports.tipConfig.$regionSelector, function (chg) { console.log(chg); });
// sliders.changedCallback = (chg) => {console.log(chg)};
window['glob'] = sliders;
window['hat'] = sliders;
window['bird'] = sliders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGlkZXItdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gseURBQTJGO0FBQzNGLDBCQUE2QjtBQUU3QixxQkFBbUI7QUFtQk4sUUFBQSxTQUFTLEdBQUc7SUFDckIsV0FBVyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDOUIsZUFBZSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztJQUN0QyxlQUFlLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQ3RDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztJQUN4QyxzQkFBc0IsRUFBRSxFQUFFO0lBQzFCLGFBQWEsRUFBRTtRQUNQO1lBQ0ksS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUU7Z0JBQ1QsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUM7YUFDbkM7U0FDSjtRQUNEO1lBQ0ksS0FBSyxFQUFFLGFBQWE7WUFDcEIsV0FBVyxFQUFFO2dCQUNULEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDO2dCQUNoQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQztnQkFDbEMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUM7Z0JBQ2xDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDO2FBQ3JDO1NBQ0o7UUFDRDtZQUNJLEtBQUssRUFBRSxRQUFRO1lBQ2YsV0FBVyxFQUFFO2dCQUNULEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDO2dCQUNoQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQztnQkFDbEMsRUFBQyxLQUFLLEVBQUUsSUFBSSxF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aEIsaUJBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7QUFFaEYsSUFBSSxPQUFPLEdBQUcsSUFBSSxvQkFBVSxDQUFDLGlCQUFTLENBQUMsYUFBYSxFQUFFLGlCQUFTLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUM1RixpQkFBUyxDQUFDLGVBQWUsRUFBRSxpQkFBUyxDQUFDLGVBQWUsRUFBRSxpQkFBUyxDQUFDLGVBQWUsRUFBRSxVQUFDLEdBQUcsSUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7QUFFbEgseURBQXlEO0FBRXpELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gNi8yMi8yMDE2LlxyXG4gKi9cclxuaW1wb3J0IHtUaXBTbGlkZXJzLCBUaXBQcmVzZXRDb25maWcsIFRpcFNsaWRlckNvbmZpZ30gZnJvbSAnLi4vLi4vc3JjL2NvbGxlY3Rpb25zL1NsaWRlcnMnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICdqcXVlcnktdWknO1xyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUaXBDb25maWd7XHJcbiAgICBzbGlkZXJzQ29uZmlnOiBBcnJheTxUaXBTbGlkZXJDb25maWc+O1xyXG4gICAgcHJlc2V0Q29uZmlnOiBBcnJheTxUaXBQcmVzZXRDb25maWc+O1xyXG4gICAgdGlwU2VnbWVudExheWVyTWluWm9vbTogbnVtYmVyO1xyXG4gICAgc2xpZGVyczogVGlwU2xpZGVycztcclxuICAgIF9tYXA6IG9sLk1hcDtcclxuICAgICRsb2FkaW5nR2lmOiBKUXVlcnk7XHJcbiAgICAkcHJlc2V0U2VsZWN0b3I6IEpRdWVyeTtcclxuICAgICRyZWdpb25TZWxlY3RvcjogSlF1ZXJ5O1xyXG4gICAgJHZlcnNpb25TZWxlY3RvcjogSlF1ZXJ5O1xyXG4gICAgaXRzTGF5ZXJDb2xsZWN0aW9uOiBhbnk7XHJcbiAgICB0aXBTZWdtZW50TGF5ZXI6IGFueTtcclxuICAgIG1ldGFtYW5hZ2VyU2VnbWVudHM6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRpcENvbmZpZyA9IHtcclxuICAgICRsb2FkaW5nR2lmOiAkKCcjbG9hZGluZy1naWYnKSxcclxuICAgICRwcmVzZXRTZWxlY3RvcjogJCgnI3ByZXNldC1zZWxlY3RvcicpLFxyXG4gICAgJHJlZ2lvblNlbGVjdG9yOiAkKCcjcmVnaW9uLXNlbGVjdG9yJyksXHJcbiAgICAkdmVyc2lvblNlbGVjdG9yOiAkKCcjdmVyc2lvbi1zZWxlY3RvcicpLFxyXG4gICAgdGlwU2VnbWVudExheWVyTWluWm9vbTogMTAsXHJcbiAgICBzbGlkZXJzQ29uZmlnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQUFEVCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyT3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJzEnLCBjb2x1bW46ICdhYWR0eXJfMSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQUFEVCBGdXR1cmUnLFxyXG4gICAgICAgICAgICAgICAgeWVhck9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICc1JywgY29sdW1uOiAnYWFkdHlyXzUnfSxcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICcxMCcsIGNvbHVtbjogJ2FhZHR5cl8xMCd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJzE1JywgY29sdW1uOiAnYWFkdHlyXzE1J30sXHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnMjAnLCBjb2x1bW46ICdhYWR0eXJfMjAnfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0dyb3d0aCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyT3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJzUnLCBjb2x1bW46ICdncm93dGhfNSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJzEwJywgY29sdW1uOiAnZ3Jvd3RoXzEwJ30sXHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnMTUnLCBjb2x1bW46ICdncm93dGhfMTUnfSxcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICcyMCcsIGNvbHVtbjogJ2dyb3d0aF8yMCd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVHJ1Y2snLFxyXG4gICAgICAgICAgICAgICAgeWVhck9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICcxJywgY29sdW1uOiAndHJrZHlyXzEnfSxcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICcyMCcsIGNvbHVtbjogJ3Rya2R5cl8yMCd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTE9TJyxcclxuICAgICAgICAgICAgICAgIHllYXJPcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnMScsIGNvbHVtbjogJ2xvc3lyXzEnfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0xPUyBGdXR1cmUnLFxyXG4gICAgICAgICAgICAgICAgeWVhck9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICc1JywgY29sdW1uOiAnbG9zeXJfNSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJzEwJywgY29sdW1uOiAnbG9zeXJfMTAnfSxcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICcxNScsIGNvbHVtbjogJ2xvc3lyXzE1J30sXHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnMjAnLCBjb2x1bW46ICdsb3N5cl8yMCd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ3Jhc2ggUmF0ZScsXHJcbiAgICAgICAgICAgICAgICB5ZWFyT3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogMSwgY29sdW1uOiAnY3Jhc2hfcmF0ZSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU2V2ZXJpdHknLFxyXG4gICAgICAgICAgICAgICAgeWVhck9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6IDEsIGNvbHVtbjogJ2NyYXNoX3NldmVyaXR5J31cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdXZWF0aGVyJyxcclxuICAgICAgICAgICAgICAgIHllYXJPcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAxLCBjb2x1bW46ICd3ZWF0aGVyJ31cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFdmVudCcsXHJcbiAgICAgICAgICAgICAgICB5ZWFyT3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogMSwgY29sdW1uOiAnZXZlbnQnfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSBhcyBBcnJheTxUaXBTbGlkZXJDb25maWc+LFxyXG4gICAgcHJlc2V0Q29uZmlnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRGVmYXVsdCBUSVAnLFxyXG4gICAgICAgICAgICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdhYWR0eXJfMScsIHZhbHVlOiAxMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnYWFkdHlyXzIwJywgdmFsdWU6IDcuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2dyb3d0aF8yMCcsIHZhbHVlOiA3LjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd0cmtkeXJfMScsIHZhbHVlOiA0LjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8xJywgdmFsdWU6IDEyLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8yMCcsIHZhbHVlOiAxMi4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnY3Jhc2hfcmF0ZScsIHZhbHVlOiAxNS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnY3Jhc2hfc2V2ZXJpdHknLCB2YWx1ZTogMTMuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ3dlYXRoZXInLCB2YWx1ZTogOS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnZXZlbnQnLCB2YWx1ZTogMTEuMH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTYWZldHknLFxyXG4gICAgICAgICAgICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdhYWR0eXJfMScsIHZhbHVlOiAyMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnYWFkdHlyXzIwJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2dyb3d0aF8yMCcsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd0cmtkeXJfMScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8xJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2xvc3lyXzIwJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2NyYXNoX3JhdGUnLCB2YWx1ZTogNDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2NyYXNoX3NldmVyaXR5JywgdmFsdWU6IDQwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd3ZWF0aGVyJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2V2ZW50JywgdmFsdWU6IDAuMH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdNb2JpbGl0eSBQcmVzZW50JyxcclxuICAgICAgICAgICAgICAgIHByZXNldHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnYWFkdHlyXzEnLCB2YWx1ZTogMjUuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2FhZHR5cl8yMCcsIHZhbHVlOiAyNS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnZ3Jvd3RoXzIwJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ3Rya2R5cl8xJywgdmFsdWU6IDI1LjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8xJywgdmFsdWU6IDI1LjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8yMCcsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdjcmFzaF9yYXRlJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2NyYXNoX3NldmVyaXR5JywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ3dlYXRoZXInLCB2YWx1ZTogMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnZXZlbnQnLCB2YWx1ZTogMC4wfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ01vYmlsaXR5IEZ1dHVyZScsXHJcbiAgICAgICAgICAgICAgICBwcmVzZXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2FhZHR5cl8xJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2FhZHR5cl8yMCcsIHZhbHVlOiAyNS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnZ3Jvd3RoXzIwJywgdmFsdWU6IDI1LjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd0cmtkeXJfMScsIHZhbHVlOiAyNS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnbG9zeXJfMScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdsb3N5cl8yMCcsIHZhbHVlOiAyNS4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnY3Jhc2hfcmF0ZScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdjcmFzaF9zZXZlcml0eScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd3ZWF0aGVyJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2V2ZW50JywgdmFsdWU6IDAuMH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTZXJ2aWNlJyxcclxuICAgICAgICAgICAgICAgIHByZXNldHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnYWFkdHlyXzEnLCB2YWx1ZTogMzAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2FhZHR5cl8yMCcsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdncm93dGhfMjAnLCB2YWx1ZTogMTAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ3Rya2R5cl8xJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2xvc3lyXzEnLCB2YWx1ZTogMzAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2xvc3lyXzIwJywgdmFsdWU6IDMwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdjcmFzaF9yYXRlJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2NyYXNoX3NldmVyaXR5JywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ3dlYXRoZXInLCB2YWx1ZTogMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnZXZlbnQnLCB2YWx1ZTogMC4wfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0ZyZWlnaHQgUGVyZm9ybWFuY2UnLFxyXG4gICAgICAgICAgICAgICAgcHJlc2V0czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdhYWR0eXJfMScsIHZhbHVlOiAyMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnYWFkdHlyXzIwJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2dyb3d0aF8yMCcsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd0cmtkeXJfMScsIHZhbHVlOiA2MC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnbG9zeXJfMScsIHZhbHVlOiAyMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnbG9zeXJfMjAnLCB2YWx1ZTogMC4wfSxcclxuICAgICAgICAgICAgICAgICAgICB7Y29sdW1uOiAnY3Jhc2hfcmF0ZScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICdjcmFzaF9zZXZlcml0eScsIHZhbHVlOiAwLjB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtjb2x1bW46ICd3ZWF0aGVyJywgdmFsdWU6IDAuMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge2NvbHVtbjogJ2V2ZW50JywgdmFsdWU6IDAuMH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0gYXMgQXJyYXk8VGlwUHJlc2V0Q29uZmlnPlxyXG5cclxufSBhcyBJVGlwQ29uZmlnO1xyXG5cclxudGlwQ29uZmlnLiRwcmVzZXRTZWxlY3Rvci5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCIwXCIgZGlzYWJsZWQ9PkN1c3RvbTwvb3B0aW9uPicpO1xyXG5cclxubGV0IHNsaWRlcnMgPSBuZXcgVGlwU2xpZGVycyh0aXBDb25maWcuc2xpZGVyc0NvbmZpZywgdGlwQ29uZmlnLnByZXNldENvbmZpZywgJ3NsaWRlci1jb250YWluZXInLFxyXG4gICAgdGlwQ29uZmlnLiRwcmVzZXRTZWxlY3RvciwgdGlwQ29uZmlnLiRyZWdpb25TZWxlY3RvciwgdGlwQ29uZmlnLiRyZWdpb25TZWxlY3RvciwgKGNoZykgPT4ge2NvbnNvbGUubG9nKGNoZyl9KTtcclxuXHJcbi8vIHNsaWRlcnMuY2hhbmdlZENhbGxiYWNrID0gKGNoZykgPT4ge2NvbnNvbGUubG9nKGNoZyl9O1xyXG5cclxud2luZG93WydnbG9iJ10gPSBzbGlkZXJzO1xyXG53aW5kb3dbJ2hhdCddID0gc2xpZGVycztcclxud2luZG93WydiaXJkJ10gPSBzbGlkZXJzO1xyXG5cclxuIl19

/***/ })

/******/ });
//# sourceMappingURL=slider-test.js.map