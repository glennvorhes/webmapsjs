import provide from './provide';
let nm = provide('util.checkDefined');

/**
 * check if the input is undefined or null
 * @param input - input pointer
 * @returns true undefined or null
 */
export function undefinedOrNull (input): boolean{
    "use strict";

    return (typeof input === 'undefined' || input === null);
}

nm.undefinedOrNull = undefinedOrNull;


/**
 * check if the input is defined and not null
 * @param input - input pointer
 * @returns true defined and not null
 */
export function definedAndNotNull (input: any): boolean{
    "use strict";

    return !(undefinedOrNull(input));
}

nm.definedAndNotNull = definedAndNotNull;

