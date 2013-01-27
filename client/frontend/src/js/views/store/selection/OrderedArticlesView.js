// Filename: src/js/views/store/selection/OrderedArticlesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/OrderedArticleView'
	], function ($, _, Backbone, OrderedArticleView) {

	var OrderedArticlesView = Backbone.View.extend({

		initialize: function () {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (orderedArticleModel) {
				this.renderOrderedArticle(orderedArticleModel);
			}, this);
		},

		renderOrderedArticle: function (orderedArticleModel) {
			var orderedArticleView = new OrderedArticleView({
				model: orderedArticleModel,
				el: this.$el
			});
		}

	});

	return OrderedArticlesView;

});