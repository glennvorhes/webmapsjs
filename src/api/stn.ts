/**
 * Created by glenn on 6/13/2017.
 */

import * as ajx from './axios';
import {apiRoot} from './host';

export const stnApiUrl = apiRoot + '/stn';

function _abortHelper(x: XMLHttpRequest) {
    if (x && x['abort']) {
        x.abort();
    }
}

export interface iError {
    error?: string;
}

export interface iRoutes extends iError {
    routes: { [s: string]: number }
}

export interface iGeoFeature {
    type: string;
    geometry: Object;
    properties: Object;
}

export interface iSnappedPoint {
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number]
    },
    properties: {
        cumtMilg: number;
        dtLinkCurr: string;
        dtOpnTrfc: string;
        dtTrxHstl: string;
        editIndc: number;
        lcmCkotTxnId: number;
        lcmDtHstl: number;
        lcmDtTxnCurr: string;
        lcmFromToDis: number;
        lcmStus: number;
        lnkOffsetMi: number;
        lnkOffsetPcnt: number;
        rdwyLinkId: number;
        refSiteFromId: number;
        refSiteToId: number;
        routeIds: number[];
        year: number;
    }
}

export interface iStnSegment {
    type: string;
    geometry: {
        type: string;
        coordinates: Array<number[]>
    },
    properties: {
        cumtMilgEnd: number;
        cumtMilgStart: number;
        offsetMiEnd: number;
        offsetMiStart: number;
        offsetPcntEnd: number;
        offsetPcntStart: number;
        rdwyLinkIdEnd: number;
        rdwyLinkIdStart: number;
        rdwyLinkIds: number[];
        rdwyRteId: number;
        year: number;
    }
}

export interface _iGeoJson {
    type: string;
    crs: {
        type: string;
        properties: {
            name: string;
        }
    };
    features: any[];
}

export interface iGeoJsonSnappedPoint extends _iGeoJson {
    features: iSnappedPoint[];
}

export interface iGeoJsonStnSegment extends _iGeoJson {
    features: iStnSegment[];
}


/**
 *
 * @param {number} yr
 * @param {number} lon
 * @param {number} lat
 * @param {number} searchDistance
 * @param {(d: iRoutes) => any} callback
 * @param {(e: iError) => any} error
 */
export function getRoutes(yr: number,
                          lon: number,
                          lat: number,
                          searchDistance: number = 200,
                          callback: (d: iRoutes) => any = (d) => {
                              console.log(d);
                          },
                          error: (e: iError) => any = (e) => {
                              console.log(e);
                          }) {

    ajx.get(stnApiUrl + '/routes', (d: iRoutes) => {
            if (d.error) {
                error(d)
            } else {
                callback(d)
            }

        },
        {
            year: yr,
            lon: lon,
            lat: lat,
            distance: searchDistance
        },
        error
    );
}

/**
 *
 * @param {number} yr
 * @param {number} routeId
 * @param {number} lon
 * @param {number} lat
 * @param {number} searchDistance
 * @param {(d) => any} callback
 * @param {(e: iError) => any} error
 */
export function getSnappedPoint(yr: number,
                                routeId: number,
                                lon: number,
                                lat: number,
                                searchDistance: number = 200,
                                callback: (d: iGeoJsonSnappedPoint) => any = (d: iGeoJsonSnappedPoint) => {
                                    console.log(d);
                                },
                                error: (e: iError) => any = (e) => {
                                    console.log(e);
                                }) {

    ajx.get(stnApiUrl + '/snapped', (d: iGeoJsonSnappedPoint) => {
            if (d['error']) {
                error(d)
            } else {
                callback(d)
            }
        },
        {
            year: yr,
            route: routeId,
            lon: lon,
            lat: lat,
            distance: searchDistance
        },
        error
    );
}

/**
 *
 * @param {number} yr
 * @param {number} routeId
 * @param {number} lonStart
 * @param {number} latStart
 * @param {number} lonEnd
 * @param {number} latEnd
 * @param {number} searchDistance
 * @param {(d) => any} callback
 * @param {(e: iError) => any} error
 */
export function getStnSegment(yr: number,
                              routeId: number,
                              lonStart: number,
                              latStart: number,
                              lonEnd: number,
                              latEnd: number,
                              searchDistance: number = 200,
                              callback: (d: iGeoJsonStnSegment) => any = (d: iGeoJsonStnSegment) => {
                                  console.log(d);
                              },
                              error: (e: iError) => any = (e) => {
                                  console.log(e);
                              }) {

    ajx.get(stnApiUrl + '/segment', (d: iGeoJsonStnSegment) => {
            if (d['error']) {
                error(d)
            } else {
                callback(d)
            }
        },
        {
            year: yr,
            route: routeId,
            lonStart: lonStart,
            latStart: latStart,
            lonEnd: lonEnd,
            latEnd: latEnd,
            distance: searchDistance
        },
        error
    );
}


export function getStnSegmentByMiles(
    yr: number,
    routeId: number,
    startMile: number,
    endMile: number,
    callback: (d: iGeoJsonStnSegment) => any = (d: iGeoJsonStnSegment) => {
        console.log(d);
    },
    error: (e: iError) => any = (e) => {
        console.log(e);
    }) {

    ajx.get(stnApiUrl + '/segment', (d: iGeoJsonStnSegment) => {
            if (d['error']) {
                error(d)
            } else {
                callback(d)
            }
        },
        {
            year: yr,
            route: routeId,
            startMile: startMile,
            endMile: endMile
        },
        error
    );
}
