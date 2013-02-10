// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/cartModel',
	'text!templates/store/tray/CheckoutSettingsTemplate.html'
	], function ($, _, Backbone, cartModel, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		template: _.template(CheckoutSettingsTemplate),

		events: {

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
		}

	});

	return CheckoutSettingsView;

});