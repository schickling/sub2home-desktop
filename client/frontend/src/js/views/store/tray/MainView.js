// Filename: src/js/views/store/tray/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/store/tray/ControlView',
	'views/store/tray/CheckoutSettingsView',
	'views/store/tray/OrderedItemsView',
	'text!templates/store/tray/MainTemplate.html'
	], function ($, _, Backbone, PageView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'click .settings': 'showCheckoutSettings',
			// custom dom event because address needs to be checked first
			'hide .checkoutSettings': 'hideCheckoutSettings'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			new ControlView({
				el: this.$('#checkoutControls')
			});

			new CheckoutSettingsView({
				el: this.$('.checkoutSettings')
			});

			new OrderedItemsView({
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
				top: -535
			});
		}


	});

	return MainView;

});