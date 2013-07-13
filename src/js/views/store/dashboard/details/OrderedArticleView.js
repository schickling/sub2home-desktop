// Filename: src/js/views/store/dashboard/details/OrderedArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/dashboard/details/IngredientCategoriesView',
    'text!templates/store/dashboard/details/OrderedArticleTemplate.html'
    ], function ($, _, Backbone, IngredientCategoriesView, OrderedArticleTemplate) {

	"use strict";

	var OrderedArticleView = Backbone.View.extend({

		className: 'orderedArticle',

		template: _.template(OrderedArticleTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var orderedArticleModel = this.model,
				articleModel = orderedArticleModel.get('articleModel');

			var json = {
				title: articleModel.get('title')
			};

			this.$el.html(this.template(json));

			if (articleModel.hasIngredients()) {
				this._renderIngredientCategories();
			}
		},

		_renderIngredientCategories: function () {
			var articleModel = this.model.get('articleModel'),
				ingredientCategoriesCollection = articleModel.get('ingredientCategoriesCollection');

			new IngredientCategoriesView({
				el: this.$('.articleIngredients'),
				collection: ingredientCategoriesCollection
			});
		}

	});

	return OrderedArticleView;

});