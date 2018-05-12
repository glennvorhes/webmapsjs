export interface iError {
    error?: string;
}
export interface iRoutes extends iError {
    routes: {
        [s: string]: number;
    };
}
export declare function getRoutes(yr: number, lon: number, lat: number, callback: (d: iRoutes) => any, error?: (e: iError) => any): void;
export declare function getSnappedPoint(yr: number, routeId: number, lon: number, lat: number, callback: (d) => any, error?: (e: iError) => any): void;
export declare function getStnSegment(yr: number, routeId: number, lonStart: number, latStart: number, lonEnd: number, latEnd: number, callback: (d) => any, error?: (e: iError) => any): void;
