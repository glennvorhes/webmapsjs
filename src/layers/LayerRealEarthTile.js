/**
 * Created by gavorhes on 11/4/2015.
 */

import $ from '../jquery';
import LayerBaseXyzTile from './LayerBaseXyzTile';
import RealEarthAnimateTile from '../mixin/RealEarthAnimateTile';
import provide from '../util/provide';
const mixIns = require('es6-mixins');
const nm = provide('layers');

/**
 * Real earth tile
 * @augments LayerBaseXyzTile
 */
class LayerRealEarthTile extends LayerBaseXyzTile {
    /**
     * The base layer for all others
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
     * @param {string} options.products - the products to request
     * @param {boolean} [options.hasTimes=false] If the layer is time dependent, fixed set of dates
     * @param {boolean} [options.animate=false] if the layer should be animated
     */
    constructor(options) {
        options.animate = typeof options.animate == 'boolean' ? options.animate : false;
        if (!options.animate) {
            super(`http://realearth.ssec.wisc.edu/api/image?products=${options.products}&x={x}&y={y}&z={z}`, options);
            this._products = options.products;
        } else {
            super('', options);
            this._products = options.products;

            if (!this.timeInit){
                mixIns([RealEarthAnimateTile], this);
            }
            this.timeInit();
        }
    }
}

nm.LayerRealEarthTile = LayerRealEarthTile;
export default LayerRealEarthTile;
