import {quickMap} from '../olHelpers/quickMap';
import LayerRealEarthTile from "../layers/LayerRealEarthTile";
import {MediaControl, changeFunction} from "../domUtil/media-control";
import $ = require('jquery');


let nexrhresStatic = new LayerRealEarthTile({
        products: 'nexrhres',
        id: 'nexrhres-static',
        opacity: 0.6,
        animate: true,
        name: 'Hybrid Reflectivity',
        // maxZoom: 10,
        timeLoadCallback: function(f){console.log(f);}
    }
);


let d = new Date();
let endTime = d.getTime();
d.setHours(d.getHours() - 4);
let startTime = d.getTime();
let rangeStep = Math.round((endTime - startTime) / 8);

let media = new MediaControl(
    $('#control'),
    (v: number) => {
        nexrhresStatic.setLayerTime(v);
    },
    {
        min: startTime,
        max: endTime,
        val: endTime,
        step: rangeStep,
        playInterval: 750,
        showAsDate: true
    }
);


let map = quickMap();
map.addLayer(nexrhresStatic.olLayer);

