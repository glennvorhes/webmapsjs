"use strict";
/**
 * Created by gavorhes on 9/22/2016.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var reactAndRedux_1 = require("../../reactComponents/reactAndRedux");
var DatePick_1 = require("../../reactComponents/DatePick");
var DateRange_1 = require("../../reactComponents/DateRange");
var reacttst_connect_1 = require("./reacttst_connect");
var s = require("./reacttst_store");
var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Demo.prototype.render = function () {
        return reactAndRedux_1.React.createElement("div", null,
            reactAndRedux_1.React.createElement("h1", null, "Date Pick"),
            reactAndRedux_1.React.createElement(DatePick_1.DatePick, { label: 'Date Picker', change: function (v) {
                    console.log(v);
                } }),
            reactAndRedux_1.React.createElement("h1", null, "Date Pick Connected"),
            reactAndRedux_1.React.createElement(reacttst_connect_1.DatePickConnected, null),
            reactAndRedux_1.React.createElement("h1", null, "Date Range"),
            reactAndRedux_1.React.createElement(DateRange_1.DateRange, { maxRange: 10, initialEnd: new Date(), minRange: 1, callback: function (start, end) {
                    console.log(start, end);
                } }),
            reactAndRedux_1.React.createElement("h1", null, "Date Range Connected"),
            reactAndRedux_1.React.createElement(reacttst_connect_1.DateRangeConnected, null));
    };
    return Demo;
}(reactAndRedux_1.React.Component));
reactAndRedux_1.ReactDom.render(reactAndRedux_1.React.createElement(reactAndRedux_1.Provider, { store: s.theStore },
    reactAndRedux_1.React.createElement(Demo, null)), document.getElementById("example"));
s.theStore.subscribe(function () {
    console.log(s.getState());
});
setInterval(function () {
    var state = s.getState();
    // console.log(state.oneDate);
    // s.store.dispatch({type: s.ACTION_SET_ONE_DATE, d: state.oneDate.setDate(state.oneDate.getDate() - 1)});
}, 1000);
//# sourceMappingURL=reacttst.js.map