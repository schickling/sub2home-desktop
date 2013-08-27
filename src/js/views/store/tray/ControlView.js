// Filename: src/js/views/store/tray/ControlView.js
define([
    'jquery',
    'jqueryColor',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/ControlTemplate.html'
    ], function ($, jqueryColor, _, Backbone, router, notificationcenter, cartModel, ControlTemplate) {

	"use strict";

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .orderNow': '_checkout',
			'click #iAGB': '_acceptAGB',
			'click #credit.hasNoCredit': '_showTip',
			'click #credit .bAdd': '_increaseTip',
			'click #credit .bRemove': '_decreaseTip'
		},

		initialize: function () {
			this._render();
			this._listenForDataChanges();
		},

		orderIsLocked: false,

		_render: function () {

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
				isReady = addressModel.get('firstName') && addressModel.get('lastName') && addressModel.get('street'),
				json = {
					isReady: isReady,
					total: cartModel.getTotal() + cartModel.getTip(),
					hasTip: cartModel.getTip() > 0,
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					streetNumber: addressModel.get('streetNumber'),
					paymentMethod: paymentMethod,
					comment: cartModel.getComment()
				};

			this.$el.html(this.template(json));

			this.$el.toggleClass('accepted', cartModel.get('termsAccepted'));

			this.delegateEvents();

		},

		_listenForDataChanges: function () {
			this.listenTo(cartModel, 'change', this._render);
		},

		_acceptAGB: function () {
			var $iAGB = this.$('#iAGB'),
				$iCart = this.$('#iCart'),
				$notice = this.$('#acceptAGB');

			$notice.removeClass('leftHandBelow');

			$iAGB.fadeOut(100);

			$iCart.animate({
				'margin-right': 10,
				color: $.Color('rgba(156,200,62,0.4)')
			}, 150, function () {
				cartModel.set('termsAccepted', true);
			});
		},

		_checkout: function () {

			if (this.orderIsLocked) {
				return;
			}

			var orderModel = cartModel.get('orderModel'),
				self = this;

			if (!cartModel.isMinimumReached()) {
				notificationcenter.notify('views.store.tray.minimumNotReached');
				return;
			}

			if (!cartModel.get('termsAccepted')) {
				notificationcenter.notify('views.store.tray.termsNotAccepted');
				return;
			}

			this.orderIsLocked = true;

			orderModel.save({}, {
				success: function () {

					self._ringBell();

					cartModel.cleanUp();
					cartModel.set('isClosed', true);

					router.navigate('store/danke', {
						trigger: true,
						replace: true
					});
				},
				error: function () {
					notificationcenter.notify('views.store.tray.orderFailed');
					self.orderIsLocked = false;
				}
			});
		},

		_ringBell: function () {
			var sound = new Audio('https://d3uu6huyzvecb1.cloudfront.net/audio/bell.ogg'); // buffers automatically when created
			sound.play();
		},


		/*
		 * Tip methods
		 */

		_showTip: function () {
			var $credit = this.$('#credit'),
				$notice = $credit.find('.notice'),
				self = this;

			$notice.fadeOut(100, function () {
				$credit.animate({
					width: 100
				}, 300, function () {
					self._increaseTip();
				});
			});
		},

		_hideTip: function () {
			var $credit = this.$('#credit'),
				$notice = $credit.find('.notice'),
				orderModel = cartModel.get('orderModel');

			$credit.addClass('hasNoTip');

			$credit.animate({
				width: 45
			}, 300, function () {
				$notice.fadeIn(100, function () {
					orderModel.decreaseTip();
				});
			});
		},

		_increaseTip: function () {
			var orderModel = cartModel.get('orderModel');

			orderModel.increaseTip();
		},

		_decreaseTip: function () {
			var orderModel = cartModel.get('orderModel');

			if (orderModel.get('tip') <= 0.50) {
				this._hideTip();
			} else {
				orderModel.decreaseTip();
			}

		},

		destroy: function () {
			this.stopListening();
		}

	});

	return ControlView;

});