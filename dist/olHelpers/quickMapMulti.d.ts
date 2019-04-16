/**
 * Created by gavorhes on 12/15/2015.
 */
import Map from 'ol/Map';
import { quickMapOptions } from './quickMapBase';
import MapMoveCls from './mapMoveCls';
import MapPopupCls from './mapPopupCls';
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
declare function quickMapMulti(options: quickMapOptions): {
    map: Map;
    mapMove: MapMoveCls;
    mapPopup: MapPopupCls;
};
export default quickMapMulti;
