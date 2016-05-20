(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../jquery', '../util/provide', '../util/makeGuid', '../olHelpers/mapMove'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../jquery'), require('../util/provide'), require('../util/makeGuid'), require('../olHelpers/mapMove'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.jquery, global.provide, global.makeGuid, global.mapMove);
        global.LayerLegend = mod.exports;
    }
})(this, function (module, exports, _jquery, _provide, _makeGuid, _mapMove) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _provide2 = _interopRequireDefault(_provide);

    var _makeGuid2 = _interopRequireDefault(_makeGuid);

    var _mapMove2 = _interopRequireDefault(_mapMove);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var nm = (0, _provide2.default)('collections');

    var LayerGroup = function () {

        /**
         *
         * @param {object} [groupConfig={}] - group configuration object
         * @param {string} groupConfig.groupName - the group name
         * @param {boolean} [groupConfig.collapse=false] - if the group should be collapsed initially
         * @param {boolean} [groupConfig.addCheck=true] - if the group should have a checkbox controlling visibility of all layers
         * @param {LayerGroup} [parent=undefined] - the parent group
         */

        function LayerGroup(groupConfig, parent) {
            _classCallCheck(this, LayerGroup);

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
            } else {
                this.groupId = (0, _makeGuid2.default)();
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


        _createClass(LayerGroup, [{
            key: 'addGroup',
            value: function addGroup(groupConfig, parents) {
                var parent = void 0;
                if (parents.length > 0) {
                    parent = parents[parents.length - 1];
                } else {
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
            }
        }, {
            key: 'addLegendLayer',
            value: function addLegendLayer(newLayer, parents) {
                var parent = void 0;
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
                var parentGroup = this.allGroupLookup[parent];

                parentGroup.groupLayers.push(newLayer);
                parentGroup.groupLayersLookup[newLayer.id] = newLayer;
                if (parentGroup.itemIdArray.indexOf(newLayer.id) > 0) {
                    console.log(newLayer.id);
                    throw 'layer and group ids must be unique';
                }
                parentGroup.itemIdArray.push(newLayer.id);

                this.layerParentLookup[newLayer.id] = parentGroup;
            }
        }, {
            key: 'getLegendHtml',
            value: function getLegendHtml(legendId, options) {

                var legendHtml = '<ul id="' + legendId + '" class="legend-container">';

                legendHtml += '<li>' + options.legendTitle + '<input type="checkbox" checked id="suppress-by-extent-' + legendId + '" class="suppress-by-extent">' + ('<label title="Suppress layers not visible at this zoom level" for="suppress-by-extent-' + legendId + '">') + '<span></span>' + '</label></li>';

                legendHtml += this._buildLegend(this.itemIdArray, this, options.layerDivClasses) + '</ul>';

                return legendHtml;
            }
        }, {
            key: '_buildLegend',
            value: function _buildLegend(itemIds, theGroup, layerDivClasses) {

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
                    theHml += '<li id="' + lyr.id + '-layer-li" class="legend-layer-li ' + layerDivClasses.join(' ') + '">' + lyr.getLegendDiv() + '</li>';
                } else if (theGroup.groupGroupsLookup[itemId]) {
                    /**
                     * type {LayerGroup}
                     */
                    var otherGroup = theGroup.groupGroupsLookup[itemId];

                    theHml += '<li>';
                    theHml += '<div id="' + otherGroup.groupId + '-legend-layer-div" ' + ('class="legend-layer-group  ' + layerDivClasses.join(' ') + '">');

                    if (otherGroup.addCheck) {
                        theHml += '<input type="checkbox" checked id="' + otherGroup.groupId + '-group-chck">' + ('<label for="' + otherGroup.groupId + '-group-chck" title="Click arrow to expand or collapse">' + otherGroup.groupName + '</label>');
                    } else {
                        theHml += '<label title="Click arrow to expand or collapse">' + otherGroup.groupName + '</label>';
                    }

                    theHml += '<span title="Expand/Collapse" class="layer-group-expander';
                    theHml += (otherGroup.collapse ? ' legend-layer-group-initial-collapse' : '') + '">';
                    theHml += otherGroup.collapse ? '&#9654;' : '&#9660;';
                    theHml += '</span>';

                    //parents.push(groupId);
                    theHml += '<ul>' + this._buildLegend(otherGroup.itemIdArray, otherGroup, layerDivClasses) + '</ul>';
                    theHml += '</div>';
                    theHml += '</li>';
                }

                return theHml + this._buildLegend(itemIds.slice(1), theGroup, layerDivClasses);
            }
        }]);

        return LayerGroup;
    }();

    var LayerLegend = function () {

        /**
         *
         * @param {Array} legendItems array of layers or objects with {groupName:  {string}, collapse: {boolean}, addCheck: {boolean}, items: {Array}}
         * @param {string} divId the div where the legend should be added
         * @param {object} options for legend
         * @param {Array} [options.layerDivClasses=[]] optional array of classes to be applied to the layer legend divs for custom styling
         * @param {string} [options.legendTitle=Legend] the legend title
         * @param {bool} [options.scaleDependent=true] if legend display is scale dependent
         */

        function LayerLegend(legendItems, divId, options) {
            _classCallCheck(this, LayerLegend);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = legendItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (typeof i == 'undefined') {
                        throw 'undefined item passed in array to legend constructor';
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            options = options || {};

            options.legendTitle = typeof options.legendTitle == 'string' ? options.legendTitle : 'Legend';
            options.scaleDependent = typeof options.scaleDependent == 'boolean' ? options.scaleDependent : true;
            options.layerDivClasses = options.layerDivClasses || [];

            // if legend display is scale dependent, make sure the mapMove object is initialized first
            if (options.scaleDependent) {
                _mapMove2.default.checkInit();
            }

            this.$divElement = (0, _jquery2.default)('#' + divId);

            this._legendItems = legendItems;

            this.layerGroup = new LayerGroup();

            this._buildTree(legendItems);

            this.legendId = (0, _makeGuid2.default)();

            this.$divElement.append(this.layerGroup.getLegendHtml(this.legendId, options));

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.layerGroup.allLayerArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var l = _step2.value;

                    l.applyCollapse();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var _this = this;

            //// if legend display is scale dependent, make sure the mapMove object is initialized first
            if (options.scaleDependent) {
                _mapMove2.default.checkInit();

                _mapMove2.default.addCallback(function (ext, zoom, evt) {
                    if (typeof evt == 'undefined' || evt == 'change:resolution') {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = this.layerGroup.allLayerArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var lyr = _step3.value;

                                var $lyrLi = (0, _jquery2.default)('#' + lyr.id + '-layer-li');
                                if (zoom > lyr.maxZoom || zoom < lyr.minZoom) {
                                    $lyrLi.addClass('layer-not-visible');
                                } else {
                                    $lyrLi.removeClass('layer-not-visible');
                                }
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    }
                }, this, 100, true, 'legend1');
            }

            // <editor-fold desc="add event listeners">

            this.$divElement.find(".suppress-by-extent").change(function () {
                var legendLayerLis = (0, _jquery2.default)('.legend-layer-li');
                if (this.checked) {
                    legendLayerLis.removeClass('layer-force-show');
                } else {
                    legendLayerLis.addClass('layer-force-show');
                }
            });

            this.$divElement.find('.legend-check').change(function () {
                var lyrId = this.id.replace('-legend-layer-check', '');
                _this.layerGroup.allLayerLookup[lyrId].visible = this.checked;
            });

            this.$divElement.find('.legend-layer-group > input[type=checkbox]').change(function () {
                (0, _jquery2.default)(this).siblings('ul').find('input[type=checkbox]').prop('checked', this.checked).trigger('change');
            });

            this.$divElement.find('.layer-group-expander').click(function () {
                var $this = (0, _jquery2.default)(this);
                $this.removeClass('legend-layer-group-initial-collapse');

                $this.siblings('ul').slideToggle();

                if ($this.hasClass('legend-layer-group-collapsed')) {
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


        _createClass(LayerLegend, [{
            key: '_buildTree',
            value: function _buildTree(legendItems, parents) {

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
                } else {
                    /**
                     * @type {LayerBase}
                     */
                    var layerItem = legendItems[0];

                    this.layerGroup.addLegendLayer(layerItem, parents);
                }

                this._buildTree(legendItems.slice(1), parents);
            }
        }, {
            key: 'showAll',
            set: function set(val) {}
        }]);

        return LayerLegend;
    }();

    nm.LayerLegend = LayerLegend;
    exports.default = LayerLegend;
    module.exports = exports['default'];
});