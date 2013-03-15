// Filename: js/views/login/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/authentificationModel',
    'views/PageView',
    'text!templates/login/MainTemplate.html'
    ], function ($, _, Backbone, router, authentificationModel, PageView, MainTemplate) {

	var MainView = PageView.extend({

		pageTitle: 'Dashboard',

		events: {
			'click #submit': '_login'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);
		},

		_login: function () {
			var password = this.$('#password').val(),
				loginSucceded;

			loginSucceded = authentificationModel.login(password);

			if (loginSucceded) {
				router.navigate('dashboard', {
					trigger: true,
					replace: true
				});
			}

		}

	});

	return MainView;

});