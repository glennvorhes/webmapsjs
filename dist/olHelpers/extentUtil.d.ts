import { ol } from 'custom-ol';
/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
export declare function calculateExtent(layers: any): ol.Extent | Array<number>;
/**
 * given one or an array of layers, fit to the map
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector} layers - array of layers or single
 * @param {ol.Map} mp - the map to fit
 * @param {number|undefined} [zoomOut=undefined] - levels to zoom out after fit
 */
export declare function fitToMap(layers: any, mp: ol.Map, zoomOut?: number): void;
