/**
 * Created by gavorhes on 6/7/2016.
 */

import provide from './provide';
let nm = provide('util');


export interface keyVals {
    key: string;
    value: Object
}




/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
export function keyValPairs(obj: {[s: string]: any}): Array<keyVals> {
    let outArray: Array<keyVals> = [];
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
