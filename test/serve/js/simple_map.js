/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/10/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace) {
    "use strict";
    if (typeof window['gv'] == 'undefined') {
        window['gv'] = {};
    }
    var parts = namespace.split('.');
    var nameSpace = window['gv'];
    for (var i = 0; i < parts.length; i++) {
        var newObject = nameSpace[parts[i]];
        if (typeof newObject == 'undefined') {
            nameSpace[parts[i]] = {};
        }
        nameSpace = nameSpace[parts[i]];
    }
    return nameSpace;
}
provide('util');
window['gv'].util.provide = provide;
exports.default = provide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb3ZpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUdIOzs7O0dBSUc7QUFDSCxpQkFBaUIsU0FBUztJQUN0QixZQUFZLENBQUM7SUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFFcEMsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTAvMjAxNS5cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBhIG5hbWVzcGFjZSBvbiB0aGUgZ3Ygb2JqZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgdG8gY3JlYXRlXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5hbWVzcGFjZVxyXG4gKi9cclxuZnVuY3Rpb24gcHJvdmlkZShuYW1lc3BhY2Upe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvd1snZ3YnXSA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgd2luZG93WydndiddID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhcnRzID0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgbmFtZVNwYWNlID0gd2luZG93WydndiddO1xyXG5cclxuICAgIGZvciAobGV0IGk9MDsgaTwgcGFydHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGxldCBuZXdPYmplY3QgPSBuYW1lU3BhY2VbcGFydHNbaV1dO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG5ld09iamVjdCA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIG5hbWVTcGFjZVtwYXJ0c1tpXV0gPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVTcGFjZSA9IG5hbWVTcGFjZVtwYXJ0c1tpXV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5hbWVTcGFjZTtcclxufVxyXG5cclxucHJvdmlkZSgndXRpbCcpO1xyXG53aW5kb3dbJ2d2J10udXRpbC5wcm92aWRlID0gcHJvdmlkZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb3ZpZGU7XHJcbiJdfQ==

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ol;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
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
exports.default = makeGuid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZUd1aWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWtlR3VpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgscUNBQWdDO0FBQ2hDLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHekI7OztHQUdHO0FBQ0g7SUFDUSxNQUFNLENBQUMsc0NBQXNDO1NBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUVqRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUVmLENBQUM7QUFDRCxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN2QixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8zLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi9wcm92aWRlJztcclxubGV0IG5tID0gcHJvdmlkZSgndXRpbCcpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBndWlkcyBhcmUgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBncm91cHMgYW5kIGZlYXR1cmVzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGEgbmV3IGd1aWRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VHdWlkKCkge1xyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4J1xyXG4gICAgICAgICAgICAucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogciAmIDB4MyB8IDB4ODtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxufVxyXG5ubS5tYWtlR3VpZCA9IG1ha2VHdWlkO1xyXG5leHBvcnQgZGVmYXVsdCBtYWtlR3VpZDtcclxuXHJcblxyXG4iXX0=

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapPopupCls_1 = __webpack_require__(12);
/**
 * The single popup object catch is that it is common to multimap pages
 * @type {MapPopupCls}
 */
exports.mapPopup = new mapPopupCls_1.default();
exports.default = exports.mapPopup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwUG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBQb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgsNkNBQXdDO0FBRXhDOzs7R0FHRztBQUNVLFFBQUEsUUFBUSxHQUFHLElBQUkscUJBQVcsRUFBaUIsQ0FBQztBQUN6RCxrQkFBZSxnQkFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMy8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBNYXBQb3B1cENscyBmcm9tICcuL21hcFBvcHVwQ2xzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgc2luZ2xlIHBvcHVwIG9iamVjdCBjYXRjaCBpcyB0aGF0IGl0IGlzIGNvbW1vbiB0byBtdWx0aW1hcCBwYWdlc1xyXG4gKiBAdHlwZSB7TWFwUG9wdXBDbHN9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWFwUG9wdXAgPSBuZXcgTWFwUG9wdXBDbHMoKSBhcyBNYXBQb3B1cENscztcclxuZXhwb3J0IGRlZmF1bHQgbWFwUG9wdXA7XHJcbiJdfQ==

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/8/2015.
 */
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers');
/**
 * base interaction
 */
