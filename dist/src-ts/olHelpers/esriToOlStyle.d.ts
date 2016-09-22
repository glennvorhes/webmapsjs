export interface EsriRenderer {
    type: string;
}
export interface EsriResponse {
    drawingInfo: {
        renderer: EsriRenderer;
    };
    geometryType: string;
}
/**
 * style and legend object
 * @typedef {object} styleAndLegend
 * @property {styleFunc} style - style function
 * @property {string} legend - legend content
 */
/**
 *
 * @param {object} esriResponse - layer info
 * @returns {styleAndLegend} style and legend object
 */
export declare function makeFeatureServiceLegendAndSymbol(esriResponse: EsriResponse): {
    style: any;
    legend: any;
};
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
export declare function makeMapServiceLegend(esriResponse: any): string;
