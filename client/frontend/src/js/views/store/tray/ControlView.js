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
			'click .iCart': 'checkout',
			'mouseenter .settings': 'showSettingsIcon',
			'mouseleave .settings': 'hideSettingsIcon'
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
		},

		showSettingsIcon: function (e) {
			var $wrapperSpan = $(e.target),
				$textSpan = $wrapperSpan.find('span'),
				$icon = $wrapperSpan.find('i');

			$icon.delay(100).stop().animate({
				opacity: 1
			}, 300);

			$textSpan.stop().animate({
				marginRight: 50
			}, 400);
		},

		hideSettingsIcon: function (e) {
			var $wrapperSpan = $(e.target),
				$textSpan = $wrapperSpan.find('span'),
				$icon = $wrapperSpan.find('i');

			$icon.stop().animate({
				opacity: 0
			}, 300);

			$textSpan.stop().animate({
				marginRight: 0
			}, 400);
		}

	});

	return ControlView;

});