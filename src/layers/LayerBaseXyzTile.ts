/**
 * Created by gavorhes on 12/4/2015.
 */
import {LayerBase, LayerBaseOptions} from './LayerBase';
import provide from '../util/provide';
import ol from 'custom-ol';
const nm = provide('layers');


/**
 * XYZ tile
 * @augments LayerBase
 */
export class LayerBaseXyzTile extends LayerBase {


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
    constructor(url: string, options: LayerBaseOptions) {
        super(url, options);
        this._source = new ol.source.XYZ({url: this.url == '' ? undefined : this.url});

        this._olLayer = new ol.layer.Tile({
            source: this._source as ol.source.XYZ,
            visible: this.visible,
            opacity: this.opacity,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution
        } );

        this._olLayer.setZIndex(this._zIndex);
    }

    /**
     *
     * @returns {ol.source.XYZ} the vector source
     */
    get source(): ol.source.XYZ {
        return this._source as ol.source.XYZ;
    }

    /**
     *
     * @returns {ol.layer.Tile|ol.layer.Base|undefined} the ol layer
     */
    get olLayer() : ol.layer.Tile {
        return this._olLayer as ol.layer.Tile;
    }
}

nm.LayerBaseXyzTile = LayerBaseXyzTile;
export default LayerBaseXyzTile;
