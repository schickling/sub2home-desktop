// Filename: src/js/collections/IngredientCategoriesCollection.js
define([
	'underscore',
	'backbone',
	'models/IngredientCategoryModel',
	'collections/IngredientsCollection'
	], function (_, Backbone, IngredientCategoryModel, IngredientsCollection) {

	var IngredientCategoriesCollection = Backbone.Collection.extend({

		model: IngredientCategoryModel,

		destroy: function () {
			this.each(function (ingredientCategoryModel) {
				ingredientCategoryModel.destroy();
			});
		},

		getAllSelectedIngredientModels: function () {
			var ingredientModels = [];

			_.each(this.models, function (ingredientsCategoryModel) {
				var ingredientsCollection = ingredientsCategoryModel.get('ingredientsCollection');
				_.each(ingredientsCollection.models, function (ingredientModel) {
					if (ingredientModel.get('isSelected')) {
						ingredientModels.push(ingredientModel);
					}
				});
			});

			return ingredientModels;
		}

	});

	return IngredientCategoriesCollection;
});