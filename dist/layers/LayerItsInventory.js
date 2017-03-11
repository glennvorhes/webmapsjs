/**
 * Created by gavorhes on 12/8/2015.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LayerBaseVectorGeoJson_1 = require("./LayerBaseVectorGeoJson");
var mapPopup_1 = require("../olHelpers/mapPopup");
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
var nm = provide_1.default('layers');
function checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig) {
    "use strict";
    //make sure one and only one configuration is defined;
    var configCount = 0;
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
        for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
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
    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';
    if (itsIcon) {
        return new ol.style.Style({
            image: new ol.style.Icon({
                src: _iconUrlRoot + itsIcon,
                crossOrigin: 'anonymous'
            })
        });
    }
    else if (itsLineStyle) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: itsLineStyle.color,
                width: itsLineStyle.width
            })
        });
    }
    else if (itsIconConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsIconConfig.prop];
            var iconUrl = _iconUrlRoot + itsIconConfig.defaultIcon;
            for (var i = 0; i < itsIconConfig.iconArray.length; i++) {
                var thisProp = itsIconConfig.iconArray[i];
                if (symbolProp.trim().toLocaleLowerCase() == thisProp[0].trim().toLocaleLowerCase()) {
                    iconUrl = _iconUrlRoot + thisProp[2];
                    break;
                }
            }
            return [new ol.style.Style({
                    image: new ol.style.Icon({
                        src: iconUrl,
                        crossOrigin: 'anonymous'
                    })
                })];
        };
    }
    else if (itsLineConfig) {
        return function (feature) {
            var symbolProp = feature.getProperties()[itsLineConfig.prop];
            var colr = itsLineConfig.defaultColor || 'red';
            var width = itsLineConfig.defaultWidth || 5;
            for (var i = 0; i < itsLineConfig.lineArray.length; i++) {
                var thisProp = itsLineConfig.lineArray[i];
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
    }
    else {
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
    var iconHeight = 17;
    checkStyleNumber(itsIcon, itsLineStyle, itsIconConfig, itsLineConfig);
    var _iconUrlRoot = 'http://transportal.cee.wisc.edu/its/inventory/icons/';
    if (itsIcon) {
        return "<img src=\"" + (_iconUrlRoot + itsIcon) + "\" class=\"legend-layer-icon\" height=\"" + iconHeight + "\">";
    }
    else if (itsLineStyle) {
        return "<hr style=\"height: " + itsLineStyle.width + "px; background-color: " + itsLineStyle.color + "\">";
    }
    else if (itsIconConfig) {
        var outHtml = '';
        outHtml += '<ul>';
        for (var _i = 0, _a = itsIconConfig.iconArray; _i < _a.length; _i++) {
            var a = _a[_i];
            outHtml += "<li><span class=\"legend-layer-subitem\">" + a[1] + "</span><img src=\"" + (_iconUrlRoot + a[2]) + "\" class=\"legend-layer-icon\" height=\"" + iconHeight + "\">";
        }
        outHtml += "<li><span class=\"legend-layer-subitem\">" + itsIconConfig.defaultName + "</span>" +
            ("<img src=\"" + (_iconUrlRoot + itsIconConfig.defaultIcon) + "\" class=\"legend-layer-icon\" height=\"" + iconHeight + "\"></li>");
        outHtml += '</ul>';
        return outHtml;
    }
    else if (itsLineConfig) {
        var outHtml = '';
        outHtml += '<ul>';
        for (var _b = 0, _c = itsLineConfig.lineArray; _b < _c.length; _b++) {
            var ls = _c[_b];
            outHtml += "<li><span class=\"legend-layer-subitem\">" + ls[1] + "</span>" +
                ("<hr style=\"height: " + ls[3] + "px; background-color: " + ls[2] + "\">");
        }
        outHtml += "<li><span class=\"legend-layer-subitem\">" + itsLineConfig.defaultName + "</span>" +
            ("<hr style=\"height: " + itsLineConfig.defaultWidth + "px; background-color: " + itsLineConfig.defaultColor + "\"></li>");
        outHtml += '</ul>';
        return outHtml;
    }
    else {
        return '';
    }
}
/**
 * Its Layer class
 * @augments LayerBaseVectorGeoJson
 */
