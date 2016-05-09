import $ from '../jquery';

import quickMap from '../olHelpers/quickMap';
import quickMapMulti from '../olHelpers/quickMapMulti';
import LayerBaseVectorEsri from '../layers/LayerBaseVectorEsri';
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
import LayerEsriMapServer from '../layers/LayerEsriMapServer';
import provide from '../util/provide';
const ol = require('../ol/ol');


const nm = provide('ssa');

import {} from './rpPicker.js';

function makeRpPickerContent(idx) {
    "use strict";

    return `<div class="lbl-select-container"><label>Ref. Point #${idx}</label><div id="rp-picker-${idx}" class="rp-picker-${idx}"></div></div>`;
}

let prefix = '/SSA/';
let startCountyUrl = prefix + 'getStartCounties';
let getHighwaysUrl = prefix + 'getHighways';
let getEndCountyUrl = prefix + 'getEndCounties';
let getFromRpUrl = prefix + 'getFromRps';
let getToRpUrl = prefix + 'getFromRps';
let getCorridorUrl = prefix + 'getCorridor';

/**
 *
 * @type {Array}
 */
let returnedColors = [];
let colorOptions = ['Aquamarine', 'Chartreuse', 'CornflowerBlue', 'Cyan', 'DarkOrange', 'DeepSkyBlue', 'GreenYellow',
    'Salmon', 'Magenta', 'Orchid', 'Turquoise ', 'Tomato'];

function randomColor() {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        let c = colorOptions[Math.floor(parseInt(Math.random() * colorOptions.length))];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);

            return c;
        }
    }
}

function layerConfigHelper(name, color, visible) {
    "use strict";

    return {
        minZoom: 4,
        name: name,
        transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }),
        visible: visible
    };
}

let entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

class Corridor {

    /**
     *
     * @param {string} fromRp from reference point
     * @param {string} toRp to reference point
     * @param {string} startCounty start county
     * @param {string} endCounty end county
     * @param {string} highway route
     * @param {Array<object>|*} [features=[]] feature array
     * @param {number|string|*} databaseId in the db
     */
    constructor(fromRp, toRp, startCounty, endCounty, highway, features, databaseId) {
        features = features && features.constructor.name == 'Array' ? features : [];

        this.databaseId = databaseId;
        this.startCounty = startCounty;
        this.endCounty = endCounty;
        this.highway = highway;
        this.fromRp = fromRp;
        this.toRp = toRp;
        this.clientId = (fromRp + '-' + toRp).replace(/ /g, '_');
        this._color = randomColor();
        this._corridorLayer = new LayerBaseVectorGeoJson('',
            layerConfigHelper(this.fromRp + ' - ' + this.toRp, this._color, true)
        );

        if (features.length > 0) {
            this._corridorLayer.source.addFeatures(features);
        } else {
            $.get(getCorridorUrl, {rp1: fromRp, rp2: toRp}, (d) => {
                this._corridorLayer.addFeatures(d);
            }, 'json');
        }
    }

    getTableHtml() {
        let outString = `<tr id="${this.clientId}" class="corridor-tr" style="background-color: ${this._color}">`;
        outString += `<td>${this.startCounty}</td>`;
        outString += `<td>${this.endCounty}</td>`;
        outString += `<td>${this.highway}</td>`;
        outString += `<td>${this.fromRp}</td>`;
        outString += `<td>${this.toRp}</td>`;
        outString += '</tr>';

        return outString;
    }

    getDataHtml(i) {
        let outString = '<div class="corridor-data">';
        outString += `<input type="hidden" class="corridor-data-database-id" name="corridors[${i}].corridorId" value="${this.databaseId}"/>`;
        outString += `<input type="hidden" class="corridor-data-start-county" name="corridors[${i}].startCounty" value="${this.startCounty}"/>`;
        outString += `<input type="hidden" class="corridor-data-end-county" name="corridors[${i}].endCounty" value="${this.endCounty}"/>`;
        outString += `<input type="hidden" class="corridor-data-highway" name="corridors[${i}].highway" value="${this.highway}"/>`;
        outString += `<input type="hidden" class="corridor-data-from-rp" name="corridors[${i}].fromRp" value="${this.fromRp}"/>`;
        outString += `<input type="hidden" class="corridor-data-to-rp" name="corridors[${i}].toRp" value="${this.toRp}"/>`;
        outString += `</div>`;

        return outString;
    }

