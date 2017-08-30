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
}
/**
 * params label, id, initialDate, change callback with value as string
 */
export declare class DatePick extends React.Component<iDatePick, null> {
    defaultId: string;
    constructor(props: iDatePick, context: Object);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default DatePick;
