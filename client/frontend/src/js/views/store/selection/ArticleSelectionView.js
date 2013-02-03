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

		stageViewClass: MenuComponentOptionsView,

		infoViewClass: InfoView,

		prepare: function () {

			var timelineItemModel = new TimelineItemModel({
				phrase: 'Waehle deinen Artikel'
			});


			if (this.model.get('menuComponentBlockModel')) {
				this.active = true;
				timelineItemModel.set('locked', true);
				this.listenForArticleSelection();
			} else {
				// just symbolizes base article
				timelineItemModel.set('disabled', true);
			}


			this.timelineItemsCollection.add(timelineItemModel);

		},

		listenForArticleSelection: function () {
			var menuComponentBlockModel = this.model.get('menuComponentBlockModel'),
				menuComponentOptionsCollection = menuComponentBlockModel.get('menuComponentOptionsCollection'),
				timelineItemsCollection = this.timelineItemsCollection,
				timelineItemModel, menuComponentOptionArticlesCollection;

			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel) {
				menuComponentOptionArticlesCollection = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

				_.each(menuComponentOptionArticlesCollection.models, function (menuComponentOptionArticleModel) {
					menuComponentOptionArticleModel.on('change:isSelected', function () {
						if (menuComponentOptionArticleModel.get('isSelected')) {
							timelineItemModel = timelineItemModel = timelineItemsCollection.first();
							timelineItemModel.set('locked', false);
						}
					});
				});
			});
		}

	});

	return ArticleSelectionView;

});