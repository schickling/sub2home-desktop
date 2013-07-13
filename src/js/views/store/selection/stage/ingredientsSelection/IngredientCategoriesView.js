// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/ingredientsSelection/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	"use strict";

	var IngredientCategoriesView = Backbone.View.extend({

		initialize: function () {
			var articleModel = this.model.get('articleModel');

			if (articleModel) {

				this.collection = articleModel.get('ingredientCategoriesCollection');

				this._render();

			}
		},

		_render: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				this._renderIngredientCategory(ingredientCategoryModel);
			}, this);
		},

		_renderIngredientCategory: function (ingredientCategoryModel) {

			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel,
				el: this.$el
			});

		}

	});

	return IngredientCategoriesView;

});