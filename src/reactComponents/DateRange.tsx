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
        return new Date(dte as string);
    }
}

export interface iDateRange{
    maxRange: number;
    callback: (start: Date, end: Date, version?: number) => any;
    minRange?: number;
    maxDate?: Date;
    minDate?: Date;
    initialEnd?: Date;
    start?: Date;
    end?: Date;
    npmrds?: boolean;
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
    versionTwoStart: Date;
    previousStart: Date;
    previousEnd: Date;

    constructor(props: iDateRange, context: Object) {
        super(props, context);

        this.versionTwoStart = new Date(2017, 1, 1);

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

        this.start = new Date(this.end.getTime());
        this.start.setDate(this.start.getDate() - this.maxRange);
        this.setNumDays();
    }

    setNumDays() {
        this.numDays = Math.round((this.end.getTime() - this.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }


    componentDidMount() {
        this.startInput = document.getElementById(this.startId) as HTMLInputElement;
        this.endInput = document.getElementById(this.endId) as HTMLInputElement;


        this.props.callback(this.start, this.end, this.version);
    }

    private get needReset(): boolean {
        return this.numDays > this.maxRange || this.numDays < this.minRange;
    }

    private get versionSpan(): boolean{

        if (this.start < this.versionTwoStart && this.end >= this.versionTwoStart){
            return true;
        } else if (fixDate.dateToString(this.versionTwoStart) === fixDate.dateToString(this.end) && this.start < this.versionTwoStart){
            return true;
        }

        return false;
    }

    private get version(): number{

        if (fixDate.dateToString(this.start) == fixDate.dateToString(this.versionTwoStart)){
            return 2;
        } else if (this.start >= this.versionTwoStart){
            return 2;
        }
        return 1;
    }

    private finalizeChange(){

        if (this.props.npmrds){
            if (this.versionSpan){
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
    }

    private setStart(s: Date) {

        this.previousStart = new Date(this.start.getTime());
        this.previousEnd = new Date(this.end.getTime());

        this.start = s;

        this.setNumDays();

        if (this.needReset) {
            this.end = new Date(this.start.getTime());

            if (this.numDays > this.maxRange) {
                this.end.setDate(this.end.getDate() + this.maxRange);
            } else {
                this.end.setDate(this.end.getDate() + this.minRange - 1);
            }

            this.endInput.value = fixDate.dateToString(this.end);
            this.setNumDays();
        }

        this.finalizeChange();
    }

    private setEnd(s: Date) {
        this.previousStart = new Date(this.start.getTime());
        this.previousEnd = new Date(this.end.getTime());

        this.end = s;
        this.setNumDays();

        if (this.needReset) {
            this.start = new Date(this.end.getTime());

            if (this.numDays > this.maxRange) {
                this.start.setDate(this.start.getDate() - this.maxRange);
            } else {
                this.start.setDate(this.start.getDate() - this.minRange + 1);
            }

            this.startInput.value = fixDate.dateToString(this.start);
            this.setNumDays();
        }

        this.finalizeChange();
    }

    render() {
        return <div className="date-range">
            <DatePick id={this.startId} label="Start" initialDate={this.start} change={(s) => {this.setStart(s)}}/>
            <DatePick id={this.endId} label="End" initialDate={this.end} change={(s) => {this.setEnd(s)}}/>
        </div>;
    }
}
