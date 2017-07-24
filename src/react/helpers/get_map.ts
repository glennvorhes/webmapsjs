/**
 * Created by glenn on 7/6/2017.
 */
import ol = require('custom-ol');

export default function (map: ol.Map | (() => ol.Map), layer: ol.layer.Base): Promise<ol.Map> {
    return new Promise((resolve, reject) => {

        if (typeof map == 'function') {
            let getMap = map as () => ol.Map;

            let g = setInterval(() => {
                let m = getMap();

                if (m) {
                    m.addLayer(layer);
                    clearInterval(g);
                    resolve(m);
/*                    console.log(m);
                    return m;*/
                }
            }, 15);
        } else {
            let m = map as ol.Map;
            m.addLayer(layer);
            resolve(m);
        }
    });
}

