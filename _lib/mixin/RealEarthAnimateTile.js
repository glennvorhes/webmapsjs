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

/**
 * Animate real earth tile
 * @augments RealEarthAnimate
 */

var RealEarthAnimateTile = function (_RealEarthAnimate) {
    _inherits(RealEarthAnimateTile, _RealEarthAnimate);

    function RealEarthAnimateTile() {
        _classCallCheck(this, RealEarthAnimateTile);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RealEarthAnimateTile).apply(this, arguments));
    }

    _createClass(RealEarthAnimateTile, [{
        key: 'load',


        /**
         * override base layer load
         */
        value: function load() {
            _get(Object.getPrototypeOf(RealEarthAnimateTile.prototype), 'load', this).call(this);
        }
    }, {
        key: 'timeInit',
        value: function timeInit() {
            _get(Object.getPrototypeOf(RealEarthAnimateTile.prototype), 'timeInit', this).call(this);
            this._sourceUrls = [];
        }
    }, {
        key: '_loadDates',
        value: function _loadDates(inString) {
            var rawDte = _get(Object.getPrototypeOf(RealEarthAnimateTile.prototype), '_loadDates', this).call(this, inString);
            var dteProductUrl = 'http://realearth.ssec.wisc.edu/api/image?products=' + this._products + '_' + rawDte + '&x={x}&y={y}&z={z}';
            this._sourceUrls.push(dteProductUrl);
        }

        /**
         * @protected
         */

    }, {
        key: '_loadLatest',
        value: function _loadLatest() {
            if (_get(Object.getPrototypeOf(RealEarthAnimateTile.prototype), '_loadLatest', this).call(this)) {
                this._source.setUrl(this._sourceUrls[this._sourceUrls.length - 1]);
            }
        }
    }, {
        key: 'setLayerTime',
        value: function setLayerTime(theTime) {
            if (_get(Object.getPrototypeOf(RealEarthAnimateTile.prototype), 'setLayerTime', this).call(this, theTime)) {
                if (this.olLayer.getZIndex() < 0) {
                    this.olLayer.setZIndex(0);
                }
                this._source.setUrl(this._sourceUrls[this._currentIndex]);
            } else {
                this.olLayer.setZIndex(-1);
            }
        }
    }]);

    return RealEarthAnimateTile;
}(_RealEarthAnimate3.default);

nm.RealEarthAnimateTile = RealEarthAnimateTile;
exports.default = RealEarthAnimateTile;
module.exports = exports['default'];