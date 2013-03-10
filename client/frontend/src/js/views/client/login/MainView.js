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

			// cache dom
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

			// highlight submit button
			if (this.$number.val() && this.$password.val()) {
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