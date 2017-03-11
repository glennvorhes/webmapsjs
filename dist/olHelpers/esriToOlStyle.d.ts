export interface EsriResponse {
    drawingInfo: {
        renderer: EsriRenderer;
    };
    geometryType: string;
}
export interface EsriRenderer {
    type: string;
    symbol: EsriSymbol;
    uniqueValueInfos: Array<{
        label: string;
        value: any;
        symbol: EsriSymbol;
    }>;
}
export interface EsriSymbol {
    size: number;
    type: string;
    outline: {
        color: string;
        width: number;
    };
    color: string;
    width: number;
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
    legend: string;
};
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
export declare function makeMapServiceLegend(esriResponse: any): string;
