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
    entry: entries,
    devtool: 'source-map',
    output: {
        path: outDir,
        filename: "[name].js"
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
        "react-dom": "ReactDOM",
        "jquery-ui": true
    }
};
