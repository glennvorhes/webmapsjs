/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactRedux';
import ol = require('custom-ol');
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
export declare class SelectArea extends React.Component<{
    map: ol.Map | (() => ol.Map);
    callback: (coords: Array<number[]>) => any;
}, null> {
    map: ol.Map;
    callback: (coords: Array<number[]>) => any;
    areaOverlay: LayerBaseVectorGeoJson;
    draw: ol.interaction.Draw;
    selectId: string;
    cancelId: string;
    selectButton: HTMLButtonElement;
    cancelButton: HTMLButtonElement;
    constructor(props: any, context: any);
    componentDidMount(): void;
    setArea(): void;
    cancel(): void;
    render(): JSX.Element;
}