    getDataHtmlDisp(i) {
        let returnString = this.getDataHtml(i);
        returnString = escapeHtml(returnString);
        returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
        returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');

        return returnString + '<br>';
    }

    get olLayer() {
        return this._corridorLayer.olLayer;

    }

    get layer() {
        return this._corridorLayer;
    }


    /**
     *
     * @returns {boolean} if corridor layer is visible
     */
    get visible() {
        return this._corridorLayer.visible;
    }

    /**
     *
     * @param {boolean} vis if corridor layer is visible
     */
    set visible(vis) {
        this._corridorLayer.visible = vis;
    }

    /**
     *
     * @returns {Array.<ol.Feature>} an array of ol features
     */
    get features() {
        return this._corridorLayer.features;
    }

    /**
     *
     * @param {Array.<ol.Feature>} feats array of ol features
     */
    set features(feats) {
        this._corridorLayer.clear();
        this._corridorLayer.source.addFeatures(feats);
    }
}

nm.Corridor = Corridor;

class SsaCorridorPicker {

    /**
     * constructor for the corridor picker
     * @param {jQuery} jQueryRef reference to the jquery element
     */
    constructor(jQueryRef) {
        /**
         *
         * @type {Array<Corridor>}
         * @private
         */

        this._corridorArray = [];
        this._corridorLookup = {};
        this._$container = jQueryRef;
        this._$container.addClass('ssa-corridor-picker-all');

        /**
         *
         * @type {Corridor|*}
         * @private
         */
        this.__selectedCorridor = undefined;
        this.__selectedCorridorId = undefined;
        this.__sidebarOpen = false;

        let newContent = '';
        //start top table/button container

        // <editor-fold desc="table button container">
        newContent += '<div class="ssa-corridor-table-button">';

        // <editor-fold desc="top buttons">
        newContent += '<div class="ssa-corridor-button-container">';
        newContent += '<input type="button" value="Create Corridor" class="create-corridor"/>';
        newContent += '<input type="button" value="Edit Corridor" class="edit-corridor ssa-hidden"/>';
        newContent += '<input type="button" value="Delete Corridor" class="delete-corridor ssa-hidden"/>';
        newContent += '<input type="button" value="Clear Selection" class="clear-selection-corridor ssa-hidden"/>';
        newContent += '</div>';
        // </editor-fold>

        // <editor-fold desc="top table">
        newContent += '<div class="ssa-corridor-table-container">';
        newContent += '<table class="corridor-table">';
        newContent += '<tr>';
        newContent += '<th>Start County</th><th>End County</th><th>Highway</th><th>From RP</th><th>To RP</th>';
        newContent += '</tr>';
        newContent += '</table>';
        newContent += '</div>';
        // </editor-fold>

        newContent += '</div>';
        // </editor-fold>

        // <editor-fold desc="sidebar and map">
        newContent += '<div class="ssa-corridor-sidebar-map">';

        // <editor-fold desc="sidebar">
        newContent += '<div class="rp-picker-sidebar ssa-hidden">';
        newContent += '<div class="rp-picker-sidebar-inputs">';
        newContent += '<div class="lbl-select-container"><label>Start County</label><select class="start-county-select"></select></div>';
        newContent += '<div class="lbl-select-container"><label>Highway</label><select class="highway-select"></select></div>';
        newContent += '<div class="lbl-select-container"><label>End County</label><select class="end-county-select"></select></div>';
        newContent += makeRpPickerContent(1);
        newContent += makeRpPickerContent(2);
        newContent += '</div>';
        newContent += `<div class="lbl-select-container">`;
        newContent += `<input type="button" class="rp-picker-preview-corridor" value="Preview"/>`;
        newContent += `<input type="button" class="rp-picker-add-corridor ssa-hidden" disabled="disabled" value="Add"/>`;
        newContent += `<input type="button" class="rp-picker-confirm-edit-corridor ssa-hidden" disabled="disabled" value="Confirm"/>`;
        newContent += `<input type="button" class="rp-picker-cancel-corridor" value="Cancel"/>`;
        newContent += '</div>';
        newContent += '</div>';
        // </editor-fold>

        // add map div
        newContent += `<div id="rp-main-map" class="rp-picker-main-map"></div>`;
        newContent += '</div>';
        // </editor-fold>

        this._$container.append(newContent);

        // <editor-fold desc="set jquery references">
        this._$btnCreateCorridor = this._$container.find('.create-corridor');
        this._$btnEditCorridor = this._$container.find('.edit-corridor');
        this._$btnDeleteCorridor = this._$container.find('.delete-corridor');
        this._$btnUnselectCorridor = this._$container.find('.clear-selection-corridor');

        this._$corridorTable = this._$container.find('.corridor-table');

        this._$rpPickerSidebar = this._$container.find('.rp-picker-sidebar');

        this._$selectStartCounty = this._$container.find('.start-county-select');
        this._$selectHighway = this._$container.find('.highway-select');
        this._$selectEndCounty = this._$container.find('.end-county-select');
        //this._$btnContainerTop = this._$container.find('.ssa-corridor-button-container');

        this._$btnPreviewCorridor = this._$container.find('.rp-picker-preview-corridor');
        this._$btnAddCorridor = this._$container.find('.rp-picker-add-corridor');
        this._$btnConfirmEditCorridor = this._$container.find('.rp-picker-confirm-edit-corridor');
        this._$btnCancelCorridor = this._$container.find('.rp-picker-cancel-corridor');
        // </editor-fold>

        // <editor-fold desc="picker setup">
        this._rpPicker1 = jQueryRef.find('#rp-picker-1').rpPicker(getFromRpUrl);
        this._rpPicker2 = jQueryRef.find('#rp-picker-2').rpPicker(getToRpUrl);

        this._rpPicker1.addOtherPicker(this._rpPicker2);
        this._rpPicker2.addOtherPicker(this._rpPicker1);

        this._rpPicker1.rpSetCallback = (rpId, feat) => {
            this._rpPicker2.otherFeature = feat;
        };

        this._rpPicker2.rpSetCallback = (rpId, feat) => {
            this._rpPicker1.otherFeature = feat;
        };
        // </editor-fold>

        // <editor-fold desc="top button events">
        this._$btnCreateCorridor.click(() => {
            this._sidebarOpen = true;
            this._$btnAddCorridor.removeClass('ssa-hidden');
        });

        this._$btnEditCorridor.click(() => {
            this._sidebarOpen = true;
            this._$btnConfirmEditCorridor.removeClass('ssa-hidden');
            this._workingLayer.source.addFeatures(this.__selectedCorridor.layer.source.getFeatures());
            this._setMapToLayerExtent(this._workingLayer);
            this._$selectStartCounty.val(this.__selectedCorridor.startCounty);
            this._populateHighwaySelect(this.__selectedCorridor.startCounty, this.__selectedCorridor.highway);
            this._populateEndCountySelect(this.__selectedCorridor.highway, this.__selectedCorridor.endCounty);

            this._rpPicker1.setCountyAndHighway(
                this.__selectedCorridor.startCounty, this.__selectedCorridor.highway, this.__selectedCorridor.fromRp);

            this._rpPicker2.setCountyAndHighway(
                this.__selectedCorridor.endCounty, this.__selectedCorridor.highway, this.__selectedCorridor.toRp);
        });

        this._$btnDeleteCorridor.click(() => {
            let conf = confirm('Confirm delete corridor? (Changes saved to database on submit)');
            if (conf) {
                this._removeCorridor(this.__selectedCorridor);
            }
        });

        this._$btnUnselectCorridor.click(() => {
            this._selectedCorridorId = undefined;
        });

        // </editor-fold>

        // <editor-fold desc="county highway change events">
        this._populateStartCountySelect();

        this._$selectStartCounty.change(() => {
            console.log('start county changed');
            this._clear();
            this._populateHighwaySelect(this._$selectStartCounty.val());
        });

        this._$selectHighway.change(() => {
            console.log('highway changed');
            this._rpPicker2.clear();
            this._populateEndCountySelect(this._$selectHighway.val());
        });

        this._$selectEndCounty.change(() => {
            this._rpPicker1.setCountyAndHighway(this._$selectStartCounty.val(), this._$selectHighway.val());
            this._rpPicker2.setCountyAndHighway(this._$selectEndCounty.val(), this._$selectHighway.val());
            console.log('end county changed');
        });


        // </editor-fold>

        // <editor-fold desc="map setup">
        let multiMap = quickMapMulti({
            divId: `rp-main-map`, minZoom: 6, zoom: 6
        });
        this._mainMap = multiMap.map;

        ///**
        // * @type MapMoveCls
        // * @private
        // */
        //this._mainMapMove = multiMap.mapMove;

        /**
         * @type MapPopupCls
         * @private
         */
        this._mainMapPopup = multiMap.mapPopup;

        let metamanagerSegments = new LayerEsriMapServer(
            'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
            {
                minZoom: 7,
                visible: true,
                name: 'Metamanager Segments',
                opacity: 0.5
            });


        this._selectionLayer = new LayerBaseVectorGeoJson('', layerConfigHelper('Selection', 'yellow', true));
        this._selectionLayer.olLayer.setZIndex(50);
        this._workingLayer = new LayerBaseVectorGeoJson('', layerConfigHelper('Working', 'orange', false));

        this._mainMap.addLayer(metamanagerSegments.olLayer);
        this._mainMap.addLayer(this._workingLayer.olLayer);
        this._mainMap.addLayer(this._selectionLayer.olLayer);


        // </editor-fold>

        // <editor-fold desc="picker suppressor">
        $(document).click((event) => {
            if ($(event.target).parents('.rp-picker-container').length == 0) {
                this._hidePickers();
            }
        });
        // </editor-fold>

        // <editor-fold desc="bottom button events">
        this._$btnPreviewCorridor.click(() => {
            if (this._rpPicker1.referencePointId == null || this._rpPicker2.referencePointId == null) {
                console.log('not set');
            } else {
                $.get(getCorridorUrl,
                    {rp1: this._rpPicker1.referencePointId, rp2: this._rpPicker2.referencePointId},
                    (d) => {
                        if (d['features'].length == 0) {
                            alert('Corridor invalid, try an adjacent reference point');

                            return;
                        }
                        this._workingLayer.clear();
                        this._workingLayer.addFeatures(d);
                        this._setMapToLayerExtent(this._workingLayer);
                        this._$btnAddCorridor.prop('disabled', false);
                        this._$btnConfirmEditCorridor.prop('disabled', false);
                    }, 'json'
                );
            }
        });

        this._$btnAddCorridor.click(() => {
            let newCorridor = new Corridor(
                this._rpPicker1.referencePointId, this._rpPicker2.referencePointId,
                this._$selectStartCounty.val(), this._$selectEndCounty.val(), this._$selectHighway.val(),
                this._workingLayer.source.getFeatures());

            if (this._corridorLookup[newCorridor.clientId] == undefined) {
                this._addCorridor(newCorridor);
                this._sidebarOpen = false;
                this._refreshTable();
            } else {
                alert('A corridor with the same from and to RPs already exists');
            }
        });

        this._$btnConfirmEditCorridor.click(() => {
            this.__selectedCorridor.startCounty = this._$selectStartCounty.val();
            this.__selectedCorridor.highway = this._$selectHighway.val();
            this.__selectedCorridor.endCounty = this._$selectEndCounty.val();
            this.__selectedCorridor.fromRp = this._rpPicker1.referencePointId;
            this.__selectedCorridor.toRp = this._rpPicker2.referencePointId;
            this.__selectedCorridor.features = this._workingLayer.source.getFeatures();
            this._sidebarOpen = false;
            this._refreshTable();
        });

        this._$btnCancelCorridor.click(() => {
            this._sidebarOpen = false;
        });
        // </editor-fold>
    }


