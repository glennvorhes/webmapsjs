/**
 * Created by gavorhes on 12/8/2015.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerItsInventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJJdHNJbnZlbnRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGF5ZXJzL0xheWVySXRzSW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOzs7Ozs7O0FBRUgsbUVBQThEO0FBQzlELGtEQUE2QztBQUM3QywyQ0FBc0M7QUFDdEMsOEJBQWlDO0FBQ2pDLDBCQUE2QjtBQUU3QixJQUFJLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRzNCLDBCQUEwQixPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhO0lBQ3pFLFlBQVksQ0FBQztJQUViLHNEQUFzRDtJQUN0RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM3QixXQUFXLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sWUFBWSxDQUFDLEtBQUssSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEYsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLFlBQVksQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hGLFdBQVcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsT0FBTyxhQUFhLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENB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SyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXhELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDdkI7WUFDSSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUE1R0QsQ0FBZ0MsZ0NBQXNCLEdBNEdyRDtBQUVELEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQzs7QUFDekMsa0JBQWUsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi84LzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IExheWVyQmFzZVZlY3Rvckdlb0pzb24gZnJvbSAnLi9MYXllckJhc2VWZWN0b3JHZW9Kc29uJztcclxuaW1wb3J0IG1hcFBvcHVwIGZyb20gJy4uL29sSGVscGVycy9tYXBQb3B1cCc7XHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmltcG9ydCBvbCA9IHJlcXVpcmUoJ2N1c3RvbS1vbCcpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxubGV0IG5tID0gcHJvdmlkZSgnbGF5ZXJzJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gY2hlY2tTdHlsZU51bWJlcihpdHNJY29uLCBpdHNMaW5lU3R5bGUsIGl0c0ljb25Db25maWcsIGl0c0xpbmVDb25maWcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8vbWFrZSBzdXJlIG9uZSBhbmQgb25seSBvbmUgY29uZmlndXJhdGlvbiBpcyBkZWZpbmVkO1xyXG4gICAgbGV0IGNvbmZpZ0NvdW50ID0gMDtcclxuICAgIGlmICh0eXBlb2YgaXRzSWNvbiA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGNvbmZpZ0NvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpdHNMaW5lU3R5bGUgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpdHNMaW5lU3R5bGUud2lkdGggPSB0eXBlb2YgaXRzTGluZVN0eWxlLndpZHRoID09ICdudW1iZXInID8gaXRzTGluZVN0eWxlLndpZHRoIDogNTtcclxuICAgICAgICBpdHNMaW5lU3R5bGUuY29sb3IgPSB0eXBlb2YgaXRzTGluZVN0eWxlLmNvbG9yID09ICdzdHJpbmcnID8gaXRzTGluZVN0eWxlLmNvbG9yIDogJ3JlZCc7XHJcbiAgICAgICAgY29uZmlnQ291bnQrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGl0c0ljb25Db25maWcgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBpdHNJY29uQ29uZmlnLmRlZmF1bHROYW1lID0gaXRzSWNvbkNvbmZpZy5kZWZhdWx0TmFtZSB8fCAnT3RoZXInO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGl0c0ljb25Db25maWcuaWNvbkFycmF5ID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGl0c0ljb25Db25maWcuaWNvbkFycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWdDb3VudCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgaXRzTGluZUNvbmZpZyA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGl0c0xpbmVDb25maWcuZGVmYXVsdE5hbWUgPSBpdHNMaW5lQ29uZmlnLmRlZmF1bHROYW1lIHx8ICdPdGhlcic7XHJcbiAgICAgICAgaXRzTGluZUNvbmZpZy5kZWZhdWx0V2lkdGggPSBpdHNMaW5lQ29uZmlnLmRlZmF1bHRXaWR0aCB8fCA1O1xyXG4gICAgICAgIGl0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yID0gaXRzTGluZUNvbmZpZy5kZWZhdWx0Q29sb3IgfHwgJ3JlZCc7XHJcblxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGl0c0xpbmVDb25maWcubGluZUFycmF5ID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGl0c0xpbmVDb25maWcubGluZUFycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIHdpZHRoIGlmIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdHNMaW5lQ29uZmlnLmxpbmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaXRzTGluZUNvbmZpZy5saW5lQXJyYXlbaV0ubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgICAgIGl0c0xpbmVDb25maWcubGluZUFycmF5W2ldLnB1c2goNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZ0NvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZ0NvdW50ID4gMSkge1xyXG4gICAgICAgIHRocm93ICdPbmx5IG9uZSBzdHlsZSBjb25maWcgY2FuIGJlIGRlZmluZWQnO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNJY29uPXVuZGVmaW5lZF0gdGhlIElUUyBkZXZpY2UgdHlwZSBpY29uIGltYWdlIHNlZSBodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvaWNvbnMvXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZVN0eWxlPXVuZGVmaW5lZF0gQSBzaW5nbGUgbGluZSBzdHlsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaXRzTGluZVN0eWxlLmNvbG9yIHRoZSBsaW5lIGNvbG9yIGFzIHJnYiBvciBoZXhcclxuICogQHBhcmFtIHtudW1iZXJ9IFtpdHNMaW5lU3R5bGUud2lkdGg9NV0gdGhlIGxpbmUgd2lkdGhcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNJY29uQ29uZmlnPXVuZGVmaW5lZF0gVGhlIGljb24gc3VidHlwZSBjb25maWd1cmF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNJY29uQ29uZmlnLnByb3AgVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcuZGVmYXVsdE5hbWUgVGhlIGRlZmF1bHQgbmFtZSB0byBiZSB1c2VkIGlmIG5vIG90aGVyIG1hdGNoIGlzIGZvdW5kXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNJY29uQ29uZmlnLmRlZmF1bHRJY29uIFRoZSBkZWZhdWx0IGljb24gdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0ljb25Db25maWcuaWNvbkFycmF5PVtdXSBhbiBhcnJheSwgaXRlbXMgd2l0aCBmb3JtYXQgW3Byb3BlcnR5LCBuYW1lLCBpbWddXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZUNvbmZpZz11bmRlZmluZWRdIFRoZSBwcm9wZXJ0eSB1c2VkIHRvIGRlZmluZSBpY29uIGF0dHJpYnV0ZSBzeW1ib2xpemF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNMaW5lQ29uZmlnLnByb3AgVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNMaW5lQ29uZmlnLmRlZmF1bHROYW1lPU90aGVyXSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNMaW5lQ29uZmlnLmRlZmF1bHRDb2xvcj1yZWRdIFRoZSBkZWZhdWx0IGxpbmUgY29sb3IgdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gW2l0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRoPTVdIFRoZSBkZWZhdWx0IGxpbmUgd2lkdGggdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0xpbmVDb25maWcubGluZUFycmF5PVtdXSBhbiBhcnJheSwgaXRlbXMgd2l0aCBmb3JtYXQgW3Byb3BlcnR5LCBuYW1lLCBjb2xvciwgb3B0aW9uYWwgd2lkdGhdXHJcbiAqIEByZXR1cm5zIHsqfSB1bmRlZmluZWQsIHN0eWxlLCBvciBzdHlsZSBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lU3R5bGUoaXRzSWNvbiwgaXRzTGluZVN0eWxlLCBpdHNJY29uQ29uZmlnLCBpdHNMaW5lQ29uZmlnKSA6IG9sLnN0eWxlLlN0eWxlfEFycmF5PG9sLnN0eWxlLlN0eWxlPnxvbC5TdHlsZUZ1bmN0aW9ue1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBjaGVja1N0eWxlTnVtYmVyKGl0c0ljb24sIGl0c0xpbmVTdHlsZSwgaXRzSWNvbkNvbmZpZywgaXRzTGluZUNvbmZpZyk7XHJcblxyXG4gICAgbGV0IF9pY29uVXJsUm9vdCA9ICdodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvaWNvbnMvJztcclxuXHJcbiAgICBpZiAoaXRzSWNvbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLkljb24oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBfaWNvblVybFJvb3QgKyBpdHNJY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGl0c0xpbmVTdHlsZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICBzdHJva2U6IG5ldyBvbC5zdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IGl0c0xpbmVTdHlsZS5jb2xvcixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBpdHNMaW5lU3R5bGUud2lkdGhcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoaXRzSWNvbkNvbmZpZykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZmVhdHVyZTogb2wuRmVhdHVyZSkge1xyXG4gICAgICAgICAgICBsZXQgc3ltYm9sUHJvcCA9IGZlYXR1cmUuZ2V0UHJvcGVydGllcygpW2l0c0ljb25Db25maWcucHJvcF07XHJcbiAgICAgICAgICAgIGxldCBpY29uVXJsID0gX2ljb25VcmxSb290ICsgaXRzSWNvbkNvbmZpZy5kZWZhdWx0SWNvbjtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRzSWNvbkNvbmZpZy5pY29uQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aGlzUHJvcCA9IGl0c0ljb25Db25maWcuaWNvbkFycmF5W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2xQcm9wLnRyaW0oKS50b0xvY2FsZUxvd2VyQ2FzZSgpID09IHRoaXNQcm9wWzBdLnRyaW0oKS50b0xvY2FsZUxvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblVybCA9IF9pY29uVXJsUm9vdCArIHRoaXNQcm9wWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBvbC5zdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLkljb24oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGljb25VcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiAnYW5vbnltb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSldO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKGl0c0xpbmVDb25maWcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZlYXR1cmU6IG9sLkZlYXR1cmUpIHtcclxuICAgICAgICAgICAgbGV0IHN5bWJvbFByb3AgPSBmZWF0dXJlLmdldFByb3BlcnRpZXMoKVtpdHNMaW5lQ29uZmlnLnByb3BdO1xyXG4gICAgICAgICAgICBsZXQgY29sciA9IGl0c0xpbmVDb25maWcuZGVmYXVsdENvbG9yIHx8ICdyZWQnO1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBpdHNMaW5lQ29uZmlnLmRlZmF1bHRXaWR0aCB8fCA1O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdHNMaW5lQ29uZmlnLmxpbmVBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNQcm9wID0gaXRzTGluZUNvbmZpZy5saW5lQXJyYXlbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbFByb3AudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gdGhpc1Byb3BbMF0udHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xyID0gdGhpc1Byb3BbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzUHJvcFszXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgb2wuc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2wuc3R5bGUuU3Ryb2tlKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29scixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXTtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNJY29uPXVuZGVmaW5lZF0gdGhlIElUUyBkZXZpY2UgdHlwZSBpY29uIGltYWdlIHNlZSBodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvaWNvbnMvXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZVN0eWxlPXVuZGVmaW5lZF0gQSBzaW5nbGUgbGluZSBzdHlsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaXRzTGluZVN0eWxlLmNvbG9yIHRoZSBsaW5lIGNvbG9yIGFzIHJnYiBvciBoZXhcclxuICogQHBhcmFtIHtudW1iZXJ9IFtpdHNMaW5lU3R5bGUud2lkdGg9NV0gdGhlIGxpbmUgd2lkdGhcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IFtpdHNJY29uQ29uZmlnPXVuZGVmaW5lZF0gVGhlIGljb24gc3VidHlwZSBjb25maWd1cmF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNJY29uQ29uZmlnLnByb3AgVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IGl0c0ljb25Db25maWcuZGVmYXVsdE5hbWUgVGhlIGRlZmF1bHQgbmFtZSB0byBiZSB1c2VkIGlmIG5vIG90aGVyIG1hdGNoIGlzIGZvdW5kXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNJY29uQ29uZmlnLmRlZmF1bHRJY29uIFRoZSBkZWZhdWx0IGljb24gdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0ljb25Db25maWcuaWNvbkFycmF5PVtdXSBhbiBhcnJheSwgaXRlbXMgd2l0aCBmb3JtYXQgW3Byb3BlcnR5LCBuYW1lLCBpbWddXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbaXRzTGluZUNvbmZpZz11bmRlZmluZWRdIFRoZSBwcm9wZXJ0eSB1c2VkIHRvIGRlZmluZSBpY29uIGF0dHJpYnV0ZSBzeW1ib2xpemF0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpdHNMaW5lQ29uZmlnLnByb3AgVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNMaW5lQ29uZmlnLmRlZmF1bHROYW1lPU90aGVyXSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICogQHBhcmFtIHtzdHJpbmd9IFtpdHNMaW5lQ29uZmlnLmRlZmF1bHRDb2xvcj1yZWRdIFRoZSBkZWZhdWx0IGxpbmUgY29sb3IgdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gW2l0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRoPTVdIFRoZSBkZWZhdWx0IGxpbmUgd2lkdGggdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2l0c0xpbmVDb25maWcubGluZUFycmF5PVtdXSBhbiBhcnJheSwgaXRlbXMgd2l0aCBmb3JtYXQgW3Byb3BlcnR5LCBuYW1lLCBjb2xvciwgb3B0aW9uYWwgd2lkdGhdXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWwgdG8gYmUgYWRkZWQgdG8gdGhlIGxlZ2VuZFxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lTGVnZW5kKGl0c0ljb24sIGl0c0xpbmVTdHlsZSwgaXRzSWNvbkNvbmZpZywgaXRzTGluZUNvbmZpZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgbGV0IGljb25IZWlnaHQgPSAxNztcclxuXHJcbiAgICBjaGVja1N0eWxlTnVtYmVyKGl0c0ljb24sIGl0c0xpbmVTdHlsZSwgaXRzSWNvbkNvbmZpZywgaXRzTGluZUNvbmZpZyk7XHJcblxyXG4gICAgbGV0IF9pY29uVXJsUm9vdCA9ICdodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvaWNvbnMvJztcclxuXHJcbiAgICBpZiAoaXRzSWNvbikge1xyXG4gICAgICAgIHJldHVybiBgPGltZyBzcmM9XCIke19pY29uVXJsUm9vdCArIGl0c0ljb259XCIgY2xhc3M9XCJsZWdlbmQtbGF5ZXItaWNvblwiIGhlaWdodD1cIiR7aWNvbkhlaWdodH1cIj5gO1xyXG4gICAgfSBlbHNlIGlmIChpdHNMaW5lU3R5bGUpIHtcclxuICAgICAgICByZXR1cm4gYDxociBzdHlsZT1cImhlaWdodDogJHtpdHNMaW5lU3R5bGUud2lkdGh9cHg7IGJhY2tncm91bmQtY29sb3I6ICR7aXRzTGluZVN0eWxlLmNvbG9yfVwiPmA7XHJcbiAgICB9IGVsc2UgaWYgKGl0c0ljb25Db25maWcpIHtcclxuICAgICAgICBsZXQgb3V0SHRtbCA9ICcnO1xyXG4gICAgICAgIG91dEh0bWwgKz0gJzx1bD4nO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBhIG9mIGl0c0ljb25Db25maWcuaWNvbkFycmF5KSB7XHJcbiAgICAgICAgICAgIG91dEh0bWwgKz0gYDxsaT48c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHthWzFdfTwvc3Bhbj48aW1nIHNyYz1cIiR7X2ljb25VcmxSb290ICsgYVsyXX1cIiBjbGFzcz1cImxlZ2VuZC1sYXllci1pY29uXCIgaGVpZ2h0PVwiJHtpY29uSGVpZ2h0fVwiPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dEh0bWwgKz0gYDxsaT48c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtpdHNJY29uQ29uZmlnLmRlZmF1bHROYW1lfTwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDxpbWcgc3JjPVwiJHtfaWNvblVybFJvb3QgKyBpdHNJY29uQ29uZmlnLmRlZmF1bHRJY29ufVwiIGNsYXNzPVwibGVnZW5kLWxheWVyLWljb25cIiBoZWlnaHQ9XCIke2ljb25IZWlnaHR9XCI+PC9saT5gO1xyXG4gICAgICAgIG91dEh0bWwgKz0gJzwvdWw+JztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dEh0bWw7XHJcbiAgICB9IGVsc2UgaWYgKGl0c0xpbmVDb25maWcpIHtcclxuICAgICAgICBsZXQgb3V0SHRtbCA9ICcnO1xyXG4gICAgICAgIG91dEh0bWwgKz0gJzx1bD4nO1xyXG4gICAgICAgIGZvciAobGV0IGxzIG9mIGl0c0xpbmVDb25maWcubGluZUFycmF5KSB7XHJcbiAgICAgICAgICAgIG91dEh0bWwgKz0gYDxsaT48c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtsc1sxXX08L3NwYW4+YCArXHJcbiAgICAgICAgICAgICAgICBgPGhyIHN0eWxlPVwiaGVpZ2h0OiAke2xzWzNdfXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAke2xzWzJdfVwiPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dEh0bWwgKz0gYDxsaT48c3BhbiBjbGFzcz1cImxlZ2VuZC1sYXllci1zdWJpdGVtXCI+JHtpdHNMaW5lQ29uZmlnLmRlZmF1bHROYW1lfTwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDxociBzdHlsZT1cImhlaWdodDogJHtpdHNMaW5lQ29uZmlnLmRlZmF1bHRXaWR0aH1weDsgYmFja2dyb3VuZC1jb2xvcjogJHtpdHNMaW5lQ29uZmlnLmRlZmF1bHRDb2xvcn1cIj48L2xpPmA7XHJcbiAgICAgICAgb3V0SHRtbCArPSAnPC91bD4nO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0SHRtbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogSXRzIExheWVyIGNsYXNzXHJcbiAqIEBhdWdtZW50cyBMYXllckJhc2VWZWN0b3JHZW9Kc29uXHJcbiAqL1xyXG5jbGFzcyBMYXllckl0c0ludmVudG9yeSBleHRlbmRzIExheWVyQmFzZVZlY3Rvckdlb0pzb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSVRTIGRldmljZSBsYXllciwgdHlwZXMgYXZhaWxhYmxlIGF0IGh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS9cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWRdIC0gbGF5ZXIgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5uYW1lPVVubmFtZWQgTGF5ZXJdIC0gbGF5ZXIgbmFtZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm9wYWNpdHk9MV0gLSBvcGFjaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnZpc2libGU9dHJ1ZV0gLSBkZWZhdWx0IHZpc2libGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5ab29tPXVuZGVmaW5lZF0gLSBtaW4gem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Wm9vbT11bmRlZmluZWRdIC0gbWF4IHpvb20gbGV2ZWwsIDAgLSAyOFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLnBhcmFtcz17fV0gdGhlIGdldCBwYXJhbWV0ZXJzIHRvIGluY2x1ZGUgdG8gcmV0cmlldmUgdGhlIGxheWVyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4PTBdIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gZnVuY3Rpb24gdG8gY2FsbCBvbiBsb2FkLCBjb250ZXh0IHRoaXMgaXMgdGhlIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDb2xsYXBzZT1mYWxzZV0gaWYgdGhlIGxlZ2VuZCBpdGVtIHNob3VsZCBiZSBpbml0aWFsbHkgY29sbGFwc2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENoZWNrYm94PXRydWVdIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnRdIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuYXV0b0xvYWQ9ZmFsc2VdIGlmIHRoZSBsYXllciBzaG91bGQgYXV0byBsb2FkIGlmIG5vdCB2aXNpYmxlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHwqfSBbb3B0aW9ucy5zdHlsZT11bmRlZmluZWRdIHRoZSBsYXllciBzdHlsZSwgdXNlIG9wZW5sYXllcnMgZGVmYXVsdCBzdHlsZSBpZiBub3QgZGVmaW5lZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5vbkRlbWFuZD1mYWxzZV0gaWYgdGhlIGxheWVyIHNob3VsZCBiZSBsb2FkZWQgYnkgZXh0ZW50IG9uIG1hcCBtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub25EZW1hbmREZWxheT0zMDBdIGRlbGF5IGJlZm9yZSB0aGUgbWFwIG1vdmUgY2FsbGJhY2sgc2hvdWxkIGJlIGNhbGxlZFxyXG4gICAgICogQHBhcmFtIHtNYXBNb3ZlQ2xzfSBbb3B0aW9ucy5tYXBNb3ZlT2JqPW1hcE1vdmVdIGFsdGVybmF0ZSBtYXAgbW92ZSBvYmplY3QgZm9yIHVzZSB3aXRoIG11bHRpIG1hcCBwYWdlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLml0c1R5cGUgdGhlIElUUyBkZXZpY2UgdHlwZSwgdXNlIHRoZSB1cmwgZmxhZyBhdCBodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFkZFBvcHVwPXRydWVdIGlmIHRoZSBwb3B1cCBzaG91bGQgYmUgYWRkZWQgYXV0b21hdGljYWxseVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pdHNJY29uPXVuZGVmaW5lZF0gdGhlIElUUyBkZXZpY2UgdHlwZSBpY29uIGltYWdlIHNlZSBodHRwOi8vdHJhbnNwb3J0YWwuY2VlLndpc2MuZWR1L2l0cy9pbnZlbnRvcnkvaWNvbnMvXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLml0c0xpbmVTdHlsZT11bmRlZmluZWRdIEEgc2luZ2xlIGxpbmUgc3R5bGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLml0c0xpbmVTdHlsZS5jb2xvciB0aGUgbGluZSBjb2xvciBhcyByZ2Igb3IgaGV4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaXRzTGluZVN0eWxlLndpZHRoPTVdIHRoZSBsaW5lIHdpZHRoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLml0c0ljb25Db25maWc9dW5kZWZpbmVkXSBUaGUgaWNvbiBzdWJ0eXBlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLml0c0ljb25Db25maWcucHJvcCBUaGUgcHJvcGVydHkgdXNlZCB0byBkZWZpbmUgaWNvbiBhdHRyaWJ1dGUgc3ltYm9saXphdGlvblxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXRzSWNvbkNvbmZpZy5kZWZhdWx0TmFtZSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLml0c0ljb25Db25maWcuZGVmYXVsdEljb24gVGhlIGRlZmF1bHQgaWNvbiB0byBiZSB1c2VkIGZvciBubyBvdGhlciBtYXRjaGVzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuaXRzSWNvbkNvbmZpZy5pY29uQXJyYXk9W11dIGFuIGFycmF5LCBpdGVtcyB3aXRoIGZvcm1hdCBbcHJvcGVydHksIG5hbWUsIGltZ11cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuaXRzTGluZUNvbmZpZz11bmRlZmluZWRdIFRoZSBwcm9wZXJ0eSB1c2VkIHRvIGRlZmluZSBpY29uIGF0dHJpYnV0ZSBzeW1ib2xpemF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pdHNMaW5lQ29uZmlnLnByb3AgVGhlIHByb3BlcnR5IHVzZWQgdG8gZGVmaW5lIGljb24gYXR0cmlidXRlIHN5bWJvbGl6YXRpb25cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pdHNMaW5lQ29uZmlnLmRlZmF1bHROYW1lPU90aGVyXSBUaGUgZGVmYXVsdCBuYW1lIHRvIGJlIHVzZWQgaWYgbm8gb3RoZXIgbWF0Y2ggaXMgZm91bmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pdHNMaW5lQ29uZmlnLmRlZmF1bHRDb2xvcj1yZWRdIFRoZSBkZWZhdWx0IGxpbmUgY29sb3IgdG8gYmUgdXNlZCBmb3Igbm8gb3RoZXIgbWF0Y2hlc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLml0c0xpbmVDb25maWcuZGVmYXVsdFdpZHRoXSBUaGUgZGVmYXVsdCBsaW5lIHdpZHRoIHRvIGJlIHVzZWQgZm9yIG5vIG90aGVyIG1hdGNoZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5pdHNMaW5lQ29uZmlnLmxpbmVBcnJheT1bXV0gYW4gYXJyYXksIGl0ZW1zIHdpdGggZm9ybWF0IFtwcm9wZXJ0eSwgbmFtZSwgY29sb3IsIG9wdGlvbmFsIHdpZHRoID0gNV1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pdHNUeXBlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyAnaXRzIHR5cGUgbXVzdCBiZSBkZWZpbmVkJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRUb0xlZ2VuZCA9ICcnO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgYSBzdHlsZSB3aXRoIHRoZSBoZWxwZXIgZnVuY3Rpb24gaWYgaXQgaXMgbm90IGV4cGxpY2l0bHkgZGVmaW5lZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHlsZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlID0gZGVmaW5lU3R5bGUoXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLml0c0ljb24sIG9wdGlvbnMuaXRzTGluZVN0eWxlLCBvcHRpb25zLml0c0ljb25Db25maWcsIG9wdGlvbnMuaXRzTGluZUNvbmZpZ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBhZGRUb0xlZ2VuZCA9IGRlZmluZUxlZ2VuZChcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXRzSWNvbiwgb3B0aW9ucy5pdHNMaW5lU3R5bGUsIG9wdGlvbnMuaXRzSWNvbkNvbmZpZywgb3B0aW9ucy5pdHNMaW5lQ29uZmlnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zLnBhcmFtcyA9IHR5cGVvZiBvcHRpb25zLnBhcmFtcyA9PSAnb2JqZWN0JyA/IG9wdGlvbnMucGFyYW1zIDoge307XHJcbiAgICAgICAgJC5leHRlbmQob3B0aW9ucy5wYXJhbXMsIHtmb3JtYXQ6ICdKU09OJywgcmVzb3VyY2U6IG9wdGlvbnMuaXRzVHlwZX0pO1xyXG5cclxuICAgICAgICBzdXBlcignaHR0cDovL3RyYW5zcG9ydGFsLmNlZS53aXNjLmVkdS9pdHMvaW52ZW50b3J5LycsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvL2FkZCBhbnkgYWRkaXRpb25hbCBjb250ZW50IHRvIHRoZSBsZWdlbmRcclxuICAgICAgICB0aGlzLmFkZExlZ2VuZENvbnRlbnQoYWRkVG9MZWdlbmQpO1xyXG5cclxuICAgICAgICBvcHRpb25zLmFkZFBvcHVwID0gdHlwZW9mIG9wdGlvbnMuYWRkUG9wdXAgPT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hZGRQb3B1cCA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmFkZFBvcHVwKSB7XHJcbiAgICAgICAgICAgIG1hcFBvcHVwLmFkZFZlY3RvclBvcHVwKHRoaXMsIGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8aWZyYW1lIHNyYz1cImh0dHA6Ly90cmFuc3BvcnRhbC5jZWUud2lzYy5lZHUvaXRzL2ludmVudG9yeS8/ZmVhdHVyZT0ke3Byb3BzWydmZWF0dXJlR3VpZCddfVwiIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGBoZWlnaHQ9XCIyNTBcIiB3aWR0aD1cIjM1MFwiPjwvaWZyYW1lPmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGxiYWNrIHRvIGdlbmVyYXRlIHRoZSBwYXJhbWV0ZXJzIHBhc3NlZCBpbiB0aGUgZ2V0IHJlcXVlc3RcclxuICAgICAqIEBjYWxsYmFjayBtYWtlR2V0UGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW50IC0gZXh0ZW50IG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5YIC0gbWluWFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5taW5ZIC0gbWluWVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhYIC0gbWF4WFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGV4dGVudC5tYXhZIC0gbWF4WVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpvb21MZXZlbCAtIHpvb20gbGV2ZWxcclxuICAgICAqL1xyXG4gICAgbWFwTW92ZU1ha2VHZXRQYXJhbXMoZXh0ZW50LCB6b29tTGV2ZWwpIHtcclxuICAgICAgICBzdXBlci5tYXBNb3ZlTWFrZUdldFBhcmFtcyhleHRlbnQsIHpvb21MZXZlbCk7XHJcbiAgICAgICAgbGV0IGxvd2VyTGVmdCA9IG5ldyBvbC5nZW9tLlBvaW50KFtleHRlbnQubWluWCwgZXh0ZW50Lm1pblldKTtcclxuICAgICAgICBsb3dlckxlZnQudHJhbnNmb3JtKHRoaXMubWFwUHJvaiwgdGhpcy5fcHJvamVjdGlvbjQzMjYpO1xyXG4gICAgICAgIGxldCBsb3dlckxlZnRDb29yZGluYXRlcyA9IGxvd2VyTGVmdC5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICAgIGxldCB1cHBlclJpZ2h0ID0gbmV3IG9sLmdlb20uUG9pbnQoW2V4dGVudC5tYXhYLCBleHRlbnQubWF4WV0pO1xyXG4gICAgICAgIHVwcGVyUmlnaHQudHJhbnNmb3JtKHRoaXMubWFwUHJvaiwgdGhpcy5fcHJvamVjdGlvbjQzMjYpO1xyXG4gICAgICAgIGxldCB1cHBlclJpZ2h0Q29vcmRpbmF0ZXMgPSB1cHBlclJpZ2h0LmdldENvb3JkaW5hdGVzKCk7XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKHRoaXMubWFwTW92ZVBhcmFtcyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTDogbG93ZXJMZWZ0Q29vcmRpbmF0ZXNbMF0sXHJcbiAgICAgICAgICAgICAgICBSOiB1cHBlclJpZ2h0Q29vcmRpbmF0ZXNbMF0sXHJcbiAgICAgICAgICAgICAgICBCOiBsb3dlckxlZnRDb29yZGluYXRlc1sxXSxcclxuICAgICAgICAgICAgICAgIFQ6IHVwcGVyUmlnaHRDb29yZGluYXRlc1sxXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubm0uTGF5ZXJJdHNJbnZlbnRvcnkgPSBMYXllckl0c0ludmVudG9yeTtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJJdHNJbnZlbnRvcnk7XHJcbiJdfQ==