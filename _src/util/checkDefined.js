/**
 * Created by gavorhes on 12/11/2015.
 */
import provide from './provide';
let nm = provide('util.checkDefined');

/**
 * check if the input is undefined or null
 * @param {*} input - input pointer
 * @returns {boolean} true undefined or null
 */
export function undefinedOrNull (input){
    "use strict";

    return (typeof input === 'undefined' || input === null);
}

nm.undefinedOrNull = undefinedOrNull;


/**
 * check if the input is defined and not null
 * @param {*} input - input pointer
 * @returns {boolean} true defined and not null
 */
export function definedAndNotNull (input){
    "use strict";

    return !(undefinedOrNull(input));
}

nm.definedAndNotNull = definedAndNotNull;
