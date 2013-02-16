// Filename: src/js/views/header/ClientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'models/authentificationModel',
	'text!templates/header/ClientTemplate.html'
	], function ($, _, Backbone, router, stateModel,authentificationModel, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		events: {
			'click .bSignout': '_logout'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {

			var $el = this.$el;

			$el.fadeOut(150, function () {
				$el.html(ClientTemplate);
				$el.fadeIn(150);
			});

		},

		_logout: function () {
			var logoutSucceded = authentificationModel.logout();

			if (logoutSucceded && stateModel.currentRouteIsClientRelated()) {
				router.navigate('/', true);
			}
		}

	});

	return ClientView;

});