/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { LayerBase } from "../layers";
export interface iLegendItem {
    groupName: string;
    collapse?: boolean;
    addCheck?: boolean;
    items: Array<iLegendItem | LayerBase>;
}
export interface iLegendOptions {
    layerDivClasses?: string[];
    legendTitle?: string;
    scaleDependent?: boolean;
}
/**
 * a wrapper to make a legend
 */
declare class LayerLegend {
    $divElement: JQuery;
    _legendItems: Array<iLegendItem | LayerBase>;
    layerGroup: any;
    legendId: string;
    /**``
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {boolean} [options.scaleDependent=true] if legend display is scale dependent
     */
    constructor(legendItems: Array<iLegendItem | LayerBase>, divId: string, options?: iLegendOptions);
    /**
     * @param {Array} [legendItems=this._layerConfig] the legend items
     * @param {Array} [parents=[]] the ordered list of groups in which this item is a member
     * @private
     */
    _buildTree(legendItems: Array<iLegendItem | LayerBase>, parents?: string[]): void;
}
export default LayerLegend;
