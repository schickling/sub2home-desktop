// Filename: js/router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/dashboard/MainView',
	'views/articles/MainView',
	'views/categories/MainView',
	'views/clients/MainView',
	'views/ingredients/MainView',
	'views/login/MainView',
	'views/menubundles/MainView',
	'views/menuupgrades/MainView',
	'views/error/MainView'
	], function ($, _, Backbone, DashboardMainView, ArticlesMainView, CategoriesMainView, ClientsMainView, IngredientsMainView, LoginMainView, MenuBundlesMainView, MenuUpgradesMainView, ErrorMainView) {


	var Router = Backbone.Router.extend({

		routes: {
			'': 'showDashboard',
			'articles': 'showArticles',
			'categories': 'showCategories',
			'clients': 'showClients',
			'ingredients': 'showIngredients',
			'login': 'showLogin',
			'menubundles': 'showMenuBundles',
			'menuupgrades': 'showMenuUpgrades',
			'*actions': 'showError'
		},

		init: function () {
			Backbone.history.start({
				pushState: true,
				root: '/'
			});
		},

		showDashboard: function () {
			new DashboardMainView();
		},

		showArticles: function () {
			new ArticlesMainView();
		},

		showCategories: function () {
			new CategoriesMainView();
		},

		showClients: function () {
			new ClientsMainView();
		},

		showIngredients: function () {
			new IngredientsMainView();
		},

		showLogin: function () {
			new LoginMainView();
		},

		showMenuBundles: function () {
			new MenuBundlesMainView();
		},

		showMenuUpgrades: function () {
			new MenuUpgradesMainView();
		},

		showError: function () {
			new ErrorMainView();
		}

	});

	return new Router();
});