(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./rectangle', './util/makeGuid', './olHelpers/quickMap', './layers/LayerBaseVectorEsri', './layers/LayerBaseVectorGeoJson', './olHelpers/esriToOlStyle', './olHelpers/mapMoveCls', './olHelpers/mapPopupCls', './olHelpers/SortedFeatures'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./rectangle'), require('./util/makeGuid'), require('./olHelpers/quickMap'), require('./layers/LayerBaseVectorEsri'), require('./layers/LayerBaseVectorGeoJson'), require('./olHelpers/esriToOlStyle'), require('./olHelpers/mapMoveCls'), require('./olHelpers/mapPopupCls'), require('./olHelpers/SortedFeatures'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.rectangle, global.makeGuid, global.quickMap, global.LayerBaseVectorEsri, global.LayerBaseVectorGeoJson, global.esriToOlStyle, global.mapMoveCls, global.mapPopupCls, global.SortedFeatures);
    global.testImport = mod.exports;
  }
})(this, function (_rectangle, _makeGuid, _quickMap, _LayerBaseVectorEsri, _LayerBaseVectorGeoJson, _esriToOlStyle, _mapMoveCls, _mapPopupCls, _SortedFeatures) {
  'use strict';

  var _rectangle2 = _interopRequireDefault(_rectangle);

  var _makeGuid2 = _interopRequireDefault(_makeGuid);

  var _quickMap2 = _interopRequireDefault(_quickMap);

  var _LayerBaseVectorEsri2 = _interopRequireDefault(_LayerBaseVectorEsri);

  var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

  var _esriToOlStyle2 = _interopRequireDefault(_esriToOlStyle);

  var _mapMoveCls2 = _interopRequireDefault(_mapMoveCls);

  var _mapPopupCls2 = _interopRequireDefault(_mapPopupCls);

  var _SortedFeatures2 = _interopRequireDefault(_SortedFeatures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  console.log(_makeGuid2.default); /**
                                    * Created by gavorhes on 5/9/2016.
                                    */

  var g = 10;
  console.log('here');
  console.log('here');
  console.log('here');
  var m = 8;

  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');

  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  g = 10;
  var myNew = 14;

  console.log(_makeGuid2.default);
  g = 10;
  console.log('here');
  console.log('here');
  console.log('here');
  m = 8;

  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');

  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  console.log('here');
  g = 10;
  myNew = 26;
});