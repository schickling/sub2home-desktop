// Filename: src/js/views/store/config/AddressView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'text!templates/store/home/DeliveryTemplate.html'
	], function ($, _, Backbone, stateModel, DeliveryTemplate) {

	var AddressView = Backbone.View.extend({

		template: _.template(DeliveryTemplate),

		events: {
			'click .bEdit': 'selectDeliveryArea'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			var storeModel = stateModel.get('storeModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();

			var json = {
				area: selectedDeliveryAreaModel.get('description'),
				postal: selectedDeliveryAreaModel.get('postal')
			};

			this.$el.html(this.template(json));
		},

		selectDeliveryArea: function () {
			alert('Julian mach das mal! :)');
		}

	});

	return AddressView;

});