/**
 * Created by gavorhes on 1/4/2016.
 */
import provide from '../util/provide';
import {ol} from 'custom-ol';
const nm = provide('olHelpers.esriToOlStyle');

/**
 * This callback is displayed as part of the Requester class.
 * @callback styleFunc
 * @param {ol.Feature} feat - openlayers feature
 * @param {number} resolution - map resolution
 */

/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray, opacity) {
    "use strict";

    return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${opacity})`;
}

/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

nm.htmlEscape = htmlEscape;


export interface EsriResponse{
    drawingInfo: {
        renderer: EsriRenderer
    },
    geometryType: string
}

export interface EsriRenderer{
    type: string;
    symbol: EsriSymbol;
    uniqueValueInfos: Array<{label: string, value: any, symbol: EsriSymbol}>;
}

export interface EsriSymbol{
    size: number;
    type: string;
    outline:{
        color: string;
        width: number;
    },
    color: string;
    width: number;
}


class CommonSymbol {
    legendHtml: string;
    opacity: number;
    symbolObj: EsriSymbol;
    olStyle: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction;

    /**
     *
     * @param symbolObj
     * @param {number} opacity
     */
    constructor(symbolObj: EsriSymbol, opacity: number) {
        this.symbolObj = symbolObj;
        this.opacity = opacity;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
}

interface ICommonSymbol{
    new (symbolObj: EsriSymbol, opacity: number): CommonSymbol
}


class PointSymbol extends CommonSymbol {
    constructor(symbolObj: EsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSMS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                let outlineWidth = this.symbolObj.outline.width;
                let radius = this.symbolObj.size;


                this.olStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        fill: new ol.style.Fill({
                            color: innerColor
                        }),
                        stroke: new ol.style.Stroke({color: outerColor, width: outlineWidth})
                    })
                });
                this.legendHtml = `<span class="legend-layer-icon" style="color: ${innerColor}">&#9679;</span>`;
                break;
            case 'esriPMS':
                this.olStyle = new ol.style.Style({
                    image: new ol.style.Icon({src: `data:image/png;base64,${this.symbolObj['imageData']}`})
                });
                this.legendHtml = `<img class="legend-layer-icon" height="17" src="data:image/png;base64,${this.symbolObj['imageData']}">`;
                break;
            default:
                console.log(this.symbolObj);
                alert('Point symbol does not handle symbol type: ' + this.symbolObj['type']);
        }
    }
}

class LineSymbol extends CommonSymbol {
    constructor(symbolObj: EsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSLS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let lineWidth = this.symbolObj.width;

                this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: innerColor,
                        //lineDash: [4],
                        width: lineWidth
                    })
                });

                this.legendHtml = `<span class="legend-layer-icon" `;
                this.legendHtml += `style="`;
                this.legendHtml += `background-color: ${innerColor};`;
                this.legendHtml += `width: 40px;`;
                this.legendHtml += `height: 4px;`;
                this.legendHtml += `position: relative;`;
                this.legendHtml += `display: inline-block;`;
                this.legendHtml += `top: -1px;`;
                this.legendHtml += `"></span>`;
                break;
            default:
                console.log(this.symbolObj);
                alert('Line symbol does not handle symbol type: ' + this.symbolObj['type']);
        }
    }
}

class PolygonSymbol extends CommonSymbol {
    constructor(symbolObj: EsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj['type']) {
            case 'esriSFS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                let outlineWidth = this.symbolObj.outline.width;

                this.olStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new ol.style.Fill({
                        color: innerColor
                    })
                });

                this.legendHtml = `<span class="legend-layer-icon" `;
                this.legendHtml += `style="`;
                this.legendHtml += `background-color: ${innerColor};`;
                this.legendHtml += `border: solid ${outerColor} 1px;`;
                this.legendHtml += `width: 40px;`;
                this.legendHtml += `height: 9px;`;
                this.legendHtml += `position: relative;`;
                this.legendHtml += `display: inline-block;`;
                this.legendHtml += `top: 2px;`;
                this.legendHtml += `"></span>`;
                break;

            default:
                console.log(this.symbolObj);
                alert('Polygon symbol does handle symbol type: ' + this.symbolObj['type']);
        }
    }
}

class SymbolGenerator {
    opacity: number;
    renderer: EsriRenderer;
    legendHtml: string;
    olStyle: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction;

    constructor(esriResponse: EsriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
}

class SingleSymbol extends SymbolGenerator {
    symbol: EsriSymbol;
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    constructor(esriResponse, SymbolClass: ICommonSymbol) {
        super(esriResponse);
        this.symbol = this.renderer.symbol;
        let symbolObj = new SymbolClass(this.symbol, this.opacity);
        this.olStyle = symbolObj.olStyle;
        this.legendHtml = symbolObj.legendHtml;
    }
}

class UniqueValueSymbol extends SymbolGenerator {

