/**
 * Created by gavorhes on 12/4/2015.
 */
import provide from '../util/provide';
import {LayerBaseXyzTile} from './LayerBaseXyzTile';
import {LayerBaseOptions} from './LayerBase'
import * as esriToOl from '../olHelpers/esriToOlStyle';


const nm = provide('layers');

export interface LayerEsriTileOptions extends LayerBaseOptions{
    useEsriStyle?: boolean
}

/**
 * Esri tile
 * @augments LayerBaseXyzTile
 */
export class LayerEsriTile extends LayerBaseXyzTile {
    _useEsriStyle: boolean;

    /**
     * The Esri tile layer
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
    constructor(url: string, options: LayerEsriTileOptions) {
        if (url.search(/\/$/) == -1) {
            url += '/';
        }
        url += 'tile/{z}/{y}/{x}';

        super(url, options);

        this._useEsriStyle = typeof options.useEsriStyle == 'boolean' ? options.useEsriStyle : false;

        if (this._useEsriStyle) {
            this.addLegendContent();
        }
    }


    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    addLegendContent(additionalContent = ''): void {
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


}

nm.LayerBaseXyzTile = LayerEsriTile;
export default LayerEsriTile;

