/// <reference types="react" />
/**
 * Created by glenn on 7/6/2017.
 */
import { React } from './reactAndRedux';
export interface iSlider {
    change: (d: number) => any;
    steps?: number;
    animate?: boolean;
    value?: number;
}
export declare class Slider extends React.Component<iSlider, null> {
    private uid;
    private startUid;
    private stopUid;
    private previousUid;
    private nextUid;
    private intervalUid;
    private el;
    private previousButton;
    private nextButton;
    private startButton;
    private stopButton;
    private intervalSelect;
    private interval;
    private running;
    private minVal;
    private maxVal;
    private step;
    constructor(props: iSlider, context: Object);
    componentDidMount(): void;
    updateRunning(): void;
    startAnimate(): void;
    stopAnimate(): void;
    restartAnimate(): void;
    increment(v: number): void;
    render(): JSX.Element;
}
