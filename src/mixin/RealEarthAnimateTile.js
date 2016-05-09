/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import provide from '../util/provide';
const nm = provide('mixin');

/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
class RealEarthAnimateTile extends RealEarthAnimate {

    /**
     * override base layer load
     */
    load() {
        super.load();
    };


    timeInit() {
        super.timeInit();
        this._sourceUrls = [];
    }

    _loadDates(inString) {
        let rawDte = super._loadDates(inString);
        let dteProductUrl =
            `http://realearth.ssec.wisc.edu/api/image?products=${this._products}_${rawDte}&x={x}&y={y}&z={z}`;
        this._sourceUrls.push(dteProductUrl);
    }

    /**
     * @protected
     */
    _loadLatest() {
        if (super._loadLatest()){
            this._source.setUrl(this._sourceUrls[this._sourceUrls.length - 1]);
        }
    }

    setLayerTime(theTime) {
        if (super.setLayerTime(theTime)) {
            if (this.olLayer.getZIndex() < 0){
                this.olLayer.setZIndex(0);
            }
            this._source.setUrl(this._sourceUrls[this._currentIndex]);
        } else {
            this.olLayer.setZIndex(-1);
        }
    }
}

nm.RealEarthAnimateTile = RealEarthAnimateTile;
export default RealEarthAnimateTile;
