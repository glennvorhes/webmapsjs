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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
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


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = jquery-ui;

/***/ }),

/***/ 23:
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


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 6/22/2016.
 */
var Sliders_1 = __webpack_require__(23);
var $ = __webpack_require__(1);
__webpack_require__(15);
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


/***/ })

/******/ });
//# sourceMappingURL=slider-test.js.map