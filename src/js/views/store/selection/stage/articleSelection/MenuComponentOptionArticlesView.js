// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/articleSelection/MenuComponentOptionArticleView'
	], function ($, _, Backbone, MenuComponentOptionArticleView) {

	"use strict";

	var MenuComponentOptionArticlesView = Backbone.View.extend({

		orderedArticleModel: null,

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (menuComponentOptionArticleModel) {
				this._renderArticle(menuComponentOptionArticleModel);
			}, this);
		},

		_renderArticle: function (menuComponentOptionArticleModel) {
			var menuComponentOptionArticleView = new MenuComponentOptionArticleView({
				model: menuComponentOptionArticleModel,
				orderedArticleModel: this.orderedArticleModel,
				selectionView: this.options.selectionView
			});

			this.$el.append(menuComponentOptionArticleView.el);
		}

	});

	return MenuComponentOptionArticlesView;

});