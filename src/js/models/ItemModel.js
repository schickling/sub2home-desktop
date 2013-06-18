// Filename: src/js/models/ItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var ItemModel = Backbone.Model.extend({

		idAttribute: 'cid',

		defaults: {
			image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/static/categories/smallimages/getraenk.png/static/article_gray_big.png',
			attachedItemsCollection: null,
			isAttached: false
		}

	});

	return ItemModel;

});