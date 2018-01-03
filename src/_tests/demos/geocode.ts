import ItsLayerCollection from '../../collections/ItsLayerCollection';
import LayerLegend from '../../collections/LayerLegend';
import quickMap from '../../olHelpers/quickMap';

let map = quickMap({addGeocode: true});

window['map'] = map;


console.log('it works');
