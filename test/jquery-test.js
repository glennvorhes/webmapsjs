/**
 * Created by gavorhes on 5/23/2016.
 */


import $ from '../src/jquery/jquery';
import  '../src/jquery/jquery-ui';

import '../src/jquery-plugin/day-range';
//
// // require('jquery-ui/accordion');
//
// // ui.requireAll();
// // ui.requireComponent('accordion');
//
// console.log($);
//
//
let acc = $("#accordion").accordion();
$('#cat').dayRange(10);
// glob.acc = acc;
console.log(acc);

