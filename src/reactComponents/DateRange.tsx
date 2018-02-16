/**
 * Created by glenn on 6/12/2017.
 */

import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jquery-ui';
import makeGuid from '../util/makeGuid';
import * as fixDate from './helpers/dateFormat';
import DatePick from './DatePick';

function stringToDate(dte: string|Date){
    if ((dte as Date).getTime){
        return dte as Date;
    } else {
        return new Date(dte);
    }
}

export interface iDateRange{
    maxRange: number;
    callback: (start: Date, end: Date) => any;
    minRange?: number;
    maxDate?: Date;
    minDate?: Date;
    initialEnd?: Date;
    start?: Date;
    end?: Date;
}


export class DateRange extends React.Component<iDateRange, null> {
    startId = makeGuid();
    endId = makeGuid();
    startInput: HTMLInputElement;
    endInput: HTMLInputElement;
    start: Date;
    end: Date;
    maxRange: number;
    minRange: number;
    numDays: number;


    constructor(props: iDateRange, context: Object) {
        super(props, context);

        this.maxRange = Math.round(this.props.maxRange) - 1;
        this.minRange = typeof this.props['minRange'] == 'number' ? Math.round(this.props['minRange']) : 1;

        if (this.minRange > this.maxRange) {
            throw "DateRange component: Max range must be greater than min range";
        }

        if (this.props.initialEnd){
            this.end = stringToDate(this.props.initialEnd)
        } else {
            this.end = new Date();
        }

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

    private get needReset(): boolean {
        return this.numDays > this.maxRange || this.numDays < this.minRange;
    }

    private setStart(s: Date) {
        this.start = s;
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

    private setEnd(s: Date) {
        this.end = s;
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
        return <div className="date-range">
            <DatePick id={this.startId} label="Start" initialDate={this.start} change={(s) => {this.setStart(s)}}/>
            <DatePick id={this.endId} label="End" initialDate={this.end} change={(s) => {this.setEnd(s)}}/>
        </div>;
    }
}
