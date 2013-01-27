// Filename: src/js/collections/ItemsCollection.js
define([
	'underscore',
	'backbone',
	'models/ItemModel'
	], function (_, Backbone, ItemModel) {

	var ItemsCollection = Backbone.Collection.extend({
		model: ItemModel
	});

	return ItemsCollection;
});