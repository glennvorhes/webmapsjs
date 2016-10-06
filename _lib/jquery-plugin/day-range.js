'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../jquery/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('../jquery/jquery-ui');

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('jQueryPlugin');

var DayRange = function () {

    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery} jQueryRef reference to the jquery element
     */

    function DayRange(dayRange, jQueryRef) {
        _classCallCheck(this, DayRange);

        this._workingDayRange = dayRange - 1;

        var pickerHtml = '<label for="start-date" style="width: 78px; display: inline-block; margin:5px;">Start Date</label>' + '<input type="text" readonly id="start-date" class="date-pick"  style="width: 90px;">' + '<br><label for="end-date" style="width: 78px; display: inline-block;  margin:5px;">End Date</label>' + '<input type="text" readonly id="end-date" class="date-pick" style="width: 90px;">';

        jQueryRef.append(pickerHtml);

        this._$startDate = (0, _jquery2.default)('#start-date');
        this._$endDate = (0, _jquery2.default)('#end-date');

        this._$startDate.datepicker();
        this._$endDate.datepicker();

        this._startDate = null;
        this._endDate = null;

        var dte1 = new Date();
        dte1.setHours(0, 0, 0, 0);
        var dte2 = new Date(dte1.getTime());
        dte2.setDate(dte2.getDate() + dayRange);
        dte2.setHours(23, 59, 59, 0);
        this._maxDateRange = dte2 - dte1;

        var _this = this;

        //add event listeners
        this._$startDate.change(function () {
            _this.startDate = this.value;
        });

        this._$endDate.change(function () {
            _this.endDate = this.value;
        });

        // initialize
        this.endDate = new Date().getTime();
    }

    _createClass(DayRange, [{
        key: 'startDate',
        get: function get() {
            return this._startDate;
        },
        set: function set(val) {
            this._startDate = new Date(val);
            this._startDate.setHours(0, 0, 0, 0);
            this._$startDate.val(this._startDate.toLocaleDateString());

            if (this.endDate == null || this._endDate - this._startDate > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._startDate.getTime());
                tmpDate.setDate(tmpDate.getDate() + this._workingDayRange);
                this.endDate = tmpDate.getTime();
            }
        }
    }, {
        key: 'endDate',
        get: function get() {
            return this._endDate;
        },
        set: function set(val) {
            this._endDate = new Date(val);
            this._endDate.setHours(23, 59, 59, 0);
            this._$endDate.val(this._endDate.toLocaleDateString());
            if (this._startDate == null || this._endDate - this.startDate > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._endDate.getTime());
                tmpDate.setDate(tmpDate.getDate() - this._workingDayRange);
                this.startDate = tmpDate.getTime();
            }
        }
    }]);

    return DayRange;
}();

nm.DayRange = DayRange;
var jQuery = _jquery2.default;

/**
 * Adds day range control
 * @param {number} dayRange the number of days
 * @returns {DayRange} the day range object
 */
jQuery.fn.dayRange = function (dayRange) {
    return new DayRange(dayRange, this);
};

exports.default = DayRange;
module.exports = exports['default'];