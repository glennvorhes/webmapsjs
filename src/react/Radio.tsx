/**
 * Created by glenn on 6/12/2017.
 */


import {React} from './reactAndRedux';
import $ = require('jquery');
import 'jquery-ui';
import makeGuid from '../util/makeGuid';

class RadioItem extends React.Component<{ groupId: string, text: string, checked: boolean, inline: boolean, change: (s: string) => any, connected?: boolean, index?: number}, null> {
    guid: string = makeGuid();


    render() {
        let style = {};
        if (this.props.inline) {
            style['display'] = 'inline-block';
            style['padding'] = '0 5px';
        }

        let props = {
            id: this.guid,
            type: "radio",
            name: this.props.groupId,
            value: typeof this.props.index == 'undefined' ? this.props.text : this.props.index.toFixed(),
            onChange: (evt) => {
                this.props.change(evt.target.value);
                evt.target.checked = true;
            }
        };

        if (this.props.connected) {
            props['checked'] = this.props.checked
        } else {
            props['defaultChecked'] = this.props.checked
        }

        return <li style={style}>
            <input {...props}/>
            <label htmlFor={this.guid}>{this.props.text}</label>
        </li>;
    }
}

class RadioBase extends React.Component<
    { title: string, items: string[], callback: (val: string) => any, inline?: boolean, selectedValueOrIndex: string|number, connected: boolean}, null> {
    inline: boolean;
    groupId: string;

    constructor(props, context) {
        super(props, context);
        this.inline = this.props.inline || false;
        this.groupId = this.props.title.toLowerCase().replace(/ /g, '');
    }

    render() {
        let style = {};
        if (this.inline) {
            style['display'] = 'inline-block';
            style['padding'] = '0 5px';
        }

        let arr = [];

        for (let i = 0; i < this.props.items.length; i++) {

            let itemProps = {
                groupId: this.groupId,
                text: this.props.items[i],
                inline: this.props.inline,
                change: (s) => (this.props.callback(s)),
                key: this.props.items[i],
                connected: this.props.connected || false,
                checked: false,

            };

            if (typeof this.props.selectedValueOrIndex == 'number'){
                itemProps.checked = i == this.props.selectedValueOrIndex;
                itemProps['index'] = i;
            } else {
                itemProps.checked = this.props.items[i] == this.props.selectedValueOrIndex;
            }

            arr.push(<RadioItem {...itemProps}/>)
        }

        return <div>
            <h4 style={{margin: '7px 0'}}>{this.props.title}</h4>
            <ul style={{listStyle: 'none', margin: '0', paddingLeft: "10px", maxHeight: "200px", overflowY: 'auto'}}>
                {arr}
            </ul>
        </div>
    }
}


export class Radio extends React.Component<{ title: string, items: string[], callback: (val: string) => any, inline?: boolean, defaultValue: string }, null> {

    render() {
        return <RadioBase
            title={this.props.title}
            items={this.props.items}
            callback={this.props.callback}
            inline={this.props.inline}
            selectedValueOrIndex={this.props.defaultValue}
            connected={false}
        />
    }
}

export class RadioConnected extends React.Component<{ title: string, items: string[], callback: (val: string) => any, inline?: boolean, selectedIndex: number }, null> {

    render() {
        return <RadioBase
            title={this.props.title}
            items={this.props.items}
            callback={this.props.callback}
            inline={this.props.inline}
            selectedValueOrIndex={this.props.selectedIndex}
            connected={true}
        />
    }
}