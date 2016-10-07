/**
 * Created by gavorhes on 12/15/2015.
 */

import {quickMapBase, quickMapOptions} from './quickMapBase';
import provide from '../util/provide';
import MapMoveCls from './mapMoveCls';
import MapPopupCls from './mapPopupCls';
import ol from 'custom-ol';
let nm = provide('olHelpers');


/**
 * @typedef {object} quickMapMultiReturn
 * @property {ol.Map} map The X Coordinate
 * @property {MapMoveCls} mapMove The Y Coordinate
 * @property {MapPopupCls} mapPopup The Y Coordinate
 */

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
 * @returns return object with map, map move, and map popup objects
 */
function quickMapMulti(options: quickMapOptions): {map: ol.Map, mapMove: MapMoveCls, mapPopup: MapPopupCls} {
    let m = quickMapBase(options);
    let mov = new MapMoveCls();
    let pop = new MapPopupCls();
    mov.init(m);
    pop.init(m);

    return {map: m, mapMove: mov, mapPopup: pop};
}

nm.quickMapMulti = quickMapMulti;
export default quickMapMulti;
