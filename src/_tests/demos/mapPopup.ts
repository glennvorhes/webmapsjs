/**
 * Created by gavorhes on 12/18/2015.
 */


import ItsLayerCollection from '../../collections/ItsLayerCollection';
import LayerLegend from '../../collections/LayerLegend';
import quickMap from '../../olHelpers/quickMap';
import {LayerBaseVectorGeoJson} from '../../layers/LayerBaseVectorGeoJson';
import ol = require("custom-ol");
import {mapPopup} from '../../olHelpers/mapPopup';



const reg = {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-91.4232, 43.9834], [-91.3246, 43.9834], [-91.3465, 44.0162], [-91.3082, 44.0655], [-91.2205, 44.0546], [-91.1767, 44.0874], [-91.1493, 44.0819], [-90.9741, 44.071], [-90.9741, 44.071], [-90.9796, 44.1312], [-90.9084, 44.1586], [-90.4921, 44.1586], [-90.3114, 44.1531], [-90.3114, 44.2463], [-90.0813, 44.2463], [-89.9006, 44.2517], [-89.928, 44.197], [-89.9061, 44.1805], [-89.928, 44.1531], [-89.9718, 44.1696], [-90.0266, 44.071], [-89.9608, 43.9779], [-89.9499, 43.9231], [-89.9828, 43.9122], [-89.9608, 43.8629], [-89.8513, 43.7698], [-89.7856, 43.6383], [-89.5994, 43.6438], [-89.2434, 43.6438], [-89.0079, 43.6328], [-88.8874, 43.6328], [-88.3999, 43.6328], [-88.3999, 43.5452], [-88.4163, 43.1947], [-88.5368, 43.1947], [-88.5423, 42.8442], [-88.5478, 42.8442], [-88.7778, 42.8442], [-88.7778, 42.4936], [-88.9421, 42.4936], [-89.3639, 42.4991], [-89.4022, 42.4991], [-89.8404, 42.5046], [-89.928, 42.5046], [-90.4264, 42.5046], [-90.64, 42.5101], [-90.7112, 42.636], [-90.8974, 42.6744], [-91.0672, 42.7511], [-91.1548, 42.9866], [-91.1767, 43.0797], [-91.1767, 43.1344], [-91.0562, 43.2549], [-91.1055, 43.3152], [-91.2041, 43.3535], [-91.2041, 43.4247], [-91.2315, 43.4576], [-91.2151, 43.5014], [-91.2698, 43.6164], [-91.2589, 43.7259], [-91.2424, 43.7752], [-91.2863, 43.8464]]]
            }
        }
    ]
};

const reg2 = {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-93.0, 45.0], [-94.0, 45.0], [-94.0, 46.0], [-93.0, 46.0], [-93.0, 45.0]]]
            }
        }
    ]
};

let map = quickMap({addGeocode: true});





let regionLayer = new LayerBaseVectorGeoJson(
        '',
        {
            minZoom: 6,
            maxZoom: 12,
            name: 'WisDOT Regions',
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'blue'
                }),
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 5
                })
            })
        });

let regionLayer2 = new LayerBaseVectorGeoJson(
        '',
        {
            minZoom: 6,
            maxZoom: 12,
            name: 'WisDOT Regions',
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'red'
                }),
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 5
                })
            })
        });

regionLayer.addFeatures(reg);
regionLayer2.addFeatures(reg2);

map.addLayer(regionLayer.olLayer);
map.addLayer(regionLayer2.olLayer);

mapPopup.addVectorPopup(regionLayer2, (p) => {return 'cats'});


window['map'] = map;
//
// let itsLayerCollection = new ItsLayerCollection(map);
//
// let layerArray = [
//     {
//         groupName: 'ITS Inventory Layers',
//         collapse: false,
//         addCheck: true,
//         items: itsLayerCollection.layers
//     }
// ];

// let legend = new LayerLegend(layerArray, 'legend-container', {});

console.log('it works');
