import $ = require('jquery')
import {makeGuid} from '../util/makeGuid';
import {proj3857, proj4326} from './projections';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';



let invalidClass = 'geocoder-invalid';
let geocoderLoadingClass = 'geocoder-loading';
import Map from 'ol/Map';
import Style from "ol/style/Style";

// let testAddress = '65 7th Street, Prairie du Sac, WI';


export class Geocode {
    private theButton: HTMLButtonElement;
    private theInput: HTMLInputElement;
    private map: Map;
    private indicationLayer;

    constructor(mapDiv: HTMLDivElement, map: Map) {
        let inputGuid = makeGuid();
        let buttonGuid = makeGuid();

        this.map = map;
        this.indicationLayer = new Vector({
            source: new VectorSource(),
            style: new Style({
                image: new Circle({
                    radius: 12,
                    fill: new Fill({color: 'rgba(255,0,0,0.5)'}),
                    stroke: new Stroke({color: 'red', width: 1})
                })
            })
        });
        this.map.addLayer(this.indicationLayer);

        $(mapDiv).append('<div class="geocoder-el">' +
            `<input type="text" id="${inputGuid}">` +
            `<button id="${buttonGuid}">Search</button>` +
            '</div>');

        this.theButton = document.getElementById(buttonGuid) as HTMLButtonElement;
        this.theInput = document.getElementById(inputGuid) as HTMLInputElement;

        this.reset();

        let $theButton = $(this.theButton);
        let $theInput = $(this.theInput);

        $theButton.click((evt) => {

            evt.preventDefault();

            $theButton.addClass(geocoderLoadingClass);
            this.theButton.disabled = true;
            this.indicationLayer.getSource().clear();

            $.get(
                `https://geocode.xyz/${this.theInput.value}?geoit=json`,
                {},
                (d) => {
                    let lat = parseFloat(d['latt']);
                    let lon = parseFloat(d['longt']);

                    if ((lat == 0 && lon == 0) || d['error']) {
                        $theInput.addClass(invalidClass);
                        this.theInput.title = 'Specified Location Invalid';
                        this.theButton.title = 'Specified Location Invalid';

                    } else {
                        let v = this.map.getView();
                        let p = new Point([lon, lat]);
                        let feat = new Feature(p);
                        this.indicationLayer.getSource().addFeature(feat);
                        p.transform(proj4326, proj3857);

                        v.setCenter(p.getCoordinates());
                        v.setZoom(13);
                    }

                    $theButton.removeClass(geocoderLoadingClass);
                    this.theButton.disabled = false;
                },
                'json');
        });

        $(this.theInput).keyup((evt) => {
            evt.preventDefault();
            this.theButton.disabled = this.theInput.value.length == 0;
            $theInput.removeClass(invalidClass);
            this.theInput.title = '';
            this.theButton.title = '';

            if (!this.theButton.disabled && evt.keyCode == 13) {
                $theButton.click();
            }
        })
    }

    private reset() {
        this.theButton.disabled = true;
        this.theInput.value = '';
    }


// https://geocode.xyz/65%2075h%20street%20prairie%20du%20sac%20wi?geoit=json

// error
// geocoder-invalid

}



