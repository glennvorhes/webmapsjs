/**
 * Created by gavorhes on 12/14/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var zoomResolutionConvert = require("./zoomResolutionConvert");
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
    return function (feature, zoom) {
        return styleFunc(feature, zoomResolutionConvert.zoomToResolution(zoom));
    };
}
nm.propertiesZoomStyle = propertiesZoomStyle;
exports.default = propertiesZoomStyle;
//# sourceMappingURL=propertiesZoomStyle.js.map