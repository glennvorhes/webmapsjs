'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keyValPairs = keyValPairs;

var _provide = require('./provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util');

/**
 * @typedef {object} keyValuePair
 * @property {string} key
 * @property {object} value
 */

/**
 * iterate over the key value pairs of an object
 * @param {object} obj - the input object
 * @returns {Array<keyValuePair>} - array of key value pairs
 */
/**
 * Created by gavorhes on 6/7/2016.
 */

function keyValPairs(obj) {
    var outArray = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            outArray.push({ 'key': key, 'value': obj[key] });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    outArray.sort(function (a, b) {
        "use strict";

        return a > b ? 1 : -1;
    });

    return outArray;
}

nm.keyValPairs = keyValPairs;