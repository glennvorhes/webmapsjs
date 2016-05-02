/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import provide from '../util/provide';
let nm = provide('mixin');
const $ = require('jquery');


/**
 * class mixin to animate RealEarth vector layers
 * @augments RealEarthAnimate
 */
class RealEarthAnimateVector extends RealEarthAnimate {

    /**
     * override base layer load
     */
    load() {
        super.load();
    };

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
    _loadDates(inString) {
        let rawDte = super._loadDates(inString);
        this._dataCache.push(null);
        this._rawTimesLookup[rawDte] = null;
    }

    /**
     * @protected
     */
    _loadLatest() {
        if(super._loadLatest()){
            this._loadAtTimeIndex.call(this, this._currentIndex);
        }
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
    _loadAtTimeIndex(i, setAsSource) {
        setAsSource = typeof setAsSource == 'boolean' ? setAsSource : true;
        if (this._dataCache[i] != null) {
            this.source.clear();
            this._loadFeatures(this._dataCache[i]);
        } else {
            let _this = this;
            $.get('http://realearth.ssec.wisc.edu:80/api/shapes',
                {products: `${this._products}_${this._rawDateStrings[i]}`},
                function (d) {
                    _this._dataCache[i] = d;
                    _this._rawTimesLookup[_this._rawDateStrings[i]] = d;
                    if (setAsSource) {
                        _this.source.clear();
                        _this._loadFeatures.call(_this, _this._dataCache[i]);
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
        this.source.addFeatures(this._geoJsonFormat.readFeatures(geojObj, this._transform));
    }

    setLayerTime(theTime) {
        if (super.setLayerTime(theTime)){
            this._loadAtTimeIndex(this._currentIndex);
        } else {
            this.source.clear();
        }
    }
}

nm.RealEarthAnimateVector = RealEarthAnimateVector;
export default RealEarthAnimateVector;
