'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('../jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _makeGuid = require('../util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _zoomResolutionConvert = require('../olHelpers/zoomResolutionConvert');

var zoomResolutionConvert = _interopRequireWildcard(_zoomResolutionConvert);

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('layers');

/**
 * The base layer class
 * @abstract
 */

var LayerBase = function () {
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */

    function LayerBase(url, options) {
        _classCallCheck(this, LayerBase);

        options = options || {};

        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;

        this._params = _typeof(options.params) == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;

        this.id = options.id || (0, _makeGuid2.default)();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;

        if (this._opacity > 1) {
            this._opacity = 1;
        } else if (this._opacity < 0) {
            this._opacity = 0;
        }

        this._visible = typeof options.visible === 'boolean' ? options.visible : true;

        this._source = undefined;
        this.olLayer = undefined;
        this._loaded = false;

        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);

        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;

        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {};

        this._legendContent = '';

        if (this._legendCheckbox) {
            this._legendContent += '<input type="checkbox" ' + (this.visible ? 'checked' : '') + ' ' + ('class="legend-check" id="' + this.id + '-legend-layer-check"><span></span>');
            this._legendContent += '<label for="' + this.id + '-legend-layer-check" class="legend-layer-name">' + this.name + '</label>';
        } else {
            this._legendContent += '<label class="legend-layer-name">' + this.name + '</label>';
        }

        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }

    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */


    _createClass(LayerBase, [{
        key: '_load',
        value: function _load() {
            if (this.loaded == true) {
                return true;
            } else {
                this._loaded = true;

                return false;
            }
        }

        /**
         * Get the legend html, be sure to only add to the DOM once
         * @returns {string} html for layer wrapped in a div
         */

    }, {
        key: 'getLegendDiv',
        value: function getLegendDiv() {
            return '<div class="legend-layer-div" id="' + this.id + '-legend-layer-div">' + this._legendContent + '</div>';
        }

        /**
         *
         * @param {string|undefined} additionalContent - additional content to add to legend
         * @private
         */

    }, {
        key: '_addLegendContent',
        value: function _addLegendContent(additionalContent) {
            additionalContent = typeof additionalContent == 'string' ? additionalContent : '';

            var addCollapse = additionalContent.indexOf('<ul>') > -1;

            if (addCollapse) {
                additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
            }

            this._legendContent += additionalContent;

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {
                this._$legendDiv.append(additionalContent);
                this.applyCollapse();
            }
        }

        /**
         * add additional content to the legend
         * @param {string} [additionalContent=] - additonal content to add
         */

    }, {
        key: 'addLegendContent',
        value: function addLegendContent(additionalContent) {
            this._addLegendContent(additionalContent);
        }
    }, {
        key: 'applyCollapse',
        value: function applyCollapse() {
            if (this._applyCollapseCalled) {
                console.log('collapse already applied');

                return undefined;
            }

            this._$legendDiv = (0, _jquery2.default)('#' + this.id + '-legend-layer-div');

            if (this._$legendDiv.length > 0) {

                var $expander = this._$legendDiv.find('.legend-items-expander');

                if ($expander.length > 0) {
                    this._applyCollapseCalled = true;

                    $expander.click(function () {
                        var $this = (0, _jquery2.default)(this);

                        $this.siblings('ul').slideToggle();

                        if ($this.hasClass('legend-layer-group-collapsed')) {
                            $this.removeClass('legend-layer-group-collapsed');
                            $this.html('&#9660;');
                        } else {
                            $this.addClass('legend-layer-group-collapsed');
                            $this.html('&#9654;');
                        }
                    });

                    if (this._legendCollapse) {
                        $expander.trigger('click');
                    }
                }
            }
        }

        /**
         * trick to refresh the layer
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.source) {
                this.source.refresh();
                //let src = this.source;
                //this.olLayer.setSource(undefined);
                //this.olLayer.setSource(src);
            }
        }

        /**
         * get the legend content
         * @type {string}
         */

    }, {
        key: 'legendContent',
        get: function get() {
            return this._legendContent;
        }

        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        ,
        set: function set(newVal) {
            this._legendContent = newVal;
        }

        /**
         * get the map get params
         * @type {object}
         */

    }, {
        key: 'params',
        get: function get() {
            return this._params;
        }

        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        ,
        set: function set(newParams) {
            this._params = newParams;
        }

        /**
         * get the minimum resolution
         * @type {number|*}
         */

    }, {
        key: 'minResolution',
        get: function get() {
            return this._minResolution;
        }

        /**
         * get the maximum resolution
         * @type {number|*}
         */

    }, {
        key: 'maxResolution',
        get: function get() {
            return this._maxResolution;
        }

        /**
         * get min zoom
         * @type {number|*}
         */

    }, {
        key: 'minZoom',
        get: function get() {
            return this._minZoom;
        }

        /**
         * get max zoom
         * @type {number|*}
         */

    }, {
        key: 'maxZoom',
        get: function get() {
            return this._maxZoom;
        }

        /**
         * get the url
         * @type {string}
         */

    }, {
        key: 'url',
        get: function get() {
            return this._url;
        }

        /**
         * Get the layer visibility
         * @type {boolean}
         */

    }, {
        key: 'visible',
        get: function get() {
            return this._visible;
        }

        /**
         * Set the layer visibility
         * @param {boolean} visibility - layer visibility
         */
        ,
        set: function set(visibility) {
            this._visible = visibility;
            if (this.olLayer) {
                this.olLayer.setVisible(this._visible);
                if (visibility && !this._loaded) {
                    this._load();
                }
            }
        }

        /**
         * Get the layer opacity
         * @type {number}
         */

    }, {
        key: 'opacity',
        get: function get() {
            return this._opacity;
        }

        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        ,
        set: function set(opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        }

        /**
         * Get the layer name
         * @type {string}
         */

    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }

        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        ,
        set: function set(newName) {
            this._name = newName;
        }

        /**
         * Check if the layer is loaded
         * @type {boolean}
         */

    }, {
        key: 'loaded',
        get: function get() {
            return this._loaded;
        }

        /**
         * get the layer source
         * @type {*}
         */

    }, {
        key: 'source',
        get: function get() {
            return this._source;
        }

        /**
         * get the z index
         * @type {number}
         */

    }, {
        key: 'zIndex',
        get: function get() {
            return this._zIndex;
        }

        /**
         * set the z index
         * @param {number} newZ - new Z index
         */
        ,
        set: function set(newZ) {
            this._zIndex = newZ;
            this.olLayer.setZIndex(this.zIndex);
        }
    }]);

    return LayerBase;
}();

nm.LayerBase = LayerBase;
exports.default = LayerBase;
module.exports = exports['default'];