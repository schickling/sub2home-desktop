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
    'views/store/tray/MinimumValueView',
    'views/store/tray/FreeCookieView',
    'views/store/tray/ControlView',
    'views/store/tray/CheckoutSettingsView',
    'views/store/tray/OrderedItemsView',
    'text!templates/store/tray/MainTemplate.html'
    ], function ($, _, Backbone, router, cartModel, PageView, NoDeliveryView, DeliveryTimeView, CommentView, SubcardView, MinimumValueView, FreeCookieView, ControlView, CheckoutSettingsView, OrderedItemsView, MainTemplate) {

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
			deliveryTimeView: null,
			minimumValueView: null
		},

		// cached dom
		$checkoutSettings: null,
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

			if (this._storeIsDelivering()) {

				this.subViews.controlView = new ControlView({
					el: this.$('#checkoutBasicControls')
				});

				this.subViews.deliveryTimeView = new DeliveryTimeView({
					el: this.$('#deliveryTimeDisplay')
				});

				this.subViews.minimumValueView = new MinimumValueView({
					el: this.$('#minimumOrderValue')
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
					el: this.$checkoutSettings
				});

			} else {

				new NoDeliveryView({
					el: this.$('#checkoutControls')
				});

			}

			this.append();

		},

		_cacheDom: function () {
			this.$checkoutSettings = this.$('#checkoutSettings');
			this.$trayNote = this.$('#trayNote');
		},

		_showCheckoutSettings: function () {

			var $checkoutSettings = this.$checkoutSettings,
				$trayNote = this.$trayNote;

			$checkoutSettings.css({
				height: 'auto'
			});

			var scrollTop = $trayNote.scrollTop() + $checkoutSettings.height();

			$trayNote.animate({
				scrollTop: scrollTop
			});

		},

		_hideCheckoutSettings: function () {

			var $checkoutSettings = this.$checkoutSettings,
				$trayNote = this.$trayNote,
				scrollTop = $trayNote.scrollTop() - $checkoutSettings.height();

			$trayNote.animate({
				scrollTop: scrollTop
			}, function () {
				$checkoutSettings.css({
					height: 0
				});
			});

		},

		_storeIsDelivering: function () {
			cartModel.validateDueDate();

			return cartModel.getDueDate() !== null;
		}


	});

	return MainView;

});