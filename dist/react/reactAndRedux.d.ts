/**
 * Created by glenn on 6/12/2017.
 */
export import React = require('react');
export import ReactDom = require('react-dom');
export import ReactRedux = require('react-redux');
export import Redux = require('redux');
export declare const connect: typeof ReactRedux.connect;
export declare const Provider: typeof ReactRedux.Provider;
export declare const combineReducers: typeof Redux.combineReducers;
export declare const createStore: Redux.StoreCreator;
export interface iAction {
    type: string;
}
