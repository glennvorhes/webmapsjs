import ol = require('custom-ol');
export interface iEsriResponse {
    drawingInfo: {
        renderer: iEsriRenderer;
        transparency: number;
    };
    geometryType: string;
}
export interface iEsriRenderer {
    type: string;
    symbol: iEsriSymbol;
    uniqueValueInfos: Array<{
        label: string;
        value: any;
        symbol: iEsriSymbol;
    }>;
    field1: string;
    defaultSymbol: iEsriSymbol;
    defaultLabel: string;
}
export interface iEsriSymbol {
    size: number;
    type: string;
    outline: {
        color: [number, number, number];
        width: number;
    };
    color: [number, number, number];
    width: number;
    imageData: string;
}
export interface iStyleFunc {
    (f: ol.Feature): ol.style.Style | ol.style.Style[];
}
export declare function makeFeatureServiceLegendAndSymbol(esriResponse: iEsriResponse): {
    style: iStyleFunc | ol.style.Style;
    legend: string;
};
export interface iMapServiceLegend {
    layerName: string;
    legend: {
        label: string;
        imageData: string;
    }[];
}
/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
export declare function makeMapServiceLegend(esriResponse: {
    layers: iMapServiceLegend[];
}): string;
