/**
 * Created by gavorhes on 6/1/2016.
 */


import provide from '../util/provide';
import $ from '../jquery/jquery';

let nm = provide('collections.layerSwipe');


class LayerSwipe {

    /**
     *
     * @param {ol.Map} map - the map
     */
    constructor(map) {

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
        this.theTimeout = null;

        this._map = map;
        this.$mapElement = $(map.getTargetElement());
        this.$mapElement.append(`<div class="layer-swiper"></div>`);


        this.$swiper = this.$mapElement.find('.layer-swiper');
        this.percentRight = this.percentRight;

        this.dragging = false;

        this.$mapElement.mouseleave(() => {
            this.dragging = false;
        });

        this.$swiper.bind('mousewheel DOMMouseScroll', function(evt){
            evt.preventDefault();
        });

        this.$swiper.mousedown((evt) => {
            this.dragging = true;
            this.offset = evt.offsetX;
        });

        $(window).mouseup(() => {
            this.dragging = false;
        });

        this.$mapElement.mousemove((evt) => {
            if (this.dragging) {
                let mapLeft = this.$mapElement.position().left;
                let mapWidth = this.$mapElement.width();

                this.percentRight = 100 * (evt.pageX - this.offset - mapLeft) / mapWidth;
            }
        });
    }

    /**
     *
     * @param {LayerBase} lyr - layer to be added to left side
     */
    addLeftLayer(lyr) {

        lyr.olLayer.on('precompose', (event) => {
            let ctx = event.context;
            let width = ctx.canvas.width * (this.percentRight / 100);

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, ctx.canvas.height);
            ctx.clip();
        });

        lyr.olLayer.on('postcompose', function (event) {
            let ctx = event.context;
            ctx.restore();
        });


        this.leftLayers.push(lyr);
    }

    /**
     *
     * @param {LayerBase} lyr - layer to be added to right side
     */
    addRightLayer(lyr) {

        lyr.olLayer.on('precompose', (event) => {
            let ctx = event.context;
            let width = ctx.canvas.width * (this.percentRight / 100);

            ctx.save();
            ctx.beginPath();
            ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
            ctx.clip();
        });

        lyr.olLayer.on('postcompose', function (event) {
            let ctx = event.context;
            ctx.restore();
        });

        this.leftLayers.push(lyr);
    }

    get percentRight() {
        return this._percentRight;
    }

    set percentRight(pcnt) {
        let maxed = this.$swiper.position().left + this.$swiper.width() > this.$mapElement.width();

        if (pcnt < 0) {
            return;
        } else if (maxed && pcnt > this.percentRight) {
            return;
        }

        this._percentRight = pcnt;
        this.$swiper.css('left', `${this._percentRight.toFixed(2)}%`);
        this._map.render();
    }
}

nm.LayerSwipe = LayerSwipe;
export default LayerSwipe;
