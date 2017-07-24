/**
 * Created by glenn on 6/12/2017.
 */

import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jquery-ui';
import makeGuid from '../util/makeGuid';
import * as fixDate from './helpers/dateFormat';
import DatePick from './DatePick';


export class DateRange extends React.Component<{
    maxRange: number,
    callback: (start: string|Date, end: string|Date) => any,
    minRange?: number
}, null> {
    startId = makeGuid();
    endId = makeGuid();
    startInput: HTMLInputElement;
    endInput: HTMLInputElement;
    start: Date;
    end: Date;
    maxRange: number;
    minRange: number;
    numDays: number;

    constructor(props, context) {
        super(props, context);

        this.maxRange = Math.round(this.props.maxRange) - 1;
        this.minRange = typeof this.props['minRange'] == 'number' ? Math.round(this.props['minRange']) : 1;

        if (this.minRange > this.maxRange) {
            throw "DateRange component: Max range must be greater than min range";
        }

        this.end = new Date();
        this.end.setHours(0, 0, 0);
        this.start = new Date(this.end);
        this.start.setDate(this.start.getDate() - this.maxRange);
        this.setNumDays();
    }

    setNumDays() {
        this.numDays = Math.round((this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }


    componentDidMount() {
        this.startInput = document.getElementById(this.startId) as HTMLInputElement;
        this.endInput = document.getElementById(this.endId) as HTMLInputElement;
        this.props.callback(this.start, this.end);
    }

    get needReset(): boolean {
        return this.numDays > this.maxRange || this.numDays < this.minRange;
    }

    setStart(s: string) {
        this.start = fixDate.stringToDate(s);
        this.setNumDays();

        if (this.needReset) {
            this.end = new Date(this.start);

            if (this.numDays > this.maxRange) {
                this.end.setDate(this.end.getDate() + this.maxRange);
            } else {
                this.end.setDate(this.end.getDate() + this.minRange - 1);
            }

            this.endInput.value = fixDate.dateToString(this.end);
            this.setNumDays();
        }
        this.props.callback(this.start, this.end);
    }

    setEnd(s: string) {
        this.end = fixDate.stringToDate(s);
        this.setNumDays();

        if (this.needReset) {
            this.start = new Date(this.end);

            if (this.numDays > this.maxRange) {
                this.start.setDate(this.start.getDate() - this.maxRange);
            } else {
                this.start.setDate(this.start.getDate() - this.minRange + 1);
            }

            this.startInput.value = fixDate.dateToString(this.start);
            this.setNumDays();
        }
        this.props.callback(this.start, this.end);
    }

    render() {
        return <div>
            <DatePick id={this.startId} label="Start" initialDate={this.start} change={(s) => {this.setStart(s)}}/>
            <DatePick id={this.endId} label="End" initialDate={this.end} change={(s) => {this.setEnd(s)}}/>
        </div>;
    }
}
