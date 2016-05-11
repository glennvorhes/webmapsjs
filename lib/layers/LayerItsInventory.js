'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LayerBaseVectorGeoJson = require('./LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _mapMove = require('../olHelpers/mapMove');

var _mapMove2 = _interopRequireDefault(_mapMove);

var _mapPopup = require('../olHelpers/mapPopup');

var _mapPopup2 = _interopRequireDefault(_mapPopup);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _ol = require('../ol/ol');

var _ol2 = _interopRequireDefault(_ol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } /**
                                                                                                                              * Created by gavorhes on 12/8/2015.
                                                                                                                              */

var nm = (0, _provide2.default)('layers');

function checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict"

    //make sure one and only one configuration is defined;
    ;
    var configCount = 0;
    if (typeof itsIcon == 'string') {
        configCount++;
    }

    if ((typeof itsLineStyle === 'undefined' ? 'undefined' : _typeof(itsLineStyle)) == 'object') {
        itsLineStyle.width = typeof itsLineStyle.width == 'number' ? itsLineStyle.width : 5;
        itsLineStyle.color = typeof itsLineStyle.color == 'string' ? itsLineStyle.color : 'red';
        configCount++;
    }

    if ((typeof itsIconConfig === 'undefined' ? 'undefined' : _typeof(itsIconConfig)) == 'object') {
        itsIconConfig.defaultName = itsIconConfig.defaultName || 'Other';

        if (typeof itsIconConfig.iconArray == 'undefined') {
            itsIconConfig.iconArray = [];
        }

        configCount++;
    }

    if ((typeof itsLineConfig === 'undefined' ? 'undefined' : _typeof(itsLineConfig)) == 'object') {
        itsLineConfig.defaultName = itsLineConfig.defaultName || 'Other';
        itsLineConfig.defaultWidth = itsLineConfig.defaultWidth || 5;
        itsLineConfig.defaultColor = itsLineConfig.defaultColor || 'red';

        if (typeof itsLineConfig.lineArray == 'undefined') {
            itsLineConfig.lineArray = [];
        }

        // set the width if not defined
        for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
            if (itsLineConfig.lineArray[i].length == 3) {
                itsLineConfig.lineArray[i].push(5);
            }
        }

        configCount++;
    }

    if (configCount > 1) {
        throw 'Only one style config can be defined';
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {*} undefined, style, or style function
 */
function defineStyle(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return new _ol2.default.style.Style({
            image: new _ol2.default.style.Icon({ src: _iconUrlRoot + itsIcon })
        });
    } else if (itsLineStyle) {
        return new _ol2.default.style.Style({
            stroke: new _ol2.default.style.Stroke({
                color: itsLineStyle.color,
                width: itsLineStyle.width
            })
        });
    } else if (itsIconConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsIconConfig.prop];
            var iconUrl = _iconUrlRoot + itsIconConfig.defaultIcon;

            for (var i = 0; i < itsIconConfig.iconArray.length; i++) {
                var thisProp = itsIconConfig.iconArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    iconUrl = _iconUrlRoot + thisProp[2];
                    break;
                }
            }

            return [new _ol2.default.style.Style({
                image: new _ol2.default.style.Icon({ src: iconUrl })
            })];
        };
    } else if (itsLineConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsLineConfig.prop];
            var colr = itsLineConfig.defaultColor || 'red';
            var width = itsLineConfig.defaultWidth || 5;

            for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
                var thisProp = itsLineConfig.lineArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    colr = thisProp[2];
                    width = thisProp[3];
                    break;
                }
            }

            return [new _ol2.default.style.Style({
                stroke: new _ol2.default.style.Stroke({
                    color: colr,
                    width: width
                })
            })];
        };
    } else {
        return undefined;
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {string} html to be added to the legend
 */
function defineLegend(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    var iconHeight = 17;

    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return '<img src="' + (_iconUrlRoot + itsIcon) + '" class="legend-layer-icon" height="' + iconHeight + '">';
    } else if (itsLineStyle) {
        return '<hr style="height: ' + itsLineStyle.width + 'px; background-color: ' + itsLineStyle.color + '">';
    } else if (itsIconConfig) {
        var outHtml = '';
        outHtml += '<ul>';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = itsIconConfig.iconArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var a = _step.value;

                outHtml += '<li><span class="legend-layer-subitem">' + a[1] + '</span><img src="' + (_iconUrlRoot + a[2]) + '" class="legend-layer-icon" height="' + iconHeight + '">';
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

        outHtml += '<li><span class="legend-layer-subitem">' + itsIconConfig.defaultName + '</span>' + ('<img src="' + (_iconUrlRoot + itsIconConfig.defaultIcon) + '" class="legend-layer-icon" height="' + iconHeight + '"></li>');
        outHtml += '</ul>';

        return outHtml;
    } else if (itsLineConfig) {
        var _outHtml = '';
        _outHtml += '<ul>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = itsLineConfig.lineArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var ls = _step2.value;

                _outHtml += '<li><span class="legend-layer-subitem">' + ls[1] + '</span>' + ('<hr style="height: ' + ls[3] + 'px; background-color: ' + ls[2] + '">');
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

        _outHtml += '<li><span class="legend-layer-subitem">' + itsLineConfig.defaultName + '</span>' + ('<hr style="height: ' + itsLineConfig.defaultWidth + 'px; background-color: ' + itsLineConfig.defaultColor + '"></li>');
        _outHtml += '</ul>';

        return _outHtml;
    } else {
        return '';
    }
}

