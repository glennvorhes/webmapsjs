/**
 * Created by gavorhes on 12/22/2015.
 */

import npmrdsHeatmapConfig from './appConfig';
import {} from '../../../src/jquery-plugin/day-range';
import {} from '../../../src/jquery-plugin/range-change';
import * as colors from '../../../src/util/colors';
import SortedFeatures from '../../../src/olHelpers/SortedFeatures';
import $ from '../../../src/jquery';
import ol from '../../../src/custom-ol';


let $btnCancelArea = $('#btn-cancel-area');
let $btnSelectArea = $('#btn-select-area');
let $divSelectArea = $('#div-select-area');
let $ulHwyDirs = $('#ul-hwy-dirs');
let $btnSelectHwy = $('#btn-select-hwy');
//let $btnSelectHwyBack = $('#btn-select-hwy-back');
let $divHighwaySelection = $('#div-highway-selection');
let $divRight = $('#right');
let $divLeft = $('#left');
let $ckmapTrack = $('#chk-map-track');
let $canvasToolTipSpan = $('#canvas-tooltip-span');
let $canv = $('#heatmap-canvas');
/**
 *
 * @type {*|jQuery|HTMLElement}
 */
let $canvContainer = $('#canvas-container');
let $dateUl = $('#date-ul');
let $heatMapVerticalBar = $('#heat-map-vertical-bar');
let $selectedTmcs = $('#selected-tmcs');

let sldrHeatMapId = 'heat-map-slider';
let $sldrHeatMap = $('#' + sldrHeatMapId);


let heatMapReady = false;

/**
 * @type {SortedFeatures}
 */
let sortedFeatures;

/**
 * @type {DayRange}
 */
let dayRange;

function _leadingPad(num) {
    let out = num.toFixed();
    if (out.length == 1) {
        out = '0' + out;
    }
    
    return out;
}

function _formatDate(d) {
    return `${_leadingPad(d.getMonth() + 1)}/${_leadingPad(d.getDate())}/${d.getYear() + 1900} ` +
        `${_leadingPad(d.getHours())}:${_leadingPad(d.getMinutes())}:${_leadingPad(d.getSeconds())}`;
}



function clearCanvas() {
    $dateUl.html('');
    $canv.off('mousemove');
    let canv = $canv[0];
    let ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);

    $canv.attr('width', $('#heat-map-slider').width());
    $canv.attr('height', 100);
    $heatMapVerticalBar.height(0);
}


export function startUi() {
    "use strict";
    dayRange = $('#div-date-range').dayRange(10);
}

export function drawSetup() {
    "use strict";
    let draw = new ol.interaction.Draw({
        source: npmrdsHeatmapConfig.featureOverlay.source,
        type: 'Polygon'
    });

    draw.on('drawend', function (evt) {
        //$divSelectArea.hide();
        $btnSelectArea.prop('disabled', false);
        let geom = evt.feature.getGeometry();
        let geomClone = geom.clone();

        geomClone.transform('EPSG:3857', 'EPSG:4326');

        setTimeout(function () {
            npmrdsHeatmapConfig.map.removeInteraction(draw);
        }, 100);
        $btnCancelArea.hide();

        $.get('npmrds/gethighways', {polygon: JSON.stringify(geomClone.getCoordinates())},
            function (d) {
                $ulHwyDirs.html(d);
                $divHighwaySelection.show();

                $('input[name=hwydirs]').change(function () {
                    $btnSelectHwy.prop('disabled', false);
                });
            }, 'text');
    });

    $btnCancelArea.click(function () {
        npmrdsHeatmapConfig.map.removeInteraction(draw);
        $btnSelectArea.prop('disabled', false);
        $btnCancelArea.hide();
    });

    $btnSelectArea.click(function () {
        npmrdsHeatmapConfig.featureOverlay.source.clear();
        npmrdsHeatmapConfig.map.addInteraction(draw);
        $btnSelectArea.prop('disabled', true);
        $btnCancelArea.show();
        $ulHwyDirs.html('');
        $divHighwaySelection.hide();
        $btnSelectHwy.prop('disabled', true);
    });
}


