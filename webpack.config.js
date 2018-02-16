"use strict";

const path = require('path');
const fs = require('fs');

const demosDirectory = path.join(__dirname, 'src/_tests/demos');
const files = fs.readdirSync(demosDirectory);

let entries = {};
for (let f of files) {
    let key = f.replace(/.tsx?$/, '.js');
    entries[key] = path.join(demosDirectory, f);
}

module.exports = {
    devtool: 'source-map',
    entry: entries,
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader'},
            {test: /\.jsx?$/, use: 'source-map-loader'},
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
        'react-redux': 'ReactRedux',
        "jquery-ui": "$"
    },
    output: {
        path: path.join(__dirname, 'test/serve/js'),
        filename: "[name]"
    }
};

