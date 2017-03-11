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
var nm = provide_1.default('mixin');
/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
var RealEarthAnimateTile = (function (_super) {
    __extends(RealEarthAnimateTile, _super);
    function RealEarthAnimateTile(layer, loadCallback) {
        var _this = _super.call(this, layer, loadCallback) || this;
        _this._source = layer.source;
        _this._olLayer = layer.olLayer;
        return _this;
    }
    RealEarthAnimateTile.prototype.timeInit = function () {
        _super.prototype.timeInit.call(this);
        this._sourceUrls = [];
    };
    RealEarthAnimateTile.prototype._loadDates = function (inString) {
        var rawDte = _super.prototype._loadDates.call(this, inString);
        var dteProductUrl = "http://realearth.ssec.wisc.edu/api/image?products=" + this._products + "_" + rawDte + "&x={x}&y={y}&z={z}";
        this._sourceUrls.push(dteProductUrl);
        return '';
    };
    /**
     * @protected
     */
    RealEarthAnimateTile.prototype._loadLatest = function () {
        if (_super.prototype._loadLatest.call(this)) {
            this._source.setUrl(this._sourceUrls[this._sourceUrls.length - 1]);
        }
        return true;
    };
    RealEarthAnimateTile.prototype.setLayerTime = function (theTime) {
        if (_super.prototype.setLayerTime.call(this, theTime)) {
            if (this._olLayer.getZIndex() < 0) {
                this._olLayer.setZIndex(0);
            }
            this._source.setUrl(this._sourceUrls[this._currentIndex]);
        }
        else {
            this._olLayer.setZIndex(-1);
        }
        return true;
    };
    return RealEarthAnimateTile;
}(RealEarthAnimate_1.default));
nm.RealEarthAnimateTile = RealEarthAnimateTile;
exports.default = RealEarthAnimateTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhbEVhcnRoQW5pbWF0ZVRpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW4vUmVhbEVhcnRoQW5pbWF0ZVRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx1REFBa0Q7QUFDbEQsMkNBQXNDO0FBR3RDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFNUI7OztHQUdHO0FBQ0g7SUFBbUMsd0NBQWdCO0lBSy9DLDhCQUFZLEtBQXlCLEVBQUUsWUFBZ0Q7UUFBdkYsWUFDSSxrQkFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLFNBRzdCO1FBRkcsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFDbEMsQ0FBQztJQUlELHVDQUFRLEdBQVI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLFFBQWdCO1FBQ3ZCLElBQUksTUFBTSxHQUFHLGlCQUFNLFVBQVUsWUFBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLGFBQWEsR0FDYix1REFBcUQsSUFBSSxDQUFDLFNBQVMsU0FBSSxNQUFNLHVCQUFvQixDQUFDO1FBQ3RHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQ0FBVyxHQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQU0sV0FBVyxXQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsaUJBQU0sWUFBWSxZQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQS9DRCxDQUFtQywwQkFBZ0IsR0ErQ2xEO0FBRUQsRUFBRSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQy9DLGtCQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvNC8yMDE1LlxyXG4gKi9cclxuaW1wb3J0IFJlYWxFYXJ0aEFuaW1hdGUgZnJvbSAnLi9SZWFsRWFydGhBbmltYXRlJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCBMYXllclJlYWxFYXJ0aFRpbGUgZnJvbSBcIi4uL2xheWVycy9MYXllclJlYWxFYXJ0aFRpbGVcIjtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdtaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEFuaW1hdGUgcmVhbCBlYXJ0aCB0aWxlXHJcbiAqIEBhdWdtZW50cyBSZWFsRWFydGhBbmltYXRlXHJcbiAqL1xyXG5jbGFzcyBSZWFsRWFydGhBbmltYXRlVGlsZSBleHRlbmRzIFJlYWxFYXJ0aEFuaW1hdGUge1xyXG4gICAgX3NvdXJjZVVybHM6IHN0cmluZ1tdO1xyXG4gICAgX3NvdXJjZTogb2wuc291cmNlLlhZWjtcclxuICAgIF9vbExheWVyOiBvbC5sYXllci5UaWxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxheWVyOiBMYXllclJlYWxFYXJ0aFRpbGUsIGxvYWRDYWxsYmFjaz86IChseXI6IExheWVyUmVhbEVhcnRoVGlsZSkgPT4gdm9pZCl7XHJcbiAgICAgICAgc3VwZXIobGF5ZXIsIGxvYWRDYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlID0gbGF5ZXIuc291cmNlO1xyXG4gICAgICAgIHRoaXMuX29sTGF5ZXIgPSBsYXllci5vbExheWVyO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdGltZUluaXQoKSB7XHJcbiAgICAgICAgc3VwZXIudGltZUluaXQoKTtcclxuICAgICAgICB0aGlzLl9zb3VyY2VVcmxzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgX2xvYWREYXRlcyhpblN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmF3RHRlID0gc3VwZXIuX2xvYWREYXRlcyhpblN0cmluZyk7XHJcbiAgICAgICAgbGV0IGR0ZVByb2R1Y3RVcmwgPVxyXG4gICAgICAgICAgICBgaHR0cDovL3JlYWxlYXJ0aC5zc2VjLndpc2MuZWR1L2FwaS9pbWFnZT9wcm9kdWN0cz0ke3RoaXMuX3Byb2R1Y3RzfV8ke3Jhd0R0ZX0meD17eH0meT17eX0mej17en1gO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZVVybHMucHVzaChkdGVQcm9kdWN0VXJsKTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIF9sb2FkTGF0ZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzdXBlci5fbG9hZExhdGVzdCgpKXtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLnNldFVybCh0aGlzLl9zb3VyY2VVcmxzW3RoaXMuX3NvdXJjZVVybHMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXllclRpbWUodGhlVGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN1cGVyLnNldExheWVyVGltZSh0aGVUaW1lKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb2xMYXllci5nZXRaSW5kZXgoKSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2xMYXllci5zZXRaSW5kZXgoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc291cmNlLnNldFVybCh0aGlzLl9zb3VyY2VVcmxzW3RoaXMuX2N1cnJlbnRJbmRleF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLlJlYWxFYXJ0aEFuaW1hdGVUaWxlID0gUmVhbEVhcnRoQW5pbWF0ZVRpbGU7XHJcbmV4cG9ydCBkZWZhdWx0IFJlYWxFYXJ0aEFuaW1hdGVUaWxlO1xyXG4iXX0=