'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by gavorhes on 12/10/2015.
 */

/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";

    if (typeof window.gv == 'undefined') {
        window.gv = {};
    }

    var parts = namespace.split('.');
    var nameSpace = window.gv;

    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];

        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }

        nameSpace = nameSpace[parts[i]];
    }

    return nameSpace;
}

provide('util');
window.gv.util.provide = provide;

exports.default = provide;
module.exports = exports['default'];