    // <editor-fold desc="county highway populators">
    _populateStartCountySelect() {
        $.get(startCountyUrl, {}, (d) => {
            for (let c of d) {
                this._$selectStartCounty.append(`<option>${c['name']}</option>`);
            }
        }, 'json');
    }

    /**
     *
     * @param {string} startCountyName the start county used to populate the highways
     * @param {highway} [highway=undefined] optional the highway to select on load
     * @private
     */
    _populateHighwaySelect(startCountyName, highway) {

        this._$selectHighway.html('');

        $.get(getHighwaysUrl, {startCountyName: startCountyName}, (d) => {
            for (let c of d) {
                this._$selectHighway.append(`<option>${c['name']}</option>`);
            }
            if (highway) {
                this._$selectHighway.val(highway);
            }

        }, 'json');
    }


    /**
     *
     * @param {string} highway the highway
     * @param {string} [endCounty=undefined] the county
     * @private
     */
    _populateEndCountySelect(highway, endCounty) {

        this._$selectEndCounty.html('');

        $.get(getEndCountyUrl, {highwayName: highway}, (d) => {
            for (let c of d) {
                this._$selectEndCounty.append(`<option>${c['name']}</option>`);
            }
            if (endCounty) {
                this._$selectEndCounty.val(endCounty);
            }
        }, 'json');


    }

