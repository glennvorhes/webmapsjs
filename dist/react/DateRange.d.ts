/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export declare class DateRange extends React.Component<{
    maxRange: number;
    callback: (start: string | Date, end: string | Date) => any;
    minRange?: number;
}, null> {
    startId: string;
    endId: string;
    startInput: HTMLInputElement;
    endInput: HTMLInputElement;
    start: Date;
    end: Date;
    maxRange: number;
    minRange: number;
    numDays: number;
    constructor(props: any, context: any);
    setNumDays(): void;
    componentDidMount(): void;
    readonly needReset: boolean;
    setStart(s: string): void;
    setEnd(s: string): void;
    render(): JSX.Element;
}
