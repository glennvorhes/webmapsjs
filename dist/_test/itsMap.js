/**
 * Created by gavorhes on 12/18/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItsLayerCollection_1 = require("../collections/ItsLayerCollection");
var LayerLegend_1 = require("../collections/LayerLegend");
var quickMap_1 = require("../olHelpers/quickMap");
var map = quickMap_1.default();
window['map'] = map;
var itsLayerCollection = new ItsLayerCollection_1.default(map);
var layerArray = [
    {
        groupName: 'ITS Inventory Layers',
        collapse: false,
        addCheck: true,
        items: itsLayerCollection.layers
    }
];
var legend = new LayerLegend_1.default(layerArray, 'legend-container', {});
console.log('it works');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRzTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL190ZXN0L2l0c01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7O0FBR0gsd0VBQW1FO0FBQ25FLDBEQUFxRDtBQUNyRCxrREFBNkM7QUFFN0MsSUFBSSxHQUFHLEdBQUcsa0JBQVEsRUFBRSxDQUFDO0FBRXJCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFFcEIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLDRCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXJELElBQUksVUFBVSxHQUFHO0lBQ2I7UUFDSSxTQUFTLEVBQUUsc0JBQXNCO1FBQ2pDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsa0JBQWtCLENBQUMsTUFBTTtLQUNuQztDQUNKLENBQUM7QUFFRixJQUFJLE1BQU0sR0FBRyxJQUFJLHFCQUFXLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRWpFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi8xOC8yMDE1LlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgSXRzTGF5ZXJDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL0l0c0xheWVyQ29sbGVjdGlvbic7XHJcbmltcG9ydCBMYXllckxlZ2VuZCBmcm9tICcuLi9jb2xsZWN0aW9ucy9MYXllckxlZ2VuZCc7XHJcbmltcG9ydCBxdWlja01hcCBmcm9tICcuLi9vbEhlbHBlcnMvcXVpY2tNYXAnO1xyXG5cclxubGV0IG1hcCA9IHF1aWNrTWFwKCk7XHJcblxyXG53aW5kb3dbJ21hcCddID0gbWFwO1xyXG5cclxubGV0IGl0c0xheWVyQ29sbGVjdGlvbiA9IG5ldyBJdHNMYXllckNvbGxlY3Rpb24obWFwKTtcclxuXHJcbmxldCBsYXllckFycmF5ID0gW1xyXG4gICAge1xyXG4gICAgICAgIGdyb3VwTmFtZTogJ0lUUyBJbnZlbnRvcnkgTGF5ZXJzJyxcclxuICAgICAgICBjb2xsYXBzZTogZmFsc2UsXHJcbiAgICAgICAgYWRkQ2hlY2s6IHRydWUsXHJcbiAgICAgICAgaXRlbXM6IGl0c0xheWVyQ29sbGVjdGlvbi5sYXllcnNcclxuICAgIH1cclxuXTtcclxuXHJcbmxldCBsZWdlbmQgPSBuZXcgTGF5ZXJMZWdlbmQobGF5ZXJBcnJheSwgJ2xlZ2VuZC1jb250YWluZXInLCB7fSk7XHJcblxyXG5jb25zb2xlLmxvZygnaXQgd29ya3MnKTtcclxuIl19