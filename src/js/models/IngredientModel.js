define([
    'underscore',
    'backbone'
    ], function (_, Backbone) {

	var IngredientModel = Backbone.Model.extend({

		defaults: {
			title: '',
			shortTitle: '',
			shortcut: '',
			description: '',
			largeImage: 'default',
			icon: '',
			isSelected: false,
			price: 0,

			// for assortment
			isActive: false,
			customPrice: 0,
			buyed: 0
		},

		urlRoot: function () {
			return 'stores/storeAlias/ingredients/';
		}

	});

	return IngredientModel;

});