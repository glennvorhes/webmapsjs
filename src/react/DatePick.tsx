/**
 * Created by glenn on 6/14/2017.
 */


import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jquery-ui';
import makeGuid from '../util/makeGuid';

import {dateToString} from './helpers/dateFormat';

/**
 * params label, id, initialDate, change callback with value as string
 */
export class DatePick extends React.Component<{label: string, id?: string, initialDate?: Date, change: (val: string) => any}, null> {
    defaultId: string;

    constructor(props, context){
        super(props, context);
        this.defaultId = makeGuid();
    }

    componentDidMount() {
        let $el = $('#' + (this.props.id || this.defaultId));

        $el.datepicker(
            {
                onSelect: () => {
                    this.props.change($el.val());
                }
            }
        );
    }

    render() {
        return <span className="date-pick">
            <label>{this.props.label}</label>
            <input id={this.props.id || this.defaultId} type="text"
                   style={{margin: "0 10px 0 5px", width: '73px', textAlign: 'center'}}
                   defaultValue={dateToString(this.props.initialDate || new Date())}
                   readOnly={true}
            />
        </span>
    }
}

export default DatePick;