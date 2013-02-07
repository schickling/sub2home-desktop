// Filename: src/js/modules/authentication.js
define([
	'jquery'
	], function ($) {

	var authentication = {

		_isSetup: false,

		_hasValidToken: function () {
			var valid = false;

			$.ajax({
				url: '/api/frontend/checktoken',
				type: 'post',
				async: false,
				success: function () {
					valid = true;
				}
			});

			return valid;
		},

		_setupAjax: function () {
			$.ajaxSetup({
				// append token to all api requests to authenticate
				headers: {
					Token: 1
				}
			});

			this._isSetup = true;
		},

		isLoggedIn: function () {
			if (!this._isSetup) {
				this._setupAjax();
			}

			return this._hasValidToken();
		}

	};

	return authentication;
});