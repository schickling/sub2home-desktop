// Filename: src/js/views/store/tray/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'views/PageView',
	'views/store/tray/CheckoutSettingsView',
	'views/store/tray/OrderedItemsView',
	'text!templates/store/tray/MainTemplate.html'
	], function ($, _, Backbone, router, PageView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

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
			router.navigate('store/danke', {
				trigger: true,
				replace: true
			});
		}


	});

	return MainView;

});