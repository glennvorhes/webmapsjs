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
    value?: number;
}

export class Slider extends React.Component<iSlider, null>{
    uid: string;
    startUid: string;
    endUid: string;
    intervalUid: string;
    el: HTMLInputElement;
    startButton: HTMLButtonElement;
    endButton: HTMLButtonElement;
    intervalSelect: HTMLSelectElement;
    interval: number;
    running: boolean;
    minVal: number;
    maxVal: number;
    step: number;

    constructor(props: iSlider, context: Object) {
        super(props, context);
        this.uid = makeGuid();
        this.startUid = makeGuid();
        this.endUid = makeGuid();
        this.intervalUid = makeGuid();
        this.running = false;
    }

    componentDidMount() {
        this.el = document.getElementById(this.uid) as HTMLInputElement;
        this.minVal = parseFloat(this.el.min);
        this.maxVal = parseFloat(this.el.max);
        this.step = parseFloat(this.el.step);
        this.startButton = document.getElementById(this.startUid) as HTMLButtonElement;
        this.endButton = document.getElementById(this.endUid) as HTMLButtonElement;
        this.intervalSelect = document.getElementById(this.intervalUid) as HTMLSelectElement;

        if (get_browser().name.toUpperCase().indexOf('IE') > -1){
            this.el.onchange = (e) => {
                this.props.change(parseFloat(e.target['value']))
            }
        }
    }

    updateRunning() {
        this.startButton.disabled = this.running;
        this.el.disabled = this.running;
        this.endButton.disabled = !this.running;
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
            console.log(parseFloat(this.el.value));
        }, parseInt(this.intervalSelect.value));
    }

    stopAnimate() {
        clearInterval(this.interval);
        this.running = false;
        this.updateRunning();
    }

    restartAnimate(){
        if (this.running){
            this.stopAnimate();
            this.startAnimate();
        }
    }

    render() {
        let attrs = {
            id: this.uid,
            min: 0,
            type: 'range',
            onChange: (evt: ChangeEvent<HTMLInputElement>) => {this.props.change(parseFloat(evt.target.value))},
            style: {width: '100%'},
            max: "100",
            step: '0.1',
            value: this.props.value ? this.props.value.toString(): '0',
            defaultValue: "0"
        };

        if (this.props.steps){
            attrs.max = this.props.steps.toString();
            attrs.step = '1';
        }

        if (this.props.value){
            delete attrs.defaultValue;
            // attrs['value'] = this.props.value.toString()
        } else {
            delete attrs.value;
            // attrs['defaultValue'] = "0";
        }


        let start = null;
        let stop = null;
        let intervalSelect = null;

        if (this.props.animate) {
            start = <button id={this.startUid} onClick={() => {
                this.startAnimate()
            }}>Start</button>;

            stop = <button id={this.endUid} onClick={() => {
                this.stopAnimate()
            }}>Stop</button>;

            intervalSelect = <span>
            <label>Interval (s)</label>
            <select defaultValue="200" id={this.intervalUid} onChange={() => {this.restartAnimate()}}>
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
        </div>
    }

}