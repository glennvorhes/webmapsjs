/**
 * Created by gavorhes on 6/23/2016.
 */
import provide from './provide';
let nm = provide('util');


function isNumber(checkVal: any):  boolean{
    let returnVal = parseFloat(checkVal);

    return !isNaN(returnVal);
}

/**
 *
 * @returns {object} object representation of url params
 */
export default function getUrlParams() {
    "use strict";

    let match;
    let pl = /\+/g;  // Regex for replacing addition symbol with a space
    let search = /([^&=]+)=?([^&]*)/g;
    let decode = function (s: string) {
        return decodeURIComponent(s.replace(pl, " "));
    };
    let query = window.location.search.substring(1);

    let urlParams = {};
    while (match = search.exec(query)) {
        /**
         * @type {string}
         */
        let val =  decode(match[2]).trim();

        let typedVal = null;
        if (val.length == 0){
            // pass
        }
        else if (isNumber(val)){
            if (val.indexOf('.') > -1){
                typedVal = parseFloat(val);
            } else {
                typedVal = parseInt(val);
            }
        }
        else if (val.toLowerCase() == 'false' || val.toLowerCase() == 'true'){
            typedVal = val.toLowerCase() == 'true';
        }
        else {
            typedVal = val;
        }
        (<any>urlParams)[decode(match[1])] = typedVal;
    }

    return urlParams;
}

nm.getUrlParams = getUrlParams;


