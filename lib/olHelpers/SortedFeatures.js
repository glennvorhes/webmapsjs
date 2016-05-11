'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Created by gavorhes on 12/23/2015.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var _provide = require('../util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('olHelpers');

/**
 * take an array of features and sort by a given property name
 */

var SortedFeatures = (function () {

    /**
     *
     * @param {Array<ol.Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */

    function SortedFeatures(features, propertyName) {
        var _this2 = this;

        _classCallCheck(this, SortedFeatures);

        this.sortedFeatures = features;
        this.propertyName = propertyName;

        if (this.sortedFeatures.length > 0) {
            (function () {
                _this2._propertyType = _typeof(_this2.sortedFeatures[0].getProperties()[_this2.propertyName]);

                var _this = _this2;
                _this2.sortedFeatures.sort(function (a, b) {
                    if (_this._propertyType == 'number') {
                        return a['getProperties']()[_this.propertyName] - b['getProperties']()[_this.propertyName];
                    } else if (_this._propertyType == 'string') {
                        return a['getProperties']()[_this.propertyName] > b['getProperties']()[_this.propertyName];
                    }
                });
            })();
        }
    }

    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {ol.Feature|undefined} the feature matching the lookup
     */

    _createClass(SortedFeatures, [{
        key: 'getFeature',
        value: function getFeature(propertyValue, exactMatch, sortedFeatures) {
            if (typeof sortedFeatures == 'undefined') {
                sortedFeatures = this.sortedFeatures;
            }

            if (typeof exactMatch !== 'boolean') {
                exactMatch = false;
            }

            if (sortedFeatures.length == 0) {
                return undefined;
            }

            if (sortedFeatures.length == 1) {
                if (exactMatch) {
                    if (sortedFeatures[0].getProperties()[this.propertyName] == propertyValue) {
                        return sortedFeatures[0];
                    } else {
                        return undefined;
                    }
                } else {
                    return sortedFeatures[0];
                }
            }

            var lowProp = sortedFeatures[0].getProperties()[this.propertyName];
            var highProp = sortedFeatures[sortedFeatures.length - 1].getProperties()[this.propertyName];

            if (exactMatch) {
                if (lowProp == propertyValue) {
                    return sortedFeatures[0];
                } else if (propertyValue < lowProp) {
                    return undefined;
                } else if (highProp == propertyValue) {
                    return sortedFeatures[sortedFeatures.length - 1];
                } else if (propertyValue > highProp) {
                    return undefined;
                }
            } else {
                if (propertyValue <= lowProp) {
                    return sortedFeatures[0];
                } else if (propertyValue >= highProp) {
                    return sortedFeatures[sortedFeatures.length - 1];
                }
            }

            var midIndex = Math.floor(sortedFeatures.length / 2);
            var midFeature = sortedFeatures[midIndex];
            var midProperty = midFeature.getProperties()[this.propertyName];

            if (midProperty === propertyValue) {
                return midFeature;
            }

            if (propertyValue < midProperty) {
                return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(0, midIndex));
            } else {
                return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(midIndex));
            }
        }
    }]);

    return SortedFeatures;
})();

nm.SortedFeatures = SortedFeatures;
exports.default = SortedFeatures;
module.exports = exports['default'];