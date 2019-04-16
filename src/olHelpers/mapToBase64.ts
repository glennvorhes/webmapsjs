import {LayerBaseVector} from "../layers";
import {fitToMap} from '../olHelpers/extentUtil';
import {layers} from "../";
import Map from 'ol/Map';

declare const glob: Object;

export interface iMapToBase64Options {
    resize?: { width: number, height: number };
    layers?: LayerBaseVector[] | LayerBaseVector[];
    delay?: number;
}



export function mapToBase64(map: Map, callback: (imgData: string) => any, options?: iMapToBase64Options): any {
    options = options || {};

    if (typeof options.delay === 'number') {
        //pass
    } else if (options.layers || options.resize) {
        options.delay = 2000;
    } else {
        options.delay = 1;
    }

    let mapTarget: HTMLDivElement = map.getTargetElement() as HTMLDivElement;

    let originalHeight = mapTarget.style.height;
    let originalWidth = mapTarget.style.width;
    let originalPosition = mapTarget.style.position;
    let originalCenter = map.getView().getCenter();
    let originalZoom = map.getView().getZoom();

    // let mapTimeout = 1;

    if (options.resize) {
        mapTarget.style.height = `${options.resize.height}px`;
        mapTarget.style.width = `${options.resize.width}px`;
        mapTarget.style.position = 'absolute';
        map.updateSize();
    }

    map.once('postrender', () => {

        if (options.layers) {
            fitToMap(options.layers, map);
        }

        setTimeout(() => {
            map.once('postcompose', (event) => {
                try {
                    let canvas: HTMLCanvasElement = event['context'].canvas;
                    let imgData = canvas.toDataURL('image/png');
                    callback(imgData);
                }
                catch (ex) {
                    console.log(ex);
                    // reportParams['imgData'] = null;
                } finally {
                    if (options.resize) {
                        mapTarget.style.height = originalHeight;
                        mapTarget.style.width = originalWidth;
                        mapTarget.style.position = originalPosition;

                        map.updateSize();
                        map.getView().setCenter(originalCenter);
                        map.getView().setZoom(originalZoom);
                    }

                    if (options.layers) {
                        fitToMap(options.layers, map);
                    }
                }
            });
            map.renderSync();
        }, options.delay);
    });

    map.updateSize();
}

export default mapToBase64;
