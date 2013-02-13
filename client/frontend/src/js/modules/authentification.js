// Filename: src/js/modules/authentification.js
define([
	'jquery',
	'notificationcenter',
	], function ($, notificationcenter) {

	var authentification = {

		_isSetup: false,

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
				crossDomain: true,
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
					Token: window.localStorage.getItem('token')
				}
			});

			this._isSetup = true;
		},

		isLoggedIn: function () {
			if (!this._isSetup) {
				this._setupAjax();
			}

			// force ssl
			if (location.protocol !== 'https:') {
				window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
			}

			return this._hasValidToken();
		},

		login: function (number, password) {

			var isLoggedIn = false;

			$.ajax({
				url: '/api/frontend/login',
				data: {
					number: number,
					password: password
				},
				type: 'post',
				crossDomain: true,
				async: false,
				success: function (token) {
					window.localStorage.setItem('token', token);
					isLoggedIn = true;
				},
				error: function (jqXHR, textStatus, errorThrown) {

					var statusCode = jqXHR.status;

					if (statusCode === 429) {
						notificationcenter.error('Zu viele fehlerhafte Versuche', 'Warte verdammt!');
					} else {
						notificationcenter.error('Daten falsch', 'Damn it');
					}
					
				}
			});

			this._setupAjax();

			return isLoggedIn;

		},

		logout: function () {

			var isLoggedOut = false;

			$.ajax({
				url: '/api/frontend/logout',
				type: 'post',
				async: false,
				success: function (token) {
					window.localStorage.removeItem('token');
					isLoggedOut = true;
				}
			});

			return isLoggedOut;
		}

	};

	return authentification;
});