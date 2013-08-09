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

		$slidesWrapper: null,
		$infoWrapper: null,

		initialize: function () {

			this.parentView = this.options.parentView;

			this._render();

			// remove view if model was destoryed
			this.listenTo(this.model, 'destroy', this._remove);

			this.listenTo(this.model, 'articleModelWasSelected', this._renderIngredientsSelectionAgain);


			this._listenForDestory();

		},

		_render: function () {

			this._createWrapperElements();
			this._renderArticleSelection();
			this._renderIngredientsSelection();
			this._renderMenuUpgradeSelection();

		},

		_createWrapperElements: function () {
			this._createContentWrapper();
			this._createInfoWrapper();
		},

		_createContentWrapper: function () {
			var $stage = this.$('#stage'),
				$slidesWrapper = $('<div class="slidesWrapper">');

			$stage.append($slidesWrapper);

			this.$slidesWrapper = $slidesWrapper;
		},

		_createInfoWrapper: function () {
			var $infoContainer = this.$('#infoContainer'),
				$infoWrapper = $('<div class="infoWrapper">');

			$infoContainer.append($infoWrapper);

			this.$infoWrapper = $infoWrapper;
		},

		_renderArticleSelection: function () {
			this.articleSelectionView = new ArticleSelectionView({
				model: this.model,
				el: this.$el,
				$slidesWrapper: this.$slidesWrapper,
				$infoWrapper: this.$infoWrapper,
			});
		},

		_renderIngredientsSelection: function (timelineElementInsertIndex, timelineItemInsertIndex) {
			this.ingredientsSelectionView = new IngredientsSelectionView({
				model: this.model,
				el: this.$el,
				$slidesWrapper: this.$slidesWrapper,
				$infoWrapper: this.$infoWrapper,
				timelineElementInsertIndex: timelineElementInsertIndex,
				timelineItemInsertIndex: timelineItemInsertIndex,
			});
		},

		_renderMenuUpgradeSelection: function () {
			this.menuUpgradeSelectionView = new MenuUpgradeSelectionView({
				model: this.model,
				el: this.$el,
				$slidesWrapper: this.$slidesWrapper,
				$infoWrapper: this.$infoWrapper,
			});
		},

		_renderIngredientsSelectionAgain: function () {
			var $prevSlidesWrappers = this.$slidesWrapper.prevAll(),
				timelineElementInsertIndex = $prevSlidesWrappers.children('.slideContainer').length + 1,
				timelineItemInsertIndex = $prevSlidesWrappers.find('.slide').length + 1;

			if (this.model.isMenuUpgradeBase()) {
				timelineElementInsertIndex++;
				timelineItemInsertIndex++;
			}

			this.ingredientsSelectionView.trigger('destroy');
			this._renderIngredientsSelection(timelineElementInsertIndex, timelineItemInsertIndex);
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