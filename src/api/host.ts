let isLocal = window.location.href.indexOf('localhost') > -1;

let stage_prod = window.location.pathname.indexOf('webmapsstage') > -1 ? 'webmapsstage' : 'webmaps';

export const hostRoot = isLocal ? 'http://localhost:8081' : `https://transportal.cee.wisc.edu/gis/${stage_prod}`;

export const apiRoot = hostRoot + `/api`;

