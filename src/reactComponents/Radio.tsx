/**
 * Created by glenn on 6/12/2017.
 */


import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jquery-ui';
import makeGuid from '../util/makeGuid';
import {ChangeEvent} from "react";

export interface iRadioItem{
    groupId: string;
    text: string;
    checked: boolean;
    inline: boolean;
    change: (s: string) => any;
    connected?: boolean;
    index?: number
}

class RadioItem extends React.Component<iRadioItem, {}> {
    guid: string;

    constructor(props: iRadioItem, context: Object){
        super(props, context);
        this.guid = makeGuid()
    }


    render() {
        let style = {};
        if (this.props.inline) {
            style = {
                display: 'inline-block',
                padding: '0 5px'
            };
        }

        let props = {
            id: this.guid,
            type: "radio",
            name: this.props.groupId,
            value: typeof this.props.index == 'undefined' ? this.props.text : this.props.index.toFixed(),
            onChange: (evt: ChangeEvent<HTMLInputElement>) => {
                this.props.change(evt.target.value);
                evt.target.checked = true;
            },
            checked: this.props.checked,
            defaultChecked:  this.props.checked
        };

        if (this.props.connected) {
            delete props.defaultChecked;
        } else {
            delete props.checked
        }

        return <li style={style}>
            <input {...props}/>
            <label htmlFor={this.guid}>{this.props.text}</label>
        </li>;
    }
}

interface iRadioBase {
    title: string;
    items: string[];
    callback: (val: string) => any;
    inline?: boolean;
    selectedValueOrIndex: string|number;
    connected: boolean;
    classes?: string[]
}

class RadioBase extends React.Component<iRadioBase, {}> {
    inline: boolean;
    groupId: string;

    constructor(props: iRadioBase, context: Object) {
        super(props, context);
        this.inline = this.props.inline || false;
        this.groupId = this.props.title.toLowerCase().replace(/ /g, '');
    }

    render() {

        let arr = [];

        for (let i = 0; i < this.props.items.length; i++) {

            let itemProps = {
                groupId: this.groupId,
                text: this.props.items[i],
                inline: this.props.inline,
                change: (s: string) => (this.props.callback(s)),
                key: this.props.items[i],
                connected: this.props.connected || false,
                checked: false,
                index: i
            };

            if (typeof this.props.selectedValueOrIndex == 'number'){
                itemProps.checked = i == this.props.selectedValueOrIndex;
            } else {
                itemProps.checked = this.props.items[i] == this.props.selectedValueOrIndex;
                delete itemProps.index
            }

            arr.push(<RadioItem {...itemProps}/>)
        }

        let classes = ['radio-list'];

        if (this.props.classes){
            classes = classes.concat(this.props.classes);
        }

        return <div className={classes.join(' ')}>
            <h4>{this.props.title}</h4>
            <ul style={{listStyle: 'none'}}>
                {arr}
            </ul>
        </div>
    }
}


export class Radio extends React.Component<{
    title: string, items: string[], callback: (val: string) => any, inline?: boolean,
    defaultValue: string, classes?: string[] }, {}> {

    render() {

        return <RadioBase
            title={this.props.title}
            items={this.props.items}
            callback={this.props.callback}
            inline={this.props.inline}
            selectedValueOrIndex={this.props.defaultValue}
            connected={false}
            classes={this.props.classes}
        />
    }
}

export class RadioConnected extends React.Component<{
    title: string, items: string[], callback: (val: string) => any, inline?: boolean,
    selectedIndex: number, classes?: string[] }, {}> {

    render() {
        return <RadioBase
            title={this.props.title}
            items={this.props.items}
            callback={this.props.callback}
            inline={this.props.inline}
            selectedValueOrIndex={this.props.selectedIndex}
            connected={true}
            classes={this.props.classes}
        />
    }
}