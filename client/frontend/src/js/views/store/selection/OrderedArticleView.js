// Filename: src/js/views/store/selection/OrderedArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/ArticleSelectionView',
	'views/store/selection/IngredientsSelectionView',
	'views/store/selection/MenuUpgradeSelectionView'
	], function ($, _, Backbone, ArticleSelectionView, IngredientsSelectionView, MenuUpgradeSelectionView) {

	var OrderedArticleView = Backbone.View.extend({

		/*
		 * this.$el = $('.main')
		 *
		 * this.model = orderedArticle
		 */

		articleSelectionView: null,

		ingredientsSelectionView: null,

		menuUpgradeSelectionView: null,

		initialize: function () {
			this.render();

			// remove view if model was destoryed
			this.model.on('destroy', this.remove, this);

		},

		render: function () {

			this.renderArticleSelection();
			this.renderIngredientsSelection();
			this.renderMenuUpgradeSelection();

		},

		renderArticleSelection: function () {
			this.articleSelectionView = new ArticleSelectionView({
				model: this.model,
				el: this.$el
			});
		},

		renderIngredientsSelection: function () {
			this.ingredientsSelectionView = new IngredientsSelectionView({
				model: this.model,
				el: this.$el
			});
		},

		renderMenuUpgradeSelection: function () {
			var articleModel = this.model.get('articleModel');

			if (articleModel && articleModel.get('allowsMenuUpgrades') && articleModel.get('menuUpgradesCollection').length > 0) {
				this.menuUpgradeSelectionView = new MenuUpgradeSelectionView({
					model: this.model,
					el: this.$el
				});
			}
		},

		remove: function () {

			this.articleSelectionView.remove();
			this.ingredientsSelectionView.remove();
			this.menuUpgradeSelectionView.remove();

		}

	});

	return OrderedArticleView;

});