/**
 * Created by gavorhes on 6/1/2016.
 */
import quickMap from '../src/olHelpers/quickMap';
import LayerSwipe from '../src/olHelpers/layerSwipe';
import LayerEsriMapServer from '../src/layers/LayerEsriMapServer';

let map = quickMap();

let swiper = new LayerSwipe(map);


    let wisDotRegions = new LayerEsriMapServer(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
        {
            minZoom: 6,
            maxZoom: 12,
            name: 'WisDOT Regions',
            useEsriStyle: true
        });

    let metamanagerSegments = new LayerEsriMapServer(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
        {
            minZoom: 7,
            visible: true,
            name: 'Metamanager Segments'
        });

map.addLayer(wisDotRegions.olLayer);
map.addLayer(metamanagerSegments.olLayer);

swiper.addLeftLayer(wisDotRegions);
swiper.addRightLayer(metamanagerSegments);


