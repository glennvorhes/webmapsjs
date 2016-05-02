/**
 * Created by gavorhes on 11/3/2015.
 */

const $ = require('jquery');
import ol from '../custom-ol';
import MapInteractionBase from './mapInteractionBase';
import propertiesZoomStyle from '../olHelpers/propertiesZoomStyle';
import provide from '../util/provide';
let nm = provide('olHelpers');


class _FeatureLayerProperties {

    /**
     *
     * @param {ol.Feature} feature the feature
     * @param {LayerBaseVector|*} layer - the layer in the popup
     * @param {number} layerIndex - index of the layer
     * @param {ol.layer.Vector} selectionLayer - the ol selection layer
     * @param {string} [esriLayerName=undefined] - esri layer name
     */
    constructor(feature, layer, layerIndex, selectionLayer, esriLayerName) {
        this.feature = feature;
        this.layer = layer;
        this.layerIndex = layerIndex;
        this.selectionLayer = selectionLayer;
        this.popupContent = '';
        this.esriLayerName = typeof esriLayerName == 'string' ? esriLayerName : undefined;
    }

    get layerName() {
        if (typeof this.esriLayerName == 'string') {
            return this.esriLayerName;
        } else {
            return this.layer.name;
        }
    }
}

/**
 * map popup class
 * @augments MapInteractionBase
 */
class MapPopupCls extends MapInteractionBase {

    /**
     * Definition for openlayers style function
     * @callback olStyleFunction
     * &param feature the openlayers vector feature
     * $param
     */

    /**
     * Definition for popup changed callback functions
     * @callback popupChangedFunction
     * @param $popContent jquery reference to the popup content
     */

    /**
     * map popup constructor
     */
    constructor() {
        super('map popup');
        this._arrPopupLayerIds = [];
        this._arrPopupLayerNames = [];
        /**
         *
         * @type {Array<LayerBaseVector>}
         * @private
         */
        this._arrPopupLayers = [];
        this._arrPopupOlLayers = [];
        this._arrPopupContentFunction = [];
        this._$popupContainer = undefined;
        this._$popupContent = undefined;
        this._$popupCloser = undefined;
        this._popupOverlay = undefined;
        this._selectionLayers = [];
        this._selectionLayerLookup = {};
        this._mapClickFunctions = [];

        //let a = function($jqueryContent){console.log($jqueryContent)};
        //this._popupChangedLookup = {'a': a};
        this._popupChangedFunctions = [];
        /**
         *
         * @type {Array<LayerEsriMapServer>}
         * @private
         */
        this._esriMapServiceLayers = [];

        this._popupOpen = false;
        this._popupCoordinate = null;

        /**
         *
         * @type {Array.<_FeatureLayerProperties>}
         */
        this._passThroughLayerFeatureArray = [];

        this._currentPopupIndex = -1;
        this._popupContentLength = 0;

    }