    // </editor-fold>

    _hidePickers() {
        this._rpPicker1.visible = false;
        this._rpPicker2.visible = false;
    }

    /**
     *
     * @param {Corridor} cor - corridor object
     * @private
     */
    _addCorridor(cor) {
        this._corridorArray.push(cor);
        this._corridorLookup[cor.clientId] = cor;
        this._mainMap.addLayer(cor.olLayer);

        this._mainMapPopup.addVectorPopup(cor.layer, (props) => {
            return `Metamanager PDP ID: ${props['pdpId']}`;
        });
    }

    /**
     *
     * @param {Corridor} cor - corridor object
     * @private
     */
    _removeCorridor(cor) {
        this._mainMap.removeLayer(cor.olLayer);
        let ix = this._corridorArray.indexOf(cor);
        this._corridorArray.splice(ix, 1);
        delete this._corridorLookup[cor.clientId];
        this._mainMapPopup.removeVectorPopup(cor.layer);
        this._selectedCorridorId = undefined;
        this._refreshTable();
    }

    /**
     *
     * @param {LayerBaseVector} lyr - layer to use for extent
     * @private
     */
    _setMapToLayerExtent(lyr) {
        this._setExtent(lyr.source.getExtent());
    }

    _setExtent(extent) {
        this._mainMap.getView().fit(extent, this._mainMap.getSize());
    }

