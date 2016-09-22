"use strict";
/**
 * Created by gavorhes on 11/3/2015.
 */
var provide_1 = require('./provide');
var chk = require('./checkDefined');
var nm = provide_1.default('util.colors');
/**
 * helper function to convert to hex
 * @param {number|string} x - the number to convert to hex
 * @returns {string} number as hex
 * @private
 */
function _hex(x) {
    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
/**
 * converts an RGB string to hex
 * @param {string} rgb - rgb color
 * @returns {string} rbg as hex
 */
function rgb2hex(rgb) {
    var rgb1 = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return ("#" + _hex(rgb1[1]) + _hex(rgb1[2]) + _hex(rgb1[3])).toUpperCase();
}
exports.rgb2hex = rgb2hex;
nm.rgb2hex = rgb2hex;
/**
 * Convert hex string to RGB or RGBA string
 * @param {string} hexString - hex color string
 * @param {number} [alphaVal=undefined] Alpha value
 * @returns {string} - rgb or rgba color
 */
function hexAlphaToRgbOrRgba(hexString, alphaVal) {
    hexString = ((hexString.charAt(0) == "#") ? hexString.substring(1, 7) : hexString);
    var r = parseInt(hexString.substring(0, 2), 16).toString() || '0';
    var g = parseInt(hexString.substring(2, 4), 16).toString() || '0';
    var b = parseInt(hexString.substring(4, 6), 16).toString() || '0';
    if (alphaVal) {
        return "rgba(" + r + "," + g + "," + b + "," + alphaVal + ")";
    }
    else {
        return "rgba(" + r + "," + g + "," + b + ")";
    }
}
exports.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;
nm.hexAlphaToRgbOrRgba = hexAlphaToRgbOrRgba;
/**
 * adds alpha value to rgb string 'rgb(r, b, g)', returns 'rgba(r, g, b, a)'
 * @param {string} rgb - rgb color
 * @param {number} alpha - alpha value 0 to 1
 * @returns {string} rgba color
 */
function rgbToRgba(rgb, alpha) {
    var pieces = rgb.split(',');
    pieces[0] = pieces[0].replace('rgb', 'rgba');
    pieces[2] = pieces[2].replace(')', '');
    pieces.push(' ' + alpha.toFixed(1) + ')');
    return pieces.join(',');
}
exports.rgbToRgba = rgbToRgba;
nm.rgbToRgba = rgbToRgba;
/**
 * @typedef {function} colorLookupByNumber
 * @param {number} num - the number to use to retrieve the color
 * @returns {string} rgb color
 */
/**
 * Make a blue green red gradient
 * @param {number} minVal - minimum value
 * @param {number} maxVal - maximum value
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradient(minVal, maxVal, flipColors) {
    if (typeof flipColors != "boolean") {
        flipColors = false;
    }
    return function (theVal) {
        var r, g, b;
        var ratio;
        if (chk.undefinedOrNull(theVal)) {
            return 'rgb(100,100,100)';
        }
        var percent = (theVal - minVal) / (maxVal - minVal);
        if (flipColors == true) {
            percent = 1 - percent;
        }
        if (percent >= 1) {
            r = 255;
            g = 0;
            b = 0;
        }
        else if (percent <= 0) {
            r = 0;
            g = 0;
            b = 255;
        }
        else if (percent < .25) {
            // green up, blue constant
            r = 0;
            g = Math.floor(255 * percent / 0.25);
            b = 255;
        }
        else if (percent < 0.50) {
            //blue down, green constant
            ratio = (percent - 0.25) / 0.25;
            r = 0;
            g = 255;
            b = 255 - Math.floor(255 * ratio);
        }
        else if (percent < 0.75) {
            // red up, green constant
            ratio = (percent - 0.5) / 0.25;
            r = Math.floor(255 * ratio);
            g = 255;
            b = 0;
        }
        else {
            // green down, red constant
            ratio = (percent - 0.75) / 0.25;
            r = 255;
            g = 255 - Math.floor(255 * ratio);
            b = 0;
        }
        r = r.toFixed();
        g = g.toFixed();
        b = b.toFixed();
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
}
exports.makeBlueGreenRedGradient = makeBlueGreenRedGradient;
nm.makeBlueGreenRedGradient = makeBlueGreenRedGradient;
/**
 * Create a function that will return colors based on a gradient
 * @param {number} median - median value
 * @param {number} stdDev - standard deviation
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
function makeBlueGreenRedGradientZScore(median, stdDev, flipColors) {
    var grd = makeBlueGreenRedGradient(-2.5, 2.5, flipColors);
    return function (theVal) {
        var zScore;
        if (theVal == null) {
            zScore = null;
        }
        else {
            zScore = (theVal - median) / stdDev;
        }
        return grd(zScore);
    };
}
exports.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;
nm.makeBlueGreenRedGradientZScore = makeBlueGreenRedGradientZScore;
//# sourceMappingURL=colors.js.map