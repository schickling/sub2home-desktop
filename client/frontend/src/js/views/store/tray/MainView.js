// Filename: src/js/views/store/tray/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/OrderModel',
	'models/stateModel',
	'models/cartModel',
	'views/PageView',
	'views/store/tray/CheckoutSettingsView',
	'views/store/tray/OrderedItemsView',
	'text!templates/store/tray/MainTemplate.html'
	], function ($, _, Backbone, router, OrderModel, stateModel, cartModel, PageView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'click .deliveryAddress': 'showCheckoutSettings',
			'click #save': 'hideCheckoutSettings',
			'click .iCart': 'checkout'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			var checkoutSettingsView = new CheckoutSettingsView({
				el: this.$('.checkoutSettings')
			});

			var orderedItemsView = new OrderedItemsView({
				el: this.$('.orderedItems')
			});

			this.append();

		},

		showCheckoutSettings: function () {
			var $tray = this.$('.note.tray');

			$tray.animate({
				top: 0,
				scrollTop: 0
			});

		},

		hideCheckoutSettings: function () {
			var $tray = this.$('.note.tray');

			$tray.animate({
				top: -475
			});
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

	return MainView;

});