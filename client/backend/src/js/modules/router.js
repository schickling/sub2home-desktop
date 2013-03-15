// Filename: js/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/authentificationModel',
    'views/dashboard/MainView',
    'views/articles/MainView',
    'views/categories/MainView',
    'views/clients/MainView',
    'views/ingredients/MainView',
    'views/login/MainView',
    'views/menubundles/MainView',
    'views/menuupgrades/MainView',
    'views/404/MainView'
    ], function ($, _, Backbone, authentificationModel, DashboardMainView, ArticlesMainView, CategoriesMainView, ClientsMainView, IngredientsMainView, LoginMainView, MenuBundlesMainView, MenuUpgradesMainView, PageNotFoundMainView) {


	var Router = Backbone.Router.extend({

		routes: {
			'': '_showDashboard',
			'login': '_showLogin',
			'articles': '_showArticles',
			'categories': '_showCategories',
			'clients': '_showClients',
			'ingredients': '_showIngredients',
			'menubundles': '_showMenuBundles',
			'menuupgrades': '_showMenuUpgrades',
			'*actions': '_showPageNotFound'
		},

		init: function () {
			Backbone.history.start({
				pushState: true,
				root: '/'
			});
		},

		_showLogin: function () {
			new LoginMainView();
		},

		_showDashboard: function () {
			if (this._isLoggedIn()) {
				new DashboardMainView();
			}
		},

		_showArticles: function () {
			if (this._isLoggedIn()) {
				new ArticlesMainView();
			}
		},

		_showCategories: function () {
			if (this._isLoggedIn()) {
				new CategoriesMainView();
			}
		},

		_showClients: function () {
			if (this._isLoggedIn()) {
				new ClientsMainView();
			}
		},

		_showIngredients: function () {
			if (this._isLoggedIn()) {
				new IngredientsMainView();
			}
		},

		_showMenuBundles: function () {
			if (this._isLoggedIn()) {
				new MenuBundlesMainView();
			}
		},

		_showMenuUpgrades: function () {
			if (this._isLoggedIn()) {
				new MenuUpgradesMainView();
			}
		},

		_showPageNotFound: function () {
			new PageNotFoundMainView();
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
		}

	});

	return new Router();
});