/// <reference types="react" />
/**
 * Created by glenn on 7/6/2017.
 */
import { React } from './reactRedux';
export declare class Slider extends React.Component<{
    change: (d: number) => any;
    steps?: number;
    animate?: boolean;
}, null> {
    uid: string;
    startUid: string;
    endUid: string;
    intervalUid: string;
    el: HTMLInputElement;
    startButton: HTMLButtonElement;
    endButton: HTMLButtonElement;
    intervalSelect: HTMLSelectElement;
    interval: number;
    running: boolean;
    minVal: number;
    maxVal: number;
    step: number;
    constructor(props: any, context: any);
    componentDidMount(): void;
    updateRunning(): void;
    startAnimate(): void;
    stopAnimate(): void;
    restartAnimate(): void;
    render(): JSX.Element;
}
