/**
 * Created by gavorhes on 12/4/2015.
 */
import RealEarthAnimate from './RealEarthAnimate';
import LayerRealEarthTile from "../layers/LayerRealEarthTile";
import XYZ from 'ol/source/XYZ';
import Tile from 'ol/layer/Tile';
/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
declare class RealEarthAnimateTile extends RealEarthAnimate {
    _sourceUrls: string[];
    _source: XYZ;
    _olLayer: Tile;
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
