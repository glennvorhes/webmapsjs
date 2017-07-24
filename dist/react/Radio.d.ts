/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export declare class Radio extends React.Component<{
    title: string;
    items: string[];
    callback: (val: string) => any;
    inline?: boolean;
    defaultValue: string;
}, null> {
    render(): JSX.Element;
}
export declare class RadioConnected extends React.Component<{
    title: string;
    items: string[];
    callback: (val: string) => any;
    inline?: boolean;
    selectedIndex: number;
}, null> {
    render(): JSX.Element;
}
