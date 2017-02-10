/**
 * Created by gavorhes on 7/18/2016.
 */
import provide from '../util/provide';
import ol = require('custom-ol');
import {LayerBaseVector} from "../layers/LayerBaseVector";


const nm = provide('util');

/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
export function calculateExtent(layers: ol.layer.Vector[]|LayerBaseVector[]): ol.Extent|Array<number>| ol.Extent| number[] {
    "use strict";

    let hasExtent = false;

    let minX = 10E100;
    let minY = 10E100;
    let maxX = -10E100;
    let maxY = -10E100;

    for (let lyr of layers) {

        /**
         * 
         * @type {ol.layer.Vector}
         */
        let olLayer = lyr['olLayer'] || lyr;
        
        
        if (olLayer.getSource().getFeatures().length > 0) {
            hasExtent = true;
            let ext = olLayer.getSource().getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }
    }

    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    } else {
        return undefined;
    }
}

nm.calculateExtent = calculateExtent;
 

/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
export function fitToMap(layers: ol.layer.Vector[]|LayerBaseVector[], mp: ol.Map, zoomOut?: number){
    "use strict";

    let ext = calculateExtent(layers);
    
    if (typeof ext == 'undefined'){
        return;
    }
    
    mp.getView().fit(ext as ol.Extent, mp.getSize());
    
    if (typeof zoomOut == 'number'){
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}

nm.calculateExtent = calculateExtent;
