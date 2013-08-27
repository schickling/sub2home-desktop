// Filename: src/js/views/store/selection/MenuUpgradeSelectionView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/selection/info/menuUpgradeSelection/InfoView',
    'views/store/selection/SelectionView',
    'views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView'
    ], function ($, _, Backbone, InfoView, SelectionView, MenuUpgradesView) {

	"use strict";

	var MenuUpgradeSelectionView = SelectionView.extend({

		stageViewClass: MenuUpgradesView,

		infoViewClass: InfoView,

		_prepare: function () {

			var articleModel = this.model.get('articleModel');


			if (this.model.isMenuUpgradeBase() && articleModel.get('allowsMenuUpgrades')) {

				var menuUpgradesCollection = articleModel.get('menuUpgradesCollection');

				if (menuUpgradesCollection && menuUpgradesCollection.length > 0) {

					this.active = true;

					this.timelineItemsCollection.add({
						phrase: 'Mach\'s zum Menü',
						menuUpgradeSelection: true,
						icon: 'iMenuUpgrade',
						image: 'https://d3uu6huyzvecb1.cloudfront.net/images/common/menuupgrade.png'
					});


					this._listenForSelection();

				}

			}

		},

		_listenForSelection: function () {

			var baseOrderedArticleModel = this.model;

			// listen for new menu upgrade selection
			this.listenTo(baseOrderedArticleModel, 'change:menuUpgradeModel', function () {
				if (baseOrderedArticleModel.get('menuUpgradeModel')) {
					this._selectMenuUpgrade(baseOrderedArticleModel.get('menuUpgradeModel'));
				}
			});

		},

		_selectMenuUpgrade: function (menuUpgradeModel) {

			var orderedArticlesCollection = this.model.collection,
				orderedItemModel = this.model.get('orderedItemModel'),
				menuComponentBlocksCollection = menuUpgradeModel.get('menuComponentBlocksCollection');

			// remove ordered articles belonging to an old menu upgrade
			orderedItemModel.reduceOrderedArticles();

			// create new ordered articles for each menu component block
			_.each(menuComponentBlocksCollection.models, function (menuComponentBlockModel) {

				orderedArticlesCollection.add({
					menuComponentBlockModel: menuComponentBlockModel,
					orderedItemModel: orderedItemModel
				});

			});

		}

	});

	return MenuUpgradeSelectionView;

});