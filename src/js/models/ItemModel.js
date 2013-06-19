// Filename: src/js/models/ItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var ItemModel = Backbone.Model.extend({

		idAttribute: 'cid',

		defaults: {
			attachedItemsCollection: null,
			isAttached: false
		}

	});

	return ItemModel;

});