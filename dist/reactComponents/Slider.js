"use strict";
/**
 * Created by glenn on 7/6/2017.
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
var makeGuid_1 = require("../util/makeGuid");
var get_browser_1 = require("../util/get_browser");
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.uid = makeGuid_1.default();
        _this.startUid = makeGuid_1.default();
        _this.stopUid = makeGuid_1.default();
        _this.intervalUid = makeGuid_1.default();
        _this.previousUid = makeGuid_1.default();
        _this.nextUid = makeGuid_1.default();
        _this.running = false;
        return _this;
    }
    Slider.prototype.componentDidMount = function () {
        var _this = this;
        this.el = document.getElementById(this.uid);
        this.minVal = parseFloat(this.el.min);
        this.maxVal = parseFloat(this.el.max);
        this.step = parseFloat(this.el.step);
        this.startButton = document.getElementById(this.startUid);
        this.stopButton = document.getElementById(this.stopUid);
        if (this.props.animate) {
            this.stopButton.style.display = 'none';
        }
        this.previousButton = document.getElementById(this.previousUid);
        this.nextButton = document.getElementById(this.nextUid);
        this.intervalSelect = document.getElementById(this.intervalUid);
        if (get_browser_1.get_browser().name.toUpperCase().indexOf('IE') > -1) {
            this.el.onchange = function (e) {
                _this.props.change(parseFloat(e.target['value']));
            };
        }
    };
    Slider.prototype.updateRunning = function () {
        this.el.disabled = this.running;
        this.startButton.style.display = this.running ? 'none' : '';
        this.stopButton.style.display = this.running ? '' : 'none';
        this.nextButton.disabled = this.running;
        this.previousButton.disabled = this.running;
    };
    Slider.prototype.startAnimate = function () {
        var _this = this;
        this.running = true;
        this.updateRunning();
        this.interval = setInterval(function () {
            var val = parseFloat(_this.el.value);
            val += _this.step;
            if (val > _this.maxVal) {
                val = _this.minVal;
            }
            _this.el.value = val.toString();
            _this.props.change(val);
        }, parseInt(this.intervalSelect.value));
    };
    Slider.prototype.stopAnimate = function () {
        clearInterval(this.interval);
        this.running = false;
        this.updateRunning();
    };
    Slider.prototype.restartAnimate = function () {
        if (this.running) {
            this.stopAnimate();
            this.startAnimate();
        }
    };
    Slider.prototype.increment = function (v) {
        var val = parseFloat(this.el.value);
        val = v > 0 ? val + this.step : val - this.step;
        this.el.value = val.toString();
        this.props.change(val);
    };
    Slider.prototype.render = function () {
        var _this = this;
        var attrs = {
            id: this.uid,
            min: 0,
            type: 'range',
            onChange: function (evt) {
                _this.props.change(parseFloat(evt.target.value));
            },
            style: { width: '100%', padding: '4px 0' },
            max: "100",
            step: '0.1',
            value: this.props.value ? this.props.value.toString() : '0',
            defaultValue: "0"
        };
        if (this.props.steps) {
            attrs.max = this.props.steps.toString();
            attrs.step = '1';
        }
        if (this.props.value) {
            delete attrs.defaultValue;
        }
        else {
            delete attrs.value;
        }
        var start = null;
        var stop = null;
        var previous = null;
        var next = null;
        var intervalSelect = null;
        var interval = "200";
        if (this.props.defaultAnimationInterval) {
            interval = this.props.defaultAnimationInterval.toFixed();
        }
        if (this.props.animate) {
            previous = reactAndRedux_1.React.createElement("button", { id: this.previousUid, className: "react-slider-previous", onClick: function () {
                    _this.increment(-1);
                }, title: "Previous" });
            next = reactAndRedux_1.React.createElement("button", { id: this.nextUid, className: "react-slider-next", onClick: function () {
                    _this.increment(1);
                }, title: "Next" });
            start = reactAndRedux_1.React.createElement("button", { id: this.startUid, className: "react-slider-start", onClick: function () {
                    _this.startAnimate();
                }, title: "Start" });
            stop = reactAndRedux_1.React.createElement("button", { id: this.stopUid, className: "react-slider-stop", onClick: function () {
                    _this.stopAnimate();
                }, title: "Stop" });
            intervalSelect = reactAndRedux_1.React.createElement("span", null,
                reactAndRedux_1.React.createElement("label", { style: { fontWeight: 'bold', marginRight: '3px' } }, "Interval (s)"),
                reactAndRedux_1.React.createElement("select", { defaultValue: interval, id: this.intervalUid, onChange: function () {
                        _this.restartAnimate();
                    } },
                    reactAndRedux_1.React.createElement("option", { value: "100" }, "0.1"),
                    reactAndRedux_1.React.createElement("option", { value: "200" }, "0.2"),
                    reactAndRedux_1.React.createElement("option", { value: "300" }, "0.3"),
                    reactAndRedux_1.React.createElement("option", { value: "400" }, "0.4"),
                    reactAndRedux_1.React.createElement("option", { value: "500" }, "0.5"),
                    reactAndRedux_1.React.createElement("option", { value: "600" }, "0.6"),
                    reactAndRedux_1.React.createElement("option", { value: "700" }, "0.7"),
                    reactAndRedux_1.React.createElement("option", { value: "800" }, "0.8"),
                    reactAndRedux_1.React.createElement("option", { value: "900" }, "0.9"),
                    reactAndRedux_1.React.createElement("option", { value: "1000" }, "1.0")));
        }
        return reactAndRedux_1.React.createElement("div", { className: "react-slider" },
            reactAndRedux_1.React.createElement("input", __assign({}, attrs)),
            reactAndRedux_1.React.createElement("div", { className: "react-slider-controls", style: { textAlign: 'center' } },
                previous,
                start,
                stop,
                next,
                intervalSelect));
    };
    return Slider;
}(reactAndRedux_1.React.Component));
exports.Slider = Slider;
//# sourceMappingURL=Slider.js.map