/**
 * Created by gavorhes on 12/8/2015.
 */

import $ from '../jquery/jquery';
import LayerBaseVectorGeoJson from './LayerBaseVectorGeoJson';
import mapPopup from '../olHelpers/mapPopup';
import provide from '../util/provide';
import ol from '../ol/ol';
let nm = provide('layers');


function checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    //make sure one and only one configuration is defined;
    let configCount = 0;
    if (typeof itsIcon == 'string') {
        configCount++;
    }

    if (typeof itsLineStyle == 'object') {
        itsLineStyle.width = typeof itsLineStyle.width == 'number' ? itsLineStyle.width : 5;
        itsLineStyle.color = typeof itsLineStyle.color == 'string' ? itsLineStyle.color : 'red';
        configCount++;
    }

    if (typeof itsIconConfig == 'object') {
        itsIconConfig.defaultName = itsIconConfig.defaultName || 'Other';

        if (typeof itsIconConfig.iconArray == 'undefined') {
            itsIconConfig.iconArray = [];
        }

        configCount++;
    }

    if (typeof itsLineConfig == 'object') {
        itsLineConfig.defaultName = itsLineConfig.defaultName || 'Other';
        itsLineConfig.defaultWidth = itsLineConfig.defaultWidth || 5;
        itsLineConfig.defaultColor = itsLineConfig.defaultColor || 'red';


        if (typeof itsLineConfig.lineArray == 'undefined') {
            itsLineConfig.lineArray = [];
        }

        // set the width if not defined
        for (let i = 0; i < itsLineConfig.lineArray.length; i++) {
            if (itsLineConfig.lineArray[i].length == 3) {
                itsLineConfig.lineArray[i].push(5);
            }
        }

        configCount++;
    }

    if (configCount > 1) {
        throw 'Only one style config can be defined';
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {*} undefined, style, or style function
 */
function defineStyle(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";
    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    let _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return new ol.style.Style({
            image: new ol.style.Icon({src: _iconUrlRoot + itsIcon})
        });
    } else if (itsLineStyle) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: itsLineStyle.color,
                width: itsLineStyle.width
            })
        });
    } else if (itsIconConfig) {
        return function (feature) {
            let symbolProp = feature.getProperties()[itsIconConfig.prop];
            let iconUrl = _iconUrlRoot + itsIconConfig.defaultIcon;

            for (let i = 0; i < itsIconConfig.iconArray.length; i++) {
                let thisProp = itsIconConfig.iconArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    iconUrl = _iconUrlRoot + thisProp[2];
                    break;
                }
            }

            return [new ol.style.Style({
                image: new ol.style.Icon({src: iconUrl})
            })];
        };
    } else if (itsLineConfig) {
        return function (feature) {
            let symbolProp = feature.getProperties()[itsLineConfig.prop];
            let colr = itsLineConfig.defaultColor || 'red';
            let width = itsLineConfig.defaultWidth || 5;

            for (let i = 0; i < itsLineConfig.lineArray.length; i++) {
                let thisProp = itsLineConfig.lineArray[i];

                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    colr = thisProp[2];
                    width = thisProp[3];
                    break;
                }
            }

            return [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: colr,
                    width: width
                })
            })];
        };
    } else {
        return undefined;
    }
}

/**
 *
 * @param {string} [itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
 *
 * @param {object} [itsLineStyle=undefined] A single line style
 * @param {string} itsLineStyle.color the line color as rgb or hex
 * @param {number} [itsLineStyle.width=5] the line width
 *
 * @param {object} [itsIconConfig=undefined] The icon subtype configuration
 * @param {string} itsIconConfig.prop The property used to define icon attribute symbolization
 * @param {string} itsIconConfig.defaultName The default name to be used if no other match is found
 * @param {string} itsIconConfig.defaultIcon The default icon to be used for no other matches
 * @param {object} [itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
 *
 * @param {object} [itsLineConfig=undefined] The property used to define icon attribute symbolization
 * @param {string} itsLineConfig.prop The property used to define icon attribute symbolization
 * @param {string} [itsLineConfig.defaultName=Other] The default name to be used if no other match is found
 * @param {string} [itsLineConfig.defaultColor=red] The default line color to be used for no other matches
 * @param {number} [itsLineConfig.defaultWidth=5] The default line width to be used for no other matches
 * @param {object} [itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width]
 * @returns {string} html to be added to the legend
 */
