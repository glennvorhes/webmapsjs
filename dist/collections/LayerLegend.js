/**
 * Created by gavorhes on 12/16/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var makeGuid_1 = require("../util/makeGuid");
var mapMove_1 = require("../olHelpers/mapMove");
var nm = provide_1.default('collections');
var $ = require("jquery");
var LayerGroup = (function () {
    /**
     *
     * @param {object} [groupConfig={}] - group configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} [groupConfig.collapse=false] - if the group should be collapsed initially
     * @param {boolean} [groupConfig.addCheck=true] - if the group should have a checkbox controlling visibility of all layers
     * @param {LayerGroup} [parent=undefined] - the parent group
     */
    function LayerGroup(groupConfig, parent) {
        this.groupLayers = [];
        this.groupLayersLookup = {};
        this.groupGroups = [];
        this.groupGroupsLookup = {};
        this.itemIdArray = [];
        if (typeof groupConfig == 'undefined') {
            this.parent = null;
            this.groupId = 'root';
            this.groupName = 'root';
            this.allGroupLookup = { root: this };
            this.allGroupArray = [this];
            this.allLayerArray = [];
            this.allLayerLookup = {};
            this.layerParentLookup = {};
            this.collapse = false;
            this.addCheck = false;
        }
        else {
            this.groupId = makeGuid_1.default();
            this.parent = parent;
            this.groupName = groupConfig.groupName;
            this.collapse = typeof groupConfig.collapse == 'boolean' ? groupConfig.collapse : false;
            this.addCheck = typeof groupConfig.addCheck == 'boolean' ? groupConfig.addCheck : true;
        }
    }
    /**
     *
     * @param {object} groupConfig - configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} groupConfig.collapse if the group should be collapsed initially
     * @param {boolean} groupConfig.addCheck if the group should have a checkbox controlling visibility of all layers
     * @param {Array<LayerGroup>} parents parent groups
     * @returns {LayerGroup} the layer group just added
     */
    LayerGroup.prototype.addGroup = function (groupConfig, parents) {
        var parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        }
        else {
            parent = 'root';
        }
        /**
         * @type {LayerGroup}
         */
        var parentGroup = this.allGroupLookup[parent];
        var newGroup = new LayerGroup(groupConfig, parentGroup);
        this.allGroupLookup[newGroup.groupId] = newGroup;
        this.allGroupArray.push(newGroup);
        parentGroup.groupGroups.push(newGroup);
        parentGroup.groupGroupsLookup[newGroup.groupId] = newGroup;
        if (parentGroup.itemIdArray.indexOf(newGroup.groupId) > 0) {
            console.log(newGroup.groupId);
            throw 'layer and group ids must be unique';
        }
        parentGroup.itemIdArray.push(newGroup.groupId);
        return newGroup;
    };
    /**
     *
     * @param {LayerBase} newLayer the layer to be added
     * @param {Array} parents array
     */
    LayerGroup.prototype.addLegendLayer = function (newLayer, parents) {
        var parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        }
        else {
            parent = 'root';
        }
        this.allLayerLookup[newLayer.id] = newLayer;
        this.allLayerArray.push(newLayer);
        /**
         * @type {LayerGroup}
         */
        var parentGroup = this.allGroupLookup[parent];
        parentGroup.groupLayers.push(newLayer);
        parentGroup.groupLayersLookup[newLayer.id] = newLayer;
        if (parentGroup.itemIdArray.indexOf(newLayer.id) > 0) {
            console.log(newLayer.id);
            throw 'layer and group ids must be unique';
        }
        parentGroup.itemIdArray.push(newLayer.id);
        this.layerParentLookup[newLayer.id] = parentGroup;
    };
    LayerGroup.prototype.getLegendHtml = function (legendId, options) {
        var legendHtml = "<ul id=\"" + legendId + "\" class=\"legend-container\">";
        legendHtml += "<li>" + options.legendTitle + "<input type=\"checkbox\" checked id=\"suppress-by-extent-" + legendId + "\" class=\"suppress-by-extent\">" +
            ("<label title=\"Suppress layers not visible at this zoom level\" for=\"suppress-by-extent-" + legendId + "\">") +
            "<span></span>" +
            "</label></li>";
        legendHtml += this._buildLegend(this.itemIdArray, this, options.layerDivClasses) + '</ul>';
        return legendHtml;
    };
    /**
     * @param {Array} itemIds the items to process
     * @param {LayerGroup} theGroup new group
     * @param {Array} [layerDivClasses=[]] optional classes to apply to the layer divs
     * @static
     * @returns {string} html string
     */
    LayerGroup.prototype._buildLegend = function (itemIds, theGroup, layerDivClasses) {
        if (itemIds.length == 0) {
            return '';
        }
        var theHml = '';
        var itemId = itemIds[0];
        if (theGroup.groupLayersLookup[itemId]) {
            /**
             * @type {LayerBase}
             */
            var lyr = theGroup.groupLayersLookup[itemId];
            theHml += "<li id=\"" + lyr.id + "-layer-li\" class=\"legend-layer-li " + layerDivClasses.join(' ') + "\">" + lyr.getLegendDiv() + '</li>';
        }
        else if (theGroup.groupGroupsLookup[itemId]) {
            /**
             * type {LayerGroup}
             */
            var otherGroup = theGroup.groupGroupsLookup[itemId];
            theHml += "<li>";
            theHml += "<div id=\"" + otherGroup.groupId + "-legend-layer-div\" " +
                ("class=\"legend-layer-group  " + layerDivClasses.join(' ') + "\">");
            if (otherGroup.addCheck) {
                theHml += "<input type=\"checkbox\" checked id=\"" + otherGroup.groupId + "-group-chck\">" +
                    ("<label for=\"" + otherGroup.groupId + "-group-chck\" title=\"Click arrow to expand or collapse\">" + otherGroup.groupName + "</label>");
            }
            else {
                theHml += "<label title=\"Click arrow to expand or collapse\">" + otherGroup.groupName + "</label>";
            }
            theHml += "<span title=\"Expand/Collapse\" class=\"layer-group-expander";
            theHml += (otherGroup.collapse ? ' legend-layer-group-initial-collapse' : '') + "\">";
            theHml += otherGroup.collapse ? '&#9654;' : '&#9660;';
            theHml += '</span>';
            //parents.push(groupId);
            theHml += '<ul>' + this._buildLegend(otherGroup.itemIdArray, otherGroup, layerDivClasses) + '</ul>';
            theHml += '</div>';
            theHml += '</li>';
        }
        return theHml + this._buildLegend(itemIds.slice(1), theGroup, layerDivClasses);
    };
    return LayerGroup;
}());
/**
 * a wrapper to make a legend
 */
