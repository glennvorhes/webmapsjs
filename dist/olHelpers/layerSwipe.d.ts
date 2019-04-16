/**
 * Created by gavorhes on 6/1/2016.
 */
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { LayerBase } from "../layers";
declare class LayerSwipe {
    leftLayers: Array<LayerBase>;
    rightLayers: Array<LayerBase>;
    _percentRight: number;
    _map: ol.Map;
    $mapElement: JQuery;
    $swiper: JQuery;
    dragging: boolean;
    offset: number;
    /**
     *
     * @param {ol.Map} map - the map
     * @param {string} [sliderContent=''] - additional html to be added inside the slider div
     */
    constructor(map: ol.Map, sliderContent?: string);
    /**
     *
     * @param {LayerBase|*} lyr - layer to be added to left side
     */
    addLeftLayer(lyr: LayerBase): void;
    /**
     *
     * @param {LayerBase|*} lyr - layer to be added to right side
     */
    addRightLayer(lyr: LayerBase): void;
    percentRight: number;
}
export default LayerSwipe;