    propertyName: string;
    defaultSymbol: EsriSymbol;
    defaultStyle: ol.style.Style|Array<ol.style.Style>|ol.StyleFunction;
    defaultLabelHtml: string;
    labelArray: Array<string>;
    legendArray: Array<string>;
    propertyStyleLookup: Object;
    valueArray: Array<any>;
    uniqueValueInfos: Array<{label: string, value: any, symbol: EsriSymbol}>;

    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    constructor(esriResponse: EsriResponse, SymbolClass: ICommonSymbol) {
        super(esriResponse);
        this.uniqueValueInfos = this.renderer['uniqueValueInfos'];
        this.propertyName = this.renderer['field1'];
        this.defaultSymbol = this.renderer['defaultSymbol'];


        if (this.defaultSymbol) {
            let symbolObj = new SymbolClass(this.defaultSymbol, this.opacity);
            this.defaultStyle = symbolObj.olStyle;
            this.defaultLabelHtml = `<span class="legend-layer-subitem">${htmlEscape(this.renderer['defaultLabel'])}</span>` + symbolObj.legendHtml;
        } else {
            this.defaultStyle = undefined;
            this.defaultLabelHtml = 'other';
        }

        this.valueArray = [];
        this.labelArray = [];
        this.legendArray = [];
        this.propertyStyleLookup = {};

        for (let uniqueVal of this.uniqueValueInfos) {
            this.labelArray.push(uniqueVal['label']);
            this.valueArray.push(uniqueVal['value']);
            let uniqueSym = new SymbolClass(uniqueVal.symbol, this.opacity);
            this.legendArray.push(`<span class="legend-layer-subitem">${htmlEscape(uniqueVal['label'])}</span>` + uniqueSym.legendHtml);
            this.propertyStyleLookup[uniqueVal['value']] = uniqueSym.olStyle;
        }


        this.olStyle = (feature: ol.Feature) => {
            let checkProperties = feature.getProperties();
            let checkProperty = checkProperties[this.propertyName];

            let returnValue;
            if (this.propertyStyleLookup[checkProperty] !== undefined) {
                returnValue = [this.propertyStyleLookup[checkProperty]];
            } else {
               returnValue = [this.defaultStyle];
            }

            return returnValue;
        };

        if (this.defaultLabelHtml !== null) {
            this.legendArray.push(this.defaultLabelHtml);
        }

        this.legendHtml = '<ul>';
        for (let h of this.legendArray) {
            this.legendHtml += `<li>${h}</li>`;
        }
        this.legendHtml += '</ul>';
    }
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
export function makeFeatureServiceLegendAndSymbol(esriResponse: EsriResponse) {
    "use strict";
    let renderer = esriResponse.drawingInfo.renderer;
    let symbolLegendOut: SymbolGenerator = null;

    switch (renderer.type) {
        case 'simple':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new SingleSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new SingleSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new SingleSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse.geometryType + ' not handled');
            }
            break;
        case 'uniqueValue':
            switch (esriResponse.geometryType) {
                case 'esriGeometryPoint':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PointSymbol);
                    break;
                case 'esriGeometryPolyline':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, LineSymbol);
                    break;
                case 'esriGeometryPolygon':
                    symbolLegendOut = new UniqueValueSymbol(esriResponse, PolygonSymbol);
                    break;
                default:
                    console.log(esriResponse);
                    alert(esriResponse['geometryType'] + ' not handled');
            }
            break;
        default:
            alert('not handled renderer type: ' + renderer['type']);
    }

    if (symbolLegendOut == null) {
        return {style: undefined, legend: ''};
    } else {
        return {style: symbolLegendOut.olStyle, legend: symbolLegendOut.legendHtml};
    }
}

nm.makeFeatureServiceLegendAndSymbol = makeFeatureServiceLegendAndSymbol;


/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [skipLayerNameAndExpander=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject, skipLayerNameAndExpander: boolean = false) {


    skipLayerNameAndExpander = typeof skipLayerNameAndExpander == 'boolean' ? skipLayerNameAndExpander : false;
    let layerName = lyrObject['layerName'];
    let legendItems = lyrObject['legend'];
    let legendHtml = '';

    if (!skipLayerNameAndExpander) {
        legendHtml += `<span class="legend-layer-subitem">${layerName}</span>`;
    }

    if (legendItems.length == 1) {
        legendHtml = `<img class="legend-layer-icon" height="17" src="data:image/png;base64,${legendItems[0]['imageData']}">`;
    } else {
        if (!skipLayerNameAndExpander) {
            legendHtml += '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>';
        }
        legendHtml += '<ul>';
        for (let i = 0; i < legendItems.length; i++) {
            legendHtml += `<li>`;
            legendHtml += `<span class="legend-layer-subitem">${htmlEscape(legendItems[i]['label'])}</span>`;
            legendHtml += `<img class="legend-layer-icon" height="17" src="data:image/png;base64,${legendItems[i]['imageData']}">`;
            legendHtml += `</li>`;
        }
        legendHtml += '</ul>';
    }

    if (!skipLayerNameAndExpander) {
        legendHtml = `<span class="legend-layer-subitem">${layerName}</span>` + legendHtml;
    }

    return legendHtml;
}

/**
 * make map service legent
 * @param {object} esriResponse - layer info
 * @returns {string} legend content
 */
export function makeMapServiceLegend(esriResponse) {
    "use strict";

    let newLegendHtml = '';

    let layers = esriResponse['layers'];

    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    } else {
        newLegendHtml += '<ul>';
        for (let i = 0; i < layers.length; i++) {
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }

    return newLegendHtml;
}

nm.makeMapServiceLegend = makeMapServiceLegend;
