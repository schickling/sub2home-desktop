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
			this._render();
		},

		_render: function () {

			var json = {
					title: this.model.get('title'),
					image: this.model.get('largeImage'),
					info: this.model.get('info'),
					description: this._getDescription()
				};

			this.$el.html(this.template(json));

			this.$el.addClass(this._getImageClass());
		},

		_getImageClass: function() {
			var image = this.model.get('largeImage'),
				imageWithoutFileExtension = image.substr(0, image.lastIndexOf('.'));

			return imageWithoutFileExtension.split('-').pop();
		},

		_getDescription: function () {
			var description = this.model.get('description');

			if (this.model.hasIngredients()) {
				var ingredientCategoriesCollection = this.model.get('ingredientCategoriesCollection'),
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

			return description;
		}

	});

	return OrderedArticleMenuView;

});