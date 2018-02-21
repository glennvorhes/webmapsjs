import $ = require('jquery')
import {makeGuid} from '../util/makeGuid';
import ol = require('custom-ol');
import {proj3857, proj4326} from './projections';


let invalidClass = 'geocoder-invalid';
let geocoderLoadingClass = 'geocoder-loading';

// let testAddress = '65 7th Street, Prairie du Sac, WI';


export class Geocode {
    private theButton: HTMLButtonElement;
    private theInput: HTMLInputElement;
    private map: ol.Map;
    private indicationLayer;

    constructor(mapDiv: HTMLDivElement, map: ol.Map) {
        let inputGuid = makeGuid();
        let buttonGuid = makeGuid();

        this.map = map;
        this.indicationLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({color: 'rgba(255,0,0,0.5)'}),
                    stroke: new ol.style.Stroke({color: 'red', width: 1})
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
                        let p = new ol.geom.Point([lon, lat]);
                        let feat = new ol.Feature(p);
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



