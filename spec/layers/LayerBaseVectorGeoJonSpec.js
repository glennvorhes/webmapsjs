/**
 * Created by glenn on 3/8/2017.
 */
"use strict";
var LayerBaseVectorGeoJson_1 = require("../../dist/layers/LayerBaseVectorGeoJson");
describe("LayerBaseVeotorGeoJson", function () {
    var geoj;
    beforeEach(function () {
        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('');
    });
    it('should exist', function () {
        geoj = new LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson('');
        expect(LayerBaseVectorGeoJson_1.LayerBaseVectorGeoJson).toBeDefined();
        expect(geoj).toBeDefined();
        console.log('here are cats');
    });
});
//# sourceMappingURL=LayerBaseVectorGeoJonSpec.js.map