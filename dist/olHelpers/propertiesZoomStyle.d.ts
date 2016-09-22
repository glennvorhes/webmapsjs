import { ol } from 'custom-ol';
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
declare function propertiesZoomStyle(styleFunc: any): (feature: ol.Feature, resolution: any) => void;
export default propertiesZoomStyle;
