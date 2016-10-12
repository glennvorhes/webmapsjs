/**
 * Created by gavorhes on 12/4/2015.
 */
import provide from '../util/provide';
import mapPopup from '../olHelpers/mapPopup';
import LayerRealEarthTile from "../layers/LayerRealEarthTile";
import {LayerVectorRealEarth} from '../layers/LayerRealEarthVector'
import $ = require('jquery');

const nm = provide('mixin');


/**
 * The GMT offset time in minutes
 * @type {number}
 */
let offsetMinutes = (new Date()).getTimezoneOffset();

export interface IRealEarthAnimate{
    setLayerTime(theTime: number): boolean;
}

export interface timesLoadedCallback{
    (lyr?: LayerRealEarthTile|LayerVectorRealEarth): void;
}


/**
 * Mixin to get the product times
 * Be sure to call getTimeInit after the mixin has been applied
 */
export class RealEarthAnimate {
    _animateEnabled: boolean;
    _currentIndex: number;
    _localDates: Date[];
    _rawDateStrings: string[];
    _products: string;
    loadCallback: timesLoadedCallback;
    localTimes: number[];
    _currentTime: number;

    lyr: LayerRealEarthTile|LayerVectorRealEarth;

    constructor(lyr: LayerRealEarthTile|LayerVectorRealEarth, loadCallback?: timesLoadedCallback){
        this.lyr = lyr;
        this._products = lyr._products;
        if (loadCallback){
            this.loadCallback = loadCallback;
        } else {
            this.loadCallback = function(): void {return;};
        }
    }


    /**
     * Call this after the mixin has been applied
     */
    timeInit() {

        this._rawDateStrings = [];
        this._localDates = [];
        this.localTimes = [];
        this._animateEnabled = true;
        // this._loaded = true;
        this._currentTime = undefined;
        this._currentIndex = undefined;

        $.get('http://realearth.ssec.wisc.edu/api/products', {products: this._products}, (d) => {
            if (d.length == 0) {
                console.log(`${this._products} layer not available or does not have times`);

                return;
            }
            d = d[0];
            for (let i = 0; i < d['times'].length; i++) {
                this._loadDates.call(this, d['times'][i]);
            }
            this.loadCallback.call(this.lyr, this.lyr);
            this._loadLatest.call(this);
        }, 'json');
    }


    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input string to parse
     * @returns {string} the converted string
     * @protected
     */
    _loadDates(inString: string): string {
        let yr = inString.slice(0, 4);
        let month = inString.slice(4, 6);
        let d = inString.slice(6, 8);
        let hr = inString.slice(9, 11);
        let mn = inString.slice(11, 13);
        let sec = inString.slice(13, 15);

        let rawDateStr = inString.replace('.', '_');
        this._rawDateStrings.push(rawDateStr);

        let dteStr = `${month}/${d}/${yr} ${hr}:${mn}:${sec}`;
        let newDte = new Date(dteStr);
        newDte.setMinutes(newDte.getMinutes() - offsetMinutes);
        this._localDates.push(newDte);
        this.localTimes.push(newDte.getTime());

        return rawDateStr;
    }

    /**
     *
     * @protected
     * @returns {boolean} if should continue
     */
    _loadLatest(){
        mapPopup.closePopup();
        if (this.localTimes.length > 0){
            this._currentIndex = this.localTimes.length -1;

            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @param {number} theTime - the time
     * @returns {boolean} true if new index, false if the same or below lowest value
     */
    setLayerTime(theTime: number): boolean{

        this._currentTime = theTime;

        let newIndex;

        if (theTime < this.localTimes[0]){
            return false;
        } else if (theTime > this.localTimes[this.localTimes.length - 1]){
            newIndex = this.localTimes.length - 1;
        }

        for (let i = 0; i < this.localTimes.length; i++){
            if (this.localTimes[i] >= theTime){
                newIndex = i;
                break;
            }
        }

        if (newIndex == this._currentIndex){
            return false;
        } else {
            this._currentIndex = newIndex;
            mapPopup.closePopup();

            return true;
        }
    }
}

nm.RealEarthAnimate = RealEarthAnimate;
export default RealEarthAnimate;

