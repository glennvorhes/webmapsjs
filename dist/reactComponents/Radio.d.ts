/// <reference types="react" />
/**
 * Created by glenn on 6/12/2017.
 */
import { React } from './reactAndRedux';
import 'jquery-ui';
export interface iRadioItem {
    groupId: string;
    text: string;
    checked: boolean;
    inline: boolean;
    change: (s: string) => any;
    connected?: boolean;
    index?: number;
}
export declare class Radio extends React.Component<{
    title: string;
    items: string[];
    callback: (val: string) => any;
    inline?: boolean;
    defaultValue: string;
    classes?: string[];
}, null> {
    render(): JSX.Element;
}
export declare class RadioConnected extends React.Component<{
    title: string;
    items: string[];
    callback: (val: string) => any;
    inline?: boolean;
    selectedIndex: number;
    classes?: string[];
}, null> {
    render(): JSX.Element;
}
