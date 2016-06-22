"use strict";
const gulp = require('gulp');
const gulpHelpers = require('./lib/gulp-helpers');


// function _itsInventory(production) {
//     "use strict";
//     //processLessFile('./flaskApp/blueprints/its_inventory/static/css/itsMap.less', './flaskApp/blueprints/its_inventory/static/_build/itsMap.css');
//
//     return gulpHelpers.bundleEs2015Multiple([['./projects/itsMap.js', './build/itsMap.js']], production);
// }

// function _glrtoc(production) {
//     "use strict";
//
//     let filesArr = [
//         ['./projects/glrtoc/legendTest.js', './build/glrtoc/legendTest.js'],
//         ['./projects/glrtoc/main.js', './build/glrtoc/main.js']
//     ];
//
//     return gulpHelpers.bundleEs2015Multiple(filesArr, production);
// }
//
//
// function _tsmo(production) {
//     "use strict";
//     let filesArr = [
//         ['./projects/tsmo/legend-test.js', './build/tsmo/legend-test.js'],
//         ['./projects/tsmo/slider-test.js', './build/tsmo/slider-test.js'],
//         ['./projects/tsmo/main.js', './build/tsmo/main.js'],
//         ['./projects/tsmo/main-report.js', './build/tsmo/main-report.js']
//     ];
//
//     return gulpHelpers.bundleEs2015Multiple(filesArr, production);
// }
//
//
// function _npmrds(doMinify) {
//     "use strict";
//
//     return processJsFile('./flaskApp/blueprints/npmrds/static/js/heatmap/main.js', './flaskApp/blueprints/npmrds/static/_build/heatmap-main.js', doMinify);
// }



/**
 *
 * @param {string} inputFile - file name relative to app_code_js
 * @returns {Array<string>} - input and output file in 2 element array
 * @private
 */
function _makeInputOutput(inputFile) {
    "use strict";
    var inFile = './test/' + inputFile;
    var outFile = './test-build/' + inputFile;

    return [inFile, outFile];
}

gulp.task('build-tests', function () {
    "use strict";
    
        let filesArr = [
            _makeInputOutput('legend-test.js'),
            _makeInputOutput('jquery-test.js'),
            _makeInputOutput('compare-test.js'),
            _makeInputOutput('export-test.js'),
            _makeInputOutput('slider-test.js')
    ];

    gulpHelpers.bundleEs2015Multiple(filesArr, false);
    
    return gulpHelpers.bundleEs2015('./test/**/*.js', './test-build/test-bundle.js');
});
//
// gulp.task('itsInventory', () => {
//     return _itsInventory(false);
// });
//
// gulp.task('glrtoc', () => {
//     "use strict";
//
//     return _glrtoc(false);
// });
//
//
// gulp.task('tsmo', () => {
//     "use strict";
//
//     return _tsmo(false);
// });
//
// function _ssa(production) {
//     "use strict";
//     gulpHelpers.processLessFile('./flaskApp/blueprints/testing/static/css/ssa-corridor.less', './flaskApp/blueprints/testing/static/_build/ssa-corridor.css');
//
//     return gulpHelpers.bundleEs2015('./flaskApp/blueprints/testing/static/js/ssa-main.js', './flaskApp/blueprints/testing/static/_build/ssa-main.js', production);
// }
//
// gulp.task('ssa', () => {
//     "use strict";
//
//     return _ssa(false);
// });
//
//
// gulp.task('peerGroup', () => {
//     "use strict";
//
//     return processJsFile('./flaskApp/blueprints/peerGroup/static/js/main.js', './flaskApp/blueprints/peerGroup/static/_build/main.js', false);
// });
//
//
// function _buildTestApps() {
//     "use strict";
//     //processJsFile('./flaskApp/blueprints/testing/static/js/test-custom-build.js', './flaskApp/blueprints/testing/static/_build/test-custom-build.js', false);
//
//     return processJsFile('./flaskApp/blueprints/testing/static/js/test-corridor-layer.js', './flaskApp/blueprints/testing/static/_build/test-corridor-layer.js', false);
//
// }
//
// gulp.task('buildTestApps', () => {
//     "use strict";
//
//     return _buildTestApps(false);
// });
//
//
// gulp.task('test_test', () => {
//     "use strict";
//
//     return _buildTestApps(false);
// });
//
// gulp.task('test_build', () => {
//     "use strict";
//
//     return processJsFile('./src/test_import.js', './build/test_import.js', false);
// });
//
// gulp.task('build-prod', () => {
//     _glrtoc(true);
//     _tsmo(true);
//     _ssa(true);
// });
