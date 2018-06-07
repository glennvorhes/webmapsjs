/**
 * Created by gavorhes on 12/7/2015.
 */
import {LayerBase, LayerBaseOptions} from './LayerBase';
import * as esriToOl from '../olHelpers/esriToOlStyle';
import mapPopup from '../olHelpers/mapPopup';
import provide from '../util/provide';
import ol = require('custom-ol');
import $ = require('jquery');

const nm = provide('layers');



/**
 * Helper to return the url to the service on the production server
 * @param {string} folder
 * @param {string} service
 * @returns {string}
 */
export function makeServiceUrl(folder: string, service: string): string{
    return `https://transportal.cee.wisc.edu/applications/arcgis2/rest/services/${folder}/${service}/MapServer`
}

export function localCacheUrl(folder: string, service: string): string{
    let windowLocation = window.location;
    let loc = windowLocation.href;

    let url = `/mapserver/${folder}/${service}`;

    if (loc.indexOf('transportal.cee.wisc.edu') > -1){
        if (loc.toLowerCase().indexOf('webmapsstage') > -1){
            url = 'https://transportal.cee.wisc.edu/gis/webmapsstage' + url;
        } else {
            url = 'https://transportal.cee.wisc.edu/gis/webmaps' + url
        }
    } else if (parseInt(windowLocation.port) !== 8081){
        url = 'https://transportal.cee.wisc.edu/gis/webmaps' + url
    }


    return url;
}




export interface LayerEsriMapServerOptions extends LayerBaseOptions {
    addPopup?: boolean;
    showLayers?: Array<number>;
    getLegend?: boolean;
}

/**
 * esri mapserver layer
 * @augments LayerBase
 */
export class LayerEsriMapServer extends LayerBase {
    _esriFormat: ol.format.EsriJSON;
    _popupRequest: JQueryXHR;
    _showLayers: number[];

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
    constructor(url: string, options: LayerEsriMapServerOptions = {}) {

        super(url, options);
        this._source = new ol.source.TileArcGISRest(
            {
                url: this.url == '' ? undefined : this.url,
                params: typeof options.showLayers == 'undefined' ? undefined : {layers: 'show:' + options.showLayers.join(',')}
            }
        );

        this._showLayers = options.showLayers || [];

        this._olLayer = new ol.layer.Tile({
            source: this._source as ol.source.Tile,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution
        });


        this._olLayer.setZIndex(this._zIndex);

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;

        this._esriFormat = new ol.format.EsriJSON();
        this._popupRequest = null;

        options.getLegend = typeof options.getLegend === 'boolean' ? options.getLegend : true;

        if (options.getLegend){
            this.addLegendContent();
        }

        if (options.addPopup) {
            mapPopup.addMapServicePopup(this);
        }
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    addLegendContent(additionalContent?: string) {
        let urlCopy = this.url;

        if (urlCopy[urlCopy.length - 1] !== '/') {
            urlCopy += '/';
        }

        urlCopy += 'legend?f=pjson&callback=?';

        $.get(urlCopy, {}, (d) => {
            let newHtml = esriToOl.makeMapServiceLegend(d, this._showLayers);
            super.addLegendContent(newHtml);
        }, 'json');
    }


    getPopupInfo(queryParams: {[s: string]: any}) {
        if (!this.visible) {
            return;
        }

        let urlCopy = this.url;

        if (urlCopy[urlCopy.length - 1] != '/') {
            urlCopy += '/';
        }

        urlCopy += 'identify?callback=?';

        let __this = this;

        if (this._popupRequest != null) {
            this._popupRequest.abort();
        }


        this._popupRequest = $.get(urlCopy, queryParams, function (d) {
            for (let r of d['results']) {

                let popupHtml = '<table class="esri-popup-table">';

                for (let a in r['attributes']) {
                    if (r['attributes'].hasOwnProperty(a)) {
                        let attrVal = r['attributes'][a];

                        if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                            continue;
                        }

                        let attr = a;
                        if (attr.length > 14) {
                            attr = attr.slice(0, 11) + '...';
                        }

                        popupHtml += `<tr><td>${attr}</td><td>${attrVal}</td></tr>`;
                    }
                }

                popupHtml += '</table>';

                mapPopup.addMapServicePopupContent(__this._esriFormat.readFeature(r), __this, popupHtml, r['layerName']);
            }
        }, 'json');

        this._popupRequest.always(function () {
            __this._popupRequest = null;
        });

    }

    /**
     *
     * @returns {ol.source.TileArcGISRest} the vector source
     */
    get source(): ol.source.TileArcGISRest {
        return super.getSource() as ol.source.TileArcGISRest;
    }

    /**
     *
     * @returns the ol layer
     */
    get olLayer(): ol.layer.Tile {
        return super.getOlLayer() as ol.layer.Tile;
    }
}
nm.LayerEsriMapServer = LayerEsriMapServer;
export default LayerEsriMapServer;
