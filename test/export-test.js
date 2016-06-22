/**
 * Created by gavorhes on 6/22/2016.
 */
import $ from '../src/jquery/jquery';
import quickMap from '../src/olHelpers/quickMap';
import LayerEsriMapServer from '../src/layers/LayerEsriMapServer';


const map = quickMap();

let wisDotRegions = new LayerEsriMapServer(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
    {
        minZoom: 6,
        maxZoom: 12,
        name: 'WisDOT Regions',
        useEsriStyle: true
    });

map.addLayer(wisDotRegions.olLayer);

$('#make-report').click(() => {
    console.log('here');
    map.once('postcompose', function (event) {
        let canvas = event.context.canvas;
        // console.log(canvas.toDataURL('image/png'));
        let g = canvas.toDataURL('image/png');
        console.log(g.length);
    });
    map.renderSync();
    console.log('here');
});

//
//
//
//
// let wisDotRegions = new LayerEsriMapServer(
//     'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/Metamanager_regions/MapServer',
//     {
//         minZoom: 6,
//         maxZoom: 12,
//         name: 'WisDOT Regions',
//         useEsriStyle: true
//     });
//
