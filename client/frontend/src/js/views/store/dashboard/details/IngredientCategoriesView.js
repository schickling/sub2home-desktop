// Filename: src/js/views/store/dashboard/details/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/dashboard/details/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	var IngredientCategoriesView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				this._renderIngredientCategory(ingredientCategoryModel);
			}, this);
		},

		_renderIngredientCategory: function (ingredientCategoryModel) {
			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel
			});

			this.$el.append(ingredientCategoryView.el);
		}

	});

	return IngredientCategoriesView;

});