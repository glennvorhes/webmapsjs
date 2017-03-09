"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 9/23/2016.
 */
var quickMap_1 = require("../olHelpers/quickMap");
var LayerEsriMapServer_1 = require("../layers/LayerEsriMapServer");
var LayerLegend_1 = require("../collections/LayerLegend");
var map = quickMap_1.quickMap();
var wisDotRegions = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer');
var sixYearPlan = new LayerEsriMapServer_1.LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/SixYearPlan/MapServer', { name: 'Six Year Plan', legendCollapse: true });
map.addLayer(wisDotRegions.olLayer);
map.addLayer(sixYearPlan.olLayer);
var layerArray = [
    wisDotRegions,
    sixYearPlan
    // tipConfig.tipSegmentLayer,
    // tipConfig.metamanagerSegments,
    // {
    //     groupName: 'ITS Inventory Layers',
    //     collapse: true,
    //     addCheck: false,
    //     items: tipConfig.itsLayerCollection.layers
    // }
];
var legend = new LayerLegend_1.default(layerArray, 'legend-container', {});
//# sourceMappingURL=simple_map.js.map