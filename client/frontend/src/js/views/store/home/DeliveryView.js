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
			'click .bEdit': '_toggleSelectDeliveryArea'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var storeModel = stateModel.get('storeModel'),
				selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();

			var json = {
				area: selectedDeliveryAreaModel.get('description'),
				postal: selectedDeliveryAreaModel.get('postal'),
				minimumDuration: selectedDeliveryAreaModel.get('minimumDuration')
			};

			this.$el.html(this.template(json));
		},

		_renderDeliveryAreas: function () {
			var storeModel = stateModel.get('storeModel'),
				deliveryAreasCollection = storeModel.get('deliveryAreasCollection'),
				$deliveryAreas = this.$('#deliveryAreas');

			_.each(deliveryAreasCollection.models, function (deliveryAreaModel) {
				$deliveryAreas.append('<span>' + deliveryAreaModel.get('description') + '</span>');
			});
		},

		_toggleSelectDeliveryArea: function () {

			var $deliveryAreas = this.$('#deliveryAreas');

			if ($deliveryAreas.html().trim()) {
				$deliveryAreas.toggle();
			} else {
				this._renderDeliveryAreas();
			}
		}

	});

	return AddressView;

});