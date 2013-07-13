// Filename: src/js/views/store/assortment/menuBundles/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView'
    ], function ($, _, Backbone, ControlBaseView) {

	"use strict";

	var ControlView = ControlBaseView.extend({

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllMenus'
		},

		_countItems: function () {
			this.numberOfItems = this.collection.length;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (menuBundleModel) {

					// check if price reset is needed
					if (menuBundleModel.get('price') !== menuBundleModel.get('customPrice')) {
						this._updateModel(menuBundleModel, {
							customPrice: menuBundleModel.get('price')
						});
					}

			}, this);

			this._updateLoadBar();

		},

		_showAllMenus: function () {
			_.each(this.collection.models, function (menuBundleModel) {

					// check if activation needed
					if (!menuBundleModel.get('isActive')) {
						this._updateModel(menuBundleModel, {
							isActive: true
						});
					}

			}, this);

			this._updateLoadBar();

		}

	});

	return ControlView;

});