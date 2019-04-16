"use strict";
/**
 * Created by glenn on 6/12/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var reactAndRedux_1 = require("./reactAndRedux");
require("jquery-ui");
var makeGuid_1 = require("../util/makeGuid");
var fixDate = require("./helpers/dateFormat");
var DatePick_1 = require("./DatePick");
function stringToDate(dte) {
    if (dte.getTime) {
        return dte;
    }
    else {
        return new Date(dte);
    }
}
var DateRange = /** @class */ (function (_super) {
    __extends(DateRange, _super);
    function DateRange(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.startId = makeGuid_1.default();
        _this.endId = makeGuid_1.default();
        _this.versionTwoStart = new Date(2017, 1, 1);
        _this.maxRange = Math.round(_this.props.maxRange) - 1;
        _this.minRange = typeof _this.props['minRange'] == 'number' ? Math.round(_this.props['minRange']) : 1;
        if (_this.minRange > _this.maxRange) {
            throw "DateRange component: Max range must be greater than min range";
        }
        if (_this.props.initialEnd) {
            _this.end = stringToDate(_this.props.initialEnd);
        }
        else {
            _this.end = new Date();
        }
        _this.end.setHours(0, 0, 0);
        _this.start = new Date(_this.end.getTime());
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
        this.props.callback(this.start, this.end, this.version);
    };
    Object.defineProperty(DateRange.prototype, "needReset", {
        get: function () {
            return this.numDays > this.maxRange || this.numDays < this.minRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "versionSpan", {
        get: function () {
            if (this.start < this.versionTwoStart && this.end >= this.versionTwoStart) {
                return true;
            }
            else if (fixDate.dateToString(this.versionTwoStart) === fixDate.dateToString(this.end) && this.start < this.versionTwoStart) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "version", {
        get: function () {
            if (fixDate.dateToString(this.start) == fixDate.dateToString(this.versionTwoStart)) {
                return 2;
            }
            else if (this.start >= this.versionTwoStart) {
                return 2;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    DateRange.prototype.finalizeChange = function () {
        if (this.props.npmrds) {
            if (this.versionSpan) {
                this.start = this.previousStart;
                this.end = this.previousEnd;
                this.startInput.value = fixDate.dateToString(this.start);
                this.endInput.value = fixDate.dateToString(this.end);
                this.setNumDays();
                alert("Start and End dates must not span version break: " + fixDate.dateToString(this.versionTwoStart));
                return;
            }
        }
        this.props.callback(this.start, this.end, this.version);
    };
    DateRange.prototype.setStart = function (s) {
        this.previousStart = new Date(this.start.getTime());
        this.previousEnd = new Date(this.end.getTime());
        this.start = s;
        this.setNumDays();
        if (this.needReset) {
            this.end = new Date(this.start.getTime());
            if (this.numDays > this.maxRange) {
                this.end.setDate(this.end.getDate() + this.maxRange);
            }
            else {
                this.end.setDate(this.end.getDate() + this.minRange - 1);
            }
            this.endInput.value = fixDate.dateToString(this.end);
            this.setNumDays();
        }
        this.finalizeChange();
    };
    DateRange.prototype.setEnd = function (s) {
        this.previousStart = new Date(this.start.getTime());
        this.previousEnd = new Date(this.end.getTime());
        this.end = s;
        this.setNumDays();
        if (this.needReset) {
            this.start = new Date(this.end.getTime());
            if (this.numDays > this.maxRange) {
                this.start.setDate(this.start.getDate() - this.maxRange);
            }
            else {
                this.start.setDate(this.start.getDate() - this.minRange + 1);
            }
            this.startInput.value = fixDate.dateToString(this.start);
            this.setNumDays();
        }
        this.finalizeChange();
    };
    DateRange.prototype.render = function () {
        var _this = this;
        return reactAndRedux_1.React.createElement("div", { className: "date-range" },
            reactAndRedux_1.React.createElement(DatePick_1.default, { id: this.startId, label: "Start", initialDate: this.start, change: function (s) { _this.setStart(s); } }),
            reactAndRedux_1.React.createElement(DatePick_1.default, { id: this.endId, label: "End", initialDate: this.end, change: function (s) { _this.setEnd(s); } }));
    };
    return DateRange;
}(reactAndRedux_1.React.Component));
exports.DateRange = DateRange;
//# sourceMappingURL=DateRange.js.map