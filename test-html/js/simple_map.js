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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************!*\
  !*** ./dist/_test/simple_map.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by gavorhes on 9/23/2016.
	 */
	var quickMap_1 = __webpack_require__(/*! ../olHelpers/quickMap */ 1);
	var LayerEsriMapServer_1 = __webpack_require__(/*! ../layers/LayerEsriMapServer */ 24);
	var LayerLegend_1 = __webpack_require__(/*! ../collections/LayerLegend */ 31);
	var map = quickMap_1.quickMap();
	var wisDotRegions = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer');
	var sixYearPlan = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/SixYearPlan/MapServer', { name: 'Six Year Plan', legendCollapse: true });
	map.addLayer(wisDotRegions.olLayer);
	map.addLayer(sixYearPlan.olLayer);
	var layerArray = [
	    wisDotRegions,
	    sixYearPlan
	];
	var legend = new LayerLegend_1.default(layerArray, 'legend-container', {});


/***/ },
/* 1 */
/*!************************************!*\
  !*** ./dist/olHelpers/quickMap.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/15/2015.
	 */
	"use strict";
	var quickMapBase_1 = __webpack_require__(/*! ./quickMapBase */ 2);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var mapMove_1 = __webpack_require__(/*! ./mapMove */ 6);
	var mapPopup_1 = __webpack_require__(/*! ./mapPopup */ 11);
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


/***/ },
/* 2 */
/*!****************************************!*\
  !*** ./dist/olHelpers/quickMapBase.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/15/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var ol = __webpack_require__(/*! custom-ol */ 4);
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = quickMapBase;


/***/ },
/* 3 */
/*!******************************!*\
  !*** ./dist/util/provide.js ***!
  \******************************/
/***/ function(module, exports) {

	/**
	 * Created by gavorhes on 12/10/2015.
	 */
	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = provide;


/***/ },
/* 4 */
/*!*********************!*\
  !*** external "ol" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = ol;

/***/ },
/* 5 */
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 6 */
/*!***********************************!*\
  !*** ./dist/olHelpers/mapMove.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var mapMoveCls_1 = __webpack_require__(/*! ./mapMoveCls */ 7);
	/**
	 * The single map move object catch is that it is common to multimap pages
	 * @type {MapMoveCls}
	 */
	exports.mapMove = new mapMoveCls_1.default();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.mapMove;


/***/ },
/* 7 */
/*!**************************************!*\
  !*** ./dist/olHelpers/mapMoveCls.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var mapInteractionBase_1 = __webpack_require__(/*! ./mapInteractionBase */ 8);
	var checkDefined = __webpack_require__(/*! ../util/checkDefined */ 9);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var makeGuid_1 = __webpack_require__(/*! ../util/makeGuid */ 10);
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MapMoveCls;


/***/ },
/* 8 */
/*!**********************************************!*\
  !*** ./dist/olHelpers/mapInteractionBase.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by gavorhes on 12/8/2015.
	 */
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MapInteractionBase;


/***/ },
/* 9 */
/*!***********************************!*\
  !*** ./dist/util/checkDefined.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var provide_1 = __webpack_require__(/*! ./provide */ 3);
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


/***/ },
/* 10 */
/*!*******************************!*\
  !*** ./dist/util/makeGuid.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(/*! ./provide */ 3);
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


/***/ },
/* 11 */
/*!************************************!*\
  !*** ./dist/olHelpers/mapPopup.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var mapPopupCls_1 = __webpack_require__(/*! ./mapPopupCls */ 12);
	/**
	 * The single popup object catch is that it is common to multimap pages
	 * @type {MapPopupCls}
	 */
	exports.mapPopup = new mapPopupCls_1.default();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.mapPopup;


/***/ },
/* 12 */
/*!***************************************!*\
  !*** ./dist/olHelpers/mapPopupCls.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var mapInteractionBase_1 = __webpack_require__(/*! ./mapInteractionBase */ 8);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var ol = __webpack_require__(/*! custom-ol */ 4);
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MapPopupCls;


/***/ },
/* 13 */,
/* 14 */,
/* 15 */
/*!**********************************!*\
  !*** ./dist/layers/LayerBase.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var zoomResolutionConvert = __webpack_require__(/*! ../olHelpers/zoomResolutionConvert */ 16);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var makeGuid_1 = __webpack_require__(/*! ../util/makeGuid */ 10);
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LayerBase;


/***/ },
/* 16 */
/*!*************************************************!*\
  !*** ./dist/olHelpers/zoomResolutionConvert.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/14/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
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


/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/*!*****************************************!*\
  !*** ./dist/olHelpers/esriToOlStyle.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Created by gavorhes on 1/4/2016.
	 */
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var ol = __webpack_require__(/*! custom-ol */ 4);
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


/***/ },
/* 24 */
/*!*******************************************!*\
  !*** ./dist/layers/LayerEsriMapServer.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Created by gavorhes on 12/7/2015.
	 */
	var LayerBase_1 = __webpack_require__(/*! ./LayerBase */ 15);
	var esriToOl = __webpack_require__(/*! ../olHelpers/esriToOlStyle */ 23);
	var mapPopup_1 = __webpack_require__(/*! ../olHelpers/mapPopup */ 11);
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var ol = __webpack_require__(/*! custom-ol */ 4);
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LayerEsriMapServer;


/***/ },
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/*!*****************************************!*\
  !*** ./dist/collections/LayerLegend.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/16/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(/*! ../util/provide */ 3);
	var makeGuid_1 = __webpack_require__(/*! ../util/makeGuid */ 10);
	var mapMove_1 = __webpack_require__(/*! ../olHelpers/mapMove */ 6);
	var nm = provide_1.default('collections');
	var $ = __webpack_require__(/*! jquery */ 5);
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LayerLegend;


/***/ }
/******/ ]);
//# sourceMappingURL=simple_map.js.map