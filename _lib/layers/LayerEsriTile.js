'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

var _LayerBaseXyzTile2 = require('./LayerBaseXyzTile');

var _LayerBaseXyzTile3 = _interopRequireDefault(_LayerBaseXyzTile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gavorhes on 12/4/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var nm = (0, _provide2.default)('layers');

/**
 * Esri tile
 * @augments LayerBaseXyzTile
 */

var LayerEsriTile = function (_LayerBaseXyzTile) {
  _inherits(LayerEsriTile, _LayerBaseXyzTile);

  /**
   * The Esri tile layer
   * @param {string} url - url for source
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
   * @param {boolean} [options.useEsriStyle=false] if the map service style should be used
   */

  function LayerEsriTile(url, options) {
    _classCallCheck(this, LayerEsriTile);

    if (url.search(/\/$/) == -1) {
      url += '/';
    }
    url += 'tile/{z}/{y}/{x}';

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LayerEsriTile).call(this, url, options));
  }

  return LayerEsriTile;
}(_LayerBaseXyzTile3.default);

nm.LayerBaseXyzTile = LayerEsriTile;
exports.default = LayerEsriTile;
module.exports = exports['default'];