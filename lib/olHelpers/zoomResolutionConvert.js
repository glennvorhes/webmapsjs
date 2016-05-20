(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../util/provide'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../util/provide'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.provide);
        global.zoomResolutionConvert = mod.exports;
    }
})(this, function (exports, _provide) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.zoomToResolution = zoomToResolution;
    exports.resolutionToZoom = resolutionToZoom;

    var _provide2 = _interopRequireDefault(_provide);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var nm = (0, _provide2.default)('olHelpers.zoomResolutionConvert'); /**
                                                                         * Created by gavorhes on 12/14/2015.
                                                                         */

    var _zoomResLookup = [156543.03392804097, //0
    78271.51696402048, //1
    39135.75848201024, //2
    19567.87924100512, //3
    9783.93962050256, //4
    4891.96981025128, //5
    2445.98490512564, //6
    1222.99245256282, //7
    611.49622628141, //8
    305.748113140705, //9
    152.8740565703525, //10
    76.43702828517625, //11
    38.21851414258813, //12
    19.109257071294063, //13
    9.554628535647032, //14
    4.777314267823516, //15
    2.388657133911758, //16
    1.194328566955879, //17
    0.5971642834779395, //18
    0.29858214173896974, //19
    0.14929107086948487, //20
    0.07464553543474244, //21
    0.03732276771737122, //22
    0.01866138385868561, //23
    0.009330691929342804, //24
    0.004665345964671402, //25
    0.002332672982335701, //26
    0.0011663364911678506, //27
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
            } else {
                console.log('invalid zoom level provided: ' + zoomLevel);

                return undefined;
            }
        } else {
            return undefined;
        }
    }
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

    nm.resolutionToZoom = resolutionToZoom;
});