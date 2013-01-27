// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/ingredientsSelection/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	var IngredientCategoriesView = Backbone.View.extend({

		className: 'slideContainer',

		initialize: function () {
			var articleModel = this.model.get('articleModel');

			if (articleModel) {

				this.collection = articleModel.get('ingredientCategoriesCollection');

				this.render();

			}
		},

		render: function () {
			this.collection.each(function (ingredientCategoryModel) {
				this.renderIngredientCategory(ingredientCategoryModel);
			}, this);
		},

		renderIngredientCategory: function (ingredientCategoryModel) {

			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel,
				el: this.$el
			});

		}

	});

	return IngredientCategoriesView;

});