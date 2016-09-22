"use strict";
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const testAppDir = path.join(__dirname, 'dist/_test');
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
    }
};
