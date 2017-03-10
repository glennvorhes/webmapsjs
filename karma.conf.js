// Karma configuration
// Generated on Wed Mar 08 2017 14:44:59 GMT-0600 (Central Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'node_modules/jquery/dist/jquery.min.js', watched: false},
            {pattern: 'node_modules/custom-ol/lib/index.js', watched: false},
            {pattern: 'spec/**/*.ts', watched: false},
            // {pattern: 'spec/**/*.js.map', watched: false},

            // 'spec/build/**/*.js',
            // {
            //     pattern: 'spec/build/**/*.js.map',
            //     included: false
            // },
            // {
            //     pattern: 'dist/**/*.js',
            //     included: false
            // },
            // 'spec/**/*.ts',
            // 'src/**/*.ts'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec/**/*.ts': ["karma-typescript", 'webpack', 'sourcemap'],
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            // debug: true,
            // devtool: 'source-map',
            // module: {
            //     loaders: [
            //         {test: /\.js$/, loader: "source-map-loader"}
            //     ]
            // },
            externals: {
                "jquery": "$",
                "custom-ol": "ol",
                "react": "React",
                "react-dom": "ReactDOM"
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', "karma-typescript"],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        autoWatchBatchDelay: 100,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'PhantomJS'],
        browsers: ['Chrome'],
        // browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    })
};
