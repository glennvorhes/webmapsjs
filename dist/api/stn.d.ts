/**
 * Created by glenn on 6/13/2017.
 */
export declare const stnApiUrl: string;
export interface iError {
    error?: string;
}
export interface iRoutes extends iError {
    routes: {
        [s: string]: number;
    };
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
        coordinates: [number, number];
    };
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
    };
}
export interface iStnSegment {
    type: string;
    geometry: {
        type: string;
        coordinates: Array<number[]>;
    };
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
    };
}
export interface _iGeoJson {
    type: string;
    crs: {
        type: string;
        properties: {
            name: string;
        };
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
export declare function getRoutes(yr: number, lon: number, lat: number, searchDistance?: number, callback?: (d: iRoutes) => any, error?: (e: iError) => any): void;
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
export declare function getSnappedPoint(yr: number, routeId: number, lon: number, lat: number, searchDistance?: number, callback?: (d: iGeoJsonSnappedPoint) => any, error?: (e: iError) => any): void;
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
export declare function getStnSegment(yr: number, routeId: number, lonStart: number, latStart: number, lonEnd: number, latEnd: number, searchDistance?: number, callback?: (d: iGeoJsonStnSegment) => any, error?: (e: iError) => any): void;
export declare function getStnSegmentByMiles(yr: number, routeId: number, startMile: number, endMile: number, callback?: (d: iGeoJsonStnSegment) => any, error?: (e: iError) => any): void;
export declare function getStnYears(callback?: (d: {
    years: number[];
}) => any, error?: (e: iError) => any): void;
