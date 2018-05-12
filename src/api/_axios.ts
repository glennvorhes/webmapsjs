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
    axios.get(endpoint, {params: params}).then((response: any) => {

        let data = getValue(response, ['data'], null);
        callback(data);
    }).catch((reason: any) => {
        error(reason);
    });
};
