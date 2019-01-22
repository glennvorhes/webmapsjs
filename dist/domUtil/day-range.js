"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var $ = require("jquery");
require("jquery-ui");
var nm = provide_1.default('domUtil');
var DayRange = /** @class */ (function () {
    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery|HTMLElement|*} jQueryRef reference to the jquery element
     */
    function DayRange(jQueryRef, dayRange) {
        this._workingDayRange = dayRange - 1;
        var pickerHtml = '<label for="start-date" style="width: 78px; display: inline-block; margin:5px;">Start Date</label>' +
            '<input type="text" readonly id="start-date" class="date-pick"  style="width: 90px;">' +
            '<br><label for="end-date" style="width: 78px; display: inline-block;  margin:5px;">End Date</label>' +
            '<input type="text" readonly id="end-date" class="date-pick" style="width: 90px;">';
        jQueryRef.append(pickerHtml);
        this._$startDate = $('#start-date');
        this._$endDate = $('#end-date');
        this._$startDate.datepicker();
        this._$endDate.datepicker();
        this._startDate = null;
        this._endDate = null;
        var dte1 = new Date();
        dte1.setHours(0, 0, 0, 0);
        var dte2 = new Date(dte1.getTime());
        dte2.setDate(dte2.getDate() + dayRange);
        dte2.setHours(23, 59, 59, 0);
        this._maxDateRange = dte2.getTime() - dte1.getTime();
        var _this = this;
        //add event listeners
        this._$startDate.change(function () {
            _this.startDate = this.value;
        });
        this._$endDate.change(function () {
            _this.endDate = this.value;
        });
        // initialize
        this.endDate = new Date();
    }
    Object.defineProperty(DayRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        /**
         *
         * @param val
         */
        set: function (val) {
            if (typeof val == 'string') {
                val = new Date(val);
            }
            this._startDate = val;
            this._startDate.setHours(0, 0, 0, 0);
            this._$startDate.val(this._startDate.toLocaleDateString());
            if (this.endDate == null ||
                this._endDate.getTime() - this._startDate.getTime() > this._maxDateRange ||
                this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._startDate.getTime());
                tmpDate.setDate(tmpDate.getDate() + this._workingDayRange);
                this.endDate = new Date(tmpDate.getTime());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (val) {
            if (typeof val == 'string') {
                val = new Date(val);
            }
            this._endDate = val;
            this._endDate.setHours(23, 59, 59, 0);
            this._$endDate.val(this._endDate.toLocaleDateString());
            if (this._startDate == null || this._endDate.getTime() - this.startDate.getTime() > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._endDate.getTime());
                tmpDate.setDate(tmpDate.getDate() - this._workingDayRange);
                this.startDate = new Date(tmpDate.getTime());
            }
        },
        enumerable: true,
        configurable: true
    });
    return DayRange;
}());
exports.DayRange = DayRange;
nm.DayRange = DayRange;
exports.default = DayRange;
//# sourceMappingURL=day-range.js.map