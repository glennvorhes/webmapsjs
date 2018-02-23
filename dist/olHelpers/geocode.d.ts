import ol = require('custom-ol');
export declare class Geocode {
    private theButton;
    private theInput;
    private map;
    private indicationLayer;
    constructor(mapDiv: HTMLDivElement, map: ol.Map);
    private reset();
}
