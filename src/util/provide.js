/**
 * Created by gavorhes on 12/10/2015.
 */


/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace){
    "use strict";
    if (typeof window.gv == 'undefined'){
        window.gv = {};
    }

    let parts = namespace.split('.');
    let nameSpace = window.gv;

    for (let i=0; i< parts.length; i++){
        let newObject = nameSpace[parts[i]];

        if (typeof newObject == 'undefined'){
            nameSpace[parts[i]] = {};
        }

        nameSpace = nameSpace[parts[i]];
    }

    return nameSpace;
}

provide('util');
window.gv.util.provide = provide;

export default provide;
