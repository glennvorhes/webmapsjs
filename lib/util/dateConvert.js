(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './provide'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./provide'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.provide);
        global.dateConvert = mod.exports;
    }
})(this, function (exports, _provide) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.dateToYyyyMmDdHhMmSs = dateToYyyyMmDdHhMmSs;
    exports.dateToYyyyMmDdHh000 = dateToYyyyMmDdHh000;

    var _provide2 = _interopRequireDefault(_provide);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var nm = (0, _provide2.default)('util.dateConvert'); /**
                                                          * Created by gavorhes on 11/4/2015.
                                                          */

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
        var yr = dte.getYear() + 1900;
        var month = leadingPad(dte.getMonth() + 1);
        var day = leadingPad(dte.getDate());
        var hrs = leadingPad(dte.getHours());
        var mns = leadingPad(dte.getMinutes());
        var secs = leadingPad(dte.getSeconds());

        return yr + '-' + month + '-' + day + ' ' + hrs + ':' + mns + ':' + secs;
    }

    nm.dateToYyyyMmDdHhMmSs = dateToYyyyMmDdHhMmSs;

    /**
     * Given a date return a string in the format YYYYmmdd_hh0000
     * @param {Date} dte the input date
     * @returns {string} the formatted date string
     */
    function dateToYyyyMmDdHh000(dte) {
        var yr = dte.getYear() + 1900;
        var month = leadingPad(dte.getMonth() + 1);
        var day = leadingPad(dte.getDate());
        var hrs = leadingPad(dte.getHours());

        return '' + yr + month + day + '_' + hrs + '0000';
    }

    nm.dateToYyyyMmDdHh000 = dateToYyyyMmDdHh000;
});