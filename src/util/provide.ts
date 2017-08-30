/**
 * Created by gavorhes on 12/10/2015.
 */

declare const window: Window;
/**
 * create a namespace on the gv object
 * @param {string} namespace to create
 * @returns {object} object representing the namespace
 */
function provide(namespace: string){
    "use strict";
    if (typeof (<any>window).gv == 'undefined'){
        (<any>window).gv = {};
    }

    let parts = namespace.split('.');
    let nameSpace = (<any>window).gv;

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
(<any>window).gv.util.provide = provide;

export default provide;
