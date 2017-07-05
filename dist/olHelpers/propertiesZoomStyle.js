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
    if (styleFunc == undefined) {
        return undefined;
    }
    return function (feature, resolution) {
        styleFunc(feature.getProperties(), zoomResolutionConvert.resolutionToZoom(resolution));
    };
}
nm.propertiesZoomStyle = propertiesZoomStyle;
exports.default = propertiesZoomStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllc1pvb21TdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvcHJvcGVydGllc1pvb21TdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgsMkNBQXNDO0FBQ3RDLCtEQUFpRTtBQUVqRSxJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR2hDOzs7Ozs7R0FNRztBQUVIOzs7O0dBSUc7QUFDSCw2QkFBNkIsU0FBUztJQUNsQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztRQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxPQUFtQixFQUFFLFVBQVU7UUFDNUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxFQUFFLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDN0Msa0JBQWUsbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi8xNC8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCAqIGFzIHpvb21SZXNvbHV0aW9uQ29udmVydCBmcm9tICcuL3pvb21SZXNvbHV0aW9uQ29udmVydCc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycycpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBIHN0eWxlIGZ1bmN0aW9uIGJhc2VkIG9uIHByb3BlcnRpZXMgYW5kIHpvb20gbGV2ZWwsIHdyYXBzIG5vcm1hbCBmZWF0dXJlLCByZXNvbHV0aW9uIGZ1bmN0aW9uXHJcbiAqIEBjYWxsYmFjayBwcm9wZXJ0aWVzWm9vbVN0eWxlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIHRoZSBmZWF0dXJlIHByb3BlcnRpZXNcclxuICogQHBhcmFtIHtudW1iZXJ9IHpvb20gbGV2ZWxcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogd3JhcHBlciB0byBkZWZpbmUgYSBzdHlsZSBmdW5jdGlvbiBieSBwcm9wZXJ0aWVzIGFuZCB6b29tIGxldmVsXHJcbiAqIEBwYXJhbSB7cHJvcGVydGllc1pvb21TdHlsZXwqfSBzdHlsZUZ1bmMgLSBzdHlsZSBmdW5jdGlvblxyXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb258Kn0gbmV3IGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBwcm9wZXJ0aWVzWm9vbVN0eWxlKHN0eWxlRnVuYykge1xyXG4gICAgaWYgKHN0eWxlRnVuYyA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmZWF0dXJlOiBvbC5GZWF0dXJlLCByZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgc3R5bGVGdW5jKGZlYXR1cmUuZ2V0UHJvcGVydGllcygpLCB6b29tUmVzb2x1dGlvbkNvbnZlcnQucmVzb2x1dGlvblRvWm9vbShyZXNvbHV0aW9uKSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5ubS5wcm9wZXJ0aWVzWm9vbVN0eWxlID0gcHJvcGVydGllc1pvb21TdHlsZTtcclxuZXhwb3J0IGRlZmF1bHQgcHJvcGVydGllc1pvb21TdHlsZTtcclxuIl19