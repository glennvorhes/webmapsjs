
import ol = require('custom-ol');
console.log(ol.animation.bounce({duration: 10, resolution: 30, start: 4, easing: (t) => {return 5}}));