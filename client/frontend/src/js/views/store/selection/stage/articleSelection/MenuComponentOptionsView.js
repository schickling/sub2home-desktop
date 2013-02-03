// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/SlideView',
	'views/store/selection/stage/articleSelection/MenuComponentOptionView'
	], function ($, _, Backbone, SlideView, MenuComponentOptionView) {

	var MenuComponentOptionsView = SlideView.extend({

		afterInitialize: function () {

			this.$el.addClass('menuComponentOptions');

			var menuComponentBlockModel = this.model.get('menuComponentBlockModel');

			this.collection = menuComponentBlockModel.get('menuComponentOptionsCollection');

			this.renderMenuComponentOptions();

			this.listenForArticleSelection();
		},

		renderMenuComponentOptions: function () {

			this.collection.each(function (menuComponentOptionModel) {
				this.renderMenuComponentOption(menuComponentOptionModel);
			}, this);

		},

		renderMenuComponentOption: function (menuComponentOptionModel) {
			var menuComponentOptionView = new MenuComponentOptionView({
				model: menuComponentOptionModel,
				orderedArticleModel: this.model
			});

			this.$el.append(menuComponentOptionView.render().el);
		},

		listenForArticleSelection: function () {

			var menuComponentOptionsCollection = this.collection;

			// unmark other articles if one gets isSelected
			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel) {

				var menuComponentOptionArticlesCollection = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

				_.each(menuComponentOptionArticlesCollection.models, function (menuComponentOptionArticleModel) {

					menuComponentOptionArticleModel.on('change:isSelected', function () {

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

					});

				});

			});

		}

	});

	return MenuComponentOptionsView;

});