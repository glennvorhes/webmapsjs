/**
 * Created by gavorhes on 12/10/2015.
 */

import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import mapMove from '../../src/olHelpers/mapMove';
import mapPopup from '../../src/olHelpers/mapPopup';
import tipConfig from './TipConfig'
import * as tipLayerStyles from './tipStyleFunction';
const $ = require('jquery');

/**
 * Tip Segment layer with a bunch of configuration applied, extends base GeoJSON
 */
class TipSegmentLayer extends LayerBaseVectorGeoJson {

    /**
     * ITS device layer, types available at http://transportal.cee.wisc.edu/its/inventory/
     * @param {Sliders} sliders
     * @param {object} options
     * @param {boolean} [options.visible=true]
     * @param {boolean} [options.onDemand=true]
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param [options.$loadingGif=undefined] jquery reference to loading gif
     * @param [options.$regionSelector=undefined] jquery reference to region selector
     *
     * @param {object} [options.selectionStyle={}] the selection style configuration
     * @param {string} [options.selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [options.selectionStyle.width=10] the selection width for linear features
     * @param {object} [options.selectionStyle.olStyle=undefined] an openlayers style object
     * @param {propertiesZoomStyle} [options.selectionStyle.olStyleFunction=undefined] modified OL style function
     */
    constructor(sliders, options) {
        options['name'] = "TIP Segments";
        options.onDemand = true;
        options.style = tipLayerStyles.tipStyle;
        options['minZoom'] = tipConfig.tipSegmentLayerMinZoom;
        options['transform'] = {};
        options.transform.dataProjection = 'EPSG:3857';
        options.transform.featureProjection = 'EPSG:3857';
        options['id'] = 'tip-segments';
        super('tip/gettipfeatures?callback=?', options);
        this._$regionSelector = options.$regionSelector || undefined;


        this._$loadingGif = options.$loadingGif;

        this.legendContent += '<ul><li><hr class="cell-min"></li><li><hr class="cell-very-low"></li>' +
            '<li><hr class="cell-low"></li><li><hr class="cell-mid"></li><li><hr class="cell-high"></li>' +
            '<li><hr class="cell-very-high"></li><li><hr class="cell-max">' +
            '</li></ul>';

        this.legendContent += '<ul>';
        this.legendContent += '<li style="height: 15px;">low</li>';
        this.legendContent += '<li style="height: 25px; margin-top: 4px;">medium</li>';
        this.legendContent += '<li style="height: 15px; margin-top: 5px;">high</li>';
        this.legendContent += '</ul>';

        this.legendContent += '<span style="margin: 12px 0 0 52px; display: block">Relative Need</span>';

        this._geometry_cache = [];

        this.sliders = sliders;
        tipConfig.tipSegmentLayer = this;

        let _this = this;

        mapPopup.addVectorPopup(this, function (props) {

            let parms = {
                pdpId: props['p'],
                paramWeights: JSON.stringify(_this.sliders.getParams())
            };

            return '<iframe style="margin-top:5px;" ' +
                `src="tip/getsegprops?${$.param(parms)}" ` +
                `height="250" width="350"></iframe>`;
        }, options.selectionStyle);
    }

    /**
     * override base method to include show or hide loading indicator
     * @param {number} zoom
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean}
     */
    mapMoveBefore(zoom, evtType) {
        let returnVal = super.mapMoveBefore(zoom, evtType);

        if (this._$loadingGif) {
            if (returnVal) {
                this._$loadingGif.fadeIn();
            } else {
                this._$loadingGif.fadeOut();
            }
        }
        return returnVal;
    }

    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent
     * @param {number} extent.minX
     * @param {number} extent.minY
     * @param {number} extent.maxX
     * @param {number} extent.maxY
     * @param {number} zoomLevel
     */
    mapMoveMakeGetParams(extent, zoomLevel) {
        super.mapMoveMakeGetParams(extent, zoomLevel);
        $.extend(this.mapMoveParams, extent);
        this.mapMoveParams['param_weights'] = JSON.stringify(this.sliders.getParams());
        if (this._$regionSelector){
            this.mapMoveParams['region'] = this._$regionSelector.val();
        }
    }


    /**
     * callback function on map move
     * @param d the json response
     */
    mapMoveCallback(d) {
        if (d['geojson'].features.length > 0) {
            this._geometry_cache = this._geometry_cache.concat(d['geojson'].features);
            this._geometry_cache.sort(function (a, b) {
                return (a.properties['p'] - b.properties['p']);
            });
        }

        let passFeatures = [];

        for (let s of d['scores']) {

            let feat = this._set_pdp_score(s['p'], s['z']);
            if (feat) {
                passFeatures.push(feat);
            }
        }

        d['geojson'].features = passFeatures;
        super.mapMoveCallback(d['geojson']);
        if (this._$loadingGif) {
            this._$loadingGif.fadeOut();
        }
    }

    /**
     * set the score for the feature
     * @param {number} pdp pdp_id
     * @param {number} score to assign
     * @param {object} [in_array=this._geometry_cache]
     * @returns {*} the feature with the score assigned
     * @private
     */
    _set_pdp_score(pdp, score, in_array) {
        if (typeof in_array == 'undefined') {
            in_array = this._geometry_cache;
        }

        if (in_array.length == 0) {
            return undefined;
        }

        if (in_array.length == 1) {
            let feat = in_array[0];
            if (feat.properties['p'] == pdp) {
                feat.properties['z'] = score;
                return feat;
            } else {
                return undefined;
            }
        }

        let midPoint = Math.floor(in_array.length / 2);

        let midFeature = in_array[midPoint];
        if (midFeature.properties['p'] == pdp) {
            midFeature.properties['z'] = score;
            return midFeature;
        } else if (pdp < midFeature.properties['p']) {
            return this._set_pdp_score(pdp, score, in_array.slice(0, midPoint));
        } else {
            return this._set_pdp_score(pdp, score, in_array.slice(midPoint + 1));
        }
    }

}


export default TipSegmentLayer;
