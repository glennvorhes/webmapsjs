/**
 * Created by gavorhes on 11/2/2015.
 */
import { LayerBaseVector, LayerBaseVectorOptions } from './LayerBaseVector';
import ol = require('custom-ol');
import { MapMoveCls } from "../olHelpers/mapMoveCls";
export interface crsTransform {
    dataProjection?: ol.proj.Projection;
    featureProjection?: ol.proj.Projection;
}
export interface LayerBaseVectorGeoJsonOptions extends LayerBaseVectorOptions {
    transform?: crsTransform;
    mapMoveObj?: MapMoveCls;
}
/**
 * The Vector GeoJson Layer
 * @augments LayerBaseVector
 */
export declare class LayerBaseVectorGeoJson extends LayerBaseVector {
    _geoJsonFormat: ol.format.GeoJSON;
    _transform: crsTransform;
    /**
     * @param {string|undefined|null} url - resource url, set to '' to make blank layer
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
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     */
    constructor(url: any, options?: LayerBaseVectorGeoJsonOptions);
    /**
     * add feature collection
     * @param {object} featureCollection - as geojson object
     */
    addFeatures(featureCollection: any): void;
    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    _load(): boolean;
    /**
     * callback function on map move
     * @param {object} d the json response
     * @override
     */
    mapMoveCallback(d: any): void;
}
export default LayerBaseVectorGeoJson;
