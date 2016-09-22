import { ol } from 'custom-ol';
export interface LayerBaseOptions {
    id?: string;
    name?: string;
    opacity?: number;
    visible?: boolean;
    minZoom?: number;
    maxZoom?: number;
    params?: any;
    zIndex?: number;
    loadCallback?: Function;
    legendCollapse?: boolean;
    legendCheckbox?: boolean;
    legendContent?: string;
}
/**
 * The base layer class
 * @abstract
 */
export declare abstract class LayerBase {
    _legendCheckbox: boolean;
    _url: string;
    _opacity: number;
    _minZoom: number;
    _maxZoom: number;
    _visible: boolean;
    _loaded: boolean;
    _zIndex: number;
    _legendContent: string;
    _params: any;
    id: string;
    _name: string;
    _source: ol.source.Source;
    animate: boolean;
    _legendCollapse: boolean;
    _maxResolution: number;
    _minResolution: number;
    _$legendDiv: JQuery;
    loadCallback: Function;
    _olLayer: ol.layer.Layer;
    _applyCollapseCalled: boolean;
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */
    constructor(url: string, options?: LayerBaseOptions);
    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */
    _load(): boolean;
    /**
     * Get the legend html, be sure to only add to the DOM once
     * @returns {string} html for layer wrapped in a div
     */
    getLegendDiv(): string;
    /**
     *
     * @param {string|undefined} additionalContent - additional content to add to legend
     * @private
     */
    _addLegendContent(additionalContent: any): void;
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=] - additonal content to add
     */
    addLegendContent(additionalContent: any): void;
    applyCollapse(): any;
    /**
     * trick to refresh the layer
     */
    refresh(): void;
    /**
     * get the legend content
     * @type {string}
     */
    /**
     * set the legend content directly
     * @param {string} newVal - new content
     * @protected
     */
    legendContent: string;
    /**
     * get the map get params
     * @type {object}
     */
    /**
     * set the map get params
     * @param {object} newParams - new get params
     * @protected
     */
    params: any;
    /**
     * get the minimum resolution
     * @type {number|*}
     */
    minResolution: number;
    /**
     * get the maximum resolution
     * @type {number|*}
     */
    maxResolution: number;
    /**
     * get min zoom
     * @type {number|*}
     */
    minZoom: number;
    /**
     * get max zoom
     * @type {number|*}
     */
    maxZoom: number;
    /**
     * get the url
     * @type {string}
     */
    url: string;
    /**
     * Get the layer visibility
     * @type {boolean}
     */
    /**
     * set the visibility
     * @param visibility
     */
    visible: boolean;
    protected setVisible(visibility: boolean): void;
    /**
     * Get the layer opacity
     * @type {number}
     */
    /**
     * Set the layer opacity
     * @param {number} opacity - layer opacity
     */
    opacity: number;
    /**
     * Get the layer name
     * @type {string}
     */
    /**
     * set the layer name
     * @param {string} newName - the new name
     */
    name: string;
    /**
     * Check if the layer is loaded
     * @type {boolean}
     */
    loaded: boolean;
    /**
     * get the layer source
     * @type {*}
     */
    source: ol.source.Source;
    protected getSource(): ol.source.Source;
    /**
     * get the z index
     */
    /**
     * set the z index
     */
    zIndex: number;
    protected setZIndex(newZ: number): void;
    /**
     * the the ol layer
     */
    olLayer: ol.layer.Layer;
    protected getOlLayer(): ol.layer.Layer;
}
export default LayerBase;
