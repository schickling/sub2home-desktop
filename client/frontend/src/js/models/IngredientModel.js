define([
    'underscore',
    'backbone',
    'global'
    ], function (_, Backbone, global) {

	var IngredientModel = Backbone.Model.extend({

		defaults: {
			title: '',
			shortTitle: '',
			shortcut: '',
			largeImage: 'default',
			icon: '',
			isSelected: false,
			price: 0
		},

		urlRoot: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/ingredients/';
		}

	});

	return IngredientModel;

});