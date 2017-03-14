"use strict";

const path = require('path');
const fs = require('fs');
let config = require('./webpack.base');

const demosDirectory = path.join(__dirname, 'test/demo');
const files = fs.readdirSync(demosDirectory);

let entries = {};
for (let f of files){
    let key = f.replace(/.tsx?$/, '.js');
    entries[key] = path.join(demosDirectory, f);
}

config.entry = entries;

config.output = {
    path: path.join(__dirname, 'test/serve/js'),
    filename: "[name]"
};

module.exports = config;
