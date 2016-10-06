'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by gavorhes on 5/13/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/**
 * Created by gavorhes on 5/12/2016.
 */


var _makeGuid = require('webmapsjs/src/util/makeGuid');

var _makeGuid2 = _interopRequireDefault(_makeGuid);

var _provide = require('webmapsjs/src/util/provide');

var _provide2 = _interopRequireDefault(_provide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nm = (0, _provide2.default)('ssa.select');

var SelectBoxBase = function () {

    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenFunc} [contentGen=undefined] 
     */

    function SelectBoxBase(parent, labelContent, contentGen) {
        var _this = this;

        _classCallCheck(this, SelectBoxBase);

        var guidTop = (0, _makeGuid2.default)();
        var guid = (0, _makeGuid2.default)();

        var htmlString = '<div id="' + guidTop + '">';
        htmlString += '<label for="' + guid + '">' + labelContent + '</label>';

        if (contentGen) {
            htmlString += contentGen(guid);
        } else {
            htmlString += '<select id="' + guid + '"></select>';
        }
        htmlString += '</div>';

        parent.append(htmlString);

        this._$container = parent.find('#' + guidTop);

        this.$label = this._$container.find('label');

        /**
         *
         * @type {Array<changeListener>}
         * @private
         */
        this._changeListeners = [];

        /**
         * reference to the selector box
         * @protected
         * @type {jQuery}
         */
        this._box = parent.find('#' + guid);

        if (!this._box) {
            throw 'the select box was not found';
        }

        this._box.change(function () {
            _this.changed();
        });
    }

    /**
     * 
     * @returns {jQuery}
     */


    _createClass(SelectBoxBase, [{
        key: 'changed',
        value: function changed() {
            var v = this._box.val();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._changeListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;

                    f(v);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         *
         * @param {changeListener} func
         */

    }, {
        key: 'addChangeListener',
        value: function addChangeListener(func) {
            this._changeListeners.push(func);
        }

        /**
         *
         * @returns {string|number}
         */

    }, {
        key: 'box',
        get: function get() {
            return this._box;
        }
    }, {
        key: 'selectedValue',
        get: function get() {
            var theVal = this.box.val();

            if (theVal == null || typeof theVal == 'undefined') {
                return null;
            } else if (isNaN(theVal)) {
                return theVal;
            } else {
                if (theVal.indexOf('.') > -1) {
                    return parseFloat(theVal);
                } else {
                    return parseInt(theVal);
                }
            }
        }

        /**
         *
         * @param {string|number} v
         * @protected
         */
        ,
        set: function set(v) {
            this.box.val(v);
        }
    }, {
        key: 'selectedText',
        get: function get() {
            return this.box.find('option:selected').text();
        }
    }]);

    return SelectBoxBase;
}();

nm.SelectBoxBase = SelectBoxBase;

exports.default = SelectBoxBase;
module.exports = exports['default'];