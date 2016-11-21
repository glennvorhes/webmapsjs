/**
 * @typedef {object} keyValuePair
 * @property {string} key
 * @property {object} value
 */
export interface keyVals {
    key: string;
    value: Object;
}
/**
 * iterate over the key value pairs of an object
 * @param {object} obj - the input object
 * @returns {Array<keyValuePair>} - array of key value pairs
 */
export declare function keyValPairs(obj: any): keyVals[];
