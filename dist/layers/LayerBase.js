"use strict";
var zoomResolutionConvert = require("../olHelpers/zoomResolutionConvert");
var provide_1 = require("../util/provide");
var makeGuid_1 = require("../util/makeGuid");
var $ = require("jquery");
var nm = provide_1.default('layers');
/**
 * The base layer class
 * @abstract
 */
var LayerBase = (function () {
    /**
     * The base layer for all others
     * @param {string} url - url for source
     * @param {object} options - config
     * @param {string} [options.id=makeGuid()] - layer id
     * @param {string} [options.name=Unnamed Layer] - layer name
     * @param {number} [options.opacity=1] - opacity
     * @param {boolean} [options.visible=true] - default visible
     * @param {number} [options.minZoom=undefined] - min zoom level, 0 - 28
     * @param {number} [options.maxZoom=undefined] - max zoom level, 0 - 28
     * @param {object} [options.params={}] - the get parameters to include to retrieve the layer
     * @param {number} [options.zIndex=0] - the z index for the layer
     * @param {function} [options.loadCallback] - function to call on load, context this is the layer object
     * @param {boolean} [options.legendCollapse=false] - if the legend item should be initially collapsed
     * @param {boolean} [options.legendCheckbox=true] - if the legend item should have a checkbox for visibility
     * @param {boolean} [options.legendContent=undefined] - additional content to add to the legend
     */
    function LayerBase(url, options) {
        if (options === void 0) { options = {}; }
        options = options || {};
        if (typeof url !== 'string') {
            throw 'Invalid URL';
        }
        this._url = url;
        this._params = typeof options.params == 'object' ? options.params : {};
        this._legendCollapse = typeof options.legendCollapse == 'boolean' ? options.legendCollapse : false;
        this._legendCheckbox = typeof options.legendCheckbox == 'boolean' ? options.legendCheckbox : true;
        this.id = options.id || makeGuid_1.default();
        this._name = options.name || 'Unnamed Layer';
        this.animate = false;
        this._opacity = typeof options.opacity == 'number' ? options.opacity : 1;
        if (this._opacity > 1) {
            this._opacity = 1;
        }
        else if (this._opacity < 0) {
            this._opacity = 0;
        }
        this._visible = typeof options.visible === 'boolean' ? options.visible : true;
        this._source = undefined;
        /**
         *
         * @protected
         */
        this._olLayer = undefined;
        this._loaded = false;
        this._maxResolution = zoomResolutionConvert.zoomToResolution(options.minZoom);
        if (typeof this._maxResolution !== 'undefined') {
            this._maxResolution += 0.00001;
        }
        this._minResolution = zoomResolutionConvert.zoomToResolution(options.maxZoom);
        this._minZoom = typeof options.minZoom == 'number' ? options.minZoom : undefined;
        this._maxZoom = typeof options.maxZoom == 'number' ? options.maxZoom : undefined;
        this._zIndex = typeof options.zIndex == 'number' ? options.zIndex : 0;
        this.loadCallback = typeof options.loadCallback == 'function' ? options.loadCallback : function () {
        };
        this._legendContent = '';
        if (this._legendCheckbox) {
            this._legendContent += "<input type=\"checkbox\" " + (this.visible ? 'checked' : '') + " " +
                ("class=\"legend-check\" id=\"" + this.id + "-legend-layer-check\"><span></span>");
            this._legendContent += "<label for=\"" + this.id + "-legend-layer-check\" class=\"legend-layer-name\">" + this.name + "</label>";
        }
        else {
            this._legendContent += "<label class=\"legend-layer-name\">" + this.name + "</label>";
        }
        this._$legendDiv = null;
        this._applyCollapseCalled = false;
        this._addLegendContent(typeof options.legendContent === 'string' ? options.legendContent : undefined);
    }
    /**
     * base load function, sets _loaded = true if it is not already
     * @protected
     * @returns {boolean} if already loaded
     */
    LayerBase.prototype._load = function () {
        if (this.loaded == true) {
            return true;
        }
        else {
            this._loaded = true;
            return false;
        }
    };
    /**
     * Get the legend html, be sure to only add to the DOM once
     * @returns {string} html for layer wrapped in a div
     */
    LayerBase.prototype.getLegendDiv = function () {
        return "<div class=\"legend-layer-div\" id=\"" + this.id + "-legend-layer-div\">" + this._legendContent + "</div>";
    };
    /**
     *
     * @param additionalContent - additional content to add to legend
     * @private
     */
    LayerBase.prototype._addLegendContent = function (additionalContent) {
        if (additionalContent === void 0) { additionalContent = ''; }
        var addCollapse = additionalContent.indexOf('<ul>') > -1;
        if (addCollapse) {
            additionalContent = '<span class="legend-items-expander" title="Expand/Collapse">&#9660;</span>' + additionalContent;
        }
        this._legendContent += additionalContent;
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            this._$legendDiv.append(additionalContent);
            this.applyCollapse();
        }
    };
    /**
     * add additional content to the legend
     * @param {string} [additionalContent=] - additonal content to add
     */
    LayerBase.prototype.addLegendContent = function (additionalContent) {
        this._addLegendContent(additionalContent);
    };
    LayerBase.prototype.applyCollapse = function () {
        if (this._applyCollapseCalled) {
            console.log('collapse already applied');
            return undefined;
        }
        this._$legendDiv = $("#" + this.id + "-legend-layer-div");
        if (this._$legendDiv.length > 0) {
            var $expander = this._$legendDiv.find('.legend-items-expander');
            if ($expander.length > 0) {
                this._applyCollapseCalled = true;
                $expander.click(function () {
                    var $this = $(this);
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
                if (this._legendCollapse) {
                    $expander.trigger('click');
                }
            }
        }
    };
    /**
     * trick to refresh the layer
     */
    LayerBase.prototype.refresh = function () {
        if (this.source) {
            this.source.refresh();
        }
    };
    Object.defineProperty(LayerBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            this._id = newId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "animate", {
        get: function () {
            return this._animate;
        },
        set: function (animate) {
            this._animate = animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "legendContent", {
        /**
         * get the legend content
         * @type {string}
         */
        get: function () {
            return this._legendContent;
        },
        /**
         * set the legend content directly
         * @param {string} newVal - new content
         * @protected
         */
        set: function (newVal) {
            this._legendContent = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "params", {
        /**
         * get the map get params
         * @type {object}
         */
        get: function () {
            return this._params;
        },
        /**
         * set the map get params
         * @param {object} newParams - new get params
         * @protected
         */
        set: function (newParams) {
            this._params = newParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minResolution", {
        /**
         * get the minimum resolution
         * @type {number|*}
         */
        get: function () {
            return this._minResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxResolution", {
        /**
         * get the maximum resolution
         * @type {number|*}
         */
        get: function () {
            return this._maxResolution;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "minZoom", {
        /**
         * get min zoom
         * @type {number|*}
         */
        get: function () {
            return this._minZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "maxZoom", {
        /**
         * get max zoom
         * @type {number|*}
         */
        get: function () {
            return this._maxZoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "url", {
        /**
         * get the url
         * @type {string}
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "visible", {
        /**
         * Get the layer visibility
         * @type {boolean}
         */
        get: function () {
            return this._visible;
        },
        /**
         * set the visibility
         * @param visibility
         */
        set: function (visibility) {
            this.setVisible(visibility);
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setVisible = function (visibility) {
        this._visible = visibility;
        if (this.olLayer) {
            this.olLayer.setVisible(this._visible);
            if (visibility && !this._loaded) {
                this._load();
            }
        }
    };
    Object.defineProperty(LayerBase.prototype, "opacity", {
        /**
         * Get the layer opacity
         * @type {number}
         */
        get: function () {
            return this._opacity;
        },
        /**
         * Set the layer opacity
         * @param {number} opacity - layer opacity
         */
        set: function (opacity) {
            this._opacity = opacity;
            if (this.olLayer) {
                this.olLayer.setOpacity(this._opacity);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "name", {
        /**
         * Get the layer name
         * @type {string}
         */
        get: function () {
            return this._name;
        },
        /**
         * set the layer name
         * @param {string} newName - the new name
         */
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "loaded", {
        /**
         * Check if the layer is loaded
         * @type {boolean}
         */
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerBase.prototype, "source", {
        /**
         * get the layer source
         * @type {*}
         */
        get: function () {
            return this.getSource();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getSource = function () {
        return this._source;
    };
    Object.defineProperty(LayerBase.prototype, "zIndex", {
        /**
         * get the z index
         */
        get: function () {
            return this._zIndex;
        },
        /**
         * set the z index
         */
        set: function (newZ) {
            this._zIndex = newZ;
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.setZIndex = function (newZ) {
    };
    Object.defineProperty(LayerBase.prototype, "olLayer", {
        /**
         * the the ol layer
         */
        get: function () {
            return this.getOlLayer();
        },
        enumerable: true,
        configurable: true
    });
    LayerBase.prototype.getOlLayer = function () {
        return this._olLayer;
    };
    return LayerBase;
}());
exports.LayerBase = LayerBase;
nm.LayerBase = LayerBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayerBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXJCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xheWVycy9MYXllckJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUE0RTtBQUM1RSwyQ0FBc0M7QUFFdEMsNkNBQXdDO0FBQ3hDLDBCQUE2QjtBQUU3QixJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBbUI3Qjs7O0dBR0c7QUFDSDtJQTBCSTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILG1CQUFZLEdBQVcsRUFBRSxPQUE4QjtRQUE5Qix3QkFBQSxFQUFBLFlBQThCO1FBQ25ELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBc0IsQ0FBQztRQUU1QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sYUFBYSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUdoQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sT0FBTyxDQUFDLE1BQU0sSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdkUsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLE9BQU8sQ0FBQyxjQUFjLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ25HLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxPQUFPLENBQUMsY0FBYyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUVsRyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksa0JBQVEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxlQUFlLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7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VSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFUyw4QkFBVSxHQUFwQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUF4WkQsSUF3WkM7QUF4WnFCLDhCQUFTO0FBMFovQixFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFDekIsa0JBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgem9vbVJlc29sdXRpb25Db252ZXJ0IGZyb20gJy4uL29sSGVscGVycy96b29tUmVzb2x1dGlvbkNvbnZlcnQnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0IG1ha2VHdWlkIGZyb20gJy4uL3V0aWwvbWFrZUd1aWQnO1xyXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxuY29uc3Qgbm0gPSBwcm92aWRlKCdsYXllcnMnKTtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheWVyQmFzZU9wdGlvbnN7XHJcbiAgICBpZD86IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBvcGFjaXR5PzogbnVtYmVyO1xyXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgICBtaW5ab29tPzogbnVtYmVyO1xyXG4gICAgbWF4Wm9vbT86IG51bWJlcjtcclxuICAgIHBhcmFtcz86IGFueTtcclxuICAgIHpJbmRleD86IG51bWJlcjtcclxuICAgIGxvYWRDYWxsYmFjaz86IEZ1bmN0aW9uO1xyXG4gICAgbGVnZW5kQ29sbGFwc2U/OiBib29sZWFuO1xyXG4gICAgbGVnZW5kQ2hlY2tib3g/OiBib29sZWFuO1xyXG4gICAgbGVnZW5kQ29udGVudD86IHN0cmluZztcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBsYXllciBjbGFzc1xyXG4gKiBAYWJzdHJhY3RcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllckJhc2Uge1xyXG5cclxuICAgIHByb3RlY3RlZCBfbGVnZW5kQ2hlY2tib3g6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX3VybDogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9vcGFjaXR5OiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX21pblpvb206IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfbWF4Wm9vbTogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIF92aXNpYmxlOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9sb2FkZWQ6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX3pJbmRleDogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIF9sZWdlbmRDb250ZW50OiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX3BhcmFtczogYW55O1xyXG4gICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX3NvdXJjZTogb2wuc291cmNlLlNvdXJjZTtcclxuICAgIHByb3RlY3RlZCBfYW5pbWF0ZTogYm9vbGVhbjtcclxuICAgIHByb3RlY3RlZCBfbGVnZW5kQ29sbGFwc2U6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX21heFJlc29sdXRpb246IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfbWluUmVzb2x1dGlvbjogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICBfJGxlZ2VuZERpdjogSlF1ZXJ5O1xyXG4gICAgbG9hZENhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIHByb3RlY3RlZCBfb2xMYXllcjogb2wubGF5ZXIuTGF5ZXI7XHJcbiAgICBwcm90ZWN0ZWQgX2FwcGx5Q29sbGFwc2VDYWxsZWQ6IGJvb2xlYW47XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGxheWVyIGZvciBhbGwgb3RoZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdXJsIGZvciBzb3VyY2VcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gY29uZmlnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuaWQ9bWFrZUd1aWQoKV0gLSBsYXllciBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLm5hbWU9VW5uYW1lZCBMYXllcl0gLSBsYXllciBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMub3BhY2l0eT0xXSAtIG9wYWNpdHlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmlzaWJsZT10cnVlXSAtIGRlZmF1bHQgdmlzaWJsZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1pblpvb209dW5kZWZpbmVkXSAtIG1pbiB6b29tIGxldmVsLCAwIC0gMjhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gLSBtYXggem9vbSBsZXZlbCwgMCAtIDI4XHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucGFyYW1zPXt9XSAtIHRoZSBnZXQgcGFyYW1ldGVycyB0byBpbmNsdWRlIHRvIHJldHJpZXZlIHRoZSBsYXllclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnpJbmRleD0wXSAtIHRoZSB6IGluZGV4IGZvciB0aGUgbGF5ZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmxvYWRDYWxsYmFja10gLSBmdW5jdGlvbiB0byBjYWxsIG9uIGxvYWQsIGNvbnRleHQgdGhpcyBpcyB0aGUgbGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbGxhcHNlPWZhbHNlXSAtIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgYmUgaW5pdGlhbGx5IGNvbGxhcHNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWdlbmRDaGVja2JveD10cnVlXSAtIGlmIHRoZSBsZWdlbmQgaXRlbSBzaG91bGQgaGF2ZSBhIGNoZWNrYm94IGZvciB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlZ2VuZENvbnRlbnQ9dW5kZWZpbmVkXSAtIGFkZGl0aW9uYWwgY29udGVudCB0byBhZGQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgb3B0aW9uczogTGF5ZXJCYXNlT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge30gYXMgTGF5ZXJCYXNlT3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIFVSTCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BhcmFtcyA9IHR5cGVvZiBvcHRpb25zLnBhcmFtcyA9PSAnb2JqZWN0JyA/IG9wdGlvbnMucGFyYW1zIDoge307XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29sbGFwc2UgPSB0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDb2xsYXBzZSA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmxlZ2VuZENvbGxhcHNlIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ2hlY2tib3ggPSB0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDaGVja2JveCA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmxlZ2VuZENoZWNrYm94IDogdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQgfHwgbWFrZUd1aWQoKTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5uYW1lIHx8ICdVbm5hbWVkIExheWVyJztcclxuICAgICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gdHlwZW9mIG9wdGlvbnMub3BhY2l0eSA9PSAnbnVtYmVyJyA/IG9wdGlvbnMub3BhY2l0eSA6IDE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcGFjaXR5ID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX29wYWNpdHkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHR5cGVvZiBvcHRpb25zLnZpc2libGUgPT09ICdib29sZWFuJyA/IG9wdGlvbnMudmlzaWJsZSA6IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fb2xMYXllciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWF4UmVzb2x1dGlvbiA9IHpvb21SZXNvbHV0aW9uQ29udmVydC56b29tVG9SZXNvbHV0aW9uKG9wdGlvbnMubWluWm9vbSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhSZXNvbHV0aW9uICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhSZXNvbHV0aW9uICs9IDAuMDAwMDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21pblJlc29sdXRpb24gPSB6b29tUmVzb2x1dGlvbkNvbnZlcnQuem9vbVRvUmVzb2x1dGlvbihvcHRpb25zLm1heFpvb20pO1xyXG5cclxuICAgICAgICB0aGlzLl9taW5ab29tID0gdHlwZW9mIG9wdGlvbnMubWluWm9vbSA9PSAnbnVtYmVyJyA/IG9wdGlvbnMubWluWm9vbSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9tYXhab29tID0gdHlwZW9mIG9wdGlvbnMubWF4Wm9vbSA9PSAnbnVtYmVyJyA/IG9wdGlvbnMubWF4Wm9vbSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl96SW5kZXggPSB0eXBlb2Ygb3B0aW9ucy56SW5kZXggPT0gJ251bWJlcicgPyBvcHRpb25zLnpJbmRleCA6IDA7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZENhbGxiYWNrID0gdHlwZW9mIG9wdGlvbnMubG9hZENhbGxiYWNrID09ICdmdW5jdGlvbicgPyBvcHRpb25zLmxvYWRDYWxsYmFjayA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGVudCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGVnZW5kQ29udGVudCArPSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICR7dGhpcy52aXNpYmxlID8gJ2NoZWNrZWQnIDogJyd9IGAgK1xyXG4gICAgICAgICAgICAgICAgYGNsYXNzPVwibGVnZW5kLWNoZWNrXCIgaWQ9XCIke3RoaXMuaWR9LWxlZ2VuZC1sYXllci1jaGVja1wiPjxzcGFuPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICB0aGlzLl9sZWdlbmRDb250ZW50ICs9IGA8bGFiZWwgZm9yPVwiJHt0aGlzLmlkfS1sZWdlbmQtbGF5ZXItY2hlY2tcIiBjbGFzcz1cImxlZ2VuZC1sYXllci1uYW1lXCI+JHt0aGlzLm5hbWV9PC9sYWJlbD5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlZ2VuZENvbnRlbnQgKz0gYDxsYWJlbCBjbGFzcz1cImxlZ2VuZC1sYXllci1uYW1lXCI+JHt0aGlzLm5hbWV9PC9sYWJlbD5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fJGxlZ2VuZERpdiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlDb2xsYXBzZUNhbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FkZExlZ2VuZENvbnRlbnQodHlwZW9mIG9wdGlvbnMubGVnZW5kQ29udGVudCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmxlZ2VuZENvbnRlbnQgOiB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYmFzZSBsb2FkIGZ1bmN0aW9uLCBzZXRzIF9sb2FkZWQgPSB0cnVlIGlmIGl0IGlzIG5vdCBhbHJlYWR5XHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaWYgYWxyZWFkeSBsb2FkZWRcclxuICAgICAqL1xyXG4gICAgX2xvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGxlZ2VuZCBodG1sLCBiZSBzdXJlIHRvIG9ubHkgYWRkIHRvIHRoZSBET00gb25jZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaHRtbCBmb3IgbGF5ZXIgd3JhcHBlZCBpbiBhIGRpdlxyXG4gICAgICovXHJcbiAgICBnZXRMZWdlbmREaXYoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGVnZW5kLWxheWVyLWRpdlwiIGlkPVwiJHt0aGlzLmlkfS1sZWdlbmQtbGF5ZXItZGl2XCI+JHt0aGlzLl9sZWdlbmRDb250ZW50fTwvZGl2PmA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGFkZGl0aW9uYWxDb250ZW50IC0gYWRkaXRpb25hbCBjb250ZW50IHRvIGFkZCB0byBsZWdlbmRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9hZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50PScnKSB7XHJcblxyXG4gICAgICAgIGxldCBhZGRDb2xsYXBzZSA9IGFkZGl0aW9uYWxDb250ZW50LmluZGV4T2YoJzx1bD4nKSA+IC0xO1xyXG5cclxuICAgICAgICBpZiAoYWRkQ29sbGFwc2UpIHtcclxuICAgICAgICAgICAgYWRkaXRpb25hbENvbnRlbnQgPSAnPHNwYW4gY2xhc3M9XCJsZWdlbmQtaXRlbXMtZXhwYW5kZXJcIiB0aXRsZT1cIkV4cGFuZC9Db2xsYXBzZVwiPiYjOTY2MDs8L3NwYW4+JyArIGFkZGl0aW9uYWxDb250ZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGVnZW5kQ29udGVudCArPSBhZGRpdGlvbmFsQ29udGVudDtcclxuXHJcbiAgICAgICAgdGhpcy5fJGxlZ2VuZERpdiA9ICQoYCMke3RoaXMuaWR9LWxlZ2VuZC1sYXllci1kaXZgKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuXyRsZWdlbmREaXYubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl8kbGVnZW5kRGl2LmFwcGVuZChhZGRpdGlvbmFsQ29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xsYXBzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZCBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gdGhlIGxlZ2VuZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFthZGRpdGlvbmFsQ29udGVudD1dIC0gYWRkaXRvbmFsIGNvbnRlbnQgdG8gYWRkXHJcbiAgICAgKi9cclxuICAgIGFkZExlZ2VuZENvbnRlbnQoYWRkaXRpb25hbENvbnRlbnQpIHtcclxuICAgICAgICB0aGlzLl9hZGRMZWdlbmRDb250ZW50KGFkZGl0aW9uYWxDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUNvbGxhcHNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcHBseUNvbGxhcHNlQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb2xsYXBzZSBhbHJlYWR5IGFwcGxpZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl8kbGVnZW5kRGl2ID0gJChgIyR7dGhpcy5pZH0tbGVnZW5kLWxheWVyLWRpdmApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fJGxlZ2VuZERpdi5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGV4cGFuZGVyID0gdGhpcy5fJGxlZ2VuZERpdi5maW5kKCcubGVnZW5kLWl0ZW1zLWV4cGFuZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGV4cGFuZGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5Q29sbGFwc2VDYWxsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRleHBhbmRlci5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuc2libGluZ3MoJ3VsJykuc2xpZGVUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdsZWdlbmQtbGF5ZXItZ3JvdXAtY29sbGFwc2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2xlZ2VuZC1sYXllci1ncm91cC1jb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuaHRtbCgnJiM5NjYwOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdsZWdlbmQtbGF5ZXItZ3JvdXAtY29sbGFwc2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmh0bWwoJyYjOTY1NDsnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGVnZW5kQ29sbGFwc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZXhwYW5kZXIudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyaWNrIHRvIHJlZnJlc2ggdGhlIGxheWVyXHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlkKCk6IHN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGlkKG5ld0lkOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuX2lkID0gbmV3SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuaW1hdGUoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYW5pbWF0ZShhbmltYXRlOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9hbmltYXRlID0gYW5pbWF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgbGVnZW5kIGNvbnRlbnRcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBsZWdlbmRDb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZWdlbmRDb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSBsZWdlbmQgY29udGVudCBkaXJlY3RseVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1ZhbCAtIG5ldyBjb250ZW50XHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHNldCBsZWdlbmRDb250ZW50KG5ld1ZhbCkge1xyXG4gICAgICAgIHRoaXMuX2xlZ2VuZENvbnRlbnQgPSBuZXdWYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG1hcCBnZXQgcGFyYW1zXHJcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXQgcGFyYW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIG1hcCBnZXQgcGFyYW1zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV3UGFyYW1zIC0gbmV3IGdldCBwYXJhbXNcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgc2V0IHBhcmFtcyhuZXdQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLl9wYXJhbXMgPSBuZXdQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIG1pbmltdW0gcmVzb2x1dGlvblxyXG4gICAgICogQHR5cGUge251bWJlcnwqfVxyXG4gICAgICovXHJcbiAgICBnZXQgbWluUmVzb2x1dGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluUmVzb2x1dGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldCB0aGUgbWF4aW11bSByZXNvbHV0aW9uXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfCp9XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhSZXNvbHV0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhSZXNvbHV0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG1pbiB6b29tXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfCp9XHJcbiAgICAgKi9cclxuICAgIGdldCBtaW5ab29tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5ab29tO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG1heCB6b29tXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfCp9XHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhab29tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhab29tO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSB1cmxcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCB1cmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbGF5ZXIgdmlzaWJpbGl0eVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0gdmlzaWJpbGl0eVxyXG4gICAgICovXHJcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmlsaXR5OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlKHZpc2liaWxpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzZXRWaXNpYmxlKHZpc2liaWxpdHk6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJpbGl0eTtcclxuICAgICAgICBpZiAodGhpcy5vbExheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2xMYXllci5zZXRWaXNpYmxlKHRoaXMuX3Zpc2libGUpO1xyXG4gICAgICAgICAgICBpZiAodmlzaWJpbGl0eSAmJiAhdGhpcy5fbG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBsYXllciBvcGFjaXR5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgb3BhY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbGF5ZXIgb3BhY2l0eVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHkgLSBsYXllciBvcGFjaXR5XHJcbiAgICAgKi9cclxuICAgIHNldCBvcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICBpZiAodGhpcy5vbExheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2xMYXllci5zZXRPcGFjaXR5KHRoaXMuX29wYWNpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbGF5ZXIgbmFtZVxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0IG5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdGhlIGxheWVyIG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdOYW1lIC0gdGhlIG5ldyBuYW1lXHJcbiAgICAgKi9cclxuICAgIHNldCBuYW1lKG5ld05hbWUpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBsYXllciBpcyBsb2FkZWRcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBnZXQgbG9hZGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGhlIGxheWVyIHNvdXJjZVxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKi9cclxuICAgIGdldCBzb3VyY2UoKTogb2wuc291cmNlLlNvdXJjZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291cmNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRTb3VyY2UoKTogb2wuc291cmNlLlNvdXJjZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRoZSB6IGluZGV4XHJcbiAgICAgKi9cclxuICAgIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fekluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHRoZSB6IGluZGV4XHJcbiAgICAgKi9cclxuICAgIHNldCB6SW5kZXgobmV3WjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fekluZGV4ID0gbmV3WjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0WkluZGV4KG5ld1o6IG51bWJlcil7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHRoZSBvbCBsYXllclxyXG4gICAgICovXHJcbiAgICBnZXQgb2xMYXllcigpOiBvbC5sYXllci5MYXllciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2xMYXllcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRPbExheWVyKCk6IG9sLmxheWVyLkxheWVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vbExheWVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5MYXllckJhc2UgPSBMYXllckJhc2U7XHJcbmV4cG9ydCBkZWZhdWx0IExheWVyQmFzZTtcclxuIl19