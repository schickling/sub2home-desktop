// Filename: src/js/modules/server.js
define([
    'jquery'
    ], function ($) {

	var Server = {

		storeAlias: '',

		initialize: function () {
			var self = this;
			$.ajaxSetup({
				beforeSend: function (xhr, settings) {
					settings.url = self.getComposedUrl(settings.url);
				}
			});
		},

		getComposedUrl: function (url) {

			if (url.substring(0, 3) == "http") {
				return url;
			}

			url = url.replace('storeAlias', this.storeAlias);

			url = '/api/frontend/' + url;

			console.log(url);

			return url;
		},

		setStoreAlias: function (storeAlias) {
			this.storeAlias = storeAlias;
		}

	};

	Server.initialize();

	return Server;

});