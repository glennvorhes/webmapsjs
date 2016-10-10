/**
 * Created by gavorhes on 11/4/2015.
 */

import provide from './provide';
let nm = provide('util.dateConvert');

function leadingPad(inNum) {
    let strNum = inNum.toFixed();
    if (strNum.length < 2) {
        strNum = '0' + strNum;
    }

    return strNum;
}

nm.leadingPad = leadingPad;

/**
 * Given a date return a string in the format YYYY-mm-dd hh:MM:SS
 * @param {Date} dte to convert
 * @returns {string} the formatted date string
 */
export function dateToYyyyMmDdHhMmSs(dte: Date): string {
    let yr = dte.getFullYear();
    let month = leadingPad(dte.getMonth() + 1);
    let day = leadingPad(dte.getDate());
    let hrs = leadingPad(dte.getHours());
    let mns = leadingPad(dte.getMinutes());
    let secs = leadingPad(dte.getSeconds());

    return `${yr}-${month}-${day} ${hrs}:${mns}:${secs}`;
}

nm.dateToYyyyMmDdHhMmSs = dateToYyyyMmDdHhMmSs;


/**
 * Given a date return a string in the format YYYYmmdd_hh0000
 * @param {Date} dte the input date
 * @returns {string} the formatted date string
 */
export function dateToYyyyMmDdHh000(dte: Date): string {

    let yr = dte.getFullYear();
    let month = leadingPad(dte.getMonth() + 1);
    let day = leadingPad(dte.getDate());
    let hrs = leadingPad(dte.getHours());

    return `${yr}${month}${day}_${hrs}0000`;
}

nm.dateToYyyyMmDdHh000 = dateToYyyyMmDdHh000;
