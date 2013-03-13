define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({
		defaults: {
			title: '',
			shortTitle: '',
			shortcut: '',
			largeImage: 'default',
			icon: '',
			isSelected: false,
			price: 0
		}
	});

	return IngredientModel;

});