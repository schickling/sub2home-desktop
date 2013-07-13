define([
	'underscore',
	'backbone',
	'models/IngredientModel'
	], function (_, Backbone, IngredientModel) {

	"use strict";

	var IngredientsCollection = Backbone.Collection.extend({

		model: IngredientModel

	});

	return IngredientsCollection;
});