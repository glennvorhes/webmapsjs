/// <reference types="jquery" />
/// <reference types="jqueryui" />
export interface selectChangeCallback {
    /**
     *
     * @param theValue the current select value of the select box
     */
    (theValue: string): void;
}
/**
 * must return in the contents <select id="${guid}"></select> among other things
 */
export interface contentGenerator {
    /**
     * @param aGuid
     */
    (aGuid: string): string;
}
export declare class SelectBoxBase {
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
    constructor(parent: JQuery, labelContent: string, contentGen?: contentGenerator);
    /**
     *
     * @returns {jQuery}
     */
    readonly box: JQuery;
    changed(): void;
    /**
     *
     * @param {selectChangeCallback} func
     */
    addChangeListener(func: selectChangeCallback): void;
    /**
     *
     * @param {string|number} v
     */
    selectedValue: string | number;
    readonly selectedText: string;
}
export default SelectBoxBase;
