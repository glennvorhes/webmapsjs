/// <reference types="react" />
/**
 * Created by glenn on 6/14/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export interface iDatePick {
    label: string;
    id?: string;
    initialDate?: Date;
    change: (val: string) => any;
    val?: Date;
}
/**
 * params label, id, initialDate, change callback with value as string
 */
export declare class DatePick extends React.Component<iDatePick, null> {
    private elId;
    constructor(props: iDatePick, context: Object);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default DatePick;
