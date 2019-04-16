/**
 * Created by gavorhes on 12/14/2015.
 */
import LayerItsInventory from "../layers/LayerItsInventory";
import Map from 'ol/Map';
export declare class ItsLayerCollection {
    _map: Map;
    _layers: Array<LayerItsInventory>;
    /**
     * Create a collection of all ITS layers
     * @param theMap the openlayers map
     * @param {Array} [exclude=[]] array of Its layer identifiers to exclude
     *
     * BLUE Bluetooth Detector - Bluetooth Detector
     * CABINET Cabinets - The cabinets
     * CCTV Camera - Traffic Cameras
     * HUT Communication Hut - Communication Hut
     * VAULT Communication Vault - The communication vaults
     * HAR Highway Advisory Radio - Advisory Radios
     * LIGHT Lighting - Lighting
     * LOOP Loop Detectors - Loop Detectors
     * DMS Message Board - Message Boards and Signs
     * MICROWAVE Microwave Detector - Microwave Detectors
     * PULL Pull Box - A pull box
     * RWIS RWIS - Road weather information system
     * GATE Ramp Gate - The ramp Gates
     * METER Ramp Meter - The ramp meters
     * SIGNAL Signal - Traffic Signal
     * TOWER Tower - The towers
     * TRENCH
     */
    constructor(theMap: Map, exclude?: Array<string>);
    /**
     * Return the array of layers in this collection
     * @returns {Array<LayerItsInventory>} an array of layers
     */
    readonly layers: LayerItsInventory[];
}
export default ItsLayerCollection;
