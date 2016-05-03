/**
 * Created by gavorhes on 12/8/2015.
 */

import mapPopup from '../../src/olHelpers/mapPopup';
import $ from '../../src/jquery';
let homeTabId = 'home-tab';
let coordinationTabId = 'coordination-tab';
let operationsTabId = 'operations-tab';

let operationsStaticPanelId = 'operations-static';
let operationsAnimatedPanelId = 'operations-animated';

class AppConfig {
    /**
     * app configuration object
     */
    constructor() {
        this.$opsAccordion = $("#" + operationsTabId);
        this.debug = true;
        this.map = undefined;
        this._coordinationLayer = undefined;
        this.lyrIds = [];
        this.lyrLookup = {};
        this.lyrArray = [];
        this.mediaControl = undefined;
        this.animationLayers = [];
        this.coordinationLayerId = 'coorindation-layer';

        /**
         *
         * @type {Array<LayerBase>}
         */
        this.operationsLayersStatic = [];

        /**
         *
         * @type {Array<LayerBase>}
         */
        this.operationsLayersAnimated = [];

        this.currentOperationsLayers = this.operationsLayersStatic;
    }

    init() {
        for (let l of this.operationsLayersStatic) {
            this.map.removeLayer(l['olLayer']);
        }

        for (let l of this.operationsLayersAnimated) {
            this.map.removeLayer(l['olLayer']);
        }

        this.currentTabId = homeTabId;
    }

    /**
     * Add the layer to the config object
     * @param {LayerBase|*} lyr - base layer
     */
    _addLayer(lyr) {
        this.lyrIds.push(lyr.id);
        this.lyrLookup[lyr.id] = lyr;
        this.lyrArray.push(lyr);
    }

    get coordinationLayer() {
        return this._coordinationLayer;
    }

    set coordinationLayer(coordLayer) {
        this._coordinationLayer = coordLayer;
        this._addLayer(coordLayer);
    }

    addOperationsLayerStatic(lyr) {
        this.operationsLayersStatic.push(lyr);
        this._addLayer(lyr);
    }

    addOperationsLayerAnimate(lyr) {
        this.operationsLayersAnimated.push(lyr);
        this._addLayer(lyr);
    }

    set currentTabId(tabId) {
        mapPopup.closePopup();
        this.mediaControl.stopPlaying();
        if (tabId == operationsTabId) {
            for (let l of this.currentOperationsLayers) {
                this.map.addLayer(l['olLayer']);
            }
        } else {
            for (let l of this.currentOperationsLayers) {
                this.map.removeLayer(l['olLayer']);
            }
        }

        switch (tabId) {
            case homeTabId:
                this.coordinationLayer.visible = false;
                break;
            case coordinationTabId:
                this.coordinationLayer.visible = true;
                break;
            case operationsTabId:
                this.coordinationLayer.visible = false;
                this.$opsAccordion.accordion("refresh");
                break;
            default:
                throw tabId + ' tab id not found'
        }
    }

    set currentOperationsPanelId(panelId) {
        mapPopup.closePopup();
        this.mediaControl.stopPlaying();

        for (let l of this.currentOperationsLayers) {
            this.map.removeLayer(l['olLayer']);
        }

        switch (panelId) {
            case operationsStaticPanelId:
                this.currentOperationsLayers = this.operationsLayersStatic;
                break;

            case operationsAnimatedPanelId:
                this.currentOperationsLayers = this.operationsLayersAnimated;
                break;
            default:
                throw panelId + ' panel not found';
        }
        for (let l of this.currentOperationsLayers) {
            this.map.addLayer(l['olLayer']);
        }

    }

    ///**
    // * trick to trigger the map move event
    // */
    //forceRefresh() {
    //    if (this.map) {
    //        this.map.getView().setZoom(this.map.getView().getZoom());
    //    }
    //}
}

export default new AppConfig();
