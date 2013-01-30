define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({
		defaults: {
			title: '',
			largeImage: 'default',
			selected: false,
			price: 0
		}
	});

	return IngredientModel;

});