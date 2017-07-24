/// <reference types="react" />
/**
 * Created by glenn on 6/14/2017.
 */
import { React } from './reactRedux';
import 'jquery-ui';
/**
 * params label, id, initialDate, change callback with value as string
 */
export declare class DatePick extends React.Component<{
    label: string;
    id?: string;
    initialDate?: Date;
    change: (val: string) => any;
}, null> {
    defaultId: string;
    constructor(props: any, context: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default DatePick;
