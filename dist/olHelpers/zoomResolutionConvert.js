/**
 * Created by gavorhes on 12/14/2015.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var provide_1 = require("../util/provide");
var nm = provide_1.default('olHelpers.zoomResolutionConvert');
var _zoomResLookup = [
    156543.03392804097,
    78271.51696402048,
    39135.75848201024,
    19567.87924100512,
    9783.93962050256,
    4891.96981025128,
    2445.98490512564,
    1222.99245256282,
    611.49622628141,
    305.748113140705,
    152.8740565703525,
    76.43702828517625,
    38.21851414258813,
    19.109257071294063,
    9.554628535647032,
    4.777314267823516,
    2.388657133911758,
    1.194328566955879,
    0.5971642834779395,
    0.29858214173896974,
    0.14929107086948487,
    0.07464553543474244,
    0.03732276771737122,
    0.01866138385868561,
    0.009330691929342804,
    0.004665345964671402,
    0.002332672982335701,
    0.0011663364911678506,
    0.0005831682455839253 //28
];
/**
 * Get the resolution given the zoom level
 * @param {number} zoomLevel - the zoom level
 * @returns {number|*} the map resolution
 */
function zoomToResolution(zoomLevel) {
    "use strict";
    if (typeof zoomLevel == 'number') {
        if (zoomLevel % 1 === 0 && zoomLevel >= 0 && zoomLevel <= 28) {
            return _zoomResLookup[zoomLevel];
        }
        else {
            console.log("invalid zoom level provided: " + zoomLevel);
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.zoomToResolution = zoomToResolution;
nm.zoomToResolution = zoomToResolution;
/**
 * Get resolution from the zoom level
 * @param {number} resolution - the resolution
 * @returns {number|*} the zoom level
 */
function resolutionToZoom(resolution) {
    for (var i = 0; i < _zoomResLookup.length; i++) {
        if (resolution >= _zoomResLookup[i]) {
            return i;
        }
    }
    return 0;
}
exports.resolutionToZoom = resolutionToZoom;
nm.resolutionToZoom = resolutionToZoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbVJlc29sdXRpb25Db252ZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29sSGVscGVycy96b29tUmVzb2x1dGlvbkNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7OztBQUVILDJDQUFzQztBQUN0QyxJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFFdEQsSUFBSSxjQUFjLEdBQUc7SUFDakIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLHFCQUFxQixDQUFDLElBQUk7Q0FDN0IsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCwwQkFBaUMsU0FBUztJQUN0QyxZQUFZLENBQUM7SUFFYixFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFnQyxTQUFXLENBQUMsQ0FBQztZQUV6RCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDO0FBZEQsNENBY0M7QUFDRCxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFHdkM7Ozs7R0FJRztBQUNILDBCQUFpQyxVQUFVO0lBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBUkQsNENBUUM7QUFFRCxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiAxMi8xNC8yMDE1LlxyXG4gKi9cclxuXHJcbmltcG9ydCBwcm92aWRlIGZyb20gJy4uL3V0aWwvcHJvdmlkZSc7XHJcbmNvbnN0IG5tID0gcHJvdmlkZSgnb2xIZWxwZXJzLnpvb21SZXNvbHV0aW9uQ29udmVydCcpO1xyXG5cclxubGV0IF96b29tUmVzTG9va3VwID0gW1xyXG4gICAgMTU2NTQzLjAzMzkyODA0MDk3LCAvLzBcclxuICAgIDc4MjcxLjUxNjk2NDAyMDQ4LCAvLzFcclxuICAgIDM5MTM1Ljc1ODQ4MjAxMDI0LCAvLzJcclxuICAgIDE5NTY3Ljg3OTI0MTAwNTEyLCAvLzNcclxuICAgIDk3ODMuOTM5NjIwNTAyNTYsIC8vNFxyXG4gICAgNDg5MS45Njk4MTAyNTEyOCwgLy81XHJcbiAgICAyNDQ1Ljk4NDkwNTEyNTY0LCAvLzZcclxuICAgIDEyMjIuOTkyNDUyNTYyODIsIC8vN1xyXG4gICAgNjExLjQ5NjIyNjI4MTQxLCAvLzhcclxuICAgIDMwNS43NDgxMTMxNDA3MDUsIC8vOVxyXG4gICAgMTUyLjg3NDA1NjU3MDM1MjUsIC8vMTBcclxuICAgIDc2LjQzNzAyODI4NTE3NjI1LCAvLzExXHJcbiAgICAzOC4yMTg1MTQxNDI1ODgxMywgLy8xMlxyXG4gICAgMTkuMTA5MjU3MDcxMjk0MDYzLCAvLzEzXHJcbiAgICA5LjU1NDYyODUzNTY0NzAzMiwgLy8xNFxyXG4gICAgNC43NzczMTQyNjc4MjM1MTYsIC8vMTVcclxuICAgIDIuMzg4NjU3MTMzOTExNzU4LCAvLzE2XHJcbiAgICAxLjE5NDMyODU2Njk1NTg3OSwgLy8xN1xyXG4gICAgMC41OTcxNjQyODM0Nzc5Mzk1LCAvLzE4XHJcbiAgICAwLjI5ODU4MjE0MTczODk2OTc0LCAvLzE5XHJcbiAgICAwLjE0OTI5MTA3MDg2OTQ4NDg3LCAvLzIwXHJcbiAgICAwLjA3NDY0NTUzNTQzNDc0MjQ0LCAvLzIxXHJcbiAgICAwLjAzNzMyMjc2NzcxNzM3MTIyLCAvLzIyXHJcbiAgICAwLjAxODY2MTM4Mzg1ODY4NTYxLCAvLzIzXHJcbiAgICAwLjAwOTMzMDY5MTkyOTM0MjgwNCwgLy8yNFxyXG4gICAgMC4wMDQ2NjUzNDU5NjQ2NzE0MDIsIC8vMjVcclxuICAgIDAuMDAyMzMyNjcyOTgyMzM1NzAxLCAvLzI2XHJcbiAgICAwLjAwMTE2NjMzNjQ5MTE2Nzg1MDYsIC8vMjdcclxuICAgIDAuMDAwNTgzMTY4MjQ1NTgzOTI1MyAvLzI4XHJcbl07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSByZXNvbHV0aW9uIGdpdmVuIHRoZSB6b29tIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB6b29tTGV2ZWwgLSB0aGUgem9vbSBsZXZlbFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfCp9IHRoZSBtYXAgcmVzb2x1dGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHpvb21Ub1Jlc29sdXRpb24oem9vbUxldmVsKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHpvb21MZXZlbCA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGlmICh6b29tTGV2ZWwgJSAxID09PSAwICYmIHpvb21MZXZlbCA+PSAwICYmIHpvb21MZXZlbCA8PSAyOCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3pvb21SZXNMb29rdXBbem9vbUxldmVsXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgaW52YWxpZCB6b29tIGxldmVsIHByb3ZpZGVkOiAke3pvb21MZXZlbH1gKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcbm5tLnpvb21Ub1Jlc29sdXRpb24gPSB6b29tVG9SZXNvbHV0aW9uO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgcmVzb2x1dGlvbiBmcm9tIHRoZSB6b29tIGxldmVsXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIC0gdGhlIHJlc29sdXRpb25cclxuICogQHJldHVybnMge251bWJlcnwqfSB0aGUgem9vbSBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdXRpb25Ub1pvb20ocmVzb2x1dGlvbil7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IF96b29tUmVzTG9va3VwLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBpZiAocmVzb2x1dGlvbiA+PSBfem9vbVJlc0xvb2t1cFtpXSApe1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbm5tLnJlc29sdXRpb25Ub1pvb20gPSByZXNvbHV0aW9uVG9ab29tO1xyXG4iXX0=