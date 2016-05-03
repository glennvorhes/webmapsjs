/**
 * Created by gavorhes on 12/22/2015.
 */
import ol from '../../../src/custom-ol';


export const overlayStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 0, 237, 0.1)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgb(255, 0, 237)',
        width: 2
    })
});


export const lineIndicator = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 7
    })
});


export const pointIndices = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
            color: 'blue'
        })
    })
});


export const trackerPoint = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({
            color: 'blue'
        })
    })
});
