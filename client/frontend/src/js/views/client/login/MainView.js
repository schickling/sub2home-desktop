// Filename: src/js/views/client/login/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'authentification',
	'router',
	'views/PageView',
	'text!templates/client/login/MainTemplate.html'
	], function ($, _, Backbone, authentification, router, PageView, MainTemplate) {

	var MainView = PageView.extend({

		$number: null,
		$password: null,
		$submit: null,

		events: {
			'keyup #login input': 'evalKeyboard',
			'click #loginSubmit': 'login'
		},

		initialize: function () {

			this.render();

			// cache dom
			this.$number = this.$('#loginCustomerNumber');
			this.$password = this.$('#loginPassword');
			this.$submit = this.$('#loginSubmit');
		},

		render: function () {
			this.$el.html(MainTemplate);

			this.append();
		},

		login: function () {
			var number = this.$number.val(),
				password = this.$password.val(),
				loginSucceded;

			loginSucceded = authentification.login(number, password);

			if (loginSucceded) {
				router.navigate('franchise', {
					trigger: true,
					replace: true
				});
			}

		},

		evalKeyboard: function (e) {

			// listen for enter
			if (e.keyCode === 13) {
				this.login();
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