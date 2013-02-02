// Filename: src/js/config.js
require.config({

	paths: {
		// requirejs plugins
		async: 'lib/require/async',
		text: 'lib/require/text',
		// libs
		jquery: 'lib/jquery/jquery',
		jqueryEasing: 'lib/jquery/jquery.easing',
		jqueryUnveil: 'lib/jquery/jquery.unveil',
		jqueryEventSpecialDestroyed: 'lib/jquery/jquery.event.special.destroyed',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		backboneLocalStorage: 'lib/backbone/backbone.localStorage',
		gmaps: 'lib/google/gmaps',
		// templates
		templates: '../templates',
		// module alias
		notificationcenter: 'modules/notificationcenter',
		router: 'modules/router',
		server: 'modules/server',
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