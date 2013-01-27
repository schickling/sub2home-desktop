define([
	'underscore',
	'backbone',
	'models/OrderedArticleModel'
	], function (_, Backbone, OrderedArticleModel) {

	var OrderedArticlesCollection = Backbone.Collection.extend({

		model: OrderedArticleModel,

		destroy: function () {
			this.each(function (orderedArticleModel) {
				orderedArticleModel.destroy();
			});
		}

	});

	return OrderedArticlesCollection;
});