export function endUi() {
    "use strict";

    $divSelectArea.show();
    $btnSelectArea.prop('disabled', false);
    $btnCancelArea.hide();
    $divHighwaySelection.hide();

    $btnSelectHwy.click(function () {
        let selectedHwy = $('input[name=hwydirs]:checked:first').val();
        $('#sel-hwy').html(selectedHwy);
        $.get('npmrds/getroute',
            {
                hwyDir: selectedHwy
            }, function (d) {
                npmrdsHeatmapConfig.lineLayer.clear();
                npmrdsHeatmapConfig.lineLayer.addFeatures(d['line']);

                npmrdsHeatmapConfig.pointLayer.clear();
                npmrdsHeatmapConfig.pointLayer.addFeatures(d['points']);

                sortedFeatures = new SortedFeatures(npmrdsHeatmapConfig.pointLayer.source.getFeatures(), 'distReal');

                npmrdsHeatmapConfig.trackerLayer.clear();
                npmrdsHeatmapConfig.trackerLayer.source.addFeature(sortedFeatures.sortedFeatures[0]);


                $divLeft.hide();
                $divRight.show();
                npmrdsHeatmapConfig.map.updateSize();

                let mapView = npmrdsHeatmapConfig.map.getView();

                let panAnimation = ol.animation.pan({
                    duration: 500,
                    source: mapView.getCenter()
                });
                npmrdsHeatmapConfig.map.beforeRender(panAnimation);

                mapView.fit(
                    npmrdsHeatmapConfig.featureOverlay.source.getFeatures()[0].getGeometry().getExtent(),
                    npmrdsHeatmapConfig.map.getSize()
                );

                mapView.setZoom(mapView.getZoom() - 1);

                $('#vehicle-all').prop('checked', true);

                npmrdsHeatmapConfig.featureOverlay.visible = false;
                npmrdsHeatmapConfig.lineLayer.visible = true;
                npmrdsHeatmapConfig.pointLayer.visible = true;
                npmrdsHeatmapConfig.trackerLayer.visible = true;

                $sldrHeatMap.prop('max', d['totalDistance']);
                $sldrHeatMap.val(0);
                $heatMapVerticalBar.css('left', '22px');
                $selectedTmcs.val(JSON.stringify(d['tmcs']));

                //console.log(d);
            }, 'json').fail(function () {
            alert("something went wrong, try another area selection");
        });
    });
}


