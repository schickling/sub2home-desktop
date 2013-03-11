// Filename: src/js/views/store/tray/ControlView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'models/cartModel',
    'text!templates/store/tray/ControlTemplate.html'
    ], function ($, _, Backbone, router, notificationcenter, cartModel, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .iCart, .orderNow': '_checkout',
			'focusout textarea': '_saveComment',
			'click .credit': '_showCredit'
		},

		initialize: function () {
			this._render();
			this._listenForDataChanges();

			this._listenForDestory();
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

		},

		_listenForDataChanges: function () {
			this.listenTo(cartModel, 'change', this._render);
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
					// orderModel.get('orderedItemsCollection').reset();
					// router.navigate('store/danke', {
					// 	trigger: true,
					// 	replace: true
					// });
				},
				error: function () {
					notificationcenter.notify('views.store.tray.orderFailed');
					console.log(b);
				}
			});
		},

		_ringBell: function () {
			var sound = new Audio('../../audio/bell.mp3'); // buffers automatically when created
			sound.play();
		},

		_saveComment: function (e) {
			var $textarea = $(e.target),
				comment = $textarea.val();

			cartModel.setComment(comment);
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.stopListening();
			}, this);
		},

		_showCredit: function () {
			var $credit = this.$('.credit'),
				$bAdd = $credit.find('.bAdd'),
				$bRemove = $credit.find('.bRemove');

			$credit.animate({
				width: 100
			}, function () {
				$bAdd.css({
					display: 'inline-block'
				});
				$bRemove.css({
					display: 'inline-block'
				});
			});

			this._increaseCredit();

		},

		_increaseCredit: function () {
			var orderModel = cartModel.get('orderModel');

			orderModel.increaseCredit();
		}

	});

	return ControlView;

});