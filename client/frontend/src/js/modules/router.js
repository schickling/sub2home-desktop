// Filename: src/js/modules/router.js
define([
	'require',
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'notificationcenter' // Request notificationcenter.js
	], function (require, $, _, Backbone, stateModel, notificationcenter) {

	var Router = Backbone.Router.extend({

		routes: {
			// hard routes first
			// Define some URL routes
			'': 'showHome',
			'404': 'showPageNotFound',

			':alias': 'showStoreHome',
			':alias/theke/:resourceType/:resourceId': 'showStoreSelection',
			':alias/tablett': 'showStoreTray',
			':alias/einstellungen': 'showStoreConfig',
			':alias/bestellungen': 'showStoreOrders',

			// Default
			'*actions': 'defaultAction'
		},

		pageView: null,

		init: function () {
			// init header
			require(['views/header/HeaderView'], function (HeaderView) {
				var headerView = new HeaderView();
			});

			// start notificationcenter
			notificationcenter.init();

			Backbone.history.start({
				pushState: true,
				root: '/'
			});
		},

		navigate: function (fragment, options) {

			var parts = fragment.split('/');

			if (parts[0] === 'store') {
				// subsitute store alias
				parts[0] = stateModel.get('storeAlias');

				// reassemble frament
				fragment = parts.join('/');
			}

			Backbone.history.navigate(fragment, options);
			return this;
		},

		showStoreHome: function (alias) {

			stateModel.set({
				currentRoute: 'store.home',
				storeAlias: alias
			});

			this.loadMainView('views/store/home/MainView');

		},

		showStoreSelection: function (alias, resourceType, resourceId) {

			stateModel.set({
				currentRoute: 'store.selection',
				storeAlias: alias,
				selectionRessourceType: resourceType,
				selectionRessourceId: resourceId
			});

			this.loadMainView('views/store/selection/MainView');

		},

		showStoreConfig: function (alias) {

			stateModel.set({
				currentRoute: 'store.config',
				storeAlias: alias
			});

			this.loadMainView('views/store/config/MainView');

		},

		showStoreTray: function () {

			stateModel.set({
				currentRoute: 'store.tray'
			});

			this.loadMainView('views/store/tray/MainView');

		},

		showStoreOrders: function () {

			stateModel.set({
				currentRoute: 'store.orders'
			});

			this.loadMainView('views/store/orders/MainView');

		},

		showHome: function () {

			stateModel.set({
				currentRoute: 'home'
			});

			this.loadMainView('views/home/MainView');

		},

		showPageNotFound: function () {

			$('body').html('404');

		},

		loadMainView: function (pathToMainView) {

			var self = this;

			require([pathToMainView], function (MainView) {

				self.pageView = new MainView();

			});
		},

		defaultAction: function () {

			var fragment = Backbone.history.fragment;

			// check for trailing slash
			if (fragment.match(/.*\/$/)) {
				fragment = fragment.replace(/\/$/, '');
				this.navigate(fragment, {
					trigger: true,
					replace: true
				});
			} else {
				this.navigate('404', {
					trigger: true,
					replace: true
				});
			}

		}

	});

	return new Router();
});