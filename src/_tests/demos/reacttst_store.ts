import * as actions from './reacttst_actions';
import Redux = require('redux');


function oneDate(state = new Date(), action: {type: string, d: Date}) {
    if (action.type == actions.SET_ONE_DATE) {
        return action.d;
    } else {
        return state;
    }
}

let start = new Date('12/31/2017');
let end = new Date('12/31/2017');
start.setDate(start.getDate() - 10);

function twoDates(state = {start: start, end: end, version: 2}, action: {type: string, start: Date, end: Date, version: number}){
    if (action.type == actions.SET_TWO_DATES){
        return {
            start: action.start,
            end: action.end,
            version: action.version
        }
    } else {
        return state;
    }
}



export const theStore = Redux.createStore(
    Redux.combineReducers({oneDate, twoDates})
);


export interface iState {
    oneDate: Date;
    twoDates: {start: Date, end: Date, version: number}
}


export function getState(): iState{
    return theStore.getState() as iState;
}

export default theStore;


