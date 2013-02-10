// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/cartModel',
	'text!templates/store/tray/CheckoutSettingsTemplate.html'
	], function ($, _, Backbone, cartModel, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		isLocked: false,

		template: _.template(CheckoutSettingsTemplate),

		events: {
			'click #save': 'hide',
			'focusout input': 'saveAddressData',
			'click .paymentSettings span': 'choosePayment'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			console.log(cartModel.get('addressModel'));

			var addressModel = cartModel.get('addressModel'),
				json = {
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					streetAdditional: addressModel.get('streetAdditional'),
					city: addressModel.get('city'),
					phone: addressModel.get('phone'),
					email: addressModel.get('email'),
					postal: addressModel.get('postal'),
					paymentMethod: cartModel.get('paymentMethod')
				};

			this.$el.html(this.template(json));
		},

		saveAddressData: function (e) {
			var $input = $(e.target),
				attribute = $input.attr('data-attribute'),
				value = $input.val(),
				addressModel = cartModel.get('addressModel');

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

			cartModel.set('paymentMethod', method);
		},

		hide: function () {
			var addressModel = cartModel.get('addressModel');

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