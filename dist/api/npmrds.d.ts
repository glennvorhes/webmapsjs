import { iExtent, iGetRoads, iError, iGeometry, iRoute } from './_npmrdsInterfaces';
export declare const npmrdsApiUrl: string;
export declare function getRoads(extent: iExtent, version: number, callback: (d: iGetRoads) => any, error?: (e: iError) => any): void;
export declare function getGeometry(extent: iExtent, version: number, callback: (d: iGeometry) => any, options?: {
    roadDirection?: {
        road: string;
        direction: string;
    };
    startEnd?: {
        start: string;
        end: string;
    };
}, error?: (e: iError) => any): void;
export declare function getRoute(road: string, direction: string, version: number, callback: (d: iRoute) => any, options?: {
    extent?: iExtent;
    startEnd?: {
        start: string;
        end: string;
    };
    version?: number;
}, error?: (e: iError) => any): void;
export declare function getTmcs(lon: number, lat: number, version: number, searchDist: number, callback: (d) => any, error?: (e: iError) => any): void;
export declare function getTmc(tmc: string, version: number, callback: (d) => any, error?: (e: iError) => any): void;
