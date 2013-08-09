// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/MenuUpgradesView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/stage/SlideView',
	'views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView',
	'views/store/selection/stage/menuUpgradeSelection/NoUpgradeView'
	], function ($, _, Backbone, SlideView, MenuUpgradeView, NoUpgradeView) {

	"use strict";

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

			this._renderNoUpgradeView();
			this._renderMenuUpgrades();

		},

		// needs to be overwritten because of no upgrade
		adjustWidth: function () {
			this.$el.width(window.innerWidth - 301);
			this._centerVertically();
		},

		_renderMenuUpgrades: function () {
			this.$menuUpgradesContainer = $('<div class="menuUpgradesContainer">');
			this.$el.append(this.$menuUpgradesContainer);

			_.each(this.collection.models, function (menuUpgradeModel) {
				this._renderMenuUpgrade(menuUpgradeModel);
			}, this);
		},

		_renderMenuUpgrade: function (menuUpgradeModel) {
			var menuUpgradeView = new MenuUpgradeView({
				model: menuUpgradeModel,
				orderedArticleModel: this.model
			});

			this.$menuUpgradesContainer.append(menuUpgradeView.el);
		},

		_renderNoUpgradeView: function () {

			var noUpgradeView = new NoUpgradeView({
				model: this.model
			});

			this.$el.append(noUpgradeView.el);
		},

		_centerVertically: function () {
			var $menuUpgradesContainer = this.$('.menuUpgradesContainer'),
				slideHeight = this.$el.height(),
				menuUpgradesHeight = $menuUpgradesContainer.height(),
				marginTop = (slideHeight - menuUpgradesHeight) / 2;

			$menuUpgradesContainer.css({
				marginTop: marginTop
			});
		}

	});

	return MenuUpgradesView;

});