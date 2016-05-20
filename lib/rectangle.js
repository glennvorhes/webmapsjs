(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.rectangle = mod.exports;
    }
})(this, function (module, exports) {
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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Rectangle = function () {
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
            },
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
        }, {
            key: 'area',
            get: function get() {
                return this.width * this.height;
            }
        }, {
            key: 'circumference',
            get: function get() {
                return 2 * this.width + 2 * this.height;
            }
        }]);

        return Rectangle;
    }();

    exports.default = Rectangle;
    module.exports = exports['default'];
});