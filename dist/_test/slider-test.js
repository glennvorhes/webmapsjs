"use strict";
/**
 * Created by gavorhes on 6/22/2016.
 */
var Sliders_1 = require('../collections/Sliders');
var $ = require('jquery');
exports.tipConfig = {
    $loadingGif: $('#loading-gif'),
    $presetSelector: $('#preset-selector'),
    $regionSelector: $('#region-selector'),
    $versionSelector: $('#version-selector'),
    tipSegmentLayerMinZoom: 10,
    slidersConfig: [
        {
            label: 'AADT',
            yearOptions: [
                { label: '1', column: 'aadtyr_1' }
            ]
        },
        {
            label: 'AADT Future',
            yearOptions: [
                { label: '5', column: 'aadtyr_5' },
                { label: '10', column: 'aadtyr_10' },
                { label: '15', column: 'aadtyr_15' },
                { label: '20', column: 'aadtyr_20' }
            ]
        },
        {
            label: 'Growth',
            yearOptions: [
                { label: '5', column: 'growth_5' },
                { label: '10', column: 'growth_10' },
                { label: '15', column: 'growth_15' },
                { label: '20', column: 'growth_20' }
            ]
        },
        {
            label: 'Truck',
            yearOptions: [
                { label: '1', column: 'trkdyr_1' },
                { label: '20', column: 'trkdyr_20' }
            ]
        },
        {
            label: 'LOS',
            yearOptions: [
                { label: '1', column: 'losyr_1' }
            ]
        },
        {
            label: 'LOS Future',
            yearOptions: [
                { label: '5', column: 'losyr_5' },
                { label: '10', column: 'losyr_10' },
                { label: '15', column: 'losyr_15' },
                { label: '20', column: 'losyr_20' }
            ]
        },
        {
            label: 'Crash Rate',
            yearOptions: [
                { label: 1, column: 'crash_rate' }
            ]
        },
        {
            label: 'Severity',
            yearOptions: [
                { label: 1, column: 'crash_severity' }
            ]
        },
        {
            label: 'Weather',
            yearOptions: [
                { label: 1, column: 'weather' }
            ]
        },
        {
            label: 'Event',
            yearOptions: [
                { label: 1, column: 'event' }
            ]
        }
    ],
    presetConfig: [
        {
            label: 'Default TIP',
            presets: [
                { column: 'aadtyr_1', value: 10.0 },
                { column: 'aadtyr_20', value: 7.0 },
                { column: 'growth_20', value: 7.0 },
                { column: 'trkdyr_1', value: 4.0 },
                { column: 'losyr_1', value: 12.0 },
                { column: 'losyr_20', value: 12.0 },
                { column: 'crash_rate', value: 15.0 },
                { column: 'crash_severity', value: 13.0 },
                { column: 'weather', value: 9.0 },
                { column: 'event', value: 11.0 }
            ]
        },
        {
            label: 'Safety',
            presets: [
                { column: 'aadtyr_1', value: 20.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 0.0 },
                { column: 'losyr_1', value: 0.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 40.0 },
                { column: 'crash_severity', value: 40.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Mobility Present',
            presets: [
                { column: 'aadtyr_1', value: 25.0 },
                { column: 'aadtyr_20', value: 25.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 25.0 },
                { column: 'losyr_1', value: 25.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Mobility Future',
            presets: [
                { column: 'aadtyr_1', value: 0.0 },
                { column: 'aadtyr_20', value: 25.0 },
                { column: 'growth_20', value: 25.0 },
                { column: 'trkdyr_1', value: 25.0 },
                { column: 'losyr_1', value: 0.0 },
                { column: 'losyr_20', value: 25.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Service',
            presets: [
                { column: 'aadtyr_1', value: 30.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 10.0 },
                { column: 'trkdyr_1', value: 0.0 },
                { column: 'losyr_1', value: 30.0 },
                { column: 'losyr_20', value: 30.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        },
        {
            label: 'Freight Performance',
            presets: [
                { column: 'aadtyr_1', value: 20.0 },
                { column: 'aadtyr_20', value: 0.0 },
                { column: 'growth_20', value: 0.0 },
                { column: 'trkdyr_1', value: 60.0 },
                { column: 'losyr_1', value: 20.0 },
                { column: 'losyr_20', value: 0.0 },
                { column: 'crash_rate', value: 0.0 },
                { column: 'crash_severity', value: 0.0 },
                { column: 'weather', value: 0.0 },
                { column: 'event', value: 0.0 }
            ]
        }
    ]
};
var sliders = new Sliders_1.TipSliders(exports.tipConfig.slidersConfig, exports.tipConfig.presetConfig, 'slider-container', exports.tipConfig.$presetSelector, exports.tipConfig.$regionSelector, exports.tipConfig.$regionSelector, function (chg) { console.log(chg); });
// sliders.changedCallback = (chg) => {console.log(chg)};
window['glob'] = sliders;
window['hat'] = sliders;
window['bird'] = sliders;
//# sourceMappingURL=slider-test.js.map