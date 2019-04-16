/**
 * Created by glenn on 7/6/2017.
 */
import Map from 'ol/Map';
import Base from 'ol/layer/Base';

export default function (map: Map | (() => Map), layer: Base): Promise<Map> {
    return new Promise((resolve, reject) => {

        if (typeof map == 'function') {
            let getMap = map as () => Map;

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
            let m = map as Map;
            m.addLayer(layer);
            resolve(m);
        }
    });
}

