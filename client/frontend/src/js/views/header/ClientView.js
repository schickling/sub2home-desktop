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

	$.objectOfArray = function (a) {
		var c = jQuery();
		for (var x in a) {
			c = c.add(a[x]);
		}
		return c;
	};

	var ClientView = Backbone.View.extend({

		// cached dom
		$buttonLogout: null,
		$buttonClientDashboard: null,
		$buttonClientConfig: null,
		$buttonStoreDashboard: null,
		$buttonStoreAssortment: null,
		$buttonStoreConfig: null,
		$allButtons: null,

		animationTime: 150,

		events: {
			'click .bSignout': '_logout',
			'click .bStoreConfig': '_navigateToStoreConfig',
			'click .bClientConfig': '_navigateToClientConfig',
			'click .bStoreAssortment': '_navigateToStoreAssortment',
			'click .bStoreDashboard': '_navigateToStoreOrders',
			'click .bClientDashboard': '_navigateToClientDashboard'
		},

		template: _.template(ClientTemplate),

		initialize: function () {
			this._render();
			this._listenToCurrentRoute();
		},

		_render: function () {

			var $el = this.$el,
				self = this,
				animationTime = this.animationTime,
				currentStoreModel = stateModel.get('storeModel'),
				json = {
					storeTitle: currentStoreModel.get('title')
				},
				renderedHtml = this.template(json);

			$el.fadeOut(animationTime - 50, function () {

				$el.html(renderedHtml);

				self._cacheDom();
				self._selectViewFromCurrentRoute();

				$el.fadeIn(animationTime);

			});

		},

		_cacheDom: function () {
			this.$buttonLogout = this.$('.bSignout');
			this.$buttonClientDashboard = this.$('.bClientDashboard');
			this.$buttonClientConfig = this.$('.bClientConfig');
			this.$buttonStoreDashboard = this.$('.bStoreDashboard');
			this.$buttonStoreAssortment = this.$('.bStoreAssortment');
			this.$buttonStoreConfig = this.$('.bStoreConfig');
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

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showClientConfig: function () {
			var $neededButtons = this.$buttonClientDashboard,
				$unneededButtons = this.$allButtons.not($neededButtons);

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreDashboard: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons);

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreAssortment: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons);

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreConfig: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons);

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
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