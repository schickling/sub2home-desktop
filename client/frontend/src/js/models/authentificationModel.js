// Filename: src/js/models/authentificationModel.js
define([
	'jquery',
	'underscore',
	'backbone',
	'notificationcenter'
	], function ($, _, Backbone, notificationcenter) {

	var AuthentificationModel = Backbone.Model.extend({

		defaults: {

			isSetup: false,

			isLoggedIn: false

		},

		_hasValidToken: function () {

			// check if even a token is in localstorage
			if (!window.localStorage.getItem('token')) {
				return false;
			}

			// validate token
			var valid = false;

			$.ajax({
				url: '/api/frontend/checktoken',
				type: 'post',
				async: false,
				dataType: 'text', // needed because response is empty
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
					Token: window.localStorage.getItem('token')
				}
			});

			this._isSetup = true;
		},

		_forceSSL: function () {
			if (location.protocol !== 'https:') {
				window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
			}
		},

		isLoggedIn: function () {
			// check for cache
			if (this.get('isLoggedIn')) {
				return true;
			}

			if (!this._isSetup) {
				this._setupAjax();
			}

			// force ssl
			this._forceSSL();

			// validate token
			var tokenIsValid = this._hasValidToken();

			// cache token validation
			this.set('isLoggedIn', tokenIsValid);

			return tokenIsValid;
		},

		login: function (number, password) {

			// force ssl
			this._forceSSL();

			var isLoggedIn = false;

			$.ajax({
				url: '/api/frontend/login',
				data: {
					number: number,
					password: password
				},
				type: 'post',
				async: false,
				dataType: 'json',
				success: function (response) {
					var token = response.token;

					window.localStorage.setItem('token', token);
					isLoggedIn = true;
				},
				error: function (jqXHR, textStatus, errorThrown) {

					var statusCode = jqXHR.status;

					if (statusCode === 429) {
						notificationcenter.notify('Zu viele fehlerhafte Versuche');
					} else {
						notificationcenter.notify('Daten falsch');
					}

				}
			});

			this._setupAjax();

			this.set('isLoggedIn', isLoggedIn);

			return isLoggedIn;

		},

		logout: function () {

			// force ssl
			this._forceSSL();

			var isLoggedOut = false;

			$.ajax({
				url: '/api/frontend/logout',
				type: 'post',
				async: false,
				dataType: 'text', // needed because response is empty
				success: function (token) {
					window.localStorage.removeItem('token');
					isLoggedOut = true;
				}
			});

			this.set('isLoggedIn', !isLoggedOut);

			return isLoggedOut;
		}

	});

	return new AuthentificationModel();
});