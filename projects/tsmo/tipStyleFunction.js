/**
 * Created by gavorhes on 12/22/2015.
 */
import * as zoomResolutionConvert from '../../src/olHelpers/zoomResolutionConvert';
const ol = require('../../src/ol/ol');


/**
 * tip style function
 * @param {ol.Feature} feature - the feature
 * @param {number} resolution - resolution level
 * @returns {*[]}
 */
export function tipStyle(feature, resolution) {

    let zoom = zoomResolutionConvert.resolutionToZoom(resolution);

    let width = 5;

    if (zoom >= 18){
        width = 10;
    } else if (zoom >= 14) {
        width = 8;
    } else if (zoom >= 12) {
        width = 7;
    } else if (zoom >= 10) {
        width = 6;
    }

    let seg_score = feature.getProperties()['z'];
    let hex_color;
    if (seg_score < -2.5) {
        hex_color = '#00ff00';
    } else if (seg_score < -1.5) {
        hex_color = '#55ff00';
    } else if (seg_score < -0.5) {
        hex_color = '#aaff00';
    } else if (seg_score < 0.5) {
        hex_color = '#ffff00';
    } else if (seg_score < 1.5) {
        hex_color = '#ffaa00';
    } else if (seg_score < 2.5) {
        hex_color = '#ff5500';
    } else {
        hex_color = '#ff0000'
    }

    return [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: hex_color,
            width: width
        })
    })];
}

/**
 * selection style
 * @param feature
 * @param resolution
 * @returns {*[]}
 */
export function tipStyleSelection (feature, resolution) {

    let zoom = zoomResolutionConvert.resolutionToZoom(resolution);

    let width = 5;

    if (zoom >= 18){
        width = 10;
    } else if (zoom >= 14) {
        width = 8;
    } else if (zoom >= 12) {
        width = 7;
    } else if (zoom >= 10) {
        width = 6;
    }

    return [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#0074ff',
            width: width
        })
    })];
}