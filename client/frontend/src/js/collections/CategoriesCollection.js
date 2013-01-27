// Filename: src/js/collections/CategoriesCollection.js
define([
	'underscore',
	'backbone',
	'models/stateModel',
	'models/CategoryModel'
	], function (_, Backbone, stateModel, CategoryModel) {

	var CategoriesCollection = Backbone.Collection.extend({

		model: CategoryModel,

		url: function () {
			return '/api/stores/' + stateModel.get('storeAlias') + '/categories';
		}

	});

	return CategoriesCollection;
});