define([
	'underscore',
	'backbone',
	'models/IngredientModel'
	], function (_, Backbone, IngredientModel) {

	var IngredientsCollection = Backbone.Collection.extend({

		model: IngredientModel

	});

	return IngredientsCollection;
});