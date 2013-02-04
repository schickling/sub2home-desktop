// Filename: src/js/collections/ArticlesCollection.js
define([
	'underscore',
	'backbone',
	'global',
	'models/ArticleModel'
	], function (_, Backbone, global, ArticleModel) {

	var ArticlesCollection = Backbone.Collection.extend({

		model: ArticleModel,

		url: function () {
			return '/api/frontend/stores/' + global.getStoreAlias() + '/articles';
		},

		// combines footlong and 6inch subs
		combineArticles: function() {
			
		}
	});

	return ArticlesCollection;
});