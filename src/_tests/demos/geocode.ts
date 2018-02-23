import ItsLayerCollection from '../../collections/ItsLayerCollection';
import LayerLegend from '../../collections/LayerLegend';
import quickMap from '../../olHelpers/quickMap';
import {mapToBase64} from '../../olHelpers/mapToBase64';
let map = quickMap({addGeocode: true});

window['map'] = map;

function callback(d: string){
    console.log(d);
}

setTimeout(() => {
    mapToBase64(map, callback, {delay: 1500});
}, 2000);


console.log('it works');
