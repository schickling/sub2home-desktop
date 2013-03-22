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

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .orderNow': '_checkout',
			'click #iAGB': '_acceptAGB',
			'click #credit.hasNoCredit': '_showCredit',
			'click #credit .bAdd': '_increaseCredit',
			'click #credit .bRemove': '_decreaseCredit'
		},

		initialize: function () {
			this._render();
			this._listenForDataChanges();
		},

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
					total: cartModel.getTotal() + cartModel.getCredit(),
					hasCredit: cartModel.getCredit() > 0,
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					paymentMethod: paymentMethod,
					comment: cartModel.getComment()
				};

			this.$el.html(this.template(json));

			this.$el.toggleClass('accepted', cartModel.get('termsAccepted'));

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

			$iCart.addClass('clickable').animate({
				right: 10,
				color: $.Color('rgba(156,200,62,0.4)')
			}, 250, function () {
				cartModel.set('termsAccepted', true);
			});
		},

		_checkout: function () {

			var orderModel = cartModel.get('orderModel'),
				self = this;

			if (!cartModel.isMinimumReached()) {
				notificationcenter.notify('views.store.tray.minimumNotReached');
				return;
			}

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
				}
			});
		},

		_ringBell: function () {
			var sound = new Audio('../../audio/bell.mp3'); // buffers automatically when created
			sound.play();
		},


		/*
		 * Credit methods
		 */

		_showCredit: function () {
			var $credit = this.$('#credit'),
				$notice = $credit.find('.notice'),
				self = this;

			$notice.fadeOut(100, function () {
				$credit.animate({
					width: 100
				}, 300, function () {
					self._increaseCredit();
				});
			});
		},

		_hideCredit: function () {
			var $credit = this.$('#credit'),
				$notice = $credit.find('.notice'),
				orderModel = cartModel.get('orderModel');

			$credit.addClass('hasNoCredit');

			$credit.animate({
				width: 45
			}, 300, function () {
				$notice.fadeIn(100, function () {
					orderModel.decreaseCredit();
				});
			});
		},

		_increaseCredit: function () {
			var orderModel = cartModel.get('orderModel');

			orderModel.increaseCredit();
		},

		_decreaseCredit: function () {
			var orderModel = cartModel.get('orderModel');

			if (orderModel.get('credit') <= 0.50) {
				this._hideCredit();
			} else {
				orderModel.decreaseCredit();
			}

		},

		destroy: function () {
			this.stopListening();
		}

	});

	return ControlView;

});