export function heatMapUi() {
    "use strict";

    $('#heat-map-back').click(function () {
        $divLeft.show();
        $divRight.hide();
        npmrdsHeatmapConfig.map.updateSize();
        npmrdsHeatmapConfig.featureOverlay.visible = true;
        npmrdsHeatmapConfig.lineLayer.visible = false;
        npmrdsHeatmapConfig.pointLayer.visible = false;
        npmrdsHeatmapConfig.trackerLayer.visible = false;

        clearCanvas();
    });

    $canv.mouseenter(function () {
        if (heatMapReady) {
            $canvasToolTipSpan.css('display', 'block');
        }
    });

    $canv.mouseleave(function () {
        $canvasToolTipSpan.css('display', 'none');
        $canvasToolTipSpan.html('');
    });

    //add the slider change interaction
    $('#' + sldrHeatMapId).rangeChange(function(newVal, percent, evt){

        let canvWidth = parseFloat($canv.width());

        $heatMapVerticalBar.css('left', (canvWidth * percent + 22).toFixed() + 'px');

        let selectedFeature = sortedFeatures.getFeature(newVal);

        npmrdsHeatmapConfig.trackerLayer.clear();
        npmrdsHeatmapConfig.trackerLayer.source.addFeature(selectedFeature);

        if ($ckmapTrack.prop('checked')) {
            let panAnimation = ol.animation.pan({
                duration: 500,
                source: npmrdsHeatmapConfig.map.getView().getCenter()
            });
            npmrdsHeatmapConfig.map.beforeRender(panAnimation);
            npmrdsHeatmapConfig.map.getView().setCenter(selectedFeature.getGeometry().getCoordinates());
        }
    }, 25);


    $('#heat-map-confirm').click(function () {
        clearCanvas();
        let canv = $canv[0];
        let ctx = canv.getContext("2d");
        let $progressDiv = $('#progress-indicator-div');
        $dateUl.html('');

        $progressDiv.show();

        $.get('npmrds/getheatmap',
            {
                vehicleType: $('input[name=vehicle-type]:checked:first').val(),
                startDate: _formatDate(dayRange.startDate),
                endDate: _formatDate(dayRange.endDate),
                tmcs: $selectedTmcs.val()
            }, function (d) {
                if (d['error']) {
                    alert(d['error']);

                    return;
                }

                let canvasWidth = parseInt($canv.attr('width'));
                let colorGradient = colors.makeBlueGreenRedGradient(d['minSpeedVsFree'], d['maxSpeedVsFree'], true);
                let colorGradientStdDev = colors.makeBlueGreenRedGradientZScore(d['medianSpeedVsFree'], d['stdDevSpeedVsFree'], true);

                let recordLength = d['tmcResult'][0].values.length;
                $canv.attr('height', (recordLength * 2).toFixed());
                $heatMapVerticalBar.height(recordLength * 2);

                let columnPosition = 0;
                let tmcEndPositionArray = [];

                for (let i = 0; i < d['tmcResult'].length; i++) {
                    let tmc = d['tmcResult'][i];
                    let rectangleWidth = canvasWidth * tmc['distPercent'] / 100;
                    let valLength = tmc['values'].length;

                    for (let j = 0; j < valLength; j++) {
                        let speedVFreeSpeed = (tmc['values'][j] == null ? null : tmc['values'][j] / tmc['freeFlowSpeed']);
                        let speedVFreeZScore = (speedVFreeSpeed - d['medianSpeedVsFree']) / d['stdDevSpeedVsFree'];
                        //console.log(colorGradientStdDev(speedVFreeSpeed));
                        //let z_score =
                        //let z_score =

                        ctx.fillStyle = colorGradientStdDev(speedVFreeSpeed);
                        ctx.fillRect(columnPosition, j * 2, rectangleWidth, 2);
                    }

                    columnPosition += rectangleWidth;
                    tmcEndPositionArray.push([tmc['tmc'], columnPosition]);
                }

                for (let i = 0; i < d['dateList'].length; i++) {
                    $dateUl.append('<li><div>' + d['dateList'][i] + '</div></ul>');
                }

                // set the date li height
                //$('#date-ul li').css('height', (2 + (parseInt($canv.attr('height')) / d['dateList'].length) - d['dateList'].length).toFixed());

                let tmcResultDict = {};
                for (let i = 0; i < d['tmcResult'].length; i++) {
                    tmcResultDict[d['tmcResult'][i]['tmc']] = d['tmcResult'][i];
                }

                $canv.mousemove(function (evt) {

                    // coordinates relative the canvas
                    let offsetX = evt.offsetX;
                    let offsetY = evt.offsetY;

                    // coordinates relative the window
                    let clientX = evt.clientX;
                    let clientY = evt.clientY;

                    // get the tmc
                    let tmcId = null;
                    for (let i = 0; i < tmcEndPositionArray.length; i++) {
                        if (offsetX < tmcEndPositionArray[i][1]) {
                            tmcId = tmcEndPositionArray[i][0];
                            break;
                        }
                    }

                    if (tmcId == null) {
                        tmcId = tmcEndPositionArray[tmcEndPositionArray.length - 1][0];
                    }

                    // since each retangle in the heatmap is 2px high, get the index by divding by 2, round down
                    let rowIndex = Math.floor(offsetY / 2);

                    // make a date equal to the query start date
                    let dte = new Date(d['dateList'][0]);
                    // add minutes as 5X the row index
                    dte.setMinutes(dte.getMinutes() + rowIndex * 5);

                    let tmcObj = tmcResultDict[tmcId];

                    //set the html
                    $canvasToolTipSpan.html(`TMC: ${tmcId}<br>${dte.toLocaleDateString()} ${dte.toLocaleTimeString()}<br>` +
                    `Speed: ${(tmcObj['values'][rowIndex] == null ? 'null' : tmcObj['values'][rowIndex].toFixed(1))}, Free: ${tmcObj['freeFlowSpeed'].toFixed(1)}`
                    );

                    //set the position
                    let canvasToolipSpan = $canvasToolTipSpan[0];
                    canvasToolipSpan.style.left = (clientX - 150).toFixed() + 'px';
                    canvasToolipSpan.style.top = (clientY - 85).toFixed() + 'px';

                });
                //console.log(d);

                $canvContainer.scrollTop(0);
                heatMapReady = true;
            }, 'json').fail(function(){
                alert('Something went wrong with the request');
            }).always(function(){
                $progressDiv.hide();
            });
    });
}
