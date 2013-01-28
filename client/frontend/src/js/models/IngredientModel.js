define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({
		defaults: {
			title: '',
			largeImage: 'img/static/ingredients/salad.jpg',
			selected: false
		}
	});

	return IngredientModel;

});