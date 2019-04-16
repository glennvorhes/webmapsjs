/**
 * Created by gavorhes on 12/14/2015.
 */

import provide from '../util/provide';
import * as zoomResolutionConvert from './zoomResolutionConvert';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
const nm = provide('olHelpers');


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
function propertiesZoomStyle(styleFunc: (f: Feature, res: number) => Style|Style[]):
(feature: Feature, zoom: number) => Style|Style[]
{
    return function (feature: Feature, zoom: number): Style|Style[] {
        return styleFunc(feature, zoomResolutionConvert.zoomToResolution(zoom));
    };
}

nm.propertiesZoomStyle = propertiesZoomStyle;
export default propertiesZoomStyle;
