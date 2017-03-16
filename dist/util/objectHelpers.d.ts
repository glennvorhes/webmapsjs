export interface keyVals {
    key: string;
    value: Object;
}
/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
 */
export declare function keyValPairs(obj: any): Array<keyVals>;
