"use strict";
/**
 * Created by gavorhes on 12/8/2015.
 */
var provide_1 = require("../util/provide");
var nm = provide_1.default('olHelpers');
/**
 * base interaction
 */
var MapInteractionBase = (function () {
    /**
     * map interaction base
     * @param subtype - the interaction subtype
     */
    function MapInteractionBase(subtype) {
        this._map = null;
        this._initialized = false;
        this._subtype = subtype;
    }
    /**
     * base initializer, returns true for already initialized
     * @param theMap - the ol Map
     * @returns true for already initialized
     */
    MapInteractionBase.prototype.init = function (theMap) {
        if (!this._initialized) {
            this._map = theMap;
            this._initialized = true;
        }
    };
    Object.defineProperty(MapInteractionBase.prototype, "map", {
        /**
         * get reference to the ol map object
         * @returns {ol.Map} the map object
         */
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapInteractionBase.prototype, "initialized", {
        /**
         * get if is initialized
         * @returns {boolean} is initialized
         */
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check the initialization status and throw exception if not valid yet
     * @protected
     */
    MapInteractionBase.prototype._checkInit = function () {
        if (!this.initialized) {
            var msg = this._subtype + " object not initialized";
            alert(msg);
            console.log(msg);
            throw msg;
        }
    };
    /**
     * Check the initialization status and throw exception if not valid yet
     */
    MapInteractionBase.prototype.checkInit = function () {
        this._checkInit();
    };
    return MapInteractionBase;
}());
exports.MapInteractionBase = MapInteractionBase;
nm.MapInteractionBase = MapInteractionBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapInteractionBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwSW50ZXJhY3Rpb25CYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29sSGVscGVycy9tYXBJbnRlcmFjdGlvbkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHO0FBQ0gsMkNBQXNDO0FBRXRDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFJaEM7O0dBRUc7QUFDSDtJQUtJOzs7T0FHRztJQUNILDRCQUFZLE9BQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpQ0FBSSxHQUFKLFVBQUssTUFBYztRQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFNRCxzQkFBSSxtQ0FBRztRQUpQOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSwyQ0FBVztRQUpmOzs7V0FHRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7SUFDSCx1Q0FBVSxHQUFWO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLEdBQUcsR0FBTSxJQUFJLENBQUMsUUFBUSw0QkFBeUIsQ0FBQztZQUNwRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHNDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSxnREFBa0I7QUFnRS9CLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQzs7QUFDM0Msa0JBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi84LzIwMTUuXHJcbiAqL1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdvbEhlbHBlcnMnKTtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIGJhc2UgaW50ZXJhY3Rpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBJbnRlcmFjdGlvbkJhc2Uge1xyXG4gICAgX21hcDogb2wuTWFwO1xyXG4gICAgX2luaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgX3N1YnR5cGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1hcCBpbnRlcmFjdGlvbiBiYXNlXHJcbiAgICAgKiBAcGFyYW0gc3VidHlwZSAtIHRoZSBpbnRlcmFjdGlvbiBzdWJ0eXBlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN1YnR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zdWJ0eXBlID0gc3VidHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhc2UgaW5pdGlhbGl6ZXIsIHJldHVybnMgdHJ1ZSBmb3IgYWxyZWFkeSBpbml0aWFsaXplZFxyXG4gICAgICogQHBhcmFtIHRoZU1hcCAtIHRoZSBvbCBNYXBcclxuICAgICAqIEByZXR1cm5zIHRydWUgZm9yIGFscmVhZHkgaW5pdGlhbGl6ZWRcclxuICAgICAqL1xyXG4gICAgaW5pdCh0aGVNYXA6IG9sLk1hcCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IHRoZU1hcDtcclxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCByZWZlcmVuY2UgdG8gdGhlIG9sIG1hcCBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtvbC5NYXB9IHRoZSBtYXAgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCBpZiBpcyBpbml0aWFsaXplZFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IGlzIGluaXRpYWxpemVkXHJcbiAgICAgKi9cclxuICAgIGdldCBpbml0aWFsaXplZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGUgaW5pdGlhbGl6YXRpb24gc3RhdHVzIGFuZCB0aHJvdyBleGNlcHRpb24gaWYgbm90IHZhbGlkIHlldFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfY2hlY2tJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBsZXQgbXNnID0gYCR7dGhpcy5fc3VidHlwZX0gb2JqZWN0IG5vdCBpbml0aWFsaXplZGA7XHJcbiAgICAgICAgICAgIGFsZXJ0KG1zZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICAgICAgICAgIHRocm93IG1zZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGUgaW5pdGlhbGl6YXRpb24gc3RhdHVzIGFuZCB0aHJvdyBleGNlcHRpb24gaWYgbm90IHZhbGlkIHlldFxyXG4gICAgICovXHJcbiAgICBjaGVja0luaXQoKXtcclxuICAgICAgICB0aGlzLl9jaGVja0luaXQoKTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTWFwSW50ZXJhY3Rpb25CYXNlID0gTWFwSW50ZXJhY3Rpb25CYXNlO1xyXG5leHBvcnQgZGVmYXVsdCBNYXBJbnRlcmFjdGlvbkJhc2U7XHJcbiJdfQ==