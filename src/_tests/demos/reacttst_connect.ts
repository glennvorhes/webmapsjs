import {connect} from '../../reactComponents/reactAndRedux';
import {iState} from './reacttst_store';
import {DatePick} from '../../reactComponents/DatePick';
import {DateRange} from '../../reactComponents/DateRange';
import * as actions from './reacttst_actions';


export const DatePickConnected = connect(
    (state: iState) => {
        return {
            label: 'Date Picker Connected',
            change: (v) => {
                console.log(v);
            },
            val: state.oneDate
        }
    },
    (dispatch) => {
        return {
            change: (v) => {
                dispatch({type: actions.SET_ONE_DATE, d: v});
            }
        }
    }
)(DatePick);


export const DateRangeConnected = connect(
    (state: iState) => {
        return {
            maxRange: 10,
            start: state.twoDates.start,
            end: state.twoDates.end,
        }
    },
    (dispatch) => {
        return {
            callback: (s: Date, e: Date) => {
                dispatch({type: actions.SET_TWO_DATES, start: s, end: e});
            }
        }
    }
)(DateRange);




