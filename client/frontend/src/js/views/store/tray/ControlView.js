// Filename: src/js/views/store/tray/ControlView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/cartModel',
	'text!templates/store/tray/ControlTemplate.html'
	], function ($, _, Backbone, router, cartModel, ControlTemplate) {

	var ControlView = Backbone.View.extend({

		template: _.template(ControlTemplate),

		events: {
			'click .iCart': '_checkout',
			'focusout textarea': '_saveComment'
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
					total: cartModel.get('total'),
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					paymentMethod: paymentMethod,
					comment: cartModel.getComment()
				};

			this.$el.html(this.template(json));
		},

		_listenForDataChanges: function () {
			cartModel.on('change', this._render, this);
		},

		_checkout: function () {

			var orderModel = cartModel.get('orderModel');

			orderModel.save({}, {
				success: function () {
					orderModel.reset();

					router.navigate('store/danke', {
						trigger: true,
						replace: true
					});
				},
				error: function (error, b) {
					console.log(b);
				}
			});
		},

		_saveComment: function (e) {
			var $textarea = $(e.target),
				comment = $textarea.val();

			cartModel.setComment(comment);
		}

	});

	return ControlView;

});