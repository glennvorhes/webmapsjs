/**
 * Created by gavorhes on 12/16/2015.
 */
import $ from '../jquery/jquery';
import provide from '../util/provide';
import makeGuid from '../util/makeGuid';
import mapMove from '../olHelpers/mapMove';
let nm = provide('collections');

class LayerGroup {

    /**
     *
     * @param {object} [groupConfig={}] - group configuration object
     * @param {string} groupConfig.groupName - the group name
     * @param {boolean} [groupConfig.collapse=false] - if the group should be collapsed initially
     * @param {boolean} [groupConfig.addCheck=true] - if the group should have a checkbox controlling visibility of all layers
     * @param {LayerGroup} [parent=undefined] - the parent group
     */
    constructor(groupConfig, parent) {
        this.groupLayers = [];
        this.groupLayersLookup = {};
        this.groupGroups = [];
        this.groupGroupsLookup = {};
        this.itemIdArray = [];

        if (typeof groupConfig == 'undefined') {
            this.parent = null;
            this.groupId = 'root';
            this.groupName = 'root';
            this.allGroupLookup = {root: this};
            this.allGroupArray = [this];
            this.allLayerArray = [];
            this.allLayerLookup = {};
            this.layerParentLookup = {};
            this.collapse = false;
            this.addCheck = false;
        } else {
            this.groupId = makeGuid();
            this.parent = parent;
            this.groupName = groupConfig.groupName;
            this.collapse = typeof  groupConfig.collapse == 'boolean' ? groupConfig.collapse : false;
            this.addCheck = typeof  groupConfig.addCheck == 'boolean' ? groupConfig.addCheck : true;
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
    addGroup(groupConfig, parents) {
        let parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        } else {
            parent = 'root';
        }


        /**
         * @type {LayerGroup}
         */
        let parentGroup = this.allGroupLookup[parent];
        let newGroup = new LayerGroup(groupConfig, parentGroup);
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
    }

    /**
     *
     * @param {LayerBase} newLayer the layer to be added
     * @param {Array} parents array
     */
    addLegendLayer(newLayer, parents) {
        let parent;
        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        } else {
            parent = 'root';
        }

        this.allLayerLookup[newLayer.id] = newLayer;
        this.allLayerArray.push(newLayer);

        /**
         * @type {LayerGroup}
         */
        let parentGroup = this.allGroupLookup[parent];

        parentGroup.groupLayers.push(newLayer);
        parentGroup.groupLayersLookup[newLayer.id] = newLayer;
        if (parentGroup.itemIdArray.indexOf(newLayer.id) > 0) {
            console.log(newLayer.id);
            throw 'layer and group ids must be unique';
        }
        parentGroup.itemIdArray.push(newLayer.id);

        this.layerParentLookup[newLayer.id] = parentGroup;

    }

    getLegendHtml(legendId, options) {


        let legendHtml = `<ul id="${legendId}" class="legend-container">`;

        legendHtml += `<li>${options.legendTitle}<input type="checkbox" checked id="suppress-by-extent-${legendId}" class="suppress-by-extent">` +
            `<label title="Suppress layers not visible at this zoom level" for="suppress-by-extent-${legendId}">` +
            `<span></span>` +
            `</label></li>`;

        legendHtml += this._buildLegend(this.itemIdArray, this, options.layerDivClasses) + '</ul>';

        return legendHtml;
    }

    /**
     * @param {Array} itemIds the items to process
     * @param {LayerGroup} theGroup new group
     * @param {Array} [layerDivClasses=[]] optional classes to apply to the layer divs
     * @static
     * @returns {string} html string
     */
    _buildLegend(itemIds, theGroup, layerDivClasses) {

        if (itemIds.length == 0) {
            return '';
        }

        let theHml = '';

        let itemId = itemIds[0];

        if (theGroup.groupLayersLookup[itemId]) {

            /**
             * @type {LayerBase}
             */
            let lyr = theGroup.groupLayersLookup[itemId];
            theHml += `<li id="${lyr.id}-layer-li" class="legend-layer-li ${layerDivClasses.join(' ')}">` + lyr.getLegendDiv() + '</li>';


        } else if (theGroup.groupGroupsLookup[itemId]) {
            /**
             * type {LayerGroup}
             */
            let otherGroup = theGroup.groupGroupsLookup[itemId];

            theHml += `<li>`;
            theHml += `<div id="${otherGroup.groupId}-legend-layer-div" ` +
                `class="legend-layer-group  ${layerDivClasses.join(' ')}">`;

            if (otherGroup.addCheck) {
                theHml += `<input type="checkbox" checked id="${otherGroup.groupId}-group-chck">` +
                    `<label for="${otherGroup.groupId}-group-chck" title="Click arrow to expand or collapse">${otherGroup.groupName}</label>`;
            } else {
                theHml += `<label title="Click arrow to expand or collapse">${otherGroup.groupName}</label>`;
            }

            theHml += `<span title="Expand/Collapse" class="layer-group-expander`;
            theHml += `${otherGroup.collapse ? ' legend-layer-group-initial-collapse' : ''}">`;
            theHml += otherGroup.collapse ? '&#9654;' : '&#9660;';
            theHml += '</span>';

            //parents.push(groupId);
            theHml += '<ul>' + this._buildLegend(otherGroup.itemIdArray, otherGroup, layerDivClasses) + '</ul>';
            theHml += '</div>';
            theHml += '</li>';
        }

        return theHml + this._buildLegend(itemIds.slice(1), theGroup, layerDivClasses);
    }
}

