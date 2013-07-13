// Filename: src/js/views/store/selection/info/ingredientsSelection/InfoView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/InfoBaseView',
	'views/store/selection/info/ingredientsSelection/ArticleView',
	'views/store/selection/info/ingredientsSelection/IngredientCategoriesView',
	'views/store/selection/info/ingredientsSelection/IngredientsView',
	'text!templates/store/selection/info/ingredientsSelection/InfoTemplate.html'
	], function ($, _, Backbone, InfoBaseView, ArticleView, IngredientCategoriesView, IngredientsView, InfoTemplate) {

	"use strict";

	var InfoView = InfoBaseView.extend({

		template: _.template(InfoTemplate),

		renderContent: function () {

			var articleModel = this.model.get('articleModel');

			if (articleModel) {
				this.renderArticleView();

				if (articleModel.get('allowsIngredients')) {
					this.renderIngredientCategoriesView();
				}
			}
		},

		renderArticleView: function () {

			this.articleView = new ArticleView({
				model: this.model.get('articleModel'),
				el: this.$('.articleInfo'),
				selectionView: this.options.selectionView
			});

		},

		renderIngredientCategoriesView: function () {

			var articleModel = this.model.get('articleModel');

			this.ingredientCategoriesView = new IngredientCategoriesView({
				el: this.$('.ingredientInfo'),
				collection: articleModel.get('ingredientCategoriesCollection'),
				selectionView: this.options.selectionView
			});

		}

	});

	return InfoView;

});