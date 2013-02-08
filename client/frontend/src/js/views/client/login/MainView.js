// Filename: src/js/views/client/login/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'authentification',
	'router',
	'notificationcenter',
	'views/PageView',
	'text!templates/client/login/MainTemplate.html'
	], function ($, _, Backbone, authentification, router, notificationcenter, PageView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'keypress #login input': 'listenForEnter',
			'click #loginSubmit': 'login'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			this.append();
		},

		login: function () {
			var number = this.$('#loginCustomerNumber').val(),
				password = this.$('#loginPassword').val(),
				loginSucceded;

			loginSucceded = authentification.login(number, password);

			if (loginSucceded) {
				router.navigate('/', true);
			} else {
				notificationcenter.error('Daten falsch', 'Damn it');
			}

		},

		listenForEnter: function(e) {
			if (e.keyCode === 13) {
				this.login();
			}
		}


	});

	return MainView;

});