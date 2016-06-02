'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 6/1/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _jquery = require('../jquery/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('collections.layerSwipe');

var LayerSwipe = function () {

    /**
     *
     * @param {ol.Map} map - the map
     * @param {string} [sliderContent=''] - additional html to be added inside the slider div
     */

    function LayerSwipe(map, sliderContent) {
        var _this = this;

        _classCallCheck(this, LayerSwipe);

        sliderContent = sliderContent || '';
        /**
         *
         * @type {Array<LayerBase>}
         */
        this.leftLayers = [];

        /**
         *
         * @type {Array<LayerBase>}
         */
        this.rightLayers = [];

        this._percentRight = 50;
        this.offset = null;

        this._map = map;
        this.$mapElement = (0, _jquery2.default)(map.getTargetElement());
        this.$mapElement.append('<div class="layer-swiper">' + sliderContent + '</div>');

        this.$swiper = this.$mapElement.find('.layer-swiper');
        this.percentRight = this.percentRight;

        this.dragging = false;

        this.$mapElement.mouseleave(function () {
            _this.dragging = false;
        });

        this.$swiper.bind('mousewheel DOMMouseScroll', function (evt) {
            evt.preventDefault();
        });

        this.$swiper.mousedown(function (evt) {
            _this.dragging = true;
            _this.offset = evt.offsetX;
        });

        (0, _jquery2.default)(window).mouseup(function () {
            _this.dragging = false;
        });

        this.$mapElement.mousemove(function (evt) {
            if (_this.dragging) {
                var mapLeft = _this.$mapElement.position().left;
                var mapWidth = _this.$mapElement.width();

                _this.percentRight = 100 * (evt.pageX - _this.offset - mapLeft) / mapWidth;
            }
        });
    }

    /**
     *
     * @param {LayerBase} lyr - layer to be added to left side
     */


    _createClass(LayerSwipe, [{
        key: 'addLeftLayer',
        value: function addLeftLayer(lyr) {
            var _this2 = this;

            lyr.olLayer.on('precompose', function (event) {
                var ctx = event.context;
                var width = ctx.canvas.width * (_this2.percentRight / 100);

                ctx.save();
                ctx.beginPath();
                ctx.rect(0, 0, width, ctx.canvas.height);
                ctx.clip();
            });

            lyr.olLayer.on('postcompose', function (event) {
                var ctx = event.context;
                ctx.restore();
            });

            this.leftLayers.push(lyr);
        }

        /**
         *
         * @param {LayerBase} lyr - layer to be added to right side
         */

    }, {
        key: 'addRightLayer',
        value: function addRightLayer(lyr) {
            var _this3 = this;

            lyr.olLayer.on('precompose', function (event) {
                var ctx = event.context;
                var width = ctx.canvas.width * (_this3.percentRight / 100);

                ctx.save();
                ctx.beginPath();
                ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
                ctx.clip();
            });

            lyr.olLayer.on('postcompose', function (event) {
                var ctx = event.context;
                ctx.restore();
            });

            this.rightLayers.push(lyr);
        }
    }, {
        key: 'percentRight',
        get: function get() {
            return this._percentRight;
        },
        set: function set(pcnt) {
            var maxed = this.$swiper.position().left + this.$swiper.width() > this.$mapElement.width();

            if (pcnt < 0) {
                return;
            } else if (maxed && pcnt > this.percentRight) {
                return;
            }

            this._percentRight = pcnt;
            this.$swiper.css('left', this._percentRight.toFixed(2) + '%');
            this._map.render();
        }
    }]);

    return LayerSwipe;
}();

nm.LayerSwipe = LayerSwipe;
exports.default = LayerSwipe;
module.exports = exports['default'];