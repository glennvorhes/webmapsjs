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
function _axiosHelper(endpoint, callback, params, error, verb) {
    if (params === void 0) { params = {}; }
    if (error === void 0) { error = function () { }; }
    var f;
    var payload;
    switch (verb) {
        case 'get':
            f = axios_1.default.get;
            payload = { params: params };
            break;
        case 'post':
            f = axios_1.default.post;
            payload = params;
            break;
        case 'put':
            f = axios_1.default.put;
            payload = { params: params };
            break;
        case 'delete':
            f = axios_1.default.delete;
            payload = { params: params };
            break;
        default:
            throw 'axios verb not found';
    }
    f(endpoint, payload).then(function (response) {
        var data = getValue(response, ['data'], null);
        callback(data);
    }).catch(function (reason) {
        error(reason);
    });
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
    _axiosHelper(endpoint, callback, params, error, 'get');
};
/**
 *
 * @param {string} endpoint
 * @param {(d: Object) => any} callback
 * @param {Object} params
 * @param {(d: Object) => any} error
 * @returns {any}
 */
exports.post = function (endpoint, callback, params, error) {
    if (params === void 0) { params = {}; }
    if (error === void 0) { error = function () { }; }
    _axiosHelper(endpoint, callback, params, error, 'post');
};
/**
 *
 * @param {string} endpoint
 * @param {(d: Object) => any} callback
 * @param {Object} params
 * @param {(d: Object) => any} error
 * @returns {any}
 */
exports.delete_ = function (endpoint, callback, params, error) {
    if (params === void 0) { params = {}; }
    if (error === void 0) { error = function () { }; }
    _axiosHelper(endpoint, callback, params, error, 'delete');
};
/**
 *
 * @param {string} endpoint
 * @param {(d: Object) => any} callback
 * @param {Object} params
 * @param {(d: Object) => any} error
 * @returns {any}
 */
exports.put = function (endpoint, callback, params, error) {
    if (params === void 0) { params = {}; }
    if (error === void 0) { error = function () { }; }
    _axiosHelper(endpoint, callback, params, error, 'put');
};
//# sourceMappingURL=axios.js.map