"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by gavorhes on 12/4/2015.
 */
var RealEarthAnimate_1 = require('./RealEarthAnimate');
var provide_1 = require('../util/provide');
var nm = provide_1.default('mixin');
/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */
var RealEarthAnimateTile = (function (_super) {
    __extends(RealEarthAnimateTile, _super);
    function RealEarthAnimateTile() {
        _super.apply(this, arguments);
    }
    /**
     * override base layer load
     */
    RealEarthAnimateTile.prototype.load = function () {
        _super.prototype.load.call(this);
    };
    ;
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
//# sourceMappingURL=RealEarthAnimateTile.js.map