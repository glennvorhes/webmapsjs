/**
 * Created by gavorhes on 9/22/2016.
 */
"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var Hello_1 = require("../_scratch/Hello");
console.log('I am in a tsx file for some reason');
ReactDOM.render(React.createElement(Hello_1.Hello, {compiler: "TypeScript", framework: "React"}), document.getElementById("example"));
//# sourceMappingURL=reacttst.js.map