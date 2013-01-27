// Filename: src/js/views/store/selection/MenuUpgradeSelectionView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/menuUpgradeSelection/InfoView',
	'views/store/selection/SelectionView',
	'views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView'
	], function ($, _, Backbone, InfoView, SelectionView, MenuUpgradesView) {

	var MenuUpgradeSelectionView = SelectionView.extend({

		stageViewClass: MenuUpgradesView,

		infoViewClass: InfoView,
		
		prepare: function () {

			if (this.model.isMenuUpgradeBase()) {


				if (this.model.get('articleModel')) {

					this.active = true;

				}


				this.timelineItemsCollection.add({
					phrase: 'Waehle ein Menu Upgrade',
					menuUpgradeSelection: true
				});

			}

		}

	});

	return MenuUpgradeSelectionView;

});