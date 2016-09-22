"use strict";
var provide_1 = require('./provide.d');
var nm = provide_1.default('util.checkDefined');
/**
 * check if the input is undefined or null
 * @param input - input pointer
 * @returns true undefined or null
 */
function undefinedOrNull(input) {
    "use strict";
    return (typeof input === 'undefined' || input === null);
}
exports.undefinedOrNull = undefinedOrNull;
nm.undefinedOrNull = undefinedOrNull;
/**
 * check if the input is defined and not null
 * @param input - input pointer
 * @returns true defined and not null
 */
function definedAndNotNull(input) {
    "use strict";
    return !(undefinedOrNull(input));
}
exports.definedAndNotNull = definedAndNotNull;
nm.definedAndNotNull = definedAndNotNull;
//# sourceMappingURL=checkDefined.js.map