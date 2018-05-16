/**
 * Created by glenn on 6/13/2017.
 */

import $ = require('jquery');
import * as ajx from './axios';
import {iExtent, iGetRoads, iError, iGeometry, iRoute} from './_npmrdsInterfaces';
import * as empty from './_npmrdsEmpty'
import {apiRoot} from './host';

export const npmrdsApiUrl = apiRoot + '/npmrds';





function _abortHelper(x: XMLHttpRequest) {
    if (x && x['abort']) {
        x.abort();
    }
}

function makeExtent(ext: iExtent): string {
    if (!ext) {
        return null;
    }

    if (ext.coordinates) {
        if (ext.coordinates.length < 4) {
            throw "npmrds api: coordinate array must have at least 3 vertices, last one closing";
        }
        return JSON.stringify(ext.coordinates);
    } else if (ext.bottom && ext.top && ext.left && ext.right) {
        let bottom_left = [ext.left, ext.bottom];
        let ext_arr = [bottom_left];
        ext_arr.push([ext.left, ext.top]);
        ext_arr.push([ext.right, ext.top]);
        ext_arr.push([ext.right, ext.bottom]);
        ext_arr.push(bottom_left);
        return JSON.stringify(ext_arr);
    } else {
        return undefined;
    }
}


export function getRoads(extent: iExtent,
                         version: number,
                         callback: (d: iGetRoads) => any,
                         error: (e: iError) => any = () => {
                         }) {

    let ext = makeExtent(extent);

    if (ext == null) {
        callback({roads: []})
    } else if (ext) {
        let params = {extent: makeExtent(extent), version: version};
        ajx.get(npmrdsApiUrl + '/roads', (d: iGetRoads | iError) => {
            if ((d as iError).error) {
                error(d as iError)
            } else {
                callback(d as iGetRoads)
            }

        }, params, error);
    } else {
        error({error: "invalid extent"})
    }
}


export function getGeometry(extent: iExtent, version: number,
                            callback: (d: iGeometry) => any,
                            options: {
                                roadDirection?: { road: string, direction: string },
                                startEnd?: { start: string, end: string }
                            } = {},
                            error: (e: iError) => any = () => {
                            }) {

    let ext = makeExtent(extent);

    if (ext == null) {
        callback(empty.emptyGeometry);
    } else if (typeof ext == 'undefined') {
        error({error: "Invalid Extent"});
    } else {
        let params = {extent: ext, version: version};
        if (options.roadDirection) {
            params['road'] = options.roadDirection.road;
            params['direction'] = options.roadDirection.direction;
        }

        if (options.startEnd) {
            params['start'] = options.startEnd.start;
            params['end'] = options.startEnd.end;
        }

        ajx.get(npmrdsApiUrl + '/geometry', (d: iGeometry | iError) => {
            if ((d as iError).error) {
                error(d as iError)
            } else {
                callback(d as iGeometry)
            }
        }, params, error);
    }
}

export function getRoute(road: string, direction: string, version: number,
                         callback: (d: iRoute) => any,
                         options: {
                             extent?: iExtent,
                             startEnd?: { start: string, end: string },
                             version?: number
                         } = {},
                         error: (e: iError) => any = () => {
                         }) {

    let params = {road: road, direction: direction, version: version};

    let ext;

    if (options.extent) {
        ext = makeExtent(options.extent);

        if (ext == null) {
            callback(empty.emptyRoute);
            return;
        } else if (typeof ext == 'undefined') {
            error({error: "Invalid Extent"});
            return;
        }
    }

    if (ext) {
        params['extent'] = ext;
    }

    if (options.startEnd) {
        params['start'] = options.startEnd.start;
        params['end'] = options.startEnd.end;
    }

    ajx.get(npmrdsApiUrl + '/route', (d: iRoute | iError) => {
        if ((d as iError).error) {
            error(d as iError)
        } else {
            callback(d as iRoute)
        }
    }, params, error);
}

export function getTmcs(lon: number, lat: number, version: number, searchDist: number = 2000,
                        callback: (d) => any,
                        error: (e: iError) => any = () => {
                        }) {

    let params = {lon: lon, lat: lat, version: version, search: searchDist};

    ajx.get(npmrdsApiUrl + '/tmcs', (d: iGeometry | iError) => {
        if ((d as iError).error) {
            error(d as iError)
        } else {
            callback(d)
        }
    }, params, error);
}


export function getTmc(tmc: string, version: number,
                        callback: (d) => any,
                        error: (e: iError) => any = () => {
                        }) {
    let params = {tmc: tmc, version: version};

    ajx.get(npmrdsApiUrl + '/tmc', (d: iGeometry | iError) => {
        if ((d as iError).error) {
            error(d as iError)
        } else {
            callback(d)
        }
    }, params, error);
}
