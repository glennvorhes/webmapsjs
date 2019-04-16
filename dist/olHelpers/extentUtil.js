"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/18/2016.
 */
var provide_1 = require("../util/provide");
var nm = provide_1.default('util');
function calculateExtent(layers) {
    "use strict";
    var hasExtent = false;
    var minX = 10E100;
    var minY = 10E100;
    var maxX = -10E100;
    var maxY = -10E100;
    for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
        var lyr = layers_1[_i];
        var olLayer = lyr.olLayer || lyr;
        if (olLayer.getSource().getFeatures().length > 0) {
            hasExtent = true;
            var ext = olLayer.getSource().getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }
    }
    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    }
    else {
        return undefined;
    }
}
exports.calculateExtent = calculateExtent;
nm.calculateExtent = calculateExtent;
/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
function fitToMap(layers, mp, zoomOut) {
    "use strict";
    var ext = calculateExtent(layers);
    if (typeof ext == 'undefined') {
        return;
    }
    mp.getView().fit(ext, { size: mp.getSize() });
    if (typeof zoomOut == 'number') {
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}
exports.fitToMap = fitToMap;
nm.calculateExtent = calculateExtent;
//# sourceMappingURL=extentUtil.js.map