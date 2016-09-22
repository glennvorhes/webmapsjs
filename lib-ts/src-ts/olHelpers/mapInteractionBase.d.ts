import { ol } from 'custom-ol';
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
    init(theMap: ol.Map): boolean;
    /**
     * get reference to the ol map object
     * @returns {ol.Map} the map object
     */
    map: ol.Map;
    /**
     * get if is initialized
     * @returns {boolean} is initialized
     */
    initialized: boolean;
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
