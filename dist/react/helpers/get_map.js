"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(map, layer) {
    return new Promise(function (resolve, reject) {
        if (typeof map == 'function') {
            var getMap_1 = map;
            var g_1 = setInterval(function () {
                var m = getMap_1();
                if (m) {
                    m.addLayer(layer);
                    clearInterval(g_1);
                    resolve(m);
                    /*                    console.log(m);
                                        return m;*/
                }
            }, 15);
        }
        else {
            var m = map;
            m.addLayer(layer);
            resolve(m);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=get_map.js.map