/**
 * a wrapper to make a legend
 */
class LayerLegend {

    /**
     *
     * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
     * @param {string} divId the div where the legend should be added
     * @param {object} options for legend
     * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
     * @param {string} [options.legendTitle=Legend] the legend title
     * @param {bool} [options.scaleDependent=true] if legend display is scale dependent
     */
    constructor(legendItems, divId, options) {
        for (let i of legendItems) {
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
            mapMove.checkInit();
        }

        this.$divElement = $('#' + divId);

        this._legendItems = legendItems;

        this.layerGroup = new LayerGroup();

        this._buildTree(legendItems);

        this.legendId = makeGuid();

        this.$divElement.append(this.layerGroup.getLegendHtml(this.legendId, options));

        for (let l of this.layerGroup.allLayerArray){
            l.applyCollapse();
        }

        let _this = this;

        //// if legend display is scale dependent, make sure the mapMove object is initialized first
        if (options.scaleDependent) {
            mapMove.checkInit();

            mapMove.addCallback(function (ext, zoom, evt) {
                if (typeof evt == 'undefined' || evt == 'change:resolution') {
                    for (let lyr of this.layerGroup.allLayerArray) {
                        let $lyrLi = $('#' + lyr.id + '-layer-li');
                        if (zoom > lyr.maxZoom || zoom < lyr.minZoom) {
                            $lyrLi.addClass('layer-not-visible');
                        } else {
                            $lyrLi.removeClass('layer-not-visible');
                        }
                    }
                }
            }, this, 100, true, 'legend1');
        }

        // <editor-fold desc="add event listeners">

        this.$divElement.find(".suppress-by-extent").change(function () {
            let legendLayerLis = $('.legend-layer-li');
            if (this.checked) {
                legendLayerLis.removeClass('layer-force-show');
            } else {
                legendLayerLis.addClass('layer-force-show');
            }
        });


        this.$divElement.find('.legend-check').change(function () {
            let lyrId = this.id.replace('-legend-layer-check', '');
            _this.layerGroup.allLayerLookup[lyrId].visible = this.checked;
        });

        this.$divElement.find('.legend-layer-group > input[type=checkbox]').change(function () {
            $(this).siblings('ul').find('input[type=checkbox]').prop('checked', this.checked).trigger('change');
        });

        this.$divElement.find('.layer-group-expander').click(function () {
            let $this = $(this);
            $this.removeClass('legend-layer-group-initial-collapse');

            $this.siblings('ul').slideToggle();

            if ($this.hasClass('legend-layer-group-collapsed')){
                $this.removeClass('legend-layer-group-collapsed');
                $this.html('&#9660;');
            } else {
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
    _buildTree(legendItems, parents) {

        if (legendItems.length == 0) {
            return;
        }

        let oneItem = legendItems[0];

        //reset the parent if the item is in the base array
        if (this._legendItems.indexOf(oneItem) > -1 || typeof parents == 'undefined') {
            parents = [];
        }

        if (typeof oneItem['groupName'] !== 'undefined') {
            let groupItem = legendItems[0];
            let newGroup = this.layerGroup.addGroup(groupItem, parents);
            parents.push(newGroup.groupId);
            this._buildTree(groupItem.items, parents);
        } else {
            /**
             * @type {LayerBase}
             */
            let layerItem = legendItems[0];

            this.layerGroup.addLegendLayer(layerItem, parents);
        }

        this._buildTree(legendItems.slice(1), parents);
    }

    set showAll(val) {

    }
}

nm.LayerLegend = LayerLegend;
export default LayerLegend;
