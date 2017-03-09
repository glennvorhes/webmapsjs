"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 6/23/2016.
 */
var provide_1 = require("./provide");
var nm = provide_1.default('util');
function isNumber(checkVal) {
    var returnVal = parseFloat(checkVal);
    return !isNaN(returnVal);
}
/**
 *
 * @returns {object} object representation of url params
 */
function getUrlParams() {
    "use strict";
    var match;
    var pl = /\+/g; // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
    };
    var query = window.location.search.substring(1);
    var urlParams = {};
    while (match = search.exec(query)) {
        /**
         * @type {string}
         */
        var val = decode(match[2]).trim();
        var typedVal = null;
        if (val.length == 0) {
            // pass
        }
        else if (isNumber(val)) {
            if (val.indexOf('.') > -1) {
                typedVal = parseFloat(val);
            }
            else {
                typedVal = parseInt(val);
            }
        }
        else if (val.toLowerCase() == 'false' || val.toLowerCase() == 'true') {
            typedVal = val.toLowerCase() == 'true';
        }
        else {
            typedVal = val;
        }
        urlParams[decode(match[1])] = typedVal;
    }
    return urlParams;
}
exports.default = getUrlParams;
nm.getUrlParams = getUrlParams;
//# sourceMappingURL=getUrlParams.js.map