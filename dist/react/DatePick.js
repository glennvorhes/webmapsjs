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
Object.defineProperty(exports, "__esModule", { value: true });
var reactRedux_1 = require("./reactRedux");
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
        _this.defaultId = makeGuid_1.default();
        return _this;
    }
    DatePick.prototype.componentDidMount = function () {
        var _this = this;
        var $el = $('#' + (this.props.id || this.defaultId));
        $el.datepicker({
            onSelect: function () {
                _this.props.change($el.val());
            }
        });
    };
    DatePick.prototype.render = function () {
        return reactRedux_1.React.createElement("span", null,
            reactRedux_1.React.createElement("label", null, this.props.label),
            reactRedux_1.React.createElement("input", { id: this.props.id || this.defaultId, type: "text", style: { margin: "0 10px 0 5px", width: '73px', textAlign: 'center' }, defaultValue: dateFormat_1.dateToString(this.props.initialDate || new Date()), readOnly: true }));
    };
    return DatePick;
}(reactRedux_1.React.Component));
exports.DatePick = DatePick;
exports.default = DatePick;
//# sourceMappingURL=DatePick.js.map