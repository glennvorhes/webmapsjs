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
var reactAndRedux_1 = require("./reactAndRedux");
require("jquery-ui");
var makeGuid_1 = require("../util/makeGuid");
var RadioItem = (function (_super) {
    __extends(RadioItem, _super);
    function RadioItem(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.guid = makeGuid_1.default();
        return _this;
    }
    RadioItem.prototype.render = function () {
        var _this = this;
        var style = {};
        if (this.props.inline) {
            style = {
                display: 'inline-block',
                padding: '0 5px'
            };
        }
        var props = {
            id: this.guid,
            type: "radio",
            name: this.props.groupId,
            value: typeof this.props.index == 'undefined' ? this.props.text : this.props.index.toFixed(),
            onChange: function (evt) {
                _this.props.change(evt.target.value);
                evt.target.checked = true;
            },
            checked: this.props.checked,
            defaultChecked: this.props.checked
        };
        if (this.props.connected) {
            delete props.defaultChecked;
        }
        else {
            delete props.checked;
        }
        return <li style={style}>
            <input {...props}/>
            <label htmlFor={this.guid}>{this.props.text}</label>
        </li>;
    };
    return RadioItem;
}(reactAndRedux_1.React.Component));
var RadioBase = (function (_super) {
    __extends(RadioBase, _super);
    function RadioBase(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.inline = _this.props.inline || false;
        _this.groupId = _this.props.title.toLowerCase().replace(/ /g, '');
        return _this;
    }
    RadioBase.prototype.render = function () {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.props.items.length; i++) {
            var itemProps = {
                groupId: this.groupId,
                text: this.props.items[i],
                inline: this.props.inline,
                change: function (s) { return (_this.props.callback(s)); },
                key: this.props.items[i],
                connected: this.props.connected || false,
                checked: false,
                index: i
            };
            if (typeof this.props.selectedValueOrIndex == 'number') {
                itemProps.checked = i == this.props.selectedValueOrIndex;
            }
            else {
                itemProps.checked = this.props.items[i] == this.props.selectedValueOrIndex;
                delete itemProps.index;
            }
            arr.push(<RadioItem {...itemProps}/>);
        }
        var classes = ['radio-list'];
        if (this.props.classes) {
            classes = classes.concat(this.props.classes);
        }
        return <div className={classes.join(' ')}>
            <h4>{this.props.title}</h4>
            <ul style={{ listStyle: 'none' }}>
                {arr}
            </ul>
        </div>;
    };
    return RadioBase;
}(reactAndRedux_1.React.Component));
var Radio = (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radio.prototype.render = function () {
        return <RadioBase title={this.props.title} items={this.props.items} callback={this.props.callback} inline={this.props.inline} selectedValueOrIndex={this.props.defaultValue} connected={false} classes={this.props.classes}/>;
    };
    return Radio;
}(reactAndRedux_1.React.Component));
exports.Radio = Radio;
var RadioConnected = (function (_super) {
    __extends(RadioConnected, _super);
    function RadioConnected() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioConnected.prototype.render = function () {
        return <RadioBase title={this.props.title} items={this.props.items} callback={this.props.callback} inline={this.props.inline} selectedValueOrIndex={this.props.selectedIndex} connected={true} classes={this.props.classes}/>;
    };
    return RadioConnected;
}(reactAndRedux_1.React.Component));
exports.RadioConnected = RadioConnected;
//# sourceMappingURL=Radio.jsx.map