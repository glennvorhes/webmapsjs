/**
 * Created by glenn on 6/12/2017.
 */
export import React = require('react');
export import ReactDom = require('react-dom');
import reactRedux = require('react-redux');
import redux = require('redux');

export const connect = reactRedux.connect;
export const Provider = reactRedux.Provider;
// export { connect, Provider } from 'react-redux';
export const combineReducers = redux.combineReducers;
export const createStore = redux.createStore;

// export {combineReducers, createStore, Store, } from 'redux';

export interface iAction{
    type: string;
}
