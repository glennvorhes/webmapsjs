/**
 * Created by gavorhes on 6/7/2016.
 */

import provide from './provide';
let nm = provide('util');

/**
 * @typedef {object} keyValuePair
 * @property {string} key
 * @property {object} value
 */

export interface keyVals {
    key: string;
    value: Object
}


/**
 * iterate over the key value pairs of an object
 * @param {object} obj - the input object
 * @returns {Array<keyValuePair>} - array of key value pairs
 */
export function keyValPairs(obj): keyVals[] {
    let outArray = [];
    for (let key of Object.keys(obj)) {
        outArray.push({'key': key, 'value': obj[key]});

    }
    outArray.sort(function (a, b) {
        "use strict";

        return a > b ? 1 : -1;
    });

    return outArray;
}

nm.keyValPairs = keyValPairs;
