/**
 * Created by glenn on 6/14/2017.
 */


import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jqueryui';
import makeGuid from '../util/makeGuid';


import {dateToString, stringToDate} from './helpers/dateFormat';

export interface iDatePick{
    label: string;
    id?: string;
    initialDate?: Date;
    change: (val: Date) => any;
    val?: Date
}

/**
 * params label, id, initialDate, change callback with value as string
 */
export class DatePick extends React.Component<iDatePick, null> {
    private elId: string;

    constructor(props: iDatePick, context: Object){
        super(props, context);
        this.elId = this.props.id || makeGuid();
    }

    componentDidMount() {
        let $el = $('#' + this.elId);

        $el.datepicker(
            {
                onSelect: () => {
                    this.props.change(stringToDate($el.val() as string));
                }
            }
        );
    }

    render() {
        let params = {
            id: this.elId,
            type: 'text',
            // style: {margin: "0 10px 0 5px", width: '73px'},
            readOnly: true
        };

        if (this.props.val){
            params['value'] = dateToString(this.props.val);
        } else {
            params['defaultValue'] = dateToString(this.props.initialDate || new Date());
        }


        return <span className="date-pick">
            <label htmlFor={this.elId}>{this.props.label}</label>
            {/*<input id={this.elId} type="text"*/}
                   {/*style={{margin: "0 10px 0 5px", width: '73px', textAlign: 'center'}}*/}
                   {/*defaultValue={dateToString(this.props.initialDate || new Date())}*/}
                   {/*readOnly={true}*/}
            {/*/>*/}
            <input style={{textAlign: 'center', margin: "0 10px 0 5px", width: '73px'}} {...params}/>
        </span>
    }
}

export default DatePick;