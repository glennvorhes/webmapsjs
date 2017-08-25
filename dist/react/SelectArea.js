/**
 * Created by glenn on 6/12/2017.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var reactAndRedux_1 = require("./reactAndRedux");
var ol = require("custom-ol");
var LayerBaseVectorGeoJson_1 = require("../layers/LayerBaseVectorGeoJson");
var projections_1 = require("../olHelpers/projections");
var makeGuid_1 = require("../util/makeGuid");
var get_map_1 = require("./helpers/get_map");
var SelectArea = (function (_super) {
    __extends(SelectArea, _super);
    function SelectArea(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.selectId = makeGuid_1.default();
        _this.cancelId = makeGuid_1.default();
        _this.callback = _this.props.callback;
        _this.areaOverlay = new LayerBaseVectorGeoJson_1.default('', {
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 237, 0.1)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgb(255, 0, 237)',
                    width: 2
                })
            }),
            transform: { dataProjection: projections_1.proj4326, featureProjection: projections_1.proj3857 }
        });
        _this.draw = new ol.interaction.Draw({
            source: _this.areaOverlay.source,
            type: 'Polygon'
        });
        _this.draw.on('drawend', function (evt) {
            _this.selectButton.style.display = '';
            _this.cancelButton.style.display = 'none';
            var geom = evt.feature.getGeometry();
            var geomClone = geom.clone();
            geomClone.transform('EPSG:3857', 'EPSG:4326');
            setTimeout(function () {
                _this.map.removeInteraction(_this.draw);
            }, 100);
            var outCoords = [];
            var ccc = geomClone.getCoordinates()[0];
            for (var _i = 0, ccc_1 = ccc; _i < ccc_1.length; _i++) {
                var cc = ccc_1[_i];
                outCoords.push([Math.round(cc[0] * 1000000) / 1000000, Math.round(cc[1] * 1000000) / 1000000]);
            }
            _this.callback(outCoords);
        });
        return _this;
    }
    SelectArea.prototype.componentDidMount = function () {
        var _this = this;
        this.selectButton = document.getElementById(this.selectId);
        this.cancelButton = document.getElementById(this.cancelId);
        get_map_1.default(this.props.map, this.areaOverlay.olLayer).then(function (m) { _this.map = m; });
    };
    SelectArea.prototype.setArea = function () {
        if (!this.map) {
            return;
        }
        this.selectButton.style.display = 'none';
        this.cancelButton.style.display = '';
        this.areaOverlay.source.clear();
        this.map.addInteraction(this.draw);
        this.callback(null);
    };
    SelectArea.prototype.cancel = function () {
        if (!this.map) {
            return;
        }
        this.selectButton.style.display = '';
        this.cancelButton.style.display = 'none';
        this.areaOverlay.source.clear();
        this.map.removeInteraction(this.draw);
        this.callback(null);
    };
    SelectArea.prototype.render = function () {
        var _this = this;
        return reactAndRedux_1.React.createElement("div", { style: { margin: '10px' } },
            reactAndRedux_1.React.createElement("button", { id: this.selectId, onClick: function () {
                    _this.setArea();
                } }, "Select Area"),
            reactAndRedux_1.React.createElement("button", { id: this.cancelId, onClick: function () {
                    _this.cancel();
                }, style: { display: 'none' } }, "Cancel"));
    };
    return SelectArea;
}(reactAndRedux_1.React.Component));
exports.SelectArea = SelectArea;
//# sourceMappingURL=SelectArea.js.map