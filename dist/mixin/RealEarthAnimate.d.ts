/**
 * Mixin to get the product times
 * Be sure to call getTimeInit after the mixin has been applied
 */
export declare class RealEarthAnimate {
    _animateEnabled: boolean;
    _currentIndex: number;
    _localDates: Date[];
    _rawDateStrings: string[];
    _products: string;
    loadCallback: Function;
    localTimes: number[];
    _currentTime: number;
    _loaded: boolean;
    _visible: boolean;
    /**
     * override base layer load
     */
    load(): void;
    /**
     * Call this after the mixin has been applied
     */
    timeInit(): void;
    /**
     *
     * @returns {boolean} if animation enabled
     */
    readonly animationEnabled: boolean;
    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input string to parse
     * @returns {string} the converted string
     * @protected
     */
    _loadDates(inString: string): string;
    /**
     *
     * @protected
     * @returns {boolean} if should continue
     */
    _loadLatest(): boolean;
    /**
     *
     * @param {number} theTime - the time
     * @returns {boolean} true if new index, false if the same or below lowest value
     */
    setLayerTime(theTime: number): boolean;
}
export default RealEarthAnimate;
