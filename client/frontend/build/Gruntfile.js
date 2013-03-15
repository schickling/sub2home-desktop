module.exports = function (grunt) {

	var include = [
		'main',
		'models/clientModel',
        'views/header/HeaderView',
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
    ];

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
					mainConfigFile: '../src/js/config.js',
					preserveLicenseComments: false,
					include: include,
					out: '../../../server/public/js/main.js'
				}
			},
			production: {
				options: {
					optimize: 'uglify',
					baseUrl: '../src/js',
					mainConfigFile: '../src/js/config.js',
					preserveLicenseComments: false,
					include: include,
					out: '../../../server/public/js/main.js'
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
			createRequireJsDir: {
				command: 'mkdir -p $(pwd)/../../../server/public/js/vendor/requirejs'
			},
			copyRequireJs: {
				command: 'cp $(pwd)/../src/js/vendor/requirejs/require.js $(pwd)/../../../server/public/js/vendor/requirejs/'
			}
		},

		less: {
			development: {
				files: {
					'../../../server/public/css/frontend.css': '../src/less/frontend/frontend.less'
				}
			},
			production: {
				options: {
					yuicompress: true
				},
				files: {
					'../../../server/public/css/frontend.css': '../src/less/frontend/frontend.less'
				}
			}
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
	grunt.registerTask('prepareRequireJs', ['exec:createRequireJsDir', 'exec:copyRequireJs']);
	grunt.registerTask('dev', ['reset', 'exec:linkSrcJS', 'exec:linkSrcTemplates']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build:dev', ['reset', 'test', 'requirejs:development', 'less:development', 'prepareRequireJs']);
	grunt.registerTask('build:prod', ['reset', 'test', 'requirejs:production', 'less:production', 'prepareRequireJs']);

};