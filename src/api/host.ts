let isLocal = window.location.href.indexOf('localhost') > -1;

if (parseInt(window.location.port) !== 8081){
    isLocal = false;
}


let stage_prod = window.location.pathname.indexOf('webmapsstage') > -1 ? 'webmapsstage' : 'webmaps';

export const hostRoot = isLocal ? 'http://localhost:8081' : `https://transportal.cee.wisc.edu/gis/${stage_prod}`;

export const apiRoot = hostRoot + `/api`;

