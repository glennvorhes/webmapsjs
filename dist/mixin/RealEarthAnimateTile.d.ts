/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import ol from 'custom-ol';
import LayerRealEarthTile from "../layers/LayerRealEarthTile";
/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
declare class RealEarthAnimateTile extends RealEarthAnimate {
    _sourceUrls: string[];
    _source: ol.source.XYZ;
    _olLayer: ol.layer.Tile;
    constructor(layer: LayerRealEarthTile, loadCallback?: (lyr: LayerRealEarthTile) => void);
    timeInit(): void;
    _loadDates(inString: string): string;
    /**
     * @protected
     */
    _loadLatest(): boolean;
    setLayerTime(theTime: number): boolean;
}
export default RealEarthAnimateTile;
