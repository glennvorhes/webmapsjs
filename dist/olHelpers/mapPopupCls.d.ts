/// <reference types="jquery" />
/**
 * Created by gavorhes on 11/3/2015.
 */
import MapInteractionBase from './mapInteractionBase';
import ol from 'custom-ol';
import { LayerBaseVector } from "../layers/LayerBaseVector";
import LayerEsriMapServer from "../layers/LayerEsriMapServer";
export interface popupChangedFunction {
    ($popContent: JQuery): any;
}
/**
 *
 */
export interface popupCallback {
    /**
     * Callback function for the popup
     * @param featureProperties
     * @param jqRef
     */
    (featureProperties: Object, jqRef?: JQuery): string | boolean;
}
export declare class FeatureLayerProperties {
    feature: ol.Feature;
    layer: LayerBaseVector | LayerEsriMapServer;
    layerIndex: number;
    selectionLayer: ol.layer.Vector;
    popupContent: string;
    esriLayerName: string;
    /**
     *
     * @param feature the feature
     * @param layer - the layer in the popup
     * @param layerIndex - index of the layer
     * @param selectionLayer - the ol selection layer
     * @param [esriLayerName=undefined] - esri layer name
     */
    constructor(feature: ol.Feature, layer: LayerBaseVector | LayerEsriMapServer, layerIndex: number, selectionLayer: ol.layer.Vector, esriLayerName?: string);
    readonly layerName: string;
}
/**
 * map popup class
 * @augments MapInteractionBase
 */
export declare class MapPopupCls extends MapInteractionBase {
    private _popupOpen;
    private _passThroughLayerFeatureArray;
    private _currentPopupIndex;
    private _popupContentLength;
    private _esriMapServiceLayers;
    private _$popupCloser;
    private _$popupContent;
    private _$popupContainer;
    private _popupOverlay;
    private _arrPopupLayers;
    private _popupCoordinate;
    private _popupChangedFunctions;
    private _mapClickFunctions;
    private _selectionLayerLookup;
    private _arrPopupLayerIds;
    private _arrPopupLayerNames;
    private _arrPopupOlLayers;
    private _arrPopupContentFunction;
    private _selectionLayers;
    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */
    /**
     * map popup constructor
     */
    constructor();
    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */
    init(theMap: ol.Map): boolean;
    /**
     * helper to select features
     * @private
     */
    _triggerFeatSelect(): void;
    /**
     *
     * @param feature - the ol feature
     * @param {LayerEsriMapServer} lyr - the map server layer
     * @param {string} popupContent - popup content
     * @param {string} esriName - esri layer name
     */
    addMapServicePopupContent(feature: ol.Feature, lyr: LayerEsriMapServer, popupContent: string, esriName: string): void;
    /**
     *
     * @param  pixel - the ol pixel
     * @returns  feature layer properties
     * @private
     */
    _featuresAtPixel(pixel: ol.Pixel): Array<FeatureLayerProperties>;
    closePopup(): boolean;
    /**
     *
     * @param chgFunction - popup change function
     */
    addPopupChangedFunction(chgFunction: popupChangedFunction): void;
    /**
     *
     * @param {LayerBase|*} lyr - the layer being acted on
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns  the new selection layer
     * @private
     */
    _addPopupLayer(lyr: LayerBaseVector, selectionStyle: {
        color?: string;
        width?: number;
        olStyle?: ol.style.Style;
    }): ol.layer.Vector;
    /**
     * Add popup to the map
     * @param {LayerBase|*} lyr The layer that the popup with act on
     * @param {popupCallback} popupContentFunction - popup content function that makes popup info
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    addVectorPopup(lyr: LayerBaseVector, popupContentFunction: popupCallback, selectionStyle?: {
        color?: string;
        width?: number;
        olStyle?: ol.style.Style;
    }): ol.layer.Vector;
    /**
     *
     * @param {LayerBase} lyr - layer
     */
    removeVectorPopup(lyr: any): void;
    /**
     *
     * @param {LayerEsriMapServer} lyr - map server layer
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    addMapServicePopup(lyr: any, selectionStyle?: ol.style.Style | Array<ol.style.Style> | ol.StyleFunction): ol.layer.Vector;
    clearSelection(): void;
    /**
     * Add a function to be called when the map is clicked but before any popups are implemented
     * @param {function} func - the map click function
     */
    addMapClickFunction(func: Function): void;
}
export default MapPopupCls;