    _clear() {
        //this._$selectStartCounty.html('');
        this._$selectHighway.html('');
        this._$selectEndCounty.html('');
        this._rpPicker1.clear();
        this._rpPicker2.clear();
    }

    _refreshTable() {
        this._$container.find('.corridor-tr').remove();
        $('.corridor-data').remove();

        let minX = 100E10;
        let minY = 100E10;
        let maxX = -100E10;
        let maxY = -100E10;

        let $form = $('form');
        let $contentShow = $('#data-content-show');
        $contentShow.html('');

        for (let i = 0; i < this._corridorArray.length; i++) {
            let cor = this._corridorArray[i];
            this._$corridorTable.append(cor.getTableHtml(i));
            $form.append(cor.getDataHtml(i));
            $contentShow.append(cor.getDataHtmlDisp(i));
            let ext = cor._corridorLayer.source.getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }

        if (this._corridorArray.length > 0) {
            //this._setExtent([minX, minY, maxX, maxY]);
        }

        let _this = this;
        this._$container.find('.corridor-tr').click(function () {
            if (_this._sidebarOpen) {
                return;
            }
            _this._selectedCorridorId = this.id;
        });
    }

    /**
     * sets the selected corridor by the client id
     * @param {string} corridorId - the corridor id
     * @private
     */
    set _selectedCorridorId(corridorId) {
        if (corridorId == this.__selectedCorridorId) {
            return;
        }

        $('.corridor-tr-selected').removeClass('corridor-tr-selected');
        this._selectionLayer.clear();
        this._mainMapPopup.closePopup();

        if (corridorId == undefined) {
            this._$btnCreateCorridor.removeClass('ssa-hidden');
            this._$btnEditCorridor.addClass('ssa-hidden');
            this._$btnUnselectCorridor.addClass('ssa-hidden');
            this._$btnDeleteCorridor.addClass('ssa-hidden');
            this.__selectedCorridorId = undefined;
            this.__selectedCorridor = undefined;
        } else {
            this._$btnCreateCorridor.addClass('ssa-hidden');
            this._$btnEditCorridor.removeClass('ssa-hidden');
            this._$btnDeleteCorridor.removeClass('ssa-hidden');
            this._$btnUnselectCorridor.removeClass('ssa-hidden');
            this.__selectedCorridorId = corridorId;
            this.__selectedCorridor = this._corridorLookup[this.__selectedCorridorId];
            $('#' + this.__selectedCorridorId).addClass('corridor-tr-selected');
            this._selectionLayer.source.addFeatures(this.__selectedCorridor.layer.source.getFeatures());
            this._setMapToLayerExtent(this._selectionLayer);
        }
    }

