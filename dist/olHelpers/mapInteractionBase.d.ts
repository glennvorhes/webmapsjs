import ol = require('custom-ol');
/**
 * base interaction
 */
export declare class MapInteractionBase {
    _map: ol.Map;
    _initialized: boolean;
    _subtype: string;
    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    constructor(subtype: string);
    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    init(theMap: ol.Map): void;
    /**
     * get reference to the ol map object
     * @returns {ol.Map} the map object
     */
    readonly map: any;
    /**
     * get if is initialized
     * @returns {boolean} is initialized
     */
    readonly initialized: boolean;
    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    _checkInit(): void;
    /**
     * Check the initialization status and throw exception if not valid yet
     */
    checkInit(): void;
}
export default MapInteractionBase;
