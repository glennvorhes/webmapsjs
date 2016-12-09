import { LayerBase, LayerBaseOptions } from './LayerBase';
import MapMoveCls from '../olHelpers/mapMoveCls';
import ol from 'custom-ol';
export interface makeMapMoveParams {
    /**
     *
     * @param lyr
     * @param extent
     * @param zoomLevel
     */
    (lyr: LayerBaseVector, extent: Array<number>, zoomLevel?: number): any;
}
export interface LayerBaseVectorOptions extends LayerBaseOptions {
    autoLoad?: boolean;
    style?: ol.style.Style | Array<ol.style.Style> | ol.StyleFunction;
    onDemand?: boolean;
    onDemandDelay?: number;
    mapMoveMakeGetParams?: makeMapMoveParams;
    mapMoveObj?: MapMoveCls;
    renderOrder?: (a: ol.Feature, b: ol.Feature) => number;
}
/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */
export declare class LayerBaseVector extends LayerBase {
    _olLayer: ol.layer.Vector;
    _source: ol.source.Vector;
    _style: ol.style.Style | Array<ol.style.Style> | ol.StyleFunction;
    _autoLoad: boolean;
    _onDemand: boolean;
    _onDemandDelay: number;
    _mapMoveMakeGetParams: makeMapMoveParams;
    _mapMoveParams: any;
    _mapMove: MapMoveCls;
    _projectionMap: ol.proj.Projection;
    _projection4326: ol.proj.Projection;
    /**
     * The base vector layer
     * @param {string} url - pass an empty string to prevent default load and add from a json source
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     */
    constructor(url: string, options?: LayerBaseVectorOptions);
    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */
    addFeatures(featureCollection: any): void;
    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    mapMoveBefore(zoom: any, evtType: any): boolean;
    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    mapMoveMakeGetParams(extent: any, zoomLevel: any): void;
    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    mapMoveCallback(d: any): void;
    /**
     * clear features in the layer
     */
    clear(): void;
    /**
     * get on demand delay in miliseconds
     */
    readonly onDemandDelay: number;
    /**
     * get if the layer is autoloaded
     */
    readonly autoLoad: boolean;
    /**
     * get the style definition
     */
    /**
     * set the style
     * @param style - the style or function
     */
    style: ol.StyleFunction | Array<ol.style.Style> | ol.style.Style;
    /**
     * get the map CRS if it is defined by the map move object
     */
    readonly mapCrs: string;
    readonly mapProj: ol.proj.Projection;
    /**
     * get the map move object
     * @type {MapMoveCls|*}
     */
    readonly mapMove: MapMoveCls;
    /**
     * map move params
     * @type {object}
     */
    readonly mapMoveParams: any;
    /**
     * Set the layer visibility
     * @type {boolean}
     * @override
     */
    visible: boolean;
    /**
     * get the layer vector source
     * @override
     */
    readonly source: ol.source.Vector;
    /**
     * array of ol features
     */
    readonly features: Array<ol.Feature>;
    /**
     *
     */
    readonly olLayer: ol.layer.Vector;
    protected setZIndex(newZ: number): void;
}
export default LayerBaseVector;
