// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'models/cartModel',
    'text!templates/store/tray/CheckoutSettingsTemplate.html'
    ], function ($, _, Backbone, stateModel, cartModel, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		isLocked: false,

		template: _.template(CheckoutSettingsTemplate),

		events: {
			'click #save': 'hide',
			'focusout input': 'saveAddressData',
			'click #paymentSettings span': 'choosePayment'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			var addressModel = cartModel.getCustomerAddressModel(),
				storeModel = stateModel.get('storeModel'),
				json = {
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					streetAdditional: addressModel.get('streetAdditional'),
					city: addressModel.get('city'),
					phone: addressModel.get('phone'),
					email: addressModel.get('email'),
					postal: addressModel.get('postal'),
					selectedPaymentMethod: cartModel.getPaymentMethod(),
					allowsPaymentCash: storeModel.get('allowsPaymentCash'),
					allowsPaymentEc: storeModel.get('allowsPaymentEc'),
					allowsPaymentPaypal: storeModel.get('allowsPaymentPaypal')
				};

			this.$el.html(this.template(json));
		},

		saveAddressData: function (e) {
			var $input = $(e.target),
				attribute = $input.attr('data-attribute'),
				value = $input.val(),
				addressModel = cartModel.getCustomerAddressModel();

			// array notation needed to interpolate dynamic attribute variable
			var changedAttributes = [];
			changedAttributes[attribute] = value;

			// gets saved later
			addressModel.set(changedAttributes, {
				silent: true
			});
		},

		choosePayment: function (e) {
			var $span = $(e.target),
				method = $span.attr('data-method');

			$span.addClass('selected').siblings().removeClass('selected');

			cartModel.setPaymentMethod(method);
		},

		hide: function () {
			var addressModel = cartModel.getCustomerAddressModel();

			// trigger validation and save the address
			var valid = !! addressModel.set({}, {
				validate: true
			});

			if (valid) {
				addressModel.trigger('change');
				this.$el.trigger('hide');
			}
		}

	});

	return CheckoutSettingsView;

});