'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util');

/**
 *
 * @returns {object} object representation of url params
 */
/**
 * Created by gavorhes on 6/23/2016.
 */
function getUrlParams() {
    "use strict";

    var match = void 0;
    var pl = /\+/g; // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function decode(s) {
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
        } else if (!isNaN(val)) {
                if (val.indexOf('.') > -1) {
                    typedVal = parseFloat(val);
                } else {
                    typedVal = parseInt(val);
                }
            } else if (val.toLowerCase() == 'false' || val.toLowerCase() == 'true') {
                typedVal = val.toLowerCase() == 'true';
            } else {
                typedVal = val;
            }
        urlParams[decode(match[1])] = typedVal;
    }

    return urlParams;
}

nm.getUrlParams = getUrlParams;

exports.default = getUrlParams;
module.exports = exports['default'];