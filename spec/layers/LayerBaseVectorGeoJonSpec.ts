/**
 * Created by glenn on 3/8/2017.
 */

import {LayerBaseVectorGeoJson, LayerBaseVectorGeoJsonOptions} from '../../dist/layers/LayerBaseVectorGeoJson'


describe("LayerBaseVeotorGeoJson", function () {
    let geoj: LayerBaseVectorGeoJson;

    beforeEach(() => {
        geoj = new LayerBaseVectorGeoJson('');
    });

    it('should exist', function () {
        geoj = new LayerBaseVectorGeoJson('');
        expect(LayerBaseVectorGeoJson).toBeDefined();
        expect(geoj).toBeDefined();
        console.log('here are cats')
    })


});