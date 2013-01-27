// Filename: src/js/views/store/selection/ArticleSelectionView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/articleSelection/InfoView',
	'views/store/selection/SelectionView',
	'views/store/selection/stage/articleSelection/MenuComponentOptionsView'
	], function ($, _, Backbone, InfoView, SelectionView, MenuComponentOptionsView) {

	var ArticleSelectionView = SelectionView.extend({

		stageViewClass: MenuComponentOptionsView,

		infoViewClass: InfoView,

		prepare: function () {


			var timelineItem = {
				phrase: 'Waehle deinen Artikel'
			};

			if (this.model.get('menuComponentBlockModel')) {
				this.active = true;
			} else {
				timelineItem.disabled = true;
			}


			this.timelineItemsCollection.add(timelineItem);

		}

	});

	return ArticleSelectionView;

});