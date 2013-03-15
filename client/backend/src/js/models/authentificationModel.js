// Filename: src/js/models/authentificationModel.js
define([
    'jquery',
    'underscore',
    'backbone',
    'server'
    ], function ($, _, Backbone, server) {

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
			var valid = false,
				self = this;

			$.ajax({
				url: server.getAddress() + 'checktoken',
				type: 'post',
				async: false,
				dataType: 'text', // needed because response is empty
				success: function () {
					valid = true;
				},
				error: function () {
					self._dropToken();
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

		login: function (password) {

			// force ssl
			this._forceSSL();

			var isLoggedIn = false;

			$.ajax({
				url: server.getAddress() + 'login',
				data: {
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
				error: function () {

					alert('Login failed');

				}
			});

			this._setupAjax();

			this.set('isLoggedIn', isLoggedIn);

			return isLoggedIn;

		},

		logout: function () {

			// force ssl
			this._forceSSL();

			var isLoggedOut = false,
				self = this;

			$.ajax({
				url: server.getAddress() + 'logout',
				type: 'post',
				async: false,
				dataType: 'text', // needed because response is empty
				success: function (token) {
					self._dropToken();
					isLoggedOut = true;
				}
			});

			this.set('isLoggedIn', !isLoggedOut);

			return isLoggedOut;
		},

		_dropToken: function () {
			window.localStorage.removeItem('token');
		}

	});

	return new AuthentificationModel();
});