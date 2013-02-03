define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({
		defaults: {
			title: '',
			largeImage: 'default',
			isSelected: false,
			price: 0
		}
	});

	return IngredientModel;

});