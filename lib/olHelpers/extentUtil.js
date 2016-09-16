'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateExtent = calculateExtent;
exports.fitToMap = fitToMap;

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nm = (0, _provide2.default)('util');

/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
/**
 * Created by gavorhes on 7/18/2016.
 */
function calculateExtent(layers) {
    "use strict";

    if (layers.constructor.name != 'Array') {
        layers = [layers];
    }

    var hasExtent = false;

    var minX = 10E100;
    var minY = 10E100;
    var maxX = -10E100;
    var maxY = -10E100;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var lyr = _step.value;


            /**
             * 
             * @type {ol.layer.Vector}
             */
            var olLayer = lyr['olLayer'] || lyr;

            if (olLayer.getSource().getFeatures().length > 0) {
                hasExtent = true;
                var ext = olLayer.getSource().getExtent();
                minX = ext[0] < minX ? ext[0] : minX;
                minY = ext[1] < minY ? ext[1] : minY;
                maxX = ext[2] > maxX ? ext[2] : maxX;
                maxY = ext[3] > maxY ? ext[3] : maxY;
            }
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

    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    } else {
        return undefined;
    }
}

nm.calculateExtent = calculateExtent;

/**
 * given one or an array of layers, fit to the map
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector} layers - array of layers or single
 * @param {ol.Map} mp - the map to fit
 * @param {number|undefined} [zoomOut=undefined] - levels to zoom out after fit
 */
function fitToMap(layers, mp, zoomOut) {
    "use strict";

    /**
     * 
     * @type {ol.Extent|undefined}
     */

    var ext = calculateExtent(layers);

    if (typeof ext == 'undefined') {
        return;
    }

    mp.getView().fit(ext, mp.getSize());

    if (typeof zoomOut == 'number') {
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}

nm.calculateExtent = calculateExtent;