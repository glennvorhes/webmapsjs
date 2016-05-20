(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './provide'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./provide'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.provide);
        global.checkDefined = mod.exports;
    }
})(this, function (exports, _provide) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.undefinedOrNull = undefinedOrNull;
    exports.definedAndNotNull = definedAndNotNull;

    var _provide2 = _interopRequireDefault(_provide);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var nm = (0, _provide2.default)('util.checkDefined');

    /**
     * check if the input is undefined or null
     * @param {*} input - input pointer
     * @returns {boolean} true undefined or null
     */
    /**
     * Created by gavorhes on 12/11/2015.
     */
    function undefinedOrNull(input) {
        "use strict";

        return typeof input === 'undefined' || input === null;
    }

    nm.undefinedOrNull = undefinedOrNull;

    /**
     * check if the input is defined and not null
     * @param {*} input - input pointer
     * @returns {boolean} true defined and not null
     */
    function definedAndNotNull(input) {
        "use strict";

        return !undefinedOrNull(input);
    }

    nm.definedAndNotNull = definedAndNotNull;
});