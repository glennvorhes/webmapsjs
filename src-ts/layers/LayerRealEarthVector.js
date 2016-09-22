/**
 * Created by gavorhes on 11/13/2015.
 */

import LayerBaseVectorGeoJson from './LayerBaseVectorGeoJson';
import RealEarthAnimateVector from '../mixin/RealEarthAnimateVector';
import provide from '../util/provide';
const mixIns = require('es6-mixins');
const nm = provide('layers');

/**
 * Vector real earth vector
 * @augments LayerBaseVectorGeoJson
 */
class LayerVectorRealEarth extends LayerBaseVectorGeoJson {
    /**
     * Real Earth vector layer
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
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     *
     * @param {string} options.products real earth products identifier
     * @param {boolean} [options.animate=false] if the layer should be animated
     */
    constructor(options) {
        options.animate = typeof options.animate == 'boolean' ? options.animate : false;
        if (!options.animate) {
            options.params = {products: options.products};
            super('http://realearth.ssec.wisc.edu/api/shapes', options);
        } else {
            options.autoLoad = false;
            super('', options);
            this._products = options.products;
            if (!this.timeInit) {
                mixIns([RealEarthAnimateVector], this);
            }
            this.timeInit();
        }
    }
}

nm.LayerVectorRealEarth = LayerVectorRealEarth;
export default LayerVectorRealEarth;