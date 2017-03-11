/**
 * Created by gavorhes on 12/18/2015.
 */


import ItsLayerCollection from '../../src/collections/ItsLayerCollection';
import LayerLegend from '../../src/collections/LayerLegend';
import quickMap from '../../src/olHelpers/quickMap';

let map = quickMap();

window['map'] = map;

let itsLayerCollection = new ItsLayerCollection(map);

let layerArray = [
    {
        groupName: 'ITS Inventory Layers',
        collapse: false,
        addCheck: true,
        items: itsLayerCollection.layers
    }
];

let legend = new LayerLegend(layerArray, 'legend-container', {});

console.log('it works');
