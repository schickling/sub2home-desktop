// Filename: src/js/views/store/tray/ControlView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/OrderModel',
	'models/stateModel',
	'models/cartModel',
	'text!templates/store/tray/ControlTemplate.html'
	], function ($, _, Backbone, router, OrderModel, stateModel, cartModel, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .iCart': 'checkout'
		},

		initialize: function () {
			this.render();

			this.listenForDataChanges();
		},

		render: function () {

			var paymentMethod;

			switch (cartModel.get('paymentMethod')) {
			case 'cash':
				paymentMethod = 'in Bar';
				break;
			case 'ec':
				paymentMethod = 'mit EC Karte';
				break;
			case 'paypal':
				paymentMethod = 'via Paypal';
				break;
			}

			var addressModel = cartModel.get('addressModel'),
				ready = addressModel.get('firstName') && addressModel.get('lastName') && addressModel.get('street'),
				json = {
					ready: ready,
					total: cartModel.get('total'),
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					paymentMethod: paymentMethod
				};

			this.$el.html(this.template(json));
		},

		listenForDataChanges: function () {
			var addressModel = cartModel.get('addressModel');

			addressModel.on('change', this.render, this);
			cartModel.on('change', this.render, this);
		},

		checkout: function () {

			var orderedItemsCollection = cartModel.get('orderedItemsCollection');

			var orderModel = new OrderModel({
				addressModel: cartModel.get('addressModel'),
				orderedItemsCollection: orderedItemsCollection,
				payment: 'paypal',
				total: cartModel.get('total'),
				credit: 5.87
			});

			orderModel.save({}, {
				success: function () {
					orderedItemsCollection.reset();

					console.log(cartModel.toJSON());

					router.navigate('store/danke', {
						trigger: true,
						replace: true
					});
				},
				error: function (error, b) {
					console.log(b);
				}
			});
		}

	});

	return ControlView;

});