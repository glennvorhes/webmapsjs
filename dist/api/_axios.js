"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by glenn on 7/6/2017.
 */
var axios_1 = require("axios");
// export const CancelToken = axios.CancelToken;
/**
 *
 * @param obj
 * @param keyArr
 * @param defaultVal
 * @returns
 */
function getValue(obj, keyArr, defaultVal) {
    if (defaultVal === void 0) { defaultVal = null; }
    var k = keyArr.splice(0, 1)[0];
    if (keyArr.length == 0) {
        return typeof obj[k] === 'undefined' ? defaultVal : obj[k];
    }
    else {
        if (typeof obj[k] === 'undefined') {
            throw "key error: " + k + " " + obj.toString();
        }
        else {
            return getValue(obj[k], keyArr);
        }
    }
}
/**
 *
 * @param {string} endpoint
 * @param {(d: Object) => any} callback
 * @param {Object} params
 * @param {(d: Object) => any} error
 * @returns {any}
 */
exports.get = function (endpoint, callback, params, error) {
    if (params === void 0) { params = {}; }
    if (error === void 0) { error = function () { }; }
    axios_1.default.get(endpoint, { params: params }).then(function (response) {
        var data = getValue(response, ['data'], null);
        callback(data);
    }).catch(function (reason) {
        error(reason);
    });
};
//# sourceMappingURL=_axios.js.map