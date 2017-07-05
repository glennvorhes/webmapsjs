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
/**
 * Created by gavorhes on 9/22/2016.
 */
var React = require("react");
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVsbG8uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL19zY3JhdGNoL0hlbGxvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDZCQUErQjtBQUkvQjtJQUEyQix5QkFBK0I7SUFBMUQ7O0lBSUEsQ0FBQztJQUhHLHNCQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMkIsS0FBSyxDQUFDLFNBQVMsR0FJekM7QUFKWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdhdm9yaGVzIG9uIDkvMjIvMjAxNi5cclxuICovXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIZWxsb1Byb3BzIHsgY29tcGlsZXI6IHN0cmluZzsgZnJhbWV3b3JrOiBzdHJpbmc7IH1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxsbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxIZWxsb1Byb3BzLCB7fT4ge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8aDE+SGVsbG8gZnJvbSB7dGhpcy5wcm9wcy5jb21waWxlcn0gYW5kIHt0aGlzLnByb3BzLmZyYW1ld29ya30hPC9oMT47XHJcbiAgICB9XHJcbn0iXX0=