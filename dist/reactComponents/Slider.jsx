/**
 * Created by glenn on 7/6/2017.
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
var makeGuid_1 = require("../util/makeGuid");
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.uid = makeGuid_1.default();
        _this.startUid = makeGuid_1.default();
        _this.endUid = makeGuid_1.default();
        _this.intervalUid = makeGuid_1.default();
        _this.running = false;
        return _this;
    }
    Slider.prototype.componentDidMount = function () {
        this.el = document.getElementById(this.uid);
        this.minVal = parseFloat(this.el.min);
        this.maxVal = parseFloat(this.el.max);
        this.step = parseFloat(this.el.step);
        this.startButton = document.getElementById(this.startUid);
        this.endButton = document.getElementById(this.endUid);
        this.intervalSelect = document.getElementById(this.intervalUid);
    };
    Slider.prototype.updateRunning = function () {
        this.startButton.disabled = this.running;
        this.el.disabled = this.running;
        this.endButton.disabled = !this.running;
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
            console.log(parseFloat(_this.el.value));
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
    Slider.prototype.render = function () {
        var _this = this;
        var attrs = {
            id: this.uid,
            min: 0,
            type: 'range',
            onChange: function (evt) { _this.props.change(parseFloat(evt.target.value)); },
            style: { width: '100%' },
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
            // attrs['value'] = this.props.value.toString()
        }
        else {
            delete attrs.value;
            // attrs['defaultValue'] = "0";
        }
        var start = null;
        var stop = null;
        var intervalSelect = null;
        if (this.props.animate) {
            start = <button id={this.startUid} onClick={function () {
                _this.startAnimate();
            }}>Start</button>;
            stop = <button id={this.endUid} onClick={function () {
                _this.stopAnimate();
            }}>Stop</button>;
            intervalSelect = <span>
            <label>Interval (s)</label>
            <select defaultValue="200" id={this.intervalUid} onChange={function () { _this.restartAnimate(); }}>
                <option value="100">0.1</option>
                <option value="200">0.2</option>
                <option value="300">0.3</option>
                <option value="400">0.4</option>
                <option value="500">0.5</option>
                <option value="600">0.6</option>
                <option value="700">0.7</option>
                <option value="800">0.8</option>
                <option value="900">0.9</option>
                <option value="1000">1.0</option>
            </select>
            </span>;
        }
        return <div>
             <input {...attrs}/>
            {start}{stop}{intervalSelect}
        </div>;
    };
    return Slider;
}(reactAndRedux_1.React.Component));
exports.Slider = Slider;
//# sourceMappingURL=Slider.jsx.map