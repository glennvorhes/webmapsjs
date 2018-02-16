/**
 * Created by gavorhes on 9/22/2016.
 */

import {React, ReactDom as reactDom, Provider} from '../../reactComponents/reactAndRedux';
import {DatePick} from '../../reactComponents/DatePick';
import {DateRange} from '../../reactComponents/DateRange';
import {DatePickConnected, DateRangeConnected} from './reacttst_connect';
import * as s from './reacttst_store'
import {set} from "d3-collection";


class Demo extends React.Component<null, null> {


    render() {
        return <div>
            <h1>Date Pick</h1>
            <DatePick label={'Date Picker'} change={(v) => {
                console.log(v)
            }}/>
            <h1>Date Pick Connected</h1>
            <DatePickConnected/>
            <h1>Date Range</h1>
            <DateRange maxRange={10} initialEnd={new Date()} minRange={1} callback={(start, end) => {
                console.log(start, end);
            }}/>
            <h1>Date Range Connected</h1>
            <DateRangeConnected/>
        </div>
    }

}

reactDom.render(
    <Provider store={s.store}>
        <Demo/>
    </Provider>,
    document.getElementById("example")
);

s.store.subscribe(() => {
    console.log(s.getState());
});

setInterval(
    () => {
        let state = s.getState();
        // console.log(state.oneDate);

        // s.store.dispatch({type: s.ACTION_SET_ONE_DATE, d: state.oneDate.setDate(state.oneDate.getDate() - 1)});
    },
    1000);






