// Filename: src/js/collections/IngredientCategoriesCollection.js
define([
    'underscore',
    'backbone',
    'models/IngredientCategoryModel',
    'collections/IngredientsCollection'
    ], function (_, Backbone, IngredientCategoryModel, IngredientsCollection) {

	"use strict";

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
			return 'stores/storeAlias/ingredientcategories';
		}

	});

	return IngredientCategoriesCollection;
});