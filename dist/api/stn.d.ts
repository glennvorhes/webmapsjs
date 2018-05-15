export declare const stnApiUrl: string;
export interface iError {
    error?: string;
}
export interface iRoutes extends iError {
    routes: {
        [s: string]: number;
    };
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
export declare function getSnappedPoint(yr: number, routeId: number, lon: number, lat: number, searchDistance?: number, callback?: (d) => any, error?: (e: iError) => any): void;
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
export declare function getStnSegment(yr: number, routeId: number, lonStart: number, latStart: number, lonEnd: number, latEnd: number, searchDistance?: number, callback?: (d) => any, error?: (e: iError) => any): void;
