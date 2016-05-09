/**
 * Created by gavorhes on 12/4/2015.
 */
import $ from '../jquery';
import LayerBase from './LayerBase';
import * as esriToOl from '../olHelpers/esriToOlStyle';
import provide from '../util/provide';
const ol = require('../ol/ol');
const nm = provide('layers');

/**
 * XYZ tile
 * @augments LayerBase
 */
class LayerBaseXyzTile extends LayerBase {

    /**
     * The XYZ tile layer
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
     * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
     */
    constructor(url, options) {
        super(url, options);
        this._source = new ol.source.XYZ({url: this.url == '' ? undefined : this.url});
        this.olLayer = new ol.layer.Tile({
            source: this._source,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            zIndex: this._zIndex
        });


        this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;

        if (this._useEsriStyle) {
            this.addLegendContent();
        }
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    addLegendContent(additionalContent) {
        if (!this._useEsriStyle) {
            super.addLegendContent(additionalContent);
        } else {
            let urlCopy = this.url;

            let mapServerIndex = urlCopy.toLowerCase().indexOf('mapserver');
            if (mapServerIndex > -1) {
                urlCopy = urlCopy.slice(0, mapServerIndex + 9);
            } else {
                return;
            }

            if (urlCopy[urlCopy.length - 1] !== '/') {
                urlCopy += '/';
            }

            urlCopy += 'legend?f=pjson&callback=?';

            let _this = this;
            let superAddLegend = super.addLegendContent;

            $.get(urlCopy, {}, function (d) {
                let newHtml = esriToOl.makeMapServiceLegend(d);
                superAddLegend.call(_this, newHtml);
            }, 'json');
        }
    }

    /**
     *
     * @returns {ol.source.XYZ} the vector source
     */
    get source(){
        return super.source;
    }
}

nm.LayerBaseXyzTile = LayerBaseXyzTile;
export default LayerBaseXyzTile;
