// /**
//  * Created by glenn on 3/8/2017.
//  */
//
import {LayerBaseVectorGeoJson, LayerBaseVectorGeoJsonOptions} from '../../dist/layers/LayerBaseVectorGeoJson';
// // import {sample_segs} from '../data/sample_segments';
//
//
import {proj3857, proj4326} from '../../dist/olHelpers/projections';
import {cams, sample_segs, trench} from '../data/geojsonFeatures';

// import ol = require('custom-ol');
//
//
describe("LayerBaseVeotorGeoJson", function () {
    let geoj: LayerBaseVectorGeoJson;

    beforeEach(() => {
        geoj = new LayerBaseVectorGeoJson('', {transform: {featureProjection: proj3857}});
    });
//
    it('should exist', function () {
        geoj = new LayerBaseVectorGeoJson('');
        expect(LayerBaseVectorGeoJson).toBeDefined();
        expect(geoj).toBeDefined();
        console.log('here are cats')
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