/**
 * Created by gavorhes on 9/23/2016.
 */
import {quickMap} from '../../olHelpers/quickMap';
import {LayerEsriMapServer} from "../../layers/LayerEsriMapServer";
import LayerLegend from '../../collections/LayerLegend';


let map = quickMap();

let wisDotRegions = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer');

let sixYearPlan = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/SixYearPlan/MapServer', {name: 'Six Year Plan', legendCollapse: true});

map.addLayer(wisDotRegions.olLayer);
map.addLayer(sixYearPlan.olLayer);

let layerArray = [
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

let legend = new LayerLegend(layerArray, 'legend-container', {});



