// Filename: src/js/views/store/selection/OrderedArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/selection/ArticleSelectionView',
    'views/store/selection/IngredientsSelectionView',
    'views/store/selection/MenuUpgradeSelectionView'
    ], function ($, _, Backbone, ArticleSelectionView, IngredientsSelectionView, MenuUpgradeSelectionView) {

	"use strict";

	var OrderedArticleView = Backbone.View.extend({

		/*
		 * this.$el = $('.main')
		 *
		 * this.model = orderedArticle
		 */

		articleSelectionView: null,
		ingredientsSelectionView: null,
		menuUpgradeSelectionView: null,

		parentView: null,

		initialize: function () {

			this.parentView = this.options.parentView;

			this._render();

			// remove view if model was destoryed
			this.listenTo(this.model, 'destroy', this._remove);

			this.listenTo(this.model, 'articleModelWasSelected', this._renderIngredientsSelectionAgain);


			this._listenForDestory();

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
			this.menuUpgradeSelectionView = new MenuUpgradeSelectionView({
				model: this.model,
				el: this.$el
			});
		},

		_renderIngredientsSelectionAgain: function () {
			this.ingredientsSelectionView.trigger('destroy');
			this._renderIngredientsSelection();
		},

		_remove: function () {

			this.articleSelectionView.trigger('destroy');
			this.ingredientsSelectionView.trigger('destroy');
			this.menuUpgradeSelectionView.trigger('destroy');

		},

		_listenForDestory: function () {
			this.parentView.once('destroy', function () {
				this.stopListening();
				this._remove();
			}, this);
		}

	});

	return OrderedArticleView;

});