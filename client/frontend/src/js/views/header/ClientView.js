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
			'click .bSignout': '_logout',
			'click .bSettings': '_navigateToStoreSettings',
			'click .bAssortment': '_navigateToStoreAssortment',
			'click .bOrders': '_navigateToStoreOrders',
			'click .bDashboard': '_navigateToClientDashboard'
		},

		template: _.template(ClientTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {

			var $el = this.$el,
				currentStoreModel = stateModel.get('storeModel'),
				json = {
					storeTitle: currentStoreModel.get('title')
				},
				renderedHtml = this.template(json);

			$el.fadeOut(150, function () {
				$el.html(renderedHtml);
				$el.fadeIn(150);
			});

		},

		_logout: function () {
			var logoutSucceded = authentificationModel.logout();

			if (logoutSucceded && stateModel.currentRouteIsClientRelated()) {
				router.navigate('/', true);
			}
		},

		_navigateToStoreSettings: function() {
			router.navigate('store/einstellungen', true);
		},

		_navigateToStoreAssortment: function() {
			router.navigate('store/sortiment', true);
		},

		_navigateToStoreOrders: function() {
			router.navigate('store/dashboard', true);
		},

		_navigateToClientDashboard: function() {
			router.navigate('dashboard', true);
		}

	});

	return ClientView;

});