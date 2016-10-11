/**
 * Created by gavorhes on 11/4/2015.
 */
import { LayerBaseXyzTile } from './LayerBaseXyzTile';
import { LayerBaseOptions } from './LayerBase';
import RealEarthAnimateTile from '../mixin/RealEarthAnimateTile';
import { IRealEarthAnimate } from "../mixin/RealEarthAnimate";
export interface LayerRealEarthTileOptions extends LayerBaseOptions {
    products: string;
    animate?: boolean;
}
/**
 * Real earth tile
 * @augments LayerBaseXyzTile
 */
export declare class LayerRealEarthTile extends LayerBaseXyzTile implements IRealEarthAnimate {
    _products: string;
    animator: RealEarthAnimateTile;
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
    constructor(options: LayerRealEarthTileOptions);
    setLayerTime(theTime: number): boolean;
    _load(): boolean;
}
export default LayerRealEarthTile;
