/**
 * Created by gavorhes on 12/7/2015.
 */
import { LayerBase, LayerBaseOptions } from './LayerBase';
import { ol } from 'custom-ol';
export interface LayerEsriMapServerOptions extends LayerBaseOptions {
    addPopup?: boolean;
    showLayers?: Array<number>;
    useEsriStyle?: boolean;
}
/**
 * esri mapserver layer
 * @augments LayerBase
 */
export declare class LayerEsriMapServer extends LayerBase {
    _esriFormat: ol.format.EsriJSON;
    _popupRequest: JQueryXHR;
    /**
     * The base layer for all others
     * @param {string} url - resource url
     * @param {object} [options] - config
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
     * @param {boolean} [options.addPopup=false] if a popup should be added
     * @param {undefined|Array<number>} [options.showLayers=undefined] if a popup should be added
     */
    constructor(url: any, options?: LayerEsriMapServerOptions);
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    addLegendContent(additionalContent?: string): void;
    getPopupInfo(queryParams: any): void;
    /**
     *
     * @returns {ol.source.TileArcGISRest} the vector source
     */
    source: ol.source.TileArcGISRest;
    /**
     *
     * @returns the ol layer
     */
    olLayer: ol.layer.Tile;
}
export default LayerEsriMapServer;
