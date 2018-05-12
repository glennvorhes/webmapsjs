let isLocal = window.location.href.indexOf('localhost') > -1;

let stage_prod = window.location.pathname.indexOf('webmapsstage') > -1 ? 'webmapsstage' : 'webmaps';

const apiRoot = isLocal ? 'http://localhost:8081/api' : `https://transportal.cee.wisc.edu/gis/${stage_prod}/api`;

export default apiRoot;