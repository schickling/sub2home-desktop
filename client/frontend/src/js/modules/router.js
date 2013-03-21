// Filename: src/js/modules/router.js
define([
    'require',
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'analytics',
    'models/stateModel',
    'models/authentificationModel'
    ], function (require, $, _, Backbone, notificationcenter, analytics, stateModel, authentificationModel) {

	var Router = Backbone.Router.extend({

		routes: {
			// home
			'': '_showHomeHome',

			// info
			'info': '_showHomeInfo',

			// client
			'login': '_showClientLogin',
			'dashboard': '_showClientDashboard',
			'einstellungen': '_showClientConfig',

			// store
			':alias': '_showStoreHome',
			':alias/theke/:resourceType/:resourceId': '_showStoreSelection',
			':alias/tablett': '_showStoreTray',
			':alias/danke': '_showStoreCheckout',
			':alias/info': '_showStoreInfo',
			':alias/login': '_showStoreLogin',

			// store (logged in)
			':alias/einstellungen': '_showStoreConfig',
			':alias/sortiment': '_showStoreAssortment',
			':alias/dashboard': '_showStoreDashboard',

			// common
			'404': '_showPageNotFound',
			'*actions': '_defaultAction'
		},

		// needed to overwrite each page view
		_pageView: null,

		init: function () {
			// init header
			require(['views/header/HeaderView'], function (HeaderView) {
				new HeaderView();
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

			analytics.trackPageview(fragment);

			return this;
		},

		_showHomeHome: function () {

			stateModel.set({
				currentRoute: 'home.home'
			});

			this._loadMainView('views/home/home/MainView');

		},

		_showHomeInfo: function () {

			stateModel.set({
				currentRoute: 'home.info'
			});

			this._loadMainView('views/home/info/MainView');

		},

		_showClientLogin: function () {

			if (!this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'client.login'
				});

				this._loadMainView('views/client/login/MainView');

			} else {
				this.navigate('dashboard', {
					trigger: true,
					replace: true
				});
			}

		},

		_showClientDashboard: function () {

			if (this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'client.dashboard'
				});

				this._loadMainView('views/client/dashboard/MainView');

			}

		},

		_showClientConfig: function () {

			if (this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'client.config'
				});

				this._loadMainView('views/client/config/MainView');

			}

		},

		_showStoreHome: function (alias) {

			stateModel.set({
				currentRoute: 'store.home',
				storeAlias: alias
			});

			if (this._isValidStoreModel()) {

				this._loadMainView('views/store/home/MainView');

			}

		},

		_showStoreSelection: function (alias, resourceType, resourceId) {


			stateModel.set({
				currentRoute: 'store.selection',
				storeAlias: alias
			});

			var params = {
				selectionRessourceType: resourceType,
				selectionRessourceId: resourceId
			};

			if (this._isValidStoreModel()) {

				this._loadMainView('views/store/selection/MainView', params);

			}

		},

		_showStoreTray: function (alias) {

			stateModel.set({
				currentRoute: 'store.tray',
				storeAlias: alias
			});

			if (this._isValidStoreModel()) {

				this._loadMainView('views/store/tray/MainView');

			}

		},

		_showStoreCheckout: function (alias) {

			stateModel.set({
				currentRoute: 'store.checkout',
				storeAlias: alias
			});

			if (this._isValidStoreModel()) {

				this._loadMainView('views/store/checkout/MainView');

			}

		},

		_showStoreConfig: function (alias) {

			if (this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'store.config',
					storeAlias: alias
				});

				if (this._isValidStoreModel()) {

					this._loadMainView('views/store/config/MainView');

				}
			}

		},

		_showStoreAssortment: function (alias) {

			if (this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'store.assortment',
					storeAlias: alias
				});

				if (this._isValidStoreModel()) {
					this._loadMainView('views/store/assortment/MainView');
				}

			}

		},

		_showStoreDashboard: function (alias) {

			if (this._isLoggedIn()) {

				stateModel.set({
					currentRoute: 'store.dashboard',
					storeAlias: alias
				});

				if (this._isValidStoreModel()) {

					this._loadMainView('views/store/dashboard/MainView');

				}

			}

		},

		_showStoreInfo: function (alias) {

			stateModel.set({
				currentRoute: 'store.info',
				storeAlias: alias
			});

			if (this._isValidStoreModel()) {

				this._loadMainView('views/store/info/MainView');

			}

		},

		_showStoreLogin: function (alias) {

			this.navigate('login', {
				replace: true,
				trigger: true
			});

		},

		_showPageNotFound: function () {

			stateModel.set({
				currentRoute: 'home.404'
			});

			this._loadMainView('views/home/404/MainView');

		},

		_loadMainView: function (pathToMainView, params) {

			var self = this;

			require([pathToMainView], function (MainView) {

				params = params || {};

				// destory old page view to unbind listeners
				if (self._pageView) {
					self._pageView.destroy();
				}

				self._pageView = new MainView(params);

			});
		},

		_defaultAction: function () {

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

		},

		_isLoggedIn: function () {
			if (authentificationModel.isLoggedIn()) {
				return true;
			} else {
				this.navigate('login', {
					trigger: true,
					replace: true
				});
				return false;
			}
		},

		_isValidStoreModel: function () {
			if (stateModel.doesStoreExist()) {
				return true;
			} else {
				this.navigate('404', {
					trigger: true,
					replace: true
				});
				return false;
			}
		}

	});

	return new Router();
});