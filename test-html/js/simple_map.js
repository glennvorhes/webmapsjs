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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by gavorhes on 9/23/2016.
	 */
	var quickMap_1 = __webpack_require__(1);
	var LayerEsriMapServer_1 = __webpack_require__(15);
	var LayerLegend_1 = __webpack_require__(24);
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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/15/2015.
	 */
	"use strict";
	var quickMapBase_1 = __webpack_require__(2);
	var provide_1 = __webpack_require__(4);
	var mapMove_1 = __webpack_require__(7);
	var mapPopup_1 = __webpack_require__(12);
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
	 * @returns the ol map
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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/15/2015.
	 */
	"use strict";
	var $ = __webpack_require__(3);
	var provide_1 = __webpack_require__(4);
	var custom_ol_1 = __webpack_require__(5);
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
	    var osmLayer = new custom_ol_1.ol.layer.Tile({ source: new custom_ol_1.ol.source.OSM() });
	    // let satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'})});
	    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
	    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";
	    if (options.baseSwitcher) {
	    }
	    if (options.zoom < 0 || options.zoom > 28) {
	        throw 'zoom out of range';
	    }
	    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
	        var p = new custom_ol_1.ol.geom.Point([options.center.x, options.center.y]);
	        new custom_ol_1.ol.proj.Projection({ code: "EPSG:4326" });
	        p.transform(new custom_ol_1.ol.proj.Projection({ code: "EPSG:4326" }), new custom_ol_1.ol.proj.Projection({ code: "EPSG:3857" }));
	        var coordinates = p.getCoordinates();
	        options.center.x = coordinates[0];
	        options.center.y = coordinates[1];
	    }
	    var map = new custom_ol_1.ol.Map({
	        layers: [osmLayer],
	        target: options.divId,
	        controls: custom_ol_1.ol.control.defaults({
	            attributionOptions: { collapsible: false }
	        }),
	        view: new custom_ol_1.ol.View({
	            center: [options.center.x, options.center.y],
	            zoom: options.zoom,
	            minZoom: options.minZoom,
	            maxZoom: options.maxZoom
	        })
	    });
	    if (options.fullScreen) {
	        //TODO add full screen options to ts
	        map.addControl(new custom_ol_1.ol.control.FullScreen({}));
	    }
	    return map;
	}
	exports.quickMapBase = quickMapBase;
	nm.quickMapBase = quickMapBase;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = quickMapBase;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-04-05T19:26Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];
	
	var document = window.document;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		version = "2.2.3",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},
	
		isPlainObject: function( obj ) {
			var key;
	
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}
	
			return key === undefined || hasOwn.call( obj, key );
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
	
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
	
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
	
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
	
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
	
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add( function() {
	
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	} );
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
	
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		register: function( owner, initial ) {
			var value = initial || {};
	
			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;
	
			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {
	
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key === undefined ) {
				this.register( owner );
	
			} else {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
	
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
	
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
	
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
	
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data, camelKey;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||
	
						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );
	
					if ( data !== undefined ) {
						return data;
					}
	
					camelKey = jQuery.camelCase( key );
	
					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {
	
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
	
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([\w:-]+)/ );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	
		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
	
		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,
	
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	
	
	var iframe,
		elemdisplay = {
	
			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			display = jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var documentElement = document.documentElement;
	
	
	
	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =
	
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
		}
	
		jQuery.extend( support, {
			pixelPosition: function() {
	
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
	
				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
	
				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {
	
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
	
				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
	
					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );
	
				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );
	
				documentElement.removeChild( container );
				div.removeChild( marginDiv );
	
				return ret;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;
	
		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
	
			// If we already have the right measurement, avoid augmentation
			4 :
	
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {
	
			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
	
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;
	
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		window.clearInterval( timerId );
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
	
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
	
						// Handle most common string cases
						ret.replace( rreturn, "" ) :
	
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
	
					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the 1.x branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);
	
			jQuery.event.trigger( e, null, elem );
	
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// The jqXHR state
				state = 0,
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
	
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
	
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {
	
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
	
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	return jQuery;
	}));


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.ol = __webpack_require__(6);
	// // export default require('../ol/ol-build');
	//
	// const fish = 10;
	// export = fish;
	//
	//
	// export function cat(bird: string){
	//     console.log('eat the fish')
	// }
	//
	// export function nice(eat: number){
	//     console.log('eat that fish');
	// }
	//
	// export class Big{
	//     glenn: string;
	//
	//     constructor(isGlenn){
	//         this.glenn  = isGlenn;
	//     }
	//
	//     set isGlenn(f: string){
	//         console.log(this.glenn)
	//     }
	//
	//     run(){
	//         console.log(this.glenn + " can run");
	//     }
	// }
	//
	// export namespace HereIt{
	//
	//     export class Big2 {
	//         glenn: string;
	//
	//         constructor(isGlenn) {
	//             this.glenn = isGlenn;
	//         }
	//
	//         set isGlenn(f: string) {
	//             console.log(this.glenn)
	//         }
	//
	//         run() {
	//             console.log(this.glenn + " can run");
	//         }
	//     }
	//
	//
	// } 


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {// OpenLayers 3. See http://openlayers.org/
	// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
	;(function (root, factory) {
	  if (true) {
	    module.exports = factory();
	  } else if (typeof define === "function" && define.amd) {
	    define([], factory);
	  } else {
	    root.ol = factory();
	  }
	}(this, function () {
	  var OPENLAYERS = {};
	  var n,aa=this;
	function ba(){var a=aa.setImmediate,b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ca(a,b,c){return a.call.apply(a.bind,arguments)}function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}
	function ea(a,b,c){ea=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return ea.apply(null,arguments)}function y(a,b){var c=a.split("."),d=OPENLAYERS||aa;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b};var fa;function B(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function I(){}function J(a){return a.ie||(a.ie=++ga)}var ga=0;if("undefined"!==typeof window)var K=window;else"undefined"!==typeof global?K=global:"undefined"!==typeof self&&(K=self);function ha(a){this.message="Assertion failed. See /doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}B(ha,Error);function L(a,b){if(!a)throw new ha(b);};function ia(a,b,c){return Math.min(Math.max(a,b),c)}var ja=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();function ka(a){L(0<a,29);return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function la(a,b){var c=a%b;return 0>c*b?c+b:c};function ma(a){return function(b){if(b)return[ia(b[0],a[0],a[2]),ia(b[1],a[1],a[3])]}}function na(a){return a};function oa(a,b,c){this.center=a;this.resolution=b;this.rotation=c};var pa="function"===typeof Object.assign?Object.assign:function(a,b){if(!a||!a)throw new TypeError("Cannot convert undefined or null to object");for(var c=Object(a),d=1,e=arguments.length;d<e;++d){var f=arguments[d];if(void 0!==f&&null!==f)for(var g in f)f.hasOwnProperty(g)&&(c[g]=f[g])}return c};function qa(a){for(var b in a)delete a[b]}function ra(a){var b=[],c;for(c in a)b.push(a[c]);return b}function sa(a){for(var b in a)return!1;return!b};function ta(a){function b(b){var d=a.listener,e=a.jc||a.target;a.mc&&M(a);return d.call(e,b)}return a.kc=b}function ua(a,b,c,d){for(var e,f=0,g=a.length;f<g;++f)if(e=a[f],e.listener===b&&e.jc===c)return d&&(e.deleteIndex=f),e}function va(a,b){var c=a.ha;return c?c[b]:void 0}function wa(a){var b=a.ha;b||(b=a.ha={});return b}
	function xa(a,b){var c=va(a,b);if(c){for(var d=0,e=c.length;d<e;++d)a.removeEventListener(b,c[d].kc),qa(c[d]);c.length=0;if(c=a.ha)delete c[b],0===Object.keys(c).length&&delete a.ha}}function R(a,b,c,d,e){var f=wa(a),g=f[b];g||(g=f[b]=[]);(f=ua(g,c,d,!1))?e||(f.mc=!1):(f={jc:d,mc:!!e,listener:c,target:a,type:b},a.addEventListener(b,ta(f)),g.push(f));return f}function ya(a,b,c,d){(a=va(a,b))&&(c=ua(a,c,d,!0))&&M(c)}
	function M(a){if(a&&a.target){a.target.removeEventListener(a.type,a.kc);var b=va(a.target,a.type);if(b){var c="deleteIndex"in a?a.deleteIndex:b.indexOf(a);-1!==c&&b.splice(c,1);0===b.length&&xa(a.target,a.type)}qa(a)}}function za(a){var b=wa(a),c;for(c in b)xa(a,c)};function Aa(){}Aa.prototype.ra=!1;function Da(a){a.ra||(a.ra=!0,a.R())}Aa.prototype.R=I;function T(a){this.type=a;this.target=null}T.prototype.preventDefault=T.prototype.stopPropagation=function(){this.qe=!0};function Ea(a){a.stopPropagation()}function Fa(a){a.preventDefault()};function Ga(){this.ca={};this.K={};this.C={}}B(Ga,Aa);Ga.prototype.addEventListener=function(a,b){var c=this.C[a];c||(c=this.C[a]=[]);-1===c.indexOf(b)&&c.push(b)};function U(a,b){var c="string"===typeof b?new T(b):b,d=c.type;c.target=a;var e=a.C[d],f;if(e){d in a.K||(a.K[d]=0,a.ca[d]=0);++a.K[d];for(var g=0,h=e.length;g<h;++g)if(!1===e[g].call(a,c)||c.qe){f=!1;break}--a.K[d];if(0===a.K[d]){c=a.ca[d];for(delete a.ca[d];c--;)a.removeEventListener(d,I);delete a.K[d]}return f}}Ga.prototype.R=function(){za(this)};
	function Ha(a,b){return b?b in a.C:0<Object.keys(a.C).length}Ga.prototype.removeEventListener=function(a,b){var c=this.C[a];if(c){var d=c.indexOf(b);a in this.ca?(c[d]=I,++this.ca[a]):(c.splice(d,1),0===c.length&&delete this.C[a])}};function Ia(){Ga.call(this);this.b=0}B(Ia,Ga);Ia.prototype.w=function(){++this.b;U(this,"change")};Ia.prototype.Y=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=R(this,a[f],b,c);return e}return R(this,a,b,c)};Ia.prototype.hd=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=R(this,a[f],b,c,!0);return e}return R(this,a,b,c,!0)};function Ja(a,b,c){T.call(this,a);this.key=b;this.oldValue=c}B(Ja,T);function V(a){Ia.call(this);J(this);this.M={};void 0!==a&&this.l(a)}B(V,Ia);var Ka={};function La(a){return Ka.hasOwnProperty(a)?Ka[a]:Ka[a]="change:"+a}V.prototype.get=function(a){var b;this.M.hasOwnProperty(a)&&(b=this.M[a]);return b};V.prototype.Ea=function(){return pa({},this.M)};V.prototype.set=function(a,b,c){c?this.M[a]=b:(c=this.M[a],this.M[a]=b,c!==b&&(b=La(a),U(this,new Ja(b,a,c)),U(this,new Ja("propertychange",a,c))))};
	V.prototype.l=function(a,b){for(var c in a)this.set(c,a[c],b)};function Ma(a,b){return a>b?1:a<b?-1:0}function Na(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1}function Oa(a){return a.reduce(function(a,c){return Array.isArray(c)?a.concat(Oa(c)):a.concat(c)},[])}function Pa(a,b){var c,d=Array.isArray(b)?b:[b],e=d.length;for(c=0;c<e;c++)a[a.length]=d[c]}
	function Qa(a,b){var c=a.indexOf(b),d=-1<c;d&&a.splice(c,1);return d}function Ra(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;d<c;d++)if(a[d]!==b[d])return!1;return!0}function Sa(a){var b=Ta,c=a.length,d=Array(a.length),e;for(e=0;e<c;e++)d[e]={index:e,value:a[e]};d.sort(function(a,c){return b(a.value,c.value)||a.index-c.index});for(e=0;e<a.length;e++)a[e]=d[e].value}function Ua(a,b){var c=b||Ma;return a.every(function(b,e){if(0===e)return!0;var f=c(a[e-1],b);return!(0<f||0===f)})};function Va(a){return function(b,c,d){if(void 0!==b)return b=Na(a,b,d),b=ia(b+c,0,a.length-1),c=Math.floor(b),b!=c&&c<a.length-1?a[c]/Math.pow(a[c]/a[c+1],b-c):a[c]}}function Wa(a,b,c){return function(d,e,f){if(void 0!==d)return d=Math.max(Math.floor(Math.log(b/d)/Math.log(a)+(-f/2+.5))+e,0),void 0!==c&&(d=Math.min(d,c)),b/Math.pow(a,d)}};function Xa(a){if(void 0!==a)return 0}function Ya(a,b){if(void 0!==a)return a+b}function Za(a){var b=2*Math.PI/a;return function(a,d){if(void 0!==a)return a=Math.floor((a+d)/b+.5)*b}}function $a(){var a=5*Math.PI/180;return function(b,c){if(void 0!==b)return Math.abs(b+c)<=a?0:b+c}};function ab(a,b){a[0]+=b[0];a[1]+=b[1]}function bb(a,b){var c=Math.cos(b),d=Math.sin(b),e=a[1]*c+a[0]*d;a[0]=a[0]*c-a[1]*d;a[1]=e};function cb(a){for(var b=db(),c=0,d=a.length;c<d;++c)eb(b,a[c]);return b}function fb(a,b,c){return c?(c[0]=a[0]-b,c[1]=a[1]-b,c[2]=a[2]+b,c[3]=a[3]+b,c):[a[0]-b,a[1]-b,a[2]+b,a[3]+b]}function gb(a,b){return b?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a.slice()}function hb(a,b){return a[0]<=b[0]&&b[2]<=a[2]&&a[1]<=b[1]&&b[3]<=a[3]}function db(){return[Infinity,Infinity,-Infinity,-Infinity]}function ib(a,b,c,d,e){return e?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}
	function jb(a){return ib(Infinity,Infinity,-Infinity,-Infinity,a)}function kb(a,b){var c=a[0],d=a[1];return ib(c,d,c,d,b)}function lb(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function mb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3])}function eb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[2]&&(a[2]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[3]&&(a[3]=b[1])}
	function nb(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}function ob(a){var b=0;pb(a)||(b=qb(a)*rb(a));return b}function sb(a){return[a[0],a[1]]}function tb(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
	function ub(a,b,c,d,e){var f=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);var g=Math.sin(c);c=f*b;f*=g;b*=d;var h=d*g,k=a[0],l=a[1];a=k-c+h;d=k-c-h;g=k+c-h;c=k+c+h;var h=l-f-b,k=l-f+b,m=l+f+b,f=l+f-b;return ib(Math.min(a,d,g,c),Math.min(h,k,m,f),Math.max(a,d,g,c),Math.max(h,k,m,f),e)}function rb(a){return a[3]-a[1]}function vb(a,b){var c=db();wb(a,b)&&(c[0]=a[0]>b[0]?a[0]:b[0],c[1]=a[1]>b[1]?a[1]:b[1],c[2]=a[2]<b[2]?a[2]:b[2],c[3]=a[3]<b[3]?a[3]:b[3]);return c}function xb(a){return[a[0],a[3]]}
	function qb(a){return a[2]-a[0]}function wb(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function pb(a){return a[2]<a[0]||a[3]<a[1]};function yb(){return!0}function zb(){return!1};/*
	
	 Latitude/longitude spherical geodesy formulae taken from
	 http://www.movable-type.co.uk/scripts/latlong.html
	 Licensed under CC-BY-3.0.
	*/
	function Ab(a){this.radius=a}function Bb(a,b){var c=a[1]*Math.PI/180,d=b[1]*Math.PI/180,e=(d-c)/2,f=(b[0]-a[0])*Math.PI/180/2,c=Math.sin(e)*Math.sin(e)+Math.sin(f)*Math.sin(f)*Math.cos(c)*Math.cos(d);return 2*Cb.radius*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}
	Ab.prototype.offset=function(a,b,c){var d=a[1]*Math.PI/180;b/=this.radius;var e=Math.asin(Math.sin(d)*Math.cos(b)+Math.cos(d)*Math.sin(b)*Math.cos(c));return[180*(a[0]*Math.PI/180+Math.atan2(Math.sin(c)*Math.sin(b)*Math.cos(d),Math.cos(b)-Math.sin(d)*Math.sin(e)))/Math.PI,180*e/Math.PI]};var Cb=new Ab(6370997);var Db={};Db.degrees=2*Math.PI*Cb.radius/360;Db.ft=.3048;Db.m=1;Db["us-ft"]=1200/3937;
	function Eb(a){this.ya=a.code;this.a=a.units;this.h=void 0!==a.extent?a.extent:null;this.c=void 0!==a.global?a.global:!1;this.b=!(!this.c||!this.h);this.i=void 0!==a.getPointResolution?a.getPointResolution:this.j;this.f=null;this.g=a.metersPerUnit;var b=Fb,c=a.code,d=Gb||K.proj4;if("function"==typeof d&&void 0===b[c]){var e=d.defs(c);if(void 0!==e){void 0===a.metersPerUnit&&(this.g=e.to_meter);void 0===a.units&&(this.a=e.units);var f,g;for(f in b)if(a=d.defs(f),void 0!==a)if(b=Hb(f),a===e)Ib([b,this]);
	else{g=d(f,c);a=g.forward;g=g.inverse;var b=Hb(b),h=Hb(this);Jb(b,h,Kb(a));Jb(h,b,Kb(g))}}}}Eb.prototype.l=function(){return this.ya};Eb.prototype.G=function(){return this.h};function Lb(a){return a.g||Db[a.a]}Eb.prototype.j=function(a,b){if("degrees"==this.a)return a;var c=Mb(this,Hb("EPSG:4326")),d=[b[0]-a/2,b[1],b[0]+a/2,b[1],b[0],b[1]-a/2,b[0],b[1]+a/2],d=c(d,d,2),c=(Bb(d.slice(0,2),d.slice(2,4))+Bb(d.slice(4,6),d.slice(6,8)))/2,d=Lb(this);void 0!==d&&(c/=d);return c};
	Eb.prototype.getPointResolution=function(a,b){return this.i(a,b)};var Fb={},Ob={},Gb=null;function Ib(a){Pb(a);a.forEach(function(b){a.forEach(function(a){b!==a&&Jb(b,a,Qb)})})}function Rb(a){Fb[a.ya]=a;Jb(a,a,Qb)}function Pb(a){var b=[];a.forEach(function(a){b.push(Rb(a))})}function Sb(a){return a?"string"===typeof a?Hb(a):a:Hb("EPSG:3857")}function Jb(a,b,c){a=a.ya;b=b.ya;a in Ob||(Ob[a]={});Ob[a][b]=c}
	function Kb(a){return function(b,c,d){var e=b.length;d=void 0!==d?d:2;c=void 0!==c?c:Array(e);var f,g;for(g=0;g<e;g+=d)for(f=a([b[g],b[g+1]]),c[g]=f[0],c[g+1]=f[1],f=d-1;2<=f;--f)c[g+f]=b[g+f];return c}}function Hb(a){var b;if(a instanceof Eb)b=a;else if("string"===typeof a){b=Fb[a];var c=Gb||K.proj4;void 0===b&&"function"==typeof c&&void 0!==c.defs(a)&&(b=new Eb({code:a}),Rb(b))}return b||null}function Tb(a,b){if(a===b)return!0;var c=a.a===b.a;return a.ya===b.ya?c:Mb(a,b)===Qb&&c}
	function Ub(a,b){var c=Hb(a),d=Hb(b);return Mb(c,d)}function Mb(a,b){var c=a.ya,d=b.ya,e;c in Ob&&d in Ob[c]&&(e=Ob[c][d]);void 0===e&&(e=Vb);return e}function Vb(a,b){if(void 0!==b&&a!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}return a}function Qb(a,b){var c;if(void 0!==b){c=0;for(var d=a.length;c<d;++c)b[c]=a[c];c=b}else c=a.slice();return c};function Wb(){V.call(this);this.j=db();this.s=-1;this.f={};this.i=this.g=0}B(Wb,V);Wb.prototype.G=function(a){this.s!=this.b&&(this.j=this.mb(this.j),this.s=this.b);var b=this.j;a?(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3]):a=b;return a};Wb.prototype.transform=function(a,b){this.Hb(Ub(a,b));return this};function Xb(a,b,c,d,e,f){for(var g=f?f:[],h=0;b<c;b+=d){var k=a[b],l=a[b+1];g[h++]=e[0]*k+e[2]*l+e[4];g[h++]=e[1]*k+e[3]*l+e[5]}f&&g.length!=h&&(g.length=h);return g};function Yb(){Wb.call(this);this.c="XY";this.A=2;this.o=null}B(Yb,Wb);function Zb(a){var b;"XY"==a?b=2:"XYZ"==a||"XYM"==a?b=3:"XYZM"==a&&(b=4);return b}n=Yb.prototype;n.mb=function(a){var b=this.o,c=this.o.length,d=this.A;a=jb(a);return nb(a,b,0,c,d)};n.Rb=function(a){this.i!=this.b&&(qa(this.f),this.g=0,this.i=this.b);if(0>a||0!==this.g&&a<=this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=this.Qa(a);if(c.o.length<this.o.length)return this.f[b]=c;this.g=a;return this};
	n.Qa=function(){return this};function $b(a,b,c){a.A=Zb(b);a.c=b;a.o=c}function ac(a,b,c,d){if(b)c=Zb(b);else{for(b=0;b<d;++b){if(0===c.length){a.c="XY";a.A=2;return}c=c[0]}c=c.length;var e;2==c?e="XY":3==c?e="XYZ":4==c&&(e="XYZM");b=e}a.c=b;a.A=c}n.Hb=function(a){this.o&&(a(this.o,this.o,this.A),this.w())};
	n.rotate=function(a,b){var c=this.o;if(c){for(var d=c.length,e=this.A,f=c?c:[],g=Math.cos(a),h=Math.sin(a),k=b[0],l=b[1],m=0,p=0;p<d;p+=e){var q=c[p]-k,u=c[p+1]-l;f[m++]=k+q*g-u*h;f[m++]=l+q*h+u*g;for(q=p+2;q<p+e;++q)f[m++]=c[q]}c&&f.length!=m&&(f.length=m);this.w()}};
	n.scale=function(a,b,c){var d=b;void 0===d&&(d=a);var e=c;e||(e=tb(this.G()));if(c=this.o){b=c.length;for(var f=this.A,g=c?c:[],h=e[0],e=e[1],k=0,l=0;l<b;l+=f){var m=c[l]-h,p=c[l+1]-e;g[k++]=h+a*m;g[k++]=e+d*p;for(m=l+2;m<l+f;++m)g[k++]=c[m]}c&&g.length!=k&&(g.length=k);this.w()}};n.translate=function(a,b){var c=this.o;if(c){var d=c.length,e=this.A,f=c?c:[],g=0,h,k;for(h=0;h<d;h+=e)for(f[g++]=c[h]+a,f[g++]=c[h+1]+b,k=h+2;k<h+e;++k)f[g++]=c[k];c&&f.length!=g&&(f.length=g);this.w()}};function bc(a,b){var c=0,d,e;d=0;for(e=b.length;d<e;++d)a[c++]=b[d];return c}function cc(a,b,c,d){var e,f;e=0;for(f=c.length;e<f;++e){var g=c[e],h;for(h=0;h<d;++h)a[b++]=g[h]}return b}function dc(a,b,c,d,e){e=e?e:[];var f=0,g,h;g=0;for(h=c.length;g<h;++g)b=cc(a,b,c[g],d),e[f++]=b;e.length=f;return e};function ec(a,b,c,d,e){e=void 0!==e?e:[];for(var f=0;b<c;b+=d)e[f++]=a.slice(b,b+d);e.length=f;return e}function fc(a,b,c,d,e){e=void 0!==e?e:[];var f=0,g,h;g=0;for(h=c.length;g<h;++g){var k=c[g];e[f++]=ec(a,b,k,d,e[f]);b=k}e.length=f;return e};function gc(a,b,c,d,e,f,g){var h=(c-b)/d;if(3>h){for(;b<c;b+=d)f[g++]=a[b],f[g++]=a[b+1];return g}var k=Array(h);k[0]=1;k[h-1]=1;c=[b,c-d];for(var l=0,m;0<c.length;){var p=c.pop(),q=c.pop(),u=0,w=a[q],r=a[q+1],x=a[p],D=a[p+1];for(m=q+d;m<p;m+=d){var t,z=a[m];t=a[m+1];var C=w,E=r,v=x-C,H=D-E;if(0!==v||0!==H){var G=((z-C)*v+(t-E)*H)/(v*v+H*H);1<G?(C=x,E=D):0<G&&(C+=v*G,E+=H*G)}z=C-z;t=E-t;t=z*z+t*t;t>u&&(l=m,u=t)}u>e&&(k[(l-b)/d]=1,q+d<l&&c.push(q,l),l+d<p&&c.push(l,p))}for(m=0;m<h;++m)k[m]&&(f[g++]=
	a[b+m*d],f[g++]=a[b+m*d+1]);return g}
	function hc(a,b,c,d,e,f,g,h){var k,l;k=0;for(l=c.length;k<l;++k){var m=c[k];a:{var p=a,q=m,u=d,w=e,r=f;if(b!=q){var x=w*Math.round(p[b]/w),D=w*Math.round(p[b+1]/w);b+=u;r[g++]=x;r[g++]=D;var t,z;do if(t=w*Math.round(p[b]/w),z=w*Math.round(p[b+1]/w),b+=u,b==q){r[g++]=t;r[g++]=z;break a}while(t==x&&z==D);for(;b<q;){var C,E;C=w*Math.round(p[b]/w);E=w*Math.round(p[b+1]/w);b+=u;if(C!=t||E!=z){var v=t-x,H=z-D,G=C-x,A=E-D;v*A==H*G&&(0>v&&G<v||v==G||0<v&&G>v)&&(0>H&&A<H||H==A||0<H&&A>H)||(r[g++]=t,r[g++]=
	z,x=t,D=z);t=C;z=E}}r[g++]=t;r[g++]=z}}h.push(g);b=m}return g};function ic(a,b){Yb.call(this);this.ea(a,b)}B(ic,Yb);n=ic.prototype;n.clone=function(){var a=new ic(null);$b(a,this.c,this.o.slice());a.w();return a};n.za=function(){return ec(this.o,0,this.o.length,this.A)};n.Qa=function(a){var b=[];b.length=gc(this.o,0,this.o.length,this.A,a,b,0);a=new ic(null);$b(a,"XY",b);a.w();return a};n.$=function(){return"LinearRing"};n.ea=function(a,b){a?(ac(this,b,a,1),this.o||(this.o=[]),this.o.length=cc(this.o,0,a,this.A)):$b(this,"XY",null);this.w()};function jc(a,b){Yb.call(this);this.ea(a,b)}B(jc,Yb);n=jc.prototype;n.clone=function(){var a=new jc(null);$b(a,this.c,this.o.slice());a.w();return a};n.za=function(){return this.o?this.o.slice():[]};n.mb=function(a){return kb(this.o,a)};n.$=function(){return"Point"};n.ea=function(a,b){a?(ac(this,b,a,0),this.o||(this.o=[]),this.o.length=bc(this.o,a)):$b(this,"XY",null);this.w()};function kc(a,b,c,d,e,f){for(var g=!1,h=a[c-d],k=a[c-d+1];b<c;b+=d){var l=a[b],m=a[b+1];k>f!=m>f&&e<(l-h)*(f-k)/(m-k)+h&&(g=!g);h=l;k=m}return g};function lc(a,b,c,d,e,f,g){var h,k,l,m,p,q=e[f+1],u=[],w=c[0];l=a[w-d];p=a[w-d+1];for(h=b;h<w;h+=d){m=a[h];k=a[h+1];if(q<=p&&k<=q||p<=q&&q<=k)l=(q-p)/(k-p)*(m-l)+l,u.push(l);l=m;p=k}w=NaN;p=-Infinity;u.sort(Ma);l=u[0];h=1;for(k=u.length;h<k;++h){m=u[h];var r=Math.abs(m-l);if(r>p){l=(l+m)/2;var x;a:if(0!==c.length&&kc(a,b,c[0],d,l,q)){var D;x=1;for(D=c.length;x<D;++x)if(kc(a,c[x-1],c[x],d,l,q)){x=!1;break a}x=!0}else x=!1;x&&(w=l,p=r)}l=m}isNaN(w)&&(w=e[f]);return g?(g.push(w,q),g):[w,q]};function mc(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],k=a[b+1],e=e+(h-f)*(k+g),f=h,g=k;return 0<e}function nc(a,b,c,d){var e=0;d=void 0!==d?d:!1;var f,g;f=0;for(g=b.length;f<g;++f){var h=b[f],e=mc(a,e,h,c);if(0===f){if(d&&e||!d&&!e)return!1}else if(d&&!e||!d&&e)return!1;e=h}return!0}
	function oc(a,b,c,d,e){e=void 0!==e?e:!1;var f,g;f=0;for(g=c.length;f<g;++f){var h=c[f],k=mc(a,b,h,d);if(0===f?e&&k||!e&&!k:e&&!k||!e&&k)for(var k=a,l=h,m=d;b<l-m;){var p;for(p=0;p<m;++p){var q=k[b+p];k[b+p]=k[l-m+p];k[l-m+p]=q}b+=m;l-=m}b=h}return b}function pc(a,b,c,d){var e=0,f,g;f=0;for(g=b.length;f<g;++f)e=oc(a,e,b[f],c,d);return e};function qc(a,b){Yb.call(this);this.ja=[];this.h=-1;this.v=null;this.u=-1;this.a=null;this.ea(a,b)}B(qc,Yb);n=qc.prototype;n.clone=function(){var a=new qc(null);rc(a,this.c,this.o.slice(),this.ja.slice());return a};n.za=function(a){var b;void 0!==a?(b=sc(this).slice(),oc(b,0,this.ja,this.A,a)):b=this.o;return fc(b,0,this.ja,this.A)};function tc(a){if(a.h!=a.b){var b=tb(a.G());a.v=lc(sc(a),0,a.ja,a.A,b,0);a.h=a.b}return a.v}
	function sc(a){if(a.u!=a.b){var b=a.o;nc(b,a.ja,a.A)?a.a=b:(a.a=b.slice(),a.a.length=oc(a.a,0,a.ja,a.A));a.u=a.b}return a.a}n.Qa=function(a){var b=[],c=[];b.length=hc(this.o,0,this.ja,this.A,Math.sqrt(a),b,0,c);a=new qc(null);rc(a,"XY",b,c);return a};n.$=function(){return"Polygon"};n.ea=function(a,b){if(a){ac(this,b,a,2);this.o||(this.o=[]);var c=dc(this.o,0,a,this.A,this.ja);this.o.length=0===c.length?0:c[c.length-1];this.w()}else rc(this,"XY",null,this.ja)};
	function rc(a,b,c,d){$b(a,b,c);a.ja=d;a.w()};function uc(a){V.call(this);a=a||{};this.c=[0,0];var b={};b[vc]=void 0!==a.center?a.center:null;this.j=Sb(a.projection);var c,d,e,f=void 0!==a.minZoom?a.minZoom:0;c=void 0!==a.maxZoom?a.maxZoom:28;var g=void 0!==a.zoomFactor?a.zoomFactor:2;if(void 0!==a.resolutions)c=a.resolutions,d=c[0],e=c[c.length-1],c=Va(c);else{d=Sb(a.projection);e=d.G();var h=(e?Math.max(qb(e),rb(e)):360*Db.degrees/Lb(d))/256/Math.pow(2,0),k=h/Math.pow(2,28);d=a.maxResolution;void 0!==d?f=0:d=h/Math.pow(g,f);e=a.minResolution;
	void 0===e&&(e=void 0!==a.maxZoom?void 0!==a.maxResolution?d/Math.pow(g,c):h/Math.pow(g,c):k);c=f+Math.floor(Math.log(d/e)/Math.log(g));e=d/Math.pow(g,c-f);c=Wa(g,d,c-f)}this.f=d;this.i=e;this.s=g;this.g=a.resolutions;this.h=f;f=void 0!==a.extent?ma(a.extent):na;(void 0!==a.enableRotation?a.enableRotation:1)?(g=a.constrainRotation,g=void 0===g||!0===g?$a():!1===g?Ya:"number"===typeof g?Za(g):Ya):g=Xa;this.a=new oa(f,c,g);void 0!==a.resolution?b[wc]=a.resolution:void 0!==a.zoom&&(b[wc]=this.constrainResolution(this.f,
	a.zoom-this.h));b[xc]=void 0!==a.rotation?a.rotation:0;this.l(b)}B(uc,V);n=uc.prototype;n.constrainResolution=function(a,b,c){return this.a.resolution(a,b||0,c||0)};n.constrainRotation=function(a,b){return this.a.rotation(a,b||0)};n.qa=function(){return this.get(vc)};n.lc=function(a){var b=this.qa();L(b,1);var c=this.O();L(void 0!==c,2);var d=this.get(xc);L(void 0!==d,3);return ub(b,c,d,a)};n.ia=function(){return this.j};n.O=function(){return this.get(wc)};
	function yc(a,b){return Math.max(qb(a)/b[0],rb(a)/b[1])}n.T=function(){var a=this.qa(),b=this.ia(),c=this.O(),d=this.get(xc);return{center:a.slice(),projection:void 0!==b?b:null,resolution:c,rotation:d}};n.rd=function(){var a,b=this.O();if(void 0!==b&&b>=this.i&&b<=this.f){a=this.h||0;var c,d;if(this.g){d=Na(this.g,b,1);a+=d;if(d==this.g.length-1)return a;c=this.g[d];d=c/this.g[d+1]}else c=this.f,d=this.s;a+=Math.log(c/b)/Math.log(d)}return a};
	n.md=function(a,b,c){if(!(a instanceof Yb)){L(Array.isArray(a),24);L(!pb(a),25);var d=a[0],e=a[1],f=a[2],g=a[3],d=[d,e,d,g,f,g,f,e,d,e],e=new qc(null);rc(e,"XY",d,[d.length]);a=e}d=c||{};c=void 0!==d.padding?d.padding:[0,0,0,0];var g=void 0!==d.constrainResolution?d.constrainResolution:!0,e=void 0!==d.nearest?d.nearest:!1,h;void 0!==d.minResolution?h=d.minResolution:void 0!==d.maxZoom?h=this.constrainResolution(this.f,d.maxZoom-this.h,0):h=0;var k=a.o,f=this.get(xc),d=Math.cos(-f),f=Math.sin(-f),
	l=Infinity,m=Infinity,p=-Infinity,q=-Infinity;a=a.A;for(var u=0,w=k.length;u<w;u+=a)var r=k[u]*d-k[u+1]*f,x=k[u]*f+k[u+1]*d,l=Math.min(l,r),m=Math.min(m,x),p=Math.max(p,r),q=Math.max(q,x);b=yc([l,m,p,q],[b[0]-c[1]-c[3],b[1]-c[0]-c[2]]);b=isNaN(b)?h:Math.max(b,h);g&&(h=this.constrainResolution(b,0,0),!e&&h<b&&(h=this.constrainResolution(h,-1,0)),b=h);this.set(wc,b);f=-f;h=(l+p)/2+(c[1]-c[3])/2*b;b=(m+q)/2+(c[0]-c[2])/2*b;this.xa([h*d-b*f,b*d+h*f])};
	n.rotate=function(a,b){if(void 0!==b){var c,d=this.qa();void 0!==d&&(c=[d[0]-b[0],d[1]-b[1]],bb(c,a-this.get(xc)),ab(c,b));this.xa(c)}this.set(xc,a)};n.xa=function(a){this.set(vc,a)};function zc(a,b){a.c[1]+=b}n.ye=function(a){a=this.constrainResolution(this.f,a-this.h,0);this.set(wc,a)};var vc="center",wc="resolution",xc="rotation";function Ac(a){return 1-Math.pow(1-a,3)}function Bc(a){return 3*a*a-2*a*a*a}function Cc(a){return a};function Dc(a){var b=a.source,c=a.start?a.start:Date.now(),d=b[0],e=b[1],f=void 0!==a.duration?a.duration:1E3,g=a.easing?a.easing:Bc;return function(a,b){if(b.time<c)return b.animate=!0,b.viewHints[0]+=1,!0;if(b.time<c+f){var l=1-g((b.time-c)/f),m=d-b.viewState.center[0],p=e-b.viewState.center[1];b.animate=!0;b.viewState.center[0]+=l*m;b.viewState.center[1]+=l*p;b.viewHints[0]+=1;return!0}return!1}}
	function Ec(a){var b=a.rotation?a.rotation:0,c=a.start?a.start:Date.now(),d=void 0!==a.duration?a.duration:1E3,e=a.easing?a.easing:Bc,f=a.anchor?a.anchor:null;return function(a,h){if(h.time<c)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<c+d){var k=1-e((h.time-c)/d),k=(b-h.viewState.rotation)*k;h.animate=!0;h.viewState.rotation+=k;if(f){var l=h.viewState.center;l[0]-=f[0];l[1]-=f[1];bb(l,k);ab(l,f)}h.viewHints[0]+=1;return!0}return!1}}
	function Fc(a){var b=a.resolution,c=a.start?a.start:Date.now(),d=void 0!==a.duration?a.duration:1E3,e=a.easing?a.easing:Bc;return function(a,g){if(g.time<c)return g.animate=!0,g.viewHints[0]+=1,!0;if(g.time<c+d){var h=1-e((g.time-c)/d),k=b-g.viewState.resolution;g.animate=!0;g.viewState.resolution+=h*k;g.viewHints[0]+=1;return!0}return!1}};function Gc(a,b,c,d){this.H=a;this.I=b;this.J=c;this.L=d}function Hc(a,b,c){return a.H<=b&&b<=a.I&&a.J<=c&&c<=a.L}function Ic(a,b){return a.H==b.H&&a.J==b.J&&a.I==b.I&&a.L==b.L}function Jc(a,b){return a.H<=b.I&&a.I>=b.H&&a.J<=b.L&&a.L>=b.J};function Kc(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]*b+.5|0;c[1]=a[1]*b+.5|0;return c}function Lc(a,b){if(Array.isArray(a))return a;void 0===b?b=[a,a]:b[0]=b[1]=a;return b};function Mc(a){this.minZoom=void 0!==a.minZoom?a.minZoom:0;this.b=a.resolutions;L(Ua(this.b,function(a,b){return b-a}),17);this.maxZoom=this.b.length-1;this.c=void 0!==a.origin?a.origin:null;this.f=null;void 0!==a.origins&&(this.f=a.origins,L(this.f.length==this.b.length,20));var b=a.extent;void 0===b||this.c||this.f||(this.c=xb(b));L(!this.c&&this.f||this.c&&!this.f,18);this.g=null;void 0!==a.tileSizes&&(this.g=a.tileSizes,L(this.g.length==this.b.length,19));this.h=void 0!==a.tileSize?a.tileSize:
	this.g?null:256;L(!this.h&&this.g||this.h&&!this.g,22);this.i=void 0!==b?b:null;this.a=null;this.l=[0,0];void 0!==a.sizes?this.a=a.sizes.map(function(a){return new Gc(Math.min(0,a[0]),Math.max(a[0]-1,-1),Math.min(0,a[1]),Math.max(a[1]-1,-1))},this):b&&Nc(this,b)}var Oc=[0,0,0];function Pc(a,b,c,d,e){e=Qc(a,b,e);for(b=b[0]-1;b>=a.minZoom;){if(c.call(null,b,Rc(a,e,b,d)))return!0;--b}return!1}Mc.prototype.G=function(){return this.i};Mc.prototype.pa=function(a){return this.c?this.c:this.f[a]};
	Mc.prototype.O=function(a){return this.b[a]};function Sc(a,b,c,d){return b[0]<a.maxZoom?(d=Qc(a,b,d),Rc(a,d,b[0]+1,c)):null}function Tc(a,b,c,d){Uc(a,b[0],b[1],c,!1,Oc);var e=Oc[1],f=Oc[2];Uc(a,b[2],b[3],c,!0,Oc);a=Oc[1];b=Oc[2];void 0!==d?(d.H=e,d.I=a,d.J=f,d.L=b):d=new Gc(e,a,f,b);return d}function Rc(a,b,c,d){c=a.O(c);return Tc(a,b,c,d)}function Vc(a,b){var c=a.pa(b[0]),d=a.O(b[0]),e=Lc(Wc(a,b[0]),a.l);return[c[0]+(b[1]+.5)*e[0]*d,c[1]+(b[2]+.5)*e[1]*d]}
	function Qc(a,b,c){var d=a.pa(b[0]),e=a.O(b[0]);a=Lc(Wc(a,b[0]),a.l);var f=d[0]+b[1]*a[0]*e;b=d[1]+b[2]*a[1]*e;return ib(f,b,f+a[0]*e,b+a[1]*e,c)}function Uc(a,b,c,d,e,f){var g=Xc(a,d),h=d/a.O(g),k=a.pa(g);a=Lc(Wc(a,g),a.l);b=h*Math.floor((b-k[0])/d+(e?.5:0))/a[0];c=h*Math.floor((c-k[1])/d+(e?0:.5))/a[1];e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));e=b;void 0!==f?(f[0]=g,f[1]=e,f[2]=c):f=[g,e,c];return f}function Yc(a,b,c,d){c=a.O(c);return Uc(a,b[0],b[1],c,!1,d)}
	function Wc(a,b){return a.h?a.h:a.g[b]}function Xc(a,b,c){return ia(Na(a.b,b,c||0),a.minZoom,a.maxZoom)}function Nc(a,b){for(var c=a.b.length,d=Array(c),e=a.minZoom;e<c;++e)d[e]=Rc(a,b,e);a.a=d};function Zc(a){var b=a.f;if(!b){var b=$c(a),c=ad(b,void 0,void 0),b=new Mc({extent:b,origin:xb(b),resolutions:c,tileSize:void 0});a.f=b}return b}function ad(a,b,c){b=void 0!==b?b:42;var d=rb(a);a=qb(a);c=Lc(void 0!==c?c:256);c=Math.max(a/c[0],d/c[1]);b+=1;d=Array(b);for(a=0;a<b;++a)d[a]=c/Math.pow(2,a);return d}function $c(a){a=Hb(a);var b=a.G();b||(a=180*Db.degrees/Lb(a),b=ib(-a,-a,a,a));return b};function bd(a){this.a=a.html;this.b=a.tileRanges?a.tileRanges:null};function cd(a){V.call(this);this.a=a?a:[];dd(this)}B(cd,V);cd.prototype.clear=function(){for(;0<this.get("length");)this.pop()};function ed(a,b,c){a.a.forEach(b,c)}cd.prototype.pop=function(){return fd(this,this.get("length")-1)};cd.prototype.push=function(a){var b=this.a.length;this.a.splice(b,0,a);dd(this);U(this,new gd(hd,a));return b};cd.prototype.remove=function(a){var b=this.a,c,d;c=0;for(d=b.length;c<d;++c)if(b[c]===a)return fd(this,c)};
	function fd(a,b){var c=a.a[b];a.a.splice(b,1);dd(a);U(a,new gd(id,c));return c}function dd(a){a.set("length",a.a.length)}var hd="add",id="remove";function gd(a,b){T.call(this,a);this.element=b}B(gd,T);var jd=/^#(?:[0-9a-f]{3}){1,2}$/i,kd=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,ld=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i,md=/^([a-z]*)$/i;function nd(a){if("string"!==typeof a){var b=a[0];b!=(b|0)&&(b=b+.5|0);var c=a[1];c!=(c|0)&&(c=c+.5|0);var d=a[2];d!=(d|0)&&(d=d+.5|0);a="rgba("+b+","+c+","+d+","+(void 0===a[3]?1:a[3])+")"}return a}
	var pd=function(){var a={},b=0;return function(c){var d;if(a.hasOwnProperty(c))d=a[c];else{if(1024<=b){d=0;for(var e in a)0===(d++&3)&&(delete a[e],--b)}d=c;var f,g;md.exec(d)&&(e=document.createElement("div"),e.style.color=d,document.body.appendChild(e),d=window.getComputedStyle(e).color,document.body.removeChild(e));jd.exec(d)?(f=d.length-1,L(3==f||6==f,54),g=3==f?1:2,f=parseInt(d.substr(1+0*g,g),16),e=parseInt(d.substr(1+1*g,g),16),d=parseInt(d.substr(1+2*g,g),16),1==g&&(f=(f<<4)+f,e=(e<<4)+e,
	d=(d<<4)+d),f=[f,e,d,1]):(g=ld.exec(d))?(f=Number(g[1]),e=Number(g[2]),d=Number(g[3]),g=Number(g[4]),f=od([f,e,d,g])):(g=kd.exec(d))?(f=Number(g[1]),e=Number(g[2]),d=Number(g[3]),f=od([f,e,d,1])):L(!1,14);d=f;a[c]=d;++b}return d}}();function od(a){var b=[];b[0]=ia(a[0]+.5|0,0,255);b[1]=ia(a[1]+.5|0,0,255);b[2]=ia(a[2]+.5|0,0,255);b[3]=ia(a[3],0,1);return b};function qd(a){return"string"===typeof a||a instanceof CanvasPattern||a instanceof CanvasGradient?a:nd(a)};var rd=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function sd(a,b){return a<b?-1:a>b?1:0};function td(a,b,c){return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};var ud;a:{var vd=aa.navigator;if(vd){var wd=vd.userAgent;if(wd){ud=wd;break a}}ud=""}function xd(a){return-1!=ud.indexOf(a)};var yd=xd("Opera"),zd=xd("Trident")||xd("MSIE"),Ad=xd("Edge"),Bd=xd("Gecko")&&!(-1!=ud.toLowerCase().indexOf("webkit")&&!xd("Edge"))&&!(xd("Trident")||xd("MSIE"))&&!xd("Edge"),Cd=-1!=ud.toLowerCase().indexOf("webkit")&&!xd("Edge"),Dd;
	a:{var Ed="",Fd=function(){var a=ud;if(Bd)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ad)return/Edge\/([\d\.]+)/.exec(a);if(zd)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Cd)return/WebKit\/(\S+)/.exec(a);if(yd)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Fd&&(Ed=Fd?Fd[1]:"");if(zd){var Gd,Hd=aa.document;Gd=Hd?Hd.documentMode:void 0;if(null!=Gd&&Gd>parseFloat(Ed)){Dd=String(Gd);break a}}Dd=Ed}var Id={};function Jd(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function Kd(a,b){a[0]=b[0];a[1]=b[1];a[4]=b[2];a[5]=b[3];a[12]=b[4];a[13]=b[5];return a};var Ld=Jd();function Md(a,b){var c=document.createElement("CANVAS");a&&(c.width=a);b&&(c.height=b);return c.getContext("2d")}
	var Nd=function(){var a;return function(){if(void 0===a){var b=document.createElement("P"),c,d={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(b);for(var e in d)e in b.style&&(b.style[e]="translate(1px,1px)",c=K.getComputedStyle(b).getPropertyValue(d[e]));document.body.removeChild(b);a=c&&"none"!==c}return a}}(),Od=function(){var a;return function(){if(void 0===a){var b=document.createElement("P"),
	c,d={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(b);for(var e in d)e in b.style&&(b.style[e]="translate3d(1px,1px,1px)",c=K.getComputedStyle(b).getPropertyValue(d[e]));document.body.removeChild(b);a=c&&"none"!==c}return a}}();
	function Pd(a,b){var c=a.style;c.WebkitTransform=b;c.MozTransform=b;c.b=b;c.msTransform=b;c.transform=b;if((c=zd)&&!(c=Id["9.0"])){for(var c=0,d=rd(String(Dd)).split("."),e=rd("9.0").split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var p=l.exec(h)||["","",""],q=m.exec(k)||["","",""];if(0==p[0].length&&0==q[0].length)break;c=sd(0==p[1].length?0:parseInt(p[1],10),0==q[1].length?0:parseInt(q[1],10))||sd(0==
	p[2].length,0==q[2].length)||sd(p[2],q[2])}while(0==c)}c=Id["9.0"]=0<=c}c&&(a.style.transformOrigin="0 0")}function Qd(a,b){var c;if(Od()){var d=Kd(Ld,b),e=Array(16);for(c=0;16>c;++c)e[c]=d[c].toFixed(6);Pd(a,"matrix3d("+e.join(",")+")")}else if(Nd()){d=Array(6);for(c=0;6>c;++c)d[c]=b[c].toFixed(6);Pd(a,"matrix("+d.join(",")+")")}else a.style.left=Math.round(b[4])+"px",a.style.top=Math.round(b[5])+"px"}function Rd(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)}
	function Sd(a){a&&a.parentNode&&a.parentNode.removeChild(a)};function Td(a,b,c){T.call(this,a);this.map=b;this.frameState=void 0!==c?c:null}B(Td,T);function Ud(a){V.call(this);this.element=a.element?a.element:null;this.f=this.D=null;this.i=[];this.render=a.render?a.render:I;a.target&&(a=a.target,this.D="string"===typeof a?document.getElementById(a):a)}B(Ud,V);Ud.prototype.R=function(){Sd(this.element);V.prototype.R.call(this)};
	Ud.prototype.setMap=function(a){this.f&&Sd(this.element);for(var b=0,c=this.i.length;b<c;++b)M(this.i[b]);this.i.length=0;if(this.f=a)(this.D?this.D:a.j).appendChild(this.element),this.render!==I&&this.i.push(R(a,"postrender",this.render,this)),a.render()};function Vd(a){a=a?a:{};this.B=document.createElement("UL");this.j=document.createElement("LI");this.B.appendChild(this.j);this.j.style.display="none";this.g=void 0!==a.collapsed?a.collapsed:!0;this.v=void 0!==a.collapsible?a.collapsible:!0;this.v||(this.g=!1);var b=void 0!==a.className?a.className:"ol-attribution",c=void 0!==a.tipLabel?a.tipLabel:"Attributions",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00bb";"string"===typeof d?(this.h=document.createElement("span"),this.h.textContent=d):this.h=
	d;d=void 0!==a.label?a.label:"i";"string"===typeof d?(this.s=document.createElement("span"),this.s.textContent=d):this.s=d;var e=this.v&&!this.g?this.h:this.s,d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);R(d,"click",this.P,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control"+(this.g&&this.v?" ol-collapsed":"")+(this.v?"":" ol-uncollapsible");c.appendChild(this.B);c.appendChild(d);Ud.call(this,{element:c,render:a.render?
	a.render:Wd,target:a.target});this.u=!0;this.c={};this.a={};this.N={}}B(Vd,Ud);
	function Wd(a){if(a=a.frameState){var b,c,d,e,f,g,h,k,l,m,p,q=a.layerStatesArray,u=pa({},a.attributions),w={},r=a.viewState.projection;c=0;for(b=q.length;c<b;c++)if(g=q[c].layer.da())if(m=J(g).toString(),l=g.h)for(d=0,e=l.length;d<e;d++)if(h=l[d],k=J(h).toString(),!(k in u)){if(f=a.usedTiles[m]){var x=g.sa(r);a:{p=h;var D=r;if(p.b){var t,z,C,E=void 0;for(E in f)if(E in p.b){C=f[E];var v;t=0;for(z=p.b[E].length;t<z;++t){v=p.b[E][t];if(Jc(v,C)){p=!0;break a}var H=Rc(x,$c(D),parseInt(E,10)),G=H.I-H.H+
	1;if(C.H<H.H||C.I>H.I)if(Jc(v,new Gc(la(C.H,G),la(C.I,G),C.J,C.L))||C.I-C.H+1>G&&Jc(v,H)){p=!0;break a}}}p=!1}else p=!0}}else p=!1;p?(k in w&&delete w[k],u[k]=h):w[k]=h}b=[u,w];c=b[0];b=b[1];for(var A in this.c)A in c?(this.a[A]||(this.c[A].style.display="",this.a[A]=!0),delete c[A]):A in b?(this.a[A]&&(this.c[A].style.display="none",delete this.a[A]),delete b[A]):(Sd(this.c[A]),delete this.c[A],delete this.a[A]);for(A in c)d=document.createElement("LI"),d.innerHTML=c[A].a,this.B.appendChild(d),this.c[A]=
	d,this.a[A]=!0;for(A in b)d=document.createElement("LI"),d.innerHTML=b[A].a,d.style.display="none",this.B.appendChild(d),this.c[A]=d;A=!sa(this.a)||!sa(a.logos);this.u!=A&&(this.element.style.display=A?"":"none",this.u=A);A&&sa(this.a)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");var F;a=a.logos;A=this.N;for(F in A)F in a||(Sd(A[F]),delete A[F]);for(var Q in a)b=a[Q],b instanceof HTMLElement&&(this.j.appendChild(b),A[Q]=b),Q in A||(F=new Image,F.src=Q,""===
	b?c=F:(c=document.createElement("a"),c.href=b,c.appendChild(F)),this.j.appendChild(c),A[Q]=c);this.j.style.display=sa(a)?"none":""}else this.u&&(this.element.style.display="none",this.u=!1)}Vd.prototype.P=function(a){a.preventDefault();this.element.classList.toggle("ol-collapsed");this.g?Rd(this.h,this.s):Rd(this.s,this.h);this.g=!this.g};function Xd(a){a=a?a:{};this.a=void 0!==a.className?a.className:"ol-full-screen";var b=void 0!==a.label?a.label:"\u2922";this.g="string"===typeof b?document.createTextNode(b):b;b=void 0!==a.labelActive?a.labelActive:"\u00d7";this.h="string"===typeof b?document.createTextNode(b):b;var c=a.tipLabel?a.tipLabel:"Toggle full-screen",b=document.createElement("button");b.className=this.a+"-"+Yd();b.setAttribute("type","button");b.title=c;b.appendChild(this.g);R(b,"click",this.v,this);c=document.createElement("div");
	c.className=this.a+" ol-unselectable ol-control "+(Zd()?"":"ol-unsupported");c.appendChild(b);Ud.call(this,{element:c,target:a.target});this.s=void 0!==a.keys?a.keys:!1;this.c=a.source}B(Xd,Ud);
	Xd.prototype.v=function(a){a.preventDefault();Zd()&&(a=this.f)&&(Yd()?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(a=this.c?"string"===typeof this.c?document.getElementById(this.c):this.c:a.Ra(),this.s?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):
	$d(a):$d(a)))};Xd.prototype.j=function(){var a=this.element.firstElementChild,b=this.f;Yd()?(a.className=this.a+"-true",Rd(this.h,this.g)):(a.className=this.a+"-false",Rd(this.g,this.h));b&&b.yb()};Xd.prototype.setMap=function(a){Ud.prototype.setMap.call(this,a);a&&this.i.push(R(K.document,ae(),this.j,this))};
	function Zd(){var a=document.body;return!!(a.webkitRequestFullscreen||a.mozRequestFullScreen&&document.mozFullScreenEnabled||a.msRequestFullscreen&&document.msFullscreenEnabled||a.requestFullscreen&&document.fullscreenEnabled)}function Yd(){return!!(document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||document.fullscreenElement)}
	function $d(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()}var ae=function(){var a;return function(){if(!a){var b=document.body;b.webkitRequestFullscreen?a="webkitfullscreenchange":b.mozRequestFullScreen?a="mozfullscreenchange":b.msRequestFullscreen?a="MSFullscreenChange":b.requestFullscreen&&(a="fullscreenchange")}return a}}();function be(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-rotate",c=void 0!==a.label?a.label:"\u21e7";this.a=null;"string"===typeof c?(this.a=document.createElement("span"),this.a.className="ol-compass",this.a.textContent=c):(this.a=c,this.a.classList.add("ol-compass"));var d=a.tipLabel?a.tipLabel:"Reset rotation",c=document.createElement("button");c.className=b+"-reset";c.setAttribute("type","button");c.title=d;c.appendChild(this.a);R(c,"click",be.prototype.s,this);d=document.createElement("div");
	d.className=b+" ol-unselectable ol-control";d.appendChild(c);b=a.render?a.render:ce;this.g=a.resetNorth?a.resetNorth:void 0;Ud.call(this,{element:d,render:b,target:a.target});this.h=void 0!==a.duration?a.duration:250;this.c=void 0!==a.autoHide?a.autoHide:!0;this.j=void 0;this.c&&this.element.classList.add("ol-hidden")}B(be,Ud);
	be.prototype.s=function(a){a.preventDefault();if(void 0!==this.g)this.g();else{a=this.f;var b=a.U();if(b){var c=b.get(xc);void 0!==c&&(0<this.h&&(c%=2*Math.PI,c<-Math.PI&&(c+=2*Math.PI),c>Math.PI&&(c-=2*Math.PI),a.oa(Ec({rotation:c,duration:this.h,easing:Ac}))),b.set(xc,0))}}};
	function ce(a){if(a=a.frameState){a=a.viewState.rotation;if(a!=this.j){var b="rotate("+a+"rad)";if(this.c){var c=this.element.classList.contains("ol-hidden");c||0!==a?c&&0!==a&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.a.style.msTransform=b;this.a.style.webkitTransform=b;this.a.style.transform=b}this.j=a}};function de(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-zoom",c=void 0!==a.delta?a.delta:1,d=void 0!==a.zoomInLabel?a.zoomInLabel:"+",e=void 0!==a.zoomOutLabel?a.zoomOutLabel:"\u2212",f=void 0!==a.zoomInTipLabel?a.zoomInTipLabel:"Zoom in",g=void 0!==a.zoomOutTipLabel?a.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=b+"-in";h.setAttribute("type","button");h.title=f;h.appendChild("string"===typeof d?document.createTextNode(d):d);R(h,"click",de.prototype.c.bind(this,
	c));d=document.createElement("button");d.className=b+"-out";d.setAttribute("type","button");d.title=g;d.appendChild("string"===typeof e?document.createTextNode(e):e);R(d,"click",de.prototype.c.bind(this,-c));c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(h);c.appendChild(d);Ud.call(this,{element:c,target:a.target});this.a=void 0!==a.duration?a.duration:250}B(de,Ud);
	de.prototype.c=function(a,b){b.preventDefault();var c=this.f,d=c.U();if(d){var e=d.O();e&&(0<this.a&&c.oa(Fc({resolution:e,duration:this.a,easing:Ac})),c=d.constrainResolution(e,a),d.set(wc,c))}};function ee(a){a=a?a:{};var b=new cd;(void 0!==a.zoom?a.zoom:1)&&b.push(new de(a.zoomOptions));(void 0!==a.rotate?a.rotate:1)&&b.push(new be(a.rotateOptions));(void 0!==a.attribution?a.attribution:1)&&b.push(new Vd(a.attributionOptions));return b};var fe;
	function ge(){var a=aa.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!xd("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=ea(function(a){if(("*"==d||a.origin==d)&&a.data==
	c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!xd("Trident")&&!xd("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.nc;c.nc=null;a()}};return function(a){d.next={nc:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
	b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){aa.setTimeout(a,0)}};var he=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function ie(a,b){var c,d,e=he.length;for(d=0;d<e;++d)try{if(c=a.getContext(he[d],b))return c}catch(f){}return null};var je,ke="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",le=-1!==ke.indexOf("firefox"),me=-1!==ke.indexOf("safari")&&-1===ke.indexOf("chrom"),ne=-1!==ke.indexOf("macintosh"),oe=K.devicePixelRatio||1,pe=!1,qe=function(){if(!("HTMLCanvasElement"in K))return!1;try{var a=Md();return a?(a.setLineDash&&(pe=!0),!0):!1}catch(b){return!1}}(),re="ontouchstart"in K,se="PointerEvent"in K,te=!!K.navigator.msPointerEnabled,ue=!1,ve=[];
	if("WebGLRenderingContext"in K)try{var we=ie(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});we&&(ue=!0,ve=we.getSupportedExtensions())}catch(a){}je=ue;fa=ve;function xe(a,b){this.b=a;this.g=b};function ye(a){xe.call(this,a,{mousedown:this.Pd,mousemove:this.Qd,mouseup:this.Td,mouseover:this.Sd,mouseout:this.Rd});this.a=a.a;this.c=[]}B(ye,xe);function ze(a,b){for(var c=a.c,d=b.clientX,e=b.clientY,f=0,g=c.length,h;f<g&&(h=c[f]);f++){var k=Math.abs(e-h[1]);if(25>=Math.abs(d-h[0])&&25>=k)return!0}return!1}function Ae(a){var b=Be(a,a),c=b.preventDefault;b.preventDefault=function(){a.preventDefault();c()};b.pointerId=1;b.isPrimary=!0;b.pointerType="mouse";return b}n=ye.prototype;
	n.Pd=function(a){if(!ze(this,a)){if((1).toString()in this.a){var b=Ae(a);Ce(this.b,De,b,a);delete this.a[(1).toString()]}b=Ae(a);this.a[(1).toString()]=a;Ce(this.b,Ee,b,a)}};n.Qd=function(a){if(!ze(this,a)){var b=Ae(a);Ce(this.b,Fe,b,a)}};n.Td=function(a){if(!ze(this,a)){var b=this.a[(1).toString()];b&&b.button===a.button&&(b=Ae(a),Ce(this.b,Ge,b,a),delete this.a[(1).toString()])}};n.Sd=function(a){if(!ze(this,a)){var b=Ae(a);He(this.b,b,a)}};
	n.Rd=function(a){if(!ze(this,a)){var b=Ae(a);Ie(this.b,b,a)}};function Je(a){xe.call(this,a,{MSPointerDown:this.Yd,MSPointerMove:this.Zd,MSPointerUp:this.be,MSPointerOut:this.$d,MSPointerOver:this.ae,MSPointerCancel:this.Xd,MSGotPointerCapture:this.Vd,MSLostPointerCapture:this.Wd});this.a=a.a;this.c=["","unavailable","touch","pen","mouse"]}B(Je,xe);function Ke(a,b){var c=b;"number"===typeof b.pointerType&&(c=Be(b,b),c.pointerType=a.c[b.pointerType]);return c}n=Je.prototype;n.Yd=function(a){this.a[a.pointerId.toString()]=a;var b=Ke(this,a);Ce(this.b,Ee,b,a)};
	n.Zd=function(a){var b=Ke(this,a);Ce(this.b,Fe,b,a)};n.be=function(a){var b=Ke(this,a);Ce(this.b,Ge,b,a);delete this.a[a.pointerId.toString()]};n.$d=function(a){var b=Ke(this,a);Ie(this.b,b,a)};n.ae=function(a){var b=Ke(this,a);He(this.b,b,a)};n.Xd=function(a){var b=Ke(this,a);Ce(this.b,De,b,a);delete this.a[a.pointerId.toString()]};n.Wd=function(a){U(this.b,new Le("lostpointercapture",a,a))};n.Vd=function(a){U(this.b,new Le("gotpointercapture",a,a))};function Me(a){xe.call(this,a,{pointerdown:this.le,pointermove:this.me,pointerup:this.pe,pointerout:this.ne,pointerover:this.oe,pointercancel:this.ke,gotpointercapture:this.sd,lostpointercapture:this.Od})}B(Me,xe);n=Me.prototype;n.le=function(a){Ne(this.b,a)};n.me=function(a){Ne(this.b,a)};n.pe=function(a){Ne(this.b,a)};n.ne=function(a){Ne(this.b,a)};n.oe=function(a){Ne(this.b,a)};n.ke=function(a){Ne(this.b,a)};n.Od=function(a){Ne(this.b,a)};n.sd=function(a){Ne(this.b,a)};function Le(a,b,c){T.call(this,a);this.b=b;a=c?c:{};this.buttons=Oe(a);this.pressure=Pe(a,this.buttons);this.bubbles="bubbles"in a?a.bubbles:!1;this.cancelable="cancelable"in a?a.cancelable:!1;this.view="view"in a?a.view:null;this.detail="detail"in a?a.detail:null;this.screenX="screenX"in a?a.screenX:0;this.screenY="screenY"in a?a.screenY:0;this.clientX="clientX"in a?a.clientX:0;this.clientY="clientY"in a?a.clientY:0;this.button="button"in a?a.button:0;this.relatedTarget="relatedTarget"in a?a.relatedTarget:
	null;this.pointerId="pointerId"in a?a.pointerId:0;this.width="width"in a?a.width:0;this.height="height"in a?a.height:0;this.pointerType="pointerType"in a?a.pointerType:"";this.isPrimary="isPrimary"in a?a.isPrimary:!1;b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}B(Le,T);function Oe(a){if(a.buttons||Qe)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}function Pe(a,b){var c=0;a.pressure?c=a.pressure:c=b?.5:0;return c}
	var Qe=!1;try{Qe=1===(new MouseEvent("click",{buttons:1})).buttons}catch(a){};function Re(a,b){xe.call(this,a,{touchstart:this.Ce,touchmove:this.Be,touchend:this.Ae,touchcancel:this.ze});this.a=a.a;this.l=b;this.c=void 0;this.h=0;this.f=void 0}B(Re,xe);n=Re.prototype;n.Uc=function(){this.h=0;this.f=void 0};
	function Se(a,b,c){b=Be(b,c);b.pointerId=c.identifier+2;b.bubbles=!0;b.cancelable=!0;b.detail=a.h;b.button=0;b.buttons=1;b.width=c.webkitRadiusX||c.radiusX||0;b.height=c.webkitRadiusY||c.radiusY||0;b.pressure=c.webkitForce||c.force||.5;b.isPrimary=a.c===c.identifier;b.pointerType="touch";b.clientX=c.clientX;b.clientY=c.clientY;b.screenX=c.screenX;b.screenY=c.screenY;return b}
	function Te(a,b,c){function d(){b.preventDefault()}var e=Array.prototype.slice.call(b.changedTouches),f=e.length,g,h;for(g=0;g<f;++g)h=Se(a,b,e[g]),h.preventDefault=d,c.call(a,b,h)}
	n.Ce=function(a){var b=a.touches,c=Object.keys(this.a),d=c.length;if(d>=b.length){var e=[],f,g,h;for(f=0;f<d;++f){g=c[f];h=this.a[g];var k;if(!(k=1==g))a:{k=b.length;for(var l,m=0;m<k;m++)if(l=b[m],l.identifier===g-2){k=!0;break a}k=!1}k||e.push(h.out)}for(f=0;f<e.length;++f)this.Ib(a,e[f])}b=a.changedTouches[0];c=Object.keys(this.a).length;if(0===c||1===c&&(1).toString()in this.a)this.c=b.identifier,b=K,void 0!==this.f&&b.clearTimeout(this.f);Ue(this,a);this.h++;Te(this,a,this.je)};
	n.je=function(a,b){this.a[b.pointerId]={target:b.target,out:b,Rc:b.target};var c=this.b;b.bubbles=!0;Ce(c,Ve,b,a);c=this.b;b.bubbles=!1;Ce(c,We,b,a);Ce(this.b,Ee,b,a)};n.Be=function(a){a.preventDefault();Te(this,a,this.Ud)};n.Ud=function(a,b){var c=this.a[b.pointerId];if(c){var d=c.out,e=c.Rc;Ce(this.b,Fe,b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(Ie(this.b,d,a),He(this.b,b,a)):(b.target=e,b.relatedTarget=null,this.Ib(a,b)));c.out=b;c.Rc=b.target}};
	n.Ae=function(a){Ue(this,a);Te(this,a,this.De)};n.De=function(a,b){Ce(this.b,Ge,b,a);this.b.out(b,a);var c=this.b;b.bubbles=!1;Ce(c,Xe,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.c=void 0,this.f=K.setTimeout(this.Uc.bind(this),200))};n.ze=function(a){Te(this,a,this.Ib)};n.Ib=function(a,b){Ce(this.b,De,b,a);this.b.out(b,a);var c=this.b;b.bubbles=!1;Ce(c,Xe,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.c=void 0,this.f=K.setTimeout(this.Uc.bind(this),200))};
	function Ue(a,b){var c=a.l.c,d=b.changedTouches[0];if(a.c===d.identifier){var e=[d.clientX,d.clientY];c.push(e);K.setTimeout(function(){Qa(c,e)},2500)}};function Ye(a){Ga.call(this);this.g=a;this.a={};this.f={};this.b=[];se?Ze(this,new Me(this)):te?Ze(this,new Je(this)):(a=new ye(this),Ze(this,a),re&&Ze(this,new Re(this,a)));a=this.b.length;for(var b,c=0;c<a;c++)b=this.b[c],$e(this,Object.keys(b.g))}B(Ye,Ga);function Ze(a,b){var c=Object.keys(b.g);c&&(c.forEach(function(a){var c=b.g[a];c&&(this.f[a]=c.bind(b))},a),a.b.push(b))}Ye.prototype.c=function(a){var b=this.f[a.type];b&&b(a)};
	function $e(a,b){b.forEach(function(a){R(this.g,a,this.c,this)},a)}function af(a,b){b.forEach(function(a){ya(this.g,a,this.c,this)},a)}function Be(a,b){for(var c={},d,e=0,f=bf.length;e<f;e++)d=bf[e][0],c[d]=a[d]||b[d]||bf[e][1];return c}Ye.prototype.out=function(a,b){a.bubbles=!0;Ce(this,cf,a,b)};function Ie(a,b,c){a.out(b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,Ce(a,Xe,b,c))}
	function He(a,b,c){b.bubbles=!0;Ce(a,Ve,b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,Ce(a,We,b,c))}function Ce(a,b,c,d){U(a,new Le(b,d,c))}function Ne(a,b){U(a,new Le(b.type,b,b))}Ye.prototype.R=function(){for(var a=this.b.length,b,c=0;c<a;c++)b=this.b[c],af(this,Object.keys(b.g));Ga.prototype.R.call(this)};
	var Fe="pointermove",Ee="pointerdown",Ge="pointerup",Ve="pointerover",cf="pointerout",We="pointerenter",Xe="pointerleave",De="pointercancel",bf=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
	!1],["type",""],["target",null],["currentTarget",null],["which",0]];function df(a,b,c,d,e){Td.call(this,a,b,e);this.originalEvent=c;this.pixel=b.uc(c);this.coordinate=b.Ba(this.pixel);this.dragging=void 0!==d?d:!1}B(df,Td);df.prototype.preventDefault=function(){Td.prototype.preventDefault.call(this);this.originalEvent.preventDefault()};df.prototype.stopPropagation=function(){Td.prototype.stopPropagation.call(this);this.originalEvent.stopPropagation()};function ef(a,b,c,d,e){df.call(this,a,b,c.b,d,e);this.b=c}B(ef,df);
	function ff(a){Ga.call(this);this.c=a;this.h=0;this.l=!1;this.f=[];this.a=null;a=this.c.a;this.v=0;this.s={};this.g=new Ye(a);this.b=null;this.i=R(this.g,Ee,this.Cd,this);this.j=R(this.g,Fe,this.re,this)}B(ff,Ga);function gf(a,b){var c;c=new ef(hf,a.c,b);U(a,c);0!==a.h?(K.clearTimeout(a.h),a.h=0,c=new ef(jf,a.c,b),U(a,c)):a.h=K.setTimeout(function(){this.h=0;var a=new ef(kf,this.c,b);U(this,a)}.bind(a),250)}
	function lf(a,b){b.type==mf||b.type==nf?delete a.s[b.pointerId]:b.type==of&&(a.s[b.pointerId]=!0);a.v=Object.keys(a.s).length}n=ff.prototype;n.xc=function(a){lf(this,a);var b=new ef(mf,this.c,a);U(this,b);!this.l&&0===a.button&&gf(this,this.a);0===this.v&&(this.f.forEach(M),this.f.length=0,this.l=!1,this.a=null,Da(this.b),this.b=null)};
	n.Cd=function(a){lf(this,a);var b=new ef(of,this.c,a);U(this,b);this.a=a;0===this.f.length&&(this.b=new Ye(document),this.f.push(R(this.b,pf,this.ee,this),R(this.b,mf,this.xc,this),R(this.g,nf,this.xc,this)))};n.ee=function(a){if(a.clientX!=this.a.clientX||a.clientY!=this.a.clientY){this.l=!0;var b=new ef(qf,this.c,a,this.l);U(this,b)}a.preventDefault()};n.re=function(a){U(this,new ef(a.type,this.c,a,!(!this.a||a.clientX==this.a.clientX&&a.clientY==this.a.clientY)))};
	n.R=function(){this.j&&(M(this.j),this.j=null);this.i&&(M(this.i),this.i=null);this.f.forEach(M);this.f.length=0;this.b&&(Da(this.b),this.b=null);this.g&&(Da(this.g),this.g=null);Ga.prototype.R.call(this)};var kf="singleclick",hf="click",jf="dblclick",qf="pointerdrag",pf="pointermove",of="pointerdown",mf="pointerup",nf="pointercancel",rf={Pe:kf,Ee:hf,Fe:jf,Ie:qf,Le:pf,He:of,Oe:mf,Ne:"pointerover",Me:"pointerout",Je:"pointerenter",Ke:"pointerleave",Ge:nf};function sf(a){V.call(this);var b=pa({},a);b.opacity=void 0!==a.opacity?a.opacity:1;b.visible=void 0!==a.visible?a.visible:!0;b.zIndex=void 0!==a.zIndex?a.zIndex:0;b.maxResolution=void 0!==a.maxResolution?a.maxResolution:Infinity;b.minResolution=void 0!==a.minResolution?a.minResolution:0;this.l(b)}B(sf,V);
	function tf(a){var b=a.Xb(),c=a.Sb(),d=a.gb(),e=a.G(),f=a.Yb(),g=a.get("maxResolution"),h=a.get("minResolution");return{layer:a,opacity:ia(b,0,1),ac:c,visible:d,hb:!0,extent:e,zIndex:f,maxResolution:g,minResolution:Math.max(h,0)}}n=sf.prototype;n.G=function(){return this.get("extent")};n.Xb=function(){return this.get("opacity")};n.gb=function(){return this.get("visible")};n.Yb=function(){return this.get("zIndex")};n.Bc=function(a){this.set("opacity",a)};n.Cc=function(a){this.set("visible",a)};
	n.Dc=function(a){this.set("zIndex",a)};function uf(a,b,c,d,e){T.call(this,a);this.vectorContext=b;this.frameState=c;this.context=d;this.glContext=e}B(uf,T);function vf(a){V.call(this);this.N=Hb(a.projection);this.h=wf(a.attributions);this.D=a.logo;this.P=void 0!==a.state?a.state:"ready";this.i=void 0!==a.wrapX?a.wrapX:!1}B(vf,V);function wf(a){if("string"===typeof a)return[new bd({html:a})];if(a instanceof bd)return[a];if(Array.isArray(a)){for(var b=a.length,c=Array(b),d=0;d<b;d++){var e=a[d];c[d]="string"===typeof e?new bd({html:e}):e}return c}return null}vf.prototype.fa=I;vf.prototype.ia=function(){return this.N};vf.prototype.T=function(){return this.P};
	vf.prototype.Ja=function(){this.w()};function xf(a){var b=pa({},a);delete b.source;sf.call(this,b);this.h=this.f=this.c=null;a.map&&this.setMap(a.map);R(this,La("source"),this.Hd,this);this.$b(a.source?a.source:null)}B(xf,sf);function yf(a,b){return a.visible&&b>=a.minResolution&&b<a.maxResolution}n=xf.prototype;n.Pb=function(a){a=a?a:[];a.push(tf(this));return a};n.da=function(){return this.get("source")||null};n.Sb=function(){var a=this.da();return a?a.T():"undefined"};n.fe=function(){this.w()};
	n.Hd=function(){this.h&&(M(this.h),this.h=null);var a=this.da();a&&(this.h=R(a,"change",this.fe,this));this.w()};n.setMap=function(a){this.c&&(M(this.c),this.c=null);a||this.w();this.f&&(M(this.f),this.f=null);a&&(this.c=R(a,"precompose",function(a){var c=tf(this);c.hb=!1;c.zIndex=Infinity;a.frameState.layerStatesArray.push(c);a.frameState.layerStates[J(this)]=c},this),this.f=R(this,"change",a.render,a),this.w())};n.$b=function(a){this.set("source",a)};function zf(){this.b={};this.a=0}zf.prototype.clear=function(){this.b={};this.a=0};zf.prototype.get=function(a,b,c){a=b+":"+a+":"+(c?nd(c):"null");return a in this.b?this.b[a]:null};zf.prototype.set=function(a,b,c,d){this.b[b+":"+a+":"+(c?nd(c):"null")]=d;++this.a};var Af=new zf;var Bf=Array(6);function Cf(){return[1,0,0,1,0,0]}function Df(a){return Ef(a,1,0,0,1,0,0)}function Ff(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],k=b[0],l=b[1],m=b[2],p=b[3],q=b[4],u=b[5];a[0]=c*k+e*l;a[1]=d*k+f*l;a[2]=c*m+e*p;a[3]=d*m+f*p;a[4]=c*q+e*u+g;a[5]=d*q+f*u+h}function Ef(a,b,c,d,e,f,g){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;return a}function Gf(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}
	function Hf(a,b){var c=b[0],d=b[1];b[0]=a[0]*c+a[2]*d+a[4];b[1]=a[1]*c+a[3]*d+a[5];return b}function If(a,b){var c=Math.cos(b),d=Math.sin(b);Ff(a,Ef(Bf,c,d,-d,c,0,0))}function Jf(a,b,c){Ff(a,Ef(Bf,b,0,0,c,0,0))}function Kf(a,b,c){Ff(a,Ef(Bf,1,0,0,1,b,c))}function Lf(a,b,c,d,e,f,g,h){var k=Math.sin(f);f=Math.cos(f);a[0]=d*f;a[1]=e*k;a[2]=-d*k;a[3]=e*f;a[4]=g*d*f-h*d*k+b;a[5]=g*e*k+h*e*f+c;return a}
	function Mf(a){var b=a[0]*a[3]-a[1]*a[2];L(0!==b,32);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5];a[0]=f/b;a[1]=-d/b;a[2]=-e/b;a[3]=c/b;a[4]=(e*h-f*g)/b;a[5]=-(c*h-d*g)/b};function Nf(a,b){this.g=b;this.c={};this.j={}}B(Nf,Aa);function Of(a){var b=a.viewState,c=a.coordinateToPixelTransform,d=a.pixelToCoordinateTransform;Lf(c,a.size[0]/2,a.size[1]/2,1/b.resolution,-1/b.resolution,-b.rotation,-b.center[0],-b.center[1]);Mf(Gf(d,c))}n=Nf.prototype;n.R=function(){for(var a in this.c)Da(this.c[a])};function Pf(){if(32<Af.a){var a=0,b,c;for(b in Af.b)c=Af.b[b],0!==(a++&3)||Ha(c)||(delete Af.b[b],--Af.a)}}
	n.fa=function(a,b,c,d,e,f){function g(a,e){var f=J(a).toString(),g=b.layerStates[J(e)].hb;if(!(f in b.skippedFeatureUids)||g)return c.call(d,a,g?e:null)}var h,k=b.viewState,l=k.resolution,m=k.projection,k=a;if(m.b){var m=m.G(),p=qb(m),q=a[0];if(q<m[0]||q>m[2])k=[q+p*Math.ceil((m[0]-q)/p),a[1]]}m=b.layerStatesArray;for(p=m.length-1;0<=p;--p){var u=m[p],q=u.layer;if(yf(u,l)&&e.call(f,q)&&(u=Qf(this,q),q.da()&&(h=u.fa(q.da().i?k:a,b,g,d)),h))return h}};
	n.Fc=function(a,b,c,d){return void 0!==this.fa(a,b,yb,this,c,d)};function Qf(a,b){var c=J(b).toString();if(c in a.c)return a.c[c];var d=a.Mb(b);a.c[c]=d;a.j[c]=R(d,"change",a.wd,a);return d}n.wd=function(){this.g.render()};n.vb=I;n.ue=function(a,b){for(var c in this.c)if(!(b&&c in b.layerStates)){var d=c,e=this.c[d];delete this.c[d];M(this.j[d]);delete this.j[d];Da(e)}};function Rf(a,b){for(var c in a.c)if(!(c in b.layerStates)){b.postRenderFunctions.push(a.ue.bind(a));break}}
	function Ta(a,b){return a.zIndex-b.zIndex};function Sf(a,b){Ga.call(this);this.V=a;this.state=b;this.b=null;this.key=""}B(Sf,Ga);function Tf(a){U(a,"change")}Sf.prototype.getKey=function(){return this.key+"/"+this.V};Sf.prototype.T=function(){return this.state};function Uf(a,b){this.j=a;this.f=b;this.b=[];this.c=[];this.a={}}Uf.prototype.clear=function(){this.b.length=0;this.c.length=0;qa(this.a)};function Vf(a){var b=a.b,c=a.c,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),Wf(a,0));b=a.f(d);delete a.a[b];return d}Uf.prototype.g=function(a){L(!(this.f(a)in this.a),31);var b=this.j(a);return Infinity!=b?(this.b.push(a),this.c.push(b),this.a[this.f(a)]=!0,Xf(this,0,this.b.length-1),!0):!1};
	function Wf(a,b){for(var c=a.b,d=a.c,e=c.length,f=c[b],g=d[b],h=b;b<e>>1;){var k=2*b+1,l=2*b+2,k=l<e&&d[l]<d[k]?l:k;c[b]=c[k];d[b]=d[k];b=k}c[b]=f;d[b]=g;Xf(a,h,b)}function Xf(a,b,c){var d=a.b;a=a.c;for(var e=d[c],f=a[c];c>b;){var g=c-1>>1;if(a[g]>f)d[c]=d[g],a[c]=a[g],c=g;else break}d[c]=e;a[c]=f}function Yf(a){var b=a.j,c=a.b,d=a.c,e=0,f=c.length,g,h,k;for(h=0;h<f;++h)g=c[h],k=b(g),Infinity==k?delete a.a[a.f(g)]:(d[e]=k,c[e++]=g);c.length=e;d.length=e;for(b=(a.b.length>>1)-1;0<=b;b--)Wf(a,b)};function Zf(a,b){Uf.call(this,function(b){return a.apply(null,b)},function(a){return a[0].getKey()});this.C=b;this.l=0;this.h={}}B(Zf,Uf);Zf.prototype.g=function(a){var b=Uf.prototype.g.call(this,a);b&&R(a[0],"change",this.i,this);return b};Zf.prototype.i=function(a){a=a.target;var b=a.T();if(2===b||3===b||4===b||5===b)ya(a,"change",this.i,this),a=a.getKey(),a in this.h&&(delete this.h[a],--this.l),this.C()};function $f(){this.b=[];this.a=this.c=0}function ag(a,b){var c=a.a,d=.05-c,e=Math.log(.05/a.a)/-.005;return Dc({source:b,duration:e,easing:function(a){return c*(Math.exp(-.005*a*e)-1)/d}})};function bg(a){V.call(this);this.aa=null;this.set("active",!0);this.handleEvent=a.handleEvent}B(bg,V);bg.prototype.setMap=function(a){this.aa=a};function cg(a,b,c,d,e){if(void 0!==c){var f=b.get(xc),g=b.qa();void 0!==f&&g&&e&&0<e&&(a.oa(Ec({rotation:f,duration:e,easing:Ac})),d&&a.oa(Dc({source:g,duration:e,easing:Ac})));b.rotate(c,d)}}function dg(a,b,c,d,e){var f=b.O();c=b.constrainResolution(f,c,0);eg(a,b,c,d,e)}
	function eg(a,b,c,d,e){if(c){var f=b.O(),g=b.qa();void 0!==f&&g&&c!==f&&e&&0<e&&(a.oa(Fc({resolution:f,duration:e,easing:Ac})),d&&a.oa(Dc({source:g,duration:e,easing:Ac})));if(d){var h;a=b.qa();e=b.O();void 0!==a&&void 0!==e&&(h=[d[0]-c*(d[0]-a[0])/e,d[1]-c*(d[1]-a[1])/e]);b.xa(h)}b.set(wc,c)}};function fg(a){a=a?a:{};this.a=a.delta?a.delta:1;bg.call(this,{handleEvent:gg});this.c=void 0!==a.duration?a.duration:250}B(fg,bg);function gg(a){var b=!1,c=a.originalEvent;if(a.type==jf){var b=a.map,d=a.coordinate,c=c.shiftKey?-this.a:this.a,e=b.U();dg(b,e,c,d,this.c);a.preventDefault();b=!0}return!b};function hg(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function ig(a){a=a.originalEvent;return 0==a.button&&!(Cd&&ne&&a.ctrlKey)}function jg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey}function kg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function lg(a){a=a.originalEvent.target.tagName;return"INPUT"!==a&&"SELECT"!==a&&"TEXTAREA"!==a}function mg(a){L(a.b,56);return"mouse"==a.b.pointerType};function ng(a){a=a?a:{};bg.call(this,{handleEvent:a.handleEvent?a.handleEvent:og});this.Bb=a.handleDownEvent?a.handleDownEvent:zb;this.Cb=a.handleDragEvent?a.handleDragEvent:I;this.zb=a.handleMoveEvent?a.handleMoveEvent:I;this.Eb=a.handleUpEvent?a.handleUpEvent:zb;this.v=!1;this.N={};this.f=[]}B(ng,bg);function pg(a){for(var b=a.length,c=0,d=0,e=0;e<b;e++)c+=a[e].clientX,d+=a[e].clientY;return[c/b,d/b]}
	function og(a){if(!(a instanceof ef))return!0;var b=!1,c=a.type;if(c===of||c===qf||c===mf)c=a.b,a.type==mf?delete this.N[c.pointerId]:a.type==of?this.N[c.pointerId]=c:c.pointerId in this.N&&(this.N[c.pointerId]=c),this.f=ra(this.N);this.v&&(a.type==qf?this.Cb(a):a.type==mf&&(this.v=this.Eb(a)));a.type==of?(this.v=a=this.Bb(a),b=this.B(a)):a.type==pf&&this.zb(a);return!b}ng.prototype.B=function(a){return a};function qg(a){ng.call(this,{handleDownEvent:rg,handleDragEvent:sg,handleUpEvent:tg});a=a?a:{};this.a=a.kinetic;this.c=this.g=null;this.i=a.condition?a.condition:jg;this.h=!1}B(qg,ng);function sg(a){var b=pg(this.f);this.a&&this.a.b.push(b[0],b[1],Date.now());if(this.c){var c=this.c[0]-b[0],d=b[1]-this.c[1];a=a.map.U();var e=a.T(),d=c=[c,d],f=e.resolution;d[0]*=f;d[1]*=f;bb(c,e.rotation);ab(c,e.center);c=a.a.center(c);a.xa(c)}this.c=b}
	function tg(a){var b=a.map;a=b.U();if(0===this.f.length){var c;if(c=!this.h&&this.a)if(c=this.a,6>c.b.length)c=!1;else{var d=Date.now()-100,e=c.b.length-3;if(c.b[e+2]<d)c=!1;else{for(var f=e-3;0<f&&c.b[f+2]>d;)f-=3;var d=c.b[e+2]-c.b[f+2],g=c.b[e]-c.b[f],e=c.b[e+1]-c.b[f+1];c.c=Math.atan2(e,g);c.a=Math.sqrt(g*g+e*e)/d;c=.05<c.a}}c?(c=(.05-this.a.a)/-.005,e=this.a.c,f=a.qa(),this.g=ag(this.a,f),b.oa(this.g),f=ug(b,f),b=b.Ba([f[0]-c*Math.cos(e),f[1]-c*Math.sin(e)]),b=a.a.center(b),a.xa(b)):b.render();
	zc(a,-1);return!1}this.c=null;return!0}function rg(a){if(0<this.f.length&&this.i(a)){var b=a.map,c=b.U();this.c=null;this.v||zc(c,1);this.g&&Qa(b.D,this.g)&&(c.xa(a.frameState.viewState.center),this.g=null);this.a&&(a=this.a,a.b.length=0,a.c=0,a.a=0);this.h=1<this.f.length;return!0}return!1}qg.prototype.B=zb;function vg(a){a=a?a:{};ng.call(this,{handleDownEvent:wg,handleDragEvent:xg,handleUpEvent:yg});this.c=a.condition?a.condition:hg;this.a=void 0;this.g=void 0!==a.duration?a.duration:250}B(vg,ng);function xg(a){if(mg(a)){var b=a.map,c=b.Ta();a=a.pixel;c=Math.atan2(c[1]/2-a[1],a[0]-c[0]/2);if(void 0!==this.a){a=c-this.a;var d=b.U(),e=d.get(xc);cg(b,d,e-a)}this.a=c}}
	function yg(a){if(!mg(a))return!0;a=a.map;var b=a.U();zc(b,-1);var c=b.get(xc),d=this.g,c=b.constrainRotation(c,0);cg(a,b,c,void 0,d);return!1}function wg(a){return mg(a)&&ig(a)&&this.c(a)?(zc(a.map.U(),1),this.a=void 0,!0):!1}vg.prototype.B=zb;function zg(a){this.f=null;this.a=document.createElement("div");this.a.style.position="absolute";this.a.className="ol-box "+a;this.c=this.g=this.b=null}B(zg,Aa);zg.prototype.R=function(){this.setMap(null)};function Ag(a){var b=a.g,c=a.c;a=a.a.style;a.left=Math.min(b[0],c[0])+"px";a.top=Math.min(b[1],c[1])+"px";a.width=Math.abs(c[0]-b[0])+"px";a.height=Math.abs(c[1]-b[1])+"px"}
	zg.prototype.setMap=function(a){if(this.b){this.b.s.removeChild(this.a);var b=this.a.style;b.left=b.top=b.width=b.height="inherit"}(this.b=a)&&this.b.s.appendChild(this.a)};function Bg(a){var b=a.g,c=a.c,b=[b,[b[0],c[1]],c,[c[0],b[1]]].map(a.b.Ba,a.b);b[4]=b[0].slice();a.f?a.f.ea([b]):a.f=new qc([b])}zg.prototype.S=function(){return this.f};function Cg(a,b,c){T.call(this,a);this.coordinate=b;this.mapBrowserEvent=c}B(Cg,T);function Dg(a){ng.call(this,{handleDownEvent:Eg,handleDragEvent:Fg,handleUpEvent:Gg});a=a?a:{};this.a=new zg(a.className||"ol-dragbox");this.c=null;this.j=a.condition?a.condition:yb;this.i=a.boxEndCondition?a.boxEndCondition:Hg}B(Dg,ng);function Hg(a,b,c){a=c[0]-b[0];b=c[1]-b[1];return 64<=a*a+b*b}
	function Fg(a){if(mg(a)){var b=this.a,c=a.pixel;b.g=this.c;b.c=c;Bg(b);Ag(b);U(this,new Cg("boxdrag",a.coordinate,a))}}Dg.prototype.S=function(){return this.a.S()};Dg.prototype.h=I;function Gg(a){if(!mg(a))return!0;this.a.setMap(null);this.i(a,this.c,a.pixel)&&(this.h(a),U(this,new Cg("boxend",a.coordinate,a)));return!1}
	function Eg(a){if(mg(a)&&ig(a)&&this.j(a)){this.c=a.pixel;this.a.setMap(a.map);var b=this.a,c=this.c;b.g=this.c;b.c=c;Bg(b);Ag(b);U(this,new Cg("boxstart",a.coordinate,a));return!0}return!1};function Ig(a){a=a?a:{};var b=a.condition?a.condition:kg;this.g=void 0!==a.duration?a.duration:200;this.s=void 0!==a.out?a.out:!1;Dg.call(this,{condition:b,className:a.className||"ol-dragzoom"})}B(Ig,Dg);
	Ig.prototype.h=function(){var a=this.aa,b=a.U(),c=a.Ta(),d=this.S().G();if(this.s){var e=b.lc(c),d=[ug(a,sb(d)),ug(a,[d[2],d[3]])],f=jb(void 0),g,h;g=0;for(h=d.length;g<h;++g)eb(f,d[g]);f=1/yc(f,c);d=(e[2]-e[0])/2*(f-1);f=(e[3]-e[1])/2*(f-1);e[0]-=d;e[2]+=d;e[1]-=f;e[3]+=f;d=e}c=b.constrainResolution(yc(d,c));e=b.O();f=b.qa();a.oa(Fc({resolution:e,duration:this.g,easing:Ac}));a.oa(Dc({source:f,duration:this.g,easing:Ac}));b.xa(tb(d));b.set(wc,c)};function Jg(a){bg.call(this,{handleEvent:Kg});a=a||{};this.a=function(a){return jg(a)&&lg(a)};this.c=void 0!==a.condition?a.condition:this.a;this.f=void 0!==a.duration?a.duration:100;this.g=void 0!==a.pixelDelta?a.pixelDelta:128}B(Jg,bg);
	function Kg(a){var b=!1;if("keydown"==a.type){var c=a.originalEvent.keyCode;if(this.c(a)&&(40==c||37==c||39==c||38==c)){var d=a.map,b=d.U(),e=b.O()*this.g,f=0,g=0;40==c?g=-e:37==c?f=-e:39==c?f=e:g=e;c=[f,g];bb(c,b.get(xc));e=this.f;if(f=b.qa())e&&0<e&&d.oa(Dc({source:f,duration:e,easing:Cc})),d=b.a.center([f[0]+c[0],f[1]+c[1]]),b.xa(d);a.preventDefault();b=!0}}return!b};function Lg(a){bg.call(this,{handleEvent:Mg});a=a?a:{};this.c=a.condition?a.condition:lg;this.a=a.delta?a.delta:1;this.f=void 0!==a.duration?a.duration:100}B(Lg,bg);function Mg(a){var b=!1;if("keydown"==a.type||"keypress"==a.type){var c=a.originalEvent.charCode;if(this.c(a)&&(43==c||45==c)){var b=a.map,c=43==c?this.a:-this.a,d=b.U();dg(b,d,c,void 0,this.f);a.preventDefault();b=!0}}return!b};function Ng(a){bg.call(this,{handleEvent:Og});a=a||{};this.a=0;this.i=void 0!==a.duration?a.duration:250;this.j=void 0!==a.useAnchor?a.useAnchor:!0;this.f=null;this.g=this.c=void 0}B(Ng,bg);
	function Og(a){var b=!1;if("wheel"==a.type||"mousewheel"==a.type){var b=a.map,c=a.originalEvent;this.j&&(this.f=a.coordinate);var d;"wheel"==a.type?(d=c.deltaY,le&&c.deltaMode===K.WheelEvent.DOM_DELTA_PIXEL&&(d/=oe),c.deltaMode===K.WheelEvent.DOM_DELTA_LINE&&(d*=40)):"mousewheel"==a.type&&(d=-c.wheelDeltaY,me&&(d/=3));this.a+=d;void 0===this.c&&(this.c=Date.now());d=Math.max(80-(Date.now()-this.c),0);K.clearTimeout(this.g);this.g=K.setTimeout(this.h.bind(this,b),d);a.preventDefault();b=!0}return!b}
	Ng.prototype.h=function(a){var b=ia(this.a,-1,1),c=a.U();dg(a,c,-b,this.f,this.i);this.a=0;this.f=null;this.g=this.c=void 0};function Pg(a){ng.call(this,{handleDownEvent:Qg,handleDragEvent:Rg,handleUpEvent:Sg});a=a||{};this.c=null;this.g=void 0;this.a=!1;this.h=0;this.j=void 0!==a.threshold?a.threshold:.3;this.i=void 0!==a.duration?a.duration:250}B(Pg,ng);
	function Rg(a){var b=0,c=this.f[0],d=this.f[1],c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);void 0!==this.g&&(b=c-this.g,this.h+=b,!this.a&&Math.abs(this.h)>this.j&&(this.a=!0));this.g=c;a=a.map;c=a.a.getBoundingClientRect();d=pg(this.f);d[0]-=c.left;d[1]-=c.top;this.c=a.Ba(d);this.a&&(c=a.U(),d=c.get(xc),a.render(),cg(a,c,d+b,this.c))}
	function Sg(a){if(2>this.f.length){a=a.map;var b=a.U();zc(b,-1);if(this.a){var c=b.get(xc),d=this.c,e=this.i,c=b.constrainRotation(c,0);cg(a,b,c,d,e)}return!1}return!0}function Qg(a){return 2<=this.f.length?(a=a.map,this.c=null,this.g=void 0,this.a=!1,this.h=0,this.v||zc(a.U(),1),a.render(),!0):!1}Pg.prototype.B=zb;function Tg(a){ng.call(this,{handleDownEvent:Ug,handleDragEvent:Vg,handleUpEvent:Wg});a=a?a:{};this.c=null;this.h=void 0!==a.duration?a.duration:400;this.a=void 0;this.g=1}B(Tg,ng);function Vg(a){var b=1,c=this.f[0],d=this.f[1],e=c.clientX-d.clientX,c=c.clientY-d.clientY,e=Math.sqrt(e*e+c*c);void 0!==this.a&&(b=this.a/e);this.a=e;1!=b&&(this.g=b);a=a.map;var e=a.U(),c=e.O(),d=a.a.getBoundingClientRect(),f=pg(this.f);f[0]-=d.left;f[1]-=d.top;this.c=a.Ba(f);a.render();eg(a,e,c*b,this.c)}
	function Wg(a){if(2>this.f.length){a=a.map;var b=a.U();zc(b,-1);var c=b.O(),d=this.c,e=this.h,c=b.constrainResolution(c,0,this.g-1);eg(a,b,c,d,e);return!1}return!0}function Ug(a){return 2<=this.f.length?(a=a.map,this.c=null,this.a=void 0,this.g=1,this.v||zc(a.U(),1),a.render(),!0):!1}Tg.prototype.B=zb;function Xg(a){var b=a||{};a=pa({},b);delete a.layers;b=b.layers;sf.call(this,a);this.c=[];this.a={};R(this,La("layers"),this.yd,this);b?Array.isArray(b)?b=new cd(b.slice()):L(b instanceof cd,43):b=new cd;this.set("layers",b)}B(Xg,sf);n=Xg.prototype;n.rb=function(){this.gb()&&this.w()};
	n.yd=function(){this.c.forEach(M);this.c.length=0;var a=this.get("layers");this.c.push(R(a,hd,this.xd,this),R(a,id,this.zd,this));for(var b in this.a)this.a[b].forEach(M);qa(this.a);var a=a.a,c,d;b=0;for(c=a.length;b<c;b++)d=a[b],this.a[J(d).toString()]=[R(d,"propertychange",this.rb,this),R(d,"change",this.rb,this)];this.w()};n.xd=function(a){a=a.element;var b=J(a).toString();this.a[b]=[R(a,"propertychange",this.rb,this),R(a,"change",this.rb,this)];this.w()};
	n.zd=function(a){a=J(a.element).toString();this.a[a].forEach(M);delete this.a[a];this.w()};n.Pb=function(a){var b=void 0!==a?a:[],c=b.length;ed(this.get("layers"),function(a){a.Pb(b)});a=tf(this);var d,e;for(d=b.length;c<d;c++)e=b[c],e.opacity*=a.opacity,e.visible=e.visible&&a.visible,e.maxResolution=Math.min(e.maxResolution,a.maxResolution),e.minResolution=Math.max(e.minResolution,a.minResolution),void 0!==a.extent&&(e.extent=void 0!==e.extent?vb(e.extent,a.extent):a.extent);return b};n.Sb=function(){return"ready"};function Yg(a){Eb.call(this,{code:a,units:"m",extent:Zg,global:!0,worldExtent:$g})}B(Yg,Eb);Yg.prototype.getPointResolution=function(a,b){return a/ja(b[1]/6378137)};var ah=6378137*Math.PI,Zg=[-ah,-ah,ah,ah],$g=[-180,-85,180,85],bh="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(a){return new Yg(a)});
	function ch(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c)b[e]=6378137*Math.PI*a[e]/180,b[e+1]=6378137*Math.log(Math.tan(Math.PI*(a[e+1]+90)/360));return b}function dh(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c)b[e]=180*a[e]/(6378137*Math.PI),b[e+1]=360*Math.atan(Math.exp(a[e+1]/6378137))/Math.PI-90;return b};var eh=new Ab(6378137);function fh(a,b){Eb.call(this,{code:a,units:"degrees",extent:gh,axisOrientation:b,global:!0,metersPerUnit:hh,worldExtent:gh})}B(fh,Eb);fh.prototype.getPointResolution=function(a){return a};
	var gh=[-180,-90,180,90],hh=Math.PI*eh.radius/180,ih=[new fh("CRS:84"),new fh("EPSG:4326","neu"),new fh("urn:ogc:def:crs:EPSG::4326","neu"),new fh("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new fh("urn:ogc:def:crs:OGC:1.3:CRS84"),new fh("urn:ogc:def:crs:OGC:2:84"),new fh("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new fh("urn:x-ogc:def:crs:EPSG:4326","neu")];function W(a){a=a?a:{};var b=pa({},a);delete b.preload;delete b.useInterimTilesOnError;xf.call(this,b);this.set("preload",void 0!==a.preload?a.preload:0);this.set("useInterimTilesOnError",void 0!==a.useInterimTilesOnError?a.useInterimTilesOnError:!0)}B(W,xf);function jh(a){return a.get("useInterimTilesOnError")};var kh=[0,0,0,1],lh=[],mh=[0,0,0,1];function nh(a,b,c,d){0!==b&&(a.translate(c,d),a.rotate(b),a.translate(-c,-d))};function oh(a){this.C=a.opacity;this.K=a.rotateWithView;this.s=a.rotation;this.v=a.scale;this.B=a.snapToPixel};function ph(a){a=a||{};this.h=this.c=this.f=null;this.g=void 0!==a.fill?a.fill:null;this.b=void 0!==a.stroke?a.stroke:null;this.a=a.radius;this.j=[0,0];this.i=this.u=this.l=null;var b=a.atlasManager,c,d=null,e,f=0;this.b&&(e=nd(this.b.a),f=this.b.c,void 0===f&&(f=1),d=this.b.b,pe||(d=null));var g=2*(this.a+f)+1;e={strokeStyle:e,jb:f,size:g,lineDash:d};if(void 0===b)b=Md(g,g),this.c=b.canvas,c=g=this.c.width,this.Oc(e,b,0,0),this.g?this.h=this.c:(b=Md(e.size,e.size),this.h=b.canvas,this.Nc(e,b,0,0));
	else{g=Math.round(g);(d=!this.g)&&(c=this.Nc.bind(this,e));var f=this.b?qh(this.b):"-",h=this.g?rh(this.g):"-";this.f&&f==this.f[1]&&h==this.f[2]&&this.a==this.f[3]||(this.f=["c"+f+h+(void 0!==this.a?this.a.toString():"-"),f,h,this.a]);b=b.add(this.f[0],g,g,this.Oc.bind(this,e),c);this.c=b.image;this.j=[b.offsetX,b.offsetY];c=b.image.width;d?this.h=b.Nd:this.h=this.c}this.l=[g/2,g/2];this.u=[g,g];this.i=[c,c];oh.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,snapToPixel:void 0!==a.snapToPixel?
	a.snapToPixel:!0})}B(ph,oh);n=ph.prototype;n.eb=function(){return this.l};n.ub=function(){return this.h};n.Z=function(){return this.c};n.ib=function(){return 2};n.Ob=function(){return this.i};n.pa=function(){return this.j};n.Ka=function(){return this.u};n.Vb=I;n.load=I;n.bc=I;
	n.Oc=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();b.arc(a.size/2,a.size/2,this.a,0,2*Math.PI,!0);this.g&&(b.fillStyle=qd(this.g.b),b.fill());this.b&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.jb,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};
	n.Nc=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();b.arc(a.size/2,a.size/2,this.a,0,2*Math.PI,!0);b.fillStyle=nd(kh);b.fill();this.b&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.jb,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};function sh(a){a=a||{};this.b=void 0!==a.color?a.color:null;this.a=void 0}function rh(a){void 0===a.a&&(a.a=a.b instanceof CanvasPattern||a.b instanceof CanvasGradient?J(a.b).toString():"f"+(a.b?nd(a.b):"-"));return a.a};function th(){this.a=-1};function uh(){this.a=64;this.b=Array(4);this.g=Array(this.a);this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.f=this.c=0}(function(){function a(){}a.prototype=th.prototype;uh.a=th.prototype;uh.prototype=new a;uh.prototype.constructor=uh;uh.b=function(a,c,d){for(var e=Array(arguments.length-2),f=2;f<arguments.length;f++)e[f-2]=arguments[f];return th.prototype[c].apply(a,e)}})();
	function vh(a,b,c){c||(c=0);var d=Array(16);if("string"==typeof b)for(var e=0;16>e;++e)d[e]=b.charCodeAt(c++)|b.charCodeAt(c++)<<8|b.charCodeAt(c++)<<16|b.charCodeAt(c++)<<24;else for(e=0;16>e;++e)d[e]=b[c++]|b[c++]<<8|b[c++]<<16|b[c++]<<24;b=a.b[0];c=a.b[1];var e=a.b[2],f=a.b[3],g;g=b+(f^c&(e^f))+d[0]+3614090360&4294967295;b=c+(g<<7&4294967295|g>>>25);g=f+(e^b&(c^e))+d[1]+3905402710&4294967295;f=b+(g<<12&4294967295|g>>>20);g=e+(c^f&(b^c))+d[2]+606105819&4294967295;e=f+(g<<17&4294967295|g>>>15);g=
	c+(b^e&(f^b))+d[3]+3250441966&4294967295;c=e+(g<<22&4294967295|g>>>10);g=b+(f^c&(e^f))+d[4]+4118548399&4294967295;b=c+(g<<7&4294967295|g>>>25);g=f+(e^b&(c^e))+d[5]+1200080426&4294967295;f=b+(g<<12&4294967295|g>>>20);g=e+(c^f&(b^c))+d[6]+2821735955&4294967295;e=f+(g<<17&4294967295|g>>>15);g=c+(b^e&(f^b))+d[7]+4249261313&4294967295;c=e+(g<<22&4294967295|g>>>10);g=b+(f^c&(e^f))+d[8]+1770035416&4294967295;b=c+(g<<7&4294967295|g>>>25);g=f+(e^b&(c^e))+d[9]+2336552879&4294967295;f=b+(g<<12&4294967295|g>>>
	20);g=e+(c^f&(b^c))+d[10]+4294925233&4294967295;e=f+(g<<17&4294967295|g>>>15);g=c+(b^e&(f^b))+d[11]+2304563134&4294967295;c=e+(g<<22&4294967295|g>>>10);g=b+(f^c&(e^f))+d[12]+1804603682&4294967295;b=c+(g<<7&4294967295|g>>>25);g=f+(e^b&(c^e))+d[13]+4254626195&4294967295;f=b+(g<<12&4294967295|g>>>20);g=e+(c^f&(b^c))+d[14]+2792965006&4294967295;e=f+(g<<17&4294967295|g>>>15);g=c+(b^e&(f^b))+d[15]+1236535329&4294967295;c=e+(g<<22&4294967295|g>>>10);g=b+(e^f&(c^e))+d[1]+4129170786&4294967295;b=c+(g<<5&4294967295|
	g>>>27);g=f+(c^e&(b^c))+d[6]+3225465664&4294967295;f=b+(g<<9&4294967295|g>>>23);g=e+(b^c&(f^b))+d[11]+643717713&4294967295;e=f+(g<<14&4294967295|g>>>18);g=c+(f^b&(e^f))+d[0]+3921069994&4294967295;c=e+(g<<20&4294967295|g>>>12);g=b+(e^f&(c^e))+d[5]+3593408605&4294967295;b=c+(g<<5&4294967295|g>>>27);g=f+(c^e&(b^c))+d[10]+38016083&4294967295;f=b+(g<<9&4294967295|g>>>23);g=e+(b^c&(f^b))+d[15]+3634488961&4294967295;e=f+(g<<14&4294967295|g>>>18);g=c+(f^b&(e^f))+d[4]+3889429448&4294967295;c=e+(g<<20&4294967295|
	g>>>12);g=b+(e^f&(c^e))+d[9]+568446438&4294967295;b=c+(g<<5&4294967295|g>>>27);g=f+(c^e&(b^c))+d[14]+3275163606&4294967295;f=b+(g<<9&4294967295|g>>>23);g=e+(b^c&(f^b))+d[3]+4107603335&4294967295;e=f+(g<<14&4294967295|g>>>18);g=c+(f^b&(e^f))+d[8]+1163531501&4294967295;c=e+(g<<20&4294967295|g>>>12);g=b+(e^f&(c^e))+d[13]+2850285829&4294967295;b=c+(g<<5&4294967295|g>>>27);g=f+(c^e&(b^c))+d[2]+4243563512&4294967295;f=b+(g<<9&4294967295|g>>>23);g=e+(b^c&(f^b))+d[7]+1735328473&4294967295;e=f+(g<<14&4294967295|
	g>>>18);g=c+(f^b&(e^f))+d[12]+2368359562&4294967295;c=e+(g<<20&4294967295|g>>>12);g=b+(c^e^f)+d[5]+4294588738&4294967295;b=c+(g<<4&4294967295|g>>>28);g=f+(b^c^e)+d[8]+2272392833&4294967295;f=b+(g<<11&4294967295|g>>>21);g=e+(f^b^c)+d[11]+1839030562&4294967295;e=f+(g<<16&4294967295|g>>>16);g=c+(e^f^b)+d[14]+4259657740&4294967295;c=e+(g<<23&4294967295|g>>>9);g=b+(c^e^f)+d[1]+2763975236&4294967295;b=c+(g<<4&4294967295|g>>>28);g=f+(b^c^e)+d[4]+1272893353&4294967295;f=b+(g<<11&4294967295|g>>>21);g=e+(f^
	b^c)+d[7]+4139469664&4294967295;e=f+(g<<16&4294967295|g>>>16);g=c+(e^f^b)+d[10]+3200236656&4294967295;c=e+(g<<23&4294967295|g>>>9);g=b+(c^e^f)+d[13]+681279174&4294967295;b=c+(g<<4&4294967295|g>>>28);g=f+(b^c^e)+d[0]+3936430074&4294967295;f=b+(g<<11&4294967295|g>>>21);g=e+(f^b^c)+d[3]+3572445317&4294967295;e=f+(g<<16&4294967295|g>>>16);g=c+(e^f^b)+d[6]+76029189&4294967295;c=e+(g<<23&4294967295|g>>>9);g=b+(c^e^f)+d[9]+3654602809&4294967295;b=c+(g<<4&4294967295|g>>>28);g=f+(b^c^e)+d[12]+3873151461&4294967295;
	f=b+(g<<11&4294967295|g>>>21);g=e+(f^b^c)+d[15]+530742520&4294967295;e=f+(g<<16&4294967295|g>>>16);g=c+(e^f^b)+d[2]+3299628645&4294967295;c=e+(g<<23&4294967295|g>>>9);g=b+(e^(c|~f))+d[0]+4096336452&4294967295;b=c+(g<<6&4294967295|g>>>26);g=f+(c^(b|~e))+d[7]+1126891415&4294967295;f=b+(g<<10&4294967295|g>>>22);g=e+(b^(f|~c))+d[14]+2878612391&4294967295;e=f+(g<<15&4294967295|g>>>17);g=c+(f^(e|~b))+d[5]+4237533241&4294967295;c=e+(g<<21&4294967295|g>>>11);g=b+(e^(c|~f))+d[12]+1700485571&4294967295;b=c+
	(g<<6&4294967295|g>>>26);g=f+(c^(b|~e))+d[3]+2399980690&4294967295;f=b+(g<<10&4294967295|g>>>22);g=e+(b^(f|~c))+d[10]+4293915773&4294967295;e=f+(g<<15&4294967295|g>>>17);g=c+(f^(e|~b))+d[1]+2240044497&4294967295;c=e+(g<<21&4294967295|g>>>11);g=b+(e^(c|~f))+d[8]+1873313359&4294967295;b=c+(g<<6&4294967295|g>>>26);g=f+(c^(b|~e))+d[15]+4264355552&4294967295;f=b+(g<<10&4294967295|g>>>22);g=e+(b^(f|~c))+d[6]+2734768916&4294967295;e=f+(g<<15&4294967295|g>>>17);g=c+(f^(e|~b))+d[13]+1309151649&4294967295;
	c=e+(g<<21&4294967295|g>>>11);g=b+(e^(c|~f))+d[4]+4149444226&4294967295;b=c+(g<<6&4294967295|g>>>26);g=f+(c^(b|~e))+d[11]+3174756917&4294967295;f=b+(g<<10&4294967295|g>>>22);g=e+(b^(f|~c))+d[2]+718787259&4294967295;e=f+(g<<15&4294967295|g>>>17);g=c+(f^(e|~b))+d[9]+3951481745&4294967295;a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+(e+(g<<21&4294967295|g>>>11))&4294967295;a.b[2]=a.b[2]+e&4294967295;a.b[3]=a.b[3]+f&4294967295}
	function wh(a,b){var c;void 0===c&&(c=b.length);for(var d=c-a.a,e=a.g,f=a.c,g=0;g<c;){if(0==f)for(;g<=d;)vh(a,b,g),g+=a.a;if("string"==typeof b)for(;g<c;){if(e[f++]=b.charCodeAt(g++),f==a.a){vh(a,e);f=0;break}}else for(;g<c;)if(e[f++]=b[g++],f==a.a){vh(a,e);f=0;break}}a.c=f;a.f+=c};function xh(a){a=a||{};this.a=void 0!==a.color?a.color:null;this.f=a.lineCap;this.b=void 0!==a.lineDash?a.lineDash:null;this.g=a.lineJoin;this.h=a.miterLimit;this.c=a.width;this.l=void 0}
	function qh(a){if(void 0===a.l){var b="s"+(a.a?nd(a.a):"-")+","+(void 0!==a.f?a.f.toString():"-")+","+(a.b?a.b.toString():"-")+","+(void 0!==a.g?a.g:"-")+","+(void 0!==a.h?a.h.toString():"-")+","+(void 0!==a.c?a.c.toString():"-"),c=new uh;wh(c,b);var d=Array((56>c.c?c.a:2*c.a)-c.c);d[0]=128;for(b=1;b<d.length-8;++b)d[b]=0;for(var e=8*c.f,b=d.length-8;b<d.length;++b)d[b]=e&255,e/=256;wh(c,d);d=Array(16);for(b=e=0;4>b;++b)for(var f=0;32>f;f+=8)d[e++]=c.b[b]>>>f&255;if(8192>=d.length)c=String.fromCharCode.apply(null,
	d);else for(c="",b=0;b<d.length;b+=8192)c+=String.fromCharCode.apply(null,td(d,b,b+8192));a.l=c}return a.l};function yh(a){a=a||{};this.h=null;this.c=zh;void 0!==a.geometry&&Ah(this,a.geometry);this.g=void 0!==a.fill?a.fill:null;this.l=void 0!==a.image?a.image:null;this.f=void 0!==a.stroke?a.stroke:null;this.a=void 0!==a.text?a.text:null;this.b=a.zIndex}yh.prototype.S=function(){return this.h};yh.prototype.Z=function(){return this.l};function Ah(a,b){"function"===typeof b?a.c=b:"string"===typeof b?a.c=function(a){return a.get(b)}:b?b&&(a.c=function(){return b}):a.c=zh;a.h=b}
	function Bh(a){if("function"!==typeof a){var b;Array.isArray(a)?b=a:(L(a instanceof yh,41),b=[a]);a=function(){return b}}return a}var Ch=null;function Dh(){if(!Ch){var a=new sh({color:"rgba(255,255,255,0.4)"}),b=new xh({color:"#3399CC",width:1.25});Ch=[new yh({image:new ph({fill:a,stroke:b,radius:5}),fill:a,stroke:b})]}return Ch}
	function Eh(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new yh({fill:new sh({color:[255,255,255,.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new yh({stroke:new xh({color:b,width:5})}),new yh({stroke:new xh({color:c,width:3})})];a.MultiLineString=a.LineString;a.Circle=a.Polygon.concat(a.LineString);a.Point=[new yh({image:new ph({radius:6,fill:new sh({color:c}),stroke:new xh({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.LineString,
	a.Point);return a}function zh(a){return a.S()};function Y(a){a=a?a:{};var b=pa({},a);delete b.style;delete b.renderBuffer;delete b.updateWhileAnimating;delete b.updateWhileInteracting;xf.call(this,b);this.a=void 0!==a.renderBuffer?a.renderBuffer:100;this.s=null;this.g=void 0;this.v(a.style);this.i=void 0!==a.updateWhileAnimating?a.updateWhileAnimating:!1;this.j=void 0!==a.updateWhileInteracting?a.updateWhileInteracting:!1}B(Y,xf);Y.prototype.v=function(a){this.s=void 0!==a?a:Dh;this.g=null===a?void 0:Bh(this.s);this.w()};function Fh(){};function Gh(a,b,c,d,e){this.f=a;this.v=b;this.l=c;this.u=d;this.Ga=e;this.g=this.b=this.a=this.ha=this.P=this.N=null;this.aa=this.W=this.K=this.M=this.D=this.B=0;this.ba=!1;this.h=this.ra=0;this.ma=!1;this.Y=0;this.c="";this.Ea=this.na=0;this.va=!1;this.j=this.wa=0;this.ca=this.C=this.i=null;this.s=[];this.Fa=Cf()}B(Gh,Fh);
	function Hh(a,b,c){if(a.g){b=Xb(b,0,c,2,a.u,a.s);c=a.f;var d=a.Fa,e=c.globalAlpha;1!=a.K&&(c.globalAlpha=e*a.K);var f=a.ra;a.ba&&(f+=a.Ga);var g,h;g=0;for(h=b.length;g<h;g+=2){var k=b[g]-a.B,l=b[g+1]-a.D;a.ma&&(k=Math.round(k),l=Math.round(l));if(0!==f||1!=a.h){var m=k+a.B,p=l+a.D;Lf(d,m,p,a.h,a.h,f,-m,-p);c.setTransform.apply(c,d)}c.drawImage(a.g,a.W,a.aa,a.Y,a.M,k,l,a.Y,a.M)}0===f&&1==a.h||c.setTransform(1,0,0,1,0,0);1!=a.K&&(c.globalAlpha=e)}}
	function Ih(a,b,c,d){var e=0;if(a.ca&&""!==a.c){a.i&&Jh(a,a.i);a.C&&Kh(a,a.C);var f=a.ca,g=a.f,h=a.ha;h?(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=f.textAlign&&(h.textAlign=g.textAlign=f.textAlign),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline)):(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline,a.ha={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});b=Xb(b,e,c,d,a.u,a.s);f=a.f;g=a.wa;for(a.va&&(g+=a.Ga);e<c;e+=d){var h=b[e]+
	a.na,k=b[e+1]+a.Ea;if(0!==g||1!=a.j){var l=Lf(a.Fa,h,k,a.j,a.j,g,-h,-k);f.setTransform.apply(f,l)}a.C&&f.strokeText(a.c,h,k);a.i&&f.fillText(a.c,h,k)}0===g&&1==a.j||f.setTransform(1,0,0,1,0,0)}}function Lh(a,b,c,d,e,f){var g=a.f;a=Xb(b,c,d,e,a.u,a.s);g.moveTo(a[0],a[1]);b=a.length;f&&(b-=2);for(c=2;c<b;c+=2)g.lineTo(a[c],a[c+1]);f&&g.closePath();return d}function Mh(a,b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f)c=Lh(a,b,c,d[f],e,!0);return c}n=Gh.prototype;
	n.pc=function(a){if(wb(this.l,a.G())){if(this.a||this.b){this.a&&Jh(this,this.a);this.b&&Kh(this,this.b);var b;b=(b=a.o)?Xb(b,0,b.length,a.A,this.u,this.s):null;var c=b[2]-b[0],d=b[3]-b[1],c=Math.sqrt(c*c+d*d),d=this.f;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);this.a&&d.fill();this.b&&d.stroke()}""!==this.c&&Ih(this,a.o.slice(0,a.A),2,2)}};n.cb=function(a){var b=a.o;a=a.A;this.g&&Hh(this,b,b.length);""!==this.c&&Ih(this,b,b.length,a)};
	n.bb=function(a){var b=a.o;a=a.A;this.g&&Hh(this,b,b.length);""!==this.c&&Ih(this,b,b.length,a)};n.qc=function(a){if(wb(this.l,a.G())){if(this.b){Kh(this,this.b);var b=this.f,c=a.o;b.beginPath();Lh(this,c,0,c.length,a.A,!1);b.stroke()}""!==this.c&&(a=Nh(a),Ih(this,a,2,2))}};
	n.rc=function(a){var b=a.G();if(wb(this.l,b)){if(this.b){Kh(this,this.b);var b=this.f,c=a.o,d=0,e=a.ua,f=a.A;b.beginPath();var g,h;g=0;for(h=e.length;g<h;++g)d=Lh(this,c,d,e[g],f,!1);b.stroke()}""!==this.c&&(a=Oh(a),Ih(this,a,a.length,2))}};n.tc=function(a){if(wb(this.l,a.G())){if(this.b||this.a){this.a&&Jh(this,this.a);this.b&&Kh(this,this.b);var b=this.f;b.beginPath();Mh(this,sc(a),0,a.ja,a.A);this.a&&b.fill();this.b&&b.stroke()}""!==this.c&&(a=tc(a),Ih(this,a,2,2))}};
	n.sc=function(a){if(wb(this.l,a.G())){if(this.b||this.a){this.a&&Jh(this,this.a);this.b&&Kh(this,this.b);var b=this.f,c=Ph(a),d=0,e=a.a,f=a.A,g,h;g=0;for(h=e.length;g<h;++g){var k=e[g];b.beginPath();d=Mh(this,c,d,k,f);this.a&&b.fill();this.b&&b.stroke()}}""!==this.c&&(a=Qh(a),Ih(this,a,a.length,2))}};function Jh(a,b){var c=a.f,d=a.N;d?d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle):(c.fillStyle=b.fillStyle,a.N={fillStyle:b.fillStyle})}
	function Kh(a,b){var c=a.f,d=a.P;d?(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),pe&&!Ra(d.lineDash,b.lineDash)&&c.setLineDash(d.lineDash=b.lineDash),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle)):(c.lineCap=b.lineCap,pe&&c.setLineDash(b.lineDash),c.lineJoin=b.lineJoin,c.lineWidth=
	b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.P={lineCap:b.lineCap,lineDash:b.lineDash,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle})}
	n.La=function(a,b){if(a){var c=a.b;this.a={fillStyle:qd(c?c:kh)}}else this.a=null;if(b){var c=b.a,d=b.f,e=b.b,f=b.g,g=b.c,h=b.h;this.b={lineCap:void 0!==d?d:"round",lineDash:e?e:lh,lineJoin:void 0!==f?f:"round",lineWidth:this.v*(void 0!==g?g:1),miterLimit:void 0!==h?h:10,strokeStyle:nd(c?c:mh)}}else this.b=null};
	n.Ma=function(a){if(a){var b=a.eb(),c=a.Z(1),d=a.pa(),e=a.Ka();this.B=b[0];this.D=b[1];this.M=e[1];this.g=c;this.K=a.C;this.W=d[0];this.aa=d[1];this.ba=a.K;this.ra=a.s;this.h=a.v;this.ma=a.B;this.Y=e[0]}else this.g=null};
	n.Ca=function(a){if(a){var b=a.f;b?(b=b.b,this.i={fillStyle:qd(b?b:kh)}):this.i=null;var c=a.i;if(c){var b=c.a,d=c.f,e=c.b,f=c.g,g=c.c,c=c.h;this.C={lineCap:void 0!==d?d:"round",lineDash:e?e:lh,lineJoin:void 0!==f?f:"round",lineWidth:void 0!==g?g:1,miterLimit:void 0!==c?c:10,strokeStyle:nd(b?b:mh)}}else this.C=null;var b=a.b,d=a.a,e=a.c,f=a.g,g=a.h,c=a.l,h=a.j,k=a.C;a=a.K;this.ca={font:void 0!==b?b:"10px sans-serif",textAlign:void 0!==k?k:"center",textBaseline:void 0!==a?a:"middle"};this.c=void 0!==
	h?h:"";this.na=void 0!==d?this.v*d:0;this.Ea=void 0!==e?this.v*e:0;this.va=void 0!==f?f:!1;this.wa=void 0!==g?g:0;this.j=this.v*(void 0!==c?c:1)}else this.c=""};function Rh(a){Ia.call(this);this.a=a}B(Rh,Ia);Rh.prototype.fa=I;Rh.prototype.Ec=zb;Rh.prototype.l=function(a,b,c){return function(d,e){return Sh(a,b,d,e,function(a){c[d]||(c[d]={});c[d][a.V.toString()]=a})}};function Th(a){var b=a.a;b.gb()&&"ready"==b.Sb()&&a.w()}function Uh(a,b){b.Mc()&&a.postRenderFunctions.push(function(a,b,e){b=J(a).toString();a.Oa(e.viewState.projection,e.usedTiles[b])}.bind(null,b))}function Vh(a,b){if(b){var c,d,e;d=0;for(e=b.length;d<e;++d)c=b[d],a[J(c).toString()]=c}}
	function Wh(a,b){var c=b.D;void 0!==c&&("string"===typeof c?a.logos[c]="":c&&(L("string"==typeof c.href,44),L("string"==typeof c.src,45),a.logos[c.src]=c.href))}function Xh(a,b,c,d){b=J(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.H<a.H&&(a.H=d.H),d.I>a.I&&(a.I=d.I),d.J<a.J&&(a.J=d.J),d.L>a.L&&(a.L=d.L)):a[b][c]=d:(a[b]={},a[b][c]=d)}function Yh(a,b,c){return[b*(Math.round(a[0]/b)+c[0]%2/2),b*(Math.round(a[1]/b)+c[1]%2/2)]}
	function Zh(a,b,c,d,e,f,g,h,k,l){var m=J(b).toString();m in a.wantedTiles||(a.wantedTiles[m]={});var p=a.wantedTiles[m];a=a.tileQueue;var q=c.minZoom,u,w,r,x,D,t;for(t=g;t>=q;--t)for(w=Rc(c,f,t,w),r=c.O(t),x=w.H;x<=w.I;++x)for(D=w.J;D<=w.L;++D)g-t<=h?(u=$h(b,t,x,D,d,e),0==u.T()&&(p[u.getKey()]=!0,u.getKey()in a.a||a.g([u,m,Vc(c,u.V),r])),void 0!==k&&k.call(l,u)):b.Vc(t,x,D,e)};function ai(a){Rh.call(this,a);this.M=Cf()}B(ai,Rh);function bi(a,b,c){var d=b.pixelRatio,e=b.size[0]*d,f=b.size[1]*d,g=b.viewState.rotation,h=xb(c),k=[c[2],c[3]],l=[c[2],c[1]];c=sb(c);Hf(b.coordinateToPixelTransform,h);Hf(b.coordinateToPixelTransform,k);Hf(b.coordinateToPixelTransform,l);Hf(b.coordinateToPixelTransform,c);a.save();nh(a,-g,e/2,f/2);a.beginPath();a.moveTo(h[0]*d,h[1]*d);a.lineTo(k[0]*d,k[1]*d);a.lineTo(l[0]*d,l[1]*d);a.lineTo(c[0]*d,c[1]*d);a.clip();nh(a,g,e/2,f/2)}
	ai.prototype.g=function(a,b,c){ci(this,"precompose",c,a,void 0);var d=this.Z();if(d){var e=b.extent,f=void 0!==e;f&&bi(c,a,e);var e=this.N,g=c.globalAlpha;c.globalAlpha=b.opacity;c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[4]),Math.round(e[5]),Math.round(d.width*e[0]),Math.round(d.height*e[3]));c.globalAlpha=g;f&&c.restore()}ci(this,"postcompose",c,a,void 0)};
	function ci(a,b,c,d,e){var f=a.a;if(Ha(f,b)){var g=d.size[0]*d.pixelRatio,h=d.size[1]*d.pixelRatio,k=d.viewState.rotation;nh(c,-k,g/2,h/2);a=void 0!==e?e:di(a,d,0);U(f,new uf(b,new Gh(c,d.pixelRatio,d.extent,a,d.viewState.rotation),d,c,null));nh(c,k,g/2,h/2)}}function di(a,b,c){var d=b.viewState,e=b.pixelRatio,f=e/d.resolution;return Lf(a.M,e*b.size[0]/2,e*b.size[1]/2,f,-f,-d.rotation,-d.center[0]+c,-d.center[1])};function ei(){};var fi=["Polygon","LineString","Image","Text"];function gi(a,b,c,d){this.ra=a;this.P=b;this.overlaps=d;this.g=null;this.h=0;this.resolution=c;this.ca=this.Y=null;this.a=[];this.coordinates=[];this.W=Cf();this.b=[];this.ha=[];this.aa=Cf();this.ba=Cf()}B(gi,Fh);
	function hi(a,b,c,d,e,f){var g=a.coordinates.length,h=a.Nb(),k=[b[c],b[c+1]],l=[NaN,NaN],m=!0,p,q,u;for(p=c+e;p<d;p+=e){l[0]=b[p];l[1]=b[p+1];u=h[1];var w=h[2],r=h[3],x=l[0],D=l[1],t=0;x<h[0]?t|=16:x>w&&(t|=4);D<u?t|=8:D>r&&(t|=2);0===t&&(t=1);u=t;u!==q?(m&&(a.coordinates[g++]=k[0],a.coordinates[g++]=k[1]),a.coordinates[g++]=l[0],a.coordinates[g++]=l[1],m=!1):1===u?(a.coordinates[g++]=l[0],a.coordinates[g++]=l[1],m=!1):m=!0;k[0]=l[0];k[1]=l[1];q=u}p===c+e&&(a.coordinates[g++]=k[0],a.coordinates[g++]=
	k[1]);f&&(a.coordinates[g++]=b[c],a.coordinates[g++]=b[c+1]);return g}function ii(a,b){a.Y=[0,b,0];a.a.push(a.Y);a.ca=[0,b,0];a.b.push(a.ca)}
	function ji(a,b,c,d,e,f,g,h,k){var l;Ra(d,a.W)?l=a.ha:(l=Xb(a.coordinates,0,a.coordinates.length,2,d,a.ha),Gf(a.W,d));d=!sa(f);var m=0,p=g.length,q,u,w=a.aa,r=a.ba,x,D,t,z,C=0,E=0;for(a=a.a!=g||a.overlaps?0:200;m<p;){var v=g[m],H,G,A,F;switch(v[0]){case 0:q=v[1];d&&f[J(q).toString()]||!q.S()?m=v[2]:void 0===k||wb(k,q.S().G())?++m:m=v[2]+1;break;case 1:C>a&&(b.fill(),C=0);E>a&&(b.stroke(),E=0);C||E||b.beginPath();++m;break;case 2:q=v[1];u=l[q];v=l[q+1];t=l[q+2]-u;q=l[q+3]-v;q=Math.sqrt(t*t+q*q);b.moveTo(u+
	q,v);b.arc(u,v,q,0,2*Math.PI,!0);++m;break;case 3:b.closePath();++m;break;case 4:q=v[1];u=v[2];H=v[3];G=v[4]*c;A=v[5]*c;var Q=v[6],N=v[7],O=v[8],S=v[9];F=v[10];t=v[11];z=v[12];var X=v[13],P=v[14];for(F&&(t+=e);q<u;q+=2){v=l[q]-G;F=l[q+1]-A;X&&(v=Math.round(v),F=Math.round(F));if(1!=z||0!==t){var Ba=v+G,Nb=F+A;Lf(w,Ba,Nb,z,z,t,-Ba,-Nb);b.transform.apply(b,w)}Ba=b.globalAlpha;1!=N&&(b.globalAlpha=Ba*N);var Nb=P+O>H.width?H.width-O:P,Ca=Q+S>H.height?H.height-S:Q;b.drawImage(H,O,S,Nb,Ca,v,F,Nb*c,Ca*c);
	1!=N&&(b.globalAlpha=Ba);if(1!=z||0!==t)Mf(Gf(r,w)),b.transform.apply(b,r)}++m;break;case 5:q=v[1];u=v[2];A=v[3];Q=v[4]*c;N=v[5]*c;t=v[6];z=v[7]*c;H=v[8];G=v[9];for((F=v[10])&&(t+=e);q<u;q+=2){v=l[q]+Q;F=l[q+1]+N;if(1!=z||0!==t)Lf(w,v,F,z,z,t,-v,-F),b.transform.apply(b,w);O=A.split("\n");S=O.length;1<S?(X=Math.round(1.5*b.measureText("M").width),F-=(S-1)/2*X):X=0;for(P=0;P<S;P++)Ba=O[P],G&&b.strokeText(Ba,v,F),H&&b.fillText(Ba,v,F),F+=X;if(1!=z||0!==t)Mf(Gf(r,w)),b.transform.apply(b,r)}++m;break;
	case 6:if(void 0!==h&&(q=v[1],q=h(q)))return q;++m;break;case 7:a?C++:b.fill();++m;break;case 8:q=v[1];u=v[2];v=l[q];F=l[q+1];t=v+.5|0;z=F+.5|0;if(t!==x||z!==D)b.moveTo(v,F),x=t,D=z;for(q+=2;q<u;q+=2)if(v=l[q],F=l[q+1],t=v+.5|0,z=F+.5|0,q==u-2||t!==x||z!==D)b.lineTo(v,F),x=t,D=z;++m;break;case 9:C&&(b.fill(),C=0);b.fillStyle=v[1];++m;break;case 10:x=void 0!==v[7]?v[7]:!0;D=v[2];E&&(b.stroke(),E=0);b.strokeStyle=v[1];b.lineWidth=x?D*c:D;b.lineCap=v[3];b.lineJoin=v[4];b.miterLimit=v[5];pe&&b.setLineDash(v[6]);
	D=x=NaN;++m;break;case 11:b.font=v[1];b.textAlign=v[2];b.textBaseline=v[3];++m;break;case 12:a?E++:b.stroke();++m;break;default:++m}}C&&b.fill();E&&b.stroke()}gi.prototype.f=function(a,b,c,d,e){ji(this,a,b,c,d,e,this.a,void 0,void 0)};function ki(a){var b=a.b;b.reverse();var c,d=b.length,e,f,g=-1;for(c=0;c<d;++c)if(e=b[c],f=e[0],6==f)g=c;else if(0==f){e[2]=c;e=a.b;for(f=c;g<f;){var h=e[g];e[g]=e[f];e[f]=h;++g;--f}g=-1}}
	function li(a,b){a.Y[2]=a.a.length;a.Y=null;a.ca[2]=a.b.length;a.ca=null;var c=[6,b];a.a.push(c);a.b.push(c)}gi.prototype.tb=I;gi.prototype.Nb=function(){return this.P};function mi(a,b,c,d){gi.call(this,a,b,c,d);this.j=this.N=null;this.M=this.D=this.B=this.u=this.v=this.s=this.K=this.C=this.i=this.l=this.c=void 0}B(mi,gi);
	mi.prototype.cb=function(a,b){if(this.j){ii(this,b);var c=a.o,d=this.coordinates.length,c=hi(this,c,0,c.length,a.A,!1);this.a.push([4,d,c,this.j,this.c,this.l,this.i,this.C,this.K,this.s,this.v,this.u,this.B,this.D,this.M]);this.b.push([4,d,c,this.N,this.c,this.l,this.i,this.C,this.K,this.s,this.v,this.u,this.B,this.D,this.M]);li(this,b)}};
	mi.prototype.bb=function(a,b){if(this.j){ii(this,b);var c=a.o,d=this.coordinates.length,c=hi(this,c,0,c.length,a.A,!1);this.a.push([4,d,c,this.j,this.c,this.l,this.i,this.C,this.K,this.s,this.v,this.u,this.B,this.D,this.M]);this.b.push([4,d,c,this.N,this.c,this.l,this.i,this.C,this.K,this.s,this.v,this.u,this.B,this.D,this.M]);li(this,b)}};mi.prototype.tb=function(){ki(this);this.l=this.c=void 0;this.j=this.N=null;this.M=this.D=this.u=this.v=this.s=this.K=this.C=this.B=this.i=void 0};
	mi.prototype.Ma=function(a){var b=a.eb(),c=a.Ka(),d=a.ub(1),e=a.Z(1),f=a.pa();this.c=b[0];this.l=b[1];this.N=d;this.j=e;this.i=c[1];this.C=a.C;this.K=f[0];this.s=f[1];this.v=a.K;this.u=a.s;this.B=a.v;this.D=a.B;this.M=c[0]};function ni(a,b,c,d){gi.call(this,a,b,c,d);this.c={ab:void 0,Wa:void 0,Xa:null,Ya:void 0,Za:void 0,$a:void 0,Ub:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}B(ni,gi);
	function oi(a,b,c,d,e){var f=a.coordinates.length;b=hi(a,b,c,d,e,!1);f=[8,f,b];a.a.push(f);a.b.push(f);return d}n=ni.prototype;n.Nb=function(){this.g||(this.g=gb(this.P),0<this.h&&fb(this.g,this.resolution*(this.h+1)/2,this.g));return this.g};
	function pi(a){var b=a.c,c=b.strokeStyle,d=b.lineCap,e=b.lineDash,f=b.lineJoin,g=b.lineWidth,h=b.miterLimit;b.ab==c&&b.Wa==d&&Ra(b.Xa,e)&&b.Ya==f&&b.Za==g&&b.$a==h||(b.Ub!=a.coordinates.length&&(a.a.push([12]),b.Ub=a.coordinates.length),a.a.push([10,c,g,d,f,h,e],[1]),b.ab=c,b.Wa=d,b.Xa=e,b.Ya=f,b.Za=g,b.$a=h)}
	n.qc=function(a,b){var c=this.c,d=c.lineWidth;void 0!==c.strokeStyle&&void 0!==d&&(pi(this),ii(this,b),this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]),c=a.o,oi(this,c,0,c.length,a.A),this.b.push([12]),li(this,b))};
	n.rc=function(a,b){var c=this.c,d=c.lineWidth;if(void 0!==c.strokeStyle&&void 0!==d){pi(this);ii(this,b);this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash],[1]);var c=a.ua,d=a.o,e=a.A,f=0,g,h;g=0;for(h=c.length;g<h;++g)f=oi(this,d,f,c[g],e);this.b.push([12]);li(this,b)}};n.tb=function(){this.c.Ub!=this.coordinates.length&&this.a.push([12]);ki(this);this.c=null};
	n.La=function(a,b){var c=b.a;this.c.strokeStyle=nd(c?c:mh);c=b.f;this.c.lineCap=void 0!==c?c:"round";c=b.b;this.c.lineDash=c?c:lh;c=b.g;this.c.lineJoin=void 0!==c?c:"round";c=b.c;this.c.lineWidth=void 0!==c?c:1;c=b.h;this.c.miterLimit=void 0!==c?c:10;this.c.lineWidth>this.h&&(this.h=this.c.lineWidth,this.g=null)};
	function qi(a,b,c,d){gi.call(this,a,b,c,d);this.c={oc:void 0,ab:void 0,Wa:void 0,Xa:null,Ya:void 0,Za:void 0,$a:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}B(qi,gi);
	function ri(a,b,c,d,e){var f=a.c,g=void 0!==f.fillStyle,f=void 0!=f.strokeStyle,h=d.length;if(!g&&!f)return d[h-1];var k=[1];a.a.push(k);a.b.push(k);for(k=0;k<h;++k){var l=d[k],m=a.coordinates.length;c=hi(a,b,c,l,e,!0);c=[8,m,c];a.a.push(c);a.b.push(c);f&&(c=[3],a.a.push(c),a.b.push(c));c=l}b=[7];a.b.push(b);g&&a.a.push(b);f&&(g=[12],a.a.push(g),a.b.push(g));return c}n=qi.prototype;
	n.pc=function(a,b){var c=this.c,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){si(this);ii(this,b);this.b.push([9,nd(kh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var e=a.o,d=this.coordinates.length;hi(this,e,0,e.length,a.A,!1);e=[1];d=[2,d];this.a.push(e,d);this.b.push(e,d);d=[7];this.b.push(d);void 0!==c.fillStyle&&this.a.push(d);void 0!==c.strokeStyle&&(c=[12],this.a.push(c),this.b.push(c));li(this,b)}};
	n.tc=function(a,b){var c=this.c,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d)si(this),ii(this,b),this.b.push([9,nd(kh)]),void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]),c=a.ja,d=sc(a),ri(this,d,0,c,a.A),li(this,b)};
	n.sc=function(a,b){var c=this.c,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){si(this);ii(this,b);this.b.push([9,nd(kh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash]);var c=a.a,d=Ph(a),e=a.A,f=0,g,h;g=0;for(h=c.length;g<h;++g)f=ri(this,d,f,c[g],e);li(this,b)}};n.tb=function(){ki(this);this.c=null;var a=this.ra;if(0!==a){var b=this.coordinates,c,d;c=0;for(d=b.length;c<d;++c)b[c]=a*Math.round(b[c]/a)}};
	n.Nb=function(){this.g||(this.g=gb(this.P),0<this.h&&fb(this.g,this.resolution*(this.h+1)/2,this.g));return this.g};
	n.La=function(a,b){var c=this.c;if(a){var d=a.b;c.fillStyle=qd(d?d:kh)}else c.fillStyle=void 0;b?(d=b.a,c.strokeStyle=nd(d?d:mh),d=b.f,c.lineCap=void 0!==d?d:"round",d=b.b,c.lineDash=d?d.slice():lh,d=b.g,c.lineJoin=void 0!==d?d:"round",d=b.c,c.lineWidth=void 0!==d?d:1,d=b.h,c.miterLimit=void 0!==d?d:10,c.lineWidth>this.h&&(this.h=c.lineWidth,this.g=null)):(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=void 0)};
	function si(a){var b=a.c,c=b.fillStyle,d=b.strokeStyle,e=b.lineCap,f=b.lineDash,g=b.lineJoin,h=b.lineWidth,k=b.miterLimit;void 0!==c&&b.oc!=c&&(a.a.push([9,c]),b.oc=b.fillStyle);void 0===d||b.ab==d&&b.Wa==e&&b.Xa==f&&b.Ya==g&&b.Za==h&&b.$a==k||(a.a.push([10,d,h,e,g,k,f]),b.ab=d,b.Wa=e,b.Xa=f,b.Ya=g,b.Za=h,b.$a=k)}function ti(a,b,c,d){gi.call(this,a,b,c,d);this.M=this.D=this.B=null;this.j="";this.K=this.C=0;this.s=void 0;this.u=this.v=0;this.i=this.l=this.c=null}B(ti,gi);
	function ui(a,b,c,d,e){if(""!==a.j&&a.i&&(a.c||a.l)){if(a.c){var f=a.c,g=a.B;if(!g||g.fillStyle!=f.fillStyle){var h=[9,f.fillStyle];a.a.push(h);a.b.push(h);g?g.fillStyle=f.fillStyle:a.B={fillStyle:f.fillStyle}}}a.l&&(f=a.l,g=a.D,g&&g.lineCap==f.lineCap&&g.lineDash==f.lineDash&&g.lineJoin==f.lineJoin&&g.lineWidth==f.lineWidth&&g.miterLimit==f.miterLimit&&g.strokeStyle==f.strokeStyle||(h=[10,f.strokeStyle,f.lineWidth,f.lineCap,f.lineJoin,f.miterLimit,f.lineDash,!1],a.a.push(h),a.b.push(h),g?(g.lineCap=
	f.lineCap,g.lineDash=f.lineDash,g.lineJoin=f.lineJoin,g.lineWidth=f.lineWidth,g.miterLimit=f.miterLimit,g.strokeStyle=f.strokeStyle):a.D={lineCap:f.lineCap,lineDash:f.lineDash,lineJoin:f.lineJoin,lineWidth:f.lineWidth,miterLimit:f.miterLimit,strokeStyle:f.strokeStyle}));f=a.i;g=a.M;g&&g.font==f.font&&g.textAlign==f.textAlign&&g.textBaseline==f.textBaseline||(h=[11,f.font,f.textAlign,f.textBaseline],a.a.push(h),a.b.push(h),g?(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline):a.M=
	{font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});ii(a,e);f=a.coordinates.length;b=hi(a,b,0,c,d,!1);b=[5,f,b,a.j,a.C,a.K,a.v,a.u,!!a.c,!!a.l,a.s];a.a.push(b);a.b.push(b);li(a,e)}}
	ti.prototype.Ca=function(a){if(a){var b=a.f;b?(b=b.b,b=qd(b?b:kh),this.c?this.c.fillStyle=b:this.c={fillStyle:b}):this.c=null;var c=a.i;if(c){var b=c.a,d=c.f,e=c.b,f=c.g,g=c.c,c=c.h,d=void 0!==d?d:"round",e=e?e.slice():lh,f=void 0!==f?f:"round",g=void 0!==g?g:1,c=void 0!==c?c:10,b=nd(b?b:mh);if(this.l){var h=this.l;h.lineCap=d;h.lineDash=e;h.lineJoin=f;h.lineWidth=g;h.miterLimit=c;h.strokeStyle=b}else this.l={lineCap:d,lineDash:e,lineJoin:f,lineWidth:g,miterLimit:c,strokeStyle:b}}else this.l=null;
	var k=a.b,b=a.a,d=a.c,e=a.g,g=a.h,c=a.l,f=a.j,h=a.C,l=a.K;a=void 0!==k?k:"10px sans-serif";h=void 0!==h?h:"center";l=void 0!==l?l:"middle";this.i?(k=this.i,k.font=a,k.textAlign=h,k.textBaseline=l):this.i={font:a,textAlign:h,textBaseline:l};this.j=void 0!==f?f:"";this.C=void 0!==b?b:0;this.K=void 0!==d?d:0;this.s=void 0!==e?e:!1;this.v=void 0!==g?g:0;this.u=void 0!==c?c:1}else this.j=""};function vi(a,b,c,d,e){this.K=a;this.g=b;this.j=d;this.C=c;this.h=e;this.a={};this.l=Md(1,1);this.i=Cf()}B(vi,ei);
	function wi(a){for(var b in a.a){var c=a.a[b],d;for(d in c)c[d].tb()}}vi.prototype.fa=function(a,b,c,d,e){var f=Lf(this.i,.5,.5,1/b,-1/b,-c,-a[0],-a[1]),g=this.l;g.clearRect(0,0,1,1);var h;void 0!==this.h&&(h=db(),eb(h,a),fb(h,b*this.h,h));return xi(this,g,f,c,d,function(a){if(0<g.getImageData(0,0,1,1).data[3]){if(a=e(a))return a;g.clearRect(0,0,1,1)}},h)};
	vi.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0",d=this.a[c];void 0===d&&(d={},this.a[c]=d);c=d[b];void 0===c&&(c=new yi[b](this.K,this.g,this.C,this.j),d[b]=c);return c};vi.prototype.c=function(){return sa(this.a)};
	vi.prototype.f=function(a,b,c,d,e,f){var g=Object.keys(this.a).map(Number);g.sort(Ma);var h=this.g,k=h[0],l=h[1],m=h[2],h=h[3],k=[k,l,k,h,m,h,m,l];Xb(k,0,8,2,c,k);a.save();a.beginPath();a.moveTo(k[0],k[1]);a.lineTo(k[2],k[3]);a.lineTo(k[4],k[5]);a.lineTo(k[6],k[7]);a.clip();f=f?f:fi;for(var p,q,k=0,l=g.length;k<l;++k)for(p=this.a[g[k].toString()],m=0,h=f.length;m<h;++m)q=p[f[m]],void 0!==q&&q.f(a,b,c,d,e);a.restore()};
	function xi(a,b,c,d,e,f,g){var h=Object.keys(a.a).map(Number);h.sort(function(a,b){return b-a});var k,l,m,p,q;k=0;for(l=h.length;k<l;++k)for(p=a.a[h[k].toString()],m=fi.length-1;0<=m;--m)if(q=p[fi[m]],void 0!==q&&(q=ji(q,b,1,c,d,e,q.b,f,g)))return q}var yi={Image:mi,LineString:ni,Polygon:qi,Text:ti};function zi(a,b){return J(a)-J(b)}function Ai(a,b){var c=.5*a/b;return c*c}function Bi(a,b,c,d,e,f){var g=!1,h,k;if(h=c.Z())k=h.ib(),2==k||3==k?h.bc(e,f):(0==k&&h.load(),h.Vb(e,f),g=!0);if(e=(0,c.c)(b))d=e.Rb(d),(0,Ci[d.$()])(a,d,c,b);return g}
	var Ci={Point:function(a,b,c,d){var e=c.Z();if(e){if(2!=e.ib())return;var f=a.b(c.b,"Image");f.Ma(e);f.cb(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),ui(a,b.o,2,2,d)},LineString:function(a,b,c,d){var e=c.f;if(e){var f=a.b(c.b,"LineString");f.La(null,e);f.qc(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),ui(a,Nh(b),2,2,d)},Polygon:function(a,b,c,d){var e=c.g,f=c.f;if(e||f){var g=a.b(c.b,"Polygon");g.La(e,f);g.tc(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),ui(a,tc(b),2,2,d)},MultiPoint:function(a,b,c,d){var e=c.Z();
	if(e){if(2!=e.ib())return;var f=a.b(c.b,"Image");f.Ma(e);f.bb(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),c=b.o,ui(a,c,c.length,b.A,d)},MultiLineString:function(a,b,c,d){var e=c.f;if(e){var f=a.b(c.b,"LineString");f.La(null,e);f.rc(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),b=Oh(b),ui(a,b,b.length,2,d)},MultiPolygon:function(a,b,c,d){var e=c.g,f=c.f;if(f||e){var g=a.b(c.b,"Polygon");g.La(e,f);g.sc(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),b=Qh(b),ui(a,b,b.length,2,d)},GeometryCollection:function(a,b,c,d){b=
	b.a;var e,f;e=0;for(f=b.length;e<f;++e)(0,Ci[b[e].$()])(a,b[e],c,d)},Circle:function(a,b,c,d){var e=c.g,f=c.f;if(e||f){var g=a.b(c.b,"Polygon");g.La(e,f);g.pc(b,d)}if(e=c.a)a=a.b(c.b,"Text"),a.Ca(e),ui(a,b.o.slice(0,b.A),2,2,d)}};var Di,Ei=K,Fi=-1<Ei.navigator.userAgent.indexOf("OPR"),Gi=-1<Ei.navigator.userAgent.indexOf("Edge");Di=!(!Ei.navigator.userAgent.match("CriOS")&&null!==Ei.chrome&&void 0!==Ei.chrome&&"Google Inc."===Ei.navigator.vendor&&0==Fi&&0==Gi);function Hi(a,b,c,d){a=c-a;b=d-b;var e=Math.sqrt(a*a+b*b);return[Math.round(c+a/e),Math.round(d+b/e)]}
	function Ii(a,b,c,d,e,f,g,h,k,l,m){var p=Md(Math.round(c*a),Math.round(c*b));if(0===k.length)return p.canvas;p.scale(c,c);var q=db();k.forEach(function(a){mb(q,a.extent)});var u=Md(Math.round(c*qb(q)/d),Math.round(c*rb(q)/d)),w=c/d;k.forEach(function(a){u.drawImage(a.image,l,l,a.image.width-2*l,a.image.height-2*l,(a.extent[0]-q[0])*w,-(a.extent[3]-q[3])*w,qb(a.extent)*w,rb(a.extent)*w)});var r=xb(g);h.f.forEach(function(a){var b=a.source,e=a.target,g=b[1][0],h=b[1][1],k=b[2][0],l=b[2][1];a=(e[0][0]-
	r[0])/f;var m=-(e[0][1]-r[1])/f,w=(e[1][0]-r[0])/f,A=-(e[1][1]-r[1])/f,F=(e[2][0]-r[0])/f,Q=-(e[2][1]-r[1])/f,e=b[0][0],b=b[0][1],g=g-e,h=h-b,k=k-e,l=l-b;a:{g=[[g,h,0,0,w-a],[k,l,0,0,F-a],[0,0,g,h,A-m],[0,0,k,l,Q-m]];h=g.length;for(k=0;k<h;k++){for(var l=k,N=Math.abs(g[k][k]),O=k+1;O<h;O++){var S=Math.abs(g[O][k]);S>N&&(N=S,l=O)}if(0===N){g=null;break a}N=g[l];g[l]=g[k];g[k]=N;for(l=k+1;l<h;l++)for(N=-g[l][k]/g[k][k],O=k;O<h+1;O++)g[l][O]=k==O?0:g[l][O]+N*g[k][O]}k=Array(h);for(l=h-1;0<=l;l--)for(k[l]=
	g[l][h]/g[l][l],N=l-1;0<=N;N--)g[N][h]-=g[N][l]*k[l];g=k}g&&(p.save(),p.beginPath(),Di?(k=(a+w+F)/3,l=(m+A+Q)/3,h=Hi(k,l,a,m),w=Hi(k,l,w,A),F=Hi(k,l,F,Q),p.moveTo(w[0],w[1]),p.lineTo(h[0],h[1]),p.lineTo(F[0],F[1])):(p.moveTo(w,A),p.lineTo(a,m),p.lineTo(F,Q)),p.clip(),p.transform(g[0],g[2],g[1],g[3],a,m),p.translate(q[0]-e,q[3]-b),p.scale(d/c,-d/c),p.drawImage(u.canvas,0,0),p.restore())});m&&(p.save(),p.strokeStyle="black",p.lineWidth=1,h.f.forEach(function(a){var b=a.target;a=(b[0][0]-r[0])/f;var c=
	-(b[0][1]-r[1])/f,d=(b[1][0]-r[0])/f,e=-(b[1][1]-r[1])/f,g=(b[2][0]-r[0])/f,b=-(b[2][1]-r[1])/f;p.beginPath();p.moveTo(d,e);p.lineTo(a,c);p.lineTo(g,b);p.closePath();p.stroke()}),p.restore());return p.canvas};function Ji(a,b,c,d,e){this.c=a;this.g=b;var f={},g=Ub(this.g,this.c);this.a=function(a){var b=a[0]+"/"+a[1];f[b]||(f[b]=g(a));return f[b]};this.h=d;this.C=e*e;this.f=[];this.i=!1;this.j=this.c.b&&!!d&&!!this.c.G()&&qb(d)==qb(this.c.G());this.b=this.c.G()?qb(this.c.G()):null;this.l=this.g.G()?qb(this.g.G()):null;a=xb(c);b=[c[2],c[3]];d=[c[2],c[1]];c=sb(c);e=this.a(a);var h=this.a(b),k=this.a(d),l=this.a(c);Ki(this,a,b,d,c,e,h,k,l,10);if(this.i){var m=Infinity;this.f.forEach(function(a){m=Math.min(m,
	a.source[0][0],a.source[1][0],a.source[2][0])});this.f.forEach(function(a){if(Math.max(a.source[0][0],a.source[1][0],a.source[2][0])-m>this.b/2){var b=[[a.source[0][0],a.source[0][1]],[a.source[1][0],a.source[1][1]],[a.source[2][0],a.source[2][1]]];b[0][0]-m>this.b/2&&(b[0][0]-=this.b);b[1][0]-m>this.b/2&&(b[1][0]-=this.b);b[2][0]-m>this.b/2&&(b[2][0]-=this.b);Math.max(b[0][0],b[1][0],b[2][0])-Math.min(b[0][0],b[1][0],b[2][0])<this.b/2&&(a.source=b)}},this)}f={}}
	function Ki(a,b,c,d,e,f,g,h,k,l){var m=cb([f,g,h,k]),p=a.b?qb(m)/a.b:null,q=a.b,u=a.c.b&&.5<p&&1>p,w=!1;if(0<l){if(a.g.c&&a.l)var r=cb([b,c,d,e]),w=w|.25<qb(r)/a.l;!u&&a.c.c&&p&&(w|=.25<p)}if(w||!a.h||wb(m,a.h)){if(!(w||isFinite(f[0])&&isFinite(f[1])&&isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(k[0])&&isFinite(k[1])))if(0<l)w=!0;else return;if(0<l&&(w||(m=a.a([(b[0]+d[0])/2,(b[1]+d[1])/2]),q=u?(la(f[0],q)+la(h[0],q))/2-la(m[0],q):(f[0]+h[0])/2-m[0],m=(f[1]+h[1])/2-m[1],
	w=q*q+m*m>a.C),w)){Math.abs(b[0]-d[0])<=Math.abs(b[1]-d[1])?(u=[(c[0]+d[0])/2,(c[1]+d[1])/2],q=a.a(u),m=[(e[0]+b[0])/2,(e[1]+b[1])/2],p=a.a(m),Ki(a,b,c,u,m,f,g,q,p,l-1),Ki(a,m,u,d,e,p,q,h,k,l-1)):(u=[(b[0]+c[0])/2,(b[1]+c[1])/2],q=a.a(u),m=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=a.a(m),Ki(a,b,u,m,e,f,q,p,k,l-1),Ki(a,u,c,d,m,q,g,h,p,l-1));return}if(u){if(!a.j)return;a.i=!0}a.f.push({source:[f,h,k],target:[b,d,e]});a.f.push({source:[f,g,h],target:[b,c,d]})}}
	function Li(a){var b=db();a.f.forEach(function(a){a=a.source;eb(b,a[0]);eb(b,a[1]);eb(b,a[2])});return b};function Mi(a){ai.call(this,a);this.f=Md();this.c=null;this.j=db();this.s=[0,0,0];this.h=Cf()}B(Mi,ai);
	Mi.prototype.g=function(a,b,c){var d=di(this,a,0);ci(this,"precompose",c,a,d);var e=a.pixelRatio,f=a.viewState,g=f.center,h=f.projection,k=f.rotation,l=a.size,m=Math.round(e*l[0]/2),l=Math.round(e*l[1]/2),f=e/f.resolution,p=this.a,q=p.da(),u=e*q.nb(h),w=q.sa(h),p=Ha(p,"render"),r=c,x=1,D,t,z;if(k||p){r=this.f;D=r.canvas;var x=q.pb(e)/e,C=c.canvas.width*x;t=c.canvas.height*x;z=Math.round(Math.sqrt(C*C+t*t));D.width!=z?D.width=D.height=z:r.clearRect(0,0,z,z);D=(z-C)/2/x;t=(z-t)/2/x;f*=x;m=Math.round(x*
	(m+D));l=Math.round(x*(l+t))}C=r.globalAlpha;r.globalAlpha=b.opacity;var E=this.c,v,H=q.Qb(h)&&1==b.opacity;H||(E.reverse(),v=[]);var G=b.extent;if(b=void 0!==G){var A=xb(G),F=[G[2],G[3]],Q=[G[2],G[1]],G=sb(G);Hf(a.coordinateToPixelTransform,A);Hf(a.coordinateToPixelTransform,F);Hf(a.coordinateToPixelTransform,Q);Hf(a.coordinateToPixelTransform,G);var N=D||0,O=t||0;r.save();var S=r.canvas.width/2,X=r.canvas.height/2;nh(r,-k,S,X);r.beginPath();r.moveTo(x*(A[0]*e+N),x*(A[1]*e+O));r.lineTo(x*(F[0]*e+
	N),x*(F[1]*e+O));r.lineTo(x*(Q[0]*e+N),x*(Q[1]*e+O));r.lineTo(x*(G[0]*e+N),x*(G[1]*e+O));r.clip();nh(r,k,S,X)}A=0;for(F=E.length;A<F;++A){var Q=E[A],G=Q.V,X=Qc(w,G,this.j),S=G[0],P=sb(Qc(w,Yc(w,g,S,this.s))),G=Math.round(qb(X)*f),N=Math.round(rb(X)*f),O=Math.round((X[0]-P[0])*f/G)*G+m+Math.round((P[0]-g[0])*f),X=Math.round((P[1]-X[3])*f/N)*N+l+Math.round((g[1]-P[1])*f);if(!H){P=[O,X,O+G,X+N];r.save();for(var Ba=0,Nb=v.length;Ba<Nb;++Ba){var Ca=v[Ba];wb(P,Ca)&&(r.beginPath(),r.moveTo(P[0],P[1]),r.lineTo(P[0],
	P[3]),r.lineTo(P[2],P[3]),r.lineTo(P[2],P[1]),r.moveTo(Ca[0],Ca[1]),r.lineTo(Ca[2],Ca[1]),r.lineTo(Ca[2],Ca[3]),r.lineTo(Ca[0],Ca[3]),r.closePath(),r.clip())}v.push(P)}S=Ni(q,S,e,h);r.drawImage(Q.Z(),u,u,S[0],S[1],O,X,G,N);H||r.restore()}b&&r.restore();p&&(e=D-m/x+m,h=t-l/x+l,g=Lf(this.h,z/2-e,z/2-h,f,-f,-k,-g[0]+e/f,-g[1]-h/f),ci(this,"render",r,a,g));(k||p)&&c.drawImage(r.canvas,-Math.round(D),-Math.round(t),z/x,z/x);r.globalAlpha=C;ci(this,"postcompose",c,a,d)};
	Mi.prototype.i=function(a,b){function c(a){a=a.T();return 2==a||4==a||3==a&&!u}var d=a.pixelRatio,e=a.viewState,f=e.projection,g=this.a,h=g.da(),k=h.sa(f),l=Xc(k,e.resolution,0),m=k.O(l),p=e.center;m==e.resolution?(p=Yh(p,m,a.size),e=ub(p,m,e.rotation,a.size)):e=a.extent;void 0!==b.extent&&(e=vb(e,b.extent));if(pb(e))return!1;m=Tc(k,e,m);p={};p[l]={};var q=this.l(h,f,p),u=jh(g),w=db(),r=new Gc(0,0,0,0),x,D,t,z;for(t=m.H;t<=m.I;++t)for(z=m.J;z<=m.L;++z)x=$h(h,l,t,z,d,f),!c(x)&&x.b&&(x=x.b),c(x)?p[l][x.V.toString()]=
	x:(D=Pc(k,x.V,q,r,w),D||(x=Sc(k,x.V,r,w))&&q(l+1,x));q=Object.keys(p).map(Number);q.sort(Ma);var w=[],C,r=0;for(t=q.length;r<t;++r)for(C in x=q[r],z=p[x],z)x=z[C],2==x.T()&&w.push(x);this.c=w;Xh(a.usedTiles,h,l,m);Zh(a,h,k,d,f,e,l,g.get("preload"));Uh(a,h);Wh(a,h);return!0};function Oi(a){ai.call(this,a);this.c=!1;this.B=-1;this.u=NaN;this.j=db();this.f=this.s=null;this.h=Md()}B(Oi,ai);
	Oi.prototype.g=function(a,b,c){var d=a.extent,e=a.pixelRatio,f=b.hb?a.skippedFeatureUids:{},g=a.viewState,h=g.projection,g=g.rotation,k=h.G(),l=this.a.da(),m=di(this,a,0);ci(this,"precompose",c,a,m);var p=b.extent,q=void 0!==p;q&&bi(c,a,p);if((p=this.f)&&!p.c()){var u=0,w=0,r;if(Ha(this.a,"render")){r=c.canvas.width;var x=c.canvas.height;if(g){var D=Math.round(Math.sqrt(r*r+x*x)),u=(D-r)/2,w=(D-x)/2;r=x=D}this.h.canvas.width=r;this.h.canvas.height=x;r=this.h}else r=c;x=r.globalAlpha;r.globalAlpha=
	b.opacity;r!=c&&r.translate(u,w);b=a.size[0]*e;D=a.size[1]*e;nh(r,-g,b/2,D/2);p.f(r,e,m,g,f);if(l.i&&h.b&&!hb(k,d)){for(var h=d[0],l=qb(k),t=0;h<k[0];)--t,m=l*t,m=di(this,a,m),p.f(r,e,m,g,f),h+=l;t=0;for(h=d[2];h>k[2];)++t,m=l*t,m=di(this,a,m),p.f(r,e,m,g,f),h-=l;m=di(this,a,0)}nh(r,g,b/2,D/2);r!=c&&(ci(this,"render",r,a,m),c.drawImage(r.canvas,-u,-w),r.translate(-u,-w));r.globalAlpha=x}q&&c.restore();ci(this,"postcompose",c,a,m)};
	Oi.prototype.fa=function(a,b,c,d){if(this.f){var e=this.a,f={};return this.f.fa(a,b.viewState.resolution,b.viewState.rotation,{},function(a){var b=J(a).toString();if(!(b in f))return f[b]=!0,c.call(d,a,e)})}};Oi.prototype.D=function(){Th(this)};
	Oi.prototype.i=function(a){function b(a){var b,d=a.f;d?b=d.call(a,l):(d=c.g)&&(b=d(a,l));if(b){if(b){d=!1;if(Array.isArray(b))for(var e=0,f=b.length;e<f;++e)d=Bi(q,a,b[e],Ai(l,m),this.D,this)||d;else d=Bi(q,a,b,Ai(l,m),this.D,this)||d;a=d}else a=!1;this.c=this.c||a}}var c=this.a,d=c.da();Vh(a.attributions,d.h);Wh(a,d);var e=a.viewHints[0],f=a.viewHints[1],g=c.i,h=c.j;if(!this.c&&!g&&e||!h&&f)return!0;var k=a.extent,h=a.viewState,e=h.projection,l=h.resolution,m=a.pixelRatio,f=c.b,p=c.a,g=c.get("renderOrder");
	void 0===g&&(g=zi);k=fb(k,p*l);p=h.projection.G();d.i&&h.projection.b&&!hb(p,a.extent)&&(a=Math.max(qb(k)/2,qb(p)),k[0]=p[0]-a,k[2]=p[2]+a);if(!this.c&&this.u==l&&this.B==f&&this.s==g&&hb(this.j,k))return!0;this.f=null;this.c=!1;var q=new vi(.5*l/m,k,l,d.u,c.a);Pi(d,k,l,e);if(g){var u=[];Qi(d,k,function(a){u.push(a)},this);u.sort(g);u.forEach(b,this)}else Qi(d,k,b,this);wi(q);this.u=l;this.B=f;this.s=g;this.j=k;this.f=q;return!0};function Ri(a,b){Nf.call(this,0,b);this.f=Md();this.b=this.f.canvas;this.b.style.width="100%";this.b.style.height="100%";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0;this.h=Cf()}B(Ri,Nf);Ri.prototype.Mb=function(a){return a instanceof W?new Mi(a):a instanceof Y?new Oi(a):null};
	function Si(a,b,c){var d=a.g,e=a.f;if(Ha(d,b)){var f=c.extent,g=c.pixelRatio,h=c.viewState.rotation,k=c.viewState,l=c.pixelRatio/k.resolution;a=Lf(a.h,a.b.width/2,a.b.height/2,l,-l,-k.rotation,-k.center[0],-k.center[1]);U(d,new uf(b,new Gh(e,g,f,a,h),c,e,null))}}Ri.prototype.$=function(){return"canvas"};
	Ri.prototype.vb=function(a){if(a){var b=this.f,c=a.pixelRatio,d=Math.round(a.size[0]*c),c=Math.round(a.size[1]*c);this.b.width!=d||this.b.height!=c?(this.b.width=d,this.b.height=c):b.clearRect(0,0,d,c);var e=a.viewState.rotation;Of(a);Si(this,"precompose",a);var f=a.layerStatesArray;Sa(f);nh(b,e,d/2,c/2);var g=a.viewState.resolution,h,k,l,m;h=0;for(k=f.length;h<k;++h)m=f[h],l=m.layer,l=Qf(this,l),yf(m,g)&&"ready"==m.ac&&l.i(a,m)&&l.g(a,m,b);nh(b,-e,d/2,c/2);Si(this,"postcompose",a);this.a||(this.b.style.display=
	"",this.a=!0);Rf(this,a);a.postRenderFunctions.push(Pf)}else this.a&&(this.b.style.display="none",this.a=!1)};function Ti(a,b){Rh.call(this,a);this.target=b}B(Ti,Rh);Ti.prototype.Jb=I;Ti.prototype.Gc=I;function Ui(a){var b=document.createElement("DIV");b.style.position="absolute";Ti.call(this,a,b);this.f=!0;this.h=1;this.g=0;this.c={}}B(Ui,Ti);Ui.prototype.Jb=function(){for(var a=this.target;a.lastChild;)a.removeChild(a.lastChild);this.g=0};
	Ui.prototype.Hc=function(a,b){if(!b.visible)return this.f&&(this.target.style.display="none",this.f=!1),!0;var c=a.pixelRatio,d=a.viewState,e=d.projection,f=this.a,g=f.da(),h=g.sa(e),k=c*g.nb(e),l=Xc(h,d.resolution),m=h.O(l),p=d.center,q;m==d.resolution?(p=Yh(p,m,a.size),q=ub(p,m,d.rotation,a.size)):q=a.extent;void 0!==b.extent&&(q=vb(q,b.extent));var m=Tc(h,q,m),u={};u[l]={};var w=this.l(g,e,u),r=jh(f),x=db(),D=new Gc(0,0,0,0),t,z,C,E;for(C=m.H;C<=m.I;++C)for(E=m.J;E<=m.L;++E)t=$h(g,l,C,E,c,e),z=
	t.T(),z=2==z||4==z||3==z&&!r,!z&&t.b&&(t=t.b),z=t.T(),2==z?u[l][t.V.toString()]=t:4==z||3==z&&!r||(z=Pc(h,t.V,w,D,x),z||(t=Sc(h,t.V,D,x))&&w(l+1,t));var v;if(this.g!=g.b){for(v in this.c)r=this.c[+v],Sd(r.target);this.c={};this.g=g.b}x=Object.keys(u).map(Number);x.sort(Ma);var w={},H;C=0;for(E=x.length;C<E;++C){v=x[C];v in this.c?r=this.c[v]:(r=Yc(h,p,v),r=new Vi(h,r),w[v]=!0,this.c[v]=r);v=u[v];for(H in v){t=r;z=v[H];var G=k,A=z.V,F=A[0],Q=A[1],N=A[2],A=A.toString();if(!(A in t.a)){var F=Lc(Wc(t.g,
	F),t.i),O=z.Z(t),S=O.style;S.maxWidth="none";var X,P;0<G?(X=document.createElement("DIV"),P=X.style,P.overflow="hidden",P.width=F[0]+"px",P.height=F[1]+"px",S.position="absolute",S.left=-G+"px",S.top=-G+"px",S.width=F[0]+2*G+"px",S.height=F[1]+2*G+"px",X.appendChild(O)):(S.width=F[0]+"px",S.height=F[1]+"px",X=O,P=S);P.position="absolute";P.left=(Q-t.c[1])*F[0]+"px";P.top=(t.c[2]-N)*F[1]+"px";t.b||(t.b=document.createDocumentFragment());t.b.appendChild(X);t.a[A]=z}}r.b&&(r.target.appendChild(r.b),
	r.b=null)}k=Object.keys(this.c).map(Number);k.sort(Ma);C=Cf();H=0;for(x=k.length;H<x;++H)if(v=k[H],r=this.c[v],v in u)if(t=r.O(),E=r.pa(),Lf(C,a.size[0]/2,a.size[1]/2,t/d.resolution,t/d.resolution,d.rotation,(E[0]-p[0])/t,(p[1]-E[1])/t),r.setTransform(C),v in w){for(--v;0<=v;--v)if(v in this.c){this.c[v].target.parentNode&&this.c[v].target.parentNode.insertBefore(r.target,this.c[v].target.nextSibling);break}0>v&&this.target.insertBefore(r.target,this.target.childNodes[0]||null)}else{if(!a.viewHints[0]&&
	!a.viewHints[1]){z=Rc(r.g,q,r.c[0],D);v=[];t=void 0;for(t in r.a)E=r.a[t],G=E.V,Hc(z,G[1],G[2])||v.push(E);z=0;for(G=v.length;z<G;++z)E=v[z],t=E.V.toString(),Sd(E.Z(r)),delete r.a[t]}}else Sd(r.target),delete this.c[v];b.opacity!=this.h&&(this.h=this.target.style.opacity=b.opacity);b.visible&&!this.f&&(this.target.style.display="",this.f=!0);Xh(a.usedTiles,g,l,m);Zh(a,g,h,c,e,q,l,f.get("preload"));Uh(a,g);Wh(a,g);return!0};
	function Vi(a,b){this.target=document.createElement("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.g=a;this.c=b;this.h=xb(Qc(a,b));this.l=a.O(b[0]);this.a={};this.b=null;this.f=Cf();this.i=[0,0]}Vi.prototype.pa=function(){return this.h};Vi.prototype.O=function(){return this.l};Vi.prototype.setTransform=function(a){Ra(a,this.f)||(Qd(this.target,a),Gf(this.f,a))};function Wi(a){this.g=Md();var b=this.g.canvas;b.style.maxWidth="none";b.style.position="absolute";Ti.call(this,a,b);this.c=!1;this.h=-1;this.s=NaN;this.i=db();this.f=this.j=null;this.B=Cf();this.u=Cf()}B(Wi,Ti);n=Wi.prototype;n.Jb=function(){var a=this.g.canvas;a.width=a.width;this.h=0};
	n.Gc=function(a,b){var c=a.viewState,d=c.center,e=c.rotation,f=c.resolution,c=a.pixelRatio,g=a.size[0],h=a.size[1],k=g*c,l=h*c,d=Lf(this.B,c*g/2,c*h/2,c/f,-c/f,-e,-d[0],-d[1]),f=this.g;f.canvas.width=k;f.canvas.height=l;var m=Df(this.u);Jf(m,1/c,1/c);Kf(m,-(k-g)/2*c,-(l-h)/2*c);Qd(f.canvas,m);Xi(this,"precompose",a,d);(g=this.f)&&!g.c()&&(f.globalAlpha=b.opacity,g.f(f,c,d,e,b.hb?a.skippedFeatureUids:{}),Xi(this,"render",a,d));Xi(this,"postcompose",a,d)};
	function Xi(a,b,c,d){var e=a.g;a=a.a;Ha(a,b)&&U(a,new uf(b,new Gh(e,c.pixelRatio,c.extent,d,c.viewState.rotation),c,e,null))}n.fa=function(a,b,c,d){if(this.f){var e=this.a,f={};return this.f.fa(a,b.viewState.resolution,b.viewState.rotation,{},function(a){var b=J(a).toString();if(!(b in f))return f[b]=!0,c.call(d,a,e)})}};n.Ic=function(){Th(this)};
	n.Hc=function(a){function b(a){var b,d=a.f;d?b=d.call(a,k):(d=c.g)&&(b=d(a,k));if(b){if(b){d=!1;if(Array.isArray(b))for(var e=0,f=b.length;e<f;++e)d=Bi(m,a,b[e],Ai(k,l),this.Ic,this)||d;else d=Bi(m,a,b,Ai(k,l),this.Ic,this)||d;a=d}else a=!1;this.c=this.c||a}}var c=this.a,d=c.da();Vh(a.attributions,d.h);Wh(a,d);var e=a.viewHints[0],f=a.viewHints[1],g=c.i,h=c.j;if(!this.c&&!g&&e||!h&&f)return!0;var f=a.extent,g=a.viewState,e=g.projection,k=g.resolution,l=a.pixelRatio;a=c.b;h=c.a;g=c.get("renderOrder");
	void 0===g&&(g=zi);f=fb(f,h*k);if(!this.c&&this.s==k&&this.h==a&&this.j==g&&hb(this.i,f))return!0;this.f=null;this.c=!1;var m=new vi(.5*k/l,f,k,d.u,c.a);Pi(d,f,k,e);if(g){var p=[];Qi(d,f,function(a){p.push(a)},this);p.sort(g);p.forEach(b,this)}else Qi(d,f,b,this);wi(m);this.s=k;this.h=a;this.j=g;this.i=f;this.f=m;return!0};function Yi(a,b){Nf.call(this,0,b);this.f=Md();var c=this.f.canvas;c.style.position="absolute";c.style.width="100%";c.style.height="100%";c.className="ol-unselectable";a.insertBefore(c,a.childNodes[0]||null);this.h=Cf();this.b=document.createElement("DIV");this.b.className="ol-unselectable";c=this.b.style;c.position="absolute";c.width="100%";c.height="100%";R(this.b,"touchstart",Fa);a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0}B(Yi,Nf);Yi.prototype.R=function(){Sd(this.b);Nf.prototype.R.call(this)};
	Yi.prototype.Mb=function(a){if(a instanceof W)a=new Ui(a);else if(a instanceof Y)a=new Wi(a);else return null;return a};function Zi(a,b,c){var d=a.g;if(Ha(d,b)){var e=c.extent,f=c.pixelRatio,g=c.viewState,h=g.rotation,k=a.f,l=k.canvas;a=Lf(a.h,l.width/2,l.height/2,f/g.resolution,-f/g.resolution,-h,-g.center[0],-g.center[1]);U(d,new uf(b,new Gh(k,f,e,a,h),c,k,null))}}Yi.prototype.$=function(){return"dom"};
	Yi.prototype.vb=function(a){if(a){var b=this.g;if(Ha(b,"precompose")||Ha(b,"postcompose")){var b=this.f.canvas,c=a.pixelRatio;b.width=a.size[0]*c;b.height=a.size[1]*c}Zi(this,"precompose",a);b=a.layerStatesArray;Sa(b);var c=a.viewState.resolution,d,e,f,g;d=0;for(e=b.length;d<e;++d)g=b[d],f=g.layer,f=Qf(this,f),this.b.insertBefore(f.target,this.b.childNodes[d]||null),yf(g,c)&&"ready"==g.ac?f.Hc(a,g)&&f.Gc(a,g):f.Jb();var b=a.layerStates,h;for(h in this.c)h in b||(f=this.c[h],Sd(f.target));this.a||
	(this.b.style.display="",this.a=!0);Of(a);Rf(this,a);a.postRenderFunctions.push(Pf);Zi(this,"postcompose",a)}else this.a&&(this.b.style.display="none",this.a=!1)};function $i(a){this.b=a};function aj(a){this.b=a}B(aj,$i);aj.prototype.$=function(){return 35632};function bj(a){this.b=a}B(bj,$i);bj.prototype.$=function(){return 35633};function cj(){this.b="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}B(cj,aj);var dj=new cj;
	function ej(){this.b="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}B(ej,bj);var fj=new ej;
	function gj(a,b){this.i=a.getUniformLocation(b,"j");this.j=a.getUniformLocation(b,"i");this.h=a.getUniformLocation(b,"k");this.l=a.getUniformLocation(b,"h");this.b=a.getAttribLocation(b,"e");this.a=a.getAttribLocation(b,"f");this.f=a.getAttribLocation(b,"c");this.c=a.getAttribLocation(b,"g");this.g=a.getAttribLocation(b,"d")};function hj(a){this.b=void 0!==a?a:[];this.a=ij}var ij=35044;function jj(a,b){this.C=a;this.b=b;this.a={};this.g={};this.f={};this.i=this.j=this.h=this.l=null;(this.c=0<=fa.indexOf("OES_element_index_uint"))&&b.getExtension("OES_element_index_uint");R(this.C,"webglcontextlost",this.K,this);R(this.C,"webglcontextrestored",this.s,this)}B(jj,Aa);
	function kj(a,b,c){var d=a.b,e=c.b,f=String(J(c));if(f in a.a)d.bindBuffer(b,a.a[f].buffer);else{var g=d.createBuffer();d.bindBuffer(b,g);var h;34962==b?h=new Float32Array(e):34963==b&&(h=a.c?new Uint32Array(e):new Uint16Array(e));d.bufferData(b,h,c.a);a.a[f]={Qe:c,buffer:g}}}function lj(a,b){var c=a.b,d=String(J(b)),e=a.a[d];c.isContextLost()||c.deleteBuffer(e.buffer);delete a.a[d]}
	jj.prototype.R=function(){za(this.C);var a=this.b;if(!a.isContextLost()){for(var b in this.a)a.deleteBuffer(this.a[b].buffer);for(b in this.f)a.deleteProgram(this.f[b]);for(b in this.g)a.deleteShader(this.g[b]);a.deleteFramebuffer(this.h);a.deleteRenderbuffer(this.i);a.deleteTexture(this.j)}};
	function mj(a){if(!a.h){var b=a.b,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=nj(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,null);a.h=c;
	a.j=d;a.i=e}return a.h}function oj(a,b){var c=String(J(b));if(c in a.g)return a.g[c];var d=a.b,e=d.createShader(b.$());d.shaderSource(e,b.b);d.compileShader(e);return a.g[c]=e}function pj(a,b,c){var d=J(b)+"/"+J(c);if(d in a.f)return a.f[d];var e=a.b,f=e.createProgram();e.attachShader(f,oj(a,b));e.attachShader(f,oj(a,c));e.linkProgram(f);return a.f[d]=f}jj.prototype.K=function(){qa(this.a);qa(this.g);qa(this.f);this.i=this.j=this.h=this.l=null};jj.prototype.s=function(){};
	function qj(a,b){if(b==a.l)return!1;a.b.useProgram(b);a.l=b;return!0}function rj(a,b,c){var d=a.createTexture();a.bindTexture(a.TEXTURE_2D,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);void 0!==b&&a.texParameteri(3553,10242,b);void 0!==c&&a.texParameteri(3553,10243,c);return d}function nj(a,b,c){var d=rj(a,void 0,void 0);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,a.UNSIGNED_BYTE,null);return d};function sj(a,b){this.B=this.u=void 0;this.C=tb(b);this.v=[];this.l=[];this.M=void 0;this.h=[];this.g=[];this.ca=this.Y=void 0;this.a=[];this.D=this.j=null;this.N=void 0;this.Ea=Cf();this.va=Cf();this.ha=this.P=void 0;this.wa=Cf();this.ra=Jd();this.ba=this.aa=this.W=void 0;this.na=[];this.i=[];this.b=[];this.s=null;this.c=[];this.K=[];this.ma=void 0}B(sj,Fh);
	function tj(a,b){var c=a.s,d=a.j,e=a.na,f=a.i,g=b.b;return function(){if(!g.isContextLost()){var a,k;a=0;for(k=e.length;a<k;++a)g.deleteTexture(e[a]);a=0;for(k=f.length;a<k;++a)g.deleteTexture(f[a])}lj(b,c);lj(b,d)}}
	function uj(a,b,c,d){var e=a.u,f=a.B,g=a.M,h=a.Y,k=a.ca,l=a.N,m=a.P,p=a.ha,q=a.W?1:0,u=a.aa,w=a.ba,r=a.ma,x=Math.cos(u),u=Math.sin(u),D=a.a.length,t=a.b.length,z,C,E,v,H,G;for(z=0;z<c;z+=d)H=b[z]-a.C[0],G=b[z+1]-a.C[1],C=t/8,E=-w*e,v=-w*(g-f),a.b[t++]=H,a.b[t++]=G,a.b[t++]=E*x-v*u,a.b[t++]=E*u+v*x,a.b[t++]=m/k,a.b[t++]=(p+g)/h,a.b[t++]=l,a.b[t++]=q,E=w*(r-e),v=-w*(g-f),a.b[t++]=H,a.b[t++]=G,a.b[t++]=E*x-v*u,a.b[t++]=E*u+v*x,a.b[t++]=(m+r)/k,a.b[t++]=(p+g)/h,a.b[t++]=l,a.b[t++]=q,E=w*(r-e),v=w*f,a.b[t++]=
	H,a.b[t++]=G,a.b[t++]=E*x-v*u,a.b[t++]=E*u+v*x,a.b[t++]=(m+r)/k,a.b[t++]=p/h,a.b[t++]=l,a.b[t++]=q,E=-w*e,v=w*f,a.b[t++]=H,a.b[t++]=G,a.b[t++]=E*x-v*u,a.b[t++]=E*u+v*x,a.b[t++]=m/k,a.b[t++]=p/h,a.b[t++]=l,a.b[t++]=q,a.a[D++]=C,a.a[D++]=C+1,a.a[D++]=C+2,a.a[D++]=C,a.a[D++]=C+2,a.a[D++]=C+3}sj.prototype.bb=function(a,b){this.c.push(this.a.length);this.K.push(b);var c=a.o;uj(this,c,c.length,a.A)};sj.prototype.cb=function(a,b){this.c.push(this.a.length);this.K.push(b);var c=a.o;uj(this,c,c.length,a.A)};
	function vj(a,b){var c=b.b;a.v.push(a.a.length);a.l.push(a.a.length);a.s=new hj(a.b);kj(b,34962,a.s);a.j=new hj(a.a);kj(b,34963,a.j);var d={};wj(a.na,a.h,d,c);wj(a.i,a.g,d,c);a.u=void 0;a.B=void 0;a.M=void 0;a.h=null;a.g=null;a.Y=void 0;a.ca=void 0;a.a=null;a.N=void 0;a.P=void 0;a.ha=void 0;a.W=void 0;a.aa=void 0;a.ba=void 0;a.b=null;a.ma=void 0}
	function wj(a,b,c,d){var e,f,g,h,k=b.length;for(h=0;h<k;++h){f=b[h];g=J(f).toString();if(g in c)e=c[g];else{e=d;var l=rj(e,33071,33071);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,f);e=l;c[g]=e}a[h]=e}}
	sj.prototype.f=function(a,b,c,d,e,f,g,h,k,l,m){f=a.b;kj(a,34962,this.s);kj(a,34963,this.j);var p=pj(a,dj,fj),q;this.D?q=this.D:this.D=q=new gj(f,p);qj(a,p);f.enableVertexAttribArray(q.f);f.vertexAttribPointer(q.f,2,5126,!1,32,0);f.enableVertexAttribArray(q.b);f.vertexAttribPointer(q.b,2,5126,!1,32,8);f.enableVertexAttribArray(q.g);f.vertexAttribPointer(q.g,2,5126,!1,32,16);f.enableVertexAttribArray(q.a);f.vertexAttribPointer(q.a,1,5126,!1,32,24);f.enableVertexAttribArray(q.c);f.vertexAttribPointer(q.c,
	1,5126,!1,32,28);p=Df(this.wa);Jf(p,2/(c*e[0]),2/(c*e[1]));If(p,-d);Kf(p,-(b[0]-this.C[0]),-(b[1]-this.C[1]));b=Df(this.va);Jf(b,2/e[0],2/e[1]);e=Df(this.Ea);0!==d&&If(e,-d);f.uniformMatrix4fv(q.l,!1,Kd(this.ra,p));f.uniformMatrix4fv(q.j,!1,Kd(this.ra,b));f.uniformMatrix4fv(q.i,!1,Kd(this.ra,e));f.uniform1f(q.h,g);var u;if(void 0===k)xj(this,f,a,h,this.na,this.v);else{if(l)a:{d=a.c?5125:5123;a=a.c?4:2;e=this.c.length-1;for(g=this.i.length-1;0<=g;--g)for(f.bindTexture(3553,this.i[g]),l=0<g?this.l[g-
	1]:0,b=this.l[g];0<=e&&this.c[e]>=l;){u=this.c[e];c=this.K[e];p=J(c).toString();if(void 0===h[p]&&c.S()&&(void 0===m||wb(m,c.S().G()))&&(f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),f.drawElements(4,b-u,d,u*a),b=k(c))){h=b;break a}b=u;e--}h=void 0}else f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),xj(this,f,a,h,this.i,this.l),h=(h=k(null))?h:void 0;u=h}f.disableVertexAttribArray(q.f);f.disableVertexAttribArray(q.b);f.disableVertexAttribArray(q.g);f.disableVertexAttribArray(q.a);f.disableVertexAttribArray(q.c);
	return u};function xj(a,b,c,d,e,f){var g=c.c?5125:5123;c=c.c?4:2;if(sa(d)){var h;a=0;d=e.length;for(h=0;a<d;++a){b.bindTexture(3553,e[a]);var k=f[a];b.drawElements(4,k-h,g,h*c);h=k}}else{h=0;var l,k=0;for(l=e.length;k<l;++k){b.bindTexture(3553,e[k]);for(var m=0<k?f[k-1]:0,p=f[k],q=m;h<a.c.length&&a.c[h]<=p;){var u=J(a.K[h]).toString();void 0!==d[u]?(q!==m&&b.drawElements(4,m-q,g,q*c),m=q=h===a.c.length-1?p:a.c[h+1]):m=h===a.c.length-1?p:a.c[h+1];h++}q!==m&&b.drawElements(4,m-q,g,q*c)}}}
	sj.prototype.Ma=function(a){var b=a.eb(),c=a.Z(1),d=a.Ob(),e=a.ub(1),f=a.C,g=a.pa(),h=a.K,k=a.s,l=a.Ka();a=a.v;var m;0===this.h.length?this.h.push(c):(m=this.h[this.h.length-1],J(m)!=J(c)&&(this.v.push(this.a.length),this.h.push(c)));0===this.g.length?this.g.push(e):(m=this.g[this.g.length-1],J(m)!=J(e)&&(this.l.push(this.a.length),this.g.push(e)));this.u=b[0];this.B=b[1];this.M=l[1];this.Y=d[1];this.ca=d[0];this.N=f;this.P=g[0];this.ha=g[1];this.aa=k;this.W=h;this.ba=a;this.ma=l[0]};
	function yj(a,b,c){this.h=b;this.l=a;this.g=c;this.a={}}B(yj,ei);function zj(a,b){var c=[],d;for(d in a.a)c.push(tj(a.a[d],b));return function(){for(var a=c.length,b,d=0;d<a;d++)b=c[d].apply(this,arguments);return b}}function Aj(a,b){for(var c in a.a)vj(a.a[c],b)}yj.prototype.b=function(a,b){var c=this.a[b];void 0===c&&(c=new Bj[b](this.l,this.h),this.a[b]=c);return c};yj.prototype.c=function(){return sa(this.a)};
	yj.prototype.f=function(a,b,c,d,e,f,g,h){var k,l,m;k=0;for(l=fi.length;k<l;++k)m=this.a[fi[k]],void 0!==m&&m.f(a,b,c,d,e,f,g,h,void 0,!1)};function Cj(a,b,c,d,e,f,g,h,k,l,m){var p=Dj,q,u;for(q=fi.length-1;0<=q;--q)if(u=a.a[fi[q]],void 0!==u&&(u=u.f(b,c,d,e,p,f,g,h,k,l,m)))return u}
	yj.prototype.fa=function(a,b,c,d,e,f,g,h,k,l){var m=b.b;m.bindFramebuffer(m.FRAMEBUFFER,mj(b));var p;void 0!==this.g&&(p=fb(kb(a),d*this.g));return Cj(this,b,a,d,e,g,h,k,function(a){var b=new Uint8Array(4);m.readPixels(0,0,1,1,m.RGBA,m.UNSIGNED_BYTE,b);if(0<b[3]&&(a=l(a)))return a},!0,p)};
	function Ej(a,b,c,d,e,f,g,h){var k=c.b;k.bindFramebuffer(k.FRAMEBUFFER,mj(c));return void 0!==Cj(a,c,b,d,e,f,g,h,function(){var a=new Uint8Array(4);k.readPixels(0,0,1,1,k.RGBA,k.UNSIGNED_BYTE,a);return 0<a[3]},!1)}var Bj={Image:sj},Dj=[1,1];function Fj(a,b,c,d,e,f,g){this.b=a;this.c=b;this.f=f;this.g=g;this.i=e;this.l=d;this.h=c;this.a=null}B(Fj,Fh);Fj.prototype.cb=function(a,b){var c=this.b,d=(new yj(1,this.f)).b(0,"Image");d.Ma(this.a);d.cb(a,b);vj(d,c);d.f(this.b,this.c,this.h,this.l,this.i,this.g,1,{},void 0,!1);tj(d,c)()};Fj.prototype.bb=function(a,b){var c=this.b,d=(new yj(1,this.f)).b(0,"Image");d.Ma(this.a);d.bb(a,b);vj(d,c);d.f(this.b,this.c,this.h,this.l,this.i,this.g,1,{},void 0,!1);tj(d,c)()};
	Fj.prototype.Ma=function(a){this.a=a};function Gj(){this.b="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}B(Gj,aj);var Hj=new Gj;function Ij(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}B(Ij,bj);var Jj=new Ij;
	function Kj(a,b){this.c=a.getUniformLocation(b,"f");this.f=a.getUniformLocation(b,"e");this.h=a.getUniformLocation(b,"d");this.g=a.getUniformLocation(b,"g");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function Lj(a,b){Rh.call(this,b);this.f=a;this.W=new hj([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.i=this.Da=null;this.j=void 0;this.P=Cf();this.aa=Cf();this.B=Jd();this.s=null}B(Lj,Rh);
	function Mj(a,b,c){var d=a.f.f;if(void 0===a.j||a.j!=c){b.postRenderFunctions.push(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))}.bind(null,d,a.i,a.Da));b=nj(d,c,c);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.Da=b;a.i=e;a.j=c}else d.bindFramebuffer(36160,a.i)}
	Lj.prototype.Jc=function(a,b,c){Nj(this,"precompose",c,a);kj(c,34962,this.W);var d=c.b,e=pj(c,Hj,Jj),f;this.s?f=this.s:this.s=f=new Kj(d,e);qj(c,e)&&(d.enableVertexAttribArray(f.b),d.vertexAttribPointer(f.b,2,5126,!1,16,0),d.enableVertexAttribArray(f.a),d.vertexAttribPointer(f.a,2,5126,!1,16,8),d.uniform1i(f.g,0));d.uniformMatrix4fv(f.h,!1,Kd(this.B,this.P));d.uniformMatrix4fv(f.f,!1,Kd(this.B,this.aa));d.uniform1f(f.c,b.opacity);d.bindTexture(3553,this.Da);d.drawArrays(5,0,4);Nj(this,"postcompose",
	c,a)};function Nj(a,b,c,d){a=a.a;if(Ha(a,b)){var e=d.viewState;U(a,new uf(b,new Fj(c,e.center,e.resolution,e.rotation,d.size,d.extent,d.pixelRatio),d,null,c))}}Lj.prototype.v=function(){this.i=this.Da=null;this.j=void 0};function Oj(){this.b="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}B(Oj,aj);var Pj=new Oj;function Qj(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}B(Qj,bj);var Rj=new Qj;function Sj(a,b){this.c=a.getUniformLocation(b,"e");this.f=a.getUniformLocation(b,"d");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function Tj(a,b){Lj.call(this,a,b);this.M=Pj;this.ba=Rj;this.c=null;this.D=new hj([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.u=this.g=null;this.h=-1;this.N=[0,0]}B(Tj,Lj);Tj.prototype.R=function(){lj(this.f.getContext(),this.D);Lj.prototype.R.call(this)};Tj.prototype.l=function(a,b,c){var d=this.f;return function(e,f){return Sh(a,b,e,f,function(a){var b=Uj(d.a,a.getKey());b&&(c[e]||(c[e]={}),c[e][a.V.toString()]=a);return b})}};Tj.prototype.v=function(){Lj.prototype.v.call(this);this.c=null};
	Tj.prototype.Kc=function(a,b,c){var d=this.f,e=c.b,f=a.viewState,g=f.projection,h=this.a,k=h.da(),l=k.sa(g),m=Xc(l,f.resolution),p=l.O(m),q=Ni(k,m,a.pixelRatio,g),u=q[0]/Lc(Wc(l,m),this.N)[0],w=p/u,r=a.pixelRatio*k.nb(g),x=f.center,D;p==f.resolution?(x=Yh(x,p,a.size),D=ub(x,p,f.rotation,a.size)):D=a.extent;p=Tc(l,D,p);if(this.g&&Ic(this.g,p)&&this.h==k.b)w=this.u;else{var t=[p.I-p.H+1,p.L-p.J+1],z=ka(Math.max(t[0]*q[0],t[1]*q[1])),t=w*z,C=l.pa(m),E=C[0]+p.H*q[0]*w,w=C[1]+p.J*q[1]*w,w=[E,w,E+t,w+t];
	Mj(this,a,z);e.viewport(0,0,z,z);e.clearColor(0,0,0,0);e.clear(16384);e.disable(3042);z=pj(c,this.M,this.ba);qj(c,z);this.c||(this.c=new Sj(e,z));kj(c,34962,this.D);e.enableVertexAttribArray(this.c.b);e.vertexAttribPointer(this.c.b,2,5126,!1,16,0);e.enableVertexAttribArray(this.c.a);e.vertexAttribPointer(this.c.a,2,5126,!1,16,8);e.uniform1i(this.c.c,0);c={};c[m]={};var v=this.l(k,g,c),H=jh(h),z=!0,E=db(),G=new Gc(0,0,0,0),A,F,Q;for(F=p.H;F<=p.I;++F)for(Q=p.J;Q<=p.L;++Q){C=$h(k,m,F,Q,u,g);if(void 0!==
	b.extent&&(A=Qc(l,C.V,E),!wb(A,b.extent)))continue;A=C.T();A=2==A||4==A||3==A&&!H;!A&&C.b&&(C=C.b);A=C.T();if(2==A){if(Uj(d.a,C.getKey())){c[m][C.V.toString()]=C;continue}}else if(4==A||3==A&&!H)continue;z=!1;A=Pc(l,C.V,v,G,E);A||(C=Sc(l,C.V,G,E))&&v(m+1,C)}b=Object.keys(c).map(Number);b.sort(Ma);for(var v=new Float32Array(4),N,H=0,G=b.length;H<G;++H)for(N in F=c[b[H]],F)C=F[N],A=Qc(l,C.V,E),v[0]=2*(A[2]-A[0])/t,v[1]=2*(A[3]-A[1])/t,v[2]=2*(A[0]-w[0])/t-1,v[3]=2*(A[1]-w[1])/t-1,e.uniform4fv(this.c.f,
	v),Vj(d,C,q,r*u),e.drawArrays(5,0,4);z?(this.g=p,this.u=w,this.h=k.b):(this.u=this.g=null,this.h=-1,a.animate=!0)}Xh(a.usedTiles,k,m,p);var O=d.l;Zh(a,k,l,u,g,D,m,h.get("preload"),function(a){var b;(b=2!=a.T()||Uj(d.a,a.getKey()))||(b=a.getKey()in O.a);b||O.g([a,Vc(l,a.V),l.O(a.V[0]),q,r*u])},this);Uh(a,k);Wh(a,k);e=this.P;Df(e);Kf(e,(x[0]-w[0])/(w[2]-w[0]),(x[1]-w[1])/(w[3]-w[1]));0!==f.rotation&&If(e,f.rotation);Jf(e,a.size[0]*f.resolution/(w[2]-w[0]),a.size[1]*f.resolution/(w[3]-w[1]));Kf(e,-.5,
	-.5);return!0};function Wj(a,b){Lj.call(this,a,b);this.h=!1;this.N=-1;this.M=NaN;this.u=db();this.g=this.c=this.D=null}B(Wj,Lj);n=Wj.prototype;n.Jc=function(a,b,c){this.g=b;var d=a.viewState,e=this.c;e&&!e.c()&&e.f(c,d.center,d.resolution,d.rotation,a.size,a.pixelRatio,b.opacity,b.hb?a.skippedFeatureUids:{})};n.R=function(){var a=this.c;if(a){var b=this.f.getContext();zj(a,b)();this.c=null}Lj.prototype.R.call(this)};
	n.fa=function(a,b,c,d){if(this.c&&this.g){var e=this.f.getContext(),f=b.viewState,g=this.a,h={};return this.c.fa(a,e,f.center,f.resolution,f.rotation,b.size,b.pixelRatio,this.g.opacity,{},function(a){var b=J(a).toString();if(!(b in h))return h[b]=!0,c.call(d,a,g)})}};n.Ec=function(a,b){if(this.c&&this.g){var c=this.f.getContext(),d=b.viewState;return Ej(this.c,a,c,d.resolution,d.rotation,b.pixelRatio,this.g.opacity,b.skippedFeatureUids)}return!1};n.Lc=function(){Th(this)};
	n.Kc=function(a,b,c){function d(a){var b,c=a.f;c?b=c.call(a,l):(c=e.g)&&(b=c(a,l));if(b){if(b){c=!1;if(Array.isArray(b))for(var d=0,f=b.length;d<f;++d)c=Bi(q,a,b[d],Ai(l,m),this.Lc,this)||c;else c=Bi(q,a,b,Ai(l,m),this.Lc,this)||c;a=c}else a=!1;this.h=this.h||a}}var e=this.a;b=e.da();Vh(a.attributions,b.h);Wh(a,b);var f=a.viewHints[0],g=a.viewHints[1],h=e.i,k=e.j;if(!this.h&&!h&&f||!k&&g)return!0;var g=a.extent,h=a.viewState,f=h.projection,l=h.resolution,m=a.pixelRatio,h=e.b,p=e.a,k=e.get("renderOrder");
	void 0===k&&(k=zi);g=fb(g,p*l);if(!this.h&&this.M==l&&this.N==h&&this.D==k&&hb(this.u,g))return!0;this.c&&a.postRenderFunctions.push(zj(this.c,c));this.h=!1;var q=new yj(.5*l/m,g,e.a);Pi(b,g,l,f);if(k){var u=[];Qi(b,g,function(a){u.push(a)},this);u.sort(k);u.forEach(d,this)}else Qi(b,g,d,this);Aj(q,c);this.M=l;this.N=h;this.D=k;this.u=g;this.c=q;return!0};function Xj(){this.f=0;this.c={};this.a=this.b=null}Xj.prototype.clear=function(){this.f=0;this.c={};this.a=this.b=null};function Uj(a,b){return a.c.hasOwnProperty(b)}function Yj(a,b){for(var c=a.b;c;)b.call(void 0,c.Na,c.Ia,a),c=c.ta}Xj.prototype.get=function(a){a=this.c[a];L(void 0!==a,15);if(a===this.a)return a.Na;a===this.b?(this.b=this.b.ta,this.b.Ua=null):(a.ta.Ua=a.Ua,a.Ua.ta=a.ta);a.ta=null;a.Ua=this.a;this.a=this.a.ta=a;return a.Na};
	Xj.prototype.pop=function(){var a=this.b;delete this.c[a.Ia];a.ta&&(a.ta.Ua=null);this.b=a.ta;this.b||(this.a=null);--this.f;return a.Na};function Zj(a,b,c){a.get(b);a.c[b].Na=c}Xj.prototype.set=function(a,b){L(!(a in this.c),16);var c={Ia:a,ta:null,Ua:this.a,Na:b};this.a?this.a.ta=c:this.b=c;this.a=c;this.c[a]=c;++this.f};function ak(a,b){Nf.call(this,0,b);this.b=document.createElement("CANVAS");this.b.style.width="100%";this.b.style.height="100%";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.s=this.v=0;this.u=Md();this.i=!0;this.f=ie(this.b,{antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.C=new jj(this.b,this.f);R(this.b,"webglcontextlost",this.ge,this);R(this.b,"webglcontextrestored",this.he,this);this.a=new Xj;this.K=null;this.l=
	new Uf(function(a){var b=a[1];a=a[2];var e=b[0]-this.K[0],b=b[1]-this.K[1];return 65536*Math.log(a)+Math.sqrt(e*e+b*b)/a}.bind(this),function(a){return a[0].getKey()});this.B=function(){if(0!==this.l.b.length){Yf(this.l);var a=Vf(this.l);Vj(this,a[0],a[3],a[4])}return!1}.bind(this);this.h=0;bk(this)}B(ak,Nf);
	function Vj(a,b,c,d){var e=a.f,f=b.getKey();if(Uj(a.a,f))a=a.a.get(f),e.bindTexture(3553,a.Da),9729!=a.yc&&(e.texParameteri(3553,10240,9729),a.yc=9729),9729!=a.zc&&(e.texParameteri(3553,10241,9729),a.zc=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.u.canvas,k=a.u;a.v!==c[0]||a.s!==c[1]?(h.width=c[0],h.height=c[1],a.v=c[0],a.s=c[1]):k.clearRect(0,0,c[0],c[1]);k.drawImage(b.Z(),d,d,c[0],c[1],0,0,c[0],c[1]);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,0,6408,
	6408,5121,b.Z());e.texParameteri(3553,10240,9729);e.texParameteri(3553,10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);a.a.set(f,{Da:g,yc:9729,zc:9729})}}n=ak.prototype;n.Mb=function(a){return a instanceof W?new Tj(this,a):a instanceof Y?new Wj(this,a):null};function ck(a,b,c){var d=a.g;if(Ha(d,b)){a=a.C;var e=c.viewState;U(d,new uf(b,new Fj(a,e.center,e.resolution,e.rotation,c.size,c.extent,c.pixelRatio),c,null,a))}}
	n.R=function(){var a=this.f;a.isContextLost()||Yj(this.a,function(b){b&&a.deleteTexture(b.Da)});Da(this.C);Nf.prototype.R.call(this)};n.ld=function(a,b){for(var c=this.f,d;1024<this.a.f-this.h;){if(d=this.a.b.Na)c.deleteTexture(d.Da);else if(+this.a.b.Ia==b.index)break;else--this.h;this.a.pop()}};n.getContext=function(){return this.C};n.$=function(){return"webgl"};n.ge=function(a){a.preventDefault();this.a.clear();this.h=0;a=this.c;for(var b in a)a[b].v()};n.he=function(){bk(this);this.g.render()};
	function bk(a){a=a.f;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
	n.vb=function(a){var b=this.getContext(),c=this.f;if(c.isContextLost())return!1;if(!a)return this.i&&(this.b.style.display="none",this.i=!1),!1;this.K=a.focus;this.a.set((-a.index).toString(),null);++this.h;ck(this,"precompose",a);var d=[],e=a.layerStatesArray;Sa(e);var f=a.viewState.resolution,g,h,k,l;g=0;for(h=e.length;g<h;++g)l=e[g],yf(l,f)&&"ready"==l.ac&&(k=Qf(this,l.layer),k.Kc(a,l,b)&&d.push(l));e=a.size[0]*a.pixelRatio;f=a.size[1]*a.pixelRatio;if(this.b.width!=e||this.b.height!=f)this.b.width=
	e,this.b.height=f;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.b.width,this.b.height);g=0;for(h=d.length;g<h;++g)l=d[g],k=Qf(this,l.layer),k.Jc(a,l,b);this.i||(this.b.style.display="",this.i=!0);Of(a);1024<this.a.f-this.h&&a.postRenderFunctions.push(this.ld.bind(this));0!==this.l.b.length&&(a.postRenderFunctions.push(this.B),a.animate=!0);ck(this,"postcompose",a);Rf(this,a);a.postRenderFunctions.push(Pf)};
	n.fa=function(a,b,c,d,e,f){var g;if(this.f.isContextLost())return!1;var h=b.viewState,k=b.layerStatesArray,l;for(l=k.length-1;0<=l;--l){g=k[l];var m=g.layer;if(yf(g,h.resolution)&&e.call(f,m)&&(g=Qf(this,m).fa(a,b,c,d)))return g}};n.Fc=function(a,b,c,d){var e=!1;if(this.f.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var k=g[h],l=k.layer;if(yf(k,f.resolution)&&c.call(d,l)&&(e=Qf(this,l).Ec(a,b)))return!0}return e};var dk=["canvas","webgl","dom"];
	function Z(a){V.call(this);var b=ek(a);this.kb=void 0!==a.loadTilesWhileAnimating?a.loadTilesWhileAnimating:!1;this.Ab=void 0!==a.loadTilesWhileInteracting?a.loadTilesWhileInteracting:!1;this.Cb=void 0!==a.pixelRatio?a.pixelRatio:oe;this.Bb=b.logos;this.aa=function(){this.g=void 0;this.ve.call(this,Date.now())}.bind(this);this.Fa=Cf();this.zb=Cf();this.Ga=0;this.c=null;this.va=db();this.u=this.P=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(re?" ol-touch":"");this.a.style.position=
	"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.s=document.createElement("DIV");this.s.className="ol-overlaycontainer";this.a.appendChild(this.s);this.j=document.createElement("DIV");this.j.className="ol-overlaycontainer-stopevent";a=["click","dblclick","mousedown","touchstart","mspointerdown",of,"mousewheel","wheel"];for(var c=0,d=a.length;c<d;++c)R(this.j,a[c],Ea);this.a.appendChild(this.j);
	this.ma=new ff(this);for(var e in rf)R(this.ma,rf[e],this.wc,this);this.ba=b.keyboardEventTarget;this.i=null;R(this.a,"wheel",this.Sa,this);R(this.a,"mousewheel",this.Sa,this);this.v=b.controls;this.h=b.interactions;this.B=b.overlays;this.Sc={};this.N=new b.xe(this.a,this);this.W=null;this.D=[];this.na=[];this.wa=new Zf(this.qd.bind(this),this.Jd.bind(this));this.Eb={};R(this,La("layergroup"),this.vd,this);R(this,La("view"),this.Kd,this);R(this,La("size"),this.Gd,this);R(this,La("target"),this.Id,
	this);this.l(b.values);ed(this.v,function(a){a.setMap(this)},this);R(this.v,hd,function(a){a.element.setMap(this)},this);R(this.v,id,function(a){a.element.setMap(null)},this);ed(this.h,function(a){a.setMap(this)},this);R(this.h,hd,function(a){a.element.setMap(this)},this);R(this.h,id,function(a){a.element.setMap(null)},this);ed(this.B,this.ic,this);R(this.B,hd,function(a){this.ic(a.element)},this);R(this.B,id,function(a){var b=a.element.Pa();void 0!==b&&delete this.Sc[b.toString()];a.element.setMap(null)},
	this)}B(Z,V);n=Z.prototype;n.cd=function(a){this.v.push(a)};n.dd=function(a){this.h.push(a)};n.ed=function(a){fk(this).get("layers").push(a)};n.fd=function(a){this.B.push(a)};n.ic=function(a){var b=a.Pa();void 0!==b&&(this.Sc[b.toString()]=a);a.setMap(this)};n.oa=function(a){this.render();Array.prototype.push.apply(this.D,arguments)};
	n.R=function(){Da(this.ma);Da(this.N);ya(this.a,"wheel",this.Sa,this);ya(this.a,"mousewheel",this.Sa,this);void 0!==this.f&&(K.removeEventListener("resize",this.f,!1),this.f=void 0);this.g&&(K.cancelAnimationFrame(this.g),this.g=void 0);this.set("target",null);V.prototype.R.call(this)};n.od=function(a,b,c,d,e){if(this.c)return a=this.Ba(a),this.N.fa(a,this.c,b,void 0!==c?c:null,void 0!==d?d:yb,void 0!==e?e:null)};
	n.Md=function(a,b,c){if(!this.c)return!1;a=this.Ba(a);return this.N.Fc(a,this.c,void 0!==b?b:yb,void 0!==c?c:null)};n.uc=function(a){var b=this.a.getBoundingClientRect();a=a.changedTouches?a.changedTouches[0]:a;return[a.clientX-b.left,a.clientY-b.top]};n.Wb=function(){return this.get("target")};n.Ra=function(){var a=this.Wb();return void 0!==a?"string"===typeof a?document.getElementById(a):a:null};n.Ba=function(a){var b=this.c;return b?Hf(b.pixelToCoordinateTransform,a.slice()):null};
	function fk(a){return a.get("layergroup")}function ug(a,b){var c=a.c;return c?Hf(c.coordinateToPixelTransform,b.slice(0,2)):null}n.Ta=function(){return this.get("size")};n.U=function(){return this.get("view")};n.qd=function(a,b,c,d){var e=this.c;if(!(e&&b in e.wantedTiles&&e.wantedTiles[b][a.getKey()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};n.Sa=function(a,b){var c=new df(b||a.type,this,a);this.wc(c)};
	n.wc=function(a){if(this.c){this.W=a.coordinate;a.frameState=this.c;var b=this.h.a,c;if(!1!==U(this,a))for(c=b.length-1;0<=c;c--){var d=b[c];if(d.get("active")&&!d.handleEvent(a))break}}};
	n.Fd=function(){var a=this.c,b=this.wa;if(0!==b.b.length){var c=16,d=c;if(a){var e=a.viewHints;e[0]&&(c=this.kb?8:0,d=2);e[1]&&(c=this.Ab?8:0,d=2)}if(b.l<c){Yf(b);for(var e=0,f,g;b.l<c&&e<d&&0<b.b.length;)f=Vf(b)[0],g=f.getKey(),0!==f.T()||g in b.h||(b.h[g]=!0,++b.l,++e,f.load())}}b=this.na;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};n.Gd=function(){this.render()};
	n.Id=function(){var a;this.Wb()&&(a=this.Ra());if(this.i){for(var b=0,c=this.i.length;b<c;++b)M(this.i[b]);this.i=null}a?(a.appendChild(this.a),a=this.ba?this.ba:a,this.i=[R(a,"keydown",this.Sa,this),R(a,"keypress",this.Sa,this)],this.f||(this.f=this.yb.bind(this),K.addEventListener("resize",this.f,!1))):(Sd(this.a),void 0!==this.f&&(K.removeEventListener("resize",this.f,!1),this.f=void 0));this.yb()};n.Jd=function(){this.render()};n.Ld=function(){this.render()};
	n.Kd=function(){this.P&&(M(this.P),this.P=null);var a=this.U();a&&(this.P=R(a,"propertychange",this.Ld,this));this.render()};n.vd=function(){this.u&&(this.u.forEach(M),this.u=null);var a=fk(this);a&&(this.u=[R(a,"propertychange",this.render,this),R(a,"change",this.render,this)]);this.render()};n.we=function(){this.g&&K.cancelAnimationFrame(this.g);this.aa()};n.render=function(){void 0===this.g&&(this.g=K.requestAnimationFrame(this.aa))};n.se=function(a){return this.h.remove(a)};n.te=function(a){return fk(this).get("layers").remove(a)};
	n.ve=function(a){var b,c,d,e=this.Ta(),f=this.U(),g=db(),h=null;if(b=void 0!==e&&0<e[0]&&0<e[1]&&f)b=!!f.qa()&&void 0!==f.O();if(b){d=this.c?this.c.viewHints:void 0;void 0!==d?(d[0]=f.c[0],d[1]=f.c[1],h=d):h=f.c.slice();var k=fk(this).Pb(),l={};b=0;for(c=k.length;b<c;++b)l[J(k[b].layer)]=k[b];d=f.T();h={animate:!1,attributions:{},coordinateToPixelTransform:this.Fa,extent:g,focus:this.W?this.W:d.center,index:this.Ga++,layerStates:l,layerStatesArray:k,logos:pa({},this.Bb),pixelRatio:this.Cb,pixelToCoordinateTransform:this.zb,
	postRenderFunctions:[],size:e,skippedFeatureUids:this.Eb,tileQueue:this.wa,time:a,usedTiles:{},viewState:d,viewHints:h,wantedTiles:{}}}if(h){a=this.D;b=e=0;for(c=a.length;b<c;++b)f=a[b],f(this,h)&&(a[e++]=f);a.length=e;h.extent=ub(d.center,d.resolution,d.rotation,h.size,g)}this.c=h;this.N.vb(h);h&&(h.animate&&this.render(),Array.prototype.push.apply(this.na,h.postRenderFunctions),0!==this.D.length||h.viewHints[0]||h.viewHints[1]||lb(h.extent,this.va)||(U(this,new Td("moveend",this,h)),gb(h.extent,
	this.va)));U(this,new Td("postrender",this,h));d=g=this.Fd;this&&(d=ea(g,this));"function"!=ba()||aa.Window&&aa.Window.prototype&&!xd("Edge")&&aa.Window.prototype.setImmediate==aa.setImmediate?(fe||(fe=ge()),fe(d)):aa.setImmediate(d)};
	n.yb=function(){var a=this.Ra();if(a){var b=K.getComputedStyle(a);this.set("size",[a.offsetWidth-parseFloat(b.borderLeftWidth)-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderRightWidth),a.offsetHeight-parseFloat(b.borderTopWidth)-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderBottomWidth)])}else this.set("size",void 0)};
	function ek(a){var b=null;void 0!==a.keyboardEventTarget&&(b="string"===typeof a.keyboardEventTarget?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d={};if(void 0===a.logo||"boolean"===typeof a.logo&&a.logo)d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
	"http://openlayers.org/";else{var e=a.logo;"string"===typeof e?d[e]="":e instanceof HTMLElement?d[J(e).toString()]=e:e&&(L("string"==typeof e.href,44),L("string"==typeof e.src,45),d[e.src]=e.href)}e=a.layers instanceof Xg?a.layers:new Xg({layers:a.layers});c.layergroup=e;c.target=a.target;c.view=void 0!==a.view?a.view:new uc;var e=Nf,f;void 0!==a.renderer?Array.isArray(a.renderer)?f=a.renderer:"string"===typeof a.renderer?f=[a.renderer]:L(!1,46):f=dk;var g,h;g=0;for(h=f.length;g<h;++g){var k=f[g];
	if("canvas"==k){if(qe){e=Ri;break}}else if("dom"==k){e=Yi;break}else if("webgl"==k&&je){e=ak;break}}void 0!==a.controls?Array.isArray(a.controls)?f=new cd(a.controls.slice()):(L(a.controls instanceof cd,47),f=a.controls):f=ee();if(void 0!==a.interactions)Array.isArray(a.interactions)?g=new cd(a.interactions.slice()):(L(a.interactions instanceof cd,48),g=a.interactions);else{g={};h=new cd;k=new $f;(void 0!==g.altShiftDragRotate?g.altShiftDragRotate:1)&&h.push(new vg);(void 0!==g.doubleClickZoom?g.doubleClickZoom:
	1)&&h.push(new fg({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.dragPan?g.dragPan:1)&&h.push(new qg({kinetic:k}));(void 0!==g.pinchRotate?g.pinchRotate:1)&&h.push(new Pg);(void 0!==g.pinchZoom?g.pinchZoom:1)&&h.push(new Tg({duration:g.zoomDuration}));if(void 0!==g.keyboard?g.keyboard:1)h.push(new Jg),h.push(new Lg({delta:g.zoomDelta,duration:g.zoomDuration}));(void 0!==g.mouseWheelZoom?g.mouseWheelZoom:1)&&h.push(new Ng({duration:g.zoomDuration}));(void 0!==g.shiftDragZoom?g.shiftDragZoom:
	1)&&h.push(new Ig({duration:g.zoomDuration}));g=h}void 0!==a.overlays?Array.isArray(a.overlays)?a=new cd(a.overlays.slice()):(L(a.overlays instanceof cd,49),a=a.overlays):a=new cd;return{controls:f,interactions:g,keyboardEventTarget:b,logos:d,overlays:a,xe:e,values:c}}Ib(bh);Ib(ih);ih.forEach(function(a){bh.forEach(function(b){Jb(a,b,ch);Jb(b,a,dh)})});function gk(a){V.call(this);this.j=a.id;this.i=void 0!==a.insertFirst?a.insertFirst:!0;this.s=void 0!==a.stopEvent?a.stopEvent:!0;this.c=document.createElement("DIV");this.c.className="ol-overlay-container";this.c.style.position="absolute";this.autoPan=void 0!==a.autoPan?a.autoPan:!1;this.g=void 0!==a.autoPanAnimation?a.autoPanAnimation:{};this.h=void 0!==a.autoPanMargin?a.autoPanMargin:20;this.a={lb:"",sb:"",wb:"",xb:"",visible:!0};this.f=null;R(this,La("element"),this.td,this);R(this,La("map"),
	this.Ad,this);R(this,La("offset"),this.Bd,this);R(this,La("position"),this.Dd,this);R(this,La("positioning"),this.Ed,this);void 0!==a.element&&this.set("element",a.element);this.set("offset",void 0!==a.offset?a.offset:[0,0]);this.set("positioning",void 0!==a.positioning?a.positioning:"top-left");void 0!==a.position&&this.Ac(a.position)}B(gk,V);n=gk.prototype;n.Pa=function(){return this.j};n.td=function(){for(var a=this.c;a.lastChild;)a.removeChild(a.lastChild);(a=this.get("element"))&&this.c.appendChild(a)};
	n.Ad=function(){this.f&&(Sd(this.c),M(this.f),this.f=null);var a=this.get("map");a&&(this.f=R(a,"postrender",this.render,this),hk(this),a=this.s?a.j:a.s,this.i?a.insertBefore(this.c,a.childNodes[0]||null):a.appendChild(this.c))};n.render=function(){hk(this)};n.Bd=function(){hk(this)};
	n.Dd=function(){hk(this);if(void 0!==this.get("position")&&this.autoPan){var a=this.get("map");if(void 0!==a&&a.Ra()){var b=ik(a.Ra(),a.Ta()),c=this.get("element"),d=c.offsetWidth,e=c.currentStyle||K.getComputedStyle(c),d=d+(parseInt(e.marginLeft,10)+parseInt(e.marginRight,10)),e=c.offsetHeight,f=c.currentStyle||K.getComputedStyle(c),e=e+(parseInt(f.marginTop,10)+parseInt(f.marginBottom,10)),g=ik(c,[d,e]),c=this.h;hb(b,g)||(d=g[0]-b[0],e=b[2]-g[2],f=g[1]-b[1],g=b[3]-g[3],b=[0,0],0>d?b[0]=d-c:0>e&&
	(b[0]=Math.abs(e)+c),0>f?b[1]=f-c:0>g&&(b[1]=Math.abs(g)+c),0===b[0]&&0===b[1])||(c=a.U().qa(),d=ug(a,c),b=[d[0]+b[0],d[1]+b[1]],this.g&&(this.g.source=c,a.oa(Dc(this.g))),a.U().xa(a.Ba(b)))}}};n.Ed=function(){hk(this)};n.setMap=function(a){this.set("map",a)};n.Ac=function(a){this.set("position",a)};function ik(a,b){var c=a.getBoundingClientRect(),d=c.left+K.pageXOffset,c=c.top+K.pageYOffset;return[d,c,d+b[0],c+b[1]]}
	function jk(a,b){a.a.visible!==b&&(a.c.style.display=b?"":"none",a.a.visible=b)}
	function hk(a){var b=a.get("map"),c=a.get("position");if(void 0!==b&&b.c&&void 0!==c){var c=ug(b,c),d=b.Ta(),b=a.c.style,e=a.get("offset"),f=a.get("positioning"),g=e[0],e=e[1];if("bottom-right"==f||"center-right"==f||"top-right"==f)""!==a.a.sb&&(a.a.sb=b.left=""),g=Math.round(d[0]-c[0]-g)+"px",a.a.wb!=g&&(a.a.wb=b.right=g);else{""!==a.a.wb&&(a.a.wb=b.right="");if("bottom-center"==f||"center-center"==f||"top-center"==f)g-=a.c.offsetWidth/2;g=Math.round(c[0]+g)+"px";a.a.sb!=g&&(a.a.sb=b.left=g)}if("bottom-left"==
	f||"bottom-center"==f||"bottom-right"==f)""!==a.a.xb&&(a.a.xb=b.top=""),c=Math.round(d[1]-c[1]-e)+"px",a.a.lb!=c&&(a.a.lb=b.bottom=c);else{""!==a.a.lb&&(a.a.lb=b.bottom="");if("center-left"==f||"center-center"==f||"center-right"==f)e-=a.c.offsetHeight/2;c=Math.round(c[1]+e)+"px";a.a.xb!=c&&(a.a.xb=b.top=c)}jk(a,!0)}else jk(a,!1)};function kk(a){V.call(this);this.g=void 0;this.a="geometry";this.h=null;this.f=void 0;this.c=null;R(this,La(this.a),this.qb,this);void 0!==a&&(a instanceof Wb||!a?lk(this,a):this.l(a))}B(kk,V);n=kk.prototype;n.clone=function(){var a=new kk(this.Ea());mk(a,this.a);var b=this.S();b&&lk(a,b.clone());if(b=this.h)a.h=b,a.f=b?nk(b):void 0,a.w();return a};n.S=function(){return this.get(this.a)};n.Pa=function(){return this.g};n.ud=function(){this.w()};
	n.qb=function(){this.c&&(M(this.c),this.c=null);var a=this.S();a&&(this.c=R(a,"change",this.ud,this));this.w()};function lk(a,b){a.set(a.a,b)}function mk(a,b){ya(a,La(a.a),a.qb,a);a.a=b;R(a,La(a.a),a.qb,a);a.qb()}function nk(a){if("function"!==typeof a){var b;Array.isArray(a)?b=a:(L(a instanceof yh,41),b=[a]);a=function(){return b}}return a};function ok(a,b,c){return function(d,e,f){var g=new XMLHttpRequest;g.open("GET","function"===typeof a?a(d,e,f):a,!0);"arraybuffer"==b.$()&&(g.responseType="arraybuffer");g.onload=function(){if(!g.status||200<=g.status&&300>g.status){var a=b.$(),d;"json"==a||"text"==a?d=g.responseText:"xml"==a?(d=g.responseXML,d||(a=g.responseText,d=(new DOMParser).parseFromString(a,"application/xml"))):"arraybuffer"==a&&(d=g.response);d&&c.call(this,b.a(d,{featureProjection:f}),b.c(pk(d)))}}.bind(this);g.send()}}
	function qk(a,b){return ok(a,b,function(a){this.Gb(a)})};function rk(){this.defaultDataProjection=null}function sk(a,b,c){var d;c&&(d={dataProjection:c.dataProjection?c.dataProjection:a.c(pk(b)),featureProjection:c.featureProjection});var e;d&&(e={featureProjection:d.featureProjection,dataProjection:d.dataProjection?d.dataProjection:a.defaultDataProjection,rightHanded:d.rightHanded},d.decimals&&(e.decimals=d.decimals));return e}
	function tk(a,b){var c=b?Hb(b.featureProjection):null,d=b?Hb(b.dataProjection):null;if(c&&d&&!Tb(c,d))if(a instanceof Wb)c=a.transform(d,c);else{d=Ub(d,c);c=[a[0],a[1],a[0],a[3],a[2],a[1],a[2],a[3]];d(c,c,2);var e=[c[0],c[2],c[4],c[6]],f=[c[1],c[3],c[5],c[7]],c=Math.min.apply(null,e),d=Math.min.apply(null,f),e=Math.max.apply(null,e),f=Math.max.apply(null,f),c=ib(c,d,e,f,void 0)}else c=a;return c};function uk(){this.defaultDataProjection=null}B(uk,rk);function pk(a){return"string"===typeof a?(a=JSON.parse(a))?a:null:null!==a?a:null}uk.prototype.$=function(){return"json"};uk.prototype.g=function(a,b){return this.b(pk(a),sk(this,a,b))};uk.prototype.a=function(a,b){return this.h(pk(a),sk(this,a,b))};function vk(a,b,c,d,e){var f=NaN,g=NaN,h=(c-b)/d;if(0!==h)if(1==h)f=a[b],g=a[b+1];else if(2==h)f=.5*a[b]+.5*a[b+d],g=.5*a[b+1]+.5*a[b+d+1];else{var g=a[b],h=a[b+1],k=0,f=[0],l;for(l=b+d;l<c;l+=d){var m=a[l],p=a[l+1],k=k+Math.sqrt((m-g)*(m-g)+(p-h)*(p-h));f.push(k);g=m;h=p}c=.5*k;k=0;l=f.length;for(m=!1;k<l;)g=k+(l-k>>1),h=+Ma(f[g],c),0>h?k=g+1:(l=g,m=!h);g=m?k:~k;0>g?(c=(c-f[-g-2])/(f[-g-1]-f[-g-2]),b+=(-g-2)*d,f=a[b],f+=c*(a[b+d]-f),g=a[b+1],g+=c*(a[b+d+1]-g)):(f=a[b+g*d],g=a[b+g*d+1])}return e?
	(e[0]=f,e[1]=g,e):[f,g]};function wk(a,b){Yb.call(this);this.a=null;this.h=-1;this.ea(a,b)}B(wk,Yb);n=wk.prototype;n.clone=function(){var a=new wk(null);$b(a,this.c,this.o.slice());a.w();return a};n.za=function(){return ec(this.o,0,this.o.length,this.A)};function Nh(a){if(a.h!=a.b){var b;b=vk(a.o,0,a.o.length,a.A,a.a);a.a=b;a.h=a.b}return a.a}n.Qa=function(a){var b=[];b.length=gc(this.o,0,this.o.length,this.A,a,b,0);a=new wk(null);$b(a,"XY",b);a.w();return a};n.$=function(){return"LineString"};
	n.ea=function(a,b){a?(ac(this,b,a,1),this.o||(this.o=[]),this.o.length=cc(this.o,0,a,this.A)):$b(this,"XY",null);this.w()};function xk(a,b){Yb.call(this);this.ua=[];this.ea(a,b)}B(xk,Yb);n=xk.prototype;n.clone=function(){var a=new xk(null),b=this.ua.slice();$b(a,this.c,this.o.slice());a.ua=b;a.w();return a};n.za=function(){return fc(this.o,0,this.ua,this.A)};function Oh(a){var b=[],c=a.o,d=0,e=a.ua;a=a.A;var f,g;f=0;for(g=e.length;f<g;++f){var h=e[f],d=vk(c,d,h,a);Pa(b,d);d=h}return b}
	n.Qa=function(a){var b=[],c=[],d=this.o,e=this.ua,f=this.A,g=0,h=0,k,l;k=0;for(l=e.length;k<l;++k){var m=e[k],h=gc(d,g,m,f,a,b,h);c.push(h);g=m}b.length=h;a=new xk(null);$b(a,"XY",b);a.ua=c;a.w();return a};n.$=function(){return"MultiLineString"};n.ea=function(a,b){if(a){ac(this,b,a,2);this.o||(this.o=[]);var c=dc(this.o,0,a,this.A,this.ua);this.o.length=0===c.length?0:c[c.length-1]}else c=this.ua,$b(this,"XY",null),this.ua=c;this.w()};function yk(a,b){Yb.call(this);this.ea(a,b)}B(yk,Yb);yk.prototype.clone=function(){var a=new yk(null);$b(a,this.c,this.o.slice());a.w();return a};yk.prototype.za=function(){return ec(this.o,0,this.o.length,this.A)};yk.prototype.$=function(){return"MultiPoint"};yk.prototype.ea=function(a,b){a?(ac(this,b,a,1),this.o||(this.o=[]),this.o.length=cc(this.o,0,a,this.A)):$b(this,"XY",null);this.w()};function zk(a,b){Yb.call(this);this.a=[];this.v=-1;this.u=null;this.B=-1;this.h=null;this.ea(a,b)}B(zk,Yb);n=zk.prototype;n.clone=function(){for(var a=new zk(null),b=this.a.length,c=Array(b),d=0;d<b;++d)c[d]=this.a[d].slice();$b(a,this.c,this.o.slice());a.a=c;a.w();return a};n.za=function(a){var b;void 0!==a?(b=Ph(this).slice(),pc(b,this.a,this.A,a)):b=this.o;a=b;b=this.a;var c=this.A,d=0,e=[],f=0,g,h;g=0;for(h=b.length;g<h;++g){var k=b[g];e[f++]=fc(a,d,k,c,e[f]);d=k[k.length-1]}e.length=f;return e};
	function Qh(a){if(a.v!=a.b){var b=a.o,c=a.a,d=a.A,e=0,f=[],g,h,k;g=0;for(h=c.length;g<h;++g){var l=c[g];k=b;var m=l[0],p=d,q=jb(void 0);k=nb(q,k,e,m,p);f.push((k[0]+k[2])/2,(k[1]+k[3])/2);e=l[l.length-1]}b=Ph(a);c=a.a;d=a.A;g=0;h=[];l=0;for(k=c.length;l<k;++l)e=c[l],h=lc(b,g,e,d,f,2*l,h),g=e[e.length-1];a.u=h;a.v=a.b}return a.u}
	function Ph(a){if(a.B!=a.b){var b=a.o,c;a:{c=a.a;var d,e;d=0;for(e=c.length;d<e;++d)if(!nc(b,c[d],a.A,void 0)){c=!1;break a}c=!0}c?a.h=b:(a.h=b.slice(),a.h.length=pc(a.h,a.a,a.A));a.B=a.b}return a.h}n.Qa=function(a){var b=[],c=[],d=this.o,e=this.a,f=this.A;a=Math.sqrt(a);var g=0,h=0,k,l;k=0;for(l=e.length;k<l;++k){var m=e[k],p=[],h=hc(d,g,m,f,a,b,h,p);c.push(p);g=m[m.length-1]}b.length=h;d=new zk(null);$b(d,"XY",b);d.a=c;d.w();return d};n.$=function(){return"MultiPolygon"};
	n.ea=function(a,b){if(a){ac(this,b,a,3);this.o||(this.o=[]);var c=this.o,d=this.A,e=this.a,f=0,e=e?e:[],g=0,h,k;h=0;for(k=a.length;h<k;++h)f=dc(c,f,a[h],d,e[g]),e[g++]=f,f=f[f.length-1];e.length=g;0===e.length?this.o.length=0:(c=e[e.length-1],this.o.length=0===c.length?0:c[c.length-1])}else c=this.a,$b(this,"XY",null),this.a=c;this.w()};function Ak(a){a=a?a:{};this.defaultDataProjection=null;this.f=a.geometryName}B(Ak,uk);function Bk(a){var b="XY";!0===a.hasZ&&!0===a.hasM?b="XYZM":!0===a.hasZ?b="XYZ":!0===a.hasM&&(b="XYM");return b}
	var Ck={Point:function(a){return void 0!==a.m&&void 0!==a.z?new jc([a.x,a.y,a.z,a.m],"XYZM"):void 0!==a.z?new jc([a.x,a.y,a.z],"XYZ"):void 0!==a.m?new jc([a.x,a.y,a.m],"XYM"):new jc([a.x,a.y])},LineString:function(a){return new wk(a.paths[0],Bk(a))},Polygon:function(a){return new qc(a.rings,Bk(a))},MultiPoint:function(a){return new yk(a.points,Bk(a))},MultiLineString:function(a){return new xk(a.paths,Bk(a))},MultiPolygon:function(a){return new zk(a.rings,Bk(a))}};
	Ak.prototype.b=function(a,b){var c;if(c=a.geometry){var d;if("number"===typeof c.x&&"number"===typeof c.y)d="Point";else if(c.points)d="MultiPoint";else if(c.paths)d=1===c.paths.length?"LineString":"MultiLineString";else if(c.rings){var e=c.rings,f=Bk(c),g=[];d=[];var h,k;h=0;for(k=e.length;h<k;++h){var l=Oa(e[h]);mc(l,0,l.length,f.length)?g.push([e[h]]):d.push(e[h])}for(;d.length;){e=d.shift();f=!1;for(h=g.length-1;0<=h;h--)if(hb((new ic(g[h][0])).G(),(new ic(e)).G())){g[h].push(e);f=!0;break}f||
	g.push([e.reverse()])}c=pa({},c);1===g.length?(d="Polygon",c.rings=g[0]):(d="MultiPolygon",c.rings=g)}c=tk((0,Ck[d])(c),b)}else c=null;g=new kk;this.f&&mk(g,this.f);lk(g,c);b&&b.Tb&&a.attributes[b.Tb]&&(g.g=a.attributes[b.Tb],g.w());a.attributes&&g.l(a.attributes);return g};Ak.prototype.h=function(a,b){var c=b?b:{};if(a.features){var d=[],e=a.features,f,g;c.Tb=a.objectIdFieldName;f=0;for(g=e.length;f<g;++f)d.push(this.b(e[f],c));return d}return[this.b(a,c)]};
	Ak.prototype.c=function(a){return a.spatialReference&&a.spatialReference.wkid?Hb("EPSG:"+a.spatialReference.wkid):null};function Dk(a){Wb.call(this);this.a=a?a:null;Ek(this)}B(Dk,Wb);function Fk(a){var b,c;if(a.a)for(b=0,c=a.a.length;b<c;++b)ya(a.a[b],"change",a.w,a)}function Ek(a){var b,c;if(a.a)for(b=0,c=a.a.length;b<c;++b)R(a.a[b],"change",a.w,a)}n=Dk.prototype;n.clone=function(){var a=new Dk(null),b=this.a,c=[],d,e;d=0;for(e=b.length;d<e;++d)c.push(b[d].clone());Fk(a);a.a=c;Ek(a);a.w();return a};n.mb=function(a){jb(a);for(var b=this.a,c=0,d=b.length;c<d;++c)mb(a,b[c].G());return a};
	n.Rb=function(a){this.i!=this.b&&(qa(this.f),this.g=0,this.i=this.b);if(0>a||0!==this.g&&a<this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=[],d=this.a,e=!1,f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],k=h.Rb(a);c.push(k);k!==h&&(e=!0)}if(e)return a=new Dk(null),Fk(a),a.a=c,Ek(a),a.w(),this.f[b]=a;this.g=a;return this};n.$=function(){return"GeometryCollection"};n.rotate=function(a,b){for(var c=this.a,d=0,e=c.length;d<e;++d)c[d].rotate(a,b);this.w()};
	n.scale=function(a,b,c){c||(c=tb(this.G()));for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].scale(a,b,c);this.w()};n.Hb=function(a){var b=this.a,c,d;c=0;for(d=b.length;c<d;++c)b[c].Hb(a);this.w()};n.translate=function(a,b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)c[d].translate(a,b);this.w()};n.R=function(){Fk(this);Wb.prototype.R.call(this)};function Gk(a){a=a?a:{};this.defaultDataProjection=null;this.defaultDataProjection=Hb(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326");this.f=a.geometryName}B(Gk,uk);function Hk(a,b){return a?tk((0,Ik[a.type])(a),b):null}
	var Ik={Point:function(a){return new jc(a.coordinates)},LineString:function(a){return new wk(a.coordinates)},Polygon:function(a){return new qc(a.coordinates)},MultiPoint:function(a){return new yk(a.coordinates)},MultiLineString:function(a){return new xk(a.coordinates)},MultiPolygon:function(a){return new zk(a.coordinates)},GeometryCollection:function(a,b){var c=a.geometries.map(function(a){return Hk(a,b)});return new Dk(c)}};
	Gk.prototype.b=function(a,b){var c=Hk(a.geometry,b),d=new kk;this.f&&mk(d,this.f);lk(d,c);void 0!==a.id&&(d.g=a.id,d.w());a.properties&&d.l(a.properties);return d};Gk.prototype.h=function(a,b){var c;if("Feature"==a.type)c=[this.b(a,b)];else if("FeatureCollection"==a.type){c=[];var d=a.features,e,f;e=0;for(f=d.length;e<f;++e)c.push(this.b(d[e],b))}else L(!1,35);return c};
	Gk.prototype.c=function(a){a=a.crs;var b;a?"name"==a.type?b=Hb(a.properties.name):"EPSG"==a.type?b=Hb("EPSG:"+a.properties.code):L(!1,36):b=this.defaultDataProjection;return b};function Jk(a,b,c,d,e,f){Ga.call(this);this.l=null;this.b=a?a:new Image;null!==d&&(this.b.crossOrigin=d);this.f=f?document.createElement("CANVAS"):null;this.h=f;this.g=null;this.c=e;this.a=c;this.s=b;this.i=!1;2==this.c&&Kk(this)}B(Jk,Ga);function Kk(a){var b=Md(1,1);try{b.drawImage(a.b,0,0),b.getImageData(0,0,1,1)}catch(c){a.i=!0}}Jk.prototype.j=function(){this.c=3;this.g.forEach(M);this.g=null;U(this,"change")};
	Jk.prototype.v=function(){this.c=2;this.a&&(this.b.width=this.a[0],this.b.height=this.a[1]);this.a=[this.b.width,this.b.height];this.g.forEach(M);this.g=null;Kk(this);if(!this.i&&null!==this.h){this.f.width=this.b.width;this.f.height=this.b.height;var a=this.f.getContext("2d");a.drawImage(this.b,0,0);for(var b=a.getImageData(0,0,this.b.width,this.b.height),c=b.data,d=this.h[0]/255,e=this.h[1]/255,f=this.h[2]/255,g=0,h=c.length;g<h;g+=4)c[g]*=d,c[g+1]*=e,c[g+2]*=f;a.putImageData(b,0,0)}U(this,"change")};
	Jk.prototype.Z=function(){return this.f?this.f:this.b};Jk.prototype.load=function(){if(0==this.c){this.c=1;this.g=[R(this.b,"error",this.j,this,!0),R(this.b,"load",this.v,this,!0)];try{this.b.src=this.s}catch(a){this.j()}}};function Lk(a){a=a||{};this.g=void 0!==a.anchor?a.anchor:[.5,.5];this.f=null;this.a=void 0!==a.anchorOrigin?a.anchorOrigin:"top-left";this.l=void 0!==a.anchorXUnits?a.anchorXUnits:"fraction";this.i=void 0!==a.anchorYUnits?a.anchorYUnits:"fraction";var b=void 0!==a.crossOrigin?a.crossOrigin:null,c=void 0!==a.img?a.img:null,d=void 0!==a.imgSize?a.imgSize:null,e=a.src;L(!(void 0!==e&&c),4);L(!c||c&&d,5);void 0!==e&&0!==e.length||!c||(e=c.src||J(c).toString());L(void 0!==e&&0<e.length,6);var f=void 0!==
	a.src?0:2,g;void 0!==a.color?(g=a.color,g=Array.isArray(g)?g:pd(g)):g=null;var h=Af.get(e,b,g);h||(h=new Jk(c,e,d,b,f,g),Af.set(e,b,g,h));this.b=h;this.u=void 0!==a.offset?a.offset:[0,0];this.c=void 0!==a.offsetOrigin?a.offsetOrigin:"top-left";this.h=null;this.j=void 0!==a.size?a.size:null;oh.call(this,{opacity:void 0!==a.opacity?a.opacity:1,rotation:void 0!==a.rotation?a.rotation:0,scale:void 0!==a.scale?a.scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0,rotateWithView:void 0!==a.rotateWithView?
	a.rotateWithView:!1})}B(Lk,oh);n=Lk.prototype;n.eb=function(){if(this.f)return this.f;var a=this.g,b=this.Ka();if("fraction"==this.l||"fraction"==this.i){if(!b)return null;a=this.g.slice();"fraction"==this.l&&(a[0]*=b[0]);"fraction"==this.i&&(a[1]*=b[1])}if("top-left"!=this.a){if(!b)return null;a===this.g&&(a=this.g.slice());if("top-right"==this.a||"bottom-right"==this.a)a[0]=-a[0]+b[0];if("bottom-left"==this.a||"bottom-right"==this.a)a[1]=-a[1]+b[1]}return this.f=a};n.Z=function(a){return this.b.Z(a)};
	n.Ob=function(){return this.b.a};n.ib=function(){return this.b.c};n.ub=function(){var a=this.b;if(!a.l)if(a.i){var b=a.a[0],c=a.a[1],d=Md(b,c);d.fillRect(0,0,b,c);a.l=d.canvas}else a.l=a.b;return a.l};n.pa=function(){if(this.h)return this.h;var a=this.u;if("top-left"!=this.c){var b=this.Ka(),c=this.b.a;if(!b||!c)return null;a=a.slice();if("top-right"==this.c||"bottom-right"==this.c)a[0]=c[0]-b[0]-a[0];if("bottom-left"==this.c||"bottom-right"==this.c)a[1]=c[1]-b[1]-a[1]}return this.h=a};
	n.Ka=function(){return this.j?this.j:this.b.a};n.Vb=function(a,b){return R(this.b,"change",a,b)};n.load=function(){this.b.load()};n.bc=function(a,b){ya(this.b,"change",a,b)};function Mk(a,b,c){Yb.call(this);Nk(this,a,b?b:0,c)}B(Mk,Yb);Mk.prototype.clone=function(){var a=new Mk(null);$b(a,this.c,this.o.slice());a.w();return a};Mk.prototype.mb=function(a){var b=this.o,c=b[this.A]-b[0];return ib(b[0]-c,b[1]-c,b[0]+c,b[1]+c,a)};Mk.prototype.$=function(){return"Circle"};function Nk(a,b,c,d){if(b){ac(a,d,b,0);a.o||(a.o=[]);d=a.o;b=bc(d,b);d[b++]=d[0]+c;var e;c=1;for(e=a.A;c<e;++c)d[b++]=d[c];d.length=b}else $b(a,"XY",null);a.w()};function Ok(a,b,c,d,e){Sf.call(this,a,b);this.g=c;this.a=new Image;null!==d&&(this.a.crossOrigin=d);this.c={};this.f=null;this.h=e}B(Ok,Sf);n=Ok.prototype;n.R=function(){1==this.state&&Pk(this);this.b&&Da(this.b);this.state=5;Tf(this);Sf.prototype.R.call(this)};n.Z=function(a){if(void 0!==a){var b=J(a);if(b in this.c)return this.c[b];a=sa(this.c)?this.a:this.a.cloneNode(!1);return this.c[b]=a}return this.a};n.getKey=function(){return this.g};n.ce=function(){this.state=3;Pk(this);Tf(this)};
	n.de=function(){this.state=this.a.naturalWidth&&this.a.naturalHeight?2:4;Pk(this);Tf(this)};n.load=function(){if(0==this.state||3==this.state)this.state=1,Tf(this),this.f=[R(this.a,"error",this.ce,this,!0),R(this.a,"load",this.de,this,!0)],this.h(this,this.g)};function Pk(a){a.f.forEach(M);a.f=null};function Qk(){return[[-Infinity,-Infinity,Infinity,Infinity]]};var Rk;
	(function(){var a={},b={Aa:a};(function(c){if("object"===typeof a&&"undefined"!==typeof b)b.Aa=c();else{var d;"undefined"!==typeof window?d=window:"undefined"!==typeof global?d=global:"undefined"!==typeof self?d=self:d=this;d.Re=c()}})(function(){return function d(a,b,g){function h(l,p){if(!b[l]){if(!a[l]){var q="function"==typeof require&&require;if(!p&&q)return require(l,!0);if(k)return k(l,!0);q=Error("Cannot find module '"+l+"'");throw q.code="MODULE_NOT_FOUND",q;}q=b[l]={Aa:{}};a[l][0].call(q.Aa,function(b){var d=
	a[l][1][b];return h(d?d:b)},q,q.Aa,d,a,b,g)}return b[l].Aa}for(var k="function"==typeof require&&require,l=0;l<g.length;l++)h(g[l]);return h}({1:[function(a,b){function f(a,b){if(!(this instanceof f))return new f(a,b);this.Db=Math.max(4,a||9);this.gc=Math.max(2,Math.ceil(.4*this.Db));b&&this.ad(b);this.clear()}function g(a,b){h(a,0,a.children.length,b,a)}function h(a,b,d,e,g){g||(g=r(null));g.H=Infinity;g.J=Infinity;g.I=-Infinity;g.L=-Infinity;for(var f;b<d;b++)f=a.children[b],k(g,a.ga?e(f):f);return g}
	function k(a,b){a.H=Math.min(a.H,b.H);a.J=Math.min(a.J,b.J);a.I=Math.max(a.I,b.I);a.L=Math.max(a.L,b.L)}function l(a,b){return a.H-b.H}function m(a,b){return a.J-b.J}function p(a){return(a.I-a.H)*(a.L-a.J)}function q(a){return a.I-a.H+(a.L-a.J)}function u(a,b){return a.H<=b.H&&a.J<=b.J&&b.I<=a.I&&b.L<=a.L}function w(a,b){return b.H<=a.I&&b.J<=a.L&&b.I>=a.H&&b.L>=a.J}function r(a){return{children:a,height:1,ga:!0,H:Infinity,J:Infinity,I:-Infinity,L:-Infinity}}function x(a,b,d,e,g){for(var f=[b,d],
	h;f.length;)d=f.pop(),b=f.pop(),d-b<=e||(h=b+Math.ceil((d-b)/e/2)*e,D(a,h,b,d,g),f.push(b,h,h,d))}b.Aa=f;var D=a("quickselect");f.prototype={all:function(){return this.cc(this.data,[])},search:function(a){var b=this.data,d=[],e=this.la;if(!w(a,b))return d;for(var g=[],f,h,k,l;b;){f=0;for(h=b.children.length;f<h;f++)k=b.children[f],l=b.ga?e(k):k,w(a,l)&&(b.ga?d.push(k):u(a,l)?this.cc(k,d):g.push(k));b=g.pop()}return d},load:function(a){if(!a||!a.length)return this;if(a.length<this.gc){for(var b=0,
	d=a.length;b<d;b++)this.Ha(a[b]);return this}a=this.ec(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.hc(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.fc(a,this.data.height-a.height-1,!0)):this.data=a;return this},Ha:function(a){a&&this.fc(a,this.data.height-1);return this},clear:function(){this.data=r([]);return this},remove:function(a,b){if(!a)return this;for(var d=this.data,e=this.la(a),g=[],f=[],h,k,l,m;d||g.length;){d||(d=g.pop(),
	k=g[g.length-1],h=f.pop(),m=!0);if(d.ga){a:{l=a;var p=d.children,q=b;if(q){for(var r=0;r<p.length;r++)if(q(l,p[r])){l=r;break a}l=-1}else l=p.indexOf(l)}if(-1!==l){d.children.splice(l,1);g.push(d);this.$c(g);break}}m||d.ga||!u(d,e)?k?(h++,d=k.children[h],m=!1):d=null:(g.push(d),f.push(h),h=0,k=d,d=d.children[0])}return this},la:function(a){return a},Kb:l,Lb:m,toJSON:function(){return this.data},cc:function(a,b){for(var d=[];a;)a.ga?b.push.apply(b,a.children):d.push.apply(d,a.children),a=d.pop();return b},
	ec:function(a,b,d,e){var f=d-b+1,h=this.Db,k;if(f<=h)return k=r(a.slice(b,d+1)),g(k,this.la),k;e||(e=Math.ceil(Math.log(f)/Math.log(h)),h=Math.ceil(f/Math.pow(h,e-1)));k=r([]);k.ga=!1;k.height=e;var f=Math.ceil(f/h),h=f*Math.ceil(Math.sqrt(h)),l,m,p;for(x(a,b,d,h,this.Kb);b<=d;b+=h)for(m=Math.min(b+h-1,d),x(a,b,m,f,this.Lb),l=b;l<=m;l+=f)p=Math.min(l+f-1,m),k.children.push(this.ec(a,l,p,e-1));g(k,this.la);return k},Zc:function(a,b,d,e){for(var f,g,h,k,l,m,q,r;;){e.push(b);if(b.ga||e.length-1===d)break;
	q=r=Infinity;f=0;for(g=b.children.length;f<g;f++)h=b.children[f],l=p(h),m=(Math.max(h.I,a.I)-Math.min(h.H,a.H))*(Math.max(h.L,a.L)-Math.min(h.J,a.J))-l,m<r?(r=m,q=l<q?l:q,k=h):m===r&&l<q&&(q=l,k=h);b=k||b.children[0]}return b},fc:function(a,b,d){var e=this.la;d=d?a:e(a);var e=[],f=this.Zc(d,this.data,b,e);f.children.push(a);for(k(f,d);0<=b;)if(e[b].children.length>this.Db)this.bd(e,b),b--;else break;this.Wc(d,e,b)},bd:function(a,b){var d=a[b],e=d.children.length,f=this.gc;this.Xc(d,f,e);e=this.Yc(d,
	f,e);e=r(d.children.splice(e,d.children.length-e));e.height=d.height;e.ga=d.ga;g(d,this.la);g(e,this.la);b?a[b-1].children.push(e):this.hc(d,e)},hc:function(a,b){this.data=r([a,b]);this.data.height=a.height+1;this.data.ga=!1;g(this.data,this.la)},Yc:function(a,b,d){var e,f,g,k,l,m,q;l=m=Infinity;for(e=b;e<=d-b;e++)f=h(a,0,e,this.la),g=h(a,e,d,this.la),k=Math.max(0,Math.min(f.I,g.I)-Math.max(f.H,g.H))*Math.max(0,Math.min(f.L,g.L)-Math.max(f.J,g.J)),f=p(f)+p(g),k<l?(l=k,q=e,m=f<m?f:m):k===l&&f<m&&(m=
	f,q=e);return q},Xc:function(a,b,d){var e=a.ga?this.Kb:l,f=a.ga?this.Lb:m,g=this.dc(a,b,d,e);b=this.dc(a,b,d,f);g<b&&a.children.sort(e)},dc:function(a,b,d,e){a.children.sort(e);e=this.la;var f=h(a,0,b,e),g=h(a,d-b,d,e),l=q(f)+q(g),m,p;for(m=b;m<d-b;m++)p=a.children[m],k(f,a.ga?e(p):p),l+=q(f);for(m=d-b-1;m>=b;m--)p=a.children[m],k(g,a.ga?e(p):p),l+=q(g);return l},Wc:function(a,b,d){for(;0<=d;d--)k(b[d],a)},$c:function(a){for(var b=a.length-1,d;0<=b;b--)0===a[b].children.length?0<b?(d=a[b-1].children,
	d.splice(d.indexOf(a[b]),1)):this.clear():g(a[b],this.la)},ad:function(a){var b=["return a"," - b",";"];this.Kb=new Function("a","b",b.join(a[0]));this.Lb=new Function("a","b",b.join(a[1]));this.la=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}}},{quickselect:2}],2:[function(a,b){function f(a,b,d,e,q){d=d||0;e=e||a.length-1;for(q=q||h;e>d;){if(600<e-d){var u=e-d+1,w=b-d+1,r=Math.log(u),x=.5*Math.exp(2*r/3),r=.5*Math.sqrt(r*x*(u-x)/u)*(0>w-u/2?-1:
	1);f(a,b,Math.max(d,Math.floor(b-w*x/u+r)),Math.min(e,Math.floor(b+(u-w)*x/u+r)),q)}u=a[b];w=d;x=e;g(a,d,b);for(0<q(a[e],u)&&g(a,d,e);w<x;){g(a,w,x);w++;for(x--;0>q(a[w],u);)w++;for(;0<q(a[x],u);)x--}0===q(a[d],u)?g(a,d,x):(x++,g(a,x,e));x<=b&&(d=x+1);b<=x&&(e=x-1)}}function g(a,b,d){var e=a[b];a[b]=a[d];a[d]=e}function h(a,b){return a<b?-1:a>b?1:0}b.Aa=f},{}]},{},[1])(1)});Rk=b.Aa})();function Sk(a){this.b=Rk(a);this.a={}}n=Sk.prototype;n.Ha=function(a,b){var c={H:a[0],J:a[1],I:a[2],L:a[3],value:b};this.b.Ha(c);this.a[J(b)]=c};n.load=function(a,b){for(var c=Array(b.length),d=0,e=b.length;d<e;d++){var f=a[d],g=b[d],f={H:f[0],J:f[1],I:f[2],L:f[3],value:g};c[d]=f;this.a[J(g)]=f}this.b.load(c)};n.remove=function(a){a=J(a);var b=this.a[a];delete this.a[a];return null!==this.b.remove(b)};function Tk(a){return a.b.all().map(function(a){return a.value})}
	function Uk(a,b){return a.b.search({H:b[0],J:b[1],I:b[2],L:b[3]}).map(function(a){return a.value})}function Vk(a,b,c,d){return Wk(Uk(a,b),c,d)}function Wk(a,b,c){for(var d,e=0,f=a.length;e<f&&!(d=b.call(c,a[e]));e++);return d}n.clear=function(){this.b.clear();this.a={}};n.G=function(){var a=this.b.data;return[a.H,a.J,a.I,a.L]};function Xk(a){a=a||{};vf.call(this,{attributions:a.attributions,logo:a.logo,projection:void 0,state:"ready",wrapX:void 0!==a.wrapX?a.wrapX:!0});this.j=I;this.s=a.format;this.u=void 0==a.overlaps?!0:a.overlaps;this.B=a.url;void 0!==a.loader?this.j=a.loader:void 0!==this.B&&(L(this.s,7),this.j=qk(this.B,this.s));this.W=void 0!==a.strategy?a.strategy:Qk;var b=void 0!==a.useSpatialIndex?a.useSpatialIndex:!0;this.X=b?new Sk:null;this.v=new Sk;this.ka={};this.c={};this.f={};this.g={};this.a=null;var c,
	d;a.features instanceof cd?(c=a.features,d=c.a):Array.isArray(a.features)&&(d=a.features);b||void 0!==c||(c=new cd(d));void 0!==d&&Yk(this,d);void 0!==c&&Zk(this,c)}B(Xk,vf);n=Xk.prototype;n.Fb=function(a){var b=J(a).toString();if($k(this,b,a)){al(this,b,a);var c=a.S();c?(b=c.G(),this.X&&this.X.Ha(b,a)):this.ka[b]=a;U(this,new bl("addfeature",a))}this.w()};function al(a,b,c){a.g[b]=[R(c,"change",a.vc,a),R(c,"propertychange",a.vc,a)]}
	function $k(a,b,c){var d=!0,e=c.Pa();void 0!==e?e.toString()in a.c?d=!1:a.c[e.toString()]=c:(L(!(b in a.f),30),a.f[b]=c);return d}n.Gb=function(a){Yk(this,a);this.w()};function Yk(a,b){var c,d,e,f,g=[],h=[],k=[];d=0;for(e=b.length;d<e;d++)f=b[d],c=J(f).toString(),$k(a,c,f)&&h.push(f);d=0;for(e=h.length;d<e;d++){f=h[d];c=J(f).toString();al(a,c,f);var l=f.S();l?(c=l.G(),g.push(c),k.push(f)):a.ka[c]=f}a.X&&a.X.load(g,k);d=0;for(e=h.length;d<e;d++)U(a,new bl("addfeature",h[d]))}
	function Zk(a,b){var c=!1;R(a,"addfeature",function(a){c||(c=!0,b.push(a.feature),c=!1)});R(a,"removefeature",function(a){c||(c=!0,b.remove(a.feature),c=!1)});R(b,hd,function(a){c||(c=!0,this.Fb(a.element),c=!1)},a);R(b,id,function(a){if(!c){c=!0;a=a.element;var b=J(a).toString();b in this.ka?delete this.ka[b]:this.X&&this.X.remove(a);this.Zb(a);this.w();c=!1}},a);a.a=b}
	n.clear=function(a){if(a){for(var b in this.g)this.g[b].forEach(M);this.a||(this.g={},this.c={},this.f={})}else if(this.X){a=this.Zb;Wk(Tk(this.X),a,this);for(var c in this.ka)this.Zb(this.ka[c])}this.a&&this.a.clear();this.X&&this.X.clear();this.v.clear();this.ka={};U(this,new bl("clear"));this.w()};n.nd=function(a,b){if(this.X)return Wk(Tk(this.X),a,b);if(this.a)return ed(this.a,a,b)};function Qi(a,b,c,d){a.X?Vk(a.X,b,c,d):a.a&&ed(a.a,c,d)}
	n.pd=function(){var a;this.a?a=this.a.a:this.X&&(a=Tk(this.X),sa(this.ka)||Pa(a,ra(this.ka)));return a};n.G=function(){return this.X.G()};
	n.vc=function(a){a=a.target;var b=J(a).toString(),c=a.S();if(c)if(c=c.G(),b in this.ka)delete this.ka[b],this.X&&this.X.Ha(c,a);else{if(this.X){var d=this.X,e=d.a[J(a)];lb([e.H,e.J,e.I,e.L],c)||(d.remove(a),d.Ha(c,a))}}else b in this.ka||(this.X&&this.X.remove(a),this.ka[b]=a);c=a.Pa();void 0!==c?(c=c.toString(),b in this.f?(delete this.f[b],this.c[c]=a):this.c[c]!==a&&(cl(this,a),this.c[c]=a)):b in this.f||(cl(this,a),this.f[b]=a);this.w();U(this,new bl("changefeature",a))};
	function Pi(a,b,c,d){var e=a.v;b=a.W(b,c);var f,g;f=0;for(g=b.length;f<g;++f){var h=b[f];Vk(e,h,function(a){return hb(a.extent,h)})||(a.j.call(a,h,c,d),e.Ha(h,{extent:h.slice()}))}}n.Zb=function(a){var b=J(a).toString();this.g[b].forEach(M);delete this.g[b];var c=a.Pa();void 0!==c?delete this.c[c.toString()]:delete this.f[b];U(this,new bl("removefeature",a))};function cl(a,b){for(var c in a.c)if(a.c[c]===b){delete a.c[c];break}}function bl(a,b){T.call(this,a);this.feature=b}B(bl,T);function dl(a,b){T.call(this,a);this.feature=b}B(dl,T);
	function el(a){ng.call(this,{handleDownEvent:fl,handleEvent:gl,handleUpEvent:hl});this.W=null;this.s=!1;this.Ga=a.source?a.source:null;this.ma=a.features?a.features:null;this.jd=a.snapTolerance?a.snapTolerance:12;this.P=a.type;this.c=il(this.P);this.wa=a.minPoints?a.minPoints:this.c===jl?3:2;this.va=a.maxPoints?a.maxPoints:Infinity;this.Ab=a.finishCondition?a.finishCondition:yb;var b=a.geometryFunction;if(!b)if("Circle"===this.P)b=function(a,b){var c=b?b:new Mk([NaN,NaN]),g=a[0],h=a[1],k=g[0]-h[0],
	g=g[1]-h[1];Nk(c,a[0],Math.sqrt(k*k+g*g));return c};else{var c,b=this.c;b===kl?c=jc:b===ll?c=wk:b===jl&&(c=qc);b=function(a,b){var f=b;f?f.ea(a):f=new c(a);return f}}this.u=b;this.D=this.i=this.a=this.j=this.g=this.h=null;this.kd=a.clickTolerance?a.clickTolerance*a.clickTolerance:36;this.ba=new Y({source:new Xk({useSpatialIndex:!1,wrapX:a.wrapX?a.wrapX:!1}),style:a.style?a.style:ml()});this.Fa=a.geometryName;this.gd=a.condition?a.condition:jg;this.na=a.freehandCondition?a.freehandCondition:kg;R(this,
	La("active"),this.kb,this)}B(el,ng);function ml(){var a=Eh();return function(b){return a[b.S().$()]}}el.prototype.setMap=function(a){ng.prototype.setMap.call(this,a);this.kb()};function gl(a){this.c!==ll&&this.c!==jl||!this.na(a)||(this.s=!0);var b=!this.s;this.s&&a.type===qf?(nl(this,a),b=!1):a.type===pf?b=pl(this,a):a.type===jf&&(b=!1);return og.call(this,a)&&b}function fl(a){return this.gd(a)?(this.W=a.pixel,!0):this.s?(this.W=a.pixel,this.h||ql(this,a),!0):!1}
	function hl(a){this.s=!1;var b=this.W,c=a.pixel,d=b[0]-c[0],b=b[1]-c[1],c=!0;d*d+b*b<=this.kd&&(pl(this,a),this.h?this.c===rl?sl(this):tl(this,a)?this.Ab(a)&&sl(this):nl(this,a):(ql(this,a),this.c===kl&&sl(this)),c=!1);return c}
	function pl(a,b){if(a.h){var c=b.coordinate,d=a.g.S(),e;a.c===kl?e=a.a:a.c===jl?(e=a.a[0],e=e[e.length-1],tl(a,b)&&(c=a.h.slice())):(e=a.a,e=e[e.length-1]);e[0]=c[0];e[1]=c[1];a.u(a.a,d);a.j&&a.j.S().ea(c);d instanceof qc&&a.c!==jl?(a.i||(a.i=new kk(new wk(null))),0>=d.ja.length?d=null:(c=new ic(null),$b(c,d.c,d.o.slice(0,d.ja[0])),c.w(),d=c),c=a.i.S(),$b(c,d.c,d.o),c.w()):a.D&&(c=a.i.S(),c.ea(a.D));ul(a)}else d=b.coordinate.slice(),a.j?a.j.S().ea(d):(a.j=new kk(new jc(d)),ul(a));return!0}
	function tl(a,b){var c=!1;if(a.g){var d=!1,e=[a.h];a.c===ll?d=a.a.length>a.wa:a.c===jl&&(d=a.a[0].length>a.wa,e=[a.a[0][0],a.a[0][a.a[0].length-2]]);if(d)for(var d=b.map,f=0,g=e.length;f<g;f++){var h=e[f],k=ug(d,h),l=b.pixel,c=l[0]-k[0],k=l[1]-k[1],l=a.s&&a.na(b)?1:a.jd;if(c=Math.sqrt(c*c+k*k)<=l){a.h=h;break}}}return c}
	function ql(a,b){var c=b.coordinate;a.h=c;a.c===kl?a.a=c.slice():a.c===jl?(a.a=[[c.slice(),c.slice()]],a.D=a.a[0]):(a.a=[c.slice(),c.slice()],a.c===rl&&(a.D=a.a));a.D&&(a.i=new kk(new wk(a.D)));c=a.u(a.a);a.g=new kk;a.Fa&&mk(a.g,a.Fa);lk(a.g,c);ul(a);U(a,new dl("drawstart",a.g))}
	function nl(a,b){var c=b.coordinate,d=a.g.S(),e,f;if(a.c===ll)a.h=c.slice(),f=a.a,f.push(c.slice()),e=f.length>a.va,a.u(f,d);else if(a.c===jl){f=a.a[0];f.push(c.slice());if(e=f.length>a.va)a.h=f[0];a.u(a.a,d)}ul(a);e&&sl(a)}
	function sl(a){var b=vl(a),c=a.a,d=b.S();a.c===ll?(c.pop(),a.u(c,d)):a.c===jl&&(c[0].pop(),c[0].push(c[0][0]),a.u(c,d));"MultiPoint"===a.P?lk(b,new yk([c])):"MultiLineString"===a.P?lk(b,new xk([c])):"MultiPolygon"===a.P&&lk(b,new zk([c]));U(a,new dl("drawend",b));a.ma&&a.ma.push(b);a.Ga&&a.Ga.Fb(b)}function vl(a){a.h=null;var b=a.g;b&&(a.g=null,a.j=null,a.i=null,a.ba.da().clear(!0));return b}el.prototype.B=zb;
	function ul(a){var b=[];a.g&&b.push(a.g);a.i&&b.push(a.i);a.j&&b.push(a.j);a=a.ba.da();a.clear(!0);a.Gb(b)}el.prototype.kb=function(){var a=this.aa,b=this.get("active");a&&b||vl(this);this.ba.setMap(b?a:null)};function il(a){var b;"Point"===a||"MultiPoint"===a?b=kl:"LineString"===a||"MultiLineString"===a?b=ll:"Polygon"===a||"MultiPolygon"===a?b=jl:"Circle"===a&&(b=rl);return b}var kl="Point",ll="LineString",jl="Polygon",rl="Circle";function wl(a,b,c,d,e,f,g,h,k,l,m){Sf.call(this,e,0);this.u=void 0!==m?m:!1;this.v=g;this.s=h;this.f=null;this.c={};this.g=b;this.l=d;this.i=f?f:e;this.a=[];this.Va=null;this.h=0;f=Qc(d,this.i);h=this.l.G();e=this.g.G();f=h?vb(f,h):f;if(0===ob(f))this.state=4;else if((h=a.G())&&(e?e=vb(e,h):e=h),h=d.O(this.i[0]),m=tb(f),d=Ub(c,a)(m,void 0,m.length),h=c.getPointResolution(h,m),m=Lb(c),void 0!==m&&(h*=m),m=Lb(a),void 0!==m&&(h/=m),d=a.getPointResolution(h,d)/h,isFinite(d)&&0<d&&(h/=d),d=h,!isFinite(d)||
	0>=d)this.state=4;else if(this.j=new Ji(a,c,f,e,d*(void 0!==l?l:.5)),0===this.j.f.length)this.state=4;else if(this.h=Xc(b,d),c=Li(this.j),e&&(a.b?(c[1]=ia(c[1],e[1],e[3]),c[3]=ia(c[3],e[1],e[3])):c=vb(c,e)),ob(c)){a=Rc(b,c,this.h);for(b=a.H;b<=a.I;b++)for(c=a.J;c<=a.L;c++)(l=k(this.h,b,c,g))&&this.a.push(l);0===this.a.length&&(this.state=4)}else this.state=4}B(wl,Sf);wl.prototype.R=function(){1==this.state&&(this.Va.forEach(M),this.Va=null);Sf.prototype.R.call(this)};
	wl.prototype.Z=function(a){if(void 0!==a){var b=J(a);if(b in this.c)return this.c[b];a=sa(this.c)?this.f:this.f.cloneNode(!1);return this.c[b]=a}return this.f};
	wl.prototype.Tc=function(){var a=[];this.a.forEach(function(b){b&&2==b.T()&&a.push({extent:Qc(this.g,b.V),image:b.Z()})},this);this.a.length=0;if(0===a.length)this.state=3;else{var b=this.i[0],c=Wc(this.l,b),d="number"===typeof c?c:c[0],c="number"===typeof c?c:c[1],b=this.l.O(b),e=this.g.O(this.h),f=Qc(this.l,this.i);this.f=Ii(d,c,this.v,e,this.g.G(),b,f,this.j,a,this.s,this.u);this.state=2}Tf(this)};
	wl.prototype.load=function(){if(0==this.state){this.state=1;Tf(this);var a=0;this.Va=[];this.a.forEach(function(b){var c=b.T();if(0==c||1==c){a++;var d;d=R(b,"change",function(){var c=b.T();if(2==c||3==c||4==c)M(d),a--,0===a&&(this.Va.forEach(M),this.Va=null,this.Tc())},this);this.Va.push(d)}},this);this.a.forEach(function(a){0==a.T()&&a.load()});0===a&&K.setTimeout(this.Tc.bind(this),0)}};function xl(a,b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){if(g)return a.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,function(){return(-g[2]-1).toString()}).replace(f,function(){var a=b.a?b.a[g[0]]:null;L(a,55);return(a.L-a.J+1+g[2]).toString()})}}function yl(a,b){for(var c=a.length,d=Array(c),e=0;e<c;++e)d[e]=xl(a[e],b);return zl(d)}function zl(a){return 1===a.length?a[0]:function(b,c,d){if(b)return a[la((b[1]<<b[0])+b[2],a.length)](b,c,d)}}
	function Al(){};function Bl(a){Xj.call(this);this.g=void 0!==a?a:2048}B(Bl,Xj);function Cl(a){return a.f>a.g}Bl.prototype.Oa=function(a){for(var b,c;Cl(this);){b=this.b.Na;c=b.V[0].toString();var d;if(d=c in a)b=b.V,d=Hc(a[c],b[1],b[2]);if(d)break;else Da(this.pop())}};function Dl(a){vf.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state,wrapX:a.wrapX});this.u=void 0!==a.opaque?a.opaque:!1;this.aa=void 0!==a.tilePixelRatio?a.tilePixelRatio:1;this.tileGrid=void 0!==a.tileGrid?a.tileGrid:null;this.a=new Bl(a.cacheSize);this.g=[0,0];this.Ia=""}B(Dl,vf);n=Dl.prototype;n.Mc=function(){return Cl(this.a)};n.Oa=function(a,b){var c=this.fb(a);c&&c.Oa(b)};
	function Sh(a,b,c,d,e){b=a.fb(b);if(!b)return!1;for(var f=!0,g,h,k=d.H;k<=d.I;++k)for(var l=d.J;l<=d.L;++l)g=a.ob(c,k,l),h=!1,Uj(b,g)&&(g=b.get(g),(h=2===g.T())&&(h=!1!==e(g))),h||(f=!1);return f}n.nb=function(){return 0};n.getKey=function(){return this.Ia};n.ob=function(a,b,c){return a+"/"+b+"/"+c};n.Qb=function(){return this.u};n.sa=function(a){return this.tileGrid?this.tileGrid:Zc(a)};n.fb=function(a){var b=this.ia();return b&&!Tb(b,a)?null:this.a};n.pb=function(){return this.aa};
	function Ni(a,b,c,d){d=a.sa(d);c=a.pb(c);b=Lc(Wc(d,b),a.g);return 1==c?b:Kc(b,c,a.g)}function El(a,b,c){var d=void 0!==c?c:a.ia();c=a.sa(d);if(a.i&&d.c){var e=b;b=e[0];a=Vc(c,e);var d=$c(d),f=a[0],g=a[1];d[0]<=f&&f<=d[2]&&d[1]<=g&&g<=d[3]?b=e:(e=qb(d),a[0]+=e*Math.ceil((d[0]-a[0])/e),b=Yc(c,a,b))}d=b[0];a=b[1];e=b[2];c=c.minZoom>d||d>c.maxZoom?!1:(c=(f=c.G())?Rc(c,f,d):c.a?c.a[d]:null)?Hc(c,a,e):!0;return c?b:null}n.Ja=function(){this.a.clear();this.w()};n.Vc=I;
	function Fl(a,b){T.call(this,a);this.tile=b}B(Fl,T);function Gl(a){Dl.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tilePixelRatio:a.tilePixelRatio,wrapX:a.wrapX});this.tileLoadFunction=a.tileLoadFunction;this.tileUrlFunction=this.f?this.f.bind(this):Al;this.urls=null;if(a.urls){var b=a.urls;this.urls=b;var c=b.join("\n");Hl(this,this.f?this.f.bind(this):yl(b,this.tileGrid),c)}else a.url&&this.s(a.url);a.tileUrlFunction&&Hl(this,a.tileUrlFunction)}
	B(Gl,Dl);Gl.prototype.v=function(a){a=a.target;switch(a.T()){case 1:U(this,new Fl("tileloadstart",a));break;case 2:U(this,new Fl("tileloadend",a));break;case 3:U(this,new Fl("tileloaderror",a))}};function Hl(a,b,c){a.tileUrlFunction=b;"undefined"!==typeof c?a.Ia!==c&&(a.Ia=c,a.w()):a.w()}
	Gl.prototype.s=function(a){var b=[],c=/\{(\d)-(\d)\}/.exec(a)||/\{([a-z])-([a-z])\}/.exec(a);if(c){var d=c[2].charCodeAt(0),e;for(e=c[1].charCodeAt(0);e<=d;++e)b.push(a.replace(c[0],String.fromCharCode(e)))}else b.push(a);b=this.urls=b;Hl(this,this.f?this.f.bind(this):yl(b,this.tileGrid),a)};Gl.prototype.Vc=function(a,b,c){a=this.ob(a,b,c);Uj(this.a,a)&&this.a.get(a)};function Il(a){Gl.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:Jl,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:a.wrapX});this.crossOrigin=void 0!==a.crossOrigin?a.crossOrigin:null;this.tileClass=void 0!==a.tileClass?a.tileClass:Ok;this.c={};this.j={};this.W=a.reprojectionErrorThreshold}
	B(Il,Gl);n=Il.prototype;n.Mc=function(){if(Cl(this.a))return!0;for(var a in this.c)if(Cl(this.c[a]))return!0;return!1};n.Oa=function(a,b){var c=this.fb(a);this.a.Oa(this.a==c?b:{});for(var d in this.c){var e=this.c[d];e.Oa(e==c?b:{})}};n.nb=function(a){return this.ia()&&a&&Tb(this.ia(),a),0};n.Qb=function(a){return this.ia()&&a&&!Tb(this.ia(),a)?!1:Gl.prototype.Qb.call(this,a)};
	n.sa=function(a){var b=this.ia();return!this.tileGrid||b&&!Tb(b,a)?(b=J(a).toString(),b in this.j||(this.j[b]=Zc(a)),this.j[b]):this.tileGrid};n.fb=function(a){var b=this.ia();if(!b||Tb(b,a))return this.a;a=J(a).toString();a in this.c||(this.c[a]=new Bl);return this.c[a]};function Kl(a,b,c,d,e,f,g){b=[b,c,d];e=(c=El(a,b,f))?a.tileUrlFunction(c,e,f):void 0;e=new a.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",a.crossOrigin,a.tileLoadFunction);e.key=g;R(e,"change",a.v,a);return e}
	function $h(a,b,c,d,e,f){if(a.ia()&&f&&!Tb(a.ia(),f)){var g=a.fb(f);d=[b,c,d];var h;b=a.ob.apply(a,d);Uj(g,b)&&(h=g.get(b));c=a.getKey();if(h&&h.key==c)return h;var k=a.ia(),l=a.sa(k),m=a.sa(f),p=El(a,d,f);a=new wl(k,l,f,m,d,p,a.pb(e),0,function(a,b,c,d){return Ll(this,a,b,c,d,k)}.bind(a),a.W,!1);a.key=c;h?(a.b=h,Zj(g,b,a)):g.set(b,a);return a}return Ll(a,b,c,d,e,f)}
	function Ll(a,b,c,d,e,f){var g,h=a.ob(b,c,d),k=a.getKey();if(Uj(a.a,h)){if(g=a.a.get(h),g.key!=k){var l=g;g.b&&g.b.key==k?(g=g.b,2==l.T()&&(g.b=l)):(g=Kl(a,b,c,d,e,f,k),2==l.T()?g.b=l:l.b&&2==l.b.T()&&(g.b=l.b,l.b=null));g.b&&(g.b.b=null);Zj(a.a,h,g)}}else g=Kl(a,b,c,d,e,f,k),a.a.set(h,g);return g}function Jl(a,b){a.Z().src=b};function Ml(a){a=a||{};var b=void 0!==a.projection?a.projection:"EPSG:3857",c;if(void 0!==a.tileGrid)c=a.tileGrid;else{c={extent:$c(b),maxZoom:a.maxZoom,minZoom:a.minZoom,tileSize:a.tileSize};var d={};pa(d,void 0!==c?c:{});void 0===d.extent&&(d.extent=Hb("EPSG:3857").G());d.resolutions=ad(d.extent,d.maxZoom,d.tileSize);delete d.maxZoom;c=new Mc(d)}Il.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:a.opaque,projection:b,reprojectionErrorThreshold:a.reprojectionErrorThreshold,
	tileGrid:c,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0})}B(Ml,Il);function Nl(a,b){var c=[];Object.keys(b).forEach(function(a){null!==b[a]&&void 0!==b[a]&&c.push(a+"="+encodeURIComponent(b[a]))});var d=c.join("&");a=a.replace(/[?&]$/,"");a=-1===a.indexOf("?")?a+"?":a+"&";return a+d};function Ol(a){a=a||{};var b;void 0!==a.attributions?b=a.attributions:b=[Pl];Ml.call(this,{attributions:b,cacheSize:a.cacheSize,crossOrigin:void 0!==a.crossOrigin?a.crossOrigin:"anonymous",opaque:void 0!==a.opaque?a.opaque:!0,maxZoom:void 0!==a.maxZoom?a.maxZoom:19,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:a.wrapX})}B(Ol,Ml);var Pl=new bd({html:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});function Ql(a){a=a||{};Il.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.B=a.params||{};this.ba=db()}B(Ql,Il);Ql.prototype.pb=function(a){return a};
	Ql.prototype.f=function(a,b,c){var d=this.tileGrid;d||(d=this.sa(c));if(!(d.b.length<=a[0])){var e=Qc(d,a,this.ba),f=Lc(Wc(d,a[0]),this.g);1!=b&&(f=Kc(f,b,this.g));d={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};pa(d,this.B);var g=this.urls;g?(c=c.ya.split(":").pop(),d.SIZE=f[0]+","+f[1],d.BBOX=e.join(","),d.BBOXSR=c,d.IMAGESR=c,d.DPI=Math.round(d.DPI?d.DPI*b:90*b),a=1==g.length?g[0]:g[la((a[1]<<a[0])+a[2],g.length)],b=a.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),
	b==a&&L(!1,50),d=Nl(b,d)):d=void 0;return d}};function Rl(a){this.j=this.l=this.f=null;this.i=void 0!==a.fill?a.fill:null;this.M=[0,0];this.b=a.points;this.c=void 0!==a.radius?a.radius:a.radius1;this.g=void 0!==a.radius2?a.radius2:this.c;this.h=void 0!==a.angle?a.angle:0;this.a=void 0!==a.stroke?a.stroke:null;this.D=this.Y=this.u=null;var b=a.atlasManager,c="",d="",e=0,f=null,g,h=0;this.a&&(g=nd(this.a.a),h=this.a.c,void 0===h&&(h=1),f=this.a.b,pe||(f=null),d=this.a.g,void 0===d&&(d="round"),c=this.a.f,void 0===c&&(c="round"),e=this.a.h,void 0===
	e&&(e=10));var k=2*(this.c+h)+1,c={strokeStyle:g,jb:h,size:k,lineCap:c,lineDash:f,lineJoin:d,miterLimit:e};if(void 0===b){var l=Md(k,k);this.l=l.canvas;b=k=this.l.width;this.Qc(c,l,0,0);this.i?this.j=this.l:(l=Md(c.size,c.size),this.j=l.canvas,this.Pc(c,l,0,0))}else k=Math.round(k),(d=!this.i)&&(l=this.Pc.bind(this,c)),e=this.a?qh(this.a):"-",f=this.i?rh(this.i):"-",this.f&&e==this.f[1]&&f==this.f[2]&&this.c==this.f[3]&&this.g==this.f[4]&&this.h==this.f[5]&&this.b==this.f[6]||(this.f=["r"+e+f+(void 0!==
	this.c?this.c.toString():"-")+(void 0!==this.g?this.g.toString():"-")+(void 0!==this.h?this.h.toString():"-")+(void 0!==this.b?this.b.toString():"-"),e,f,this.c,this.g,this.h,this.b]),l=b.add(this.f[0],k,k,this.Qc.bind(this,c),l),this.l=l.image,this.M=[l.offsetX,l.offsetY],b=l.image.width,d?this.j=l.Nd:this.j=this.l;this.u=[k/2,k/2];this.Y=[k,k];this.D=[b,b];oh.call(this,{opacity:1,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:!1,rotation:void 0!==a.rotation?a.rotation:0,scale:1,snapToPixel:void 0!==
	a.snapToPixel?a.snapToPixel:!0})}B(Rl,oh);n=Rl.prototype;n.eb=function(){return this.u};n.ub=function(){return this.j};n.Z=function(){return this.l};n.Ob=function(){return this.D};n.ib=function(){return 2};n.pa=function(){return this.M};n.Ka=function(){return this.Y};n.Vb=I;n.load=I;n.bc=I;
	n.Qc=function(a,b,c,d){var e;b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();this.g!==this.c&&(this.b*=2);for(c=0;c<=this.b;c++)d=2*c*Math.PI/this.b-Math.PI/2+this.h,e=0===c%2?this.c:this.g,b.lineTo(a.size/2+e*Math.cos(d),a.size/2+e*Math.sin(d));this.i&&(b.fillStyle=qd(this.i.b),b.fill());this.a&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.jb,a.lineDash&&b.setLineDash(a.lineDash),b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.miterLimit=a.miterLimit,b.stroke());b.closePath()};
	n.Pc=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();this.g!==this.c&&(this.b*=2);var e;for(c=0;c<=this.b;c++)e=2*c*Math.PI/this.b-Math.PI/2+this.h,d=0===c%2?this.c:this.g,b.lineTo(a.size/2+d*Math.cos(e),a.size/2+d*Math.sin(e));b.fillStyle=kh;b.fill();this.a&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.jb,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};y("ol.format.GeoJSON",Gk);Gk.prototype.readFeatures=Gk.prototype.a;Gk.prototype.readFeature=Gk.prototype.g;y("ol.format.EsriJSON",Ak);Ak.prototype.readFeatures=Ak.prototype.a;Ak.prototype.readFeature=Ak.prototype.g;y("ol.style.Style",yh);y("ol.style.Circle",ph);y("ol.style.RegularShape",Rl);y("ol.style.Fill",sh);y("ol.style.Stroke",xh);y("ol.style.Icon",Lk);
	y("ol.style.Text",function(a){a=a||{};this.b=a.font;this.h=a.rotation;this.g=a.rotateWithView;this.l=a.scale;this.j=a.text;this.C=a.textAlign;this.K=a.textBaseline;this.f=void 0!==a.fill?a.fill:new sh({color:"#333"});this.i=void 0!==a.stroke?a.stroke:null;this.a=void 0!==a.offsetX?a.offsetX:0;this.c=void 0!==a.offsetY?a.offsetY:0});y("ol.View",uc);uc.prototype.on=uc.prototype.Y;uc.prototype.getZoom=uc.prototype.rd;uc.prototype.setZoom=uc.prototype.ye;uc.prototype.getCenter=uc.prototype.qa;
	uc.prototype.setCenter=uc.prototype.xa;uc.prototype.calculateExtent=uc.prototype.lc;uc.prototype.getProjection=uc.prototype.ia;uc.prototype.fit=uc.prototype.md;y("ol.control.defaults",ee);y("ol.layer.Tile",W);W.prototype.getVisible=W.prototype.gb;W.prototype.setVisible=W.prototype.Cc;W.prototype.getZIndex=W.prototype.Yb;W.prototype.setZIndex=W.prototype.Dc;W.prototype.getOpacity=W.prototype.Xb;W.prototype.setOpacity=W.prototype.Bc;W.prototype.getSource=W.prototype.da;W.prototype.setSource=W.prototype.$b;
	W.prototype.on=W.prototype.Y;y("ol.layer.Vector",Y);Y.prototype.getVisible=Y.prototype.gb;Y.prototype.setVisible=Y.prototype.Cc;Y.prototype.getSource=Y.prototype.da;Y.prototype.setStyle=Y.prototype.v;Y.prototype.getZIndex=Y.prototype.Yb;Y.prototype.setZIndex=Y.prototype.Dc;Y.prototype.getOpacity=Y.prototype.Xb;Y.prototype.setOpacity=Y.prototype.Bc;Y.prototype.getSource=Y.prototype.da;Y.prototype.setSource=Y.prototype.$b;Y.prototype.on=Y.prototype.Y;y("ol.source.OSM",Ol);Ol.prototype.refresh=Ol.prototype.Ja;
	y("ol.source.XYZ",Ml);Ml.prototype.refresh=Ml.prototype.Ja;Ml.prototype.setUrl=Ml.prototype.s;Ml.prototype.refresh=Ml.prototype.Ja;y("ol.Map",Z);Z.prototype.on=Z.prototype.Y;Z.prototype.getTarget=Z.prototype.Wb;Z.prototype.getTargetElement=Z.prototype.Ra;Z.prototype.getView=Z.prototype.U;Z.prototype.addOverlay=Z.prototype.fd;Z.prototype.addLayer=Z.prototype.ed;Z.prototype.removeLayer=Z.prototype.te;Z.prototype.getEventPixel=Z.prototype.uc;Z.prototype.hasFeatureAtPixel=Z.prototype.Md;
	Z.prototype.getSize=Z.prototype.Ta;Z.prototype.updateSize=Z.prototype.yb;Z.prototype.forEachFeatureAtPixel=Z.prototype.od;Z.prototype.addInteraction=Z.prototype.dd;Z.prototype.removeInteraction=Z.prototype.se;Z.prototype.beforeRender=Z.prototype.oa;Z.prototype.addControl=Z.prototype.cd;Z.prototype.once=Z.prototype.hd;Z.prototype.renderSync=Z.prototype.we;y("ol.source.Vector",Xk);Xk.prototype.getFeatures=Xk.prototype.pd;Xk.prototype.getExtent=Xk.prototype.G;Xk.prototype.refresh=Xk.prototype.Ja;
	Xk.prototype.addFeatures=Xk.prototype.Gb;Xk.prototype.addFeature=Xk.prototype.Fb;Xk.prototype.clear=Xk.prototype.clear;Xk.prototype.forEachFeature=Xk.prototype.nd;Xk.prototype.refresh=Xk.prototype.Ja;y("ol.source.TileArcGISRest",Ql);Ql.prototype.refresh=Ql.prototype.Ja;y("ol.Overlay",gk);gk.prototype.setPosition=gk.prototype.Ac;y("ol.Feature",kk);kk.prototype.getProperties=kk.prototype.Ea;kk.prototype.setProperties=kk.prototype.l;kk.prototype.getGeometry=kk.prototype.S;y("ol.geom.Point",jc);
	jc.prototype.transform=jc.prototype.transform;jc.prototype.getCoordinates=jc.prototype.za;jc.prototype.getExtent=jc.prototype.G;y("ol.geom.Polygon",qc);qc.prototype.getCoordinates=qc.prototype.za;qc.prototype.getExtent=qc.prototype.G;qc.prototype.transform=qc.prototype.transform;y("ol.geom.LineString",wk);wk.prototype.getCoordinates=wk.prototype.za;wk.prototype.getExtent=wk.prototype.G;wk.prototype.transform=wk.prototype.transform;y("ol.proj.Projection",Eb);Eb.prototype.getCode=Eb.prototype.l;
	y("ol.interaction.Draw",el);el.prototype.on=el.prototype.Y;y("ol.animation.pan",Dc);y("ol.control.FullScreen",Xd);
	  return OPENLAYERS.ol;
	}));
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var mapMoveCls_1 = __webpack_require__(8);
	/**
	 * The single map move object catch is that it is common to multimap pages
	 * @type {MapMoveCls}
	 */
	exports.mapMove = new mapMoveCls_1.default();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.mapMove;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var mapInteractionBase_1 = __webpack_require__(9);
	var checkDefined = __webpack_require__(10);
	var provide_1 = __webpack_require__(4);
	var makeGuid_1 = __webpack_require__(11);
	var $ = __webpack_require__(3);
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
	        _super.call(this, 'map move');
	        this._arrLyrRequest = [];
	        this._arrLyrTimeout = [];
	        this._arrLayer = [];
	        this._lookupLayer = {};
	        this._mapMoveCallbacks = [];
	        this._mapMoveCallbacksLookup = {};
	        this._mapMoveCallbackDelays = [];
	        this._mapMoveCallbackContext = [];
	        this._mapMoveCallbackTimeout = [];
	        this._mapExtent = undefined;
	        this._zoomLevel = undefined;
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
	            var _this_1 = this;
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
	                innerFunction.call(_this_1, lyr, index);
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
	        var _this = this;
	        var f = function () {
	            if (ctx !== null) {
	                theFunc.call(ctx, _this._mapExtent, _this._zoomLevel, eventType);
	            }
	            else {
	                theFunc(_this._mapExtent, _this._zoomLevel, eventType);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by gavorhes on 12/8/2015.
	 */
	var provide_1 = __webpack_require__(4);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var provide_1 = __webpack_require__(4);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(4);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 11/3/2015.
	 */
	"use strict";
	var mapPopupCls_1 = __webpack_require__(13);
	/**
	 * The single popup object catch is that it is common to multimap pages
	 * @type {MapPopupCls}
	 */
	exports.mapPopup = new mapPopupCls_1.default();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.mapPopup;


/***/ },
/* 13 */
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
	var mapInteractionBase_1 = __webpack_require__(9);
	var provide_1 = __webpack_require__(4);
	var custom_ol_1 = __webpack_require__(5);
	var $ = __webpack_require__(3);
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
	        _super.call(this, 'map popup');
	        this._arrPopupLayerIds = [];
	        this._arrPopupLayerNames = [];
	        this._arrPopupLayers = [];
	        this._arrPopupOlLayers = [];
	        this._arrPopupContentFunction = [];
	        this._$popupContainer = undefined;
	        this._$popupContent = undefined;
	        this._$popupCloser = undefined;
	        this._popupOverlay = undefined;
	        this._selectionLayers = [];
	        this._selectionLayerLookup = {};
	        this._mapClickFunctions = [];
	        //let a = function($jqueryContent){console.log($jqueryContent)};
	        //this._popupChangedLookup = {'a': a};
	        this._popupChangedFunctions = [];
	        this._esriMapServiceLayers = [];
	        this._popupOpen = false;
	        this._popupCoordinate = null;
	        this._passThroughLayerFeatureArray = [];
	        this._currentPopupIndex = -1;
	        this._popupContentLength = 0;
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
	        this._popupOverlay = new custom_ol_1.ol.Overlay({ element: this._$popupContainer[0], autoPan: true,
	            autoPanAnimation: {
	                duration: 250,
	                source: theMap.getView().getCenter()
	            } });
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
	            theStyle = new custom_ol_1.ol.style.Style({
	                stroke: new custom_ol_1.ol.style.Stroke({
	                    color: selectionStyle.color,
	                    width: selectionStyle.width
	                }),
	                image: new custom_ol_1.ol.style.Circle({
	                    radius: 7,
	                    fill: new custom_ol_1.ol.style.Fill({ color: selectionStyle.color }),
	                    stroke: new custom_ol_1.ol.style.Stroke({ color: selectionStyle.color, width: 1 })
	                }),
	                fill: new custom_ol_1.ol.style.Fill({
	                    color: selectionStyle.color
	                })
	            });
	        }
	        var selectionLayer = new custom_ol_1.ol.layer.Vector({
	            source: new custom_ol_1.ol.source.Vector(),
	            style: theStyle,
	            zIndex: 100
	        });
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
	nm.MapPopupCls = MapPopupCls;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MapPopupCls;


