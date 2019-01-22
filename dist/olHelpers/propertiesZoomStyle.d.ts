/**
 * Created by gavorhes on 12/14/2015.
 */
import ol = require('custom-ol');
/**
 * A style function based on properties and zoom level, wraps normal feature, resolution function
 * @callback propertiesZoomStyle
 * @param {object} properties the feature properties
 * @param {number} zoom level
 *
 */
/**
 * wrapper to define a style function by properties and zoom level
 * @param {propertiesZoomStyle|*} styleFunc - style function
 * @returns {function|*} new function
 */
declare function propertiesZoomStyle(styleFunc: (f: ol.Feature, res: number) => ol.style.Style | ol.style.Style[]): (feature: ol.Feature, zoom: number) => ol.style.Style | ol.style.Style[];
export default propertiesZoomStyle;
