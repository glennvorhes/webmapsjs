(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../util/provide', './zoomResolutionConvert'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../util/provide'), require('./zoomResolutionConvert'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.provide, global.zoomResolutionConvert);
        global.propertiesZoomStyle = mod.exports;
    }
})(this, function (module, exports, _provide, _zoomResolutionConvert) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _provide2 = _interopRequireDefault(_provide);

    var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Created by gavorhes on 12/14/2015.
     */

    var nm = (0, _provide2.default)('olHelpers');

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
    module.exports = exports['default'];
});