function defineLegend(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";

    let iconHeight = 17;

    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);

    let _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';

    if (itsIcon) {
        return `<img src="${_iconUrlRoot + itsIcon}" class="legend-layer-icon" height="${iconHeight}">`;
    } else if (itsLineStyle) {
        return `<hr style="height: ${itsLineStyle.width}px; background-color: ${itsLineStyle.color}">`;
    } else if (itsIconConfig) {
        let outHtml = '';
        outHtml += '<ul>';

        for (let a of itsIconConfig.iconArray) {
            outHtml += `<li><span class="legend-layer-subitem">${a[1]}</span><img src="${_iconUrlRoot + a[2]}" class="legend-layer-icon" height="${iconHeight}">`;
        }
        outHtml += `<li><span class="legend-layer-subitem">${itsIconConfig.defaultName}</span>` +
            `<img src="${_iconUrlRoot + itsIconConfig.defaultIcon}" class="legend-layer-icon" height="${iconHeight}"></li>`;
        outHtml += '</ul>';

        return outHtml;
    } else if (itsLineConfig) {
        let outHtml = '';
        outHtml += '<ul>';
        for (let ls of itsLineConfig.lineArray) {
            outHtml += `<li><span class="legend-layer-subitem">${ls[1]}</span>` +
                `<hr style="height: ${ls[3]}px; background-color: ${ls[2]}">`;
        }
        outHtml += `<li><span class="legend-layer-subitem">${itsLineConfig.defaultName}</span>` +
            `<hr style="height: ${itsLineConfig.defaultWidth}px; background-color: ${itsLineConfig.defaultColor}"></li>`;
        outHtml += '</ul>';

        return outHtml;
    } else {
        return '';
    }
}

/**
 * Its Layer class
 * @augments LayerBaseVectorGeoJson
 */
class LayerItsInventory extends LayerBaseVectorGeoJson {

    /**
     * ITS device layer, types available at http://transportal.cee.wisc.edu/its/inventory/
     * @param {object} options - config
     * @param {string} [options.id] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] the z index for the layer
     * @param {function} [options.loadCallback] function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent] additional content to add to the legend
     *
     * @param {boolean} [options.autoLoad=false] if the layer should auto load if not visible
     * @param {object|*} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     * @param {string} options.itsType the ITS device type, use the url flag at http://transportal.cee.wisc.edu/its/inventory/
     * @param {boolean} [options.addPopup=true] if the popup should be added automatically
     *
     * @param {string} [options.itsIcon=undefined] the ITS device type icon image see http://transportal.cee.wisc.edu/its/inventory/icons/
     *
     * @param {object} [options.itsLineStyle=undefined] A single line style
     * @param {string} options.itsLineStyle.color the line color as rgb or hex
     * @param {number} [options.itsLineStyle.width=5] the line width
     *
     * @param {object} [options.itsIconConfig=undefined] The icon subtype configuration
     * @param {string} options.itsIconConfig.prop The property used to define icon attribute symbolization
     * @param {string} options.itsIconConfig.defaultName The default name to be used if no other match is found
     * @param {string} options.itsIconConfig.defaultIcon The default icon to be used for no other matches
     * @param {object} [options.itsIconConfig.iconArray=[]] an array, items with format [property, name, img]
     *
     * @param {object} [options.itsLineConfig=undefined] The property used to define icon attribute symbolization
     * @param {string} options.itsLineConfig.prop The property used to define icon attribute symbolization
     * @param {string} [options.itsLineConfig.defaultName=Other] The default name to be used if no other match is found
     * @param {string} [options.itsLineConfig.defaultColor=red] The default line color to be used for no other matches
     * @param {number} [options.itsLineConfig.defaultWidth] The default line width to be used for no other matches
     * @param {object} [options.itsLineConfig.lineArray=[]] an array, items with format [property, name, color, optional width = 5]
     */
    constructor(options) {
        if (typeof options.itsType !== 'string') {
            throw 'its type must be defined';
        }

        let addToLegend = '';

        // define a style with the helper function if it is not explicitly defined
        if (typeof options.style == 'undefined') {
            options.style = defineStyle(
                options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig
            );
            addToLegend = defineLegend(
                options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig
            );
        }

        options.params = typeof options.params == 'object' ? options.params : {};
        $.extend(options.params, {format: 'JSON', resource: options.itsType});

        super('http://transportal.cee.wisc.edu/its/inventory/', options);
        
        //add any additional content to the legend
        this.addLegendContent(addToLegend);

        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : true;

        if (options.addPopup) {
            mapPopup.addVectorPopup(this, function (props) {
                return `<iframe src="http://transportal.cee.wisc.edu/its/inventory/?feature=${props['featureGuid']}" ` +
                    `height="250" width="350"></iframe>`;
            });
        }
    }

    /**
     * callback to generate the parameters passed in the get request
     * @callback makeGetParams
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    mapMoveMakeGetParams(extent, zoomLevel) {
        super.mapMoveMakeGetParams(extent, zoomLevel);
        let lowerLeft = new ol.geom.Point([extent.minX, extent.minY]);
        lowerLeft.transform(this.mapCrs, "EPSG:4326");
        let lowerLeftCoordinates = lowerLeft.getCoordinates();
        let upperRight = new ol.geom.Point([extent.maxX, extent.maxY]);
        upperRight.transform(this.mapCrs, "EPSG:4326");
        let upperRightCoordinates = upperRight.getCoordinates();

        $.extend(this.mapMoveParams,
            {
                L: lowerLeftCoordinates[0],
                R: upperRightCoordinates[0],
                B: lowerLeftCoordinates[1],
                T: upperRightCoordinates[1]
            });
    }
}

nm.LayerItsInventory = LayerItsInventory;
export default LayerItsInventory;
