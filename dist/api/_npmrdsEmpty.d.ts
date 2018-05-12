export declare const emptyGeometry: {
    geom: {
        crs: {
            properties: {
                name: string;
            };
            type: string;
        };
        type: string;
        features: any[];
    };
    roads: any[];
};
export declare const emptyRoute: {
    roads: any[];
    line: {
        crs: {
            properties: {
                name: string;
            };
            type: string;
        };
        type: string;
        features: any[];
    };
    points: {
        crs: {
            properties: {
                name: string;
            };
            type: string;
        };
        type: string;
        features: any[];
    };
    totalDistance: number;
    lengths: {};
    speed: {
        count: number;
        dates: any[];
        free: {};
        values: {};
        std: {};
    };
};
