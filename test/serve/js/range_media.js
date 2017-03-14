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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
__webpack_require__(1);
var nm = provide_1.default('domUtil');
var DayRange = (function () {
    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery|HTMLElement|*} jQueryRef reference to the jquery element
     */
    function DayRange(jQueryRef, dayRange) {
        this._workingDayRange = dayRange - 1;
        var pickerHtml = '<label for="start-date" style="width: 78px; display: inline-block; margin:5px;">Start Date</label>' +
            '<input type="text" readonly id="start-date" class="date-pick"  style="width: 90px;">' +
            '<br><label for="end-date" style="width: 78px; display: inline-block;  margin:5px;">End Date</label>' +
            '<input type="text" readonly id="end-date" class="date-pick" style="width: 90px;">';
        jQueryRef.append(pickerHtml);
        this._$startDate = $('#start-date');
        this._$endDate = $('#end-date');
        this._$startDate.datepicker();
        this._$endDate.datepicker();
        this._startDate = null;
        this._endDate = null;
        var dte1 = new Date();
        dte1.setHours(0, 0, 0, 0);
        var dte2 = new Date(dte1.getTime());
        dte2.setDate(dte2.getDate() + dayRange);
        dte2.setHours(23, 59, 59, 0);
        this._maxDateRange = dte2.getTime() - dte1.getTime();
        var _this = this;
        //add event listeners
        this._$startDate.change(function () {
            _this.startDate = this.value;
        });
        this._$endDate.change(function () {
            _this.endDate = this.value;
        });
        // initialize
        this.endDate = new Date();
    }
    Object.defineProperty(DayRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        /**
         *
         * @param val
         */
        set: function (val) {
            if (typeof val == 'string') {
                val = new Date(val);
            }
            this._startDate = val;
            this._startDate.setHours(0, 0, 0, 0);
            this._$startDate.val(this._startDate.toLocaleDateString());
            if (this.endDate == null ||
                this._endDate.getTime() - this._startDate.getTime() > this._maxDateRange ||
                this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._startDate.getTime());
                tmpDate.setDate(tmpDate.getDate() + this._workingDayRange);
                this.endDate = new Date(tmpDate.getTime());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (val) {
            if (typeof val == 'string') {
                val = new Date(val);
            }
            this._endDate = val;
            this._endDate.setHours(23, 59, 59, 0);
            this._$endDate.val(this._endDate.toLocaleDateString());
            if (this._startDate == null || this._endDate.getTime() - this.startDate.getTime() > this._maxDateRange || this._endDate.getTime() - this._startDate.getTime() < 24 * 60 * 60 * 1000) {
                var tmpDate = new Date(this._endDate.getTime());
                tmpDate.setDate(tmpDate.getDate() - this._workingDayRange);
                this.startDate = new Date(tmpDate.getTime());
            }
        },
        enumerable: true,
        configurable: true
    });
    return DayRange;
}());
exports.DayRange = DayRange;
nm.DayRange = DayRange;
exports.default = DayRange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXJhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF5LXJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXNDO0FBQ3RDLDBCQUE2QjtBQUM3QixxQkFBbUI7QUFFbkIsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU1QjtJQVFJOzs7O09BSUc7SUFDSCxrQkFBWSxTQUFpQixFQUFFLFFBQWdCO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLElBQUksVUFBVSxHQUFHLG9HQUFvRztZQUNqSCxzRkFBc0Y7WUFDdEYscUdBQXFHO1lBQ3JHLG1GQUFtRixDQUFDO1FBRXhGLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUN4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LENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEwsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQzs7O09BaEJBO0lBaUJMLGVBQUM7QUFBRCxDQUFDLEFBcEdELElBb0dDO0FBcEdZLDRCQUFRO0FBc0dyQixFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUV2QixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5pbXBvcnQgJ2pxdWVyeS11aSc7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdkb21VdGlsJyk7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF5UmFuZ2Uge1xyXG4gICAgX3dvcmtpbmdEYXlSYW5nZTogbnVtYmVyO1xyXG4gICAgXyRzdGFydERhdGU6IEpRdWVyeTtcclxuICAgIF8kZW5kRGF0ZTogSlF1ZXJ5O1xyXG4gICAgX21heERhdGVSYW5nZTogbnVtYmVyO1xyXG4gICAgX3N0YXJ0RGF0ZTogRGF0ZTtcclxuICAgIF9lbmREYXRlOiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3IgZm9yIHRoZSBkYXRlIHJhbmdlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGF5UmFuZ2UgbnVtYmVyIG9mIGRheXNcclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fEhUTUxFbGVtZW50fCp9IGpRdWVyeVJlZiByZWZlcmVuY2UgdG8gdGhlIGpxdWVyeSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGpRdWVyeVJlZjogSlF1ZXJ5LCBkYXlSYW5nZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fd29ya2luZ0RheVJhbmdlID0gZGF5UmFuZ2UgLSAxO1xyXG5cclxuICAgICAgICBsZXQgcGlja2VySHRtbCA9ICc8bGFiZWwgZm9yPVwic3RhcnQtZGF0ZVwiIHN0eWxlPVwid2lkdGg6IDc4cHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luOjVweDtcIj5TdGFydCBEYXRlPC9sYWJlbD4nICtcclxuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIHJlYWRvbmx5IGlkPVwic3RhcnQtZGF0ZVwiIGNsYXNzPVwiZGF0ZS1waWNrXCIgIHN0eWxlPVwid2lkdGg6IDkwcHg7XCI+JyArXHJcbiAgICAgICAgICAgICc8YnI+PGxhYmVsIGZvcj1cImVuZC1kYXRlXCIgc3R5bGU9XCJ3aWR0aDogNzhweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAgbWFyZ2luOjVweDtcIj5FbmQgRGF0ZTwvbGFiZWw+JyArXHJcbiAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiByZWFkb25seSBpZD1cImVuZC1kYXRlXCIgY2xhc3M9XCJkYXRlLXBpY2tcIiBzdHlsZT1cIndpZHRoOiA5MHB4O1wiPic7XHJcblxyXG4gICAgICAgIGpRdWVyeVJlZi5hcHBlbmQocGlja2VySHRtbCk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRzdGFydERhdGUgPSAkKCcjc3RhcnQtZGF0ZScpO1xyXG4gICAgICAgIHRoaXMuXyRlbmREYXRlID0gJCgnI2VuZC1kYXRlJyk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRzdGFydERhdGUuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgIHRoaXMuXyRlbmREYXRlLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnREYXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9lbmREYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGR0ZTEgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGR0ZTEuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgbGV0IGR0ZTIgPSBuZXcgRGF0ZShkdGUxLmdldFRpbWUoKSk7XHJcbiAgICAgICAgZHRlMi5zZXREYXRlKGR0ZTIuZ2V0RGF0ZSgpICsgZGF5UmFuZ2UpO1xyXG4gICAgICAgIGR0ZTIuc2V0SG91cnMoMjMsIDU5LCA1OSwgMCk7XHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZVJhbmdlID0gZHRlMi5nZXRUaW1lKCkgLSBkdGUxLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5fJHN0YXJ0RGF0ZS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zdGFydERhdGUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl8kZW5kRGF0ZS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5lbmREYXRlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxyXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YXJ0RGF0ZSgpOiBEYXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnREYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWxcclxuICAgICAqL1xyXG4gICAgc2V0IHN0YXJ0RGF0ZSh2YWw6IERhdGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YWwgPSBuZXcgRGF0ZSh2YWwgYXMgc3RyaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0RGF0ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLl9zdGFydERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fJHN0YXJ0RGF0ZS52YWwodGhpcy5fc3RhcnREYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpKTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICB0aGlzLl9lbmREYXRlLmdldFRpbWUoKSAtIHRoaXMuX3N0YXJ0RGF0ZS5nZXRUaW1lKCkgPiB0aGlzLl9tYXhEYXRlUmFuZ2UgfHxcclxuICAgICAgICAgICAgdGhpcy5fZW5kRGF0ZS5nZXRUaW1lKCkgLSB0aGlzLl9zdGFydERhdGUuZ2V0VGltZSgpIDwgMjQgKiA2MCAqIDYwICogMTAwMCkge1xyXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuX3N0YXJ0RGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICB0bXBEYXRlLnNldERhdGUodG1wRGF0ZS5nZXREYXRlKCkgKyB0aGlzLl93b3JraW5nRGF5UmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSh0bXBEYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBlbmREYXRlKCk6IERhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmREYXRlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXQgZW5kRGF0ZSh2YWw6IERhdGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YWwgPSBuZXcgRGF0ZSh2YWwgYXMgc3RyaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VuZERhdGUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5fZW5kRGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCAwKTtcclxuICAgICAgICB0aGlzLl8kZW5kRGF0ZS52YWwodGhpcy5fZW5kRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0RGF0ZSA9PSBudWxsIHx8IHRoaXMuX2VuZERhdGUuZ2V0VGltZSgpIC0gdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpID4gdGhpcy5fbWF4RGF0ZVJhbmdlIHx8IHRoaXMuX2VuZERhdGUuZ2V0VGltZSgpIC0gdGhpcy5fc3RhcnREYXRlLmdldFRpbWUoKSA8IDI0ICogNjAgKiA2MCAqIDEwMDApIHtcclxuICAgICAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLl9lbmREYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIHRtcERhdGUuc2V0RGF0ZSh0bXBEYXRlLmdldERhdGUoKSAtIHRoaXMuX3dvcmtpbmdEYXlSYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUodG1wRGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubm0uRGF5UmFuZ2UgPSBEYXlSYW5nZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERheVJhbmdlO1xyXG5cclxuIl19

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 10/10/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var day_range_1 = __webpack_require__(23);
var $ = __webpack_require__(1);
var dayRange = new day_range_1.DayRange($('#day-range'), 10);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VfbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5nZV9tZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBRUgseURBQXFEO0FBQ3JELDBCQUE2QjtBQUU3QixJQUFJLFFBQVEsR0FBRyxJQUFJLG9CQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTAvMTAvMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQge0RheVJhbmdlfSBmcm9tICcuLi8uLi9zcmMvZG9tVXRpbC9kYXktcmFuZ2UnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxubGV0IGRheVJhbmdlID0gbmV3IERheVJhbmdlKCQoJyNkYXktcmFuZ2UnKSwgMTApO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=

/***/ })

/******/ });
//# sourceMappingURL=range_media.js.map