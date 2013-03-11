// Filename: src/js/views/store/tray/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/cartModel',
    'views/PageView',
    'views/store/tray/DeliveryTimeView',
    'views/store/tray/CommentView',
    'views/store/tray/ControlView',
    'views/store/tray/CheckoutSettingsView',
    'views/store/tray/OrderedItemsView',
    'text!templates/store/tray/MainTemplate.html'
    ], function ($, _, Backbone, router, cartModel, PageView, DeliveryTimeView, CommentView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'click .settings': '_showCheckoutSettings',
			// custom dom event because address needs to be checked first
			'hide .checkoutSettings': '_hideCheckoutSettings'
		},

		// referenced sub views
		subViews: {
			controlView: null,
			deliveryTimeView: null
		},

		initialize: function () {
			// check if cart is not empty
			if (cartModel.getNumberOfOrderedItems() === 0) {
				router.navigate('store', {
					trigger: true,
					replace: true
				});
				return;
			}

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.subViews.controlView = new ControlView({
				el: this.$('#checkoutBasicControls')
			});

			this.subViews.deliveryTimeView = new DeliveryTimeView({
				el: this.$('.deliveryTimeDisplay')
			});

			new CommentView({
				el: this.$('.deliveryAdditionalNote')
			});

			new CheckoutSettingsView({
				el: this.$('.checkoutSettings')
			});

			new OrderedItemsView({
				el: this.$('.orderedItems')
			});

			this.append();

		},

		_showCheckoutSettings: function () {
			var $tray = this.$('.note.tray');

			$tray.animate({
				top: 0,
				scrollTop: 0
			});

		},

		_hideCheckoutSettings: function () {
			var $tray = this.$('.note.tray');

			$tray.animate({
				top: -535
			});
		}


	});

	return MainView;

});