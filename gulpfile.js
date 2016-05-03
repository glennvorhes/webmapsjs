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


/**
 *
 * @param {string} inputFile - input file
 * @param {string} outputFile - output file
 * @param {boolean|*} runMinify - if should minify
 * @returns {object} return stream
 */
function processJsFile(inputFile, outputFile, runMinify) {
    "use strict";
    runMinify = typeof runMinify == 'boolean' ? runMinify : false;
    let pathParts = outputFile.split('/');
    let outFileName = pathParts[pathParts.length - 1];
    pathParts.splice(pathParts.length - 1, 1);
    let outDir = pathParts.length === 0 ? '.' : pathParts.join('/');

    let bundler = browserify({entries: inputFile, "debug": true, "extensions": ["js"]});

    bundler.transform(babelify.configure({
        presets: ["es2015"],
        "ignore": /custom-ol-build|jquery.min/
    }));


    //bundler.transform(babelify.configure({
    //    ignore: /custom-ol-build|jquery.min/
    //}));
    //let bundler = browserify({entries: inputFile, extensions: ['.js'], debug: true})
    //    .transform(babelify.configure({
    //        ignore: /custom-ol-build.js|jquery.min|/,
    //        presets: ["es2015"],
    //        extensions: [".ts", ".js"]
    //    }));


    //bundler.transform("babelify", {presets: ["es2015"], ignore: /custom-ol-build.js|jquery.min|/}, extensions: ['.js', '.ts']);


    if (runMinify) {
        return bundler.bundle()
            .on('error', function (err) {
                console.error(err);
            })
            .pipe(source(outFileName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(minify({
                ext: {
                    src: '-debug.js',
                    min: '.js'
                },
                exclude: ['tasks'],
                ignoreFiles: ['.combo.js', '-min.js']
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outDir));
    } else {
        return bundler.bundle()
            .on('error', function (err) {
                console.error(err);
            })
            .pipe(source(outFileName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(outDir));
    }
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

//gulp.task('default', function () {
//    "use strict";
//    return gulp.src('src/app.js')
//        .pipe(babel())
//        .pipe(gulp.dest('dist'))
//});

function _itsInventory(doMinify) {
    "use strict";
    //processLessFile('./flaskApp/blueprints/its_inventory/static/css/itsMap.less', './flaskApp/blueprints/its_inventory/static/_build/itsMap.css');

    return processJsFile('./projects/itsMap.js', './build/itsMap.js', doMinify);
}

gulp.task('itsInventory-dev', () => {
    return _itsInventory(false);
});

gulp.task('itsInventory-prod', () => {
    return _itsInventory(true);
});

function _glrtoc(doMinify) {
    "use strict";
    processJsFile('./projects/glrtoc/main.js', './build/glrtoc/main.js', doMinify);

    return processJsFile('./projects/glrtoc/legendTest.js', './build/glrtoc/legendTest.js', doMinify);
}

gulp.task('glrtoc-dev', () => {
    "use strict";

    return _glrtoc(false);
});

gulp.task('glrtoc-prod', () => {
    "use strict";

    return _glrtoc(true);
});

function _tsmo(doMinify) {
    "use strict";
    processJsFile('./projects/tsmo/legend-test.js', './build/legend-test.js', doMinify);
    //processJsFile('./projects/tsmo/slider-test.js', './build/slider-test.js', doMinify);
    //processJsFile('./projects/tsmo/main.js', './build/main.js', doMinify);
    //return processJsFile('./projects/tsmo/main-report.js', './build/main-report.js', doMinify);
}

gulp.task('tsmo-dev', () => {
    "use strict";

    return _tsmo(false);
});

gulp.task('tsmo-prod', () => {
    "use strict";

    return _tsmo(true);
});

function _npmrds(doMinify) {
    "use strict";

    return processJsFile('./flaskApp/blueprints/npmrds/static/js/heatmap/main.js', './flaskApp/blueprints/npmrds/static/_build/heatmap-main.js', doMinify);
}

gulp.task('npmrds-dev', () => {
    "use strict";

    return _npmrds(false);
});

gulp.task('npmrds-prod', () => {
    "use strict";

    return _npmrds(true);
});

function _ssa(doMinify) {
    "use strict";
    processLessFile('./flaskApp/blueprints/testing/static/css/ssa-corridor.less', './flaskApp/blueprints/testing/static/_build/ssa-corridor.css');

    return processJsFile('./flaskApp/blueprints/testing/static/js/ssa-main.js', './flaskApp/blueprints/testing/static/_build/ssa-main.js', doMinify);
}

gulp.task('ssa-dev', () => {
    "use strict";

    return _ssa(false);
});

gulp.task('ssa-prod', () => {
    "use strict";

    return _ssa(true);
});

gulp.task('peerGroup-dev', () => {
    "use strict";

    return processJsFile('./flaskApp/blueprints/peerGroup/static/js/main.js', './flaskApp/blueprints/peerGroup/static/_build/main.js', false);
});

gulp.task('peerGroup-prod', () => {
    "use strict";

    return processJsFile('./flaskApp/blueprints/peerGroup/static/js/main.js', './flaskApp/blueprints/peerGroup/static/_build/main.js', true);
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

gulp.task('build-prod', ['glrtoc-prod', 'tsmo-prod', 'npmrds-prod', 'ssa-prod', 'itsInventory-prod', 'peerGroup-prod']);
