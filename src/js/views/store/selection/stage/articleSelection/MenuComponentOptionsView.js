// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/selection/stage/SlideView',
    'views/store/selection/stage/articleSelection/MenuComponentOptionView'
    ], function ($, _, Backbone, SlideView, MenuComponentOptionView) {

	"use strict";

	var MenuComponentOptionsView = SlideView.extend({

		afterInitialize: function () {

			this.$el.addClass('menuComponentOptions');

			var menuComponentBlockModel = this.model.get('menuComponentBlockModel');

			this.collection = menuComponentBlockModel.get('menuComponentOptionsCollection');

			this._render();

			this._listenForArticleSelection();

			this._listenForDestory();

		},

		_render: function() {
			this._renderMenuComponentOptions();

			if (this.collection.length === 1) {
				this.$el.addClass('noFlag');
			}
		},

		_renderMenuComponentOptions: function () {

			_.each(this.collection.models, function (menuComponentOptionModel) {
				this._renderMenuComponentOption(menuComponentOptionModel);
			}, this);

		},

		_renderMenuComponentOption: function (menuComponentOptionModel) {
			var menuComponentOptionView = new MenuComponentOptionView({
				model: menuComponentOptionModel,
				orderedArticleModel: this.model,
				selectionView: this.options.selectionView
			});

			this.$el.append(menuComponentOptionView.el);
		},

		_listenForArticleSelection: function () {

			var menuComponentOptionsCollection = this.collection,
				self = this;

			// unmark other articles if one gets isSelected
			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel) {

				var menuComponentOptionArticlesCollection = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

				_.each(menuComponentOptionArticlesCollection.models, function (menuComponentOptionArticleModel) {

					self.listenTo(menuComponentOptionArticleModel, 'change:isSelected', function () {

						if (menuComponentOptionArticleModel.get('isSelected')) {

							_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModelToFilter) {

								var menuComponentOptionArticlesCollectionToFilter = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

								_.each(menuComponentOptionArticlesCollectionToFilter.models, function (menuComponentOptionArticleModelToFilter) {
									if (menuComponentOptionArticleModelToFilter.get('isSelected') && menuComponentOptionArticleModelToFilter !== menuComponentOptionArticleModel) {
										menuComponentOptionArticleModelToFilter.set('isSelected', false);
									}
								});

							});

						}

					}); // end listenTo

				});

			});

		},

		_listenForDestory: function () {
			this.options.selectionView.once('destroy', this.stopListening, this);
		}

	});

	return MenuComponentOptionsView;

});