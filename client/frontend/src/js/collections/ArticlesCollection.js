// Filename: src/js/collections/ArticlesCollection.js
define([
	'underscore',
	'backbone',
	'models/stateModel',
	'models/ArticleModel'
	], function (_, Backbone, stateModel, ArticleModel) {

	var ArticlesCollection = Backbone.Collection.extend({

		model: ArticleModel,

		url: function () {
			return '/api/frontend/stores/' + stateModel.get('storeAlias') + '/articles';
		},

		// combines footlong and 6inch subs
		combineArticles: function() {
			
		}
	});

	return ArticlesCollection;
});