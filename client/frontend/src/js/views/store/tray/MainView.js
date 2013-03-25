// Filename: src/js/views/store/tray/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/cartModel',
    'views/PageView',
    'views/store/tray/NoDeliveryView',
    'views/store/tray/DeliveryTimeView',
    'views/store/tray/CommentView',
    'views/store/tray/SubcardView',
    'views/store/tray/FreeCookieView',
    'views/store/tray/ControlView',
    'views/store/tray/CheckoutSettingsView',
    'views/store/tray/OrderedItemsView',
    'text!templates/store/tray/MainTemplate.html'
    ], function ($, _, Backbone, router, cartModel, PageView, NoDeliveryView, DeliveryTimeView, CommentView, SubcardView, FreeCookieView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'click .settings': '_showCheckoutSettings',
			// custom dom event because address needs to be checked first
			'hide #checkoutSettings': '_hideCheckoutSettings'
		},

		pageTitle: 'Fast fertig - sub2home',

		// referenced sub views
		subViews: {
			controlView: null,
			deliveryTimeView: null
		},

		// cached dom
		$trayNote: null,

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

			this._cacheDom();

			new OrderedItemsView({
				el: this.$('#orderedItems')
			});

			// check if store is delivering
			cartModel.validateDueDate();

			if (this._storeIsDelivering()) {

				this.subViews.controlView = new ControlView({
					el: this.$('#checkoutBasicControls')
				});

				this.subViews.deliveryTimeView = new DeliveryTimeView({
					el: this.$('#deliveryTimeDisplay')
				});

				new CommentView({
					el: this.$('#deliveryAdditionalNote')
				});

				new SubcardView({
					el: this.$('#subcardOption')
				});

				new FreeCookieView({
					el: this.$('#gratisCookieOption')
				});

				new CheckoutSettingsView({
					el: this.$('#checkoutSettings')
				});

			} else {

				new NoDeliveryView({
					el: this.$('#checkoutControls')
				});
				
			}

			this.append();

		},

		_cacheDom: function () {
			this.$trayNote = this.$('#trayNote');
		},

		_showCheckoutSettings: function () {
			this.$trayNote.animate({
				top: 0,
				scrollTop: 0
			});
		},

		_hideCheckoutSettings: function () {
			this.$trayNote.animate({
				top: -535
			});
		},

		_storeIsDelivering: function () {
			cartModel.validateDueDate();

			return cartModel.getDueDate() !== null;
		}


	});

	return MainView;

});