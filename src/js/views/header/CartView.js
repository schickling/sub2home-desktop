// Filename: src/js/views/header/CartView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'notificationcenter',
	'models/stateModel',
	'models/cartModel',
	'text!templates/header/CartTemplate.html'
	], function ($, _, Backbone, router, notificationcenter, stateModel, cartModel, CartTemplate) {

	"use strict";

	var CartView = Backbone.View.extend({

		template: _.template(CartTemplate),

		events: {
			'click': '_goToTray'
		},

		initialize: function () {
			this.model = cartModel;

			this._render();

			this._listenToNewDeliveryArea();

			this.model.on('change', this._render, this);
		},

		_listenToNewDeliveryArea: function() {
			var storeModel = stateModel.get('storeModel');

			// listen to store model is enough since store models get changed
			// if a new delivery area is selected
			storeModel.on('change', this._render, this);
		},

		_render: function () {

			var storeModel = stateModel.get('storeModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel(),
				amount = this.model.getNumberOfOrderedItems(),
				json = {
					amount: amount,
					minimum: selectedDeliveryAreaModel.get('minimumValue'),
					total: this.model.getTotal()
				};

			this.$el.html(this.template(json));

			this.$el.toggleClass('filled', (amount > 0));
		},

		_goToTray: function () {
			if (this.model.getNumberOfOrderedItems() > 0) {
				router.navigate('store/tablett', true);
			} else {
				notificationcenter.notify('views.header.cart.empty');
			}
		}

	});

	return CartView;

});