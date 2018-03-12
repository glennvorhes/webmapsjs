/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export interface iDateRange {
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
    versionTwoStart: Date;
    previousStart: Date;
    previousEnd: Date;
    constructor(props: iDateRange, context: Object);
    setNumDays(): void;
    componentDidMount(): void;
    private readonly needReset;
    private readonly versionSpan;
    private readonly version;
    private finalizeChange();
    private setStart(s);
    private setEnd(s);
    render(): JSX.Element;
}
