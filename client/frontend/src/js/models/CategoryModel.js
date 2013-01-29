// Filename: src/js/models/CategoryModel.js
define([
	'underscore',
	'backbone',
	'collections/ItemsCollection'
	], function (_, Backbone, ItemsCollection) {

	var CategoryModel = Backbone.Model.extend({

		defaults: {
			itemsCollection: null,

			smallImage: '',
			icon: ''
		},

		parse: function (response) {
			if (response.hasOwnProperty('itemsCollection')) {
				response.itemsCollection = new ItemsCollection(response.itemsCollection);
			}

			return response;
		}

	});

	return CategoryModel;

});