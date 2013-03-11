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
			this.listenTo(this.collection, 'add', this._renderOrderedArticle);

			this._listenForDestory();

		},

		_render: function () {
			_.each(this.collection.models, function (orderedArticleModel) {
				this._renderOrderedArticle(orderedArticleModel);
			}, this);
		},

		_renderOrderedArticle: function (orderedArticleModel) {
			var orderedArticleView = new OrderedArticleView({
				model: orderedArticleModel,
				parentView: this,
				el: this.$el
			});
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.stopListening();
			}, this);
		}

	});

	return OrderedArticlesView;

});