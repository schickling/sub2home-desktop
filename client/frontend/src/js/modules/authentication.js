// Filename: src/js/modules/authentication.js
define([
	'jquery'
	], function ($) {

	var authentication = {

		_hasValidToken: function () {
			return true;
		},

		_setupAjax: function () {
			$.ajaxSetup({
				// append token to all api requests to authenticate
				headers: {
					token: 1
				}
			});
		},

		isLoggedIn: function () {
			return true;
		}

	};

	return authentication;
});