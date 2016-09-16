import $ from '../jquery/jquery';
import '../jquery/jquery-ui';
import provide from '../util/provide';
let nm = provide('jQueryPlugin');



class DayRange {

    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery} jQueryRef reference to the jquery element
     */
    constructor(dayRange, jQueryRef) {
        this._workingDayRange = dayRange - 1;

        let pickerHtml = '<label for="start-date" style="width: 78px; display: inline-block; margin:5px;">Start Date</label>' +
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

        let dte1 = new Date();
        dte1.setHours(0, 0, 0, 0);
        let dte2 = new Date(dte1.getTime());
        dte2.setDate(dte2.getDate() + dayRange);
        dte2.setHours(23, 59, 59, 0);
        this._maxDateRange = dte2 - dte1;

        let _this = this;

        //add event listeners
        this._$startDate.change(function () {
            _this.startDate = this.value;
        });

        this._$endDate.change(function () {
            _this.endDate = this.value;
        });

        // initialize
        this.endDate = (new Date()).getTime();
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(val) {
        this._startDate = new Date(val);
        this._startDate.setHours(0, 0, 0, 0);
        this._$startDate.val(this._startDate.toLocaleDateString());

        if (this.endDate == null || this._endDate - this._startDate > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
            let tmpDate = new Date(this._startDate.getTime());
            tmpDate.setDate(tmpDate.getDate() + this._workingDayRange);
            this.endDate = tmpDate.getTime();
        }
    }

    get endDate() {
        return this._endDate;
    }


    set endDate(val) {
        this._endDate = new Date(val);
        this._endDate.setHours(23, 59, 59, 0);
        this._$endDate.val(this._endDate.toLocaleDateString());
        if (this._startDate == null || this._endDate - this.startDate > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
            let tmpDate = new Date(this._endDate.getTime());
            tmpDate.setDate(tmpDate.getDate() - this._workingDayRange);
            this.startDate = tmpDate.getTime();
        }
    }
}

nm.DayRange = DayRange;
let jQuery = $;

/**
 * Adds day range control
 * @param {number} dayRange the number of days
 * @returns {DayRange} the day range object
 */
jQuery.fn.dayRange = function (dayRange) {
    return new DayRange(dayRange, this);
};

export default DayRange;

