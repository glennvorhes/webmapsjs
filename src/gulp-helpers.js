/**
 * Created by gavorhes on 5/10/2016.
 * Helpers functions for gulp tasks
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const glob = require('glob');
const watchify = require('watchify');
const gulpUtil = require('gulp-util');


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

    let pathParts = outputFile.split('/');
    let outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    let outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    return {dirName: outDir, fileName: outFileName};
}

/**
 *
 * @param {string} inputFile - input file set to null to bundle everything in 'test' directory
 * @param {dirNameFilePath|string} outFile - output file as string or path object
 * @param {boolean} [production=false] if production, minify and don't watch
 * @returns {*} the stream
 * @private
 */
export function bundleEs2015(inputFile, outFile, production) {
    "use strict";



    if (typeof outFile == 'string') {
        outFile = _processOutDir(outFile);
    }

    production = typeof production == 'boolean' ? production : false;

    if (inputFile.indexOf('*') > -1) {
        inputFile = glob.sync(inputFile);
    }


    let bundler = browserify({
        entries: inputFile,
        cache: {},
        packageCache: {},
        debug: true
    });

    
    bundler.transform(babelify.configure({
        presets: ["es2015"],
        ignore: /ol\-build\.js|jquery\.min/
        // ignore: /ol\-build\.js|jquery\.min|\/node_modules\/(?!webmapsjs\/)|\/node_modules\/webmapsjs\/(?!lib\/)/
    }));

    if (!production) {
        bundler = watchify(bundler);
    }


    function runBundle() {
        console.log(inputFile);
        let stream = bundler.bundle()
            .on('error', function (err) {
                console.error(err);
            })
            .pipe(source(outFile.fileName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}));

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
export function processLessFile(inputFile, outputFile) {
    "use strict";

    let pathParts = outputFile.split('/');
    let outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    let outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    let fileNameParts = outFileName.split('.');

    return gulp.src(inputFile)
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        .pipe(rename({
            basename: fileNameParts[0],
            extname: '.' + fileNameParts[1],
            suffix: '.min'
        }))
        .pipe(gulp.dest(outDir));
}

/**
 * make multiple bundles
 * @param {Array<Array<string>>} fileArray - array with elements [input file, output file]
 * @param {boolean} production - if is production
 * @returns {*} output stream
 */
export function bundleEs2015Multiple(fileArray, production) {
    "use strict";

    let outStream = undefined;

    for (let f of fileArray) {
        outStream = bundleEs2015(f[0], f[1], production);
    }

    return outStream;
}
