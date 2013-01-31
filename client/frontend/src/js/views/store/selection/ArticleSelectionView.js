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
				phrase: 'Waehle deinen Artikel',
				locked: true
			});


			if (this.model.get('menuComponentBlockModel')) {
				this.active = true;
				this.timelineItemsCollection.add(timelineItemModel);
			} else {
				// just symbolizes base article
				timelineItemModel.set('disabled', true);
			}



		},

		listenForArticleSelection: function () {
			var menuComponentBlockModel = this.model.get('menuComponentBlockModel'),
				menuComponentOptionsCollection = menuComponentBlockModel.get('menuComponentOptionsCollection'),
				timelineItemModel = this.timelineItemsCollection.first(),
				menuComponentOptionArticlesCollection;

			_.each(menuComponentOptionsCollection.models, function (menuComponentOptionModel) {
				menuComponentOptionArticlesCollection = menuComponentOptionModel.get('menuComponentOptionArticlesCollection');

				_.each(menuComponentOptionArticlesCollection.models, function (menuComponentOptionArticleModel) {
					menuComponentOptionArticleModel.on('change:selected', function () {
						if (menuComponentOptionArticleModel.get('selected')) {
							timelineItemModel.set('locked', false);
						}
					});
				});
			});
		}

	});

	return ArticleSelectionView;

});