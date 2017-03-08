/**
 * Created by gavorhes on 6/7/2016.
 */
"use strict";
var provide_1 = require("./provide");
var nm = provide_1.default('util');
/**
 * iterate over the key value pairs of an object
 * @param {object} obj - the input object
 * @returns {Array<keyValuePair>} - array of key value pairs
 */
function keyValPairs(obj) {
    var outArray = [];
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        outArray.push({ 'key': key, 'value': obj[key] });
    }
    outArray.sort(function (a, b) {
        "use strict";
        return a > b ? 1 : -1;
    });
    return outArray;
}
exports.keyValPairs = keyValPairs;
nm.keyValPairs = keyValPairs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0SGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL29iamVjdEhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgscUNBQWdDO0FBQ2hDLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFjekI7Ozs7R0FJRztBQUNILHFCQUE0QixHQUFHO0lBQzNCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNsQixHQUFHLENBQUMsQ0FBWSxVQUFnQixFQUFoQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO1FBQTNCLElBQUksR0FBRyxTQUFBO1FBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7S0FFbEQ7SUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsWUFBWSxDQUFDO1FBRWIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBYkQsa0NBYUM7QUFFRCxFQUFFLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDYvNy8yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4vcHJvdmlkZSc7XHJcbmxldCBubSA9IHByb3ZpZGUoJ3V0aWwnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBrZXlWYWx1ZVBhaXJcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleVxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdmFsdWVcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGtleVZhbHMge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogT2JqZWN0XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogaXRlcmF0ZSBvdmVyIHRoZSBrZXkgdmFsdWUgcGFpcnMgb2YgYW4gb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSB0aGUgaW5wdXQgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtBcnJheTxrZXlWYWx1ZVBhaXI+fSAtIGFycmF5IG9mIGtleSB2YWx1ZSBwYWlyc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGtleVZhbFBhaXJzKG9iaik6IGtleVZhbHNbXSB7XHJcbiAgICBsZXQgb3V0QXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XHJcbiAgICAgICAgb3V0QXJyYXkucHVzaCh7J2tleSc6IGtleSwgJ3ZhbHVlJzogb2JqW2tleV19KTtcclxuXHJcbiAgICB9XHJcbiAgICBvdXRBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIHJldHVybiBhID4gYiA/IDEgOiAtMTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvdXRBcnJheTtcclxufVxyXG5cclxubm0ua2V5VmFsUGFpcnMgPSBrZXlWYWxQYWlycztcclxuIl19