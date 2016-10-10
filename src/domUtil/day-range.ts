import provide from '../util/provide';
let nm = provide('domUtil');

const $ = require('jquery');
require('jquery-ui');

export class DayRange {
    _workingDayRange: number;
    _$startDate: JQuery;
    _$endDate: JQuery;
    _maxDateRange: number;
    _startDate: Date;
    _endDate: Date;

    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery|HTMLElement|*} jQueryRef reference to the jquery element
     */
    constructor(jQueryRef: JQuery, dayRange: number) {
        this._workingDayRange = dayRange - 1;

        let pickerHtml = '<label for="start-date" style="width: 78px; display: inline-block; margin:5px;">Start Date</label>' +
            '<input type="text" readonly id="start-date" class="date-pick"  style="width: 90px;">' +
            '<br><label for="end-date" style="width: 78px; display: inline-block;  margin:5px;">End Date</label>' +
            '<input type="text" readonly id="end-date" class="date-pick" style="width: 90px;">';

        jQueryRef.append(pickerHtml);

        this._$startDate = $('#start-date');
        this._$endDate = $('#end-date');

        this._$startDate['datepicker']();
        this._$endDate['datepicker']();

        this._startDate = null;
        this._endDate = null;

        let dte1 = new Date();
        dte1.setHours(0, 0, 0, 0);
        let dte2 = new Date(dte1.getTime());
        dte2.setDate(dte2.getDate() + dayRange);
        dte2.setHours(23, 59, 59, 0);
        this._maxDateRange = dte2.getTime() - dte1.getTime();

        let _this = this;

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

    get startDate(): Date {
        return this._startDate;
    }

    /**
     *
     * @param val
     */
    set startDate(val: Date) {
        if (typeof val == 'string') {
            val = new Date(val as string);
        }

        this._startDate = val;
        this._startDate.setHours(0, 0, 0, 0);
        this._$startDate.val(this._startDate.toLocaleDateString());

        if (
            this.endDate == null ||
            this._endDate.getTime() - this._startDate.getTime() > this._maxDateRange ||
            this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
            let tmpDate = new Date(this._startDate.getTime());
            tmpDate.setDate(tmpDate.getDate() + this._workingDayRange);
            this.endDate = new Date(tmpDate.getTime());
        }
    }

    get endDate(): Date {
        return this._endDate;
    }


    set endDate(val: Date) {
        if (typeof val == 'string') {
            val = new Date(val as string);
        }

        this._endDate = val;
        this._endDate.setHours(23, 59, 59, 0);
        this._$endDate.val(this._endDate.toLocaleDateString());
        if (this._startDate == null || this._endDate.getTime() - this.startDate.getTime() > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
            let tmpDate = new Date(this._endDate.getTime());
            tmpDate.setDate(tmpDate.getDate() - this._workingDayRange);
            this.startDate = new Date(tmpDate.getTime());
        }
    }
}

nm.DayRange = DayRange;


export default DayRange;

