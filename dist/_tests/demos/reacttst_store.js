"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions = require("./reacttst_actions");
var Redux = require("redux");
function oneDate(state, action) {
    if (state === void 0) { state = new Date(); }
    if (action.type == actions.SET_ONE_DATE) {
        return action.d;
    }
    else {
        return state;
    }
}
var start = new Date('12/31/2017');
var end = new Date('12/31/2017');
start.setDate(start.getDate() - 10);
function twoDates(state, action) {
    if (state === void 0) { state = { start: start, end: end, version: 2 }; }
    if (action.type == actions.SET_TWO_DATES) {
        return {
            start: action.start,
            end: action.end,
            version: action.version
        };
    }
    else {
        return state;
    }
}
exports.theStore = Redux.createStore(Redux.combineReducers({ oneDate: oneDate, twoDates: twoDates }));
function getState() {
    return exports.theStore.getState();
}
exports.getState = getState;
exports.default = exports.theStore;
//# sourceMappingURL=reacttst_store.js.map