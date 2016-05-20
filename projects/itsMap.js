/**
 * Created by gavorhes on 12/18/2015.
 */
require('babel-polyfill');


import quickMap from '../lib/olHelpers/quickMap';




import quickMap from '../lib/olHelpers/quickMap';
import co from '../lib/util/colors';

const c = require('../lib/util/colors');




import ItsLayerCollection from '../lib/collections/ItsLayerCollection';
import LayerLegend from '../src/collections/LayerLegend';


let map = quickMap();


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





