/**
 * Created by gavorhes on 11/4/2015.
 */
"use strict";
var provide_1 = require('./provide');
var nm = provide_1.default('util.dateConvert');
function leadingPad(inNum) {
    var strNum = inNum.toFixed();
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
function dateToYyyyMmDdHhMmSs(dte) {
    var yr = dte.getFullYear();
    var month = leadingPad(dte.getMonth() + 1);
    var day = leadingPad(dte.getDate());
    var hrs = leadingPad(dte.getHours());
    var mns = leadingPad(dte.getMinutes());
    var secs = leadingPad(dte.getSeconds());
    return yr + "-" + month + "-" + day + " " + hrs + ":" + mns + ":" + secs;
}
exports.dateToYyyyMmDdHhMmSs = dateToYyyyMmDdHhMmSs;
nm.dateToYyyyMmDdHhMmSs = dateToYyyyMmDdHhMmSs;
/**
 * Given a date return a string in the format YYYYmmdd_hh0000
 * @param {Date} dte the input date
 * @returns {string} the formatted date string
 */
function dateToYyyyMmDdHh000(dte) {
    var yr = dte.getFullYear();
    var month = leadingPad(dte.getMonth() + 1);
    var day = leadingPad(dte.getDate());
    var hrs = leadingPad(dte.getHours());
    return "" + yr + month + day + "_" + hrs + "0000";
}
exports.dateToYyyyMmDdHh000 = dateToYyyyMmDdHh000;
nm.dateToYyyyMmDdHh000 = dateToYyyyMmDdHh000;
//# sourceMappingURL=dateConvert.js.map