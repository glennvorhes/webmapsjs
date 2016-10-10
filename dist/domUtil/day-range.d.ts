/// <reference types="jquery" />
export declare class DayRange {
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
    constructor(jQueryRef: JQuery, dayRange: number);
    /**
     *
     * @param val
     */
    startDate: Date;
    endDate: Date;
}
export default DayRange;
