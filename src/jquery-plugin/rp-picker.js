import $ from '../jquery';
import quickMap from '../olHelpers/quickMap';
import quickMapMulti from '../olHelpers/quickMapMulti';
import SortedFeatures from '../olHelpers/SortedFeatures';
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
import LayerEsriMapServer from '../layers/LayerEsriMapServer';
import provide from '../util/provide';
const ol = require('../ol/ol');
const nm = provide('ssa');

/**
 * @callback rpSetCallback
 * @param {string} rpId
 * @param rpFeature
 */


/**
 * take the verbose string and turn it into a padded 00 and direction hwy
 * @param {string} inputString the input string
 * @returns {string} converted highway string
 */
function highwayConvert(inputString) {
    "use strict";
    inputString = inputString.trim();
    let numMatch = inputString.match(/\d+/);

    if (numMatch.length == 0) {
        throw "highway id can't be parsed " + inputString;
    }

    let hwy = numMatch[0];

    //leading Pad
    while (hwy.length < 3) {
        hwy = '0' + hwy;
    }

    let dirMatch = inputString.match(/[SNEW]B$/);

    if (dirMatch.length == 0) {
        throw "highway id can't be parsed " + inputString;
    }

    return hwy + dirMatch[0][0];
}

class RpPicker {

    /**
     * constructor for the date range
     * @param {jQuery} jQueryRef reference to the jquery element
     * @param {string} url the rp service url
     */
    constructor(jQueryRef, url) {

        this._rpUrl = url;
        this._$container = jQueryRef;
        this._parentId = this._$container[0].id;
        this._mapDivId = this._parentId + '-map';
        this._mapContainerId = this._parentId + '-map-container';
        this._$container.addClass('rp-picker-container');

        this._rpSetCallback = function (rpId, rpFeature) {
        };

        /**
         *
         * @type {Array<RpPicker>}
         * @private
         */
        this._otherPickerArray = [];

        /**
         *
         * @type {Map}
         * @private
         */
        this._pickerMap = undefined;

        /**
         * @type MapMoveCls
         * @private
         */
        this._pickerMapMove = undefined;

        /**
         * @type MapPopupCls
         * @private
         */
        this._pickerMapPopup = undefined;

        /**
         *
         * @type {Array<number>}
         * @private
         */
        this._extent = [];

        /**
         *
         * @type {boolean}
         * @private
         */
        this._visible = false;

        /**
         *
         * @type {boolean}
         * @private
         */
        this._enabled = false;

        /**
         * @type {string}
         * @private
         */
        this._referencePointId = undefined;
        //this._referencePointFeature = undefined;

        /**
         *
         * @type {LayerBaseVectorGeoJson}
         * @private
         */
        this._rpLayer = new LayerBaseVectorGeoJson('',
            {
                minZoom: 7,
                mapMoveObj: this._pickerMapMove,
                name: 'Reference Points',
                transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
                style: new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({color: 'rgba(0, 0, 255, 0.5)'}),
                        stroke: new ol.style.Stroke({color: 'blue', width: 2})
                    })
                })
            }
        );

        this._rpSelectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.7)'}),
                    stroke: new ol.style.Stroke({color: 'red', width: 2})
                })
            })
        });

        this._rpOtherLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({color: 'rgba(0, 255, 0, 0.7)'}),
                    stroke: new ol.style.Stroke({color: 'green', width: 2})
                })
            })
        });

        this._rpOtherFeature = undefined;

        /**
         *
         * @type {SortedFeatures|null}
         * @private
         */
        this._sortedFeatures = null;

        let pickerHtml = `<div title="Reference Point Picker" class="rp-picker-static"><select disabled="disabled" ></select></div>` +
            `<div id="${this._mapContainerId}" class="rp-popup-container">` +
            '<div class="rp-picker-container-top">' +
            `<button class="container-head-close-button container-head-button">Close</button>` +
            `<button class="container-head-clear-button container-head-button">Clear</button>` +
            `<span class="container-head-rp-id container-head-span"></span>` +
            `<span class="container-head-coordinates container-head-span"></span>` +
            '</div>' +
            `<div id="${this._mapDivId}" class="rp-picker-map"></div>` +
            `</div>` +
            '';

        this._$container.append(pickerHtml);
        this._$rpSelect = this._$container.find('select');
        let $selectorDiv = this._$container.find('.rp-picker-static');

        this._$mapContainer = this._$container.find('#' + this._mapContainerId);
        this._$closeButton = this._$container.find('.container-head-close-button');
        this._$clearButton = this._$container.find('.container-head-clear-button');
        this._$containerHeadRpId = this._$container.find('.container-head-rp-id');
        this._$containerHeadCoordinates = this._$container.find('.container-head-coordinates');

        this._$clearButton.click(() => {
            this.referencePointId = undefined;
        });

        this._$rpSelect.click((evt) => {
            this._closeOtherPickers();
            $selectorDiv.trigger('click');
            $selectorDiv.trigger('click');
            evt.stopPropagation();
        });

        this._$rpSelect.change(() => {
            this.referencePointId = this._$rpSelect.val();
        }).keyup(() => {
            if (this.referencePointId != this._$rpSelect.val()){
                this._$rpSelect.trigger('change');
            }
        });

        // open the map container
        $selectorDiv.click(() => {
            if (!this._enabled) {
                return;
            }

            //if (this.visible) {
            //    this.visible = false;
            //    return;
            //}

            this.visible = true;

            // initialize on first show
            if (!this._pickerMap) {
                this._mapInit();
            }
        });

        this._$closeButton.click((evt) => {
            this.visible = false;
            evt.stopPropagation();
        });
    }

    /**
     *
     * @private
     */
    _mapInit() {
        let multiMap = quickMapMulti({
            divId: this._mapDivId,
            minZoom: 6,
            zoom: 6,
            baseSwitcher: false
        });

        this._pickerMap = multiMap.map;
        this._pickerMapMove = multiMap.mapMove;
        this._pickerMapPopup = multiMap.mapPopup;

        // add the other selected feature if it has been defined
        if (this.otherFeature) {
            this.otherFeature = this.otherFeature;
            //this._rpOtherLayer.getSource().addFeature(this.otherFeature);
        }

        let metamanagerSegments = new LayerEsriMapServer(
            'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
            {
                minZoom: 7,
                visible: true,
                name: 'Metamanager Segments',
                opacity: 0.7
            });

        // add the layers to the map
        this._pickerMap.addLayer(metamanagerSegments.olLayer);
        this._pickerMap.addLayer(this._rpLayer.olLayer);
        this._pickerMap.addLayer(this._rpSelectionLayer);
        this._pickerMap.addLayer(this._rpOtherLayer);

        // configure the popup response function
        this._pickerMapPopup.addVectorPopup(this._rpLayer, function (props) {
            return `<input type="button" id='${props['rpId']}' class="select-rp-btn" value="Select"/>&nbsp;` + props['rpId'];
        });

        // add the popup change function to find the select button
        this._pickerMapPopup.addPopupChangedFunction(() => {
            let selectButton = $('.select-rp-btn');
            if (selectButton.length > 0) {
                let _this = this;
                selectButton.click(function () {
                    _this.referencePointId = this.id;
                });
            }
        });

        this._setMapExtent();
    }


    /**
     * get the picker visibility
     * @returns {boolean} is visible
     */
    get visible() {
        return this._visible;
    }

    /**
     * set the picker visibility
     * @param {boolean} vis is visible
     */
    set visible(vis) {
        if (this.visible === vis) {
            return;
        }
        if (vis) {
            this._$mapContainer.show();
            this._closeOtherPickers();
        } else {
            this._$mapContainer.hide();
            this._pickerMapPopup.closePopup();
        }
        this._visible = vis;
    }

    /**
     *
     * @returns {Array.<number>} extent array
     */
    get extent() {
        return this._extent;
    }

    /**
     *
     * @param {Array.<number>} newExtent - extent array
     */
    set extent(newExtent) {
        this._extent = newExtent;
        if (this._pickerMap) {
            this._setMapExtent();
        }
    }

    _setMapExtent() {
        if (this._extent) {
            this._pickerMap.getView().fit(this._extent, this._pickerMap.getSize());
            //this._pickerMap.getView().setZoom(this._pickerMap.getView().getZoom());
        }
    }

    /**
     *
     * @returns {string|undefined} ref point id
     */
    get referencePointId() {
        return this._referencePointId;
    }

    /**
     *
     * @param {string|undefined} newRef - new ref id
     */
    set referencePointId(newRef) {

        if (newRef == this.referencePointId) {
            return;
        }

        this._referencePointId = newRef;

        this._rpSelectionLayer.getSource().clear();

        if (this.referencePointId == undefined) {
            //this._$spanTextElement.val('');
            this._$containerHeadRpId.html('');
            this._$containerHeadCoordinates.html('');
            this._rpSetCallback(this.referencePointId, undefined);
            if (this._pickerMapPopup) {
                this._pickerMapPopup.closePopup();
            }

            return;
        }

        let selectedFeature = this._sortedFeatures.getFeature(this.referencePointId);

        this._rpSelectionLayer.getSource().addFeature(selectedFeature);
        this._$rpSelect.val(this.referencePointId);
        let featureCopy = selectedFeature.clone();
        featureCopy.getGeometry().transform('EPSG:3857', 'EPSG:4326');
        let lon = featureCopy.getGeometry().getCoordinates()[0];
        let lat = featureCopy.getGeometry().getCoordinates()[1];

        this._$containerHeadRpId.html(this.referencePointId);
        this._$containerHeadCoordinates.html(`${lat.toFixed(5)}, ${lon.toFixed(5)}`);
        this._rpSetCallback(this.referencePointId, selectedFeature);
    }

    get otherFeature() {
        return this._rpOtherFeature;
    }

    set otherFeature(otherFeature) {
        this._rpOtherFeature = otherFeature;

        if (this._rpOtherLayer) {
            this._rpOtherLayer.getSource().clear();
            if (otherFeature) {
                this._rpOtherLayer.getSource().addFeature(otherFeature);
            }
        }
    }

    /**
     *
     * @param {rpSetCallback} newCallback - new callback function
     */
    set rpSetCallback(newCallback) {
        this._rpSetCallback = newCallback;
    }

    /**
     *
     * @param {RpPicker} otherPicker - the other picker in the group
     */
    addOtherPicker(otherPicker) {
        this._otherPickerArray.push(otherPicker);
    }

    _closeOtherPickers() {
        for (let p of this._otherPickerArray) {
            p.visible = false;
        }
    }

    /**
     *
     * @returns {boolean} if eneabled
     * @private
     */
    get enabled() {
        return this._enabled;
    }

    /**
     *
     * @param {boolean} isEnabled - if enabled
     * @private
     */
    set enabled(isEnabled) {
        this._enabled = isEnabled;
        this._$rpSelect.prop('disabled', !this._enabled);

        if (!this._enabled) {
            this.visible = false;
        }
    }

    /**
     *
     * @param {string} county - the county
     * @param {string} highway - the highway
     * @param {string} [rp=undefined] - the reference point
     */
    setCountyAndHighway(county, highway, rp) {

        highway = highwayConvert(highway);

        $.get(this._rpUrl, {'county': county, 'highway': highway}, (d) => {
            /**
             * @type Array<object>
             */
            this._rpLayer.addFeatures(d);
            this._sortedFeatures = new SortedFeatures(this._rpLayer.source.getFeatures(), 'rpId');

            let rpArray = [];
            this._$rpSelect.html('');

            for (let f of this._sortedFeatures.sortedFeatures) {
                let rpId = f.getProperties()['rpId'];
                if (rpArray.indexOf(rpId) < 0) {
                    rpArray.push(rpId);
                    this._$rpSelect.append(`<option>${rpId}</option>`);
                }
            }
            this.enabled = true;
            this.extent = this._rpLayer.source.getExtent();
            if (rp){
                this.referencePointId = rp;
            }
        }, 'json');
    }

    clear(){
        this.referencePointId = undefined;
        this._$rpSelect.html('');
        this._rpLayer.clear();
        this.enabled = false;
    }
}

nm.RpPicker = RpPicker;

/**
 * Adds rp picker
 * @param {string} serviceUrl url for the points
 * @returns {RpPicker} a reference picker
 */
$.fn.rpPicker = function (serviceUrl) {
    return new RpPicker(this, serviceUrl);
};

export default undefined;

