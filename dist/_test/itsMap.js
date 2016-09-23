"use strict";
/**
 * Created by gavorhes on 12/18/2015.
 */
// import 'babel-polyfill/dist/polyfill.min';
var ItsLayerCollection_1 = require('../collections/ItsLayerCollection');
var LayerLegend_1 = require('../collections/LayerLegend');
var quickMap_1 = require('../olHelpers/quickMap');
var map = quickMap_1.default({ zoom: 15, center: { x: -9957959, y: 5317407 } });
window['map'] = map;
var itsLayerCollection = new ItsLayerCollection_1.default(map);
var layerArray = [
    {
        groupName: 'ITS Inventory Layers',
        collapse: false,
        addCheck: true,
        items: itsLayerCollection.layers
    }
];
var legend = new LayerLegend_1.default(layerArray, 'legend-container', {});
console.log('it works');
console.log('it works');
console.log('it works');
console.log('it works');
//# sourceMappingURL=itsMap.js.map