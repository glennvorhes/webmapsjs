import Feature from 'ol/Feature';
/**
 * take an array of features and sort by a given property name
 */
export declare class SortedFeatures {
    sortedFeatures: Array<Feature>;
    propertyName: string;
    _propertyType: string;
    /**
     *
     * @param {Array<Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */
    constructor(features: Feature[], propertyName: string);
    /**
     * recursive search to find the value
     * @param {number|string} propertyValue - the property value to search for
     * @param {boolean} [exactMatch=false] if only an exact match should be returned
     * @param {Array} [sortedFeatures=this.sortedFeatures] - the candidate features
     * @returns {Feature|undefined} the feature matching the lookup
     */
    getFeature(propertyValue: number | string, exactMatch?: boolean, sortedFeatures?: Array<Feature>): Feature;
}
export default SortedFeatures;
