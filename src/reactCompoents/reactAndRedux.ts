/**
 * Created by glenn on 6/12/2017.
 */
export import React = require('react');
export import ReactDom = require('react-dom');
export import ReactRedux = require('react-redux');
export import Redux = require('redux');



export const connect = ReactRedux.connect;
export const Provider = ReactRedux.Provider;
// export { connect, Provider } from 'react-redux';
export const combineReducers = Redux.combineReducers;
export const createStore = Redux.createStore;

// export {combineReducers, createStore, Store, } from 'redux';

export interface iAction{
    type: string;
}


