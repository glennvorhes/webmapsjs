/**
 * Created by gavorhes on 7/18/2016.
 */
import provide from '../util/provide';
import {LayerBaseVector} from "../layers";
import Vector from 'ol/layer/Vector';
import Map from 'ol/Map';


const nm = provide('util');

export function calculateExtent(layers: Vector[]|LayerBaseVector[]):  number[] {
    "use strict";

    let hasExtent = false;

    let minX = 10E100;
    let minY = 10E100;
    let maxX = -10E100;
    let maxY = -10E100;

    for (let lyr of layers) {

        let olLayer: Vector = (lyr as LayerBaseVector).olLayer || lyr as Vector;
        
        
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
export function fitToMap(layers: Vector[]|LayerBaseVector[], mp: Map, zoomOut?: number){
    "use strict";

    let ext = calculateExtent(layers);
    
    if (typeof ext == 'undefined'){
        return;
    }
    
    mp.getView().fit(ext as [number, number, number, number], {size: mp.getSize()});
    
    if (typeof zoomOut == 'number'){
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}

nm.calculateExtent = calculateExtent;
