/**
 * Created by gavorhes on 12/16/2015.
 */
"use strict";
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
    /**
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {boolean} [options.scaleDependent=true] if legend display is scale dependent
     */
    function LayerLegend(legendItems, divId, options) {
        for (var _i = 0, legendItems_1 = legendItems; _i < legendItems_1.length; _i++) {
            var i = legendItems_1[_i];
            if (typeof i == 'undefined') {
                throw 'undefined item passed in array to legend constructor';
            }
        }
        options = options || {};
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
        if (typeof oneItem['groupName'] !== 'undefined') {
            var groupItem = legendItems[0];
            var newGroup = this.layerGroup.addGroup(groupItem, parents);
            parents.push(newGroup.groupId);
            this._buildTree(groupItem.items, parents);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerLegend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJMZWdlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29sbGVjdGlvbnMvTGF5ZXJMZWdlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsMkNBQXNDO0FBQ3RDLDZDQUF3QztBQUN4QyxnREFBMkM7QUFFM0MsSUFBSSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoQywwQkFBNkI7QUFFN0I7SUFpQkk7Ozs7Ozs7T0FPRztJQUNILG9CQUFZLFdBQVksRUFBRSxNQUFPO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFB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QUssQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQUFDLEFBbEpELElBa0pDO0FBRUQsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBQzdCLGtCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEyLzE2LzIwMTUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHByb3ZpZGUgZnJvbSAnLi4vdXRpbC9wcm92aWRlJztcclxuaW1wb3J0IG1ha2VHdWlkIGZyb20gJy4uL3V0aWwvbWFrZUd1aWQnO1xyXG5pbXBvcnQgbWFwTW92ZSBmcm9tICcuLi9vbEhlbHBlcnMvbWFwTW92ZSc7XHJcblxyXG5sZXQgbm0gPSBwcm92aWRlKCdjb2xsZWN0aW9ucycpO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuY2xhc3MgTGF5ZXJHcm91cCB7XHJcbiAgICBncm91cExheWVyczogYW55O1xyXG4gICAgZ3JvdXBMYXllcnNMb29rdXA6IGFueTtcclxuICAgIGdyb3VwR3JvdXBzTG9va3VwOiBhbnk7XHJcbiAgICBncm91cEdyb3VwczogYW55O1xyXG4gICAgaXRlbUlkQXJyYXk6IGFueTtcclxuICAgIGdyb3VwSWQ6IGFueTtcclxuICAgIGdyb3VwTmFtZTogYW55O1xyXG4gICAgYWxsTGF5ZXJBcnJheTogYW55O1xyXG4gICAgcGFyZW50OiBhbnk7XHJcbiAgICBhbGxHcm91cEFycmF5OiBhbnk7XHJcbiAgICBhbGxHcm91cExvb2t1cDogYW55O1xyXG4gICAgYWxsTGF5ZXJMb29rdXA6IGFueTtcclxuICAgIGNvbGxhcHNlOiBhbnk7XHJcbiAgICBhZGRDaGVjazogYW55O1xyXG4gICAgbGF5ZXJQYXJlbnRMb29rdXA6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2dyb3VwQ29uZmlnPXt9XSAtIGdyb3VwIGNvbmZpZ3VyYXRpb24gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBDb25maWcuZ3JvdXBOYW1lIC0gdGhlIGdyb3VwIG5hbWVcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2dyb3VwQ29uZmlnLmNvbGxhcHNlPWZhbHNlXSAtIGlmIHRoZSBncm91cCBzaG91bGQgYmUgY29sbGFwc2VkIGluaXRpYWxseVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZ3JvdXBDb25maWcuYWRkQ2hlY2s9dHJ1ZV0gLSBpZiB0aGUgZ3JvdXAgc2hvdWxkIGhhdmUgYSBjaGVja2JveCBjb250cm9sbGluZyB2aXNpYmlsaXR5IG9mIGFsbCBsYXllcnNcclxuICAgICAqIEBwYXJhbSB7TGF5ZXJHcm91cH0gW3BhcmVudD11bmRlZmluZWRdIC0gdGhlIHBhcmVudCBncm91cFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihncm91cENvbmZpZz8sIHBhcmVudD8pIHtcclxuICAgICAgICB0aGlzLmdyb3VwTGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91cExheWVyc0xvb2t1cCA9IHt9O1xyXG4gICAgICAgIHRoaXMuZ3JvdXBHcm91cHMgPSBbXTtcclxuICAgICAgICB0aGlzLmdyb3VwR3JvdXBzTG9va3VwID0ge307XHJcbiAgICAgICAgdGhpcy5pdGVtSWRBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGdyb3VwQ29uZmlnID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5ncm91cElkID0gJ3Jvb3QnO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZSA9ICdyb290JztcclxuICAgICAgICAgICAgdGhpcy5hbGxHcm91cExvb2t1cCA9IHtyb290OiB0aGlzfTtcclxuICAgICAgICAgICAgdGhpcy5hbGxHcm91cEFycmF5ID0gW3RoaXNdO1xyXG4gICAgICAgICAgICB0aGlzLmFsbExheWVyQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5hbGxMYXllckxvb2t1cCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyUGFyZW50TG9va3VwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBJZCA9IG1ha2VHdWlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwTmFtZSA9IGdyb3VwQ29uZmlnLmdyb3VwTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSA9IHR5cGVvZiAgZ3JvdXBDb25maWcuY29sbGFwc2UgPT0gJ2Jvb2xlYW4nID8gZ3JvdXBDb25maWcuY29sbGFwc2UgOiBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGVjayA9IHR5cGVvZiAgZ3JvdXBDb25maWcuYWRkQ2hlY2sgPT0gJ2Jvb2xlYW4nID8gZ3JvdXBDb25maWcuYWRkQ2hlY2sgOiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZ3JvdXBDb25maWcgLSBjb25maWd1cmF0aW9uIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwQ29uZmlnLmdyb3VwTmFtZSAtIHRoZSBncm91cCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGdyb3VwQ29uZmlnLmNvbGxhcHNlIGlmIHRoZSBncm91cCBzaG91bGQgYmUgY29sbGFwc2VkIGluaXRpYWxseVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBncm91cENvbmZpZy5hZGRDaGVjayBpZiB0aGUgZ3JvdXAgc2hvdWxkIGhhdmUgYSBjaGVja2JveCBjb250cm9sbGluZyB2aXNpYmlsaXR5IG9mIGFsbCBsYXllcnNcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGF5ZXJHcm91cD59IHBhcmVudHMgcGFyZW50IGdyb3Vwc1xyXG4gICAgICogQHJldHVybnMge0xheWVyR3JvdXB9IHRoZSBsYXllciBncm91cCBqdXN0IGFkZGVkXHJcbiAgICAgKi9cclxuICAgIGFkZEdyb3VwKGdyb3VwQ29uZmlnLCBwYXJlbnRzKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJlbnQgPSAncm9vdCc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0xheWVyR3JvdXB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHBhcmVudEdyb3VwID0gdGhpcy5hbGxHcm91cExvb2t1cFtwYXJlbnRdO1xyXG4gICAgICAgIGxldCBuZXdHcm91cCA9IG5ldyBMYXllckdyb3VwKGdyb3VwQ29uZmlnLCBwYXJlbnRHcm91cCk7XHJcbiAgICAgICAgdGhpcy5hbGxHcm91cExvb2t1cFtuZXdHcm91cC5ncm91cElkXSA9IG5ld0dyb3VwO1xyXG4gICAgICAgIHRoaXMuYWxsR3JvdXBBcnJheS5wdXNoKG5ld0dyb3VwKTtcclxuXHJcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBHcm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBHcm91cHNMb29rdXBbbmV3R3JvdXAuZ3JvdXBJZF0gPSBuZXdHcm91cDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmVudEdyb3VwLml0ZW1JZEFycmF5LmluZGV4T2YobmV3R3JvdXAuZ3JvdXBJZCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyb3VwLmdyb3VwSWQpO1xyXG4gICAgICAgICAgICB0aHJvdyAnbGF5ZXIgYW5kIGdyb3VwIGlkcyBtdXN0IGJlIHVuaXF1ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudEdyb3VwLml0ZW1JZEFycmF5LnB1c2gobmV3R3JvdXAuZ3JvdXBJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdHcm91cDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0xheWVyQmFzZX0gbmV3TGF5ZXIgdGhlIGxheWVyIHRvIGJlIGFkZGVkXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJlbnRzIGFycmF5XHJcbiAgICAgKi9cclxuICAgIGFkZExlZ2VuZExheWVyKG5ld0xheWVyLCBwYXJlbnRzKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJlbnQgPSAncm9vdCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFsbExheWVyTG9va3VwW25ld0xheWVyLmlkXSA9IG5ld0xheWVyO1xyXG4gICAgICAgIHRoaXMuYWxsTGF5ZXJBcnJheS5wdXNoKG5ld0xheWVyKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0xheWVyR3JvdXB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IHBhcmVudEdyb3VwID0gdGhpcy5hbGxHcm91cExvb2t1cFtwYXJlbnRdO1xyXG5cclxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cExheWVycy5wdXNoKG5ld0xheWVyKTtcclxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cExheWVyc0xvb2t1cFtuZXdMYXllci5pZF0gPSBuZXdMYXllcjtcclxuICAgICAgICBpZiAocGFyZW50R3JvdXAuaXRlbUlkQXJyYXkuaW5kZXhPZihuZXdMYXllci5pZCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0xheWVyLmlkKTtcclxuICAgICAgICAgICAgdGhyb3cgJ2xheWVyIGFuZCBncm91cCBpZHMgbXVzdCBiZSB1bmlxdWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJlbnRHcm91cC5pdGVtSWRBcnJheS5wdXNoKG5ld0xheWVyLmlkKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllclBhcmVudExvb2t1cFtuZXdMYXllci5pZF0gPSBwYXJlbnRHcm91cDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVnZW5kSHRtbChsZWdlbmRJZCwgb3B0aW9ucykge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZEh0bWwgPSBgPHVsIGlkPVwiJHtsZWdlbmRJZH1cIiBjbGFzcz1cImxlZ2VuZC1jb250YWluZXJcIj5gO1xyXG5cclxuICAgICAgICBsZWdlbmRIdG1sICs9IGA8bGk+JHtvcHRpb25zLmxlZ2VuZFRpdGxlfTxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkIGlkPVwic3VwcHJlc3MtYnktZXh0ZW50LSR7bGVnZW5kSWR9XCIgY2xhc3M9XCJzdXBwcmVzcy1ieS1leHRlbnRcIj5gICtcclxuICAgICAgICAgICAgYDxsYWJlbCB0aXRsZT1cIlN1cHByZXNzIGxheWVycyBub3QgdmlzaWJsZSBhdCB0aGlzIHpvb20gbGV2ZWxcIiBmb3I9XCJzdXBwcmVzcy1ieS1leHRlbnQtJHtsZWdlbmRJZH1cIj5gICtcclxuICAgICAgICAgICAgYDxzcGFuPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgYDwvbGFiZWw+PC9saT5gO1xyXG5cclxuICAgICAgICBsZWdlbmRIdG1sICs9IHRoaXMuX2J1aWxkTGVnZW5kKHRoaXMuaXRlbUlkQXJyYXksIHRoaXMsIG9wdGlvbnMubGF5ZXJEaXZDbGFzc2VzKSArICc8L3VsPic7XHJcblxyXG4gICAgICAgIHJldHVybiBsZWdlbmRIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gaXRlbUlkcyB0aGUgaXRlbXMgdG8gcHJvY2Vzc1xyXG4gICAgICogQHBhcmFtIHtMYXllckdyb3VwfSB0aGVHcm91cCBuZXcgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtsYXllckRpdkNsYXNzZXM9W11dIG9wdGlvbmFsIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGxheWVyIGRpdnNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGh0bWwgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIF9idWlsZExlZ2VuZChpdGVtSWRzLCB0aGVHcm91cCwgbGF5ZXJEaXZDbGFzc2VzKSB7XHJcblxyXG4gICAgICAgIGlmIChpdGVtSWRzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aGVIbWwgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW1JZHNbMF07XHJcblxyXG4gICAgICAgIGlmICh0aGVHcm91cC5ncm91cExheWVyc0xvb2t1cFtpdGVtSWRdKSB7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHR5cGUge0xheWVyQmFzZX1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxldCBseXIgPSB0aGVHcm91cC5ncm91cExheWVyc0xvb2t1cFtpdGVtSWRdO1xyXG4gICAgICAgICAgICB0aGVIbWwgKz0gYDxsaSBpZD1cIiR7bHlyLmlkfS1sYXllci1saVwiIGNsYXNzPVwibGVnZW5kLWxheWVyLWxpICR7bGF5ZXJEaXZDbGFzc2VzLmpvaW4oJyAnKX1cIj5gICsgbHlyLmdldExlZ2VuZERpdigpICsgJzwvbGk+JztcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhlR3JvdXAuZ3JvdXBHcm91cHNMb29rdXBbaXRlbUlkXSkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogdHlwZSB7TGF5ZXJHcm91cH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxldCBvdGhlckdyb3VwID0gdGhlR3JvdXAuZ3JvdXBHcm91cHNMb29rdXBbaXRlbUlkXTtcclxuXHJcbiAgICAgICAgICAgIHRoZUhtbCArPSBgPGxpPmA7XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSBgPGRpdiBpZD1cIiR7b3RoZXJHcm91cC5ncm91cElkfS1sZWdlbmQtbGF5ZXItZGl2XCIgYCArXHJcbiAgICAgICAgICAgICAgICBgY2xhc3M9XCJsZWdlbmQtbGF5ZXItZ3JvdXAgICR7bGF5ZXJEaXZDbGFzc2VzLmpvaW4oJyAnKX1cIj5gO1xyXG5cclxuICAgICAgICAgICAgaWYgKG90aGVyR3JvdXAuYWRkQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIHRoZUhtbCArPSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQgaWQ9XCIke290aGVyR3JvdXAuZ3JvdXBJZH0tZ3JvdXAtY2hja1wiPmAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA8bGFiZWwgZm9yPVwiJHtvdGhlckdyb3VwLmdyb3VwSWR9LWdyb3VwLWNoY2tcIiB0aXRsZT1cIkNsaWNrIGFycm93IHRvIGV4cGFuZCBvciBjb2xsYXBzZVwiPiR7b3RoZXJHcm91cC5ncm91cE5hbWV9PC9sYWJlbD5gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhlSG1sICs9IGA8bGFiZWwgdGl0bGU9XCJDbGljayBhcnJvdyB0byBleHBhbmQgb3IgY29sbGFwc2VcIj4ke290aGVyR3JvdXAuZ3JvdXBOYW1lfTwvbGFiZWw+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhlSG1sICs9IGA8c3BhbiB0aXRsZT1cIkV4cGFuZC9Db2xsYXBzZVwiIGNsYXNzPVwibGF5ZXItZ3JvdXAtZXhwYW5kZXJgO1xyXG4gICAgICAgICAgICB0aGVIbWwgKz0gYCR7b3RoZXJHcm91cC5jb2xsYXBzZSA/ICcgbGVnZW5kLWxheWVyLWdyb3VwLWluaXRpYWwtY29sbGFwc2UnIDogJyd9XCI+YDtcclxuICAgICAgICAgICAgdGhlSG1sICs9IG90aGVyR3JvdXAuY29sbGFwc2UgPyAnJiM5NjU0OycgOiAnJiM5NjYwOyc7XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSAnPC9zcGFuPic7XHJcblxyXG4gICAgICAgICAgICAvL3BhcmVudHMucHVzaChncm91cElkKTtcclxuICAgICAgICAgICAgdGhlSG1sICs9ICc8dWw+JyArIHRoaXMuX2J1aWxkTGVnZW5kKG90aGVyR3JvdXAuaXRlbUlkQXJyYXksIG90aGVyR3JvdXAsIGxheWVyRGl2Q2xhc3NlcykgKyAnPC91bD4nO1xyXG4gICAgICAgICAgICB0aGVIbWwgKz0gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIHRoZUhtbCArPSAnPC9saT4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoZUhtbCArIHRoaXMuX2J1aWxkTGVnZW5kKGl0ZW1JZHMuc2xpY2UoMSksIHRoZUdyb3VwLCBsYXllckRpdkNsYXNzZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogYSB3cmFwcGVyIHRvIG1ha2UgYSBsZWdlbmRcclxuICovXHJcbmNsYXNzIExheWVyTGVnZW5kIHtcclxuXHJcbiAgICAkZGl2RWxlbWVudDogYW55O1xyXG4gICAgX2xlZ2VuZEl0ZW1zOiBhbnk7XHJcbiAgICBsYXllckdyb3VwOiBhbnk7XHJcbiAgICBsZWdlbmRJZDogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxlZ2VuZEl0ZW1zIGFycmF5IG9mIGxheWVycyBvciBvYmplY3RzIHdpdGgge2dyb3VwTmFtZTogIHtzdHJpbmd9LCBjb2xsYXBzZToge2Jvb2xlYW59LCBhZGRDaGVjazoge2Jvb2xlYW59LCBpdGVtczoge0FycmF5fX1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXZJZCB0aGUgZGl2IHdoZXJlIHRoZSBsZWdlbmQgc2hvdWxkIGJlIGFkZGVkXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBmb3IgbGVnZW5kXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5sYXllckRpdkNsYXNzZXM9W11dIG9wdGlvbmFsIGFycmF5IG9mIGNsYXNzZXMgdG8gYmUgYXBwbGllZCB0byB0aGUgbGF5ZXIgbGVnZW5kIGRpdnMgZm9yIGN1c3RvbSBzdHlsaW5nXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubGVnZW5kVGl0bGU9TGVnZW5kXSB0aGUgbGVnZW5kIHRpdGxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnNjYWxlRGVwZW5kZW50PXRydWVdIGlmIGxlZ2VuZCBkaXNwbGF5IGlzIHNjYWxlIGRlcGVuZGVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihsZWdlbmRJdGVtcywgZGl2SWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBmb3IgKGxldCBpIG9mIGxlZ2VuZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ3VuZGVmaW5lZCBpdGVtIHBhc3NlZCBpbiBhcnJheSB0byBsZWdlbmQgY29uc3RydWN0b3InO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5sZWdlbmRUaXRsZSA9IHR5cGVvZiBvcHRpb25zLmxlZ2VuZFRpdGxlID09ICdzdHJpbmcnID8gb3B0aW9ucy5sZWdlbmRUaXRsZSA6ICdMZWdlbmQnO1xyXG4gICAgICAgIG9wdGlvbnMuc2NhbGVEZXBlbmRlbnQgPSB0eXBlb2Ygb3B0aW9ucy5zY2FsZURlcGVuZGVudCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLnNjYWxlRGVwZW5kZW50IDogdHJ1ZTtcclxuICAgICAgICBvcHRpb25zLmxheWVyRGl2Q2xhc3NlcyA9IG9wdGlvbnMubGF5ZXJEaXZDbGFzc2VzIHx8IFtdO1xyXG5cclxuICAgICAgICAvLyBpZiBsZWdlbmQgZGlzcGxheSBpcyBzY2FsZSBkZXBlbmRlbnQsIG1ha2Ugc3VyZSB0aGUgbWFwTW92ZSBvYmplY3QgaXMgaW5pdGlhbGl6ZWQgZmlyc3RcclxuICAgICAgICBpZiAob3B0aW9ucy5zY2FsZURlcGVuZGVudCkge1xyXG4gICAgICAgICAgICBtYXBNb3ZlLmNoZWNrSW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZGl2RWxlbWVudCA9ICQoJyMnICsgZGl2SWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9sZWdlbmRJdGVtcyA9IGxlZ2VuZEl0ZW1zO1xyXG5cclxuICAgICAgICB0aGlzLmxheWVyR3JvdXAgPSBuZXcgTGF5ZXJHcm91cCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9idWlsZFRyZWUobGVnZW5kSXRlbXMpO1xyXG5cclxuICAgICAgICB0aGlzLmxlZ2VuZElkID0gbWFrZUd1aWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy4kZGl2RWxlbWVudC5hcHBlbmQodGhpcy5sYXllckdyb3VwLmdldExlZ2VuZEh0bWwodGhpcy5sZWdlbmRJZCwgb3B0aW9ucykpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBsIG9mIHRoaXMubGF5ZXJHcm91cC5hbGxMYXllckFycmF5KXtcclxuICAgICAgICAgICAgbC5hcHBseUNvbGxhcHNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vLy8gaWYgbGVnZW5kIGRpc3BsYXkgaXMgc2NhbGUgZGVwZW5kZW50LCBtYWtlIHN1cmUgdGhlIG1hcE1vdmUgb2JqZWN0IGlzIGluaXRpYWxpemVkIGZpcnN0XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2NhbGVEZXBlbmRlbnQpIHtcclxuICAgICAgICAgICAgbWFwTW92ZS5jaGVja0luaXQoKTtcclxuXHJcbiAgICAgICAgICAgIG1hcE1vdmUuYWRkQ2FsbGJhY2soZnVuY3Rpb24gKGV4dCwgem9vbSwgZXZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBldnQgPT0gJ3VuZGVmaW5lZCcgfHwgZXZ0ID09ICdjaGFuZ2U6cmVzb2x1dGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBseXIgb2YgdGhpcy5sYXllckdyb3VwLmFsbExheWVyQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRseXJMaSA9ICQoJyMnICsgbHlyLmlkICsgJy1sYXllci1saScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoem9vbSA+IGx5ci5tYXhab29tIHx8IHpvb20gPCBseXIubWluWm9vbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGx5ckxpLmFkZENsYXNzKCdsYXllci1ub3QtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGx5ckxpLnJlbW92ZUNsYXNzKCdsYXllci1ub3QtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLCAxMDAsIHRydWUsICdsZWdlbmQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyA8ZWRpdG9yLWZvbGQgZGVzYz1cImFkZCBldmVudCBsaXN0ZW5lcnNcIj5cclxuXHJcbiAgICAgICAgdGhpcy4kZGl2RWxlbWVudC5maW5kKFwiLnN1cHByZXNzLWJ5LWV4dGVudFwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgbGVnZW5kTGF5ZXJMaXMgPSAkKCcubGVnZW5kLWxheWVyLWxpJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZExheWVyTGlzLnJlbW92ZUNsYXNzKCdsYXllci1mb3JjZS1zaG93Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmRMYXllckxpcy5hZGRDbGFzcygnbGF5ZXItZm9yY2Utc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50LmZpbmQoJy5sZWdlbmQtY2hlY2snKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgbHlySWQgPSB0aGlzLmlkLnJlcGxhY2UoJy1sZWdlbmQtbGF5ZXItY2hlY2snLCAnJyk7XHJcbiAgICAgICAgICAgIF90aGlzLmxheWVyR3JvdXAuYWxsTGF5ZXJMb29rdXBbbHlySWRdLnZpc2libGUgPSB0aGlzLmNoZWNrZWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGRpdkVsZW1lbnQuZmluZCgnLmxlZ2VuZC1sYXllci1ncm91cCA+IGlucHV0W3R5cGU9Y2hlY2tib3hdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygndWwnKS5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnByb3AoJ2NoZWNrZWQnLCB0aGlzLmNoZWNrZWQpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRkaXZFbGVtZW50LmZpbmQoJy5sYXllci1ncm91cC1leHBhbmRlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2xlZ2VuZC1sYXllci1ncm91cC1pbml0aWFsLWNvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgICAgICAkdGhpcy5zaWJsaW5ncygndWwnKS5zbGlkZVRvZ2dsZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdsZWdlbmQtbGF5ZXItZ3JvdXAtY29sbGFwc2VkJykpe1xyXG4gICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2xlZ2VuZC1sYXllci1ncm91cC1jb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJyYjOTY2MDsnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdsZWdlbmQtbGF5ZXItZ3JvdXAtY29sbGFwc2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5odG1sKCcmIzk2NTQ7Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kZGl2RWxlbWVudC5maW5kKCcubGVnZW5kLWxheWVyLWdyb3VwLWluaXRpYWwtY29sbGFwc2UnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIC8vIDwvZWRpdG9yLWZvbGQ+XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2xlZ2VuZEl0ZW1zPXRoaXMuX2xheWVyQ29uZmlnXSB0aGUgbGVnZW5kIGl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbcGFyZW50cz1bXV0gdGhlIG9yZGVyZWQgbGlzdCBvZiBncm91cHMgaW4gd2hpY2ggdGhpcyBpdGVtIGlzIGEgbWVtYmVyXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfYnVpbGRUcmVlKGxlZ2VuZEl0ZW1zLCBwYXJlbnRzPykge1xyXG5cclxuICAgICAgICBpZiAobGVnZW5kSXRlbXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9uZUl0ZW0gPSBsZWdlbmRJdGVtc1swXTtcclxuXHJcbiAgICAgICAgLy9yZXNldCB0aGUgcGFyZW50IGlmIHRoZSBpdGVtIGlzIGluIHRoZSBiYXNlIGFycmF5XHJcbiAgICAgICAgaWYgKHRoaXMuX2xlZ2VuZEl0ZW1zLmluZGV4T2Yob25lSXRlbSkgPiAtMSB8fCB0eXBlb2YgcGFyZW50cyA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9uZUl0ZW1bJ2dyb3VwTmFtZSddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBJdGVtID0gbGVnZW5kSXRlbXNbMF07XHJcbiAgICAgICAgICAgIGxldCBuZXdHcm91cCA9IHRoaXMubGF5ZXJHcm91cC5hZGRHcm91cChncm91cEl0ZW0sIHBhcmVudHMpO1xyXG4gICAgICAgICAgICBwYXJlbnRzLnB1c2gobmV3R3JvdXAuZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkVHJlZShncm91cEl0ZW0uaXRlbXMsIHBhcmVudHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7TGF5ZXJCYXNlfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGV0IGxheWVySXRlbSA9IGxlZ2VuZEl0ZW1zWzBdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sYXllckdyb3VwLmFkZExlZ2VuZExheWVyKGxheWVySXRlbSwgcGFyZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9idWlsZFRyZWUobGVnZW5kSXRlbXMuc2xpY2UoMSksIHBhcmVudHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubm0uTGF5ZXJMZWdlbmQgPSBMYXllckxlZ2VuZDtcclxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJMZWdlbmQ7XHJcbiJdfQ==