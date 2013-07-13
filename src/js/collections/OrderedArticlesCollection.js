define([
	'underscore',
	'backbone',
	'models/OrderedArticleModel'
	], function (_, Backbone, OrderedArticleModel) {

	"use strict";

	var OrderedArticlesCollection = Backbone.Collection.extend({

		model: OrderedArticleModel

	});

	return OrderedArticlesCollection;
});