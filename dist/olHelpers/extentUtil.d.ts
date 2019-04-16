import { LayerBaseVector } from "../layers";
import Vector from 'ol/layer/Vector';
import Map from 'ol/Map';
export declare function calculateExtent(layers: Vector[] | LayerBaseVector[]): number[];
/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
export declare function fitToMap(layers: Vector[] | LayerBaseVector[], mp: Map, zoomOut?: number): void;
