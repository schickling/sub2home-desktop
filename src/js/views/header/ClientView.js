// Filename: src/js/views/header/ClientView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'services/notificationcenter',
    'models/stateModel',
    'models/clientModel',
    'models/authentificationModel',
    'text!templates/header/ClientTemplate.html'
    ], function ($, _, Backbone, router, notificationcenter, stateModel, clientModel, authentificationModel, ClientTemplate) {

	"use strict";

	$.objectOfArray = function (a) {
		var c = $();
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
		$currentIcon: null,
		$title: null,

		animationTime: 150,

		events: {
			'click #bSignout': '_logout',
			'click #bStoreConfig': '_navigateToStoreConfig',
			'click #bClientConfig': '_navigateToClientConfig',
			'click #bStoreAssortment': '_navigateToStoreAssortment',
			'click #bStoreDashboard': '_navigateToStoreDashboard',
			'click #bClientDashboard': '_navigateToClientDashboard',
			'mouseenter #bSignout': '_tooltipLogout',
			'mouseenter #bStoreConfig': '_tooltipForStoreConfig',
			'mouseenter #bClientConfig': '_tooltipForClientConfig',
			'mouseenter #bStoreAssortment': '_tooltipForStoreAssortment',
			'mouseenter #bStoreDashboard': '_tooltipForStoreDashboard',
			'mouseenter #bClientDashboard': '_tooltipForClientDashboard',
			'mouseleave .iBtn': '_dismissTooltip'

		},

		initialize: function () {
			this._render();
			this._enableTooltips();
			this._listenToCurrentRoute();
		},

		_render: function () {

			this.$el.html(ClientTemplate);

			this._cacheDom();
			this._selectViewFromCurrentRoute();

		},

		_enableTooltips: function() {

		},

		_cacheDom: function () {
			this.$buttonLogout = this.$('#bSignout');
			this.$buttonClientDashboard = this.$('#bClientDashboard');
			this.$buttonClientConfig = this.$('#bClientConfig');
			this.$buttonStoreDashboard = this.$('#bStoreDashboard');
			this.$buttonStoreAssortment = this.$('#bStoreAssortment');
			this.$buttonStoreConfig = this.$('#bStoreConfig');
			this.$allButtons = this.$('#clientAreaNavigation .iBtn').not(this.$buttonLogout);
			this.$currentIcon = this.$('#currentIcon');
			this.$title = this.$('#currentInfo span');
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
				default:
					if (stateModel.doesStoreExist()) {
						this._showStoreGlobal();
					}
			}
		},

		_showClientDashboard: function () {
			var $neededButtons = this.$buttonClientConfig,
				$unneededButtons = this.$allButtons.not($neededButtons),
				title = clientModel.getName() + '\'s sub2home';

			this.$allButtons.removeClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('storeIcon');
			this.$currentIcon.addClass('clientIcon');

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showClientConfig: function () {
			var $neededButtons = this.$buttonClientDashboard,
				$unneededButtons = this.$allButtons.not($neededButtons),
				title = clientModel.getName() + '\'s sub2home';

			this.$allButtons.removeClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('storeIcon');
			this.$currentIcon.addClass('clientIcon');

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreDashboard: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons),
				storeModel = stateModel.get('storeModel'),
				title = 'Dashboard: ' + storeModel.get('title');

			this.$allButtons.removeClass('active');
			this.$buttonStoreDashboard.addClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('clientIcon');
			this.$currentIcon.addClass('storeIcon');

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreAssortment: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons),
				storeModel = stateModel.get('storeModel'),
				title = 'Sortiment: ' + storeModel.get('title');

			this.$allButtons.removeClass('active');
			this.$buttonStoreAssortment.addClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('clientIcon');
			this.$currentIcon.addClass('storeIcon');

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreConfig: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons),
				storeModel = stateModel.get('storeModel'),
				title = 'Einstellungen: ' + storeModel.get('title');

			this.$allButtons.removeClass('active');
			this.$buttonStoreConfig.addClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('clientIcon');
			this.$currentIcon.addClass('storeIcon');

			$unneededButtons.fadeOut(this.animationTime);
			$neededButtons.delay(this.animationTime + 10).fadeIn(this.animationTime + 50);
		},

		_showStoreGlobal: function () {
			var $neededButtons = $.objectOfArray([this.$buttonClientDashboard, this.$buttonStoreConfig, this.$buttonStoreAssortment, this.$buttonStoreDashboard]),
				$unneededButtons = this.$allButtons.not($neededButtons),
				storeModel = stateModel.get('storeModel'),
				title = storeModel.get('title');

			this.$allButtons.removeClass('active');

			this.$title.text(title);

			this.$currentIcon.removeClass('clientIcon');
			this.$currentIcon.addClass('storeIcon');

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

		_navigateToStoreDashboard: function () {
			router.navigate('store/dashboard', true);
		},

		_navigateToClientDashboard: function () {
			router.navigate('dashboard', true);
		},

		_navigateToClientConfig: function () {
			router.navigate('einstellungen', true);
		},

		remove: function () {
			stateModel.off('change:currentRoute', this._selectViewFromCurrentRoute, this);
		},

		_tooltipLogout: function () {
			var offset = this.$buttonLogout.offset();
			notificationcenter.tooltip('views.header.logout', offset.top + 64, offset.left + 34);
		},

		_tooltipForStoreConfig: function () {
			var offset = this.$buttonStoreConfig.offset();
			notificationcenter.tooltip('views.header.store.config', offset.top + 64, offset.left + 24);
		},

		_tooltipForStoreAssortment: function () {
			var offset = this.$buttonStoreAssortment.offset();
			notificationcenter.tooltip('views.header.store.assortment', offset.top + 64, offset.left + 24);
		},

		_tooltipForStoreDashboard: function () {
			var offset = this.$buttonStoreDashboard.offset();
			notificationcenter.tooltip('views.header.store.dashboard', offset.top + 64, offset.left + 23);
		},

		_tooltipForClientDashboard: function () {
			var offset = this.$buttonClientDashboard.offset();
			notificationcenter.tooltip('views.header.client.dashboard', offset.top + 64, offset.left + 34);
		},

		_tooltipForClientConfig: function () {
			var offset = this.$buttonClientConfig.offset();
			notificationcenter.tooltip('views.header.client.config', offset.top + 64, offset.left + 34);
		},

		_dismissTooltip: function () {
			notificationcenter.hideTooltip();
		}

	});

	return ClientView;

});