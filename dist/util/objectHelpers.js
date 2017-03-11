/**
 * Created by gavorhes on 6/7/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0SGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL29iamVjdEhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILHFDQUFnQztBQUNoQyxJQUFJLEVBQUUsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBY3pCOzs7O0dBSUc7QUFDSCxxQkFBNEIsR0FBRztJQUMzQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsR0FBRyxDQUFDLENBQVksVUFBZ0IsRUFBaEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFoQixjQUFnQixFQUFoQixJQUFnQjtRQUEzQixJQUFJLEdBQUcsU0FBQTtRQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0tBRWxEO0lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3hCLFlBQVksQ0FBQztRQUViLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQWJELGtDQWFDO0FBRUQsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiA2LzcvMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuL3Byb3ZpZGUnO1xyXG5sZXQgbm0gPSBwcm92aWRlKCd1dGlsJyk7XHJcblxyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0ga2V5VmFsdWVQYWlyXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBrZXlcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHZhbHVlXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBrZXlWYWxzIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdmFsdWU6IE9iamVjdFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGl0ZXJhdGUgb3ZlciB0aGUga2V5IHZhbHVlIHBhaXJzIG9mIGFuIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gdGhlIGlucHV0IG9iamVjdFxyXG4gKiBAcmV0dXJucyB7QXJyYXk8a2V5VmFsdWVQYWlyPn0gLSBhcnJheSBvZiBrZXkgdmFsdWUgcGFpcnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBrZXlWYWxQYWlycyhvYmopOiBrZXlWYWxzW10ge1xyXG4gICAgbGV0IG91dEFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xyXG4gICAgICAgIG91dEFycmF5LnB1c2goeydrZXknOiBrZXksICd2YWx1ZSc6IG9ialtrZXldfSk7XHJcblxyXG4gICAgfVxyXG4gICAgb3V0QXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICByZXR1cm4gYSA+IGIgPyAxIDogLTE7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0QXJyYXk7XHJcbn1cclxuXHJcbm5tLmtleVZhbFBhaXJzID0ga2V5VmFsUGFpcnM7XHJcbiJdfQ==