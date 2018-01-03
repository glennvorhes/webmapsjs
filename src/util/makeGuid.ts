/**
 * Created by gavorhes on 11/3/2015.
 */

import provide from './provide';
let nm = provide('util');


/**
 * guids are used to uniquely identify groups and features
 * @returns {string} a new guid
 */
export function makeGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;

                return v.toString(16);
            });

}
nm.makeGuid = makeGuid;
export default makeGuid;


