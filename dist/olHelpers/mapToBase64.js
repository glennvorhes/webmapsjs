"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extentUtil_1 = require("../olHelpers/extentUtil");
/**
 *
 * @param {ol.Map} map
 * @param {(imgData) => string} callback
 * @param {iMapToBase64Options} options
 * @returns {any}
 */
function mapToBase64(map, callback, options) {
    options = options || {};
    if (typeof options.delay === 'undefined' && (options.layers || options.resize)) {
        options.delay = 2000;
    }
    else {
        options.delay = 1;
    }
    var mapTarget = map.getTargetElement();
    var originalHeight = mapTarget.style.height;
    var originalWidth = mapTarget.style.width;
    var originalPosition = mapTarget.style.position;
    var originalCenter = map.getView().getCenter();
    var originalZoom = map.getView().getZoom();
    // let mapTimeout = 1;
    if (options.resize) {
        mapTarget.style.height = options.resize.height + "px";
        mapTarget.style.width = options.resize.width + "px";
        mapTarget.style.position = 'absolute';
        map.updateSize();
    }
    map.once('postrender', function () {
        if (options.layers) {
            extentUtil_1.fitToMap(options.layers, map);
        }
        setTimeout(function () {
            map.once('postcompose', function (event) {
                try {
                    var canvas = event['context'].canvas;
                    var imgData = canvas.toDataURL('image/png');
                    callback(imgData);
                }
                catch (ex) {
                    // reportParams['imgData'] = null;
                }
                finally {
                    if (options.resize) {
                        mapTarget.style.height = originalHeight;
                        mapTarget.style.width = originalWidth;
                        mapTarget.style.position = originalPosition;
                        map.updateSize();
                        map.getView().setCenter(originalCenter);
                        map.getView().setZoom(originalZoom);
                    }
                }
            });
            map.renderSync();
        }, options.delay);
    });
    map.updateSize();
}
exports.mapToBase64 = mapToBase64;
exports.default = mapToBase64;
//# sourceMappingURL=mapToBase64.js.map