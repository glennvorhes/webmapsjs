/**
 * Created by gavorhes on 5/23/2016.
 */

function _checkImport(){
    "use strict";

    if (!global.$){
        require('./jquery');
    }
}


export function requireAll(){
    "use strict";

    _checkImport();

    require('jquery-ui');

}


export function requireComponent(component){
    "use strict";

    _checkImport();

    require('jquery-ui/' + component);

}