var MapInteractionBase = (function () {
    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    function MapInteractionBase(subtype) {
        this._map = null;
        this._initialized = false;
        this._subtype = subtype;
    }
    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    MapInteractionBase.prototype.init = function (theMap) {
        if (!this._initialized) {
            this._map = theMap;
            this._initialized = true;
        }
    };
    Object.defineProperty(MapInteractionBase.prototype, "map", {
        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInteractionBase.prototype, "initialized", {
        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    MapInteractionBase.prototype._checkInit = function () {
        if (!this.initialized) {
            var msg = this._subtype + " object not initialized";
            alert(msg);
            console.log(msg);
            throw msg;
        }
    };
    /**
     * Check the initialization status and throw exception if not valid yet
     */
    MapInteractionBase.prototype.checkInit = function () {
        this._checkInit();
    };
    return MapInteractionBase;
}());
exports.MapInteractionBase = MapInteractionBase;
nm.MapInteractionBase = MapInteractionBase;
exports.default = MapInteractionBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwSW50ZXJhY3Rpb25CYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwSW50ZXJhY3Rpb25CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCwyQ0FBc0M7QUFFdEMsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUloQzs7R0FFRztBQUNIO0lBS0k7OztPQUdHO0lBQ0gsNEJBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlDQUFJLEdBQUosVUFBSyxNQUFjO1FBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQU1ELHNCQUFJLG1DQUFHO1FBSlA7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLDJDQUFXO1FBSmY7OztXQUdHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNILHVDQUFVLEdBQVY7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxHQUFNLElBQUksQ0FBQyxRQUFRLDRCQUF5QixDQUFDO1lBQ3BELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBOURELElBOERDO0FBOURZLGdEQUFrQjtBQWdFL0IsRUFBRSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzNDLGtCQUFlLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvOC8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzJyk7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBiYXNlIGludGVyYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwSW50ZXJhY3Rpb25CYXNlIHtcclxuICAgIF9tYXA6IG9sLk1hcDtcclxuICAgIF9pbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgIF9zdWJ0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXAgaW50ZXJhY3Rpb24gYmFzZVxyXG4gICAgICogQHBhcmFtIHN1YnR5cGUgLSB0aGUgaW50ZXJhY3Rpb24gc3VidHlwZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzdWJ0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3VidHlwZSA9IHN1YnR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiYXNlIGluaXRpYWxpemVyLCByZXR1cm5zIHRydWUgZm9yIGFscmVhZHkgaW5pdGlhbGl6ZWRcclxuICAgICAqIEBwYXJhbSB0aGVNYXAgLSB0aGUgb2wgTWFwXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIGZvciBhbHJlYWR5IGluaXRpYWxpemVkXHJcbiAgICAgKi9cclxuICAgIGluaXQodGhlTWFwOiBvbC5NYXApe1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSB0aGVNYXA7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmVmZXJlbmNlIHRvIHRoZSBvbCBtYXAgb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7b2wuTWFwfSB0aGUgbWFwIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBnZXQgbWFwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgaWYgaXMgaW5pdGlhbGl6ZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBpcyBpbml0aWFsaXplZFxyXG4gICAgICovXHJcbiAgICBnZXQgaW5pdGlhbGl6ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhlIGluaXRpYWxpemF0aW9uIHN0YXR1cyBhbmQgdGhyb3cgZXhjZXB0aW9uIGlmIG5vdCB2YWxpZCB5ZXRcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgX2NoZWNrSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IGAke3RoaXMuX3N1YnR5cGV9IG9iamVjdCBub3QgaW5pdGlhbGl6ZWRgO1xyXG4gICAgICAgICAgICBhbGVydChtc2cpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgICAgICB0aHJvdyBtc2c7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdGhlIGluaXRpYWxpemF0aW9uIHN0YXR1cyBhbmQgdGhyb3cgZXhjZXB0aW9uIGlmIG5vdCB2YWxpZCB5ZXRcclxuICAgICAqL1xyXG4gICAgY2hlY2tJbml0KCl7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbml0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLk1hcEludGVyYWN0aW9uQmFzZSA9IE1hcEludGVyYWN0aW9uQmFzZTtcclxuZXhwb3J0IGRlZmF1bHQgTWFwSW50ZXJhY3Rpb25CYXNlO1xyXG4iXX0=

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mapMoveCls_1 = __webpack_require__(11);
/**
 * The single map move object catch is that it is common to multimap pages
 * @type {MapMoveCls}
 */
exports.mapMove = new mapMoveCls_1.default();
exports.default = exports.mapMove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTW92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcE1vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUV0Qzs7O0dBR0c7QUFFVSxRQUFBLE9BQU8sR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztBQUN4QyxrQkFBZSxlQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMS8zLzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1hcE1vdmVDbHMgZnJvbSAnLi9tYXBNb3ZlQ2xzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgc2luZ2xlIG1hcCBtb3ZlIG9iamVjdCBjYXRjaCBpcyB0aGF0IGl0IGlzIGNvbW1vbiB0byBtdWx0aW1hcCBwYWdlc1xyXG4gKiBAdHlwZSB7TWFwTW92ZUNsc31cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgbWFwTW92ZSA9IG5ldyBNYXBNb3ZlQ2xzKCk7XHJcbmV4cG9ydCBkZWZhdWx0IG1hcE1vdmU7XHJcbiJdfQ==

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var quickMapBase_1 = __webpack_require__(13);
var provide_1 = __webpack_require__(0);
var mapMove_1 = __webpack_require__(6);
var mapPopup_1 = __webpack_require__(4);
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
exports.default = quickMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWlja01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgsK0NBQTZEO0FBQzdELDJDQUFzQztBQUN0QyxxQ0FBZ0M7QUFDaEMsdUNBQWtDO0FBRWxDLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsa0JBQXlCLE9BQTBCO0lBQy9DLElBQUksQ0FBQyxHQUFHLDJCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUM7QUFMRCw0QkFLQztBQUdELEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3ZCLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzE1LzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtxdWlja01hcE9wdGlvbnMsIHF1aWNrTWFwQmFzZX0gZnJvbSAnLi9xdWlja01hcEJhc2UnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgbWFwTW92ZSBmcm9tICcuL21hcE1vdmUnO1xyXG5pbXBvcnQgbWFwUG9wdXAgZnJvbSAnLi9tYXBQb3B1cCc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5sZXQgbm0gPSBwcm92aWRlKCdvbEhlbHBlcnMnKTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHVwIGEgbWFwIHdpdGggc29tZSBkZWZhdWx0IHBhcmFtZXRlcnMgYW5kIGluaXRpYWxpemVzXHJcbiAqIG1hcE1vdmUgYW5kIG1hcFBvcHVwXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucz17fV0gY29uZmlnIG9wdGlvbnNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmRpdklkPW1hcF0gbWFwIGRpdiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuY2VudGVyPXt9XSBjZW50ZXIgY29uZmlnIG9iamVjdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuY2VudGVyLng9LTEwMDE4Mzc4XSBjZW50ZXIgeCwgd2ViIG1lcmNhdG9yIHggb3IgbG9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5jZW50ZXIueT01NTc0OTEwXSBjZW50ZXIgeSwgd2ViIG1lcmNhdG9yIHkgb3IgbGF0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56b29tPTddIHpvb20gbGV2ZWxcclxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSBtaW4gem9vbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIG1heCB6b29tXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYmFzZVN3aXRjaGVyPXRydWVdIGlmIGFkZCBiYXNlIG1hcCBzd2l0Y2hlclxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZ1bGxTY3JlZW49ZmFsc2VdIGlmIGFkZCBiYXNlIG1hcCBzd2l0Y2hlclxyXG4gKiBAcmV0dXJucyB7b2wuTWFwfSB0aGUgb2wgbWFwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcXVpY2tNYXAob3B0aW9ucz8gOiBxdWlja01hcE9wdGlvbnMpOiBvbC5NYXAge1xyXG4gICAgbGV0IG0gPSBxdWlja01hcEJhc2Uob3B0aW9ucyk7XHJcbiAgICBtYXBNb3ZlLmluaXQobSk7XHJcbiAgICBtYXBQb3B1cC5pbml0KG0pO1xyXG4gICAgcmV0dXJuIG07XHJcbn1cclxuXHJcblxyXG5ubS5xdWlja01hcCA9IHF1aWNrTWFwO1xyXG5leHBvcnQgZGVmYXVsdCBxdWlja01hcDtcclxuIl19

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zoomResolutionConvert = __webpack_require__(14);
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(3);
var $ = __webpack_require__(1);
var nm = provide_1.default('layers');
/**
 * The base layer class
 * @abstract
 */
var LayerBase = (function () {
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */
    function LayerBase(url, options) {
        if (options === void 0) { options = {}; }
        options = options || {};
        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;
        this._params = typeof options.params == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;
        this.id = options.id || makeGuid_1.default();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;
        if (this._opacity > 1) {
            this._opacity = 1;
        }
        else if (this._opacity < 0) {
            this._opacity = 0;
        }
        this._visible = typeof options.visible === 'boolean' ? options.visible : true;
        this._source = undefined;
        /**
         *
         * @protected
         */
        this._olLayer = undefined;
        this._loaded = false;
        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);
        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;
        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {
        };
        this._legendContent = '';
        if (this._legendCheckbox) {
            this._legendContent += "<input type=\"checkbox\" " + (this.visible ? 'checked' : '') + " " +
                ("class=\"legend-check\" id=\"" + this.id + "-legend-layer-check\"><span></span>");
            this._legendContent += "<label for=\"" + this.id + "-legend-layer-check\" class=\"legend-layer-name\">" + this.name + "</label>";
        }
        else {
            this._legendContent += "<label class=\"legend-layer-name\">" + this.name + "</label>";
        }
        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }
    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBase.prototype._load = function () {
        if (this.loaded == true) {
            return true;
        }
        else {
            this._loaded = true;
            return false;
        }
    };
    /**
     * Get the legend html, be sure to only add to the DOM once
     * @returns {string} html for layer wrapped in a div
     */
    LayerBase.prototype.getLegendDiv = function () {
        return "<div class=\"legend-layer-div\" id=\"" + this.id + "-legend-layer-div\">" + this._legendContent + "</div>";
    };
    /**
     *
     * @param additionalContent - additional content to add to legend
     * @private
     */
    LayerBase.prototype._addLegendContent = function (additionalContent) {
        if (additionalContent === void 0) { additionalContent = ''; }
        var addCollapse = additionalContent.indexOf('<ul>') > -1;
        if (addCollapse) {
            additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
        }
        this._legendContent += additionalContent;
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            this._$legendDiv.append(additionalContent);
            this.applyCollapse();
        }
    };
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=] - additonal content to add
     */
    LayerBase.prototype.addLegendContent = function (additionalContent) {
        this._addLegendContent(additionalContent);
    };
    LayerBase.prototype.applyCollapse = function () {
        if (this._applyCollapseCalled) {
            console.log('collapse already applied');
            return undefined;
        }
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            var $expander = this._$legendDiv.find('.legend-items-expander');
            if ($expander.length > 0) {
                this._applyCollapseCalled = true;
                $expander.click(function () {
                    var $this = $(this);
                    $this.siblings('ul').slideToggle();
                    if ($this.hasClass('legend-layer-group-collapsed')) {
                        $this.removeClass('legend-layer-group-collapsed');
                        $this.html('&#9660;');
                    }
                    else {
                        $this.addClass('legend-layer-group-collapsed');
                        $this.html('&#9654;');
                    }
                });
                if (this._legendCollapse) {
                    $expander.trigger('click');
                }
            }
        }
    };
    /**
     * trick to refresh the layer
     */
    LayerBase.prototype.refresh = function () {
        if (this.source) {
            this.source.refresh();
        }
    };
    Object.defineProperty(LayerBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            this._id = newId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "animate", {
        get: function () {
            return this._animate;
        },
        set: function (animate) {
            this._animate = animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "legendContent", {
        /**
         * get the legend content
         * @type {string}
         */
        get: function () {
            return this._legendContent;
        },
        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        set: function (newVal) {
            this._legendContent = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "params", {
        /**
         * get the map get params
         * @type {object}
         */
        get: function () {
            return this._params;
        },
        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        set: function (newParams) {
            this._params = newParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minResolution", {
        /**
         * get the minimum resolution
         * @type {number|*}
         */
        get: function () {
            return this._minResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxResolution", {
        /**
         * get the maximum resolution
         * @type {number|*}
         */
        get: function () {
            return this._maxResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minZoom", {
        /**
         * get min zoom
         * @type {number|*}
         */
        get: function () {
            return this._minZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxZoom", {
        /**
         * get max zoom
         * @type {number|*}
         */
        get: function () {
            return this._maxZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "url", {
        /**
         * get the url
         * @type {string}
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "visible", {
        /**
         * Get the layer visibility
         * @type {boolean}
         */
        get: function () {
            return this._visible;
        },
        /**
         * set the visibility
         * @param visibility
         */
        set: function (visibility) {
            this.setVisible(visibility);
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setVisible = function (visibility) {
        this._visible = visibility;
        if (this.olLayer) {
            this.olLayer.setVisible(this._visible);
            if (visibility && !this._loaded) {
                this._load();
            }
        }
    };
    Object.defineProperty(LayerBase.prototype, "opacity", {
        /**
         * Get the layer opacity
         * @type {number}
         */
        get: function () {
            return this._opacity;
        },
        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        set: function (opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "name", {
        /**
         * Get the layer name
         * @type {string}
         */
        get: function () {
            return this._name;
        },
        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "loaded", {
        /**
         * Check if the layer is loaded
         * @type {boolean}
         */
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "source", {
        /**
         * get the layer source
         * @type {*}
         */
        get: function () {
            return this.getSource();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getSource = function () {
        return this._source;
    };
    Object.defineProperty(LayerBase.prototype, "zIndex", {
        /**
         * get the z index
         */
        get: function () {
            return this._zIndex;
        },
        /**
         * set the z index
         */
        set: function (newZ) {
            this._zIndex = newZ;
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setZIndex = function (newZ) {
    };
    Object.defineProperty(LayerBase.prototype, "olLayer", {
        /**
         * the the ol layer
         */
        get: function () {
            return this.getOlLayer();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getOlLayer = function () {
        return this._olLayer;
    };
    return LayerBase;
}());
exports.LayerBase = LayerBase;
nm.LayerBase = LayerBase;
exports.default = LayerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTGF5ZXJCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEVBQTRFO0FBQzVFLDJDQUFzQztBQUV0Qyw2Q0FBd0M7QUFDeEMsMEJBQTZCO0FBRTdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFtQjdCOzs7R0FHRztBQUNIO0lBMEJJOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsbUJBQVksR0FBVyxFQUFFLE9BQThCO1FBQTlCLHdCQUFBLEVBQUEsWUFBOEI7UUFDbkQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFzQixDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxhQUFhLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBR2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxPQUFPLENBQUMsTUFBTSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN2RSxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDbkcsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxjQUFjLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRWxHLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsSUFBSSxrQkFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMs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QixDQUFDOzs7T0FBQTtJQUVTLDhCQUFVLEdBQXBCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXhaRCxJQXdaQztBQXhacUIsOEJBQVM7QUEwWi9CLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHpvb21SZXNvbHV0aW9uQ29udmVydCBmcm9tICcuLi9vbEhlbHBlcnMvem9vbVJlc29sdXRpb25Db252ZXJ0JztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCBtYWtlR3VpZCBmcm9tICcuLi91dGlsL21ha2VHdWlkJztcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllckJhc2VPcHRpb25ze1xyXG4gICAgaWQ/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgb3BhY2l0eT86IG51bWJlcjtcclxuICAgIHZpc2libGU/OiBib29sZWFuO1xyXG4gICAgbWluWm9vbT86IG51bWJlcjtcclxuICAgIG1heFpvb20/OiBudW1iZXI7XHJcbiAgICBwYXJhbXM/OiBhbnk7XHJcbiAgICB6SW5kZXg/OiBudW1iZXI7XHJcbiAgICBsb2FkQ2FsbGJhY2s/OiBGdW5jdGlvbjtcclxuICAgIGxlZ2VuZENvbGxhcHNlPzogYm9vbGVhbjtcclxuICAgIGxlZ2VuZENoZWNrYm94PzogYm9vbGVhbjtcclxuICAgIGxlZ2VuZENvbnRlbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhlIGJhc2UgbGF5ZXIgY2xhc3NcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXJCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2xlZ2VuZENoZWNrYm94OiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF91cmw6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfb3BhY2l0eTogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIF9taW5ab29tOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX21heFpvb206IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfdmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHByb3RlY3RlZCBfbG9hZGVkOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF96SW5kZXg6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfbGVnZW5kQ29udGVudDogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9wYXJhbXM6IGFueTtcclxuICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9zb3VyY2U6IG9sLnNvdXJjZS5Tb3VyY2U7XHJcbiAgICBwcm90ZWN0ZWQgX2FuaW1hdGU6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX2xlZ2VuZENvbGxhcHNlOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9tYXhSZXNvbHV0aW9uOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX21pblJlc29sdXRpb246IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCAgXyRsZWdlbmREaXY6IEpRdWVyeTtcclxuICAgIGxvYWRDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcm90ZWN0ZWQgX29sTGF5ZXI6IG9sLmxheWVyLkxheWVyO1xyXG4gICAgcHJvdGVjdGVkIF9hcHBseUNvbGxhcHNlQ2FsbGVkOiBib29sZWFuO1xyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYmFzZSBsYXllciBmb3IgYWxsIG90aGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHVybCBmb3Igc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGNvbmZpZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmlkPW1ha2VHdWlkKCldIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gLSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gLSB0aGUgeiBpbmRleCBmb3IgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkQ2FsbGJhY2tdIC0gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gLSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gLSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGhhdmUgYSBjaGVja2JveCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb250ZW50PXVuZGVmaW5lZF0gLSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gYWRkIHRvIHRoZSBsZWdlbmRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG9wdGlvbnM6IExheWVyQmFzZU9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IGFzIExheWVyQmFzZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyAnSW52YWxpZCBVUkwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wYXJhbXMgPSB0eXBlb2Ygb3B0aW9ucy5wYXJhbXMgPT0gJ29iamVjdCcgPyBvcHRpb25zLnBhcmFtcyA6IHt9O1xyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbGxhcHNlID0gdHlwZW9mIG9wdGlvbnMubGVnZW5kQ29sbGFwc2UgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5sZWdlbmRDb2xsYXBzZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENoZWNrYm94ID0gdHlwZW9mIG9wdGlvbnMubGVnZW5kQ2hlY2tib3ggPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5sZWdlbmRDaGVja2JveCA6IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkIHx8IG1ha2VHdWlkKCk7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnVW5uYW1lZCBMYXllcic7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHR5cGVvZiBvcHRpb25zLm9wYWNpdHkgPT0gJ251bWJlcicgPyBvcHRpb25zLm9wYWNpdHkgOiAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3BhY2l0eSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9vcGFjaXR5IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB0eXBlb2Ygb3B0aW9ucy52aXNpYmxlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnZpc2libGUgOiB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLl9zb3VyY2UgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByb3RlY3RlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX21heFJlc29sdXRpb24gPSB6b29tUmVzb2x1dGlvbkNvbnZlcnQuem9vbVRvUmVzb2x1dGlvbihvcHRpb25zLm1pblpvb20pO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbWF4UmVzb2x1dGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4UmVzb2x1dGlvbiArPSAwLjAwMDAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9taW5SZXNvbHV0aW9uID0gem9vbVJlc29sdXRpb25Db252ZXJ0Lnpvb21Ub1Jlc29sdXRpb24ob3B0aW9ucy5tYXhab29tKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWluWm9vbSA9IHR5cGVvZiBvcHRpb25zLm1pblpvb20gPT0gJ251bWJlcicgPyBvcHRpb25zLm1pblpvb20gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fbWF4Wm9vbSA9IHR5cGVvZiBvcHRpb25zLm1heFpvb20gPT0gJ251bWJlcicgPyBvcHRpb25zLm1heFpvb20gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fekluZGV4ID0gdHlwZW9mIG9wdGlvbnMuekluZGV4ID09ICdudW1iZXInID8gb3B0aW9ucy56SW5kZXggOiAwO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRDYWxsYmFjayA9IHR5cGVvZiBvcHRpb25zLmxvYWRDYWxsYmFjayA9PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5sb2FkQ2FsbGJhY2sgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRlbnQgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xlZ2VuZENoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRlbnQgKz0gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAke3RoaXMudmlzaWJsZSA/ICdjaGVja2VkJyA6ICcnfSBgICtcclxuICAgICAgICAgICAgICAgIGBjbGFzcz1cImxlZ2VuZC1jaGVja1wiIGlkPVwiJHt0aGlzLmlkfS1sZWdlbmQtbGF5ZXItY2hlY2tcIj48c3Bhbj48L3NwYW4+YDtcclxuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGVudCArPSBgPGxhYmVsIGZvcj1cIiR7dGhpcy5pZH0tbGVnZW5kLWxheWVyLWNoZWNrXCIgY2xhc3M9XCJsZWdlbmQtbGF5ZXItbmFtZVwiPiR7dGhpcy5uYW1lfTwvbGFiZWw+YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250ZW50ICs9IGA8bGFiZWwgY2xhc3M9XCJsZWdlbmQtbGF5ZXItbmFtZVwiPiR7dGhpcy5uYW1lfTwvbGFiZWw+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuXyRsZWdlbmREaXYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5Q29sbGFwc2VDYWxsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hZGRMZWdlbmRDb250ZW50KHR5cGVvZiBvcHRpb25zLmxlZ2VuZENvbnRlbnQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5sZWdlbmRDb250ZW50IDogdW5kZWZpbmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhc2UgbG9hZCBmdW5jdGlvbiwgc2V0cyBfbG9hZGVkID0gdHJ1ZSBpZiBpdCBpcyBub3QgYWxyZWFkeVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlmIGFscmVhZHkgbG9hZGVkXHJcbiAgICAgKi9cclxuICAgIF9sb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBsZWdlbmQgaHRtbCwgYmUgc3VyZSB0byBvbmx5IGFkZCB0byB0aGUgRE9NIG9uY2VcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWwgZm9yIGxheWVyIHdyYXBwZWQgaW4gYSBkaXZcclxuICAgICAqL1xyXG4gICAgZ2V0TGVnZW5kRGl2KCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImxlZ2VuZC1sYXllci1kaXZcIiBpZD1cIiR7dGhpcy5pZH0tbGVnZW5kLWxheWVyLWRpdlwiPiR7dGhpcy5fbGVnZW5kQ29udGVudH08L2Rpdj5gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhZGRpdGlvbmFsQ29udGVudCAtIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gbGVnZW5kXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfYWRkTGVnZW5kQ29udGVudChhZGRpdGlvbmFsQ29udGVudD0nJykge1xyXG5cclxuICAgICAgICBsZXQgYWRkQ29sbGFwc2UgPSBhZGRpdGlvbmFsQ29udGVudC5pbmRleE9mKCc8dWw+JykgPiAtMTtcclxuXHJcbiAgICAgICAgaWYgKGFkZENvbGxhcHNlKSB7XHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxDb250ZW50ID0gJzxzcGFuIGNsYXNzPVwibGVnZW5kLWl0ZW1zLWV4cGFuZGVyXCIgdGl0bGU9XCJFeHBhbmQvQ29sbGFwc2VcIj4mIzk2NjA7PC9zcGFuPicgKyBhZGRpdGlvbmFsQ29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRlbnQgKz0gYWRkaXRpb25hbENvbnRlbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuXyRsZWdlbmREaXYgPSAkKGAjJHt0aGlzLmlkfS1sZWdlbmQtbGF5ZXItZGl2YCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl8kbGVnZW5kRGl2Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fJGxlZ2VuZERpdi5hcHBlbmQoYWRkaXRpb25hbENvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sbGFwc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYWRkaXRpb25hbCBjb250ZW50IHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWRkaXRpb25hbENvbnRlbnQ9XSAtIGFkZGl0b25hbCBjb250ZW50IHRvIGFkZFxyXG4gICAgICovXHJcbiAgICBhZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fYWRkTGVnZW5kQ29udGVudChhZGRpdGlvbmFsQ29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlDb2xsYXBzZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXBwbHlDb2xsYXBzZUNhbGxlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29sbGFwc2UgYWxyZWFkeSBhcHBsaWVkJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fJGxlZ2VuZERpdiA9ICQoYCMke3RoaXMuaWR9LWxlZ2VuZC1sYXllci1kaXZgKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuXyRsZWdlbmREaXYubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRleHBhbmRlciA9IHRoaXMuXyRsZWdlbmREaXYuZmluZCgnLmxlZ2VuZC1pdGVtcy1leHBhbmRlcicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRleHBhbmRlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseUNvbGxhcHNlQ2FsbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZXhwYW5kZXIuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnbGVnZW5kLWxheWVyLWdyb3VwLWNvbGxhcHNlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdsZWdlbmQtbGF5ZXItZ3JvdXAtY29sbGFwc2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJyYjOTY2MDsnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnbGVnZW5kLWxheWVyLWdyb3VwLWNvbGxhcHNlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5odG1sKCcmIzk2NTQ7Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xlZ2VuZENvbGxhcHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGV4cGFuZGVyLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0cmljayB0byByZWZyZXNoIHRoZSBsYXllclxyXG4gICAgICovXHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpZChuZXdJZDogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9pZCA9IG5ld0lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbmltYXRlKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFuaW1hdGUoYW5pbWF0ZTogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZSA9IGFuaW1hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGxlZ2VuZCBjb250ZW50XHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgbGVnZW5kQ29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVnZW5kQ29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgbGVnZW5kIGNvbnRlbnQgZGlyZWN0bHlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdWYWwgLSBuZXcgY29udGVudFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBzZXQgbGVnZW5kQ29udGVudChuZXdWYWwpIHtcclxuICAgICAgICB0aGlzLl9sZWdlbmRDb250ZW50ID0gbmV3VmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBtYXAgZ2V0IHBhcmFtc1xyXG4gICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0IHBhcmFtcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBtYXAgZ2V0IHBhcmFtc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG5ld1BhcmFtcyAtIG5ldyBnZXQgcGFyYW1zXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHNldCBwYXJhbXMobmV3UGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1zID0gbmV3UGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBtaW5pbXVtIHJlc29sdXRpb25cclxuICAgICAqIEB0eXBlIHtudW1iZXJ8Kn1cclxuICAgICAqL1xyXG4gICAgZ2V0IG1pblJlc29sdXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblJlc29sdXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG1heGltdW0gcmVzb2x1dGlvblxyXG4gICAgICogQHR5cGUge251bWJlcnwqfVxyXG4gICAgICovXHJcbiAgICBnZXQgbWF4UmVzb2x1dGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4UmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBtaW4gem9vbVxyXG4gICAgICogQHR5cGUge251bWJlcnwqfVxyXG4gICAgICovXHJcbiAgICBnZXQgbWluWm9vbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluWm9vbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBtYXggem9vbVxyXG4gICAgICogQHR5cGUge251bWJlcnwqfVxyXG4gICAgICovXHJcbiAgICBnZXQgbWF4Wm9vbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4Wm9vbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgdXJsXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgdXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGxheWVyIHZpc2liaWxpdHlcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgdmlzaWJpbGl0eVxyXG4gICAgICogQHBhcmFtIHZpc2liaWxpdHlcclxuICAgICAqL1xyXG4gICAgc2V0IHZpc2libGUodmlzaWJpbGl0eTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZSh2aXNpYmlsaXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0VmlzaWJsZSh2aXNpYmlsaXR5OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2liaWxpdHk7XHJcbiAgICAgICAgaWYgKHRoaXMub2xMYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm9sTGF5ZXIuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKTtcclxuICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgJiYgIXRoaXMuX2xvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbGF5ZXIgb3BhY2l0eVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IG9wYWNpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGxheWVyIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcGFjaXR5IC0gbGF5ZXIgb3BhY2l0eVxyXG4gICAgICovXHJcbiAgICBzZXQgb3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IG9wYWNpdHk7XHJcbiAgICAgICAgaWYgKHRoaXMub2xMYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm9sTGF5ZXIuc2V0T3BhY2l0eSh0aGlzLl9vcGFjaXR5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGxheWVyIG5hbWVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBuYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3TmFtZSAtIHRoZSBuZXcgbmFtZVxyXG4gICAgICovXHJcbiAgICBzZXQgbmFtZShuZXdOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgbGF5ZXIgaXMgbG9hZGVkXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGxvYWRlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSBsYXllciBzb3VyY2VcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICBnZXQgc291cmNlKCk6IG9sLnNvdXJjZS5Tb3VyY2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNvdXJjZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0U291cmNlKCk6IG9sLnNvdXJjZS5Tb3VyY2V7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgeiBpbmRleFxyXG4gICAgICovXHJcbiAgICBnZXQgekluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCB0aGUgeiBpbmRleFxyXG4gICAgICovXHJcbiAgICBzZXQgekluZGV4KG5ld1o6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3pJbmRleCA9IG5ld1o7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldFpJbmRleChuZXdaOiBudW1iZXIpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB0aGUgb2wgbGF5ZXJcclxuICAgICAqL1xyXG4gICAgZ2V0IG9sTGF5ZXIoKTogb2wubGF5ZXIuTGF5ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9sTGF5ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0T2xMYXllcigpOiBvbC5sYXllci5MYXllcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2xMYXllcjtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJCYXNlID0gTGF5ZXJCYXNlO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckJhc2U7XHJcbiJdfQ==

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tEZWZpbmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tEZWZpbmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWdDO0FBQ2hDLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV0Qzs7OztHQUlHO0FBQ0gseUJBQWlDLEtBQUs7SUFDbEMsWUFBWSxDQUFDO0lBRWIsTUFBTSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBSkQsMENBSUM7QUFFRCxFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUdyQzs7OztHQUlHO0FBQ0gsMkJBQW1DLEtBQVU7SUFDekMsWUFBWSxDQUFDO0lBRWIsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBSkQsOENBSUM7QUFFRCxFQUFFLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvdmlkZSBmcm9tICcuL3Byb3ZpZGUnO1xyXG5sZXQgbm0gPSBwcm92aWRlKCd1dGlsLmNoZWNrRGVmaW5lZCcpO1xyXG5cclxuLyoqXHJcbiAqIGNoZWNrIGlmIHRoZSBpbnB1dCBpcyB1bmRlZmluZWQgb3IgbnVsbFxyXG4gKiBAcGFyYW0gaW5wdXQgLSBpbnB1dCBwb2ludGVyXHJcbiAqIEByZXR1cm5zIHRydWUgdW5kZWZpbmVkIG9yIG51bGxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmRlZmluZWRPck51bGwgKGlucHV0KTogYm9vbGVhbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHJldHVybiAodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJyB8fCBpbnB1dCA9PT0gbnVsbCk7XHJcbn1cclxuXHJcbm5tLnVuZGVmaW5lZE9yTnVsbCA9IHVuZGVmaW5lZE9yTnVsbDtcclxuXHJcblxyXG4vKipcclxuICogY2hlY2sgaWYgdGhlIGlucHV0IGlzIGRlZmluZWQgYW5kIG5vdCBudWxsXHJcbiAqIEBwYXJhbSBpbnB1dCAtIGlucHV0IHBvaW50ZXJcclxuICogQHJldHVybnMgdHJ1ZSBkZWZpbmVkIGFuZCBub3QgbnVsbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZWRBbmROb3ROdWxsIChpbnB1dDogYW55KTogYm9vbGVhbntcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIHJldHVybiAhKHVuZGVmaW5lZE9yTnVsbChpbnB1dCkpO1xyXG59XHJcblxyXG5ubS5kZWZpbmVkQW5kTm90TnVsbCA9IGRlZmluZWRBbmROb3ROdWxsO1xyXG5cclxuIl19

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/7/2015.
 */
var LayerBase_1 = __webpack_require__(8);
var esriToOl = __webpack_require__(15);
var mapPopup_1 = __webpack_require__(4);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('layers');
/**
 * esri mapserver layer
 * @augments LayerBase
 */
var LayerEsriMapServer = (function (_super) {
    __extends(LayerEsriMapServer, _super);
    /**
     * The base layer for all others
     * @param {string} url - resource url
     * @param {object} [options] - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     * @param {boolean} [options.addPopup=false] if a popup should be added
     * @param {undefined|Array<number>} [options.showLayers=undefined] if a popup should be added
     */
    function LayerEsriMapServer(url, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, url, options) || this;
        _this._source = new ol.source.TileArcGISRest({
            url: _this.url == '' ? undefined : _this.url,
            params: typeof options.showLayers == 'undefined' ? undefined : { layers: 'show:' + options.showLayers.join(',') }
        });
        _this._olLayer = new ol.layer.Tile({
            source: _this._source,
            visible: _this.visible,
            opacity: _this.opacity,
            minResolution: _this._minResolution,
            maxResolution: _this._maxResolution
        });
        _this._olLayer.setZIndex(_this._zIndex);
        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;
        _this._esriFormat = new ol.format.EsriJSON();
        _this._popupRequest = null;
        _this.addLegendContent();
        if (options.addPopup) {
            mapPopup_1.default.addMapServicePopup(_this);
        }
        return _this;
    }
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=''] additional content for legend
     */
    LayerEsriMapServer.prototype.addLegendContent = function (additionalContent) {
        var _this = this;
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] !== '/') {
            urlCopy += '/';
        }
        urlCopy += 'legend?f=pjson&callback=?';
        $.get(urlCopy, {}, function (d) {
            var newHtml = esriToOl.makeMapServiceLegend(d);
            _super.prototype.addLegendContent.call(_this, newHtml);
        }, 'json');
    };
    LayerEsriMapServer.prototype.getPopupInfo = function (queryParams) {
        if (!this.visible) {
            return;
        }
        var urlCopy = this.url;
        if (urlCopy[urlCopy.length - 1] != '/') {
            urlCopy += '/';
        }
        urlCopy += 'identify?callback=?';
        var __this = this;
        if (this._popupRequest != null) {
            this._popupRequest.abort();
        }
        this._popupRequest = $.get(urlCopy, queryParams, function (d) {
            for (var _i = 0, _a = d['results']; _i < _a.length; _i++) {
                var r = _a[_i];
                var popupHtml = '<table class="esri-popup-table">';
                for (var a in r['attributes']) {
                    if (r['attributes'].hasOwnProperty(a)) {
                        var attrVal = r['attributes'][a];
                        if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                            continue;
                        }
                        var attr = a;
                        if (attr.length > 14) {
                            attr = attr.slice(0, 11) + '...';
                        }
                        popupHtml += "<tr><td>" + attr + "</td><td>" + attrVal + "</td></tr>";
                    }
                }
                popupHtml += '</table>';
                mapPopup_1.default.addMapServicePopupContent(__this._esriFormat.readFeature(r), __this, popupHtml, r['layerName']);
            }
        }, 'json');
        this._popupRequest.always(function () {
            __this._popupRequest = null;
        });
    };
    Object.defineProperty(LayerEsriMapServer.prototype, "source", {
        /**
         *
         * @returns {ol.source.TileArcGISRest} the vector source
         */
        get: function () {
            return _super.prototype.getSource.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerEsriMapServer.prototype, "olLayer", {
        /**
         *
         * @returns the ol layer
         */
        get: function () {
            return _super.prototype.getOlLayer.call(this);
        },
        enumerable: true,
        configurable: true
    });
    return LayerEsriMapServer;
}(LayerBase_1.LayerBase));
exports.LayerEsriMapServer = LayerEsriMapServer;
nm.LayerEsriMapServer = LayerEsriMapServer;
exports.default = LayerEsriMapServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJFc3JpTWFwU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTGF5ZXJFc3JpTWFwU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gseUNBQXdEO0FBQ3hELHFEQUF1RDtBQUN2RCxrREFBNkM7QUFDN0MsMkNBQXNDO0FBQ3RDLDhCQUFpQztBQUNqQywwQkFBNkI7QUFFN0IsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVE3Qjs7O0dBR0c7QUFDSDtJQUF3QyxzQ0FBUztJQUk3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsNEJBQVksR0FBRyxFQUFFLE9BQXVDO1FBQXZDLHdCQUFBLEVBQUEsWUFBdUM7UUFBeEQsWUFFSSxrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBNEJ0QjtRQTNCRyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDO1lBQ0ksR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLFNBQVMsR0FBRyxLQUFJLENBQUMsR0FBRztZQUMxQyxNQUFNLEVBQUUsT0FBTyxPQUFPLENBQUMsVUFBVSxJQUFJLFdBQVcsR0FBRyxTQUFTLEdBQUcsRUFBQyxNQUFNLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDO1NBQ2xILENBQ0osQ0FBQztRQUVGLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLEVBQUUsS0FBSSxDQUFDLE9BQXlCO1lBQ3RDLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU87WUFDckIsYUFBYSxFQUFFLEtBQUksQ0FBQyxjQUFjO1lBQ2xDLGFBQWEsRUFBRSxL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QUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi83LzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQge0xheWVyQmFzZSwgTGF5ZXJCYXNlT3B0aW9uc30gZnJvbSAnLi9MYXllckJhc2UnO1xyXG5pbXBvcnQgKiBhcyBlc3JpVG9PbCBmcm9tICcuLi9vbEhlbHBlcnMvZXNyaVRvT2xTdHlsZSc7XHJcbmltcG9ydCBtYXBQb3B1cCBmcm9tICcuLi9vbEhlbHBlcnMvbWFwUG9wdXAnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMYXllckVzcmlNYXBTZXJ2ZXJPcHRpb25zIGV4dGVuZHMgTGF5ZXJCYXNlT3B0aW9ucyB7XHJcbiAgICBhZGRQb3B1cD86IGJvb2xlYW47XHJcbiAgICBzaG93TGF5ZXJzPzogQXJyYXk8bnVtYmVyPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGVzcmkgbWFwc2VydmVyIGxheWVyXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMYXllckVzcmlNYXBTZXJ2ZXIgZXh0ZW5kcyBMYXllckJhc2Uge1xyXG4gICAgX2VzcmlGb3JtYXQ6IG9sLmZvcm1hdC5Fc3JpSlNPTjtcclxuICAgIF9wb3B1cFJlcXVlc3Q6IEpRdWVyeVhIUjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGxheWVyIGZvciBhbGwgb3RoZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gcmVzb3VyY2UgdXJsXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hZGRQb3B1cD1mYWxzZV0gaWYgYSBwb3B1cCBzaG91bGQgYmUgYWRkZWRcclxuICAgICAqIEBwYXJhbSB7dW5kZWZpbmVkfEFycmF5PG51bWJlcj59IFtvcHRpb25zLnNob3dMYXllcnM9dW5kZWZpbmVkXSBpZiBhIHBvcHVwIHNob3VsZCBiZSBhZGRlZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnM6IExheWVyRXNyaU1hcFNlcnZlck9wdGlvbnMgPSB7fSkge1xyXG5cclxuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG5ldyBvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3QoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwgPT0gJycgPyB1bmRlZmluZWQgOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgIHBhcmFtczogdHlwZW9mIG9wdGlvbnMuc2hvd0xheWVycyA9PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IHtsYXllcnM6ICdzaG93OicgKyBvcHRpb25zLnNob3dMYXllcnMuam9pbignLCcpfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IG5ldyBvbC5sYXllci5UaWxlKHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLl9zb3VyY2UgYXMgb2wuc291cmNlLlRpbGUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRoaXMudmlzaWJsZSxcclxuICAgICAgICAgICAgb3BhY2l0eTogdGhpcy5vcGFjaXR5LFxyXG4gICAgICAgICAgICBtaW5SZXNvbHV0aW9uOiB0aGlzLl9taW5SZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICBtYXhSZXNvbHV0aW9uOiB0aGlzLl9tYXhSZXNvbHV0aW9uXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KHRoaXMuX3pJbmRleCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYWRkUG9wdXAgPSB0eXBlb2Ygb3B0aW9ucy5hZGRQb3B1cCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmFkZFBvcHVwIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX2VzcmlGb3JtYXQgPSBuZXcgb2wuZm9ybWF0LkVzcmlKU09OKCk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBSZXF1ZXN0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRMZWdlbmRDb250ZW50KCk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmFkZFBvcHVwKSB7XHJcbiAgICAgICAgICAgIG1hcFBvcHVwLmFkZE1hcFNlcnZpY2VQb3B1cCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgYWRkaXRpb25hbCBjb250ZW50IHRvIHRoZSBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYWRkaXRpb25hbENvbnRlbnQ9JyddIGFkZGl0aW9uYWwgY29udGVudCBmb3IgbGVnZW5kXHJcbiAgICAgKi9cclxuICAgIGFkZExlZ2VuZENvbnRlbnQoYWRkaXRpb25hbENvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdXJsQ29weSA9IHRoaXMudXJsO1xyXG5cclxuICAgICAgICBpZiAodXJsQ29weVt1cmxDb3B5Lmxlbmd0aCAtIDFdICE9PSAnLycpIHtcclxuICAgICAgICAgICAgdXJsQ29weSArPSAnLyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmxDb3B5ICs9ICdsZWdlbmQ/Zj1wanNvbiZjYWxsYmFjaz0/JztcclxuXHJcbiAgICAgICAgJC5nZXQodXJsQ29weSwge30sIChkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdIdG1sID0gZXNyaVRvT2wubWFrZU1hcFNlcnZpY2VMZWdlbmQoZCk7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZExlZ2VuZENvbnRlbnQobmV3SHRtbCk7XHJcbiAgICAgICAgfSwgJ2pzb24nKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0UG9wdXBJbmZvKHF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybENvcHkgPSB0aGlzLnVybDtcclxuXHJcbiAgICAgICAgaWYgKHVybENvcHlbdXJsQ29weS5sZW5ndGggLSAxXSAhPSAnLycpIHtcclxuICAgICAgICAgICAgdXJsQ29weSArPSAnLyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cmxDb3B5ICs9ICdpZGVudGlmeT9jYWxsYmFjaz0/JztcclxuXHJcbiAgICAgICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wb3B1cFJlcXVlc3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cFJlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wb3B1cFJlcXVlc3QgPSAkLmdldCh1cmxDb3B5LCBxdWVyeVBhcmFtcywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgciBvZiBkWydyZXN1bHRzJ10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9wdXBIdG1sID0gJzx0YWJsZSBjbGFzcz1cImVzcmktcG9wdXAtdGFibGVcIj4nO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgaW4gclsnYXR0cmlidXRlcyddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJbJ2F0dHJpYnV0ZXMnXS5oYXNPd25Qcm9wZXJ0eShhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0clZhbCA9IHJbJ2F0dHJpYnV0ZXMnXVthXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyVmFsID09IG51bGwgfHwgYXR0clZhbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkgPT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHIgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5sZW5ndGggPiAxNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ciA9IGF0dHIuc2xpY2UoMCwgMTEpICsgJy4uLic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHRyPjx0ZD4ke2F0dHJ9PC90ZD48dGQ+JHthdHRyVmFsfTwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzwvdGFibGU+JztcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBQb3B1cC5hZGRNYXBTZXJ2aWNlUG9wdXBDb250ZW50KF9fdGhpcy5fZXNyaUZvcm1hdC5yZWFkRmVhdHVyZShyKSwgX190aGlzLCBwb3B1cEh0bWwsIHJbJ2xheWVyTmFtZSddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sICdqc29uJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwUmVxdWVzdC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfX3RoaXMuX3BvcHVwUmVxdWVzdCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtvbC5zb3VyY2UuVGlsZUFyY0dJU1Jlc3R9IHRoZSB2ZWN0b3Igc291cmNlXHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlRpbGVBcmNHSVNSZXN0IHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0U291cmNlKCkgYXMgb2wuc291cmNlLlRpbGVBcmNHSVNSZXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHRoZSBvbCBsYXllclxyXG4gICAgICovXHJcbiAgICBnZXQgb2xMYXllcigpOiBvbC5sYXllci5UaWxlIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0T2xMYXllcigpIGFzIG9sLmxheWVyLlRpbGU7XHJcbiAgICB9XHJcbn1cclxubm0uTGF5ZXJFc3JpTWFwU2VydmVyID0gTGF5ZXJFc3JpTWFwU2VydmVyO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckVzcmlNYXBTZXJ2ZXI7XHJcbiJdfQ==

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapInteractionBase_1 = __webpack_require__(5);
var checkDefined = __webpack_require__(9);
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(3);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
/**
 * assists with map move interactions, trigger callback functions
 * @augments MapInteractionBase
 */
var MapMoveCls = (function (_super) {
    __extends(MapMoveCls, _super);
    /**
     * constructor called implicitly
     */
    function MapMoveCls() {
        var _this = _super.call(this, 'map move') || this;
        _this._arrLyrRequest = [];
        _this._arrLyrTimeout = [];
        _this._arrLayer = [];
        _this._lookupLayer = {};
        _this._mapMoveCallbacks = [];
        _this._mapMoveCallbacksLookup = {};
        _this._mapMoveCallbackDelays = [];
        _this._mapMoveCallbackContext = [];
        _this._mapMoveCallbackTimeout = [];
        _this._mapExtent = undefined;
        _this._zoomLevel = undefined;
        return _this;
    }
    /**
     * initialize the map move object
     * @param theMap - the ol map
     */
    MapMoveCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        this.map.getView().on(['change:center', 'change:resolution'], function (e) {
            _this._updateMapExtent();
            // trigger the layer updates
            for (var i = 0; i < _this._arrLayer.length; i++) {
                _this.triggerLyrLoad(_this._arrLayer[i], i, e.type);
            }
            // trigger the map callbacks
            for (var i = 0; i < _this._mapMoveCallbacks.length; i++) {
                _this.triggerMoveCallback(i, e.type);
            }
        });
    };
    MapMoveCls.prototype._updateMapExtent = function () {
        var theView = this.map.getView();
        this._zoomLevel = theView.getZoom();
        var extentArray = theView.calculateExtent(this.map.getSize());
        this._mapExtent = {
            minX: extentArray[0],
            minY: extentArray[1],
            maxX: extentArray[2],
            maxY: extentArray[3]
        };
    };
    Object.defineProperty(MapMoveCls.prototype, "mapExtent", {
        /**
         * return the map extent
         */
        get: function () {
            if (!this._mapExtent) {
                this._updateMapExtent();
            }
            return this._mapExtent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Trigger the layer load
     * @param lyr the layer being acted on
     * @param index index of the layer
     * @param eventType the event triggering the load, as 'change:center' or 'change:resolution'
     */
    MapMoveCls.prototype.triggerLyrLoad = function (lyr, index, eventType) {
        if (checkDefined.undefinedOrNull(lyr) && checkDefined.undefinedOrNull(index)) {
            throw 'need to define lyr or index';
        }
        else if (checkDefined.definedAndNotNull(lyr) && checkDefined.undefinedOrNull(index)) {
            index = this._arrLayer.indexOf(lyr);
        }
        else if (checkDefined.undefinedOrNull(lyr) && checkDefined.definedAndNotNull(index)) {
            lyr = this._arrLayer[index];
        }
        // clear the timeout
        if (this._arrLyrTimeout[index] != null) {
            clearTimeout(this._arrLyrTimeout[index]);
            this._arrLyrTimeout[index] = null;
        }
        // abort if necessary and clear the request
        if (this._arrLyrRequest[index] != null && this._arrLyrRequest[index] != 4) {
            this._arrLyrRequest[index].abort();
            this._arrLyrRequest[index] = null;
        }
        // dummy callback used if before load returns false
        var callbackFunc = function () { };
        if (lyr.mapMoveBefore(this._zoomLevel, eventType)) {
            lyr.mapMoveMakeGetParams(this._mapExtent, this._zoomLevel);
            var __this_1 = this;
            callbackFunc = function () {
                function innerFunction(theLayer, theIndex) {
                    var _innerThis = this;
                    this._arrLyrRequest[theIndex] = $.get(theLayer.url, theLayer.mapMoveParams, function (d) {
                        /**
                         * @type {LayerBaseVector}
                         */
                        theLayer.mapMoveCallback(d);
                        theLayer.loadCallback();
                    }, 'json').fail(function (jqXHR) {
                        if (jqXHR.statusText != 'abort') {
                            console.log('failed');
                            console.log(theLayer.url);
                            console.log(theLayer.mapMoveParams);
                        }
                    }).always(function () {
                        _innerThis._arrLyrTimeout[theIndex] = null;
                        _innerThis._arrLyrRequest[theIndex] = null;
                    });
                }
                innerFunction.call(__this_1, lyr, index);
            };
        }
        else {
            lyr.clear();
        }
        this._arrLyrTimeout[index] = setTimeout(callbackFunc, lyr.onDemandDelay);
    };
    /**
     * trigger the map move call back at the given index
     * @param ind - the index of the layer
     * @param eventType=undefined the event triggering the load as 'change:center' or 'change:resolution'
     * @param functionId=undefined the function id used to reference the added callback function
     */
    MapMoveCls.prototype.triggerMoveCallback = function (ind, eventType, functionId) {
        if (typeof ind == 'undefined' && typeof functionId == 'undefined') {
            throw 'either the function index or the id must be defined';
        }
        if (typeof ind !== 'number') {
            ind = this._mapMoveCallbacks.indexOf(this._mapMoveCallbacksLookup[functionId]);
        }
        if (ind < 0) {
            console.log('function not found');
            return;
        }
        // clear the timeout
        if (this._mapMoveCallbackTimeout[ind] != null) {
            clearTimeout(this._mapMoveCallbackTimeout[ind]);
            this._mapMoveCallbackTimeout[ind] = null;
        }
        var ctx = this._mapMoveCallbackContext[ind];
        var theFunc = this._mapMoveCallbacks[ind];
        var __this = this;
        var f = function () {
            if (ctx !== null) {
                theFunc.call(ctx, __this._mapExtent, __this._zoomLevel, eventType);
            }
            else {
                theFunc(__this._mapExtent, __this._zoomLevel, eventType);
            }
        };
        this._mapMoveCallbackTimeout[ind] = setTimeout(f, this._mapMoveCallbackDelays[ind]);
    };
    /**
     * Add a layer to the interaction
     * @param  lyr - layer to add
     * @param triggerOnAdd - if the layer should be loaded on add
     */
    MapMoveCls.prototype.addVectorLayer = function (lyr, triggerOnAdd) {
        if (triggerOnAdd === void 0) { triggerOnAdd = true; }
        if (this._arrLayer.indexOf(lyr) > -1) {
            console.log('already added ' + lyr.name + ' to map move');
            return;
        }
        this._checkInit();
        this._arrLyrRequest.push(null);
        this._arrLyrTimeout.push(null);
        this._arrLayer.push(lyr);
        this._lookupLayer[lyr.id] = lyr;
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerLyrLoad(lyr, this._arrLayer.length - 1);
        }
    };
    /**
     * add a callback to the map move event
     * @param func - callback function
     * @param context - the context to use for this function
     * @param delay=50 the delay before call load
     * @param triggerOnAdd if the layer should be loaded on add to mapMove
     * @param functionId optional id to reference the function later for outside triggering
     */
    MapMoveCls.prototype.addCallback = function (func, context, delay, triggerOnAdd, functionId) {
        if (this._mapMoveCallbacks.indexOf(func) > -1) {
            console.log('this function already added to map move');
            return;
        }
        this._checkInit();
        if (!functionId) {
            functionId = makeGuid_1.default();
        }
        this._mapMoveCallbacks.push(func);
        this._mapMoveCallbacksLookup[functionId] = functionId;
        this._mapMoveCallbackDelays.push(typeof delay == 'number' ? delay : 50);
        this._mapMoveCallbackContext.push(checkDefined.definedAndNotNull(context) ? context : null);
        this._mapMoveCallbackTimeout.push(null);
        triggerOnAdd = typeof triggerOnAdd == 'boolean' ? triggerOnAdd : true;
        if (triggerOnAdd) {
            if (this._mapExtent === undefined) {
                this._updateMapExtent();
            }
            this.triggerMoveCallback(this._mapMoveCallbacks.length - 1);
        }
    };
    return MapMoveCls;
}(mapInteractionBase_1.default));
exports.MapMoveCls = MapMoveCls;
nm.MapMoveCls = MapMoveCls;
exports.default = MapMoveCls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTW92ZUNscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcE1vdmVDbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQXNEO0FBQ3RELG1EQUFxRDtBQUNyRCwyQ0FBc0M7QUFDdEMsNkNBQXdDO0FBRXhDLDBCQUE2QjtBQUM3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBcUJoQzs7O0dBR0c7QUFDSDtJQUFnQyw4QkFBa0I7SUFhOUM7O09BRUc7SUFDSDtRQUFBLFlBQ0ksa0JBQU0sVUFBVSxDQUFDLFNBZXBCO1FBZEcsS0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFdkIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixLQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUNsQyxLQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRWxDLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDOztJQUVoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gseUJBQUksR0FBSixVQUFLLE1BQWM7UUFBbkIsaUJBaUJDO1FBaEJHLGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLFVBQUMs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Q0FBQztRQUNoRSxDQUFDO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQWxRRCxDQUFnQyw0QkFBa0IsR0FrUWpEO0FBbFFZLGdDQUFVO0FBb1F2QixFQUFFLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUMzQixrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF5ZXJCYXNlVmVjdG9yIGZyb20gXCIuLi9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yXCI7XHJcbmltcG9ydCBNYXBJbnRlcmFjdGlvbkJhc2UgZnJvbSAnLi9tYXBJbnRlcmFjdGlvbkJhc2UnO1xyXG5pbXBvcnQgKiBhcyBjaGVja0RlZmluZWQgZnJvbSAnLi4vdXRpbC9jaGVja0RlZmluZWQnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgbWFrZUd1aWQgZnJvbSAnLi4vdXRpbC9tYWtlR3VpZCc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycycpO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZXh0ZW50T2JqZWN0e1xyXG4gICAgbWluWDogbnVtYmVyO1xyXG4gICAgbWluWTogbnVtYmVyO1xyXG4gICAgbWF4WDogbnVtYmVyO1xyXG4gICAgbWF4WTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG1hcE1vdmVDYWxsYmFja0Z1bmN0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGV4dGVudCBleHRlbnQgYXMgcHJlZGVmaW5lZCBvYmplY3QgbWluWCwgbWluWCwgbWF4WCwgbWF4WVxyXG4gICAgICogQHBhcmFtIHpvb21MZXZlbCBjdXJyZW50IHpvb20gbGV2ZWxcclxuICAgICAqIEBwYXJhbSBldnRUeXBlIHRoZSBldmVudCB0eXBlICdjaGFuZ2U6Y2VudGVyJywgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICovXHJcbiAgICAoZXh0ZW50OiBleHRlbnRPYmplY3QsIHpvb21MZXZlbDogbnVtYmVyLCBldnRUeXBlPzogc3RyaW5nKTogYW55XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogYXNzaXN0cyB3aXRoIG1hcCBtb3ZlIGludGVyYWN0aW9ucywgdHJpZ2dlciBjYWxsYmFjayBmdW5jdGlvbnNcclxuICogQGF1Z21lbnRzIE1hcEludGVyYWN0aW9uQmFzZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcE1vdmVDbHMgZXh0ZW5kcyBNYXBJbnRlcmFjdGlvbkJhc2Uge1xyXG4gICAgX21hcEV4dGVudDogZXh0ZW50T2JqZWN0O1xyXG4gICAgX3pvb21MZXZlbDogbnVtYmVyO1xyXG4gICAgX2xvb2t1cExheWVyOiBPYmplY3Q7XHJcbiAgICBfYXJyTGF5ZXI6IEFycmF5PExheWVyQmFzZVZlY3Rvcj47XHJcbiAgICBfYXJyTHlyVGltZW91dDogQXJyYXk8bnVtYmVyPjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgX21hcE1vdmVDYWxsYmFja0RlbGF5czogQXJyYXk8bnVtYmVyPjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwOiBPYmplY3Q7XHJcbiAgICBfbWFwTW92ZUNhbGxiYWNrQ29udGV4dDogQXJyYXk8T2JqZWN0PjtcclxuICAgIF9tYXBNb3ZlQ2FsbGJhY2tzOiBBcnJheTxtYXBNb3ZlQ2FsbGJhY2tGdW5jdGlvbj47XHJcbiAgICBfYXJyTHlyUmVxdWVzdDogQXJyYXk8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnN0cnVjdG9yIGNhbGxlZCBpbXBsaWNpdGx5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCdtYXAgbW92ZScpO1xyXG4gICAgICAgIHRoaXMuX2Fyckx5clJlcXVlc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJMeXJUaW1lb3V0ID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyTGF5ZXIgPSBbXTtcclxuICAgICAgICB0aGlzLl9sb29rdXBMYXllciA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWFwTW92ZUNhbGxiYWNrc0xvb2t1cCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0RlbGF5cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja0NvbnRleHQgPSBbXTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX21hcEV4dGVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl96b29tTGV2ZWwgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgbWFwIG1vdmUgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gdGhlTWFwIC0gdGhlIG9sIG1hcFxyXG4gICAgICovXHJcbiAgICBpbml0KHRoZU1hcDogb2wuTWFwKXtcclxuICAgICAgICBzdXBlci5pbml0KHRoZU1hcCk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwLmdldFZpZXcoKS5vbihbJ2NoYW5nZTpjZW50ZXInLCAnY2hhbmdlOnJlc29sdXRpb24nXSwgKGUpID0+e1xyXG5cclxuICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGxheWVyIHVwZGF0ZXNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hcnJMYXllci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyTHlyTG9hZCh0aGlzLl9hcnJMYXllcltpXSwgaSwgZS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgbWFwIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hcE1vdmVDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck1vdmVDYWxsYmFjayhpLCBlLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZU1hcEV4dGVudCgpIHtcclxuICAgICAgICBsZXQgdGhlVmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcclxuICAgICAgICB0aGlzLl96b29tTGV2ZWwgPSB0aGVWaWV3LmdldFpvb20oKTtcclxuXHJcbiAgICAgICAgbGV0IGV4dGVudEFycmF5ID0gdGhlVmlldy5jYWxjdWxhdGVFeHRlbnQodGhpcy5tYXAuZ2V0U2l6ZSgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwRXh0ZW50ID0ge1xyXG4gICAgICAgICAgICBtaW5YOiBleHRlbnRBcnJheVswXSxcclxuICAgICAgICAgICAgbWluWTogZXh0ZW50QXJyYXlbMV0sXHJcbiAgICAgICAgICAgIG1heFg6IGV4dGVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICBtYXhZOiBleHRlbnRBcnJheVszXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGhlIG1hcCBleHRlbnRcclxuICAgICAqL1xyXG4gICAgZ2V0IG1hcEV4dGVudCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hcEV4dGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBFeHRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIHRoZSBsYXllciBsb2FkXHJcbiAgICAgKiBAcGFyYW0gbHlyIHRoZSBsYXllciBiZWluZyBhY3RlZCBvblxyXG4gICAgICogQHBhcmFtIGluZGV4IGluZGV4IG9mIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSB0aGUgZXZlbnQgdHJpZ2dlcmluZyB0aGUgbG9hZCwgYXMgJ2NoYW5nZTpjZW50ZXInIG9yICdjaGFuZ2U6cmVzb2x1dGlvbidcclxuICAgICAqL1xyXG4gICAgdHJpZ2dlckx5ckxvYWQobHlyOiBMYXllckJhc2VWZWN0b3IsIGluZGV4PzogbnVtYmVyLCBldmVudFR5cGU/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrRGVmaW5lZC51bmRlZmluZWRPck51bGwobHlyKSAmJiBjaGVja0RlZmluZWQudW5kZWZpbmVkT3JOdWxsKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aHJvdyAnbmVlZCB0byBkZWZpbmUgbHlyIG9yIGluZGV4JztcclxuICAgICAgICB9IGVsc2UgaWYgKGNoZWNrRGVmaW5lZC5kZWZpbmVkQW5kTm90TnVsbChseXIpICYmIGNoZWNrRGVmaW5lZC51bmRlZmluZWRPck51bGwoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5fYXJyTGF5ZXIuaW5kZXhPZihseXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2tEZWZpbmVkLnVuZGVmaW5lZE9yTnVsbChseXIpICYmIGNoZWNrRGVmaW5lZC5kZWZpbmVkQW5kTm90TnVsbChpbmRleCkpIHtcclxuICAgICAgICAgICAgbHlyID0gdGhpcy5fYXJyTGF5ZXJbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2xlYXIgdGhlIHRpbWVvdXRcclxuICAgICAgICBpZiAodGhpcy5fYXJyTHlyVGltZW91dFtpbmRleF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fYXJyTHlyVGltZW91dFtpbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJUaW1lb3V0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhYm9ydCBpZiBuZWNlc3NhcnkgYW5kIGNsZWFyIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fyckx5clJlcXVlc3RbaW5kZXhdICE9IG51bGwgJiYgdGhpcy5fYXJyTHlyUmVxdWVzdFtpbmRleF0gIT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0W2luZGV4XS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkdW1teSBjYWxsYmFjayB1c2VkIGlmIGJlZm9yZSBsb2FkIHJldHVybnMgZmFsc2VcclxuICAgICAgICBsZXQgY2FsbGJhY2tGdW5jID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgICAgIGlmIChseXIubWFwTW92ZUJlZm9yZSh0aGlzLl96b29tTGV2ZWwsIGV2ZW50VHlwZSkpIHtcclxuICAgICAgICAgICAgbHlyLm1hcE1vdmVNYWtlR2V0UGFyYW1zKHRoaXMuX21hcEV4dGVudCwgdGhpcy5fem9vbUxldmVsKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2tGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaW5uZXJGdW5jdGlvbih0aGVMYXllciwgdGhlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX2lubmVyVGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJyTHlyUmVxdWVzdFt0aGVJbmRleF0gPSAkLmdldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlTGF5ZXIudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5tYXBNb3ZlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7TGF5ZXJCYXNlVmVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5tYXBNb3ZlQ2FsbGJhY2soZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVMYXllci5sb2FkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJ2pzb24nKS5mYWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoanFYSFIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqcVhIUi5zdGF0dXNUZXh0ICE9ICdhYm9ydCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhlTGF5ZXIudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGVMYXllci5tYXBNb3ZlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5uZXJUaGlzLl9hcnJMeXJUaW1lb3V0W3RoZUluZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5uZXJUaGlzLl9hcnJMeXJSZXF1ZXN0W3RoZUluZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5uZXJGdW5jdGlvbi5jYWxsKF9fdGhpcywgbHlyLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbHlyLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Fyckx5clRpbWVvdXRbaW5kZXhdID0gc2V0VGltZW91dChjYWxsYmFja0Z1bmMsIGx5ci5vbkRlbWFuZERlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWdnZXIgdGhlIG1hcCBtb3ZlIGNhbGwgYmFjayBhdCB0aGUgZ2l2ZW4gaW5kZXhcclxuICAgICAqIEBwYXJhbSBpbmQgLSB0aGUgaW5kZXggb2YgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlPXVuZGVmaW5lZCB0aGUgZXZlbnQgdHJpZ2dlcmluZyB0aGUgbG9hZCBhcyAnY2hhbmdlOmNlbnRlcicgb3IgJ2NoYW5nZTpyZXNvbHV0aW9uJ1xyXG4gICAgICogQHBhcmFtIGZ1bmN0aW9uSWQ9dW5kZWZpbmVkIHRoZSBmdW5jdGlvbiBpZCB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgYWRkZWQgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgdHJpZ2dlck1vdmVDYWxsYmFjayhpbmQ6IG51bWJlciwgZXZlbnRUeXBlPzogc3RyaW5nLCBmdW5jdGlvbklkPzogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kID09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBmdW5jdGlvbklkID09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgdGhyb3cgJ2VpdGhlciB0aGUgZnVuY3Rpb24gaW5kZXggb3IgdGhlIGlkIG11c3QgYmUgZGVmaW5lZCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGluZCAhPT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICBpbmQgPSB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzLmluZGV4T2YodGhpcy5fbWFwTW92ZUNhbGxiYWNrc0xvb2t1cFtmdW5jdGlvbklkXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kIDwgMCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBub3QgZm91bmQnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lb3V0XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0W2luZF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tUaW1lb3V0W2luZF0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuX21hcE1vdmVDYWxsYmFja0NvbnRleHRbaW5kXTtcclxuICAgICAgICBsZXQgdGhlRnVuYyA9IHRoaXMuX21hcE1vdmVDYWxsYmFja3NbaW5kXTtcclxuXHJcbiAgICAgICAgbGV0IF9fdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGVGdW5jLmNhbGwoY3R4LCBfX3RoaXMuX21hcEV4dGVudCwgX190aGlzLl96b29tTGV2ZWwsIGV2ZW50VHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGVGdW5jKF9fdGhpcy5fbWFwRXh0ZW50LCBfX3RoaXMuX3pvb21MZXZlbCwgZXZlbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXRbaW5kXSA9IHNldFRpbWVvdXQoZiwgdGhpcy5fbWFwTW92ZUNhbGxiYWNrRGVsYXlzW2luZF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbGF5ZXIgdG8gdGhlIGludGVyYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIGx5ciAtIGxheWVyIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIHRyaWdnZXJPbkFkZCAtIGlmIHRoZSBsYXllciBzaG91bGQgYmUgbG9hZGVkIG9uIGFkZFxyXG4gICAgICovXHJcbiAgICBhZGRWZWN0b3JMYXllcihseXI6IExheWVyQmFzZVZlY3RvciwgdHJpZ2dlck9uQWRkOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcnJMYXllci5pbmRleE9mKGx5cikgPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWxyZWFkeSBhZGRlZCAnICsgbHlyLm5hbWUgKyAnIHRvIG1hcCBtb3ZlJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9hcnJMeXJSZXF1ZXN0LnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fYXJyTHlyVGltZW91dC5wdXNoKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX2FyckxheWVyLnB1c2gobHlyKTtcclxuICAgICAgICB0aGlzLl9sb29rdXBMYXllcltseXIuaWRdID0gbHlyO1xyXG5cclxuICAgICAgICB0cmlnZ2VyT25BZGQgPSB0eXBlb2YgdHJpZ2dlck9uQWRkID09ICdib29sZWFuJyA/IHRyaWdnZXJPbkFkZCA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0cmlnZ2VyT25BZGQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcEV4dGVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXBFeHRlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJMeXJMb2FkKGx5ciwgdGhpcy5fYXJyTGF5ZXIubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhIGNhbGxiYWNrIHRvIHRoZSBtYXAgbW92ZSBldmVudFxyXG4gICAgICogQHBhcmFtIGZ1bmMgLSBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgY29udGV4dCB0byB1c2UgZm9yIHRoaXMgZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSBkZWxheT01MCB0aGUgZGVsYXkgYmVmb3JlIGNhbGwgbG9hZFxyXG4gICAgICogQHBhcmFtIHRyaWdnZXJPbkFkZCBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBvbiBhZGQgdG8gbWFwTW92ZVxyXG4gICAgICogQHBhcmFtIGZ1bmN0aW9uSWQgb3B0aW9uYWwgaWQgdG8gcmVmZXJlbmNlIHRoZSBmdW5jdGlvbiBsYXRlciBmb3Igb3V0c2lkZSB0cmlnZ2VyaW5nXHJcbiAgICAgKi9cclxuICAgIGFkZENhbGxiYWNrKGZ1bmM6IG1hcE1vdmVDYWxsYmFja0Z1bmN0aW9uLCBjb250ZXh0PzogYW55LCBkZWxheT86IG51bWJlciwgdHJpZ2dlck9uQWRkPyA6IGJvb2xlYW4sIGZ1bmN0aW9uSWQ/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21hcE1vdmVDYWxsYmFja3MuaW5kZXhPZihmdW5jKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGZ1bmN0aW9uIGFscmVhZHkgYWRkZWQgdG8gbWFwIG1vdmUnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuICAgICAgICBpZiAoIWZ1bmN0aW9uSWQpe1xyXG4gICAgICAgICAgICBmdW5jdGlvbklkID0gbWFrZUd1aWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja3MucHVzaChmdW5jKTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tzTG9va3VwW2Z1bmN0aW9uSWRdID0gZnVuY3Rpb25JZDtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tEZWxheXMucHVzaCh0eXBlb2YgZGVsYXkgPT0gJ251bWJlcicgPyBkZWxheSA6IDUwKTtcclxuICAgICAgICB0aGlzLl9tYXBNb3ZlQ2FsbGJhY2tDb250ZXh0LnB1c2goY2hlY2tEZWZpbmVkLmRlZmluZWRBbmROb3ROdWxsKGNvbnRleHQpID8gY29udGV4dCA6IG51bGwpO1xyXG4gICAgICAgIHRoaXMuX21hcE1vdmVDYWxsYmFja1RpbWVvdXQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgdHJpZ2dlck9uQWRkID0gdHlwZW9mIHRyaWdnZXJPbkFkZCA9PSAnYm9vbGVhbicgPyB0cmlnZ2VyT25BZGQgOiB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlck9uQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBFeHRlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWFwRXh0ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTW92ZUNhbGxiYWNrKHRoaXMuX21hcE1vdmVDYWxsYmFja3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ubS5NYXBNb3ZlQ2xzID0gTWFwTW92ZUNscztcclxuZXhwb3J0IGRlZmF1bHQgTWFwTW92ZUNscztcclxuIl19

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapInteractionBase_1 = __webpack_require__(5);
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
var FeatureLayerProperties = (function () {
    /**
     *
     * @param feature the feature
     * @param layer - the layer in the popup
     * @param layerIndex - index of the layer
     * @param selectionLayer - the ol selection layer
     * @param [esriLayerName=undefined] - esri layer name
     */
    function FeatureLayerProperties(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }
    Object.defineProperty(FeatureLayerProperties.prototype, "layerName", {
        get: function () {
            if (typeof this.esriLayerName == 'string') {
                return this.esriLayerName;
            }
            else {
                return this.layer.name;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FeatureLayerProperties;
}());
exports.FeatureLayerProperties = FeatureLayerProperties;
/**
 * map popup class
 * @augments MapInteractionBase
 */
var MapPopupCls = (function (_super) {
    __extends(MapPopupCls, _super);
    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */
    /**
     * map popup constructor
     */
    function MapPopupCls() {
        var _this = _super.call(this, 'map popup') || this;
        _this._arrPopupLayerIds = [];
        _this._arrPopupLayerNames = [];
        _this._arrPopupLayers = [];
        _this._arrPopupOlLayers = [];
        _this._arrPopupContentFunction = [];
        _this._$popupContainer = undefined;
        _this._$popupContent = undefined;
        _this._$popupCloser = undefined;
        _this._popupOverlay = undefined;
        _this._selectionLayers = [];
        _this._selectionLayerLookup = {};
        _this._mapClickFunctions = [];
        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        _this._popupChangedFunctions = [];
        _this._esriMapServiceLayers = [];
        _this._popupOpen = false;
        _this._popupCoordinate = null;
        _this._passThroughLayerFeatureArray = [];
        _this._currentPopupIndex = -1;
        _this._popupContentLength = 0;
        return _this;
    }
    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */
    MapPopupCls.prototype.init = function (theMap) {
        var _this = this;
        _super.prototype.init.call(this, theMap);
        var $map;
        var target = this.map.getTarget();
        if (typeof target == 'string') {
            $map = $('#' + target);
        }
        else {
            $map = $(target);
        }
        $map.append('<div class="ol-popup">' +
            '<span class="ol-popup-closer">X</span>' +
            '<div class="popup-content"></div>' +
            '</div>');
        this._$popupContainer = $map.find('.ol-popup');
        this._$popupContent = $map.find('.popup-content');
        this._$popupCloser = $map.find('.ol-popup-closer');
        var _ease = function (n) {
            return ol.easing.inAndOut(n);
        };
        this._popupOverlay = new ol.Overlay({
            element: this._$popupContainer[0],
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
                source: theMap.getView().getCenter(),
                easing: _ease
            }
        });
        this._map.addOverlay(this._popupOverlay);
        this._$popupCloser.click(function (evt) {
            _this.closePopup();
        });
        // display popup on click
        this._map.on('singleclick', function (evt) {
            _this.closePopup();
            _this._popupCoordinate = evt['coordinate'];
            // esri map service layers
            if (_this._esriMapServiceLayers.length > 0) {
                var queryParams = {
                    geometry: evt['coordinate'].join(','),
                    geometryType: 'esriGeometryPoint',
                    layers: 'all',
                    sr: _this._map.getView().getProjection().getCode().split(':')[1],
                    mapExtent: _this._map.getView().calculateExtent(_this._map.getSize()).join(','),
                    imageDisplay: _this._map.getSize().join(',') + ',96',
                    returnGeometry: true,
                    tolerance: 15,
                    f: 'pjson'
                };
                for (var _i = 0, _a = _this._esriMapServiceLayers; _i < _a.length; _i++) {
                    var l = _a[_i];
                    l.getPopupInfo(queryParams);
                }
            }
            var layerFeatureObjectArray = _this._featuresAtPixel(evt['pixel']);
            _this._passThroughLayerFeatureArray = [];
            _this._currentPopupIndex = -1;
            for (var i = 0; i < layerFeatureObjectArray.length; i++) {
                var featObj = layerFeatureObjectArray[i];
                var props = featObj.feature.getProperties();
                var popupContentResponse = _this._arrPopupContentFunction[featObj.layerIndex](props, _this._$popupContent);
                //skip if return was false
                if (popupContentResponse === false) {
                    //continue;
                }
                else if (typeof popupContentResponse == 'string') {
                    featObj.popupContent = popupContentResponse;
                    _this._passThroughLayerFeatureArray.push(featObj);
                }
                else {
                    featObj.selectionLayer.getSource().addFeature(featObj.feature);
                }
            }
            _this._popupContentLength = _this._passThroughLayerFeatureArray.length;
            _this._currentPopupIndex = -1;
            var popupHtml = '<div class="ol-popup-nav">';
            popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
            popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
            popupHtml += "<span class=\"current-popup-item-number\" style=\"font-weight: bold;\"></span>";
            popupHtml += "<span>&nbsp;of&nbsp;</span>";
            popupHtml += "<span class=\"popup-content-length\" style=\"font-weight: bold;\">" + _this._popupContentLength + "</span>";
            popupHtml += "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>";
            popupHtml += "<span class=\"current-popup-layer-name\"></span>";
            popupHtml += '</div>';
            popupHtml += '<div class="ol-popup-inner">';
            popupHtml += '</div>';
            _this._$popupContent.html(popupHtml);
            _this._$popupContent.find('.previous-popup').click(function () {
                if (_this._popupContentLength == 1) {
                    return;
                }
                if (_this._currentPopupIndex == 0) {
                    _this._currentPopupIndex = _this._popupContentLength - 1;
                }
                else {
                    _this._currentPopupIndex--;
                }
                _this._triggerFeatSelect();
            });
            var nextPopup = _this._$popupContent.find('.next-popup');
            nextPopup.click(function () {
                if (_this._popupContentLength == 1 && _this._currentPopupIndex > -1) {
                    return;
                }
                if (_this._currentPopupIndex == _this._popupContentLength - 1) {
                    _this._currentPopupIndex = 0;
                }
                else {
                    _this._currentPopupIndex++;
                }
                _this._triggerFeatSelect();
            });
            if (_this._popupContentLength > 0) {
                nextPopup.trigger('click');
                _this._popupOverlay.setPosition(_this._popupCoordinate);
                _this._$popupContent.scrollTop(0);
                _this._popupOpen = true;
            }
        });
        //change mouse cursor when over marker
        this._map.on('pointermove', function (evt) {
            if (evt['dragging']) {
                return;
            }
            var pixel = _this.map.getEventPixel(evt['originalEvent']);
            var hit = _this.map.hasFeatureAtPixel(pixel, function (lyrCandidate) {
                for (var _i = 0, _a = _this._arrPopupOlLayers; _i < _a.length; _i++) {
                    var olLayer = _a[_i];
                    if (lyrCandidate == olLayer) {
                        return true;
                    }
                }
                return false;
            });
            var mapElement = _this.map.getTargetElement();
            mapElement.style.cursor = hit ? 'pointer' : '';
        });
        return true;
    };
    /**
     * helper to select features
     * @private
     */
    MapPopupCls.prototype._triggerFeatSelect = function () {
        var $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
        var $innerPopup = this._$popupContent.find('.ol-popup-inner');
        var $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
        this.clearSelection();
        var lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
        $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
        $layerNameSpan.html(lyrFeatObj.layerName);
        $innerPopup.html(lyrFeatObj.popupContent);
        lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
        for (var _i = 0, _a = this._popupChangedFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f(this._$popupContent);
        }
    };
    /**
     *
     * @param feature - the ol feature
     * @param {LayerEsriMapServer} lyr - the map server layer
     * @param {string} popupContent - popup content
     * @param {string} esriName - esri layer name
     */
    MapPopupCls.prototype.addMapServicePopupContent = function (feature, lyr, popupContent, esriName) {
        var featLayerObject = new FeatureLayerProperties(feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName);
        featLayerObject.popupContent = popupContent;
        this._passThroughLayerFeatureArray.push(featLayerObject);
        this._popupContentLength++;
        $('.popup-content-length').html(this._popupContentLength.toFixed());
        if (!this._popupOpen) {
            this._$popupContent.find('.next-popup').trigger('click');
            this._popupOverlay.setPosition(this._popupCoordinate);
            this._$popupContent.scrollTop(0);
            this._popupOpen = true;
        }
    };
    /**
     *
     * @param  pixel - the ol pixel
     * @returns  feature layer properties
     * @private
     */
    MapPopupCls.prototype._featuresAtPixel = function (pixel) {
        var _this = this;
        var layerFeatureObjectArray = [];
        this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            var lyrIndex = _this._arrPopupOlLayers.indexOf(layer);
            if (lyrIndex > -1) {
                layerFeatureObjectArray.push(new FeatureLayerProperties(feature, _this._arrPopupLayers[lyrIndex], lyrIndex, _this._selectionLayers[lyrIndex]));
            }
        });
        return layerFeatureObjectArray;
    };
    MapPopupCls.prototype.closePopup = function () {
        this._checkInit();
        this._popupOpen = false;
        this._popupOverlay.setPosition(undefined);
        this._$popupCloser[0].blur();
        this.clearSelection();
        this._$popupContent.html('');
        return false;
    };
    ;
    /**
     *
     * @param chgFunction - popup change function
     */
    MapPopupCls.prototype.addPopupChangedFunction = function (chgFunction) {
        this._popupChangedFunctions.push(chgFunction);
    };
    /**
     *
     * @param {LayerBase|*} lyr - the layer being acted on
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns  the new selection layer
     * @private
     */
    MapPopupCls.prototype._addPopupLayer = function (lyr, selectionStyle) {
        this._checkInit();
        selectionStyle = selectionStyle || {};
        selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
        selectionStyle.width = selectionStyle.width || 10;
        var theStyle;
        if (selectionStyle.olStyle) {
            theStyle = selectionStyle.olStyle;
        }
        else {
            theStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: selectionStyle.color,
                    width: selectionStyle.width
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: selectionStyle.color }),
                    stroke: new ol.style.Stroke({ color: selectionStyle.color, width: 1 })
                }),
                fill: new ol.style.Fill({
                    color: selectionStyle.color
                })
            });
        }
        var selectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: theStyle
        });
        selectionLayer.setZIndex(100);
        this._selectionLayers.push(selectionLayer);
        this._selectionLayerLookup[lyr.id] = selectionLayer;
        this.map.addLayer(selectionLayer);
        return selectionLayer;
    };
    /**
     * Add popup to the map
     * @param {LayerBase|*} lyr The layer that the popup with act on
     * @param {popupCallback} popupContentFunction - popup content function that makes popup info
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addVectorPopup = function (lyr, popupContentFunction, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._arrPopupLayerIds.push(lyr.id);
        this._arrPopupLayerNames.push(lyr.name);
        this._arrPopupLayers.push(lyr);
        this._arrPopupOlLayers.push(lyr.olLayer);
        this._arrPopupContentFunction.push(popupContentFunction);
        return selectionLayer;
    };
    ;
    /**
     *
     * @param {LayerBase} lyr - layer
     */
    MapPopupCls.prototype.removeVectorPopup = function (lyr) {
        var idx = this._arrPopupLayerIds.indexOf(lyr.id);
        if (idx > -1) {
            this._arrPopupLayerIds.splice(idx, 1);
            this._arrPopupLayerNames.splice(idx, 1);
            this._arrPopupLayers.splice(idx, 1);
            this._arrPopupOlLayers.splice(idx, 1);
            this._arrPopupContentFunction.splice(idx, 1);
            this._selectionLayers.splice(idx, 1);
            delete this._selectionLayerLookup[lyr.id];
        }
    };
    /**
     *
     * @param {LayerEsriMapServer} lyr - map server layer
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    MapPopupCls.prototype.addMapServicePopup = function (lyr, selectionStyle) {
        var selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._esriMapServiceLayers.push(lyr);
        return selectionLayer;
    };
    MapPopupCls.prototype.clearSelection = function () {
        this._checkInit();
        for (var i = 0; i < this._selectionLayers.length; i++) {
            this._selectionLayers[i].getSource().clear();
        }
        for (var _i = 0, _a = this._mapClickFunctions; _i < _a.length; _i++) {
            var f = _a[_i];
            f();
        }
    };
    ;
    /**
     * Add a function to be called when the map is clicked but before any popups are implemented
     * @param {function} func - the map click function
     */
    MapPopupCls.prototype.addMapClickFunction = function (func) {
        this._mapClickFunctions.push(func);
    };
    return MapPopupCls;
}(mapInteractionBase_1.default));
exports.MapPopupCls = MapPopupCls;
nm.MapPopupCls = MapPopupCls;
exports.default = MapPopupCls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwUG9wdXBDbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBQb3B1cENscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7Ozs7Ozs7Ozs7OztBQUVILDJEQUFzRDtBQUV0RCwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBR2pDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBMEJoQztJQVNJOzs7Ozs7O09BT0c7SUFDSCxnQ0FBWSxPQUFtQixFQUFFLEtBQXlDLEVBQUUsVUFBa0IsRUFBRSxjQUErQixFQUFFLGFBQXNCO1FBQ25KLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxhQUFhLElBQUksUUFBUSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDdEYsQ0FBQztJQUVELHNCQUFJLDZDQUFTO2FBQWI7WUFDSSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQzs7O09BQUE7SUFDTCw2QkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksd0RBQXNCO0FBbUNuQzs7O0dBR0c7QUFDSDtJQUFpQywrQkFBa0I7SUFxQi9DOzs7OztPQUtHO0lBR0g7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QWtCLEdBeWNsRDtBQXpjWSxrQ0FBVztBQTBjeEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDN0Isa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTEvMy8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBNYXBJbnRlcmFjdGlvbkJhc2UgZnJvbSAnLi9tYXBJbnRlcmFjdGlvbkJhc2UnO1xyXG5pbXBvcnQgcHJvcGVydGllc1pvb21TdHlsZSBmcm9tICcuLi9vbEhlbHBlcnMvcHJvcGVydGllc1pvb21TdHlsZSc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQge0xheWVyQmFzZVZlY3Rvcn0gZnJvbSBcIi4uL2xheWVycy9MYXllckJhc2VWZWN0b3JcIjtcclxuaW1wb3J0IExheWVyRXNyaU1hcFNlcnZlciBmcm9tIFwiLi4vbGF5ZXJzL0xheWVyRXNyaU1hcFNlcnZlclwiO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuY29uc3Qgbm0gPSBwcm92aWRlKCdvbEhlbHBlcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9wdXBDaGFuZ2VkRnVuY3Rpb24ge1xyXG4gICAgKCRwb3BDb250ZW50OiBKUXVlcnkpOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBwb3B1cENhbGxiYWNrIHtcclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBwb3B1cFxyXG4gICAgICogQHBhcmFtIGZlYXR1cmVQcm9wZXJ0aWVzXHJcbiAgICAgKiBAcGFyYW0ganFSZWZcclxuICAgICAqL1xyXG4gICAgKGZlYXR1cmVQcm9wZXJ0aWVzOiBPYmplY3QsIGpxUmVmPzogSlF1ZXJ5KTogc3RyaW5nIHwgYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIG1hcEV2ZW50IHtcclxuICAgIGNvb3JkaW5hdGU6IG9sLkNvb3JkaW5hdGU7XHJcbiAgICBwaXhlbDogb2wuUGl4ZWw7XHJcbiAgICBkcmFnZ2luZzogYm9vbGVhbnxhbnk7XHJcbiAgICBvcmlnaW5hbEV2ZW50OiBFdmVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlTGF5ZXJQcm9wZXJ0aWVzIHtcclxuXHJcbiAgICBmZWF0dXJlOiBvbC5GZWF0dXJlO1xyXG4gICAgbGF5ZXI6IExheWVyQmFzZVZlY3RvcnxMYXllckVzcmlNYXBTZXJ2ZXI7XHJcbiAgICBsYXllckluZGV4OiBudW1iZXI7XHJcbiAgICBzZWxlY3Rpb25MYXllcjogb2wubGF5ZXIuVmVjdG9yO1xyXG4gICAgcG9wdXBDb250ZW50OiBzdHJpbmc7XHJcbiAgICBlc3JpTGF5ZXJOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGZlYXR1cmUgdGhlIGZlYXR1cmVcclxuICAgICAqIEBwYXJhbSBsYXllciAtIHRoZSBsYXllciBpbiB0aGUgcG9wdXBcclxuICAgICAqIEBwYXJhbSBsYXllckluZGV4IC0gaW5kZXggb2YgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0aW9uTGF5ZXIgLSB0aGUgb2wgc2VsZWN0aW9uIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gW2VzcmlMYXllck5hbWU9dW5kZWZpbmVkXSAtIGVzcmkgbGF5ZXIgbmFtZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihmZWF0dXJlOiBvbC5GZWF0dXJlLCBsYXllcjogTGF5ZXJCYXNlVmVjdG9yfExheWVyRXNyaU1hcFNlcnZlciwgbGF5ZXJJbmRleDogbnVtYmVyLCBzZWxlY3Rpb25MYXllcjogb2wubGF5ZXIuVmVjdG9yLCBlc3JpTGF5ZXJOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcclxuICAgICAgICB0aGlzLmxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5sYXllckluZGV4ID0gbGF5ZXJJbmRleDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkxheWVyID0gc2VsZWN0aW9uTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5wb3B1cENvbnRlbnQgPSAnJztcclxuICAgICAgICB0aGlzLmVzcmlMYXllck5hbWUgPSB0eXBlb2YgZXNyaUxheWVyTmFtZSA9PSAnc3RyaW5nJyA/IGVzcmlMYXllck5hbWUgOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxheWVyTmFtZSgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZXNyaUxheWVyTmFtZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lc3JpTGF5ZXJOYW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogbWFwIHBvcHVwIGNsYXNzXHJcbiAqIEBhdWdtZW50cyBNYXBJbnRlcmFjdGlvbkJhc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBQb3B1cENscyBleHRlbmRzIE1hcEludGVyYWN0aW9uQmFzZSB7XHJcbiAgICBwcml2YXRlIF9wb3B1cE9wZW46IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5OiBBcnJheTxGZWF0dXJlTGF5ZXJQcm9wZXJ0aWVzPjtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRQb3B1cEluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9wb3B1cENvbnRlbnRMZW5ndGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2VzcmlNYXBTZXJ2aWNlTGF5ZXJzOiBBcnJheTxMYXllckVzcmlNYXBTZXJ2ZXI+O1xyXG4gICAgcHJpdmF0ZSBfJHBvcHVwQ2xvc2VyOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIF8kcG9wdXBDb250ZW50OiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIF8kcG9wdXBDb250YWluZXI6IEpRdWVyeTtcclxuICAgIHByaXZhdGUgX3BvcHVwT3ZlcmxheTogb2wuT3ZlcmxheTtcclxuICAgIHByaXZhdGUgX2FyclBvcHVwTGF5ZXJzOiBBcnJheTxMYXllckJhc2VWZWN0b3I+O1xyXG4gICAgcHJpdmF0ZSBfcG9wdXBDb29yZGluYXRlOiBvbC5Db29yZGluYXRlO1xyXG4gICAgcHJpdmF0ZSBfcG9wdXBDaGFuZ2VkRnVuY3Rpb25zOiBBcnJheTxwb3B1cENoYW5nZWRGdW5jdGlvbj47XHJcbiAgICBwcml2YXRlIF9tYXBDbGlja0Z1bmN0aW9uczogQXJyYXk8RnVuY3Rpb24+O1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0aW9uTGF5ZXJMb29rdXA6IE9iamVjdDtcclxuICAgIHByaXZhdGUgX2FyclBvcHVwTGF5ZXJJZHM6IEFycmF5PHN0cmluZz47XHJcbiAgICBwcml2YXRlIF9hcnJQb3B1cExheWVyTmFtZXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBwcml2YXRlIF9hcnJQb3B1cE9sTGF5ZXJzOiBBcnJheTxvbC5sYXllci5WZWN0b3I+O1xyXG4gICAgcHJpdmF0ZSBfYXJyUG9wdXBDb250ZW50RnVuY3Rpb246IEFycmF5PHBvcHVwQ2FsbGJhY2s+O1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0aW9uTGF5ZXJzOiBBcnJheTxvbC5sYXllci5WZWN0b3I+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pdGlvbiBmb3Igb3BlbmxheWVycyBzdHlsZSBmdW5jdGlvblxyXG4gICAgICogQGNhbGxiYWNrIG9sU3R5bGVGdW5jdGlvblxyXG4gICAgICogJnBhcmFtIGZlYXR1cmUgdGhlIG9wZW5sYXllcnMgdmVjdG9yIGZlYXR1cmVcclxuICAgICAqICRwYXJhbVxyXG4gICAgICovXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFwIHBvcHVwIGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCdtYXAgcG9wdXAnKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVySWRzID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllck5hbWVzID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cE9sTGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBDb250ZW50RnVuY3Rpb24gPSBbXTtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDb250YWluZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDbG9zZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBPdmVybGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVyTG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5fbWFwQ2xpY2tGdW5jdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9sZXQgYSA9IGZ1bmN0aW9uKCRqcXVlcnlDb250ZW50KXtjb25zb2xlLmxvZygkanF1ZXJ5Q29udGVudCl9O1xyXG4gICAgICAgIC8vdGhpcy5fcG9wdXBDaGFuZ2VkTG9va3VwID0geydhJzogYX07XHJcbiAgICAgICAgdGhpcy5fcG9wdXBDaGFuZ2VkRnVuY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5fZXNyaU1hcFNlcnZpY2VMYXllcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fcG9wdXBPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBDb29yZGluYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCA9IDA7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFwIHBvcHVwIGluaXRpYWxpemF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge29sLk1hcH0gdGhlTWFwIC0gdGhlIG9sIG1hcFxyXG4gICAgICovXHJcbiAgICBpbml0KHRoZU1hcDogb2wuTWFwKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh0aGVNYXApO1xyXG5cclxuICAgICAgICBsZXQgJG1hcDtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5tYXAuZ2V0VGFyZ2V0KCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICRtYXAgPSAkKCcjJyArIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkbWFwID0gJCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJG1hcC5hcHBlbmQoXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib2wtcG9wdXBcIj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib2wtcG9wdXAtY2xvc2VyXCI+WDwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwb3B1cC1jb250ZW50XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ29udGFpbmVyID0gJG1hcC5maW5kKCcub2wtcG9wdXAnKTtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50ID0gJG1hcC5maW5kKCcucG9wdXAtY29udGVudCcpO1xyXG4gICAgICAgIHRoaXMuXyRwb3B1cENsb3NlciA9ICRtYXAuZmluZCgnLm9sLXBvcHVwLWNsb3NlcicpO1xyXG5cclxuICAgICAgICBsZXQgX2Vhc2UgPSAobjogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG9sLmVhc2luZy5pbkFuZE91dChuKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcG9wdXBPdmVybGF5ID0gbmV3IG9sLk92ZXJsYXkoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLl8kcG9wdXBDb250YWluZXJbMF0sXHJcbiAgICAgICAgICAgIGF1dG9QYW46IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9QYW5BbmltYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyNTAsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoZU1hcC5nZXRWaWV3KCkuZ2V0Q2VudGVyKCksXHJcbiAgICAgICAgICAgICAgICBlYXNpbmc6IF9lYXNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwLmFkZE92ZXJsYXkodGhpcy5fcG9wdXBPdmVybGF5KTtcclxuXHJcbiAgICAgICAgdGhpcy5fJHBvcHVwQ2xvc2VyLmNsaWNrKChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGRpc3BsYXkgcG9wdXAgb24gY2xpY2tcclxuICAgICAgICB0aGlzLl9tYXAub24oJ3NpbmdsZWNsaWNrJywgKGV2dCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvcHVwQ29vcmRpbmF0ZSA9IGV2dFsnY29vcmRpbmF0ZSddO1xyXG5cclxuICAgICAgICAgICAgLy8gZXNyaSBtYXAgc2VydmljZSBsYXllcnNcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2VzcmlNYXBTZXJ2aWNlTGF5ZXJzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnk6IGV2dFsnY29vcmRpbmF0ZSddLmpvaW4oJywnKSxcclxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeVR5cGU6ICdlc3JpR2VvbWV0cnlQb2ludCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiAnYWxsJyxcclxuICAgICAgICAgICAgICAgICAgICBzcjogdGhpcy5fbWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpLnNwbGl0KCc6JylbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwRXh0ZW50OiAodGhpcy5fbWFwLmdldFZpZXcoKS5jYWxjdWxhdGVFeHRlbnQodGhpcy5fbWFwLmdldFNpemUoKSkgYXMgbnVtYmVyW10pLmpvaW4oJywnKSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZURpc3BsYXk6ICh0aGlzLl9tYXAuZ2V0U2l6ZSgpIGFzIG51bWJlcltdKS5qb2luKCcsJykgKyAnLDk2JyxcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5HZW9tZXRyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b2xlcmFuY2U6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgIGY6ICdwanNvbidcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbCBvZiB0aGlzLl9lc3JpTWFwU2VydmljZUxheWVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGwuZ2V0UG9wdXBJbmZvKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGxheWVyRmVhdHVyZU9iamVjdEFycmF5ID0gdGhpcy5fZmVhdHVyZXNBdFBpeGVsKGV2dFsncGl4ZWwnXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyRmVhdHVyZU9iamVjdEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmVhdE9iaiA9IGxheWVyRmVhdHVyZU9iamVjdEFycmF5W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGZlYXRPYmouZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwQ29udGVudFJlc3BvbnNlID0gdGhpcy5fYXJyUG9wdXBDb250ZW50RnVuY3Rpb25bZmVhdE9iai5sYXllckluZGV4XShwcm9wcywgdGhpcy5fJHBvcHVwQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9za2lwIGlmIHJldHVybiB3YXMgZmFsc2VcclxuICAgICAgICAgICAgICAgIGlmIChwb3B1cENvbnRlbnRSZXNwb25zZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcG9wdXBDb250ZW50UmVzcG9uc2UgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0T2JqLnBvcHVwQ29udGVudCA9IHBvcHVwQ29udGVudFJlc3BvbnNlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5LnB1c2goZmVhdE9iaik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZlYXRPYmouc2VsZWN0aW9uTGF5ZXIuZ2V0U291cmNlKCkuYWRkRmVhdHVyZShmZWF0T2JqLmZlYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cENvbnRlbnRMZW5ndGggPSB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgICAgICBsZXQgcG9wdXBIdG1sID0gJzxkaXYgY2xhc3M9XCJvbC1wb3B1cC1uYXZcIj4nO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzxzcGFuIGNsYXNzPVwicHJldmlvdXMtcG9wdXAgb2wtcG9wdXAtbmF2LWFycm93XCI+JiM5NjY0Ozwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzxzcGFuIGNsYXNzPVwibmV4dC1wb3B1cCBvbC1wb3B1cC1uYXYtYXJyb3dcIj4mIzk2NTQ7PC9zcGFuPic7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSBgPHNwYW4gY2xhc3M9XCJjdXJyZW50LXBvcHVwLWl0ZW0tbnVtYmVyXCIgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDtcIj48L3NwYW4+YDtcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8c3Bhbj4mbmJzcDtvZiZuYnNwOzwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gYDxzcGFuIGNsYXNzPVwicG9wdXAtY29udGVudC1sZW5ndGhcIiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkO1wiPiR7dGhpcy5fcG9wdXBDb250ZW50TGVuZ3RofTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gYDxzcGFuPiZuYnNwOyZuYnNwOy0mbmJzcDsmbmJzcDs8L3NwYW4+YDtcclxuICAgICAgICAgICAgcG9wdXBIdG1sICs9IGA8c3BhbiBjbGFzcz1cImN1cnJlbnQtcG9wdXAtbGF5ZXItbmFtZVwiPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICBwb3B1cEh0bWwgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPGRpdiBjbGFzcz1cIm9sLXBvcHVwLWlubmVyXCI+JztcclxuXHJcbiAgICAgICAgICAgIHBvcHVwSHRtbCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuaHRtbChwb3B1cEh0bWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcucHJldmlvdXMtcG9wdXAnKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9IHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4LS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyRmVhdFNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXh0UG9wdXAgPSB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5uZXh0LXBvcHVwJyk7XHJcblxyXG4gICAgICAgICAgICBuZXh0UG9wdXAuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCA9PSAxICYmIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4ID09IHRoaXMuX3BvcHVwQ29udGVudExlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UG9wdXBJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQb3B1cEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyRmVhdFNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFBvcHVwLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3B1cE92ZXJsYXkuc2V0UG9zaXRpb24odGhpcy5fcG9wdXBDb29yZGluYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuc2Nyb2xsVG9wKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9wdXBPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NoYW5nZSBtb3VzZSBjdXJzb3Igd2hlbiBvdmVyIG1hcmtlclxyXG4gICAgICAgIHRoaXMuX21hcC5vbigncG9pbnRlcm1vdmUnLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnRbJ2RyYWdnaW5nJ10pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGl4ZWwgPSB0aGlzLm1hcC5nZXRFdmVudFBpeGVsKGV2dFsnb3JpZ2luYWxFdmVudCddKTtcclxuICAgICAgICAgICAgbGV0IGhpdCA9IHRoaXMubWFwLmhhc0ZlYXR1cmVBdFBpeGVsKHBpeGVsLCAobHlyQ2FuZGlkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvbExheWVyIG9mIHRoaXMuX2FyclBvcHVwT2xMYXllcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobHlyQ2FuZGlkYXRlID09IG9sTGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXBFbGVtZW50ID0gdGhpcy5tYXAuZ2V0VGFyZ2V0RWxlbWVudCgpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBtYXBFbGVtZW50LnN0eWxlLmN1cnNvciA9IGhpdCA/ICdwb2ludGVyJyA6ICcnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGhlbHBlciB0byBzZWxlY3QgZmVhdHVyZXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF90cmlnZ2VyRmVhdFNlbGVjdCgpIHtcclxuICAgICAgICBsZXQgJGN1cnJlbnRQb3B1cEl0ZW1OdW1iZXIgPSB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5jdXJyZW50LXBvcHVwLWl0ZW0tbnVtYmVyJyk7XHJcbiAgICAgICAgbGV0ICRpbm5lclBvcHVwID0gdGhpcy5fJHBvcHVwQ29udGVudC5maW5kKCcub2wtcG9wdXAtaW5uZXInKTtcclxuICAgICAgICBsZXQgJGxheWVyTmFtZVNwYW4gPSB0aGlzLl8kcG9wdXBDb250ZW50LmZpbmQoJy5jdXJyZW50LXBvcHVwLWxheWVyLW5hbWUnKTtcclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgbGV0IGx5ckZlYXRPYmogPSB0aGlzLl9wYXNzVGhyb3VnaExheWVyRmVhdHVyZUFycmF5W3RoaXMuX2N1cnJlbnRQb3B1cEluZGV4XTtcclxuICAgICAgICAkY3VycmVudFBvcHVwSXRlbU51bWJlci5odG1sKCh0aGlzLl9jdXJyZW50UG9wdXBJbmRleCArIDEpLnRvRml4ZWQoKSk7XHJcbiAgICAgICAgJGxheWVyTmFtZVNwYW4uaHRtbChseXJGZWF0T2JqLmxheWVyTmFtZSk7XHJcbiAgICAgICAgJGlubmVyUG9wdXAuaHRtbChseXJGZWF0T2JqLnBvcHVwQ29udGVudCk7XHJcbiAgICAgICAgbHlyRmVhdE9iai5zZWxlY3Rpb25MYXllci5nZXRTb3VyY2UoKS5hZGRGZWF0dXJlKGx5ckZlYXRPYmouZmVhdHVyZSk7XHJcbiAgICAgICAgZm9yIChsZXQgZiBvZiB0aGlzLl9wb3B1cENoYW5nZWRGdW5jdGlvbnMpIHtcclxuICAgICAgICAgICAgZih0aGlzLl8kcG9wdXBDb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBmZWF0dXJlIC0gdGhlIG9sIGZlYXR1cmVcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJFc3JpTWFwU2VydmVyfSBseXIgLSB0aGUgbWFwIHNlcnZlciBsYXllclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBvcHVwQ29udGVudCAtIHBvcHVwIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlc3JpTmFtZSAtIGVzcmkgbGF5ZXIgbmFtZVxyXG4gICAgICovXHJcbiAgICBhZGRNYXBTZXJ2aWNlUG9wdXBDb250ZW50KGZlYXR1cmU6IG9sLkZlYXR1cmUsIGx5cjogTGF5ZXJFc3JpTWFwU2VydmVyLCBwb3B1cENvbnRlbnQ6IHN0cmluZywgZXNyaU5hbWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgZmVhdExheWVyT2JqZWN0ID0gbmV3IEZlYXR1cmVMYXllclByb3BlcnRpZXMoXHJcbiAgICAgICAgICAgIGZlYXR1cmUsIGx5ciwgdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoLCB0aGlzLl9zZWxlY3Rpb25MYXllckxvb2t1cFtseXIuaWRdLCBlc3JpTmFtZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZmVhdExheWVyT2JqZWN0LnBvcHVwQ29udGVudCA9IHBvcHVwQ29udGVudDtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFzc1Rocm91Z2hMYXllckZlYXR1cmVBcnJheS5wdXNoKGZlYXRMYXllck9iamVjdCk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoKys7XHJcblxyXG4gICAgICAgICQoJy5wb3B1cC1jb250ZW50LWxlbmd0aCcpLmh0bWwodGhpcy5fcG9wdXBDb250ZW50TGVuZ3RoLnRvRml4ZWQoKSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcG9wdXBPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuZmluZCgnLm5leHQtcG9wdXAnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcG9wdXBPdmVybGF5LnNldFBvc2l0aW9uKHRoaXMuX3BvcHVwQ29vcmRpbmF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuXyRwb3B1cENvbnRlbnQuc2Nyb2xsVG9wKDApO1xyXG4gICAgICAgICAgICB0aGlzLl9wb3B1cE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHBpeGVsIC0gdGhlIG9sIHBpeGVsXHJcbiAgICAgKiBAcmV0dXJucyAgZmVhdHVyZSBsYXllciBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfZmVhdHVyZXNBdFBpeGVsKHBpeGVsOiBvbC5QaXhlbCk6IEFycmF5PEZlYXR1cmVMYXllclByb3BlcnRpZXM+IHtcclxuICAgICAgICBsZXQgbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuZm9yRWFjaEZlYXR1cmVBdFBpeGVsKHBpeGVsLCAoZmVhdHVyZTogb2wuRmVhdHVyZSwgbGF5ZXI6IG9sLmxheWVyLlZlY3RvcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbHlySW5kZXggPSB0aGlzLl9hcnJQb3B1cE9sTGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGx5ckluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyRmVhdHVyZU9iamVjdEFycmF5LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZlYXR1cmVMYXllclByb3BlcnRpZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUsIHRoaXMuX2FyclBvcHVwTGF5ZXJzW2x5ckluZGV4XSwgbHlySW5kZXgsIHRoaXMuX3NlbGVjdGlvbkxheWVyc1tseXJJbmRleF0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGF5ZXJGZWF0dXJlT2JqZWN0QXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuICAgICAgICB0aGlzLl9wb3B1cE9wZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wb3B1cE92ZXJsYXkuc2V0UG9zaXRpb24odW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDbG9zZXJbMF0uYmx1cigpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLl8kcG9wdXBDb250ZW50Lmh0bWwoJycpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2hnRnVuY3Rpb24gLSBwb3B1cCBjaGFuZ2UgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgYWRkUG9wdXBDaGFuZ2VkRnVuY3Rpb24oY2hnRnVuY3Rpb246IHBvcHVwQ2hhbmdlZEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBDaGFuZ2VkRnVuY3Rpb25zLnB1c2goY2hnRnVuY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJCYXNlfCp9IGx5ciAtIHRoZSBsYXllciBiZWluZyBhY3RlZCBvblxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtzZWxlY3Rpb25TdHlsZT17fV0gdGhlIHNlbGVjdGlvbiBzdHlsZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdGlvblN0eWxlLmNvbG9yPXJnYmEoMjU1LDE3MCwwLDAuNSldIHRoZSBzZWxlY3Rpb24gY29sb3JcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbc2VsZWN0aW9uU3R5bGUud2lkdGg9MTBdIHRoZSBzZWxlY3Rpb24gd2lkdGggZm9yIGxpbmVhciBmZWF0dXJlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IFtzZWxlY3Rpb25TdHlsZS5vbFN0eWxlPXVuZGVmaW5lZF0gYW4gb3BlbmxheWVycyBzdHlsZSBvYmplY3Qgb3IgZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm5zICB0aGUgbmV3IHNlbGVjdGlvbiBsYXllclxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2FkZFBvcHVwTGF5ZXIobHlyOiBMYXllckJhc2VWZWN0b3IsIHNlbGVjdGlvblN0eWxlOiB7Y29sb3I/OiBzdHJpbmcsIHdpZHRoPzogbnVtYmVyLCBvbFN0eWxlPzogb2wuc3R5bGUuU3R5bGV9KTogb2wubGF5ZXIuVmVjdG9yIHtcclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuXHJcbiAgICAgICAgc2VsZWN0aW9uU3R5bGUgPSBzZWxlY3Rpb25TdHlsZSB8fCB7fTtcclxuICAgICAgICBzZWxlY3Rpb25TdHlsZS5jb2xvciA9IHNlbGVjdGlvblN0eWxlLmNvbG9yIHx8ICdyZ2JhKDI1NSwxNzAsMCwwLjUpJztcclxuICAgICAgICBzZWxlY3Rpb25TdHlsZS53aWR0aCA9IHNlbGVjdGlvblN0eWxlLndpZHRoIHx8IDEwO1xyXG5cclxuICAgICAgICBsZXQgdGhlU3R5bGU7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3Rpb25TdHlsZS5vbFN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRoZVN0eWxlID0gc2VsZWN0aW9uU3R5bGUub2xTdHlsZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGVTdHlsZSA9IG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbC5zdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzZWxlY3Rpb25TdHlsZS5jb2xvcixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2VsZWN0aW9uU3R5bGUud2lkdGhcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbC5zdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogNyxcclxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2wuc3R5bGUuRmlsbCh7Y29sb3I6IHNlbGVjdGlvblN0eWxlLmNvbG9yfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtjb2xvcjogc2VsZWN0aW9uU3R5bGUuY29sb3IsIHdpZHRoOiAxfSlcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sLnN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzZWxlY3Rpb25TdHlsZS5jb2xvclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0aW9uTGF5ZXIgPSBuZXcgb2wubGF5ZXIuVmVjdG9yKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IG5ldyBvbC5zb3VyY2UuVmVjdG9yKCksXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogdGhlU3R5bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbkxheWVyLnNldFpJbmRleCgxMDApO1xyXG5cclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllcnMucHVzaChzZWxlY3Rpb25MYXllcik7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTGF5ZXJMb29rdXBbbHlyLmlkXSA9IHNlbGVjdGlvbkxheWVyO1xyXG4gICAgICAgIHRoaXMubWFwLmFkZExheWVyKHNlbGVjdGlvbkxheWVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbkxheWVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBwb3B1cCB0byB0aGUgbWFwXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyQmFzZXwqfSBseXIgVGhlIGxheWVyIHRoYXQgdGhlIHBvcHVwIHdpdGggYWN0IG9uXHJcbiAgICAgKiBAcGFyYW0ge3BvcHVwQ2FsbGJhY2t9IHBvcHVwQ29udGVudEZ1bmN0aW9uIC0gcG9wdXAgY29udGVudCBmdW5jdGlvbiB0aGF0IG1ha2VzIHBvcHVwIGluZm9cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0aW9uU3R5bGU9e31dIHRoZSBzZWxlY3Rpb24gc3R5bGUgY29uZmlndXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rpb25TdHlsZS5jb2xvcj1yZ2JhKDI1NSwxNzAsMCwwLjUpXSB0aGUgc2VsZWN0aW9uIGNvbG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3NlbGVjdGlvblN0eWxlLndpZHRoPTEwXSB0aGUgc2VsZWN0aW9uIHdpZHRoIGZvciBsaW5lYXIgZmVhdHVyZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBbc2VsZWN0aW9uU3R5bGUub2xTdHlsZT11bmRlZmluZWRdIGFuIG9wZW5sYXllcnMgc3R5bGUgb2JqZWN0IG9yIGZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBhIHJlZmVyZW5jZSB0byB0aGUgb2wgc2VsZWN0aW9uIGxheWVyXHJcbiAgICAgKi9cclxuICAgIGFkZFZlY3RvclBvcHVwKGx5cjogTGF5ZXJCYXNlVmVjdG9yLCBwb3B1cENvbnRlbnRGdW5jdGlvbjogcG9wdXBDYWxsYmFjayxcclxuICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0eWxlPzoge2NvbG9yPzogc3RyaW5nLCB3aWR0aD86IG51bWJlciwgb2xTdHlsZT86IG9sLnN0eWxlLlN0eWxlfSkge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25MYXllciA9IHRoaXMuX2FkZFBvcHVwTGF5ZXIobHlyLCBzZWxlY3Rpb25TdHlsZSk7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcklkcy5wdXNoKGx5ci5pZCk7XHJcbiAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllck5hbWVzLnB1c2gobHlyLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwTGF5ZXJzLnB1c2gobHlyKTtcclxuICAgICAgICB0aGlzLl9hcnJQb3B1cE9sTGF5ZXJzLnB1c2gobHlyLm9sTGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuX2FyclBvcHVwQ29udGVudEZ1bmN0aW9uLnB1c2gocG9wdXBDb250ZW50RnVuY3Rpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uTGF5ZXI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyQmFzZX0gbHlyIC0gbGF5ZXJcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVmVjdG9yUG9wdXAobHlyKSB7XHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuX2FyclBvcHVwTGF5ZXJJZHMuaW5kZXhPZihseXIuaWQpO1xyXG5cclxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllcklkcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyUG9wdXBMYXllck5hbWVzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJQb3B1cExheWVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyUG9wdXBPbExheWVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyUG9wdXBDb250ZW50RnVuY3Rpb24uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbkxheWVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3NlbGVjdGlvbkxheWVyTG9va3VwW2x5ci5pZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJFc3JpTWFwU2VydmVyfSBseXIgLSBtYXAgc2VydmVyIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW3NlbGVjdGlvblN0eWxlPXt9XSB0aGUgc2VsZWN0aW9uIHN0eWxlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0aW9uU3R5bGUuY29sb3I9cmdiYSgyNTUsMTcwLDAsMC41KV0gdGhlIHNlbGVjdGlvbiBjb2xvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzZWxlY3Rpb25TdHlsZS53aWR0aD0xMF0gdGhlIHNlbGVjdGlvbiB3aWR0aCBmb3IgbGluZWFyIGZlYXR1cmVzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gW3NlbGVjdGlvblN0eWxlLm9sU3R5bGU9dW5kZWZpbmVkXSBhbiBvcGVubGF5ZXJzIHN0eWxlIG9iamVjdCBvciBmdW5jdGlvblxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gYSByZWZlcmVuY2UgdG8gdGhlIG9sIHNlbGVjdGlvbiBsYXllclxyXG4gICAgICovXHJcbiAgICBhZGRNYXBTZXJ2aWNlUG9wdXAobHlyLCBzZWxlY3Rpb25TdHlsZT86IG9sLnN0eWxlLlN0eWxlfEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5TdHlsZUZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkxheWVyID0gdGhpcy5fYWRkUG9wdXBMYXllcihseXIsIHNlbGVjdGlvblN0eWxlKTtcclxuICAgICAgICB0aGlzLl9lc3JpTWFwU2VydmljZUxheWVycy5wdXNoKGx5cik7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25MYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclNlbGVjdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NlbGVjdGlvbkxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25MYXllcnNbaV0uZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgZiBvZiB0aGlzLl9tYXBDbGlja0Z1bmN0aW9ucykge1xyXG4gICAgICAgICAgICBmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBtYXAgaXMgY2xpY2tlZCBidXQgYmVmb3JlIGFueSBwb3B1cHMgYXJlIGltcGxlbWVudGVkXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gdGhlIG1hcCBjbGljayBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBhZGRNYXBDbGlja0Z1bmN0aW9uKGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwQ2xpY2tGdW5jdGlvbnMucHVzaChmdW5jKTtcclxuICAgIH1cclxufVxyXG5ubS5NYXBQb3B1cENscyA9IE1hcFBvcHVwQ2xzO1xyXG5leHBvcnQgZGVmYXVsdCBNYXBQb3B1cENscztcclxuIl19

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/15/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var $ = __webpack_require__(1);
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param [options={}] config options
 * @param [options.divId=map] map div id
 * @param [options.center={}] center config object
 * @param [options.center.x=-10018378] center x, web mercator x or lon
 * @param [options.center.y=5574910] center y, web mercator y or lat
 * @param [options.zoom=7] zoom level
 * @param [options.minZoom=undefined] min zoom
 * @param [options.maxZoom=undefined] max zoom
 * @param [options.baseSwitcher=true] if add base map switcher
 * @param [options.fullScreen=false] if add base map switcher
 * @returns the ol map
 */
function quickMapBase(options) {
    options = options || {};
    options.divId = options.divId || 'map';
    options.center = options.center || { x: -10018378, y: 5574910 };
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;
    options.fullScreen = typeof options.fullScreen == 'boolean' ? options.fullScreen : false;
    var $mapDiv = $('#' + options.divId);
    $mapDiv.css('position', 'relative');
    var osmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    // let satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'})});
    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";
    if (options.baseSwitcher) {
        //  let switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        //  switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        //  switcherContent += `height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ${aerialCss};`;
        //  switcherContent += '"></div>';
        //  $mapDiv.append(switcherContent);
        //
        // $mapDiv.find('.base-map-switcher').click(function() {
        //      "use strict";
        //      osmLayer.setVisible(!osmLayer.getVisible());
        //      satLayer.setVisible(!satLayer.getVisible());
        //
        //      if (osmLayer.getVisible()){
        //          $(this).css('background', aerialCss);
        //      } else {
        //          $(this).css('background', osmCss);
        //      }
        //  });
    }
    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }
    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new ol.geom.Point([options.center.x, options.center.y]);
        new ol.proj.Projection({ code: "EPSG:4326" });
        p.transform(new ol.proj.Projection({ code: "EPSG:4326" }), new ol.proj.Projection({ code: "EPSG:3857" }));
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }
    var controls = ol.control.defaults({
        attributionOptions: { collapsible: false }
    });
    var view = new ol.View({
        center: [options.center.x, options.center.y],
        zoom: options.zoom,
        minZoom: options.minZoom,
        maxZoom: options.maxZoom
    });
    var map = new ol.Map({
        layers: [osmLayer],
        target: options.divId,
        controls: controls,
        view: view
    });
    if (options.fullScreen) {
        map.addControl(new ol.control.FullScreen({}));
    }
    return map;
}
exports.quickMapBase = quickMapBase;
nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tNYXBCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVpY2tNYXBCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7QUFFSCwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUM3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBWWhDOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILHNCQUE2QixPQUF5QjtJQUNsRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQXFCLENBQUM7SUFDM0MsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztJQUN2QyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBQzlELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsRSxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sT0FBTyxDQUFDLFlBQVksSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDOUYsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxVQUFVLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBR3pGLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXBDLElBQUksUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVB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RUgsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDZixDQUFDO0FBNUVELG9DQTRFQztBQUVELEVBQUUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQy9CLGtCQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzE1LzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHF1aWNrTWFwT3B0aW9ucyB7XHJcbiAgICBkaXZJZD86IHN0cmluZztcclxuICAgIGNlbnRlcj86IHt4OiBudW1iZXIsIHk6IG51bWJlcn07XHJcbiAgICB6b29tPzogbnVtYmVyO1xyXG4gICAgbWluWm9vbT86IG51bWJlcjtcclxuICAgIG1heFpvb20/OiBudW1iZXI7XHJcbiAgICBiYXNlU3dpdGNoZXI/OiBib29sZWFuO1xyXG4gICAgZnVsbFNjcmVlbj86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHVwIGEgbWFwIHdpdGggc29tZSBkZWZhdWx0IHBhcmFtZXRlcnMgYW5kIGluaXRpYWxpemVzXHJcbiAqIG1hcE1vdmUgYW5kIG1hcFBvcHVwXHJcbiAqXHJcbiAqIEBwYXJhbSBbb3B0aW9ucz17fV0gY29uZmlnIG9wdGlvbnNcclxuICogQHBhcmFtIFtvcHRpb25zLmRpdklkPW1hcF0gbWFwIGRpdiBpZFxyXG4gKiBAcGFyYW0gW29wdGlvbnMuY2VudGVyPXt9XSBjZW50ZXIgY29uZmlnIG9iamVjdFxyXG4gKiBAcGFyYW0gW29wdGlvbnMuY2VudGVyLng9LTEwMDE4Mzc4XSBjZW50ZXIgeCwgd2ViIG1lcmNhdG9yIHggb3IgbG9uXHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5jZW50ZXIueT01NTc0OTEwXSBjZW50ZXIgeSwgd2ViIG1lcmNhdG9yIHkgb3IgbGF0XHJcbiAqIEBwYXJhbSBbb3B0aW9ucy56b29tPTddIHpvb20gbGV2ZWxcclxuICogQHBhcmFtIFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSBtaW4gem9vbVxyXG4gKiBAcGFyYW0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIG1heCB6b29tXHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5iYXNlU3dpdGNoZXI9dHJ1ZV0gaWYgYWRkIGJhc2UgbWFwIHN3aXRjaGVyXHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5mdWxsU2NyZWVuPWZhbHNlXSBpZiBhZGQgYmFzZSBtYXAgc3dpdGNoZXJcclxuICogQHJldHVybnMgdGhlIG9sIG1hcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHF1aWNrTWFwQmFzZShvcHRpb25zPzogcXVpY2tNYXBPcHRpb25zKTogb2wuTWFwIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IGFzIHF1aWNrTWFwT3B0aW9ucztcclxuICAgIG9wdGlvbnMuZGl2SWQgPSBvcHRpb25zLmRpdklkIHx8ICdtYXAnO1xyXG4gICAgb3B0aW9ucy5jZW50ZXIgPSBvcHRpb25zLmNlbnRlciB8fCB7eDogLTEwMDE4Mzc4LCB5OiA1NTc0OTEwfTtcclxuICAgIG9wdGlvbnMuem9vbSA9IHR5cGVvZiBvcHRpb25zLnpvb20gPT0gJ251bWJlcicgPyBvcHRpb25zLnpvb20gOiA3O1xyXG4gICAgb3B0aW9ucy5iYXNlU3dpdGNoZXIgPSB0eXBlb2Ygb3B0aW9ucy5iYXNlU3dpdGNoZXIgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5iYXNlU3dpdGNoZXIgOiB0cnVlO1xyXG4gICAgb3B0aW9ucy5mdWxsU2NyZWVuID0gdHlwZW9mIG9wdGlvbnMuZnVsbFNjcmVlbiA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmZ1bGxTY3JlZW4gOiBmYWxzZTtcclxuXHJcblxyXG4gICAgbGV0ICRtYXBEaXYgPSAkKCcjJyArIG9wdGlvbnMuZGl2SWQpO1xyXG4gICAgJG1hcERpdi5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcblxyXG4gICAgbGV0IG9zbUxheWVyID0gbmV3IG9sLmxheWVyLlRpbGUoe3NvdXJjZTogbmV3IG9sLnNvdXJjZS5PU00oKX0pO1xyXG4gICAgLy8gbGV0IHNhdExheWVyID0gbmV3IG9sLmxheWVyLlRpbGUoe3Zpc2libGU6IGZhbHNlLCBzb3VyY2U6IG5ldyBvbC5zb3VyY2UuTWFwUXVlc3Qoe2xheWVyOiAnc2F0J30pfSk7XHJcblxyXG4gICAgbGV0IG9zbUNzcyA9IFwidXJsKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURBQUFBQXdDQU1BQUFCZzNBbTFBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFNQVVFeFVSUUFBQURRMU5EazVPVVJGUkV0TFMxRkhTRmxaV0dKUlZHSmlZV2RtWld4c2JIUm1hWEJwYW5OMGMzVjBkSHA1ZVg1K2ZJVnpkNEYzZWVWMGp1ZDVqdVo4azRhSGhvbUhob3lHaDVlR2o1T1ZsSmlWbFppWWw1cVptSnlkbktPVGxhS1ptcUtkbmFPaW9hcXFxS3V6c2JPdnJyU3lzTGEzdGJXNHVMbTZ1YjI3dWIrL3ZiR1h3YkNad2JDZ3hMS2x4ck9xeUxTdHliTzN5clN4eXJXenpiVzJ5N2ExemJLNHk3VzZ6Ylc4eTc2MHlyVEF6YlRGenJQS3pyTE96clRKenJUT3pyN0N3YlhDMExYSzBMVE8wTDNJMGJQUXo3VFF6N1BTMGJYUTBMblIwYnJXMWJ6VDByN1UwNzdWMUx6YzJkcU5xdGVVc2R5WHNjYXF1dU9IbmVhR211ZUhuT2VKbnVpQmxlaUtuK2VOb09pT29PV1VwT2lSbytpU3BlaVVwZXFZcHVtYXFPbWRyUFN5bmVtZ3J1U3F0T21pc09tbHN1dXF0ZXF1dU9XMXZPdXh1K3V4dk9xMXZlK3h2UEswcHZXM28vVzVwZk81cXZTN3FmQ3d2TU91d2MyL3dOZW54Tnl5ek5lLzBOcTMxTnE1MWR5NzJPeTN3T3U0d091K3hleTR3Tys2eE8yK3hmVEFyL1RDc3ZmRnRQSEx2dlRKdU1QRHdNZkh4Y1hLeWMzRHhNdkZ5TXZMeU0zUHpjRFYwOERWMU1UWDFjYlkxczdYMXNqWjFzcmEyTW5kM003YjJjN2MydGZIMXRuQjF0N0YyZDdNMjlmWDF0TFkxdERkMnRIZTNOVGYzTm5TMTlyWjF0dmEyTm5mM3QzZDI4cmgzdFhnM05uaDN0emozOTNrMzluaTRON2s0TjduNXVYRHlPZkx6K3pBeHUzQ3lPekV5ZXpLemVESjNlTE0zdXZQMHUzUDBlUGYyKzdSMHU3UTF1L1UwKzdVMWV6YzArN2EyZS9kMiszZjN2YkZ6dkxPd2ZITjBQUFF3L1RVeC9MV3l2TFl6UERRMWZQZTB1YmM0dnZlNHVIaDMrbmgzKy9oMnUvaDN2SGoydkhsM3VIbTRlVG40dURwNWVibzQrWG81T0RxNmVicTZPVHY2K25sNCsvajRPN2w0ZTduNXVqcDQrbnA1T3pxNWU3czV1cnQ2Tzd0Nk9ydzZ1N3g2dTN4N3ZQajVQRGw0ZkRvNHZEcTVmRHQ1dkR1NlBEdjdQVHY2ZkR4NnZIeDdmSDE3Zlh3NmZYeTdmYjA3L2J6OGZUMTh2bjM4dnIzOWZyNDgvcjU5UHI2K1AzKysvLysvZ0FBQUxOVFNrMEFBQUVBZEZKT1UvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vd0JUOXdjbEFBQUFDWEJJV1hNQUFBN0RBQUFPd3dISGI2aGtBQUFBR0hSRldIUlRiMlowZDJGeVpRQndZV2x1ZEM1dVpYUWdOQzR3TGpsc00zNU9BQUFGTkVsRVFWUklTMVZWQ1p4VlV4aS85bDBVSVVUMmJNblk0M2JWSTJjMFkwMWtTV0lhUzBqMkpFdGtONDFwaW9tWnJQUEtRMmFRN0pLSW1PWmxubTI0OTNUSnpEdWZ1VTFaaSt2L2ZlZSttWi8vNzkzdm5QT2Q3enZmZXM1ekRCRVprQkJqQWNJamIrSWlvdHFnZGhhdDhBTUswdmw3L1I5TjdHaVd0c2hxSXIrRVo1Z1lLaWJ5VXNYWTFsL21mRnBzc3ZVbFdRMEZrVTNneTQrUkIvK2t3WWNPOHBSU25sZGNPVS9yMmxBSEFSU3drMk9SZ0VtT2RDMUVzdVJpWVNxTVB3d3JvTUlyYVprNVYyZllKUWpDS2ZaclJtaDNnU0FaaTJpNGI3d1N5bFd1OEVxWndTNTlKa0ZVYVc5NkpiTlNjK0NFVW10NHJvcnd1Wm1XZERhb2MrdVpFVHVRbFRDVTV4WXpSN211VW5WVVZvK0JjUmhyZS9Wd1VwYXNnSndoSDdKa1lJWUEwc054aG1Dd1VLK2x3NnZDS0JaZWh3MDFkRWl5dzRRNGFFMFo0YWhEaEthRlFzR25KMkJncUtvVEJzTmpGeTBTbFc2d2hSQVpUZG04REJKbWtCWmhEaTFqNHhKUUJrNnl3cldVVHltYUN4YWM4bFJPY2RhdVJHelFTTnRBN0VIVVloWHlFd2hoZ2pGVXFSdU8rcmF1aEYxYXdGcHpDc213VWJqSUZCUjB1MWJLdHlHcHVsVy9IL2NWVnpreUdhSVdUSVI5cEZBVjZHSzJnUE1YTVg4Z1BrOXp6eFhnSTFraW1jQWx0RVlyK2NqaW8xaW1sS3BFYTlyT2lwTG0rcCtDWjZCdy8vcWQxL2YvTytHd014YlNMcHlvWkVjd2t5aDJqSWtzKzNobWRkMmpXVXc0c2N4Tnlzbkh4VTduU3NwVFJjSmpDWkdMM0lzanNZSk1NZzVtd2d4N2dhSU9MQkZDb2dBZ0JCb05hOXcrREU2SStCczdGVGd3d3JKYkhqV0RncFlvMkt3dEJUY1lFRHVsb0M5Z2VRdytrMlJHblBHcFRhT2xxN0FTK1lJQ1V6NERaVmFYMlRpTkRodVlmVHRZNGdlTGkwSW9DbTNYY2N3TTloeDRrVTI4U3RRRWxqRHMzWkVwRkdBKzhkS3pMbVY5eW1Jd0Y1Rk9HbjJHZEpNOEtMSERKYlh5aVlWTUc5TVJUTGlYR0dnMlFLYXhNM2toUFNScndNOXpFSWFyZHhVMncvRWlBMGdPZVlLSHpEUjBWNy9RR1YzbEtJQTlrdHJEQXJ4TzNnZEErazZTS29CaVZ3Y203TmpaYjkrSG56dGcyODJUdUhWWjlMT0lTRk50OU1neUNldFpWY3pTeG55RGJsMTdQZW5xNm1xcGcxSWhSYUVPMmFWTFVPNC9yMTdIOHRUdjZmMTNoNzFkZHV2WkkzWSt1TWRXa3NOU2F1TG92Snc1aHNxaVBJVXZ0MGt1Ny9pQmVVUjNza3Ntb21ZV3RSYkFqYmlMZnYybFg5L1Y3TFZHNHVZblVaWGhRN2YyT1BDWkV4OXdyWVdUY2VQRVFxUEVNTDhwbDRtTWRyL2psWGx2SGlSaUoyK01TVEZZNFRUU1lTdHV2ejJSL0pYaCtQUGVHWG0wNTVKKzMvWURXdU51M1IzREFyUHV0eWcwWmd5a01WRFU5TmRtMjIrd1lhbHIycnNlNDhDbnNUSUZjTW43M3ZmaE5ya3R4MUVVY1puUHY2YWgzWXk1Y0RUUmRCRW9Hb0JlYWg3MWRxRnlqWkRKTGtXazNOM3Y0dXVrdHNzaldwemNpTVB4UWVIajhuTUt6Y0d1QjB0QXl6RmhkQ0tPWVd2NEh3T1FWd0l4TEc5OWE2dXZIM3NKQ3lPM2grazRFWitHNyt4ajVmNFhYa3NvYUdyZE1SelNjOEFSQTgrY2RPdWsyeDZmZmZOTnQ1eCtSbzFvbVBsclQvQ1FEbGNObHB4NE5CSVdYaGt4N1kzWnAzb2ZOUjdVdjg5T20vYmVXMFRMSXluSHYzdnMxVnNPRnBTV1NYdmZ1UFVmOUJyUkZ5eGdYZEhvS0puUUZlZ1BPb3Z2eno1OW50cnp5ZTI0MGlnOFVRM2xESTJWcXdhZ3JLSVFjTFhORkwzd2dsTjJPSGRCUTYvdkkza0VORFZCd1JiM2sxWHRjekZialduNEV6TVlpN0NGMzEyOStKVFl1UlNkckd1UzkyZzVkcHFuNnFYb0pRczV4bUw4cCtXdDRoTGJ0MG14Mk9MTlpSMmJiUHk4ekpOUUdGTS9mL0NmWFpla1JZRmpHQ1dqSUpwTStXaUN6R0JQV0hob3lhQXNqUlQvQjJHeTV5ellKa3dVQUFBQUFFbEZUa1N1UW1DQycpXCI7XHJcbiAgICBsZXQgYWVyaWFsQ3NzID0gXCJ1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBREFBQUFBd0NBTUFBQUJnM0FtMUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQU1BVUV4VVJRQUxCZ0lNRFFnT0J3UU9FUWNUQndVU0N3b1ZEQXdkQnc4WkRnVVJFd1lVR0FZWkZRWVpHZ2tURlFvVkdRc1pGQXdaSEJNZURoSWJGQkViSEF3V0lBNGJJUkVjSVE0aENRd2pGdzRsSEJna0RCOHNEeFVpRXhJaUdoQW9HeG9oRlJzaEdSb3JIUWNyS1FzaUlRd21LZ29vSkEwcEtRODFKdzh5TFJNaUl4SW1LeFVySlJFdUtoc2xKQjBySWhvb0tSVXVNQk15TGhrd0pob3pLaDQ4THhVek1STTlNQnd6TWlVdkZDTXRHaU13RWl3ekZDZ3pIREkrR1NJc0lTa3ZKU1F4SWlNMkxpWTVKaWMrTHlrMEpTbzBLeTQ5SlNzOUtTVTFOU003TkNzMk5TOCtORE0xSnpVOUxqZzdJREpDSFMxRExTTkFNaXRDTVN4SU9qUkVJVFpMSURaSktEbEZJanBGS3p0S0pUMUxLekpCTXpwSE1EMUpNanBLUEQxUktqbFFOQzFEUWo1UVFFQThNRUpHSmtCS0pVSk5LMGxMTEVKTU1rVk1QRXBPTkVOU0xVZFpMMHBUTGtwYUxrUlVNa1JTUEVWWk1rdFVNMHBWT2tsWk1rbFpORXBjTlUxWk1rMVpOVXhmTWs1ZE5reGNPVkZVTTFSVU9GSmJOVkZaT1ZOWVBWRmRPVkpkUEZWYU9WVmFQVlZkT2xWZFBWcGFObHBkTzBwaE4wMWhPbEJpTjFOaFBGTm9QMXBpUFdGYlBtUmpQRU5PUUV0UFNVUlRRa0pWUzB4VlFrMVZTa3hiUWt4Y1MwaGVVVkZYUkZSY1FsSmZURnhlUWxwZVMwNWxRazFrU0ZSalFWUmpTbFpwUTF0a1FseGxTbHhwUkYxclNWVm5VVnRsVTFsbFhGOXRVMXhvWGx4d1NsOXJhbVJmUW1KbFEyRmhTV0ZsU1dGbFRtVmxTV1JtVEdGb1FXRnBSV0ZzUm1WcFJXVnRSbU5zU210bFJHcHFSbXBzUzJCbVdHUnNVbUZyVzJwdFVtWnlSMlJ4VEdweFRXVnlVMlJ5VzJkNVYydHpVbXQwV1cxNVZHMTVXWEZ1VEhOdFZuRnhUWEY0VDNoMFRuSnpVbkoxWEhKNFZYTjZXbnAwVkh4MVczMTVWWHA4WEdSMFlHeDBZSFZ6WlhKMGFIUjlaWFYrYUhsOVlIT0NYWHFCWFhlQ1lIeUNZM2lFYUh5SVluK0phWHFLY1lCNVdJTjZZNFNDWG9DRFpJR0VhWUNJWm9PTGE0aUNhSW1KYklPT2RZdU1jbzZPZUl1VmNwT0tiWktQYzVhUWI1ZVhlNXVmZzZLamhBQUFBQUFBQUFBQUFBQUFBT0dDZVFnQUFBRUFkRkpPVS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy93QlQ5d2NsQUFBQUNYQklXWE1BQUE3REFBQU93d0hIYjZoa0FBQUFHSFJGV0hSVGIyWjBkMkZ5WlFCd1lXbHVkQzV1WlhRZ05DNHdMamxzTTM1T0FBQUg4MGxFUVZSSVN5MVdiWFFVVnhtKzZ3cW5rM1ptcHhsMkZHMkVHZzkyQzhHRGxXcHRWVHdhK3VGM3hjS21EZkZ6Q1V6RHNKTnN1blhpcGdsSlhKYnJ0Sldtd1pOU25IRDNqb2pSZ1VJbTJVdW1JWjBKWjdKQnlyQUxiTVdXMElCVzhhUmE0K2NmNzZUZVgzTm0zdWMrei9zKzcvdnVnbDRyL2FNVHJUNGUxcFBUcW5ubUpObjVBeVV6Um5yUmxlL3FFMzNkc3ZyQnRBUVZveHRwWk5LM3pTellqVWp2aVdPMkFnK1I3N2RsN1czNm4vMUVwOUtCUEcvUytQeTBQa2pVL2dQS1FHcXdUSHJ5aVdZRkFYU3ZNYWlyc2lvN1NqeU5zbkN6aDBxS0ltVjkvN21oZkhRWngyeU4xTys3clhVbTMzTVVQYWJvT2tBSkhhb0lkWGZKajJ4V2V5RDhqTUZFWGt2SXU1cXpwVTk4OGdXQjV6bCtHUytzRmU1NXRyRVZQZFdaQjJtaXE4YkJWa05GTzJSMHFucmZraVhoY0podEROWEU2dGJXOTcvczlPOS83WmZWaHg4Ni9Dd3JST3BmdnZ4Ym9NcWVMc3VxUHIxajQ0cUV3RE5NT0J4aW1VaVlvVThzdzdCQy9hN1Q3MnVFbnlKRGxHeFo5S2NnbFpSeXVxcXJ2L3RTWkVyZ09JNE5nUkJUSXc5RW1IQW9GR1pabnA2YUdhSjJHVHhmeFlzOGtLVlVRaDdXQjVoUWVDM0xzVXhveFZLVzE0bDNCWDJXY29VWVBpWnlMTGU4dGVaK2l1VDRHR2h2VjVLcEtXa3B5enhFcjJNWmdRMXhkUmpmUkJvSCsyazZsSUhqS1RIUFBCbzhDU0pJU3FxcTR3R0dPY1d5bElHbGd2Z05YMUdkOHZGNWYrSVVJd2IzMG5nK0dnMlFmQlJJTXZ5MGpHOFNWa1lvNE4wenZVWFZSenRiSi9MNnhMN2xVWkVYQkVIa3VacWxTNmdFQVVnS0p1cm5oRnRmcEFDT1lkOGIvaFZiSlBxd2k0NGE2S0Ewc1BWaklpL1NJeXhiM3U4S2xBSjBTOGpSVmdybFcrblZIUGRyaGlYQ3h1NDJkODZCeWtzRGM4MFAzTWtKRkJGUThIbzFsUWVncFdKUldGR3NEc1J3d3Y3cEl5dnVRVzBaa3JYNk5EVkZicWN2YVFJOHZieXF6dDVBQVJyc2JLeDV5aFFFR3Mrd1BPNTZiT0srMHJjd01yT0trcFViWldZeFYwNFVlWlp2L2NCS0ZoUkw2UWR2OXk0TGZFREE3L3RoZzd0VG12MWE1L0duTzB3bDBkUWc4MHdnbFphSFVteFJ2andBSE9meU4wbXhycHFMVXBjanNLM05IWU1vNFIxbzZlaG8yWnlJYjJGb2VPQzNJTEs4a1oySFFNT3VXeXdHWFVrSkJDZVRiWUZTMCt5bTFoMi82VWdtdm5ydktZWlp0SUVYR2Y3NUMyY0lBcDVMSE5kNzF4N3VQb1RqYWtyV0g5ZTNLRnBhYXRqVXZKVXlzRncwS3JMTVlNVzJsVGc0UGVVUXg2a0pFQUx2eFhFbUNkVnlQTEh0Q1NqQmhjMDFYQ2pJZ2FmeG91K1BFNktDMWRoeFNDd29CQ2MrTjRQM2J0TTg0cG1kU1NqSm5qTy9udlk0TFFmVnl6NS9JK3Y2SXdqVU9NankrTVZDeEliS3VwVEphRWt0cDdjVEtVNDJQdmpoMm0vOGNTcEM2YVBzYVgvTUhTdVVRTFZWc0lhNFJVVHMvci9CVkFleE5kamRuc05HN2ovclY5M3hoZUxNektuRnJQZVRFUWNoQ3lDY0tiMjVhQUluN2xyQWVydHJad3lOWE04TjZ6ZldyRm8zZDJTbU9FY0Y4M3gvcitPT0ZnckFIWVdGN2NFTGpoVjdVUW8vNldBSVVWbDlKRmw4YS8vSFo2NlZwYlkzSTlRS1pxUHJ1NzdsQStpT1dBSXIwaEt4SENtbXIwb3RoU3llSWw1eTNxdDR4VDhnU05yS0Vab3pzOEVsczY3cmdzTE9aK3lnendNZmJ0TmhvYmZnenBFeUduejdodFB0elVpNlB1T29qN0swV0YvTVhpVUZ4d0dhalJEMWhqWVhIWEk5cDQwNnFPeWlucDUvdGlXY0RIWTBqSXU0bjY0UWZxN2tsaUIyZ2VtYWc5UWJPaWEwUGJiRE1iZDQzU0h1dnhGeHJBb2N4aW5zN01YNUtxYmUxUWl4S0J4b1Y0Ly9QZkFnR0N1K1JsbTRTdlppenlESCswcmVESHA5MmlPMEJ1WDNiQ2ZJdGwwUEV3dllMcXB3WEcyTUhsR3NRNFM4cE1KWnYxSkdtSGlFb0hRRGRPandtVmxFUC9uRTlBREtqSTh4TEkwT09HSVRmeTBTYmVHL0MyaktVREdTbERoTTlJM0lwSzlpdXA2WG5iUk5DN3lxdWVOc0pDQ0lpWHpkUWhuYUdOKzQ2dW1uRWR5NVU1VWJVSjQ4TEZNOUdrSm84QmRET2lBWjdaSVFiS2hZTE1xdmhVMndtTnhqRUFzUzJBSTd5NG5XRjY0ZHVlUGJrN1lWM3p2QVZMRU1EOUF4SlJOYTNLRFVpYlY3RGpua3Vwck1FWWpTY0ZOY2FSMmNlUDJ1OVIvNWsxMDUyUnltZTVwaEFGUnN3bEhqQXVkaVA0ZE95N0NheExnZEpoOXZVbFUxNzAyLytMUGExVTlmdlBpOXFsQTRYRVVCSmMzZEZscHNSNDU3SURsMWlQcUxwN284MU5RZ3lWMTlpWVUzOHVUaXY5NzVQZDNTaXdRY3NHangrdjQvNmZsNVQ3RU9PTVRDdHBiS3hmZW1zUXEvM29sUVpjbWluQURBQUkwY3VHTEhhSE9GeGJ1R3ZSay9aOXU3Q1VMcW9WUjZORTB5eDFhdmozMG9SaGMvaldVb0lBTEd4a3owZGcxRGw5aWFJN0xxT09YS3NYSkZ3aml1RUFpNzBKcmEyblcxUEwwOHpMQmhac01BQnBXNWNzSTdUUGZldzlpcEZLY241azFpKzFLeUNXS2pDM1cvOGRGMWQ2NjYrUmFhYkJWVEZUSGFjam9vakJORGgwTkR4aytJUFRsd2ZxSmtXcGJucEZIWEliTGJtcHhFUTNmZi9aMGcvbWF1WHNvbG45d0RSankvTkhzUUZ3M1A2dld1VEo0My8rRlpyazJjdkFGUmlwQ0tkZkQ5eTIrcGpSajc4czBLZENVREtKdmRWOTFDaG5nVjM4VDIwVE0rZ2doanBKYVBscEZyMnhiRXo1ZzRBL05HdDVyTndkd21ZR2VlZU1YQlNMSEhVSWMrNlJzb2pSSDlWVFVtMy9tTGYvNjRiNDcwWHZveG9US2hsTUJRMmpNRXpvMlBqeGRHTXBwbW4xUk0yNGJXRkpxYVF2NEJjdUphMlNhbTdab2txMWxkQ3N6MDZOQ0JIcmh3cVZRWXBmRmo0Mk5aZXh6MUVXOVNSL2tUNThuRWVRS0piMmZQWGpqcDB1L1lVa3dIRWdMZU9uZjJuT3VmMVRSVE0wMkNMS0xUUHk2MC94MUNDenRxbjdFditCZHNDM20rMzBkZWNRdlcvd0JOVHdVK0NmVVFBUUFBQUFCSlJVNUVya0pnZ2c9PScpXCI7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuYmFzZVN3aXRjaGVyKSB7XHJcbiAgICAgICAgLy8gIGxldCBzd2l0Y2hlckNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cImJhc2UtbWFwLXN3aXRjaGVyXCIgdGl0bGU9XCJUb2dnbGUgQmFzZSBMYXllclwiIHN0eWxlPVwiJztcclxuICAgICAgICAvLyAgc3dpdGNoZXJDb250ZW50ICs9ICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNzBweDsgbGVmdDogNHB4OyBib3JkZXI6IHNvbGlkIGJsYWNrIDFweDsgJztcclxuICAgICAgICAvLyAgc3dpdGNoZXJDb250ZW50ICs9IGBoZWlnaHQ6IDUwcHg7IHdpZHRoOiA1MHB4OyB6LWluZGV4OiAxMDsgYm9yZGVyLXJhZGl1czogNHB4OyBiYWNrZ3JvdW5kOiAke2FlcmlhbENzc307YDtcclxuICAgICAgICAvLyAgc3dpdGNoZXJDb250ZW50ICs9ICdcIj48L2Rpdj4nO1xyXG4gICAgICAgIC8vICAkbWFwRGl2LmFwcGVuZChzd2l0Y2hlckNvbnRlbnQpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gJG1hcERpdi5maW5kKCcuYmFzZS1tYXAtc3dpdGNoZXInKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8vICAgICAgb3NtTGF5ZXIuc2V0VmlzaWJsZSghb3NtTGF5ZXIuZ2V0VmlzaWJsZSgpKTtcclxuICAgICAgICAvLyAgICAgIHNhdExheWVyLnNldFZpc2libGUoIXNhdExheWVyLmdldFZpc2libGUoKSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgIGlmIChvc21MYXllci5nZXRWaXNpYmxlKCkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kJywgYWVyaWFsQ3NzKTtcclxuICAgICAgICAvLyAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQnLCBvc21Dc3MpO1xyXG4gICAgICAgIC8vICAgICAgfVxyXG4gICAgICAgIC8vICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy56b29tIDwgMCB8fCBvcHRpb25zLnpvb20gPiAyOCkge1xyXG4gICAgICAgIHRocm93ICd6b29tIG91dCBvZiByYW5nZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuY2VudGVyLnggPj0gLTE4MCAmJiBvcHRpb25zLmNlbnRlci54IDw9IDE4MCAmJiBvcHRpb25zLmNlbnRlci55ID49IC05MCAmJiBvcHRpb25zLmNlbnRlci55IDw9IDkwKSB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgb2wuZ2VvbS5Qb2ludChbb3B0aW9ucy5jZW50ZXIueCwgb3B0aW9ucy5jZW50ZXIueV0pO1xyXG4gICAgICAgIG5ldyBvbC5wcm9qLlByb2plY3Rpb24oe2NvZGU6IFwiRVBTRzo0MzI2XCJ9KTtcclxuXHJcbiAgICAgICAgcC50cmFuc2Zvcm0obmV3IG9sLnByb2ouUHJvamVjdGlvbih7Y29kZTogXCJFUFNHOjQzMjZcIn0pLCBuZXcgb2wucHJvai5Qcm9qZWN0aW9uKHtjb2RlOiBcIkVQU0c6Mzg1N1wifSkpO1xyXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHAuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgICBvcHRpb25zLmNlbnRlci54ID0gY29vcmRpbmF0ZXNbMF07XHJcbiAgICAgICAgb3B0aW9ucy5jZW50ZXIueSA9IGNvb3JkaW5hdGVzWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xzID0gb2wuY29udHJvbC5kZWZhdWx0cyh7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0aW9uT3B0aW9uczoge2NvbGxhcHNpYmxlOiBmYWxzZX1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBuZXcgb2wuVmlldyh7XHJcbiAgICAgICAgY2VudGVyOiBbb3B0aW9ucy5jZW50ZXIueCwgb3B0aW9ucy5jZW50ZXIueV0sXHJcbiAgICAgICAgem9vbTogb3B0aW9ucy56b29tLFxyXG4gICAgICAgIG1pblpvb206IG9wdGlvbnMubWluWm9vbSxcclxuICAgICAgICBtYXhab29tOiBvcHRpb25zLm1heFpvb21cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBtYXAgPSBuZXcgb2wuTWFwKHtcclxuICAgICAgICBsYXllcnM6IFtvc21MYXllcl0sXHJcbiAgICAgICAgdGFyZ2V0OiBvcHRpb25zLmRpdklkLFxyXG4gICAgICAgIGNvbnRyb2xzOiBjb250cm9scyxcclxuICAgICAgICB2aWV3OiB2aWV3XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5mdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgbWFwLmFkZENvbnRyb2wobmV3IG9sLmNvbnRyb2wuRnVsbFNjcmVlbih7fSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbm5tLnF1aWNrTWFwQmFzZSA9IHF1aWNrTWFwQmFzZTtcclxuZXhwb3J0IGRlZmF1bHQgcXVpY2tNYXBCYXNlO1xyXG4iXX0=

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/14/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var nm = provide_1.default('olHelpers.zoomResolutionConvert');
var _zoomResLookup = [
    156543.03392804097,
    78271.51696402048,
    39135.75848201024,
    19567.87924100512,
    9783.93962050256,
    4891.96981025128,
    2445.98490512564,
    1222.99245256282,
    611.49622628141,
    305.748113140705,
    152.8740565703525,
    76.43702828517625,
    38.21851414258813,
    19.109257071294063,
    9.554628535647032,
    4.777314267823516,
    2.388657133911758,
    1.194328566955879,
    0.5971642834779395,
    0.29858214173896974,
    0.14929107086948487,
    0.07464553543474244,
    0.03732276771737122,
    0.01866138385868561,
    0.009330691929342804,
    0.004665345964671402,
    0.002332672982335701,
    0.0011663364911678506,
    0.0005831682455839253 //28
];
/**
 * Get the resolution given the zoom level
 * @param {number} zoomLevel - the zoom level
 * @returns {number|*} the map resolution
 */
function zoomToResolution(zoomLevel) {
    "use strict";
    if (typeof zoomLevel == 'number') {
        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
            return _zoomResLookup[zoomLevel];
        }
        else {
            console.log("invalid zoom level provided: " + zoomLevel);
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.zoomToResolution = zoomToResolution;
nm.zoomToResolution = zoomToResolution;
/**
 * Get resolution from the zoom level
 * @param {number} resolution - the resolution
 * @returns {number|*} the zoom level
 */
function resolutionToZoom(resolution) {
    for (var i = 0; i < _zoomResLookup.length; i++) {
        if (resolution >= _zoomResLookup[i]) {
            return i;
        }
    }
    return 0;
}
exports.resolutionToZoom = resolutionToZoom;
nm.resolutionToZoom = resolutionToZoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbVJlc29sdXRpb25Db252ZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiem9vbVJlc29sdXRpb25Db252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7QUFFSCwyQ0FBc0M7QUFDdEMsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBRXRELElBQUksY0FBYyxHQUFHO0lBQ2pCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixxQkFBcUIsQ0FBQyxJQUFJO0NBQzdCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsMEJBQWlDLFNBQVM7SUFDdEMsWUFBWSxDQUFDO0lBRWIsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBZ0MsU0FBVyxDQUFDLENBQUM7WUFFekQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0FBQ0wsQ0FBQztBQWRELDRDQWNDO0FBQ0QsRUFBRSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBR3ZDOzs7O0dBSUc7QUFDSCwwQkFBaUMsVUFBVTtJQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQVJELDRDQVFDO0FBRUQsRUFBRSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTQvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycy56b29tUmVzb2x1dGlvbkNvbnZlcnQnKTtcclxuXHJcbmxldCBfem9vbVJlc0xvb2t1cCA9IFtcclxuICAgIDE1NjU0My4wMzM5MjgwNDA5NywgLy8wXHJcbiAgICA3ODI3MS41MTY5NjQwMjA0OCwgLy8xXHJcbiAgICAzOTEzNS43NTg0ODIwMTAyNCwgLy8yXHJcbiAgICAxOTU2Ny44NzkyNDEwMDUxMiwgLy8zXHJcbiAgICA5NzgzLjkzOTYyMDUwMjU2LCAvLzRcclxuICAgIDQ4OTEuOTY5ODEwMjUxMjgsIC8vNVxyXG4gICAgMjQ0NS45ODQ5MDUxMjU2NCwgLy82XHJcbiAgICAxMjIyLjk5MjQ1MjU2MjgyLCAvLzdcclxuICAgIDYxMS40OTYyMjYyODE0MSwgLy84XHJcbiAgICAzMDUuNzQ4MTEzMTQwNzA1LCAvLzlcclxuICAgIDE1Mi44NzQwNTY1NzAzNTI1LCAvLzEwXHJcbiAgICA3Ni40MzcwMjgyODUxNzYyNSwgLy8xMVxyXG4gICAgMzguMjE4NTE0MTQyNTg4MTMsIC8vMTJcclxuICAgIDE5LjEwOTI1NzA3MTI5NDA2MywgLy8xM1xyXG4gICAgOS41NTQ2Mjg1MzU2NDcwMzIsIC8vMTRcclxuICAgIDQuNzc3MzE0MjY3ODIzNTE2LCAvLzE1XHJcbiAgICAyLjM4ODY1NzEzMzkxMTc1OCwgLy8xNlxyXG4gICAgMS4xOTQzMjg1NjY5NTU4NzksIC8vMTdcclxuICAgIDAuNTk3MTY0MjgzNDc3OTM5NSwgLy8xOFxyXG4gICAgMC4yOTg1ODIxNDE3Mzg5Njk3NCwgLy8xOVxyXG4gICAgMC4xNDkyOTEwNzA4Njk0ODQ4NywgLy8yMFxyXG4gICAgMC4wNzQ2NDU1MzU0MzQ3NDI0NCwgLy8yMVxyXG4gICAgMC4wMzczMjI3Njc3MTczNzEyMiwgLy8yMlxyXG4gICAgMC4wMTg2NjEzODM4NTg2ODU2MSwgLy8yM1xyXG4gICAgMC4wMDkzMzA2OTE5MjkzNDI4MDQsIC8vMjRcclxuICAgIDAuMDA0NjY1MzQ1OTY0NjcxNDAyLCAvLzI1XHJcbiAgICAwLjAwMjMzMjY3Mjk4MjMzNTcwMSwgLy8yNlxyXG4gICAgMC4wMDExNjYzMzY0OTExNjc4NTA2LCAvLzI3XHJcbiAgICAwLjAwMDU4MzE2ODI0NTU4MzkyNTMgLy8yOFxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcmVzb2x1dGlvbiBnaXZlbiB0aGUgem9vbSBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gem9vbUxldmVsIC0gdGhlIHpvb20gbGV2ZWxcclxuICogQHJldHVybnMge251bWJlcnwqfSB0aGUgbWFwIHJlc29sdXRpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB6b29tVG9SZXNvbHV0aW9uKHpvb21MZXZlbCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB6b29tTGV2ZWwgPT0gJ251bWJlcicpIHtcclxuICAgICAgICBpZiAoem9vbUxldmVsICUgMSA9PT0gMCAmJiB6b29tTGV2ZWwgPj0gMCAmJiB6b29tTGV2ZWwgPD0gMjgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF96b29tUmVzTG9va3VwW3pvb21MZXZlbF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGludmFsaWQgem9vbSBsZXZlbCBwcm92aWRlZDogJHt6b29tTGV2ZWx9YCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5ubS56b29tVG9SZXNvbHV0aW9uID0gem9vbVRvUmVzb2x1dGlvbjtcclxuXHJcblxyXG4vKipcclxuICogR2V0IHJlc29sdXRpb24gZnJvbSB0aGUgem9vbSBsZXZlbFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiAtIHRoZSByZXNvbHV0aW9uXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8Kn0gdGhlIHpvb20gbGV2ZWxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHV0aW9uVG9ab29tKHJlc29sdXRpb24pe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfem9vbVJlc0xvb2t1cC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgaWYgKHJlc29sdXRpb24gPj0gX3pvb21SZXNMb29rdXBbaV0gKXtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5ubS5yZXNvbHV0aW9uVG9ab29tID0gcmVzb2x1dGlvblRvWm9vbTtcclxuIl19

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 1/4/2016.
 */
var provide_1 = __webpack_require__(0);
var ol = __webpack_require__(2);
var nm = provide_1.default('olHelpers.esriToOlStyle');
/**
 * This callback is displayed as part of the Requester class.
 * @callback styleFunc
 * @param {ol.Feature} feat - openlayers feature
 * @param {number} resolution - map resolution
 */
/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";
    return "rgba(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + "," + opacity + ")";
}
/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
nm.htmlEscape = htmlEscape;
var CommonSymbol = (function () {
    /**
     *
     * @param symbolObj
     * @param {number} opacity
     */
    function CommonSymbol(symbolObj, opacity) {
        this.symbolObj = symbolObj;
        this.opacity = opacity;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return CommonSymbol;
}());
var PointSymbol = (function (_super) {
    __extends(PointSymbol, _super);
    function PointSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSMS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                var radius = _this.symbolObj.size;
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        fill: new ol.style.Fill({
                            color: innerColor
                        }),
                        stroke: new ol.style.Stroke({ color: outerColor, width: outlineWidth })
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
                break;
            case 'esriPMS':
                _this.olStyle = new ol.style.Style({
                    image: new ol.style.Icon({ src: "data:image/png;base64," + _this.symbolObj['imageData'] })
                });
                _this.legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + _this.symbolObj['imageData'] + "\">";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Point symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PointSymbol;
}(CommonSymbol));
var LineSymbol = (function (_super) {
    __extends(LineSymbol, _super);
    function LineSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj.type) {
            case 'esriSLS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var lineWidth = _this.symbolObj.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 4px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: -1px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Line symbol does not handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return LineSymbol;
}(CommonSymbol));
var PolygonSymbol = (function (_super) {
    __extends(PolygonSymbol, _super);
    function PolygonSymbol(symbolObj, opacity) {
        var _this = _super.call(this, symbolObj, opacity) || this;
        switch (_this.symbolObj['type']) {
            case 'esriSFS':
                var innerColor = _colorArrayToRgba(_this.symbolObj.color, _this.opacity);
                var outerColor = _colorArrayToRgba(_this.symbolObj.outline.color, _this.opacity);
                var outlineWidth = _this.symbolObj.outline.width;
                _this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new ol.style.Fill({
                        color: innerColor
                    })
                });
                _this.legendHtml = "<span class=\"legend-layer-icon\" ";
                _this.legendHtml += "style=\"";
                _this.legendHtml += "background-color: " + innerColor + ";";
                _this.legendHtml += "border: solid " + outerColor + " 1px;";
                _this.legendHtml += "width: 40px;";
                _this.legendHtml += "height: 9px;";
                _this.legendHtml += "position: relative;";
                _this.legendHtml += "display: inline-block;";
                _this.legendHtml += "top: 2px;";
                _this.legendHtml += "\"></span>";
                break;
            default:
                console.log(_this.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + _this.symbolObj['type']);
        }
        return _this;
    }
    return PolygonSymbol;
}(CommonSymbol));
var SymbolGenerator = (function () {
    function SymbolGenerator(esriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
    return SymbolGenerator;
}());
var SingleSymbol = (function (_super) {
    __extends(SingleSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    function SingleSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.symbol = _this.renderer.symbol;
        var symbolObj = new SymbolClass(_this.symbol, _this.opacity);
        _this.olStyle = symbolObj.olStyle;
        _this.legendHtml = symbolObj.legendHtml;
        return _this;
    }
    return SingleSymbol;
}(SymbolGenerator));
var UniqueValueSymbol = (function (_super) {
    __extends(UniqueValueSymbol, _super);
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    function UniqueValueSymbol(esriResponse, SymbolClass) {
        var _this = _super.call(this, esriResponse) || this;
        _this.uniqueValueInfos = _this.renderer['uniqueValueInfos'];
        _this.propertyName = _this.renderer['field1'];
        _this.defaultSymbol = _this.renderer['defaultSymbol'];
        if (_this.defaultSymbol) {
            var symbolObj = new SymbolClass(_this.defaultSymbol, _this.opacity);
            _this.defaultStyle = symbolObj.olStyle;
            _this.defaultLabelHtml = "<span class=\"legend-layer-subitem\">" + htmlEscape(_this.renderer['defaultLabel']) + "</span>" + symbolObj.legendHtml;
        }
        else {
            _this.defaultStyle = undefined;
            _this.defaultLabelHtml = 'other';
        }
        _this.valueArray = [];
        _this.labelArray = [];
        _this.legendArray = [];
        _this.propertyStyleLookup = {};
        for (var _i = 0, _a = _this.uniqueValueInfos; _i < _a.length; _i++) {
            var uniqueVal = _a[_i];
            _this.labelArray.push(uniqueVal['label']);
            _this.valueArray.push(uniqueVal['value']);
            var uniqueSym = new SymbolClass(uniqueVal.symbol, _this.opacity);
            _this.legendArray.push("<span class=\"legend-layer-subitem\">" + htmlEscape(uniqueVal['label']) + "</span>" + uniqueSym.legendHtml);
            _this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
        }
        _this.olStyle = function (feature) {
            var checkProperties = feature.getProperties();
            var checkProperty = checkProperties[_this.propertyName];
            var returnValue;
            if (_this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [_this.propertyStyleLookup[checkProperty]];
            }
            else {
                returnValue = [_this.defaultStyle];
            }
            return returnValue;
        };
        if (_this.defaultLabelHtml !== null) {
            _this.legendArray.push(_this.defaultLabelHtml);
        }
        _this.legendHtml = '<ul>';
        for (var _b = 0, _c = _this.legendArray; _b < _c.length; _b++) {
            var h = _c[_b];
            _this.legendHtml += "<li>" + h + "</li>";
        }
        _this.legendHtml += '</ul>';
        return _this;
    }
    return UniqueValueSymbol;
}(SymbolGenerator));
/**
 * style and legend object
 * @typedef {object} styleAndLegend
 * @property {styleFunc} style - style function
 * @property {string} legend - legend content
 */
/**
 *
 * @param {object} esriResponse - layer info
 * @returns {styleAndLegend} style and legend object
 */
function makeFeatureServiceLegendAndSymbol(esriResponse) {
    "use strict";
    var renderer = esriResponse.drawingInfo.renderer;
    var symbolLegendOut = null;
    switch (renderer.type) {
        case 'simple':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new SingleSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new SingleSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new SingleSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse.geometryType + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        default:
            alert('not handled renderer type: ' + renderer['type']);
    }
    if (symbolLegendOut == null) {
        return { style: undefined, legend: '' };
    }
    else {
        return { style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml };
    }
}
exports.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;
/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [skipLayerNameAndExpander=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, skipLayerNameAndExpander) {
    if (skipLayerNameAndExpander === void 0) { skipLayerNameAndExpander = false; }
    skipLayerNameAndExpander = typeof skipLayerNameAndExpander == 'boolean' ? skipLayerNameAndExpander : false;
    var layerName = lyrObject['layerName'];
    var legendItems = lyrObject['legend'];
    var legendHtml = '';
    if (!skipLayerNameAndExpander) {
        legendHtml += "<span class=\"legend-layer-subitem\">" + layerName + "</span>";
    }
    if (legendItems.length == 1) {
        legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[0]['imageData'] + "\">";
    }
    else {
        if (!skipLayerNameAndExpander) {
            legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>';
        }
        legendHtml += '<ul>';
        for (var i = 0; i < legendItems.length; i++) {
            legendHtml += "<li>";
            legendHtml += "<span class=\"legend-layer-subitem\">" + htmlEscape(legendItems[i]['label']) + "</span>";
            legendHtml += "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + legendItems[i]['imageData'] + "\">";
            legendHtml += "</li>";
        }
        legendHtml += '</ul>';
    }
    if (!skipLayerNameAndExpander) {
        legendHtml = "<span class=\"legend-layer-subitem\">" + layerName + "</span>" + legendHtml;
    }
    return legendHtml;
}
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
function makeMapServiceLegend(esriResponse) {
    "use strict";
    var newLegendHtml = '';
    var layers = esriResponse['layers'];
    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    }
    else {
        newLegendHtml += '<ul>';
        for (var i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }
    return newLegendHtml;
}
exports.makeMapServiceLegend = makeMapServiceLegend;
nm.makeMapServiceLegend = makeMapServiceLegend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaVRvT2xTdHlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVzcmlUb09sU3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUU5Qzs7Ozs7R0FLRztBQUVIOzs7Ozs7R0FNRztBQUNILDJCQUEyQixVQUFVLEVBQUUsT0FBTztJQUMxQyxZQUFZLENBQUM7SUFFYixNQUFNLENBQUMsVUFBUSxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBSSxPQUFPLE1BQUcsQ0FBQztBQUNqRixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILG9CQUFvQixHQUFHO0lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ2IsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7U0FDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7U0FDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7U0FDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7U0FDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUE0QjNCO0lBTUk7Ozs7T0FJRztJQUNILHNCQUFZLFNBQXFCLEVBQUUsT0FBZTtRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBT0Q7SUFBMEIsK0JBQVk7SUFDbEMscUJBQVksU0FBcUIsRUFBRSxPQUFlO1FBQWxELFlBQ0ksa0JBQU0sU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQThCNUI7UUE3QkcsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssU0FBUztnQkFDVixJQUFJLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksVUFBVSxHQUFHLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9FLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDaEQsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBR2pDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDOUIsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO3dCQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNwQixLQUFLLEVBQUUsVUFBVTt5QkFDcEIsQ0FBQzt3QkFDRixNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQyxDQUFDO3FCQUN4RSxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsVUFBVSxHQUFHLHNEQUFpRCxVQUFVLHNCQUFrQixDQUFDO2dCQUNoRyxLQUFLLENBQUM7WUFDVixLQUFLLFNBQVM7Z0JBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUM5QixLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSwyQkFBeUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUcsRUFBQyxDQUFDO2lCQUMxRixDQUFDLENBQUM7Z0JBQ0gsS0FBSSxDQUFDLFVBQVUsR0FBRyxnRkFBeUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBSSxDQUFDO2dCQUMzSCxLQUFLLENBQUM7WUFDVjtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLDRDQUE0QyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDOztJQUNMLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBMEIsWUFBWSxHQWlDckM7QUFFRDtJQUF5Qiw4QkFBWTtJQUNqQyxvQkFBWSxTQUFxQixFQUFFLE9BQWU7UUFBbEQsWUFDSSxrQkFBTSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBNEI1QjtRQTNCRyxNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxTQUFTO2dCQUNWLElBQUksVUFBVSxHQUFHLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBRXJDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ3hCLEtBQUssRUFBRSxVQUFVO3dCQUNqQixnQkFBZ0I7d0JBQ2hCLEtBQUssRUFBRSxTQUFTO3FCQUNuQixDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsVUFBVSxHQUFHLG9DQUFrQyxDQUFDO2dCQUNyRCxLQUFJLENBQUMsVUFBVSxJQUFJLFVBQVMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFVBQVUsSUFBSSx1QkFBcUIsVUFBVSxNQUFHLENBQUM7Z0JBQ3RELEtBQUksQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsVUFBVSxJQUFJLGNBQWMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFVBQVUsSUFBSSxxQkFBcUIsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFVBQVUsSUFBSSx3QkFBd0IsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxVQUFVLElBQUksWUFBVyxDQUFDO2dCQUMvQixLQUFLLENBQUM7WUFDVjtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLDJDQUEyQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDOztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUEvQkQsQ0FBeUIsWUFBWSxHQStCcEM7QUFFRDtJQUE0QixpQ0FBWTtJQUNwQyx1QkFBWSxTQUFxQixFQUFFLE9BQWU7UUFBbEQsWUFDSSxrQkFBTSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBa0M1QjtRQWpDRyxNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBRWhELEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDOUIsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ3hCLEtBQUssRUFBRSxVQUFVO3dCQUNqQixnQkFBZ0I7d0JBQ2hCLEtBQUssRUFBRSxZQUFZO3FCQUN0QixDQUFDO29CQUNGLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNwQixLQUFLLEVBQUUsVUFBVTtxQkFDcEIsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBRUgsS0FBSSxDQUFDLFVBQVUsR0FBRyxvQ0FBa0MsQ0FBQztnQkFDckQsS0FBSSxDQUFDLFVBQVUsSUFBSSxVQUFTLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxVQUFVLElBQUksdUJBQXFCLFVBQVUsTUFBRyxDQUFDO2dCQUN0RCxLQUFJLENBQUMsVUFBVSxJQUFJLG1CQUFpQixVQUFVLFVBQU8sQ0FBQztnQkFDdEQsS0FBSSxDQUFDLFVBQVUsSUFBSSxjQUFjLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsVUFBVSxJQUFJLHFCQUFxQixDQUFDO2dCQUN6QyxLQUFJLENBQUMsVUFBVSxJQUFJLHdCQUF3QixDQUFDO2dCQUM1QyxLQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFVBQVUsSUFBSSxZQUFXLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUVWO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsMENBQTBDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7O0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXJDRCxDQUE0QixZQUFZLEdBcUN2QztBQUVEO0lBTUkseUJBQVksWUFBMEI7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoRixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBRUQ7SUFBMkIsZ0NBQWU7SUFFdEM7Ozs7T0FJRztJQUNILHNCQUFZLFlBQVksRUFBRSxXQUEwQjtRQUFwRCxZQUNJLGtCQUFNLFlBQVksQ0FBQyxTQUt0QjtRQUpHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQzs7SUFDM0MsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQWRELENBQTJCLGVBQWUsR0FjekM7QUFFRDtJQUFnQyxxQ0FBZTtJQVkzQzs7OztPQUlHO0lBQ0gsMkJBQVksWUFBMEIsRUFBRSxXQUEwQjtRQUFsRSxZQUNJLGtCQUFNLFlBQVksQ0FBQyxTQW9EdEI7UUFuREcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxRCxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBR3BELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsMENBQXNDLFVBQVUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzVJLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsQ0FBQztRQUVELEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFOUIsR0FBRyxDQUFDLENBQWtCLFVBQXFCLEVBQXJCLEtBQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFyQixjQUFxQixFQUFyQixJQUFxQjtZQUF0QyxJQUFJLFNBQVMsU0FBQTtZQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDBDQUFzQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUgsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7U0FDcEU7UUFHRCxLQUFJLENBQUMsT0FBTyxHQUFHLFVBQUMsT0FBbUI7WUFDL0IsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlDLElBQUksYUFBYSxHQUFHLGVBQWUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFdkQsSUFBSSxXQUFXLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFdBQVcsR0FBRyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTCxXQUFXLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxDQUFVLFVBQWdCLEVBQWhCLEtBQUEsS0FBSSxDQUFDLFdBQVcsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0I7WUFBekIsSUFBSSxDQUFDLFNBQUE7WUFDTixLQUFJLENBQUMsVUFBVSxJQUFJLFNBQU8sQ0FBQyxVQUFPLENBQUM7U0FDdEM7UUFDRCxLQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQzs7SUFDL0IsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXZFRCxDQUFnQyxlQUFlLEdBdUU5QztBQVNEOzs7OztHQUtHO0FBRUg7Ozs7R0FJRztBQUNILDJDQUFrRCxZQUEwQjtJQUN4RSxZQUFZLENBQUM7SUFDYixJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNqRCxJQUFJLGVBQWUsR0FBb0IsSUFBSSxDQUFDO0lBRTVDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLG1CQUFtQjtvQkFDcEIsZUFBZSxHQUFHLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDOUQsS0FBSyxDQUFDO2dCQUNWLEtBQUssc0JBQXNCO29CQUN2QixlQUFlLEdBQUcsSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxxQkFBcUI7b0JBQ3RCLGVBQWUsR0FBRyxJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ2hFLEtBQUssQ0FBQztnQkFDVjtvQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1YsS0FBSyxhQUFhO1lBQ2QsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssbUJBQW1CO29CQUNwQixlQUFlLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ25FLEtBQUssQ0FBQztnQkFDVixLQUFLLHNCQUFzQjtvQkFDdkIsZUFBZSxHQUFHLElBQUksaUJBQWlCLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNsRSxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxxQkFBcUI7b0JBQ3RCLGVBQWUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDckUsS0FBSyxDQUFDO2dCQUNWO29CQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzFCLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUNELEtBQUssQ0FBQztRQUNWO1lBQ0ksS0FBSyxDQUFDLDZCQUE2QixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxDQUFDLFVBQVUsRUFBQyxDQUFDO0lBQ2hGLENBQUM7QUFDTCxDQUFDO0FBL0NELDhFQStDQztBQUVELEVBQUUsQ0FBQyxpQ0FBaUMsR0FBRyxpQ0FBaUMsQ0FBQztBQUd6RTs7Ozs7R0FLRztBQUNILDhCQUE4QixTQUFTLEVBQUUsd0JBQXlDO0lBQXpDLHlDQUFBLEVBQUEsZ0NBQXlDO0lBRzlFLHdCQUF3QixHQUFHLE9BQU8sd0JBQXdCLElBQUksU0FBUyxHQUFHLHdCQUF3QixHQUFHLEtBQUssQ0FBQztJQUMzRyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUM1QixVQUFVLElBQUksMENBQXNDLFNBQVMsWUFBUyxDQUFDO0lBQzNFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsVUFBVSxHQUFHLGdGQUF5RSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQUksQ0FBQztJQUMxSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUM1QixVQUFVLElBQUksNEVBQTRFLENBQUM7UUFDL0YsQ0FBQztRQUNELFVBQVUsSUFBSSxNQUFNLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsVUFBVSxJQUFJLE1BQU0sQ0FBQztZQUNyQixVQUFVLElBQUksMENBQXNDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBUyxDQUFDO1lBQ2pHLFVBQVUsSUFBSSxnRkFBeUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFJLENBQUM7WUFDdkgsVUFBVSxJQUFJLE9BQU8sQ0FBQztRQUMxQixDQUFDO1FBQ0QsVUFBVSxJQUFJLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7UUFDNUIsVUFBVSxHQUFHLDBDQUFzQyxTQUFTLFlBQVMsR0FBRyxVQUFVLENBQUM7SUFDdkYsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCw4QkFBcUMsWUFBWTtJQUM3QyxZQUFZLENBQUM7SUFFYixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFdkIsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixhQUFhLElBQUksb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLGFBQWEsSUFBSSxNQUFNLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsYUFBYSxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDeEUsQ0FBQztRQUNELGFBQWEsSUFBSSxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQWxCRCxvREFrQkM7QUFFRCxFQUFFLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxLzQvMjAxNi5cclxuICovXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ29sSGVscGVycy5lc3JpVG9PbFN0eWxlJyk7XHJcblxyXG4vKipcclxuICogVGhpcyBjYWxsYmFjayBpcyBkaXNwbGF5ZWQgYXMgcGFydCBvZiB0aGUgUmVxdWVzdGVyIGNsYXNzLlxyXG4gKiBAY2FsbGJhY2sgc3R5bGVGdW5jXHJcbiAqIEBwYXJhbSB7b2wuRmVhdHVyZX0gZmVhdCAtIG9wZW5sYXllcnMgZmVhdHVyZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiAtIG1hcCByZXNvbHV0aW9uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29sb3JBcnJheSAtIGlucHV0IGNvbG9yIGFycmF5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcGFjaXR5IC0gdGhlIG9wYWNpdHkgMCB0byAxXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHJnYmEgc3RyaW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBfY29sb3JBcnJheVRvUmdiYShjb2xvckFycmF5LCBvcGFjaXR5KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICByZXR1cm4gYHJnYmEoJHtjb2xvckFycmF5WzBdfSwke2NvbG9yQXJyYXlbMV19LCR7Y29sb3JBcnJheVsyXX0sJHtvcGFjaXR5fSlgO1xyXG59XHJcblxyXG4vKipcclxuICogZXNjYXBlIGh0bWwgY2hhcmN0ZXJzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBpbnB1dCBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ30gZXNjYXBlZCBzdHJpbmdcclxuICovXHJcbmZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHN0cilcclxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG59XHJcblxyXG5ubS5odG1sRXNjYXBlID0gaHRtbEVzY2FwZTtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVzcmlSZXNwb25zZXtcclxuICAgIGRyYXdpbmdJbmZvOiB7XHJcbiAgICAgICAgcmVuZGVyZXI6IEVzcmlSZW5kZXJlclxyXG4gICAgfSxcclxuICAgIGdlb21ldHJ5VHlwZTogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXNyaVJlbmRlcmVye1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgc3ltYm9sOiBFc3JpU3ltYm9sO1xyXG4gICAgdW5pcXVlVmFsdWVJbmZvczogQXJyYXk8e2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnksIHN5bWJvbDogRXNyaVN5bWJvbH0+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVzcmlTeW1ib2x7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBvdXRsaW5lOntcclxuICAgICAgICBjb2xvcjogc3RyaW5nO1xyXG4gICAgICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICB9LFxyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbn1cclxuXHJcblxyXG5jbGFzcyBDb21tb25TeW1ib2wge1xyXG4gICAgbGVnZW5kSHRtbDogc3RyaW5nO1xyXG4gICAgb3BhY2l0eTogbnVtYmVyO1xyXG4gICAgc3ltYm9sT2JqOiBFc3JpU3ltYm9sO1xyXG4gICAgb2xTdHlsZTogb2wuc3R5bGUuU3R5bGV8QXJyYXk8b2wuc3R5bGUuU3R5bGU+fG9sLlN0eWxlRnVuY3Rpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN5bWJvbE9ialxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYm9sT2JqOiBFc3JpU3ltYm9sLCBvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN5bWJvbE9iaiA9IHN5bWJvbE9iajtcclxuICAgICAgICB0aGlzLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG4gICAgICAgIHRoaXMub2xTdHlsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgPSAnJztcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElDb21tb25TeW1ib2x7XHJcbiAgICBuZXcgKHN5bWJvbE9iajogRXNyaVN5bWJvbCwgb3BhY2l0eTogbnVtYmVyKTogQ29tbW9uU3ltYm9sXHJcbn1cclxuXHJcblxyXG5jbGFzcyBQb2ludFN5bWJvbCBleHRlbmRzIENvbW1vblN5bWJvbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzeW1ib2xPYmo6IEVzcmlTeW1ib2wsIG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHN5bWJvbE9iaiwgb3BhY2l0eSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN5bWJvbE9iai50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VzcmlTTVMnOlxyXG4gICAgICAgICAgICAgICAgbGV0IGlubmVyQ29sb3IgPSBfY29sb3JBcnJheVRvUmdiYSh0aGlzLnN5bWJvbE9iai5jb2xvciwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRlckNvbG9yID0gX2NvbG9yQXJyYXlUb1JnYmEodGhpcy5zeW1ib2xPYmoub3V0bGluZS5jb2xvciwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRsaW5lV2lkdGggPSB0aGlzLnN5bWJvbE9iai5vdXRsaW5lLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuc3ltYm9sT2JqLnNpemU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub2xTdHlsZSA9IG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbC5zdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sLnN0eWxlLkZpbGwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlubmVyQ29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7Y29sb3I6IG91dGVyQ29sb3IsIHdpZHRoOiBvdXRsaW5lV2lkdGh9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1pY29uXCIgc3R5bGU9XCJjb2xvcjogJHtpbm5lckNvbG9yfVwiPiYjOTY3OTs8L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlc3JpUE1TJzpcclxuICAgICAgICAgICAgICAgIHRoaXMub2xTdHlsZSA9IG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBvbC5zdHlsZS5JY29uKHtzcmM6IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHt0aGlzLnN5bWJvbE9ialsnaW1hZ2VEYXRhJ119YH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCA9IGA8aW1nIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBoZWlnaHQ9XCIxN1wiIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke3RoaXMuc3ltYm9sT2JqWydpbWFnZURhdGEnXX1cIj5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN5bWJvbE9iaik7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnUG9pbnQgc3ltYm9sIGRvZXMgbm90IGhhbmRsZSBzeW1ib2wgdHlwZTogJyArIHRoaXMuc3ltYm9sT2JqWyd0eXBlJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGluZVN5bWJvbCBleHRlbmRzIENvbW1vblN5bWJvbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzeW1ib2xPYmo6IEVzcmlTeW1ib2wsIG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHN5bWJvbE9iaiwgb3BhY2l0eSk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN5bWJvbE9iai50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VzcmlTTFMnOlxyXG4gICAgICAgICAgICAgICAgbGV0IGlubmVyQ29sb3IgPSBfY29sb3JBcnJheVRvUmdiYSh0aGlzLnN5bWJvbE9iai5jb2xvciwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lV2lkdGggPSB0aGlzLnN5bWJvbE9iai53aWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9sU3R5bGUgPSBuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpbm5lckNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xpbmVEYXNoOiBbNF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBsaW5lV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBzdHlsZT1cImA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYGJhY2tncm91bmQtY29sb3I6ICR7aW5uZXJDb2xvcn07YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgd2lkdGg6IDQwcHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgaGVpZ2h0OiA0cHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgcG9zaXRpb246IHJlbGF0aXZlO2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYGRpc3BsYXk6IGlubGluZS1ibG9jaztgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGB0b3A6IC0xcHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgXCI+PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ltYm9sT2JqKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdMaW5lIHN5bWJvbCBkb2VzIG5vdCBoYW5kbGUgc3ltYm9sIHR5cGU6ICcgKyB0aGlzLnN5bWJvbE9ialsndHlwZSddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBvbHlnb25TeW1ib2wgZXh0ZW5kcyBDb21tb25TeW1ib2wge1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYm9sT2JqOiBFc3JpU3ltYm9sLCBvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihzeW1ib2xPYmosIG9wYWNpdHkpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zeW1ib2xPYmpbJ3R5cGUnXSkge1xyXG4gICAgICAgICAgICBjYXNlICdlc3JpU0ZTJzpcclxuICAgICAgICAgICAgICAgIGxldCBpbm5lckNvbG9yID0gX2NvbG9yQXJyYXlUb1JnYmEodGhpcy5zeW1ib2xPYmouY29sb3IsIHRoaXMub3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0ZXJDb2xvciA9IF9jb2xvckFycmF5VG9SZ2JhKHRoaXMuc3ltYm9sT2JqLm91dGxpbmUuY29sb3IsIHRoaXMub3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0bGluZVdpZHRoID0gdGhpcy5zeW1ib2xPYmoub3V0bGluZS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9sU3R5bGUgPSBuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBvdXRlckNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xpbmVEYXNoOiBbNF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvdXRsaW5lV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBmaWxsOiBuZXcgb2wuc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpbm5lckNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1pY29uXCIgYDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgc3R5bGU9XCJgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBiYWNrZ3JvdW5kLWNvbG9yOiAke2lubmVyQ29sb3J9O2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYGJvcmRlcjogc29saWQgJHtvdXRlckNvbG9yfSAxcHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgd2lkdGg6IDQwcHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgaGVpZ2h0OiA5cHg7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVnZW5kSHRtbCArPSBgcG9zaXRpb246IHJlbGF0aXZlO2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZ2VuZEh0bWwgKz0gYGRpc3BsYXk6IGlubGluZS1ibG9jaztgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGB0b3A6IDJweDtgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGBcIj48L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3ltYm9sT2JqKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdQb2x5Z29uIHN5bWJvbCBkb2VzIGhhbmRsZSBzeW1ib2wgdHlwZTogJyArIHRoaXMuc3ltYm9sT2JqWyd0eXBlJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3ltYm9sR2VuZXJhdG9yIHtcclxuICAgIG9wYWNpdHk6IG51bWJlcjtcclxuICAgIHJlbmRlcmVyOiBFc3JpUmVuZGVyZXI7XHJcbiAgICBsZWdlbmRIdG1sOiBzdHJpbmc7XHJcbiAgICBvbFN0eWxlOiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihlc3JpUmVzcG9uc2U6IEVzcmlSZXNwb25zZSkge1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSA9ICgxMDAgLSAoZXNyaVJlc3BvbnNlWydkcmF3aW5nSW5mbyddWyd0cmFuc3BhcmVuY3knXSB8fCAwKSkgLyAxMDA7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IGVzcmlSZXNwb25zZS5kcmF3aW5nSW5mby5yZW5kZXJlcjtcclxuICAgICAgICB0aGlzLm9sU3R5bGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sZWdlbmRIdG1sID0gJyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpbmdsZVN5bWJvbCBleHRlbmRzIFN5bWJvbEdlbmVyYXRvciB7XHJcbiAgICBzeW1ib2w6IEVzcmlTeW1ib2w7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXNyaVJlc3BvbnNlIC0gbGF5ZXIgaW5mb1xyXG4gICAgICogQHBhcmFtIFN5bWJvbENsYXNzIC0gdGhlIHN5bWJvbCBjbGFzcyB0byB1c2VcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXNyaVJlc3BvbnNlLCBTeW1ib2xDbGFzczogSUNvbW1vblN5bWJvbCkge1xyXG4gICAgICAgIHN1cGVyKGVzcmlSZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSB0aGlzLnJlbmRlcmVyLnN5bWJvbDtcclxuICAgICAgICBsZXQgc3ltYm9sT2JqID0gbmV3IFN5bWJvbENsYXNzKHRoaXMuc3ltYm9sLCB0aGlzLm9wYWNpdHkpO1xyXG4gICAgICAgIHRoaXMub2xTdHlsZSA9IHN5bWJvbE9iai5vbFN0eWxlO1xyXG4gICAgICAgIHRoaXMubGVnZW5kSHRtbCA9IHN5bWJvbE9iai5sZWdlbmRIdG1sO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBVbmlxdWVWYWx1ZVN5bWJvbCBleHRlbmRzIFN5bWJvbEdlbmVyYXRvciB7XHJcblxyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICBkZWZhdWx0U3ltYm9sOiBFc3JpU3ltYm9sO1xyXG4gICAgZGVmYXVsdFN0eWxlOiBvbC5zdHlsZS5TdHlsZXxBcnJheTxvbC5zdHlsZS5TdHlsZT58b2wuU3R5bGVGdW5jdGlvbjtcclxuICAgIGRlZmF1bHRMYWJlbEh0bWw6IHN0cmluZztcclxuICAgIGxhYmVsQXJyYXk6IEFycmF5PHN0cmluZz47XHJcbiAgICBsZWdlbmRBcnJheTogQXJyYXk8c3RyaW5nPjtcclxuICAgIHByb3BlcnR5U3R5bGVMb29rdXA6IE9iamVjdDtcclxuICAgIHZhbHVlQXJyYXk6IEFycmF5PGFueT47XHJcbiAgICB1bmlxdWVWYWx1ZUluZm9zOiBBcnJheTx7bGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSwgc3ltYm9sOiBFc3JpU3ltYm9sfT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGVzcmlSZXNwb25zZSAtIGxheWVyIGluZm9cclxuICAgICAqIEBwYXJhbSBTeW1ib2xDbGFzcyAtIHRoZSBTeW1ib2wgY2xhc3MgZGVmaW5pdGlvblxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihlc3JpUmVzcG9uc2U6IEVzcmlSZXNwb25zZSwgU3ltYm9sQ2xhc3M6IElDb21tb25TeW1ib2wpIHtcclxuICAgICAgICBzdXBlcihlc3JpUmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMudW5pcXVlVmFsdWVJbmZvcyA9IHRoaXMucmVuZGVyZXJbJ3VuaXF1ZVZhbHVlSW5mb3MnXTtcclxuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHRoaXMucmVuZGVyZXJbJ2ZpZWxkMSddO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFN5bWJvbCA9IHRoaXMucmVuZGVyZXJbJ2RlZmF1bHRTeW1ib2wnXTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRTeW1ib2wpIHtcclxuICAgICAgICAgICAgbGV0IHN5bWJvbE9iaiA9IG5ldyBTeW1ib2xDbGFzcyh0aGlzLmRlZmF1bHRTeW1ib2wsIHRoaXMub3BhY2l0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFN0eWxlID0gc3ltYm9sT2JqLm9sU3R5bGU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdExhYmVsSHRtbCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtodG1sRXNjYXBlKHRoaXMucmVuZGVyZXJbJ2RlZmF1bHRMYWJlbCddKX08L3NwYW4+YCArIHN5bWJvbE9iai5sZWdlbmRIdG1sO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFN0eWxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRMYWJlbEh0bWwgPSAnb3RoZXInO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5sYWJlbEFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5sZWdlbmRBcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJvcGVydHlTdHlsZUxvb2t1cCA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCB1bmlxdWVWYWwgb2YgdGhpcy51bmlxdWVWYWx1ZUluZm9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxBcnJheS5wdXNoKHVuaXF1ZVZhbFsnbGFiZWwnXSk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVBcnJheS5wdXNoKHVuaXF1ZVZhbFsndmFsdWUnXSk7XHJcbiAgICAgICAgICAgIGxldCB1bmlxdWVTeW0gPSBuZXcgU3ltYm9sQ2xhc3ModW5pcXVlVmFsLnN5bWJvbCwgdGhpcy5vcGFjaXR5KTtcclxuICAgICAgICAgICAgdGhpcy5sZWdlbmRBcnJheS5wdXNoKGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtodG1sRXNjYXBlKHVuaXF1ZVZhbFsnbGFiZWwnXSl9PC9zcGFuPmAgKyB1bmlxdWVTeW0ubGVnZW5kSHRtbCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlTdHlsZUxvb2t1cFt1bmlxdWVWYWxbJ3ZhbHVlJ11dID0gdW5pcXVlU3ltLm9sU3R5bGU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5vbFN0eWxlID0gKGZlYXR1cmU6IG9sLkZlYXR1cmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNoZWNrUHJvcGVydGllcyA9IGZlYXR1cmUuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tQcm9wZXJ0eSA9IGNoZWNrUHJvcGVydGllc1t0aGlzLnByb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnR5U3R5bGVMb29rdXBbY2hlY2tQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBbdGhpcy5wcm9wZXJ0eVN0eWxlTG9va3VwW2NoZWNrUHJvcGVydHldXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBbdGhpcy5kZWZhdWx0U3R5bGVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGVmYXVsdExhYmVsSHRtbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxlZ2VuZEFycmF5LnB1c2godGhpcy5kZWZhdWx0TGFiZWxIdG1sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGVnZW5kSHRtbCA9ICc8dWw+JztcclxuICAgICAgICBmb3IgKGxldCBoIG9mIHRoaXMubGVnZW5kQXJyYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9IGA8bGk+JHtofTwvbGk+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sZWdlbmRIdG1sICs9ICc8L3VsPic7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogc3R5bGUgYW5kIGxlZ2VuZCBvYmplY3RcclxuICogQHR5cGVkZWYge29iamVjdH0gc3R5bGVBbmRMZWdlbmRcclxuICogQHByb3BlcnR5IHtzdHlsZUZ1bmN9IHN0eWxlIC0gc3R5bGUgZnVuY3Rpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxlZ2VuZCAtIGxlZ2VuZCBjb250ZW50XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlc3JpUmVzcG9uc2UgLSBsYXllciBpbmZvXHJcbiAqIEByZXR1cm5zIHtzdHlsZUFuZExlZ2VuZH0gc3R5bGUgYW5kIGxlZ2VuZCBvYmplY3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlRmVhdHVyZVNlcnZpY2VMZWdlbmRBbmRTeW1ib2woZXNyaVJlc3BvbnNlOiBFc3JpUmVzcG9uc2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgbGV0IHJlbmRlcmVyID0gZXNyaVJlc3BvbnNlLmRyYXdpbmdJbmZvLnJlbmRlcmVyO1xyXG4gICAgbGV0IHN5bWJvbExlZ2VuZE91dDogU3ltYm9sR2VuZXJhdG9yID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2ggKHJlbmRlcmVyLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdzaW1wbGUnOlxyXG4gICAgICAgICAgICBzd2l0Y2ggKGVzcmlSZXNwb25zZS5nZW9tZXRyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VzcmlHZW9tZXRyeVBvaW50JzpcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2xMZWdlbmRPdXQgPSBuZXcgU2luZ2xlU3ltYm9sKGVzcmlSZXNwb25zZSwgUG9pbnRTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbExlZ2VuZE91dCA9IG5ldyBTaW5nbGVTeW1ib2woZXNyaVJlc3BvbnNlLCBMaW5lU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VzcmlHZW9tZXRyeVBvbHlnb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbExlZ2VuZE91dCA9IG5ldyBTaW5nbGVTeW1ib2woZXNyaVJlc3BvbnNlLCBQb2x5Z29uU3ltYm9sKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXNyaVJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChlc3JpUmVzcG9uc2UuZ2VvbWV0cnlUeXBlICsgJyBub3QgaGFuZGxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3VuaXF1ZVZhbHVlJzpcclxuICAgICAgICAgICAgc3dpdGNoIChlc3JpUmVzcG9uc2UuZ2VvbWV0cnlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlc3JpR2VvbWV0cnlQb2ludCc6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sTGVnZW5kT3V0ID0gbmV3IFVuaXF1ZVZhbHVlU3ltYm9sKGVzcmlSZXNwb25zZSwgUG9pbnRTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXNyaUdlb21ldHJ5UG9seWxpbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbExlZ2VuZE91dCA9IG5ldyBVbmlxdWVWYWx1ZVN5bWJvbChlc3JpUmVzcG9uc2UsIExpbmVTeW1ib2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXNyaUdlb21ldHJ5UG9seWdvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sTGVnZW5kT3V0ID0gbmV3IFVuaXF1ZVZhbHVlU3ltYm9sKGVzcmlSZXNwb25zZSwgUG9seWdvblN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVzcmlSZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXNyaVJlc3BvbnNlWydnZW9tZXRyeVR5cGUnXSArICcgbm90IGhhbmRsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBhbGVydCgnbm90IGhhbmRsZWQgcmVuZGVyZXIgdHlwZTogJyArIHJlbmRlcmVyWyd0eXBlJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzeW1ib2xMZWdlbmRPdXQgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB7c3R5bGU6IHVuZGVmaW5lZCwgbGVnZW5kOiAnJ307XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7c3R5bGU6IHN5bWJvbExlZ2VuZE91dC5vbFN0eWxlLCBsZWdlbmQ6IHN5bWJvbExlZ2VuZE91dC5sZWdlbmRIdG1sfTtcclxuICAgIH1cclxufVxyXG5cclxubm0ubWFrZUZlYXR1cmVTZXJ2aWNlTGVnZW5kQW5kU3ltYm9sID0gbWFrZUZlYXR1cmVTZXJ2aWNlTGVnZW5kQW5kU3ltYm9sO1xyXG5cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gbHlyT2JqZWN0IC0gdGhlIGxheWVyIGFzIGRlZmluZWQgaW4gdGhlIHJlc3BvbnNlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBMYXllck5hbWVBbmRFeHBhbmRlcj1mYWxzZV0gdXNlIG9ubHkgaWNvbnNcclxuICogQHJldHVybnMge3N0cmluZ30gbGVnZW5kIGh0bWxcclxuICovXHJcbmZ1bmN0aW9uIG1hcFNlcnZpY2VMZWdlbmRJdGVtKGx5ck9iamVjdCwgc2tpcExheWVyTmFtZUFuZEV4cGFuZGVyOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHJcblxyXG4gICAgc2tpcExheWVyTmFtZUFuZEV4cGFuZGVyID0gdHlwZW9mIHNraXBMYXllck5hbWVBbmRFeHBhbmRlciA9PSAnYm9vbGVhbicgPyBza2lwTGF5ZXJOYW1lQW5kRXhwYW5kZXIgOiBmYWxzZTtcclxuICAgIGxldCBsYXllck5hbWUgPSBseXJPYmplY3RbJ2xheWVyTmFtZSddO1xyXG4gICAgbGV0IGxlZ2VuZEl0ZW1zID0gbHlyT2JqZWN0WydsZWdlbmQnXTtcclxuICAgIGxldCBsZWdlbmRIdG1sID0gJyc7XHJcblxyXG4gICAgaWYgKCFza2lwTGF5ZXJOYW1lQW5kRXhwYW5kZXIpIHtcclxuICAgICAgICBsZWdlbmRIdG1sICs9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtsYXllck5hbWV9PC9zcGFuPmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxlZ2VuZEl0ZW1zLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgbGVnZW5kSHRtbCA9IGA8aW1nIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBoZWlnaHQ9XCIxN1wiIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke2xlZ2VuZEl0ZW1zWzBdWydpbWFnZURhdGEnXX1cIj5gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXNraXBMYXllck5hbWVBbmRFeHBhbmRlcikge1xyXG4gICAgICAgICAgICBsZWdlbmRIdG1sICs9ICc8c3BhbiBjbGFzcz1cImxlZ2VuZC1pdGVtcy1leHBhbmRlclwiIHRpdGxlPVwiRXhwYW5kL0NvbGxhcHNlXCI+JiM5NjYwOzwvc3Bhbj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZWdlbmRIdG1sICs9ICc8dWw+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxlZ2VuZEh0bWwgKz0gYDxsaT5gO1xyXG4gICAgICAgICAgICBsZWdlbmRIdG1sICs9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtodG1sRXNjYXBlKGxlZ2VuZEl0ZW1zW2ldWydsYWJlbCddKX08L3NwYW4+YDtcclxuICAgICAgICAgICAgbGVnZW5kSHRtbCArPSBgPGltZyBjbGFzcz1cImxlZ2VuZC1sYXllci1pY29uXCIgaGVpZ2h0PVwiMTdcIiBzcmM9XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsJHtsZWdlbmRJdGVtc1tpXVsnaW1hZ2VEYXRhJ119XCI+YDtcclxuICAgICAgICAgICAgbGVnZW5kSHRtbCArPSBgPC9saT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZWdlbmRIdG1sICs9ICc8L3VsPic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFza2lwTGF5ZXJOYW1lQW5kRXhwYW5kZXIpIHtcclxuICAgICAgICBsZWdlbmRIdG1sID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2xheWVyTmFtZX08L3NwYW4+YCArIGxlZ2VuZEh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxlZ2VuZEh0bWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBtYWtlIG1hcCBzZXJ2aWNlIGxlZ2VudFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZXNyaVJlc3BvbnNlIC0gbGF5ZXIgaW5mb1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBsZWdlbmQgY29udGVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VNYXBTZXJ2aWNlTGVnZW5kKGVzcmlSZXNwb25zZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbGV0IG5ld0xlZ2VuZEh0bWwgPSAnJztcclxuXHJcbiAgICBsZXQgbGF5ZXJzID0gZXNyaVJlc3BvbnNlWydsYXllcnMnXTtcclxuXHJcbiAgICBpZiAobGF5ZXJzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgbmV3TGVnZW5kSHRtbCArPSBtYXBTZXJ2aWNlTGVnZW5kSXRlbShsYXllcnNbMF0sIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdMZWdlbmRIdG1sICs9ICc8dWw+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuZXdMZWdlbmRIdG1sICs9ICc8bGk+JyArIG1hcFNlcnZpY2VMZWdlbmRJdGVtKGxheWVyc1tpXSkgKyAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdMZWdlbmRIdG1sICs9ICc8L3VsPic7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0xlZ2VuZEh0bWw7XHJcbn1cclxuXHJcbm5tLm1ha2VNYXBTZXJ2aWNlTGVnZW5kID0gbWFrZU1hcFNlcnZpY2VMZWdlbmQ7XHJcbiJdfQ==

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 12/16/2015.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var makeGuid_1 = __webpack_require__(3);
var mapMove_1 = __webpack_require__(6);
var nm = provide_1.default('collections');
var $ = __webpack_require__(1);
var LayerGroup = (function () {
    /**
     *
     * @param {object} [groupConfig={}] - group configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} [groupConfig.collapse=false] - if the group should be collapsed initially
     * @param {boolean} [groupConfig.addCheck=true] - if the group should have a checkbox controlling visibility of all layers
     * @param {LayerGroup} [parent=undefined] - the parent group
     */
    function LayerGroup(groupConfig, parent) {
        this.groupLayers = [];
        this.groupLayersLookup = {};
        this.groupGroups = [];
        this.groupGroupsLookup = {};
        this.itemIdArray = [];
        if (typeof groupConfig == 'undefined') {
            this.parent = null;
            this.groupId = 'root';
            this.groupName = 'root';
            this.allGroupLookup = { root: this };
            this.allGroupArray = [this];
            this.allLayerArray = [];
            this.allLayerLookup = {};
            this.layerParentLookup = {};
            this.collapse = false;
            this.addCheck = false;
        }
        else {
            this.groupId = makeGuid_1.default();
            this.parent = parent;
            this.groupName = groupConfig.groupName;
            this.collapse = typeof groupConfig.collapse == 'boolean' ? groupConfig.collapse : false;
            this.addCheck = typeof groupConfig.addCheck == 'boolean' ? groupConfig.addCheck : true;
        }
    }
    /**
     *
     * @param {object} groupConfig - configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} groupConfig.collapse if the group should be collapsed initially
     * @param {boolean} groupConfig.addCheck if the group should have a checkbox controlling visibility of all layers
     * @param {Array<LayerGroup>} parents parent groups
     * @returns {LayerGroup} the layer group just added
     */
    LayerGroup.prototype.addGroup = function (groupConfig, parents) {
        var parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        }
        else {
            parent = 'root';
        }
        /**
         * @type {LayerGroup}
         */
        var parentGroup = this.allGroupLookup[parent];
        var newGroup = new LayerGroup(groupConfig, parentGroup);
        this.allGroupLookup[newGroup.groupId] = newGroup;
        this.allGroupArray.push(newGroup);
        parentGroup.groupGroups.push(newGroup);
        parentGroup.groupGroupsLookup[newGroup.groupId] = newGroup;
        if (parentGroup.itemIdArray.indexOf(newGroup.groupId) > 0) {
            console.log(newGroup.groupId);
            throw 'layer and group ids must be unique';
        }
        parentGroup.itemIdArray.push(newGroup.groupId);
        return newGroup;
    };
    /**
     *
     * @param {LayerBase} newLayer the layer to be added
     * @param {Array} parents array
     */
    LayerGroup.prototype.addLegendLayer = function (newLayer, parents) {
        var parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        }
        else {
            parent = 'root';
        }
        this.allLayerLookup[newLayer.id] = newLayer;
        this.allLayerArray.push(newLayer);
        /**
         * @type {LayerGroup}
         */
        var parentGroup = this.allGroupLookup[parent];
        parentGroup.groupLayers.push(newLayer);
        parentGroup.groupLayersLookup[newLayer.id] = newLayer;
        if (parentGroup.itemIdArray.indexOf(newLayer.id) > 0) {
            console.log(newLayer.id);
            throw 'layer and group ids must be unique';
        }
        parentGroup.itemIdArray.push(newLayer.id);
        this.layerParentLookup[newLayer.id] = parentGroup;
    };
    LayerGroup.prototype.getLegendHtml = function (legendId, options) {
        var legendHtml = "<ul id=\"" + legendId + "\" class=\"legend-container\">";
        legendHtml += "<li>" + options.legendTitle + "<input type=\"checkbox\" checked id=\"suppress-by-extent-" + legendId + "\" class=\"suppress-by-extent\">" +
            ("<label title=\"Suppress layers not visible at this zoom level\" for=\"suppress-by-extent-" + legendId + "\">") +
            "<span></span>" +
            "</label></li>";
        legendHtml += this._buildLegend(this.itemIdArray, this, options.layerDivClasses) + '</ul>';
        return legendHtml;
    };
    /**
     * @param {Array} itemIds the items to process
     * @param {LayerGroup} theGroup new group
     * @param {Array} [layerDivClasses=[]] optional classes to apply to the layer divs
     * @static
     * @returns {string} html string
     */
    LayerGroup.prototype._buildLegend = function (itemIds, theGroup, layerDivClasses) {
        if (itemIds.length == 0) {
            return '';
        }
        var theHml = '';
        var itemId = itemIds[0];
        if (theGroup.groupLayersLookup[itemId]) {
            /**
             * @type {LayerBase}
             */
            var lyr = theGroup.groupLayersLookup[itemId];
            theHml += "<li id=\"" + lyr.id + "-layer-li\" class=\"legend-layer-li " + layerDivClasses.join(' ') + "\">" + lyr.getLegendDiv() + '</li>';
        }
        else if (theGroup.groupGroupsLookup[itemId]) {
            /**
             * type {LayerGroup}
             */
            var otherGroup = theGroup.groupGroupsLookup[itemId];
            theHml += "<li>";
            theHml += "<div id=\"" + otherGroup.groupId + "-legend-layer-div\" " +
                ("class=\"legend-layer-group  " + layerDivClasses.join(' ') + "\">");
            if (otherGroup.addCheck) {
                theHml += "<input type=\"checkbox\" checked id=\"" + otherGroup.groupId + "-group-chck\">" +
                    ("<label for=\"" + otherGroup.groupId + "-group-chck\" title=\"Click arrow to expand or collapse\">" + otherGroup.groupName + "</label>");
            }
            else {
                theHml += "<label title=\"Click arrow to expand or collapse\">" + otherGroup.groupName + "</label>";
            }
            theHml += "<span title=\"Expand/Collapse\" class=\"layer-group-expander";
            theHml += (otherGroup.collapse ? ' legend-layer-group-initial-collapse' : '') + "\">";
            theHml += otherGroup.collapse ? '&#9654;' : '&#9660;';
            theHml += '</span>';
            //parents.push(groupId);
            theHml += '<ul>' + this._buildLegend(otherGroup.itemIdArray, otherGroup, layerDivClasses) + '</ul>';
            theHml += '</div>';
            theHml += '</li>';
        }
        return theHml + this._buildLegend(itemIds.slice(1), theGroup, layerDivClasses);
    };
    return LayerGroup;
}());
/**
 * a wrapper to make a legend
 */
var LayerLegend = (function () {
    /**
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {boolean} [options.scaleDependent=true] if legend display is scale dependent
     */
    function LayerLegend(legendItems, divId, options) {
        for (var _i = 0, legendItems_1 = legendItems; _i < legendItems_1.length; _i++) {
            var i = legendItems_1[_i];
            if (typeof i == 'undefined') {
                throw 'undefined item passed in array to legend constructor';
            }
        }
        options = options || {};
        options.legendTitle = typeof options.legendTitle == 'string' ? options.legendTitle : 'Legend';
        options.scaleDependent = typeof options.scaleDependent == 'boolean' ? options.scaleDependent : true;
        options.layerDivClasses = options.layerDivClasses || [];
        // if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            mapMove_1.default.checkInit();
        }
        this.$divElement = $('#' + divId);
        this._legendItems = legendItems;
        this.layerGroup = new LayerGroup();
        this._buildTree(legendItems);
        this.legendId = makeGuid_1.default();
        this.$divElement.append(this.layerGroup.getLegendHtml(this.legendId, options));
        for (var _a = 0, _b = this.layerGroup.allLayerArray; _a < _b.length; _a++) {
            var l = _b[_a];
            l.applyCollapse();
        }
        var _this = this;
        //// if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            mapMove_1.default.checkInit();
            mapMove_1.default.addCallback(function (ext, zoom, evt) {
                if (typeof evt == 'undefined' || evt == 'change:resolution') {
                    for (var _i = 0, _a = this.layerGroup.allLayerArray; _i < _a.length; _i++) {
                        var lyr = _a[_i];
                        var $lyrLi = $('#' + lyr.id + '-layer-li');
                        if (zoom > lyr.maxZoom || zoom < lyr.minZoom) {
                            $lyrLi.addClass('layer-not-visible');
                        }
                        else {
                            $lyrLi.removeClass('layer-not-visible');
                        }
                    }
                }
            }, this, 100, true, 'legend1');
        }
        // <editor-fold desc="add event listeners">
        this.$divElement.find(".suppress-by-extent").change(function () {
            var legendLayerLis = $('.legend-layer-li');
            if (this.checked) {
                legendLayerLis.removeClass('layer-force-show');
            }
            else {
                legendLayerLis.addClass('layer-force-show');
            }
        });
        this.$divElement.find('.legend-check').change(function () {
            var lyrId = this.id.replace('-legend-layer-check', '');
            _this.layerGroup.allLayerLookup[lyrId].visible = this.checked;
        });
        this.$divElement.find('.legend-layer-group > input[type=checkbox]').change(function () {
            $(this).siblings('ul').find('input[type=checkbox]').prop('checked', this.checked).trigger('change');
        });
        this.$divElement.find('.layer-group-expander').click(function () {
            var $this = $(this);
            $this.removeClass('legend-layer-group-initial-collapse');
            $this.siblings('ul').slideToggle();
            if ($this.hasClass('legend-layer-group-collapsed')) {
                $this.removeClass('legend-layer-group-collapsed');
                $this.html('&#9660;');
            }
            else {
                $this.addClass('legend-layer-group-collapsed');
                $this.html('&#9654;');
            }
        });
        this.$divElement.find('.legend-layer-group-initial-collapse').trigger('click');
        // </editor-fold>
    }
    /**
     * @param {Array} [legendItems=this._layerConfig] the legend items
     * @param {Array} [parents=[]] the ordered list of groups in which this item is a member
     * @private
     */
    LayerLegend.prototype._buildTree = function (legendItems, parents) {
        if (legendItems.length == 0) {
            return;
        }
        var oneItem = legendItems[0];
        //reset the parent if the item is in the base array
        if (this._legendItems.indexOf(oneItem) > -1 || typeof parents == 'undefined') {
            parents = [];
        }
        if (typeof oneItem['groupName'] !== 'undefined') {
            var groupItem = legendItems[0];
            var newGroup = this.layerGroup.addGroup(groupItem, parents);
            parents.push(newGroup.groupId);
            this._buildTree(groupItem.items, parents);
        }
        else {
            /**
             * @type {LayerBase}
             */
            var layerItem = legendItems[0];
            this.layerGroup.addLegendLayer(layerItem, parents);
        }
        this._buildTree(legendItems.slice(1), parents);
    };
    return LayerLegend;
}());
nm.LayerLegend = LayerLegend;
exports.default = LayerLegend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJMZWdlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMYXllckxlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgsMkNBQXNDO0FBQ3RDLDZDQUF3QztBQUN4QyxnREFBMkM7QUFFM0MsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoQywwQkFBNkI7QUFFN0I7SUFpQkk7Ozs7Ozs7T0FPRztJQUNILG9CQUFZLFdBQVksRUFBRSxNQUFPO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFD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RSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBbEpELElBa0pDO0FBRUQsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDN0Isa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTYvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgbWFrZUd1aWQgZnJvbSAnLi4vdXRpbC9tYWtlR3VpZCc7XHJcbmltcG9ydCBtYXBNb3ZlIGZyb20gJy4uL29sSGVscGVycy9tYXBNb3ZlJztcclxuXHJcbmxldCBubSA9IHByb3ZpZGUoJ2NvbGxlY3Rpb25zJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5jbGFzcyBMYXllckdyb3VwIHtcclxuICAgIGdyb3VwTGF5ZXJzOiBhbnk7XHJcbiAgICBncm91cExheWVyc0xvb2t1cDogYW55O1xyXG4gICAgZ3JvdXBHcm91cHNMb29rdXA6IGFueTtcclxuICAgIGdyb3VwR3JvdXBzOiBhbnk7XHJcbiAgICBpdGVtSWRBcnJheTogYW55O1xyXG4gICAgZ3JvdXBJZDogYW55O1xyXG4gICAgZ3JvdXBOYW1lOiBhbnk7XHJcbiAgICBhbGxMYXllckFycmF5OiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuICAgIGFsbEdyb3VwQXJyYXk6IGFueTtcclxuICAgIGFsbEdyb3VwTG9va3VwOiBhbnk7XHJcbiAgICBhbGxMYXllckxvb2t1cDogYW55O1xyXG4gICAgY29sbGFwc2U6IGFueTtcclxuICAgIGFkZENoZWNrOiBhbnk7XHJcbiAgICBsYXllclBhcmVudExvb2t1cDogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbZ3JvdXBDb25maWc9e31dIC0gZ3JvdXAgY29uZmlndXJhdGlvbiBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cENvbmZpZy5ncm91cE5hbWUgLSB0aGUgZ3JvdXAgbmFtZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZ3JvdXBDb25maWcuY29sbGFwc2U9ZmFsc2VdIC0gaWYgdGhlIGdyb3VwIHNob3VsZCBiZSBjb2xsYXBzZWQgaW5pdGlhbGx5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtncm91cENvbmZpZy5hZGRDaGVjaz10cnVlXSAtIGlmIHRoZSBncm91cCBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGNvbnRyb2xsaW5nIHZpc2liaWxpdHkgb2YgYWxsIGxheWVyc1xyXG4gICAgICogQHBhcmFtIHtMYXllckdyb3VwfSBbcGFyZW50PXVuZGVmaW5lZF0gLSB0aGUgcGFyZW50IGdyb3VwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGdyb3VwQ29uZmlnPywgcGFyZW50Pykge1xyXG4gICAgICAgIHRoaXMuZ3JvdXBMYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmdyb3VwTGF5ZXJzTG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5ncm91cEdyb3VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBHcm91cHNMb29rdXAgPSB7fTtcclxuICAgICAgICB0aGlzLml0ZW1JZEFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBDb25maWcgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwSWQgPSAncm9vdCc7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lID0gJ3Jvb3QnO1xyXG4gICAgICAgICAgICB0aGlzLmFsbEdyb3VwTG9va3VwID0ge3Jvb3Q6IHRoaXN9O1xyXG4gICAgICAgICAgICB0aGlzLmFsbEdyb3VwQXJyYXkgPSBbdGhpc107XHJcbiAgICAgICAgICAgIHRoaXMuYWxsTGF5ZXJBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmFsbExheWVyTG9va3VwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJQYXJlbnRMb29rdXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cElkID0gbWFrZUd1aWQoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBOYW1lID0gZ3JvdXBDb25maWcuZ3JvdXBOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlID0gdHlwZW9mICBncm91cENvbmZpZy5jb2xsYXBzZSA9PSAnYm9vbGVhbicgPyBncm91cENvbmZpZy5jb2xsYXBzZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoZWNrID0gdHlwZW9mICBncm91cENvbmZpZy5hZGRDaGVjayA9PSAnYm9vbGVhbicgPyBncm91cENvbmZpZy5hZGRDaGVjayA6IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBncm91cENvbmZpZyAtIGNvbmZpZ3VyYXRpb24gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBDb25maWcuZ3JvdXBOYW1lIC0gdGhlIGdyb3VwIG5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZ3JvdXBDb25maWcuY29sbGFwc2UgaWYgdGhlIGdyb3VwIHNob3VsZCBiZSBjb2xsYXBzZWQgaW5pdGlhbGx5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGdyb3VwQ29uZmlnLmFkZENoZWNrIGlmIHRoZSBncm91cCBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGNvbnRyb2xsaW5nIHZpc2liaWxpdHkgb2YgYWxsIGxheWVyc1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxMYXllckdyb3VwPn0gcGFyZW50cyBwYXJlbnQgZ3JvdXBzXHJcbiAgICAgKiBAcmV0dXJucyB7TGF5ZXJHcm91cH0gdGhlIGxheWVyIGdyb3VwIGp1c3QgYWRkZWRcclxuICAgICAqL1xyXG4gICAgYWRkR3JvdXAoZ3JvdXBDb25maWcsIHBhcmVudHMpIHtcclxuICAgICAgICBsZXQgcGFyZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9ICdyb290JztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TGF5ZXJHcm91cH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgcGFyZW50R3JvdXAgPSB0aGlzLmFsbEdyb3VwTG9va3VwW3BhcmVudF07XHJcbiAgICAgICAgbGV0IG5ld0dyb3VwID0gbmV3IExheWVyR3JvdXAoZ3JvdXBDb25maWcsIHBhcmVudEdyb3VwKTtcclxuICAgICAgICB0aGlzLmFsbEdyb3VwTG9va3VwW25ld0dyb3VwLmdyb3VwSWRdID0gbmV3R3JvdXA7XHJcbiAgICAgICAgdGhpcy5hbGxHcm91cEFycmF5LnB1c2gobmV3R3JvdXApO1xyXG5cclxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cEdyb3Vwcy5wdXNoKG5ld0dyb3VwKTtcclxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cEdyb3Vwc0xvb2t1cFtuZXdHcm91cC5ncm91cElkXSA9IG5ld0dyb3VwO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50R3JvdXAuaXRlbUlkQXJyYXkuaW5kZXhPZihuZXdHcm91cC5ncm91cElkKSA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3R3JvdXAuZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgIHRocm93ICdsYXllciBhbmQgZ3JvdXAgaWRzIG11c3QgYmUgdW5pcXVlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyZW50R3JvdXAuaXRlbUlkQXJyYXkucHVzaChuZXdHcm91cC5ncm91cElkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0dyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJCYXNlfSBuZXdMYXllciB0aGUgbGF5ZXIgdG8gYmUgYWRkZWRcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhcmVudHMgYXJyYXlcclxuICAgICAqL1xyXG4gICAgYWRkTGVnZW5kTGF5ZXIobmV3TGF5ZXIsIHBhcmVudHMpIHtcclxuICAgICAgICBsZXQgcGFyZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9ICdyb290JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWxsTGF5ZXJMb29rdXBbbmV3TGF5ZXIuaWRdID0gbmV3TGF5ZXI7XHJcbiAgICAgICAgdGhpcy5hbGxMYXllckFycmF5LnB1c2gobmV3TGF5ZXIpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7TGF5ZXJHcm91cH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgcGFyZW50R3JvdXAgPSB0aGlzLmFsbEdyb3VwTG9va3VwW3BhcmVudF07XHJcblxyXG4gICAgICAgIHBhcmVudEdyb3VwLmdyb3VwTGF5ZXJzLnB1c2gobmV3TGF5ZXIpO1xyXG4gICAgICAgIHBhcmVudEdyb3VwLmdyb3VwTGF5ZXJzTG9va3VwW25ld0xheWVyLmlkXSA9IG5ld0xheWVyO1xyXG4gICAgICAgIGlmIChwYXJlbnRHcm91cC5pdGVtSWRBcnJheS5pbmRleE9mKG5ld0xheWVyLmlkKSA+IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3TGF5ZXIuaWQpO1xyXG4gICAgICAgICAgICB0aHJvdyAnbGF5ZXIgYW5kIGdyb3VwIGlkcyBtdXN0IGJlIHVuaXF1ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudEdyb3VwLml0ZW1JZEFycmF5LnB1c2gobmV3TGF5ZXIuaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmxheWVyUGFyZW50TG9va3VwW25ld0xheWVyLmlkXSA9IHBhcmVudEdyb3VwO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWdlbmRIdG1sKGxlZ2VuZElkLCBvcHRpb25zKSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgbGVnZW5kSHRtbCA9IGA8dWwgaWQ9XCIke2xlZ2VuZElkfVwiIGNsYXNzPVwibGVnZW5kLWNvbnRhaW5lclwiPmA7XHJcblxyXG4gICAgICAgIGxlZ2VuZEh0bWwgKz0gYDxsaT4ke29wdGlvbnMubGVnZW5kVGl0bGV9PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQgaWQ9XCJzdXBwcmVzcy1ieS1leHRlbnQtJHtsZWdlbmRJZH1cIiBjbGFzcz1cInN1cHByZXNzLWJ5LWV4dGVudFwiPmAgK1xyXG4gICAgICAgICAgICBgPGxhYmVsIHRpdGxlPVwiU3VwcHJlc3MgbGF5ZXJzIG5vdCB2aXNpYmxlIGF0IHRoaXMgem9vbSBsZXZlbFwiIGZvcj1cInN1cHByZXNzLWJ5LWV4dGVudC0ke2xlZ2VuZElkfVwiPmAgK1xyXG4gICAgICAgICAgICBgPHNwYW4+PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPC9sYWJlbD48L2xpPmA7XHJcblxyXG4gICAgICAgIGxlZ2VuZEh0bWwgKz0gdGhpcy5fYnVpbGRMZWdlbmQodGhpcy5pdGVtSWRBcnJheSwgdGhpcywgb3B0aW9ucy5sYXllckRpdkNsYXNzZXMpICsgJzwvdWw+JztcclxuXHJcbiAgICAgICAgcmV0dXJuIGxlZ2VuZEh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtSWRzIHRoZSBpdGVtcyB0byBwcm9jZXNzXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyR3JvdXB9IHRoZUdyb3VwIG5ldyBncm91cFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2xheWVyRGl2Q2xhc3Nlcz1bXV0gb3B0aW9uYWwgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgbGF5ZXIgZGl2c1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbCBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgX2J1aWxkTGVnZW5kKGl0ZW1JZHMsIHRoZUdyb3VwLCBsYXllckRpdkNsYXNzZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1JZHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRoZUhtbCA9ICcnO1xyXG5cclxuICAgICAgICBsZXQgaXRlbUlkID0gaXRlbUlkc1swXTtcclxuXHJcbiAgICAgICAgaWYgKHRoZUdyb3VwLmdyb3VwTGF5ZXJzTG9va3VwW2l0ZW1JZF0pIHtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7TGF5ZXJCYXNlfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGV0IGx5ciA9IHRoZUdyb3VwLmdyb3VwTGF5ZXJzTG9va3VwW2l0ZW1JZF07XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSBgPGxpIGlkPVwiJHtseXIuaWR9LWxheWVyLWxpXCIgY2xhc3M9XCJsZWdlbmQtbGF5ZXItbGkgJHtsYXllckRpdkNsYXNzZXMuam9pbignICcpfVwiPmAgKyBseXIuZ2V0TGVnZW5kRGl2KCkgKyAnPC9saT4nO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGVHcm91cC5ncm91cEdyb3Vwc0xvb2t1cFtpdGVtSWRdKSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiB0eXBlIHtMYXllckdyb3VwfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGV0IG90aGVyR3JvdXAgPSB0aGVHcm91cC5ncm91cEdyb3Vwc0xvb2t1cFtpdGVtSWRdO1xyXG5cclxuICAgICAgICAgICAgdGhlSG1sICs9IGA8bGk+YDtcclxuICAgICAgICAgICAgdGhlSG1sICs9IGA8ZGl2IGlkPVwiJHtvdGhlckdyb3VwLmdyb3VwSWR9LWxlZ2VuZC1sYXllci1kaXZcIiBgICtcclxuICAgICAgICAgICAgICAgIGBjbGFzcz1cImxlZ2VuZC1sYXllci1ncm91cCAgJHtsYXllckRpdkNsYXNzZXMuam9pbignICcpfVwiPmA7XHJcblxyXG4gICAgICAgICAgICBpZiAob3RoZXJHcm91cC5hZGRDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgdGhlSG1sICs9IGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZCBpZD1cIiR7b3RoZXJHcm91cC5ncm91cElkfS1ncm91cC1jaGNrXCI+YCArXHJcbiAgICAgICAgICAgICAgICAgICAgYDxsYWJlbCBmb3I9XCIke290aGVyR3JvdXAuZ3JvdXBJZH0tZ3JvdXAtY2hja1wiIHRpdGxlPVwiQ2xpY2sgYXJyb3cgdG8gZXhwYW5kIG9yIGNvbGxhcHNlXCI+JHtvdGhlckdyb3VwLmdyb3VwTmFtZX08L2xhYmVsPmA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGVIbWwgKz0gYDxsYWJlbCB0aXRsZT1cIkNsaWNrIGFycm93IHRvIGV4cGFuZCBvciBjb2xsYXBzZVwiPiR7b3RoZXJHcm91cC5ncm91cE5hbWV9PC9sYWJlbD5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGVIbWwgKz0gYDxzcGFuIHRpdGxlPVwiRXhwYW5kL0NvbGxhcHNlXCIgY2xhc3M9XCJsYXllci1ncm91cC1leHBhbmRlcmA7XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSBgJHtvdGhlckdyb3VwLmNvbGxhcHNlID8gJyBsZWdlbmQtbGF5ZXItZ3JvdXAtaW5pdGlhbC1jb2xsYXBzZScgOiAnJ31cIj5gO1xyXG4gICAgICAgICAgICB0aGVIbWwgKz0gb3RoZXJHcm91cC5jb2xsYXBzZSA/ICcmIzk2NTQ7JyA6ICcmIzk2NjA7JztcclxuICAgICAgICAgICAgdGhlSG1sICs9ICc8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICAgIC8vcGFyZW50cy5wdXNoKGdyb3VwSWQpO1xyXG4gICAgICAgICAgICB0aGVIbWwgKz0gJzx1bD4nICsgdGhpcy5fYnVpbGRMZWdlbmQob3RoZXJHcm91cC5pdGVtSWRBcnJheSwgb3RoZXJHcm91cCwgbGF5ZXJEaXZDbGFzc2VzKSArICc8L3VsPic7XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgdGhlSG1sICs9ICc8L2xpPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhlSG1sICsgdGhpcy5fYnVpbGRMZWdlbmQoaXRlbUlkcy5zbGljZSgxKSwgdGhlR3JvdXAsIGxheWVyRGl2Q2xhc3Nlcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhIHdyYXBwZXIgdG8gbWFrZSBhIGxlZ2VuZFxyXG4gKi9cclxuY2xhc3MgTGF5ZXJMZWdlbmQge1xyXG5cclxuICAgICRkaXZFbGVtZW50OiBhbnk7XHJcbiAgICBfbGVnZW5kSXRlbXM6IGFueTtcclxuICAgIGxheWVyR3JvdXA6IGFueTtcclxuICAgIGxlZ2VuZElkOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGVnZW5kSXRlbXMgYXJyYXkgb2YgbGF5ZXJzIG9yIG9iamVjdHMgd2l0aCB7Z3JvdXBOYW1lOiAge3N0cmluZ30sIGNvbGxhcHNlOiB7Ym9vbGVhbn0sIGFkZENoZWNrOiB7Ym9vbGVhbn0sIGl0ZW1zOiB7QXJyYXl9fVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpdklkIHRoZSBkaXYgd2hlcmUgdGhlIGxlZ2VuZCBzaG91bGQgYmUgYWRkZWRcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIGZvciBsZWdlbmRcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmxheWVyRGl2Q2xhc3Nlcz1bXV0gb3B0aW9uYWwgYXJyYXkgb2YgY2xhc3NlcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBsYXllciBsZWdlbmQgZGl2cyBmb3IgY3VzdG9tIHN0eWxpbmdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5sZWdlbmRUaXRsZT1MZWdlbmRdIHRoZSBsZWdlbmQgdGl0bGVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2NhbGVEZXBlbmRlbnQ9dHJ1ZV0gaWYgbGVnZW5kIGRpc3BsYXkgaXMgc2NhbGUgZGVwZW5kZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxlZ2VuZEl0ZW1zLCBkaXZJZCwgb3B0aW9ucykge1xyXG4gICAgICAgIGZvciAobGV0IGkgb2YgbGVnZW5kSXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAndW5kZWZpbmVkIGl0ZW0gcGFzc2VkIGluIGFycmF5IHRvIGxlZ2VuZCBjb25zdHJ1Y3Rvcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBvcHRpb25zLmxlZ2VuZFRpdGxlID0gdHlwZW9mIG9wdGlvbnMubGVnZW5kVGl0bGUgPT0gJ3N0cmluZycgPyBvcHRpb25zLmxlZ2VuZFRpdGxlIDogJ0xlZ2VuZCc7XHJcbiAgICAgICAgb3B0aW9ucy5zY2FsZURlcGVuZGVudCA9IHR5cGVvZiBvcHRpb25zLnNjYWxlRGVwZW5kZW50ID09ICdib29sZWFuJyA/IG9wdGlvbnMuc2NhbGVEZXBlbmRlbnQgOiB0cnVlO1xyXG4gICAgICAgIG9wdGlvbnMubGF5ZXJEaXZDbGFzc2VzID0gb3B0aW9ucy5sYXllckRpdkNsYXNzZXMgfHwgW107XHJcblxyXG4gICAgICAgIC8vIGlmIGxlZ2VuZCBkaXNwbGF5IGlzIHNjYWxlIGRlcGVuZGVudCwgbWFrZSBzdXJlIHRoZSBtYXBNb3ZlIG9iamVjdCBpcyBpbml0aWFsaXplZCBmaXJzdFxyXG4gICAgICAgIGlmIChvcHRpb25zLnNjYWxlRGVwZW5kZW50KSB7XHJcbiAgICAgICAgICAgIG1hcE1vdmUuY2hlY2tJbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50ID0gJCgnIycgKyBkaXZJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xlZ2VuZEl0ZW1zID0gbGVnZW5kSXRlbXM7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXJHcm91cCA9IG5ldyBMYXllckdyb3VwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1aWxkVHJlZShsZWdlbmRJdGVtcyk7XHJcblxyXG4gICAgICAgIHRoaXMubGVnZW5kSWQgPSBtYWtlR3VpZCgpO1xyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50LmFwcGVuZCh0aGlzLmxheWVyR3JvdXAuZ2V0TGVnZW5kSHRtbCh0aGlzLmxlZ2VuZElkLCBvcHRpb25zKSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGwgb2YgdGhpcy5sYXllckdyb3VwLmFsbExheWVyQXJyYXkpe1xyXG4gICAgICAgICAgICBsLmFwcGx5Q29sbGFwc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8vLyBpZiBsZWdlbmQgZGlzcGxheSBpcyBzY2FsZSBkZXBlbmRlbnQsIG1ha2Ugc3VyZSB0aGUgbWFwTW92ZSBvYmplY3QgaXMgaW5pdGlhbGl6ZWQgZmlyc3RcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2FsZURlcGVuZGVudCkge1xyXG4gICAgICAgICAgICBtYXBNb3ZlLmNoZWNrSW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgbWFwTW92ZS5hZGRDYWxsYmFjayhmdW5jdGlvbiAoZXh0LCB6b29tLCBldnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV2dCA9PSAndW5kZWZpbmVkJyB8fCBldnQgPT0gJ2NoYW5nZTpyZXNvbHV0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGx5ciBvZiB0aGlzLmxheWVyR3JvdXAuYWxsTGF5ZXJBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGx5ckxpID0gJCgnIycgKyBseXIuaWQgKyAnLWxheWVyLWxpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6b29tID4gbHlyLm1heFpvb20gfHwgem9vbSA8IGx5ci5taW5ab29tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbHlyTGkuYWRkQ2xhc3MoJ2xheWVyLW5vdC12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbHlyTGkucmVtb3ZlQ2xhc3MoJ2xheWVyLW5vdC12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMsIDEwMCwgdHJ1ZSwgJ2xlZ2VuZDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDxlZGl0b3ItZm9sZCBkZXNjPVwiYWRkIGV2ZW50IGxpc3RlbmVyc1wiPlxyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50LmZpbmQoXCIuc3VwcHJlc3MtYnktZXh0ZW50XCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRMYXllckxpcyA9ICQoJy5sZWdlbmQtbGF5ZXItbGknKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kTGF5ZXJMaXMucmVtb3ZlQ2xhc3MoJ2xheWVyLWZvcmNlLXNob3cnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZExheWVyTGlzLmFkZENsYXNzKCdsYXllci1mb3JjZS1zaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuJGRpdkVsZW1lbnQuZmluZCgnLmxlZ2VuZC1jaGVjaycpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBseXJJZCA9IHRoaXMuaWQucmVwbGFjZSgnLWxlZ2VuZC1sYXllci1jaGVjaycsICcnKTtcclxuICAgICAgICAgICAgX3RoaXMubGF5ZXJHcm91cC5hbGxMYXllckxvb2t1cFtseXJJZF0udmlzaWJsZSA9IHRoaXMuY2hlY2tlZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kZGl2RWxlbWVudC5maW5kKCcubGVnZW5kLWxheWVyLWdyb3VwID4gaW5wdXRbdHlwZT1jaGVja2JveF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNpYmxpbmdzKCd1bCcpLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJykucHJvcCgnY2hlY2tlZCcsIHRoaXMuY2hlY2tlZCkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGRpdkVsZW1lbnQuZmluZCgnLmxheWVyLWdyb3VwLWV4cGFuZGVyJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnbGVnZW5kLWxheWVyLWdyb3VwLWluaXRpYWwtY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCd1bCcpLnNsaWRlVG9nZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2xlZ2VuZC1sYXllci1ncm91cC1jb2xsYXBzZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnbGVnZW5kLWxheWVyLWdyb3VwLWNvbGxhcHNlZCcpO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuaHRtbCgnJiM5NjYwOycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2xlZ2VuZC1sYXllci1ncm91cC1jb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJyYjOTY1NDsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50LmZpbmQoJy5sZWdlbmQtbGF5ZXItZ3JvdXAtaW5pdGlhbC1jb2xsYXBzZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgLy8gPC9lZGl0b3ItZm9sZD5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbbGVnZW5kSXRlbXM9dGhpcy5fbGF5ZXJDb25maWddIHRoZSBsZWdlbmQgaXRlbXNcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtwYXJlbnRzPVtdXSB0aGUgb3JkZXJlZCBsaXN0IG9mIGdyb3VwcyBpbiB3aGljaCB0aGlzIGl0ZW0gaXMgYSBtZW1iZXJcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9idWlsZFRyZWUobGVnZW5kSXRlbXMsIHBhcmVudHM/KSB7XHJcblxyXG4gICAgICAgIGlmIChsZWdlbmRJdGVtcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb25lSXRlbSA9IGxlZ2VuZEl0ZW1zWzBdO1xyXG5cclxuICAgICAgICAvL3Jlc2V0IHRoZSBwYXJlbnQgaWYgdGhlIGl0ZW0gaXMgaW4gdGhlIGJhc2UgYXJyYXlcclxuICAgICAgICBpZiAodGhpcy5fbGVnZW5kSXRlbXMuaW5kZXhPZihvbmVJdGVtKSA+IC0xIHx8IHR5cGVvZiBwYXJlbnRzID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb25lSXRlbVsnZ3JvdXBOYW1lJ10gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBncm91cEl0ZW0gPSBsZWdlbmRJdGVtc1swXTtcclxuICAgICAgICAgICAgbGV0IG5ld0dyb3VwID0gdGhpcy5sYXllckdyb3VwLmFkZEdyb3VwKGdyb3VwSXRlbSwgcGFyZW50cyk7XHJcbiAgICAgICAgICAgIHBhcmVudHMucHVzaChuZXdHcm91cC5ncm91cElkKTtcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRUcmVlKGdyb3VwSXRlbS5pdGVtcywgcGFyZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtMYXllckJhc2V9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXJJdGVtID0gbGVnZW5kSXRlbXNbMF07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxheWVyR3JvdXAuYWRkTGVnZW5kTGF5ZXIobGF5ZXJJdGVtLCBwYXJlbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1aWxkVHJlZShsZWdlbmRJdGVtcy5zbGljZSgxKSwgcGFyZW50cyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ubS5MYXllckxlZ2VuZCA9IExheWVyTGVnZW5kO1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckxlZ2VuZDtcclxuIl19

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 9/23/2016.
 */
var quickMap_1 = __webpack_require__(7);
var LayerEsriMapServer_1 = __webpack_require__(10);
var LayerLegend_1 = __webpack_require__(16);
var map = quickMap_1.quickMap();
var wisDotRegions = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer');
var sixYearPlan = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/SixYearPlan/MapServer', { name: 'Six Year Plan', legendCollapse: true });
map.addLayer(wisDotRegions.olLayer);
map.addLayer(sixYearPlan.olLayer);
var layerArray = [
    wisDotRegions,
    sixYearPlan
    // tipConfig.tipSegmentLayer,
    // tipConfig.metamanagerSegments,
    // {
    //     groupName: 'ITS Inventory Layers',
    //     collapse: true,
    //     addCheck: false,
    //     items: tipConfig.itsLayerCollection.layers
    // }
];
var legend = new LayerLegend_1.default(layerArray, 'legend-container', {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlX21hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbXBsZV9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHlEQUFzRDtBQUN0RCwwRUFBdUU7QUFDdkUsaUVBQTREO0FBRzVELElBQUksR0FBRyxHQUFHLG1CQUFRLEVBQUUsQ0FBQztBQUVyQixJQUFJLGFBQWEsR0FBRyxJQUFJLHVDQUFrQixDQUN0Qyw4R0FBOEcsQ0FBQyxDQUFDO0FBRXBILElBQUksV0FBVyxHQUFHLElBQUksdUNBQWtCLENBQ3BDLHNHQUFzRyxFQUFFLEVBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUUzSixHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVsQyxJQUFJLFVBQVUsR0FBRztJQUNiLGFBQWE7SUFDYixXQUFXO0lBQ1gsNkJBQTZCO0lBQzdCLGlDQUFpQztJQUNqQyxJQUFJO0lBQ0oseUNBQXlDO0lBQ3pDLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsaURBQWlEO0lBQ2pELElBQUk7Q0FDUCxDQUFDO0FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDkvMjMvMjAxNi5cclxuICovXHJcbmltcG9ydCB7cXVpY2tNYXB9IGZyb20gJy4uLy4uL3NyYy9vbEhlbHBlcnMvcXVpY2tNYXAnO1xyXG5pbXBvcnQge0xheWVyRXNyaU1hcFNlcnZlcn0gZnJvbSBcIi4uLy4uL3NyYy9sYXllcnMvTGF5ZXJFc3JpTWFwU2VydmVyXCI7XHJcbmltcG9ydCBMYXllckxlZ2VuZCBmcm9tICcuLi8uLi9zcmMvY29sbGVjdGlvbnMvTGF5ZXJMZWdlbmQnO1xyXG5cclxuXHJcbmxldCBtYXAgPSBxdWlja01hcCgpO1xyXG5cclxubGV0IHdpc0RvdFJlZ2lvbnMgPSBuZXcgTGF5ZXJFc3JpTWFwU2VydmVyKFxyXG4gICAgJ2h0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvYXBwbGljYXRpb25zL2FyY2dpczIvcmVzdC9zZXJ2aWNlcy9NZXRhTWFuYWdlci9NZXRhbWFuYWdlcl9yZWdpb25zL01hcFNlcnZlcicpO1xyXG5cclxubGV0IHNpeFllYXJQbGFuID0gbmV3IExheWVyRXNyaU1hcFNlcnZlcihcclxuICAgICdodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2FwcGxpY2F0aW9ucy9hcmNnaXMyL3Jlc3Qvc2VydmljZXMvTWV0YU1hbmFnZXIvU2l4WWVhclBsYW4vTWFwU2VydmVyJywge25hbWU6ICdTaXggWWVhciBQbGFuJywgbGVnZW5kQ29sbGFwc2U6IHRydWV9KTtcclxuXHJcbm1hcC5hZGRMYXllcih3aXNEb3RSZWdpb25zLm9sTGF5ZXIpO1xyXG5tYXAuYWRkTGF5ZXIoc2l4WWVhclBsYW4ub2xMYXllcik7XHJcblxyXG5sZXQgbGF5ZXJBcnJheSA9IFtcclxuICAgIHdpc0RvdFJlZ2lvbnMsXHJcbiAgICBzaXhZZWFyUGxhblxyXG4gICAgLy8gdGlwQ29uZmlnLnRpcFNlZ21lbnRMYXllcixcclxuICAgIC8vIHRpcENvbmZpZy5tZXRhbWFuYWdlclNlZ21lbnRzLFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGdyb3VwTmFtZTogJ0lUUyBJbnZlbnRvcnkgTGF5ZXJzJyxcclxuICAgIC8vICAgICBjb2xsYXBzZTogdHJ1ZSxcclxuICAgIC8vICAgICBhZGRDaGVjazogZmFsc2UsXHJcbiAgICAvLyAgICAgaXRlbXM6IHRpcENvbmZpZy5pdHNMYXllckNvbGxlY3Rpb24ubGF5ZXJzXHJcbiAgICAvLyB9XHJcbl07XHJcblxyXG5sZXQgbGVnZW5kID0gbmV3IExheWVyTGVnZW5kKGxheWVyQXJyYXksICdsZWdlbmQtY29udGFpbmVyJywge30pO1xyXG5cclxuXHJcblxyXG4iXX0=

/***/ })
/******/ ]);
//# sourceMappingURL=simple_map.js.map