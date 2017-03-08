import ol = require('custom-ol');
/**
 * take an array of features and sort by a given property name
 */
declare class SortedFeatures {
    sortedFeatures: Array<ol.Feature>;
    propertyName: string;
    _propertyType: string;
    /**
     *
     * @param {Array<ol.Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */
    constructor(features: any, propertyName: any);
    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {ol.Feature|undefined} the feature matching the lookup
     */
    getFeature(propertyValue: any, exactMatch?: boolean, sortedFeatures?: Array<ol.Feature>): any;
}
export default SortedFeatures;
