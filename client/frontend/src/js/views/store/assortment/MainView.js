// Filename: src/js/views/store/assortment/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'global',
    'models/stateModel',
    'views/PageView',
    'views/store/assortment/SectionsNavigationView',
    'views/store/assortment/articles/CategoriesView',
    'views/store/assortment/menuUpgrades/MenuUpgradesView',
    'views/store/assortment/menuBundles/MenuBundlesView',
    'views/store/assortment/ingredients/IngredientCategoriesView',
    'text!templates/store/assortment/MainTemplate.html'
    ], function ($, _, Backbone, router, global, stateModel, PageView, SectionsNavigationView, CategoriesView, MenuUpgradesView, MenuBundlesView, IngredientCategoriesView, MainTemplate) {

	var MainView = PageView.extend({

		subViews: {
			categoriesView: null,
			ingredientCategoriesView: null,
			menuUpgradesView: null,
			menuBundlesView: null
		},

		initialize: function () {

			// for authentification reload the store model
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				url: '/api/frontend/stores/' + global.getStoreAlias() + '/auth', // use custom route
				async: false
			});

			// check if client is allowed to view this page
			if (stateModel.clientOwnsThisStore()) {
				this._render();
			} else {
				router.navigate('login', {
					trigger: true,
					replace: true
				});
			}


		},

		_render: function () {

			this.$el.html(MainTemplate);

			// render navigation
			this._renderSectionsNavigation();

			// render slides
			this._renderArticleSection();
			this._renderMenuUpgradesSection();
			this._renderMenuBundlesSection();
			this._renderIngredientsSection();

			this.append();

		},

		_renderSectionsNavigation: function () {
			new SectionsNavigationView({
				el: this.$el
			});
		},

		_renderArticleSection: function () {
			this.subViews.categoriesView = new CategoriesView({
				el: this.$el
			});
		},

		_renderMenuUpgradesSection: function () {
			this.subViews.menuUpgradesView = new MenuUpgradesView({
				el: this.$el
			});
		},

		_renderMenuBundlesSection: function () {
			this.subViews.menuBundlesView = new MenuBundlesView({
				el: this.$el
			});
		},

		_renderIngredientsSection: function () {
			this.subViews.ingredientCategoriesView = new IngredientCategoriesView({
				el: this.$el
			});
		}

	});

	return MainView;

});