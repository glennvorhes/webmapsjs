"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isLocal = window.location.href.indexOf('localhost') > -1;
if (parseInt(window.location.port) !== 8081) {
    isLocal = false;
}
var stage_prod = window.location.pathname.indexOf('webmapsstage') > -1 ? 'webmapsstage' : 'webmaps';
exports.hostRoot = isLocal ? 'http://localhost:8081' : "https://transportal.cee.wisc.edu/gis/" + stage_prod;
exports.apiRoot = exports.hostRoot + "/api";
//# sourceMappingURL=host.js.map