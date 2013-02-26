// Filename: src/js/views/header/ClientView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/stateModel',
    'models/authentificationModel',
    'text!templates/header/ClientTemplate.html'
    ], function ($, _, Backbone, router, stateModel, authentificationModel, ClientTemplate) {

	var ClientView = Backbone.View.extend({

		// cached dom
		$buttonLogout: null,
		$buttonClientDashboard: null,
		$buttonClientConfig: null,
		$buttonStoreDashboard: null,
		$buttonStoreAssortment: null,
		$buttonStoreConfig: null,
		arrayOfAllButtons: null,

		events: {
			'click .bSignout': '_logout',
			'click .bSettings': '_navigateToStoreConfig',
			'click .bClientSettings': '_navigateToClientConfig',
			'click .bAssortment': '_navigateToStoreAssortment',
			'click .bOrders': '_navigateToStoreOrders',
			'click .bDashboard': '_navigateToClientDashboard'
		},

		template: _.template(ClientTemplate),

		initialize: function () {
			this._render();
			this._listenToCurrentRoute();
		},

		_render: function () {

			var $el = this.$el,
				self = this,
				currentStoreModel = stateModel.get('storeModel'),
				json = {
					storeTitle: currentStoreModel.get('title')
				},
				renderedHtml = this.template(json);

			$el.fadeOut(100, function () {

				$el.html(renderedHtml);

				self._cacheDom();
				self._selectViewFromCurrentRoute();

				$el.fadeIn(150);

			});

		},

		_cacheDom: function () {
			this.$buttonLogout = this.$('.bSignout');
			this.$buttonClientDashboard = this.$('.bDashboard');
			this.$buttonClientConfig = this.$('.bClientSettings');
			this.$buttonStoreDashboard = this.$('.bTurnover');
			this.$buttonStoreAssortment = this.$('.bAssortment');
			this.$buttonStoreConfig = this.$('.bSettings');
			this.$allButtons = this.$('#clientAreaNavigation .iBtn').not(this.$buttonLogout);
		},

		_listenToCurrentRoute: function () {
			stateModel.on('change:currentRoute', this._selectViewFromCurrentRoute, this);
		},

		_selectViewFromCurrentRoute: function () {
			var currentRoute = stateModel.get('currentRoute');

			switch (currentRoute) {
				case 'client.dashboard':
					this._showClientDashboard();
					break;
				case 'client.config':
					this._showClientConfig();
					break;
				case 'store.dashboard':
					this._showStoreDashboard();
					break;
				case 'store.assortment':
					this._showStoreAssortment();
					break;
				case 'store.config':
					this._showStoreConfig();
					break;
			}
		},

		_showClientDashboard: function () {
			var $neededButtons = this.$buttonClientConfig,
				$unneededButtons = this.$allButtons.not($neededButtons);

			$neededButtons.fadeIn();
			$unneededButtons.fadeOut();
		},

		_showClientConfig: function () {
			var $neededButtons = this.$buttonClientDashboard,
				$unneededButtons = this.$allButtons.not($neededButtons);

			$neededButtons.fadeIn();
			$unneededButtons.fadeOut();
		},

		_showStoreDashboard: function () {

		},

		_showStoreAssortment: function () {

		},

		_showStoreConfig: function () {

		},

		_logout: function () {
			var logoutSucceded = authentificationModel.logout();

			if (logoutSucceded && stateModel.currentRouteIsClientRelated()) {
				router.navigate('/', true);
			}
		},

		_navigateToStoreConfig: function () {
			router.navigate('store/einstellungen', true);
		},

		_navigateToStoreAssortment: function () {
			router.navigate('store/sortiment', true);
		},

		_navigateToStoreOrders: function () {
			router.navigate('store/dashboard', true);
		},

		_navigateToClientDashboard: function () {
			router.navigate('dashboard', true);
		},

		_navigateToClientConfig: function () {
			router.navigate('einstellungen', true);
		}

	});

	return ClientView;

});