var LayerLegend = (function () {
    /**``
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {boolean} [options.scaleDependent=true] if legend display is scale dependent
     */
    function LayerLegend(legendItems, divId, options) {
        if (options === void 0) { options = {}; }
        for (var _i = 0, legendItems_1 = legendItems; _i < legendItems_1.length; _i++) {
            var i = legendItems_1[_i];
            if (typeof i == 'undefined') {
                throw 'undefined item passed in array to legend constructor';
            }
        }
        options.legendTitle = typeof options.legendTitle == 'string' ? options.legendTitle : 'Legend';
        options.scaleDependent = typeof options.scaleDependent == 'boolean' ? options.scaleDependent : true;
        options.layerDivClasses = options.layerDivClasses || [];
        // if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            mapMove_1.default.checkInit();
        }
        this.$divElement = $('#' + divId);
        this._legendItems = legendItems;
        this.layerGroup = new LayerGroup();
        this._buildTree(legendItems);
        this.legendId = makeGuid_1.default();
        this.$divElement.append(this.layerGroup.getLegendHtml(this.legendId, options));
        for (var _a = 0, _b = this.layerGroup.allLayerArray; _a < _b.length; _a++) {
            var l = _b[_a];
            l.applyCollapse();
        }
        var _this = this;
        //// if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            mapMove_1.default.checkInit();
            mapMove_1.default.addCallback(function (ext, zoom, evt) {
                if (typeof evt == 'undefined' || evt == 'change:resolution') {
                    for (var _i = 0, _a = this.layerGroup.allLayerArray; _i < _a.length; _i++) {
                        var lyr = _a[_i];
                        var $lyrLi = $('#' + lyr.id + '-layer-li');
                        if (zoom > lyr.maxZoom || zoom < lyr.minZoom) {
                            $lyrLi.addClass('layer-not-visible');
                        }
                        else {
                            $lyrLi.removeClass('layer-not-visible');
                        }
                    }
                }
            }, this, 100, true, 'legend1');
        }
        // <editor-fold desc="add event listeners">
        this.$divElement.find(".suppress-by-extent").change(function () {
            var legendLayerLis = $('.legend-layer-li');
            if (this.checked) {
                legendLayerLis.removeClass('layer-force-show');
            }
            else {
                legendLayerLis.addClass('layer-force-show');
            }
        });
        this.$divElement.find('.legend-check').change(function () {
            var lyrId = this.id.replace('-legend-layer-check', '');
            _this.layerGroup.allLayerLookup[lyrId].visible = this.checked;
        });
        this.$divElement.find('.legend-layer-group > input[type=checkbox]').change(function () {
            $(this).siblings('ul').find('input[type=checkbox]').prop('checked', this.checked).trigger('change');
        });
        this.$divElement.find('.layer-group-expander').click(function () {
            var $this = $(this);
            $this.removeClass('legend-layer-group-initial-collapse');
            $this.siblings('ul').slideToggle();
            if ($this.hasClass('legend-layer-group-collapsed')) {
                $this.removeClass('legend-layer-group-collapsed');
                $this.html('&#9660;');
            }
            else {
                $this.addClass('legend-layer-group-collapsed');
                $this.html('&#9654;');
            }
        });
        this.$divElement.find('.legend-layer-group-initial-collapse').trigger('click');
        // </editor-fold>
    }
    /**
     * @param {Array} [legendItems=this._layerConfig] the legend items
     * @param {Array} [parents=[]] the ordered list of groups in which this item is a member
     * @private
     */
    LayerLegend.prototype._buildTree = function (legendItems, parents) {
        if (legendItems.length == 0) {
            return;
        }
        var oneItem = legendItems[0];
        //reset the parent if the item is in the base array
        if (this._legendItems.indexOf(oneItem) > -1 || typeof parents == 'undefined') {
            parents = [];
        }
        if (typeof oneItem.groupName !== 'undefined') {
            var groupItem = legendItems[0];
            var newGroup = this.layerGroup.addGroup(groupItem, parents);
            parents.push(newGroup.groupId);
            this._buildTree(oneItem.items, parents);
        }
        else {
            /**
             * @type {LayerBase}
             */
            var layerItem = legendItems[0];
            this.layerGroup.addLegendLayer(layerItem, parents);
        }
        this._buildTree(legendItems.slice(1), parents);
    };
    return LayerLegend;
}());
nm.LayerLegend = LayerLegend;
exports.default = LayerLegend;
//# sourceMappingURL=LayerLegend.js.map