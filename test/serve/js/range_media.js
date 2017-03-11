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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
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


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = __webpack_require__(0);
var $ = __webpack_require__(1);
var nm = provide_1.default('domUtil');
var DayRange = (function () {
    /**
     * constructor for the date range
     * @param {number} dayRange number of days
     * @param {jQuery|HTMLElement|*} jQueryRef reference to the jquery element
     */
    function DayRange(jQueryRef, dayRange) {
        console.log('make day range');
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


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by gavorhes on 10/10/2016.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var day_range_1 = __webpack_require__(24);
var $ = __webpack_require__(1);
var dayRange = new day_range_1.DayRange($('#day-range'), 10);


/***/ })

/******/ });
//# sourceMappingURL=range_media.js.map