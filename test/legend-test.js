/**
 * Created by gavorhes on 5/19/2016.
 */


import 'babel-polyfill';
import quickMap from '../src/olHelpers/quickMap';
import ItsLayerCollection from '../src/collections/ItsLayerCollection';
import LayerLegend from '../src/collections/LayerLegend';
import LayerItsInventory from '../src/layers/LayerItsInventory';
import LayerBaseVectorGeoJson from '../src/layers/LayerBaseVectorGeoJson';
import LayerEsriMapServer from '../src/layers/LayerEsriMapServer';

let map = quickMap({fullScreen: true});

//
// let inventLyr = new LayerItsInventory({name: 'Camera', itsType: 'cctv', minZoom: 4, itsIcon: 'cctv.png'});
// map.addLayer(inventLyr.olLayer);
//
// inventLyr.visible = true;
//
// let newLayer = new LayerBaseVectorGeoJson('', {});
//
//
//         let metamanagerSegments = new LayerEsriMapServer(
//             'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/MetaManager/MM_All_Segments/MapServer',
//             {
//                 minZoom: 3,
//                 visible: true,
//                 name: 'Metamanager Segments',
//                 opacity: 0.6
//             });
//
// // console.log(metamanagerSegments.visible);
//
// map.addLayer(metamanagerSegments.olLayer);




let itsLayerCollection = new ItsLayerCollection(map);

for (let l of itsLayerCollection.layers){
    // console.log(l.visible);
    // console.log(l);
}


let layerArray = [
    {
        groupName: 'ITS Inventory Layers',
        collapse: false,
        addCheck: true,
        items: itsLayerCollection.layers
    }
];

let legend = new LayerLegend(layerArray, 'legend-container', {});



