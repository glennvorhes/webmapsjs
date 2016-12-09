import {LayerBase, LayerBaseOptions} from './LayerBase';
import mapMove from '../olHelpers/mapMove';
import MapMoveCls from '../olHelpers/mapMoveCls'
import provide from '../util/provide';
import ol from 'custom-ol'
import $ = require('jquery');

let g = new ol.Map({});

const nm = provide('layers');

export interface makeMapMoveParams {
    /**
     *
     * @param lyr
     * @param extent
     * @param zoomLevel
     */
    (lyr: LayerBaseVector, extent: Array<number>, zoomLevel?: number): any
}




export interface LayerBaseVectorOptions extends LayerBaseOptions{
    autoLoad?: boolean;
    style?: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction;
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
export class LayerBaseVector extends LayerBase {
    _olLayer: ol.layer.Vector;
    _source: ol.source.Vector;
    _style: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction;
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
    constructor(url: string, options: LayerBaseVectorOptions = {}) {
        super(url, options);

        options = options as LayerBaseVectorOptions;

        //prevent regular load if no url has been provided
        if (this.url.trim() == '') {
            this._loaded = true;
        }

        this._style = typeof options.style == 'undefined' ? undefined : options.style;

        if (this.visible) {
            this._autoLoad = true;
        } else {
            this._autoLoad = (typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false);
        }

        this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;

        if (options.mapMoveObj) {
            this._mapMove = options.mapMoveObj;
        } else {
            this._mapMove = this._onDemand ? mapMove : undefined;
        }


        this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams :
            function () {return {};};

        if (this._onDemand) {
            this._loaded = true;
            this._mapMoveParams = {};
            this._mapMove.checkInit();
            this._mapMove.addVectorLayer(this);
        }

        this._source = new ol.source.Vector();


        this._olLayer = new ol.layer.Vector(
            {
                source: this._source,
                visible: this.visible,
                style: this.style,
                minResolution: this._minResolution,
                maxResolution: this._maxResolution,
                renderOrder: options.renderOrder
            }
        );

        this.olLayer.setZIndex(this._zIndex);


        this._projectionMap = null;
        this._projection4326 = new ol.proj.Projection({code: "EPSG:4326"});
    }

    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */
    addFeatures(featureCollection) {
        console.log('Layer vector base addFeatures is a placeholder and does nothing');
    }

    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    mapMoveBefore(zoom, evtType) {
        if (this.minZoom !== undefined) {
            if (zoom < this.minZoom) {
                return false;
            }
        }

        if (this.maxZoom !== undefined) {
            if (zoom > this.maxZoom) {
                return false;
            }
        }

        return this.visible;
    }

    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    mapMoveMakeGetParams(extent, zoomLevel) {
        this._mapMoveParams = {};
        $.extend(this._mapMoveParams, this.params);
        $.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
    }

    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    mapMoveCallback(d) {
        if (this.source) {
            this._source.clear();
        }
    }

    /**
     * clear features in the layer
     */
    clear() {
        if (this._source) {
            this._source.clear();
        }
    }

    /**
     * get on demand delay in miliseconds
     */
    get onDemandDelay(): number {
        return this._onDemandDelay;
    }

    /**
     * get if the layer is autoloaded
     */
    get autoLoad(): boolean {
        return this._autoLoad;
    }

    /**
     * get the style definition
     */
    get style(): ol.StyleFunction|Array<ol.style.Style>|ol.style.Style {
        return this._style;
    }

    /**
     * set the style
     * @param style - the style or function
     */
    set style(style: ol.StyleFunction|Array<ol.style.Style>|ol.style.Style) {
        this._style = style;
        this.olLayer.setStyle(this._style as ol.style.Style);
    }

    /**
     * get the map CRS if it is defined by the map move object
     */
    get mapCrs(): string {
        return this.mapProj == null ? null : this.mapProj.getCode();
    }

    get mapProj(): ol.proj.Projection{
        if (this._projectionMap != null){
            return this._projectionMap;
        }

        if (this._mapMove) {
            this._projectionMap = this._mapMove.map.getView().getProjection();
            return this._projectionMap;
        } else {
            return null;
        }

    }

    /**
     * get the map move object
     * @type {MapMoveCls|*}
     */
    get mapMove(): MapMoveCls {
        return this._mapMove;
    }

    /**
     * map move params
     * @type {object}
     */
    get mapMoveParams() {
        return this._mapMoveParams;
    }

    get visible(): boolean{
        return this._visible;
    }

    /**
     * Set the layer visibility
     * @type {boolean}
     * @override
     */
    set visible(visibility) {
        super.setVisible(visibility);

        if (this._onDemand) {
            this.mapMove.triggerLyrLoad(this);
        }
    }

    /**
     * get the layer vector source
     * @override
     */
    get source(): ol.source.Vector {
        return this.getSource() as ol.source.Vector;
    }

    /**
     * array of ol features
     */
    get features(): Array<ol.Feature> {
        return this.source.getFeatures();
    }

    /**
     *
     */
    get olLayer(): ol.layer.Vector {
        return super.getOlLayer() as ol.layer.Vector;
    }

    protected setZIndex(newZ: number) {
        this.olLayer.setZIndex(newZ);
    }
}

nm.LayerBaseVector = LayerBaseVector;
export default LayerBaseVector;






