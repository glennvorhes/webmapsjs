/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import provide from '../util/provide';
import ol = require('custom-ol');
import {LayerVectorRealEarth} from "../layers/LayerRealEarthVector";
import $ = require('jquery');
const nm = provide('mixin');


/**
 * class mixin to animate RealEarth vector layers
 * @augments RealEarthAnimate
 */
class RealEarthAnimateVector extends RealEarthAnimate {
    _dataCache: Array<Array<Object>|Object>;
    _source: ol.source.Vector;
    _rawTimesLookup: {[s: string]: any};
    _currentIndex: number;
    _olLayer: ol.layer.Vector;
    _lyr: LayerVectorRealEarth;

    constructor(layer: LayerVectorRealEarth, loadCallback?: (lyr: LayerVectorRealEarth) => void){
        super(layer, loadCallback);
        this._source = layer.source;
        this._olLayer = layer.olLayer;
        this._lyr = layer;
    }


    /**
     * Call this after the mixin has been applied
     */
    timeInit() {
        super.timeInit();
        this._rawTimesLookup = {};
        this._dataCache = [];
    }

    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input date string
     * @protected
     */
    _loadDates(inString: string): string {
        let rawDte = super._loadDates(inString);
        this._dataCache.push(null);
        this._rawTimesLookup[rawDte] = null;
        return '';
    }

    /**
     * @protected
     */
    _loadLatest(): boolean {
        if (super._loadLatest()) {
            this._loadAtTimeIndex.call(this, this._currentIndex);
        }
        return true;
    }

    //
    //http://realearth.ssec.wisc.edu/api/image?products=nexrhres_20160108_212500&x=1&y=5&z=4
    //
    //    20160108.205500
    //    http://realearth.ssec.wisc.edu/api/image?products=nexrhres_20160108_205500&x=34&y=46&z=7

    /**
     * Load the features at the date index specified
     * @param {number} i the index of the features to be loaded by date
     * @param {boolean} [setAsSource=true] set to false to trigger cache load only
     * @private
     */
    _loadAtTimeIndex(i: number, setAsSource = true) {
        setAsSource = typeof setAsSource == 'boolean' ? setAsSource : true;
        if (this._dataCache[i] != null) {
            this._source.clear();
            this._loadFeatures(this._dataCache[i]);
        } else {
            let __this = this;
            $.get('http://realearth.ssec.wisc.edu:80/api/shapes',
                {products: `${this._products}_${this._rawDateStrings[i]}`},
                function (d) {
                    __this._dataCache[i] = d;
                    __this._rawTimesLookup[__this._rawDateStrings[i]] = d;
                    if (setAsSource) {
                        __this._source.clear();
                        __this._loadFeatures.call(__this, __this._dataCache[i]);
                    }
                }, 'json'
            );
        }
    }

    /**
     * helper to load the features at the index specified
     * @param {object} geojObj - the geojson object
     * @private
     */
    _loadFeatures(geojObj) {
        this._source.addFeatures(this._lyr._geoJsonFormat.readFeatures(geojObj,
            {featureProjection: this._lyr._transform.featureProjection, dataProjection: this._lyr._transform.dataProjection}));
    }

    setLayerTime(theTime: number): boolean {
        if (super.setLayerTime(theTime)) {
            this._loadAtTimeIndex(this._currentIndex);
        } else {
            this._source.clear();
        }
        return true;
    }
}

nm.RealEarthAnimateVector = RealEarthAnimateVector;
export default RealEarthAnimateVector;
