"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by gavorhes on 7/18/2016.
 */
var provide_1 = require("../util/provide");
var nm = provide_1.default('util');
/**
 *
 * @param {Array<LayerBaseVector>|Array<ol.layer.Vector>|LayerBaseVector|ol.layer.Vector|*} layers - array of layers or single
 * @returns {ol.Extent|Array<number>|*} - collective extent
 */
function calculateExtent(layers) {
    "use strict";
    var hasExtent = false;
    var minX = 10E100;
    var minY = 10E100;
    var maxX = -10E100;
    var maxY = -10E100;
    for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
        var lyr = layers_1[_i];
        /**
         *
         * @type {ol.layer.Vector}
         */
        var olLayer = lyr['olLayer'] || lyr;
        if (olLayer.getSource().getFeatures().length > 0) {
            hasExtent = true;
            var ext = olLayer.getSource().getExtent();
            minX = ext[0] < minX ? ext[0] : minX;
            minY = ext[1] < minY ? ext[1] : minY;
            maxX = ext[2] > maxX ? ext[2] : maxX;
            maxY = ext[3] > maxY ? ext[3] : maxY;
        }
    }
    if (hasExtent) {
        return [minX, minY, maxX, maxY];
    }
    else {
        return undefined;
    }
}
exports.calculateExtent = calculateExtent;
nm.calculateExtent = calculateExtent;
/**
 * given one or an array of layers, fit to the map
 * @param layers - array of layers or single
 * @param  mp - the map to fit
 * @param [zoomOut=undefined] - levels to zoom out after fit
 */
