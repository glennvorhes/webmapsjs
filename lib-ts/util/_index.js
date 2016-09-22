/**
 * Created by gavorhes on 9/22/2016.
 */
"use strict";
var checkDefinedf = require('./checkDefined');
var checkDefined;
(function (checkDefined) {
    checkDefined.undefinedOrNull = checkDefinedf.undefinedOrNull;
    checkDefined.definedAndNotNull = checkDefinedf.definedAndNotNull;
})(checkDefined = exports.checkDefined || (exports.checkDefined = {}));
//# sourceMappingURL=_index.js.map