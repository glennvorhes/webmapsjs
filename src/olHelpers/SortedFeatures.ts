/**
 * Created by gavorhes on 12/23/2015.
 */
import provide from '../util/provide';
import ol = require('custom-ol');
let nm = provide('olHelpers');

/**
 * take an array of features and sort by a given property name
 */
export class SortedFeatures {
    sortedFeatures: Array<ol.Feature>;
    propertyName: string;
    _propertyType: string;

    /**
     *
     * @param {Array<ol.Feature>} features array of ol features
     * @param {string} propertyName - the property name to use for lookup
     */
    constructor(features: ol.Feature[], propertyName: string) {
        this.sortedFeatures = features;
        this.propertyName = propertyName;

        if (this.sortedFeatures.length > 0) {
            this._propertyType = typeof this.sortedFeatures[0].getProperties()[this.propertyName];

            let __this = this;
            this.sortedFeatures.sort(function (a, b) : number {
                if (__this._propertyType == 'number'){
                    let aMinusB = a['getProperties']()[__this.propertyName] - b['getProperties']()[__this.propertyName];
                    if (aMinusB == 0){
                        return 0;
                    } else {
                        return aMinusB > 0 ? 1 : -1;
                    }
                } else if (__this._propertyType == 'string'){
                    let propA = a['getProperties']()[__this.propertyName] || '';
                    let propB = b['getProperties']()[__this.propertyName] || '';
                    propA = propA.toString().trim();
                    propB = propB.toString().trim();

                    if (propA == propB){
                        return 0;
                    } else {
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
    getFeature(propertyValue: number|string, exactMatch: boolean = false, sortedFeatures? :Array<ol.Feature>): ol.Feature {
        if (typeof sortedFeatures == 'undefined'){
            sortedFeatures = this.sortedFeatures;
        }


        if (sortedFeatures.length == 0){
            return undefined;
        }

        if (sortedFeatures.length == 1){
            if (exactMatch){
                if (sortedFeatures[0].getProperties()[this.propertyName] == propertyValue){
                    return sortedFeatures[0];
                } else {
                    return undefined;
                }
            } else {
                return sortedFeatures[0];
            }
        }

        let lowProp = sortedFeatures[0].getProperties()[this.propertyName];
        let highProp = sortedFeatures[sortedFeatures.length - 1].getProperties()[this.propertyName];

        if (exactMatch){
            if (lowProp == propertyValue){
                return sortedFeatures[0];
            } else if (propertyValue < lowProp){
                return undefined;
            } else if (highProp == propertyValue){
                return sortedFeatures[sortedFeatures.length - 1];
            } else if (propertyValue >  highProp){
                return undefined;
            }
        } else {
            if (propertyValue <= lowProp){
                return sortedFeatures[0];
            } else if (propertyValue >= highProp){
                return sortedFeatures[sortedFeatures.length - 1];
            }
        }

        let midIndex = Math.floor(sortedFeatures.length / 2);
        let midFeature = sortedFeatures[midIndex];
        let midProperty = midFeature.getProperties()[this.propertyName];

        if (midProperty ===  propertyValue){
            return midFeature;
        }

        if (propertyValue < midProperty){
            return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(0, midIndex));
        } else {
            return this.getFeature(propertyValue, exactMatch, sortedFeatures.slice(midIndex));
        }
    }
}

nm.SortedFeatures = SortedFeatures;
export default SortedFeatures;

