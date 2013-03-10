// Filename: src/js/views/client/login/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/authentificationModel',
    'models/stateModel',
    'views/PageView',
    'text!templates/client/login/MainTemplate.html'
    ], function ($, _, Backbone, router, authentificationModel, stateModel, PageView, MainTemplate) {

	var MainView = PageView.extend({

		$number: null,
		$password: null,
		$submit: null,

		events: {
			'keyup #login input': '_evalKeyboard',
			'click #loginSubmit': '_login'
		},

		initialize: function () {

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
			}

			var number = this.$number.val(),
				password = this.$password.val();

			// highlight submit button
			if (number && number.length === 4 && password && password.length >= 8) {
				this.$submit.stop().animate({
					opacity: 1
				});
			} else {
				this.$submit.stop().animate({
					opacity: 0.5
				});
			}

		}


	});

	return MainView;

});