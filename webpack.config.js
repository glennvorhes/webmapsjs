"use strict";
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const testAppDir = path.join(__dirname, 'lib-ts/_test');
const files = fs.readdirSync(testAppDir);
const entries = {};

const exportItems = [];

for (let e of files) {
    if (e.match(/\.js$/) == null) {
        continue;
    }

    entries[e.replace(/.js/, '')] = path.join(testAppDir, e);

    exportItems.push({
        entry: path.join(testAppDir, e),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, 'test-html', 'test_build'),
            filename: e
        }
    });
}

let otherConfig = {
    entry: entries,
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'test-html', 'test_build'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};


// module.exports = exportItems;
module.exports = otherConfig;


//
// var fileArray = [
//     'api/new_file.js',
//     'api/npmrds-request.js'
// ];
//
// for (var i = 0; i < fileArray.length; i++) {
//     fileArray[i] = './' + jsRoot + '/' + fileArray[i];
// }
//
// console.log(fileArray);
//
// /**
//  *
//  * @param {string} entry
//  * @returns {{entry: string, devtool: string, output: {path: string, filename: string}, module: {loaders: *[]}}}
//  */
// function makeConfig(entry) {
//     "use strict";
//
//     var fileName = path.basename(entry);
//     var directoryParts = path.dirname(entry).split('/');
//     directoryParts = directoryParts.splice(directoryParts.indexOf(jsRoot) + 1);
//
//     var directoryPath = './flaskApp/static/js/' + directoryParts.join('/');
//
//     return {
//         entry: entry,
//         devtool: 'source-map',
//         // output: { path: __dirname, filename: 'bundle.js' },
//         output: {path: directoryPath, filename: fileName},
//         module: {
//             loaders: [
//                 {
//                     test: /.jsx?$/,
//                     loader: 'babel-loader',
//                     // include: /webmapsjs/
//                     exclude: /dist/
//                     // ,
//                     // ignore: ['jquery.js'],
//                     // // exclude: /node_modules/,
//                     // query: {
//                     //     // presets: ['es2015', 'react']
//                     //     presets: ['es2015']
//                     // }
//                 }
//             ]
//         },
//     };
// }
//
// var exportArray = [];
//
// for (i = 0; i < fileArray.length; i++){
//     exportArray.push(makeConfig(fileArray[i]))
// }
//
// module.exports = exportArray;
// console.log('here');
//
// module.exports = [{
//     entry: './app_code_js/api/npmrds-request.js',
//     devtool: 'source-map',
//     // output: { path: __dirname, filename: 'bundle.js' },
//     output: {path: '.', filename: 'bundle.js'},
//     module: {
//         loaders: [
//             {
//                 test: /.jsx?$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//                 query: {
//                     // presets: ['es2015', 'react']
//                     presets: ['es2015']
//                 }
//             }
//         ]
//     },
// },
//     {
//         entry: './app_code_js/api/new_file.js',
//         devtool: 'source-map',
//         // output: { path: __dirname, filename: 'bundle.js' },
//         output: {path: '.', filename: 'bundle2.js'},
//         module: {
//             loaders: [
//                 {
//                     test: /.jsx?$/,
//                     loader: 'babel-loader',
//                     exclude: /node_modules/,
//                     query: {
//                         // presets: ['es2015', 'react']
//                         presets: ['es2015']
//                     }
//                 }
//             ]
//         },
//     }];