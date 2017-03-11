import {quickMap} from '../../src/olHelpers/quickMap';
import LayerRealEarthTile from "../../src/layers/LayerRealEarthTile";
import {MediaControl, changeFunction} from "../../src/domUtil/media-control";
import $ = require('jquery');
import {LayerBaseVectorEsri} from "../../src/layers/LayerBaseVectorEsri";
import {LayerEsriMapServer} from "../../src/layers/LayerEsriMapServer";

let nexrhresStatic = new LayerRealEarthTile({
        products: 'nexrhres',
        id: 'nexrhres-static',
        opacity: 0.6,
        animate: true,
        name: 'Hybrid Reflectivity',
        // maxZoom: 10,
        timeLoadCallback: function (f) {
            console.log(f);
        }
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


let coordinationLayer = new LayerBaseVectorEsri(
    'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GlrtocCoordination/MapServer/0',
    {
        visible: true,
        autoLoad: true,
        name: 'Coordination',
        useEsriStyle: true
    }
);

map.addLayer(coordinationLayer.olLayer);

    let oakRidgeLayers = [
        ['Cameras', 'cameras33'],
        ['HAR', 'HAR33'],
        ['DMS', 'MessageSigns33'],
        //['State Summary', 'statesummary'],
        ['Traffic Control', 'TrafficControl33'],
        ['Traffic Detection', 'TrafficDetectionMulti'],
        ['Weather', 'Weather33']
    ];


    for (let i = 0; i < oakRidgeLayers.length; i++) {
        let oakRidgeLayer = new LayerEsriMapServer(
            `http://itsdpro.ornl.gov/arcgis/rest/services/ITSPublic/${oakRidgeLayers[i][1]}/MapServer`,
            {
                id: oakRidgeLayers[i][1],
                name: oakRidgeLayers[i][0],
                visible: true,
                minZoom: 7,
                zIndex: 20,
                addPopup: true,
                legendCollapse: true
            }
        );
        map.addLayer(oakRidgeLayer.olLayer);
    }

