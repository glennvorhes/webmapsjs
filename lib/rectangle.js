/**
 * Created by gavorhes on 4/13/2016.
 */
// ES6 introduces "classes". For people familiar with
// object oriented languages such as Java as C++ this
// is nothing out of the ordinary.
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = (function () {
    // The constructor will be executed if you initiate a
    // "Rectangle" object with
    //
    //   new Rectangle(width, height)
    //

    function Rectangle(width, height) {
        _classCallCheck(this, Rectangle);

        this.width = width;
        this.height = height;
        this.bird = 10;
        this.cat = 10;
        this.cat = 10;
        this.cat = 10;
        this.cat = 11;
        console.log('bird');
    }

    // This is also a new feature of ES6. The "get" keyword
    // is used to define a "getter".
    //
    // This means that if you access the "height" like this:
    //
    //   let rectangle = new Rectangle(5, 7);
    //   console.log(rectangle.width);
    //
    // The code below will be executed.

    _createClass(Rectangle, [{
        key: 'height',
        get: function get() {
            return this._height;
        }

        // This defines a "setter". If you write something like:
        //
        //   let rectangle = new Rectangle(5, 7);
        //   rectangle.height = 10;
        //
        // the code in the method will be executed with an
        // argument of value 10.
        ,
        set: function set(value) {
            if (typeof value !== 'number') {
                throw new Error('"height" must be a number.');
            }

            this._height = value;
        }
    }, {
        key: 'width',
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            if (typeof value !== 'number') {
                throw new Error('"width" must be a number.');
            }

            this._width = value;
        }

        // This getter calculates the area of the rectangle.

    }, {
        key: 'area',
        get: function get() {
            return this.width * this.height;
        }

        // This calculates its circumference.

    }, {
        key: 'circumference',
        get: function get() {
            return 2 * this.width + 2 * this.height;
        }
    }]);

    return Rectangle;
})();

exports.default = Rectangle;
//
//// We export the Rectangle class so it can
//// be require()'d in other files.
//module.exports = Rectangle;