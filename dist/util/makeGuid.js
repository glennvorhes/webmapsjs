/**
 * Created by gavorhes on 11/3/2015.
 */
"use strict";
var provide_1 = require("./provide");
var nm = provide_1.default('util');
/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
function makeGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
nm.makeGuid = makeGuid;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = makeGuid;
//# sourceMappingURL=makeGuid.js.map