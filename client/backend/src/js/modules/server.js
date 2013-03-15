// Filename: server.js
define([
    'jquery',
    'backbone'
    ], function ($, Backbone) {
	var server = {

		// server config
		url: 'sub2home.dev',
		port: '80',
		root: '/api/backend/',

		// returns the basic server https address
		getAddress: function () {
			return 'https://' + this.url + ':' + this.port + this.root;
		}

	};

	return server;
});