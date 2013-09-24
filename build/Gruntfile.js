"use strict";

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var backboneModules = [
    'main',
    'models/clientModel',
    'views/header/HeaderView',
    'views/header/ClientView',
    'views/home/home/MainView',
    'views/home/info/MainView',
    'views/home/404/MainView',
    'views/client/login/MainView',
    'views/client/dashboard/MainView',
    'views/client/config/MainView',
    'views/store/home/MainView',
    'views/store/info/MainView',
    'views/store/selection/MainView',
    'views/store/tray/MainView',
    'views/store/checkout/MainView',
    'views/store/dashboard/MainView',
    'views/store/assortment/MainView',
    'views/store/config/MainView'
    ],
    options = {
      dist: '../dist/'
    };

  // config
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '../src/js/main.js',
        '../src/js/config.js',
        '../src/js/modules/*.js',
        '../src/js/models/*.js',
        '../src/js/collections/*.js',
        '../src/js/views/**/*.js',
        'test/spec/**/*.js'
        ]
    },

    requirejs: {
      development: {
        options: {
          optimize: 'none',
          baseUrl: '../src/js',
          mainConfigFile: '../src/js/config.js',
          preserveLicenseComments: false,
          include: backboneModules,
          out: options.dist + 'js/main.js'
        }
      },
      production: {
        options: {
          optimize: 'uglify', // minify output with uglify & closure-compiler, checking which version is the smallest
          baseUrl: '../src/js',
          mainConfigFile: '../src/js/config.js',
          preserveLicenseComments: false,
          include: backboneModules,
          out: options.dist + 'js/main.js'
        }
      }
    },

    exec: {
      linkSrcJS: {
        command: 'ln -s $(pwd)/../src/js/ $(pwd)/' + options.dist + 'js'
      },
      linkSrcTemplates: {
        command: 'ln -s $(pwd)/../src/templates/ $(pwd)/' + options.dist + 'public/templates'
      },
      createRequireJsDir: {
        command: 'mkdir -p $(pwd)/' + options.dist + 'js/vendor/requirejs'
      },
      copyRequireJs: {
        command: 'cp $(pwd)/../src/js/vendor/requirejs/require.js $(pwd)/' + options.dist + 'js/vendor/requirejs/'
      },
      copyIndexHtml: {
        command: 'cp $(pwd)/../src/index.html $(pwd)/' + options.dist + 'index.html'
      },
      copyFavicon: {
        command: 'cp $(pwd)/../src/favicon.ico $(pwd)/' + options.dist + 'favicon.ico'
      },
      copyBrowserFolder: {
        command: 'cp -r $(pwd)/../src/browser $(pwd)/' + options.dist + 'browser'
      },
      copyMobileFolder: {
        command: 'cp -r $(pwd)/../src/mobile $(pwd)/' + options.dist + 'mobile'
      },
      copyHtaccess: {
        command: 'cp $(pwd)/../src/.htaccess $(pwd)/' + options.dist + '.htaccess'
      },
      makeDistFolder: {
        command: 'mkdir -p $(pwd)/' + options.dist
      }
    },

    less: {
      development: {
        files: {
          '../dist/css/frontend.css': '../src/less/frontend/frontend.less'
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          '../dist/css/frontend.css': '../src/less/frontend/frontend.less'
        }
      }
    }

  });

  // register tasks
  grunt.registerTask('prepareRequireJs', [
    'exec:makeDistFolder',
    'exec:copyHtaccess',
    'exec:copyIndexHtml',
    'exec:copyFavicon',
    'exec:copyBrowserFolder',
    'exec:copyMobileFolder',
    'exec:createRequireJsDir',
    'exec:copyRequireJs'
    ]);

  grunt.registerTask('dev', [
    'exec:linkSrcJS',
    'exec:linkSrcTemplates'
    ]);

  grunt.registerTask('test', [
    'jshint'
    ]);

  grunt.registerTask('build:dev', [
    'test',
    'requirejs:development',
    'less:development',
    'prepareRequireJs'
    ]);

  grunt.registerTask('build:prod', [
    'test',
    'prepareRequireJs',
    'requirejs:production',
    'less:production'
    ]);

  grunt.registerTask('default', [
    'build:prod'
    ]);

};