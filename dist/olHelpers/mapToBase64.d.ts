import { LayerBaseVector } from "../layers";
import Map from 'ol/Map';
export interface iMapToBase64Options {
    resize?: {
        width: number;
        height: number;
    };
    layers?: LayerBaseVector[] | LayerBaseVector[];
    delay?: number;
}
export declare function mapToBase64(map: Map, callback: (imgData: string) => any, options?: iMapToBase64Options): any;
export default mapToBase64;
