// Filename: src/js/views/store/tray/OrderedArticleSingleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/tray/OrderedArticleSingleTemplate.html'
	], function ($, _, Backbone, OrderedArticleSingleTemplate) {

	var OrderedArticleSingleView = Backbone.View.extend({

		template: _.template(OrderedArticleSingleTemplate),

		events: {
			'mouseenter': 'showControls',
			'mouseleave': 'hideControls'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.addClass('orderedArticle');

			var orderedArticleModel = this.model.get('orderedArticlesCollection').first(),
				articleModel = orderedArticleModel.get('articleModel'),
				description = articleModel.get('description');

			if (articleModel.get('allowsIngredients')) {
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
				total: this.model.get('total'),
				amount: this.model.get('amount'),
				description: description
			};

			this.$el.html(this.template(json));
		},

		showControls: function () {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 110
			}, 200);

			$controls.delay(100).stop().fadeIn(100);
		},

		hideControls: function () {
			var $pricetag = this.$('.pricetag'),
				$controls = this.$('.controls');

			$pricetag.stop().animate({
				right: 15
			}, 200);

			$controls.stop().fadeOut(100);
		}

	});

	return OrderedArticleSingleView;

});