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
			this._render();

			// remove view if model was destoryed
			this.model.on('destroy', this._remove, this);

			this.model.on('articleModelWasSelected', this._renderIngredientsSelectionAgain, this);

		},

		_render: function () {

			this._renderArticleSelection();
			this._renderIngredientsSelection();
			this._renderMenuUpgradeSelection();

		},

		_renderArticleSelection: function () {
			this.articleSelectionView = new ArticleSelectionView({
				model: this.model,
				el: this.$el
			});
		},

		_renderIngredientsSelection: function () {
			this.ingredientsSelectionView = new IngredientsSelectionView({
				model: this.model,
				el: this.$el
			});
		},

		_renderMenuUpgradeSelection: function () {
			var articleModel = this.model.get('articleModel');

			if (articleModel && articleModel.get('allowsMenuUpgrades') && articleModel.get('menuUpgradesCollection').length > 0) {
				this.menuUpgradeSelectionView = new MenuUpgradeSelectionView({
					model: this.model,
					el: this.$el
				});
			}
		},

		_renderIngredientsSelectionAgain: function() {
			this.ingredientsSelectionView.remove();
			this._renderIngredientsSelection();
		},

		_remove: function () {

			this.articleSelectionView.remove();
			this.ingredientsSelectionView.remove();
			this.menuUpgradeSelectionView.remove();

		}

	});

	return OrderedArticleView;

});