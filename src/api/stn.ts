/**
 * Created by glenn on 6/13/2017.
 */

import $ = require('jquery');
import * as ajx from './_axios';
import apiRoot from './_host';

export const stnApiUrl = apiRoot + '/stn';

function _abortHelper(x: XMLHttpRequest) {
    if (x && x['abort']) {
        x.abort();
    }
}


export interface iError {
    error?: string;
}

export interface iRoutes extends iError{
    routes: {[s: string]: number}
}

export function getRoutes(yr: number,
                         lon: number,
                         lat: number,
                         callback: (d: iRoutes) => any,
                         error: (e: iError) => any = () => {
                         }) {

    ajx.get(stnApiUrl + '/routes', (d: iRoutes) => {
            if (d.error) {
                error(d)
            } else {
                callback(d)
            }

        }, {year: yr, lon: lon, lat: lat}, error);

}

export function getSnappedPoint(yr: number,
                         routeId: number,
                         lon: number,
                         lat: number,
                         callback: (d) => any,
                         error: (e: iError) => any = () => {
                         }) {

    ajx.get(stnApiUrl + '/snapped', (d) => {
            if (d['error']) {
                error(d)
            } else {
                callback(d)
            }

        }, {year: yr, route: routeId, lon: lon, lat: lat}, error);
}

export function getStnSegment(yr: number,
                         routeId: number,
                         lonStart: number,
                         latStart: number,
                         lonEnd: number,
                         latEnd: number,
                         callback: (d) => any,
                         error: (e: iError) => any = () => {
                         }) {

    ajx.get(stnApiUrl + '/segment', (d) => {
            if (d['error']) {
                error(d)
            } else {
                callback(d)
            }

        }, {year: yr, route: routeId, lonStart: lonStart, latStart: latStart, lonEnd: lonEnd, latEnd: latEnd}, error);

}
