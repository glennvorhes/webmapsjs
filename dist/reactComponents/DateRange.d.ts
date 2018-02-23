/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export interface iDateRange {
    maxRange: number;
    callback: (start: Date, end: Date) => any;
    minRange?: number;
    maxDate?: Date;
    minDate?: Date;
    initialEnd?: Date;
    start?: Date;
    end?: Date;
}
export declare class DateRange extends React.Component<iDateRange, null> {
    startId: string;
    endId: string;
    startInput: HTMLInputElement;
    endInput: HTMLInputElement;
    start: Date;
    end: Date;
    maxRange: number;
    minRange: number;
    numDays: number;
    constructor(props: iDateRange, context: Object);
    setNumDays(): void;
    componentDidMount(): void;
    private readonly needReset;
    private setStart(s);
    private setEnd(s);
    render(): JSX.Element;
}
