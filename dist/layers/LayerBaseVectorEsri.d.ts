/**
 * Created by gavorhes on 11/2/2015.
 */
import { LayerBaseVector, LayerBaseVectorOptions } from './LayerBaseVector';
import { ol } from 'custom-ol';
export interface LayerBaseVectorEsriOptions extends LayerBaseVectorOptions {
    format: string;
    outSR: number;
    where: string;
    outFields: string;
    useEsriStyle: boolean;
}
/**
 * Base layer for esri vector layers
 * @augments LayerBaseVector
 */
declare class LayerBaseVectorEsri extends LayerBaseVector {
    _outSR: number;
    _esriFormat: ol.format.EsriJSON;
    _urlCopy: string;
    _useEsriStyle: boolean;
    /**
     * The base vector layer
     * @param {string} url - url for source
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
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} [options.where=1=1] the layer filter clause
     * @param {string} [options.outFields=*] comma separated list of output fields, defaults to all
     * @param {string} [options.format=pjson] the format the retrieve the data
     * @param {number} [options.outSR=3857] the output spatial reference, defaults to web mercator
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     * @param {boolean} [options.collapseLegend=false] if the legend should be initially collapsed
     * @param {number} [options.mapMoveMakeGetParams=function(extent, zoomLevel){}] function to create additional map move params
     */
    constructor(url: string, options: LayerBaseVectorEsriOptions);
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content to add to legend
     */
    addLegendContent(additionalContent?: string): void;
    /**
     * add feature collection
     * @param {object} featureCollection - features as esrijson
     */
    addFeatures(featureCollection: any): void;
    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    _load(): boolean;
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
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    mapMoveBefore(zoom: any, evtType: any): boolean;
    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    mapMoveCallback(d: any): void;
}
export default LayerBaseVectorEsri;
