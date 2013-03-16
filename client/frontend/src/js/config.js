// Filename: src/js/config.js
require.config({

	paths: {
		// vendor
		async: 'vendor/requirejs-plugins/src/async',
		text: 'vendor/requirejs-text/text',
		jquery: 'vendor/jquery/jquery',
		jqueryRotate: 'vendor/jquery-rotate/jquery.rotate',
		jqueryEasing: 'vendor/jquery-easing/jquery.easing',
		jqueryColor: 'vendor/jquery-color/jquery.color',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		backboneLocalStorage: 'vendor/backbone.localStorage/backbone.localStorage',
		moment: 'vendor/moment/moment',
		// templates
		templates: '../templates',
		// module alias
		notificationRepository: 'modules/notificationRepository',
		tooltipRepository: 'modules/tooltipRepository',
		notificationcenter: 'modules/notificationcenter',
		analytics: 'modules/analytics',
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