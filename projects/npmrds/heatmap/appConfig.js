/**
 * Created by gavorhes on 12/23/2015.
 */

class NpmrdsHeatmapConfig {
    constructor() {

        this.map = undefined;

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         */
        this.featureOverlay = undefined;

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         */
        this.lineLayer = undefined;


        /**
         *
         * @type {LayerBaseVectorGeoJson}
         */
        this.pointLayer = undefined;


        /**
         *
         * @type {LayerBaseVectorGeoJson}
         */
        this.trackerLayer = undefined;
    }


}

///**
// *
// * @type {NpmrdsHeatmapConfig}
// */
//const npmrdsHeatmapConfig = new NpmrdsHeatmapConfig();

/**
 * @type {NpmrdsHeatmapConfig}
 */
export default new NpmrdsHeatmapConfig();

