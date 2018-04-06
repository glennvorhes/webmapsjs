/**
 * Created by gavorhes on 5/13/2016.
 */

import makeGuid from '../util/makeGuid';
import provide from '../util/provide';
const nm = provide('domUtil');

export interface selectChangeCallback{
    /**
     *
     * @param theValue the current select value of the select box
     */
    (theValue: string) : void
}

/**
 * must return in the contents <select id="${guid}"></select> among other things
 */
export interface contentGenerator{
    /**
     * @param aGuid
     */
    (aGuid: string): string
}


export class SelectBoxBase{
    _$container: JQuery;
    $label: JQuery;
    _box: JQuery;
    _changeListeners: Array<selectChangeCallback>;
    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenerator} [contentGen=undefined]
     */
    constructor(parent: JQuery, labelContent: string, contentGen?: contentGenerator){
        let guidTop = makeGuid();
        let guid = makeGuid();

        let htmlString = `<div id="${guidTop}">`;
        htmlString += `<label for="${guid}">${labelContent}</label>`;

        if (contentGen){
            htmlString += contentGen(guid);
        } else {
            htmlString += `<select id="${guid}"></select>`;
        }
        htmlString += '</div>';

        parent.append(htmlString);

        this._$container = parent.find('#' + guidTop);

        this.$label = this._$container.find('label');

        /**
         *
         * @type {Array<selectChangeCallback>}
         * @private
         */
        this._changeListeners = [];

        this._box = parent.find(`#${guid}`);
        
        if (!this._box){
            throw 'the select box was not found';
        }

        this._box.change(() => {
            this.changed();
        })
    }

    /**
     * 
     * @returns {jQuery}
     */
    get box(){
        return this._box;
    }

    changed(){
        let v = this._box.val();
        
        for (let f of this._changeListeners){
            f(v);
        }
    }

    /**
     *
     * @param {selectChangeCallback} func
     */
    addChangeListener(func: selectChangeCallback){
        this._changeListeners.push(func);
    }


    get selectedValue(): string|number{
        let theVal = this.box.val();

        if (theVal == null || typeof theVal == 'undefined'){
            return null;
        } else if (isNaN(theVal)){
            return theVal
        } else {
            if (theVal.indexOf('.') > -1){
                return parseFloat(theVal)
            } else {
                return parseInt(theVal);
            }
        }
    }

    get selectedIndex(): number {
        return (this._box[0] as HTMLSelectElement).selectedIndex;
    }

    /**
     *
     * @param {string|number} v
     */
    set selectedValue(v: string|number){
        this.box.val(v);
    }
    
    get selectedText(){
        return this.box.find('option:selected').text();
    }

}

nm.SelectBoxBase = SelectBoxBase;

export default SelectBoxBase;
