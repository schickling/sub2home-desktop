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

			// validate token
			var valid = false,
				self = this;

			$.ajax({
				url: '/api/frontend/checktoken',
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
					Token: this._getToken()
				}
			});

			this._isSetup = true;
		},

		forceSSL: function () {
			if (location.protocol !== 'https:') {
				window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
			}
		},

		isLoggedIn: function () {
			// check for cache
			if (this.get('isLoggedIn')) {
				return true;
			}

			// check if even a token is in localstorage
			if (!this._getToken()) {
				return false;
			}

			if (!this._isSetup) {
				this._setupAjax();
			}

			// force ssl
			this.forceSSL();

			// validate token
			var tokenIsValid = this._hasValidToken();

			// cache token validation
			this.set('isLoggedIn', tokenIsValid);

			return tokenIsValid;
		},

		login: function (number, password) {

			// force ssl
			this.forceSSL();

			var isLoggedIn = false,
				self = this;

			$.ajax({
				url: '/api/frontend/login',
				data: JSON.stringify({
					number: number,
					password: password
				}),
				type: 'post',
				async: false,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (response) {

					self._setToken(response.token);

					isLoggedIn = true;

				},
				error: function (jqXHR) {

					var statusCode = jqXHR.status;

					if (statusCode === 429) {
						notificationcenter.notify('models.authentificationModel.tooManyErrors');
					} else {
						notificationcenter.notify('models.authentificationModel.dataWrong');
					}

				}
			});

			this._setupAjax();

			this.set('isLoggedIn', isLoggedIn);

			return isLoggedIn;

		},

		logout: function () {

			// force ssl
			this.forceSSL();

			var isLoggedOut = false,
				self = this;

			$.ajax({
				url: '/api/frontend/logout',
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

		_setToken: function (token) {
			window.localStorage.setItem('token', token);
		},

		_getToken: function () {
			return window.localStorage.getItem('token');
		},

		_dropToken: function () {
			window.localStorage.removeItem('token');
		}

	});

	return new AuthentificationModel();
});