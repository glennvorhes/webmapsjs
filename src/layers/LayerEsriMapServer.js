/**
 * Created by gavorhes on 12/7/2015.
 */
import $ from '../jquery/jquery';
import LayerBase from './LayerBase';
import * as esriToOl from '../olHelpers/esriToOlStyle';
import mapPopup from '../olHelpers/mapPopup';
import provide from '../util/provide';
import ol from '../ol/ol';
const nm = provide('layers');

/**
 * esri mapserver layer
 * @augments LayerBase
 */
class LayerEsriMapServer extends LayerBase {
    /**
     * The base layer for all others
     * @param {string} url - resource url
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
     * @param {boolean} [options.addPopup=false] if a popup should be added
     */
    constructor(url, options) {
        super(url, options);
        this._source = new ol.source.TileArcGISRest({url: this.url == '' ? undefined : this.url});

        this.olLayer = new ol.layer.Tile({
            source: this._source,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            zIndex: this._zIndex
        });

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;

        this._esriFormat = new ol.format.EsriJSON();
        this._popupRequest = null;

        this.addLegendContent();

        if (options.addPopup) {
            mapPopup.addMapServicePopup(this);
        }
    }

    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    addLegendContent(additionalContent) {
        let urlCopy = this.url;

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


    getPopupInfo(queryParams) {
        if (!this.visible) {
            return;
        }

        let urlCopy = this.url;

        if (urlCopy[urlCopy.length - 1] != '/') {
            urlCopy += '/';
        }

        urlCopy += 'identify?callback=?';

        let _this = this;

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

                mapPopup.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
            }
        }, 'json').always(function () {
            _this._popupRequest = null;
        });
    }

    /**
     * overwrite the base load
     * @protected
     */
    _load() {
    }

    /**
     *
     * @returns {ol.source.TileArcGISRest} the vector source
     */
    get source() {
        return super.source;
    }
}
nm.LayerEsriMapServer = LayerEsriMapServer;
export default LayerEsriMapServer;
