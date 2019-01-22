"use strict";
/**
 * Created by glenn on 6/13/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function stringToDate(dateStr) {
    var parts = dateStr.split('/');
    var mn = parseInt(parts[0]) - 1;
    var d = parseInt(parts[1]);
    var y = parseInt(parts[2]);
    var dte = new Date(y, mn, d);
    dte.setHours(0, 0, 0);
    return dte;
}
exports.stringToDate = stringToDate;
function dateToString(dte, zeroPad) {
    if (zeroPad === void 0) { zeroPad = true; }
    var mn = (dte.getMonth() + 1).toString();
    var d = dte.getDate().toString();
    if (zeroPad) {
        mn = mn.length == 1 ? '0' + mn : mn;
        d = d.length == 1 ? '0' + d : d;
    }
    return mn + "/" + d + "/" + dte.getFullYear();
}
exports.dateToString = dateToString;
//# sourceMappingURL=dateFormat.js.map