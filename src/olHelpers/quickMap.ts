/**
 * Created by gavorhes on 12/15/2015.
 */

import {quickMapOptions, quickMapBase} from './quickMapBase';
import provide from '../util/provide';
import mapMove from './mapMove';
import mapPopup from './mapPopup';
let nm = provide('olHelpers');
import Map from 'ol/Map';

export {quickMapOptions} from './quickMapBase';

/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
export function quickMap(options : quickMapOptions = {}): Map {
    let m = quickMapBase(options);
    mapMove.init(m);
    mapPopup.init(m);
    return m;
}


nm.quickMap = quickMap;
export default quickMap;
