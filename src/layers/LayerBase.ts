import * as zoomResolutionConvert from '../olHelpers/zoomResolutionConvert';
import provide from '../util/provide';
import ol = require('custom-ol');
import makeGuid from '../util/makeGuid';
import $ = require('jquery');

const nm = provide('layers');


export interface LayerBaseOptions{
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
export abstract class LayerBase {

    protected _legendCheckbox: boolean;
    protected _url: string;
    protected _opacity: number;
    protected _minZoom: number;
    protected _maxZoom: number;
    protected _visible: boolean;
    protected _loaded: boolean;
    protected _zIndex: number;
    protected _legendContent: string;
    protected _params: any;
    protected _id: string;
    protected _name: string;
    protected _source: ol.source.Source;
    protected _animate: boolean;
    protected _legendCollapse: boolean;
    protected _maxResolution: number;
    protected _minResolution: number;
    protected  _$legendDiv: JQuery;
    loadCallback: Function;
    protected _olLayer: ol.layer.Layer;
    protected _applyCollapseCalled: boolean;



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
    constructor(url: string, options: LayerBaseOptions = {}) {
        options = options || {} as LayerBaseOptions;

        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;


        this._params = typeof options.params == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;

        this.id = options.id || makeGuid();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;

        if (this._opacity > 1) {
            this._opacity = 1;
        } else if (this._opacity < 0) {
            this._opacity = 0;
        }

        this._visible = typeof options.visible === 'boolean' ? options.visible : true;

        this._source = undefined;

        /**
         *
         * @protected
         */
        this._olLayer = undefined;
        this._loaded = false;

        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);

        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;

        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {
        };


        this._legendContent = '';

        if (this._legendCheckbox) {
            this._legendContent += `<input type="checkbox" ${this.visible ? 'checked' : ''} ` +
                `class="legend-check" id="${this.id}-legend-layer-check"><span></span>`;
            this._legendContent += `<label for="${this.id}-legend-layer-check" class="legend-layer-name">${this.name}</label>`;
        } else {
            this._legendContent += `<label class="legend-layer-name">${this.name}</label>`;
        }

        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }

    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */
    _load() {
        if (this.loaded == true) {
            return true;
        } else {
            this._loaded = true;

            return false;
        }
    }

    /**
     * Get the legend html, be sure to only add to the DOM once
     * @returns {string} html for layer wrapped in a div
     */
    getLegendDiv() {
        return `<div class="legend-layer-div" id="${this.id}-legend-layer-div">${this._legendContent}</div>`;
    }

    /**
     *
     * @param additionalContent - additional content to add to legend
     * @private
     */
    _addLegendContent(additionalContent='') {

        let addCollapse = additionalContent.indexOf('<ul>') > -1;

        if (addCollapse) {
            additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
        }

        this._legendContent += additionalContent;

        this._$legendDiv = $(`#${this.id}-legend-layer-div`);

        if (this._$legendDiv.length > 0) {
            this._$legendDiv.append(additionalContent);
            this.applyCollapse();
        }
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=] - additonal content to add
     */
    addLegendContent(additionalContent: string) {
        this._addLegendContent(additionalContent);
    }

    applyCollapse(): void {
        if (this._applyCollapseCalled) {
            console.log('collapse already applied');

            return undefined;
        }

        this._$legendDiv = $(`#${this.id}-legend-layer-div`);

        if (this._$legendDiv.length > 0) {

            let $expander = this._$legendDiv.find('.legend-items-expander');

            if ($expander.length > 0) {
                this._applyCollapseCalled = true;

                $expander.click(function () {
                    let $this = $(this);

                    $this.siblings('ul').slideToggle();

                    if ($this.hasClass('legend-layer-group-collapsed')) {
                        $this.removeClass('legend-layer-group-collapsed');
                        $this.html('&#9660;');
                    } else {
                        $this.addClass('legend-layer-group-collapsed');
                        $this.html('&#9654;');
                    }
                });

                if (this._legendCollapse) {
                    $expander.trigger('click');
                }
            }
        }
    }

    /**
     * trick to refresh the layer
     */
    refresh() {
        if (this.source) {
            this.source.refresh();
        }
    }

    get id(): string{
        return this._id;
    }

    set id(newId: string){
        this._id = newId;
    }

    get animate(): boolean{
        return this._animate;
    }

    set animate(animate: boolean){
        this._animate = animate;
    }

    /**
     * get the legend content
     * @type {string}
     */
    get legendContent(): string {
        return this._legendContent;
    }

    /**
     * set the legend content directly
     * @param {string} newVal - new content
     * @protected
     */
    set legendContent(newVal: string) {
        this._legendContent = newVal;
    }

    /**
     * get the map get params
     * @type {object}
     */
    get params(): {[s: string]: any} {
        return this._params;
    }

    /**
     * set the map get params
     * @param {object} newParams - new get params
     * @protected
     */
    set params(newParams: {[s: string]: any}) {
        this._params = newParams;
    }

    /**
     * get the minimum resolution
     * @type {number|*}
     */
    get minResolution(): number {
        return this._minResolution;
    }

    /**
     * get the maximum resolution
     * @type {number|*}
     */
    get maxResolution(): number {
        return this._maxResolution;
    }

    /**
     * get min zoom
     * @type {number|*}
     */
    get minZoom(): number {
        return this._minZoom;
    }

    /**
     * get max zoom
     * @type {number|*}
     */
    get maxZoom(): number {
        return this._maxZoom;
    }

    /**
     * get the url
     * @type {string}
     */
    get url(): string {
        return this._url;
    }

    /**
     * Get the layer visibility
     * @type {boolean}
     */
    get visible(): boolean {
        return this._visible;
    }

    /**
     * set the visibility
     * @param visibility
     */
    set visible(visibility: boolean) {
        this.setVisible(visibility);
    }

    protected setVisible(visibility: boolean) {
        this._visible = visibility;
        if (this.olLayer) {
            this.olLayer.setVisible(this._visible);
            if (visibility && !this._loaded) {
                this._load();
            }
        }
    }


    /**
     * Get the layer opacity
     * @type {number}
     */
    get opacity(): number {
        return this._opacity;
    }

    /**
     * Set the layer opacity
     * @param {number} opacity - layer opacity
     */
    set opacity(opacity: number) {
        this._opacity = opacity;
        if (this.olLayer) {
            this.olLayer.setOpacity(this._opacity);
        }
    }

    /**
     * Get the layer name
     * @type {string}
     */
    get name(): string {
        return this._name;
    }

    /**
     * set the layer name
     * @param {string} newName - the new name
     */
    set name(newName: string) {
        this._name = newName;
    }

    /**
     * Check if the layer is loaded
     * @type {boolean}
     */
    get loaded():boolean {
        return this._loaded;
    }

    /**
     * get the layer source
     * @type {*}
     */
    get source(): ol.source.Source {
        return this.getSource();
    }


    protected getSource(): ol.source.Source{
        return this._source;
    }

    /**
     * get the z index
     */
    get zIndex(): number {
        return this._zIndex;
    }

    /**
     * set the z index
     */
    set zIndex(newZ: number) {
        this._zIndex = newZ;
    }

    protected setZIndex(newZ: number){

    }

    /**
     * the the ol layer
     */
    get olLayer(): ol.layer.Layer {
        return this.getOlLayer();
    }

    protected getOlLayer(): ol.layer.Layer{
        return this._olLayer;
    }
}

nm.LayerBase = LayerBase;
export default LayerBase;
