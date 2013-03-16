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
			'mouseenter': '_showControls',
			'mouseleave': '_hideControls'
		},

		// dom
		$pricetag: null,
		$controls: null,

		initialize: function () {
			this._render();
			this._cacheDom();
		},

		_render: function () {

			var orderedArticleModel = this.model.get('orderedArticlesCollection').first(),
				articleModel = orderedArticleModel.get('articleModel'),
				json = {
					title: articleModel.get('title'),
					image: articleModel.get('largeImage'),
					info: articleModel.get('info'),
					total: this.model.get('total') / this.model.get('amount'),
					amount: this.model.get('amount'),
					description: this._getDescription()
				};

			this.$el.html(this.template(json));

			this.$el.addClass('orderedArticle');
		},

		_cacheDom: function () {
			this.$pricetag = this.$('.pricetag');
			this.$controls = this.$('.controls');
		},

		_showControls: function () {
			this.$pricetag.stop().animate({
				right: 110
			}, 200);

			this.$controls.delay(100).stop().fadeIn(100);
		},

		_hideControls: function () {
			this.$pricetag.stop().animate({
				right: 15
			}, 200);

			this.$controls.stop().fadeOut(100);
		},

		_getDescription: function () {
			var orderedArticleModel = this.model.get('orderedArticlesCollection').first(),
				articleModel = orderedArticleModel.get('articleModel'),
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

			return description;
		}

	});

	return OrderedArticleSingleView;

});