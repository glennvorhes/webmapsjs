/**
 * Created by glenn on 6/13/2017.
 */


export interface iRoad {
    number: string;
    direction: string;
    tmcs: string[];
}

export interface iGetRoads {
    roads: iRoad[];
}

export interface iExtent {
    coordinates?: Array<number[]>;
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
}

export interface iRoad {
    number: string;
    direction: string;
    tmcs: string[];
}

export interface iGeoJsonFeaturePointBase {
    type: string;
    properties: { [s: string]: string | number | boolean };

}


export interface iGeoJsonFeaturePoint extends iGeoJsonFeaturePointBase {
    geometry: {
        type: string;
        coordinates: number[]
    }
}

export interface iGeoJsonFeatureLine extends iGeoJsonFeaturePointBase {
    geometry: {
        type: string;
        coordinates: Array<number[]>
    }
}

export interface iGeoJsonFeaturePolygon extends iGeoJsonFeaturePointBase {
    geometry: {
        type: string;
        coordinates: Array<Array<number[]>>
    }
}

export interface iGeoJsonBase {
    type: string;
    crs: {
        properties: { name: string }
        type: string;
    };

}

export interface iGeoJsonPoint extends iGeoJsonBase {
    features: iGeoJsonFeaturePoint[]
}

export interface iGeoJsonLine extends iGeoJsonBase {
    features: iGeoJsonFeatureLine[]
}

export interface iGeoJsonPolygon extends iGeoJsonBase {
    features: iGeoJsonFeaturePolygon[]
}


export interface iSpeedVal {
    date: string;
    all: number;
    pas: number;
    frgt: number;
}


export interface iSpeed {
    count: number;
    dates: string[];
    free: { [s: string]: number };
    std: { [s: string]: number };
    values: { [s: string]: iSpeedVal[] };
}

export interface iError {
    error: string;
}

export interface iGeometry{
    roads: iRoad[];
    geom: iGeoJsonLine;
    speed?: iSpeed;
}

export interface iRoute{
    roads: iRoad[];
    line: iGeoJsonLine;
    points: iGeoJsonPoint;
    totalDistance: number;
    speed?: iSpeed;
    lengths: {[s: string]: number}
}

let emptyGeojson = {
    crs: {
        properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"},
        type: 'name'
    },
    type: "FeatureCollection",
    features: []
};


