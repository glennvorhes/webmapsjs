/**
 * Created by glenn on 3/10/2017.
 */


import {LayerBaseVectorGeoJson, LayerBaseVectorGeoJsonOptions} from '../../../src/layers/LayerBaseVectorGeoJson';

import {cams, trench, sample_segs} from '../../data/geoJsonFeatures';

describe('LayerBaseVectorGeoJSON', function () {
    let geoj: LayerBaseVectorGeoJson;


    beforeEach(function () {
        geoj = new LayerBaseVectorGeoJson();
    });

    it('should instantiate with no options provided', function () {
        geoj = new LayerBaseVectorGeoJson("");
        expect(geoj).toBeDefined();
    });

    it('should instantiate with nothing', function () {
        geoj = new LayerBaseVectorGeoJson();
        expect(geoj).toBeDefined();
    });

    it('should add the cams', function () {
        geoj.addFeatures(cams);
        expect(geoj.features.length).toBeGreaterThan(0);
    });

    it('should add the trenches', function () {
        geoj.addFeatures(trench);
        expect(geoj.features.length).toBeGreaterThan(0);
    });
    
    it('should add the mm segments', function () {
        geoj.addFeatures(sample_segs);
        expect(geoj.features.length).toBeGreaterThan(0);
    });

});

