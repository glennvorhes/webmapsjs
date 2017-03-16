/**
 * Created by gavorhes on 6/7/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("./provide");
var nm = provide_1.default('util');
/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
function keyValPairs(obj) {
    var outArray = [];
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        outArray.push({ 'key': key, 'value': obj[key] });
    }
    outArray.sort(function (a, b) {
        "use strict";
        return a > b ? 1 : -1;
    });
    return outArray;
}
exports.keyValPairs = keyValPairs;
nm.keyValPairs = keyValPairs;
//# sourceMappingURL=objectHelpers.js.map