/**
 * Created by glenn on 6/12/2017.
 */
/// <reference types="react" />
import { React } from './reactAndRedux';
import ol = require('custom-ol');
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
export interface iSelectArea {
    map: ol.Map | (() => ol.Map);
    callback: (coords: Array<number[]>) => any;
}
export declare class SelectArea extends React.Component<iSelectArea, null> {
    map: ol.Map;
    callback: (coords: Array<number[]>) => any;
    areaOverlay: LayerBaseVectorGeoJson;
    draw: ol.interaction.Draw;
    selectId: string;
    cancelId: string;
    selectButton: HTMLButtonElement;
    cancelButton: HTMLButtonElement;
    constructor(props: iSelectArea, context: Object);
    componentDidMount(): void;
    setArea(): void;
    cancel(): void;
    render(): JSX.Element;
}
