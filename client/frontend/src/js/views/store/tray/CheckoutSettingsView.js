// Filename: src/js/views/store/tray/CheckoutSettingsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'text!templates/store/tray/CheckoutSettingsTemplate.html'
	], function ($, _, Backbone, stateModel, CheckoutSettingsTemplate) {

	var CheckoutSettingsView = Backbone.View.extend({

		template: _.template(CheckoutSettingsTemplate),

		initialize: function () {
			this.render();
		},

		render: function () {

			var storeModel = stateModel.get('storeModel'),
				deliveryAreaModel = storeModel.getSelectedDeliveryAreaModel(),
				json = {
					postal: deliveryAreaModel.get('postal'),
					city: deliveryAreaModel.get('description')
				};

			this.$el.html(this.template(json));
		}

	});

	return CheckoutSettingsView;

});