// Filename: src/js/collections/IngredientCategoriesCollection.js
define([
    'underscore',
    'backbone',
    'global',
    'models/IngredientCategoryModel',
    'collections/IngredientsCollection'
    ], function (_, Backbone, global, IngredientCategoryModel, IngredientsCollection) {

	var IngredientCategoriesCollection = Backbone.Collection.extend({

		model: IngredientCategoryModel,

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
		},

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/ingredientcategories';
		}

	});

	return IngredientCategoriesCollection;
});