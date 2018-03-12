import Redux = require('redux');
export declare const theStore: Redux.Store<{}>;
export interface iState {
    oneDate: Date;
    twoDates: {
        start: Date;
        end: Date;
        version: number;
    };
}
export declare function getState(): iState;
export default theStore;