    /**
     *
     * @returns {boolean} if sidebar is open
     * @private
     */
    get _sidebarOpen() {
        return this.__sidebarOpen;
    }

    /**
     * open or close the sidebar
     * @param {boolean} isOpen - if sidebar is open
     * @private
     */
    set _sidebarOpen(isOpen) {
        if (this.__sidebarOpen == isOpen) {
            return;
        }

        this.__sidebarOpen = isOpen;

        if (isOpen) {
            this._$rpPickerSidebar.removeClass('ssa-hidden');
            this._$btnCreateCorridor.addClass('ssa-hidden');
            this._$btnEditCorridor.addClass('ssa-hidden');
            this._$btnDeleteCorridor.addClass('ssa-hidden');
            this._$btnUnselectCorridor.addClass('ssa-hidden');
        } else {
            this._clear();
            this._$btnConfirmEditCorridor.addClass('ssa-hidden');
            this._$btnAddCorridor.addClass('ssa-hidden');
            this._$rpPickerSidebar.addClass('ssa-hidden');
            this._$btnCreateCorridor.removeClass('ssa-hidden');

        }

        $('.corridor-tr-selected').removeClass('corridor-tr-selected');
        this._$btnEditCorridor.addClass('ssa-hidden');
        this._$btnUnselectCorridor.addClass('ssa-hidden');


        this._workingLayer.visible = isOpen;
        this._selectionLayer.visible = !isOpen;
        this._selectionLayer.clear();
        this._workingLayer.clear();


        for (let l of this._corridorArray) {
            l.visible = !isOpen;
        }
        //this._$btnPreviewCorridor.prop('disabled', true);
        this._$btnAddCorridor.prop('disabled', true);
        this._$btnConfirmEditCorridor.prop('disabled', true);
        this._mainMap.updateSize();
    }
}

nm.SsaCorridorPicker = SsaCorridorPicker;

/**
 * Adds rp picker group
 * @returns {SsaCorridorPicker} the picker object
 * @this {jQuery}
 */
$.fn.ssaCorridorPicker = function () {
    return new SsaCorridorPicker(this);
};

export default Corridor;
