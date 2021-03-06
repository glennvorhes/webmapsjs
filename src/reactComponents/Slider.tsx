/**
 * Created by glenn on 7/6/2017.
 */

import {React} from './reactAndRedux';
import makeGuid from '../util/makeGuid';
import {ChangeEvent} from "react";
import {get_browser} from '../util/get_browser';

export interface iSlider {
    change: (d: number) => any;
    steps?: number;
    animate?: boolean;
    defaultAnimationInterval?: number;
    value?: number;
}

export class Slider extends React.Component<iSlider, null> {
    private uid: string;
    private startUid: string;
    private stopUid: string;
    private previousUid: string;
    private nextUid: string;
    private intervalUid: string;
    private el: HTMLInputElement;
    private previousButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private startButton: HTMLButtonElement;
    private stopButton: HTMLButtonElement;
    private intervalSelect: HTMLSelectElement;
    private interval: number;
    private running: boolean;
    private minVal: number;
    private maxVal: number;
    private step: number;

    constructor(props: iSlider, context: Object) {
        super(props, context);
        this.uid = makeGuid();
        this.startUid = makeGuid();
        this.stopUid = makeGuid();
        this.intervalUid = makeGuid();
        this.previousUid = makeGuid();
        this.nextUid = makeGuid();
        this.running = false;
    }

    componentDidMount() {
        this.el = document.getElementById(this.uid) as HTMLInputElement;
        this.minVal = parseFloat(this.el.min);
        this.maxVal = parseFloat(this.el.max);
        this.step = parseFloat(this.el.step);
        this.startButton = document.getElementById(this.startUid) as HTMLButtonElement;
        this.stopButton = document.getElementById(this.stopUid) as HTMLButtonElement;
        if (this.props.animate){
            this.stopButton.style.display = 'none';
        }
        this.previousButton = document.getElementById(this.previousUid) as HTMLButtonElement;
        this.nextButton = document.getElementById(this.nextUid) as HTMLButtonElement;
        this.intervalSelect = document.getElementById(this.intervalUid) as HTMLSelectElement;

        if (get_browser().name.toUpperCase().indexOf('IE') > -1) {
            this.el.onchange = (e) => {
                this.props.change(parseFloat(e.target['value']))
            }
        }
    }

    updateRunning() {
        this.el.disabled = this.running;

        this.startButton.style.display = this.running ? 'none' : '';
        this.stopButton.style.display = this.running ? '' : 'none';

        this.nextButton.disabled = this.running;
        this.previousButton.disabled = this.running;
    }

    startAnimate() {
        this.running = true;
        this.updateRunning();
        this.interval = setInterval(() => {
            let val = parseFloat(this.el.value);
            val += this.step;
            if (val > this.maxVal) {
                val = this.minVal
            }

            this.el.value = val.toString();
            this.props.change(val);
        }, parseInt(this.intervalSelect.value));
    }

    stopAnimate() {
        clearInterval(this.interval);
        this.running = false;
        this.updateRunning();
    }

    restartAnimate() {
        if (this.running) {
            this.stopAnimate();
            this.startAnimate();
        }
    }

    increment(v: number) {
        let val = parseFloat(this.el.value);
        val = v > 0 ? val + this.step : val - this.step;
        this.el.value = val.toString();
        this.props.change(val);
    }

    render() {
        let attrs = {
            id: this.uid,
            min: 0,
            type: 'range',
            onChange: (evt: ChangeEvent<HTMLInputElement>) => {
                this.props.change(parseFloat(evt.target.value))
            },
            style: {width: '100%', padding: '4px 0'},
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
        } else {
            delete attrs.value;
        }


        let start = null;
        let stop = null;
        let previous = null;
        let next = null;
        let intervalSelect = null;

        let interval = "200";

        if (this.props.defaultAnimationInterval){
            interval = this.props.defaultAnimationInterval.toFixed();
        }

        if (this.props.animate) {
            previous = <button id={this.previousUid} className="react-slider-previous" onClick={() => {
                this.increment(-1)
            }} title="Previous"/>;

            next = <button id={this.nextUid} className="react-slider-next" onClick={() => {
                this.increment(1)
            }} title="Next"/>;

            start = <button id={this.startUid} className="react-slider-start" onClick={() => {
                this.startAnimate()
            }} title="Start"/>;

            stop = <button id={this.stopUid} className="react-slider-stop" onClick={() => {
                this.stopAnimate()
            }} title="Stop"/>;

            intervalSelect = <span>

            <label style={{fontWeight: 'bold', marginRight: '3px'}}>Interval (s)</label>
            <select defaultValue={interval} id={this.intervalUid} onChange={() => {
                this.restartAnimate()
            }}>
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

        return <div className="react-slider">
            <input {...attrs}/>
            <div className="react-slider-controls" style={{textAlign: 'center'}}>
                {previous}{start}{stop}{next}{intervalSelect}
            </div>
        </div>
    }

}