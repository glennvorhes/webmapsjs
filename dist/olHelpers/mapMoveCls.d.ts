import LayerBaseVector from "../layers/LayerBaseVector";
import MapInteractionBase from './mapInteractionBase';
import Map from 'ol/Map';
export interface extentObject {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
export interface mapMoveCallbackFunction {
    /**
     *
     * @param extent extent as predefined object minX, minX, maxX, maxY
     * @param zoomLevel current zoom level
     * @param evtType the event type 'change:center', 'change:resolution'
     */
    (extent: extentObject, zoomLevel: number, evtType?: string): any;
}
/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */
export declare class MapMoveCls extends MapInteractionBase {
    _mapExtent: extentObject;
    _zoomLevel: number;
    _lookupLayer: {
        [s: string]: LayerBaseVector;
    };
    _arrLayer: Array<LayerBaseVector>;
    _arrLyrTimeout: Array<number>;
    _mapMoveCallbackTimeout: Array<number>;
    _mapMoveCallbackDelays: Array<number>;
    _mapMoveCallbacksLookup: {
        [s: string]: mapMoveCallbackFunction;
    };
    _mapMoveCallbackContext: Array<Object>;
    _mapMoveCallbacks: Array<mapMoveCallbackFunction>;
    _arrLyrRequest: Array<any>;
    /**
     * constructor called implicitly
     */
    constructor();
    /**
     * initialize the map move object
     * @param theMap - the ol map
     */
    init(theMap: Map): void;
    _updateMapExtent(): void;
    /**
     * return the map extent
     */
    readonly mapExtent: extentObject;
    /**
     * Trigger the layer load
     * @param lyr the layer being acted on
     * @param index index of the layer
     * @param eventType the event triggering the load, as 'change:center' or 'change:resolution'
     */
    triggerLyrLoad(lyr: LayerBaseVector, index?: number, eventType?: string): void;
    /**
     * trigger the map move call back at the given index
     * @param ind - the index of the layer
     * @param eventType=undefined the event triggering the load as 'change:center' or 'change:resolution'
     * @param functionId=undefined the function id used to reference the added callback function
     */
    triggerMoveCallback(ind: number, eventType?: string, functionId?: string): void;
    /**
     * Add a layer to the interaction
     * @param  lyr - layer to add
     * @param triggerOnAdd - if the layer should be loaded on add
     */
    addVectorLayer(lyr: LayerBaseVector, triggerOnAdd?: boolean): void;
    /**
     * add a callback to the map move event
     * @param func - callback function
     * @param context - the context to use for this function
     * @param delay=50 the delay before call load
     * @param triggerOnAdd if the layer should be loaded on add to mapMove
     * @param functionId optional id to reference the function later for outside triggering
     */
    addCallback(func: mapMoveCallbackFunction, context?: any, delay?: number, triggerOnAdd?: boolean, functionId?: string): void;
}
export default MapMoveCls;
