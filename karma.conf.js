// Karma configuration
// Generated on Wed Sep 25 2013 12:01:18 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    preprocessors: {
      '*/.html': []
    },

    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test/main-test.js', {
        pattern: 'app/templates/**/*.html',
        included: false
      }, {
        pattern: 'app/components/**/*.js',
        included: false
      }, {
        pattern: 'app/js/**/*.js',
        included: false
      }, {
        pattern: 'test/.tmp/spec/**/*.js',
        included: false
      },
    ],


    // list of files to exclude
    exclude: [
      'app/js/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
