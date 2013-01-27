// Filename: src/js/models/ItemModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	var ItemModel = Backbone.Model.extend({

		defaults: {
			image: '../img/static/article_gray_big.png'
		}

	});

	return ItemModel;

});