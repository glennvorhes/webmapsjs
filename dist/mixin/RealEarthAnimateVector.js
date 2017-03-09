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
        this._source.addFeatures(this._lyr._geoJsonFormat.readFeatures(geojObj, this._lyr._transform));
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
//# sourceMappingURL=RealEarthAnimateVector.js.map