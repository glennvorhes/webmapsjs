/**
 * Created by glenn on 6/12/2017.
 */
export import React = require('react');
export import ReactDom = require('react-dom');
export import reactRedux = require('react-redux');
export import redux = require('redux');
export declare const connect: any;
export declare const Provider: any;
export declare const combineReducers: typeof redux.combineReducers;
export declare const createStore: redux.StoreCreator;
export interface iAction {
    type: string;
}
