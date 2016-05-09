/**
 * Created by gavorhes on 5/5/2016.
 */

import LayerBaseVectorGeoJson from '../../src/layers/LayerBaseVectorGeoJson';
import ol from '../../src/custom-ol';
import $ from '../../src/jquery';

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        }[s];
    });
}


function layerConfigHelper(name, color, visible) {
    "use strict";

    return {
        minZoom: 4,
        name: name,
        transform: {dataProjection: 'EPSG:3857', featureProjection: 'EPSG:3857'},
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 5
            })
        }),
        visible: visible
    };
}

/**
 *
 * @type {Array}
 */
let returnedColors = [];
let colorOptions = ['Aquamarine', 'Chartreuse', 'CornflowerBlue', 'Cyan', 'DarkOrange', 'DeepSkyBlue', 'GreenYellow',
    'Salmon', 'Magenta', 'Orchid', 'Turquoise ', 'Tomato'];


function randomColor() {
    "use strict";
    if (returnedColors.length == colorOptions.length) {
        returnedColors = [];
    }
    while (true) {
        let c = colorOptions[Math.floor(parseInt(Math.random() * colorOptions.length))];
        if (returnedColors.indexOf(c) < 0) {
            returnedColors.push(c);

            return c;
        }
    }
}


class Corridor {

    /**
     *
     * @param {string} fromRp from reference point
     * @param {string} toRp to reference point
     * @param {string} startCounty start county
     * @param {string} endCounty end county
     * @param {string} highway route
     * @param {Array<object>|*} [features=[]] feature array
     * @param {number|string|*} databaseId in the db
     */
    constructor(fromRp, toRp, startCounty, endCounty, highway, features, databaseId) {
        features = features && features.constructor.name == 'Array' ? features : [];

        this.databaseId = databaseId;
        this.startCounty = startCounty;
        this.endCounty = endCounty;
        this.highway = highway;
        this.fromRp = fromRp;
        this.toRp = toRp;
        this.clientId = (fromRp + '-' + toRp).replace(/ /g, '_');
        this._color = randomColor();
        this._corridorLayer = new LayerBaseVectorGeoJson('',
            layerConfigHelper(this.fromRp + ' - ' + this.toRp, this._color, true)
        );

        if (features.length > 0) {
            this._corridorLayer.source.addFeatures(features);
        } else {
            $.get(getCorridorUrl, {rp1: fromRp, rp2: toRp}, (d) => {
                this._corridorLayer.addFeatures(d);
            }, 'json');
        }
    }

    getTableHtml() {
        let outString = `<tr id="${this.clientId}" class="corridor-tr" style="background-color: ${this._color}">`;
        outString += `<td>${this.startCounty}</td>`;
        outString += `<td>${this.endCounty}</td>`;
        outString += `<td>${this.highway}</td>`;
        outString += `<td>${this.fromRp}</td>`;
        outString += `<td>${this.toRp}</td>`;
        outString += '</tr>';

        return outString;
    }

    getDataHtml(i) {
        let outString = '<div class="corridor-data">';
        outString += `<input type="hidden" class="corridor-data-database-id" name="corridors[${i}].corridorId" value="${this.databaseId}"/>`;
        outString += `<input type="hidden" class="corridor-data-start-county" name="corridors[${i}].startCounty" value="${this.startCounty}"/>`;
        outString += `<input type="hidden" class="corridor-data-end-county" name="corridors[${i}].endCounty" value="${this.endCounty}"/>`;
        outString += `<input type="hidden" class="corridor-data-highway" name="corridors[${i}].highway" value="${this.highway}"/>`;
        outString += `<input type="hidden" class="corridor-data-from-rp" name="corridors[${i}].fromRp" value="${this.fromRp}"/>`;
        outString += `<input type="hidden" class="corridor-data-to-rp" name="corridors[${i}].toRp" value="${this.toRp}"/>`;
        outString += `</div>`;

        return outString;
    }

    getDataHtmlDisp(i) {
        let returnString = this.getDataHtml(i);
        returnString = escapeHtml(returnString);
        returnString = returnString.replace(/&quot;&#x2F;&gt;/g, '&quot;&#x2F;&gt;<br>');
        returnString = returnString.replace(/corridor-data&quot;&gt;/g, 'corridor-data&quot;&gt;<br>');

        return returnString + '<br>';
    }

    get olLayer() {
        return this._corridorLayer.olLayer;

    }

    get layer() {
        return this._corridorLayer;
    }


    /**
     *
     * @returns {boolean} if corridor layer is visible
     */
    get visible() {
        return this._corridorLayer.visible;
    }

    /**
     *
     * @param {boolean} vis if corridor layer is visible
     */
    set visible(vis) {
        this._corridorLayer.visible = vis;
    }

    /**
     *
     * @returns {Array.<ol.Feature>} an array of ol features
     */
    get features() {
        return this._corridorLayer.features;
    }

    /**
     *
     * @param {Array.<ol.Feature>} feats array of ol features
     */
    set features(feats) {
        this._corridorLayer.clear();
        this._corridorLayer.source.addFeatures(feats);
    }
}

nm.Corridor = Corridor;
