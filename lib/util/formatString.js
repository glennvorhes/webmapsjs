(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.formatString = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Created by gavorhes on 10/30/2015.
     */

    if (!String.prototype.format) {
        /**
         *  helper function for string replacement to keep code clean
         * usage
         * var aString = 'some{0}stuff{1}replaced';
         * var c = 'cat';
         * var b = 'bird';
         * aString.format(c, b)  returns 'somecatstuffbirdreplaced'
         * prettier than
         * 'some' + c + 'stuff' + b + 'replaced'
         * but same effect
         * adapted to take a single array that is used for replacement by position ie
         * var arrReplacements = [c, b];
         * aString.format(arrReplacements)
         * @returns {string} converted string
         */
        String.prototype.format = function () {
            var args = arguments;
            for (var i = 0; i < args.length; i++) {
                args[i] = args[i] !== null ? args[i] : '';
            }

            //if the first argument is an array, use that
            if (args[0].constructor == Array) {
                args = args[0];
            }

            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }

    exports.default = undefined;
    module.exports = exports['default'];
});