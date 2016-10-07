/**
 * Created by gavorhes on 12/8/2015.
 */
import provide from '../util/provide';
import ol from 'custom-ol';
const nm = provide('olHelpers');



/**
 * base interaction
 */
export class MapInteractionBase {
    _map: ol.Map;
    _initialized: boolean;
    _subtype: string;

    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    constructor(subtype: string) {
        this._map = null;
        this._initialized = false;
        this._subtype = subtype;
    }

    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    init(theMap: ol.Map){
        if (!this._initialized){
            this._map = theMap;
            this._initialized = true;
        }
    }

    /**
     * get reference to the ol map object
     * @returns {ol.Map} the map object
     */
    get map() {
        return this._map;
    }

    /**
     * get if is initialized
     * @returns {boolean} is initialized
     */
    get initialized() {
        return this._initialized;
    }

    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    _checkInit() {
        if (!this.initialized) {
            let msg = `${this._subtype} object not initialized`;
            alert(msg);
            console.log(msg);
            throw msg;
        }
    }

    /**
     * Check the initialization status and throw exception if not valid yet
     */
    checkInit(){
        this._checkInit();
    }
}

nm.MapInteractionBase = MapInteractionBase;
export default MapInteractionBase;
