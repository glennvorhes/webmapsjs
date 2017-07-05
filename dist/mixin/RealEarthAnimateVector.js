"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/4/2015.
 */
var RealEarthAnimate_1 = require("./RealEarthAnimate");
var provide_1 = require("../util/provide");
var $ = require("jquery");
var nm = provide_1.default('mixin');
/**
 * class mixin to animate RealEarth vector layers
 * @augments RealEarthAnimate
 */
var RealEarthAnimateVector = (function (_super) {
    __extends(RealEarthAnimateVector, _super);
    function RealEarthAnimateVector(layer, loadCallback) {
        var _this = _super.call(this, layer, loadCallback) || this;
        _this._source = layer.source;
        _this._olLayer = layer.olLayer;
        _this._lyr = layer;
        return _this;
    }
    /**
     * Call this after the mixin has been applied
     */
    RealEarthAnimateVector.prototype.timeInit = function () {
        _super.prototype.timeInit.call(this);
        this._rawTimesLookup = {};
        this._dataCache = [];
    };
    /**
     * Given the raw time string, add to the arrays to keep track of dates and cache
     * @param {string} inString - input date string
     * @protected
     */
    RealEarthAnimateVector.prototype._loadDates = function (inString) {
        var rawDte = _super.prototype._loadDates.call(this, inString);
        this._dataCache.push(null);
        this._rawTimesLookup[rawDte] = null;
        return '';
    };
    /**
     * @protected
     */
    RealEarthAnimateVector.prototype._loadLatest = function () {
        if (_super.prototype._loadLatest.call(this)) {
            this._loadAtTimeIndex.call(this, this._currentIndex);
        }
        return true;
    };
    //
    //http://realearth.ssec.wisc.edu/api/image?products=nexrhres_20160108_212500&x=1&y=5&z=4
    //
    //    20160108.205500
    //    http://realearth.ssec.wisc.edu/api/image?products=nexrhres_20160108_205500&x=34&y=46&z=7
    /**
     * Load the features at the date index specified
     * @param {number} i the index of the features to be loaded by date
     * @param {boolean} [setAsSource=true] set to false to trigger cache load only
     * @private
     */
    RealEarthAnimateVector.prototype._loadAtTimeIndex = function (i, setAsSource) {
        if (setAsSource === void 0) { setAsSource = true; }
        setAsSource = typeof setAsSource == 'boolean' ? setAsSource : true;
        if (this._dataCache[i] != null) {
            this._source.clear();
            this._loadFeatures(this._dataCache[i]);
        }
        else {
            var __this_1 = this;
            $.get('http://realearth.ssec.wisc.edu:80/api/shapes', { products: this._products + "_" + this._rawDateStrings[i] }, function (d) {
                __this_1._dataCache[i] = d;
                __this_1._rawTimesLookup[__this_1._rawDateStrings[i]] = d;
                if (setAsSource) {
                    __this_1._source.clear();
                    __this_1._loadFeatures.call(__this_1, __this_1._dataCache[i]);
                }
            }, 'json');
        }
    };
    /**
     * helper to load the features at the index specified
     * @param {object} geojObj - the geojson object
     * @private
     */
    RealEarthAnimateVector.prototype._loadFeatures = function (geojObj) {
        this._source.addFeatures(this._lyr._geoJsonFormat.readFeatures(geojObj, { featureProjection: this._lyr._transform.featureProjection, dataProjection: this._lyr._transform.dataProjection }));
    };
    RealEarthAnimateVector.prototype.setLayerTime = function (theTime) {
        if (_super.prototype.setLayerTime.call(this, theTime)) {
            this._loadAtTimeIndex(this._currentIndex);
        }
        else {
            this._source.clear();
        }
        return true;
    };
    return RealEarthAnimateVector;
}(RealEarthAnimate_1.default));
nm.RealEarthAnimateVector = RealEarthAnimateVector;
exports.default = RealEarthAnimateVector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhbEVhcnRoQW5pbWF0ZVZlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXhpbi9SZWFsRWFydGhBbmltYXRlVmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsdURBQWtEO0FBQ2xELDJDQUFzQztBQUd0QywwQkFBNkI7QUFDN0IsSUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUc1Qjs7O0dBR0c7QUFDSDtJQUFxQywwQ0FBZ0I7SUFRakQsZ0NBQVksS0FBMkIsRUFBRSxZQUFrRDtRQUEzRixZQUNJLGtCQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsU0FJN0I7UUFIRyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOztJQUN0QixDQUFDO0lBR0Q7O09BRUc7SUFDSCx5Q0FBUSxHQUFSO1FBQ0ksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQ0FBVSxHQUFWLFVBQVcsUUFBZ0I7UUFDdkIsSUFBSSxNQUFNLEdBQUcsaUJBQU0sVUFBVSxZQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw0Q0FBVyxHQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQU0sV0FBVyxXQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsRUFBRTtJQUNGLHdGQUF3RjtJQUN4RixFQUFFO0lBQ0YscUJBQXFCO0lBQ3JCLDhGQUE4RjtJQUU5Rjs7Ozs7T0FLRztJQUNILGlEQUFnQixHQUFoQixVQUFpQixDQUFTLEVBQUUsV0FBa0I7UUFBbEIsNEJBQUEsRUFBQSxrQkFBa0I7UUFDMUMsV0FBVyxHQUFHLE9BQU8sV0FBVyxJQUFJLFNBQVMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksUUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixDQUFDLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUNoRCxFQUFDLFFBQVEsRUFBSyxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFHLEVBQUMsRUFDMUQsVUFBVSxDQUFDO2dCQUNQLFFBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixRQUFNLENBQUMsZUFBZSxDQUFDLFFBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsUUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdkIsUUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBTSxFQUFFLFFBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsQ0FBQztZQUNMLENBQUMsRUFBRSxNQUFNLENBQ1osQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDhDQUFhLEdBQWIsVUFBYyxPQUFPO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQ2xFLEVBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBRUQsNkNBQVksR0FBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsaUJBQU0sWUFBWSxZQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQWxHRCxDQUFxQywwQkFBZ0IsR0FrR3BEO0FBRUQsRUFBRSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0FBQ25ELGtCQUFlLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvNC8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IFJlYWxFYXJ0aEFuaW1hdGUgZnJvbSAnLi9SZWFsRWFydGhBbmltYXRlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCB7TGF5ZXJWZWN0b3JSZWFsRWFydGh9IGZyb20gXCIuLi9sYXllcnMvTGF5ZXJSZWFsRWFydGhWZWN0b3JcIjtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdtaXhpbicpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBjbGFzcyBtaXhpbiB0byBhbmltYXRlIFJlYWxFYXJ0aCB2ZWN0b3IgbGF5ZXJzXHJcbiAqIEBhdWdtZW50cyBSZWFsRWFydGhBbmltYXRlXHJcbiAqL1xyXG5jbGFzcyBSZWFsRWFydGhBbmltYXRlVmVjdG9yIGV4dGVuZHMgUmVhbEVhcnRoQW5pbWF0ZSB7XHJcbiAgICBfZGF0YUNhY2hlOiBBcnJheTxBcnJheTxPYmplY3Q+fE9iamVjdD47XHJcbiAgICBfc291cmNlOiBvbC5zb3VyY2UuVmVjdG9yO1xyXG4gICAgX3Jhd1RpbWVzTG9va3VwOiB7W3M6IHN0cmluZ106IGFueX07XHJcbiAgICBfY3VycmVudEluZGV4OiBudW1iZXI7XHJcbiAgICBfb2xMYXllcjogb2wubGF5ZXIuVmVjdG9yO1xyXG4gICAgX2x5cjogTGF5ZXJWZWN0b3JSZWFsRWFydGg7XHJcblxyXG4gICAgY29uc3RydWN0b3IobGF5ZXI6IExheWVyVmVjdG9yUmVhbEVhcnRoLCBsb2FkQ2FsbGJhY2s/OiAobHlyOiBMYXllclZlY3RvclJlYWxFYXJ0aCkgPT4gdm9pZCl7XHJcbiAgICAgICAgc3VwZXIobGF5ZXIsIGxvYWRDYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gbGF5ZXIuc291cmNlO1xyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIgPSBsYXllci5vbExheWVyO1xyXG4gICAgICAgIHRoaXMuX2x5ciA9IGxheWVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGwgdGhpcyBhZnRlciB0aGUgbWl4aW4gaGFzIGJlZW4gYXBwbGllZFxyXG4gICAgICovXHJcbiAgICB0aW1lSW5pdCgpIHtcclxuICAgICAgICBzdXBlci50aW1lSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuX3Jhd1RpbWVzTG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5fZGF0YUNhY2hlID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHaXZlbiB0aGUgcmF3IHRpbWUgc3RyaW5nLCBhZGQgdG8gdGhlIGFycmF5cyB0byBrZWVwIHRyYWNrIG9mIGRhdGVzIGFuZCBjYWNoZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGluU3RyaW5nIC0gaW5wdXQgZGF0ZSBzdHJpbmdcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgX2xvYWREYXRlcyhpblN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmF3RHRlID0gc3VwZXIuX2xvYWREYXRlcyhpblN0cmluZyk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUNhY2hlLnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fcmF3VGltZXNMb29rdXBbcmF3RHRlXSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfbG9hZExhdGVzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3VwZXIuX2xvYWRMYXRlc3QoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQXRUaW1lSW5kZXguY2FsbCh0aGlzLCB0aGlzLl9jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgLy9odHRwOi8vcmVhbGVhcnRoLnNzZWMud2lzYy5lZHUvYXBpL2ltYWdlP3Byb2R1Y3RzPW5leHJocmVzXzIwMTYwMTA4XzIxMjUwMCZ4PTEmeT01Jno9NFxyXG4gICAgLy9cclxuICAgIC8vICAgIDIwMTYwMTA4LjIwNTUwMFxyXG4gICAgLy8gICAgaHR0cDovL3JlYWxlYXJ0aC5zc2VjLndpc2MuZWR1L2FwaS9pbWFnZT9wcm9kdWN0cz1uZXhyaHJlc18yMDE2MDEwOF8yMDU1MDAmeD0zNCZ5PTQ2Jno9N1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCB0aGUgZmVhdHVyZXMgYXQgdGhlIGRhdGUgaW5kZXggc3BlY2lmaWVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2YgdGhlIGZlYXR1cmVzIHRvIGJlIGxvYWRlZCBieSBkYXRlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZXRBc1NvdXJjZT10cnVlXSBzZXQgdG8gZmFsc2UgdG8gdHJpZ2dlciBjYWNoZSBsb2FkIG9ubHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9sb2FkQXRUaW1lSW5kZXgoaTogbnVtYmVyLCBzZXRBc1NvdXJjZSA9IHRydWUpIHtcclxuICAgICAgICBzZXRBc1NvdXJjZSA9IHR5cGVvZiBzZXRBc1NvdXJjZSA9PSAnYm9vbGVhbicgPyBzZXRBc1NvdXJjZSA6IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFDYWNoZVtpXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5jbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkRmVhdHVyZXModGhpcy5fZGF0YUNhY2hlW2ldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgX190aGlzID0gdGhpcztcclxuICAgICAgICAgICAgJC5nZXQoJ2h0dHA6Ly9yZWFsZWFydGguc3NlYy53aXNjLmVkdTo4MC9hcGkvc2hhcGVzJyxcclxuICAgICAgICAgICAgICAgIHtwcm9kdWN0czogYCR7dGhpcy5fcHJvZHVjdHN9XyR7dGhpcy5fcmF3RGF0ZVN0cmluZ3NbaV19YH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9fdGhpcy5fZGF0YUNhY2hlW2ldID0gZDtcclxuICAgICAgICAgICAgICAgICAgICBfX3RoaXMuX3Jhd1RpbWVzTG9va3VwW19fdGhpcy5fcmF3RGF0ZVN0cmluZ3NbaV1dID0gZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0QXNTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX190aGlzLl9zb3VyY2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX190aGlzLl9sb2FkRmVhdHVyZXMuY2FsbChfX3RoaXMsIF9fdGhpcy5fZGF0YUNhY2hlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAnanNvbidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoZWxwZXIgdG8gbG9hZCB0aGUgZmVhdHVyZXMgYXQgdGhlIGluZGV4IHNwZWNpZmllZFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGdlb2pPYmogLSB0aGUgZ2VvanNvbiBvYmplY3RcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9sb2FkRmVhdHVyZXMoZ2Vvak9iaikge1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5hZGRGZWF0dXJlcyh0aGlzLl9seXIuX2dlb0pzb25Gb3JtYXQucmVhZEZlYXR1cmVzKGdlb2pPYmosXHJcbiAgICAgICAgICAgIHtmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5fbHlyLl90cmFuc2Zvcm0uZmVhdHVyZVByb2plY3Rpb24sIGRhdGFQcm9qZWN0aW9uOiB0aGlzLl9seXIuX3RyYW5zZm9ybS5kYXRhUHJvamVjdGlvbn0pKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXllclRpbWUodGhlVGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN1cGVyLnNldExheWVyVGltZSh0aGVUaW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQXRUaW1lSW5kZXgodGhpcy5fY3VycmVudEluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLlJlYWxFYXJ0aEFuaW1hdGVWZWN0b3IgPSBSZWFsRWFydGhBbmltYXRlVmVjdG9yO1xyXG5leHBvcnQgZGVmYXVsdCBSZWFsRWFydGhBbmltYXRlVmVjdG9yO1xyXG4iXX0=