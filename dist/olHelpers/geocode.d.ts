import Map from 'ol/Map';
export declare class Geocode {
    private theButton;
    private theInput;
    private map;
    private indicationLayer;
    constructor(mapDiv: HTMLDivElement, map: Map);
    private reset;
}
