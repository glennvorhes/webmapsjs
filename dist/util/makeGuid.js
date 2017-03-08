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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZUd1aWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9tYWtlR3VpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCxxQ0FBZ0M7QUFDaEMsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUd6Qjs7O0dBR0c7QUFDSDtJQUNRLE1BQU0sQ0FBQyxzQ0FBc0M7U0FDeEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWpFLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBRWYsQ0FBQztBQUNELEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUN2QixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8zLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi9wcm92aWRlJztcclxubGV0IG5tID0gcHJvdmlkZSgndXRpbCcpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBndWlkcyBhcmUgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBncm91cHMgYW5kIGZlYXR1cmVzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgbmV3IGd1aWRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VHdWlkKCkge1xyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4J1xyXG4gICAgICAgICAgICAucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogciAmIDB4MyB8IDB4ODtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxufVxyXG5ubS5tYWtlR3VpZCA9IG1ha2VHdWlkO1xyXG5leHBvcnQgZGVmYXVsdCBtYWtlR3VpZDtcclxuXHJcblxyXG4iXX0=