/**
 * Created by gavorhes on 12/15/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var ol = require("custom-ol");
var $ = require("jquery");
var nm = provide_1.default('olHelpers');
/**
 * Sets up a map with some default parameters and initializes
 * mapMove and mapPopup
 *
 * @param [options={}] config options
 * @param [options.divId=map] map div id
 * @param [options.center={}] center config object
 * @param [options.center.x=-10018378] center x, web mercator x or lon
 * @param [options.center.y=5574910] center y, web mercator y or lat
 * @param [options.zoom=7] zoom level
 * @param [options.minZoom=undefined] min zoom
 * @param [options.maxZoom=undefined] max zoom
 * @param [options.baseSwitcher=true] if add base map switcher
 * @param [options.fullScreen=false] if add base map switcher
 * @returns the ol map
 */
function quickMapBase(options) {
    options = options || {};
    options.divId = options.divId || 'map';
    options.center = options.center || { x: -10018378, y: 5574910 };
    options.zoom = typeof options.zoom == 'number' ? options.zoom : 7;
    options.baseSwitcher = typeof options.baseSwitcher == 'boolean' ? options.baseSwitcher : true;
    options.fullScreen = typeof options.fullScreen == 'boolean' ? options.fullScreen : false;
    var $mapDiv = $('#' + options.divId);
    $mapDiv.css('position', 'relative');
    var osmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    // let satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'})});
    var osmCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADQ1NDk5OURFREtLS1FHSFlZWGJRVGJiYWdmZWxsbHRmaXBpanN0c3V0dHp5eX5+fIVzd4F3eeV0jud5juZ8k4aHhomHhoyGh5eGj5OVlJiVlZiYl5qZmJydnKOTlaKZmqKdnaOioaqqqKuzsbOvrrSysLa3tbW4uLm6ub27ub+/vbGXwbCZwbCgxLKlxrOqyLStybO3yrSxyrWzzbW2y7a1zbK4y7W6zbW8y760yrTAzbTFzrPKzrLOzrTJzrTOzr7CwbXC0LXK0LTO0L3I0bPQz7TQz7PS0bXQ0LnR0brW1bzT0r7U077V1Lzc2dqNqteUsdyXscaquuOHneaGmueHnOeJnuiBleiKn+eNoOiOoOWUpOiRo+iSpeiUpeqYpumaqOmdrPSynemgruSqtOmisOmlsuuqtequuOW1vOuxu+uxvOq1ve+xvPK0pvW3o/W5pfO5qvS7qfCwvMOuwc2/wNenxNyyzNe/0Nq31Nq51dy72Oy3wOu4wOu+xey4wO+6xO2+xfTAr/TCsvfFtPHLvvTJuMPDwMfHxcXKyc3DxMvFyMvLyM3PzcDV08DV1MTX1cbY1s7X1sjZ1sra2Mnd3M7b2c7c2tfH1tnB1t7F2d7M29fX1tLY1tDd2tHe3NTf3NnS19rZ1tva2Nnf3t3d28rh3tXg3Nnh3tzj393k39ni4N7k4N7n5uXDyOfLz+zAxu3CyOzEyezKzeDJ3eLM3uvP0u3P0ePf2+7R0u7Q1u/U0+7U1ezc0+7a2e/d2+3f3vbFzvLOwfHN0PPQw/TUx/LWyvLYzPDQ1fPe0ubc4vve4uHh3+nh3+/h2u/h3vHj2vHl3uHm4eTn4uDp5ebo4+Xo5ODq6ebq6OTv6+nl4+/j4O7l4e7n5ujp4+np5Ozq5e7s5urt6O7t6Orw6u7x6u3x7vPj5PDl4fDo4vDq5fDt5vDu6PDv7PTv6fDx6vHx7fH17fXw6fXy7fb07/bz8fT18vn38vr39fr48/r59Pr6+P3++//+/gAAALNTSk0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAFNElEQVRIS1VVCZxVUxi/9l0UIUT2bMnY43bVI2c0Y01kSWIaS0j2JEtkN41piomZrPPKQ2aQ7JKImOZlnm2493TJzDufuU1Zi+v/fee+mZ//793vnPOd7zvfes5zDBEZkBBjAcIjb+Iiotqgdhat8AMK0vl7/R9N7GiWtshqIr+EZ5gYKibyUsXY1l/mfFpssvUlWQ0FkU3gy4+RB/+kwYcO8pRSnldcOU/r2lAHARSwk2ORgEmOdC1EsuRiYSqMPwwroMIraZk5V2fYJQjCKfZrRmh3gSAZi2i4b7wSylWu8EqZwS59JkFUaW96JbNSc+CEUmt4rorwuZmWdDaoc+uZETuQlTCU5xYzR7muUnVUVo+BcRhre/VwUpasgJwhH7JkYIYA0sNxhmCwUK+lw6vCKBZehw01dEiyw4Q4aE0Z4ahDhKaFQsGnJ2BgqKoTBsNjFy0SlW6whRAZTdm8DBJmkBZhDi1j4xJQBk6ywrWUTymaCxac8lROcdauRGzQSNtA7EHUYhXyEwhhgjFUqRuO+rauhF1awFpzCsmwUbjIFBR0u1bKtyGpulW/H/cVVzkyGaIWTIR9pFAV6GK2gPMXMX8gPk9zzxXgI1kimcAltEYr+cjio1imlKpEa9rOipLm+p+CZ6Bw//qd1/f/O+GwMxbSLpyoZEcwkyh2jIks+3hmdd2jWUw4scxNysnHxU7nSspTRcJjCZGL3IsjsYJMMg5mwgx7gaIOLBFCogAgBBoNa9w+DE6I+Bs7FTgwwrJbHjWDgpYo2KwtBTcYEDuloC9geQw+k2RGnPGpTaOlq7AS+YICUz4DZVaX2TiNDhuYfTtY4geLi0IoCm3XccwM9hx4kU28StQEljDs3ZEpFGA+8dKzLmV9ymIwF5FOGn2GdJM8KLHDJbXyiYVMG9MRTLiXGGg2QKaxM3khPSRrwM9zEIardxU2w/EiA0gOeYKHzDR0V7/QGV3lKIA9ktrDArxO3gdA+k6SKoBiVwcm7NjZb9+Hnztg282TuHVZ9LOISFNt9MgyCetZVczSxnyDbl17Penq6mqpg1IhRaEO2aVLUO4/r17H8tTv6f13h71dduvZI3Y+uMdWksNSauLovJw5hsqiPIUvt0ku7/iBeUR3sksmomYWtRbAjbiLfv2lX9/V7LVG4uYnUZXhQ7f2OPCZEx9wrYWTcePEQqPEML8pl4mMdr/jlXlvHiRiJ2+MSTFY4TTSYStuvz2R/JXh+PPeGXm055J+3/YDWuNu3R3DArPutyg0ZgykMVDU9Ndm22+wYalr2rse48CnsTIFcMn73vfhNrktx1EUcZnPv6ah3Yy5cDTRdBEoGoBeah71dqFyjZDJLkWk3N3v4uuktssjWpzciMPxQeHj8nMKzcGuB0tAyzFhdCKOYWv4HwOQVwIxLG99a6uvH3sJCyO3h+k4EZ+G7+xj5f4XXksoaGrdMRzSc8ARA8+cdOuk2x6fffNNt5x+Ro1omPlrT/CQDlcNlpx4NBIWXhkx7Y3Zp3ofNR7Uv89Om/beW0TLIynHv3vs1VsOFpSWSXvfuPUf9BrRFyxgXdHoKJnQFegPOovvzz59ntrzye240ig8UQ3lDI2VqwagrKIQcLXNFL3wglN2OHdBQ6/vI3kENDVBwRb3k1XtczFbjWn4EzMYi7CF3129+JTYuRSdrGuS92g5dpqn6qXoJQs5xmL8p+Wt4hLbt0mx2OLNZR2bbPy8zJNQGFM/f/CfXZekRYFjGCWjIJpM+WiCzGBPWHhoyaAsjRT/B2Gy5yzYJkwUAAAAAElFTkSuQmCC')";
    var aerialCss = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQALBgIMDQgOBwQOEQcTBwUSCwoVDAwdBw8ZDgUREwYUGAYZFQYZGgkTFQoVGQsZFAwZHBMeDhIbFBEbHAwWIA4bIREcIQ4hCQwjFw4lHBgkDB8sDxUiExIiGhAoGxohFRshGRorHQcrKQsiIQwmKgooJA0pKQ81Jw8yLRMiIxImKxUrJREuKhslJB0rIhooKRUuMBMyLhkwJhozKh48LxUzMRM9MBwzMiUvFCMtGiMwEiwzFCgzHDI+GSIsISkvJSQxIiM2LiY5Jic+Lyk0JSo0Ky49JSs9KSU1NSM7NCs2NS8+NDM1JzU9Ljg7IDJCHS1DLSNAMitCMSxIOjREITZLIDZJKDlFIjpFKztKJT1LKzJBMzpHMD1JMjpKPD1RKjlQNC1DQj5QQEA8MEJGJkBKJUJNK0lLLEJMMkVMPEpONENSLUdZL0pTLkpaLkRUMkRSPEVZMktUM0pVOklZMklZNEpcNU1ZMk1ZNUxfMk5dNkxcOVFUM1RUOFJbNVFZOVNYPVFdOVJdPFVaOVVaPVVdOlVdPVpaNlpdO0phN01hOlBiN1NhPFNoP1piPWFbPmRjPENOQEtPSURTQkJVS0xVQk1VSkxbQkxcS0heUVFXRFRcQlJfTFxeQlpeS05lQk1kSFRjQVRjSlZpQ1tkQlxlSlxpRF1rSVVnUVtlU1llXF9tU1xoXlxwSl9ramRfQmJlQ2FhSWFlSWFlTmVlSWRmTGFoQWFpRWFsRmVpRWVtRmNsSmtlRGpqRmpsS2BmWGRsUmFrW2ptUmZyR2RxTGpxTWVyU2RyW2d5V2tzUmt0WW15VG15WXFuTHNtVnFxTXF4T3h0TnJzUnJ1XHJ4VXN6Wnp0VHx1W315VXp8XGR0YGx0YHVzZXJ0aHR9ZXV+aHl9YHOCXXqBXXeCYHyCY3iEaHyIYn+JaXqKcYB5WIN6Y4SCXoCDZIGEaYCIZoOLa4iCaImJbIOOdYuMco6OeIuVcpOKbZKPc5aQb5eXe5ufg6KjhAAAAAAAAAAAAAAAAOGCeQgAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjlsM35OAAAH80lEQVRISy1WbXQUVxm+6wqnk3Zmpxl2FG2EGg92C8GDlWptVTwa+uF3xcKmDfFzCUzDsJNsunXipglJXJbrtJWmwZNSnHD3jojRgUIm2UumIZ0JZ7JByrALbMWW0IBW8aRa4+cf76TeX3Nm3uc+z/s+7/vugl4r/aMTrT4e1pPTqnnmJNn5AyUzRnrRle/qE33dsvrBtAQVoxtpZNK3zSzYjUjviWO2Ag+R77dl7W36n/1Ep9KBPG/S+Py0PkjU/gPKQGqwTHryiWYFAXSvMairsio7SjyNsnCzh0qKImV9/7mhfHQZx2yN1O+7rXUm33MUPaboOkAJHaoIdXfJj2xWeyD8jMFEXkvIu5qzpU988gWB5zl+GS+sFe55trEVPdWZB2miq8bBVkNFO2R0qnrfkiXhcJhtDNXE6tbW97/s9O9/7ZfVhx86/CwrROpfvvxboMqeLsuqPr1j44qEwDNMOBximUiYoU8sw7BC/a7T72uEnyJDlGxZ9KcglZRyuqqrv/tSZErgOI4NgRBTIw9EmHAoFGZZnp6aGaJ2GTxfxYs8kKVUQh7WB5hQeC3LsUxoxVKW14l3BX2WcoUYPiZyLLe8teZ+iuT4GGhvV5KpKWkpyzxEr2MZgQ1xdRjfRBoH+2k6lIHjKTHPPBo8CSJISqqq4wGGOcWylIGlgvgNX1Gd8vF5f+IUIwb30ng+Gg2QfBRIMvy0jG8SVkYo4N0zvUXVRztbJ/L6xL7lUZEXBEHkuZqlS6gEAUgKJurnhFtfpACOYd8b/hVbJPqwi44a6KA0sPVjIi/SIyxb3u8KlAJ0S8jRVgrlW+nVHPdrhiXCxu42d86ByksDc80P3MkJFBFQ8Ho1lQegpWJRWFGsDsRwwv7pIyvuQW0ZkrX6NDVFbqcvaQI8vbyqzt5AARrsbKx5yhQEGs+wPO56bOK+0rcwMrOKkpUbZWYxV04UeZZv/cBKFhRL6Qdv9y4LfEDA7/thg7tTmv1a5/GnO0wl0dQg80wglZaHUmxRvjwAHOfyN0mxrpqLUpcjsK3NHYMo4R1o6eho2ZyIb2FoeOC3ILK8kZ2HQMOuWywGXUkJBCeTbYFS0+ym1h2/6UgmvnrvKYZZtIEXGf75C2cIAp5LHNd71x7uPoTjakrWH9e3KFpaatjUvJUysFw0KrLMYMW2lTg4PeUQx6kJEALvxXEmCdVyPLHtCSjBhc01XCjIgafxou+PE6KC1dhxSCwoBCc+N4P3btM84pmdSSjJnjO/nvY4LQfVyz5/I+v6IwjUOMjy+MVCxIbKupTJaEktp7cTKU42Pvjh2m/8cSpC6aPsaX/MHSuUQLVVsIa4RUTs/r/BVAexNdjdnsNG7j/rV93xheLMzKnFrPeTEQchCyCcKb25aAIn7lrAertrZwyNXM8N6zfWrFo3d2SmOEcF83x/r+OOFgrAHYWF7cELjhV7UQo/6WAIUVl9JFl8a//HZ66VpbY3I9QKZqPru77lA+iOWAIr0hKxHCmmr0othSyeIl5y3qt4xT8gSNrKEZozs8Els67rgsLOZ+ygzwMfbtNhobfgzpEyGnz7htPtzUi6PuOoj7K0WF/MXiUFxwGajRD1hjYXHXI9p406qOyinp5/tiWcDHY0jIu4n64Qfq7kliB2gemag9QbOia0PbbDMbd43SHuvxFxrAocxins7MX5Kqbe1QixKBxoV4//PfAgGCu+Rlm4SvZizyDH+0reDHp92iO0BuX3bCfItl0PEwvYLqpwXG2MHlGsQ4S8pMJZv1JGmHiEoHQDdOjwmVlEP/nE9ADKjI8xLI0OOGITfy0SbeG/C2jKUDGSlDhM9I3IpK9iup6XnbRNC7yqueNsJCCIiXzdQhnaGN+46umnEdy5U5UbUJ48LFM9GkJo8BdDOiAZ7ZIQbKhYLMqvhU2wmNxjEAsS2AI7y4nWF64duePbk7YV3zvAVLEMD9AxJRNa3KDUibV7DjnkuprMEYjScFNcaR2ceP2u9R/5k1052Ryme5phAFRswlHjAudiP4dOy7CaxLgdJh9vUlU1702/+LPa1U9fvPi9qlA4XEUBJc3dFlpsR457IDl1iPqLp7o81NQgyV19iYU38uTiv975Pd3SiwQcsGjx+v4/6fl5T7EOOMTCtpbKxfemsQq/3olQZcminADAAI0cuGLHaHOFxbuGvRk/Z9u7CULqoVR6NE0yx1avj30oRhc/jWUoIALGxkz0dg1Dl9iaI7LqOOXKsXJFwjiuEAi70Jra2nW1PL08zLBhZsMABpW5csI7TPfew9ipFKcn5k1i+1KyCWKjC3W/8dF1d666+RaabBVTFTHacjoojBNDh0NDxk+IPTlwfqJkWpbnpFHXIbLbmpxEQ3ff/Z0g/mauXsoln9wDRjy/NHsQFw3P6vWuTJ43/+FZrk2cvAFRipCKdfD9y2+pjRj78s0KdCUDKJvdV91ChngV38T20TM+gghjpJaPlpFr2xbEz5g4A/NGt5rNwdwmYGeeeMXBSLHHUIc+6RsojRH9VTUm3/mLf/64b470XvoxoTKhlMBQ2jMEzo2PjxdGMppmn1RM24bWFJqaQv4BcuJa2Sam7Zokq1ldCsz06NCBHrhwqVQYpfFj42NZexz1EW9SR/kT58nEeQKJb2fPXjjp0u/YUkwHEgLeOnf2nOuf1TRTM02CLKLTPy60/x1CCztqn7Ev+BdsC3m+30decQvW/wBNTwU+CfUQAQAAAABJRU5ErkJggg==')";
    if (options.baseSwitcher) {
        //  let switcherContent = '<div class="base-map-switcher" title="Toggle Base Layer" style="';
        //  switcherContent += 'position: absolute; top: 70px; left: 4px; border: solid black 1px; ';
        //  switcherContent += `height: 50px; width: 50px; z-index: 10; border-radius: 4px; background: ${aerialCss};`;
        //  switcherContent += '"></div>';
        //  $mapDiv.append(switcherContent);
        //
        // $mapDiv.find('.base-map-switcher').click(function() {
        //      "use strict";
        //      osmLayer.setVisible(!osmLayer.getVisible());
        //      satLayer.setVisible(!satLayer.getVisible());
        //
        //      if (osmLayer.getVisible()){
        //          $(this).css('background', aerialCss);
        //      } else {
        //          $(this).css('background', osmCss);
        //      }
        //  });
    }
    if (options.zoom < 0 || options.zoom > 28) {
        throw 'zoom out of range';
    }
    if (options.center.x >= -180 && options.center.x <= 180 && options.center.y >= -90 && options.center.y <= 90) {
        var p = new ol.geom.Point([options.center.x, options.center.y]);
        new ol.proj.Projection({ code: "EPSG:4326" });
        p.transform(new ol.proj.Projection({ code: "EPSG:4326" }), new ol.proj.Projection({ code: "EPSG:3857" }));
        var coordinates = p.getCoordinates();
        options.center.x = coordinates[0];
        options.center.y = coordinates[1];
    }
    var controls = ol.control.defaults({
        attributionOptions: { collapsible: false }
    });
    var view = new ol.View({
        center: [options.center.x, options.center.y],
        zoom: options.zoom,
        minZoom: options.minZoom,
        maxZoom: options.maxZoom
    });
    var map = new ol.Map({
        layers: [osmLayer],
        target: options.divId,
        controls: controls,
        view: view
    });
    if (options.fullScreen) {
        map.addControl(new ol.control.FullScreen({}));
    }
    return map;
}
exports.quickMapBase = quickMapBase;
nm.quickMapBase = quickMapBase;
exports.default = quickMapBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tNYXBCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29sSGVscGVycy9xdWlja01hcEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUN0Qyw4QkFBaUM7QUFDakMsMEJBQTZCO0FBQzdCLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFZaEM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsc0JBQTZCLE9BQXlCO0lBQ2xELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBcUIsQ0FBQztJQUMzQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxPQUFPLENBQUMsWUFBWSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM5RixPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFHekYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElB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QUk7S0FDYixDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNmLENBQUM7QUE1RUQsb0NBNEVDO0FBRUQsRUFBRSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDL0Isa0JBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ2F2b3JoZXMgb24gMTIvMTUvMjAxNS5cclxuICovXHJcblxyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuY29uc3Qgbm0gPSBwcm92aWRlKCdvbEhlbHBlcnMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcXVpY2tNYXBPcHRpb25zIHtcclxuICAgIGRpdklkPzogc3RyaW5nO1xyXG4gICAgY2VudGVyPzoge3g6IG51bWJlciwgeTogbnVtYmVyfTtcclxuICAgIHpvb20/OiBudW1iZXI7XHJcbiAgICBtaW5ab29tPzogbnVtYmVyO1xyXG4gICAgbWF4Wm9vbT86IG51bWJlcjtcclxuICAgIGJhc2VTd2l0Y2hlcj86IGJvb2xlYW47XHJcbiAgICBmdWxsU2NyZWVuPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdXAgYSBtYXAgd2l0aCBzb21lIGRlZmF1bHQgcGFyYW1ldGVycyBhbmQgaW5pdGlhbGl6ZXNcclxuICogbWFwTW92ZSBhbmQgbWFwUG9wdXBcclxuICpcclxuICogQHBhcmFtIFtvcHRpb25zPXt9XSBjb25maWcgb3B0aW9uc1xyXG4gKiBAcGFyYW0gW29wdGlvbnMuZGl2SWQ9bWFwXSBtYXAgZGl2IGlkXHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5jZW50ZXI9e31dIGNlbnRlciBjb25maWcgb2JqZWN0XHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5jZW50ZXIueD0tMTAwMTgzNzhdIGNlbnRlciB4LCB3ZWIgbWVyY2F0b3IgeCBvciBsb25cclxuICogQHBhcmFtIFtvcHRpb25zLmNlbnRlci55PTU1NzQ5MTBdIGNlbnRlciB5LCB3ZWIgbWVyY2F0b3IgeSBvciBsYXRcclxuICogQHBhcmFtIFtvcHRpb25zLnpvb209N10gem9vbSBsZXZlbFxyXG4gKiBAcGFyYW0gW29wdGlvbnMubWluWm9vbT11bmRlZmluZWRdIG1pbiB6b29tXHJcbiAqIEBwYXJhbSBbb3B0aW9ucy5tYXhab29tPXVuZGVmaW5lZF0gbWF4IHpvb21cclxuICogQHBhcmFtIFtvcHRpb25zLmJhc2VTd2l0Y2hlcj10cnVlXSBpZiBhZGQgYmFzZSBtYXAgc3dpdGNoZXJcclxuICogQHBhcmFtIFtvcHRpb25zLmZ1bGxTY3JlZW49ZmFsc2VdIGlmIGFkZCBiYXNlIG1hcCBzd2l0Y2hlclxyXG4gKiBAcmV0dXJucyB0aGUgb2wgbWFwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcXVpY2tNYXBCYXNlKG9wdGlvbnM/OiBxdWlja01hcE9wdGlvbnMpOiBvbC5NYXAge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge30gYXMgcXVpY2tNYXBPcHRpb25zO1xyXG4gICAgb3B0aW9ucy5kaXZJZCA9IG9wdGlvbnMuZGl2SWQgfHwgJ21hcCc7XHJcbiAgICBvcHRpb25zLmNlbnRlciA9IG9wdGlvbnMuY2VudGVyIHx8IHt4OiAtMTAwMTgzNzgsIHk6IDU1NzQ5MTB9O1xyXG4gICAgb3B0aW9ucy56b29tID0gdHlwZW9mIG9wdGlvbnMuem9vbSA9PSAnbnVtYmVyJyA/IG9wdGlvbnMuem9vbSA6IDc7XHJcbiAgICBvcHRpb25zLmJhc2VTd2l0Y2hlciA9IHR5cGVvZiBvcHRpb25zLmJhc2VTd2l0Y2hlciA9PSAnYm9vbGVhbicgPyBvcHRpb25zLmJhc2VTd2l0Y2hlciA6IHRydWU7XHJcbiAgICBvcHRpb25zLmZ1bGxTY3JlZW4gPSB0eXBlb2Ygb3B0aW9ucy5mdWxsU2NyZWVuID09ICdib29sZWFuJyA/IG9wdGlvbnMuZnVsbFNjcmVlbiA6IGZhbHNlO1xyXG5cclxuXHJcbiAgICBsZXQgJG1hcERpdiA9ICQoJyMnICsgb3B0aW9ucy5kaXZJZCk7XHJcbiAgICAkbWFwRGl2LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuXHJcbiAgICBsZXQgb3NtTGF5ZXIgPSBuZXcgb2wubGF5ZXIuVGlsZSh7c291cmNlOiBuZXcgb2wuc291cmNlLk9TTSgpfSk7XHJcbiAgICAvLyBsZXQgc2F0TGF5ZXIgPSBuZXcgb2wubGF5ZXIuVGlsZSh7dmlzaWJsZTogZmFsc2UsIHNvdXJjZTogbmV3IG9sLnNvdXJjZS5NYXBRdWVzdCh7bGF5ZXI6ICdzYXQnfSl9KTtcclxuXHJcbiAgICBsZXQgb3NtQ3NzID0gXCJ1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBREFBQUFBd0NBTUFBQUJnM0FtMUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQU1BVUV4VVJRQUFBRFExTkRrNU9VUkZSRXRMUzFGSFNGbFpXR0pSVkdKaVlXZG1aV3hzYkhSbWFYQnBhbk4wYzNWMGRIcDVlWDUrZklWemQ0RjNlZVYwanVkNWp1WjhrNGFIaG9tSGhveUdoNWVHajVPVmxKaVZsWmlZbDVxWm1KeWRuS09UbGFLWm1xS2RuYU9pb2FxcXFLdXpzYk92cnJTeXNMYTN0Ylc0dUxtNnViMjd1YisvdmJHWHdiQ1p3YkNneExLbHhyT3F5TFN0eWJPM3lyU3h5cld6emJXMnk3YTF6Yks0eTdXNnpiVzh5NzYweXJUQXpiVEZ6clBLenJMT3pyVEp6clRPenI3Q3diWEMwTFhLMExUTzBMM0kwYlBRejdUUXo3UFMwYlhRMExuUjBiclcxYnpUMHI3VTA3N1YxTHpjMmRxTnF0ZVVzZHlYc2NhcXV1T0huZWFHbXVlSG5PZUpudWlCbGVpS24rZU5vT2lPb09XVXBPaVJvK2lTcGVpVXBlcVlwdW1hcU9tZHJQU3luZW1ncnVTcXRPbWlzT21sc3V1cXRlcXV1T1cxdk91eHUrdXh2T3ExdmUreHZQSzBwdlczby9XNXBmTzVxdlM3cWZDd3ZNT3V3YzIvd05lbnhOeXl6TmUvME5xMzFOcTUxZHk3Mk95M3dPdTR3T3UreGV5NHdPKzZ4TzIreGZUQXIvVENzdmZGdFBITHZ2VEp1TVBEd01mSHhjWEt5YzNEeE12RnlNdkx5TTNQemNEVjA4RFYxTVRYMWNiWTFzN1gxc2paMXNyYTJNbmQzTTdiMmM3YzJ0ZkgxdG5CMXQ3RjJkN00yOWZYMXRMWTF0RGQydEhlM05UZjNOblMxOXJaMXR2YTJObmYzdDNkMjhyaDN0WGczTm5oM3R6ajM5M2szOW5pNE43azRON241dVhEeU9mTHorekF4dTNDeU96RXllekt6ZURKM2VMTTN1dlAwdTNQMGVQZjIrN1IwdTdRMXUvVTArN1UxZXpjMCs3YTJlL2QyKzNmM3ZiRnp2TE93ZkhOMFBQUXcvVFV4L0xXeXZMWXpQRFExZlBlMHViYzR2dmU0dUhoMytuaDMrL2gydS9oM3ZIajJ2SGwzdUhtNGVUbjR1RHA1ZWJvNCtYbzVPRHE2ZWJxNk9UdjYrbmw0Ky9qNE83bDRlN241dWpwNCtucDVPenE1ZTdzNXVydDZPN3Q2T3J3NnU3eDZ1M3g3dlBqNVBEbDRmRG80dkRxNWZEdDV2RHU2UER2N1BUdjZmRHg2dkh4N2ZIMTdmWHc2Zlh5N2ZiMDcvYno4ZlQxOHZuMzh2cjM5ZnI0OC9yNTlQcjYrUDMrKy8vKy9nQUFBTE5UU2swQUFBRUFkRkpPVS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy93QlQ5d2NsQUFBQUNYQklXWE1BQUE3REFBQU93d0hIYjZoa0FBQUFHSFJGV0hSVGIyWjBkMkZ5WlFCd1lXbHVkQzV1WlhRZ05DNHdMamxzTTM1T0FBQUZORWxFUVZSSVMxVlZDWnhWVXhpLzlsMFVJVVQyYk1uWTQzYlZJMmMwWTAxa1NXSWFTMGoySkV0a040MXBpb21aclBQS1EyYVE3SktJbU9abG5tMjQ5M1RKekR1ZnVVMVppK3YvZmVlK21aLy83OTN2blBPZDd6dmZlczV6REJFWmtCQmpBY0lqYitJaW90cWdkaGF0OEFNSzB2bDcvUjlON0dpV3RzaHFJcitFWjVnWUtpYnlVc1hZMWwvbWZGcHNzdlVsV1EwRmtVM2d5NCtSQi8ra3dZY084cFJTbmxkY09VL3IybEFIQVJTd2syT1JnRW1PZEMxRXN1UmlZU3FNUHd3cm9NSXJhWms1VjJmWUpRakNLZlpyUm1oM2dTQVppMmk0Yjd3U3lsV3U4RXFad1M1OUprRlVhVzk2SmJOU2MrQ0VVbXQ0cm9yd3VabVdkRGFvYyt1WkVUdVFsVENVNXhZelI3bXVVblZVVm8rQmNSaHJlL1Z3VXBhc2dKd2hIN0prWUlZQTBzTnhobUN3VUsrbHc2dkNLQlplaHcwMWRFaXl3NFE0YUUwWjRhaERoS2FGUXNHbkoyQmdxS29UQnNOakZ5MFNsVzZ3aFJBWlRkbThEQkpta0JaaERpMWo0eEpRQms2eXdyV1VUeW1hQ3hhYzhsUk9jZGF1Ukd6UVNOdEE3RUhVWWhYeUV3aGhnakZVcVJ1TytyYXVoRjFhd0ZwekNzbXdVYmpJRkJSMHUxYkt0eUdwdWxXL0gvY1ZWemt5R2FJV1RJUjlwRkFWNkdLMmdQTVhNWDhnUGs5enp4WGdJMWtpbWNBbHRFWXIrY2ppbzFpbWxLcEVhOXJPaXBMbStwK0NaNkJ3Ly9xZDEvZi9PK0d3TXhiU0xweW9aRWN3a3loMmpJa3MrM2htZGQyaldVdzRzY3hOeXNuSHhVN25Tc3BUUmNKakNaR0wzSXNqc1lKTU1nNW13Z3g3Z2FJT0xCRkNvZ0FnQkJvTmE5dytERTZJK0JzN0ZUZ3d3ckpiSGpXRGdwWW8yS3d0QlRjWUVEdWxvQzlnZVF3K2syUkduUEdwVGFPbHE3QVMrWUlDVXo0RFpWYVgyVGlORGh1WWZUdFk0Z2VMaTBJb0NtM1hjY3dNOWh4NGtVMjhTdFFFbGpEczNaRXBGR0ErOGRLekxtVjl5bUl3RjVGT0duMkdkSk04S0xIREpiWHlpWVZNRzlNUlRMaVhHR2cyUUtheE0za2hQU1Jyd005ekVJYXJkeFUydy9FaUEwZ09lWUtIekRSMFY3L1FHVjNsS0lBOWt0ckRBcnhPM2dkQStrNlNLb0JpVndjbTdOalpiOStIbnp0ZzI4MlR1SFZaOUxPSVNGTnQ5TWd5Q2V0WlZjelN4bnlEYmwxN1BlbnE2bXFwZzFJaFJhRU8yYVZMVU80L3IxN0g4dFR2NmYxM2g3MWRkdXZaSTNZK3VNZFdrc05TYXVMb3ZKdzVoc3FpUElVdnQwa3U3L2lCZVVSM3Nrc21vbVlXdFJiQWpiaUxmdjJsWDkvVjdMVkc0dVluVVpYaFE3ZjJPUENaRXg5d3JZV1RjZVBFUXFQRU1MOHBsNG1NZHIvamxYbHZIaVJpSjIrTVNURlk0VFRTWVN0dXZ6MlIvSlhoK1BQZUdYbTA1NUorMy9ZRFd1TnUzUjNEQXJQdXR5ZzBaZ3lrTVZEVTlOZG0yMit3WWFscjJyc2U0OENuc1RJRmNNbjczdmZoTnJrdHgxRVVjWm5QdjZhaDNZeTVjRFRSZEJFb0dvQmVhaDcxZHFGeWpaREpMa1drM04zdjR1dWt0c3NqV3B6Y2lNUHhRZUhqOG5NS3pjR3VCMHRBeXpGaGRDS09ZV3Y0SHdPUVZ3SXhMRzk5YTZ1dkgzc0pDeU8zaCtrNEVaK0c3K3hqNWY0WFhrc29hR3JkTVJ6U2M4QVJBOCtjZE91azJ4NmZmZk5OdDV4K1JvMW9tUGxyVC9DUURsY05scHg0TkJJV1hoa3g3WTNacDNvZk5SN1V2ODlPbS9iZVcwVExJeW5IdjN2czFWc09GcFNXU1h2ZnVQVWY5QnJSRnl4Z1hkSG9LSm5RRmVnUE9vdnZ6ejU5bnRyenllMjQwaWc4VVEzbERJMlZxd2FncktJUWNMWE5GTDN3Z2xOMk9IZEJRNi92STNrRU5EVkJ3UmIzazFYdGN6RmJqV240RXpNWWk3Q0YzMTI5K0pUWXVSU2RyR3VTOTJnNWRwcW42cVhvSlFzNXhtTDhwK1d0NGhMYnQwbXgyT0xOWlIyYmJQeTh6Sk5RR0ZNL2YvQ2ZYWmVrUllGakdDV2pJSnBNK1dpQ3pHQlBXSGhveWFBc2pSVC9CMkd5NXl6WUprd1VBQUFBQUVsRlRrU3VRbUNDJylcIjtcclxuICAgIGxldCBhZXJpYWxDc3MgPSBcInVybCgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEQUFBQUF3Q0FNQUFBQmczQW0xQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBTUFVRXhVUlFBTEJnSU1EUWdPQndRT0VRY1RCd1VTQ3dvVkRBd2RCdzhaRGdVUkV3WVVHQVlaRlFZWkdna1RGUW9WR1FzWkZBd1pIQk1lRGhJYkZCRWJIQXdXSUE0YklSRWNJUTRoQ1F3akZ3NGxIQmdrREI4c0R4VWlFeElpR2hBb0d4b2hGUnNoR1JvckhRY3JLUXNpSVF3bUtnb29KQTBwS1E4MUp3OHlMUk1pSXhJbUt4VXJKUkV1S2hzbEpCMHJJaG9vS1JVdU1CTXlMaGt3SmhvektoNDhMeFV6TVJNOU1Cd3pNaVV2RkNNdEdpTXdFaXd6RkNnekhESStHU0lzSVNrdkpTUXhJaU0yTGlZNUppYytMeWswSlNvMEt5NDlKU3M5S1NVMU5TTTdOQ3MyTlM4K05ETTFKelU5TGpnN0lESkNIUzFETFNOQU1pdENNU3hJT2pSRUlUWkxJRFpKS0RsRklqcEZLenRLSlQxTEt6SkJNenBITUQxSk1qcEtQRDFSS2psUU5DMURRajVRUUVBOE1FSkdKa0JLSlVKTkswbExMRUpNTWtWTVBFcE9ORU5TTFVkWkwwcFRMa3BhTGtSVU1rUlNQRVZaTWt0VU0wcFZPa2xaTWtsWk5FcGNOVTFaTWsxWk5VeGZNazVkTmt4Y09WRlVNMVJVT0ZKYk5WRlpPVk5ZUFZGZE9WSmRQRlZhT1ZWYVBWVmRPbFZkUFZwYU5scGRPMHBoTjAxaE9sQmlOMU5oUEZOb1AxcGlQV0ZiUG1SalBFTk9RRXRQU1VSVFFrSlZTMHhWUWsxVlNreGJRa3hjUzBoZVVWRlhSRlJjUWxKZlRGeGVRbHBlUzA1bFFrMWtTRlJqUVZSalNsWnBRMXRrUWx4bFNseHBSRjFyU1ZWblVWdGxVMWxsWEY5dFUxeG9YbHh3U2w5cmFtUmZRbUpsUTJGaFNXRmxTV0ZsVG1WbFNXUm1UR0ZvUVdGcFJXRnNSbVZwUldWdFJtTnNTbXRsUkdwcVJtcHNTMkJtV0dSc1VtRnJXMnB0VW1aeVIyUnhUR3B4VFdWeVUyUnlXMmQ1VjJ0elVtdDBXVzE1VkcxNVdYRnVUSE50Vm5GeFRYRjRUM2gwVG5KelVuSjFYSEo0VlhONlducDBWSHgxVzMxNVZYcDhYR1IwWUd4MFlIVnpaWEowYUhSOVpYVithSGw5WUhPQ1hYcUJYWGVDWUh5Q1kzaUVhSHlJWW4rSmFYcUtjWUI1V0lONlk0U0NYb0NEWklHRWFZQ0lab09MYTRpQ2FJbUpiSU9PZFl1TWNvNk9lSXVWY3BPS2JaS1BjNWFRYjVlWGU1dWZnNktqaEFBQUFBQUFBQUFBQUFBQUFPR0NlUWdBQUFFQWRGSk9VLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3dCVDl3Y2xBQUFBQ1hCSVdYTUFBQTdEQUFBT3d3SEhiNmhrQUFBQUdIUkZXSFJUYjJaMGQyRnlaUUJ3WVdsdWRDNXVaWFFnTkM0d0xqbHNNMzVPQUFBSDgwbEVRVlJJU3kxV2JYUVVWeG0rNndxbmszWm1weGwyRkcyRUdnOTJDOEdEbFdwdFZUd2ErdUYzeGNLbURmRnpDVXpEc0pOc3VuWGlwZ2xKWEpicnRKV213Wk5TbkhEM2pvalJnVUltMlV1bUlaMEpaN0pCeXJBTGJNV1cwSUJXOGFSYTQrY2Y3NlRlWDNObTN1Yyt6L3MrNy92dWdsNHIvYU1UclQ0ZTFwUFRxbm5tSk5uNUF5VXpSbnJSbGUvcUUzM2RzdnJCdEFRVm94dHBaTkszelN6WWpVanZpV08yQWcrUjc3ZGw3VzM2bi8xRXA5S0JQRy9TK1B5MFBralUvZ1BLUUdxd1RIcnlpV1lGQVhTdk1haXJzaW83U2p5TnNuQ3poMHFLSW1WOS83bWhmSFFaeDJ5TjFPKzdyWFVtMzNNVVBhYm9Pa0FKSGFvSWRYZkpqMnhXZXlEOGpNRkVYa3ZJdTVxenBVOTg4Z1dCNXpsK0dTK3NGZTU1dHJFVlBkV1pCMm1pcThiQlZrTkZPMlIwcW5yZmtpWGhjSmh0RE5YRTZ0Ylc5Ny9zOU85LzdaZlZoeDg2L0N3clJPcGZ2dnhib01xZUxzdXFQcjFqNDRxRXdETk1PQnhpbVVpWW9VOHN3N0JDL2E3VDcydUVueUpEbEd4WjlLY2dsWlJ5dXFxcnYvdFNaRXJnT0k0TmdSQlRJdzlFbUhBb0ZHWlpucDZhR2FKMkdUeGZ4WXM4a0tWVVFoN1dCNWhRZUMzTHNVeG94VktXMTRsM0JYMldjb1VZUGlaeUxMZTh0ZVoraXVUNEdHaHZWNUtwS1drcHl6eEVyMk1aZ1ExeGRSamZSQm9IKzJrNmxJSGpLVEhQUEJvOENTSklTcXFxNHdHR09jV3lsSUdsZ3ZnTlgxR2Q4dkY1ZitJVUl3YjMwbmcrR2cyUWZCUklNdnkwakc4U1ZrWW80TjB6dlVYVlJ6dGJKL0w2eEw3bFVaRVhCRUhrdVpxbFM2Z0VBVWdLSnVybmhGdGZwQUNPWWQ4Yi9oVmJKUHF3aTQ0YTZLQTBzUFZqSWkvU0l5eGIzdThLbEFKMFM4alJWZ3JsVytuVkhQZHJoaVhDeHU0MmQ4NkJ5a3NEYzgwUDNNa0pGQkZROEhvMWxRZWdwV0pSV0ZHc0RzUnd3djdwSXl2dVFXMFprclg2TkRWRmJxY3ZhUUk4dmJ5cXp0NUFBUnJzYkt4NXloUUVHcyt3UE81NmJPSyswcmN3TXJPS2twVWJaV1l4VjA0VWVaWnYvY0JLRmhSTDZRZHY5eTRMZkVEQTcvdGhnN3RUbXYxYTUvR25PMHdsMGRRZzgwd2dsWmFIVW14UnZqd0FIT2Z5TjBteHJwcUxVcGNqc0szTkhZTW80UjFvNmVobzJaeUliMkZvZU9DM0lMSzhrWjJIUU1PdVd5d0dYVWtKQkNlVGJZRlMwK3ltMWgyLzZVZ212bnJ2S1laWnRJRVhHZjc1QzJjSUFwNUxITmQ3MXg3dVBvVGpha3JXSDllM0tGcGFhdGpVdkpVeXNGdzBLckxNWU1XMmxUZzRQZVVReDZrSkVBTHZ4WEVtQ2RWeVBMSHRDU2pCaGMwMVhDaklnYWZ4b3UrUEU2S0MxZGh4U0N3b0JDYytONFAzYnRNODRwbWRTU2pKbmpPL252WTRMUWZWeXo1L0krdjZJd2pVT01qeStNVkN4SWJLdXBUSmFFa3RwN2NUS1U0MlB2amgybS84Y1NwQzZhUHNhWC9NSFN1VVFMVlZzSWE0UlVUcy9yL0JWQWV4TmRqZG5zTkc3ai9yVjkzeGhlTE16S25GclBlVEVRY2hDeUNjS2IyNWFBSW43bHJBZXJ0clp3eU5YTThONnpmV3JGbzNkMlNtT0VjRjgzeC9yK09PRmdyQUhZV0Y3Y0VMamhWN1VRby82V0FJVVZsOUpGbDhhLy9IWjY2VnBiWTNJOVFLWnFQcnU3N2xBK2lPV0FJcjBoS3hIQ21tcjBvdGhTeWVJbDV5M3F0NHhUOGdTTnJLRVpvenM4RWxzNjdyZ3NMT1oreWd6d01mYnROaG9iZmd6cEV5R256N2h0UHR6VWk2UHVPb2o3SzBXRi9NWGlVRnh3R2FqUkQxaGpZWEhYSTlwNDA2cU95aW5wNS90aVdjREhZMGpJdTRuNjRRZnE3a2xpQjJnZW1hZzlRYk9pYTBQYmJETWJkNDNTSHV2eEZ4ckFvY3hpbnM3TVg1S3FiZTFRaXhLQnhvVjQvL1BmQWdHQ3UrUmxtNFN2Wml6eURIKzByZURIcDkyaU8wQnVYM2JDZkl0bDBQRXd2WUxxcHdYRzJNSGxHc1E0UzhwTUpadjFKR21IaUVvSFFEZE9qd21WbEVQL25FOUFES2pJOHhMSTBPT0dJVGZ5MFNiZUcvQzJqS1VER1NsRGhNOUkzSXBLOWl1cDZYbmJSTkM3eXF1ZU5zSkNDSWlYemRRaG5hR04rNDZ1bW5FZHk1VTVVYlVKNDhMRk05R2tKbzhCZERPaUFaN1pJUWJLaFlMTXF2aFUyd21OeGpFQXNTMkFJN3k0bldGNjRkdWVQYms3WVYzenZBVkxFTUQ5QXhKUk5hM0tEVWliVjdEam5rdXByTUVZalNjRk5jYVIyY2VQMnU5Ui81azEwNTJSeW1lNXBoQUZSc3dsSGpBdWRpUDRkT3k3Q2F4TGdkSmg5dlVsVTE3MDIvK0xQYTFVOWZ2UGk5cWxBNFhFVUJKYzNkRmxwc1I0NTdJRGwxaVBxTHA3bzgxTlFneVYxOWlZVTM4dVRpdjk3NVBkM1Npd1Fjc0dqeCt2NC82Zmw1VDdFT09NVEN0cGJLeGZlbXNRcS8zb2xRWmNtaW5BREFBSTBjdUdMSGFIT0Z4YnVHdlJrL1o5dTdDVUxxb1ZSNk5FMHl4MWF2ajMwb1JoYy9qV1VvSUFMR3hrejBkZzFEbDlpYUk3THFPT1hLc1hKRndqaXVFQWk3MEpyYTJuVzFQTDA4ekxCaFpzTUFCcFc1Y3NJN1RQZmV3OWlwRktjbjVrMWkrMUt5Q1dLakMzVy84ZEYxZDY2NitSYWFiQlZURlRIYWNqb29qQk5EaDBORHhrK0lQVGx3ZnFKa1dwYm5wRkhYSWJMYm1weEVRM2ZmL1owZy9tYXVYc29sbjl3RFJqeS9OSHNRRnczUDZ2V3VUSjQzLytGWnJrMmN2QUZSaXBDS2RmRDl5MitwalJqNzhzMEtkQ1VES0p2ZFY5MUNobmdWMzhUMjBUTStnZ2hqcEphUGxwRnIyeGJFejVnNEEvTkd0NXJOd2R3bVlHZWVlTVhCU0xISFVJYys2UnNvalJIOVZUVW0zL21MZi82NGI0NzBYdm94b1RLaGxNQlEyak1Fem8yUGp4ZEdNcHBtbjFSTTI0YldGSnFhUXY0QmN1SmEyU2FtN1pva3ExbGRDc3owNk5DQkhyaHdxVlFZcGZGajQyTlpleHoxRVc5U1Iva1Q1OG5FZVFLSmIyZlBYampwMHUvWVVrd0hFZ0xlT25mMm5PdWYxVFJUTTAyQ0xLTFRQeTYwL3gxQ0N6dHFuN0V2K0Jkc0MzbSszMGRlY1F2Vy93Qk5Ud1UrQ2ZVUUFRQUFBQUJKUlU1RXJrSmdnZz09JylcIjtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5iYXNlU3dpdGNoZXIpIHtcclxuICAgICAgICAvLyAgbGV0IHN3aXRjaGVyQ29udGVudCA9ICc8ZGl2IGNsYXNzPVwiYmFzZS1tYXAtc3dpdGNoZXJcIiB0aXRsZT1cIlRvZ2dsZSBCYXNlIExheWVyXCIgc3R5bGU9XCInO1xyXG4gICAgICAgIC8vICBzd2l0Y2hlckNvbnRlbnQgKz0gJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA3MHB4OyBsZWZ0OiA0cHg7IGJvcmRlcjogc29saWQgYmxhY2sgMXB4OyAnO1xyXG4gICAgICAgIC8vICBzd2l0Y2hlckNvbnRlbnQgKz0gYGhlaWdodDogNTBweDsgd2lkdGg6IDUwcHg7IHotaW5kZXg6IDEwOyBib3JkZXItcmFkaXVzOiA0cHg7IGJhY2tncm91bmQ6ICR7YWVyaWFsQ3NzfTtgO1xyXG4gICAgICAgIC8vICBzd2l0Y2hlckNvbnRlbnQgKz0gJ1wiPjwvZGl2Pic7XHJcbiAgICAgICAgLy8gICRtYXBEaXYuYXBwZW5kKHN3aXRjaGVyQ29udGVudCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAkbWFwRGl2LmZpbmQoJy5iYXNlLW1hcC1zd2l0Y2hlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgLy8gICAgICBvc21MYXllci5zZXRWaXNpYmxlKCFvc21MYXllci5nZXRWaXNpYmxlKCkpO1xyXG4gICAgICAgIC8vICAgICAgc2F0TGF5ZXIuc2V0VmlzaWJsZSghc2F0TGF5ZXIuZ2V0VmlzaWJsZSgpKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAgaWYgKG9zbUxheWVyLmdldFZpc2libGUoKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQnLCBhZXJpYWxDc3MpO1xyXG4gICAgICAgIC8vICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZCcsIG9zbUNzcyk7XHJcbiAgICAgICAgLy8gICAgICB9XHJcbiAgICAgICAgLy8gIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnpvb20gPCAwIHx8IG9wdGlvbnMuem9vbSA+IDI4KSB7XHJcbiAgICAgICAgdGhyb3cgJ3pvb20gb3V0IG9mIHJhbmdlJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5jZW50ZXIueCA+PSAtMTgwICYmIG9wdGlvbnMuY2VudGVyLnggPD0gMTgwICYmIG9wdGlvbnMuY2VudGVyLnkgPj0gLTkwICYmIG9wdGlvbnMuY2VudGVyLnkgPD0gOTApIHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBvbC5nZW9tLlBvaW50KFtvcHRpb25zLmNlbnRlci54LCBvcHRpb25zLmNlbnRlci55XSk7XHJcbiAgICAgICAgbmV3IG9sLnByb2ouUHJvamVjdGlvbih7Y29kZTogXCJFUFNHOjQzMjZcIn0pO1xyXG5cclxuICAgICAgICBwLnRyYW5zZm9ybShuZXcgb2wucHJvai5Qcm9qZWN0aW9uKHtjb2RlOiBcIkVQU0c6NDMyNlwifSksIG5ldyBvbC5wcm9qLlByb2plY3Rpb24oe2NvZGU6IFwiRVBTRzozODU3XCJ9KSk7XHJcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gcC5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICAgIG9wdGlvbnMuY2VudGVyLnggPSBjb29yZGluYXRlc1swXTtcclxuICAgICAgICBvcHRpb25zLmNlbnRlci55ID0gY29vcmRpbmF0ZXNbMV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbHMgPSBvbC5jb250cm9sLmRlZmF1bHRzKHtcclxuICAgICAgICAgICAgYXR0cmlidXRpb25PcHRpb25zOiB7Y29sbGFwc2libGU6IGZhbHNlfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdmlldyA9IG5ldyBvbC5WaWV3KHtcclxuICAgICAgICBjZW50ZXI6IFtvcHRpb25zLmNlbnRlci54LCBvcHRpb25zLmNlbnRlci55XSxcclxuICAgICAgICB6b29tOiBvcHRpb25zLnpvb20sXHJcbiAgICAgICAgbWluWm9vbTogb3B0aW9ucy5taW5ab29tLFxyXG4gICAgICAgIG1heFpvb206IG9wdGlvbnMubWF4Wm9vbVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IG1hcCA9IG5ldyBvbC5NYXAoe1xyXG4gICAgICAgIGxheWVyczogW29zbUxheWVyXSxcclxuICAgICAgICB0YXJnZXQ6IG9wdGlvbnMuZGl2SWQsXHJcbiAgICAgICAgY29udHJvbHM6IGNvbnRyb2xzLFxyXG4gICAgICAgIHZpZXc6IHZpZXdcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmZ1bGxTY3JlZW4pIHtcclxuICAgICAgICBtYXAuYWRkQ29udHJvbChuZXcgb2wuY29udHJvbC5GdWxsU2NyZWVuKHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxubm0ucXVpY2tNYXBCYXNlID0gcXVpY2tNYXBCYXNlO1xyXG5leHBvcnQgZGVmYXVsdCBxdWlja01hcEJhc2U7XHJcbiJdfQ==