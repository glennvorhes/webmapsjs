'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _quickMap = require('../olHelpers/quickMap');

var _quickMap2 = _interopRequireDefault(_quickMap);

var _quickMapMulti = require('../olHelpers/quickMapMulti');

var _quickMapMulti2 = _interopRequireDefault(_quickMapMulti);

var _LayerBaseVectorEsri = require('../layers/LayerBaseVectorEsri');

var _LayerBaseVectorEsri2 = _interopRequireDefault(_LayerBaseVectorEsri);

var _LayerBaseVectorGeoJson = require('../layers/LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _LayerEsriMapServer = require('../layers/LayerEsriMapServer');

var _LayerEsriMapServer2 = _interopRequireDefault(_LayerEsriMapServer);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

require('./rpPicker.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ol = require('../ol/ol');

var nm = (0, _provide2.default)('ssa');

function makeRpPickerContent(idx) {
    "use strict";

    return '<div class="lbl-select-container"><label>Ref. Point #' + idx + '</label><div id="rp-picker-' + idx + '" class="rp-picker-' + idx + '"></div></div>';
}

var prefix = '/SSA/';
var startCountyUrl = prefix + 'getStartCounties';
var getHighwaysUrl = prefix + 'getHighways';
var getEndCountyUrl = prefix + 'getEndCounties';
var getFromRpUrl = prefix + 'getFromRps';
var getToRpUrl = prefix + 'getFromRps';
var getCorridorUrl = prefix + 'getCorridor';

/**
 *
 * @type {Array}
 */
var returnedColors = [];
var colorOptions = ['Aquamarine', 'Chartreuse', 'CornflowerBlue', 'Cyan', 'DarkOrange', 'DeepSkyBlue', 'GreenYellow', 'Salmon', 'Magenta', 'Orchid', 'Turquoise ', 'Tomato'];

function randomColor() {
    "use strict";

    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        var c = colorOptions[Math.floor(parseInt(Math.random() * colorOptions.length))];
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
        transform: { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' },
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }),
        visible: visible
    };
}

