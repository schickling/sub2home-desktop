// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'notificationcenter',
	'models/cartModel',
	'text!templates/store/tray/CheckoutSettingsTemplate.html'
	], function ($, _, Backbone, notificationcenter, cartModel, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		isLocked: false,

		template: _.template(CheckoutSettingsTemplate),

		events: {
			'click #save': 'hide',
			'focusout input': 'saveAddressData'
		},

		initialize: function () {
			this.render();
		},

		render: function () {

			var addressModel = cartModel.get('addressModel'),
				json = {
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					streetAdditional: addressModel.get('streetAdditional'),
					city: addressModel.get('city'),
					phone: addressModel.get('phone'),
					email: addressModel.get('email'),
					postal: addressModel.get('postal')
				};

			this.$el.html(this.template(json));
		},

		saveAddressData: function (e) {
			var $input = $(e.target),
				attribute = $input.attr('data-attribute'),
				value = $input.val(),
				addressModel = cartModel.get('addressModel');

			addressModel.set(attribute, value);
		},

		hide: function () {
			if (this.validateAddress()) {
				this.$el.trigger('hide');
			}
		},

		validateAddress: function () {
			var isValid = true,
				addressModel = cartModel.get('addressModel'),
				attributes = addressModel.attributes;

			if (attributes.firstName === '') {
				notificationcenter.error('firstName', 'firstName');
				isValid = false;
			}

			if (attributes.lastName === '') {
				notificationcenter.error('lastName', 'lastName');
				isValid = false;
			}

			if (attributes.street === '') {
				notificationcenter.error('street', 'street');
				isValid = false;
			}

			if (attributes.phone === '') {
				notificationcenter.error('phone', 'phone');
				isValid = false;
			}

			if (attributes.email === '' || !this.validateEmail(attributes.email)) {
				notificationcenter.error('email', 'email');
				isValid = false;
			}

			return isValid;
		},

		validateEmail: function (email) {
			var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return re.test(email);
		}

	});

	return CheckoutSettingsView;

});