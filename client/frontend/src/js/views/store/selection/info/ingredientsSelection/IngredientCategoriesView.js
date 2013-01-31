// Filename: src/js/views/store/selection/info/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/ingredientsSelection/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	var IngredientCategoriesView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (ingredientCategoryModel) {
				this.renderIngredientCategory(ingredientCategoryModel);
			}, this);
		},

		renderIngredientCategory: function (ingredientCategoryModel) {
			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel
			});

			this.$el.append(ingredientCategoryView.el);
		}

	});

	return IngredientCategoriesView;

});