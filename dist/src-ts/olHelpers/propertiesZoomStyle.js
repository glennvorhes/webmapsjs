/**
 * Created by gavorhes on 12/14/2015.
 */
"use strict";
var provide_1 = require('../util/provide.d');
var zoomResolutionConvert = require('./zoomResolutionConvert.d');
var nm = provide_1.default('olHelpers');
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
    if (styleFunc == undefined) {
        return undefined;
    }
    return function (feature, resolution) {
        styleFunc(feature.getProperties(), zoomResolutionConvert.resolutionToZoom(resolution));
    };
}
nm.propertiesZoomStyle = propertiesZoomStyle;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = propertiesZoomStyle;
//# sourceMappingURL=propertiesZoomStyle.js.map