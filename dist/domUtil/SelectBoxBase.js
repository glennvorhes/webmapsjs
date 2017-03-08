/**
 * Created by gavorhes on 5/13/2016.
 */
"use strict";
var makeGuid_1 = require("../util/makeGuid");
var provide_1 = require("../util/provide");
var nm = provide_1.default('domUtil');
var SelectBoxBase = (function () {
    /**
     *
     * @param {jQuery} parent - parent container
     * @param {string} labelContent
     * @param {contentGenerator} [contentGen=undefined]
     */
    function SelectBoxBase(parent, labelContent, contentGen) {
        var _this = this;
        var guidTop = makeGuid_1.default();
        var guid = makeGuid_1.default();
        var htmlString = "<div id=\"" + guidTop + "\">";
        htmlString += "<label for=\"" + guid + "\">" + labelContent + "</label>";
        if (contentGen) {
            htmlString += contentGen(guid);
        }
        else {
            htmlString += "<select id=\"" + guid + "\"></select>";
        }
        htmlString += '</div>';
        parent.append(htmlString);
        this._$container = parent.find('#' + guidTop);
        this.$label = this._$container.find('label');
        /**
         *
         * @type {Array<selectChangeCallback>}
         * @private
         */
        this._changeListeners = [];
        this._box = parent.find("#" + guid);
        if (!this._box) {
            throw 'the select box was not found';
        }
        this._box.change(function () {
            _this.changed();
        });
    }
    Object.defineProperty(SelectBoxBase.prototype, "box", {
        /**
         *
         * @returns {jQuery}
         */
        get: function () {
            return this._box;
        },
        enumerable: true,
        configurable: true
    });
    SelectBoxBase.prototype.changed = function () {
        var v = this._box.val();
        for (var _i = 0, _a = this._changeListeners; _i < _a.length; _i++) {
            var f = _a[_i];
            f(v);
        }
    };
    /**
     *
     * @param {selectChangeCallback} func
     */
    SelectBoxBase.prototype.addChangeListener = function (func) {
        this._changeListeners.push(func);
    };
    Object.defineProperty(SelectBoxBase.prototype, "selectedValue", {
        get: function () {
            var theVal = this.box.val();
            if (theVal == null || typeof theVal == 'undefined') {
                return null;
            }
            else if (isNaN(theVal)) {
                return theVal;
            }
            else {
                if (theVal.indexOf('.') > -1) {
                    return parseFloat(theVal);
                }
                else {
                    return parseInt(theVal);
                }
            }
        },
        /**
         *
         * @param {string|number} v
         */
        set: function (v) {
            this.box.val(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectBoxBase.prototype, "selectedText", {
        get: function () {
            return this.box.find('option:selected').text();
        },
        enumerable: true,
        configurable: true
    });
    return SelectBoxBase;
}());
exports.SelectBoxBase = SelectBoxBase;
nm.SelectBoxBase = SelectBoxBase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectBoxBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0Qm94QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21VdGlsL1NlbGVjdEJveEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsNkNBQXdDO0FBQ3hDLDJDQUFzQztBQUN0QyxJQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBcUI5QjtJQUtJOzs7OztPQUtHO0lBQ0gsdUJBQVksTUFBTSxFQUFFLFlBQVksRUFBRSxVQUE2QjtRQUEvRCxpQkFvQ0M7UUFuQ0csSUFBSSxPQUFPLEdBQUcsa0JBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLGtCQUFRLEVBQUUsQ0FBQztRQUV0QixJQUFJLFVBQVUsR0FBRyxlQUFZLE9BQU8sUUFBSSxDQUFDO1FBQ3pDLFVBQVUsSUFBSSxrQkFBZSxJQUFJLFdBQUssWUFBWSxhQUFVLENBQUM7UUFFN0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztZQUNaLFVBQVUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osVUFBVSxJQUFJLGtCQUFlLElBQUksaUJBQWEsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsVUFBVSxJQUFJLFFBQVEsQ0FBQztRQUV2QixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3Qzs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSSxJQUFNLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1osTUFBTSw4QkFBOEIsQ0FBQztRQUN6QyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDYixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBTUQsc0JBQUksOEJBQUc7UUFKUDs7O1dBR0c7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsK0JBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFeEIsR0FBRyxDQUFDLENBQVUsVUFBcUIsRUFBckIsS0FBQSxJQUFJLENBQUMsZ0JBQWdCLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCO1lBQTlCLElBQUksQ0FBQyxTQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gseUNBQWlCLEdBQWpCLFVBQWtCLElBQTBCO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELHNCQUFJLHdDQUFhO2FBQWpCO1lBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUU1QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ2pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDN0IsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRDs7O1dBR0c7YUFDSCxVQUFrQixDQUFnQjtZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDOzs7T0FSQTtJQVVELHNCQUFJLHVDQUFZO2FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsQ0FBQzs7O09BQUE7SUFFTCxvQkFBQztBQUFELENBQUMsQUF0R0QsSUFzR0M7QUF0R1ksc0NBQWE7QUF3RzFCLEVBQUUsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOztBQUVqQyxrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnYXZvcmhlcyBvbiA1LzEzLzIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IG1ha2VHdWlkIGZyb20gJy4uL3V0aWwvbWFrZUd1aWQnO1xyXG5pbXBvcnQgcHJvdmlkZSBmcm9tICcuLi91dGlsL3Byb3ZpZGUnO1xyXG5jb25zdCBubSA9IHByb3ZpZGUoJ2RvbVV0aWwnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugc2VsZWN0Q2hhbmdlQ2FsbGJhY2t7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdGhlVmFsdWUgdGhlIGN1cnJlbnQgc2VsZWN0IHZhbHVlIG9mIHRoZSBzZWxlY3QgYm94XHJcbiAgICAgKi9cclxuICAgICh0aGVWYWx1ZTogc3RyaW5nKSA6IHZvaWRcclxufVxyXG5cclxuLyoqXHJcbiAqIG11c3QgcmV0dXJuIGluIHRoZSBjb250ZW50cyA8c2VsZWN0IGlkPVwiJHtndWlkfVwiPjwvc2VsZWN0PiBhbW9uZyBvdGhlciB0aGluZ3NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29udGVudEdlbmVyYXRvcntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGFHdWlkXHJcbiAgICAgKi9cclxuICAgIChhR3VpZDogc3RyaW5nKTogc3RyaW5nXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Qm94QmFzZXtcclxuICAgIF8kY29udGFpbmVyOiBKUXVlcnk7XHJcbiAgICAkbGFiZWw6IEpRdWVyeTtcclxuICAgIF9ib3g6IEpRdWVyeTtcclxuICAgIF9jaGFuZ2VMaXN0ZW5lcnM6IEFycmF5PHNlbGVjdENoYW5nZUNhbGxiYWNrPjtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSBwYXJlbnQgLSBwYXJlbnQgY29udGFpbmVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge2NvbnRlbnRHZW5lcmF0b3J9IFtjb250ZW50R2VuPXVuZGVmaW5lZF1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50LCBsYWJlbENvbnRlbnQsIGNvbnRlbnRHZW4/OiBjb250ZW50R2VuZXJhdG9yKXtcclxuICAgICAgICBsZXQgZ3VpZFRvcCA9IG1ha2VHdWlkKCk7XHJcbiAgICAgICAgbGV0IGd1aWQgPSBtYWtlR3VpZCgpO1xyXG5cclxuICAgICAgICBsZXQgaHRtbFN0cmluZyA9IGA8ZGl2IGlkPVwiJHtndWlkVG9wfVwiPmA7XHJcbiAgICAgICAgaHRtbFN0cmluZyArPSBgPGxhYmVsIGZvcj1cIiR7Z3VpZH1cIj4ke2xhYmVsQ29udGVudH08L2xhYmVsPmA7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50R2VuKXtcclxuICAgICAgICAgICAgaHRtbFN0cmluZyArPSBjb250ZW50R2VuKGd1aWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWxTdHJpbmcgKz0gYDxzZWxlY3QgaWQ9XCIke2d1aWR9XCI+PC9zZWxlY3Q+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbFN0cmluZyArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChodG1sU3RyaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5fJGNvbnRhaW5lciA9IHBhcmVudC5maW5kKCcjJyArIGd1aWRUb3ApO1xyXG5cclxuICAgICAgICB0aGlzLiRsYWJlbCA9IHRoaXMuXyRjb250YWluZXIuZmluZCgnbGFiZWwnKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXk8c2VsZWN0Q2hhbmdlQ2FsbGJhY2s+fVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fY2hhbmdlTGlzdGVuZXJzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2JveCA9IHBhcmVudC5maW5kKGAjJHtndWlkfWApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5fYm94KXtcclxuICAgICAgICAgICAgdGhyb3cgJ3RoZSBzZWxlY3QgYm94IHdhcyBub3QgZm91bmQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYm94LmNoYW5nZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICAgKi9cclxuICAgIGdldCBib3goKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm94O1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZWQoKXtcclxuICAgICAgICBsZXQgdiA9IHRoaXMuX2JveC52YWwoKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBmIG9mIHRoaXMuX2NoYW5nZUxpc3RlbmVycyl7XHJcbiAgICAgICAgICAgIGYodik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c2VsZWN0Q2hhbmdlQ2FsbGJhY2t9IGZ1bmNcclxuICAgICAqL1xyXG4gICAgYWRkQ2hhbmdlTGlzdGVuZXIoZnVuYzogc2VsZWN0Q2hhbmdlQ2FsbGJhY2spe1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUxpc3RlbmVycy5wdXNoKGZ1bmMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXQgc2VsZWN0ZWRWYWx1ZSgpOiBzdHJpbmd8bnVtYmVye1xyXG4gICAgICAgIGxldCB0aGVWYWwgPSB0aGlzLmJveC52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoZVZhbCA9PSBudWxsIHx8IHR5cGVvZiB0aGVWYWwgPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHRoZVZhbCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhlVmFsXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoZVZhbC5pbmRleE9mKCcuJykgPiAtMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGVWYWwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhlVmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHZcclxuICAgICAqL1xyXG4gICAgc2V0IHNlbGVjdGVkVmFsdWUodjogc3RyaW5nfG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ib3gudmFsKHYpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgc2VsZWN0ZWRUZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm94LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm5tLlNlbGVjdEJveEJhc2UgPSBTZWxlY3RCb3hCYXNlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Qm94QmFzZTtcclxuIl19