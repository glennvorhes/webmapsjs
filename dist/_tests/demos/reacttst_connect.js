"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reactAndRedux_1 = require("../../reactComponents/reactAndRedux");
var DatePick_1 = require("../../reactComponents/DatePick");
var DateRange_1 = require("../../reactComponents/DateRange");
var actions = require("./reacttst_actions");
exports.DatePickConnected = reactAndRedux_1.connect(function (state) {
    return {
        label: 'Date Picker Connected',
        change: function (v) {
            console.log(v);
        },
        val: state.oneDate
    };
}, function (dispatch) {
    return {
        change: function (v) {
            dispatch({ type: actions.SET_ONE_DATE, d: v });
        }
    };
})(DatePick_1.DatePick);
exports.DateRangeConnected = reactAndRedux_1.connect(function (state) {
    return {
        maxRange: 10,
        start: state.twoDates.start,
        end: state.twoDates.end,
    };
}, function (dispatch) {
    return {
        callback: function (s, e) {
            dispatch({ type: actions.SET_TWO_DATES, start: s, end: e });
        }
    };
})(DateRange_1.DateRange);
//# sourceMappingURL=reacttst_connect.js.map