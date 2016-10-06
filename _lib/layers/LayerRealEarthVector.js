'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LayerBaseVectorGeoJson = require('./LayerBaseVectorGeoJson');

var _LayerBaseVectorGeoJson2 = _interopRequireDefault(_LayerBaseVectorGeoJson);

var _RealEarthAnimateVector = require('../mixin/RealEarthAnimateVector');

var _RealEarthAnimateVector2 = _interopRequireDefault(_RealEarthAnimateVector);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 11/13/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var mixIns = require('es6-mixins');
var nm = (0, _provide2.default)('layers');

/**
 * Vector real earth vector
 * @augments LayerBaseVectorGeoJson
 */

var LayerVectorRealEarth = function (_LayerBaseVectorGeoJs) {
    _inherits(LayerVectorRealEarth, _LayerBaseVectorGeoJs);

    /**
     * Real Earth vector layer
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
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {object} [options.transform={}] SR transform, set as false for no transform
     * @param {string} options.transform.dataProjection=EPSG:4326 the data CRS
     * @param {string} options.transform.featureProjection=EPSG:3857 the feature/map CRS
     *
     * @param {string} options.products real earth products identifier
     * @param {boolean} [options.animate=false] if the layer should be animated
     */

    function LayerVectorRealEarth(options) {
        _classCallCheck(this, LayerVectorRealEarth);

        options.animate = typeof options.animate == 'boolean' ? options.animate : false;
        if (!options.animate) {
            options.params = { products: options.products };

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerVectorRealEarth).call(this, 'http://realearth.ssec.wisc.edu/api/shapes', options));
        } else {
            options.autoLoad = false;

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerVectorRealEarth).call(this, '', options));

            _this._products = options.products;
            if (!_this.timeInit) {
                mixIns([_RealEarthAnimateVector2.default], _this);
            }
            _this.timeInit();
        }
        return _possibleConstructorReturn(_this);
    }

    return LayerVectorRealEarth;
}(_LayerBaseVectorGeoJson2.default);

nm.LayerVectorRealEarth = LayerVectorRealEarth;
exports.default = LayerVectorRealEarth;
module.exports = exports['default'];