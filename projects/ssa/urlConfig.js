/**
 * Created by gavorhes on 5/5/2016.
 */
import provide from '../../src/util/provide';
let nm = provide('ssa');

let prefix = '/SSA/';

const urlConfig = {
    startCounty: prefix + 'getStartCounties',
    highways: prefix + 'getHighways',
    endCounty: prefix + 'getEndCounties',
    fromRp: prefix + 'getFromRps',
    toRp: prefix + 'getFromRps',
    corridorUrl: prefix + 'getCorridor'
};

nm.urlConfig = urlConfig;
export default urlConfig;
