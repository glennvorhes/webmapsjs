"use strict";
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const testAppDir = path.join(__dirname, 'dist/_test');
const outDir = path.join(__dirname, 'test/test_build');

const files = fs.readdirSync(testAppDir);
const entries = {};

for (let e of files) {
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
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
