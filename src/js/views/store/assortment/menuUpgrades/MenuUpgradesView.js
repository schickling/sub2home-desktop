// Filename: src/js/views/store/assortment/menuUpgrades/MenuUpgradesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MenuUpgradesCollection',
    'views/store/assortment/SectionBaseView',
    'views/store/assortment/menuUpgrades/MenuUpgradeView',
    'views/store/assortment/menuUpgrades/ControlView'
    ], function ($, _, Backbone, MenuUpgradesCollection, SectionBaseView, MenuUpgradeView, ControlView) {

	"use strict";

	var MenuUpgradesView = SectionBaseView.extend({

		controlViewClass: ControlView,
		collectionClass: MenuUpgradesCollection,

		className: 'menuUpgrades',

		_fetchCollection: function () {
			var self = this;

			this.collection.fetch({
				success: function () {
					self._renderContent();
				}
			});
		},

		_renderContent: function () {
			_.each(this.collection.models, function (menuUpgradeModel) {
				this._renderMenuUpgrade(menuUpgradeModel);
			}, this);
		},

		_renderMenuUpgrade: function (menuUpgradeModel) {
			var menuUpgradeView = new MenuUpgradeView({
				model: menuUpgradeModel
			});

			this.$content.append(menuUpgradeView.el);
		}

	});

	return MenuUpgradesView;

});