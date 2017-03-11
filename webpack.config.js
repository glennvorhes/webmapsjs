"use strict";
let config = require('./webpack.base');

const path = require('path');
const fs = require('fs');
const demosDirectory = path.join(__dirname, 'test/demo');
const files = fs.readdirSync(demosDirectory);

let entries = {};
for (let f of files){
    let key = f.replace(/.ts$/, '.js').replace('.tsx$', '.jsx');
    entries[key] = path.join(demosDirectory, f);
}

config.entry = entries;

config.output = {
    path: path.join(__dirname, 'test/serve/js'),
    filename: "[name]"
};

console.log(config);

module.exports = config;
