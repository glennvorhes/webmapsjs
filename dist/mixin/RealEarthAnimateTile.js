"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RealEarthAnimateTile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhbEVhcnRoQW5pbWF0ZVRpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW4vUmVhbEVhcnRoQW5pbWF0ZVRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx1REFBa0Q7QUFDbEQsMkNBQXNDO0FBR3RDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFNUI7OztHQUdHO0FBQ0g7SUFBbUMsd0NBQWdCO0lBSy9DLDhCQUFZLEtBQXlCLEVBQUUsWUFBZ0Q7UUFBdkYsWUFDSSxrQkFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLFNBRzdCO1FBRkcsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFDbEMsQ0FBQztJQUlELHVDQUFRLEdBQVI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLFFBQWdCO1FBQ3ZCLElBQUksTUFBTSxHQUFHLGlCQUFNLFVBQVUsWUFBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLGFBQWEsR0FDYix1REFBcUQsSUFBSSxDQUFDLFNBQVMsU0FBSSxNQUFNLHVCQUFvQixDQUFDO1FBQ3RHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQ0FBVyxHQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQU0sV0FBVyxXQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLE9BQWU7UUFDeEIsRUFBRSxDQUFDLENBQUMsaUJBQU0sWUFBWSxZQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQS9DRCxDQUFtQywwQkFBZ0IsR0ErQ2xEO0FBRUQsRUFBRSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDOztBQUMvQyxrQkFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzQvMjAxNS5cclxuICovXHJcbmltcG9ydCBSZWFsRWFydGhBbmltYXRlIGZyb20gJy4vUmVhbEVhcnRoQW5pbWF0ZSc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgTGF5ZXJSZWFsRWFydGhUaWxlIGZyb20gXCIuLi9sYXllcnMvTGF5ZXJSZWFsRWFydGhUaWxlXCI7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnbWl4aW4nKTtcclxuXHJcbi8qKlxyXG4gKiBBbmltYXRlIHJlYWwgZWFydGggdGlsZVxyXG4gKiBAYXVnbWVudHMgUmVhbEVhcnRoQW5pbWF0ZVxyXG4gKi9cclxuY2xhc3MgUmVhbEVhcnRoQW5pbWF0ZVRpbGUgZXh0ZW5kcyBSZWFsRWFydGhBbmltYXRlIHtcclxuICAgIF9zb3VyY2VVcmxzOiBzdHJpbmdbXTtcclxuICAgIF9zb3VyY2U6IG9sLnNvdXJjZS5YWVo7XHJcbiAgICBfb2xMYXllcjogb2wubGF5ZXIuVGlsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsYXllcjogTGF5ZXJSZWFsRWFydGhUaWxlLCBsb2FkQ2FsbGJhY2s/OiAobHlyOiBMYXllclJlYWxFYXJ0aFRpbGUpID0+IHZvaWQpe1xyXG4gICAgICAgIHN1cGVyKGxheWVyLCBsb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IGxheWVyLnNvdXJjZTtcclxuICAgICAgICB0aGlzLl9vbExheWVyID0gbGF5ZXIub2xMYXllcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHRpbWVJbml0KCkge1xyXG4gICAgICAgIHN1cGVyLnRpbWVJbml0KCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlVXJscyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIF9sb2FkRGF0ZXMoaW5TdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJhd0R0ZSA9IHN1cGVyLl9sb2FkRGF0ZXMoaW5TdHJpbmcpO1xyXG4gICAgICAgIGxldCBkdGVQcm9kdWN0VXJsID1cclxuICAgICAgICAgICAgYGh0dHA6Ly9yZWFsZWFydGguc3NlYy53aXNjLmVkdS9hcGkvaW1hZ2U/cHJvZHVjdHM9JHt0aGlzLl9wcm9kdWN0c31fJHtyYXdEdGV9Jng9e3h9Jnk9e3l9Jno9e3p9YDtcclxuICAgICAgICB0aGlzLl9zb3VyY2VVcmxzLnB1c2goZHRlUHJvZHVjdFVybCk7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBfbG9hZExhdGVzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3VwZXIuX2xvYWRMYXRlc3QoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5zZXRVcmwodGhpcy5fc291cmNlVXJsc1t0aGlzLl9zb3VyY2VVcmxzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGF5ZXJUaW1lKHRoZVRpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzdXBlci5zZXRMYXllclRpbWUodGhlVGltZSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29sTGF5ZXIuZ2V0WkluZGV4KCkgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29sTGF5ZXIuc2V0WkluZGV4KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5zZXRVcmwodGhpcy5fc291cmNlVXJsc1t0aGlzLl9jdXJyZW50SW5kZXhdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vbExheWVyLnNldFpJbmRleCgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5SZWFsRWFydGhBbmltYXRlVGlsZSA9IFJlYWxFYXJ0aEFuaW1hdGVUaWxlO1xyXG5leHBvcnQgZGVmYXVsdCBSZWFsRWFydGhBbmltYXRlVGlsZTtcclxuIl19