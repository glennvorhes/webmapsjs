/**
 * Created by glenn on 6/12/2017.
 */

import {React} from './reactRedux';
import ol = require('custom-ol');
import LayerBaseVectorGeoJson from '../layers/LayerBaseVectorGeoJson';
import {proj4326, proj3857} from '../olHelpers/projections'
import makeGuid from '../util/makeGuid';
import getMap from './helpers/get_map';


export class SelectArea extends React.Component<{ map: ol.Map | (() => ol.Map), callback: (coords: Array<number[]>) => any }, null> {
    map: ol.Map;
    callback: (coords: Array<number[]>) => any;
    areaOverlay: LayerBaseVectorGeoJson;
    draw: ol.interaction.Draw;
    selectId: string;
    cancelId: string;
    selectButton: HTMLButtonElement;
    cancelButton: HTMLButtonElement;


    constructor(props, context) {
        super(props, context);

        this.selectId = makeGuid();
        this.cancelId = makeGuid();

        this.callback = this.props.callback;

        this.areaOverlay = new LayerBaseVectorGeoJson('',
            {
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 237, 0.1)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgb(255, 0, 237)',
                        width: 2
                    })
                }),
                transform: {dataProjection: proj4326, featureProjection: proj3857}
            });

        this.draw = new ol.interaction.Draw({
            source: this.areaOverlay.source,
            type: 'Polygon'
        });

        this.draw.on('drawend', (evt) => {
            this.selectButton.style.display = '';
            this.cancelButton.style.display = 'none';

            let geom = evt.feature.getGeometry();
            let geomClone = geom.clone();

            geomClone.transform('EPSG:3857', 'EPSG:4326');

            setTimeout(() => {
                this.map.removeInteraction(this.draw);
            }, 100);

            let outCoords = [];
            let ccc = geomClone.getCoordinates()[0];

            for (let cc of ccc) {
                outCoords.push([Math.round(cc[0] * 1000000) / 1000000, Math.round(cc[1] * 1000000) / 1000000]);
            }

            this.callback(outCoords);
        });
    }


    componentDidMount() {
        this.selectButton = document.getElementById(this.selectId) as HTMLButtonElement;
        this.cancelButton = document.getElementById(this.cancelId) as HTMLButtonElement;
        getMap(this.props.map, this.areaOverlay.olLayer).then((m) => {this.map = m})
    }


    setArea() {
        if (!this.map) {
            return;
        }

        this.selectButton.style.display = 'none';
        this.cancelButton.style.display = '';

        this.areaOverlay.source.clear();
        this.map.addInteraction(this.draw);
        this.callback(null);
    }

    cancel() {
        if (!this.map) {
            return;
        }
        this.selectButton.style.display = '';
        this.cancelButton.style.display = 'none';

        this.areaOverlay.source.clear();
        this.map.removeInteraction(this.draw);

        this.callback(null);
    }

    render() {
        return <div style={{margin: '10px'}}>
            <button id={this.selectId} onClick={() => {
                this.setArea()
            }}>Select Area
            </button>
            <button id={this.cancelId} onClick={() => {
                this.cancel()
            }} style={{display: 'none'}}>Cancel
            </button>
        </div>
    }
}
