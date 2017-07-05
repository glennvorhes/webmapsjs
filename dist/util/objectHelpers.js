/**
 * Created by gavorhes on 6/7/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("./provide");
var nm = provide_1.default('util');
/**
 * iterate over the key value pairs of an object
 * @example for (let x:KeyValuePair of keyValPairs(object)){..}
 * @param {object} obj - the input object
 * @returns {Array<keyVals>} - array of key value pairs
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0SGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL29iamVjdEhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILHFDQUFnQztBQUNoQyxJQUFJLEVBQUUsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBV3pCOzs7OztHQUtHO0FBQ0gscUJBQTRCLEdBQUc7SUFDM0IsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztJQUNsQyxHQUFHLENBQUMsQ0FBWSxVQUFnQixFQUFoQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO1FBQTNCLElBQUksR0FBRyxTQUFBO1FBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7S0FFbEQ7SUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsWUFBWSxDQUFDO1FBRWIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBYkQsa0NBYUM7QUFFRCxFQUFFLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDYvNy8yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4vcHJvdmlkZSc7XHJcbmxldCBubSA9IHByb3ZpZGUoJ3V0aWwnKTtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGtleVZhbHMge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogT2JqZWN0XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBpdGVyYXRlIG92ZXIgdGhlIGtleSB2YWx1ZSBwYWlycyBvZiBhbiBvYmplY3RcclxuICogQGV4YW1wbGUgZm9yIChsZXQgeDpLZXlWYWx1ZVBhaXIgb2Yga2V5VmFsUGFpcnMob2JqZWN0KSl7Li59XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSB0aGUgaW5wdXQgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtBcnJheTxrZXlWYWxzPn0gLSBhcnJheSBvZiBrZXkgdmFsdWUgcGFpcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBrZXlWYWxQYWlycyhvYmopOiBBcnJheTxrZXlWYWxzPiB7XHJcbiAgICBsZXQgb3V0QXJyYXk6IEFycmF5PGtleVZhbHM+ID0gW107XHJcbiAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xyXG4gICAgICAgIG91dEFycmF5LnB1c2goeydrZXknOiBrZXksICd2YWx1ZSc6IG9ialtrZXldfSk7XHJcblxyXG4gICAgfVxyXG4gICAgb3V0QXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYSA+IGIgPyAxIDogLTE7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0QXJyYXk7XHJcbn1cclxuXHJcbm5tLmtleVZhbFBhaXJzID0ga2V5VmFsUGFpcnM7XHJcbiJdfQ==