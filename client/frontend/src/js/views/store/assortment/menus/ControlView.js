// Filename: src/js/views/store/assortment/menus/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ControlBaseView',
    'text!templates/store/assortment/menus/ControlTemplate.html'
    ], function ($, _, Backbone, ControlBaseView, ControlTemplate) {

	var ControlView = ControlBaseView.extend({

		template: ControlTemplate,

		events: {
			'click .bReset': '_resetAllPrices',
			'click .showAll': '_showAllMenus'
		},

		_countItems: function () {
			this.numberOfItems = this.collection.length;
		},

		_resetAllPrices: function () {
			_.each(this.collection.models, function (menuModel) {

					// check if price reset is needed
					if (menuModel.get('price') !== menuModel.get('customPrice')) {
						this._updateModel(menuModel, {
							customPrice: menuModel.get('price')
						});
					}

			}, this);

			this._updateLoadBar();

		},

		_showAllMenus: function () {
			_.each(this.collection.models, function (menuModel) {

					// check if activation needed
					if (menuModel.get('isActive')) {
						this._updateModel(menuModel, {
							isActive: true
						});
					}

			}, this);

			this._updateLoadBar();

		}

	});

	return ControlView;

});