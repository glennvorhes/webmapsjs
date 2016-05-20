(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../jquery', './LayerBaseXyzTile', '../mixin/RealEarthAnimateTile', '../util/provide', 'es6-mixins'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../jquery'), require('./LayerBaseXyzTile'), require('../mixin/RealEarthAnimateTile'), require('../util/provide'), require('es6-mixins'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.jquery, global.LayerBaseXyzTile, global.RealEarthAnimateTile, global.provide, global.es6Mixins);
        global.LayerRealEarthTile = mod.exports;
    }
})(this, function (module, exports, _jquery, _LayerBaseXyzTile2, _RealEarthAnimateTile, _provide, mixIns) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _LayerBaseXyzTile3 = _interopRequireDefault(_LayerBaseXyzTile2);

    var _RealEarthAnimateTile2 = _interopRequireDefault(_RealEarthAnimateTile);

    var _provide2 = _interopRequireDefault(_provide);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var nm = (0, _provide2.default)('layers');

    /**
     * Real earth tile
     * @augments LayerBaseXyzTile
     */

    var LayerRealEarthTile = function (_LayerBaseXyzTile) {
        _inherits(LayerRealEarthTile, _LayerBaseXyzTile);

        /**
         * The base layer for all others
         * @param {object} options - config
         * @param {string} [options.id] - layer id
         * @param {string} [options.name=Unnamed Layer] - layer name
         * @param {number} [options.opacity=1] - opacity
         * @param {boolean} [options.visible=true] - default visible
         * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
         * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
         * @param {object} [options.params={}] the get parameters to include to retrieve the layer
         * @param {number} [options.zIndex=0] the z index for the layer
         * @param {function} [options.loadCallback] function to call on load, context this is the layer object
         * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
         * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
         * @param {boolean} [options.legendContent] additional content to add to the legend
         *
         * @param {string} options.products - the products to request
         * @param {boolean} [options.hasTimes=false] If the layer is time dependent, fixed set of dates
         * @param {boolean} [options.animate=false] if the layer should be animated
         */

        function LayerRealEarthTile(options) {
            _classCallCheck(this, LayerRealEarthTile);

            options.animate = typeof options.animate == 'boolean' ? options.animate : false;
            if (!options.animate) {
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerRealEarthTile).call(this, 'http://realearth.ssec.wisc.edu/api/image?products=' + options.products + '&x={x}&y={y}&z={z}', options));

                _this._products = options.products;
            } else {
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerRealEarthTile).call(this, '', options));

                _this._products = options.products;

                if (!_this.timeInit) {
                    mixIns([_RealEarthAnimateTile2.default], _this);
                }
                _this.timeInit();
            }
            return _possibleConstructorReturn(_this);
        }

        return LayerRealEarthTile;
    }(_LayerBaseXyzTile3.default);

    nm.LayerRealEarthTile = LayerRealEarthTile;
    exports.default = LayerRealEarthTile;
    module.exports = exports['default'];
});