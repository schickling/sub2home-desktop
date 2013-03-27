// Filename: src/js/views/store/assortment/menuUpgrades/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView'
    ], function ($, _, Backbone, ControlBaseView) {

	var ControlView = ControlBaseView.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllMenus'
		},

		_countItems: function () {
			this.numberOfItems = this.collection.length;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (menuUpgradeModel) {

					// check if price reset is needed
					if (menuUpgradeModel.get('price') !== menuUpgradeModel.get('customPrice')) {
						this._updateModel(menuUpgradeModel, {
							customPrice: menuUpgradeModel.get('price')
						});
					}

			}, this);

			this._updateLoadBar();

		},

		_showAllMenus: function () {
			_.each(this.collection.models, function (menuUpgradeModel) {

					// check if activation needed
					if (!menuUpgradeModel.get('isActive')) {
						this._updateModel(menuUpgradeModel, {
							isActive: true
						});
					}

			}, this);

			this._updateLoadBar();

		}

	});

	return ControlView;

});