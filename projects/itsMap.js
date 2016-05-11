/**
 * Created by gavorhes on 12/18/2015.
 */
require('babel-polyfill');

import quickMap from '../lib/olHelpers/quickMap';


// import quickMap from '../src/olHelpers/quickMap';
import mapMove from '../src/olHelpers/mapMove';
import mapPopup from '../src/olHelpers/mapPopup';
import ItsLayerCollection from '../src/collections/ItsLayerCollection';
import LayerLegend from '../src/collections/LayerLegend';


let map = quickMap();
mapMove.init(map);
mapPopup.init(map);


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