function fitToMap(layers, mp, zoomOut) {
    "use strict";
    var ext = calculateExtent(layers);
    if (typeof ext == 'undefined') {
        return;
    }
    mp.getView().fit(ext, mp.getSize());
    if (typeof zoomOut == 'number') {
        mp.getView().setZoom(mp.getView().getZoom() - zoomOut);
    }
}
exports.fitToMap = fitToMap;
nm.calculateExtent = calculateExtent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW50VXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbEhlbHBlcnMvZXh0ZW50VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsMkNBQXNDO0FBS3RDLElBQU0sRUFBRSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0I7Ozs7R0FJRztBQUNILHlCQUFnQyxNQUEyQztJQUN2RSxZQUFZLENBQUM7SUFFYixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ2xCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUVuQixHQUFHLENBQUMsQ0FBWSxVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU07UUFBakIsSUFBSSxHQUFHLGVBQUE7UUFFUjs7O1dBR0c7UUFDSCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDO1FBR3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pDLENBQUM7S0FDSjtJQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDO0FBbENELDBDQWtDQztBQUVELEVBQUUsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBR3JDOzs7OztHQUtHO0FBQ0gsa0JBQXlCLE1BQTJDLEVBQUUsRUFBVSxFQUFFLE9BQWdCO0lBQzlGLFlBQVksQ0FBQztJQUViLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQSxDQUFDO1FBQzNCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFakQsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQztRQUM1QixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0FBQ0wsQ0FBQztBQWRELDRCQWNDO0FBRUQsRUFBRSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiA3LzE4LzIwMTYuXHJcbiAqL1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5pbXBvcnQgb2wgPSByZXF1aXJlKCdjdXN0b20tb2wnKTtcclxuaW1wb3J0IHtMYXllckJhc2VWZWN0b3J9IGZyb20gXCIuLi9sYXllcnMvTGF5ZXJCYXNlVmVjdG9yXCI7XHJcblxyXG5cclxuY29uc3Qgbm0gPSBwcm92aWRlKCd1dGlsJyk7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtBcnJheTxMYXllckJhc2VWZWN0b3I+fEFycmF5PG9sLmxheWVyLlZlY3Rvcj58TGF5ZXJCYXNlVmVjdG9yfG9sLmxheWVyLlZlY3RvcnwqfSBsYXllcnMgLSBhcnJheSBvZiBsYXllcnMgb3Igc2luZ2xlXHJcbiAqIEByZXR1cm5zIHtvbC5FeHRlbnR8QXJyYXk8bnVtYmVyPnwqfSAtIGNvbGxlY3RpdmUgZXh0ZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlRXh0ZW50KGxheWVyczogb2wubGF5ZXIuVmVjdG9yW118TGF5ZXJCYXNlVmVjdG9yW10pOiBvbC5FeHRlbnR8QXJyYXk8bnVtYmVyPnwgb2wuRXh0ZW50fCBudW1iZXJbXSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBsZXQgaGFzRXh0ZW50ID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IG1pblggPSAxMEUxMDA7XHJcbiAgICBsZXQgbWluWSA9IDEwRTEwMDtcclxuICAgIGxldCBtYXhYID0gLTEwRTEwMDtcclxuICAgIGxldCBtYXhZID0gLTEwRTEwMDtcclxuXHJcbiAgICBmb3IgKGxldCBseXIgb2YgbGF5ZXJzKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtvbC5sYXllci5WZWN0b3J9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IG9sTGF5ZXIgPSBseXJbJ29sTGF5ZXInXSB8fCBseXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG9sTGF5ZXIuZ2V0U291cmNlKCkuZ2V0RmVhdHVyZXMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGhhc0V4dGVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBleHQgPSBvbExheWVyLmdldFNvdXJjZSgpLmdldEV4dGVudCgpO1xyXG4gICAgICAgICAgICBtaW5YID0gZXh0WzBdIDwgbWluWCA/IGV4dFswXSA6IG1pblg7XHJcbiAgICAgICAgICAgIG1pblkgPSBleHRbMV0gPCBtaW5ZID8gZXh0WzFdIDogbWluWTtcclxuICAgICAgICAgICAgbWF4WCA9IGV4dFsyXSA+IG1heFggPyBleHRbMl0gOiBtYXhYO1xyXG4gICAgICAgICAgICBtYXhZID0gZXh0WzNdID4gbWF4WSA/IGV4dFszXSA6IG1heFk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYXNFeHRlbnQpIHtcclxuICAgICAgICByZXR1cm4gW21pblgsIG1pblksIG1heFgsIG1heFldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5ubS5jYWxjdWxhdGVFeHRlbnQgPSBjYWxjdWxhdGVFeHRlbnQ7XHJcbiBcclxuXHJcbi8qKlxyXG4gKiBnaXZlbiBvbmUgb3IgYW4gYXJyYXkgb2YgbGF5ZXJzLCBmaXQgdG8gdGhlIG1hcFxyXG4gKiBAcGFyYW0gbGF5ZXJzIC0gYXJyYXkgb2YgbGF5ZXJzIG9yIHNpbmdsZVxyXG4gKiBAcGFyYW0gIG1wIC0gdGhlIG1hcCB0byBmaXRcclxuICogQHBhcmFtIFt6b29tT3V0PXVuZGVmaW5lZF0gLSBsZXZlbHMgdG8gem9vbSBvdXQgYWZ0ZXIgZml0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZml0VG9NYXAobGF5ZXJzOiBvbC5sYXllci5WZWN0b3JbXXxMYXllckJhc2VWZWN0b3JbXSwgbXA6IG9sLk1hcCwgem9vbU91dD86IG51bWJlcil7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBsZXQgZXh0ID0gY2FsY3VsYXRlRXh0ZW50KGxheWVycyk7XHJcbiAgICBcclxuICAgIGlmICh0eXBlb2YgZXh0ID09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1wLmdldFZpZXcoKS5maXQoZXh0IGFzIG9sLkV4dGVudCwgbXAuZ2V0U2l6ZSgpKTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZiB6b29tT3V0ID09ICdudW1iZXInKXtcclxuICAgICAgICBtcC5nZXRWaWV3KCkuc2V0Wm9vbShtcC5nZXRWaWV3KCkuZ2V0Wm9vbSgpIC0gem9vbU91dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5tLmNhbGN1bGF0ZUV4dGVudCA9IGNhbGN1bGF0ZUV4dGVudDtcclxuIl19