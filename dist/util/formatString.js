/**
 * Created by gavorhes on 10/30/2015.
 */
"use strict";
if (!String.prototype['format']) {
    /**
     *  helper function for string replacement to keep code clean
     * usage
     * var aString = 'some{0}stuff{1}replaced';
     * var c = 'cat';
     * var b = 'bird';
     * aString.format(c, b)  returns 'somecatstuffbirdreplaced'
     * prettier than
     * 'some' + c + 'stuff' + b + 'replaced'
     * but same effect
     * adapted to take a single array that is used for replacement by position ie
     * var arrReplacements = [c, b];
     * aString.format(arrReplacements)
     * @returns {string} converted string
     */
    String.prototype['format'] = function () {
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
            args[i] = (args[i] !== null ? args[i] : '');
        }
        //if the first argument is an array, use that
        if (args[0].constructor == Array) {
            args = args[0];
        }
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = undefined;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvZm9ybWF0U3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHOztBQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUI7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHO1FBQ3pCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsNkNBQTZDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsTUFBTTtZQUNuRCxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7QUFDTixDQUFDOztBQUVELGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDEwLzMwLzIwMTUuXHJcbiAqL1xyXG5cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlWydmb3JtYXQnXSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiAgaGVscGVyIGZ1bmN0aW9uIGZvciBzdHJpbmcgcmVwbGFjZW1lbnQgdG8ga2VlcCBjb2RlIGNsZWFuXHJcbiAgICAgKiB1c2FnZVxyXG4gICAgICogdmFyIGFTdHJpbmcgPSAnc29tZXswfXN0dWZmezF9cmVwbGFjZWQnO1xyXG4gICAgICogdmFyIGMgPSAnY2F0JztcclxuICAgICAqIHZhciBiID0gJ2JpcmQnO1xyXG4gICAgICogYVN0cmluZy5mb3JtYXQoYywgYikgIHJldHVybnMgJ3NvbWVjYXRzdHVmZmJpcmRyZXBsYWNlZCdcclxuICAgICAqIHByZXR0aWVyIHRoYW5cclxuICAgICAqICdzb21lJyArIGMgKyAnc3R1ZmYnICsgYiArICdyZXBsYWNlZCdcclxuICAgICAqIGJ1dCBzYW1lIGVmZmVjdFxyXG4gICAgICogYWRhcHRlZCB0byB0YWtlIGEgc2luZ2xlIGFycmF5IHRoYXQgaXMgdXNlZCBmb3IgcmVwbGFjZW1lbnQgYnkgcG9zaXRpb24gaWVcclxuICAgICAqIHZhciBhcnJSZXBsYWNlbWVudHMgPSBbYywgYl07XHJcbiAgICAgKiBhU3RyaW5nLmZvcm1hdChhcnJSZXBsYWNlbWVudHMpXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBjb252ZXJ0ZWQgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIFN0cmluZy5wcm90b3R5cGVbJ2Zvcm1hdCddID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcmdzW2ldID0gKGFyZ3NbaV0gIT09IG51bGwgPyBhcmdzW2ldIDogJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYW4gYXJyYXksIHVzZSB0aGF0XHJcbiAgICAgICAgaWYgKGFyZ3NbMF0uY29uc3RydWN0b3IgPT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC97KFxcZCspfS9nLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3NbbnVtYmVyXSAhPSAndW5kZWZpbmVkJyA/IGFyZ3NbbnVtYmVyXSA6IG1hdGNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdW5kZWZpbmVkO1xyXG4iXX0=