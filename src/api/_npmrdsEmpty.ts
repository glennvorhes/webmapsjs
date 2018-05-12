/**
 * Created by glenn on 6/13/2017.
 */


let emptyGeojson = {
    crs: {
        properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"},
        type: 'name'
    },
    type: "FeatureCollection",
    features: []
};


export const emptyGeometry = {
    geom: emptyGeojson,
    roads: []
};

export const emptyRoute = {
    roads: [],
    line: emptyGeojson,
    points: emptyGeojson,
    totalDistance: -1,
    lengths: {},
    speed: {count: 0, dates: [], free: {}, values: {}, std: {}}
};
