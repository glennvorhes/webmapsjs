/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import { LayerVectorRealEarth } from "../layers/LayerRealEarthVector";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
/**
 * class mixin to animate RealEarth vector layers
 * @augments RealEarthAnimate
 */
declare class RealEarthAnimateVector extends RealEarthAnimate {
    _dataCache: Array<Array<Object> | Object>;
    _source: VectorSource;
    _rawTimesLookup: {
        [s: string]: any;
    };
    _currentIndex: number;
    _olLayer: VectorLayer;
    _lyr: LayerVectorRealEarth;
    constructor(layer: LayerVectorRealEarth, loadCallback?: (lyr: LayerVectorRealEarth) => void);
    /**
     * Call this after the mixin has been applied
     */
    timeInit(): void;
    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input date string
     * @protected
     */
    _loadDates(inString: string): string;
    /**
     * @protected
     */
    _loadLatest(): boolean;
    /**
     * Load the features at the date index specified
     * @param {number} i the index of the features to be loaded by date
     * @param {boolean} [setAsSource=true] set to false to trigger cache load only
     * @private
     */
    _loadAtTimeIndex(i: number, setAsSource?: boolean): void;
    /**
     * helper to load the features at the index specified
     * @param {object} geojObj - the geojson object
     * @private
     */
    _loadFeatures(geojObj: Object): void;
    setLayerTime(theTime: number): boolean;
}
export default RealEarthAnimateVector;
