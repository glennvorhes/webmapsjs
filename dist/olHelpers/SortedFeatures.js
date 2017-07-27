"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 12/23/2015.
 */
var provide_1 = require("../util/provide");
var nm = provide_1.default('olHelpers');
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
        this.sortedFeatures = features;
        this.propertyName = propertyName;
        if (this.sortedFeatures.length > 0) {
            this._propertyType = typeof this.sortedFeatures[0].getProperties()[this.propertyName];
            var __this_1 = this;
            this.sortedFeatures.sort(function (a, b) {
                if (__this_1._propertyType == 'number') {
                    var aMinusB = a['getProperties']()[__this_1.propertyName] - b['getProperties']()[__this_1.propertyName];
                    if (aMinusB == 0) {
                        return 0;
                    }
                    else {
                        return aMinusB > 0 ? 1 : -1;
                    }
                }
                else if (__this_1._propertyType == 'string') {
                    var propA = a['getProperties']()[__this_1.propertyName] || '';
                    var propB = b['getProperties']()[__this_1.propertyName] || '';
                    propA = propA.toString().trim();
                    propB = propB.toString().trim();
                    if (propA == propB) {
                        return 0;
                    }
                    else {
                        return propA > propB ? 1 : 0;
                    }
                }
            });
        }
    }
    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {ol.Feature|undefined} the feature matching the lookup
     */
    SortedFeatures.prototype.getFeature = function (propertyValue, exactMatch, sortedFeatures) {
        if (exactMatch === void 0) { exactMatch = false; }
        if (typeof sortedFeatures == 'undefined') {
            sortedFeatures = this.sortedFeatures;
        }
        if (sortedFeatures.length == 0) {
            return undefined;
        }
        if (sortedFeatures.length == 1) {
            if (exactMatch) {
                if (sortedFeatures[0].getProperties()[this.propertyName] == propertyValue) {
                    return sortedFeatures[0];
                }
                else {
                    return undefined;
                }
            }
            else {
                return sortedFeatures[0];
            }
        }
        var lowProp = sortedFeatures[0].getProperties()[this.propertyName];
        var highProp = sortedFeatures[sortedFeatures.length - 1].getProperties()[this.propertyName];
        if (exactMatch) {
            if (lowProp == propertyValue) {
                return sortedFeatures[0];
            }
            else if (propertyValue < lowProp) {
                return undefined;
            }
            else if (highProp == propertyValue) {
                return sortedFeatures[sortedFeatures.length - 1];
            }
            else if (propertyValue > highProp) {
                return undefined;
            }
        }
        else {
            if (propertyValue <= lowProp) {
                return sortedFeatures[0];
            }
            else if (propertyValue >= highProp) {
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
        }
        else {
            return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(midIndex));
        }
    };
    return SortedFeatures;
}());
exports.SortedFeatures = SortedFeatures;
nm.SortedFeatures = SortedFeatures;
exports.default = SortedFeatures;
//# sourceMappingURL=SortedFeatures.js.map