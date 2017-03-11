"use strict";
const path = require('path');
const fs = require('fs');

const testAppDir = path.join(__dirname, 'dist/_test');
const outDir = path.join(__dirname, 'test-html/js');

const files = fs.readdirSync(testAppDir);
const entries = {};

for (var i = 0; i < files.length; i++) {
    var e = files[i];
    if (e.match(/\.js$/) == null) {
        continue;
    }
    entries[e.replace(/.js/, '')] = path.join(testAppDir, e);
}

module.exports = {
    // entry: entries,
    output: {
        path: outDir,
        filename: "[name].js"
    },
    devtool: 'source-map',
    watch: true,
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", '.jsx']
    },
    externals: {
        "jquery": "$",
        "custom-ol": "ol",
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery-ui": true
    }
};
