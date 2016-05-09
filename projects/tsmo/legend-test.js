/**
 * Created by gavorhes on 12/18/2015.
 */
require('babel-polyfill');
import quickMap from '../../src/olHelpers/quickMap';
import mapMove from '../../src/olHelpers/mapMove';
import mapPopup from '../../src/olHelpers/mapPopup';
import ItsLayerCollection from '../../src/collections/ItsLayerCollection';
import LayerLegend from '../../src/collections/LayerLegend';

let map = quickMap();

mapMove.init(map);
mapPopup.init(map);

let itsLayerCollection = new ItsLayerCollection(map);

let layerArray = [
    {
        groupName: 'ITS Inventory Layers',
        collapse: false,
        addCheck: false,
        items: itsLayerCollection.layers
    }
];

let legend = new LayerLegend(layerArray, 'legend-container', {});

//
//let layerArry = itsLayerCollection.layers.slice(0, 3);
//
//layerArry.push(
//    {
//        groupName: 'Group 1',
//        collapse: false,
//        items: itsLayerCollection.layers.slice(3, 6)
//    }
//);
//
//layerArry.push(itsLayerCollection.layers[6]);
//
//let collection2 = itsLayerCollection.layers.slice(7, 9);
//collection2.push({
//
//    groupName: 'Group 3',
//    collapse: false,
//    items: itsLayerCollection.layers.slice(10, 12)
//
//});
//
//layerArry.push(
//    {
//        groupName: 'Group 2',
//        collapse: true,
//        items: collection2
//    }
//);
//
//let layerArray = [
//    itsLayerCollection.layers[0],
//    itsLayerCollection.layers[1],
//    {
//
//        groupName: 'Group 1',
//        collapse: false,
//        items: [itsLayerCollection.layers[2], itsLayerCollection.layers[3]]
//    },
//    {
//        groupName: 'Group 2',
//        collapse: true,
//        addCheck: false,
//        items: [
//            itsLayerCollection.layers[4],
//            itsLayerCollection.layers[5],
//            {
//                groupName: 'Group 3',
//                collapse: false,
//                items: [itsLayerCollection.layers[6], itsLayerCollection.layers[7]]
//            }
//        ]
//    }
//];



