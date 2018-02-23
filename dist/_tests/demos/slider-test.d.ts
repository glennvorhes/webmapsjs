/// <reference types="jquery" />
/// <reference types="jqueryui" />
/**
 * Created by gavorhes on 6/22/2016.
 */
import { TipSliders, TipPresetConfig, TipSliderConfig } from '../../collections/Sliders';
import ol = require('custom-ol');
import 'jquery-ui';
export interface ITipConfig {
    slidersConfig: Array<TipSliderConfig>;
    presetConfig: Array<TipPresetConfig>;
    tipSegmentLayerMinZoom: number;
    sliders: TipSliders;
    _map: ol.Map;
    $loadingGif: JQuery;
    $presetSelector: JQuery;
    $regionSelector: JQuery;
    $versionSelector: JQuery;
    itsLayerCollection: any;
    tipSegmentLayer: any;
    metamanagerSegments: any;
}
export declare const tipConfig: ITipConfig;
