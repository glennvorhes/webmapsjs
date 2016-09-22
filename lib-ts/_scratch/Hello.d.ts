/**
 * Created by gavorhes on 9/22/2016.
 */
import * as React from "react";
export interface HelloProps {
    compiler: string;
    framework: string;
}
export declare class Hello extends React.Component<HelloProps, {}> {
    render(): JSX.Element;
}
