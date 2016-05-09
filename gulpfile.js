"use strict";
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
const gutil = require('gulp-util');


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
    let pathParts = outputFile.split('/');
    let outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    let outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    return {dirName: outDir, fileName: outFileName};
}

/**
 *
 * @param {string|null} inputFile - input file set to null to bundle everything in 'test' directory
 * @param {dirNameFilePath|string} outFile - output file as string or path object
 * @param {boolean} [production=false] if production, minify and don't watch
 * @returns {*} the stream
 * @private
 */
function _bundleIt(inputFile, outFile, production) {
    if (typeof outFile == 'string') {
        outFile = _processOutDir(outFile);
    }

    production = typeof production == 'boolean' ? production : false;

    if (inputFile == null){
        inputFile = glob.sync('./spec/**/*.js');
    }

    let bundler = browserify(
        {
            entries: [inputFile],
            cache: {},
            packageCache: {},
            debug: true
        }
    );

    bundler.transform(babelify.configure({
        presets: ["es2015"],
        ignore: /ol.js|jquery.min/
    }));

    if (!production) {
        bundler = watchify(bundler);
    }

    function runBundle() {
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
        bundler.on('log', gutil.log);
    }

    return runBundle();
}


function processLessFile(inputFile, outputFile) {
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

function _itsInventory(production) {
    "use strict";
    //processLessFile('./flaskApp/blueprints/its_inventory/static/css/itsMap.less', './flaskApp/blueprints/its_inventory/static/_build/itsMap.css');

    return _bundleIt('./projects/itsMap.js', './build/itsMap.js', production);
}

function _glrtoc(production) {
    "use strict";
    _bundleIt('./projects/glrtoc/legendTest.js', './build/glrtoc/legendTest.js', production);
    
    return  _bundleIt('./projects/glrtoc/main.js', './build/glrtoc/main.js', production);

}


function _tsmo(production) {
    "use strict";
    _bundleIt('./projects/tsmo/legend-test.js', './build/tsmo/legend-test.js', production);
    _bundleIt('./projects/tsmo/slider-test.js', './build/tsmo/slider-test.js', production);
    _bundleIt('./projects/tsmo/main.js', './build/tsmo/main.js', production);

    return _bundleIt('./projects/tsmo/main-report.js', './build/tsmo/main-report.js', production);
}


gulp.task('build-tests', function () {
    "use strict";

    return _bundleIt(null, './test/test-bundle.js');
});

gulp.task('itsInventory', () => {
    return _itsInventory(false);
});

gulp.task('glrtoc', () => {
    "use strict";

    return _glrtoc(false);
});


gulp.task('tsmo', () => {
    "use strict";

    return _tsmo(false);
});

//
// function _npmrds(doMinify) {
//     "use strict";
//
//     return processJsFile('./flaskApp/blueprints/npmrds/static/js/heatmap/main.js', './flaskApp/blueprints/npmrds/static/_build/heatmap-main.js', doMinify);
// }
//
// gulp.task('npmrds-dev', () => {
//     "use strict";
//
//     return _npmrds(false);
// });
//
// gulp.task('npmrds-prod', () => {
//     "use strict";
//
//     return _npmrds(true);
// });


function _ssa(production) {
    "use strict";
    processLessFile('./flaskApp/blueprints/testing/static/css/ssa-corridor.less', './flaskApp/blueprints/testing/static/_build/ssa-corridor.css');

    return _bundleIt('./flaskApp/blueprints/testing/static/js/ssa-main.js', './flaskApp/blueprints/testing/static/_build/ssa-main.js', production);
}

gulp.task('ssa', () => {
    "use strict";

    return _ssa(false);
});


gulp.task('peerGroup', () => {
    "use strict";

    return processJsFile('./flaskApp/blueprints/peerGroup/static/js/main.js', './flaskApp/blueprints/peerGroup/static/_build/main.js', false);
});


function _buildTestApps() {
    "use strict";
    //processJsFile('./flaskApp/blueprints/testing/static/js/test-custom-build.js', './flaskApp/blueprints/testing/static/_build/test-custom-build.js', false);

    return processJsFile('./flaskApp/blueprints/testing/static/js/test-corridor-layer.js', './flaskApp/blueprints/testing/static/_build/test-corridor-layer.js', false);

}

gulp.task('buildTestApps', () => {
    "use strict";

    return _buildTestApps(false);
});


gulp.task('test_test', () => {
    "use strict";

    return _buildTestApps(false);
});

gulp.task('test_build', () => {
    "use strict";

    return processJsFile('./src/test_import.js', './build/test_import.js', false);
});

gulp.task('build-prod', () => {
    _glrtoc(true);
    _tsmo(true);
    _ssa(true);
});
