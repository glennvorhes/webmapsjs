/**
 * Created by gavorhes on 12/15/2015.
 */
import ol = require('custom-ol');
export interface quickMapOptions {
    divId?: string;
    center?: {
        x: number;
        y: number;
    };
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    baseSwitcher?: boolean;
    fullScreen?: boolean;
    addGeocode?: boolean;
}
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param [options={}] config options
 * @param [options.divId=map] map div id
 * @param [options.center={}] center config object
 * @param [options.center.x=-10018378] center x, web mercator x or lon
 * @param [options.center.y=5574910] center y, web mercator y or lat
 * @param [options.zoom=7] zoom level
 * @param [options.minZoom=undefined] min zoom
 * @param [options.maxZoom=undefined] max zoom
 * @param [options.baseSwitcher=true] if add base map switcher
 * @param [options.fullScreen=false] if add base map switcher
 * @returns the ol map
 */
export declare function quickMapBase(options?: quickMapOptions): ol.Map;
export default quickMapBase;
