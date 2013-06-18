// Filename: src/js/views/store/selection/ArticleSelectionView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/TimelineItemModel',
    'views/store/selection/info/articleSelection/InfoView',
    'views/store/selection/SelectionView',
    'views/store/selection/stage/articleSelection/MenuComponentOptionsView'
    ], function ($, _, Backbone, TimelineItemModel, InfoView, SelectionView, MenuComponentOptionsView) {

	var ArticleSelectionView = SelectionView.extend({

		/*
		 * this.$el = $('.main')
		 *
		 * this.model = orderedArticle
		 */

		className: 'articleSelection',

		stageViewClass: MenuComponentOptionsView,

		infoViewClass: InfoView,

		prepare: function () {

			var timelineItemModel = new TimelineItemModel(),
				menuComponentBlockModel = this.model.get('menuComponentBlockModel'),
				articleModel = this.model.get('articleModel');



			if (menuComponentBlockModel) {
				this.active = true;

				timelineItemModel.set({
					isLocked: articleModel === null,
					icon: menuComponentBlockModel.get('icon'),
					image: menuComponentBlockModel.get('smallImage'),
					phrase: this._getTitle()
				});

				this._listenForArticleSelection();

			} else {


				// just symbolizes base article
				timelineItemModel.set({
					isDisabled: true,
					wasVisited: true,
					image: articleModel.get('smallImage')
				});
			}


			this.timelineItemsCollection.add(timelineItemModel);

		},

		_listenForArticleSelection: function () {
			var orderedArticleModel = this.model,
				menuComponentBlockModel = orderedArticleModel.get('menuComponentBlockModel'),
				menuComponentOptionsCollection = menuComponentBlockModel.get('menuComponentOptionsCollection'),
				timelineItemsCollection = this.timelineItemsCollection,
				timelineItemModel, menuComponentOptionArticlesCollection;

			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel) {
				menuComponentOptionArticlesCollection = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

				_.each(menuComponentOptionArticlesCollection.models, function (menuComponentOptionArticleModel) {

					this.listenTo(menuComponentOptionArticleModel, 'change:isSelected', function () {

						if (menuComponentOptionArticleModel.get('isSelected')) {
							timelineItemModel = timelineItemsCollection.first();
							timelineItemModel.set('isLocked', false);
							orderedArticleModel.trigger('articleModelWasSelected');
						}

					});

				}, this);
			}, this);
		},

		_getTitle: function () {
			var menuComponentBlockModel = this.model.get('menuComponentBlockModel'),
				menuComponentOptionsCollection = menuComponentBlockModel.get('menuComponentOptionsCollection'),
				menuComponentOptionTitle, title;

			if (menuComponentOptionsCollection.length === 1) {
				title = 'Wähle dein ';
			} else {
				title = 'Wähle zwischen ';
			}

			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel, index) {

				menuComponentOptionTitle = menuComponentOptionModel.get('title');

				if (index === 0) {
					title += menuComponentOptionTitle;
				} else if (index === (menuComponentOptionsCollection.length - 1)) {
					title += ' oder ' + menuComponentOptionTitle;
				} else {
					title += ', ' + menuComponentOptionTitle;
				}

			});

			return title;
		}

	});

	return ArticleSelectionView;

});