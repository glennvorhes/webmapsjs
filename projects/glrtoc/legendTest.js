/**
 * Created by gavorhes on 1/4/2016.
 */
import quickMap from '../../src/olHelpers/quickMap';
import LayerItsInventory from '../../src/layers/LayerItsInventory';
import LayerBaseVectorEsri from '../../src/layers/LayerBaseVectorEsri';
import LayerEsriMapServer from '../../src/layers/LayerEsriMapServer';
import LayerBaseXyzTile from '../../src/layers/LayerBaseXyzTile';
import LayerLegend from '../../src/collections/LayerLegend';
import ItsLayerCollection from '../../src/collections/ItsLayerCollection';

(function () {
    "use strict";
    let map = quickMap({center: {x: -9907589, y: 5232317}, zoom: 12, minZoom: 3, maxZoom: 19});

    let itsLayerCollection = new ItsLayerCollection(map);

    let oakRidgeCams = new LayerEsriMapServer(
        `http://itsdpro.ornl.gov/arcgis/rest/services/ITSPublic/cameras33/MapServer`,
        {
            id: 'cameras33',
            name: 'Oak Cameras',
            visible: true,
            minZoom: 7,
            zIndex: 20,
            addPopup: true
        }
    );

    map.addLayer(oakRidgeCams.olLayer);

    glob.cat = (bird) => bird * 2;

    glob.map = map;

    let itsLayer = new LayerItsInventory({itsType: 'CCTV', itsIcon: 'cctv.png', name: 'Camera', visible: false});

    map.addLayer(itsLayer.olLayer);

    let legend = new LayerLegend(
        [
            {groupName: 'its layers', collapse: true, items: itsLayerCollection.layers},
            itsLayer, oakRidgeCams
        ],
        'legend-container', {});



    //let legend = new LayerLegend(
    //    [
    //        {groupName: 'its layers', expand: true, items: itsLayerCollection.layers},
    //        itsLayer, testEsri, msg, tower, xyzTile,
    //        {groupName: 'new group', expand: true, items: [rwis, coord, seg, esriMap]}
    //    ],
    //    'legend-container', {});

    //let legend = new LayerLegend(
    //    [
    //        itsLayerCollection.layers[1]
    //    ],
    //    'legend-container', {});

    map.getView().setZoom(13);

    return;

    let testEsri = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/3',
        {name: 'test esri', useEsriStyle: true, visible: false}
    );
    map.addLayer(testEsri.olLayer);

    let msg = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/8',
        {name: 'message', useEsriStyle: true, visible: false}
    );
    map.addLayer(msg.olLayer);

    let tower = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/0',
        {name: 'tower', useEsriStyle: true, visible: false}
    );
    map.addLayer(tower.olLayer);


    let rwis = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/1',
        {name: 'rwis', useEsriStyle: true, visible: false}
    );
    map.addLayer(rwis.olLayer);

    let coord = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/10',
        {name: 'coord', useEsriStyle: true, minZoom: 6, visible: false, collapseLegend: true}
    );
    map.addLayer(coord.olLayer);

    //let coord2 = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/11',
    //    {name: 'coord2', useEsriStyle: true}
    //);
    //map.addLayer(coord.olLayer);

    let seg = new LayerBaseVectorEsri('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer/9',
        {name: 'seg', useEsriStyle: true, visible: false}
    );
    map.addLayer(seg.olLayer);

    let esriMap = new LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/LegendTest/MapServer', {
        name: 'esri map',
        legendCollapse: true,
        legendCheckbox: false,
        visible: false
    });

    map.addLayer(esriMap.olLayer);

    let xyzTile = new LayerBaseXyzTile('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/npmrds_tile/MapServer/tile/{z}/{y}/{x}',
        {minZoom: 4, maxZoom: 11, name: "NPMRDS", useEsriStyle: true, collapseLegend: true});

    //let esriMapServer = new LayerEsriMapServer('http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/NPMRDS/npmrds_dynamic/MapServer',
    //    {minZoom: 12, maxZoom: 18});

    map.addLayer(xyzTile.olLayer);
    //map.addLayer(esriMapServer.olLayer);

    glob.itsCollection = itsLayerCollection;
})();
