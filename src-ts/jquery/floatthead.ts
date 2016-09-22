/**
 * Created by gavorhes on 6/22/2016.
 */
const $ = require('jquery');
global['jQuery'] = $;

require('floatthead');



/**
 * implement the default window scroll
 * @param {jQuery} $table - jquery reference to table
 * @param {object} [options={}] float options
 */
export function windowScroll($table, options){
    "use strict";
    options = options || {};

    $table['floatThead'](options);
}

/**
 *
 * @param {jQuery} $table - jquery reference to table
 * @param {jQuery} $tableContainer - jquery reference to table
 * @param {object} [options={}] float options
 */
export function overflowScroll($table: JQuery, $tableContainer: JQuery, options?){
    "use strict";
    options = options || {};

    options.scrollContainer = (t) => {
        return $tableContainer;
    };

     $table['floatThead'](options);
}

/**
 *
 * @param {jQuery} $table - jquery reference to table
 * @param {jQuery} $responsiveContainer - jquery reference to table
 * @param {object} [options={}] float options
 */
export function responsiveScroll($table: JQuery, $responsiveContainer: JQuery, options?) {
    "use strict";
    options = options || {};

    options.responsiveContainer = (t) => {
        return $responsiveContainer;
    };

    $table['floatThead'](options);
}
