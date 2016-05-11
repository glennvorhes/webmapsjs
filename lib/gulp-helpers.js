'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bundleEs2015 = bundleEs2015;
exports.processLessFile = processLessFile;
exports.bundleEs2015Multiple = bundleEs2015Multiple;
/**
 * Created by gavorhes on 5/10/2016.
 * Helpers functions for gulp tasks
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var glob = require('glob');
var watchify = require('watchify');
var gulpUtil = require('gulp-util');

/**
 * @typedef {object} dirNameFilePath
 * @property {string} dirName - directory name
 * @property {string} fileName - file name
 */

/**
 * get directory and file name from output path
 * @param {string} outputFile - output file path
 * @returns {dirNameFilePath} file directory and path
 * @private
 */
function _processOutDir(outputFile) {
    "use strict";

    var pathParts = outputFile.split('/');
    var outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    var outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    return { dirName: outDir, fileName: outFileName };
}

/**
 *
 * @param {string|null} inputFile - input file set to null to bundle everything in 'test' directory
 * @param {dirNameFilePath|string} outFile - output file as string or path object
 * @param {boolean} [production=false] if production, minify and don't watch
 * @returns {*} the stream
 * @private
 */
function bundleEs2015(inputFile, outFile, production) {
    "use strict";

    if (typeof outFile == 'string') {
        outFile = _processOutDir(outFile);
    }

    production = typeof production == 'boolean' ? production : false;

    if (inputFile == null) {
        inputFile = glob.sync('./spec/**/*.js');
    }

    var bundler = browserify(inputFile);

    if (!production) {
        bundler = watchify(bundler);
    }

    function runBundle() {
        var stream = bundler.bundle().on('error', function (err) {
            console.error(err);
        }).pipe(source(outFile.fileName)).pipe(buffer()).pipe(sourcemaps.init({ loadMaps: true }));

        if (production) {
            stream = stream.pipe(minify({
                ext: {
                    src: '-debug.js',
                    min: '.js'
                },
                exclude: ['tasks'],
                ignoreFiles: ['.combo.js', '-min.js']
            }));
        }

        return stream.pipe(sourcemaps.write('./')).pipe(gulp.dest(outFile.dirName));
    }

    if (!production) {
        bundler.on('update', runBundle);
        bundler.on('log', gulpUtil.log);
    }

    return runBundle();
}

/**
 * convert less file 
 * @param {string} inputFile - input less file
 * @param {string} outputFile - output css file
 * @returns {*} stream
 */
function processLessFile(inputFile, outputFile) {
    "use strict";

    var pathParts = outputFile.split('/');
    var outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    var outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    var fileNameParts = outFileName.split('.');

    return gulp.src(inputFile).pipe(less().on('error', function (err) {
        console.log(err);
    })).pipe(cssmin().on('error', function (err) {
        console.log(err);
    })).pipe(rename({
        basename: fileNameParts[0],
        extname: '.' + fileNameParts[1],
        suffix: '.min'
    })).pipe(gulp.dest(outDir));
}

/**
 * make multiple bundles
 * @param {Array<Array<string>>} fileArray - array with elements [input file, output file]
 * @param {boolean} production - if is production
 * @returns {*} output stream
 */
function bundleEs2015Multiple(fileArray, production) {
    "use strict";

    var outStream = undefined;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = fileArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var f = _step.value;

            outStream = bundleEs2015(f[0], f[1], production);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return outStream;
}