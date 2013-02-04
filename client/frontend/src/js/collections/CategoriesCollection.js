// Filename: src/js/collections/CategoriesCollection.js
define([
	'underscore',
	'backbone',
	'global',
	'models/CategoryModel'
	], function (_, Backbone, global, CategoryModel) {

	var CategoriesCollection = Backbone.Collection.extend({

		model: CategoryModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/categories';
		}

	});

	return CategoriesCollection;
});