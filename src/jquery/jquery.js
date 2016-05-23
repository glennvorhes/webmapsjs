/**
 * Created by gavorhes on 5/23/2016.
 */

// import $ from 'jquery';
 const n = require('jquery');
console.log(n);

import l from 'jquery';
console.log(l);


export default (function(){
    "use strict";
    const $ = require('jquery/dist/jquery.min');

    // const g = require('../olHelpers/quickMap');

    // console.log(g);

    console.log($);
    global.$ = $;
    global.jQuery = $;
    
    return $;
})();
