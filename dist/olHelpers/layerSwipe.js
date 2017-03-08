/**
 * Created by gavorhes on 6/1/2016.
 */
"use strict";
var provide_1 = require("../util/provide");
var $ = require("jquery");
var nm = provide_1.default('collections.layerSwipe');
var LayerSwipe = (function () {
    /**
     *
     * @param {ol.Map} map - the map
     * @param {string} [sliderContent=''] - additional html to be added inside the slider div
     */
    function LayerSwipe(map, sliderContent) {
        if (sliderContent === void 0) { sliderContent = ''; }
        var _this = this;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerSwipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJTd2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvbGF5ZXJTd2lwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFHSCwyQ0FBc0M7QUFHdEMsMEJBQTZCO0FBRTdCLElBQUksRUFBRSxHQUFHLGlCQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUczQztJQVNJOzs7O09BSUc7SUFDSCxvQkFBWSxHQUFXLEVBQUUsYUFBMEI7UUFBMUIsOEJBQUEsRUFBQSxrQkFBMEI7UUFBbkQsaUJBcURDO1FBbkRHLGFBQWEsR0FBRyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ3BDOzs7V0FHRztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCOzs7V0FHRztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsaUNBQTZCLGFBQWEsV0FBUSxDQUFDLENBQUM7UUFHNUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxD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QUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFHLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQWRBO0lBZUwsaUJBQUM7QUFBRCxDQUFDLEFBL0lELElBK0lDO0FBRUQsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBQzNCLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDYvMS8yMDE2LlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQge0xheWVyQmFzZX0gZnJvbSBcIi4uL2xheWVycy9MYXllckJhc2VcIjtcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdjb2xsZWN0aW9ucy5sYXllclN3aXBlJyk7XHJcblxyXG5cclxuY2xhc3MgTGF5ZXJTd2lwZSB7XHJcbiAgICBsZWZ0TGF5ZXJzOiBBcnJheTxMYXllckJhc2U+O1xyXG4gICAgcmlnaHRMYXllcnM6IEFycmF5PExheWVyQmFzZT47XHJcbiAgICBfcGVyY2VudFJpZ2h0OiBudW1iZXI7XHJcbiAgICBfbWFwOiBvbC5NYXA7XHJcbiAgICAkbWFwRWxlbWVudDogSlF1ZXJ5O1xyXG4gICAgJHN3aXBlcjogSlF1ZXJ5O1xyXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW47XHJcbiAgICBvZmZzZXQ6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2wuTWFwfSBtYXAgLSB0aGUgbWFwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NsaWRlckNvbnRlbnQ9JyddIC0gYWRkaXRpb25hbCBodG1sIHRvIGJlIGFkZGVkIGluc2lkZSB0aGUgc2xpZGVyIGRpdlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtYXA6IG9sLk1hcCwgc2xpZGVyQ29udGVudDogc3RyaW5nID0gJycpIHtcclxuXHJcbiAgICAgICAgc2xpZGVyQ29udGVudCA9IHNsaWRlckNvbnRlbnQgfHwgJyc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXk8TGF5ZXJCYXNlPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxlZnRMYXllcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXk8TGF5ZXJCYXNlPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnJpZ2h0TGF5ZXJzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX3BlcmNlbnRSaWdodCA9IDUwO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xyXG4gICAgICAgIHRoaXMuJG1hcEVsZW1lbnQgPSAkKG1hcC5nZXRUYXJnZXRFbGVtZW50KCkpO1xyXG4gICAgICAgIHRoaXMuJG1hcEVsZW1lbnQuYXBwZW5kKGA8ZGl2IGNsYXNzPVwibGF5ZXItc3dpcGVyXCI+JHtzbGlkZXJDb250ZW50fTwvZGl2PmApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy4kc3dpcGVyID0gdGhpcy4kbWFwRWxlbWVudC5maW5kKCcubGF5ZXItc3dpcGVyJyk7XHJcbiAgICAgICAgdGhpcy5wZXJjZW50UmlnaHQgPSB0aGlzLnBlcmNlbnRSaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLiRtYXBFbGVtZW50Lm1vdXNlbGVhdmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHN3aXBlci5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHN3aXBlci5tb3VzZWRvd24oKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBldnQub2Zmc2V0WDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLm1vdXNldXAoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJG1hcEVsZW1lbnQubW91c2Vtb3ZlKChldnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXBMZWZ0ID0gdGhpcy4kbWFwRWxlbWVudC5wb3NpdGlvbigpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFwV2lkdGggPSB0aGlzLiRtYXBFbGVtZW50LndpZHRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50UmlnaHQgPSAxMDAgKiAoZXZ0LnBhZ2VYIC0gdGhpcy5vZmZzZXQgLSBtYXBMZWZ0KSAvIG1hcFdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMYXllckJhc2V8Kn0gbHlyIC0gbGF5ZXIgdG8gYmUgYWRkZWQgdG8gbGVmdCBzaWRlXHJcbiAgICAgKi9cclxuICAgIGFkZExlZnRMYXllcihseXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGVmdExheWVycy5pbmRleE9mKGx5cikgIT0gLTEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBseXIub2xMYXllci5vbigncHJlY29tcG9zZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3R4ID0gZXZlbnRbJ2NvbnRleHQnXTtcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY3R4LmNhbnZhcy53aWR0aCAqICh0aGlzLnBlcmNlbnRSaWdodCAvIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5yZWN0KDAsIDAsIHdpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGN0eC5jbGlwKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGx5ci5vbExheWVyLm9uKCdwb3N0Y29tcG9zZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBsZXQgY3R4ID0gZXZlbnRbJ2NvbnRleHQnXTtcclxuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubGVmdExheWVycy5wdXNoKGx5cik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMYXllckJhc2V8Kn0gbHlyIC0gbGF5ZXIgdG8gYmUgYWRkZWQgdG8gcmlnaHQgc2lkZVxyXG4gICAgICovXHJcbiAgICBhZGRSaWdodExheWVyKGx5cikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yaWdodExheWVycy5pbmRleE9mKGx5cikgIT0gLTEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBseXIub2xMYXllci5vbigncHJlY29tcG9zZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3R4ID0gZXZlbnRbJ2NvbnRleHQnXTtcclxuICAgICAgICAgICAgbGV0IHdpZHRoID0gY3R4LmNhbnZhcy53aWR0aCAqICh0aGlzLnBlcmNlbnRSaWdodCAvIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5yZWN0KHdpZHRoLCAwLCBjdHguY2FudmFzLndpZHRoIC0gd2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY3R4LmNsaXAoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbHlyLm9sTGF5ZXIub24oJ3Bvc3Rjb21wb3NlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBjdHggPSBldmVudFsnY29udGV4dCddO1xyXG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJpZ2h0TGF5ZXJzLnB1c2gobHlyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGVyY2VudFJpZ2h0KCkgOiBudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BlcmNlbnRSaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGVyY2VudFJpZ2h0KHBlcmNlbnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtYXhlZCA9IHRoaXMuJHN3aXBlci5wb3NpdGlvbigpLmxlZnQgKyB0aGlzLiRzd2lwZXIud2lkdGgoKSA+IHRoaXMuJG1hcEVsZW1lbnQud2lkdGgoKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKG1heGVkICYmIHBlcmNlbnQgPiB0aGlzLnBlcmNlbnRSaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wZXJjZW50UmlnaHQgPSBwZXJjZW50O1xyXG4gICAgICAgIHRoaXMuJHN3aXBlci5jc3MoJ2xlZnQnLCBgJHt0aGlzLl9wZXJjZW50UmlnaHQudG9GaXhlZCgyKX0lYCk7XHJcbiAgICAgICAgdGhpcy5fbWFwLnJlbmRlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllclN3aXBlID0gTGF5ZXJTd2lwZTtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJTd2lwZTtcclxuIl19