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
    config = {
      dist: '../dist',
      src: '../src',
    };

  grunt.initConfig({

    config: config,
    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/coffee',
          src: '{,*/}*.coffee',
          dest: '<%= config.src %>/js',
          ext: '.js'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/js/main.js',
        '<%= config.src %>/js/config.js',
        '<%= config.src %>/js/modules/*.js',
        '<%= config.src %>/js/models/*.js',
        '<%= config.src %>/js/collections/*.js',
        '<%= config.src %>/js/views/**/*.js',
        'test/spec/**/*.js'
        ]
    },
    requirejs: {
      dist: {
        options: {
          optimize: 'uglify',
          baseUrl: '<%= config.src %>/js',
          mainConfigFile: '<%= config.src %>/js/config.js',
          preserveLicenseComments: false,
          include: backboneModules,
          out: '<%= config.dist %>/js/main.js'
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/js/main.js',
            '<%= config.dist %>/css/frontend.css',
          ]
        }
      }
    },
    usemin: {
      html: ['<%= config.dist %>/index.html'],
      options: {
        dirs: ['<%= config.dist %>']
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
        },
        files: [{
          '<%= config.dist %>/index.html': '<%= config.dist %>/index.html'
        }]
      }
    },
    clean: {
      dist: '<%= config.dist %>',
      options: {
        force: true
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dist %>',
          src: [
            'index.html',
            'favicon.ico',
            'js/vendor/requirejs/require.js',
            'mobile/*',
            'browser/*',
          ]
        }]
      }
    },
    less: {
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          '<%= config.dist %>/css/frontend.css': '<%= config.src %>/less/frontend/frontend.less'
        }
      }
    }
  });

  grunt.registerTask('test', [
    'jshint'
    ]);

  grunt.registerTask('build', [
    'coffee',
    'test',
    'clean:dist',
    'copy:dist',
    'requirejs:dist',
    'less:dist',
    'rev:dist',
    'usemin',
    'htmlmin',
    ]);

  grunt.registerTask('default', [
    'build'
    ]);

};