var entityMap = {
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

var Corridor = (function () {

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

    function Corridor(fromRp, toRp, startCounty, endCounty, highway, features, databaseId) {
        var _this2 = this;

        _classCallCheck(this, Corridor);

        features = features && features.constructor.name == 'Array' ? features : [];

        this.databaseId = databaseId;
        this.startCounty = startCounty;
        this.endCounty = endCounty;
        this.highway = highway;
        this.fromRp = fromRp;
        this.toRp = toRp;
        this.clientId = (fromRp + '-' + toRp).replace(/ /g, '_');
        this._color = randomColor();
        this._corridorLayer = new _LayerBaseVectorGeoJson2.default('', layerConfigHelper(this.fromRp + ' - ' + this.toRp, this._color, true));

        if (features.length > 0) {
            this._corridorLayer.source.addFeatures(features);
        } else {
            _jquery2.default.get(getCorridorUrl, { rp1: fromRp, rp2: toRp }, function (d) {
                _this2._corridorLayer.addFeatures(d);
            }, 'json');
        }
    }

    _createClass(Corridor, [{
        key: 'getTableHtml',
        value: function getTableHtml() {
            var outString = '<tr id="' + this.clientId + '" class="corridor-tr" style="background-color: ' + this._color + '">';
            outString += '<td>' + this.startCounty + '</td>';
            outString += '<td>' + this.endCounty + '</td>';
            outString += '<td>' + this.highway + '</td>';
            outString += '<td>' + this.fromRp + '</td>';
            outString += '<td>' + this.toRp + '</td>';
            outString += '</tr>';

            return outString;
        }
    }, {
        key: 'getDataHtml',
        value: function getDataHtml(i) {
            var outString = '<div class="corridor-data">';
            outString += '<input type="hidden" class="corridor-data-database-id" name="corridors[' + i + '].corridorId" value="' + this.databaseId + '"/>';
            outString += '<input type="hidden" class="corridor-data-start-county" name="corridors[' + i + '].startCounty" value="' + this.startCounty + '"/>';
            outString += '<input type="hidden" class="corridor-data-end-county" name="corridors[' + i + '].endCounty" value="' + this.endCounty + '"/>';
            outString += '<input type="hidden" class="corridor-data-highway" name="corridors[' + i + '].highway" value="' + this.highway + '"/>';
            outString += '<input type="hidden" class="corridor-data-from-rp" name="corridors[' + i + '].fromRp" value="' + this.fromRp + '"/>';
            outString += '<input type="hidden" class="corridor-data-to-rp" name="corridors[' + i + '].toRp" value="' + this.toRp + '"/>';
            outString += '</div>';

            return outString;
        }
    }, {
        key: 'getDataHtmlDisp',
        value: function getDataHtmlDisp(i) {
            var returnString = this.getDataHtml(i);
            returnString = escapeHtml(returnString);
            returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
            returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');

            return returnString + '<br>';
        }
    }, {
        key: 'olLayer',
        get: function get() {
            return this._corridorLayer.olLayer;
        }
    }, {
        key: 'layer',
        get: function get() {
            return this._corridorLayer;
        }

        /**
         *
         * @returns {boolean} if corridor layer is visible
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._corridorLayer.visible;
        }

        /**
         *
         * @param {boolean} vis if corridor layer is visible
         */
        ,
        set: function set(vis) {
            this._corridorLayer.visible = vis;
        }

        /**
         *
         * @returns {Array.<ol.Feature>} an array of ol features
         */

    }, {
        key: 'features',
        get: function get() {
            return this._corridorLayer.features;
        }

        /**
         *
         * @param {Array.<ol.Feature>} feats array of ol features
         */
        ,
        set: function set(feats) {
            this._corridorLayer.clear();
            this._corridorLayer.source.addFeatures(feats);
        }
    }]);

    return Corridor;
})();

nm.Corridor = Corridor;

var SsaCorridorPicker = (function () {

    /**
     * constructor for the corridor picker
     * @param {jQuery} jQueryRef reference to the jquery element
     */

    function SsaCorridorPicker(jQueryRef) {
        var _this3 = this;

        _classCallCheck(this, SsaCorridorPicker);

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

        var newContent = '';
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
        newContent += '<div class="lbl-select-container">';
        newContent += '<input type="button" class="rp-picker-preview-corridor" value="Preview"/>';
        newContent += '<input type="button" class="rp-picker-add-corridor ssa-hidden" disabled="disabled" value="Add"/>';
        newContent += '<input type="button" class="rp-picker-confirm-edit-corridor ssa-hidden" disabled="disabled" value="Confirm"/>';
        newContent += '<input type="button" class="rp-picker-cancel-corridor" value="Cancel"/>';
        newContent += '</div>';
        newContent += '</div>';
        // </editor-fold>

        // add map div
        newContent += '<div id="rp-main-map" class="rp-picker-main-map"></div>';
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

        this._rpPicker1.rpSetCallback = function (rpId, feat) {
            _this3._rpPicker2.otherFeature = feat;
        };

        this._rpPicker2.rpSetCallback = function (rpId, feat) {
            _this3._rpPicker1.otherFeature = feat;
        };
        // </editor-fold>

        // <editor-fold desc="top button events">
        this._$btnCreateCorridor.click(function () {
            _this3._sidebarOpen = true;
            _this3._$btnAddCorridor.removeClass('ssa-hidden');
        });

        this._$btnEditCorridor.click(function () {
            _this3._sidebarOpen = true;
            _this3._$btnConfirmEditCorridor.removeClass('ssa-hidden');
            _this3._workingLayer.source.addFeatures(_this3.__selectedCorridor.layer.source.getFeatures());
            _this3._setMapToLayerExtent(_this3._workingLayer);
            _this3._$selectStartCounty.val(_this3.__selectedCorridor.startCounty);
            _this3._populateHighwaySelect(_this3.__selectedCorridor.startCounty, _this3.__selectedCorridor.highway);
            _this3._populateEndCountySelect(_this3.__selectedCorridor.highway, _this3.__selectedCorridor.endCounty);

            _this3._rpPicker1.setCountyAndHighway(_this3.__selectedCorridor.startCounty, _this3.__selectedCorridor.highway, _this3.__selectedCorridor.fromRp);

            _this3._rpPicker2.setCountyAndHighway(_this3.__selectedCorridor.endCounty, _this3.__selectedCorridor.highway, _this3.__selectedCorridor.toRp);
        });

        this._$btnDeleteCorridor.click(function () {
            var conf = confirm('Confirm delete corridor? (Changes saved to database on submit)');
            if (conf) {
                _this3._removeCorridor(_this3.__selectedCorridor);
            }
        });

        this._$btnUnselectCorridor.click(function () {
            _this3._selectedCorridorId = undefined;
        });

        // </editor-fold>

        // <editor-fold desc="county highway change events">
        this._populateStartCountySelect();

        this._$selectStartCounty.change(function () {
            console.log('start county changed');
            _this3._clear();
            _this3._populateHighwaySelect(_this3._$selectStartCounty.val());
        });

        this._$selectHighway.change(function () {
            console.log('highway changed');
            _this3._rpPicker2.clear();
            _this3._populateEndCountySelect(_this3._$selectHighway.val());
        });

        this._$selectEndCounty.change(function () {
            _this3._rpPicker1.setCountyAndHighway(_this3._$selectStartCounty.val(), _this3._$selectHighway.val());
            _this3._rpPicker2.setCountyAndHighway(_this3._$selectEndCounty.val(), _this3._$selectHighway.val());
            console.log('end county changed');
        });

        // </editor-fold>

        // <editor-fold desc="map setup">
        var multiMap = (0, _quickMapMulti2.default)({
            divId: 'rp-main-map', minZoom: 6, zoom: 6
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

        var metamanagerSegments = new _LayerEsriMapServer2.default('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
            minZoom: 7,
            visible: true,
            name: 'Metamanager Segments',
            opacity: 0.5
        });

        this._selectionLayer = new _LayerBaseVectorGeoJson2.default('', layerConfigHelper('Selection', 'yellow', true));
        this._selectionLayer.olLayer.setZIndex(50);
        this._workingLayer = new _LayerBaseVectorGeoJson2.default('', layerConfigHelper('Working', 'orange', false));

        this._mainMap.addLayer(metamanagerSegments.olLayer);
        this._mainMap.addLayer(this._workingLayer.olLayer);
        this._mainMap.addLayer(this._selectionLayer.olLayer);

        // </editor-fold>

        // <editor-fold desc="picker suppressor">
        (0, _jquery2.default)(document).click(function (event) {
            if ((0, _jquery2.default)(event.target).parents('.rp-picker-container').length == 0) {
                _this3._hidePickers();
            }
        });
        // </editor-fold>

        // <editor-fold desc="bottom button events">
        this._$btnPreviewCorridor.click(function () {
            if (_this3._rpPicker1.referencePointId == null || _this3._rpPicker2.referencePointId == null) {
                console.log('not set');
            } else {
                _jquery2.default.get(getCorridorUrl, { rp1: _this3._rpPicker1.referencePointId, rp2: _this3._rpPicker2.referencePointId }, function (d) {
                    if (d['features'].length == 0) {
                        alert('Corridor invalid, try an adjacent reference point');

                        return;
                    }
                    _this3._workingLayer.clear();
                    _this3._workingLayer.addFeatures(d);
                    _this3._setMapToLayerExtent(_this3._workingLayer);
                    _this3._$btnAddCorridor.prop('disabled', false);
                    _this3._$btnConfirmEditCorridor.prop('disabled', false);
                }, 'json');
            }
        });

        this._$btnAddCorridor.click(function () {
            var newCorridor = new Corridor(_this3._rpPicker1.referencePointId, _this3._rpPicker2.referencePointId, _this3._$selectStartCounty.val(), _this3._$selectEndCounty.val(), _this3._$selectHighway.val(), _this3._workingLayer.source.getFeatures());

            if (_this3._corridorLookup[newCorridor.clientId] == undefined) {
                _this3._addCorridor(newCorridor);
                _this3._sidebarOpen = false;
                _this3._refreshTable();
            } else {
                alert('A corridor with the same from and to RPs already exists');
            }
        });

        this._$btnConfirmEditCorridor.click(function () {
            _this3.__selectedCorridor.startCounty = _this3._$selectStartCounty.val();
            _this3.__selectedCorridor.highway = _this3._$selectHighway.val();
            _this3.__selectedCorridor.endCounty = _this3._$selectEndCounty.val();
            _this3.__selectedCorridor.fromRp = _this3._rpPicker1.referencePointId;
            _this3.__selectedCorridor.toRp = _this3._rpPicker2.referencePointId;
            _this3.__selectedCorridor.features = _this3._workingLayer.source.getFeatures();
            _this3._sidebarOpen = false;
            _this3._refreshTable();
        });

        this._$btnCancelCorridor.click(function () {
            _this3._sidebarOpen = false;
        });
        // </editor-fold>
    }

    // <editor-fold desc="county highway populators">

    _createClass(SsaCorridorPicker, [{
        key: '_populateStartCountySelect',
        value: function _populateStartCountySelect() {
            var _this4 = this;

            _jquery2.default.get(startCountyUrl, {}, function (d) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var c = _step.value;

                        _this4._$selectStartCounty.append('<option>' + c['name'] + '</option>');
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }, 'json');
        }

        /**
         *
         * @param {string} startCountyName the start county used to populate the highways
         * @param {highway} [highway=undefined] optional the highway to select on load
         * @private
         */

    }, {
        key: '_populateHighwaySelect',
        value: function _populateHighwaySelect(startCountyName, highway) {
            var _this5 = this;

            this._$selectHighway.html('');

            _jquery2.default.get(getHighwaysUrl, { startCountyName: startCountyName }, function (d) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = d[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var c = _step2.value;

                        _this5._$selectHighway.append('<option>' + c['name'] + '</option>');
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                if (highway) {
                    _this5._$selectHighway.val(highway);
                }
            }, 'json');
        }

        /**
         *
         * @param {string} highway the highway
         * @param {string} [endCounty=undefined] the county
         * @private
         */

    }, {
        key: '_populateEndCountySelect',
        value: function _populateEndCountySelect(highway, endCounty) {
            var _this6 = this;

            this._$selectEndCounty.html('');

            _jquery2.default.get(getEndCountyUrl, { highwayName: highway }, function (d) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = d[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var c = _step3.value;

                        _this6._$selectEndCounty.append('<option>' + c['name'] + '</option>');
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (endCounty) {
                    _this6._$selectEndCounty.val(endCounty);
                }
            }, 'json');
        }

        // </editor-fold>

    }, {
        key: '_hidePickers',
        value: function _hidePickers() {
            this._rpPicker1.visible = false;
            this._rpPicker2.visible = false;
        }

        /**
         *
         * @param {Corridor} cor - corridor object
         * @private
         */

    }, {
        key: '_addCorridor',
        value: function _addCorridor(cor) {
            this._corridorArray.push(cor);
            this._corridorLookup[cor.clientId] = cor;
            this._mainMap.addLayer(cor.olLayer);

            this._mainMapPopup.addVectorPopup(cor.layer, function (props) {
                return 'Metamanager PDP ID: ' + props['pdpId'];
            });
        }

        /**
         *
         * @param {Corridor} cor - corridor object
         * @private
         */

    }, {
        key: '_removeCorridor',
        value: function _removeCorridor(cor) {
            this._mainMap.removeLayer(cor.olLayer);
            var ix = this._corridorArray.indexOf(cor);
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

    }, {
        key: '_setMapToLayerExtent',
        value: function _setMapToLayerExtent(lyr) {
            this._setExtent(lyr.source.getExtent());
        }
    }, {
        key: '_setExtent',
        value: function _setExtent(extent) {
            this._mainMap.getView().fit(extent, this._mainMap.getSize());
        }
    }, {
        key: '_clear',
        value: function _clear() {
            //this._$selectStartCounty.html('');
            this._$selectHighway.html('');
            this._$selectEndCounty.html('');
            this._rpPicker1.clear();
            this._rpPicker2.clear();
        }
    }, {
        key: '_refreshTable',
        value: function _refreshTable() {
            this._$container.find('.corridor-tr').remove();
            (0, _jquery2.default)('.corridor-data').remove();

            var minX = 100E10;
            var minY = 100E10;
            var maxX = -100E10;
            var maxY = -100E10;

            var $form = (0, _jquery2.default)('form');
            var $contentShow = (0, _jquery2.default)('#data-content-show');
            $contentShow.html('');

            for (var i = 0; i < this._corridorArray.length; i++) {
                var cor = this._corridorArray[i];
                this._$corridorTable.append(cor.getTableHtml(i));
                $form.append(cor.getDataHtml(i));
                $contentShow.append(cor.getDataHtmlDisp(i));
                var ext = cor._corridorLayer.source.getExtent();
                minX = ext[0] < minX ? ext[0] : minX;
                minY = ext[1] < minY ? ext[1] : minY;
                maxX = ext[2] > maxX ? ext[2] : maxX;
                maxY = ext[3] > maxY ? ext[3] : maxY;
            }

            if (this._corridorArray.length > 0) {
                //this._setExtent([minX, minY, maxX, maxY]);
            }

            var _this = this;
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

    }, {
        key: '_selectedCorridorId',
        set: function set(corridorId) {
            if (corridorId == this.__selectedCorridorId) {
                return;
            }

            (0, _jquery2.default)('.corridor-tr-selected').removeClass('corridor-tr-selected');
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
                (0, _jquery2.default)('#' + this.__selectedCorridorId).addClass('corridor-tr-selected');
                this._selectionLayer.source.addFeatures(this.__selectedCorridor.layer.source.getFeatures());
                this._setMapToLayerExtent(this._selectionLayer);
            }
        }

        /**
         *
         * @returns {boolean} if sidebar is open
         * @private
         */

    }, {
        key: '_sidebarOpen',
        get: function get() {
            return this.__sidebarOpen;
        }

        /**
         * open or close the sidebar
         * @param {boolean} isOpen - if sidebar is open
         * @private
         */
        ,
        set: function set(isOpen) {
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

            (0, _jquery2.default)('.corridor-tr-selected').removeClass('corridor-tr-selected');
            this._$btnEditCorridor.addClass('ssa-hidden');
            this._$btnUnselectCorridor.addClass('ssa-hidden');

            this._workingLayer.visible = isOpen;
            this._selectionLayer.visible = !isOpen;
            this._selectionLayer.clear();
            this._workingLayer.clear();

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._corridorArray[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var l = _step4.value;

                    l.visible = !isOpen;
                }
                //this._$btnPreviewCorridor.prop('disabled', true);
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            this._$btnAddCorridor.prop('disabled', true);
            this._$btnConfirmEditCorridor.prop('disabled', true);
            this._mainMap.updateSize();
        }
    }]);

    return SsaCorridorPicker;
})();

nm.SsaCorridorPicker = SsaCorridorPicker;

/**
 * Adds rp picker group
 * @returns {SsaCorridorPicker} the picker object
 * @this {jQuery}
 */
_jquery2.default.fn.ssaCorridorPicker = function () {
    return new SsaCorridorPicker(this);
};

exports.default = Corridor;