    /**
     * map popup initialization
     * @param {ol.Map} theMap - the ol map
     */
    init(theMap) {
        if (super.init(theMap)) {
            return;
        }
        let $map = $('#' + this.map.getTarget());

        $map.append(
            '<div class="ol-popup">' +
            '<a href="#" class="ol-popup-closer"></a>' +
            '<div class="popup-content"></div>' +
            '</div>'
        );

        this._$popupContainer = $map.find('.ol-popup');
        this._$popupContent = $map.find('.popup-content');
        this._$popupCloser = $map.find('.ol-popup-closer');

        this._popupOverlay = new ol.Overlay({
            element: this._$popupContainer[0],
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        this._map.addOverlay(this._popupOverlay);

        this._$popupCloser.click(() => {
            this.closePopup();
        });

        // display popup on click
        this._map.on('singleclick', (evt) => {
            this.closePopup();
            this._popupCoordinate = evt.coordinate;

            if (this._esriMapServiceLayers.length > 0) {
                let queryParams = {
                    geometry: evt.coordinate.join(','),
                    geometryType: 'esriGeometryPoint',
                    layers: 'all',
                    sr: this._map.getView().getProjection().getCode().split(':')[1],
                    mapExtent: this._map.getView().calculateExtent(this._map.getSize()).join(','),
                    imageDisplay: this._map.getSize().join(',') + ',96',
                    returnGeometry: true,
                    tolerance: 15,
                    f: 'pjson'
                };

                for (let l of this._esriMapServiceLayers) {
                    l.getPopupInfo(queryParams, this._selectionLayerLookup[l.id]);
                }
            }

            let layerFeatureObjectArray = this._featuresAtPixel(evt.pixel);

            /**
             *
             * @type {Array.<_FeatureLayerProperties>}
             */
            this._passThroughLayerFeatureArray = [];
            this._currentPopupIndex = -1;

            for (let i = 0; i < layerFeatureObjectArray.length; i++) {
                let featObj = layerFeatureObjectArray[i];

                let props = featObj.feature.getProperties();

                let popupContentResponse = this._arrPopupContentFunction[featObj.layerIndex](props, this._$popupContent);

                //skip if return was false
                if (popupContentResponse === false) {
                    //continue;
                } else if (typeof popupContentResponse == 'string') {
                    featObj.popupContent = popupContentResponse;
                    this._passThroughLayerFeatureArray.push(featObj);
                } else {
                    featObj.selectionLayer.getSource().addFeature(featObj.feature);
                }
            }

            this._popupContentLength = this._passThroughLayerFeatureArray.length;

            this._currentPopupIndex = -1;

            let popupHtml = '<div class="ol-popup-nav">';
            popupHtml += '<span class="previous-popup ol-popup-nav-arrow">&#9664;</span>';
            popupHtml += '<span class="next-popup ol-popup-nav-arrow">&#9654;</span>';
            popupHtml += `<span class="current-popup-item-number" style="font-weight: bold;"></span>`;
            popupHtml += `<span>&nbsp;of&nbsp;</span>`;
            popupHtml += `<span class="popup-content-length" style="font-weight: bold;">${this._popupContentLength}</span>`;
            popupHtml += `<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>`;
            popupHtml += `<span class="current-popup-layer-name"></span>`;
            popupHtml += '</div>';
            popupHtml += '<div class="ol-popup-inner">';

            popupHtml += '</div>';

            this._$popupContent.html(popupHtml);

            this._$popupContent.find('.previous-popup').click(() => {
                if (this._popupContentLength == 1) {
                    return;
                }

                if (this._currentPopupIndex == 0) {
                    this._currentPopupIndex = this._popupContentLength - 1;
                } else {
                    this._currentPopupIndex--;
                }
                this._triggerFeatSelect();
            });

            let nextPopup = this._$popupContent.find('.next-popup');

            nextPopup.click(() => {
                if (this._popupContentLength == 1 && this._currentPopupIndex > -1) {
                    return;
                }

                if (this._currentPopupIndex == this._popupContentLength - 1) {
                    this._currentPopupIndex = 0;
                } else {
                    this._currentPopupIndex++;
                }
                this._triggerFeatSelect();
            });


            if (this._popupContentLength > 0) {
                nextPopup.trigger('click');
                this._popupOverlay.setPosition(this._popupCoordinate);
                this._$popupContent.scrollTop(0);
                this._popupOpen = true;
            }
        });

        //change mouse cursor when over marker
        this._map.on('pointermove', (e) => {
            if (e.dragging) {
                return;
            }
            let pixel = this.map.getEventPixel(e.originalEvent);
            let hit = this.map.hasFeatureAtPixel(pixel, (lyrCandidate) => {
                for (let olLayer of this._arrPopupOlLayers) {
                    if (lyrCandidate == olLayer) {
                        return true;
                    }
                }

                return false;
            });
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
    }

    /**
     * helper to select features
     * @private
     */
    _triggerFeatSelect() {
        let $currentPopupItemNumber = this._$popupContent.find('.current-popup-item-number');
        let $innerPopup = this._$popupContent.find('.ol-popup-inner');
        let $layerNameSpan = this._$popupContent.find('.current-popup-layer-name');
        this.clearSelection();
        let lyrFeatObj = this._passThroughLayerFeatureArray[this._currentPopupIndex];
        $currentPopupItemNumber.html((this._currentPopupIndex + 1).toFixed());
        $layerNameSpan.html(lyrFeatObj.layerName);
        $innerPopup.html(lyrFeatObj.popupContent);
        lyrFeatObj.selectionLayer.getSource().addFeature(lyrFeatObj.feature);
        for (let f of this._popupChangedFunctions) {
            f(this._$popupContent);
        }
    }


    /**
     *
     * @param {ol.Feature} feature - the ol feature
     * @param {LayerEsriMapServer} lyr - the map server layer
     * @param {string} popupContent - popup content
     * @param {string} esriName - esri layer name
     */
    addMapServicePopupContent(feature, lyr, popupContent, esriName) {

        let featLayerObject = new _FeatureLayerProperties(
            feature, lyr, this._popupContentLength, this._selectionLayerLookup[lyr.id], esriName
        );
        featLayerObject.popupContent = popupContent;

        this._passThroughLayerFeatureArray.push(featLayerObject);
        this._popupContentLength++;

        $('.popup-content-length').html(this._popupContentLength.toFixed());

        if (!this._popupOpen) {
            this._$popupContent.find('.next-popup').trigger('click');

            this._popupOverlay.setPosition(this._popupCoordinate);
            this._$popupContent.scrollTop(0);
            this._popupOpen = true;
        }
    }

    /**
     *
     * @param {ol.Pixel} pixel - the ol pixel
     * @returns {Array.<_FeatureLayerProperties>} - feature layer properties
     * @private
     */
    _featuresAtPixel(pixel) {
        let layerFeatureObjectArray = [];
        this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
            let lyrIndex = this._arrPopupOlLayers.indexOf(layer);

            if (lyrIndex > -1) {
                layerFeatureObjectArray.push(new _FeatureLayerProperties(
                    feature, this._arrPopupLayers[lyrIndex], lyrIndex, this._selectionLayers[lyrIndex]));
            }
        });

        return layerFeatureObjectArray;
    }

    closePopup() {
        this._checkInit();
        this._popupOpen = false;
        this._popupOverlay.setPosition(undefined);
        this._$popupCloser[0].blur();
        this.clearSelection();
        this._$popupContent.html('');

        return false;
    };

    /**
     *
     * @param {popupChangedFunction} chgFunction - popup change function
     */
    addPopupChangedFunction(chgFunction) {
        this._popupChangedFunctions.push(chgFunction);
    }

    /**
     *
     * @param {LayerBase|*} lyr - the layer being acted on
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {ol.layer.Vector} the new selection layer
     * @private
     */
    _addPopupLayer(lyr, selectionStyle) {
        this._checkInit();

        selectionStyle = selectionStyle || {};
        selectionStyle.color = selectionStyle.color || 'rgba(255,170,0,0.5)';
        selectionStyle.width = selectionStyle.width || 10;

        let theStyle;

        if (selectionStyle.olStyle) {
            theStyle = selectionStyle.olStyle;
        } else {
            theStyle = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: selectionStyle.color,
                    width: selectionStyle.width
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({color: selectionStyle.color}),
                    stroke: new ol.style.Stroke({color: selectionStyle.color, width: 1})
                }),
                fill: new ol.style.Fill({
                    color: selectionStyle.color
                })
            });
        }

        let selectionLayer = new ol.layer.Vector(
            {
                source: new ol.source.Vector(),
                style: theStyle,
                zIndex: 100
            }
        );

        this._selectionLayers.push(selectionLayer);
        this._selectionLayerLookup[lyr.id] = selectionLayer;
        this.map.addLayer(selectionLayer);

        return selectionLayer;
    }

    /**
     * The popup callback function
     * @callback popupCallback
     * @param {object} featureProperties - the feature properties
     * @param {jQuery} jqRef reference to the div content to do some async stuff inside the div
     * @returns {string} the html content to be added to the popup
     */

    /**
     * Add popup to the map
     * @param {LayerBase|*} lyr The layer that the popup with act on
     * @param {popupCallback} popupContentFunction - popup content function that makes popup info
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    addVectorPopup(lyr, popupContentFunction, selectionStyle) {
        let selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._arrPopupLayerIds.push(lyr.id);
        this._arrPopupLayerNames.push(lyr.name);
        this._arrPopupLayers.push(lyr);
        this._arrPopupOlLayers.push(lyr.olLayer);
        this._arrPopupContentFunction.push(popupContentFunction);

        return selectionLayer;
    };

    /**
     *
     * @param {LayerBase} lyr - layer
     */
    removeVectorPopup(lyr) {
        let idx = this._arrPopupLayerIds.indexOf(lyr.id);

        if (idx > -1) {
            this._arrPopupLayerIds.splice(idx, 1);
            this._arrPopupLayerNames.splice(idx, 1);
            this._arrPopupLayers.splice(idx, 1);
            this._arrPopupOlLayers.splice(idx, 1);
            this._arrPopupContentFunction.splice(idx, 1);
            this._selectionLayers.splice(idx, 1);
            delete this._selectionLayerLookup[lyr.id];
        }
    }

    /**
     *
     * @param {LayerEsriMapServer} lyr - map server layer
     * @param {object} [selectionStyle={}] the selection style configuration
     * @param {string} [selectionStyle.color=rgba(255,170,0,0.5)] the selection color
     * @param {number} [selectionStyle.width=10] the selection width for linear features
     * @param {object|function} [selectionStyle.olStyle=undefined] an openlayers style object or function
     * @returns {object} a reference to the ol selection layer
     */
    addMapServicePopup(lyr, selectionStyle) {
        let selectionLayer = this._addPopupLayer(lyr, selectionStyle);
        this._esriMapServiceLayers.push(lyr);

        return selectionLayer;
    }

    clearSelection() {
        this._checkInit();
        for (let i = 0; i < this._selectionLayers.length; i++) {
            this._selectionLayers[i].getSource().clear();
        }
        for (let f of this._mapClickFunctions) {
            f();
        }
    };

    /**
     * Add a function to be called when the map is clicked but before any popups are implemented
     * @param {function} func - the map click function
     */
    addMapClickFunction(func) {
        this._mapClickFunctions.push(func);
    }
}
nm.MapPopupCls = MapPopupCls;
export default MapPopupCls;
