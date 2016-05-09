'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _RealEarthAnimate2 = require('./RealEarthAnimate');

var _RealEarthAnimate3 = _interopRequireDefault(_RealEarthAnimate2);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 12/4/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var nm = (0, _provide2.default)('mixin');
var $ = require('jquery');

/**
 * class mixin to animate RealEarth vector layers
 * @augments RealEarthAnimate
 */

var RealEarthAnimateVector = function (_RealEarthAnimate) {
    _inherits(RealEarthAnimateVector, _RealEarthAnimate);

    function RealEarthAnimateVector() {
        _classCallCheck(this, RealEarthAnimateVector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RealEarthAnimateVector).apply(this, arguments));
    }

    _createClass(RealEarthAnimateVector, [{
        key: 'load',


        /**
         * override base layer load
         */
        value: function load() {
            _get(Object.getPrototypeOf(RealEarthAnimateVector.prototype), 'load', this).call(this);
        }
    }, {
        key: 'timeInit',


        /**
         * Call this after the mixin has been applied
         */
        value: function timeInit() {
            _get(Object.getPrototypeOf(RealEarthAnimateVector.prototype), 'timeInit', this).call(this);
            this._rawTimesLookup = {};
            this._dataCache = [];
        }

        /**
         * Given the raw time string, add to the arrays to keep track of dates and cache
         * @param {string} inString - input date string
         * @protected
         */

    }, {
        key: '_loadDates',
        value: function _loadDates(inString) {
            var rawDte = _get(Object.getPrototypeOf(RealEarthAnimateVector.prototype), '_loadDates', this).call(this, inString);
            this._dataCache.push(null);
            this._rawTimesLookup[rawDte] = null;
        }

        /**
         * @protected
         */

    }, {
        key: '_loadLatest',
        value: function _loadLatest() {
            if (_get(Object.getPrototypeOf(RealEarthAnimateVector.prototype), '_loadLatest', this).call(this)) {
                this._loadAtTimeIndex.call(this, this._currentIndex);
            }
        }
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

    }, {
        key: '_loadAtTimeIndex',
        value: function _loadAtTimeIndex(i, setAsSource) {
            var _this3 = this;

            setAsSource = typeof setAsSource == 'boolean' ? setAsSource : true;
            if (this._dataCache[i] != null) {
                this.source.clear();
                this._loadFeatures(this._dataCache[i]);
            } else {
                (function () {
                    var _this = _this3;
                    $.get('http://realearth.ssec.wisc.edu:80/api/shapes', { products: _this3._products + '_' + _this3._rawDateStrings[i] }, function (d) {
                        _this._dataCache[i] = d;
                        _this._rawTimesLookup[_this._rawDateStrings[i]] = d;
                        if (setAsSource) {
                            _this.source.clear();
                            _this._loadFeatures.call(_this, _this._dataCache[i]);
                        }
                    }, 'json');
                })();
            }
        }

        /**
         * helper to load the features at the index specified
         * @param {object} geojObj - the geojson object
         * @private
         */

    }, {
        key: '_loadFeatures',
        value: function _loadFeatures(geojObj) {
            this.source.addFeatures(this._geoJsonFormat.readFeatures(geojObj, this._transform));
        }
    }, {
        key: 'setLayerTime',
        value: function setLayerTime(theTime) {
            if (_get(Object.getPrototypeOf(RealEarthAnimateVector.prototype), 'setLayerTime', this).call(this, theTime)) {
                this._loadAtTimeIndex(this._currentIndex);
            } else {
                this.source.clear();
            }
        }
    }]);

    return RealEarthAnimateVector;
}(_RealEarthAnimate3.default);

nm.RealEarthAnimateVector = RealEarthAnimateVector;
exports.default = RealEarthAnimateVector;