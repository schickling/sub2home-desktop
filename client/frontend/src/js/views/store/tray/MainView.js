// Filename: src/js/views/store/tray/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/cartModel',
    'views/PageView',
    'views/store/tray/ControlView',
    'views/store/tray/CheckoutSettingsView',
    'views/store/tray/OrderedItemsView',
    'text!templates/store/tray/MainTemplate.html'
    ], function ($, _, Backbone, router, cartModel, PageView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'click .settings': '_showCheckoutSettings',
			// custom dom event because address needs to be checked first
			'hide .checkoutSettings': '_hideCheckoutSettings'
		},

		// referenced sub views
		controlView: null,

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

			this._listenForDestory();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.controlView = new ControlView({
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
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.controlView.trigger('destroy');
			}, this);
		}


	});

	return MainView;

});