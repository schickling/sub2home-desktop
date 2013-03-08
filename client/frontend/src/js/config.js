// Filename: src/js/config.js
require.config({

	paths: {
		// vendor
		async: 'vendor/requirejs-plugins/src/async',
		text: 'vendor/requirejs-text/text',
		jquery: 'vendor/jquery/jquery',
		jqueryEasing: 'vendor/jquery-easing/jquery.easing',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		backboneLocalStorage: 'vendor/backbone.localStorage/backbone.localStorage',
		moment: 'vendor/moment/moment',
		// templates
		templates: '../templates',
		// module alias
		notificationcenter: 'modules/notificationcenter',
		gmaps: 'modules/gmaps',
		router: 'modules/router',
		global: 'modules/global'
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