
module.exports = {
    devtool: 'source-map',
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
