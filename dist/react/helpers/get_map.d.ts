/**
 * Created by glenn on 7/6/2017.
 */
import ol = require('custom-ol');
export default function (map: ol.Map | (() => ol.Map), layer: ol.layer.Base): Promise<ol.Map>;
