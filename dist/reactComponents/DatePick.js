/**
 * Created by glenn on 6/14/2017.
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reactAndRedux_1 = require("./reactAndRedux");
var $ = require("jquery");
require("jquery-ui");
var makeGuid_1 = require("../util/makeGuid");
var dateFormat_1 = require("./helpers/dateFormat");
/**
 * params label, id, initialDate, change callback with value as string
 */
var DatePick = (function (_super) {
    __extends(DatePick, _super);
    function DatePick(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.elId = _this.props.id || makeGuid_1.default();
        return _this;
    }
    DatePick.prototype.componentDidMount = function () {
        var _this = this;
        var $el = $('#' + this.elId);
        $el.datepicker({
            onSelect: function () {
                _this.props.change(dateFormat_1.stringToDate($el.val()));
            }
        });
    };
    DatePick.prototype.render = function () {
        var params = {
            id: this.elId,
            type: 'text',
            style: { margin: "0 10px 0 5px", width: '73px', textAlign: 'center' },
            readOnly: true
        };
        if (this.props.val) {
            params['value'] = dateFormat_1.dateToString(this.props.val);
        }
        else {
            params['defaultValue'] = dateFormat_1.dateToString(this.props.initialDate || new Date());
        }
        return reactAndRedux_1.React.createElement("span", { className: "date-pick" },
            reactAndRedux_1.React.createElement("label", { htmlFor: this.elId }, this.props.label),
            reactAndRedux_1.React.createElement("input", __assign({}, params)));
    };
    return DatePick;
}(reactAndRedux_1.React.Component));
exports.DatePick = DatePick;
exports.default = DatePick;
//# sourceMappingURL=DatePick.js.map