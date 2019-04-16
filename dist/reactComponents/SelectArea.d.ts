/**
 * Created by glenn on 6/12/2017.
 */
/// <reference types="react" />
import { React } from './reactAndRedux';
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
import Map from 'ol/Map';
import Draw from 'ol/interaction/Draw';
export interface iSelectArea {
    map: Map | (() => Map);
    callback: (coords: Array<number[]>) => any;
}
export declare class SelectArea extends React.Component<iSelectArea, null> {
    map: Map;
    callback: (coords: Array<number[]>) => any;
    areaOverlay: LayerBaseVectorGeoJson;
    draw: Draw;
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
