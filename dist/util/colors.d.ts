/**
 * converts an RGB string to hex
 * @param {string} rgb - rgb color
 * @returns {string} rbg as hex
 */
export declare function rgb2hex(rgb: any): string;
/**
 * Convert hex string to RGB or RGBA string
 * @param {string} hexString - hex color string
 * @param {number} [alphaVal=undefined] Alpha value
 * @returns {string} - rgb or rgba color
 */
export declare function hexAlphaToRgbOrRgba(hexString: any, alphaVal: any): string;
/**
 * adds alpha value to rgb string 'rgb(r, b, g)', returns 'rgba(r, g, b, a)'
 * @param {string} rgb - rgb color
 * @param {number} alpha - alpha value 0 to 1
 * @returns {string} rgba color
 */
export declare function rgbToRgba(rgb: any, alpha: any): any;
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
export declare function makeBlueGreenRedGradient(minVal: any, maxVal: any, flipColors: any): (theVal: any) => string;
/**
 * Create a function that will return colors based on a gradient
 * @param {number} median - median value
 * @param {number} stdDev - standard deviation
 * @param {boolean} flipColors - if the colors should be flipped
 * @returns {colorLookupByNumber} color lookup function
 */
export declare function makeBlueGreenRedGradientZScore(median: any, stdDev: any, flipColors: any): (theVal: any) => string;
