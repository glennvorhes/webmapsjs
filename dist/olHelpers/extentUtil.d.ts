import ol = require('custom-ol');
import { LayerBaseVector } from "../layers/LayerBaseVector";
/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
export declare function calculateExtent(layers: ol.layer.Vector[] | LayerBaseVector[]): ol.Extent | Array<number> | ol.Extent | number[];
/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
export declare function fitToMap(layers: ol.layer.Vector[] | LayerBaseVector[], mp: ol.Map, zoomOut?: number): void;