var LayerItsInventory = (function (_super) {
    __extends(LayerItsInventory, _super);
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
    function LayerItsInventory(options) {
        var _this = this;
        if (typeof options.itsType !== 'string') {
            throw 'its type must be defined';
        }
        var addToLegend = '';
        // define a style with the helper function if it is not explicitly defined
        if (typeof options.style == 'undefined') {
            options.style = defineStyle(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
            addToLegend = defineLegend(options.itsIcon, options.itsLineStyle, options.itsIconConfig, options.itsLineConfig);
        }
        options.params = typeof options.params == 'object' ? options.params : {};
        $.extend(options.params, { format: 'JSON', resource: options.itsType });
        _this = _super.call(this, 'http://transportal.cee.wisc.edu/its/inventory/', options) || this;
        //add any additional content to the legend
        _this.addLegendContent(addToLegend);
        options.addPopup = typeof options.addPopup == 'boolean' ? options.addPopup : true;
        if (options.addPopup) {
            mapPopup_1.default.addVectorPopup(_this, function (props) {
                return "<iframe src=\"http://transportal.cee.wisc.edu/its/inventory/?feature=" + props['featureGuid'] + "\" " +
                    "height=\"250\" width=\"350\"></iframe>";
            });
        }
        return _this;
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
    LayerItsInventory.prototype.mapMoveMakeGetParams = function (extent, zoomLevel) {
        _super.prototype.mapMoveMakeGetParams.call(this, extent, zoomLevel);
        var lowerLeft = new ol.geom.Point([extent.minX, extent.minY]);
        lowerLeft.transform(this.mapProj, this._projection4326);
        var lowerLeftCoordinates = lowerLeft.getCoordinates();
        var upperRight = new ol.geom.Point([extent.maxX, extent.maxY]);
        upperRight.transform(this.mapProj, this._projection4326);
        var upperRightCoordinates = upperRight.getCoordinates();
        $.extend(this.mapMoveParams, {
            L: lowerLeftCoordinates[0],
            R: upperRightCoordinates[0],
            B: lowerLeftCoordinates[1],
            T: upperRightCoordinates[1]
        });
    };
    return LayerItsInventory;
}(LayerBaseVectorGeoJson_1.default));
nm.LayerItsInventory = LayerItsInventory;
exports.default = LayerItsInventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJJdHNJbnZlbnRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGF5ZXJzL0xheWVySXRzSW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7Ozs7Ozs7O0FBRUgsbUVBQThEO0FBQzlELGtEQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFJLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRzNCLDBCQUEwQixPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhO0lBQ3pFLFlBQVksQ0FBQztJQUViLHNEQUFzRDtJQUN0RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM3QixXQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sWUFBWSxDQUFDLEtBQUssSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEYsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLFlBQVksQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hGLFdBQVcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFhLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxD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QUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXhELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDdkI7WUFDSSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUE1R0QsQ0FBZ0MsZ0NBQXNCLEdBNEdyRDtBQUVELEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztBQUN6QyxrQkFBZSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzgvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiBmcm9tICcuL0xheWVyQmFzZVZlY3Rvckdlb0pzb24nO1xyXG5pbXBvcnQgbWFwUG9wdXAgZnJvbSAnLi4vb2xIZWxwZXJzL21hcFBvcHVwJztcclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG9sID0gcmVxdWlyZSgnY3VzdG9tLW9sJyk7XHJcbmltcG9ydCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBjaGVja1N0eWxlTnVtYmVyKGl0c0ljb24sIGl0c0xpbmVTdHlsZSwgaXRzSWNvbkNvbmZpZywgaXRzTGluZUNvbmZpZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLy9tYWtlIHN1cmUgb25lIGFuZCBvbmx5IG9uZSBjb25maWd1cmF0aW9uIGlzIGRlZmluZWQ7XHJcbiAgICBsZXQgY29uZmlnQ291bnQgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBpdHNJY29uID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgY29uZmlnQ291bnQrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGl0c0xpbmVTdHlsZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGl0c0xpbmVTdHlsZS53aWR0aCA9IHR5cGVvZiBpdHNMaW5lU3R5bGUud2lkdGggPT0gJ251bWJlcicgPyBpdHNMaW5lU3R5bGUud2lkdGggOiA1O1xyXG4gICAgICAgIGl0c0xpbmVTdHlsZS5jb2xvciA9IHR5cGVvZiBpdHNMaW5lU3R5bGUuY29sb3IgPT0gJ3N0cmluZycgPyBpdHNMaW5lU3R5bGUuY29sb3IgOiAncmVkJztcclxuICAgICAgICBjb25maWdDb3VudCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgaXRzSWNvbkNvbmZpZyA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGl0c0ljb25Db25maWcuZGVmYXVsdE5hbWUgPSBpdHNJY29uQ29uZmlnLmRlZmF1bHROYW1lIHx8ICdPdGhlcic7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaXRzSWNvbkNvbmZpZy5pY29uQXJyYXkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaXRzSWNvbkNvbmZpZy5pY29uQXJyYXkgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZ0NvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpdHNMaW5lQ29uZmlnID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgaXRzTGluZUNvbmZpZy5kZWZhdWx0TmFtZSA9IGl0c0xpbmVDb25maWcuZGVmYXVsdE5hbWUgfHwgJ090aGVyJztcclxuICAgICAgICBpdHNMaW5lQ29uZmlnLmRlZmF1bHRXaWR0aCA9IGl0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRoIHx8IDU7XHJcbiAgICAgICAgaXRzTGluZUNvbmZpZy5kZWZhdWx0Q29sb3IgPSBpdHNMaW5lQ29uZmlnLmRlZmF1bHRDb2xvciB8fCAncmVkJztcclxuXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaXRzTGluZUNvbmZpZy5saW5lQXJyYXkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaXRzTGluZUNvbmZpZy5saW5lQXJyYXkgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgd2lkdGggaWYgbm90IGRlZmluZWRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0c0xpbmVDb25maWcubGluZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpdHNMaW5lQ29uZmlnLmxpbmVBcnJheVtpXS5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgaXRzTGluZUNvbmZpZy5saW5lQXJyYXlbaV0ucHVzaCg1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnQ291bnQrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnQ291bnQgPiAxKSB7XHJcbiAgICAgICAgdGhyb3cgJ09ubHkgb25lIHN0eWxlIGNvbmZpZyBjYW4gYmUgZGVmaW5lZCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0ljb249dW5kZWZpbmVkXSB0aGUgSVRTIGRldmljZSB0eXBlIGljb24gaW1hZ2Ugc2VlIGh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9pY29ucy9cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNMaW5lU3R5bGU9dW5kZWZpbmVkXSBBIHNpbmdsZSBsaW5lIHN0eWxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNMaW5lU3R5bGUuY29sb3IgdGhlIGxpbmUgY29sb3IgYXMgcmdiIG9yIGhleFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2l0c0xpbmVTdHlsZS53aWR0aD01XSB0aGUgbGluZSB3aWR0aFxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0ljb25Db25maWc9dW5kZWZpbmVkXSBUaGUgaWNvbiBzdWJ0eXBlIGNvbmZpZ3VyYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaXRzSWNvbkNvbmZpZy5kZWZhdWx0TmFtZSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcuZGVmYXVsdEljb24gVGhlIGRlZmF1bHQgaWNvbiB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzSWNvbkNvbmZpZy5pY29uQXJyYXk9W11dIGFuIGFycmF5LCBpdGVtcyB3aXRoIGZvcm1hdCBbcHJvcGVydHksIG5hbWUsIGltZ11cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNMaW5lQ29uZmlnPXVuZGVmaW5lZF0gVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0xpbmVDb25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0xpbmVDb25maWcuZGVmYXVsdE5hbWU9T3RoZXJdIFRoZSBkZWZhdWx0IG5hbWUgdG8gYmUgdXNlZCBpZiBubyBvdGhlciBtYXRjaCBpcyBmb3VuZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yPXJlZF0gVGhlIGRlZmF1bHQgbGluZSBjb2xvciB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbaXRzTGluZUNvbmZpZy5kZWZhdWx0V2lkdGg9NV0gVGhlIGRlZmF1bHQgbGluZSB3aWR0aCB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZUNvbmZpZy5saW5lQXJyYXk9W11dIGFuIGFycmF5LCBpdGVtcyB3aXRoIGZvcm1hdCBbcHJvcGVydHksIG5hbWUsIGNvbG9yLCBvcHRpb25hbCB3aWR0aF1cclxuICogQHJldHVybnMgeyp9IHVuZGVmaW5lZCwgc3R5bGUsIG9yIHN0eWxlIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZpbmVTdHlsZShpdHNJY29uLCBpdHNMaW5lU3R5bGUsIGl0c0ljb25Db25maWcsIGl0c0xpbmVDb25maWcpIDogb2wuc3R5bGUuU3R5bGV8QXJyYXk8b2wuc3R5bGUuU3R5bGU+fG9sLlN0eWxlRnVuY3Rpb257XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGNoZWNrU3R5bGVOdW1iZXIoaXRzSWNvbiwgaXRzTGluZVN0eWxlLCBpdHNJY29uQ29uZmlnLCBpdHNMaW5lQ29uZmlnKTtcclxuXHJcbiAgICBsZXQgX2ljb25VcmxSb290ID0gJ2h0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9pY29ucy8nO1xyXG5cclxuICAgIGlmIChpdHNJY29uKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIGltYWdlOiBuZXcgb2wuc3R5bGUuSWNvbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IF9pY29uVXJsUm9vdCArIGl0c0ljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoaXRzTGluZVN0eWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogaXRzTGluZVN0eWxlLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGl0c0xpbmVTdHlsZS53aWR0aFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChpdHNJY29uQ29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmZWF0dXJlOiBvbC5GZWF0dXJlKSB7XHJcbiAgICAgICAgICAgIGxldCBzeW1ib2xQcm9wID0gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKClbaXRzSWNvbkNvbmZpZy5wcm9wXTtcclxuICAgICAgICAgICAgbGV0IGljb25VcmwgPSBfaWNvblVybFJvb3QgKyBpdHNJY29uQ29uZmlnLmRlZmF1bHRJY29uO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdHNJY29uQ29uZmlnLmljb25BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNQcm9wID0gaXRzSWNvbkNvbmZpZy5pY29uQXJyYXlbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbFByb3AudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gdGhpc1Byb3BbMF0udHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uVXJsID0gX2ljb25VcmxSb290ICsgdGhpc1Byb3BbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbbmV3IG9sLnN0eWxlLlN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGltYWdlOiBuZXcgb2wuc3R5bGUuSWNvbihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogaWNvblVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KV07XHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoaXRzTGluZUNvbmZpZykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZmVhdHVyZTogb2wuRmVhdHVyZSkge1xyXG4gICAgICAgICAgICBsZXQgc3ltYm9sUHJvcCA9IGZlYXR1cmUuZ2V0UHJvcGVydGllcygpW2l0c0xpbmVDb25maWcucHJvcF07XHJcbiAgICAgICAgICAgIGxldCBjb2xyID0gaXRzTGluZUNvbmZpZy5kZWZhdWx0Q29sb3IgfHwgJ3JlZCc7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IGl0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRoIHx8IDU7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0c0xpbmVDb25maWcubGluZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhpc1Byb3AgPSBpdHNMaW5lQ29uZmlnLmxpbmVBcnJheVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sUHJvcC50cmltKCkudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSB0aGlzUHJvcFswXS50cmltKCkudG9Mb2NhbGVMb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHIgPSB0aGlzUHJvcFsyXTtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHRoaXNQcm9wWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IG5ldyBvbC5zdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xyLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSldO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0ljb249dW5kZWZpbmVkXSB0aGUgSVRTIGRldmljZSB0eXBlIGljb24gaW1hZ2Ugc2VlIGh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9pY29ucy9cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNMaW5lU3R5bGU9dW5kZWZpbmVkXSBBIHNpbmdsZSBsaW5lIHN0eWxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNMaW5lU3R5bGUuY29sb3IgdGhlIGxpbmUgY29sb3IgYXMgcmdiIG9yIGhleFxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2l0c0xpbmVTdHlsZS53aWR0aD01XSB0aGUgbGluZSB3aWR0aFxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0ljb25Db25maWc9dW5kZWZpbmVkXSBUaGUgaWNvbiBzdWJ0eXBlIGNvbmZpZ3VyYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaXRzSWNvbkNvbmZpZy5kZWZhdWx0TmFtZSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcuZGVmYXVsdEljb24gVGhlIGRlZmF1bHQgaWNvbiB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzSWNvbkNvbmZpZy5pY29uQXJyYXk9W11dIGFuIGFycmF5LCBpdGVtcyB3aXRoIGZvcm1hdCBbcHJvcGVydHksIG5hbWUsIGltZ11cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNMaW5lQ29uZmlnPXVuZGVmaW5lZF0gVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0xpbmVDb25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0xpbmVDb25maWcuZGVmYXVsdE5hbWU9T3RoZXJdIFRoZSBkZWZhdWx0IG5hbWUgdG8gYmUgdXNlZCBpZiBubyBvdGhlciBtYXRjaCBpcyBmb3VuZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2l0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yPXJlZF0gVGhlIGRlZmF1bHQgbGluZSBjb2xvciB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbaXRzTGluZUNvbmZpZy5kZWZhdWx0V2lkdGg9NV0gVGhlIGRlZmF1bHQgbGluZSB3aWR0aCB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZUNvbmZpZy5saW5lQXJyYXk9W11dIGFuIGFycmF5LCBpdGVtcyB3aXRoIGZvcm1hdCBbcHJvcGVydHksIG5hbWUsIGNvbG9yLCBvcHRpb25hbCB3aWR0aF1cclxuICogQHJldHVybnMge3N0cmluZ30gaHRtbCB0byBiZSBhZGRlZCB0byB0aGUgbGVnZW5kXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZpbmVMZWdlbmQoaXRzSWNvbiwgaXRzTGluZVN0eWxlLCBpdHNJY29uQ29uZmlnLCBpdHNMaW5lQ29uZmlnKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBsZXQgaWNvbkhlaWdodCA9IDE3O1xyXG5cclxuICAgIGNoZWNrU3R5bGVOdW1iZXIoaXRzSWNvbiwgaXRzTGluZVN0eWxlLCBpdHNJY29uQ29uZmlnLCBpdHNMaW5lQ29uZmlnKTtcclxuXHJcbiAgICBsZXQgX2ljb25VcmxSb290ID0gJ2h0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9pY29ucy8nO1xyXG5cclxuICAgIGlmIChpdHNJY29uKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7X2ljb25VcmxSb290ICsgaXRzSWNvbn1cIiBjbGFzcz1cImxlZ2VuZC1sYXllci1pY29uXCIgaGVpZ2h0PVwiJHtpY29uSGVpZ2h0fVwiPmA7XHJcbiAgICB9IGVsc2UgaWYgKGl0c0xpbmVTdHlsZSkge1xyXG4gICAgICAgIHJldHVybiBgPGhyIHN0eWxlPVwiaGVpZ2h0OiAke2l0c0xpbmVTdHlsZS53aWR0aH1weDsgYmFja2dyb3VuZC1jb2xvcjogJHtpdHNMaW5lU3R5bGUuY29sb3J9XCI+YDtcclxuICAgIH0gZWxzZSBpZiAoaXRzSWNvbkNvbmZpZykge1xyXG4gICAgICAgIGxldCBvdXRIdG1sID0gJyc7XHJcbiAgICAgICAgb3V0SHRtbCArPSAnPHVsPic7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGEgb2YgaXRzSWNvbkNvbmZpZy5pY29uQXJyYXkpIHtcclxuICAgICAgICAgICAgb3V0SHRtbCArPSBgPGxpPjxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2FbMV19PC9zcGFuPjxpbWcgc3JjPVwiJHtfaWNvblVybFJvb3QgKyBhWzJdfVwiIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBoZWlnaHQ9XCIke2ljb25IZWlnaHR9XCI+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0SHRtbCArPSBgPGxpPjxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2l0c0ljb25Db25maWcuZGVmYXVsdE5hbWV9PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPGltZyBzcmM9XCIke19pY29uVXJsUm9vdCArIGl0c0ljb25Db25maWcuZGVmYXVsdEljb259XCIgY2xhc3M9XCJsZWdlbmQtbGF5ZXItaWNvblwiIGhlaWdodD1cIiR7aWNvbkhlaWdodH1cIj48L2xpPmA7XHJcbiAgICAgICAgb3V0SHRtbCArPSAnPC91bD4nO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0SHRtbDtcclxuICAgIH0gZWxzZSBpZiAoaXRzTGluZUNvbmZpZykge1xyXG4gICAgICAgIGxldCBvdXRIdG1sID0gJyc7XHJcbiAgICAgICAgb3V0SHRtbCArPSAnPHVsPic7XHJcbiAgICAgICAgZm9yIChsZXQgbHMgb2YgaXRzTGluZUNvbmZpZy5saW5lQXJyYXkpIHtcclxuICAgICAgICAgICAgb3V0SHRtbCArPSBgPGxpPjxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2xzWzFdfTwvc3Bhbj5gICtcclxuICAgICAgICAgICAgICAgIGA8aHIgc3R5bGU9XCJoZWlnaHQ6ICR7bHNbM119cHg7IGJhY2tncm91bmQtY29sb3I6ICR7bHNbMl19XCI+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0SHRtbCArPSBgPGxpPjxzcGFuIGNsYXNzPVwibGVnZW5kLWxheWVyLXN1Yml0ZW1cIj4ke2l0c0xpbmVDb25maWcuZGVmYXVsdE5hbWV9PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICBgPGhyIHN0eWxlPVwiaGVpZ2h0OiAke2l0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRofXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAke2l0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yfVwiPjwvbGk+YDtcclxuICAgICAgICBvdXRIdG1sICs9ICc8L3VsPic7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRIdG1sO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdHMgTGF5ZXIgY2xhc3NcclxuICogQGF1Z21lbnRzIExheWVyQmFzZVZlY3Rvckdlb0pzb25cclxuICovXHJcbmNsYXNzIExheWVySXRzSW52ZW50b3J5IGV4dGVuZHMgTGF5ZXJCYXNlVmVjdG9yR2VvSnNvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJVFMgZGV2aWNlIGxheWVyLCB0eXBlcyBhdmFpbGFibGUgYXQgaHR0cDovL3RyYW5zcG9ydGFsLmNlZS53aXNjLmVkdS9pdHMvaW52ZW50b3J5L1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBjb25maWdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pZF0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSB0aGUgZ2V0IHBhcmFtZXRlcnMgdG8gaW5jbHVkZSB0byByZXRyaWV2ZSB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy56SW5kZXg9MF0gdGhlIHogaW5kZXggZm9yIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdGlvbnMubG9hZENhbGxiYWNrXSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSBpZiB0aGUgbGVnZW5kIGl0ZW0gc2hvdWxkIGJlIGluaXRpYWxseSBjb2xsYXBzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ2hlY2tib3g9dHJ1ZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBoYXZlIGEgY2hlY2tib3ggZm9yIHZpc2liaWxpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVnZW5kQ29udGVudF0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byB0aGUgbGVnZW5kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvTG9hZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBhdXRvIGxvYWQgaWYgbm90IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fCp9IFtvcHRpb25zLnN0eWxlPXVuZGVmaW5lZF0gdGhlIGxheWVyIHN0eWxlLCB1c2Ugb3BlbmxheWVycyBkZWZhdWx0IHN0eWxlIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm9uRGVtYW5kPWZhbHNlXSBpZiB0aGUgbGF5ZXIgc2hvdWxkIGJlIGxvYWRlZCBieSBleHRlbnQgb24gbWFwIG1vdmVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5vbkRlbWFuZERlbGF5PTMwMF0gZGVsYXkgYmVmb3JlIHRoZSBtYXAgbW92ZSBjYWxsYmFjayBzaG91bGQgYmUgY2FsbGVkXHJcbiAgICAgKiBAcGFyYW0ge01hcE1vdmVDbHN9IFtvcHRpb25zLm1hcE1vdmVPYmo9bWFwTW92ZV0gYWx0ZXJuYXRlIG1hcCBtb3ZlIG9iamVjdCBmb3IgdXNlIHdpdGggbXVsdGkgbWFwIHBhZ2VzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXRzVHlwZSB0aGUgSVRTIGRldmljZSB0eXBlLCB1c2UgdGhlIHVybCBmbGFnIGF0IGh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYWRkUG9wdXA9dHJ1ZV0gaWYgdGhlIHBvcHVwIHNob3VsZCBiZSBhZGRlZCBhdXRvbWF0aWNhbGx5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLml0c0ljb249dW5kZWZpbmVkXSB0aGUgSVRTIGRldmljZSB0eXBlIGljb24gaW1hZ2Ugc2VlIGh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9pY29ucy9cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuaXRzTGluZVN0eWxlPXVuZGVmaW5lZF0gQSBzaW5nbGUgbGluZSBzdHlsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXRzTGluZVN0eWxlLmNvbG9yIHRoZSBsaW5lIGNvbG9yIGFzIHJnYiBvciBoZXhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5pdHNMaW5lU3R5bGUud2lkdGg9NV0gdGhlIGxpbmUgd2lkdGhcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuaXRzSWNvbkNvbmZpZz11bmRlZmluZWRdIFRoZSBpY29uIHN1YnR5cGUgY29uZmlndXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXRzSWNvbkNvbmZpZy5wcm9wIFRoZSBwcm9wZXJ0eSB1c2VkIHRvIGRlZmluZSBpY29uIGF0dHJpYnV0ZSBzeW1ib2xpemF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pdHNJY29uQ29uZmlnLmRlZmF1bHROYW1lIFRoZSBkZWZhdWx0IG5hbWUgdG8gYmUgdXNlZCBpZiBubyBvdGhlciBtYXRjaCBpcyBmb3VuZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXRzSWNvbkNvbmZpZy5kZWZhdWx0SWNvbiBUaGUgZGVmYXVsdCBpY29uIHRvIGJlIHVzZWQgZm9yIG5vIG90aGVyIG1hdGNoZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5pdHNJY29uQ29uZmlnLmljb25BcnJheT1bXV0gYW4gYXJyYXksIGl0ZW1zIHdpdGggZm9ybWF0IFtwcm9wZXJ0eSwgbmFtZSwgaW1nXVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5pdHNMaW5lQ29uZmlnPXVuZGVmaW5lZF0gVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLml0c0xpbmVDb25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLml0c0xpbmVDb25maWcuZGVmYXVsdE5hbWU9T3RoZXJdIFRoZSBkZWZhdWx0IG5hbWUgdG8gYmUgdXNlZCBpZiBubyBvdGhlciBtYXRjaCBpcyBmb3VuZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLml0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yPXJlZF0gVGhlIGRlZmF1bHQgbGluZSBjb2xvciB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaXRzTGluZUNvbmZpZy5kZWZhdWx0V2lkdGhdIFRoZSBkZWZhdWx0IGxpbmUgd2lkdGggdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLml0c0xpbmVDb25maWcubGluZUFycmF5PVtdXSBhbiBhcnJheSwgaXRlbXMgd2l0aCBmb3JtYXQgW3Byb3BlcnR5LCBuYW1lLCBjb2xvciwgb3B0aW9uYWwgd2lkdGggPSA1XVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLml0c1R5cGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdpdHMgdHlwZSBtdXN0IGJlIGRlZmluZWQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFkZFRvTGVnZW5kID0gJyc7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSBhIHN0eWxlIHdpdGggdGhlIGhlbHBlciBmdW5jdGlvbiBpZiBpdCBpcyBub3QgZXhwbGljaXRseSBkZWZpbmVkXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnN0eWxlID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGUgPSBkZWZpbmVTdHlsZShcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXRzSWNvbiwgb3B0aW9ucy5pdHNMaW5lU3R5bGUsIG9wdGlvbnMuaXRzSWNvbkNvbmZpZywgb3B0aW9ucy5pdHNMaW5lQ29uZmlnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGFkZFRvTGVnZW5kID0gZGVmaW5lTGVnZW5kKFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pdHNJY29uLCBvcHRpb25zLml0c0xpbmVTdHlsZSwgb3B0aW9ucy5pdHNJY29uQ29uZmlnLCBvcHRpb25zLml0c0xpbmVDb25maWdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMucGFyYW1zID0gdHlwZW9mIG9wdGlvbnMucGFyYW1zID09ICdvYmplY3QnID8gb3B0aW9ucy5wYXJhbXMgOiB7fTtcclxuICAgICAgICAkLmV4dGVuZChvcHRpb25zLnBhcmFtcywge2Zvcm1hdDogJ0pTT04nLCByZXNvdXJjZTogb3B0aW9ucy5pdHNUeXBlfSk7XHJcblxyXG4gICAgICAgIHN1cGVyKCdodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvJywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vYWRkIGFueSBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICAgIHRoaXMuYWRkTGVnZW5kQ29udGVudChhZGRUb0xlZ2VuZCk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYWRkUG9wdXAgPSB0eXBlb2Ygb3B0aW9ucy5hZGRQb3B1cCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmFkZFBvcHVwIDogdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkUG9wdXApIHtcclxuICAgICAgICAgICAgbWFwUG9wdXAuYWRkVmVjdG9yUG9wdXAodGhpcywgZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxpZnJhbWUgc3JjPVwiaHR0cDovL3RyYW5zcG9ydGFsLmNlZS53aXNjLmVkdS9pdHMvaW52ZW50b3J5Lz9mZWF0dXJlPSR7cHJvcHNbJ2ZlYXR1cmVHdWlkJ119XCIgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYGhlaWdodD1cIjI1MFwiIHdpZHRoPVwiMzUwXCI+PC9pZnJhbWU+YDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2FsbGJhY2sgdG8gZ2VuZXJhdGUgdGhlIHBhcmFtZXRlcnMgcGFzc2VkIGluIHRoZSBnZXQgcmVxdWVzdFxyXG4gICAgICogQGNhbGxiYWNrIG1ha2VHZXRQYXJhbXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnQgLSBleHRlbnQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblggLSBtaW5YXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1pblkgLSBtaW5ZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFggLSBtYXhYXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZXh0ZW50Lm1heFkgLSBtYXhZXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbUxldmVsIC0gem9vbSBsZXZlbFxyXG4gICAgICovXHJcbiAgICBtYXBNb3ZlTWFrZUdldFBhcmFtcyhleHRlbnQsIHpvb21MZXZlbCkge1xyXG4gICAgICAgIHN1cGVyLm1hcE1vdmVNYWtlR2V0UGFyYW1zKGV4dGVudCwgem9vbUxldmVsKTtcclxuICAgICAgICBsZXQgbG93ZXJMZWZ0ID0gbmV3IG9sLmdlb20uUG9pbnQoW2V4dGVudC5taW5YLCBleHRlbnQubWluWV0pO1xyXG4gICAgICAgIGxvd2VyTGVmdC50cmFuc2Zvcm0odGhpcy5tYXBQcm9qLCB0aGlzLl9wcm9qZWN0aW9uNDMyNik7XHJcbiAgICAgICAgbGV0IGxvd2VyTGVmdENvb3JkaW5hdGVzID0gbG93ZXJMZWZ0LmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgbGV0IHVwcGVyUmlnaHQgPSBuZXcgb2wuZ2VvbS5Qb2ludChbZXh0ZW50Lm1heFgsIGV4dGVudC5tYXhZXSk7XHJcbiAgICAgICAgdXBwZXJSaWdodC50cmFuc2Zvcm0odGhpcy5tYXBQcm9qLCB0aGlzLl9wcm9qZWN0aW9uNDMyNik7XHJcbiAgICAgICAgbGV0IHVwcGVyUmlnaHRDb29yZGluYXRlcyA9IHVwcGVyUmlnaHQuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuXHJcbiAgICAgICAgJC5leHRlbmQodGhpcy5tYXBNb3ZlUGFyYW1zLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMOiBsb3dlckxlZnRDb29yZGluYXRlc1swXSxcclxuICAgICAgICAgICAgICAgIFI6IHVwcGVyUmlnaHRDb29yZGluYXRlc1swXSxcclxuICAgICAgICAgICAgICAgIEI6IGxvd2VyTGVmdENvb3JkaW5hdGVzWzFdLFxyXG4gICAgICAgICAgICAgICAgVDogdXBwZXJSaWdodENvb3JkaW5hdGVzWzFdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllckl0c0ludmVudG9yeSA9IExheWVySXRzSW52ZW50b3J5O1xyXG5leHBvcnQgZGVmYXVsdCBMYXllckl0c0ludmVudG9yeTtcclxuIl19