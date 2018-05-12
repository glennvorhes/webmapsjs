"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isLocal = window.location.href.indexOf('localhost') > -1;
var stage_prod = window.location.pathname.indexOf('webmapsstage') > -1 ? 'webmapsstage' : 'webmaps';
var apiRoot = isLocal ? 'http://localhost:8081/api' : "https://transportal.cee.wisc.edu/gis/" + stage_prod + "/api";
exports.default = apiRoot;
//# sourceMappingURL=_host.js.map