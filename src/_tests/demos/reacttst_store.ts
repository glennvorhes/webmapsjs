import {createStore, combineReducers} from '../../reactComponents/reactAndRedux';
import * as actions from './reacttst_actions';



function oneDate(state = new Date(), action: {type: string, d: Date}) {
    if (action.type == actions.SET_ONE_DATE) {
        return action.d;
    } else {
        return state;
    }
}

let now = new Date();
let before = new Date();
before.setDate(before.getDate() - 10);

function twoDates(state = {start: now, end: before}, action: {type: string, start: Date, end: Date}){
    if (action.type == actions.SET_TWO_DATES){
        return {
            start: action.start,
            end: action.end
        }
    } else {
        return state;
    }
}



export const store = createStore(
    combineReducers({oneDate, twoDates})
);


export interface iState {
    oneDate: Date;
    twoDates: {start: Date, end: Date}
}



export function getState(): iState{
    return store.getState() as iState;
}

export default store;


