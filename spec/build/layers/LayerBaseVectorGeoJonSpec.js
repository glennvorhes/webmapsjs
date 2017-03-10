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
/*!*********************************************!*\
  !*** ./layers/LayerBaseVectorGeoJonSpec.js ***!
  \*********************************************/
/***/ function(module, exports) {

	// /**
	//  * Created by glenn on 3/8/2017.
	//  */
	//
	// import {LayerBaseVectorGeoJson, LayerBaseVectorGeoJsonOptions} from '../../dist/layers/LayerBaseVectorGeoJson'
	// // import {sample_segs} from '../data/sample_segments';
	//
	//
	// import {proj3857, proj4326} from '../../dist/olHelpers/projections';
	// import ol = require('custom-ol');
	//
	//
	// describe("LayerBaseVeotorGeoJson", function () {
	//     let geoj: LayerBaseVectorGeoJson;
	//
	//     beforeEach(() => {
	//         geoj = new LayerBaseVectorGeoJson('', {transform: {featureProjection: proj3857}});
	//     });
	//
	//     // it('should exist', function () {
	//     //     geoj = new LayerBaseVectorGeoJson('');
	//     //     expect(LayerBaseVectorGeoJson).toBeDefined();
	//     //     expect(geoj).toBeDefined();
	//     //     console.log('here are cats')
	//     //
	//     // });
	//
	//
	//     it('should read features cams', function () {
	//         let format = new ol.format.GeoJSON();
	//
	//         expect(false).toBe(true);
	//
	//
	//     });
	//
	//     it('should read features cams1', function () {
	//         let format = new ol.format.GeoJSON();
	//
	//         expect(false).toBe(true);
	//
	//
	//     });
	//
	//
	//     // it ('should load the sample segments', function () {
	//     //    expect(geoj.features.length).toBe(0, 'length should be 0');
	//     //    geoj.addFeatures(sample_segs);
	//     //    geoj.addFeatures(sample_segs);
	//     // });
	//
	//
	// }); 


/***/ }
/******/ ]);
//# sourceMappingURL=LayerBaseVectorGeoJonSpec.js.map