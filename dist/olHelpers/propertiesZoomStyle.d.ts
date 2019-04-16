/**
 * Created by gavorhes on 12/14/2015.
 */
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
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
declare function propertiesZoomStyle(styleFunc: (f: Feature, res: number) => Style | Style[]): (feature: Feature, zoom: number) => Style | Style[];
export default propertiesZoomStyle;
