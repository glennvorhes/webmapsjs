/**
 * Created by glenn on 7/6/2017.
 */
import Map from 'ol/Map';
import Base from 'ol/layer/Base';
export default function (map: Map | (() => Map), layer: Base): Promise<Map>;