/**
 * Its Layer class
 * @augments LayerBaseVectorGeoJson
 */

var LayerItsInventory = (function (_LayerBaseVectorGeoJs) {
    _inherits(LayerItsInventory, _LayerBaseVectorGeoJs);

    /**
     * ITS device layer, types available at http://transportal.cee.wisc.edu/its/inventory/
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object|*} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} options.itsType the ITS device type, use the url flag at http://transportal.cee.wisc.edu/its/inventory/
     * @param {boolean} [options.addPopup=true] if the popup should be added automatically
     *
     * @param {string} [options.itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
     *
     * @param {object} [options.itsLineStyle=undefined] A single line style
     * @param {string} options.itsLineStyle.color the line color as rgb or hex
     * @param {number} [options.itsLineStyle.width=5] the line width
     *
     * @param {object} [options.itsIconConfig=undefined] The icon subtype configuration
     * @param {string} options.itsIconConfig.prop The property used to define icon attribute symbolization
     * @param {string} options.itsIconConfig.defaultName The default name to be used if no other match is found
     * @param {string} options.itsIconConfig.defaultIcon The default icon to be used for no other matches
     * @param {object} [options.itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
     *
     * @param {object} [options.itsLineConfig=undefined] The property used to define icon attribute symbolization
     * @param {string} options.itsLineConfig.prop The property used to define icon attribute symbolization
     * @param {string} [options.itsLineConfig.defaultName=Other] The default name to be used if no other match is found
     * @param {string} [options.itsLineConfig.defaultColor=red] The default line color to be used for no other matches
     * @param {number} [options.itsLineConfig.defaultWidth] The default line width to be used for no other matches
     * @param {object} [options.itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width = 5]
     */

    function LayerItsInventory(options) {
        _classCallCheck(this, LayerItsInventory);

        if (typeof options.itsType !== 'string') {
            throw 'its type must be defined';
        }

        var addToLegend = '';

        // define a style with the helper function if it is not explicitly defined
        if (typeof options.style == 'undefined') {
            options.style = defineStyle(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
            addToLegend = defineLegend(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
        }

        options.params = _typeof(options.params) == 'object' ? options.params : {};
        _jquery2.default.extend(options.params, { format: 'JSON', resource: options.itsType });

        //add any additional content to the legend

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerItsInventory).call(this, 'http://transportal.cee.wisc.edu/its/inventory/', options));

        _this.addLegendContent(addToLegend);

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : true;

        if (options.addPopup) {
            _mapPopup2.default.addVectorPopup(_this, function (props) {
                return '<iframe src="http://transportal.cee.wisc.edu/its/inventory/?feature=' + props['featureGuid'] + '" ' + 'height="250" width="350"></iframe>';
            });
        }
        return _this;
    }

    /**
     * callback to generate the parameters passed in the get request
     * @callback makeGetParams
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */

    _createClass(LayerItsInventory, [{
        key: 'mapMoveMakeGetParams',
        value: function mapMoveMakeGetParams(extent, zoomLevel) {
            _get(Object.getPrototypeOf(LayerItsInventory.prototype), 'mapMoveMakeGetParams', this).call(this, extent, zoomLevel);
            var lowerLeft = new _ol2.default.geom.Point([extent.minX, extent.minY]);
            lowerLeft.transform(this.mapCrs, "EPSG:4326");
            var lowerLeftCoordinates = lowerLeft.getCoordinates();
            var upperRight = new _ol2.default.geom.Point([extent.maxX, extent.maxY]);
            upperRight.transform(this.mapCrs, "EPSG:4326");
            var upperRightCoordinates = upperRight.getCoordinates();

            _jquery2.default.extend(this.mapMoveParams, {
                L: lowerLeftCoordinates[0],
                R: upperRightCoordinates[0],
                B: lowerLeftCoordinates[1],
                T: upperRightCoordinates[1]
            });
        }
    }]);

    return LayerItsInventory;
})(_LayerBaseVectorGeoJson2.default);

nm.LayerItsInventory = LayerItsInventory;
exports.default = LayerItsInventory;
module.exports = exports['default'];