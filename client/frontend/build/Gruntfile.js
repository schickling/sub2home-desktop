module.exports = function (grunt) {

	// backbone modules
	var modules = [{
		name: 'main',
		include: [
			'text',
			'backboneLocalStorage',
			'views/PageView',
			'router',
			'notificationcenter',
			'models/stateModel'
			]
	}, {
		name: 'views/header/HeaderView',
		exclude: [
			'jquery',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter'
			]
	}, {
		name: 'views/home/MainView',
		exclude: [
			'jquery',
			'jqueryEasing',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter',
			'views/PageView'
			]
	}, {
		name: 'views/store/home/MainView',
		exclude: [
			'jquery',
			'jqueryEasing',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter',
			'views/PageView'
			]
	}, {
		name: 'views/store/config/MainView',
		exclude: [
			'jquery',
			'jqueryEasing',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter',
			'views/PageView'
			]
	}, {
		name: 'views/store/selection/MainView',
		exclude: [
			'jquery',
			'jqueryEasing',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter',
			'views/PageView'
			]
	}, {
		name: 'views/store/tray/MainView',
		exclude: [
			'jquery',
			'jqueryEasing',
			'underscore',
			'backbone',
			'backboneLocalStorage',
			'text',
			'models/stateModel',
			'notificationcenter',
			'views/PageView'
			]
	}];

	// config
	grunt.initConfig({

		lint: {
			all: [
				'grunt.js',
				'../src/js/app.js',
				'../src/js/models/stateModel.js',
				'../src/js/router.js',
				'../src/js/notificationcenter.js',
				'../src/js/main.js',
				'../src/js/config.js',
				'../src/js/views/**/*.js',
				'../src/js/models/**/*.js',
				'../src/js/collections/**/*.js',
				'test/spec/**/*.js'
				]
		},

		// kick off jasmine, showing results at the cli
		// jasmine: {
		// 	all: ['../test/runner.html']
		// },

		requirejs: {
			development: {
				optimize: 'none',
				baseUrl: '../src/js',
				dir: '../../../server/public/js',
				mainConfigFile: '../src/js/config.js',
				removeCombined: true,
				preserveLicenseComments: false,
				modules: modules
			},
			production: {
				optimize: 'uglify',
				baseUrl: '../src/js',
				dir: '../../../server/public/js',
				mainConfigFile: '../src/js/config.js',
				removeCombined: true,
				preserveLicenseComments: false,
				modules: modules
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

	// register tasks
	grunt.registerTask('default', 'test');
	grunt.registerTask('reset', 'exec:resetServer');
	grunt.registerTask('clean', 'exec:cleanServer');
	grunt.registerTask('dev', 'reset exec:linkSrcJS exec:linkSrcTemplates');
	grunt.registerTask('test', 'lint jasmine');
	grunt.registerTask('build-dev', 'reset test requirejs:development less:development clean');
	grunt.registerTask('build-prod', 'reset test requirejs:production less:production clean');

};