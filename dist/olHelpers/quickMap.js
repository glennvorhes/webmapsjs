/**
 * Created by gavorhes on 12/15/2015.
 */
"use strict";
var quickMapBase_1 = require("./quickMapBase");
var provide_1 = require("../util/provide");
var mapMove_1 = require("./mapMove");
var mapPopup_1 = require("./mapPopup");
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param {object} [options={}] config options
 * @param {string} [options.divId=map] map div id
 * @param {object} [options.center={}] center config object
 * @param {number} [options.center.x=-10018378] center x, web mercator x or lon
 * @param {number} [options.center.y=5574910] center y, web mercator y or lat
 * @param {number} [options.zoom=7] zoom level
 * @param {number} [options.minZoom=undefined] min zoom
 * @param {number} [options.maxZoom=undefined] max zoom
 * @param {boolean} [options.baseSwitcher=true] if add base map switcher
 * @param {boolean} [options.fullScreen=false] if add base map switcher
 * @returns {ol.Map} the ol map
 */
function quickMap(options) {
    var m = quickMapBase_1.quickMapBase(options);
    mapMove_1.default.init(m);
    mapPopup_1.default.init(m);
    return m;
}
exports.quickMap = quickMap;
nm.quickMap = quickMap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quickMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2xIZWxwZXJzL3F1aWNrTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOztBQUVILCtDQUE2RDtBQUM3RCwyQ0FBc0M7QUFDdEMscUNBQWdDO0FBQ2hDLHVDQUFrQztBQUVsQyxJQUFJLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILGtCQUF5QixPQUEwQjtJQUMvQyxJQUFJLENBQUMsR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpCLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBTkQsNEJBTUM7QUFHRCxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7QUFDdkIsa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTUvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQge3F1aWNrTWFwT3B0aW9ucywgcXVpY2tNYXBCYXNlfSBmcm9tICcuL3F1aWNrTWFwQmFzZSc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBtYXBNb3ZlIGZyb20gJy4vbWFwTW92ZSc7XHJcbmltcG9ydCBtYXBQb3B1cCBmcm9tICcuL21hcFBvcHVwJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmxldCBubSA9IHByb3ZpZGUoJ29sSGVscGVycycpO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdXAgYSBtYXAgd2l0aCBzb21lIGRlZmF1bHQgcGFyYW1ldGVycyBhbmQgaW5pdGlhbGl6ZXNcclxuICogbWFwTW92ZSBhbmQgbWFwUG9wdXBcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zPXt9XSBjb25maWcgb3B0aW9uc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZGl2SWQ9bWFwXSBtYXAgZGl2IGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5jZW50ZXI9e31dIGNlbnRlciBjb25maWcgb2JqZWN0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5jZW50ZXIueD0tMTAwMTgzNzhdIGNlbnRlciB4LCB3ZWIgbWVyY2F0b3IgeCBvciBsb25cclxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmNlbnRlci55PTU1NzQ5MTBdIGNlbnRlciB5LCB3ZWIgbWVyY2F0b3IgeSBvciBsYXRcclxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpvb209N10gem9vbSBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIG1pbiB6b29tXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gbWF4IHpvb21cclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5iYXNlU3dpdGNoZXI9dHJ1ZV0gaWYgYWRkIGJhc2UgbWFwIHN3aXRjaGVyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZnVsbFNjcmVlbj1mYWxzZV0gaWYgYWRkIGJhc2UgbWFwIHN3aXRjaGVyXHJcbiAqIEByZXR1cm5zIHtvbC5NYXB9IHRoZSBvbCBtYXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWlja01hcChvcHRpb25zPyA6IHF1aWNrTWFwT3B0aW9ucyk6IG9sLk1hcCB7XHJcbiAgICBsZXQgbSA9IHF1aWNrTWFwQmFzZShvcHRpb25zKTtcclxuICAgIG1hcE1vdmUuaW5pdChtKTtcclxuICAgIG1hcFBvcHVwLmluaXQobSk7XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbn1cclxuXHJcblxyXG5ubS5xdWlja01hcCA9IHF1aWNrTWFwO1xyXG5leHBvcnQgZGVmYXVsdCBxdWlja01hcDtcclxuIl19