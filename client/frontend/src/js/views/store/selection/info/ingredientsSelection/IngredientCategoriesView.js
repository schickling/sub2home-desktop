// Filename: src/js/views/store/selection/info/IngredientCategoriesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/ingredientsSelection/IngredientCategoryView'
	], function ($, _, Backbone, IngredientCategoryView) {

	var IngredientCategoriesView = Backbone.View.extend({

		$firstColumn: null,

		$secondColumn: null,

		isFirstColumn: true,

		initialize: function () {
			this.render();
		},

		render: function () {

			// cache dom
			this.$firstColumn = this.$('.ingredientCategories').first();
			this.$secondColumn = this.$('.ingredientCategories').last();

			_.each(this.collection.models, function (ingredientCategoryModel) {
				this.renderIngredientCategory(ingredientCategoryModel);
			}, this);

		},

		renderIngredientCategory: function (ingredientCategoryModel) {
			var ingredientCategoryView = new IngredientCategoryView({
				model: ingredientCategoryModel,
				selectionView: this.options.selectionView
			});

			if (this.isFirstColumn) {
				this.$firstColumn.append(ingredientCategoryView.el);
			} else {
				this.$secondColumn.append(ingredientCategoryView.el);
			}

			// flip
			this.isFirstColumn = !this.isFirstColumn;
		}

	});

	return IngredientCategoriesView;

});