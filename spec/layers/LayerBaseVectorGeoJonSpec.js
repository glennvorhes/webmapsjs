"use strict";
// /**
//  * Created by glenn on 3/8/2017.
//  */
//
var LayerBaseVectorGeoJson_1 = require("../../dist/layers/LayerBaseVectorGeoJson");
// // import {sample_segs} from '../data/sample_segments';
//
//
var projections_1 = require("../../dist/olHelpers/projections");
// import ol = require('custom-ol');
//
//
describe("LayerBaseVeotorGeoJson", function () {
    var geoj;
    beforeEach(function () {
        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('', { transform: { featureProjection: projections_1.proj3857 } });
    });
    //
    it('should exist', function () {
        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('');
        expect(LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson).toBeDefined();
        expect(geoj).toBeDefined();
        console.log('here are cats');
    });
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
});
//# sourceMappingURL=LayerBaseVectorGeoJonSpec.js.map