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
    constructor(parent: any, labelContent: any, contentGen?: contentGenerator);
    /**
     *
     * @returns {jQuery}
     */
    box: JQuery;
    changed(): void;
    /**
     *
     * @param {selectChangeCallback} func
     */
    addChangeListener(func: selectChangeCallback): void;
    /**
     *
     * @returns {string|number}
     */
    /**
     *
     * @param {string|number} v
     * @protected
     */
    selectedValue: any;
    selectedText: string;
}
export default SelectBoxBase;
