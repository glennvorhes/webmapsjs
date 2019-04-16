/**
 * Created by gavorhes on 12/4/2015.
 */
import { LayerBase, LayerBaseOptions } from './LayerBase';
import XYZ from 'ol/source/XYZ';
import Tile from 'ol/layer/Tile';
/**
 * XYZ tile
 * @augments LayerBase
 */
export declare class LayerBaseXyzTile extends LayerBase {
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
    constructor(url: string, options?: LayerBaseOptions);
    readonly source: XYZ;
    readonly olLayer: Tile;
}
export default LayerBaseXyzTile;
