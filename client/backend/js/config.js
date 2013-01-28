// Filename: src/js/config.js
require.config({

	paths: {
		// requirejs plugins
		text: 'lib/require/text',
		// libs
		jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		// templates
		templates: '../templates'
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