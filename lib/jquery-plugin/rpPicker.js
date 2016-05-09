'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _quickMap = require('../olHelpers/quickMap');

var _quickMap2 = _interopRequireDefault(_quickMap);

var _quickMapMulti = require('../olHelpers/quickMapMulti');

var _quickMapMulti2 = _interopRequireDefault(_quickMapMulti);

var _SortedFeatures = require('../olHelpers/SortedFeatures');

var _SortedFeatures2 = _interopRequireDefault(_SortedFeatures);

var _LayerBaseVectorGeoJson = require('../layers/LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _LayerEsriMapServer = require('../layers/LayerEsriMapServer');

var _LayerEsriMapServer2 = _interopRequireDefault(_LayerEsriMapServer);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ol = require('../ol/ol');
var nm = (0, _provide2.default)('ssa');

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
    var numMatch = inputString.match(/\d+/);

    if (numMatch.length == 0) {
        throw "highway id can't be parsed " + inputString;
    }

    var hwy = numMatch[0];

    //leading Pad
    while (hwy.length < 3) {
        hwy = '0' + hwy;
    }

    var dirMatch = inputString.match(/[SNEW]B$/);

    if (dirMatch.length == 0) {
        throw "highway id can't be parsed " + inputString;
    }

    return hwy + dirMatch[0][0];
}

