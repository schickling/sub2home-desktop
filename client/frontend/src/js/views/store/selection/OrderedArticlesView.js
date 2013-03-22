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

		destroy: function () {
			this.stopListening();

			// needed since multiplee ordered articles are listening
			this.trigger('destroy');
		}

	});

	return OrderedArticlesView;

});