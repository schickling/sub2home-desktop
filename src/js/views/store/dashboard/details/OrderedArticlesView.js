// Filename: src/js/views/store/dashboard/details/OrderedArticlesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/dashboard/details/OrderedArticleView'
	], function ($, _, Backbone, OrderedArticleView) {

	var OrderedArticlesView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (orderedArticleModel) {
				this._renderOrderedArticle(orderedArticleModel);
			}, this);
		},

		_renderOrderedArticle: function (orderedArticleModel) {
			var orderedArticleView = new OrderedArticleView({
				model: orderedArticleModel
			});

			this.$el.append(orderedArticleView.el);
		}

	});

	return OrderedArticlesView;

});