// Filename: src/js/collections/ArticlesCollection.js
define([
	'underscore',
	'backbone',
	'global',
	'models/ArticleModel'
	], function (_, Backbone, global, ArticleModel) {

	var ArticlesCollection = Backbone.Collection.extend({

		model: ArticleModel

	});

	return ArticlesCollection;
});