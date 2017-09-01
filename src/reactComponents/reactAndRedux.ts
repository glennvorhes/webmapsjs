/**
 * Created by glenn on 6/12/2017.
 */
export import React = require('react');
export import ReactDom = require('react-dom');
export import ReactRedux = require('react-redux');
export import Redux = require('redux');

export const connect = ReactRedux.connect;
export const Provider = ReactRedux.Provider;
export const combineReducers = Redux.combineReducers;
export const createStore = Redux.createStore;

export interface iAction extends Redux.Action{
}


