// Filename: src/js/collections/ArticlesCollection.js
define([
	'underscore',
	'backbone',
	'models/ArticleModel'
	], function (_, Backbone, ArticleModel) {

	var ArticlesCollection = Backbone.Collection.extend({

		model: ArticleModel

	});

	return ArticlesCollection;
});