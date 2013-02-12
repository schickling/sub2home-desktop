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
			'click .iCart': '_checkout'
		},

		initialize: function () {
			this.render();

			this._listenForDataChanges();
		},

		render: function () {

			var paymentMethod = '';

			switch (cartModel.getPaymentMethod()) {
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

			var addressModel = cartModel.getCustomerAddressModel(),
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

		_listenForDataChanges: function () {
			var addressModel = cartModel.getCustomerAddressModel();

			addressModel.on('change', this.render, this);
			cartModel.on('change', this.render, this);
		},

		_checkout: function () {

			var orderModel = cartModel.get('orderModel');

			orderModel.save({}, {
				success: function () {
					orderModel.reset();

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