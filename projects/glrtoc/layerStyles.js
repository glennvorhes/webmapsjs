/**
 * Created by gavorhes on 12/3/2015.
 */
const ol = require('../../src/ol/ol');

export const workZoneAndEventStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 7
    }),
    image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        stroke: new ol.style.Stroke({
            color: 'magenta'
        })
    })
});

export function wrsStyle(feature, resolution) {
    let colorString = feature.getProperties()['COLOR'];

    let c;
    if (typeof colorString === 'string') {
        c = colorString.split(' ');
    } else {
        c = [125, 125, 125];
    }

    return [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: `rgba(${c[0]},${c[1]},${c[2]},0)`,
            width: 5
        })
    })];
}

