"use strict";

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

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    config: config,
    coffee: {
      src: {
        files: [{
          expand: true,
          bare: true,
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
      src: {
        files: {
          '<%= config.src %>/css/frontend.css': '<%= config.src %>/less/frontend/frontend.less'
        }
      },
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          '<%= config.dist %>/css/frontend.css': '<%= config.src %>/less/frontend/frontend.less'
        }
      }
    },
    watch: {
      coffee: {
        files: ['<%= config.src %>/coffee/{,*/}*.coffee'],
        tasks: ['coffee:src'],
      },
      // js: {
      //   files: ['<%= config.src %>/js/{,*/}*.js'],
      //   tasks: ['jshint'],
      // },
      less: {
        files: ['<%= config.src %>/less/**/*.less'],
        tasks: ['less:src'],
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= config.src %>/js/**/*.js',
          '<%= config.src %>/templates/**/*.html',
          '<%= config.src %>/css/*.css',
        ]
      }
    },
  });

  grunt.registerTask('server', [
    'watch',
    ]);

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