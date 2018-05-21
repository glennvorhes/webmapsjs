/**
 * Created by glenn on 7/6/2017.
 */
import axios from 'axios';

// export const CancelToken = axios.CancelToken;

/**
 *
 * @param obj
 * @param keyArr
 * @param defaultVal
 * @returns
 */
function getValue(obj: { [s: string]: any }, keyArr: string[], defaultVal: any = null): any {
    let k = keyArr.splice(0, 1)[0];

    if (keyArr.length == 0) {
        return typeof obj[k] === 'undefined' ? defaultVal : obj[k];
    } else {
        if (typeof  obj[k] === 'undefined') {
            throw `key error: ${k} ${obj.toString()}`;
        } else {
            return getValue(obj[k], keyArr);
        }
    }
}

function _axiosHelper(endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d?: Object) => any = () => {}, verb: string): any {

    let f;

    switch (verb){
        case 'get':
            f = axios.get;
            break;
        case 'post':
            f = axios.post;
            break;
        case 'put':
            f = axios.put;
            break;
        case 'delete':
            f = axios.delete;
            break;
        default:
            throw 'axios verb not found';

    }

    f(endpoint, {params: params}).then((response: any) => {
        let data = getValue(response, ['data'], null);
        callback(data);
    }).catch((reason: any) => {
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
export const get = (endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d?: Object) => any = () => {}): any => {

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
export const post = (endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d?: Object) => any = () => {}): any => {

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
export const delete_ = (endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d?: Object) => any = () => {}): any => {

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
export const put = (endpoint: string,
                          callback: (d: Object) => any,
                          params: Object = {},
                          error: (d?: Object) => any = () => {}): any => {

    _axiosHelper(endpoint, callback, params, error, 'put');

};
