import $ from '../jquery/jquery';
import LayerBase from './LayerBase';
import mapMove from '../olHelpers/mapMove';
import provide from '../util/provide';
import ol from '../ol/ol';
const nm = provide('layers');

/**
 * The make mapMoveGetParams function takes the extent and the zoom level
 * context is 'this' object, probably want to do something with this.mapMoveParams
 * @callback mapMoveMakeGetParams
 * @param {LayerBaseVector} lyr
 * @param {object} extent
 * @param {number} extent.minX
 * @param {number} extent.minY
 * @param {number} extent.maxX
 * @param {number} extent.maxY
 * @param {number} zoomLevel
 */


/**
 * The Vector layer base
 * @augments LayerBase
 * @abstract
 */
class LayerBaseVector extends LayerBase {

    /**
     * The base vector layer
     * @param {string} url - pass an empty string to prevent default load and add from a json source
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
     * @param {object} [options.style=undefined] the layer style, use openlayers default style if not defined
     * @param {boolean} [options.onDemand=false] if the layer should be loaded by extent on map move
     * @param {number} [options.onDemandDelay=300] delay before the map move callback should be called
     * @param {mapMoveMakeGetParams} [options.mapMoveMakeGetParams=function(lyr, extent, zoomLevel){}] function to create additional map move params
     * @param {MapMoveCls} [options.mapMoveObj=mapMove] alternate map move object for use with multi map pages
     *
     */
    constructor(url, options) {
        super(url, options);

        //prevent regular load if no url has been provided
        if (this.url.trim() == '') {
            this._loaded = true;
        }

        this._style = typeof options.style == 'undefined' ? undefined : options.style;

        if (this.visible) {
            this._autoLoad = true;
        } else {
            this._autoLoad = (typeof options['autoLoad'] == 'boolean' ? options['autoLoad'] : false);
        }

        this._onDemand = typeof options.onDemand == 'boolean' ? options.onDemand : false;
        this._onDemandDelay = typeof options.onDemandDelay == 'number' ? options.onDemandDelay : 300;

        if (options.mapMoveObj){
            this._mapMove = options.mapMoveObj;
        } else {
            this._mapMove = this._onDemand ? mapMove : undefined;
        }

        this._mapMoveMakeGetParams = typeof options.mapMoveMakeGetParams == 'function' ? options.mapMoveMakeGetParams :
            function(lyr, extent, zoomLevel){
                return {};
            };

        if (this._onDemand) {
            this._loaded = true;
            this._mapMoveParams = {};
            this._mapMove.checkInit();
            this._mapMove.addVectorLayer(this);
        }

        this._source = new ol.source.Vector();

        /**
         *
         * @type {ol.layer.Vector|ol.layer.Base}
         */
        this.olLayer = new ol.layer.Vector(
            {
                source: this._source,
                visible: this.visible,
                style: this.style,
                minResolution: this._minResolution,
                maxResolution: this._maxResolution,
                zIndex: this._zIndex
            }
        );
    }

    /**
     * dummy to be overridden
     * @param {object} featureCollection - geojson or esrijson object
     */
    addFeatures(featureCollection) {
        console.log('Layer vector base addFeatures is a placeholder and does nothing');
    }

    /**
     * Before call to map move callback, can prevent call by returning false
     * @param {number} zoom - zoom level
     * @param {string} [evtType=undefined] undefined for initial load, otherwise one of 'change:center', 'change:resolution'
     * @returns {boolean} if the call should proceed
     */
    mapMoveBefore(zoom, evtType) {
        if (this.minZoom !== undefined) {
            if (zoom < this.minZoom) {
                return false;
            }
        }

        if (this.maxZoom !== undefined) {
            if (zoom > this.maxZoom) {
                return false;
            }
        }

        return this.visible;
    }

    /**
     * callback to generate the parameters passed in the get request
     * @param {object} extent - extent object
     * @param {number} extent.minX - minX
     * @param {number} extent.minY - minY
     * @param {number} extent.maxX - maxX
     * @param {number} extent.maxY - maxY
     * @param {number} zoomLevel - zoom level
     */
    mapMoveMakeGetParams(extent, zoomLevel) {
        this._mapMoveParams = {};
        $.extend(this._mapMoveParams, this.params);
        $.extend(this._mapMoveParams, this._mapMoveMakeGetParams(this, extent, zoomLevel));
    }

    /**
     * callback function on map move
     * @param {object} d - the json response
     */
    mapMoveCallback(d) {
        if (this.source) {
            this._source.clear();
        }
    }

    /**
     * clear features in the layer
     */
    clear() {
        if (this._source) {
            this._source.clear();
        }
    }

    /**
     * get on demand delay in miliseconds
     * @type {number|*}
     */
    get onDemandDelay() {
        return this._onDemandDelay;
    }

    /**
     * get if the layer is autoloaded
     * @type {boolean}
     */
    get autoLoad() {
        return this._autoLoad;
    }

    /**
     * get the style definition
     * @type {ol.Style|styleFunc}
     */
    get style() {
        return this._style;
    }

    /**
     * set the style
     * @param {ol.Style|styleFunc} style - the style or function
     */
    set style(style) {
        this._style = style;
        this.olLayer.setStyle(this._style);
    }

    /**
     * get the map CRS if it is defined by the map move object
     * @type {string|*}
     */
    get mapCrs() {
        if (this._mapMove) {
            return this._mapMove.map.getView().getProjection().getCode();
        } else {
            return undefined;
        }
    }

    /**
     * get the map move object
     * @type {MapMoveCls|*}
     */
    get mapMove() {
        return this._mapMove;
    }

    /**
     * map move params
     * @type {object}
     */
    get mapMoveParams() {
        return this._mapMoveParams;
    }

        /**
     * Get the layer visibility
     * @type {boolean}
     */
    get visible() {
        return super.visible;
    }

    /**
     * Set the layer visibility
     * @type {boolean}
     * @override
     */
    set visible(visibility) {
        super.visible = visibility;

        if (this._onDemand) {
            this.mapMove.triggerLyrLoad(this);
        }
    }

    /**
     * get the layer vector source
     * @override
     * @type {ol.source.Vector}
     */
    get source(){
        return super.source;
    }

    /**
     * array of ol features
     * @type {Array.<ol.Feature>}
     */
    get features(){
        return this.source.getFeatures();
    }
}

nm.LayerBaseVector = LayerBaseVector;
export default LayerBaseVector;
