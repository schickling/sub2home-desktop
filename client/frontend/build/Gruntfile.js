module.exports = function (grunt) {

	var globalModulDependencies = [
        'text', // vendor
        'async',
        'jquery',
        'jqueryEasing',
        'moment',
        'underscore',
        'backbone',
        'backboneLocalStorage',
        'router', // modules
        'global',
        'tooltipRepository',
        'notificationRepository',
        'notificationcenter',
        'models/authentificationModel', // models
        'models/stateModel',
        'views/PageView' // views
    ];

	// backbone modules
	var modules = [{
		name: 'main',
		include: globalModulDependencies
	}, {
		name: 'views/header/HeaderView',
		exclude: globalModulDependencies
	}, {
		name: 'views/home/home/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/client/login/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/client/dashboard/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/client/config/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/home/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/config/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/selection/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/checkout/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/assortment/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/dashboard/MainView',
		exclude: globalModulDependencies
	}, {
		name: 'views/store/tray/MainView',
		exclude: globalModulDependencies
	}];

	// config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
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

		// kick off jasmine, showing results at the cli
		jasmine: {
			all: ['../test/runner.html']
		},

		requirejs: {
			development: {
				options: {
					optimize: 'none',
					baseUrl: '../src/js',
					dir: '../../../server/public/js',
					mainConfigFile: '../src/js/config.js',
					removeCombined: true,
					preserveLicenseComments: false,
					modules: modules
				}
			},
			production: {
				options: {
					optimize: 'uglify',
					baseUrl: '../src/js',
					dir: '../../../server/public/js',
					mainConfigFile: '../src/js/config.js',
					removeCombined: true,
					preserveLicenseComments: false,
					modules: modules
				}
			}
		},

		exec: {
			linkSrcJS: {
				command: 'ln -s $(pwd)/../src/js/ $(pwd)/../../../server/public/js'
			},
			linkSrcTemplates: {
				command: 'ln -s $(pwd)/../src/templates/ $(pwd)/../../../server/public/templates'
			},
			resetServer: {
				command: 'rm -Rf $(pwd)/../../../server/public/templates $(pwd)/../../../server/public/js'
			},
			cleanServer: {
				command: 'rm -Rf $(pwd)/../../../server/public/js/templates'
			}
		},

		less: {
			development: {
				files: {
					'../../../server/public/css/frontend.css': '../src/less/frontend/frontend.less',
					'../../../server/public/css/backend.css': '../src/less/backend/backend.less'
				}
			},
			production: {
				options: {
					yuicompress: true
				},
				files: {
					'../../../server/public/css/frontend.css': '../src/less/frontend/frontend.less',
					'../../../server/public/css/backend.css': '../src/less/backend/backend.less'
				}
			}
		},

		clean: {
			folder: '../../../server/public/templates'
		}

	});

	// load tasks
	// grunt.loadNpmTasks('grunt-jasmine-task');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// register tasks
	grunt.registerTask('default', ['test']);
	grunt.registerTask('reset', ['exec:resetServer']);
	grunt.registerTask('clean', ['exec:cleanServer']);
	grunt.registerTask('dev', ['reset', 'exec:linkSrcJS', 'exec:linkSrcTemplates']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build:dev', ['reset', 'test', 'requirejs:development', 'less:development', 'clean']);
	grunt.registerTask('build:prod', ['reset', 'test', 'requirejs:production', 'less:production', 'clean']);

};