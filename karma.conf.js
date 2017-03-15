// Karma configuration
// Generated on Wed Mar 08 2017 14:44:59 GMT-0600 (Central Standard Time)


module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            {pattern: 'node_modules/jquery/dist/jquery.min.js', watched: false},
            {pattern: 'node_modules/custom-ol/lib/index.js', watched: false},
            {pattern: "test/specs/**/*.ts" }, // *.tsx for React Jsx
            {pattern: "src/**/*.ts" }, // *.tsx for React Jsx
        ],
        preprocessors: {
            "test/specs/**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
            "src/**/*.ts": ["karma-typescript", 'coverage'], // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};
