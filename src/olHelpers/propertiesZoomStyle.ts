/**
 * Created by gavorhes on 12/14/2015.
 */

import provide from '../util/provide';
import * as zoomResolutionConvert from './zoomResolutionConvert';
import {ol} from 'custom-ol'
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
function propertiesZoomStyle(styleFunc) {
    if (styleFunc == undefined){
        return undefined;
    }

    return function (feature: ol.Feature, resolution) {
        styleFunc(feature.getProperties(), zoomResolutionConvert.resolutionToZoom(resolution));
    };
}

nm.propertiesZoomStyle = propertiesZoomStyle;
export default propertiesZoomStyle;
