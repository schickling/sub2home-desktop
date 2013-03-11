// Filename: src/js/config.js
require.config({

	paths: {
		// vendor
		text: 'vendor/requirejs-text/text',
		jquery: 'vendor/jquery/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		moment: 'vendor/moment/moment',
		// templates
		templates: '../templates',
		// modules
		router: 'modules/router',
		server: 'modules/server'
	},

	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		underscore: {
			exports: '_'
		}
	}

});