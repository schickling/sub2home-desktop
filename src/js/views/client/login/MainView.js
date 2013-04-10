// Filename: src/js/views/client/login/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'models/authentificationModel',
    'models/stateModel',
    'views/PageView',
    'text!templates/client/login/MainTemplate.html'
    ], function ($, _, Backbone, router, notificationcenter, authentificationModel, stateModel, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Einloggen - sub2home',

		$number: null,
		$password: null,
		$submit: null,

		loginAllowed: false,

		events: {
			'keyup #login input': '_evalKeyboard',
			'click #loginSubmit': '_login'
		},

		initialize: function () {

			authentificationModel.forceSSL();

			this._render();

			this._cacheDom();

			this.$number.focus();

		},

		_cacheDom: function () {
			this.$number = this.$('#loginCustomerNumber');
			this.$password = this.$('#loginPassword');
			this.$submit = this.$('#loginSubmit');
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.append();
		},

		_login: function () {

			if (!this.loginAllowed) {
				notificationcenter.notify('models.authentificationModel.dataWrong');
				return;
			}

			var number = this.$number.val(),
				password = this.$password.val(),
				loginSucceded;

			loginSucceded = authentificationModel.login(number, password);

			if (loginSucceded) {
				router.navigate('dashboard', {
					trigger: true,
					replace: true
				});
			}

		},

		_evalKeyboard: function (e) {

			// listen for enter
			if (e.keyCode === 13) {
				this._login();
				return;
			}

			var number = this.$number.val(),
				password = this.$password.val();

			// highlight submit button
			if (number && number.length === 4 && password && password.length >= 8) {
				this.$submit.stop().animate({
					opacity: 1
				});
				this.loginAllowed = true;
			} else {
				this.$submit.stop().animate({
					opacity: 0.5
				});
				this.loginAllowed = false;
			}

		}


	});

	return MainView;

});