/**
 * Created by glenn on 6/12/2017.
 */
"use strict";
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
var reactRedux_1 = require("./reactRedux");
require("jquery-ui");
var makeGuid_1 = require("../util/makeGuid");
var fixDate = require("./helpers/dateFormat");
var DatePick_1 = require("./DatePick");
var DateRange = (function (_super) {
    __extends(DateRange, _super);
    function DateRange(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.startId = makeGuid_1.default();
        _this.endId = makeGuid_1.default();
        _this.maxRange = Math.round(_this.props.maxRange) - 1;
        _this.minRange = typeof _this.props['minRange'] == 'number' ? Math.round(_this.props['minRange']) : 1;
        if (_this.minRange > _this.maxRange) {
            throw "DateRange component: Max range must be greater than min range";
        }
        _this.end = new Date();
        _this.end.setHours(0, 0, 0);
        _this.start = new Date(_this.end);
        _this.start.setDate(_this.start.getDate() - _this.maxRange);
        _this.setNumDays();
        return _this;
    }
    DateRange.prototype.setNumDays = function () {
        this.numDays = Math.round((this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    };
    DateRange.prototype.componentDidMount = function () {
        this.startInput = document.getElementById(this.startId);
        this.endInput = document.getElementById(this.endId);
        this.props.callback(this.start, this.end);
    };
    Object.defineProperty(DateRange.prototype, "needReset", {
        get: function () {
            return this.numDays > this.maxRange || this.numDays < this.minRange;
        },
        enumerable: true,
        configurable: true
    });
    DateRange.prototype.setStart = function (s) {
        this.start = fixDate.stringToDate(s);
        this.setNumDays();
        if (this.needReset) {
            this.end = new Date(this.start);
            if (this.numDays > this.maxRange) {
                this.end.setDate(this.end.getDate() + this.maxRange);
            }
            else {
                this.end.setDate(this.end.getDate() + this.minRange - 1);
            }
            this.endInput.value = fixDate.dateToString(this.end);
            this.setNumDays();
        }
        this.props.callback(this.start, this.end);
    };
    DateRange.prototype.setEnd = function (s) {
        this.end = fixDate.stringToDate(s);
        this.setNumDays();
        if (this.needReset) {
            this.start = new Date(this.end);
            if (this.numDays > this.maxRange) {
                this.start.setDate(this.start.getDate() - this.maxRange);
            }
            else {
                this.start.setDate(this.start.getDate() - this.minRange + 1);
            }
            this.startInput.value = fixDate.dateToString(this.start);
            this.setNumDays();
        }
        this.props.callback(this.start, this.end);
    };
    DateRange.prototype.render = function () {
        var _this = this;
        return <div>
            <DatePick_1.default id={this.startId} label="Start" initialDate={this.start} change={function (s) { _this.setStart(s); }}/>
            <DatePick_1.default id={this.endId} label="End" initialDate={this.end} change={function (s) { _this.setEnd(s); }}/>
        </div>;
    };
    return DateRange;
}(reactRedux_1.React.Component));
exports.DateRange = DateRange;
//# sourceMappingURL=DateRange.jsx.map