// Filename: src/js/models/ItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var ItemModel = Backbone.Model.extend({

		idAttribute: 'cid',

		defaults: {
			image: '../img/static/article_gray_big.png',
			attachedItemsCollection: null,
			isAttached: false
		}

	});

	return ItemModel;

});