/**
 * Created by gavorhes on 6/1/2016.
 */
import {quickMap} from '../../src/olHelpers/quickMap';
import LayerSwipe from '../../src/olHelpers/layerSwipe';
import {LayerEsriMapServer} from '../../src/layers/LayerEsriMapServer';

let map = quickMap();


let swiper = new LayerSwipe(map);


let wisDotRegions = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
    {
        minZoom: 6,
        maxZoom: 12,
        name: 'WisDOT Regions'
    });

let metamanagerSegments = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
    {
        minZoom: 7,
        visible: true,
        name: 'Metamanager Segments'
    });

let truckSpeed2014 = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer',
    {
        minZoom: 7,
        visible: true,
        name: 'truck2014',
        showLayers: [8]
    });

let truckSpeed2015 = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/compareDynamic/MapServer',
    {
        minZoom: 7,
        visible: true,
        name: 'truck2015',
        showLayers: [9]
    });

map.addLayer(wisDotRegions.olLayer);
map.addLayer(truckSpeed2014.olLayer);
map.addLayer(truckSpeed2015.olLayer);
map.addLayer(metamanagerSegments.olLayer);


swiper.addLeftLayer(wisDotRegions);
swiper.addRightLayer(metamanagerSegments);

swiper.addLeftLayer(truckSpeed2014);
swiper.addRightLayer(truckSpeed2015);
