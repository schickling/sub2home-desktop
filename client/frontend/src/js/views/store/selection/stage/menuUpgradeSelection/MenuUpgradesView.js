// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/SlideView',
	'views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView',
	'views/store/selection/stage/menuUpgradeSelection/NoUpgradeView'
	], function ($, _, Backbone, SlideView, MenuUpgradeView, NoUpgradeView) {

	var MenuUpgradesView = SlideView.extend({

		/*
		 * this.model: orderedArticleModel
		 */
		
		$menuUpgradesContainer: null,

		afterInitialize: function () {

			// add class
			this.$el.addClass('menuUpgrades');


			var articleModel = this.model.get('articleModel');
			this.collection = articleModel.get('menuUpgradesCollection');

			this.renderNoUpgradeView();
			this.renderMenuUpgrades();

		},

		adjustWidth: function () {
			this.$el.width(window.innerWidth - 301);
		},

		renderMenuUpgrades: function () {
			this.$menuUpgradesContainer = $('<div class="menuUpgradesContainer">');
			this.$el.append(this.$menuUpgradesContainer);

			this.collection.each(function (menuUpgradeModel) {
				this.renderMenuUpgrade(menuUpgradeModel);
			}, this);
		},

		renderMenuUpgrade: function (menuUpgradeModel) {
			var menuUpgradeView = new MenuUpgradeView({
				model: menuUpgradeModel,
				orderedArticleModel: this.model
			});

			this.$menuUpgradesContainer.append(menuUpgradeView.el);
		},

		renderNoUpgradeView: function () {

			var noUpgradeView = new NoUpgradeView({
				model: this.model
			});

			this.$el.append(noUpgradeView.el);
		}

	});

	return MenuUpgradesView;

});