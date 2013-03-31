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
		jqueryOverscroll: 'vendor/jquery-overscroll/jquery.overscroll',
		jqueryBrowserSelector: 'vendor/jquery-browser-selector/jquery.browser.selector',
		underscore: 'vendor/underscore-amd/underscore',
		backbone: 'vendor/backbone-amd/backbone',
		backboneLocalStorage: 'vendor/backbone.localStorage/backbone.localStorage',
		backboneAnalytics: 'vendor/backbone.analytics/backbone.analytics',
		moment: 'vendor/moment/moment',
		// templates
		templates: '../templates',
		// module alias
		notificationRepository: 'modules/notificationRepository',
		tooltipRepository: 'modules/tooltipRepository',
		notificationcenter: 'modules/notificationcenter',
		gmaps: 'modules/gmaps',
		router: 'modules/router',
		global: 'modules/global'
	}

});