(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../jquery', './LayerBase', '../olHelpers/esriToOlStyle', '../olHelpers/mapPopup', '../util/provide', '../ol/ol'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../jquery'), require('./LayerBase'), require('../olHelpers/esriToOlStyle'), require('../olHelpers/mapPopup'), require('../util/provide'), require('../ol/ol'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.jquery, global.LayerBase, global.esriToOlStyle, global.mapPopup, global.provide, global.ol);
        global.LayerEsriMapServer = mod.exports;
    }
})(this, function (module, exports, _jquery, _LayerBase2, _esriToOlStyle, _mapPopup, _provide, _ol) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _LayerBase3 = _interopRequireDefault(_LayerBase2);

    var esriToOl = _interopRequireWildcard(_esriToOlStyle);

    var _mapPopup2 = _interopRequireDefault(_mapPopup);

    var _provide2 = _interopRequireDefault(_provide);

    var _ol2 = _interopRequireDefault(_ol);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var nm = (0, _provide2.default)('layers');

    /**
     * esri mapserver layer
     * @augments LayerBase
     */

    var LayerEsriMapServer = function (_LayerBase) {
        _inherits(LayerEsriMapServer, _LayerBase);

        /**
         * The base layer for all others
         * @param {string} url - resource url
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
         * @param {boolean} [options.addPopup=false] if a popup should be added
         */

        function LayerEsriMapServer(url, options) {
            _classCallCheck(this, LayerEsriMapServer);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerEsriMapServer).call(this, url, options));

            _this2._source = new _ol2.default.source.TileArcGISRest({ url: _this2.url == '' ? undefined : _this2.url });

            _this2.olLayer = new _ol2.default.layer.Tile({
                source: _this2._source,
                visible: _this2.visible,
                opacity: _this2.opacity,
                minResolution: _this2._minResolution,
                maxResolution: _this2._maxResolution,
                zIndex: _this2._zIndex
            });

            options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : false;

            _this2._esriFormat = new _ol2.default.format.EsriJSON();
            _this2._popupRequest = null;

            _this2.addLegendContent();

            if (options.addPopup) {
                _mapPopup2.default.addMapServicePopup(_this2);
            }
            return _this2;
        }

        /**
         * add additional content to the legend
         * @param {string} [additionalContent=''] additional content for legend
         */


        _createClass(LayerEsriMapServer, [{
            key: 'addLegendContent',
            value: function addLegendContent(additionalContent) {
                var urlCopy = this.url;

                if (urlCopy[urlCopy.length - 1] !== '/') {
                    urlCopy += '/';
                }

                urlCopy += 'legend?f=pjson&callback=?';

                var _this = this;
                var superAddLegend = _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'addLegendContent', this);

                _jquery2.default.get(urlCopy, {}, function (d) {
                    var newHtml = esriToOl.makeMapServiceLegend(d);
                    superAddLegend.call(_this, newHtml);
                }, 'json');
            }
        }, {
            key: 'getPopupInfo',
            value: function getPopupInfo(queryParams) {
                if (!this.visible) {
                    return;
                }

                var urlCopy = this.url;

                if (urlCopy[urlCopy.length - 1] != '/') {
                    urlCopy += '/';
                }

                urlCopy += 'identify?callback=?';

                var _this = this;

                if (this._popupRequest != null) {
                    this._popupRequest.abort();
                }

                this._popupRequest = _jquery2.default.get(urlCopy, queryParams, function (d) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = d['results'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var r = _step.value;


                            var popupHtml = '<table class="esri-popup-table">';

                            for (var a in r['attributes']) {
                                if (r['attributes'].hasOwnProperty(a)) {
                                    var attrVal = r['attributes'][a];

                                    if (attrVal == null || attrVal.toString().toLowerCase() == 'null') {
                                        continue;
                                    }

                                    var attr = a;
                                    if (attr.length > 14) {
                                        attr = attr.slice(0, 11) + '...';
                                    }

                                    popupHtml += '<tr><td>' + attr + '</td><td>' + attrVal + '</td></tr>';
                                }
                            }

                            popupHtml += '</table>';

                            _mapPopup2.default.addMapServicePopupContent(_this._esriFormat.readFeature(r), _this, popupHtml, r['layerName']);
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
                }, 'json').always(function () {
                    _this._popupRequest = null;
                });
            }
        }, {
            key: '_load',
            value: function _load() {}
        }, {
            key: 'source',
            get: function get() {
                return _get(Object.getPrototypeOf(LayerEsriMapServer.prototype), 'source', this);
            }
        }]);

        return LayerEsriMapServer;
    }(_LayerBase3.default);

    nm.LayerEsriMapServer = LayerEsriMapServer;
    exports.default = LayerEsriMapServer;
    module.exports = exports['default'];
});