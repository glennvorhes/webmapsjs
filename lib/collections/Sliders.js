'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Created by gavorhes on 12/10/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('collections');

var _Slider = (function () {

    /**
     * Slider constructor
     * @param {string} name - the slider name
     * @param {Array} selections - the selection
     * @param {number} wgt - weight
     * @param {boolean} selected - if selected
     */

    function _Slider(name, selections, wgt, selected) {
        _classCallCheck(this, _Slider);

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

        var sel = '<select class="' + (selections.length == 1 ? 'hidden-select' : 'show-select') + '" id="' + this.domId + '_chg">';
        for (var _i = 0; _i < selections.length; _i++) {
            var itm = selections[_i][0];
            var itmSelected = itm === selected;

            sel += '<option value="' + itm + '" ' + (itmSelected ? ' selected="selected"' : '') + '>' + selections[_i][1] + '</option>';
            if (itmSelected) {
                this.selectedParam = itm;
            }
        }
        sel += '</select>';

        this.selectedParamDefault = this.selectedParam;

        this.html = '<div class="slider-div">' + ('<label for="' + this.domId + '_chk" class="slider-label">' + this.name + '</label>') + sel + '<br>' + ('<input id="' + this.domId + '_chk" type="checkbox" title="Lock/Unlock Slider">') + ('<label id="' + this.domId + '_low" class="low-high">' + this._min.toFixed(1) + '</label>') + ('<input id="' + this.domId + '" type="range" value="' + this._weight.toFixed(1) + '" min="0" max="100" step="0.1">') + ('<label id="' + this.domId + '_high" class="low-high">' + this._max.toFixed(1) + '</label>') + ('<label id="' + this.domId + '_lbl" for="' + this.domId + '" class="percent-label">' + this._weight.toFixed(1) + '%</label></div>');
    }

    /**
     * add html to dom
     * @param {jQuery} $container - container element
     */

    _createClass(_Slider, [{
        key: 'addToDom',
        value: function addToDom($container) {
            $container.append(this.html);
            this.labelLow = (0, _jquery2.default)('#' + this.domId + '_low');
            this.labelHigh = (0, _jquery2.default)('#' + this.domId + '_high');
            this.labelVal = (0, _jquery2.default)('#' + this.domId + '_lbl');
            this.slider = (0, _jquery2.default)('#' + this.domId);
            this.selectionBox = (0, _jquery2.default)('#' + this.domId + '_chg');
            this.chk = (0, _jquery2.default)('#' + this.domId + '_chk');
        }

        /**
         * increment the slider
         * @param {number} delta change delta
         * @returns {number} the remainder not able to be allocated to this slider
         */

    }, {
        key: 'increment',
        value: function increment(delta) {
            var remainder = 0;
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

    }, {
        key: 'reset',
        value: function reset() {
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

    }, {
        key: 'setValAndDropDown',
        value: function setValAndDropDown(newVal, selectedParam) {
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

    }, {
        key: 'locked',
        get: function get() {
            return this._locked;
        }

        /**
         *
         * @param {boolean} val if locked
         */
        ,
        set: function set(val) {
            this._locked = val;
            this.slider.prop('disabled', this._locked);
            this.selectionBox.prop('disabled', this._locked);
            this.chk.prop('checked', !this._locked);
        }

        /**
         *
         * @returns {number} the minimum
         */

    }, {
        key: 'min',
        get: function get() {
            return this._min;
        }

        /**
         *
         * @param {number} newVal new minimum
         */
        ,
        set: function set(newVal) {
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

    }, {
        key: 'max',
        get: function get() {
            return this._max;
        }

        /**
         *
         * @param {number} newVal the maximum
         */
        ,
        set: function set(newVal) {
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

    }, {
        key: 'weight',
        get: function get() {
            return this._weight;
        }

        /**
         *
         * @param {number} newVal the weight
         */
        ,
        set: function set(newVal) {
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
    }]);

    return _Slider;
})();

nm._Slider = _Slider;

/**
 * class to make a slider group
 */

var Sliders = (function () {
    /**
     *
     * @param {Array} paramList list of parameters
     * @param {string} divId the div id
     */

    function Sliders(paramList, divId) {
        _classCallCheck(this, Sliders);

        this.resetting = false;
        this._slideFinishedFunctions = [];
        this.reservedPercent = 0.0;
        this.$container = (0, _jquery2.default)('#' + divId);
        this.$container.addClass('slider-container');

        this.sliderList = [];
        this.sliderLookup = {};

        this.total = 0;

        for (var _i2 = 0; _i2 < paramList.length; _i2++) {
            var p = paramList[_i2];

            var _sld = new _Slider(p[0], p[1], p[2], p[3]);
            this.sliderList.push(_sld);
            this.sliderLookup[_sld.domId] = _sld;
            _sld.addToDom(this.$container);
            this.total += _sld._weight;
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

    _createClass(Sliders, [{
        key: 'addSlideFinishedFunction',
        value: function addSlideFinishedFunction(finishedFunction) {
            this._slideFinishedFunctions.push(finishedFunction);
        }

        /**
         * split array into subarrays holding the sliders
         * @private
         */

    }, {
        key: '_splitSliderArray',
        value: function _splitSliderArray() {
            this.lockedList = [];
            this.inRangeList = [];
            this.atMinList = [];
            this.atMaxList = [];

            for (var _i3 = 0; _i3 < this.sliderList.length; _i3++) {
                var _sld2 = this.sliderList[_i3];

                if (_sld2.locked) {
                    this.lockedList.push(_sld2);
                } else if (_sld2.atMin) {
                    this.atMinList.push(_sld2);
                } else if (_sld2.atMax) {
                    this.atMaxList.push(_sld2);
                } else {
                    this.inRangeList.push(_sld2);
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

    }, {
        key: '_handleRemainder',
        value: function _handleRemainder(remain, skipDomId) {

            remain = Number(remain.toFixed(1));
            if (remain == 0) {
                return;
            }

            this._splitSliderArray();

            var canChangeArray = [];
            for (var _i4 = 0; _i4 < this.inRangeList.length; _i4++) {
                var _sld3 = this.inRangeList[_i4];
                if (_sld3.domId == skipDomId) {
                    continue;
                }
                canChangeArray.push(_sld3);
            }

            if (remain > 0) {
                for (var _i5 = 0; _i5 < this.atMaxList.length; _i5++) {
                    var _sld4 = this.atMaxList[_i5];
                    if (_sld4.domId == skipDomId) {
                        continue;
                    }
                    canChangeArray.push(_sld4);
                }
            } else {
                for (var _i6 = 0; _i6 < this.atMinList.length; _i6++) {
                    var _sld5 = this.atMinList[_i6];
                    if (_sld5.domId == skipDomId) {
                        continue;
                    }
                    canChangeArray.push(_sld5);
                }
            }

            if (canChangeArray.length == 0) {
                return;
            }

            var inc = -1 * Number((remain / canChangeArray.length).toFixed(1));

            var newRemainder = 0;
            for (var _i7 = 0; _i7 < canChangeArray.length; _i7++) {
                newRemainder += canChangeArray[_i7].increment(inc);
            }

            this._handleRemainder(newRemainder, skipDomId);
        }

        /**
         * reset all
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.resetting = true;
            for (var _i8 = 0; _i8 < this.sliderList.length; _i8++) {
                var _sld6 = this.sliderList[_i8];
                _sld6.reset();
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

    }, {
        key: 'setValues',
        value: function setValues(keyValList) {
            this.resetting = true;
            for (var k in keyValList) {
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

    }, {
        key: 'getSum',
        value: function getSum() {
            var total = 0;
            for (var _i9 = 0; _i9 < this.sliderList.length; _i9++) {
                var _sld7 = this.sliderList[_i9];
                total += Number(_sld7.weight.toFixed(1));
            }

            return total;
        }

        /**
         * get the parameter weights
         * @returns {object} lookup with parameter weights
         */

    }, {
        key: 'getParams',
        value: function getParams() {
            var paramWeights = {};
            for (var _i10 = 0; _i10 < this.sliderList.length; _i10++) {
                var _sld8 = this.sliderList[_i10];
                paramWeights[_sld8.selectedParam] = Number(_sld8.weight.toFixed(1));
            }

            return paramWeights;
        }
    }, {
        key: '_addEventListeners',
        value: function _addEventListeners() {
            var _this = this;

            //change function
            this.$container.find('input[type="range"]').change(function () {
                if (_this.resetting) {
                    return;
                }

                var $this = (0, _jquery2.default)(this);
                var domId = this.id;
                var sldr = _this.sliderLookup[domId];

                var newValue = parseFloat($this.val());

                var oldValue = sldr.weight;
                var diff = newValue - oldValue;
                diff = Number(diff.toFixed(1));

                sldr.weight = Number(newValue.toFixed(1));

                _this._handleRemainder(diff, domId);

                //cleanup, make sure the sum is still 100
                var sum = Number(_this.getSum().toFixed(1));

                if (sum > 100) {
                    loop1: while (true) {
                        for (i = 0; i < _this.sliderList.length; i++) {
                            var _sld9 = _this.sliderList[i];
                            if (_sld9.domId == domId || _sld9.locked || _sld9.atMin) {
                                continue;
                            }
                            _sld9.increment(-0.1);
                            sum -= 0.1;
                            if (sum.toFixed(1) == '100.0') {
                                break loop1;
                            }
                        }
                    }
                } else if (sum < 100) {
                    loop1: while (true) {
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

                for (var _i11 = 0; _i11 < _this._slideFinishedFunctions.length; _i11++) {
                    _this._slideFinishedFunctions[_i11]();
                }
            });

            //update the selected parameter when the selection is changed
            (0, _jquery2.default)('.show-select').change(function () {
                if (_this.resetting) {
                    return;
                }
                _this.sliderLookup[this.id.replace('_chg', '')].selectedParam = (0, _jquery2.default)(this).val();
            });

            //lock the slider and update the reserved percent
            this.$container.find('input[type="checkbox"]').change(function () {
                var domEl = this;

                _this.sliderLookup[domEl.id.replace('_chk', '')].locked = !domEl.checked;
                _this.reservedPercent = 0.0;
                _this.notLockedCount = 0;

                var notLockedSliders = [];

                for (var _i12 = 0; _i12 < _this.sliderList.length; _i12++) {
                    var _sld10 = _this.sliderList[_i12];
                    if (_sld10.locked) {
                        _this.reservedPercent += _sld10.weight;
                        continue;
                    }
                    notLockedSliders.push(_sld10);
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
    }]);

    return Sliders;
})();

nm.Sliders = Sliders;
window.gv['collections'].Sliders = Sliders;
exports.default = Sliders;