/***/ },
/* 14 */,
/* 15 */
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
	var LayerBase_1 = __webpack_require__(16);
	var esriToOl = __webpack_require__(18);
	var mapPopup_1 = __webpack_require__(12);
	var provide_1 = __webpack_require__(4);
	var custom_ol_1 = __webpack_require__(5);
	var nm = provide_1.default('layers');
	var $ = __webpack_require__(3);
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
	        _super.call(this, url, options);
	        this._source = new custom_ol_1.ol.source.TileArcGISRest({
	            url: this.url == '' ? undefined : this.url,
	            params: typeof options.showLayers == 'undefined' ? undefined : { layers: 'show:' + options.showLayers.join(',') }
	        });
	        this._olLayer = new custom_ol_1.ol.layer.Tile({
	            source: this._source,
	            visible: this.visible,
	            opacity: this.opacity,
	            minResolution: this._minResolution,
	            maxResolution: this._maxResolution,
	            zIndex: this._zIndex
	        });
	        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;
	        this._esriFormat = new custom_ol_1.ol.format.EsriJSON();
	        this._popupRequest = null;
	        this.addLegendContent();
	        if (options.addPopup) {
	            mapPopup_1.default.addMapServicePopup(this);
	        }
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
	        var _this = this;
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
	                mapPopup_1.default.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
	            }
	        }, 'json').always(function () {
	            _this._popupRequest = null;
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var zoomResolutionConvert = __webpack_require__(17);
	var provide_1 = __webpack_require__(4);
	var makeGuid_1 = __webpack_require__(11);
	var nm = provide_1.default('layers');
	var $ = __webpack_require__(3);
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
	            this._legendContent += ("<input type=\"checkbox\" " + (this.visible ? 'checked' : '') + " ") +
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
	     * @param {string|undefined} additionalContent - additional content to add to legend
	     * @private
	     */
	    LayerBase.prototype._addLegendContent = function (additionalContent) {
	        additionalContent = typeof additionalContent == 'string' ? additionalContent : '';
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/14/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(4);
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
/* 18 */
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
	var provide_1 = __webpack_require__(4);
	var custom_ol_1 = __webpack_require__(5);
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
	        _super.call(this, symbolObj, opacity);
	        switch (this.symbolObj.type) {
	            case 'esriSMS':
	                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
	                var outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
	                var outlineWidth = this.symbolObj.outline.width;
	                var radius = this.symbolObj.size;
	                this.olStyle = new custom_ol_1.ol.style.Style({
	                    image: new custom_ol_1.ol.style.Circle({
	                        radius: radius,
	                        fill: new custom_ol_1.ol.style.Fill({
	                            color: innerColor
	                        }),
	                        stroke: new custom_ol_1.ol.style.Stroke({ color: outerColor, width: outlineWidth })
	                    })
	                });
	                this.legendHtml = "<span class=\"legend-layer-icon\" style=\"color: " + innerColor + "\">&#9679;</span>";
	                break;
	            case 'esriPMS':
	                this.olStyle = new custom_ol_1.ol.style.Style({
	                    image: new custom_ol_1.ol.style.Icon({ src: "data:image/png;base64," + this.symbolObj['imageData'] })
	                });
	                this.legendHtml = "<img class=\"legend-layer-icon\" height=\"17\" src=\"data:image/png;base64," + this.symbolObj['imageData'] + "\">";
	                break;
	            default:
	                console.log(this.symbolObj);
	                alert('Point symbol does not handle symbol type: ' + this.symbolObj['type']);
	        }
	    }
	    return PointSymbol;
	}(CommonSymbol));
	var LineSymbol = (function (_super) {
	    __extends(LineSymbol, _super);
	    function LineSymbol(symbolObj, opacity) {
	        _super.call(this, symbolObj, opacity);
	        switch (this.symbolObj.type) {
	            case 'esriSLS':
	                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
	                var lineWidth = this.symbolObj.width;
	                this.olStyle = new custom_ol_1.ol.style.Style({
	                    stroke: new custom_ol_1.ol.style.Stroke({
	                        color: innerColor,
	                        //lineDash: [4],
	                        width: lineWidth
	                    })
	                });
	                this.legendHtml = "<span class=\"legend-layer-icon\" ";
	                this.legendHtml += "style=\"";
	                this.legendHtml += "background-color: " + innerColor + ";";
	                this.legendHtml += "width: 40px;";
	                this.legendHtml += "height: 4px;";
	                this.legendHtml += "position: relative;";
	                this.legendHtml += "display: inline-block;";
	                this.legendHtml += "top: -1px;";
	                this.legendHtml += "\"></span>";
	                break;
	            default:
	                console.log(this.symbolObj);
	                alert('Line symbol does not handle symbol type: ' + this.symbolObj['type']);
	        }
	    }
	    return LineSymbol;
	}(CommonSymbol));
	var PolygonSymbol = (function (_super) {
	    __extends(PolygonSymbol, _super);
	    function PolygonSymbol(symbolObj, opacity) {
	        _super.call(this, symbolObj, opacity);
	        switch (this.symbolObj['type']) {
	            case 'esriSFS':
	                var innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
	                var outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
	                var outlineWidth = this.symbolObj.outline.width;
	                this.olStyle = new custom_ol_1.ol.style.Style({
	                    stroke: new custom_ol_1.ol.style.Stroke({
	                        color: outerColor,
	                        //lineDash: [4],
	                        width: outlineWidth
	                    }),
	                    fill: new custom_ol_1.ol.style.Fill({
	                        color: innerColor
	                    })
	                });
	                this.legendHtml = "<span class=\"legend-layer-icon\" ";
	                this.legendHtml += "style=\"";
	                this.legendHtml += "background-color: " + innerColor + ";";
	                this.legendHtml += "border: solid " + outerColor + " 1px;";
	                this.legendHtml += "width: 40px;";
	                this.legendHtml += "height: 9px;";
	                this.legendHtml += "position: relative;";
	                this.legendHtml += "display: inline-block;";
	                this.legendHtml += "top: 2px;";
	                this.legendHtml += "\"></span>";
	                break;
	            default:
	                console.log(this.symbolObj);
	                alert('Polygon symbol does handle symbol type: ' + this.symbolObj['type']);
	        }
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
	     * @param {Constructor|*} SymbolClass - the symbol class to use
	     */
	    function SingleSymbol(esriResponse, SymbolClass) {
	        _super.call(this, esriResponse);
	        this.symbol = this.renderer.symbol;
	        var symbolObj = new SymbolClass(this.symbol, this.opacity);
	        this.olStyle = symbolObj.olStyle;
	        this.legendHtml = symbolObj.legendHtml;
	    }
	    return SingleSymbol;
	}(SymbolGenerator));
	var UniqueValueSymbol = (function (_super) {
	    __extends(UniqueValueSymbol, _super);
	    /**
	     *
	     * @param {object} esriResponse - layer info
	     * @param {Constructor|*} SymbolClass - the Symbol class definition
	     */
	    function UniqueValueSymbol(esriResponse, SymbolClass) {
	        var _this = this;
	        _super.call(this, esriResponse);
	        this.uniqueValueInfos = this.renderer['uniqueValueInfos'];
	        this.propertyName = this.renderer['field1'];
	        this.defaultSymbol = this.renderer['defaultSymbol'];
	        if (this.defaultSymbol) {
	            var symbolObj = new SymbolClass(this.defaultSymbol, this.opacity);
	            this.defaultStyle = symbolObj.olStyle;
	            this.defaultLabelHtml = ("<span class=\"legend-layer-subitem\">" + htmlEscape(this.renderer['defaultLabel']) + "</span>") + symbolObj.legendHtml;
	        }
	        else {
	            this.defaultStyle = undefined;
	            this.defaultLabelHtml = 'other';
	        }
	        this.valueArray = [];
	        this.labelArray = [];
	        this.legendArray = [];
	        this.propertyStyleLookup = {};
	        for (var _i = 0, _a = this.uniqueValueInfos; _i < _a.length; _i++) {
	            var uniqueVal = _a[_i];
	            this.labelArray.push(uniqueVal['label']);
	            this.valueArray.push(uniqueVal['value']);
	            var uniqueSym = new SymbolClass(uniqueVal.symbol, this.opacity);
	            this.legendArray.push(("<span class=\"legend-layer-subitem\">" + htmlEscape(uniqueVal['label']) + "</span>") + uniqueSym.legendHtml);
	            this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
	        }
	        this.olStyle = function (feature) {
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
	        if (this.defaultLabelHtml !== null) {
	            this.legendArray.push(this.defaultLabelHtml);
	        }
	        this.legendHtml = '<ul>';
	        for (var _b = 0, _c = this.legendArray; _b < _c.length; _b++) {
	            var h = _c[_b];
	            this.legendHtml += "<li>" + h + "</li>";
	        }
	        this.legendHtml += '</ul>';
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
	        legendHtml = ("<span class=\"legend-layer-subitem\">" + layerName + "</span>") + legendHtml;
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
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by gavorhes on 12/16/2015.
	 */
	"use strict";
	var provide_1 = __webpack_require__(4);
	var makeGuid_1 = __webpack_require__(11);
	var mapMove_1 = __webpack_require__(7);
	var nm = provide_1.default('collections');
	var $ = __webpack_require__(3);
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
	        legendHtml += ("<li>" + options.legendTitle + "<input type=\"checkbox\" checked id=\"suppress-by-extent-" + legendId + "\" class=\"suppress-by-extent\">") +
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
	            theHml += ("<li id=\"" + lyr.id + "-layer-li\" class=\"legend-layer-li " + layerDivClasses.join(' ') + "\">") + lyr.getLegendDiv() + '</li>';
	        }
	        else if (theGroup.groupGroupsLookup[itemId]) {
	            /**
	             * type {LayerGroup}
	             */
	            var otherGroup = theGroup.groupGroupsLookup[itemId];
	            theHml += "<li>";
	            theHml += ("<div id=\"" + otherGroup.groupId + "-legend-layer-div\" ") +
	                ("class=\"legend-layer-group  " + layerDivClasses.join(' ') + "\">");
	            if (otherGroup.addCheck) {
	                theHml += ("<input type=\"checkbox\" checked id=\"" + otherGroup.groupId + "-group-chck\">") +
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