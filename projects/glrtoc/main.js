/**
 * Created by gavorhes on 12/2/2015.
 */

// <editor-fold desc="imports">

import quickMap from '../../src/olHelpers/quickMap';
import LayerBase from '../../src/layers/LayerBase';
import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import LayerBaseVectorEsri from  '../../src/layers/LayerBaseVectorEsri';
import LayerRealEarthTile from  '../../src/layers/LayerRealEarthTile';
import LayerRealEarthVector from '../../src/layers/LayerRealEarthVector';
import LayerEsriMapServer from '../../src/layers/LayerEsriMapServer';
import * as layerStyles from './layerStyles';
import * as layerPopups from './layerPopups';
import mapPopup from '../../src/olHelpers/mapPopup';
import mapMove from '../../src/olHelpers/mapMove';
import * as dteConvert from '../../src/util/dateConvert';
import * as colors from '../../src/util/colors';
import appConfig from './appConfig';
import * as uiSetup from './mainUi';
import LayerLegend from '../../src/collections/LayerLegend';
// </editor-fold>

(function () {
    "use strict";
    uiSetup.uiInit();

    let legendItemsStatic = [];
    let legendItemsAnimated = [];
    let oakRidgeGroup = {groupName: 'Oak Ridge ITS', collapse: false, addCheck: true, items: []};
    let realEarthGroup = {groupName: 'Real Earth', collapse: false, items: []};
    let workZoneEventGroup = {groupName: 'Work Zones / Events', collapse: false, items: []};
    legendItemsStatic.push(oakRidgeGroup);
    legendItemsStatic.push(realEarthGroup);
    legendItemsStatic.push(workZoneEventGroup);

    function animationLoadCallback() {
        appConfig.animationLayers.push(this);
    }

    let map = quickMap({center: {x: -85.413, y: 43.29320}, zoom: 6, minZoom: 3, maxZoom: 19});
    appConfig.map = map;

    // <editor-fold desc="Coordination Layer">
    let coordinationLayer = new LayerBaseVectorEsri(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GlrtocCoordination/MapServer/0',
        {
            id: appConfig.coordinationLayerId,
            visible: true,
            autoLoad: true,
            name: 'Coordination',
            useEsriStyle: true
        }
    );

    map.addLayer(coordinationLayer.olLayer);
    mapPopup.addVectorPopup(coordinationLayer, layerPopups.coordination);
    appConfig.coordinationLayer = coordinationLayer;


    //appConfig.addLayer(coordinationLayer);
    // </editor-fold>

    // <editor-fold desc="Oak Ridge Layers ">
    let oakRidgeLayers = [
        ['Cameras', 'cameras33'],
        ['HAR', 'HAR33'],
        ['DMS', 'MessageSigns33'],
        //['State Summary', 'statesummary'],
        ['Traffic Control', 'TrafficControl33'],
        ['Traffic Detection', 'TrafficDetection33'],
        ['Weather', 'Weather33']
    ];


    for (let i = 0; i < oakRidgeLayers.length; i++) {
        let oakRidgeLayer = new LayerEsriMapServer(
            `http://itsdpro.ornl.gov/arcgis/rest/services/ITSPublic/${oakRidgeLayers[i][1]}/MapServer`,
            {
                id: oakRidgeLayers[i][1],
                name: oakRidgeLayers[i][0],
                visible: false,
                minZoom: 7,
                zIndex: 20,
                addPopup: true
            }
        );
        oakRidgeGroup.items.push(oakRidgeLayer);
        map.addLayer(oakRidgeLayer.olLayer);
        appConfig.addOperationsLayerStatic(oakRidgeLayer);
    }
    // </editor-fold>

    // <editor-fold desc="WRS Segments">

    let wrsConfigVector = {
        products: 'ROADS',
        style: layerStyles.wrsStyle,
        animate: false,
        id: 'wrs-segments-vector-static',
        name: 'Winter Roads',
        minZoom: 5,
        maxZoom: 13,
        zIndex: 3
    };

    let wrsSegmentLayerVectorStatic = new LayerRealEarthVector(wrsConfigVector);
    map.addLayer(wrsSegmentLayerVectorStatic.olLayer);
    mapPopup.addVectorPopup(wrsSegmentLayerVectorStatic, layerPopups.wrs);
    appConfig.addOperationsLayerStatic(wrsSegmentLayerVectorStatic);
    //realEarthGroup.items.push(wrsSegmentLayerVectorStatic);

    wrsConfigVector.animate = true;
    wrsConfigVector.id = 'wrs-segments-vector-animate';
    wrsConfigVector.loadCallback = animationLoadCallback;

    let wrsSegmentLayerVectorAnimate = new LayerRealEarthVector(wrsConfigVector);
    map.addLayer(wrsSegmentLayerVectorAnimate.olLayer);
    mapPopup.addVectorPopup(wrsSegmentLayerVectorAnimate, layerPopups.wrs);
    appConfig.addOperationsLayerAnimate(wrsSegmentLayerVectorAnimate);

    let wrsConfigTile = {
        products: 'ROADS',
        id: 'roads-tile-static',
        opacity: 0.6,
        animate: false,
        name: 'Winter Roads',
        zIndex: 10
    };

    let wrsSegmentLayerTileStatic = new LayerRealEarthTile(wrsConfigTile);
    map.addLayer(wrsSegmentLayerTileStatic.olLayer);
    appConfig.addOperationsLayerStatic(wrsSegmentLayerTileStatic);
    realEarthGroup.items.push(wrsSegmentLayerTileStatic);

    wrsConfigTile.animate = true;
    wrsConfigTile.id = 'roads-tile-animate';
    wrsConfigTile.loadCallback = animationLoadCallback;

    let wrsSegmentLayerTileAnimate = new LayerRealEarthTile(wrsConfigTile);
    map.addLayer(wrsSegmentLayerTileAnimate.olLayer);
    appConfig.addOperationsLayerAnimate(wrsSegmentLayerTileAnimate);
    legendItemsAnimated.push(wrsSegmentLayerTileAnimate);

    // </editor-fold>

    // <editor-fold desc="24 hour snow">

    let snow24Config = {
        products: 'SNOWDEPTH24',
        id: 'snowdepth24-static',
        opacity: 0.5,
        animate: false,
        name: '24HR Snow',
        maxZoom: 9
    };


    let snowDepthStatic = new LayerRealEarthTile(snow24Config);
    map.addLayer(snowDepthStatic.olLayer);
    appConfig.addOperationsLayerStatic(snowDepthStatic);
    realEarthGroup.items.push(snowDepthStatic);

    //snow24Config.animate = true;
    //snow24Config.id = 'snowdepth24-animate';
    //snow24Config.loadCallback = animationLoadCallback;
    //
    //let snowDepthAnimate = new LayerRealEarthTile(snow24Config);
    //map.addLayer(snowDepthAnimate.olLayer);
    //appConfig.addOperationsLayerAnimate(snowDepthAnimate);
    //legendItemsAnimated.push(snowDepthAnimate);

    // </editor-fold>

    // <editor-fold desc="nexrhres and precipitation layers">
    let nexrhresConfig = {
        products: 'nexrhres',
        id: 'nexrhres-static',
        opacity: 0.6,
        animate: false,
        name: 'Hybrid Reflectivity',
        maxZoom: 10
    };

    let nexrhresStatic = new LayerRealEarthTile(nexrhresConfig);
    map.addLayer(nexrhresStatic.olLayer);
    appConfig.addOperationsLayerStatic(nexrhresStatic);
    realEarthGroup.items.push(nexrhresStatic);

    nexrhresConfig.animate = true;
    nexrhresConfig.id = 'nexrhres-animate';
    nexrhresConfig.loadCallback = animationLoadCallback;

    let nexrhresAnimate = new LayerRealEarthTile(nexrhresConfig);
    map.addLayer(nexrhresAnimate.olLayer);
    appConfig.addOperationsLayerAnimate(nexrhresAnimate);
    legendItemsAnimated.push(nexrhresAnimate);

    let precipRateConfig = {
        products: 'nexrcomp',
        id: 'precip-rate-static',
        opacity: 0.6,
        animate: false,
        name: 'Precipitation Rate',
        maxZoom: 10
    };

    let precipRateStatic = new LayerRealEarthTile(precipRateConfig);
    map.addLayer(precipRateStatic.olLayer);
    appConfig.addOperationsLayerStatic(precipRateStatic);
    realEarthGroup.items.push(precipRateStatic);

    precipRateConfig.animate = true;
    precipRateConfig.id = 'precip-rate-animate';
    precipRateConfig.loadCallback = animationLoadCallback;

    let precipRateAnimate = new LayerRealEarthTile(precipRateConfig);
    map.addLayer(precipRateAnimate.olLayer);
    appConfig.addOperationsLayerAnimate(precipRateAnimate);
    legendItemsAnimated.push(precipRateAnimate);


    // </editor-fold>

    // <editor-fold desc="Work Zones and special events">
    let d = new Date();
    d.setSeconds(0);
    let endDate = dteConvert.dateToYyyyMmDdHhMmSs(d);
    d.setYear(d.getYear() + 1901);
    var startDate = dteConvert.dateToYyyyMmDdHhMmSs(d);

    let workZoneSegLayer = new LayerBaseVectorEsri(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GLRTOC_WZ_SE/MapServer/1',
        {
            where: `EventStartDate < '${startDate}' AND EventEndDate > '${endDate}' AND Impact IN('High', 'XXX')`,
            name: "Work Zone Segments",
            style: layerStyles.workZoneAndEventStyle,
            id: 'work-zone-segments',
            minZoom: 5,
            maxZoom: 13
        }
    );

    map.addLayer(workZoneSegLayer.olLayer);
    appConfig.addOperationsLayerStatic(workZoneSegLayer);
    mapPopup.addVectorPopup(workZoneSegLayer, layerPopups.specialEventWorkZone);
    workZoneEventGroup.items.push(workZoneSegLayer);

    let specialEventsLayer = new LayerBaseVectorEsri(
        'http://transportal.cee.wisc.edu/applications/arcgis2/rest/services/GLRTOC/GLRTOC_WZ_SE/MapServer/2',
        {
            where: `EventStartDate < '${startDate}' AND EventEndDate > '${endDate}' AND Impact IN('High', 'XXX')`,
            //where: '1=1',
            name: "Special Events",
            style: layerStyles.workZoneAndEventStyle,
            id: 'special-event-points',
            minZoom: 5,
            maxZoom: 13
        }
    );

    map.addLayer(specialEventsLayer.olLayer);
    appConfig.addOperationsLayerStatic(specialEventsLayer);
    mapPopup.addVectorPopup(specialEventsLayer, layerPopups.specialEventWorkZone);
    workZoneEventGroup.items.push(specialEventsLayer);

    // </editor-fold>

    let legendStatic = new LayerLegend(legendItemsStatic, 'legend-container-static', {});
    let legendAnimate = new LayerLegend(legendItemsAnimated, 'legend-container-animate', {});

    appConfig.init();

    uiSetup.uiAfterMap();
})();


// <editor-fold desc="Promise example">

//var promise = new Promise(function (resolve, reject) {
//    console.log('doing stuff');
//
//    $.get('http://realearth.ssec.wisc.edu:80/api/products', {products: 'ROADS'}, function (d) {
//        //if (d.length == 0) {
//        //    console.log(`${this._products} layer not available or does not have times`);
//        //    return;
//        //}
//        d = d[0];
//        console.log(d);
//        resolve("Stuff worked!");
//
//
//        //for (let i = 0; i < d['times'].length; i++) {
//        //    _this._loadDates.call(_this, d['times'][i]);
//        //}
//        //console.log(_this._localDates);
//
//        //_this._loadAtTimeIndex.call(_this, _this._localDates.length - 1)
//
//    }, 'json').fail(function () {
//        reject(Error("It broke"));
//    });
//
//
//});
//
//
//promise.then(
//    function (result) {
//        console.log(result); // "Stuff worked!"
//    },
//    function (err) {
//        console.log(err); // Error: "It broke"
//    }
//);
// </editor-fold>


