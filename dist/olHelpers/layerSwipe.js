"use strict";
/**
 * Created by gavorhes on 6/1/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var $ = require("jquery");
var nm = provide_1.default('collections.layerSwipe');
var LayerSwipe = /** @class */ (function () {
    /**
     *
     * @param {ol.Map} map - the map
     * @param {string} [sliderContent=''] - additional html to be added inside the slider div
     */
    function LayerSwipe(map, sliderContent) {
        var _this = this;
        if (sliderContent === void 0) { sliderContent = ''; }
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
        this.$mapElement = $(map.getTargetElement());
        this.$mapElement.append("<div class=\"layer-swiper\">" + sliderContent + "</div>");
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
        $(window).mouseup(function () {
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
     * @param {LayerBase|*} lyr - layer to be added to left side
     */
    LayerSwipe.prototype.addLeftLayer = function (lyr) {
        var _this = this;
        if (this.leftLayers.indexOf(lyr) != -1) {
            return;
        }
        lyr.olLayer.on('precompose', function (event) {
            var ctx = event['context'];
            var width = ctx.canvas.width * (_this.percentRight / 100);
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, ctx.canvas.height);
            ctx.clip();
        });
        lyr.olLayer.on('postcompose', function (event) {
            var ctx = event['context'];
            ctx.restore();
        });
        this.leftLayers.push(lyr);
    };
    /**
     *
     * @param {LayerBase|*} lyr - layer to be added to right side
     */
    LayerSwipe.prototype.addRightLayer = function (lyr) {
        var _this = this;
        if (this.rightLayers.indexOf(lyr) != -1) {
            return;
        }
        lyr.olLayer.on('precompose', function (event) {
            var ctx = event['context'];
            var width = ctx.canvas.width * (_this.percentRight / 100);
            ctx.save();
            ctx.beginPath();
            ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
            ctx.clip();
        });
        lyr.olLayer.on('postcompose', function (event) {
            var ctx = event['context'];
            ctx.restore();
        });
        this.rightLayers.push(lyr);
    };
    Object.defineProperty(LayerSwipe.prototype, "percentRight", {
        get: function () {
            return this._percentRight;
        },
        set: function (percent) {
            var maxed = this.$swiper.position().left + this.$swiper.width() > this.$mapElement.width();
            if (percent < 0) {
                return;
            }
            else if (maxed && percent > this.percentRight) {
                return;
            }
            this._percentRight = percent;
            this.$swiper.css('left', this._percentRight.toFixed(2) + "%");
            this._map.render();
        },
        enumerable: true,
        configurable: true
    });
    return LayerSwipe;
}());
nm.LayerSwipe = LayerSwipe;
exports.default = LayerSwipe;
//# sourceMappingURL=layerSwipe.js.map