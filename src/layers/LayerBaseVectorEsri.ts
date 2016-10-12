/**
 * Created by gavorhes on 11/2/2015.
 */

import {LayerBaseVector, LayerBaseVectorOptions} from './LayerBaseVector';
import * as esriToOl from '../olHelpers/esriToOlStyle';
import provide from '../util/provide';
import ol from 'custom-ol'
import $ = require('jquery');
let nm = provide('layers');

export interface LayerBaseVectorEsriOptions  extends LayerBaseVectorOptions{
    format?: string;
    outSR?: number;
    where?: string;
    outFields?: string;
    useEsriStyle?: boolean;
}

/**
 * Base layer for esri vector layers
 * @augments LayerBaseVector
 */
export class LayerBaseVectorEsri extends LayerBaseVector {
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
    constructor(url: string, options: LayerBaseVectorEsriOptions) {

        if (typeof options.params != 'object') {
            options.params = {};
        }
        options.params['where'] = options.where || '1=1';
        options.params['outFields'] = options.outFields || '*';
        options.params['f'] = options.format || 'pjson';
        options.params['outSR'] = options.outSR || 3857;

        super(url, options);
        this._outSR = this.params['outSR'];
        this._esriFormat = new ol.format.EsriJSON();

        if (this._url[this._url.length - 1] !== '/') {
            this._url += '/';
        }

        this._urlCopy = this.url;
        this._url += 'query?callback=?';

        if (this.autoLoad || this.visible) {
            this._load();
        }

        this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;

        if (this._useEsriStyle) {
            this.addLegendContent();
        }
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content to add to legend
     */
    addLegendContent(additionalContent?: string) {
        if (!this._useEsriStyle) {
            super.addLegendContent(additionalContent);
        } else {
            $.get(this._urlCopy + '?f=pjson&callback=?', {}, (d) => {
                if (d['subLayers'].length > 0) {
                    alert('should only use single feature layers, not groups');

                    return;
                }

                let newStyleAndLegend = esriToOl.makeFeatureServiceLegendAndSymbol(d);
                this.style = newStyleAndLegend.style;
                super.addLegendContent(newStyleAndLegend.legend);
            }, 'json');
        }
    }


    /**
     * add feature collection
     * @param {object} featureCollection - features as esrijson
     */
    addFeatures(featureCollection) {
        let feats = this._esriFormat.readFeatures(featureCollection);
        this.source.addFeatures(feats);
    }

    /**
     * trigger load features
     * @protected
     * @returns {boolean} if already loaded
     */
    _load() {
        if (super._load()) {
            return true;
        }
        $.get(this._url, this.params, (d) => {
            this.addFeatures(d);
            this.loadCallback(this);
        }, 'json').fail(() => {
                this._loaded = false;
            });

        return false;
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
        super.mapMoveMakeGetParams(extent, zoomLevel);
        this.mapMoveParams['geometry'] = `${extent.minX},${extent.minY},${extent.maxX},${extent.maxY}`;
        this.mapMoveParams['geometryType'] = 'esriGeometryEnvelope';
        this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
        this.mapMoveParams['spatialRel'] = 'esriSpatialRelIntersects';
        this.mapMoveParams['inSR'] = 3857;
        if (this._outSR == 3857) {
            this.mapMoveParams['geometryPrecision'] = 1;
        }
    }

    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    mapMoveBefore(zoom, evtType) {
        return super.mapMoveBefore(zoom, evtType);
        //if (super.mapMoveBefore(zoom, evtType)){
        //    //place holder for additional processing
        //    return true;
        //} else {
        //    return false;
        //}
    }

    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    mapMoveCallback(d) {
        super.mapMoveCallback(d);
        this.source.addFeatures(this._esriFormat.readFeatures(d));
    }
}

nm.LayerBaseVectorEsri = LayerBaseVectorEsri;
export default LayerBaseVectorEsri;
