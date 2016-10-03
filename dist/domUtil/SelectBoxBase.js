"use strict";
/**
 * Created by gavorhes on 5/13/2016.
 */
/**
 * Created by gavorhes on 5/12/2016.
 */
var makeGuid_1 = require('../util/makeGuid');
var provide_1 = require('../util/provide');
var nm = provide_1.default('domUtil');
var SelectBoxBase = (function () {
    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenerator} [contentGen=undefined]
     */
    function SelectBoxBase(parent, labelContent, contentGen) {
        var _this = this;
        var guidTop = makeGuid_1.default();
        var guid = makeGuid_1.default();
        var htmlString = "<div id=\"" + guidTop + "\">";
        htmlString += "<label for=\"" + guid + "\">" + labelContent + "</label>";
        if (contentGen) {
            htmlString += contentGen(guid);
        }
        else {
            htmlString += "<select id=\"" + guid + "\"></select>";
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
        this._box = parent.find("#" + guid);
        if (!this._box) {
            throw 'the select box was not found';
        }
        this._box.change(function () {
            _this.changed();
        });
    }
    Object.defineProperty(SelectBoxBase.prototype, "box", {
        /**
         *
         * @returns {jQuery}
         */
        get: function () {
            return this._box;
        },
        enumerable: true,
        configurable: true
    });
    SelectBoxBase.prototype.changed = function () {
        var v = this._box.val();
        for (var _i = 0, _a = this._changeListeners; _i < _a.length; _i++) {
            var f = _a[_i];
            f(v);
        }
    };
    /**
     *
     * @param {selectChangeCallback} func
     */
    SelectBoxBase.prototype.addChangeListener = function (func) {
        this._changeListeners.push(func);
    };
    Object.defineProperty(SelectBoxBase.prototype, "selectedValue", {
        get: function () {
            var theVal = this.box.val();
            if (theVal == null || typeof theVal == 'undefined') {
                return null;
            }
            else if (isNaN(theVal)) {
                return theVal;
            }
            else {
                if (theVal.indexOf('.') > -1) {
                    return parseFloat(theVal);
                }
                else {
                    return parseInt(theVal);
                }
            }
        },
        /**
         *
         * @param {string|number} v
         */
        set: function (v) {
            this.box.val(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectBoxBase.prototype, "selectedText", {
        get: function () {
            return this.box.find('option:selected').text();
        },
        enumerable: true,
        configurable: true
    });
    return SelectBoxBase;
}());
exports.SelectBoxBase = SelectBoxBase;
nm.SelectBoxBase = SelectBoxBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectBoxBase;
//# sourceMappingURL=SelectBoxBase.js.map