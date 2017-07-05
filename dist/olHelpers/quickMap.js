/**
 * Created by gavorhes on 12/15/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    if (options === void 0) { options = {}; }
    var m = quickMapBase_1.quickMapBase(options);
    mapMove_1.default.init(m);
    mapPopup_1.default.init(m);
    return m;
}
exports.quickMap = quickMap;
nm.quickMap = quickMap;
exports.default = quickMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2xIZWxwZXJzL3F1aWNrTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7QUFFSCwrQ0FBNkQ7QUFDN0QsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUNoQyx1Q0FBa0M7QUFFbEMsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxrQkFBeUIsT0FBOEI7SUFBOUIsd0JBQUEsRUFBQSxZQUE4QjtJQUNuRCxJQUFJLENBQUMsR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBTEQsNEJBS0M7QUFHRCxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN2QixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi8xNS8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7cXVpY2tNYXBPcHRpb25zLCBxdWlja01hcEJhc2V9IGZyb20gJy4vcXVpY2tNYXBCYXNlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG1hcE1vdmUgZnJvbSAnLi9tYXBNb3ZlJztcclxuaW1wb3J0IG1hcFBvcHVwIGZyb20gJy4vbWFwUG9wdXAnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxubGV0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzJyk7XHJcblxyXG4vKipcclxuICogU2V0cyB1cCBhIG1hcCB3aXRoIHNvbWUgZGVmYXVsdCBwYXJhbWV0ZXJzIGFuZCBpbml0aWFsaXplc1xyXG4gKiBtYXBNb3ZlIGFuZCBtYXBQb3B1cFxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIGNvbmZpZyBvcHRpb25zXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5kaXZJZD1tYXBdIG1hcCBkaXYgaWRcclxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLmNlbnRlcj17fV0gY2VudGVyIGNvbmZpZyBvYmplY3RcclxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmNlbnRlci54PS0xMDAxODM3OF0gY2VudGVyIHgsIHdlYiBtZXJjYXRvciB4IG9yIGxvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuY2VudGVyLnk9NTU3NDkxMF0gY2VudGVyIHksIHdlYiBtZXJjYXRvciB5IG9yIGxhdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuem9vbT03XSB6b29tIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gbWluIHpvb21cclxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFpvb209dW5kZWZpbmVkXSBtYXggem9vbVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmJhc2VTd2l0Y2hlcj10cnVlXSBpZiBhZGQgYmFzZSBtYXAgc3dpdGNoZXJcclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mdWxsU2NyZWVuPWZhbHNlXSBpZiBhZGQgYmFzZSBtYXAgc3dpdGNoZXJcclxuICogQHJldHVybnMge29sLk1hcH0gdGhlIG9sIG1hcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHF1aWNrTWFwKG9wdGlvbnMgOiBxdWlja01hcE9wdGlvbnMgPSB7fSk6IG9sLk1hcCB7XHJcbiAgICBsZXQgbSA9IHF1aWNrTWFwQmFzZShvcHRpb25zKTtcclxuICAgIG1hcE1vdmUuaW5pdChtKTtcclxuICAgIG1hcFBvcHVwLmluaXQobSk7XHJcbiAgICByZXR1cm4gbTtcclxufVxyXG5cclxuXHJcbm5tLnF1aWNrTWFwID0gcXVpY2tNYXA7XHJcbmV4cG9ydCBkZWZhdWx0IHF1aWNrTWFwO1xyXG4iXX0=