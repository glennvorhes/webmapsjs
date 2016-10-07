/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import provide from '../util/provide';
import ol from 'custom-ol';
const nm = provide('mixin');

/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
class RealEarthAnimateTile extends RealEarthAnimate {
    _sourceUrls: string[];
    _source: ol.source.XYZ;
    _olLayer: ol.layer.Tile;

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

    _loadDates(inString: string): string {
        let rawDte = super._loadDates(inString);
        let dteProductUrl =
            `http://realearth.ssec.wisc.edu/api/image?products=${this._products}_${rawDte}&x={x}&y={y}&z={z}`;
        this._sourceUrls.push(dteProductUrl);
        return '';
    }

    /**
     * @protected
     */
    _loadLatest(): boolean {
        if (super._loadLatest()){
            this._source.setUrl(this._sourceUrls[this._sourceUrls.length - 1]);
        }
        return true;
    }

    setLayerTime(theTime: number): boolean {
        if (super.setLayerTime(theTime)) {
            if (this._olLayer.getZIndex() < 0){
                this._olLayer.setZIndex(0);
            }
            this._source.setUrl(this._sourceUrls[this._currentIndex]);
        } else {
            this._olLayer.setZIndex(-1);
        }
        return true;
    }
}

nm.RealEarthAnimateTile = RealEarthAnimateTile;
export default RealEarthAnimateTile;
