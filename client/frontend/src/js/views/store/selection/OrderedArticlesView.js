// Filename: src/js/views/store/selection/OrderedArticlesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/OrderedArticleView'
	], function ($, _, Backbone, OrderedArticleView) {

	var OrderedArticlesView = Backbone.View.extend({

		initialize: function () {
			this._render();

			// listen for further ordered articles to be added
			this.collection.on('add', this._renderOrderedArticle, this);

		},

		_render: function () {
			_.each(this.collection.models, function (orderedArticleModel) {
				this._renderOrderedArticle(orderedArticleModel);
			}, this);
		},

		_renderOrderedArticle: function (orderedArticleModel) {
			var orderedArticleView = new OrderedArticleView({
				model: orderedArticleModel,
				el: this.$el
			});
		}

	});

	return OrderedArticlesView;

});