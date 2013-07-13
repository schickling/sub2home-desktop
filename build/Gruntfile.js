module.exports = function (grunt) {

	var include = [
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
    ];

	var distFolder = '../dist/';

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
            ],
			options: {
				// options here to override JSHint defaults
				globals: {
					window: true,
					console: true,
					module: true,
					document: true,
					require: true
				},
				browser: true
			}
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
					out: distFolder + 'js/main.js'
				}
			},
			production: {
				options: {
					optimize: 'hybrid', // minify output with uglify & closure-compiler, checking which version is the smallest
					baseUrl: '../src/js',
					mainConfigFile: '../src/js/config.js',
					preserveLicenseComments: false,
					include: include,
					out: distFolder + 'js/main.js'
				}
			}
		},

		exec: {
			linkSrcJS: {
				command: 'ln -s $(pwd)/../src/js/ $(pwd)/' + distFolder + 'js'
			},
			linkSrcTemplates: {
				command: 'ln -s $(pwd)/../src/templates/ $(pwd)/' + distFolder + 'public/templates'
			},
			createRequireJsDir: {
				command: 'mkdir -p $(pwd)/' + distFolder + 'js/vendor/requirejs'
			},
			copyRequireJs: {
				command: 'cp $(pwd)/../src/js/vendor/requirejs/require.js $(pwd)/' + distFolder + 'js/vendor/requirejs/'
			},
			copyIndexHtml: {
				command: 'cp $(pwd)/../src/index.html $(pwd)/' + distFolder + 'index.html'
			},
			copyBrowserFolder: {
				command: 'cp -r $(pwd)/../src/browser $(pwd)/' + distFolder + 'browser'
			},
			copyMobileFolder: {
				command: 'cp -r $(pwd)/../src/mobile $(pwd)/' + distFolder + 'mobile'
			},
			copyHtaccess: {
				command: 'cp $(pwd)/../src/.htaccess $(pwd)/' + distFolder + '.htaccess'
			},
			makeDistFolder: {
				command: 'mkdir -p $(pwd)/' + distFolder
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

	// load tasks
	// grunt.loadNpmTasks('grunt-jasmine-task');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// register tasks
	grunt.registerTask('prepareRequireJs', [
		'exec:makeDistFolder',
		'exec:copyHtaccess',
		'exec:copyIndexHtml',
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

};