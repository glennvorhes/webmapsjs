/**
 * Created by gavorhes on 12/14/2015.
 */
"use strict";
var provide_1 = require('../util/provide.d');
var nm = provide_1.default('olHelpers.zoomResolutionConvert');
var _zoomResLookup = [
    156543.03392804097,
    78271.51696402048,
    39135.75848201024,
    19567.87924100512,
    9783.93962050256,
    4891.96981025128,
    2445.98490512564,
    1222.99245256282,
    611.49622628141,
    305.748113140705,
    152.8740565703525,
    76.43702828517625,
    38.21851414258813,
    19.109257071294063,
    9.554628535647032,
    4.777314267823516,
    2.388657133911758,
    1.194328566955879,
    0.5971642834779395,
    0.29858214173896974,
    0.14929107086948487,
    0.07464553543474244,
    0.03732276771737122,
    0.01866138385868561,
    0.009330691929342804,
    0.004665345964671402,
    0.002332672982335701,
    0.0011663364911678506,
    0.0005831682455839253 //28
];
/**
 * Get the resolution given the zoom level
 * @param {number} zoomLevel - the zoom level
 * @returns {number|*} the map resolution
 */
function zoomToResolution(zoomLevel) {
    "use strict";
    if (typeof zoomLevel == 'number') {
        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
            return _zoomResLookup[zoomLevel];
        }
        else {
            console.log("invalid zoom level provided: " + zoomLevel);
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.zoomToResolution = zoomToResolution;
nm.zoomToResolution = zoomToResolution;
/**
 * Get resolution from the zoom level
 * @param {number} resolution - the resolution
 * @returns {number|*} the zoom level
 */
function resolutionToZoom(resolution) {
    for (var i = 0; i < _zoomResLookup.length; i++) {
        if (resolution >= _zoomResLookup[i]) {
            return i;
        }
    }
    return 0;
}
exports.resolutionToZoom = resolutionToZoom;
nm.resolutionToZoom = resolutionToZoom;
//# sourceMappingURL=zoomResolutionConvert.js.map