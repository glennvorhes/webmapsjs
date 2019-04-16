/**
 * Created by gavorhes on 1/4/2016.
 */
import provide from '../util/provide';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Icon from "ol/style/Icon";
import Feature from 'ol/Feature'
const nm = provide('olHelpers.esriToOlStyle');



/**
 *
 * @param {Array<number>} colorArray - input color array
 * @param {number} opacity - the opacity 0 to 1
 * @returns {string} rgba string
 * @private
 */
function _colorArrayToRgba(colorArray: [number, number, number], opacity: number): string {
    "use strict";

    return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${opacity})`;
}

/**
 * escape html charcters
 * @param {string} str - input string
 * @returns {string} escaped string
 */
function htmlEscape(str: string): string {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

nm.htmlEscape = htmlEscape;


export interface iEsriResponse{
    drawingInfo: {
        renderer: iEsriRenderer;
        transparency: number
    },
    geometryType: string
}


export interface iEsriRenderer{
    type: string;
    symbol: iEsriSymbol;
    uniqueValueInfos: Array<{label: string, value: any, symbol: iEsriSymbol}>;
    field1: string;
    defaultSymbol: iEsriSymbol;
    defaultLabel: string;
}

export interface iEsriSymbol{
    size: number;
    type: string;
    outline:{
        color: [number, number, number];
        width: number;
    },
    color: [number, number, number];
    width: number;
    imageData: string
}


class CommonSymbol {
    legendHtml: string;
    opacity: number;
    symbolObj: iEsriSymbol;
    olStyle: Style;

    /**
     *
     * @param symbolObj
     * @param {number} opacity
     */
    constructor(symbolObj: iEsriSymbol, opacity: number) {
        this.symbolObj = symbolObj;
        this.opacity = opacity;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
}

interface ICommonSymbol{
    new (symbolObj: iEsriSymbol, opacity: number): CommonSymbol
}


class PointSymbol extends CommonSymbol {
    constructor(symbolObj: iEsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSMS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                let outlineWidth = this.symbolObj.outline.width;
                let radius = this.symbolObj.size;


                this.olStyle = new Style({
                    image: new Circle({
                        radius: radius,
                        fill: new Fill({
                            color: innerColor
                        }),
                        stroke: new Stroke({color: outerColor, width: outlineWidth})
                    })
                });
                this.legendHtml = `<span class="legend-layer-icon" style="color: ${innerColor}">&#9679;</span>`;
                break;
            case 'esriPMS':
                this.olStyle = new Style({
                    image: new Icon({src: `data:image/png;base64,${this.symbolObj['imageData']}`})
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
    constructor(symbolObj: iEsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj.type) {
            case 'esriSLS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let lineWidth = this.symbolObj.width;

                this.olStyle = new Style({
                    stroke: new Stroke({
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
    constructor(symbolObj: iEsriSymbol, opacity: number) {
        super(symbolObj, opacity);
        switch (this.symbolObj['type']) {
            case 'esriSFS':
                let innerColor = _colorArrayToRgba(this.symbolObj.color, this.opacity);
                let outerColor = _colorArrayToRgba(this.symbolObj.outline.color, this.opacity);
                let outlineWidth = this.symbolObj.outline.width;

                this.olStyle = new Style({
                    stroke: new Stroke({
                        color: outerColor,
                        //lineDash: [4],
                        width: outlineWidth
                    }),
                    fill: new Fill({
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

export interface iStyleFunc{
    (f: Feature): Style| Style[]
}

class SymbolGenerator {
    opacity: number;
    renderer: iEsriRenderer;
    legendHtml: string;
    olStyle: iStyleFunc | Style;

    constructor(esriResponse: iEsriResponse) {
        this.opacity = (100 - (esriResponse['drawingInfo']['transparency'] || 0)) / 100;
        this.renderer = esriResponse.drawingInfo.renderer;
        this.olStyle = undefined;
        this.legendHtml = '';
    }
}

class SingleSymbol extends SymbolGenerator {
    symbol: iEsriSymbol;
    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the symbol class to use
     */
    constructor(esriResponse: iEsriResponse, SymbolClass: ICommonSymbol) {
        super(esriResponse);
        this.symbol = this.renderer.symbol;
        let symbolObj = new SymbolClass(this.symbol, this.opacity);
        this.olStyle = symbolObj.olStyle;
        this.legendHtml = symbolObj.legendHtml;
    }
}

class UniqueValueSymbol extends SymbolGenerator {

    propertyName: string;
    defaultSymbol: iEsriSymbol;
    defaultStyle: Style;
    defaultLabelHtml: string;
    labelArray: Array<string>;
    legendArray: Array<string>;
    propertyStyleLookup: {[s: string]: Style};
    valueArray: Array<any>;
    uniqueValueInfos: Array<{label: string, value: any, symbol: iEsriSymbol}>;

    /**
     *
     * @param {object} esriResponse - layer info
     * @param SymbolClass - the Symbol class definition
     */
    constructor(esriResponse: iEsriResponse, SymbolClass: ICommonSymbol) {
        super(esriResponse);
        this.uniqueValueInfos = this.renderer.uniqueValueInfos;
        this.propertyName = this.renderer.field1;
        this.defaultSymbol = this.renderer.defaultSymbol;


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

        this.olStyle = (feature: Feature): Style[] => {
            let checkProperties = feature.getProperties();
            let checkProperty = checkProperties[this.propertyName];

            if (this.propertyStyleLookup[checkProperty] !== undefined) {
                return [this.propertyStyleLookup[checkProperty]];
            } else {
               return [this.defaultStyle];
            }
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

export function makeFeatureServiceLegendAndSymbol(esriResponse: iEsriResponse): {style: iStyleFunc | Style, legend: string} {
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


export interface iMapServiceLegend{
    layerName: string;
    legend: {label: string, imageData: string}[]
}

/**
 *
 * @param {object} lyrObject - the layer as defined in the response
 * @param {boolean} [skipLayerNameAndExpander=false] use only icons
 * @returns {string} legend html
 */
function mapServiceLegendItem(lyrObject: iMapServiceLegend, skipLayerNameAndExpander: boolean = false) {


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
 * @param  showLayers - limited number of layers to show in map service
 * @returns {string} legend content
 */
export function makeMapServiceLegend(esriResponse: {layers: iMapServiceLegend[]}, showLayers: number[] = []) {
    "use strict";

    let newLegendHtml = '';

    let layers = esriResponse['layers'];

    if (layers.length == 1) {
        newLegendHtml += mapServiceLegendItem(layers[0], true);
    } else {
        newLegendHtml += '<ul>';
        for (let i = 0; i < layers.length; i++) {
            if (showLayers.length > 0 && showLayers.indexOf(i) < 0){
                continue;
            }
            newLegendHtml += '<li>' + mapServiceLegendItem(layers[i]) + '</li>';
        }
        newLegendHtml += '</ul>';
    }

    return newLegendHtml;
}

nm.makeMapServiceLegend = makeMapServiceLegend;
