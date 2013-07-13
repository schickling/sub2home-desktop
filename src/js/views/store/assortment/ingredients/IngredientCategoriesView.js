// Filename: src/js/views/store/assortment/ingredients/IngredientCategoriesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/IngredientCategoriesCollection',
    'views/store/assortment/SectionBaseView',
    'views/store/assortment/ingredients/IngredientCategoryView',
    'views/store/assortment/ingredients/ControlView'
    ], function ($, _, Backbone, IngredientCategoriesCollection, SectionBaseView, IngredientCategoryView, ControlView) {

	"use strict";

	var IngredientCategoriesView = SectionBaseView.extend({

		controlViewClass: ControlView,
		collectionClass: IngredientCategoriesCollection,

		className: 'ingredients',

		_fetchCollection: function () {
			var self = this;

			this.collection.fetch({
				success: function () {
					self._renderContent();
				}
			});
		},

		_renderContent: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				this._renderIngredientCategory(ingredientCategoryModel);
			}, this);
		},

		_renderIngredientCategory: function (ingredientCategoryModel) {
			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel
			});

			this.$content.append(ingredientCategoryView.el);
		}

	});

	return IngredientCategoriesView;

});