var RpPicker = function () {

    /**
     * constructor for the date range
     * @param {jQuery} jQueryRef reference to the jquery element
     * @param {string} url the rp service url
     */

    function RpPicker(jQueryRef, url) {
        var _this2 = this;

        _classCallCheck(this, RpPicker);

        this._rpUrl = url;
        this._$container = jQueryRef;
        this._parentId = this._$container[0].id;
        this._mapDivId = this._parentId + '-map';
        this._mapContainerId = this._parentId + '-map-container';
        this._$container.addClass('rp-picker-container');

        this._rpSetCallback = function (rpId, rpFeature) {};

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
        this._rpLayer = new _LayerBaseVectorGeoJson2.default('', {
            minZoom: 7,
            mapMoveObj: this._pickerMapMove,
            name: 'Reference Points',
            transform: { dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857' },
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: 'rgba(0, 0, 255, 0.5)' }),
                    stroke: new ol.style.Stroke({ color: 'blue', width: 2 })
                })
            })
        });

        this._rpSelectionLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.7)' }),
                    stroke: new ol.style.Stroke({ color: 'red', width: 2 })
                })
            })
        });

        this._rpOtherLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({ color: 'rgba(0, 255, 0, 0.7)' }),
                    stroke: new ol.style.Stroke({ color: 'green', width: 2 })
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

        var pickerHtml = '<div title="Reference Point Picker" class="rp-picker-static"><select disabled="disabled" ></select></div>' + ('<div id="' + this._mapContainerId + '" class="rp-popup-container">') + '<div class="rp-picker-container-top">' + '<button class="container-head-close-button container-head-button">Close</button>' + '<button class="container-head-clear-button container-head-button">Clear</button>' + '<span class="container-head-rp-id container-head-span"></span>' + '<span class="container-head-coordinates container-head-span"></span>' + '</div>' + ('<div id="' + this._mapDivId + '" class="rp-picker-map"></div>') + '</div>' + '';

        this._$container.append(pickerHtml);
        this._$rpSelect = this._$container.find('select');
        var $selectorDiv = this._$container.find('.rp-picker-static');

        this._$mapContainer = this._$container.find('#' + this._mapContainerId);
        this._$closeButton = this._$container.find('.container-head-close-button');
        this._$clearButton = this._$container.find('.container-head-clear-button');
        this._$containerHeadRpId = this._$container.find('.container-head-rp-id');
        this._$containerHeadCoordinates = this._$container.find('.container-head-coordinates');

        this._$clearButton.click(function () {
            _this2.referencePointId = undefined;
        });

        this._$rpSelect.click(function (evt) {
            _this2._closeOtherPickers();
            $selectorDiv.trigger('click');
            $selectorDiv.trigger('click');
            evt.stopPropagation();
        });

        this._$rpSelect.change(function () {
            _this2.referencePointId = _this2._$rpSelect.val();
        }).keyup(function () {
            if (_this2.referencePointId != _this2._$rpSelect.val()) {
                _this2._$rpSelect.trigger('change');
            }
        });

        // open the map container
        $selectorDiv.click(function () {
            if (!_this2._enabled) {
                return;
            }

            //if (this.visible) {
            //    this.visible = false;
            //    return;
            //}

            _this2.visible = true;

            // initialize on first show
            if (!_this2._pickerMap) {
                _this2._mapInit();
            }
        });

        this._$closeButton.click(function (evt) {
            _this2.visible = false;
            evt.stopPropagation();
        });
    }

    /**
     *
     * @private
     */


    _createClass(RpPicker, [{
        key: '_mapInit',
        value: function _mapInit() {
            var _this3 = this;

            var multiMap = (0, _quickMapMulti2.default)({
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

            var metamanagerSegments = new _LayerEsriMapServer2.default('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer', {
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
                return '<input type="button" id=\'' + props['rpId'] + '\' class="select-rp-btn" value="Select"/>&nbsp;' + props['rpId'];
            });

            // add the popup change function to find the select button
            this._pickerMapPopup.addPopupChangedFunction(function () {
                var selectButton = (0, _jquery2.default)('.select-rp-btn');
                if (selectButton.length > 0) {
                    (function () {
                        var _this = _this3;
                        selectButton.click(function () {
                            _this.referencePointId = this.id;
                        });
                    })();
                }
            });

            this._setMapExtent();
        }

        /**
         * get the picker visibility
         * @returns {boolean} is visible
         */

    }, {
        key: '_setMapExtent',
        value: function _setMapExtent() {
            if (this._extent) {
                this._pickerMap.getView().fit(this._extent, this._pickerMap.getSize());
                //this._pickerMap.getView().setZoom(this._pickerMap.getView().getZoom());
            }
        }

        /**
         *
         * @returns {string|undefined} ref point id
         */

    }, {
        key: 'addOtherPicker',


        /**
         *
         * @param {RpPicker} otherPicker - the other picker in the group
         */
        value: function addOtherPicker(otherPicker) {
            this._otherPickerArray.push(otherPicker);
        }
    }, {
        key: '_closeOtherPickers',
        value: function _closeOtherPickers() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._otherPickerArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var p = _step.value;

                    p.visible = false;
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
        }

        /**
         *
         * @returns {boolean} if eneabled
         * @private
         */

    }, {
        key: 'setCountyAndHighway',


        /**
         *
         * @param {string} county - the county
         * @param {string} highway - the highway
         * @param {string} [rp=undefined] - the reference point
         */
        value: function setCountyAndHighway(county, highway, rp) {
            var _this4 = this;

            highway = highwayConvert(highway);

            _jquery2.default.get(this._rpUrl, { 'county': county, 'highway': highway }, function (d) {
                /**
                 * @type Array<object>
                 */
                _this4._rpLayer.addFeatures(d);
                _this4._sortedFeatures = new _SortedFeatures2.default(_this4._rpLayer.source.getFeatures(), 'rpId');

                var rpArray = [];
                _this4._$rpSelect.html('');

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this4._sortedFeatures.sortedFeatures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var f = _step2.value;

                        var rpId = f.getProperties()['rpId'];
                        if (rpArray.indexOf(rpId) < 0) {
                            rpArray.push(rpId);
                            _this4._$rpSelect.append('<option>' + rpId + '</option>');
                        }
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

                _this4.enabled = true;
                _this4.extent = _this4._rpLayer.source.getExtent();
                if (rp) {
                    _this4.referencePointId = rp;
                }
            }, 'json');
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.referencePointId = undefined;
            this._$rpSelect.html('');
            this._rpLayer.clear();
            this.enabled = false;
        }
    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        }

        /**
         * set the picker visibility
         * @param {boolean} vis is visible
         */
        ,
        set: function set(vis) {
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

    }, {
        key: 'extent',
        get: function get() {
            return this._extent;
        }

        /**
         *
         * @param {Array.<number>} newExtent - extent array
         */
        ,
        set: function set(newExtent) {
            this._extent = newExtent;
            if (this._pickerMap) {
                this._setMapExtent();
            }
        }
    }, {
        key: 'referencePointId',
        get: function get() {
            return this._referencePointId;
        }

        /**
         *
         * @param {string|undefined} newRef - new ref id
         */
        ,
        set: function set(newRef) {

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

            var selectedFeature = this._sortedFeatures.getFeature(this.referencePointId);

            this._rpSelectionLayer.getSource().addFeature(selectedFeature);
            this._$rpSelect.val(this.referencePointId);
            var featureCopy = selectedFeature.clone();
            featureCopy.getGeometry().transform('EPSG:3857', 'EPSG:4326');
            var lon = featureCopy.getGeometry().getCoordinates()[0];
            var lat = featureCopy.getGeometry().getCoordinates()[1];

            this._$containerHeadRpId.html(this.referencePointId);
            this._$containerHeadCoordinates.html(lat.toFixed(5) + ', ' + lon.toFixed(5));
            this._rpSetCallback(this.referencePointId, selectedFeature);
        }
    }, {
        key: 'otherFeature',
        get: function get() {
            return this._rpOtherFeature;
        },
        set: function set(otherFeature) {
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

    }, {
        key: 'rpSetCallback',
        set: function set(newCallback) {
            this._rpSetCallback = newCallback;
        }
    }, {
        key: 'enabled',
        get: function get() {
            return this._enabled;
        }

        /**
         *
         * @param {boolean} isEnabled - if enabled
         * @private
         */
        ,
        set: function set(isEnabled) {
            this._enabled = isEnabled;
            this._$rpSelect.prop('disabled', !this._enabled);

            if (!this._enabled) {
                this.visible = false;
            }
        }
    }]);

    return RpPicker;
}();

nm.RpPicker = RpPicker;

/**
 * Adds rp picker
 * @param {string} serviceUrl url for the points
 * @returns {RpPicker} a reference picker
 */
_jquery2.default.fn.rpPicker = function (serviceUrl) {
    return new RpPicker(this, serviceUrl);
};

exports.default = undefined;