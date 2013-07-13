// Filename: src/js/views/store/assortment/ArticlesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/articles/ArticleView'
	], function ($, _, Backbone, ArticleView) {

	"use strict";

	var ArticlesView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (articleModel) {
				this._renderArticle(articleModel);
			}, this);
		},

		_renderArticle: function (articleModel) {
			var articleView = new ArticleView({
				model: articleModel
			});

			this.$el.append(articleView.el);
		}

	});

	return ArticlesView;

});