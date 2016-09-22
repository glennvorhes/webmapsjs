/**
 * Created by gavorhes on 12/14/2015.
 */
"use strict";
var colors = require('../util/colors');
var provide_1 = require('../util/provide');
var LayerItsInventory_1 = require("../layers/LayerItsInventory");
var nm = provide_1.default('collections');
var itsConfig = [
    {
        name: 'Camera',
        itsType: 'cctv',
        minZoom: 11,
        itsIconConfig: {
            prop: 'owner',
            defaultName: 'WisDOT',
            defaultIcon: 'cctv.png',
            iconArray: [
                ['City of Madison', 'Madison', 'cctv-mad.png']
            ]
        }
    },
    {
        name: 'Message Signs',
        itsType: 'DMS',
        minZoom: 11,
        itsIconConfig: {
            prop: 'dmsType',
            defaultName: 'DMS',
            defaultIcon: 'dms.png',
            iconArray: [
                ['pcms', 'PCMS', 'pcms.png']
            ]
        }
    },
    { name: 'ATR', itsType: 'atr', minZoom: 8, itsIcon: 'atr.png', visible: false },
    { name: 'Lighting', itsType: 'light', minZoom: 16, itsIcon: 'streetlight.png', visible: false, onDemand: true },
    { name: 'Bluetooth', itsType: 'blue', minZoom: 10, itsIcon: 'bluetooth.png', visible: false },
    { name: 'Cabinets', itsType: 'cabinet', minZoom: 10, itsIcon: 'cabinet.png', visible: false },
    { name: 'Hut', itsType: 'hut', minZoom: 10, itsIcon: 'hut.png', visible: false },
    { name: 'Vault', itsType: 'vault', minZoom: 13, itsIcon: 'vault.png', visible: false },
    { name: 'Advisory Radio', itsType: 'har', minZoom: 10, itsIcon: 'har.png', visible: false },
    {
        name: 'Loop Detectors',
        itsType: 'loop',
        legendCollapse: true,
        minZoom: 14,
        visible: false,
        itsIconConfig: {
            prop: 'dtctrType',
            defaultName: 'Other',
            defaultIcon: 'loopdetectorother.png',
            iconArray: [
                ['detector', 'Detector', 'loopdetector.png'],
                ['long', 'Long', 'loopdetectorlong.png'],
                ['zone', 'Zone', 'loopdetectorzone.png']
            ]
        },
        onDemand: true
    },
    { name: 'Microwave', itsType: 'microwave', minZoom: 14, itsIcon: 'microwave.png', visible: false },
    { name: 'Pull Box', itsType: 'pull', minZoom: 14, itsIcon: 'pullbox.png', visible: false, onDemand: true },
    { name: 'RWIS', itsType: 'rwis', minZoom: 7, itsIcon: 'rwis.png', visible: false },
    { name: 'Ramp Gates', itsType: 'gate', minZoom: 10, itsIcon: 'rampgate.png', visible: false },
    { name: 'Ramp Meter', itsType: 'meter', minZoom: 10, itsIcon: 'rampmeter.png', visible: false },
    { name: 'Signal', itsType: 'signal', minZoom: 13, itsIcon: 'signal.png', visible: false, onDemand: true },
    { name: 'Tower', itsType: 'tower', minZoom: 10, itsIcon: 'tower.png', visible: false },
    {
        name: 'Trench',
        itsType: 'trench',
        onDemand: true,
        visible: false,
        onDemandDelay: 500,
        minZoom: 15,
        legendCollapse: true,
        itsLineConfig: {
            prop: 'owner',
            //defaultName: 'Other',
            //defaultWidth: 7,
            defaultColor: colors.hexAlphaToRgbOrRgba('#747474', 0.8),
            lineArray: [
                ['WisDOT', 'WisDOT', colors.hexAlphaToRgbOrRgba('#FF032F', 0.7)],
                ['WIN', 'WIN', colors.hexAlphaToRgbOrRgba('#FFC632', 0.7)],
                ['USXchange', 'USXchange', colors.hexAlphaToRgbOrRgba('#2DFF46', 0.7)],
                ['AT&T', 'AT&T', colors.hexAlphaToRgbOrRgba('#ff2be5', 0.7)],
                ['Touch America', 'Touch America', colors.hexAlphaToRgbOrRgba('#52f3ff', 0.7)],
                ['Qwest', 'Qwest', colors.hexAlphaToRgbOrRgba('#9278ff', 0.7)],
                ['McLeodUSA', 'McLeodUSA', colors.hexAlphaToRgbOrRgba('#2926FF', 0.7)],
                ['CINC', 'CINC', colors.hexAlphaToRgbOrRgba('#CB00FF', 0.7)],
                ['City of Madison', 'Madison', colors.hexAlphaToRgbOrRgba('#000380', 0.7)]
            ]
        }
    }
];
var ItsLayerCollection = (function () {
    /**
     * Create a collection of all ITS layers
     * @param {ol.Map} theMap the openlayers map
     * @param {Array} [exclude=[]] array of Its layer identifiers to exclude
     *
     * BLUE Bluetooth Detector - Bluetooth Detector
     * CABINET Cabinets - The cabinets
     * CCTV Camera - Traffic Cameras
     * HUT Communication Hut - Communication Hut
     * VAULT Communication Vault - The communication vaults
     * HAR Highway Advisory Radio - Advisory Radios
     * LIGHT Lighting - Lighting
     * LOOP Loop Detectors - Loop Detectors
     * DMS Message Board - Message Boards and Signs
     * MICROWAVE Microwave Detector - Microwave Detectors
     * PULL Pull Box - A pull box
     * RWIS RWIS - Road weather information system
     * GATE Ramp Gate - The ramp Gates
     * METER Ramp Meter - The ramp meters
     * SIGNAL Signal - Traffic Signal
     * TOWER Tower - The towers
     * TRENCH
     */
    function ItsLayerCollection(theMap, exclude) {
        this._map = theMap;
        this._layers = [];
        exclude = typeof exclude == 'object' ? exclude : [];
        for (var i = 0; i < itsConfig.length; i++) {
            var lyrConfig = itsConfig[i];
            var addLayer = true;
            for (var j = 0; j < exclude.length; j++) {
                if (exclude[j] == lyrConfig.itsType) {
                    addLayer = false;
                    break;
                }
            }
            if (addLayer) {
                var inventLyr = new LayerItsInventory_1.default(lyrConfig);
                this._map.addLayer(inventLyr.olLayer);
                this._layers.push(inventLyr);
            }
        }
    }
    Object.defineProperty(ItsLayerCollection.prototype, "layers", {
        /**
         * Return the array of layers in this collection
         * @returns {Array<LayerItsInventory>} an array of layers
         */
        get: function () {
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    return ItsLayerCollection;
}());
nm.ItsLayerCollection = ItsLayerCollection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ItsLayerCollection;
//# sourceMappingURL=ItsLayerCollection.js.map