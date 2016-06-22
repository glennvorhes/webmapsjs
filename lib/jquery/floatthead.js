'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.windowScroll = windowScroll;
exports.overflowScroll = overflowScroll;
exports.responsiveScroll = responsiveScroll;
/**
 * Created by gavorhes on 6/22/2016.
 */
var $ = require('jquery');
global.jQuery = $;

require('floatthead');

/**
 * implement the default window scroll
 * @param {jQuery} $table - jquery reference to table
 * @param {object} [options={}] float options
 */
function windowScroll($table, options) {
    "use strict";

    options = options || {};

    $table.floatThead(options);
}

/**
 *
 * @param {jQuery} $table - jquery reference to table
 * @param {jQuery} $tableContainer - jquery reference to table
 * @param {object} [options={}] float options
 */
function overflowScroll($table, $tableContainer, options) {
    "use strict";

    options = options || {};

    options.scrollContainer = function (t) {
        return $tableContainer;
    };

    $table.floatThead(options);
}

/**
 *
 * @param {jQuery} $table - jquery reference to table
 * @param {jQuery} $responsiveContainer - jquery reference to table
 * @param {object} [options={}] float options
 */
function responsiveScroll($table, $responsiveContainer, options) {
    "use strict";

    options = options || {};

    options.responsiveContainer = function (t) {
        return $responsiveContainer;
    };

    $table.floatThead(options);
}