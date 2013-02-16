// Filename: src/js/views/store/tray/OrderedArticleMenuView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/OrderedArticleMenuTemplate.html'
	], function ($, _, Backbone, OrderedArticleMenuTemplate) {

	var OrderedArticleMenuView = Backbone.View.extend({

		/*
		 * this.model: ArticleModel
		 */

		template: _.template(OrderedArticleMenuTemplate),

		className: 'menuItem',

		initialize: function () {
			this.render();
		},

		render: function () {

			var articleModel = this.model,
				description = articleModel.get('description');

			if (articleModel.hasIngredients()) {
				var ingredientCategoriesCollection = articleModel.get('ingredientCategoriesCollection'),
					ingredientModels = ingredientCategoriesCollection.getAllSelectedIngredientModels();

				for (var i = 0; i < ingredientModels.length; i++) {
					var ingredientTitle = ingredientModels[i].get('title');

					if (i > 0) {
						// if penulitmate ingredient
						if (i === ingredientModels.length - 1) {
							description += ' und ' + ingredientTitle;
						} else {
							description += ', ' + ingredientTitle;
						}
					} else {
						description = ingredientTitle;
					}
				}
			}

			var json = {
				title: articleModel.get('title'),
				image: articleModel.get('largeImage'),
				description: description
			};

			this.$el.html(this.template(json));
		}

	});

	return OrderedArticleMenuView;

});