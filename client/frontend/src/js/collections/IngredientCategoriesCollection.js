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
		}

	});

	return IngredientCategoriesCollection;
});