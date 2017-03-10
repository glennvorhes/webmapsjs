"use strict";
const path = require('path');
const fs = require('fs');

// const testAppDir = path.join(__dirname, 'dist/_test');
// const outDir = path.join(__dirname, 'test-html/js');
//
// const files = fs.readdirSync(testAppDir);
// const entries = {};
//
// for (var i = 0; i < files.length; i++) {
//     var e = files[i];
//     if (e.match(/\.js$/) == null) {
//         continue;
//     }
//     entries[e.replace(/.js/, '')] = path.join(testAppDir, e);
// }


function getFiles() {
    /**
     * Created by glenn on 3/8/2017.
     */
    var walkSync = function (dir, filelist) {
        var files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function (file) {
            var maybeDirectory = dir + '/' + file;

            if (fs.statSync(maybeDirectory).isDirectory() && !maybeDirectory.match(/\/build|node_modules|data/)) {
                filelist = walkSync(dir + '/' + file, filelist);
            }
            else {
                if (file.match(/\.js$/) && !file.match(/^webpack/)) {
                    filelist.push(dir + '/' + file);
                }

            }
        });
        return filelist;
    };

    var js_files = walkSync('.');

    var outVal = {};

    for (let f of js_files) {
        var key = f.replace(/^\.\//, '');
        outVal[key] = f;

    }

    return outVal;
}

module.exports = {
    entry: getFiles(),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name]"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    externals: {
        "jquery": "$",
        "custom-ol": "ol",
        "react": "React",
        "react-dom": "ReactDOM"
    }
};


console.log(getFiles());