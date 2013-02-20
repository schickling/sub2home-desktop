define([
	'underscore',
	'backbone',
	'models/OrderedArticleModel'
	], function (_, Backbone, OrderedArticleModel) {

	var OrderedArticlesCollection = Backbone.Collection.extend({

		model: OrderedArticleModel

	});

	return OrderedArticlesCollection;
});