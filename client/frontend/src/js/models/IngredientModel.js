define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({
		defaults: {
			title: '',
			image: '../../../img/static/ingredients/salad.jpg',
			selected: false
		}
	});

	return IngredientModel;

});