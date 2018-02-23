import ol = require('custom-ol');
import { LayerBaseVector } from "../layers/LayerBaseVector";
export interface iMapToBase64Options {
    resize?: {
        width: number;
        height: number;
    };
    layers?: LayerBaseVector[] | LayerBaseVector[];
    delay?: number;
}
/**
 *
 * @param {ol.Map} map
 * @param {(imgData) => string} callback
 * @param {iMapToBase64Options} options
 * @returns {any}
 */
export declare function mapToBase64(map: ol.Map, callback: (imgData: string) => any, options?: iMapToBase64Options): any;
export default mapToBase64;
