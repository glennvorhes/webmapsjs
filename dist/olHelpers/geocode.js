"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var makeGuid_1 = require("../util/makeGuid");
var projections_1 = require("./projections");
var Vector_1 = require("ol/layer/Vector");
var Vector_2 = require("ol/source/Vector");
var Circle_1 = require("ol/style/Circle");
var Fill_1 = require("ol/style/Fill");
var Stroke_1 = require("ol/style/Stroke");
var Point_1 = require("ol/geom/Point");
var Feature_1 = require("ol/Feature");
var invalidClass = 'geocoder-invalid';
var geocoderLoadingClass = 'geocoder-loading';
var Style_1 = require("ol/style/Style");
// let testAddress = '65 7th Street, Prairie du Sac, WI';
var Geocode = /** @class */ (function () {
    function Geocode(mapDiv, map) {
        var _this = this;
        var inputGuid = makeGuid_1.makeGuid();
        var buttonGuid = makeGuid_1.makeGuid();
        this.map = map;
        this.indicationLayer = new Vector_1.default({
            source: new Vector_2.default(),
            style: new Style_1.default({
                image: new Circle_1.default({
                    radius: 12,
                    fill: new Fill_1.default({ color: 'rgba(255,0,0,0.5)' }),
                    stroke: new Stroke_1.default({ color: 'red', width: 1 })
                })
            })
        });
        this.map.addLayer(this.indicationLayer);
        $(mapDiv).append('<div class="geocoder-el">' +
            ("<input type=\"text\" id=\"" + inputGuid + "\">") +
            ("<button id=\"" + buttonGuid + "\">Search</button>") +
            '</div>');
        this.theButton = document.getElementById(buttonGuid);
        this.theInput = document.getElementById(inputGuid);
        this.reset();
        var $theButton = $(this.theButton);
        var $theInput = $(this.theInput);
        $theButton.click(function (evt) {
            evt.preventDefault();
            $theButton.addClass(geocoderLoadingClass);
            _this.theButton.disabled = true;
            _this.indicationLayer.getSource().clear();
            $.get("https://geocode.xyz/" + _this.theInput.value + "?geoit=json", {}, function (d) {
                var lat = parseFloat(d['latt']);
                var lon = parseFloat(d['longt']);
                if ((lat == 0 && lon == 0) || d['error']) {
                    $theInput.addClass(invalidClass);
                    _this.theInput.title = 'Specified Location Invalid';
                    _this.theButton.title = 'Specified Location Invalid';
                }
                else {
                    var v = _this.map.getView();
                    var p = new Point_1.default([lon, lat]);
                    var feat = new Feature_1.default(p);
                    _this.indicationLayer.getSource().addFeature(feat);
                    p.transform(projections_1.proj4326, projections_1.proj3857);
                    v.setCenter(p.getCoordinates());
                    v.setZoom(13);
                }
                $theButton.removeClass(geocoderLoadingClass);
                _this.theButton.disabled = false;
            }, 'json');
        });
        $(this.theInput).keyup(function (evt) {
            evt.preventDefault();
            _this.theButton.disabled = _this.theInput.value.length == 0;
            $theInput.removeClass(invalidClass);
            _this.theInput.title = '';
            _this.theButton.title = '';
            if (!_this.theButton.disabled && evt.keyCode == 13) {
                $theButton.click();
            }
        });
    }
    Geocode.prototype.reset = function () {
        this.theButton.disabled = true;
        this.theInput.value = '';
    };
    return Geocode;
}());
exports.Geocode = Geocode;
//# sourceMappingURL=geocode.js.map