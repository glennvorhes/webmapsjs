/**
 * Created by gavorhes on 12/18/2015.
 */
// import 'babel-polyfill/dist/polyfill.min';
import ItsLayerCollection from '../collections/ItsLayerCollection';
import LayerLegend from '../collections/LayerLegend';
import quickMap from '../olHelpers/quickMap';

let map = quickMap({zoom: 15, center: {x: -9957959, y: 5317407}});

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
console.log('it works');
console.log('it works');
console.log('it works');
